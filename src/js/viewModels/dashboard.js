/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart'],
        function (oj, ko, $) {

          function DashboardViewModel() {
            var self = this;

            // Categories
            var categories = ["Initial", "Qualification", "Meeting", "Proposal", "Close"];
            self.highlightedCategoriesValue = ko.observableArray([]);

            /* chart data */
            var barSeries = [{name: categories[0], items: [42, 34]},
              {name: categories[1], items: [55, 30]},
              {name: categories[2], items: [36, 50]},
              {name: categories[3], items: [22, 46]},
              {name: categories[4], items: [22, 46]}];

            var barGroups = ["Group A", "Group B"];

            self.barSeriesValue = ko.observableArray(barSeries);
            self.barGroupsValue = ko.observableArray(barGroups);

            /* chart data */
            var bubbleSeries = [{name: categories[0], items: [{x: 15, y: 25, z: 5}, {x: 25, y: 30, z: 12}, {x: 25, y: 45, z: 12}]},
              {name: categories[1], items: [{x: 15, y: 15, z: 8}, {x: 20, y: 35, z: 14}, {x: 40, y: 55, z: 35}]},
              {name: categories[2], items: [{x: 10, y: 10, z: 8}, {x: 18, y: 55, z: 10}, {x: 40, y: 50, z: 18}]},
              {name: categories[3], items: [{x: 8, y: 20, z: 6}, {x: 11, y: 30, z: 8}, {x: 30, y: 40, z: 15}]},
              {name: categories[4], items: [{x: 4, y: 17, z: 2}, {x: 35, y: 10, z: 15}, {x: 22, y: 22, z: 13}]}];

            var bubbleGroups = ["Group A", "Group B", "Group C"];


            this.bubbleSeriesValue = ko.observableArray(bubbleSeries);
            this.bubbleGroupsValue = ko.observableArray(bubbleGroups);

            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additionaly available methods.

            /**
             * Optional ViewModel method invoked when this ViewModel is about to be
             * used for the View transition.  The application can put data fetch logic
             * here that can return a Promise which will delay the handleAttached function
             * call below until the Promise is resolved.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
             * the promise is resolved
             */
            self.handleActivated = function (info) {
              // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function (info) {
              // Implement if needed
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View. 
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function (info) {
              // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function (info) {
              // Implement if needed
            };
          }

          /*
           * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
           * each time the view is displayed.  Return an instance of the ViewModel if
           * only one instance of the ViewModel is needed.
           */
          return new DashboardViewModel();
        }
);
