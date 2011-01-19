/*!
 * OPOWER Jobs
 * Copyright(c) 2010 Dylan Greene <dylang@gmail.com>
 * MIT Licensed
 */

var log = require('logging').from(__filename),
    MemoryStore = require('connect/middleware/session/memory'),
    Express = require('express'),
    Assets = require('./lib/assets'),

    objToHTML = require('./lib/util/prettyJSON'),

    ReferralHandler = require('./lib/referralHandler'),
    ContentHandler = require('./lib/contentHandler'),
    JobHandler = require('./lib/jobHandler'),

    Server = module.exports = Express.createServer();

var VIEWS = __dirname + '/views',
    PUBLIC = __dirname + '/public',
    PORT = parseInt(process.env.PORT || 3000),
    HOSTNAME = 'opowerjobs.com';

var TEMP_HOSTS = { '8.17.80.250': 1, '72.2.126.71': 1, 'opower.no.de': 1, 'dylan95.com': 1, 'www.dylan95.com': 1, 'dylangreene.com': 1, 'www.dylangreene.com': 1, 'coursereviews.com': 1, 'www.coursereviews.com': 1, 'teacherreviews.com': 1, 'www.teacherreviews.com': 1 };


// hack for testing production settings.
if (PORT != 3000 || process.env.JOYENT) {
    Server.set('env', 'production');
}

//in case of crash. I've never seen this used, got it from somebody else's code.
process.title = 'opowerjobs';
process.addListener('uncaughtException', function (err, stack) {
    console.log(err);
    console.log(stack);
    log('*************************************');
    log('************EXCEPTION****************');
    log('*************************************');
    err.message && log(err.message);
    err.stack && log(err.stack);
    log('*************************************');
});

function production(){
    Server.use(Express.conditionalGet());
    Server.use(Express.cache());
    Server.use(Express.gzip());

    log('running in production mode');
    Assets.compress(true);
    JobHandler.autoUpdate();

    Server.helpers({
        href: function(url) { return 'http://' + HOSTNAME + (url[0] == '/' ? '' : '/') + url; },
        production: true
    });


}

function development() {
    Server.use(Express.conditionalGet());
    Server.use(Express.cache());
    Server.use(Express.gzip());

    Assets.compress(true);
    //JobHandler.autoUpdate(); // TODO: Make it update for testing changelog?

    Server.helpers({
        href: function(url) { return (url[0] == '/' ? '' : '/') + url; },
        development: true
    });

    log('running in development mode');
    //Server.use(Express.errorHandler({ dumpExceptions: true, showStack: true }));
}


function common() {
    Server.set('views', VIEWS);

    Server.helpers({
        debug: objToHTML,
        log: log,
        array: function(obj) {
            return obj.map(function(value, id) {
                return { id: id, value: value };
            });
        }
    });
    Server.use(Express.cookieDecoder());
    Server.use(Express.session({ store: new MemoryStore({ reapInterval: 60000 * 10 }), secret: 'OPOWER!' }));
    Server.use(Express.bodyDecoder());
    Server.use(Express.favicon(PUBLIC + '/favicon.ico'));
    Server.use(Assets.handler(PUBLIC));
    Server.use(Express.staticProvider(PUBLIC));
    Server.use(Server.router);

    Server.helpers({assets: Assets, currentPageID: false, pages: []});
}


Server.configure('development', development);
Server.configure('production', production);
Server.configure(common);

Server.error(function(err, req, res, next){
        if (err.message != 'EISDIR, Is a directory') {
            log('*************************************');
            log('****************ERROR****************');
            log('*************************************');
            log('http://' + req.headers.host + req.url);
            err.message && log(err.message);
            err.arguments && log(err.arguments);
            err.stack && log(err.stack);
            log('*************************************');
        }
        if (Server.get('env') == 'production') {
            res.redirect('/');
        } else {
            res.render('error.ejs', { locals: { title: 'Error', message: err.message, object: false } });
        }
});

// For Google Webmaster
Server.get('/google97924ebf42be7c40.html', function(req, res){
    res.send('google-site-verification: google97924ebf42be7c40.html');
    res.end();
});

Server.get('/nagios', function(req, res) {
    res.send('I am working fine.');
    res.end();
});


// Get rid of urls that end in / - makes Google Analytics easier to read
Server.get(/^.+\/$/, function(req, res){
    res.redirect(req.url.substr(0, req.url.length - 1));
});

// Redirect other servers to the main one
Server.get(/^/, function(req, res, next){
    var host = req.headers.host.split(':')[0];
    if (TEMP_HOSTS[host]) {
        req.session.tempHost = host;
    }
    if (host != 'localhost' && host != HOSTNAME && !TEMP_HOSTS[host]) {
        var new_url = 'http://' + HOSTNAME + req.originalUrl;
        //log('redirect from:', req.headers.host + req.originalUrl, 'to', new_url);
        res.redirect(new_url);
    } else {
        next();
    }
});

// Reload CSS - sometimes it fails on Heroku
Server.get('/reload', function(req, res, next) {
    Assets.reload();
    next();
});

ReferralHandler.addHandlers( {Server: Server } );
ContentHandler.addHandlers( {Server: Server } );
JobHandler.addHandlers( {Server: Server } );

Server.get('/log', function(req, res) {
    res.render('log.ejs',  { locals: { history: log.history() } });
});


// Required for 404's to return something
Server.get('/*', function(req, res){
    var host = req.headers.host.split(':')[0],
        new_url,
        extension = req.url.match(/\....$/);

    if (extension) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Cannot ' + req.method + ' ' + req.url);
    }
    else if (TEMP_HOSTS[host]) {
        res.redirect('http://' + HOSTNAME);
    }
    else {
        if (!req.session.tempHost || host == 'localhost') {
            if (req.headers['user-agent'] && req.headers['user-agent'].match(/msnbot|slurp/i) === null) {
                log('404', req.url, req.headers.referrer || req.headers.referer || req.session.jobboard || '');
            }
        }

        var array = req.url.replace(/\/\//g, '/').split('/');
        if (array.pop() == '') { array.pop(); }

        new_url = array.join('/') || '/';
        res.redirect(new_url);
    }
});

Server.listen(PORT, null);
log('Starting OPOWER JOBS on', PORT);
