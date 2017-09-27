/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(
        ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
  'use strict';

  function ExampleComponentModel(context) {
    var self = this;

    self.composite = context.element;
    //Example observable
    self.messageText = ko.observable('Hello from Example Component');

    context.props.then(function (propertyMap) {
      //Store a reference to the properties for any later use
      self.properties = propertyMap;

      //Parse your component properties here 

    });

    self.compratio = ko.observableArray([
      {"faderatio": "1", "name": "Finance", "value": "$150k", "rate": "100"},
      {"faderatio": "0.8", "name": "Development", "value": "$125k", "rate": "70"},
      {"faderatio": "0.8", "name": "Human Resources", "value": "$90k", "rate": "50"},
      {"faderatio": "0.6", "name": "Maintenance", "value": "$60k", "rate": "40"},
      {"faderatio": "0.6", "name": "Shipping", "value": "$50k", "rate": "30"}
    ]);
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

  return ExampleComponentModel;
});