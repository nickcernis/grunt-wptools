/*
 * grunt-wptools
 * https://github.com/nickcernis/grunt-wptools
 *
 * Copyright (c) 2018 Nick Cernis
 * Licensed under the ISC license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    wptools: {
      test_wordpress: {
        options: {
          test: 'wordpress',
          readme: './test/fixtures/readme-fail.txt',
        },
      },
      test_woocommerce: {
        options: {
          test: 'woocommerce',
          plugin: './test/fixtures/plugin.php',
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // TODO: fix unit tests, which are currently unwritten, although the base
  // wptools module from npm is fully tested.
  grunt.registerTask('test', ['clean', 'wptools', 'nodeunit']);

  // By default, run all tests.
  grunt.registerTask('default', ['wptools']);

};
