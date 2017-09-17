/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;

        var converterFactory = oj.Validation.converterFactory('number');
        self.percentConverter = converterFactory.createConverter({style: 'decimal', maximumFractionDigits: 0});

        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('Hello from Demo-Attrition Component');

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here 

        });


        self.pieSeriesValue = ko.observableArray(
        [{name: "Not Fitting into a Team", items: [2]},
            {name: "No Career Progression", items: [2]},
            {name: "Salary", items: [4]},
            {name: "Seeking New Skills", items: [3]},
            {name: "Personal/Family Reasons", items: [3]},
            {name: "Work Environment", items: [1]}
        ]);
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