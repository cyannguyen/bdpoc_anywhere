/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2017,2020
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
 * This is the implementation for Sketch tool.
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
           "platform/store/SystemProperties",
           "platform/util/PlatformConstants",
           "platform/translation/MessageService",
           "platform/comm/_ConnectivityChecker",
           "platform/map/MapGeoLocation",
           "platform/map/MapProperties",
           "dojo/_base/array",
           "dijit/Tooltip", "dijit/form/Button", 
           "dojo/Deferred", "dojo/date/locale", "dojo/promise/all",
           "dojo/dom-construct", "dojo/on", "dojo/query",
           "dojo/dom-class", "dojo/dom", "dijit/focus"
         ], function(declare, parser, ready, Deferred, lang,
        		 Logger, ModelService, ResourceMetaData, 
        		 TokenAuthentication, ProxyHelper, MaximoSpatialStore, 
        		 SystemProperties, PlatformConstants, 
        		 MessageService, ConnectivityChecker,
        		 MapGeoLocation, MapProperties, array, Tooltip, Button,
        		 Deferred, locale, all, domConstruct, on, query, domClass, dom, focusUtil){

	declare( "platform.map.spatial.tool.SketchTool", null, {

		mobileMaximoSpatial: null,
		sourceLayer: null,
		vectorLayer: null,
		drawTool: null,
		onClickEvent: null,
		onClickAddText: null,
		addTextOnBlurFlag: null,
		featuresCount: null,
		finishDrawingFlag: null,
		measuresEnabled: null,
		isOpened: null,
		sketchConfig: null,
		featuresArray: null,
		childrenFeaturesArray: null,
		isCurrentSketchSaved: null,
		parentIdField: 'plussParentId',
		idField: 'plussId',
		textField: 'plussText',
		textRotationField: 'plussTextRotation',
		canExportField: 'plussCanExport',
		currentSketchOpened: null,
		
		constructor : function ( mobileMaximoSpatial ) {
			this.mobileMaximoSpatial = mobileMaximoSpatial;
			this.featuresCount = 0;
			this.measuresEnabled = false;
			this.isOpened = false;
			this.isCurrentSketchSaved = true;
			this.currentSketchOpened = null;
		},
		
		
		radians: function(n) {
		    return n * (Math.PI / 180);
		},
		 
		degrees: function(n) {
		    return n * (180 / Math.PI);
		},
		 
		bearing: function(pt0, pt1) {
			start_lat = this.radians(pt0[1]);
		    start_long = this.radians(pt0[0]);
		    end_lat = this.radians(pt1[1]);
		    end_long = this.radians(pt1[0]);
		 
		    var dlong = end_long - start_long;
		 
		    var dphi = Math.log(Math.tan(end_lat / 2.0 + Math.PI / 4.0) /
		            Math.tan(start_lat / 2.0 + Math.PI / 4.0));
		    if (Math.abs(dlong) > Math.PI) {
		        if (dlong > 0.0)
		            dlong = -(2.0 * Math.PI - dlong);
		        else
		            dlong = (2.0 * Math.PI + dlong);
		    }
		 
		    return (this.degrees(Math.atan2(dlong, dphi)) + 360.0) % 360.0;
		},
		 
		bearingToRadians: function(br) {
		    return this.radians((450 - br) % 360);
		},
		 
		/**
		 * method to calculate the rotation for a label (used when measures is enabled)
		 * 
		 * @param pt0
		 * @param pt1
		 * @param br
		 * @returns
		 */
		rotation: function(pt0, pt1, br) {
		    var rotate = pt0[0] > pt1[0] ? Math.PI : 0;
		    return this.bearingToRadians(br) + rotate
		},
		
		/**
		 * Method do calculate de X direction
		 * @param pt0
		 * @param pt1
		 * @returns {Number}
		 */
		getXDirection: function(pt0, pt1) {
			var xdifference = pt0[0] - pt1[0];
			if (xdifference == 0) {
				return 0;
			}
			return ( xdifference ) / Math.abs( xdifference );			
		},
		
		/**
		 * Method do calculate de Y direction
		 * @param pt0
		 * @param pt1
		 * @returns {Number}
		 */
		getYDirection: function(pt0, pt1) {
			var ydifference = pt0[1] - pt1[1];
			if (ydifference == 0) {
				return 0;
			}
			return ( ydifference ) / Math.abs( ydifference );			
		},
		
		/**
		 * Getthe Sketch Settings config saved in the JSON Store.
		 * @returns
		 */
		getSketchConfig: function() {
			var deferred = new Deferred();
			var promise = this.mobileMaximoSpatial.maximoSpatialStore.getSketchToolConfig();
			promise.then(lang.hitch(this, function(sketchConfig) {
				if (sketchConfig == null) {
					sketchConfig = {};
					sketchConfig.json = {};
					sketchConfig.json.measuresEnabled = false;					
				} else {
					if (sketchConfig.json.measureLengthUnit == null) {
						sketchConfig.json.measureLengthUnit = SystemProperties.getProperty(PlatformConstants.PLUSS_MEASURE_LENGTH_UNIT);
					}
					if (sketchConfig.json.measuresAreaUnit == null) {
						sketchConfig.json.measuresAreaUnit = SystemProperties.getProperty(PlatformConstants.PLUSS_MEASURE_AREA_UNIT);
					}
				}
				this.sketchConfig = sketchConfig.json;
				deferred.resolve()								
			}));			
			return deferred.promise;
		},
		
		disableMeasures: function() {
			this.measuresEnabled = false;
		},
		
		enableMeasures: function() {
			this.measuresEnabled = true;
		},
		
		_createDoneCancelPanel: function (mapTarget) {
			var displayDoneCancelDiv = domConstruct.create('div');
			displayDoneCancelDiv.setAttribute("id","sketch-doneCancel-container"+this.currentViewId);
			displayDoneCancelDiv.setAttribute("class","default-display-container default-doneCancel-container");
			
			var containerDiv = document.createElement('div');
			containerDiv.setAttribute("id", "sketch-doneCancel-container"+this.currentViewId);
			displayDoneCancelDiv.appendChild(containerDiv);
			
			var mapDiv = dojo.byId(this.currentViewId);
			domConstruct.place(displayDoneCancelDiv, mapDiv, "last");
			
			var divCancelBtn = document.createElement('div');
			divCancelBtn.setAttribute("id","divSketchCancelBtn"+this.currentViewId);
			divCancelBtn.setAttribute("class","sketchToolBtn sketchToolBtnCancel");
			domConstruct.place(divCancelBtn, containerDiv, "first");
			
			on(divCancelBtn, 'click',lang.hitch(this, function() {
				this.desactiveDrawTool();
				this.hideDoneCancelDialog();
			}));
			
			var divDoneCancelBtn = document.createElement('div');
			divDoneCancelBtn.setAttribute("id","divSketchDoneBtn"+this.currentViewId);
			divDoneCancelBtn.setAttribute("class","sketchToolBtn sketchToolBtnDone");
			domConstruct.place(divDoneCancelBtn, containerDiv, "first");
			
			on(divDoneCancelBtn, 'click',lang.hitch(this, function() {
				this.clickDoneBtn();
			}));
		},
		
		clickDoneBtn: function() {
			if (this.drawTool && this.finishDrawingFlag == true) {
				try {
					this.drawTool.finishDrawing();
				} catch(error) {
					//If the drawing was already finished it throws an exception, but that's fine in our case.
				}
				
			}
			this.finishDrawingFlag = false;
			this.desactiveDrawTool();
			this.hideDoneCancelDialog();
		},
		
		_createFeatureDisplay : function (mapTarget) {
			
			this.view = WL.application.ui.getViewFromId("WorkExecution.MapView");
			this.currentViewId = WL.application.ui.getCurrentView().id;
			var displayFeatureDiv = domConstruct.create('div');
			displayFeatureDiv.setAttribute("id","sketch-display-container"+this.currentViewId);
			displayFeatureDiv.setAttribute("class","default-display-container");
			
			var attributesDiv = document.createElement('div');
			attributesDiv.setAttribute("id", "sketch-attributes-container"+this.currentViewId);
			displayFeatureDiv.appendChild(attributesDiv);
			
			var hideFeatureDivButton = domConstruct.create('div');
			hideFeatureDivButton.setAttribute("id","hide-sketch-display-button-container"+this.currentViewId);
			hideFeatureDivButton.setAttribute("class","hide-default-display-button-container");
			hideFeatureDivButton.innerHTML = "X";
			
			on(hideFeatureDivButton, 'click',lang.hitch(this, function(param) {
				//if the user clicks "x" (close button), we hide the Display Feature Container and
				// we also change isHidden to true so it stop highlighting in the map
				this.hideDialog();
			}));
			
			this._createAddPointBtn(attributesDiv);
			this._createAddLineBtn(attributesDiv);
			this._createAddPolygonBtn(attributesDiv);
			this._createAddTextBtn(attributesDiv);
			this._createDeleteBtn(attributesDiv);
			this._createUndoBtn(attributesDiv);			
			
			var mapDiv = dojo.byId(this.currentViewId);
			domConstruct.place(displayFeatureDiv, mapDiv, "last");
			domConstruct.place(hideFeatureDivButton, displayFeatureDiv, "before");
			
			var sketchManagerDiv = domConstruct.create('div');
			sketchManagerDiv.setAttribute("id","save-sketchs-container"+this.currentViewId);
			sketchManagerDiv.setAttribute("class","feature-display-container sketch-manager-display-container");
			
			this._createSaveBtn(sketchManagerDiv);
			
			var sketchLoadDiv = domConstruct.create('div');
			sketchLoadDiv.setAttribute("id","load-sketchs-container"+this.currentViewId);
			sketchLoadDiv.setAttribute("class","feature-display-container sketch-manager-display-container sketch-manager-load-display-container");
			
			this._createLoadBtn(sketchLoadDiv);
			domConstruct.place(sketchManagerDiv, displayFeatureDiv, "before");
			domConstruct.place(sketchLoadDiv, displayFeatureDiv, "before");
			
			this._createDoneCancelPanel(mapTarget);
			
		},
		
		_getStyle: function(drawType, textValue) {
			var style = null;
			if (drawType == 'Point' || drawType == 'MultiPoint') {
				style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: 'black'
                        })
                    })
                });
				
				if (textValue != null && textValue != '') {
					style = new ol.style.Style({
		            	fill: new ol.style.Fill({
		                    color: 'rgba(255,255,255,0.4)'
		                }),
		                stroke: new ol.style.Stroke({
		                    color: '#3399CC',
		                    width: 8
		                  }),
		                text: new ol.style.Text({
		                	font: '14px Calibri,sans-serif',
		                    fill: new ol.style.Fill({ color: '#000' }),
		                    stroke: new ol.style.Stroke({
		                      color: '#fff', width: 2
		                    }),
		                    text: '',
		                    rotation: 0
		                })
		              });
				}
			} else {
				style = new ol.style.Style({
			        fill: new ol.style.Fill({
			            color: 'transparent'
			        }),
			        stroke: new ol.style.Stroke({
			            color: [0, 0, 0],
			            width: 2
			            })
			    });				
			}
			return style;
		},
		
		_addLayerForSketch: function() {
			if (this.vectorLayer != null) {
				this.mobileMaximoSpatial.map.removeLayer(this.vectorLayer);
				this.vectorLayer = null;
			}
			
			this.sourceLayer = new ol.source.Vector({wrapX: false});
		    this.vectorLayer = new ol.layer.Vector({
		        source: this.sourceLayer,
		        style: (lang.hitch(this, function() {
		              return lang.hitch(this, function(feature, resolution) {
		            	var geom_name = feature.getGeometry().getType();
		            	var textValue = feature.get(this.textField);		                
		                var style = this._getStyle(geom_name, textValue);
		                if (textValue != null && textValue != '') {
		                	var degree = feature.get(this.textRotationField);
			                var font_size = 20;
			                if (resolution > 1.5) {
								font_size = 30 /  resolution;
			                }
		                	style.getText().setFont(font_size + 'px Calibri,sans-serif');
			                style.getText().setText(textValue);
			                style.getText().setRotation( (degree != null)? degree: 0);
		                }
		                
		                return style;
		              });
		            }))()
		     });
		    this.vectorLayer.set('name', 'SketchTool');
		    this.sourceLayer.on('addfeature', lang.hitch(this, function(param) {
		    	var features = this.sourceLayer.getFeatures();
		    	this.isCurrentSketchSaved = false;
		    	//Show save button
		    	if (features.length > 0) {		    		
		    		var divSketchsManager = dojo.byId("save-sketchs-container"+this.currentViewId);					
					if (divSketchsManager!= null && !domClass.contains(divSketchsManager, "showPanel")) {
			        	domClass.add(divSketchsManager, "showPanel");
			        }
		    	}
		    	
		    }));
		    this.sourceLayer.on('removefeature', lang.hitch(this, function(param) {
		    	var features = this.sourceLayer.getFeatures();
		    	this.isCurrentSketchSaved = false;
		    	var divSketchsManager = dojo.byId("save-sketchs-container"+this.currentViewId);					
				//Hide save button
		    	if (features.length == 0) {
		    		this.isCurrentSketchSaved = true;
		    		if (divSketchsManager!= null && domClass.contains(divSketchsManager, "showPanel")) {
			        	domClass.remove(divSketchsManager, "showPanel");
			        }
		    	} else {
		    		if (divSketchsManager!= null && !domClass.contains(divSketchsManager, "showPanel")) {
			        	domClass.add(divSketchsManager, "showPanel");
			        }
		    	}
		    }));
		    this.mobileMaximoSpatial.map.addLayer(this.vectorLayer);
		},
		
		_createAddPointBtn: function(element) {
			var divPoint = document.createElement('div');
			divPoint.setAttribute("id","divSketchPointBtn"+this.currentViewId);
			divPoint.setAttribute("class","sketchToolBtn sketchToolBtnPoint");
			domConstruct.place(divPoint, element, "first");
			
			on(divPoint, 'click',lang.hitch(this, function() {
				this._prepareDrawComponent('Point');
				this.showDoneCancelDialog(false);
				this.finishDrawingFlag = false;
			}));
		},
		
		_createAddLineBtn: function(element) {
			var divPoint = document.createElement('div');
			divPoint.setAttribute("id","divSketchLineBtn"+this.currentViewId);
			divPoint.setAttribute("class","sketchToolBtn sketchToolBtnLine");
			domConstruct.place(divPoint, element, "last");
			
			on(divPoint, 'click',lang.hitch(this, function() {
				this._prepareDrawComponent('LineString');
				this.showDoneCancelDialog();
				this.finishDrawingFlag = true;
			}));
		},
		
		_createAddPolygonBtn: function(element) {
			var divPoint = document.createElement('div');
			divPoint.setAttribute("id","divSketchPolygonBtn"+this.currentViewId);
			divPoint.setAttribute("class","sketchToolBtn sketchToolBtnPolygon");
			domConstruct.place(divPoint, element, "last");
			
			on(divPoint, 'click',lang.hitch(this, function() {
				this._prepareDrawComponent('Polygon');
				this.showDoneCancelDialog();
				this.finishDrawingFlag = true;
				
				
			}));
		},
		
		_createAreaMeasure: function(feature) {			
			var current_projection = new ol.proj.Projection({code: "EPSG:4326"});
			var sourceProj = this.mobileMaximoSpatial.map.getView().getProjection();
			feature.getGeometry().transform(sourceProj, current_projection);
			var area_m = Math.abs(ol.sphere.getArea(feature.getGeometry(),{projection:current_projection}));
			var areaUnit = this.sketchConfig.measuresAreaUnit;
			var area = this.mobileMaximoSpatial.convertAreaMeasures('SQUARE_METERS', areaUnit, area_m);
			area = area.toFixed(3);
			var areaLabelUnit = this.mobileMaximoSpatial.measureUnitToLabel(areaUnit);
			var textLabel = '' + area + ' ' + areaLabelUnit;
			feature.getGeometry().transform(current_projection, sourceProj);
			var extent = feature.getGeometry().getExtent();
			var polygonCentroid = ol.extent.getCenter(extent);
			this.createTextFeature(polygonCentroid, textLabel, 0, true);
     
		},
		
		_createMeasurePoints: function(points, textPosition) {
			var lengthUnit = this.sketchConfig.measureLengthUnit;
            var length = 0;
            var sourceProj = this.mobileMaximoSpatial.map.getView().getProjection();
            for (var i = 0, ii = points.length - 1; i < ii; ++i) {
             var c1 = ol.proj.transform(points[i], sourceProj, 'EPSG:4326');
             var c2 = ol.proj.transform(points[i + 1], sourceProj, 'EPSG:4326');
             length += ol.sphere.getDistance(c1, c2);
            }
            //Points in x/y
            var l1point = points[points.length-1]; 
            var l2point = points[points.length-2];
            //Points in Long/Lat
            var l1 = ol.proj.transform(l1point, sourceProj, 'EPSG:4326');
            var l2 = ol.proj.transform(l2point, sourceProj, 'EPSG:4326');
            var bearing = this.bearing(l1, l2);
            var degree = -this.rotation(l1point, l2point, bearing);
            
            var xDirection = this.getXDirection(l1point, l2point);
            var yDirection = this.getYDirection(l1point, l2point);
            
            length = this.mobileMaximoSpatial.convertMeasures('METERS', lengthUnit, length);
            length = parseFloat(Math.round(length * 100) / 100).toFixed(2);
            var textPoint;
            if (textPosition == null || textPosition == 'middle') {
            	textPoint = [(points[0][0]+points[1][0])/2, (points[0][1]+points[1][1])/2];                              
            } else {
            	if (textPosition == 'origin') {
            		textPoint = points[0];
            	} else {
            		textPoint = points[points.length-1];
            	}
            }
            
            textPoint[0] = textPoint[0] + ( yDirection * 10 );
            textPoint[1] = textPoint[1] + ( xDirection * 10 );
            var textLabel = ''+ length + ' ' + this.mobileMaximoSpatial.measureUnitToLabel(lengthUnit);
            this.createTextFeature(textPoint, textLabel, degree, true);
            
		},
		
		_prepareDrawComponent: function(drawType) {
			var map = this.mobileMaximoSpatial.map;
			this.desactiveDrawTool();
			this.childrenFeaturesArray=[];
			var promise = this.getSketchConfig();
			var coords_length = 0;
			promise.then(lang.hitch(this, function() {
				var measuresEnabled = this.sketchConfig.measuresEnabled;
				this.drawTool = new ol.interaction.Draw({
	            source: this.sourceLayer,
	            type: drawType,
	            geometryFunction: lang.hitch(this, function(coords, geom) {
	            	if (drawType === "Polygon"){
	                    if (!geom) {
	                        geom = new ol.geom.Polygon(coords);
	                    }    
	                    if (measuresEnabled == true) {
	                    	if(coords[0].length !== coords_length && coords[0].length > 2){
		                    	coords_length = coords[0].length;
		                    	var realPoints = dojo.clone(coords[0]);
		                    	realPoints.splice(realPoints.length-1,1);
		                    	realPoints = realPoints.slice(-2);
		                    	this._createMeasurePoints(realPoints, 'middle');	                        
		                    }		                    
	                    }
	                    
	                    geom.setCoordinates(coords);
	                   
	                }
	                if (drawType === "LineString"){
	                    if (!geom) {
	                        geom = new ol.geom.LineString(coords);
	                    }        
	                    
	                    if (measuresEnabled == true) {
	                    	if(coords.length !== coords_length && coords.length > 2){
		                    	coords_length = coords.length;
		                    	var realPoints = dojo.clone(coords);
		                    	realPoints.splice(realPoints.length-1,1);
		                    	realPoints = realPoints.slice(-2);
		                    	this._createMeasurePoints(realPoints, 'middle');
		                    }		                    
	                    }	                    
	                    geom.setCoordinates(coords);
	                   
	                }	
	                if (drawType === "Point"){
	                    if (!geom) {
	                        geom = new ol.geom.Point(coords);
	                    }     
	                    if (measuresEnabled == true) {
	                    	var textPoint = dojo.clone(coords);
	                    	var sourceProj = this.mobileMaximoSpatial.map.getView().getProjection();
	                    	var lonlat = ol.proj.transform(textPoint, sourceProj, 'EPSG:4326');
	                    	textPoint[1] = textPoint[1] + 10;
	                    	var textLabel = "(" + lonlat[0] + ", " + lonlat[1] +")";
	                    	this.createTextFeature(textPoint, textLabel, 0, true, false);	
	                    	
	                    }
	                    geom.setCoordinates(coords);
	                    
	                }	    
	            	return geom;
	            })
	          });
			map.addInteraction(this.drawTool);
			this.drawTool.on('drawstart',function(event){
				if (drawType != 'Point') {
					var s = new ol.style.Style({
				        fill: new ol.style.Fill({
				            color: 'transparent'
				        }),
				        stroke: new ol.style.Stroke({
				            color: [33, 160, 239],
				            width: 2
				            })
				    });
				    event.feature.setStyle(s);
				}
			});
			this.drawTool.on('drawend', lang.hitch(this, function(param) {
				var feature = param.feature;
				feature.set(this.textField, "");
				feature.set(this.textRotationField, "");
				feature.set(this.idField, this.featuresCount++);
				
				var style = this._getStyle(drawType, null);
				
				if (drawType != 'Point') {
					if (measuresEnabled == true) {
						var coords = param.feature.getGeometry().getCoordinates();
						var realPoints
						if (drawType === "LineString") {
							realPoints = dojo.clone(coords);
							this._createMeasurePoints(realPoints, 'end');
						} else { // Polygon
							realPoints = dojo.clone(coords[0]);
							this._createMeasurePoints([realPoints[0], realPoints[realPoints.length-1]], 'middle');
							realPoints.push(realPoints[0]);
							this._createMeasurePoints(realPoints, 'end');
							this._createAreaMeasure(feature);
						}
                    }
				}
				
				array.forEach( this.childrenFeaturesArray, lang.hitch( this, function ( childFeature ) {	
					childFeature.set(this.parentIdField, feature.get("plussId"));
					this.featuresArray.push(childFeature);
				} ) );
				this.childrenFeaturesArray = [];
				this.featuresArray.push(feature);
				
				feature.setStyle(style);
			}));
			}))
			
			
		},
		
		_createDeleteBtn: function(element) {
			var divDelete = document.createElement('div');
			divDelete.setAttribute("id","divSketchDeleteBtn"+this.currentViewId);
			divDelete.setAttribute("class","sketchToolBtn sketchToolBtnDelete");
			domConstruct.place(divDelete, element, "last");
			
			on(divDelete, 'click',lang.hitch(this, function() {
				var map = this.mobileMaximoSpatial.map;
				this.desactiveDrawTool();
				this.finishDrawingFlag = false;
				this.drawTool = new ol.interaction.Select({
					layers: [this.vectorLayer],
					hitTolerance: this.getClickTolerance()
		          });
				map.addInteraction(this.drawTool);
				this.showDoneCancelDialog(false);
				this.drawTool.on('select', lang.hitch(this, function(param) {
					var source = this.vectorLayer.getSource();
					if (param.selected.length > 0) {
						var featureToDelete = param.selected[0];
						var idToDelete;
						if ( featureToDelete.get(this.parentIdField) !== null && featureToDelete.get(this.parentIdField) !== undefined ) {
							idToDelete = featureToDelete.get(this.parentIdField);
						} else {
						 	idToDelete = featureToDelete.get(this.idField);
						}
						var features = source.getFeatures();
						var length = features.length;
						if (length > 0) {
							var featuresToAddHistory = [];
							var keepSearching = true;
							var parentFound = false;
							for(i=this.featuresArray.length-1; i>=0 && keepSearching==true; i--) {
								var feature = this.featuresArray[i];
								if (feature.get(this.idField) == idToDelete || feature.get(this.parentIdField) == idToDelete) {
									feature.isDeleted = true;									
									featuresToAddHistory.push(feature);
									parentFound = true;
								} else {
									if (parentFound == true) {
										keepSearching = false;
									}
									
								}
							}
							
							this.featuresArray = this.featuresArray.concat(featuresToAddHistory.reverse());
							array.forEach( features, lang.hitch( this, function ( feature ) {	
								if (feature.get(this.idField) == idToDelete) {
									source.removeFeature(feature);
									this.searchForChildrenFeature(feature.get(this.idField), false, false);
									this.drawTool.getFeatures().clear();
								}
							} ) );
						}	
					}
				}));
			}));
		},
		
		_createAddTextBtn: function(element) {
			var divPoint = document.createElement('div');
			divPoint.setAttribute("id","divSketchTextBtn"+this.currentViewId);
			divPoint.setAttribute("class","sketchToolBtn sketchToolBtnText");
			domConstruct.place(divPoint, element, "last");
			
			on(divPoint, 'click',lang.hitch(this, function() {
				var map = this.mobileMaximoSpatial.map;
				this.addTextOnBlurFlag = false;
				this.desactiveDrawTool();		
				this.finishDrawingFlag = false;
				this._enableOnClickAddText();
				this.showDoneCancelDialog(false);
			}));
			
			
		},
		
		getClickTolerance: function() {
			return Number(MapProperties.getProperty('si.map.esri.identifyToolTolerance'));
		},
		
		_disableOnClickAddText: function() {
			if (this.onClickAddText) {
				ol.Observable.unByKey(this.onClickAddText);
				this.onClickAddText = null;
			}	
		},
		
		createTextFeature: function(coordinate, text, degree, isChild, canExport) {
			var geometryPoint = new ol.geom.Point(coordinate);
    		var newFeature = new ol.Feature({
                geometry: geometryPoint
            });
    		newFeature.set(this.textField, text);
    		newFeature.set(this.textRotationField, degree);
    		//newFeature.setStyle(this.styleTextFuncion(text, degree));
    		newFeature.set(this.idField, this.featuresCount++);    	
    		if (isChild != null && isChild == true) {
    			this.childrenFeaturesArray.push(newFeature);
    		}
    		
    		if (canExport != null) {
    			newFeature.set(this.canExportField, canExport);
    		}
    		var source = this.vectorLayer.getSource();
    		source.addFeature( newFeature );    	
    		return newFeature;
		},
		
		_enableOnClickAddText: function() {
			var map = this.mobileMaximoSpatial.map;
			this.onClickAddText = map.on('singleclick', lang.hitch(this, function(evt) {
				/**
				 * The flag is necessary because the onBlur event happens first and then the click is executed, so we need to wait for the second
				 * to create a new feature, the first click is just to save the text typed.
				 */ 				
				if (this.addTextOnBlurFlag == null || this.addTextOnBlurFlag == false) {
					this._disableOnClickAddText();
					var tooltip = document.createElement('div');
					var overlay = new ol.Overlay({
					  element: tooltip,
					  offset: [0, 0],
					  positioning: 'bottom-left'
					});
					map.addOverlay(overlay);
					
					var coordinate = evt.coordinate;

					if (evt.dragging) {
				          return;
				    }
					overlay.setPosition(coordinate);
				    tooltip.innerHTML = "<input type='text' name='textInputField' value='' data-dojo-type='dijit/form/TextBox' data-dojo-props='trim:true' id='textInputField'/>";
				    var inputText = dom.byId("textInputField");
				    focusUtil.focus(inputText);
				    dojo.connect(inputText, "onblur", lang.hitch(this, function() { 
				    	this.addTextOnBlurFlag = true;
				    	var inputTextValue = dojo.byId('textInputField').value;
				    	if (inputTextValue != '') {
				    		var feature = this.createTextFeature(coordinate, inputTextValue, 0, false);
				    		this.featuresArray.push(feature);
				    	}
				    	map.removeOverlay(overlay);
				    	this._enableOnClickAddText();
				    }));
				} else {
					this.addTextOnBlurFlag = false;
				}
				
			       
			}));
		},
		
		styleTextFuncion: function(textValue, degree) {
			
			return [
			        new ol.style.Style({
			            fill: new ol.style.Fill({
			            color: 'rgba(255,255,255,0.4)'
			          }),
			          stroke: new ol.style.Stroke({
			            color: '#3399CC',
			            width: 8
			          }),
			          text: new ol.style.Text({
			            font: '14px Calibri,sans-serif',
			            fill: new ol.style.Fill({ color: '#000' }),
			            stroke: new ol.style.Stroke({
			              color: '#fff', width: 2
			            }),
			            text: textValue,
			            rotation: (degree != null)? degree: 0
			          })
			        })
			      ];
		},
		
		desactiveDrawTool: function() {
			var map = this.mobileMaximoSpatial.map;
			
			if (this.drawTool != null) {
				map.removeInteraction(this.drawTool);
				this.drawTool = null;
			}
			if (this.onClickEvent != null) {
				ol.Observable.unByKey(this.onClickEvent);
				this.onClickEvent = null;
			}		
			this._disableOnClickAddText();
			
		},
		
		_createSaveBtn: function(element) {
			var divSave = document.createElement('div');
			divSave.setAttribute("id","divSketchSaveBtn"+this.currentViewId);
			divSave.setAttribute("class","sketchToolBtn sketchToolBtnSave");
			domConstruct.place(divSave, element, "last");
			
			on(divSave, 'click',lang.hitch(this, function() {
				this.clickDoneBtn();
				WL.application.ui.show('SketchTool.Save');
			}));
		},
		
		_createLoadBtn: function(element) {
			var divLoad = document.createElement('div');
			divLoad.setAttribute("id","divSketchLoadBtn"+this.currentViewId);
			divLoad.setAttribute("class","sketchToolBtn sketchToolBtnLoad");
			domConstruct.place(divLoad, element, "last");
			
			on(divLoad, 'click',lang.hitch(this, function() {				
				WL.application.ui.show('SketchTool.List');
			}));
		},
		
		clearSketches: function() {
			var vectorLayer = this.vectorLayer;
			if (vectorLayer) {
				var source = vectorLayer.getSource();
				source.clear();
				var divSketchsManager = dojo.byId("save-sketchs-container"+this.currentViewId);					
				if (divSketchsManager!= null && domClass.contains(divSketchsManager, "showPanel")) {
			        	domClass.remove(divSketchsManager, "showPanel");
			    }
				this.isCurrentSketchSaved = true;		
				this.featuresCount = 0;
				this.featuresArray = [];
				this.currentSketchOpened = null;
			}
		},
		
		loadSketch: function(features, jsonFormat, currentSketch) {
			this.logEvent('[SketchTool] Loading sketch method');
			this.clearSketches();
			var source = this.vectorLayer.getSource();
			var id = 0;
			var jsonFeatureArray = jsonFormat['features'];
			var spatialRefCode = null;
			if (jsonFeatureArray.length > 0) {
				var jsonFeature = jsonFeatureArray[0];
				if (jsonFeature.geometry) {
					var jsonGeometry = jsonFeature.geometry;
					if (jsonGeometry.spatialReference) {
						var spatialRef = jsonGeometry.spatialReference;
						spatialRefCode = "EPSG:";
						if (spatialRef.latestWkid) {
							spatialRefCode =  spatialRefCode + spatialRef.latestWkid;
						} else {
							spatialRefCode = spatialRefCode + spatialRef.wkid;
						}
					}
				}
			}
			this.logEvent('[SketchTool] features length ' + features.length);
			array.forEach( features, lang.hitch( this, function ( feature, i ) {
				this.projectFeatureToMapProjection(feature, spatialRefCode);
				var symbol = jsonFeatureArray[i].symbol;
				var spatialReference = jsonFeatureArray[i].geometry.spatialReference;
				var featureId = feature.get(this.idField);
				if (featureId == null) {
					featureId = this.featuresCount++;
					feature.set(this.idField, featureId);
					
					var textValue = '';
					if (symbol != null && symbol.text != null) {
						textValue = symbol.text;
					}
					feature.set(this.textField, textValue);
					feature.set(this.textRotationField, '');
				}
				feature.customSymbol = symbol;
				feature.customSpatialReference = spatialReference;
				if (featureId > id) {
					id = featureId;
				}
				source.addFeature(feature);
				this.featuresArray.push(feature);
			} ) );
			this.featuresCount = id+1;
			this.currentSketchOpened = currentSketch;
			this.isCurrentSketchSaved = true;
			var divSketchsManager = dojo.byId("save-sketchs-container"+this.currentViewId);					
			if (divSketchsManager!= null && domClass.contains(divSketchsManager, "showPanel")) {
		       	domClass.remove(divSketchsManager, "showPanel");
		    }
		},
		
		_createUndoBtn: function(element) {
			var divPoint = document.createElement('div');
			divPoint.setAttribute("id","divSketchUndoBtn"+this.currentViewId);
			divPoint.setAttribute("class","sketchToolBtn sketchToolBtnUndo");
			domConstruct.place(divPoint, element, "last");
			
			on(divPoint, 'click',lang.hitch(this, function() {
				var source = this.vectorLayer.getSource();
				var features = source.getFeatures();
				var length = this.featuresArray.length;
				if (length > 0) {
					var lastFeature = this.featuresArray[length-1];
					if (lastFeature.isDeleted == true) {
						source.addFeature( lastFeature );
						lastFeature.isDeleted = false;
						this.searchForChildrenFeature(lastFeature.get("plussId"), true, true);						
					} else {
						source.removeFeature( lastFeature );
						lastFeature.isDeleted = true;
						this.searchForChildrenFeature(lastFeature.get("plussId"), false, true);
					}					
					this.featuresArray.splice(this.featuresArray.length-1, 1);
				}			
				this.desactiveDrawTool();
			}));
		},
		
		searchForChildrenFeature: function(featureId, add, removeFromHistory) {
			var source = this.vectorLayer.getSource();
			var features = source.getFeatures();
			var idsHistoryToRemove = [];
			
			var keepSearching = true;
			var parentFound = false;
			for(i=this.featuresArray.length-1; i>=0 && keepSearching==true; i--) {
				var feature = this.featuresArray[i];
				if (feature.get(this.parentIdField) == featureId) {
					if (add == true) {
						feature.isDeleted = false;
						source.addFeature( feature );						
					} else {
						feature.isDeleted = true;
						source.removeFeature( feature );						
					}			
					if (removeFromHistory == true) {
						idsHistoryToRemove.push(i);
					}
					parentFound = true;
				} else {
					if (parentFound == true) {
						keepSearching = false;
					}
					
				}
			}
			var lenghtRemove = idsHistoryToRemove.length;
			if (lenghtRemove > 0) {
				for (i=0; i<lenghtRemove; i++) {
					this.featuresArray.splice(idsHistoryToRemove[i],1);
				}
			}
			
		},
		
		showDialog: function() {
			this.currentViewId = WL.application.ui.getCurrentView().id;
			this._addLayerForSketch();
			this.featuresArray = [];
			this.featuresCount = 0;
			if (this.vectorLayer != null) {
				var source = this.vectorLayer.getSource();
				if (source != null) {
					var features = source.getFeatures();
					var length = features.length;
					if (length > 0) {
						array.forEach( features, lang.hitch( this, function ( feature ) {
							this.featuresArray.push(feature);
							this.featuresCount = (feature.get(this.idField) != null)? feature.get(this.idField)+1 : this.featuresCount+1;							
						} ) );
					}	
				}				
			}
			
			this.mobileMaximoSpatial.disableClickEvents();
			if (this.mobileMaximoSpatial.identifyTool) {
				this.mobileMaximoSpatial.identifyTool.hideDialog();
			}
			var diFeatures = dojo.byId("sketch-display-container"+this.currentViewId);
			var diHideButton = dojo.byId("hide-sketch-display-button-container"+this.currentViewId);
			
			if (diFeatures!= null && !domClass.contains(diFeatures, "showPanel")) {
	        	domClass.add(diFeatures, "showPanel");	
	        	domClass.add(diHideButton, "showPanel");
	        }		
			
			var divLoadBtn = dojo.byId("load-sketchs-container"+this.currentViewId);
			if (divLoadBtn!= null && !domClass.contains(divLoadBtn, "showPanel")) {
	        	domClass.add(divLoadBtn, "showPanel");
	        }	
			
			this.isOpened = true;
			
		},
		
		showDoneCancelDialog: function(showCancelBtn) {
			this.mobileMaximoSpatial.disableClickEvents();		
			var doneCanelContainer = dojo.byId("sketch-doneCancel-container"+this.currentViewId);
			
			if (doneCanelContainer!= null && !domClass.contains(doneCanelContainer, "doneCancel-showPanel")) {
	        	domClass.add(doneCanelContainer, "doneCancel-showPanel");
	        }		
			var divSketchCancelBtn = dojo.byId("divSketchCancelBtn"+this.currentViewId);
			if (showCancelBtn != null && showCancelBtn == false) {
				if (divSketchCancelBtn!= null && !domClass.contains(divSketchCancelBtn, "sketchToolHideBtnCancel")) {
		        	domClass.add(divSketchCancelBtn, "sketchToolHideBtnCancel");
		        }
			} else {
				if (divSketchCancelBtn!= null && domClass.contains(divSketchCancelBtn, "sketchToolHideBtnCancel")) {
		        	domClass.remove(divSketchCancelBtn, "sketchToolHideBtnCancel");
		        }
			}
			
		},
		
		hideDoneCancelDialog : function() {
			this.desactiveDrawTool();
			var doneCanelContainer = dojo.byId("sketch-doneCancel-container"+this.currentViewId);
			if (doneCanelContainer!= null && domClass.contains(doneCanelContainer, "doneCancel-showPanel")) {
	        	domClass.remove(doneCanelContainer, "doneCancel-showPanel");  	
	        }
		},
		
		hideDialog : function() {
			this.mobileMaximoSpatial.enableClickEvents();
			this.mobileMaximoSpatial.setZoomStatus(this.mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
			this.desactiveDrawTool();
			var diFeatures = dojo.byId("sketch-display-container"+this.currentViewId);
			var diHideButton = dojo.byId("hide-sketch-display-button-container"+this.currentViewId);
			var diSaveLoadButton = dojo.byId("save-sketchs-container"+this.currentViewId);
			var divLoadBtn = dojo.byId("load-sketchs-container"+this.currentViewId);
			
			if (divLoadBtn!= null && domClass.contains(divLoadBtn, "showPanel")) {
	        	domClass.remove(divLoadBtn, "showPanel");
	        }				
			if (diFeatures!= null && domClass.contains(diFeatures, "showPanel")) {
	        	domClass.remove(diFeatures, "showPanel");  	
	        }
			if (diHideButton!= null && domClass.contains(diHideButton, "showPanel")) {
	        	domClass.remove(diHideButton, "showPanel");
	        }	
			if (diSaveLoadButton!= null && domClass.contains(diSaveLoadButton, "showPanel")) {
	        	domClass.remove(diSaveLoadButton, "showPanel");
	        }
			
			this.mobileMaximoSpatial.showWODetailsPanel();
			this.isOpened = false;
			this.measuresEnabled = false;
		},
		
		
		projectFeatureTo4326: function(feature) {
			var sourceProj = this.mobileMaximoSpatial.map.getView().getProjection();
			feature.getGeometry().transform(sourceProj, 'EPSG:4326');          
		},
		
		projectFeatureToMapProjection: function(feature, featureSourceProjection) {
			var sourceProj = this.mobileMaximoSpatial.map.getView().getProjection();
			if (featureSourceProjection == null) {
				featureSourceProjection = 'EPSG:4326';
			}
			feature.getGeometry().transform(featureSourceProjection, sourceProj);
		},
		
		logEvent: function(msg) {
			Logger.trace(msg);
			console.log(msg);
		},
		

	});
});
