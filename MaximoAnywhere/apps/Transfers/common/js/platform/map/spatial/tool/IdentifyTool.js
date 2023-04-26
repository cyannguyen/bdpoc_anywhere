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
 * This is the implementation for Identify tool.
 */

require( [
           "dojo/_base/declare", "dojo/parser", "dojo/ready",
           "dojo/Deferred",
           "dojo/_base/lang",
           "platform/logging/Logger",
           "platform/model/ModelService",
           "platform/store/_ResourceMetadataContext",
           "platform/map/spatial/security/TokenAuthentication",
           "platform/map/spatial/proxy/ProxyHelper",
           "platform/map/spatial/store/MaximoSpatialStore",
           "platform/translation/MessageService",
           "platform/comm/_ConnectivityChecker",
           "platform/map/MapGeoLocation",
           "platform/map/MapProperties",
           "dojo/_base/array",
           "dijit/Tooltip", "dijit/form/Button", 
           "dojo/Deferred", "dojo/date/locale", "dojo/promise/all",
           "dojo/dom-construct", "dojo/on", "dojo/query",
           "dojo/dom-class", "dojo/dom"
         ], function(declare, parser, ready, Deferred, lang,
        		 Logger, ModelService, ResourceMetaData, 
        		 TokenAuthentication, ProxyHelper, MaximoSpatialStore, MessageService, ConnectivityChecker,
        		 MapGeoLocation, MapProperties, array, Tooltip, Button,
        		 Deferred, locale, all, domConstruct, on, query, domClass, dom){

	declare( "platform.map.spatial.tool.IdentifyTool", null, {

		featuresSelected: null,
		currentFeature: null,
		painelId: null,
		attributes: null,
		map: null,
		highlightInterval: null,
		view: null,
		forEachFeatureAtPixelEvent: null,
		currentViewId: null,
		isHidden: true,
		proxyHelper: null,
		DPI: 72,
		
		constructor : function ( options ) {
			this.proxyHelper = new platform.map.spatial.proxy.ProxyHelper();
			this.featuresSelected = [];
			this.currentFeature = null;
			this.painelId = null;
			this.attributes = null;
			this.map = null;
			this.view = null;
			this.highlightInterval = null;
			this.isHidden = false;
		},
		
		getMobileMaximoSpatialInstance: function() {
			var spatialMapHandler = WL.application["platform.handlers.spatial.SpatialMapHandler"];
			var mobileMaximoSpatial = spatialMapHandler["getMobileMaximoSpatialInstance"]();
			return mobileMaximoSpatial;
		},
		
		getIdentifyTolerance: function() {
			return Number(MapProperties.getProperty('si.map.esri.identifyToolTolerance'));
		},
		
		_createFeatureDisplay : function (mapTarget) {
			
			this.view = WL.application.ui.getViewFromId("WorkExecution.MapView");
			this.currentViewId = WL.application.ui.getCurrentView().id;
			var displayFeatureDiv = domConstruct.create('div');
			displayFeatureDiv.setAttribute("id","feature-display-container"+this.currentViewId);
			displayFeatureDiv.setAttribute("class","feature-display-container feature-display-container-text");
			
			var attributesDiv = document.createElement('div');
			attributesDiv.setAttribute("id", "features-attributes-container"+this.currentViewId);
			displayFeatureDiv.appendChild(attributesDiv);
			
			var displayTotalFeatureDiv = domConstruct.create('div');
			displayTotalFeatureDiv.setAttribute("id","total-feature-display-container"+this.currentViewId);
			displayTotalFeatureDiv.setAttribute("class","feature-display-container total-feature-display-container");
			
			var hideFeatureDivButton = domConstruct.create('div');
			hideFeatureDivButton.setAttribute("id","hide-feature-display-button-container"+this.currentViewId);
			hideFeatureDivButton.setAttribute("class","hide-feature-display-button-container");
			hideFeatureDivButton.innerHTML = "X";
			
			var featureLegend = domConstruct.create('div');
			featureLegend.setAttribute("id","feature-legend-container"+this.currentViewId);
			featureLegend.setAttribute("class","feature-legend-container");
			
			
			on(displayFeatureDiv, 'click',lang.hitch(this, function() {
				var attributes = this.currentFeature.attributes;
				//When the div containing the Feature is clicked,we shoe featureAttributes View.
				//In order to do that, we get the featureAttributes resource object.
				var featureAttributesResource = WL.application.getResource('featureAttributes');
				if (featureAttributesResource.data.length>0) {
					featureAttributesResource.data = [];
				}
				var value = null;
				var title = null;
				if(featureAttributesResource != null){
				  for (var key in attributes) {
				      if (attributes.hasOwnProperty(key)) {
				    	  //for each feature attribute, we create another Row in the featureAttributes View,
				    	  //setting its label and value.
				        var featureAttributesDisp = featureAttributesResource.createNewRecord();
				        title = key;
				        value = attributes[key];
				        featureAttributesDisp.set('featureAttributeTitle', title);
				        featureAttributesDisp.set('featureAttributeValue', value);
				      }
				  }
				  featureAttributesResource.feature = this.currentFeature;
				}
				clearInterval( this.highlightCurrentFeature );
				var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				//Since our Resource is filled with Attributes rows, we can display the featureAttributes View
				WL.application.ui.show('MapView.featureAttributes');
			}))
			
			on(displayTotalFeatureDiv, "click", lang.hitch(this, function(){
				
				//If more then one feature was found by the Identify Tool, the user can access a list with all of them
				var identifyFeatureList = WL.application.getResource("identifyFeatureList");
				if (identifyFeatureList.data.length>0) {
					identifyFeatureList.data = [];
				}	
				var me = this;
				
				//Features will be included in the identifyFeatureList Resource Object, so then we can display the entire list.
				
				//The identifyFeatureList Resource will contain the updateFeature method, which will be used to update the feature from the Handler File.
				identifyFeatureList.updateFeature = lang.hitch( this, function ( featureToUpdate ){
					  //Updating the me.currentFeature variable, since it is used by highlight method
					  me.currentFeature = featureToUpdate;
					  me.centerAtFeature( featureToUpdate );
					  me.buildAttributesUsingFieldsName( featureToUpdate );
					  
					  //Updating the display Container with Feature DisplayField, its value and Feature Legend Image
					  var diFeatures = dojo.byId("feature-display-container" + this.currentViewId);
					  var legendContainer = dojo.byId("feature-legend-container" + me.currentViewId);
					  me.updateFeatureLegend( legendContainer , featureToUpdate);
					  var attributeName = featureToUpdate.displayFieldAlias;
					  var attributeValue = this.getAttributeValue( featureToUpdate.attributesFieldsName, featureToUpdate.displayField );
					  diFeatures.innerHTML = attributeName + " - " + attributeValue;		  
				});
				
				//Now We want to add each Selected Feature to the identifyFeatureList Resource
				array.forEach( this.featuresSelected, lang.hitch( this, function ( featureSelected, i ) {
					
					this.buildAttributesUsingFieldsName( featureSelected );
				    var attributeName = featureSelected.displayFieldAlias;
					var attributeValue = this.getAttributeValue( featureSelected.attributesFieldsName, featureSelected.displayField );
					  
					//For each feature, we create a new record in the Resource, containing feature attribute name, attribute value, and its layer
					var identifyFeatureListDisp = identifyFeatureList.createNewRecord();
					var layerName = featureSelected.attributes.layerName;
					identifyFeatureListDisp.set('attributeName', attributeName);
					identifyFeatureListDisp.set('attributeValue', attributeValue);
					identifyFeatureListDisp.set('layerName', layerName);
					identifyFeatureListDisp.feature = featureSelected;
				}));			

				var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				
				WL.application.ui.show('MapView.identifyListFeatures');
			 }));
			
			on(hideFeatureDivButton, 'click',lang.hitch(this, function() {
				//if the user clicks "x" (close button), we hide the Display Feature Container and
				// we also change isHidden to true so it stop highlighting in the map
				this.hideDialog();
			}));
			
			var mapDiv = dojo.byId(this.currentViewId);
			domConstruct.place(displayFeatureDiv, mapDiv, "last");
			domConstruct.place(hideFeatureDivButton, displayFeatureDiv, "before");
			domConstruct.place(featureLegend, displayFeatureDiv, "before");
			domConstruct.place(displayTotalFeatureDiv, displayFeatureDiv, "before");
			
			//since we constructed the identify Tool display Panel, we can star highlighting the selected feature
			this.highlightInterval = setInterval( lang.hitch( this , this.highlightCurrentFeature ) , 2000);
		},
		
		showDialog: function(features, featureSelected, showMoreFeatures) {
			console.log("showDialod for features");
			var featuresLength = features.length;
			var divMoreFeatures = dojo.byId("total-feature-display-container"+this.currentViewId);
			divMoreFeatures.innerHTML = "+" + featuresLength;
			
			//if we have more then one feature, we show the More Features Button
			if (showMoreFeatures == true) {
				if (divMoreFeatures!= null && !domClass.contains(divMoreFeatures, "showTotalFeaturesPanel")) {
		        	domClass.add(divMoreFeatures, "showTotalFeaturesPanel");	        	
		        }
			} else {
				if (divMoreFeatures!= null && domClass.contains(divMoreFeatures, "showTotalFeaturesPanel")) {
		        	domClass.remove(divMoreFeatures, "showTotalFeaturesPanel");	        	
		        }
			}
	
			this.buildAttributesUsingFieldsName( featureSelected );
			
			var diFeatures = dojo.byId("feature-display-container"+this.currentViewId);
			var diHideButton = dojo.byId("hide-feature-display-button-container"+this.currentViewId);
			var diFeatureLegendContainer = dojo.byId("feature-legend-container"+this.currentViewId);

			var attributeName = featureSelected.displayFieldAlias;
			var attributeValue = this.getAttributeValue( featureSelected.attributesFieldsName, featureSelected.displayField );
			
			//updating the Display Feature Container
			diFeatures.innerHTML = attributeName + " - " + attributeValue;
			//updating the Feature Legend Image
			this.updateFeatureLegend( diFeatureLegendContainer , featureSelected );
			
			if (diFeatures!= null && !domClass.contains(diFeatures, "showPanel")) {
	        	domClass.add(diFeatures, "showPanel");	
	        	domClass.add(diHideButton, "showPanel");
	        	domClass.add(diFeatureLegendContainer, "showPanel");
	        }		
			// We change isHidden to false so the the feature will be highlighted
			this.isHidden = false;
		},
		updateFeatureLegend : function ( featureLegendContainer , feature ){
			//We erase the featureLegendContainer, so we do not overlay the old feature image with the new one
			dojo.empty( featureLegendContainer );
			
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var drawingInfo = mobileMaximoSpatial._getFeatureJSONDrawingInfo( feature );
			var symbol = mobileMaximoSpatial._getSymbolByFeature( feature, drawingInfo );
			var imageData = null;
			if(symbol.contentType){
				var contentType = symbol.contentType;
				imageData = symbol.imageData;
			}
	
			
			if (imageData != null && imageData != undefined ) {
				//If we do Have imageData, then we can just build the img src url.
				var url = "data:" + contentType + ";base64," + imageData;
				var img = domConstruct.create('img');
				img.src = url;
				img.style["max-height"] = "30px";
				img.style["max-width"] = "30px";
				img.style["width"] = "100%";
				featureLegendContainer.appendChild( img );
		
			} else
			{
				//The rectSymbol object will represent the feature legend Image
				var rectSymbol = domConstruct.create('div');
				
				if ( symbol.outline != null) {
					//if we found the outline attribute inside symbol, it means we are not handling with a linear feature
					//In this case, we must use the outline symbol as it symbol.
					symbol = symbol.outline;		
				} 
				
				if(symbol.color){
					var color = symbol.color;
					rectSymbol.style.backgroundColor = "rgba(" + color[0] +","+ color[1] + ","+ color[2] + ", 1)";
				}

				rectSymbol.id = "feature-legend-rectangle-symbol";
				rectSymbol.style.width = symbol.width + "px";
				rectSymbol.innerHTML = " ";	
				featureLegendContainer.appendChild( rectSymbol );
			}
		},
		hideDialog : function() {
			this.isHidden = true;
			var divMoreFeatures = dojo.byId("total-feature-display-container"+this.currentViewId);
			var diFeatures = dojo.byId("feature-display-container"+this.currentViewId);
			var diHideButton = dojo.byId("hide-feature-display-button-container"+this.currentViewId);
			var diFeatureLegendContainer = dojo.byId("feature-legend-container"+this.currentViewId);
			
			if (divMoreFeatures != null && domClass.contains(divMoreFeatures, "showTotalFeaturesPanel")) {
	        	domClass.remove(divMoreFeatures, "showTotalFeaturesPanel");			        	
	        }
			if (diFeatures!= null && domClass.contains(diFeatures, "showPanel")) {
	        	domClass.remove(diFeatures, "showPanel");  	
	        }
			if (diHideButton!= null && domClass.contains(diHideButton, "showPanel")) {
	        	domClass.remove(diHideButton, "showPanel");
	        }
			if (diFeatureLegendContainer!= null && domClass.contains(diFeatureLegendContainer, "showPanel")) {
	        	domClass.remove(diFeatureLegendContainer, "showPanel");
	        }
			this.currentFeature = null;
		},
		
		findFeatures: function(map, isOnline, coordinate, evt, spatialReference, mapManager) {
			WL.application.showBusy();
			this.logEvent("isOnline " + isOnline);
			this.currentViewId = WL.application.ui.getCurrentView().id;
			this.map = map;
			this.featuresSelected = [];
			this.currentFeature = null;
			var tolerance = this.getIdentifyTolerance();
			if (isOnline == true) {
				var extent = map.getView().calculateExtent(map.getSize());
				var promises = [];
				var layers = map.getLayers().getArray();
				var layersToIdentify = [];
				for ( var iLayer = 0; iLayer < layers.length; iLayer++ ) {
					var layer = layers[ iLayer ];
					if (layer.isBasemap == false) {
						layersToIdentify.push(layer);
						//We will execute identifyFeature against each non-BaseMap layer
						var promise = this._identifyFeature(layer, extent, coordinate, tolerance, spatialReference, mapManager);
						promises.push(promise);
					}
				}
				all(promises).then(lang.hitch(this, function(resultsForEachLayer) {
					array.forEach( resultsForEachLayer, lang.hitch( this, function ( resultForEachLayer, i ) {
						if (resultForEachLayer.error != null) {
							WL.application.hideBusy();
							var errorMessage =  resultForEachLayer.error.message;
							WL.application.showMessage(errorMessage );
						} else {
							var layer = layersToIdentify[ i ];
							
							//For some layers the results is a string, for other it can be a JSON formated
							var results = resultForEachLayer.results;
							if (!results || typeof results === 'string' || results instanceof String) {
								results = JSON.parse(resultForEachLayer).results;
							}														
							array.forEach( results, lang.hitch( this, function ( feature, j ) {
								feature.layer = layer;
								feature.attributes.layerId = feature.layerId;
								feature.attributes.layerName = feature.layerName;
								//adding each returned feature to the this.featureSelected Array
								this.featuresSelected.push(feature);
							}))	
						}
												
					}));
					this.displayFeaturesInfo( this.featuresSelected, map );					
				}));
			} else {
				//If we're performing the identify action offline, we find the feature using the pixel, no promises are needed
				var pixel = evt.pixel;
				
				/**
				 * forEachFeatureAtPixel does not consider the hitTolerance if geometry is a line, in this case you need to click
				 * exactly on top of the feature. To avoid it we are increasing the pixel to select the feature
				 */ 
				var globalIds = {};
				var isLocalDB = false;
				promises = [];
				map.forEachFeatureAtPixel(pixel, lang.hitch(this, function(feature, layer) {	
					if (feature.isFromLocalSQLite == true) {
						isLocalDB = true;
						var dbInfo = feature.dbInfo;
						var oid = dbInfo.oid;
						var tableName = dbInfo.tableName;
						var filePath = dbInfo.filePath;
						var idColumnName = dbInfo.idColumnName;
						var layerId = dbInfo.layerId;
						feature.layer = layer;
						this.featuresSelected.push(feature);
						mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
						var promiseIdentifyLocalDB = mobileMaximoSpatial.spatialReplicaManager.findFeature(oid, tableName, filePath, idColumnName, layerId);
						promises.push(promiseIdentifyLocalDB);
						
						
					} else {
						var globalId = this.getObjectValue(feature.attributes, 'GlobalID');
						if (globalId != null && globalIds[globalId] == null) {
							globalIds[globalId] = true;
							this.featuresSelected.push(feature);
						}
					}
					
				}), {"hitTolerance": tolerance});
				
				if (isLocalDB) {
					all(promises).then(lang.hitch(this, function(resultsFeatures) {
						console.log("Result features ", resultsFeatures);
						
						this.featuresSelected.forEach(lang.hitch(this, function(featureSelected) {
							var dbInfo = featureSelected.dbInfo;
							var oid = dbInfo.oid;
							var idColumnName = dbInfo.idColumnName;
							
							resultsFeatures.forEach(lang.hitch(this, function(resultFeature) {
								var attributes = resultFeature.attributes;
								var resultOid = attributes[idColumnName];
								if (resultOid == oid) {
									var featureDBInfo = featureSelected.dbInfo;
									var geomColumn = featureDBInfo.geomColumn;
									var originalGeomColumn = featureDBInfo.originalGeomColumn;
									delete attributes[geomColumn];
									delete attributes[originalGeomColumn];
									featureSelected.attributes = attributes;
								}
							}));
							
						}));
						
						this.displayFeaturesInfo( this.featuresSelected, map );
					}))
				} else {
					this.displayFeaturesInfo( this.featuresSelected, map );
				}
					
				
			}
		},
		
		getObjectValue: function (obj, name) {
			var value = null;
			for(var prop in obj) { 
				   if (obj.hasOwnProperty(prop)) {
				       if (prop.toLowerCase() === name.toLowerCase()) {
				    	   value = obj[prop];
				       }
				   }
			}
		    return value;
		},
		
		displayFeaturesInfo: function(features, map) {
			var featuresLength = features.length;
			console.log("displayFeaturesInfo featuresLength" + featuresLength);
			if (featuresLength > 0) {
				
				this.currentFeature = features[0];
				this.centerAtFeature( this.currentFeature );
				
				var showTotal = false;
		        if (featuresLength > 1) {
		        	//if there's more then one, we will need to show the "+ N" Button
		        	showTotal = true;
		        } 
		        this.showDialog( features, this.currentFeature, showTotal );
		        
		    } else {
		    	//If no feature was returned, basically when user clicks the map again, we hide our dialog.
		    	this.hideDialog();
		    }
			WL.application.hideBusy();
		},
		getLayerGroup : function ( layerId, layerInfos ) {
			//Returns the layer Group based on layer's parent layer.
			if ( !layerInfos ) {
				return null;
			}
			var layerGroup = "";
			var layerInfo = undefined;
			for ( var i = 0; i < layerInfos.length; i++ ) {
				if ( layerInfos[ i ].id === layerId ) {
					layerInfo = layerInfos[ i ];
				}
			}
			if (layerInfo == null || layerInfo == undefined) {
				return null;
			}
			var parentLayerId = layerInfo.parentLayerId;
			while ( parentLayerId > -1 ) {
				var parentLayerInfo = undefined;
				for ( var i = 0; i < layerInfos.length; i++ ) {
					if ( layerInfos[ i ].id === parentLayerId ) {
						parentLayerInfo = layerInfos[ i ];
					}
				}
				
				layerGroup = parentLayerInfo.name + layerGroup;
				parentLayerId = parentLayerInfo.parentLayerId;
				if ( parentLayerId > -1 ) {
					layerGroup = "/" + layerGroup;
				}
			}
			if ( layerGroup == "" ) {
				layerGroup = null;
			}
			return layerGroup;
		},
		buildAttributesUsingFieldsName: function(feature) {
			//We run this method to create the variable "attributeFieldsName" inside the feature object.
			//This is necessary because the existent variable "attributes" inside the feature does not 
			//contains the attributeFields in the expected format
			
			var layer = feature.layer;
			var layerId = feature.attributes.layerId;
			var jsonMapServer = null;
			if (layer.jsonMapServer) {
				jsonMapServer = JSON.parse(layer.jsonMapServer);
			} else {
				jsonMapServer = layer.jsonmapserver;
			}
			 ;
			var layerGroup = this.getLayerGroup(layerId, jsonMapServer.layers);
			if (layerGroup != null) {
				feature.attributes.layerGroup = layerGroup;
			}
			var fields = [];
			if (layer.internalLayers) {
				var internalLayers = JSON.parse(layer.internalLayers);			
				array.forEach( internalLayers, lang.hitch( this, function ( internalLayer, i ) {
					if (internalLayer.id == layerId) {
						var details = internalLayer.details;
						feature.displayField = details.displayField;
						fields = details.fields;
					}		
				}));
			} else {
				feature.displayField = jsonMapServer.displayField;
				fields = jsonMapServer.fields
			}
			
			
			if (fields.length > 0) {
				var attributesFieldsName = {}
				var displayField = feature.displayField;
				array.forEach(fields, function(f, i) {
					if (f.name == displayField) {
						feature.displayFieldAlias = f.alias;
					}
					var aliasAttribute = feature.attributes[f.alias];
					if (aliasAttribute != null && aliasAttribute != undefined) {
						attributesFieldsName[f.name] = aliasAttribute;
					} else {
						aliasAttribute = feature.attributes[f.name];
						feature.attributes[f.alias] = aliasAttribute;
						attributesFieldsName[f.name] = aliasAttribute;
						delete feature.attributes[f.name];
					}
					
				}, this);
				attributesFieldsName['layerName'] = feature.attributes.layerName;
				attributesFieldsName['layerId'] = feature.attributes.layerId;
				if (feature.attributes.layerGroup) {
					attributesFieldsName['layerGroup'] = feature.attributes.layerGroup;
				}
				feature.attributesFieldsName = attributesFieldsName;
			}
		},
		highlightCurrentFeature: function (  ) {
			//If dialog is not Hidden, then we will highlight the current feature
			if ( this.isHidden == false ){
				var feature = this.currentFeature;
				if ( feature != undefined && feature != null   )
				{
					var point = null;
					if (feature.isFromLocalSQLite) {
						var geometry = feature.getGeometry();
						var extent = geometry.getExtent();
						var center = ol.extent.getCenter(extent);
						point = geometry.getClosestPoint(center);
					} else {
						if ( feature.geometry.x != null ) {
							//If geometry.x is not null, we have a point
							var x = feature.geometry.x;
							var y = feature.geometry.y;
							point = [x,y];
						
						}else if ( feature.geometry.paths != null )
						{	
							//If geometry.paths is not null, we have a line  
							var pointxy= [];
							var pointFeature = feature.geometry.paths;
							pointFeature.map((feat, indxA, arrayA) => { 
					  			if(feat.length > 0){
					    			feat.map((ft, indxB, arrayB) => {
						      			if(ft.length > 0) {
						        			pointxy.push(ft);
						        		}
						    		});
								}
							});
					
							var line = new ol.geom.LineString(pointxy);
							var extent = line.getExtent();
							var center = ol.extent.getCenter(extent);	
							point = line.getClosestPoint(center);;	
										
						}else if ( feature.geometry.rings != null )
						{
							//If geometry.rings is not null, we have a polygon 
							var rings = feature.geometry.rings;
							var point = rings[0][0];
						}
					}
					
					this.highlightPoint( point );
				}
			}			
		},
		highlightPoint: function ( point ) { 
			var x = point[0];
			var y = point[1];
			var coordinate = [x,y];
			//In order to create the highlight div in the exact position, 
			//we need the pixels, not the coordinates that come from feature Object
			var pixel = this.map.getPixelFromCoordinate(coordinate);
			var view = this.map.getView();

			if (pixel && pixel.length > 0) {
				var pixelX = pixel[0] ; 
				var pixelY = pixel[1] + 55;

				var highlightWidth = 50;
				var highlightHeight = 50;		
				var highlightDiv = domConstruct.create('div');
				highlightDiv.setAttribute("id","highlight-container");
				highlightDiv.setAttribute("class","highlight-container");
				highlightDiv.innerHTML = " ";
				highlightDiv.style.left = pixelX + "px";
				highlightDiv.style.top = pixelY + "px ";
				domConstruct.place(highlightDiv, this.currentViewId, "last");

				//Now we set an Interval which will be responsible for the fade out effect of the highlight div circle
				var count = 0.8;  
				highlightDiv.style.opacity = count;
				var time = setInterval(function () {
					if (count <= 0.005){
						clearInterval(time);
						highlightDiv.style.display = 'none';
						dojo.destroy(highlightDiv);
					}
					highlightDiv.style.opacity = count;
					highlightDiv.style.filter = 'alpha(opacity=' + count * 100 + ")";
					highlightDiv.style.width = highlightWidth + "px";
					highlightDiv.style.height = highlightHeight + "px";
					highlightWidth += 2;
					highlightHeight += 2;
					count -= count * 0.1;
				}, 50);
			}
			
		},
		centerAtFeature: function ( feature ){
			
			var point = null;
			
			if (feature.isFromLocalSQLite) {
				var geometry = feature.getGeometry();
				var extent = geometry.getExtent();
				var center = ol.extent.getCenter(extent);
				point = geometry.getClosestPoint(center);
			} else {
				if ( feature.geometry.x != null ) {
					var x = feature.geometry.x;
					var y = feature.geometry.y;
					point = [x,y];	
				
				}else if ( feature.geometry.paths != null )
				{	
					var pointxy= [];
					var pointFeature = feature.geometry.paths;
					pointFeature.map((feat, indxA, arrayA) => { 
					  	if(feat.length > 0){
					    	feat.map((ft, indxB, arrayB) => {
						      	if(ft.length > 0) {
						        	pointxy.push(ft);
						        }
						    });
						}
					});
					
					var line = new ol.geom.LineString(pointxy);
					var extent = line.getExtent();
					var center = ol.extent.getCenter(extent);	
					point = line.getClosestPoint(center);
				    	
				}else if ( feature.geometry.rings != null ) 
				{
					var rings = feature.geometry.rings;
					point = rings[0][0];
					
				}	
			}
				
			if (point != null) {
				this.map.getView().setCenter( point );		
			}
						
		},
		logEvent: function(msg) {
			Logger.trace(msg);
			console.log(msg);
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
		
		_identifyFeature: function(layer, extent, coordinate, tolerance, spatialReference, mapManager) {
			var deferred = new Deferred();
			
			var mapSize = this.map.getSize();
			
			var urlToRequest =  layer.url + "/identify?geometry="+ coordinate[0] + "%2C" + coordinate[1] + 
			"&geometryType=esriGeometryPoint&tolerance=" + tolerance + 
			"&mapExtent="+extent[0]+"%2C"+extent[1]+"%2C" + extent[2]+"%2C" +extent[3]+
			"&imageDisplay=" + mapSize[0] + "%2C" + mapSize[1] + "%2C" + this.DPI +
			"&returnGeometry=true&sr=" + spatialReference + "&f=json";
			
			var internalLayers = JSON.parse(layer.internalLayers);
			if (internalLayers.length > 0) {
				var layersToIdentify = ""
				var visibleLayers = layer.visibleLayers;
				
				array.forEach( internalLayers, lang.hitch( this, function ( internalLayer, i ) {
					var layerId = internalLayer.id;
					if (visibleLayers == null || (visibleLayers != null && visibleLayers.indexOf(layerId) > -1)) {
						layersToIdentify = layersToIdentify + layerId;
						if (i < internalLayers.length-1) {
							layersToIdentify = layersToIdentify + ",";
						}	
					}	
				}));
				
				if (layersToIdentify != "") {
					if (layersToIdentify.endsWith(",")) {
						layersToIdentify = layersToIdentify.replace(/,\s*$/, "");
					}
				}
				
				if (layersToIdentify == "") {
					layersToIdentify = "-1";
				}
				urlToRequest = urlToRequest + "&layers=visible:" + layersToIdentify;
				if (layer.token != null) {
					urlToRequest = urlToRequest + "&token=" + layer.token;
				}
				
				if (this.proxyHelper.isProxyEnabled(mapManager))
				{
					urlToRequest = urlToRequest+"&_MAXAUTH="+this.proxyHelper._getMaxAuthHeader();
				}
				
				this.logEvent('urlToRequest ' + urlToRequest);
				
				if (this.proxyHelper.isMobileFirstProxyEnabled()) {
					urlToRequest = this.proxyHelper.removeProxyURL(urlToRequest);
					var adapterPromise = this.proxyHelper.useAdapterProxy( urlToRequest, mapManager );
					adapterPromise.then(lang.hitch(this, function(result) {						
						if (result.status == 200 && result.responseText) {
							var dataJson = JSON.parse(result.responseText);
							deferred.resolve(dataJson);	
						} else {
							var errorJson = {};
						  	var msg = MessageService.createResolvedMessage('errorIdentifyLayer', [layer.layerName]);
							errorJson.error = {details: msg };
							deferred.resolve(JSON.stringify(errorJson));
						}
					}));
				} else {
					Logger.timerStart("IdentifyTool - _identifyFeature url " + urlToRequest);
					$.get( urlToRequest ).done(lang.hitch(this, function( data ) {
						Logger.timerEnd("IdentifyTool - _identifyFeature url " + urlToRequest);
						deferred.resolve(data);				
					})).fail(function(xhr, status, error) {
					  	var errorJson = {};
					  	var msg = MessageService.createResolvedMessage('errorIdentifyLayer', [layer.layerName]);
						errorJson.error = {details: msg };
						deferred.resolve(JSON.stringify(errorJson));
				    });
				}
				
				
				
			} else {
				deferred.resolve([]);
			}
			
			
			return deferred.promise;
		},
		
		

	});
});
