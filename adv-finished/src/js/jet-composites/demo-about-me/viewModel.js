/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout'],
    function (oj, ko) {
        'use strict';

        function AboutMeComponentModel(context) {
            var self = this;

            self.composite = context.element;
            context.props.then(function (propertyMap) {
                //Store a reference to the properties for any later use
                self.properties = propertyMap;
                //Parse your component properties here 
            });

            self.showProfile = function () {
                var eventParams = {
                    'bubbles': true,
                    'cancelable': false
                };
                //Raise the custom event
                this.composite.dispatchEvent(new CustomEvent('demoAboutMeDrill',
                    eventParams));
            }

        }

        return AboutMeComponentModel;
    });