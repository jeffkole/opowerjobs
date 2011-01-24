/*!
 * OPOWER Jobs
 * Copyright(c) 2010 Dylan Greene <dylang@gmail.com>
 * MIT Licensed
 */

var log = require('logging').from(__filename),
    assetManager = require('connect-assetmanager'),
    assetHandler = require('connect-assetmanager-handlers'),
    compress = false,
    build,

    css = [
            'jqueryui.css',
            'fancybox.css',
            'reset.css',
            'grid.css',
            'base.css',
            'fonts.css',
            'defaults.css',
            'theme.css',
            'button.css',
            'search.css',
            'jobs.css',
            'list-of-jobs.css',
            'navigation.css',
            'images.css',
            'flag.css',
            'tabs.css',
            'icons.css',
            'job.css',
            'menu.css',
            'dropdown.css',
            'team.css',
            'meet-the-team.css',
            'log.css'
         ],

    js = [
            'jquery-1.4.4.js',
            'jquery-ui-1.8.2.custom.min.js',
            'site.js',
            'jquery.fancybox-1.3.1.js',
            'dropdown.js',
            'toggleGrid.js',
            'meet-the-team.js'
        ];

    function fixImageUrls(file, path, index, isLast, callback) {
            callback(file
                .replace(/url\(data:/g, '!URLDATA!')
                .replace(/url\(([^)]+)\)/g, 'url(/css/$1)')
                .replace(/!URLDATA!/g, 'url(data:')
                );
    }

    function config(publicDir) {
        return {
            css: {
                route: /css\/[0-9]+\/compressed\.css/,
                path: './public/css/',
                dataType: 'css',
                debug: false,
                files: css,
                preManipulate: {
                    '^': [
                        fixImageUrls
                        //assetHandler.fixVendorPrefixes,
                        //assetHandler.fixGradients//,
                        //assetHandler.replaceImageRefToBase64(publicDir)
                    ]
                },
                postManipulate: {
                    '^': [
                        //assetHandler.yuiCssOptimize

                    ]
                }
            },
            js: {
                route: /js\/[0-9]+\/compressed\.js/,
                path: './public/js/',
                dataType: 'javascript',
                debug: false,
                files: js,
                preManipulate: {
			        '^': []
		        },
		        postManipulate: {
			        '^': [
				        //assetHandler.uglifyJsOptimize
			        ]
                }
            }
        };
    }

function styles(options) {

    if (options && (options.prod || options.debug) ) {
        compress = options.prod || !options.debug;
    }


    if (compress) {
        return '<link href="/css/' + build + '/compressed.css" rel="stylesheet"  type="text/css"/>';
    }

    var out = [], cacheBuster = ''; //'?' + Math.round(Math.random() * build);
    css.forEach(function(file) {
        out.push('<link href="/css/' + file + cacheBuster + '" rel="stylesheet"  type="text/css"/>');
    });
    return out.join('\n');
}

function scripts(options) {
    if (options && (options.prod || options.debug) ) {
        compress = options.prod || !options.debug;
    }


    if (compress) {
        return '<script type="text/javascript" src="/js/' +  build + '/compressed.js"></script>';
    }

    var out = [], cacheBuster = ''; //'?' +  Math.round(Math.random() * build);
    js.forEach(function(file) {
        out.push('<script type="text/javascript" src="/js/' + file + cacheBuster + '"></script>');
    });
    return out.join('\n');
}

function change_compress(value) {
    compress = value;
}

function handler(publicDir) {
    set_build();
    return assetManager(config(publicDir));
}

function set_build() {
    build = +(new Date());
}

module.exports.compress = change_compress;
module.exports.scripts = scripts;
module.exports.styles = styles;
module.exports.handler = handler;
module.exports.reload = set_build;
