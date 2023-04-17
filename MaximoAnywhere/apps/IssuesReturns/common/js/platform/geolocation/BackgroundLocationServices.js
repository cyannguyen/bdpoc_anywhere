
/* JavaScript content from js/platform/geolocation/BackgroundLocationServices.js in folder common */
/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2013,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

/**
 * Class responsibly to call the BackgroundLocationServices plugin
 */
define("platform/geolocation/BackgroundLocationServices",
	   [ "dojo/_base/declare", "platform/translation/MessageService",
        "platform/warning/PlatformRuntimeWarning",
        "dojo/_base/lang"],
       function(declare, MessageService, PlatformRuntimeWarning, lang) {
	var BackgroundLocationServices = declare( null, {
                      name: 'BackgroundLocationServices',
                      properties: null,
                      sharingListener: null,
    pName : 'BackgroundLocationServices',
    config: {},
    configure: function(config) {
        this.config = config;
        var distanceFilter      = (config.distanceFilter   >= 0) ? config.distanceFilter   : 500, // meters
            desiredAccuracy     = (config.desiredAccuracy  >= 0) ? config.desiredAccuracy  : 100, // meters
            interval            = (config.interval         >= 0) ? config.interval        : 900000, // milliseconds
            fastestInterval     = (config.fastestInterval  >= 0) ? config.fastestInterval : 120000, // milliseconds
            aggressiveInterval  = (config.aggressiveInterval > 0) ? config.aggressiveInterval : 4000, //mulliseconds
            debug               = config.debug || false,
            notificationTitle   = config.notificationTitle || "Background tracking",
            notificationText    = config.notificationText  || "ENABLED",
            activityType        = config.activityType || "AutomotiveNavigation",
            useActivityDetection = config.useActivityDetection || false,
            activitiesInterval =  config.activitiesInterval || 1000;

        cordova.exec(function() {},
          function() {},
          'BackgroundLocationServices',
          'configure',
          [distanceFilter, desiredAccuracy,  interval, fastestInterval, aggressiveInterval, debug, notificationTitle, notificationText, activityType, useActivityDetection, activitiesInterval]
        );
    },
    registerForLocationUpdates : function(success, failure, config) {
        cordova.exec(success || function() {},
          failure || function() {},
          'BackgroundLocationServices',
          'registerForLocationUpdates',
          []
        );
    },
    registerForActivityUpdates : function(success, failure, config) {
        cordova.exec(success || function() {},
          failure || function() {},
          'BackgroundLocationServices',
          'registerForActivityUpdates',
          []
        );
    },
    start: function(success, failure, config) {
        cordova.exec(success || function() {},
          failure || function() {},
          'BackgroundLocationServices',
          'start',
          []);
    },
    startAggressiveTracking: function(success, failure) {
        cordova.exec(success || function() {},
          failure || function() {},
          'BackgroundLocationServices',
          'startAggressiveTracking',
          []);
    },
    stop: function(success, failure, config) {
        cordova.exec(success || function() {},
          failure || function() {},
          'BackgroundLocationServices',
          'stop',
          []);
    },
    getVersion: function (success, failure) {
        cordova.exec(success || function() {},
          failure || function() {},
          'BackgroundLocationServices',
          'getVersion',
          []);
    }
 });

return BackgroundLocationServices;
       });

