/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'data/data', 'ojs/ojvalidation', 'ojs/ojtagcloud', 'ojs/ojchart'],
  function (oj, ko, $, jsonData) {




    function EmployeeViewModel() {
      var self = this;
      self.firstTime = true;
      self.data = ko.observable();
      self.personProfile = ko.observableArray([]);
      self.employeePhoto = ko.observable();
      self.empId = ko.observable('');

      function getEmpURL(id) {
        var url;
        if (id) {
          url = "js/data/employee" + id + ".json";
        } else {
          url = "js/data/employee100.json";
        }
        return url;
      }

      // canEnter requires a promise that resolve as true or false
      self.loadData = function (id) {
        return new Promise(function (resolve, reject) {
          jsonData.fetchData(getEmpURL(id)).then(function (person) {
            self.personProfile(person);
            resolve(true);
          }).fail(function (error) {
            console.log('Error: ' + error.message);
            resolve(false);
          });
        });
      };

      self.getPhoto = function (id) {
        var src;
        // We only have images for employees below 188 for now. Use the nopic avatar for those above 18
        if (id < 188) {
          src = 'css/images/people/' + id + '.png';
        } else {
          src = 'css/images/people/nopic.png';
        }
        return src;
      };

      self.getEmail = function () {
        return "mailto:" + self.personProfile().email + '@example.net';
      };

      self.getHireDate = function () {
        var hireDate = self.personProfile().hireDate;
        var dateOptions = { formatStyle: 'date', dateFormat: 'medium' };
        var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
        var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(hireDate).toDate());
        hireDate = dateConverter.format(startDate);
        return hireDate;
      };

      self.formatAddress = function () {
        var street = self.personProfile().address;
        var city = self.personProfile().city;
        var state = self.personProfile().state;
        var postal = self.personProfile().postal;
        var country = self.personProfile().country;
        return street + '<br/>' + city + '<br/>' + state + ' ' + postal + ' ' + country;
      };


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
        self.loadData();
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
    return new EmployeeViewModel();
  }
);
