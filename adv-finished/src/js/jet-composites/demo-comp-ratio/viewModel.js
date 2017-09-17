/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'data/data'], function (oj, ko, data) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.personProfile = ko.observableArray([]);
        self.ready = ko.observable(false);
        self.averagePerformance = ko.observable();
        self.averagePotential = ko.observable();

        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('Hello from Example Component');

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here 

        });


        data.fetchData('js/data/employee100.json').then(function (person) {
            self.personProfile(person);
            self.ready(true);
            self.formatAverages();
        }).fail(function (error) {
            console.log('Error: ' + error.message);
        });

        self.formatAverages = function () {
            self.averagePerformance(self.personProfile().groupAvgRating.toPrecision(2));
            self.averagePotential(self.personProfile().groupAvgPotential.toPrecision(2));
        };

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