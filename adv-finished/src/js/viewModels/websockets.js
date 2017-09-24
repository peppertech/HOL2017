/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','socketio','ojs/ojgauge','ojs/ojswitch'],
 function(oj, ko, $, io) {
  
    function AboutViewModel() {
      var self = this;
      self.thresholdValues = [{max: 15, color:'#00CC00'}, {max: 30, color:'#FDEF22'}, {color:'#FF0000'}];
      self.value = ko.observable(5);		
      self.isChecked = ko.observable();
      
			var apiHost = "https://websocketservice2-paas124.apaas.em2.oraclecloud.com" //window.location.hostname || 'localhost';
			var apiPort = '' // apiHost.match(/localhost/) ? ':3000' : '';
			const socket = io(apiHost+":"+apiPort,{autoConnect: false});

      var converterFactory = oj.Validation.converterFactory('number');
      self.customConverter = {rendered:'on', converter: converterFactory.createConverter({style: 'decimal', decimalFormat: 'standard'})};

			function cb(err, value){
				if (err){
					console.log('Subscriber Error: '+err);
				}else{
					console.log('The server says: '+ value);
          self.value(value);
				}
			};

      self.toggleConnection = ko.pureComputed(function(){
        self.isChecked() ? self.startConnection() : self.closeConnection(); 
      })

			self.startConnection = function() {
				socket.connect();
			};

			self.subscribeToTimer = function() {
				socket.on('timer', value => cb(null, value));
				socket.emit('subscribeToTimer', 2000);
			}

			self.closeConnection = function(){
					console.log('Connection id: '+socket.id+' closed');
					socket.close()
			};

			socket.on('connect', () => {
					console.log('Connection started with id: '+socket.id);
			});

			socket.on('connect_error', (error) => {
					console.log('Connection Error: '+error);
			});
			
			
			
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
      self.handleActivated = function(info) {
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
      self.handleAttached = function(info) {
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
      self.handleBindingsApplied = function(info) {
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
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
