module.exports = function (grunt) {
    require('time-grunt')(grunt);
    
    
    // Project configuration.
    grunt.initConfig({
    
        // Metadata.
        meta: {
            version: '0.1.0'
        },
        banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://PROJECT_WEBSITE/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'YOUR_NAME; Licensed MIT */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/FILE_NAME.js'],
                dest: 'dist/FILE_NAME.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/FILE_NAME.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['spec/**/*.js', 'lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        protractor: {
            options: {
 
                //configFile: "node_modules/protractor/example/configuration_seq_chrome.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            rsapp_chrome_sequential: {
                options: {
                    keepAlive: true,
                    configFile: "configuration_seq_chrome.js",
                    webdriverManagerUpdate: false,
                    args: {
                        
                        specs: [
                            './specs/indexPage.js',
                            './specs/indexPage1.js'
                           ]
                    }
                },
                run: {}
            },
    
            // Chrome - Parallel
            rsapp_chrome_parallel: {
                options: {
                    keepAlive: true,
                    configFile: "configuration_parallel_chrome.js",
                    webdriverManagerUpdate: false,
                    args: {
                        
                    }
                },
                run: {}
            },

            rsapp_edge_sequential: {
                options: {
                    keepAlive: true,
                    configFile: "configuration_seq_edge.js",
                    webdriverManagerUpdate: false,
                    cmd:{

                    },
                    args: {
                        
                        specs: [
                            './specs/indexPage.js',
                            './specs/indexPage1.js'
                           ]
                    }
                },
                run: {}
            },
    
            // Edge - Parallel
            rsapp_edge_parallel: {
                options: {
                    keepAlive: true,
                    configFile: "configuration_parallel_edge.js",
                    webdriverManagerUpdate: false,
                    args: {
                        
                    }
                },
                run: {}
            },

            rsapp_ff_sequential: {
                options: {
                    keepAlive: true,
                    configFile: "configuration_seq_chrome.js",
                    webdriverManagerUpdate: true,
                    args: {
                        
                        specs: [
                            './specs/indexPage.js',
                            './specs/indexPage1.js'
                           ]
                    }
                },
                run: {}
            },
    
            // FF - Parallel
            rsapp_ff_parallel: {
                options: {
                    keepAlive: true,
                    configFile: "configuration_parallel_chrome.js",
                    webdriverManagerUpdate: true,
                    args: {
                        
                    }
                },
                run: {}
            },


        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        }
    });
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-protractor-runner');
    
    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    
   
    
    /*
    grunt rsapp_seq_execution --target="chrome"
     */
    grunt.registerTask('rsapp_seq_execution', 'RS App - Sequential Execution', function (n) {
        var target = grunt.option('target');

        if (target === 'firefox') {
            grunt.task.run('protractor:rsapp_firefox_sequential');
        }
        else if (target === 'edge') {
           // grunt.option('java -jar -Dwebdriver.edge.driver="C:\\Users\\alagappan.annamalai\\Downloads\\edgedriver_win64\\msedgedriver.exe" "C:\\Users\\alagappan.annamalai\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.141.59.jar" -port 4444');
            grunt.task.run('protractor:rsapp_edge_sequential')
            
        } else {
            //grunt.task.run(['protractor:smoketest_kbadmin_article_creation_chrome_sequential']);
            grunt.task.run('protractor:rsapp_chrome_sequential');
        }
        //    grunt.task.run('protractor:rsapp_chrome_sequential');
    });
    
    
    /*
    grunt rsapp_parallel_execution --target="chrome"
     */
    grunt.registerTask('rsapp_parallel_execution', 'RS App - Parallel Execution', function (n) {
        var target = grunt.option('target');
        if (target === 'firefox') {
            grunt.task.run('protractor:rsapp_firefox_parallel');
        }
        else if (target === 'edge') {
            grunt.task.run('protractor:rsapp_edge_parallel')
            
        } else {
            //grunt.task.run(['protractor:smoketest_kbadmin_article_creation_chrome_sequential']);
            grunt.task.run('protractor:rsapp_chrome_parallel');
        }
    });
    
};