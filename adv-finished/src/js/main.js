/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/*
    //injector:mainReleasePaths
    //endinjector
*/


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

    $(function () {

      function init() {
        oj.Router.sync().then(
          function () {
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);

/**
 * Example of Require.js boostrap javascript using JET CDN
 */


function _getCDNPath(paths) {
  var cdnPath = "https://static.oracle.com/cdn/jet/";
  var ojPath = "v4.1.0/default/js/";
  var thirdpartyPath = "v4.1.0/3rdparty/";
  var keys = Object.keys(paths);
  var newPaths = {};
  function _isoj(key) {
    return (key.indexOf('oj') === 0 && key !== 'ojdnd');
  }
  keys.forEach(function (key) {
    newPaths[key] = cdnPath + (_isoj(key) ? ojPath : thirdpartyPath) + paths[key];
  });
  return newPaths;
}

requirejs.config({
  paths: _getCDNPath({
    'knockout': 'knockout/knockout-3.4.0.debug',
    'jquery': 'jquery/jquery-3.1.1',
    'jqueryui-amd': 'jquery/jqueryui-amd-1.12.0.min',
    'promise': 'es6-promise/es6-promise.min',
    'ojs': 'debug',
    'ojL10n': 'ojL10n',
    'ojtranslations': 'resources',
    'signals': 'js-signals/signals.min',
    'text': 'require/text',
    'hammerjs': 'hammer/hammer-2.0.8.min',
    'ojdnd': 'dnd-polyfill/dnd-polyfill-1.0.0.min',
    'css': 'require-css/css',
    'customElements': 'webcomponents/custom-elements.min'
  }),
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    }
  }
});


/* 
Adding local libraries that are not available on the CDN
*/

requirejs.config(
  {
    baseUrl: 'js',

    // Path mappings for the logical module names
    paths:
      {
        'socketio': 'libs/socketio-client/socket.io'
      }
    ,
    // Shim configurations for modules that do not expose AMD
    shim:
      {
        'socketio': {
          exports: 'io'
        }
      }
  }
);