/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2016,2020
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
/*
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

;

/**
 * This is the implementation for MXSPATIAL provider.
 */

require( [
           "dojo/_base/declare", "dojo/parser", "dojo/ready",
           "dojo/Deferred",
           "dojo/_base/lang",
           "dojo/dom-class",
           "platform/logging/Logger",
           "platform/model/ModelService",
           "platform/store/_ResourceMetadataContext",
           "platform/map/spatial/security/TokenAuthentication",
           "platform/map/spatial/proxy/ProxyHelper",
           "platform/map/spatial/store/MaximoSpatialStore",
           "platform/map/spatial/tool/IdentifyTool",
           "platform/map/spatial/tool/SketchTool",
           "platform/map/spatial/SpatialTilePackageManager",
           "platform/map/spatial/SpatialReplicaManager",
           "platform/translation/MessageService",
           "platform/comm/_ConnectivityChecker",
           "platform/map/MapGeoLocation",
           "platform/map/MapProperties",
           "platform/util/PlatformConstants",
           "dojo/_base/array",
           "dijit/Tooltip", "dijit/form/Button",
           "dojo/Deferred", "dojo/date/locale", "dojo/promise/all",
           "dojo/dom-construct", "dojo/on",
           "platform/comm/CommunicationManager", "dojo/query", "dojo/dom-style",
           "platform/ui/util/OrientationManager",
           "platform/store/SystemProperties",
         ], function(declare, parser, ready, Deferred, lang, domClass,
        		 Logger, ModelService, ResourceMetaData,
        		 TokenAuthentication, ProxyHelper, MaximoSpatialStore, IdentifyTool, SketchTool, SpatialTilePackageManager, SpatialReplicaManager,  MessageService, ConnectivityChecker,
        		 MapGeoLocation, MapProperties, PlatformConstants, array, Tooltip, Button, Deferred, locale, all, domConstruct,
        		 on, CommunicationManager, query, domStyle, OrientationManager, SystemProperties){

	declare( "platform.map.spatial.MobileMaximoSpatial", null, {

		userAuthenticationManager : null,
		map : null,
		onlineControl : null,
		downloadControl : null,
		addReplicaControl: null,
		cacheLayers : null,
		overlayPanel: null,
		layers : null,
		_mapTarget: null,
		mapManager: null,
		mapServices: null,
		tokenAuthentication: null,
		openLayerMap: null,
		proxyHelper: null,
		maximoSpatialStore: null,
		expiredAreasAlreadyChecked: null,
		showingOnlineMap: null,
		identifyTool: null,
		sketchTool: null,
		onSingleClickHandler: null,
		moveEndHandler: null,
		offlineMoveEndHandler: null,
		showingWODetailPanel: null,
		woDetailStyles: null,
		orientationMode: null,
		offlineAreasLoaded: null,
		offlineAreaIdSelected: null,
		mapHandlerClass: null,
		identifyEnabled: null,
		zoomStatus: null,
		timeToCheckReplica: 4000,
		mapLoaded: null,
		stopCurrentJob: null,
		mapToolsLoaded: null,
		delayedOnMoveEnd: null,
		offlineQueryFeaturesDelay: null,
		lazyCheckReplicaSync: null,
		resolutions: null,
		/*
		 * Change this property to allow the user to load many offline areas,
		 * if the value is one, just the latest area clicked will be loaded,
		 */
		numberAreasOfflineAllowed: 1,
		spatialReplicaManager: null,

		constructor : function ( options ) {
			this.layers = [];
			this.mapToolsLoaded = {};
			this.woDetailStyles = {};
			this.offlineAreasLoaded = [];
			this.showingWODetailPanel = true;
			this.showingOnlineMap = true;
			this.expiredAreasAlreadyChecked = false;
			this.mapServices = [];
			this.cacheLayers = [];
			this.openLayerMap = options.openLayerMap;
			this.map = options.mapInstance;
			this.tokenAuthentication = new platform.map.spatial.security.TokenAuthentication();
			this.spatialReplicaManager = new platform.map.spatial.SpatialReplicaManager(this.openLayerMap.specificParameters["localMapUrl"]);
			this.proxyHelper = new platform.map.spatial.proxy.ProxyHelper();
			this.maximoSpatialStore = new platform.map.spatial.store.MaximoSpatialStore();
			this.identifyTool = new platform.map.spatial.tool.IdentifyTool();
			this.sketchTool = new platform.map.spatial.tool.SketchTool(this);
			this.fixMapFlag = null;
			OrientationManager.registerOrientationEventListener(this);
			this.orientationMode = OrientationManager.isPortrait();
			this.offlineQueryFeaturesDelay = Number(SystemProperties.getProperty(PlatformConstants.OFFLINE_QUERY_FEATURES_DELAY));
			this.mapHandlerClass = "platform.handlers.MapHandler";
			this.lazyCheckReplicaSync = false;
			require( [
				"platform/auth/UserAuthenticationManager"
			], dojo.hitch( this, function ( authManager ) {
				this.userAuthenticationManager = authManager;
			} ) );

			dojo.subscribe('_mapDone', lang.hitch(this,
					function() {
						this.setZoomStatus(null);
					}
			));

			dojo.subscribe('_fixMapDone', lang.hitch(this, this._fixMapDone));

			document.addEventListener("backbutton", lang.hitch(this, function(evt) {
				this.logEvent("[MobileMaximoSpatial] backbutton pressed! stopping current job " );
				this.stopCurrentJob = true;
			}), false);

		},

		onOrientationChanged: function() {
			//save previus orientation before changed device orientation. 
			//ie: New Orientation is Portrait return Landscape 
			var orientationMode = this.isPortrait() ? "L" : "P";
			localStorage.setItem("lastPreviousDialogOrientationPosition", orientationMode);
			this._fixMapDone({'showWOPanel':null});
		},
		
		isPortrait : function() {
    	  var viewport = dojo.window.getBox();
    	  return  (viewport.h > viewport.w) ? true : false;   	  
        },
		
		setZoomStatus: function(zoomStatus) {
			this.zoomStatus = zoomStatus;
		},

		_fixMapDone: function(param) {
			var newOrientationMode = OrientationManager.isPortrait();
			var mapErrorDivShown = query(".maperror");
			if ((param.showWOPanel == null && (this.orientationMode != newOrientationMode  || newOrientationMode == false))
					|| (param.showWOPanel == true && this.fixMapFlag == true)) {
					this.orientationMode = newOrientationMode;
					if( this.showingWODetailPanel != null &&
						this.showingWODetailPanel == false) {
						this._changeWODetailsPanel(true);
						setTimeout(lang.hitch(this, function(){
							this._changeWODetailsPanel(false);
							this.fixMapFlag = null;
						}), 500);

					}
			} else {
				if (mapErrorDivShown.length>0 && this.fixMapFlag == null) {
					this.fixMapFlag = true;
					this._fixMapDone({'forceRefresh':true});
				} else {
					var noMarkers = query(".mapDetailsNoMarkers");
					if (noMarkers.length>0 && this.fixMapFlag == null) {
						this.fixMapFlag = true;
						var mapHandler = window.UI.application["platform.handlers.MapHandler"];
						mapHandler.mapControl._fixMap(mapHandler.mapControl, this.showingWODetailPanel, false);
					}
				}
			}
			this.fixMapFlag = null;

		},

		syncCurrentMapSystemFile: function(offlineAreaId) {
			return this.spatialReplicaManager.syncOfflineMap(offlineAreaId, this);
		},

		/**
		 * Method to load the layers from the Map Manager parameter
		 * @param mapManagerInfo
		 * @param callbackFunction
		 */
		_loadLayers : function ( mapManagerInfo, callbackFunction ) {

			CommunicationManager.checkConnectivityAvailable().then(lang.hitch(this, function (isConnectionAvailable) {
		        if (isConnectionAvailable) {
		        	this.layers = [];
					var cacheLayers = [];

					var currentUserSite = this.userAuthenticationManager.currentUserSite;

		        	var deleteMapServiceCachePromise = this.maximoSpatialStore.deleteMapServicesCache();
					deleteMapServiceCachePromise.then( lang.hitch( this, function () {
						var mapServiceMeta = ResourceMetaData.getResourceMetadata( "plussmapservice" );
						mapServiceMeta.setWhereClause( "spi_spatial:mapname=\"" + mapManagerInfo.identifier +  "\"" );

						var mapServiceData = ModelService.all( 'plussmapservice', null, null, true );
						mapServiceData.then( lang.hitch( this, function ( mapserviceset ) {

								var urls = [];
								var failedServices = [];
								this.mapServices = mapserviceset.data;
								array.forEach( mapserviceset.data, lang.hitch( this, function ( serviceData ) {
									if (serviceData.jsonmapserver == null) {
										failedServices.push(serviceData);
									} else {
										urls.push(serviceData.url);
									}
								} ) );

								if (failedServices.length > 0) {
									array.forEach( failedServices, lang.hitch( this, function ( failedService ) {
										var servicename = failedService.servicename;
										var url = failedService.url;
										this.logEvent('The service could not be loaded, name: ' + servicename + ' | url: ' + url);
									} ) );
									WL.application.showMessage(MessageService.createStaticMessage('errorLoadingSomeLayer').getMessage());
								}

								if(urls.length>0) {
									console.log("Tokens calling ");
									var promise = this.tokenAuthentication.generateTokens(urls, this.mapManager, false);
									promise.then(lang.hitch(this, function(tokens) {
										console.log("Tokens returned " + tokens);
										for (var url in tokens) {

											var mapService = null;
											array.forEach( mapserviceset.data, lang.hitch( this, function ( serviceData, i ) {
												if (url == serviceData.url) {
													mapService = serviceData;
												}
											} ) );
											if (mapService) {
												 var token = tokens[url];
												 var tokenValue = token.tokenValue;
												 var newLayer = this._buildArcGISLayer(url, mapService, tokenValue, null);
												this.layers.push( newLayer );
											}
										}
										this.mapManager.mapServicesList = this.layers;

										if (callbackFunction) {
											callbackFunction();
										}
									}));
								} else {
									if (callbackFunction) {
										callbackFunction();
									}
								}
								ModelService.save(mapserviceset);
						} ) ).otherwise(function(e) {
							if (e.responseJSON.errors.length > 0) {
								var errorMsg = e.responseJSON.errors[0]['oslc:message'];
								console.error(errorMsg);
								WL.application.showMessage(errorMsg);
							}
			            });
					}));
		        } else {
		        	WL.application.showMessage(MessageService.createStaticMessage('deviceIsOffline').getMessage());
		        }
			}))




		},

		cleanLayers: function(offlineAreaId) {
			if (this.map) {
				var layers = this.map.getLayers();
				var length = layers.getLength();
				this.logEvent('Clean layers, length: ' + length);
				var layersToRemove = [];
                for (var i = 0; i < length; i++) {
                    var layer = layers.item(i);
                    if (layer!= null && layer.get("name") != 'markers' && (layer.url || layer.jsonmapserver)) {
                    	if (offlineAreaId == null ||  (offlineAreaId != null && layer.offlineAreaId == offlineAreaId)) {
                    		layersToRemove.push(layer);
                    	}

                    }
                }

                layersToRemove.forEach(lang.hitch( this, function ( layer, i ) {
                	var layerRemoved = this.map.removeLayer( layer );
                	this.logEvent('Clean layers, layerRemoved: ' + layerRemoved);
				}));


			}
		},

		_buildArcGISLayer: function(url, mapService, tokenValue, visibleLayers) {
			this.logEvent('Creating ArcGIS Layer for url: ' + url);
			var params = {};
			if (tokenValue != null) {
				console.log("Token generated for URL: ", url);
				console.log("New token generated: ", tokenValue);
				Logger.log("Token generated for URL: "+ url);
				Logger.log("New token generated: "+ tokenValue);
				params = {"token": tokenValue};
			}
			url = this.proxyHelper.includeProxyURLIfEnabled( url, this.mapManager );
			console.log("Layer URL to Load " + url);
			var source = null;
			var sourceSettings = {url : url, params: params};
			if (mapService.istiledlayer){
    			var jsonMapServer = JSON.parse(mapService.jsonmapserver);
    			if (jsonMapServer.tileInfo){
                	sourceSettings.url=sourceSettings.url + '/tile/{z}/{y}/{x}';
                	source = new ol.source.XYZ(sourceSettings);
            	} else {
                sourceSettings.ratio = 1;
                source = new ol.source.ImageArcGISRest(sourceSettings);
            	}
			}else {
    			source = new ol.source.TileArcGISRest(sourceSettings);
			}

            var originalTileLoadFunction = source.tileLoadFunction;
            source.tileLoadFunction = lang.hitch(this, function ( imageTile, src ) {

				var ignoreURL = false;
				var layerToShow = "";
				var layerIdsIncluded = [];
				var layers = this.map.getLayers();
				layers.forEach(lang.hitch( this, function ( layer, i ) {
					var tileUrl = imageTile.src_;
					if (tileUrl == null) {
						tileUrl = imageTile.key;
					}
					if (tileUrl.indexOf(layer.url) > -1) {
						var visibleLayers = layer.visibleLayers;

						if (layer.isBasemap == true && visibleLayers != null && visibleLayers.length == 0) {
							ignoreURL = true;
						}

						var internalLayers = JSON.parse(layer.internalLayers);
						array.forEach(internalLayers , lang.hitch( this, function ( internalLayer, i ) {
							var layerId = internalLayer.id;
							var defaultVisibility = (internalLayer.details == null)? true : internalLayer.details.defaultVisibility;
							if (((visibleLayers == null && defaultVisibility == true)
									|| (visibleLayers != null && visibleLayers.indexOf(layerId) > -1))
									&& layerIdsIncluded.indexOf(layerId)== -1) {
								layerToShow = layerToShow + layerId;
								layerIdsIncluded.push(layerId);
								if (i < internalLayers.length-1) {
									layerToShow = layerToShow + ",";
								}
							}

						}));
					}
				}));

				if (layerToShow != "") {
					if (layerToShow.endsWith(",")) {
						layerToShow = layerToShow.replace(/,\s*$/, "");
					}
				}

				if (layerToShow == "") {
					layerToShow = "-1";
				}
				src = src + "&layers=show:" + layerToShow;

				//Needs to remove the Spatial Reference because the BBOX points is already in the correct spatial reference.
				var newBBOXSR = "BBOXSR=" + this._getMapSpatialReferenceCode() + "&1";
				src = src.replace("BBOXSR", newBBOXSR);

				//For basemap the layers=show parameter does not work, it needs to modified the URL.
				if (ignoreURL == true) {
					src = "";
				} else {

					if (this.proxyHelper.isProxyEnabled(this.mapManager))
					{
						src = src+"&_MAXAUTH="+this.spatialReplicaManager._getMaxAuthHeader();
					}
				}


				if (this.proxyHelper.isMobileFirstProxyEnabled() && src != "") {
					var adapterPromise = this.proxyHelper.useImgAdapterProxy( src, this.mapManager );
					adapterPromise.then(lang.hitch(this, function(result) {
						var img = result.responseText;
						if (img && img.indexOf("image")>-1) {
							imageTile.getImage().src = img;
						}
					}));
				} else {
					return originalTileLoadFunction(imageTile, src);
				}
			});

			var opacity = (100-mapService.transparency)/100;
			var newLayer = null;
			if (mapService.istiledlayer){
				newLayer = jsonMapServer.tileInfo
                ? new ol.layer.Tile({
                    source: source,
                    opacity: opacity,
                    visible: mapService.visible
                })
                : new ol.layer.Image({
                    source,
                    opacity,
                    visible: mapService.visible,
			} );
			}else {
				newLayer = new ol.layer.Tile( {
					source : source,
					opacity: opacity,
					visible: mapService.visible
				} );		
			}
			
			newLayer.isBasemap = mapService.istiledlayer;
			newLayer.internalLayers = mapService.jsonlayers;
			newLayer.jsonFeatureServer = mapService.jsonfeatureserver;
			newLayer.jsonMapServer = mapService.jsonmapserver;
			newLayer.id = mapService.identifier;
			newLayer.url = url;
			newLayer.token = tokenValue;
			newLayer.name = mapService.servicename;
			newLayer.defaultOpacity = opacity;
			newLayer.defaultVisibility = mapService.visible;
			newLayer.order = mapService.serviceorder;

			return newLayer;
		},

		/**
		 * Method to create the Overlay component, used by the map.
		 */
		_createOverlay : function () {
			var popupelem = document.createElement('div');
			popupelem.setAttribute("id", "olpopup");
			popupelem.setAttribute("class", "ol-popup");

			var aelem = document.createElement('div');
			aelem.setAttribute("id", "popup-closer");
			aelem.setAttribute("class", "ol-popup-closer");
			aelem.innerHTML = "&#x274C;";

			var contentelem = document.createElement('div');
			contentelem.setAttribute("id", "popup-content");
			contentelem.setAttribute("class", "ol-popup-inner");

			popupelem.appendChild(contentelem);
			popupelem.appendChild(aelem);

			var mapElement = document.getElementById(this._mapTarget);

			mapElement.appendChild(popupelem);

			var container = document.getElementById('olpopup');
			var closer = document.getElementById('popup-closer');

			this.overlayPanel = new ol.Overlay( ( {
				element : container,
				autoPan : true,
				autoPanAnimation : {
					duration : 250
				},
				positioning : 'bottom-center'
			} ) );

			closer.onclick = lang.hitch(this, function() {
				this.overlayPanel.setPosition(undefined);
				closer.blur();
				return false;
			});
		},

		// Function to return the Map Spatial Reference code (4326, 3857, etc)
		_getMapSpatialReferenceCode: function() {

			var spatialReference = this.map.getView().getProjection().getCode();
			spatialReference = spatialReference.replace( /EPSG:/g, "" );
			//Consider the spatial reference configured on basemap
			array.forEach( this.layers, lang.hitch( this, function ( layer ) {
				if (layer.isBasemap) {
					var jsonMapServer = JSON.parse(layer.jsonMapServer);
					spatialReference = jsonMapServer.spatialReference.wkid;
				}
			}));

			return spatialReference;
		},

		onMapEvent: function(evt) {
			if(evt.type == "onIdentifyFeature" && this.identifyEnabled) {
				this.reloadLayersIfTokenExpired(lang.hitch(this, function() {
					var coordinate = evt.coordinate;
					this.logEvent("[MobileMaximoSpatial] onMapEvent - Executing Identify tool " + coordinate);

					spatialReference = this._getMapSpatialReferenceCode();
					this.logEvent('Find Features - Point: ' + coordinate + ' | spatialReference: ' + spatialReference);
					this.identifyTool.findFeatures( this.map, this.showingOnlineMap, coordinate, evt, spatialReference, this.mapManager );
				}));
			}
		},

		_addOnClickMap: function() {
			var mustEnableIdentify = true;
			var eventListeners = WL.application[this.mapHandlerClass].eventListeners;
			array.forEach( eventListeners, lang.hitch( this, function ( eventListener ) {
				if (eventListener._mapTarget != null) {
					mustEnableIdentify = false;
				}
			}))

			if (!this.identifyEnabled || mustEnableIdentify) {
				var mapHandler = WL.application[this.mapHandlerClass];
				mapHandler.addMapEventListener(this);
				this.identifyEnabled = true;
			}

		},

		disableClickEvents: function() {
			if (this.identifyEnabled) {
				var mapHandler = WL.application[this.mapHandlerClass];
				mapHandler.removeMapEventListener(this);
				this.identifyEnabled = false;
			}

		},

		enableClickEvents: function() {
			this._addOnClickMap();
		},

		getAttributeValue: function(obj, prop) {
			var value = null;
			prop = (prop + "").toLowerCase();
			for(var p in obj){
			    if(obj.hasOwnProperty(p) && prop == (p+ "").toLowerCase()){
			    		var value = obj[p];
			    		if (value == "Null") {
			    			value = "";
			    		}
			    		else
			    		{
			    			value = obj[p];
			    		}
			      }
			}
			return value;

		},

		_checkTPKConfigured: function() {
			var deferred = new Deferred();
			setTimeout(lang.hitch(this, function() {
				var localMapUrl = this.openLayerMap.specificParameters["localMapUrl"];
				if(localMapUrl){
					var checkTPKPathExists = SpatialTilePackageManager.checkTPKPathExists(localMapUrl);
					checkTPKPathExists.then(lang.hitch(this, function() {
						this.logEvent("TPK is configured and found it in the file system, url " + localMapUrl);
						deferred.resolve();
					})).otherwise(lang.hitch(this, function() {
						this.logEvent("TPK is NOT configured or was not found in the file system");
						deferred.reject();
					}))
				} else {
					deferred.reject();
				}
			}), 100);
			return deferred.promise;
		},

		_loadOfflineDataFromFileSystem: function(deferred) {
			this.cleanLayers();
			this._createLoadingIconOfflineFeatures();
			this.spatialReplicaManager.initializeOfflineMap();

			var promiseBasemap = this._loadBasemapUsingTPK();
			promiseBasemap.then(lang.hitch(this, function() {
				this._addOnClickMap();
				var promiseReplicas = this._loadReplicasFromFileSystem();
				promiseReplicas.then(lang.hitch(this, function() {
					WL.application.hideBusy();
					//WL.application.ui.hideCurrentView();
					dojo.publish('_closePercentDialog', []);
					this.showingOnlineMap = false;
					this.moveLayerToTop("plussSketchTool", this.spatialReplicaManager.maxZIndexAdded);
					this.moveLayerToTop("markers", this.spatialReplicaManager.maxZIndexAdded);
					this.maximoSpatialStore.updateMapConfig( this.showingOnlineMap );
					deferred.resolve();
				})).otherwise(lang.hitch(this, function(error) {
					WL.application.hideBusy();
					//WL.application.ui.hideCurrentView();
					dojo.publish('_closePercentDialog', []);
					deferred.reject(error);
				}))
			})).otherwise(lang.hitch(this, function(error) {
				WL.application.hideBusy();
				//WL.application.ui.hideCurrentView();
				dojo.publish('_closePercentDialog', []);
				deferred.reject(error);
			}))
		},

		/**
		 * Load the entire map from the TPK folder (basemap and geodatabases as well)
		 */
		loadOfflineMapFromTPK: function(ignoreReplicaCheck) {
			var deferred = new Deferred();
			if (ignoreReplicaCheck == null) {
				ignoreReplicaCheck = false;
			}

			if (ignoreReplicaCheck) {
				this.lazyCheckReplicaSync = true;
			}
			WL.application.ui.show('MapView.ProgressDownloadOfflineMap');
			dojo.publish('_updatePercentComplete', ['', 'loadingOfflineMap']);
			//Check expiration date
			if (this.expiredAreasAlreadyChecked == false && !ignoreReplicaCheck) {
				var promises = [];
				hasOfflineMapsExpired = false;

				var promiseOfflineArea = this.spatialReplicaManager.hasReplicasExpired(this);
				promiseOfflineArea.then(lang.hitch(this, function(hasExpired) {
					this.expiredAreasAlreadyChecked = true;
					if (hasExpired) {
						this.showingOnlineMap = true;
						WL.application.hideBusy();
						dojo.publish('_closePercentDialog', []);
						WL.application.ui.show('Platform.SyncRequired');
					} else {
						this._loadOfflineDataFromFileSystem(deferred);
					}
				}))

			} else {
				this._loadOfflineDataFromFileSystem(deferred);
			}

			return deferred.promise;
		},

		/**
		 * Creates the loading icon div
		 */
		_createLoadingIconOfflineFeatures: function() {

			var currentViewId = WL.application.ui.getCurrentView().id;
			var loadingFeaturesDiv = domConstruct.create('div');
			loadingFeaturesDiv.setAttribute("id","spatial-offline-map-features-loading"+currentViewId);
			loadingFeaturesDiv.setAttribute("class","spatial-offline-map-features-loading");

			var divLoadingIcon = document.createElement('div');
			divLoadingIcon.setAttribute("id","divLoadingIcon"+currentViewId);
			divLoadingIcon.setAttribute("class","spatial-offline-map-features-loading-btn");
			domConstruct.place(divLoadingIcon, loadingFeaturesDiv, "first");

			var mapDiv = dojo.byId(currentViewId);
			domConstruct.place(loadingFeaturesDiv, mapDiv, "last");
		},

		/**
		 * Change the loading div visibility
		 */
		_changeLoadingDivVisibility: function(show) {
			var currentViewId = WL.application.ui.getCurrentView().id;
			var divWarning = dojo.byId("spatial-offline-map-features-loading"+currentViewId);
			if (divWarning!= null) {
				if (show && !domClass.contains(divWarning, "showPanel")) {
					domClass.add(divWarning, "showPanel");
				} else {
					if (!show && domClass.contains(divWarning, "showPanel")) {
						domClass.remove(divWarning, "showPanel");
					}
				}
	        }

		},

		/**
		 * When TPK is configured the features will be loaded after a moveend event is triggered on the map
		 */
		_onMoveEnd: function() {
			var extent = this.map.getView().calculateExtent();
		    var bottomLeft = ol.extent.getBottomLeft(extent);
		    var topRight = ol.extent.getTopRight(extent);
		    var promises = [];
		    this._changeLoadingDivVisibility(true);
		    var date1 = new Date();
		    var offlineAreaOverlaps = this.searchOfflineAreaOverlapsCurrentExtent();
		    offlineAreaOverlaps.then(lang.hitch(this, function(offlineAreasIds) {
		     offlineAreasIds.forEach(lang.hitch(this, function(offlineAreasId) {
		    	 promises.push(this.spatialReplicaManager.getFeaturesByExtent(this, offlineAreasId));
		     }))

		     if (promises.length > 0) {
			    var self = this;
				all(promises).then(function(){
			    	var date2 = new Date();
			    	var diff = date2 - date1;
			    	var msg = "Time to get " + self.spatialReplicaManager.totalFeaturesAdded + " features: " + diff/1000 + " sec";
			    	Logger.trace(msg);
			    	console.log(msg);
			    	self._changeLoadingDivVisibility(false);
				}).otherwise(function(error){
					Logger.log("Error _onMoveEnd", error);
					self._changeLoadingDivVisibility(false);
				});
			 } else {
				 this._changeLoadingDivVisibility(false);
			 }
		    })).otherwise(lang.hitch(this, function() {
		    	this._changeLoadingDivVisibility(false);
			}));;


			if (this.lazyCheckReplicaSync) {
				console.log("Lazy check replica sync ");
				this.lazyCheckReplicaSync = false;
				if (this.expiredAreasAlreadyChecked == false) {
					var promiseOfflineArea = this.spatialReplicaManager.hasReplicasExpired(this);
					promiseOfflineArea.then(lang.hitch(this, function(hasExpired) {
						this.expiredAreasAlreadyChecked = true;
						if (hasExpired) {
							WL.application.hideBusy();
							dojo.publish('_closePercentDialog', []);
							WL.application.ui.show('Platform.SyncRequiredLazyCheck');
						}
					}))

				}
			}
		},

		/**
		 * TPK is configured and we need to load the features/tiles from the file system
		 */
		_loadReplicasFromFileSystem: function() {
			var deferred = new Deferred();
			if (this.offlineMoveEndHandler == null) {
				this.offlineMoveEndHandler = this.map.on('moveend', lang.hitch(this, function(evt) {
					if (this.delayedOnMoveEnd >= 0) {
				        clearTimeout(this.delayedOnMoveEnd);
				    }
					/*
					 * The onMoveEnd event is delayed by X seconds to avoid unnecessary queries, the default value is 1500 ms, but it can be changed on Anywhere Admin - global property -
					 * si.map.offline.queryFeaturesDelay
					 */
					this.delayedOnMoveEnd = setTimeout(lang.hitch(this, function(offlineAreasIds) {
						this._onMoveEnd();
					}), this.offlineQueryFeaturesDelay);
				 }));
			}

			if (this.offlineMoveStartHandler == null) {
				// When the move start is triggered we need to cancel the remaining requests since the extent is changed.
				this.offlineMoveStartHandler = this.map.on('movestart', lang.hitch(this, function(evt) {
					this.spatialReplicaManager.cancelCurrentSearch = true;
				 }));
			}
			this._onMoveEnd();

			deferred.resolve();
			return deferred.promise;

		},

		/**
		 * Load the basemap from TPK
		 */
		_loadBasemapUsingTPK: function() {
			var deferred = new Deferred();
			var localMapUrl = this.openLayerMap.specificParameters["localMapUrl"];
			var promiseLoadTPK = SpatialTilePackageManager.createTPKFileStore(localMapUrl, this.spatialReplicaManager.replicaFolderName);
			promiseLoadTPK.then(lang.hitch(this, function(maxZoom) {
				// It creates a a url just to execute the tileLoad function (mock), since the map is offline this url will never be reached
				var xyzproviderurl = "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
				var centerPoint = SpatialTilePackageManager.getTPKCenterPoint();
				this.updateMapView( centerPoint[0], centerPoint[1], maxZoom[1], null );
				var source = new ol.source.XYZ({
    					url: xyzproviderurl
    				});
				source.tileLoadFunction = function(imageTile, src) {

						var tilePoint = {};
						var tileCoord = imageTile.getTileCoord();
						tilePoint.z = tileCoord[0];
						tilePoint.x = tileCoord[1];
						tilePoint.y = (tileCoord[2] + 1) * -1;

						var promiseTile = SpatialTilePackageManager.getTileUrl(tilePoint);
						promiseTile.then(lang.hitch(this, function(tileSrc) {
							imageTile.getImage().src = tileSrc;
						}));



					imageTile.getImage().onerror = function(error){
						console.error(error);
					};

					imageTile.getImage().onload = function(){

					};
				};

				var baseCacheLayer = new ol.layer.Tile({
					source: source
				});
				baseCacheLayer.isBasemap = true;
				baseCacheLayer.isFromFileSystem = true;

				this.cacheLayers.unshift( baseCacheLayer );

				var layerIndex = this.map.getLayers().getLength();
				this.map.getLayers().insertAt(0, baseCacheLayer);
				baseCacheLayer.setZIndex(0);
				deferred.resolve();

			})).otherwise(lang.hitch(this, function(error) {
				deferred.reject(error);
			}));
			return deferred.promise;
		},

		downloadOfflineAreaMetaData: function(offlineAreaId) {
			return this.spatialReplicaManager.downloadOfflineAreaMetaData(this.mapManager, offlineAreaId);
		},

		moveLayerToTop: function(layerName, maxZIndex) {
			var layers = this.map.getLayers();
			var layersArray = layers.getArray();
			var indexes = [];
			if (layersArray != null) {
				array.forEach( layersArray , lang.hitch( this, function ( layer, i ){
					if(layer.get("name") == layerName) {
						indexes.push(i);
					}
				}));
				if (indexes.length > 0) {
					array.forEach( indexes , lang.hitch( this, function ( index, i ){
						var markerLayer = layers.removeAt(index);
						layers.push(markerLayer);
						if (maxZIndex) {
							markerLayer.setZIndex(maxZIndex+1);
						}
					}));

				}
			}
		},
		getResolutionFromScale: function(scale) {
			var units = this.map.getView().getProjection().getUnits();
			var dpi = 25.4 / 0.28;
			var mpu = ol.proj.Units.METERS_PER_UNIT[units];
			var resolution = scale/(mpu * 39.37 * dpi);
			return resolution
		},

		_createTextFeature: function(feature, jsonDrawingInfo){
			var labelingInfoArray = jsonDrawingInfo.labelingInfo;
			var style = null;
			array.forEach( labelingInfoArray, lang.hitch( this, function ( labelingInfo ) {
				var labelExpression = labelingInfo.labelExpression;
				labelExpression = labelExpression.substring(1, labelExpression.length-1);
				var symbol = labelingInfo.symbol;
				switch(symbol.type) {
					case "esriTS":
						var textValue = feature.attributes[labelExpression];
						if (textValue == null) {
							textValue = " ";
						}
						var fontFamily = symbol.font.family;
						var fontSize = symbol.font.size+1;
						var fontWeight = symbol.font.weight;
						var font = fontWeight + " " + fontSize + "px" + " " + fontFamily;
						style = new ol.style.Text({
							font: font,
							offsetX: symbol.xoffset,
							offsetY: symbol.yoffset,
					        fill: new ol.style.Fill({ color: '#000' }),
							text: textValue
			            });

						break;
					case "esriSLS":


						break;
					case "esriSMS":



						break;
					case "esriSFS":
						break;

				}

			}));

			return style;
		},
		_getFeatureJSONDrawingInfo: function ( feature ) {
			if (feature.layer.internalLayers) {
				var internalLayers = JSON.parse( feature.layer.internalLayers );
				var drawingInfo = null;
				array.forEach( internalLayers , lang.hitch( this, function ( internalLayer ){
					var internalLayerId = internalLayer.id;
					if ( feature.layerId == internalLayerId ) {
						var layerDetails = internalLayer.details;
						drawingInfo = layerDetails.drawingInfo;
					}
				}));
			} else {
				var jsonmapserver = feature.layer.jsonmapserver;
				drawingInfo = jsonmapserver.drawingInfo;
			}

			return drawingInfo;
		},
		_getStyleByFeature: function(feature, jsonDrawingInfo){
			var symbol = this._getSymbolByFeature(feature, jsonDrawingInfo);
			var style = null;
			if (symbol != null) {
				switch(symbol.type) {
					case "esriPMS":
						var width = Number(symbol.width)+5;
						var height = Number(symbol.height)+5;
					    var img = new Image();
					    img.src = 'data:'+symbol.contentType+';base64,'+symbol.imageData;

						style = new ol.style.Style({
							image: new ol.style.Icon({
								img: img,
								imgSize: [width, height],
								offset: [symbol.xoffset, symbol.yoffset]
				            })
				        });

						break;
					case "esriSLS":
						var arcgisColorArray = symbol.color;
						style = new ol.style.Style({
							stroke: new ol.style.Stroke({
								color: [arcgisColorArray[0],arcgisColorArray[1],arcgisColorArray[2],arcgisColorArray[3]/255],
								width: symbol.width
				            })
				        });
						break;
					case "esriSFS":
						var colorArray = symbol.color;
						var strokeColor = symbol.outline.color;
						var strokeWidth = symbol.outline.width;
						style = new ol.style.Style({
						    fill: new ol.style.Fill({
						      color: [colorArray[0],colorArray[1],colorArray[2],colorArray[3]/255]
						          }),
						    stroke: new ol.style.Stroke({
						      color: [strokeColor[0],strokeColor[1],strokeColor[2],strokeColor[3]/255],
						      width: strokeWidth
						          })
						});

						break;
				}
			}
			return style;
		},
		_getSymbolByFeature: function(feature, jsonDrawingInfo){
			var renderer = jsonDrawingInfo.renderer;
			var defaultSymbol = renderer.defaultSymbol;

			if (defaultSymbol == null) {
				defaultSymbol = renderer.symbol
			}

			var field = null;
			var attributeValue = null;

			var field1 = renderer.field1;
			var field2 = renderer.field2;
			var field3 = renderer.field3;

			if (field3 != null){
				field = field3;
			}
			if (field2 != null){
				field = field2;
			}
			if (field1 != null){
				field = field1;
			}

			var attributesFieldsName = feature.attributesFieldsName;
			if (attributesFieldsName == null) {
				this.identifyTool.buildAttributesUsingFieldsName( feature );
				attributesFieldsName = feature.attributesFieldsName;
			}
			
			
			var vectorFields = [attributesFieldsName[field1], attributesFieldsName[field2], attributesFieldsName[field3]];
			var attributeValue = '';
			vectorFields.map((m, index) => {
			  attributeValue = m !== null ? attributeValue + m + ',' : attributeValue;
			});

			attributeValue = attributeValue.replace(/,$/,'');
			

			//Search for a specific symbol
			var uniqueValueInfos = renderer.uniqueValueInfos;
			array.forEach( uniqueValueInfos, lang.hitch( this, function ( uniqueValueInfo ) {
				var value = uniqueValueInfo.value;
				var label = uniqueValueInfo.label;
				// IF the MapServer contains subtypes the label constains the value, so it's necessary to compare both (value and label)
				if (value == attributeValue || label == attributeValue) {
					defaultSymbol = uniqueValueInfo.symbol;
				}
			} ) );

			return defaultSymbol;

		},

		logEvent: function(msg) {
			Logger.trace(msg);
			console.log(msg);
		},

		deleteOfflineDataFromFileSystem: function(offlineAreaId) {
			return this.spatialReplicaManager.deleteOfflineData(offlineAreaId);
		},

		updateMapView: function(initialX, initialY, zoomLevel, resolutions) {
			var view = null;
			if (resolutions == null || resolutions.length == 0) {
				view = new ol.View( {
					center : [
							initialX, initialY
					],
					zoom : zoomLevel
				} )
			} else {
				view = new ol.View( {
					center : [
							initialX, initialY
					],
					zoom : zoomLevel,
					resolutions: resolutions
				} )
			}

			this.map.setView(view);

			if (this.moveEndHandler == null) {

				this.moveEndHandler = this.map.getView().on('propertychange', lang.hitch(this, function (e) {

					 switch (e.key) {
					      case 'resolution':
					    	  var view = this.map.getView();
					    	  var maxResolution = this.map.getView().getMaxResolution();
								var minResolution = this.map.getView().getMinResolution();
								var currentResolution = this.map.getView().getResolution();
							 	if (currentResolution < minResolution) {

							 		view.animate({
								          resolution: view.getResolution()
								        });
								    view.setResolution(minResolution);
								} else {
									if(currentResolution > maxResolution) {
										view.animate({
									          resolution: this.map.getView().getResolution()
									        });
									    view.setResolution(maxResolution);
									}
								}
					        break;
					   }


			    }));
			}

		},

		_prepateOnlineMap: function(gpsCoordinate, deferred, keepCurrentExtent) {
			var zoomLevel = null;
			var initialx = null;
			var initialy = null;

			if(keepCurrentExtent == null) {
				keepCurrentExtent = false;
			}

			var mapSite = this.mapManager.currentMapSite;
			if ( mapSite ) {
				zoomLevel = mapSite[ 'spi_spatial:zoomlevel' ];
				initialx = mapSite[ 'spi_spatial:initialx' ];
				initialy = mapSite[ 'spi_spatial:initialy' ];
			}
			if ((initialx == null || initialy == null) && gpsCoordinate != null) {
				initialx = gpsCoordinate[0];
				initialy = gpsCoordinate[1];
			}
			if (zoomLevel == null) {
				zoomLevel = 14;
			}
			if (this.map == null) {
				this.map = this._createOpenLayerMap(null, initialx, initialy, zoomLevel);
				this.map.addLayer(this.openLayerMap.glayer);
				this._addOnClickMap();
			}
			this.loadTools();
			var resolutions = [];
			var maxZoom = null;
			for ( var iLayer = 0; iLayer < this.layers.length; iLayer++ ) {
				var addLayer = this.layers[ iLayer ];
				if (addLayer.isBasemap) {
					var jsonMapServer = JSON.parse(addLayer.jsonMapServer);
					var tileInfo = jsonMapServer.tileInfo;
					if (tileInfo != null && this.resolutions == null) {
						this.resolutions = [];
						var lods = tileInfo.lods;
						array.forEach( lods, lang.hitch( this, function ( lod, i ) {
							this.resolutions.push(lod.resolution);
						}))

					}
				}
				addLayer.visibleLayers = null;
				this.map.getLayers().insertAt(iLayer, addLayer);
				this.reloadTileCache(addLayer);
			}

			if (!keepCurrentExtent) {
				var centerPoint = [initialx, initialy];
				this.updateMapView( centerPoint[0], centerPoint[1], zoomLevel, resolutions );
			}
			this.showingOnlineMap = true;

			deferred.resolve(true);
		},

		loadOnlineMap : function (keepCurrentExtent) {
			this.identifyTool.hideDialog();
			var deferred = new Deferred();
			console.log( "Online map shown at this time" );

			if (keepCurrentExtent == null) {
				keepCurrentExtent = false;
			}

			ConnectivityChecker.checkConnectivityAvailable().then(lang.hitch(this, function(isConnectionAvailable){
				if (isConnectionAvailable ) {

					this.cleanLayers();
					ol.Observable.unByKey(this.offlineMoveEndHandler);
					ol.Observable.unByKey(this.offlineMoveStartHandler);
					this.offlineMoveEndHandler = null;
					this.offlineMoveStartHandler = null;
					for ( var len = 0; len < this.cacheLayers.length; len++ ) {
						var removeCacheLayer = this.cacheLayers[ len ];
						this.cacheLayers.visibleLayers = null;
						this.map.removeLayer( removeCacheLayer );
					}
					this.cacheLayers = [];
					this.offlineAreasLoaded = [];
					if (this.mapManager == null) {
						this.loadMapManager(false, lang.hitch( this, function ( mapManagerInfo ) {
							this._loadLayers( this.mapManager, lang.hitch(this, function() {

								var promiseGPS = this.loadGPSPositionIfExtentNotAvailable(this.mapManager);
								promiseGPS.then(lang.hitch(this, function(jsonGeoLocObj) {
									if (jsonGeoLocObj != null) {
										this._prepateOnlineMap( jsonGeoLocObj, deferred, keepCurrentExtent );
									} else {
										this._prepateOnlineMap( null, deferred, keepCurrentExtent );
									}

								})).otherwise(lang.hitch(this, function(error){
									this.showingOnlineMap = false;
									WL.application.showMessage(error);
									deferred.resolve(false);
								}));

							}));

						} ),
						lang.hitch(this, function(errorMsg, errorDetails) {
							this.showingOnlineMap = false;
							var error = {errorMsg: errorMsg, errorDetails: errorDetails};
							deferred.resolve(error);
						}));
					} else {

						this._loadLayers( this.mapManager, lang.hitch(this, function() {
							var promiseGPS = this.loadGPSPositionIfExtentNotAvailable(this.mapManager);
							promiseGPS.then(lang.hitch(this, function(jsonGeoLocObj) {
								if (jsonGeoLocObj != null) {
									this._prepateOnlineMap( jsonGeoLocObj, deferred, keepCurrentExtent );
								} else {
									this._prepateOnlineMap( null, deferred, keepCurrentExtent );
								}

							})).otherwise(lang.hitch(this, function(error){
								this.showingOnlineMap = false;
								WL.application.showMessage(error);
								deferred.resolve(false);
							}));
						}));

					}


				} else {
					this.showingOnlineMap = false;
					WL.application.showMessage(MessageService.createStaticMessage('deviceIsOffline').getMessage())
					deferred.resolve(false);
				}
			}));
			return deferred.promise;



		},

		/**
		 * Method to refresh the layers updated by Layers tool.
		 */
		updateLayersToolChanges: function() {
			var deferred = new Deferred();
			setTimeout(lang.hitch(this, function(){
				var layers = this.map.getLayers();
				layers.forEach(lang.hitch(this, function(layer, index, array) {
					if (layer.isFromFileSystem && layer.layersToolChangedIt) {
						layer.layersToolChangedIt = null;
						var visible = layer.layersToolVisibility;
						var layerVisibility = layer.getVisible();
						if (visible != layerVisibility) {
							layer.setVisible(visible);
						}
						layer.layersToolVisibility = null;
					} else {
						if (layer.layersToolChangedIt == true) {
							layer.layersToolChangedIt = null;
							var visibleLayers = layer.visibleLayers;
							if (!this.showingOnlineMap) {
								if (layer.isBasemap) {
									if (visibleLayers != null && visibleLayers.length == 0) {
										layer.setVisible(false);
									} else {
										layer.setVisible(true);
									}
								} else {
									var layerId = layer.layerId;
									if (visibleLayers != null && (visibleLayers.length == 0 || visibleLayers.indexOf(layerId) == -1)) {
										layer.setVisible(false);
									} else {
										layer.setVisible(true);
									}
								}

							} else {
								if (visibleLayers != null || visibleLayers.length > 0) {
									layer.setVisible(true);
								} else {
									layer.setVisible(false);
								}
							}

							this.reloadTileCache(layer);

						}

					}

				}));

				if (layers && layers.getLength() > 0) {
					this._addOnClickMap();
				}
				deferred.resolve();
			}), 100);

			return deferred.promise;


		},

		reloadTileCache: function(layer) {
			//Force the reload the tiles already cached
			var source = layer.getSource();
			if (source) {
				if (typeof source.getTileLoadFunction == 'function') {
					var tileFunction = source.getTileLoadFunction();
					if (tileFunction) {
						source.setTileLoadFunction(tileFunction);
					}

				}
			}

		},

		/**
		 * Method to reload the layers with a new token if it expires
		 * @param callBackFuntion
		 */
		reloadLayersIfTokenExpired: function(callBackFuntion) {
			this._onMoveEnd();
			//It will check the Tokens only if security is enable on Map Manager
			if (this.mapManager != null &&
					this.mapManager.spatialtokensecurity != null && this.mapManager.spatialtokensecurity == true && this.showingOnlineMap) {
				var layers = this.map.getLayers();
				var layersIndex = [];
				var urlsToRequest = [];
				//This for search for layers expired and save its index to insert a renew one at the same position
				layers.forEach(lang.hitch(this, function(layer, index, array) {
					var url = layer.url;
					if (url) {
						url = this.proxyHelper.removeProxyURL(url);
						if (this.mapManager.spatialtokensecurity != null && this.mapManager.spatialtokensecurity == true) {
							var isTokenValid = this.tokenAuthentication.checkTokenCacheValid( url );
							if (isTokenValid == false) {
								layersIndex.push(index);
								urlsToRequest.push(url);
								console.log("Token expired for URL ", url);
								Logger.log("Token expired for URL " + url);
							}
						}
					}
			    }));

				if (urlsToRequest.length > 0 && this.mapManager != null) {
					// Generate the tokens
					var promise = this.tokenAuthentication.generateTokens(urlsToRequest, this.mapManager, true);
					promise.then(lang.hitch(this, function(tokens) {
						var i=0;
						for (var url in tokens) {
							array.forEach( urlsToRequest, lang.hitch( this, function ( urlToRequest, i ) {
								if (url == urlToRequest) {
									var mapService = null;
									array.forEach( this.mapServices, lang.hitch( this, function ( service ) {
										if (service.url == url) {
											mapService = service;
										}
									} ) );

									var layerIndex = layersIndex[i];
									var layerToRenew = layers.getArray()[layerIndex];

									var token = tokens[url];
								    var tokenValue = token.tokenValue;

								    var params = layerToRenew.getSource().getParams();
								    console.log("old token ", params.token);
								    params.token = tokenValue;
								    layerToRenew.token = tokenValue;
								    console.log("new token ", tokenValue);
								}
							} ) );
						}
						if (callBackFuntion) {
							callBackFuntion();
						}
					}));
				} else {
					if (callBackFuntion) {
						callBackFuntion();
					}
				}
			} else {
				if (callBackFuntion) {
					callBackFuntion();
				}
			}
		},


		_createOpenLayerMap: function (layers, initialx, initialy, zoomLevel) {
			if (initialx == null || initialy == null) {
				WL.application.showMessage(MessageService.createStaticMessage('gpsNotAvailable').getMessage())
			}
			if (zoomLevel == null) {
				zoomLevel = 14;
			}
			if (layers == null) {
				layers = [];
			}
			this._createOverlay();
			var mapInstance = new ol.Map( {
				moveTolerance: 5,
				layers : layers,
				target : this._mapTarget,
				view : new ol.View( {
					center : [
							initialx, initialy
					],
					zoom : zoomLevel

				} ),
				overlays : [
					this.overlayPanel
				],
				controls : []

			} );

			var spatialMapHandler = WL.application["platform.handlers.spatial.SpatialMapHandler"];
			spatialMapHandler.mobileMaximoSpatial = this;

			return mapInstance;
		},

		unloadTPKOfflineMap: function() {
			this.spatialReplicaManager._closeMetadataForAllReplicasAvaiable();
			SpatialTilePackageManager.unloadTPK();
			var currentViewId = WL.application.ui.getCurrentView().id;
			domConstruct.destroy("spatial-offline-map-features-loading"+currentViewId);

		},

		loadGPSPositionIfExtentNotAvailable: function(mapManager) {
			var deferred = new Deferred();
			setTimeout(lang.hitch(this, function(){
				var mapSite = mapManager.currentMapSite;
				if ( mapSite ) {
					zoomLevel = mapSite[ 'spi_spatial:zoomlevel' ];
					initialx = mapSite[ 'spi_spatial:initialx' ];
					initialy = mapSite[ 'spi_spatial:initialy' ];
				}

				if (initialx == null || initialy == null) {
					console.log("Getting GPS Location, initial extent is null");
					var promiseGPS = MapGeoLocation.getInstance().getGPSLocation();
					promiseGPS.then( lang.hitch( this, function ( jsonGeoLocObj ) {
						var long = jsonGeoLocObj.geolocation[ 'max:longitudex' ];
						var lat = jsonGeoLocObj.geolocation[ 'max:latitudey' ];
						var XYPoint = ol.proj.fromLonLat( [
								long, lat
						] );
						deferred.resolve(XYPoint);
					} ) ).otherwise( lang.hitch( this, function ( error ) {
						deferred.reject(error);
					} ) );
				} else {
					deferred.resolve([initialx,initialy]);
				}
			}), 100);

			return deferred.promise;
		},
		adjustFitForOfflineMap: function() {
			var checkTPK = this._checkTPKConfigured();
			checkTPK.then(lang.hitch(this, function() {
				this.moveLayerToTop("plussSketchTool", this.spatialReplicaManager.maxZIndexAdded);
				this.moveLayerToTop("markers", this.spatialReplicaManager.maxZIndexAdded);
			}))
		},

		_calculateExtentAndReturnOfflineAreas: function(mapManagerInfo) {
			var offlineAreasIds = [];
			if (mapManagerInfo) {
				var mapSite = mapManagerInfo.currentMapSite;
				if ( mapSite ) {
					var offlineAreas = mapSite['spi_spatial:oslcofflinearea'];
					array.forEach( offlineAreas, lang.hitch( this, function ( offlineArea, i ) {
						var mblExtent = JSON.parse(offlineArea['spi_spatial:mblextent']);
						var extent = mblExtent.extent;
						var spatialReference = mblExtent.spatialReference;
						var offlineAreaExtend = ol.extent.boundingExtent(extent[0]);

						var mapSpatialReference = this._getMapSpatialReferenceCode();
						var offlineAreaExtendMapSR = ol.proj.transformExtent(offlineAreaExtend,'EPSG:' + spatialReference,'EPSG:'+mapSpatialReference);

						var mapExtent = this.map.getView().calculateExtent(this.map.getSize());

						var extentIntersection = ol.extent.getIntersection(offlineAreaExtendMapSR, mapExtent);

						var isEmpty = ol.extent.isEmpty(extentIntersection);

						if (!isEmpty) {
							var offlineAreaId = offlineArea["spi_spatial:offlineareauid"];
							offlineAreasIds.push(offlineAreaId);
						}
					}))
				}
			}
			return offlineAreasIds;
		},

		searchOfflineAreaOverlapsCurrentExtent: function() {
			var deffered = new Deferred();
			setTimeout(lang.hitch(this, function() {
				var offlineAreasIds = [];
				var mapManagerInfo = this.mapManager;
				if (mapManagerInfo) {
					var mapSite = mapManagerInfo.currentMapSite;
					if ( mapSite ) {
						offlineAreasIds = this._calculateExtentAndReturnOfflineAreas(this.mapManager);
						deffered.resolve(offlineAreasIds);
					} else {
						deffered.reject();
					}
				} else {
					promiseLoadMapManager = this.loadMapManagerOffline();
					promiseLoadMapManager.then(lang.hitch( this, function ( ) {
						offlineAreasIds = this._calculateExtentAndReturnOfflineAreas(this.mapManager);
						deffered.resolve(offlineAreasIds);
					})).otherwise(lang.hitch( this, function ( ) {
						/* There is no map manager info, probably the device is offline and the map is opened for the first time,
						 * in this case loads all areas, layer the map will centralize in the Work order and this method will be executed again
						 */
						var promiseReplicaManager = this.spatialReplicaManager.getOfflineAreasAvailable();
						promiseReplicaManager.then(lang.hitch( this, function ( offlineAreas, i ) {
							deffered.resolve(offlineAreas);
						})).otherwise(lang.hitch( this, function ( ) {
							deffered.reject();
						}));
					}));

				}

			}), 100);
			return deffered.promise;

		},

		//Method to create the Map
		createMap : function ( target, callbackFunction, callbackErrorFunction ) {

			this._mapTarget = target;

			ConnectivityChecker.checkConnectivityAvailable().then(lang.hitch(this, function(isConnectionAvailable){
				console.log("Device is online? " + isConnectionAvailable);

				// Check the last configuration saved for the user, when they switch between online/offline this config is saved in plussmapconfig store.
				var promiseSavedShowingOnline = this.maximoSpatialStore.getMapConfig();
				promiseSavedShowingOnline.then(lang.hitch(this, function(mapConfig) {
					var loadOnline = true;
					if (mapConfig != null && mapConfig.json != null) {
						loadOnline = mapConfig.json.showingOnlineMap;
					}

					if (loadOnline == true && isConnectionAvailable ) {
						this.logEvent("Loading online map ");

						var promiseLoadOnline = this.loadOnlineMap(null);
						promiseLoadOnline.then(lang.hitch(this, function(result){
								if (result == true) {
									if (callbackFunction) {
										lang.hitch(this, callbackFunction(this.map));
									}
								} else {
									if (callbackErrorFunction) {
										callbackErrorFunction(result.errorMsg, result.errorDetails);
									}
								}
						}));
					} else { // Load offline map
						this.logEvent("Loading offline map ");

						var checkTPK = this._checkTPKConfigured();
						checkTPK.then(lang.hitch(this, function() {
							//Use default values to create the map, later the map will be centralized.
							ol.Observable.unByKey(this.offlineMoveEndHandler);
							ol.Observable.unByKey(this.offlineMoveStartHandler);
							this.offlineMoveEndHandler = null;
							this.offlineMoveStartHandler = null;
							var centerPoint = SpatialTilePackageManager.getTPKCenterPoint();
							this.map = this._createOpenLayerMap(null, centerPoint[0],centerPoint[1], 14);
							this.loadTools();
							this._addOnClickMap();

							var promises = [];
							var loadMetadataOfflineAreas = this.spatialReplicaManager._loadMetadataForAllReplicasAvaiable();
							loadMetadataOfflineAreas.then(lang.hitch(this, function(offlineAreasId) {
								this.loadOfflineMapFromTPK(true);
								this.moveLayerToTop("plussSketchTool");
								this.moveLayerToTop("markers");
								callbackFunction(this.map);
							})).otherwise(lang.hitch(this, function() {
								WL.application.ui.hideCurrentView();
								WL.application.showMessage(MessageService.createStaticMessage('noOfflineDataToShow').getMessage());
							}));
						})).otherwise(lang.hitch(this, function() {
							// No offline data configured, try to load the online if there is connectivity, if there isn't come back to the previous screen

							CommunicationManager.checkConnectivityAvailable().then(lang.hitch(this, function (isConnectionAvailable) {
						        if (isConnectionAvailable) {
						        	var promiseLoadOnline = this.loadOnlineMap(null);
									promiseLoadOnline.then(lang.hitch(this, function(result){
											if (result == true) {
												if (callbackFunction) {
													lang.hitch(this, callbackFunction(this.map));
												}
											} else {
												if (callbackErrorFunction) {
													callbackErrorFunction(result.errorMsg, result.errorDetails);
												}
											}
									}));
						        } else {
						        	WL.application.ui.hideCurrentView();
						        	WL.application.showMessage(MessageService.createStaticMessage('localMapNotConfigured').getMessage());
						        }
							}))

						}));
					}
				}));
			}));


		},

		hasOfflineDataToLoadFromTPK: function() {
			var deferred = new Deferred();
			var promises = [];
			promises.push(this.spatialReplicaManager._hasOfflineDataAvaiable());

			all(promises).then(function(){
				deferred.resolve();
			}).otherwise(function(error){
				 deferred.reject();
			});

			return deferred.promise;

		},

		loadTools: function() {
			var toolsAlreadyLoaded = this.mapToolsLoaded[this._mapTarget];
			if (toolsAlreadyLoaded == null) {
				this.identifyTool._createFeatureDisplay( this._mapTarget );
				this.sketchTool._createFeatureDisplay( this._mapTarget );
				this.mapToolsLoaded[this._mapTarget] = true;
			}

		},

		_searchAllChildren: function(node, componentsToChange) {
			var children = node.children;
			if (children != null) {
				dojo.forEach(children, lang.hitch(this, function(child){
					//Do not change <p> and the detail panel, just the map
					if (child.tagName != 'P' && child.className.indexOf('MapView_mapdetail_column') == -1 &&
							child.className.indexOf('MapView_row_1') == -1) {
						componentsToChange.push(child);
						this._searchAllChildren(child, componentsToChange);
					}

				}));
			}
		},

		_searchElementToChange: function(queryStatement, componentsToChange, addParent, showPanel, rootNode) {
			var key = null;
			if (addParent == null || addParent == false) {
				key = queryStatement;
			} else {
				key = queryStatement+"-parent";
			}

			if (!showPanel) {
				this.woDetailStyles = null;
			}


			var elements;
			if (rootNode == null) {
				elements = query(queryStatement);
			} else {
				elements = query(queryStatement, rootNode);
			}

			dojo.forEach(elements, lang.hitch(this, function(element, i)
					{
						var elementToChange = null;
						if (addParent == null || addParent == false) {
							elementToChange = element;
						} else {
							elementToChange = element.parentNode;
						}
						if (!showPanel && this.woDetailStyles == null) {
							this.woDetailStyles = {};
							var height = domStyle.get(elementToChange, "height");
							var width = domStyle.get(elementToChange, "width");
							this.woDetailStyles.height = height;
							this.woDetailStyles.width = width;
						}

						componentsToChange.push(elementToChange);
						this._searchAllChildren(elementToChange, componentsToChange);

					}));
		},

		/**
		 * Function to Show the WO Details
		 */
		showWODetailsPanel: function() {
			if (this.showingWODetailPanel == null || this.showingWODetailPanel == false) {
				this._changeWODetailsPanel(true);
			}
		},

		/**
		 * Function to Hide the WO Details
		 */
		hideWODetailsPanel: function() {
			if (this.showingWODetailPanel != null && this.showingWODetailPanel == true) {
				this._changeWODetailsPanel(false);
			}
		},

		_changeWODetailsPanel: function(showPanel) {
			this.showingWODetailPanel = showPanel;
			var isPortrait = OrientationManager.isPortrait();

			var display = "";
			var width  = "100%"

			if (showPanel) {
				display = "table-cell";
			} else {
				display = "none";
			}

			var mapViewRow1 = query(".MapView_mapdetail_column");
			dojo.forEach(mapViewRow1, function(row1)
			{
				domStyle.set(row1, "display", display);

			});

			var mapHandler = window.UI.application["platform.handlers.MapHandler"];
			mapHandler.mapControl.showMap(mapHandler.useCurrentIndex, this.showingWODetailPanel);

			if (!mapHandler.mapControl.hasWOCoordinates) {
				var divNoCoordinate = query(".map-error-nocoordinate ");
				dojo.forEach(divNoCoordinate, function(row1)
				{
					domStyle.set(row1, "display", display);

				});
				mapHandler.mapControl._fixMap(mapHandler.mapControl, this.showingWODetailPanel);
			}
		},

		loadMapManagerOffline: function() {
			var deferred = new Deferred();
			var mapmanagerdata = ModelService.all( 'plussmapmanager', null, null, false );
			mapmanagerdata.then( lang.hitch( this, function ( mapmanagerset ) {
				this.mapManager = null;
				var currentUserSite = this.userAuthenticationManager.currentUserSite;
				array.forEach( mapmanagerset.data, lang.hitch( this, function ( mapmanagerinfo ) {

					var mapsites = mapmanagerinfo.get( 'mapsiteslist' );
					array.forEach( mapsites, lang.hitch( this, function ( mapsite ) {
						var siteId = mapsite[ "spi_spatial:siteid" ];
						if ( currentUserSite == siteId ) {
							this.mapManager = mapmanagerinfo;
							this.mapManager.currentMapSite = mapsite;
						}
					} ) );

				} ) );

				if ( this.mapManager == null ) {
					// show message error - no Map manager found
					var errorMsg = "No Mobile MapManager record found for SITE= " + currentUserSite;
					console.error( errorMsg );
					deferred.reject();
				} else {
					console.log( "Map Manager found: " , this.mapManager );
					deferred.resolve(this.mapManager);

				}
				ModelService.save(mapmanagerset);

			} ) ).otherwise(function(e) {
				deferred.reject();
            });
			return deferred.promise;
		},

		//Method to load the Offline Map Manager created on Map Manager app (Maximo Side)
		loadMapManager : function (forceServerPreferred, callBackFunction, callBackErrorFunction ) {

			if (this.mapManager != null) {
				this.logEvent("[MobileMaximoSpatial] loadMapManager: Map manager already loaded, just return it" );
				if (callBackFunction) {
					callBackFunction( this.mapManager );
				}
			} else {

				CommunicationManager.checkConnectivityAvailable().then(lang.hitch(this, function (isConnectionAvailable) {
			        if (isConnectionAvailable) {
			        	var currentUserSite = this.userAuthenticationManager.currentUserSite;
						var mapManagerMeta = ResourceMetaData.getResourceMetadata( "plussmapmanager" );
						mapManagerMeta.setWhereClause( "spi_spatial:ismobile=1 and spi_spatial:active=1" );


						var deleteMapManagerCachePromise = this.maximoSpatialStore.deleteMapManagerCache();
						deleteMapManagerCachePromise.then( lang.hitch( this, function () {
							var mapmanagerdata = ModelService.all( 'plussmapmanager', null, null, true );
							mapmanagerdata.then( lang.hitch( this, function ( mapmanagerset ) {
								this.mapManager = null;
								array.forEach( mapmanagerset.data, lang.hitch( this, function ( mapmanagerinfo ) {

									var mapsites = mapmanagerinfo.get( 'mapsiteslist' );
									array.forEach( mapsites, lang.hitch( this, function ( mapsite ) {
										var siteId = mapsite[ "spi_spatial:siteid" ];
										if ( currentUserSite == siteId ) {
											this.mapManager = mapmanagerinfo;
											this.mapManager.currentMapSite = mapsite;
											var remoteId = this.mapManager.remoteid;
											var maximoAddress = remoteId.substring(0, remoteId.indexOf("/maximo/")) + "/maximo";
											this.mapManager.maximoAddress = maximoAddress;

										}
									} ) );

								} ) );

								if ( this.mapManager == null ) {
									// show message error - no Map manager found
									var errorMsg = "No Mobile MapManager record found for SITE= " + currentUserSite;
									console.error( errorMsg );
									if (callBackErrorFunction) {
										callBackErrorFunction( "noMapManagerFound", currentUserSite );
									}
								} else {
									console.log( "Map Manager found: " , this.mapManager );
									if (callBackFunction) {
										callBackFunction( this.mapManager );
									}

								}
								ModelService.save(mapmanagerset);

							} ) );
						}));
			        } else {
			        	var errorMsg = "No connectivity available to load the map manager ";
						console.error( errorMsg );
						if (callBackErrorFunction) {
							callBackErrorFunction( "noConnectivity", null );
						}
			        }
				}))

			}


		},

		measureUnitToLabel: function(measureUnit) {
			measureUnit = measureUnit.trim().toUpperCase();
			var measureLabel = measureUnit;
			switch (measureUnit)
			{
			case "SQUARE_METERS":
				measureLabel = 'sq m'
				break;
			case "SQUARE_KMS":
				measureLabel = 'sq km';
				break;
			case "SQUARE_FEET":
				measureLabel = 'sq ft';
				break;
			case "SQUARE_MILES":
				measureLabel = 'sq mi';
				break;
			case "SQUARE_YARD":
				measureLabel = 'sq yd';
				break;
			case "ACRES":
				measureLabel = 'ac';
				break;
			case "HECTARES":
				measureLabel = 'ha';
				break;

			case "METERS":
				measureLabel = 'm'
				break;
			case "KM":
				measureLabel = 'km';
				break;
			case "FEET":
				measureLabel = 'ft';
				break;
			case "MILES":
				measureLabel = 'mi';
				break;
			case "YARDS":
				measureLabel = 'yd';
				break;
			default:
				break;
			}
			return measureLabel;
		},
		convertMeasures: function(fromMeasure, toMeasure, measure) {
			if (fromMeasure == toMeasure) {
				return measure;
			}
			fromMeasure = fromMeasure.trim().toUpperCase();
			// This first switch converts the measure to METER
			switch (fromMeasure)
			{
			case "METERS":
				measure = measure * 1;
				break;
			case "KMS":
				measure = measure * 1000;
				break;
			case "FEET":
				measure = measure * 0.305;
				break;
			case "MILES":
				measure = measure * 1609.347;
				break;
			case "YARDS":
				measure = measure * 0.9144;
				break;
			default:
				break;
			}

			toMeasure = toMeasure.trim().toUpperCase();
			// This second switch converts the measure from METER to destiny
			switch (toMeasure)
			{
			case "METERS":
				measure = measure * 1;
				break;
			case "KMS":
				measure = measure * 0.001;
				break;
			case "FEET":
				measure = measure * 3.28084;
				break;
			case "MILES":
				measure = measure * 0.000621371;
				break;
			case "YARDS":
				measure = measure * 1.09361;
				break;
			default:
				break;
			}

			return measure;
		},

		convertAreaMeasures: function(fromMeasure, toMeasure, measure) {
			if (fromMeasure == toMeasure) {
				return measure;
			}
			fromMeasure = fromMeasure.trim().toUpperCase();
			// This first switch converts the measure to METER
			switch (fromMeasure)
			{
			case "SQUARE_METERS":
				measure = measure * 1;
				break;
			case "SQUARE_KMS":
				measure = measure * 1000000;
				break;
			case "SQUARE_FEET":
				measure = measure * 0.092903;
				break;
			case "SQUARE_MILES":
				measure = measure * 2590000;
				break;
			case "SQUARE_YARDS":
				measure = measure * 0.836127;
				break;
			case "ACRES":
				measure = measure * 4046.86;
				break;
			case "HECTARES":
				measure = measure * 10000;
				break;
			default:
				break;
			}

			toMeasure = toMeasure.trim().toUpperCase();
			// This second switch converts the measure from METER to destiny
			switch (toMeasure)
			{
			case "SQUARE_METERS":
				measure = measure * 1;
				break;
			case "SQUARE_KMS":
				measure = measure * 0.000001;
				break;
			case "SQUARE_FEET":
				measure = measure * 10.7639;
				break;
			case "SQUARE_MILES":
				measure = measure * 0.0000003861;
				break;
			case "SQUARE_YARD":
				measure = measure * 1.195983360717;
				break;
			case "ACRES":
				measure = measure * 0.000247105;
				break;
			case "HECTARES":
				measure = measure * 0.0001;
				break;
			default:
				break;
			}

			return measure;
		},


		downloadOfflineAreaFromMapManager: function(offlineAreaId) {
			return this.spatialReplicaManager.downloadOfflineMap(this, offlineAreaId);
		},


	});
});
