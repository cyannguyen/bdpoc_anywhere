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

define("platform/handlers/spatial/LayersToolHandler", 
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
		
		userAuthenticationManager: null,
		layersOrganized: null,
		layersLoaded: null,
		
		constructor : function ( options ) {
			this.layersOrganized = {};
			this.layersLoaded = {};
			require( [
						"platform/auth/UserAuthenticationManager"
					], dojo.hitch( this, function ( authManager ) {
						this.userAuthenticationManager = authManager;
					} ) );
		},
		
		getMobileMaximoSpatialInstance: function() {
			var spatialMapHandler = WL.application["platform.handlers.spatial.SpatialMapHandler"];
			var mobileMaximoSpatial = spatialMapHandler["getMobileMaximoSpatialInstance"]();
			return mobileMaximoSpatial;
		},
		
		
		_buildLayerName: function(mapServerId, jsonMapServer, layerId) {
			if (this.layersOrganized[mapServerId] == null) {
				this.layersOrganized[mapServerId] = {};
				var layers = jsonMapServer.layers;
				array.forEach( layers, lang.hitch( this, function ( layer, i ) {
					this.layersOrganized[mapServerId][layer.id] = layer;
				}));
			}
			
			var layerSelected = this.layersOrganized[mapServerId][layerId];
			var layerName = layerSelected.name;
			var parentLayerId = layerSelected.parentLayerId;
			while (parentLayerId != null && parentLayerId != -1) {
				layerSelected = this.layersOrganized[mapServerId][parentLayerId];
				layerName = layerSelected.name + "-" + layerName;
				parentLayerId = layerSelected.parentLayerId;
			}
			return layerName;
			
			
		},
		
		createLayersList: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
			}
			this.layersLoaded = {};
			if (mobileMaximoSpatial != null) {
				
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				
				eventContext.application.showBusy();
				
				var layerResource = eventContext.application.getResource("layerResource");
				if (layerResource.data.length>0) {
					layerResource.data = [];
				}
				
				if (mobileMaximoSpatial.showingOnlineMap) {
					var mapServices = mobileMaximoSpatial.mapServices;
					if (mapServices != null) {
						array.forEach( mapServices, lang.hitch( this, function ( mapService, i ) {
							if (mapService.jsonlayers != null) {
								var jsonmapserver = JSON.parse(mapService.jsonmapserver);
								var jsonlayers = JSON.parse(mapService.jsonlayers);
								var defaultMapServiceVisible = mapService.visible;
								var mapServerId = mapService.identifier;
								this._createListResource(layerResource, mapServerId, jsonmapserver, true, jsonlayers, defaultMapServiceVisible);
							}
						}));
					}
				} else { // Build layers for Offline map
					var mapLayers = mobileMaximoSpatial.cacheLayers;
					mapLayers.forEach(lang.hitch(this, function(mapLayer, index, array) {
						
						if (mapLayer.isFromFileSystem) {
							var layerResourceDisp = layerResource.createNewRecord();
							
							if (mapLayer.isBasemap) {
								layerResourceDisp.set('layerLabel', 'Basemap');
								layerResourceDisp.set('layerId', 0);
								layerResourceDisp.set('mapServerId', -1);
							} else {
								var jsonMapService = mapLayer.jsonmapserver;
								var layerName = jsonMapService.name;
								layerResourceDisp.set('layerLabel', layerName);
								layerResourceDisp.set('layerId', mapLayer.layerId);
								layerResourceDisp.set('mapServerId', mapLayer.mapServiceId);
							}
							layerResourceDisp.set('layerVisibility', mapLayer.getVisible());
						} else {
							var mapServerId = mapLayer.mapServerId;
							if (mapServerId != null) {
								
								if (mapLayer.isBasemap) {
									var jsonmapserver = JSON.parse(mapLayer.jsonmapserver);
									var mapServerId = mapLayer.mapServerId;								
									this._createListResource(layerResource, mapServerId, jsonmapserver, false);
								} else {
									var jsonmapserver = JSON.parse(mapLayer.jsonmapserver);
									var layerId = mapLayer.layerId;
									var layerName = this._buildLayerName(mapServerId, jsonmapserver, layerId);	
									
									var layerKey = mapServerId + "|" + layerId;
									if (this.layersLoaded[layerKey] == null) {
										var layerResourceDisp = layerResource.createNewRecord();
										layerResourceDisp.set('layerLabel', layerName);
										layerResourceDisp.set('layerId', layerId);
										layerResourceDisp.set('mapServerId', mapServerId);
										
										var visibleLayers = mapLayer.visibleLayers;
										var childLayer = this._searchForChildLayer(jsonmapserver, layerId);
										var isCurrentLayerVisible = childLayer.defaultVisibility;
										if (visibleLayers != null) {
											if (visibleLayers.indexOf(layerId) == -1) {
												isCurrentLayerVisible = false;
											} else {
												isCurrentLayerVisible = true;
											}																								
										} else {
											mapLayer.visibleLayers = [layerId];
										}
										layerResourceDisp.set('layerVisibility', isCurrentLayerVisible);
										this.layersLoaded[layerKey] = true;
									} 
								}
							}
						}
					}));
					
				}
				
				
				
				eventContext.application.ui.show('MapView.layers');
				eventContext.application.hideBusy();
				
			} else {
				eventContext.application.hideBusy();				
				eventContext.application.showMessage(MessageService.createResolvedMessage('noMapManagerFound', [this.userAuthenticationManager.currentUserSite]));
			}
			
		},
		
		_searchForChildLayer: function(jsonMapServer, layerId) {
			var layers = jsonMapServer.layers;
			var childLayer = null;
			array.forEach( layers, lang.hitch( this, function ( layer, i ) {
				var currentLayerId = layer.id;
				if (currentLayerId == layerId) {
					childLayer = layer;
				}
			}));
			return childLayer;
		},
		
		_createListResource: function(layerResource, mapServerId, jsonmapserver, isOnline, jsonlayers, defaultMapServiceVisible) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var layers = jsonmapserver.layers;
			var defaultVisibleLayers = [];
			array.forEach( layers, lang.hitch( this, function ( layer, i ) {
				var layerId = layer.id;
				var isLayerAvailable = isOnline?false:true;
				
				if (jsonlayers != null) {
					array.forEach( jsonlayers, lang.hitch( this, function ( jsonlayer, i ) {
						if (jsonlayer.id == layerId) {
							isLayerAvailable = true;
						}						
					}))
				}
				
				if (isLayerAvailable) {
					if (layer.defaultVisibility == true && (defaultMapServiceVisible == null || defaultMapServiceVisible == true)) {
						defaultVisibleLayers.push(layerId);
					}
					if (layer.subLayerIds == null) {
						var layerName = this._buildLayerName(mapServerId, jsonmapserver, layerId);									
						var layerResourceDisp = layerResource.createNewRecord();
						layerResourceDisp.set('layerLabel', layerName);
						layerResourceDisp.set('layerId', layerId);
						layerResourceDisp.set('mapServerId', mapServerId);
						
						var mapLayers;
						if (isOnline == true) {
							mapLayers = mobileMaximoSpatial.map.getLayers();
						} else {
							mapLayers = mobileMaximoSpatial.cacheLayers;
						}
						
						mapLayers.forEach(lang.hitch(this, function(mapLayer, index, array) {
							var loopMapServerId;
							if (isOnline) {
								loopMapServerId = mapLayer.id;
							} else {
								loopMapServerId = mapLayer.mapServerId;
							}
							
							if (mapServerId == loopMapServerId) {
								var visibleLayers = mapLayer.visibleLayers;
								var isCurrentLayerVisible = layer.defaultVisibility && (defaultMapServiceVisible == null || defaultMapServiceVisible == true);
								if (visibleLayers != null) {
									if (visibleLayers.indexOf(layerId) == -1) {
										isCurrentLayerVisible = false;
									} else {
										isCurrentLayerVisible = true;
									}																								
								} else {
									mapLayer.visibleLayers = defaultVisibleLayers;
								}
								layerResourceDisp.set('layerVisibility', isCurrentLayerVisible);
								
							}
						}));
					}
				}
				
			}));
		},
		changeLayerVisibility: function(eventContext) {
			var currentRecord = eventContext.getCurrentRecord();
			
			var currentMapServerId = currentRecord.mapServerId;
			var layerId = currentRecord.layerId;
			var currentLayerVisibility = currentRecord.layerVisibility;
			
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				var layers;
				if (mobileMaximoSpatial.showingOnlineMap == true) {
					layers = mobileMaximoSpatial.map.getLayers();
				} else {
					layers = mobileMaximoSpatial.cacheLayers;
				}
				
				layers.forEach(lang.hitch(this, function(layer, index, array) {
					if (layer.isFromFileSystem) {
						if ((currentMapServerId == -1 && layer.isBasemap) || 
								(layer.layerId == layerId && layer.mapServiceId == currentMapServerId)) {
							layer.layersToolVisibility = currentLayerVisibility;
							layer.layersToolChangedIt = true;
						}
					} else {
						var mapServerId = layer.id || layer.mapServerId;
						if (currentMapServerId == mapServerId) {
							var visibleLayers = layer.visibleLayers;
							if (visibleLayers != null) {
								if (currentLayerVisibility == true) {
									if (visibleLayers.indexOf(layerId) == -1) {
										visibleLayers.push(layerId);
										layer.layersToolChangedIt = true;
									}
								} else {
									var index = visibleLayers.indexOf(layerId);
									if ( index > -1) {
										visibleLayers.splice(index, 1);
										layer.layersToolChangedIt = true;
									}
								}
							}
							
						}
					}
					
					
					
				}));				
			}
		},
					
	});
});
