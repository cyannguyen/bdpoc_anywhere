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

define("platform/handlers/MapHandler", 
[ "dojo/_base/declare",
  "platform/handlers/_ApplicationHandlerBase",
  "platform/logging/Logger"],
function(declare, ApplicationHandlerBase, Logger) {
	return declare( ApplicationHandlerBase, {
		name: 'MapHandler',
		changeListeners: new Array(),
		eventListeners: new Array(),
		mapControl : null,
		useCurrentIndex : false,
		constructor: function() {
			// initialization code
		},
		
/**@memberOf platform.handlers.MapHandler */
		initialize: function(eventContext) {
			
		},
		
		
		onMapEvent: function(jsonObject) {
			// TODO, put something useful here, just dumping log for now
			Logger.trace('[MapHandler] onMapEvent');
			Logger.trace('[MapHandler] receiving: ' + JSON.stringify(jsonObject));
			/* TODO, this was used for debugging shouldn't be used anylonger 
			document.body.insertBefore(document.createTextNode(JSON.stringify(jsonObject)), document.body.firstChild);
			document.body.insertBefore(document.createElement("br"), document.body.firstChild);
			document.body.insertBefore(document.createTextNode('[MapHandler] receiving event: ' + jsonObject.event), document.body.firstChild);
			document.body.insertBefore(document.createElement("br"), document.body.firstChild);
			*/
			Logger.trace("[MapHandler] Received onMapEvent");
			for(var i=0; i < this.eventListeners.length; i++) {
				Logger.trace("[MapHandler] Calling listener " + i);
				this.eventListeners[i].onMapEvent(jsonObject);
			}
		},
		
		addMapEventListener: function(/*OnMapEventListener*/ listener) {
			this.eventListeners.push(listener);
			Logger.trace("[MapHandler] added listener, count " + this.eventListeners.length);
		},
		
		removeMapEventListener: function(/*OnMapEventListener*/ listener) {
			var index = this.eventListeners.indexOf(listener);
			delete this.eventListeners[index];
			this.eventListeners.splice(index, 1);
		},
		
		// TODO, all bellow should be on the application context, the platform must evolve before this is created
		onStatusChanged: function(/*JSONObject*/ event) {
			Logger.trace("[MapHandler] Received onStatusChanged");
			for(var i=0; i < this.changeListeners.length; i++) {
				Logger.trace("[MapHandler] Calling listener " + i);
				this.changeListeners[i].onChangeStatus(event);
			}
		},
		
		addStatusChangedListener: function(/*OnChangeStatusListener*/ listener) {
			this.changeListeners.push(listener);
			Logger.trace("[MapHandler] added listener, count " + this.changeListeners.length);
		},
		
		removeStatusChangedListener: function(/*OnMapEventListener*/ listener) {
			var index = this.changeListeners.indexOf(listener);
			delete this.changeListeners[index];
			this.changeListeners.splice(index, 1);
		},

		setCurrentMarker : function(mapControl) {
			Logger.trace('MapHandler setCurrentMarker');
			mapControl.setCurrentMarker();
		},
		
		showmap : function(mapControl){
			Logger.trace('[MapHandler] showmap');
			localStorage.setItem("lastPreviousDialogOrientationPosition", this.isPortraitorLandScape());
			localStorage.setItem("getStatedMapDeviceOrientationPosition", this.isPortraitorLandScape());
			this.mapControl = mapControl;
			mapControl.showMap(this.useCurrentIndex);
		},
		
		isPortraitorLandScape : function() {
    	  var viewport = dojo.window.getBox();
    	  return  (viewport.h > viewport.w) ? "P" : "L";
      	},
		
		nextRecord: function(eventContext){
			if(!eventContext || !this.mapControl){
				return;
			}
			var resourceObject =  this.mapControl.getResource();
			if(!resourceObject){
				return;
			}
			var currentIndex = resourceObject.getCurrentIndex();
			var i = this.mapControl.markerIndexes.indexOf(currentIndex);
			if (i > -1) {
				i++;
				if (i < this.mapControl.markerIndexes.length) {
					this.disableDeviceOrientationChangedValiation(true);
					resourceObject.setCurrentIndex(this.mapControl.markerIndexes[i]);
					this.disableDeviceOrientationChangedValiation(false);
				}
			}
		},

		previousRecord: function(eventContext){
			if(!eventContext || !this.mapControl){
				return;
			}
			var resourceObject =  this.mapControl.getResource();
			if(!resourceObject){
				return;
			}
			var currentIndex = resourceObject.getCurrentIndex();
			var i = this.mapControl.markerIndexes.indexOf(currentIndex);
			if (i > -1) {
				i--;
				if (i >= 0) {
					this.disableDeviceOrientationChangedValiation(true);
					resourceObject.setCurrentIndex(this.mapControl.markerIndexes[i]);
					this.disableDeviceOrientationChangedValiation(false);
				}
			}
		},
		
		hideOnFirstRecord: function(eventContext) {
			if(!eventContext){
				return;
			}
			var display = false;
			if (this.mapControl  && this.mapControl.markerIndexes) {
				var resourceObject =  this.mapControl.getResource();
				if(resourceObject){
					var currentIndex = resourceObject.getCurrentIndex();
					var i = this.mapControl.markerIndexes.indexOf(currentIndex);
					display = (i > 0);
				}
			}
			eventContext.setDisplay(display);
		},

		hideOnLastRecord: function(eventContext) {
			if(!eventContext){
				return;
			}
			var display = false;
			if (this.mapControl  && this.mapControl.markerIndexes) {
				var resourceObject =  this.mapControl.getResource();
				if(resourceObject){
					var currentIndex = resourceObject.getCurrentIndex();
					var i = this.mapControl.markerIndexes.indexOf(currentIndex);
					display = (i < this.mapControl.markerIndexes.length - 1);
				}
			}
			eventContext.setDisplay(display);

		},

		disableOnFirstRecord: function(eventContext) {
			if(!eventContext){
				return;
			}
			var enable = false;
			if (this.mapControl && this.mapControl.markerIndexes) {
				var resourceObject =  this.mapControl.getResource();
				if(resourceObject){
					var currentIndex = resourceObject.getCurrentIndex();
					var i = this.mapControl.markerIndexes.indexOf(currentIndex);
					enable = (i > 0);
				}
			}
			eventContext.setEnabled(enable);
		},

		disableOnLastRecord: function(eventContext) {
			if(!eventContext){
				return;
			}
			var enable = false;
			if (this.mapControl  && this.mapControl.markerIndexes) {
				var resourceObject =  this.mapControl.getResource();
				if(resourceObject){
					var currentIndex = resourceObject.getCurrentIndex();
					var i = this.mapControl.markerIndexes.indexOf(currentIndex);
					enable = (i < this.mapControl.markerIndexes.length - 1);
				}
			}
			eventContext.setEnabled(enable);
		},
		getOrientationPosition: function(position) {
			var returnValue = null;
			var currentValue = position;
			if(currentValue.toUpperCase() === 'P' || currentValue.toUpperCase() === 'L' || currentValue.indexOf('DisableValidation') === 1) {
			  returnValue = currentValue;
			}
			return returnValue;
		},
		disableDeviceOrientationChangedValiation: function(action){
			var currentLastPreviousDialogOrientationPosition =  this.getOrientationPosition(localStorage.getItem("lastPreviousDialogOrientationPosition"));
			if (action){
				currentLastPreviousDialogOrientationPosition = currentLastPreviousDialogOrientationPosition+"DisableValidation";
			}else {
				currentLastPreviousDialogOrientationPosition = currentLastPreviousDialogOrientationPosition.charAt(0);
			}
			localStorage.setItem("lastPreviousDialogOrientationPosition",currentLastPreviousDialogOrientationPosition);
		}
	});
});
