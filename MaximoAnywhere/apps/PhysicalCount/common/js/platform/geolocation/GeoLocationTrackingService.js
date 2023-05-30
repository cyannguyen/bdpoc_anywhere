
/* JavaScript content from js/platform/geolocation/GeoLocationTrackingService.js in folder common */
/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * (C) COPYRIGHT IBM CORP. 2015,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */
define("platform/geolocation/GeoLocationTrackingService",
		["dojo/_base/declare",
		  "dojo/Deferred",
		  "dojo/_base/lang",
		  "platform/logging/Logger"],
		function(declare, Deferred, lang, Logger) {

		var GeoLocationTrackingService = declare(null,{

			_className: "[platform.geolocation.GeoLocationTrackingService]",
			_failureCount: 0,
			_threshold: 5,
			_watchId: null,
			_callbackOnSuccessFunction: null,
			_callbackOnErrorFunction:null,
			_callbackOptions:null,

			stopGpsTracking: function(){
			    Logger.log(this._className+" - stopping tracking.");
			    if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
			         if (window.plugins && window.plugins.backgroundLocationServices) {
                        		var backClass = window.plugins.backgroundLocationServices; //new BackgroundLocationServices();
                        		backClass.stop();
                    		}
			    } else {
			        navigator.geolocation.clearWatch(this._watchId);
			    }


				this._callbackOnSuccessFunction = null;
				this._callbackOnErrorFunction = null;
				this._callbackOptions = null;
			},

				startGpsTracking : function(onSuccess, onError, options){

			    if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
                    var notf = {};
                    notf.contentTextText = "Tracking GPS";

                    //WL.App.setKeepAliveInBackground(true, notf);

                    var self = this;

                    if (typeof onSuccess != "function" || typeof onError != "function"){
                                Logger.log(self._className+" - error, callbacks need to be valid functions.");
                                return;
                        }

                    self._callbackOnSuccessFunction = onSuccess;
                    self._callbackOnErrorFunction = onError;
                    self._callbackOptions = options;

                    Logger.log(self._className+" - starting tracking.");

                    var backClass = window.plugins.backgroundLocationServices;//new BackgroundLocationServices();

                    if (backClass) {
                        //Congfigure Plugin
                        backClass.configure({
                                //Both
                                desiredAccuracy: 0, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
                                distanceFilter: 1, // (Meters) How far you must move from the last point to trigger a location update
                                debug: false, // <-- Enable to show visual indications when you receive a background location update
                                interval: 9000, // (Milliseconds) Requested Interval in between location updates.
                                useActivityDetection: false, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

                                //Android Only
                                notificationTitle: 'Maximo Anywhere Plugin', // customize the title of the notification
                                notificationText: 'Tracking', //customize the text of the notification
                                fastestInterval: 5000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

                        });

                        //Register a callback for location updates, this is where location objects will be sent in the background
                        backClass.registerForLocationUpdates(function(location) {
                                Logger.trace("GPS We got an BG Update " + location.latitude + ' : ' +  location.longitude + ' : ' + location.timestamp  );
                                var position = {};
                                position.coords = {};
                                position.coords.latitude = location.latitude;
                                position.coords.longitude = location.longitude;
                                position.coords.altitude = location.altitude;
                                position.coords.accuracy = location.accuracy;
                                position.coords.altitudeAccuracy  = location.accuracy;
                                position.coords.heading = location.heading;
                                position.coords.speed   = location.speed;
                                position.coords.timestamp = location.timestamp;
                                self._callbackOnSuccessFunction(position);

                        }, function(err) {
                            Logger.trace("GPS Error: Didnt get an update");
                                            //self._callbackOnErrorFunction(err);
                        });

                        //Register for Activity Updates
    
                        //Uses the Detected Activies / CoreMotion API to send back an array of activities and their confidence levels
                        //See here for more information:
    
                        backClass.registerForActivityUpdates(function(activities) {
                            Logger.trace("GPS We got an activity update" );
                        }, function(err) {
                            Logger.trace("GPS Error: Something went wrong");
                        });
    
                        //Start the Background Tracker. When you enter the background tracking will start, and stop when you enter the foreground.
    
                        navigator.geolocation.getCurrentPosition(function() {
                            Logger.log("Succesfully retreived our GPS position, we can now start our background tracker.");
    
                            backClass.start();
    
                            backClass.startAggressiveTracking();
                            
                        }, function(error) {
                            Logger.error(error);
                        });
                        
                    }
                } else {

                    var self = this;

                    if (typeof onSuccess != "function" || typeof onError != "function"){
                        Logger.log(self._className+" - error, callbacks need to be valid functions.");
                        return;
                    }

                    self._callbackOnSuccessFunction = onSuccess;
                    self._callbackOnErrorFunction = onError;
                    self._callbackOptions = options;

                    Logger.log(self._className+" - starting tracking.");
                    this._watchId = navigator.geolocation.watchPosition(
                        // Success
                        function onSuccess(position) {
                            var msg = 'Latitude: '          + position.coords.latitude          + '\n' +
                                      'Longitude: '         + position.coords.longitude         + '\n' +
                                      'Altitude: '          + position.coords.altitude          + '\n' +
                                      'Accuracy: '          + position.coords.accuracy          + '\n' +
                                      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                                      'Heading: '           + position.coords.heading           + '\n' +
                                      'Speed: '             + position.coords.speed             + '\n' +
                                      'Timestamp: '         + position.timestamp                + '\n';
                            Logger.log(self._className+" - onSuccess:"+msg);
                            try{
                            	self._callbackOnSuccessFunction(position);
                            }catch(ex){
    							Logger.error("INFX_GLTS_21 Error calling the registered callback");
    						}
                        },
                        // (Optional) Failure
                        function onError(positionError) {
                            Logger.log(self._className+" - onError: "+positionError.message);
                            try{
                            	self._callbackOnErrorFunction(positionError);
                            }catch(ex){
    							Logger.error("INFX_GLTS_2 Error calling the registered callback");
    						}

                            //increase our failure counter
                            self._failureCount++;

                            if(self._failureCount >= self._threshold){
                                //limit trials exceeded
                                self.stopGpsTracking();
                            }
                        },self._callbackOptions
                    );
                }

			},

			getCurrentGPSPosition : function(onSuccess, onError, options){
				var self = this;

				if (typeof onSuccess != "function" || typeof onError != "function"){
					Logger.log(self._className+" - error, callbacks need to be valid functions.");
					return;
				}

				self._callbackOnSuccessFunction = onSuccess;
				self._callbackOnErrorFunction = onError;
				self._callbackOptions = options;

				Logger.log(self._className+" - get current GPS position.");
				navigator.geolocation.getCurrentPosition(
					// Success
					function onSuccess(position) {
						var msg = 'Latitude: '          + position.coords.latitude          + '\n' +
						          'Longitude: '         + position.coords.longitude         + '\n' +
						          'Altitude: '          + position.coords.altitude          + '\n' +
						          'Accuracy: '          + position.coords.accuracy          + '\n' +
						          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
						          'Heading: '           + position.coords.heading           + '\n' +
						          'Speed: '             + position.coords.speed             + '\n' +
						          'Timestamp: '         + position.timestamp                + '\n';
						Logger.log(self._className+" - onSuccess:"+msg);
						self._failureCount = 0 ; //Reset failure counter on success callback
						try{
							self._callbackOnSuccessFunction(position);
						}catch(ex){
							Logger.error("INFX_GLTS_11 Error calling the registered callback");
						}
					},
					// (Optional) Failure
					function onError(positionError) {
						Logger.log(self._className+" - onError: "+positionError.message);
						try{
							self._callbackOnErrorFunction(positionError);
						}catch(ex){
							Logger.error("INFX_GLTS_1 Error calling the registered callback");
						}

						//increase our failure counter
						self._failureCount++;

						if(self._failureCount >= self._threshold){
							//limit trials exceeded
							self.stopGpsTracking();
						}
					},self._callbackOptions
				);
			}
		});

		return GeoLocationTrackingService;
});
