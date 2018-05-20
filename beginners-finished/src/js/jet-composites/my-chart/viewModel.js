/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojselectcombobox'], function (oj, ko, $) {
  'use strict';

  function ExampleComponentModel(context) {
    var self = this;
    self.composite = context.element;
    //Example observable
    self.messageText = ko.observable('Hello from Example Component');
    self.barSeriesValue = ko.observableArray("");
    self.chartType = ko.observable("bar");

    context.props.then(function (propertyMap) {
      //Store a reference to the properties for any later use
      self.properties = propertyMap;
      //Parse your component properties here 
      self.messageText(self.properties.myMessage);
      self.barSeriesValue(self.properties.myData);
      self.chartType(self.properties.chartType);
    });

    /* chart data */
    var barGroups = ["Group A", "Group B"];

    self.barGroupsValue = ko.observableArray(barGroups);
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