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
    self.chartType = ko.observable("bar");

    context.props.then(function (propertyMap) {
      //Store a reference to the properties for any later use
      self.properties = propertyMap;
      //Parse your component properties here 
      self.messageText(self.properties.myMessage);
      self.chartType(self.properties.chartType);

    });

    /* chart data */
    var barSeries = [{name: "Series 1", items: [42, 34]},
      {name: "Series 2", items: [55, 30]},
      {name: "Series 3", items: [36, 50]},
      {name: "Series 4", items: [22, 46]},
      {name: "Series 5", items: [22, 46]}];

    var barGroups = ["Group A", "Group B"];

    self.barSeriesValue = ko.observableArray(barSeries);
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