/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 
  'ojs/ojknockout', 
  'ojs/ojmodel', 
  'ojs/ojtable', 
  'ojs/ojcollectiontabledatasource', 
  'ojs/ojinputnumber', 
  'ojs/ojinputtext', 
  'ojs/ojdialog', 
  'ojs/ojbutton'],
        function (oj, ko, $) {

          function ProfileViewModel() {
            var self = this;

            self.somethingChecked = ko.observable(false);
            self.currentEmpName = ko.observable('default');
            self.newEmpNo = ko.observable(555);
            self.newEmpName = ko.observable('');
            self.workingId = ko.observable('');

            self.findEmpIds = function () {
              var selectedIdsArray = [];
              $("input:checkbox").each(function () {
                var cb = $(this);
                if (cb.is(":checked")) {
                  selectedIdsArray.push(cb.attr("id"));
                }
              });
              return selectedIdsArray;
            }

            // Deletion handlers/helpers
            self.enableDelete = function () {
              if (!$('input[type=checkbox]:checked').length) {
                self.somethingChecked(false);
              } else {
                self.somethingChecked(true);
              }
              return true;
            }

            self.deleteEmp = function (data, event) {
              var deptIds = [];
              deptIds = self.findEmpIds();
              var collection = data.DeptCol();
              deptIds.forEach(function (value, index, arr) {
                var model = collection.get(parseInt(value));
                if (model) {
                  collection.remove(model);
                  model.destroy();
                }
              });
              self.enableDelete();
              document.getElementById("demoTable").refresh();
            }

            // Update handlers/helpers
            self.showChangeNameDialog = function (deptId, data, event) {
              var currName = data.DepartmentName;
              self.workingId(deptId);
              self.currentEmpName(currName);
              document.getElementById("editDialog").open();
            }

            self.cancelDialog = function () {
              document.getElementById("editDialog").close();
              return true;
            }

            self.updateProfileName = function (formData, event) {
              var currentId = self.workingId();
              var myCollection = self.EmpCol();
              var myModel = myCollection.get(currentId);
              var newName = self.currentEmpName();
              if (newName != myModel.get('EmpName') && newName != '') {
                myModel.save({'EmpName': newName}, {
                  success: function (myModel, response, options) {
                    document.getElementById("editDialog").close();
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    alert("Update failed with: " + textStatus);
                    document.getElementById("editDialog").close();
                  }
                });
              } else {
                alert('Employee Name is not different or the new name is not valid');
                document.getElementById("editDialog").close();
              }
            };

            // Create handler
            self.addEmp = function (event) {
              var recordAttrs = {empno: self.newEmpNo(), ename: self.newEmpName()};
              self.EmpCol().create(recordAttrs, {wait: true,
                contentType: 'application/vnd.oracle.adf.resource+json',
                success: function (model, response) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  console.log('Error in Create: ' + textStatus);
                }
              });
            };


            self.serviceURL = 'https://apex.oracle.com/pls/apex/oraclejet/emp/';
            self.EmpCol = ko.observable();
            self.datasource = ko.observable();

            self.parseSaveProfile = function (response) {
              return {empno: response['empno'],
                ename: response['ename'],
                job: response['job'],
                deptno: response['deptno']};
            };

            self.parseProfile = function (response) {
              return {empno: response['empno'],
                ename: response['ename'],
                job: response['job'],
                deptno: response['deptno']};
            };
            self.Employee = oj.Model.extend({
              urlRoot: self.serviceURL,
              parse: self.parseProfile,
              parseSave: self.parseSaveProfile,
              idAttribute: 'empno'
            });

            self.myProfile = new self.Employee();
            self.EmpCollection = oj.Collection.extend({
              url: self.serviceURL,
              model: self.myProfile,
              comparator: "empno"
            });

            self.EmpCol(new self.EmpCollection());





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
              self.EmpCol().fetch();
              self.datasource(new oj.CollectionTableDataSource(self.EmpCol()));
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
          return new ProfileViewModel();
        }
);
