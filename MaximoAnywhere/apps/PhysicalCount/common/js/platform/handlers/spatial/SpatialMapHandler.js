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

define("platform/handlers/spatial/SpatialMapHandler", 
		[ "dojo/_base/declare",
		  "dojo/promise/all",
		  "platform/model/ModelService", 
          "platform/store/_ResourceMetadataContext",
		  "platform/model/ModelData",
		  "platform/model/ModelDataSet",
		  "platform/handlers/_ApplicationHandlerBase",
          "platform/translation/SynonymDomain",
 	      "platform/comm/CommunicationManager",
		  "platform/auth/UserManager",
		  "platform/translation/MessageService",
		  "dojo/_base/lang",
		  "platform/exception/PlatformRuntimeException",
		  "platform/warning/PlatformRuntimeWarning",
		  "platform/util/PlatformConstants",
		  "platform/logging/Logger",
		  "platform/map/MapGeoLocation",
		  "platform/map/spatial/MobileMaximoSpatial",
		  "platform/map/spatial/store/MaximoSpatialStore",
		  "platform/map/MapProperties",
		  "dojo/_base/array","dojo/promise/all", "dojo/Deferred",
		  "dojo/date/locale"], 
  function(declare, all, ModelService, ResourceMetaData, ModelData, ModelDataSet, ApplicationHandlerBase, SynonymDomain, CommunicationManager,
		  UserManager, MessageService, lang, PlatformRuntimeException,
PlatformRuntimeWarning, PlatformConstants, Logger, MapGeoLocation, MobileMaximoSpatial, 
MaximoSpatialStore, MapProperties, array, all, Deferred, locale) {
	return declare(ApplicationHandlerBase, {
		
		constructor : function ( options ) {
			
		},
		
		getLastMapViewId: function(){
			var mapId = null;
     	    if(WL.application.ui.viewHistory && WL.application.ui.viewHistory.length > 0){
     	    	var len = WL.application.ui.viewHistory.length;     	    	
     	    	for(i=len-1; i>=0; i--) {
     	    		var viewId = WL.application.ui.viewHistory[i].id;
     	    		var view = WL.application.ui.getViewFromId(viewId);
     	    		view.children.forEach(function(elem, pos, array){
                     	if(elem._controlType == "Map"){
                     		mapId = viewId;
                        }
                      });
        		}
            }
            return mapId;
        },
		
		getMobileMaximoSpatialInstance: function() {
			Logger.trace("[SpatialMapHandler] getMobileMaximoSpatialInstance viewId " + viewId);
			var spatialMapHandler = this;
			var mobileMaximoSpatial = spatialMapHandler['mobileMaximoSpatial'];
			if (mobileMaximoSpatial == null) {
				var viewId = this.getLastMapViewId();
				mobileMaximoSpatial = spatialMapHandler['mobileMaximoSpatial' + viewId];
			}
			return mobileMaximoSpatial;
		},
		
		
		showTool: function(eventContext) {
			var provider = MapProperties.getProperty('provider');
			Logger.trace("[SpatialMapHandler] showTool provider: " + provider);
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				Logger.trace("[SpatialMapHandler] mobileMaximoSpatial map manager provider: " + mobileMaximoSpatial.openLayerMap.mapManager.mapprovider);
				if (provider == MapProperties.ANYWHERE_PROVIDER_MAPMANAGER && 
						mobileMaximoSpatial.openLayerMap.
						mapManager.mapprovider.toLowerCase() == MapProperties.MAPMANAGER_PROVIDER_SPATIAL) {
					eventContext.setDisplay(true);
				} else {
					eventContext.setDisplay(false);
				}
			} else {
				Logger.trace("[SpatialMapHandler] mobileMaximoSpatial is null! ");
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
						
		},
		
		isShowingWODetailPanel: function(eventContext) {
			var showingWODetailPanel = true;
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				showingWODetailPanel = mobileMaximoSpatial.showingWODetailPanel;
				eventContext.setDisplay(showingWODetailPanel);
			} else {
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
			
		},
		
		isHidingWODetailPanel: function(eventContext) {
			var showingWODetailPanel = true;
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				showingWODetailPanel = mobileMaximoSpatial.showingWODetailPanel;
				eventContext.setDisplay(!showingWODetailPanel);
			} else {
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
			
		},
		
		
		hideWOPanel: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				mobileMaximoSpatial.hideWODetailsPanel();
			}
			
		},
		
		showWOPanel: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				mobileMaximoSpatial.showWODetailsPanel();
			}
			
		},
					
	});
});
