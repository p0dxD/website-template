'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    var serveStatic = require('serve-static')
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        watch: {
            css: {
                files: 'src/assets/scss/**/*.scss',
                tasks: ['compass:dev']
            },
            js: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['copy:mainjs'],
            },
            html: {
                files: ['src/**/**/*.hbs'],
                tasks: ['assemble']
            },
            img: {
                files: ['src/assets/images/**/*.{jpg,gif,png}'],
                tasks: ['copy:img']
            },
            fonts: {
                files: ['src/assets/fonts/**/*.{otf,ttf,woff,eot}'],
                tasks: ['copy:fonts']
            },
            json: {
                files: ['src/data/**/*.json'],
                tasks: ['assemble']
            },

            hbs: { 
                files: ['src/**/*.hbs'],
                tasks: ['assemble']
            },

            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    'src/**/*.hbs',
                    'src/assets/scss/**/*.scss',
                    'src/assets/js/*.js',
                    'src/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    'src/data/**/*.json'
                ]
            }
        },//end watch 

        connect: {
            options: {
                port: 9000,
                // hostname: 'localhost', // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            serveStatic('build')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            serveStatic('build')
                        ];
                    }
                }
            }
        },//end connect

        assemble: {
            options: {
                assets: 'src/assets',
                // plugins: ['permalinks'],
                partials: ['src/partials/**/*.hbs'],
                layoutdir: 'src/layouts',
                data: ['src/data/**/*.{json,yml}']
            },
            index: {
                options: {
                    layout: 'base.hbs',
                    assets: 'build/assets'
                },
                expand: true,
                cwd: 'src/pages',
                src: ['**/*.hbs'],
                dest: 'build/'
            },

            // projects: {
            //     options: {
            //         layout: 'projects.hbs',
            //         assets: 'build/assets'
            //     },
            //     expand: true,
            //     cwd: 'src/pages/projects',
            //     src: ['**/*.hbs'],
            //     dest: 'build/projects/'
            // }
        },//end assemble

        jshint: {
            all: [
                'src/assets/js/**/*.js'
            ]
        },

        compass: {
            build: {
                options: {
                    sassDir: 'src/assets/scss',
                    cssDir: 'build/assets/css',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: 'src/assets/scss',
                    cssDir: 'build/assets/css'
                }
            }
        },

        copy: {
            mainjs: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/js/',
                    src: '**/*',
                    dest: 'build/assets/js/'
                }, ],
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: '**/*',
                    dest: 'build/assets/img/'
                }, ],
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/css/',
                    src: '**/*',
                    dest: 'build/assets/css/'
                }, ],
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/fonts/',
                    src: '**/*',
                    dest: 'build/assets/fonts/'
                }, ],
            },
            etc: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '*.{png,ico,jpg,gif,md,txt}',
                    dest: 'build/'
                }]
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            files: {
                src: 'build/assets/css/main.css',
                dest: 'build/assets/css/main.min.css'
            }
        },

        uglify: {
            
            mainjs: {
                src: 'build/assets/js/**/*.js',
                dest: 'build/assets/js/*.min.js'

            }
        },

        clean: {
            html: ['build/**/*.html'],
            js: ['build/assets/js'],
            css: ['build/assets/css'],
            img: ['build/assets/img']
        },

        pure_grids: {
            dest: 'build/assets/css/main-grid.css',

            options: {
                units: 12, //12- column grid

                mediaQueries: {
                    sm: 'screen and (min-width: 35.5em)', // 568px
                    md: 'screen and (min-width: 48em)',   // 768px
                    lg: 'screen and (min-width: 64em)',   // 1024px
                    xl: 'screen and (min-width: 80em)'    // 1280px
                }
            }
        }

    });

    grunt.loadNpmTasks('assemble'); // Special case

    // Default task(s).
    grunt.registerTask('default', [
        'assemble',
        //'compass:dev',
        'copy',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        // 'jshint',
        'assemble',
        'pure_grids',
        //'compass',
        'copy',
        'cssmin',
        // 'uglify'
    ]);

};
