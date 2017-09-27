/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'data/data'],
        function (oj, ko, data) {
          'use strict';

          function AboutMeComponentModel(context) {
            var self = this;

            self.ready = ko.observable(false);
            self.personProfile = ko.observableArray([]);

            self.composite = context.element;
            context.props.then(function (propertyMap) {
              //Store a reference to the properties for any later use
              self.properties = propertyMap;
              //Parse your component properties here 
            });

            var router = oj.Router.rootInstance;

            data.fetchData('js/data/employee100.json').then(function (person) {
              self.personProfile(person);
              self.ready(true);
            }).fail(function (error) {
              console.log('Error: ' + error.message);
            });

            self.showProfile = function () {
              router.go('profile');
            }

            self.getPhoto = function (id) {
              if (self.personProfile().empId < 188) {
                var src = 'css/images/people/' + id + '.png';
              } else {
                src = 'css/images/people/nopic.png';
              }
              return src;
            };

          }

          //Lifecycle methods - uncomment and implement if necessary 
          //ExampleComponentModel.prototype.activated = function(context){
          //};

          //ExampleComponentModel.prototype.attached = function(context){
          //};

          //ExampleComponentModel.prototype.bindingsApplied = function(context){
          //};

          //ExampleComponentModel.prototype.detached = function(context){
          //};

          return AboutMeComponentModel;
        });