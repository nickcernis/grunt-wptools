# grunt-wptools

> Check WordPress plugin ’tested up to’ headers and compare with versions from the wordpress.org API.

This Grunt plugin helps to check that your 'tested up to' and 'WC tested up to' headers have not fallen behind the latest versions of WordPress and WooCommerce. It's useful prior to releasing a plugin, or for automated testing to check 'tested up to' versions have not fallen behind.

This Grunt plugin is a wrapper for the [wptools module](https://github.com/nickcernis/wptools). It will:

- Fetch the 'tested up to' header from the plugin readme.txt file (and optionally the 'WC tested up to' header from your plugin's main PHP file).
- Check the latest version of WordPress and WooCommerce via the wordpress.org API.
- Report a pass or fail depending on whether the 'tested up to' versions need to be bumped.

Sample output for a pass result:

```shell
$ grunt wptools
Running "wptools:test_wordpress" (wptools) task
PASS: WordPress is at 4.9.8, plugin is tested to 4.9.

Running "wptools:test_woocommerce" (wptools) task
PASS: WooCommerce is at 3.4.4, plugin is tested to 3.4.
```

Output for a fail result:

```shell
$ grunt
Running "wptools:test_wordpress" (wptools) task
>> FAIL: WordPress is at 4.9.8, plugin is tested to 3.9.
>> Update the 'Tested up to:' version in /path/to/plugin/readme.txt.
Warning: Task "wptools:test_wordpress" failed. Use --force to continue.

Aborted due to warnings.
```

The Grunt task will not auto-fix 'tested up to' version numbers. You should test your plugin with the latest WordPress or WooCommerce and update the tested up to headers manually if all is well.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-wptools --save-dev
```

Once the plugin has been installed, it can be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wptools');
```

## The "wptools" task

### Overview
In your project's Gruntfile, add a section named `wptools` to the object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wptools: {
    test_wordpress: {
      options: {
        test: 'wordpress',
        readme: 'readme.txt',
      },
    },
    test_woocommerce: {
      options: {
        test: 'woocommerce',
        plugin: 'plugin.php',
      },
    }
  },
});
```

`test_wordpress` and `test_woocommerce` can be named as you wish.

You can omit the `test_woocommerce` section if this is not a WooCommerce plugin.

The 'readme' and 'plugin' options should be strings containing paths relative to your Gruntfile.

It's expected that your readme contains a 'Tested up to: x.x' header.

The `plugin.php` should be the entry point to the plugin that contains your ['WC tested up to: x.x' header](https://woocommerce.wordpress.com/2017/08/28/new-version-check-in-woocommerce-3-2/).


## Release History
0.1.0 Initial release
