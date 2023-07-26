
/* JavaScript content from js/application/handlers/GPSTracker.js in folder common */

/* JavaScript content from js/application/handlers/GPSTracker.js in folder common */
/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2017,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

define("application/handlers/GPSTracker", 
		[ "dojo/_base/declare",
		  "platform/handlers/_ApplicationHandlerBase",
		  "dojo/Deferred", 
		  "dojo/_base/lang", 
		  "platform/logging/Logger",
		  "platform/translation/MessageService",
		  "platform/map/MapProperties",
		  "platform/model/ModelService",
		  "platform/geolocation/GeoLocationTrackingService",
		  "platform/comm/CommunicationManager"],
		function(declare, ApplicationHandlerBase, Deferred, lang, Logger, MessageService, 
				MapProperties,ModelService,GeoLocationTrackingService,CommunicationManager) {
	
			return declare (ApplicationHandlerBase, {
				
				name : 'GPSTracker',
				
				setWOValue : null ,
				laborcode : null ,
				labororg : null,
				lbsinterval : 0,
				refObject : null,
				wonum : null,	
				wositeid : null,	
				wobasedlocationtracking : false,
				messageThreshold : 2000,
				crewid : null,
				offlineLineCounter : 0,

				initialize : function (eventContext) {
				    // WL.App.setKeepAliveInBackground(true);

					var gpsHighAccuracy = true;
					var gpsTimeOut = 5000 ;
					var gpsMaximumAge = 60000;

					var that = this;

					document.addEventListener("resume", onResume, false);
					document.addEventListener("pause", onPause, false);
					var gps_interval = null;

					function onPause() {
    					// Handle the pause event


					}

					function onResume(){
						clearInterval(gps_interval)
					}

				},

				/*
				 *  watch position on success event handler to capture lat/long
				 */

				_onSuccessWatchPosition : function (position) {

					Logger.log("success :: " +  position.coords.latitude + ", " + position.coords.longitude);

				},


				/*
				 * Error callback for watch position
				 */

				_errorCallback : function (error) {

					Logger.log("GPS Tracking Error :: " + error.code + " :: " + error.message);
					var msg = "";

					switch(error.code){

						case error.PERMISSION_DENIED:
							msg = MessageService.createStaticMessage('gpsPermission').getMessage();
							break;
						case error.POSITION_UNAVAILABLE:
							msg = MessageService.createStaticMessage('unableAcquireGPS').getMessage();
							break;
						case error.TIMEOUT:
							msg = MessageService.createStaticMessage('gpsTimeout').getMessage();
							break;
						default:
							msg = MessageService.createStaticMessage('unableAcquireGPS').getMessage();
					}

					//this.ui.showMessage(msg);
				},

			});
		});

