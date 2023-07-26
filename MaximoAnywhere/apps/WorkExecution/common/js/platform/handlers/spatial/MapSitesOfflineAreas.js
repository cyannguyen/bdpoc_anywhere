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

define("platform/handlers/spatial/MapSitesOfflineAreas", 
		[ "dojo/_base/declare",
		  "dojo/promise/all",
		  "platform/model/ModelService", 
		  "platform/model/ModelData",
		  "platform/model/ModelDataSet",
		  "platform/handlers/_ApplicationHandlerBase",
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
  function(declare, all, ModelService, ModelData, ModelDataSet, ApplicationHandlerBase, CommunicationManager,
		  UserManager, MessageService, lang, PlatformRuntimeException,
PlatformRuntimeWarning, PlatformConstants, Logger, MapGeoLocation, MobileMaximoSpatial, 
MaximoSpatialStore, MapProperties, array, all, Deferred, locale) {
	return declare(ApplicationHandlerBase, {
		
		maximoSpatialStore: null,
		userAuthenticationManager : null,
		currentMapDownload: null,
		
		constructor : function ( options ) {
			this.maximoSpatialStore = new platform.map.spatial.store.MaximoSpatialStore();
			require( [
						"platform/auth/UserAuthenticationManager"
					], dojo.hitch( this, function ( authManager ) {
						this.userAuthenticationManager = authManager;
					} ) );
			dojo.subscribe('_updatePercentComplete', lang.hitch(this, this._updatePercentComplete));
			dojo.subscribe('_closePercentDialog', lang.hitch(this, this._closePercentDialog));
		},
		
		getMobileMaximoSpatialInstance: function() {
			var spatialMapHandler = WL.application["platform.handlers.spatial.SpatialMapHandler"];
			var mobileMaximoSpatial = spatialMapHandler["getMobileMaximoSpatialInstance"]();
			return mobileMaximoSpatial;
		},
		
		syncCurrentMap: function(eventContext) {
			var currentRecord = eventContext.application.getResource("mapOfflineArea").getCurrentRecord();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			this.application.ui.hideCurrentDialog();
			console.log("sync ", currentRecord);
			Logger.trace( "Sync current Map" + currentRecord );
			
			
			CommunicationManager.checkConnectivityAvailable().then(lang.hitch(this, function (isConnectionAvailable) {
		        if (isConnectionAvailable) {
		        	this.application.ui.show('MapView.ProgressDownloadOfflineMap');
					var checkTPK = mobileMaximoSpatial._checkTPKConfigured();
					checkTPK.then(lang.hitch(this, function() {
						var offlineAreaId = currentRecord.offlineAreaId;
						var promiseSync = mobileMaximoSpatial.syncCurrentMapSystemFile(offlineAreaId);
						promiseSync.then(lang.hitch(this, function(result) {
							eventContext.application.hideBusy();
							dojo.publish('_closePercentDialog', []);
							this.initDownLoadOfflineMap( eventContext, true );
						})).otherwise(lang.hitch(this, function(result) {
							eventContext.application.hideBusy();
							dojo.publish('_closePercentDialog', []);
							eventContext.application.showMessage(MessageService.createStaticMessage('errorSyncReplica').getMessage())
						}));
					})).otherwise(lang.hitch(this, function() {
						eventContext.application.showMessage(MessageService.createStaticMessage('localMapNotConfigured').getMessage());
					}));
		        }
		        else {
		        	eventContext.application.showMessage(MessageService.createStaticMessage('deviceIsOffline').getMessage());						
		        }
		    }));
		},
		
		deleteCurrentMap: function(eventContext) {
			var deferred = new Deferred();
			var currentRecord = eventContext.application.getResource("mapOfflineArea").getCurrentRecord();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			this.application.ui.hideCurrentDialog();
			eventContext.application.showBusy();
			console.log("delete current Map ", currentRecord.offlineAreaId);
			Logger.trace( "Delete current Map " + currentRecord.offlineAreaId );
			
			var checkTPK = mobileMaximoSpatial._checkTPKConfigured();
			checkTPK.then(lang.hitch(this, function() {
				var offlineAreaId = currentRecord.offlineAreaId;
				var promise = mobileMaximoSpatial.deleteOfflineDataFromFileSystem( offlineAreaId );
				promise.then(lang.hitch(this, function(result) {
					Logger.trace( "Delete current Map result " + result );
					console.log("Delete current Map result  ", result);
					var promise = this.initDownLoadOfflineMap( eventContext, true );		
	            	promise.then(lang.hitch(this, function() {
	            		eventContext.application.hideBusy();
	            		deferred.resolve();
	        		}));
		        })).otherwise(lang.hitch(this, function(resultJson){
	            		console.error(resultJson);
				      	eventContext.application.hideBusy();
			        	eventContext.application.showMessage(resultJson);	
				}));
			})).otherwise(lang.hitch(this, function() {
				eventContext.application.showMessage(MessageService.createStaticMessage('localMapNotConfigured').getMessage());
			}))
			
			return deferred.promise;
			
		},
		
		_updatePercentComplete: function(message, customMessage) {	
			var dialogId = 'MapView.ProgressDownloadOfflineMap';
			var currentDialog = this.ui.getCurrentDialog();
			if (currentDialog == null || currentDialog.id != dialogId) {
				this.application.ui.show(dialogId);
			}
			var progressRecord = this.ui.application.getResource('PlatformProgressResource').getRecordAt(0);
			if (progressRecord) {				
				var params = null;
				if (customMessage == null) {
					customMessage = 'downloadProgress';
					params = ['',message];
				} else {
					params = [message];
				}
				var msg = MessageService.createResolvedMessage(customMessage, params);
				progressRecord.set('progressMsg', msg);
			}
		},
		
		_closePercentDialog: function() {
			var dialogId = 'MapView.ProgressDownloadOfflineMap';
			var currentDialog = this.ui.getCurrentDialog();
			if (currentDialog != null) {
				this.application.ui.hideCurrentDialog();
			}
			
			
		},
		
		downloadCurrentMap: function(eventContext) {
			var currentRecord;
			if (this.currentMapDownload == null) {
				this.currentMapDownload = eventContext.application.getResource("mapOfflineArea").getCurrentRecord();
			} 
			currentRecord = this.currentMapDownload;
			this.application.ui.hideCurrentDialog();
			console.log("Download current Map ", currentRecord);
			Logger.trace( "Download current Map" + currentRecord );
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			var offlineAreaId = currentRecord.offlineAreaId;
			
			CommunicationManager.checkConnectivityAvailable().then(lang.hitch(this, function (isConnectionAvailable) {
			        if (isConnectionAvailable) {
			        	eventContext.application.showBusy();
			        	this.application.ui.show('MapView.ProgressDownloadOfflineMap');
						this._updatePercentComplete(0);
						if (currentRecord.isPartiallyLoaded == true) {
							// Just need to get the metadata (jsons), the geodatabase was installed using sideloading
							var promiseDownloadOfflineData = mobileMaximoSpatial.downloadOfflineAreaMetaData(offlineAreaId)
							promiseDownloadOfflineData.then(lang.hitch(this, function(ok) {
								dojo.publish('_closePercentDialog', []);
			            		eventContext.application.hideBusy();
			            		this.currentMapDownload = null;
			            		var promise = this.initDownLoadOfflineMap( eventContext, true );		
			            		promise.then(lang.hitch(this, function() {			            			
					            	var logEntry = "Hide Busy icon ";
									console.log(logEntry);
									Logger.trace(logEntry);
		            				eventContext.application.hideBusy();
			        			}));
							})).otherwise(lang.hitch(this, function(error) {
								this.currentMapDownload = null;
								dojo.publish('_closePercentDialog', []);
			            		eventContext.application.hideBusy();
			            		
								eventContext.application.showMessage(error);
							}));
						} else {
							var checkTPK = mobileMaximoSpatial._checkTPKConfigured();
							checkTPK.then(lang.hitch(this, function() {
								Logger.trace("Downloading Replicas Using Map manager");
								var offlineAreaPromise = mobileMaximoSpatial.downloadOfflineAreaFromMapManager(offlineAreaId);
								offlineAreaPromise.then(lang.hitch(this, function(result) {
									dojo.publish('_closePercentDialog', []);
									this.currentMapDownload = null;
					            	var promise = this.initDownLoadOfflineMap( eventContext, true );		
					            	promise.then(lang.hitch(this, function() {
					            		eventContext.application.hideBusy();
							           	deferred.resolve();
					        		}));
								})).otherwise(lang.hitch(this, function(error){
									// In case of error, delete the maps already downloaded
									var promise = mobileMaximoSpatial.deleteOfflineDataFromFileSystem( offlineAreaId );
									promise.then(lang.hitch(this, function(result) {
										Logger.trace( "Delete current Map result " + result );
										console.log("Delete current Map result  ", result);
										dojo.publish('_closePercentDialog', []);
									    console.log("Download interrupted!");
									    this.currentMapDownload = null;
									    eventContext.application.hideBusy();
									    eventContext.application.showMessage(MessageService.createStaticMessage('errorDownloadingMap').getMessage());
							        })).otherwise(lang.hitch(this, function(resultJson){
							        	dojo.publish('_closePercentDialog', []);
									    console.log("Download interrupted!");
									    eventContext.application.hideBusy();
									    eventContext.application.showMessage(MessageService.createStaticMessage('errorDownloadingMap').getMessage());
									}));
									
								}));
							})).otherwise(lang.hitch(this, function() {
								eventContext.application.showMessage(MessageService.createStaticMessage('localMapNotConfigured').getMessage());		
							}));
						}
			        }
			        else {
			        	eventContext.application.showMessage(MessageService.createStaticMessage('deviceIsOffline').getMessage());						
			        }
			    }));
		},
		
		downloadDeleteOrSyncOfflineArea: function(eventContext) {
			var currentRecord = eventContext.getCurrentRecord();
			if (currentRecord.isDownloaded == true) {
				eventContext.ui.show('Platform.DeleteOrSyncCurrentRecord');
			} else {				
				eventContext.ui.show('Platform.DownloadCurrentRecord');
				
			}
		},
		
		switchToOfflineEnable: function(eventContext) {
			var provider = MapProperties.getProperty('provider');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				if (provider == MapProperties.ANYWHERE_PROVIDER_MAPMANAGER && 
						mobileMaximoSpatial.openLayerMap.
						mapManager.mapprovider.toLowerCase() == MapProperties.MAPMANAGER_PROVIDER_SPATIAL) {
					eventContext.setDisplay(mobileMaximoSpatial.showingOnlineMap);
				} else {
					eventContext.setDisplay(false);
				}	
			} else {
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
			
						
		},
		
		switchToOnlineEnable: function(eventContext) {
			var provider = MapProperties.getProperty('provider');
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				if (provider == MapProperties.ANYWHERE_PROVIDER_MAPMANAGER && 
						mobileMaximoSpatial.openLayerMap.
						mapManager.mapprovider.toLowerCase() == MapProperties.MAPMANAGER_PROVIDER_SPATIAL) {
					eventContext.setDisplay(!mobileMaximoSpatial.showingOnlineMap);
				} else {
					eventContext.setDisplay(false);
				}
			} else {
				//Map didn't load yet
				eventContext.setDisplay(false);
			}
		},
		
		ignoreExpiredDataAndKeepLoading: function(eventContext) {
			this.application.ui.hideCurrentDialog();
			this.switchMap( eventContext );
		},
		
		initDownLoadOfflineMapLazyCheck: function(eventContext) {
			this.ignoreExpiredDataAndKeepLoadingLazyCheck(eventContext);
			setTimeout(lang.hitch(this, function() {
				this.initDownLoadOfflineMap(eventContext);	
			}), 200);
			
		},
		
		ignoreExpiredDataAndKeepLoadingLazyCheck: function(eventContext) {
			this.application.ui.hideCurrentDialog();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial) {
				mobileMaximoSpatial._onMoveEnd();
				mobileMaximoSpatial._addOnClickMap();
				var mapHandler = window.UI.application["platform.handlers.MapHandler"];
				if (mapHandler) {
					mapHandler.mapControl.setCurrentMarker()
				}
				
			}
		},
		
		handleBackButtonClick: function(eventContext) {
			var workOrderSet = eventContext.application.getResource("workOrder");
			if (workOrderSet) {
				var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
				if (mobileMaximoSpatial) {
					var offlineAreasLoaded = mobileMaximoSpatial.offlineAreasLoaded;
					if (offlineAreasLoaded.length == 0) {
						mobileMaximoSpatial.loadOnlineMap();
					}
				}				
			}
			eventContext.ui.hideCurrentView();
		},
		
		switchMap: function(eventContext) {
			var workOrderSet = eventContext.application.getResource("workOrder");
			this.application.ui.hideCurrentDialog();
			eventContext.application.showBusy();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial.showingOnlineMap) {
				var checkTPK = mobileMaximoSpatial._checkTPKConfigured();
				checkTPK.then(lang.hitch(this, function() {
					console.log("Loading All Replicas for offline area ");
					
					var hasOfflineData = mobileMaximoSpatial.hasOfflineDataToLoadFromTPK();
					hasOfflineData.then(lang.hitch(this, function(){
						var loadMetadataOfflineAreas = mobileMaximoSpatial.spatialReplicaManager._loadMetadataForAllReplicasAvaiable();
						loadMetadataOfflineAreas.then(lang.hitch(this, function(offlineAreasId) {
							mobileMaximoSpatial.loadOfflineMapFromTPK();
						})).otherwise(lang.hitch(this, function() {
							eventContext.application.hideBusy();
							eventContext.application.showMessage(MessageService.createResolvedMessage('noOfflineDataToShow'));
						}));
					})).otherwise(lang.hitch(this, function(error){
						eventContext.application.hideBusy();
						eventContext.application.showMessage(MessageService.createResolvedMessage('noOfflineDataToShow'));
					}));
					
					
				})).otherwise(lang.hitch(this, function() {
					eventContext.application.showMessage(MessageService.createResolvedMessage('localMapNotConfigured'));
				}));
			} else {
				
				var checkTPK = mobileMaximoSpatial._checkTPKConfigured();
				checkTPK.then(lang.hitch(this, function() {
					console.log("Closing replica files");
					mobileMaximoSpatial.unloadTPKOfflineMap();
					var promises = mobileMaximoSpatial.loadOnlineMap(true);
					promises.then(lang.hitch(this, function() {
						eventContext.application.hideBusy();
						this.maximoSpatialStore.updateMapConfig( mobileMaximoSpatial.showingOnlineMap );
						mobileMaximoSpatial.setZoomStatus(null);
					}));
				})).otherwise(lang.hitch(this, function() {
					var promises = mobileMaximoSpatial.loadOnlineMap(false);
					promises.then(lang.hitch(this, function() {
						eventContext.application.hideBusy();
						this.maximoSpatialStore.updateMapConfig( mobileMaximoSpatial.showingOnlineMap );
						mobileMaximoSpatial.setZoomStatus(null);
					}));
				}))
				
			}
			
		},
		
		_createOfflineAreasList: function(coordinate, eventContext, refreshView, deferred) {
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			if (mobileMaximoSpatial != null) {
				var mapManagerInfo = mobileMaximoSpatial.mapManager;
				
				var checkTPK = mobileMaximoSpatial._checkTPKConfigured();
				checkTPK.then(lang.hitch(this, function() {
					
					var promiseCheckHasReplicaExpired = mobileMaximoSpatial.spatialReplicaManager.hasReplicasExpired(mobileMaximoSpatial);
		    		promiseCheckHasReplicaExpired.then(lang.hitch(this, function(ok) {
		    			var offlineAreasAvailable = mobileMaximoSpatial.spatialReplicaManager.getOfflineAreasAvailable();
						offlineAreasAvailable.then(lang.hitch(this, function(offlineAreasIds) {
							Logger.trace( "Mapmanager Data" + mapManagerInfo );
							var mapSite = mapManagerInfo.currentMapSite;
							var offlineAreaSelected = null;
							var promisses = [];
							if ( mapSite ) {
							  var offlineAreas = mapSite['spi_spatial:oslcofflinearea'];
							  var mapOfflineArea = eventContext.application.getResource("mapOfflineArea");
							  if (mapOfflineArea.data.length>0) {
							    mapOfflineArea.data = [];
							  }
							  var currentIndex = 0;
							  var offlineAreaItems = [];
							  var areasToCheck = offlineAreas.length;
							  array.forEach( offlineAreas, lang.hitch( this, function ( offlineArea, i ) {
								  
								var extent = JSON.parse(offlineArea['spi_spatial:mblextent']).extent;	
							    var currentOfflineAreaId =  offlineArea['spi_spatial:offlineareauid'];
							    var mapOfflineAreaDisp = mapOfflineArea.createNewRecord();
								   
							    var boundingExtend = ol.extent.boundingExtent(extent[0]);
							    if (coordinate != null) {
							      var isDefaultArea = ol.extent.containsCoordinate(boundingExtend, coordinate);
							      if (isDefaultArea == true) {
							        currentIndex = i;
							      }	
							      if (isDefaultArea == true) {
										mapOfflineAreaDisp.set('cssShowCurrentLocation', 'showCurrentLocMapOffline');
										mapOfflineAreaDisp.set('locdesc', MessageService.createResolvedMessage("currentLocation", []));
									} else {
										mapOfflineAreaDisp.set('cssShowCurrentLocation', 'hideCurrentLocMapOffline');
									}
							    } else {
							    	mapOfflineAreaDisp.set('cssShowCurrentLocation', 'hideCurrentLocMapOffline');
							    }
							    
							    var offlineAreaName = offlineArea['spi_spatial:mblareaname'];
							    mapOfflineAreaDisp.set('offlineAreaName', offlineAreaName);
							    mapOfflineAreaDisp.set('offlineAreaId', currentOfflineAreaId);
							    
							    
							    var replicas = offlineArea['spi_spatial:OFFLINEMAPSERVICEREPLICA'];
							    var offlineSize = 0;
							    
							    if (replicas) {
							    	replicas.forEach(lang.hitch( this, function ( replica, i ) {
										var replicaSizeStr = replica['spi_spatial:geodatabasesize'];
										if (replicaSizeStr) {
											var replicaSize = Number(replicaSizeStr);
											offlineSize += replicaSize;
										}
									}));
							    }
								if (offlineSize > 0) {
							      mapOfflineAreaDisp.set('downloadSizeMB', Number(offlineSize).toFixed(2) + " MB");
							    }					
							    var offlineAreaExists = false;
							    array.forEach( offlineAreasIds, lang.hitch( this, function ( offlineAreasId, i ) {
							      if (currentOfflineAreaId == offlineAreasId) {
							        offlineAreaExists = true;
							      }
							    }));
							    
							    if (offlineAreaExists) {
							    	
							    	var configOk = mobileMaximoSpatial.spatialReplicaManager.checkConfigurationForOfflineArea(currentOfflineAreaId);
							    	configOk.then(lang.hitch(this, function(ok) {
							    		areasToCheck--;
							    		mapOfflineAreaDisp.isDownloaded = true;
									    mapOfflineAreaDisp.set('downloadedImg', 'calibrationpoint_normal_status');
									    mapOfflineAreaDisp.set('cssShowLastSync', 'showLastSync');
									      
									    var syncDaysToExpire;
									    var offlineMapConfig = mobileMaximoSpatial.spatialReplicaManager.getOfflineMapConfig(currentOfflineAreaId);
									    if (offlineMapConfig) {
									    	var lastSyncDate = offlineMapConfig.lastSyncDate;
									    	if (lastSyncDate) {
									    		 var lastSync = new Date(lastSyncDate);
											      
											    syncDaysToExpire = Number(MapProperties.getProperty('si.map.esri.syncDaysToExpire'));
											    var lastSyncDateLabel = locale.format(lastSync,{
											        selector: "date",
											        formatLength: "short"
											    });
											    var lastSyncMessage = MessageService.createResolvedMessage('lastSyncLabel', [lastSyncDateLabel]);
											    
											    if (offlineMapConfig.expired) {
											    	lastSyncMessage = lastSyncMessage + " - " + MessageService.createResolvedMessage('lastSyncExpired', []);
											    } else {
											    	if (syncDaysToExpire > 0) {
													     var dateToExpire = new Date(lastSync);
													     dateToExpire.setDate(lastSync.getDate() + syncDaysToExpire);
													     var today = new Date();
													        
													     if (dateToExpire >= today) {									
													        var msPerDay = 1000 * 60 * 60 * 24;
													        var utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
													        var utc2 = Date.UTC(dateToExpire.getFullYear(), dateToExpire.getMonth(), dateToExpire.getDate());
													        var daysToExpire = Math.floor((utc2 - utc1) / msPerDay);
													        lastSyncMessage = lastSyncMessage + " - " + MessageService.createResolvedMessage('lastSyncExpires', [daysToExpire]);
													     } else {
													        lastSyncMessage = lastSyncMessage + " - " + MessageService.createResolvedMessage('lastSyncExpired', []);
													     }
												     }
											    }
											    
												mapOfflineAreaDisp.set('lastSync', lastSyncMessage);
												 
												if (areasToCheck <= 0) {
												   	if(mapOfflineArea.data.length>0){
													    mapOfflineArea.setCurrentIndex(currentIndex);
													}
												   	if (refreshView == true) {
													  this.ui.getCurrentViewControl().refresh();
													} else {
													  eventContext.application.ui.show('MapView.downloadOfflineArea');
													}				
													eventContext.application.hideBusy();
												}
									    	  }
									      }
							    	})).otherwise(lang.hitch(this, function(nok) {
							    		areasToCheck--;
							    		mapOfflineAreaDisp.isDownloaded = false;
							    		mapOfflineAreaDisp.isPartiallyLoaded = true;
							    		mapOfflineAreaDisp.set('downloadedImg', 'map_warning');
									    mapOfflineAreaDisp.set('cssShowLastSync', 'hideLastSync');
									    
									    if (areasToCheck <= 0) {
									    	if(mapOfflineArea.data.length>0){
											    mapOfflineArea.setCurrentIndex(currentIndex);
											}
									    	if (refreshView == true) {
											  this.ui.getCurrentViewControl().refresh();
											} else {
											  eventContext.application.ui.show('MapView.downloadOfflineArea');
											}				
											eventContext.application.hideBusy();
									    }
							    	}));
							    } else {
							      areasToCheck--;
							      mapOfflineAreaDisp.isDownloaded = false;
							      mapOfflineAreaDisp.set('downloadedImg', 'icon_download');
							      mapOfflineAreaDisp.set('cssShowLastSync', 'hideLastSync');
							      if (areasToCheck <= 0) {
								    	if(mapOfflineArea.data.length>0){
										    mapOfflineArea.setCurrentIndex(currentIndex);
										}
								    	if (refreshView == true) {
										  this.ui.getCurrentViewControl().refresh();
										} else {
										  eventContext.application.ui.show('MapView.downloadOfflineArea');
										}				
										eventContext.application.hideBusy();
								    }
							    }
							    
							    
							    
							  } ) );
							  
							  
							} 
							
						}));
		    		})).otherwise(lang.hitch(this, function(error) {
		    			eventContext.application.hideBusy();				
						eventContext.application.showMessage(MessageService.createResolvedMessage('noMapManagerFound', [this.userAuthenticationManager.currentUserSite]));
		    		}))
				})).otherwise(lang.hitch(this, function() {
					eventContext.application.showMessage(MessageService.createStaticMessage('localMapNotConfigured').getMessage());
				}));
				
				
				
			} else {
				eventContext.application.hideBusy();				
				eventContext.application.showMessage(MessageService.createResolvedMessage('noMapManagerFound', [this.userAuthenticationManager.currentUserSite]));
			}
			
			
		},
		
		initDownLoadOfflineMap : function(eventContext, refreshView) {	
			var logEntry = "initDownLoadOfflineMap start ";
			console.log(logEntry);
			Logger.trace(logEntry);
			var deferred = new Deferred();
			var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
			this.application.ui.hideCurrentDialog();
			
			mobileMaximoSpatial.setZoomStatus(mobileMaximoSpatial.openLayerMap.STATUS_EMPTY);
			this._createOfflineAreasList(null, eventContext, refreshView, deferred);
			return deferred.promise;
		}
		
					
	});
});
