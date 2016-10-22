const PORT = 35729;
const STYLES = 'static/styles/'

module.exports = function(grunt) {

    'use strict';
    // Project configuration.

    grunt.initConfig({
        pug : {
    			compile  : {
    				files : [{
    					expand : true,
    					cwd : 'views',
    					src : ['*.pug'],
    					dest : 'views/html',
    					ext : '.html',
    				}],
    				options : {
    					pretty : true,
    				},
    			},
    		},
        sass : {
        	scss : {
        		files : [{
        			expand : true,
        			cwd : STYLES + 'scss',
        			src : ['*.scss'],
        			dest : STYLES + 'css',
        			ext : '.css',
        		}],
        	},

        	options : {
        		outputStyle : 'expanded',
        		indendtType : 'tab',
        	},
        },
        autoprefixer : {
            // options : {
            //     browsers : ['ie 10','opera 39', 'firefox 49', 'safari 10'],
            // },
            css : {
                files : [{
                    expand : true,
                    cwd : STYLES + 'css',
                    src : ['*.css'],
                    dest : STYLES + 'css/build',
                    ext : '.css',
                }],
                options : {
                    browsers : ['ie 10','opera 39', 'firefox 49', 'safari 10'],
                    // cascade : false,
                },
            },
        },
        watch : {
        	scss : {
        		files : ['./static/styles/scss/*.scss'],
        		tasks : ['sass:scss'],
        	},
            autoprefixer : {
                files : ['./static/styles/css/*.css'],
                tasks : ['autoprefixer:css'],
            },
            pug : {
            	files : ['views/*.pug'],
            	tasks : ['pug:compile'],
            },
            // connect : {
            //     files : [
            //         __dirname + '/views/*.pug',
            //         STYLES + 'css/*.css',
            //     ],
            // },
            // options : {
            //     livereload : true,
            // }
        },
        /*connect : {
            server : {
                options : {
                    hostname : 'localhost',
                    port : PORT,
                    base : '.',
                    livereload : true,
                    open : true,
                    // keepalive : true,
                },
            },
        },*/
    });

  // Load the plugin that provides the "uglify" task.

    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');

  // Default task(s)
    grunt.registerTask('default', ['pug','sass','autoprefixer',/*'connect',*/'watch']);
};
