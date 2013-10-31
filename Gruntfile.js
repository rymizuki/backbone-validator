'use strict';

module.exports = function (grunt) {
    // load all 'grunt-*' tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),

        "concat": {
            "main": {
                "dest": "dist/backbone.validator-<%= pkg.version %>.js",
                "src": [
                    "js/validator.js",
                    "js/result.js",
                    "js/constraint/default.js"
                ]
            },
            "vender": {
                "dest": "test/vender.js",
                "src": [
                    "bower_components/jquery/jquery.js",
                    "bower_components/underscore/underscore.js",
                    "bower_components/backbone/backbone.js"
                ]
            }
        },

        "jshint": {
            "options": {
                "jshintrc": '.jshintrc'
            },
            "files": {
                "src": "dist/backbone.validator-<%= pkg.version %>.js"
            }
        },

        "uglify": {
            "main": {
                "files": {
                    "dist/backbone.validator-<%= pkg.version %>.min.js": [
                        "dist/backbone.validator-<%= pkg.version %>.js"
                    ]
                }
            }
        },

        "testem": {
            "main": {
                "src": [
                    "bower_components/expect/expect.js",
                    "bower_components/sinon/index.js",
                    "dist/backbone.validator-<%= pkg.version %>.js",
                    "test/constraint.js",
                    "test/result.js",
                    "test/validator.js"
                ],
                "options": {
                    "test_page": "test/runner.mustache",
                    "parallel": 4,
                    "launch_in_ci": ["PhantomJS"]
                }
            }
        }
    });

    grunt.registerTask('main', ["concat:main", "jshint", "uglify:main"]);
    grunt.registerTask('test', ["testem"]);
};
