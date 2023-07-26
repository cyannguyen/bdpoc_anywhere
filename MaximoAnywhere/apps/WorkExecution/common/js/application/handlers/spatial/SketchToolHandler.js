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

define("application/handlers/spatial/SketchToolHandler", 
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
		  "application/handlers/CommonHandler",
		  "platform/translation/MessageService",
		  "platform/store/SystemProperties",
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
		  UserManager, CommonHandler, MessageService, SystemProperties, lang, PlatformRuntimeException,
PlatformRuntimeWarning, PlatformConstants, Logger, MapGeoLocation, MobileMaximoSpatial, 
MaximoSpatialStore, MapProperties, array, all, Deferred, locale) {
	return declare(ApplicationHandlerBase, {
		
		userAuthenticationManager: null,
		toolOpened: null,
		lengthUnits: null,
		areaUnits: null,
		backToList: null,
		sketchToDelete: null,
		sketchToLoad: null,
		defaultProjection: null,
		loadSketchAfterSave: null,
		identifierArray: null,
		creatingNew: false,
		STATUS_NEW: 'NEW',
		STATUS_PROCESSED: 'PROCESSED',
		STATUS_SENT: 'SENT',
			
		constructor : function ( options ) {
			this.backToList = false;
			this.sketchToLoad = null;
			this.sketchToDelete = null;
			this.identifierArray = [];
			this.loadSketchAfterSave = null;
			this.defaultProjection =  'EPSG:4326';
			this.lengthUnits = ['meters', 'kms', 'feet', 'miles', 'yards'];
			this.areaUnits = ['square_feet', 'square_miles', 'square_yards', 'square_meters', 'square_kms', 'acres', 'hectares'];
			this.layersOrganized = {};
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
		
		showTool: function(eventContext) {	
			var provider = MapProperties.getProperty('provider');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				if (provider == MapProperties.ANYWHERE_PROVIDER_MAPMANAGER && 
						mobileMaximoSpatial.openLayerMap.
						mapManager.mapprovider.toLowerCase() == MapProperties.MAPMANAGER_PROVIDER_SPATIAL && 
						mobileMaximoSpatial.sketchTool != null && mobileMaximoSpatial.sketchTool.isOpened == false) {
					eventContext.setDisplay(true);
				} else {
					eventContext.setDisplay(false);
				}
			} else {
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
			
			
		},
		
		initSaveSketch: function(eventContext) {	
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var currentSketchOpened = null;
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {
				currentSketchOpened = mobileMaximoSpatial.sketchTool.currentSketchOpened;
			}			
			
			var sketchlistSet = eventContext.application.getResource("workOrder.sketchlist");
			if (currentSketchOpened == null) {
				var newSketch = sketchlistSet.createNewRecord();
				var d = new Date();
				var datestring =  '' + d.getFullYear() + (d.getMonth()+1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
				newSketch.set('sketchname', 'Sketch '+datestring);
				newSketch.set('originalsketchname', newSketch.get('sketchname'));
			} else {
				var currentSketch = sketchlistSet.getCurrentRecord();
				if (currentSketch) {
					currentSketch.set('originalsketchname', currentSketch.get('sketchname'));
				}
				
			} 
			
		},
		
		overwriteSketch: function(eventContext) {
			this.logEvent('[SketchToolHandler] Overwrite sketch');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			this.application.ui.hideCurrentDialog();
			
			var sketchlistSet = eventContext.application.getResource("workOrder.sketchlist");	
			var sketch = sketchlistSet.getCurrentRecord();
			
			if (sketch) {
					mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
					var jsonStr = this.exportFeaturesToJson();
					sketch.set('sketchlist', jsonStr);
					sketch.set('status', this.STATUS_NEW);
					sketch.set('recordnum', sketch.get('recordnum'));
					sketch.set('recordtype', sketch.get('recordtype'));
					sketch.set('sketchname', sketch.get('sketchname'));
					
					var vectorLayer = mobileMaximoSpatial.sketchTool.vectorLayer;
					var source = vectorLayer.getSource();
					var extent = source.getExtent();
					sketch.set('sketchextent', this._getExtentFromGraphicLayer());
					
					sketch.__changedAttributes['recordnum']='recordnum';
					sketch.__changedAttributes['recordtype']='recordtype';
					sketch.__changedAttributes['sketchname']='sketchname';
					this._commit();
					mobileMaximoSpatial.sketchTool.isCurrentSketchSaved = true;
					mobileMaximoSpatial.sketchTool.currentSketchOpened = sketch;
					this._closeSaveView(eventContext);
				
			} else {
				this.logEvent('Error getting the current check');
			}
			
			
		},
		
		showConfirmLoadDialog: function(eventContext) {
			this.sketchToLoad = eventContext.getCurrentRecord();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {	
				var isCurrentSketchSaved = mobileMaximoSpatial.sketchTool.isCurrentSketchSaved;
				if (isCurrentSketchSaved == false) {
					eventContext.application.ui.show('WorkExecution.ConfirmLoadSketch');
				} else {
					this.loadSketch(eventContext);
				}
			} 
			
		},
		
		cancelLoadSketch: function(eventContext) {
			this.application.ui.hideCurrentDialog();
			this.sketchToLoad = null;
		},
		
		searchForMapViewId: function(eventContext) {
			var viewIdReturn = "WorkExecution.MapView";
			var viewHistory = eventContext.application.ui.viewHistory;
			for ( var iView = Number(viewHistory.length)-1; iView >= 0; iView-- ) {
				var view = viewHistory[ iView ];
				var viewId = view.id;
				if (viewId.indexOf("MapView") > -1) {
					viewIdReturn = viewId;
				}
			}
			return viewIdReturn;
			
		},
		
		ignoreSaveAndLoadSketch: function(eventContext) {
			this.application.ui.hideCurrentDialog();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {	
				mobileMaximoSpatial.sketchTool.clearSketches();
				this.loadSketch(eventContext);
			} 
		},
		
		saveAndLoadSketch: function(eventContext) {
			this.application.ui.hideCurrentDialog();
			this.loadSketchAfterSave = true;
			eventContext.application.ui.show('SketchTool.Save');
		},
		
		loadSketch: function(eventContext, closeCurrentView) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (this.sketchToLoad != null && mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				var currentSketches = CommonHandler._getAdditionalResource(eventContext,'workOrder.sketchlist').find('identifier == $1', this.sketchToLoad.identifier);
				if (currentSketches.length == 0) {
	     			currentSketches = CommonHandler._getAdditionalResource(eventContext,'workOrder.sketchlist').find('remoteid == $1', this.sketchToLoad.remoteid);
	     		}
				if (currentSketches.length > 0) {
					var currentSketch = currentSketches[0];
					currentSketch.getOwner().setCurrentIndexByRecord(currentSketch);
					
					var sketchlist = currentSketch.sketchlist;
					var options = {
							'dataProjection': this.defaultProjection
					}
					var json = new ol.format.EsriJSON();
					var jsonFormat = JSON.parse(sketchlist);
				    var features = json.readFeatures(sketchlist, options);
				    mobileMaximoSpatial.sketchTool.loadSketch(features, jsonFormat, currentSketch);
				    if (closeCurrentView == null || closeCurrentView == true) {
				    	eventContext.ui.hideCurrentView();
				    }				    
				}
				this.sketchToLoad = null;
			}
		},
		
		showConfirmDeleteDialog: function(eventContext) {
			this.sketchToDelete = eventContext.getCurrentRecord();
			eventContext.application.ui.show('WorkExecution.ConfirmDeleteSketch');
		},
		
		deleteSketch: function(eventContext, closeWindows) {
			var clean = false;
			this.logEvent('[SketchToolHandler] Deleting sketch ');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
			if (closeWindows == null || closeWindows == true) {
				this.application.ui.hideCurrentDialog();
			}
			var sketchlistSet = eventContext.application.getResource("workOrder.sketchlist");	
			var sketch = this.sketchToDelete;
			var currentSketchOpened = mobileMaximoSpatial.sketchTool.currentSketchOpened;
			if (sketch) {
				
				if (currentSketchOpened != null && currentSketchOpened.get('sketchname') == sketch.get('sketchname')) {
					clean = true;
				}
				sketchlistSet.setCurrentIndexByRecord(sketch);
				var sketchToDelete = sketchlistSet.getCurrentRecord();
				this.logEvent('[SketchToolHandler] Deleting sketchName ' + sketchToDelete.get('sketchname'));
				this.logEvent('[SketchToolHandler] Deleting isNew ' + sketchToDelete._isNew );
				if (sketchToDelete._isNew == false){
					sketchToDelete.deleteChildOnServer();	
					this._commit();					
				} else {
					sketchToDelete.deleteLocal();
				}
				
				if (clean) {
					this.clearSketches(eventContext);
				} else {
					if (currentSketchOpened != null) {
						currentSketchOpened.getOwner().setCurrentIndexByRecord(currentSketchOpened);
					}
					
				}
				
				if (closeWindows == null || closeWindows == true) {
					eventContext.ui.getCurrentViewControl().refresh();
				}
				
			}
		},
		
		exportFeaturesToJson: function() {
			var jsonFeatures = {};
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
        	jsonFeatures['features'] = [];
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {	
				var vectorLayer = mobileMaximoSpatial.sketchTool.vectorLayer;
				var source = vectorLayer.getSource();
				var features = source.getFeatures();
				var sourceProj = mobileMaximoSpatial.map.getView().getProjection();
            	var options = {
						'dataProjection': this.defaultProjection
				}
            	
				var json = new ol.format.EsriJSON();
            	
            	var parentsToAdjust = [];
            	array.forEach( features, lang.hitch( this, function ( feature ) {
            		var canExport = feature.get(mobileMaximoSpatial.sketchTool.canExportField);
            		if (canExport != null && canExport == false) {
            			var parentIdField = feature.get(mobileMaximoSpatial.sketchTool.parentIdField);
            			var textFieldName = mobileMaximoSpatial.sketchTool.textField;
            			var textFieldValue = feature.get(textFieldName);            			
            			var textRotationFieldName = mobileMaximoSpatial.sketchTool.textRotationField;
            			var textRotationFieldValue = feature.get(textRotationFieldName);            			
            			var fields = [];
            			fields.push({'key':textFieldName, 'value': textFieldValue});
            			fields.push({'key':textRotationFieldName, 'value': textRotationFieldValue});
            			parentsToAdjust.push({'id': parentIdField, 'fields': fields});            			
            		} else {
            			mobileMaximoSpatial.sketchTool.projectFeatureTo4326(feature);            		
                		var jsonFeature = JSON.parse(json.writeFeature(feature, options));
                		mobileMaximoSpatial.sketchTool.projectFeatureToMapProjection(feature);
                		jsonFeature.symbol = feature.customSymbol;
                		var customSpatialReference = feature.customSpatialReference;
                		if (customSpatialReference != null) {
                			if (jsonFeature.geometry == null) {
                				jsonFeature.geometry = {};
                			}
                			jsonFeature.geometry.spatialReference = customSpatialReference;
                		}            		
                		jsonFeatures['features'].push(jsonFeature);
            		}           		            		
            		
				} ) );
            	
            	array.forEach( parentsToAdjust, lang.hitch( this, function ( parentToAdjust ) {
            		var id = parentToAdjust['id'];
            		array.forEach( jsonFeatures['features'], lang.hitch( this, function ( feature ) {
            			var idFieldName = mobileMaximoSpatial.sketchTool.idField;
            			var idFieldValue = feature.attributes[idFieldName];
            			if (idFieldValue == id) {
            				array.forEach( parentToAdjust['fields'], lang.hitch( this, function ( field ) {
            					feature.attributes[field['key']] = field['value'];
            				}));
            			}                		                		
                	} ) );            		
            	} ) );
			}
			return JSON.stringify(jsonFeatures);
		},
		
		saveSketch: function(eventContext) {
			this.logEvent('[SketchToolHandler] Saving sketch ');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
            	var jsonStr = this.exportFeaturesToJson();
            	
			    var workOrderSet = eventContext.application.getResource("workOrder");
     			var workOrder = workOrderSet.getCurrentRecord();
     			var sketchlistSet = eventContext.application.getResource("workOrder.sketchlist");
     			var sketchUpdated = sketchlistSet.getCurrentRecord();
     			var currentSketch = null;
     			
     			//is a save as operation, create a new one and didn't change the current one
     			if (!sketchUpdated._isNew && sketchUpdated._isChanged && sketchUpdated.__changedAttributes['sketchname'] != null) {
     				var sketchname = dojo.clone(sketchUpdated.get('sketchname'));
     				sketchUpdated.set('sketchname', sketchUpdated.get('originalsketchname'));     				
     				sketchUpdated._isChanged = false;
     				delete sketchUpdated.__changedAttributes['sketchname'];
     				currentSketch = sketchlistSet.createNewRecord();
     				currentSketch.set('sketchname', sketchname);
     			} else {
     				currentSketch = sketchUpdated;
     			}
     			
     			
     			var recordType = 'WORKORDER';
			    var identifier = workOrder.get('identifier');			    
			    
     			var currentUserSite = this.userAuthenticationManager.currentUserSite;
				var currentUser = this.userAuthenticationManager._getCurrentUser();
				var currentDateTime = this.application.getCurrentDateTime();
				currentSketch.set('sketchlist', jsonStr);
				currentSketch.set('recordtype', recordType);
				currentSketch.set('recordnum', Number(identifier));
				currentSketch.set('siteid', currentUserSite);
				currentSketch.set('createdby', currentUser);
				currentSketch.set('sketchlist', jsonStr);
				currentSketch.setDateValue('datecreated', currentDateTime);
				currentSketch.set('ismobile', true);
				currentSketch.set('mapname', mobileMaximoSpatial.mapManager.identifier);
				
				
				currentSketch.set('sketchextent', this._getExtentFromGraphicLayer());
				
				this.logEvent('[SketchToolHandler] sketchName to save ' + currentSketch.get('sketchname'));
				
				mobileMaximoSpatial.sketchTool.isCurrentSketchSaved = true;
				mobileMaximoSpatial.sketchTool.currentSketchOpened = currentSketch;
				
				this._commit();
				
				currentSketch._isChanged = false;
				
				this._closeSaveView(eventContext);
			}			
		},
		
		_getExtentFromGraphicLayer: function() {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var vectorLayer = mobileMaximoSpatial.sketchTool.vectorLayer;
			var source = vectorLayer.getSource();
			var sourceProj = mobileMaximoSpatial.map.getView().getProjection();
			var extent = source.getExtent();
			var extentTransformed = ol.proj.transformExtent(extent, sourceProj, 'EPSG:4326');
			return '[' + extentTransformed.toString() + ']';
		},
		
		_closeSaveDialog: function(eventContext, currentSketch) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			mobileMaximoSpatial.sketchTool.isCurrentSketchSaved = true;
			mobileMaximoSpatial.sketchTool.currentSketchOpened = currentSketch;
			if (this.backToList == true) {
				eventContext.application.ui.show('WorkExecution.WorkItemsView');
				this.backToList = false;
			} else {
				if (this.loadSketchAfterSave == true) {
					this.loadSketch(eventContext, false);
					eventContext.application.ui.returnToView(this.searchForMapViewId(eventContext));
				} else {
					this.ui.hideCurrentView();
				}
				
			}	
		},
		
		clearSketches: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {	
				mobileMaximoSpatial.sketchTool.clearSketches();
			}			
		},
		
		noSave: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {	
				mobileMaximoSpatial.sketchTool.isCurrentSketchSaved = true;
			}
			this.application.ui.hideCurrentDialog();
			eventContext.ui.back();
		},
		
		showSaveView: function(eventContext) {
			this.backToList = true;
			this.application.ui.hideCurrentDialog();
			eventContext.application.ui.show('SketchTool.Save');
		},
		
		checkForExistingSketch: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {
				var sketchlistSet = eventContext.application.getResource('workOrder.sketchlist');
				var sketch = sketchlistSet.getCurrentRecord();
				currentSketchOpened = mobileMaximoSpatial.sketchTool.currentSketchOpened;
				if (currentSketchOpened != null || sketch._isNew == true) {
					var currentSketchName = sketch.get('sketchname');			
					var currentSketches = sketchlistSet.find('sketchname == $1', currentSketchName);
					var count = 0;
					if (sketch._isNew || (sketch._isChanged && sketch.__changedAttributes['sketchname'] != null)) {
						count++;
					}
					if (currentSketches.length > count) {
						eventContext.ui.show('WorkExecution.OverwriteSketch');
					} else {
						this.saveSketch(eventContext);
					}
				} else {					
					this.saveSketch(eventContext);
				}
			}
		},
		
		_closeSaveView: function(eventContext) {
			if (this.backToList == true) {
				eventContext.application.ui.show('WorkExecution.WorkItemsView');
				this.backToList = false;
			} else {
				if (this.loadSketchAfterSave == true) {
					this.loadSketch(eventContext, false);
					eventContext.application.ui.returnToView(this.searchForMapViewId(eventContext));
				} else {
					this.ui.hideCurrentView();
				}
				
			}
		},
		
		_commit: function() {
			var deferred = new Deferred();
			this.logEvent('[SketchToolHandler] _commit called ');
			try{
     			var workOrderSet = this.application.getResource("workOrder");
     			var workOrder = workOrderSet.getCurrentRecord();
     			var promiseSave = ModelService.save(workOrderSet);
				promiseSave.then(lang.hitch(this, function(){
					this.logEvent('[SketchToolHandler] _commit after save');
					deferred.resolve();
				})).otherwise(lang.hitch(this, function(){
					this.logEvent('[SketchToolHandler] ERROR _commit save, check server log');
					deferred.reject();
				}))
				
			}catch(e){
				throw e;
				this.logEvent(e);
			}
			return deferred.promise;
		},
		
		cleanup: function(eventContext){
			var sketchSet = eventContext.application.getResource("workOrder.sketchlist");
			var sketch = sketchSet.getCurrentRecord();
			if (sketch) {
				sketch.deleteLocal();
			}
			
			try{
     			this._commit();
				this.ui.hideCurrentView();
			}catch(e){
				throw e;
			}
		},
		
		handleBackButton: function(eventContext){
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null && mobileMaximoSpatial.sketchTool != null) {
				currentSketchOpened = mobileMaximoSpatial.sketchTool.currentSketchOpened;
			}			
			
			if (currentSketchOpened == null) {
				var sketchSet = eventContext.application.getResource("workOrder.sketchlist");
				var sketch = sketchSet.getCurrentRecord();
				if (sketch) {
					sketch.deleteLocal();
				}
			} 
			
			this.ui.hideCurrentView();			
		},
		
		initSketchSettings: function(eventContext) {			
			this._fetchLengthUnitList(eventContext);
			this._fetchAreaUnitList(eventContext);
			
			var sketchSettingsResource = eventContext.application.getResource("sketchSettingsResource").getCurrentRecord();;
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var measureLengthUnit = null;
			var measureAreaUnit = null;
			if (mobileMaximoSpatial != null) {				
				var promise = mobileMaximoSpatial.maximoSpatialStore.getSketchToolConfig();
				promise.then(lang.hitch(this, function(sketchConfig) {
					if (sketchConfig != null && sketchConfig.json.measureLengthUnit != null) {
						measureLengthUnit = sketchConfig.json.measureLengthUnit;
					} else {
						measureLengthUnit = SystemProperties.getProperty(PlatformConstants.PLUSS_MEASURE_LENGTH_UNIT);
					}
					
					if (sketchConfig != null && sketchConfig.json.measuresAreaUnit != null) {
						measureAreaUnit = sketchConfig.json.measuresAreaUnit;
					} else {
						measureAreaUnit = SystemProperties.getProperty(PlatformConstants.PLUSS_MEASURE_AREA_UNIT);
					}
					sketchSettingsResource.set('measureLengthUnit', measureLengthUnit);
					sketchSettingsResource.set('measureAreaUnit', measureAreaUnit);
				}));
			} 
		},
		
		_fetchAreaUnitList: function(eventContext) {
			var areaUnits = eventContext.application.getResource("sketchSettingsAreaUnitResource");
			if (areaUnits.data.length>0) {
				areaUnits.data = [];
			}
			
			array.forEach( this.areaUnits, lang.hitch( this, function ( areaUnit ) {
				var areaDesc = MessageService.createStaticMessage(areaUnit.toLowerCase()).getMessage();
				var areaUnitsDisp = areaUnits.createNewRecord();
				areaUnitsDisp.set('areaUnit', areaUnit);
				areaUnitsDisp.set('areaUnitDescription', areaDesc);							
			} ) );
		},
		
		_fetchLengthUnitList: function(eventContext) {
			var lengthUnits = eventContext.application.getResource("sketchSettingsLengthUnitResource");
			if (lengthUnits.data.length>0) {
				lengthUnits.data = [];
			}
			
			array.forEach( this.lengthUnits, lang.hitch( this, function ( lengthUnit ) {
				var lengthDesc = MessageService.createStaticMessage(lengthUnit.toLowerCase()).getMessage();
				var lengthUnitsDisp = lengthUnits.createNewRecord();
				lengthUnitsDisp.set('lengthUnit', lengthUnit);
				lengthUnitsDisp.set('lengthUnitDescription', lengthDesc);							
			} ) );
		},
		
		configureInitilCheckboxValue: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var measuresEnabled = false;
			if (mobileMaximoSpatial != null) {				
				var promise = mobileMaximoSpatial.maximoSpatialStore.getSketchToolConfig();
				promise.then(lang.hitch(this, function(sketchConfig) {
					if (sketchConfig != null && sketchConfig.json.measuresEnabled != null) {
						measuresEnabled = sketchConfig.json.measuresEnabled;
					} 
					eventContext.checkBoxWidget.set('checked', measuresEnabled);
				}));
			} else {
				eventContext.checkBoxWidget.set('checked', measuresEnabled);
			}
			
			
		},
		
		updateMeasuresValue: function(eventContext) {
			var newValue = !!eventContext.checkBoxWidget.get('value');
			
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {				
				mobileMaximoSpatial.maximoSpatialStore.updateSketchToolConfig(newValue, null, null);
				
			}
		},
		
		updateMeasureLengthUnitValue: function(eventContext) {
			var sketchSettingsResource = eventContext.application.getResource("sketchSettingsResource").getCurrentRecord();
			var measureLengthUnit = sketchSettingsResource.get("measureLengthUnit");
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {				
				mobileMaximoSpatial.maximoSpatialStore.updateSketchToolConfig(null, measureLengthUnit, null);
				
			}
		},
		
		updateMeasureAreaUnitValue: function(eventContext) {
			var sketchSettingsResource = eventContext.application.getResource("sketchSettingsResource").getCurrentRecord();
			var measureAreaUnit = sketchSettingsResource.get("measureAreaUnit");
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {				
				mobileMaximoSpatial.maximoSpatialStore.updateSketchToolConfig(null, null, measureAreaUnit);
				
			}
		},
		
		
		openSettings: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				eventContext.application.showBusy();
				eventContext.application.ui.show('SketchTool.settings');
				eventContext.application.hideBusy();
								
			} 
		},
		
		
		
		showSettings: function(eventContext) {
			
			var provider = MapProperties.getProperty('provider');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				if (provider == MapProperties.ANYWHERE_PROVIDER_MAPMANAGER && 
						mobileMaximoSpatial.openLayerMap.
						mapManager.mapprovider.toLowerCase() == MapProperties.MAPMANAGER_PROVIDER_SPATIAL &&
						mobileMaximoSpatial.sketchTool != null && mobileMaximoSpatial.sketchTool.isOpened) {
					eventContext.setDisplay(true);
				} else {
					eventContext.setDisplay(false);
				}
			} else {
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
		},
		
		
		showSketchPanel: function(eventContext) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
				eventContext.application.showBusy();
				
				mobileMaximoSpatial.hideWODetailsPanel();
				mobileMaximoSpatial.sketchTool.showDialog();
				
				eventContext.application.hideBusy();
				
			} else {
				eventContext.application.hideBusy();				
				eventContext.application.showMessage(MessageService.createResolvedMessage('noMapManagerFound', [this.userAuthenticationManager.currentUserSite]));
			}
			
		},
		
		logEvent: function(msg) {
			Logger.trace(msg);
			console.log(msg);
		},
					
	});
});
