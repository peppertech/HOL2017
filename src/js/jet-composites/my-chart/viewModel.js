/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.ready = ko.observable(false);
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.type = ko.observable('bar');

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.messageText(self.properties.messagetext);
            self.type(self.properties.type);

            //Parse your component properties here 

        });
        
                /* chart data */
        var barSeries = [{name: "Series 1", items: [42, 34]},
                         {name: "Series 2", items: [55, 30]},
                         {name: "Series 3", items: [36, 50]},
                         {name: "Series 4", items: [22, 46]},
                         {name: "Series 5", items: [15, 33]}];
    
        var barGroups = ["2015 Results", "2017 Results"];
   
        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);
        
        self.handleBindingsApplied = function(){
          self.ready(true);
        }
        
        
    };
    
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