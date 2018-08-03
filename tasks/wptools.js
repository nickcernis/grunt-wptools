/*
 * grunt-wptools
 * https://github.com/nickcernis/grunt-wptools
 *
 * Copyright (c) 2018 Nick Cernis
 * Licensed under the ISC license.
 */

'use strict';
const wptools = require('@ndc/wptools');
const path = require('path');

module.exports = function (grunt) {

  grunt.registerMultiTask('wptools', 'Check WordPress plugin ’tested up to’ headers against the latest WP and WooCommerce versions from the WP.org API.', function () {

    // Merge task-specific options with these defaults.
    var options = this.options({
      test: 'wordpress',
      readme: 'readme.txt',
      plugin: 'plugin.php',
    });

    var done = this.async();

    if (options.test === 'wordpress') {
      const readmePath = path.resolve(options.readme);

      wptools.plugin.testWordPress(readmePath).then(result => {
        if (result.pass) {
          grunt.log.writeln(`PASS: WordPress is at ${result.version}, plugin is tested to ${result.tested}.`);
          done();
        } else {
          grunt.log.error(`FAIL: WordPress is at ${result.version}, plugin is tested to ${result.tested}.`);
          grunt.log.error(`Update the 'Tested up to:' version in ${readmePath}.`);
          done(false);
        }
      });
    }

    if (options.test === 'woocommerce') {
      const pluginPath = path.resolve(options.plugin);

      wptools.plugin.testWooCommerce(pluginPath).then(result => {
        if (result.pass) {
          grunt.log.writeln(`PASS: WooCommerce is at ${result.version}, plugin is tested to ${result.tested}.`);
          done();
        } else {
          grunt.log.error(`FAIL: WooCommerce is at ${result.version}, plugin is tested to ${result.tested}.`);
          grunt.log.error(`Update the 'WC tested up to:' version in ${pluginPath}.`);
          done(false);
        }
      });
    }

  });

};
