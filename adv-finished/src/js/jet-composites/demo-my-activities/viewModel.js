/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socketio'],
        function (oj, ko, $, io) {
          'use strict';

          function ExampleComponentModel(context) {
            var self = this;

            var apiHost = "https://websocketservice2-paas124.apaas.em2.oraclecloud.com" //window.location.hostname || 'localhost';
            var apiPort = '' // apiHost.match(/localhost/) ? ':3000' : '';
            
            // This is set to false by default.  To see the code working with the Websocket interface
            // change the autoConnect value to true below.
            const socket = io(apiHost + ":" + apiPort, {autoConnect: false});
            self.value = ko.observable('10');

            self.composite = context.element;
            //Example observable
            self.messageText = ko.observable('Hello from Example Component');

            context.props.then(function (propertyMap) {
              //Store a reference to the properties for any later use
              self.properties = propertyMap;

              //Parse your component properties here 

            });

            function cb(err, value) {
              if (err) {
                console.log('Subscriber Error: ' + err);
              } else {
                self.value(value);
              }
            }
            self.startConnection = function () {
              socket.connect();
            };

            self.subscribeToTimer = function () {
              socket.on('timer', value => cb(null, value));
              socket.emit('subscribeToTimer', 2000);
            }

            self.closeConnection = function () {
              console.log('Connection id: ' + socket.id + ' closed');
              socket.close()
            };

            socket.on('connect', () => {
              console.log('Connection started with id: ' + socket.id);
            });

            socket.on('connect_error', (error) => {
              console.log('Connection Error: ' + error);
            });

            ExampleComponentModel.prototype.bindingsApplied = function (context) {

              //self.subscribeToTimer();
            };
          }


          //Lifecycle methods - uncomment and implement if necessary 
          //ExampleComponentModel.prototype.activated = function(context){
          //};

          //ExampleComponentModel.prototype.attached = function(context){
          //};

          //ExampleComponentModel.prototype.bindingsApplied = function (context) {

          //          self.subscribeToTimer();
//          };

          //ExampleComponentModel.prototype.detached = function(context){
          //};

          return ExampleComponentModel;
        });