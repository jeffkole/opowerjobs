/*!
 * OPOWER Jobs
 * Copyright(c) 2010 Dylan Greene <dylang@gmail.com>
 * MIT Licensed
 */

require.paths.unshift('./support');
require.paths.unshift('./support/connect/lib');

require('proto');

var log = require('./lib/util/log').from(__filename),
    Express = require('express'),
    Assets = require('./lib/assets'),

    objToHTML = require('./lib/util/prettyJSON'),

    Content = require('./lib/content'),
    Jobs = require('./lib/jobs'),

    viewsDir = __dirname + '/views',
    publicDir = __dirname + '/public',
    port = parseInt(process.env.PORT || 3000),
    public_host = 'www.opowerjobs.com',
    Server = module.exports = Express.createServer();


//hack for testing poduction settings.  slug == heroku.
if (port != 3000 || __dirname.indexOf('slug') !== -1) {
    Server.set('env', 'production');
}

//in case of crash. I've never seen this used, got it from somebody else's code.
process.title = 'opowerjobs.com';
process.addListener('uncaughtException', function (err, stack) {
    console.log(err);
    log('*************************************');
    log('************EXCEPTION****************');
    log('*************************************');
    log(err);
    log('*************************************');
});

function production(){
    Server.use(Express.conditionalGet());
    Server.use(Express.cache(1000 * 60));
    Server.use(Express.gzip());

    log('running in production mode');
    Assets.compress(true);
    Jobs.autoUpdate();

    Server.helpers({
        href: function(url) { return 'http://' + public_host + (url[0] == '/' ? '' : '/') + url; }
    });


}

function development() {
    Server.use(Express.conditionalGet());
    Server.use(Express.cache(1000 * 2));
    Server.use(Express.gzip());
    
    Assets.compress(true);
    //Jobs.autoUpdate(); // TODO: This should be taken out. Site seems to always operate in dev mode rather than production. (GM)
    
    Server.helpers({
        href: function(url) { return 'http://localhost:' + port + (url[0] == '/' ? '' : '/') + url; }
    });

    log('running in development mode');
    //Server.use(Express.errorHandler({ dumpExceptions: true, showStack: true }));
}


function common() {
    Server.set('views', viewsDir);

    Server.helpers({
        debug: objToHTML,
        log: log
    });
    Server.use(Express.bodyDecoder());
    Server.use(Express.favicon(publicDir + '/favicon.ico'));
    Server.use(Assets.handler(publicDir));
    Server.use(Express.staticProvider(publicDir));
    Server.use(Server.router);

    Server.helpers({assets: Assets, currentPageID: false, pages: []});
}


Server.configure('development', development);
Server.configure('production', production);
Server.configure(common);

Server.error(function(err, req, res, next){
        log('*************************************');
        log('****************ERROR****************');
        log('*************************************');
        log(err.message);
        log(err.arguments);
        log(err.stack);
        log('*************************************');
        res.redirect('/');
        //res.render('error.ejs', { locals: { title: 'Error', message: objToHTML(err) } });
});


// Redirect other servers to the main one
/*
Server.get(|.*|, function(req, res, next){
    var host = req.headers.host.split(':')[0];
    if (host != 'localhost' && host != public_host) {
        var new_url = 'http://' + public_host + req.originalUrl;
        log('traffic from: ' + req.originalUrl);
        res.redirect(new_url);
    } else {
        next();
    }
});
*/

// Get rid of urls that end in /
// Required for 404's to return something
Server.get('/*', function(req, res, next){
    if (req.url.length > 1 && req.url[req.url.length - 1] == '/') {
        log('lose the slash:', req.url);
        res.redirect(req.url.substr(0, req.url.length - 1));
    } else {
        next();
    }
});

    
Content.addHandlers( {Server: Server });
Jobs.addHandlers( { Server: Server});


Server.get('/log', function(req, res) {
    res.render('log.ejs');
});

// Required for 404's to return something
Server.get('/*', function(req, res){
    var host = req.headers.host.split(':')[0],
        new_url;

    if (host == 'localhost' || host == public_host) {
        if (req.headers.referer) {
            log('404', req.url, 'referer', req.headers.referer);
        }
        else {
            log('404', req.url);
        }
    }

    if (host == 'localhost') {
        res.render('error.ejs', { locals: { message: "404, man, 404. <br /> When in production the server will automatically redirect to an appropriate page." } });
    } else {
        var array = req.url.split('/');
        if (array.pop() == '') { array.pop(); }

        new_url = array.join('/') || '/';
        res.redirect(new_url);
    }
});

Server.listen(port, null);
log('Starting OPOWER JOBS on ', port, '...');


