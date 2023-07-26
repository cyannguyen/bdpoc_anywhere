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

define("application/handlers/MetersListHandler", 
	   [ "dojo/_base/declare",
	     "dojo/_base/array",
	     "dojo/_base/lang",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/util/PlatformConstants",
	     "platform/model/ModelService",
	     "application/handlers/CommonHandler",
	     "dojo/promise/all",
		  "platform/translation/MessageService",
		  "platform/logging/Logger",
		  "dojo/Deferred",
		  "platform/store/_ResourceMetadataContext",
		  "platform/comm/CommunicationManager"
	     ],
function(declare, arrayUtil, lang, ApplicationHandlerBase, PlatformConstants, ModelService, CommonHandler, all, MessageService, Logger, Deferred, ResourceMetaData, CommunicationManager) {	
	return declare( [ApplicationHandlerBase], {	
		
/**@memberOf application.handlers.MetersListHandler */
		//used to keep indexes during meters navigation (list/detail)
		_currentIndexOf: {},
		
		initializeMeters : function (eventContext) {
			this._currentIndexOf = {};
			//initialize in-memory resource
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var currentRecord = eventContext.application.getResource('workOrder').getCurrentRecord();
			if (currentRecord && currentRecord != null) {
				currentRecord.set('meterslistsize',"--");
			
				woAssetLocMeterInfo.set("woAssetMeterCount", 0);
				woAssetLocMeterInfo.set("woLocationMeterCount", 0);
				woAssetLocMeterInfo.set("totalWOLocationMeterCount", 0);
				woAssetLocMeterInfo.set("totalWOAssetMeterCount", 0);
				woAssetLocMeterInfo.set("taskAssetMeterCount", 0);
				woAssetLocMeterInfo.set("taskLocationMeterCount", 0);
				woAssetLocMeterInfo.set("originatingAction", "");		

				//listening to the workorder asset field for any change
				eventContext.addResourceWatchHandle(currentRecord.watch("asset", lang.hitch(this, function(attrName, oldValue, newValue){	
					this.getAllAssetMeters(eventContext, woAssetLocMeterInfo);
				})));
				
				//listening to the workorder location field for any change
				eventContext.addResourceWatchHandle(currentRecord.watch("location", lang.hitch(this, function(attrName, oldValue, newValue){	
					this.getAllLocationMeters(eventContext, woAssetLocMeterInfo);
				})));
				
				//set loading flags to true since we are about to load asset and location meters
				woAssetLocMeterInfo.set("loadingAssetMeterCount", true);
				woAssetLocMeterInfo.set("loadingLocationMeterCount", true);
				
				//fetch all meters on workorder
				this.getAllAssetMeters(eventContext, woAssetLocMeterInfo);
				this.getAllLocationMeters(eventContext, woAssetLocMeterInfo);	
			}
		},
		
		hideWOAssetMeterButton: function(eventContext) {
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var count = woAssetLocMeterInfo.get('woAssetMeterCount');
			if (!count || count<1){
				eventContext.setDisplay(false);
			}
			
			eventContext.addResourceWatchHandle(woAssetLocMeterInfo.watch("woAssetMeterCount", lang.hitch(this, function(attrName, oldValue, newValue){
				eventContext.setDisplay(newValue > 0);
		    })));
		},

		hideWOLocationMeterButton: function(eventContext) {
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var count = woAssetLocMeterInfo.get('woLocationMeterCount');
			if (!count || count<1){
				eventContext.setDisplay(false);
			}

			eventContext.addResourceWatchHandle(woAssetLocMeterInfo.watch("woLocationMeterCount", lang.hitch(this, function(attrName, oldValue, newValue){
				eventContext.setDisplay(newValue > 0);
		    })));
		},
	
		hideMultiAssetLocMeterButton: function(eventContext) {
			var promise = this.getMultiAssetLocationMeters(eventContext);
			promise.then(function(countObj){
				if ((countObj.assetMeterCount + countObj.locationMeterCount) > 0) {
					eventContext.setDisplay(true);
				} else {
					eventContext.setDisplay(false);
				}	
			});
		},

		hideTaskAssetMeterButton : function(eventContext) {
			var assetnum = eventContext.getCurrentRecord().get('assetnum');
			if (!assetnum){
				eventContext.setVisibility(false);
				return;
			}
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var siteid = CommonHandler._getWorkorderSiteId(eventContext);
			var self = this;
			var deferred = new Deferred();

			var count = woAssetLocMeterInfo.get('taskAssetMeterCount');
			if (!count || count<1){
				eventContext.setVisibility(false);
			}
			
			//listening to the wo task asset count for any change
			eventContext.addResourceWatchHandle(woAssetLocMeterInfo.watch("taskAssetMeterCount", lang.hitch(this, function(attrName, oldValue, newValue){
				eventContext.setVisibility(newValue > 0);
		    })));
			var updateTaskMeterList = function(meterData){
				self.setAssetMeterResource(eventContext, meterData, "tempListViewAssetMeter","TASK").then(function(count){
					var tempListViewAssetMeter = eventContext.application.getResource('tempListViewAssetMeter');
					if(tempListViewAssetMeter.count()>0){
						tempListViewAssetMeter.setCurrentIndex(0);
					}
					woAssetLocMeterInfo.set("taskAssetMeterCount", count);
					deferred.resolve(count);
				});
			};
			
			var meterFilter = {'assetnum' : assetnum, siteid : siteid};
			ModelService.filtered('assetMeters', null, meterFilter, 1000, false, false, null, true).then(function(assetMeterSet){
				assetMeterSet.filter('assetnum == $1', assetnum); //Filter set instead of using exactmatch index so users don't have to reinstall the app for added exact match index.
				updateTaskMeterList(assetMeterSet.data);
			}).otherwise(function(){
				updateTaskMeterList([]);
			});
			
			var woAssetLocMeterInfo = eventContext.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			woAssetLocMeterInfo.set('originatingAction', "TASK");
			
			return deferred.promise;
		},

		hideTaskLocationMeterButton : function(eventContext) {
			var location = eventContext.getCurrentRecord().get('location');
			if (!location){
				eventContext.setVisibility(false);
				return;
			}
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var siteid = CommonHandler._getWorkorderSiteId(eventContext);
			var self = this;
			var deferred = new Deferred();
			var count = woAssetLocMeterInfo.get('taskLocationMeterCount');
			if (!count || count<1){
				eventContext.setVisibility(false);
			}
			
			//listening to the wo task location count for any change			
			eventContext.addResourceWatchHandle(woAssetLocMeterInfo.watch("taskLocationMeterCount", lang.hitch(this, function(attrName, oldValue, newValue){
				eventContext.setVisibility(newValue > 0);
		    })));
			var updateTaskLocList = function(meterData){
				self.setLocationMeterResource(eventContext, meterData, "tempListViewLocationMeter","TASK").then(function(count){
					var tempListViewLocationMeter = eventContext.application.getResource('tempListViewLocationMeter');
					if(tempListViewLocationMeter.count()>0){
						tempListViewLocationMeter.setCurrentIndex(0);
					}
					woAssetLocMeterInfo.set("taskLocationMeterCount", count);
					deferred.resolve(count);
				});
			};

			var meterFilter = {'location' : location, siteid : siteid};
			ModelService.filtered('locationMeters', null, meterFilter, 1000, false, false, null, true).then(function(locationMeterSet){
				locationMeterSet.filter('location == $1', location); //Filter set instead of using exactmatch index so users don't have to reinstall the app for added exact match index.
				updateTaskLocList(locationMeterSet.data);
			}).otherwise(function(){
				updateTaskLocList([]);
			});
			
			var woAssetLocMeterInfo = eventContext.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			woAssetLocMeterInfo.set('originatingAction', "TASK");
			
			return deferred.promise;
		},
		
		showAssetMeterViewList: function(eventContext) {
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var total = woAssetLocMeterInfo.get('woAssetMeterCount');
			if (total > 1) {			
				eventContext.ui.show('WorkExecution.AssetMeterViewList');	
			} else {
				var tempAssetMeter = eventContext.application.getResource("tempAssetMeter");
			    var woAssetMeters = eventContext.application.getResource("woAssetMeters");
			    tempAssetMeter.data = woAssetMeters.data;				
				eventContext.ui.show('WorkExecution.AssetMeterDetailView');
			}
		},		
		
		showLocationMeterViewList: function(eventContext) {
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var total = woAssetLocMeterInfo.get('woLocationMeterCount');
			if (total > 1) {
				eventContext.ui.show('WorkExecution.LocationMeterViewList');	
			} else {
				var tempLocationMeter = eventContext.application.getResource("tempLocationMeter");
			    var woLocationMeters = eventContext.application.getResource("woLocationMeters");
			    tempLocationMeter.data = woLocationMeters.data;
				eventContext.ui.show('WorkExecution.LocationMeterDetailView');
			}
		},
		
		showMultiAssetLocMeters : function(eventContext) {
			var promise = this.getMultiAssetLocationMeters(eventContext);
			promise.then( function (countObj) {
				if ((countObj.assetMeterCount > 0 && countObj.locationMeterCount > 0)){
					eventContext.ui.show('WorkExecution.MultiAssetLocCIMeterList');	
				} else if (countObj.assetMeterCount > 1 && countObj.locationMeterCount == 0) {
						eventContext.ui.show('WorkExecution.MultiAssetLocAssetMeterViewList');
				} else if (countObj.assetMeterCount == 0 && countObj.locationMeterCount > 1) {
						eventContext.ui.show('WorkExecution.MultiAssetLocLocationMeterViewList');
				} else if (countObj.assetMeterCount == 1 && countObj.locationMeterCount == 0) {
						var tempAssetMeter = eventContext.application.getResource("tempAssetMeter");
					    var tempListViewAssetMeter = eventContext.application.getResource("tempListViewAssetMeter");
					    tempAssetMeter.data = tempListViewAssetMeter.data;
					    eventContext.ui.show('WorkExecution.AssetMeterDetailView');
				} else {
					var tempLocationMeter = eventContext.application.getResource("tempLocationMeter");
				    var tempListViewLocationMeter = eventContext.application.getResource("tempListViewLocationMeter");
				    tempLocationMeter.data = tempListViewLocationMeter.data;
					eventContext.ui.show('WorkExecution.LocationMeterDetailView');
				}
			});
		},		

		showTaskAssetMeterViewList: function(eventContext) {
			var promise = this.hideTaskAssetMeterButton(eventContext);
			promise.then(function(count){
				if (count > 1) {
					eventContext.ui.show('WorkExecution.TaskAssetMeterViewList');	
				} else {
					var tempAssetMeter = eventContext.application.getResource("tempAssetMeter");
				    var tempListViewAssetMeter = eventContext.application.getResource("tempListViewAssetMeter");
				    tempAssetMeter.data = tempListViewAssetMeter.data;				
					eventContext.ui.show('WorkExecution.AssetMeterDetailView');
				}
			});			
		},
		
		showTaskLocationMeterViewList: function(eventContext) {
			var promise = this.hideTaskLocationMeterButton(eventContext);
			promise.then(function(count){
				if (count > 1) {
					eventContext.ui.show('WorkExecution.TaskLocationMeterViewList');	
				} else {
					var tempLocationMeter = eventContext.application.getResource("tempLocationMeter");
				    var tempListViewLocationMeter = eventContext.application.getResource("tempListViewLocationMeter");
				    tempLocationMeter.data = tempListViewLocationMeter.data;					
					eventContext.ui.show('WorkExecution.LocationMeterDetailView');
				}
			});
		},		
		
		getAllAssetMeters : function (eventContext, woAssetLocMeterInfo){
			
			woAssetLocMeterInfo.set("loadingAssetMeterCount", true);
			var self = this;
			var totalAssetDeferred = new Deferred();
			var singleAssetDeferred = new Deferred(); 
			var deferred = new Deferred();
			var assetList = [];
			var wo = eventContext.application.getResource('workOrder').getCurrentRecord();
			
			//initialize complex attributes related to workorder
			var complexlistPromise = all([wo.getModelDataSet('multiassetloclist', true), wo.getModelDataSet('tasklist', true)]);
			
			//get asset from workorder header level
			var assetnum = wo.getPendingOrOriginalValue('asset');
			if (assetnum){
				assetnum = assetnum.replace(/#/g, '%23');
				if (assetList.indexOf(assetnum)<0){
					assetList.push(assetnum);
				}
			}
			complexlistPromise.then(function(){
				
				var taskSet = wo.tasklist;
				if (taskSet){
					arrayUtil.forEach(taskSet.data, function(task){
						var taskAsset = task['assetnum'];
						if (taskAsset){
							if (assetList.indexOf(taskAsset)<0){
								assetList.push(taskAsset);
							}
						}
					});
				}

				var multiAssetLocciSet =  wo.multiassetloclist;
				if (multiAssetLocciSet){
					arrayUtil.forEach(multiAssetLocciSet.data, function(multiAssetLocci){
						var multiAsset = multiAssetLocci['assetnum'];
						if (multiAsset){
							if (assetList.indexOf(multiAsset)<0){
								assetList.push(multiAsset);
							}
						}
					});
				}
				
				
				var updateWoAssetMeter = function (meterData){
					self.setAssetMeterResource(eventContext, meterData, "woAssetMeters").then(function(count){
						woAssetLocMeterInfo.set("woAssetMeterCount", count);
						singleAssetDeferred.resolve();
					});
					
				};
				var updateTotalAssetMeter = function(meterData){
					self.setAssetMeterResource(eventContext, meterData, "totalWOAssetMeters", null, assetList).then(function(count){
						//reset asset meter count flag
						woAssetLocMeterInfo.set("loadingAssetMeterCount", false);
						woAssetLocMeterInfo.set("totalWOAssetMeterCount", count);
						
						//IJ29302 Forcing to update the meter list count 
						//if (!woAssetLocMeterInfo.get("loadingLocationMeterCount")) {
							//if loadingLocationMeterCount is false -- then mark it as resolved and update total meter count
							var total = woAssetLocMeterInfo.totalWOAssetMeterCount + woAssetLocMeterInfo.totalWOLocationMeterCount;
							wo.set('meterslistsize','' + total);
						//}
						assetList = [];
						totalAssetDeferred.resolve();
					});
				};
				if (assetList.length > 0){
					var siteid = CommonHandler._getWorkorderSiteId(eventContext);
					var localAssetFilter = [];
					var asslist = "";
					var assetFirstTime = true;
					var setFilter = null;
					assetList.forEach(function(asset){
						asset = asset.replace(/#/g, '%23');
						if (assetFirstTime){
							asslist='%22'+asset+'%22';	
							setFilter = 'assetnum == "' + asset +'"';
							assetFirstTime = false;
						} else {
							asslist+=',%22'+asset+'%22';		
							setFilter += ' ||  assetnum == "' + asset +'"';
						}
						localAssetFilter.push({'assetnum' : asset, siteid : siteid});
					});
					
					var oslcWhere = "spi:asset{oslc:shortTitle in ["+asslist+"]} and spi:siteid=%22"+siteid+"%22";
					ModelService.allWIthOslcWhereAndLocalQuery('assetMeters', oslcWhere, localAssetFilter, null, 1000, false).then (function(assetMeterSet) {
						assetMeterSet.filter('('+ setFilter + ') && active == true');
						updateTotalAssetMeter(assetMeterSet.data);
						var woAssetMeters = assetMeterSet.find('assetnum == $1  && siteid == $2', assetnum, siteid);
						updateWoAssetMeter(woAssetMeters);
						assetMeterSet = null;
					}).otherwise(function(error){
						Logger.error("[WOExtDownloadHandler.loadMeters] failed getting asset meters for wo " + wo.get("wonum") + " from JSONStore.", error);
						updateWoAssetMeter([]);
						updateTotalAssetMeter([]);
					});
				}
				else{
					Logger.trace('[WOExtDownloadHandler.loadMeters] no assets on work orders.');
					updateWoAssetMeter([]);
					updateTotalAssetMeter([]);
				}
			});
			
			all([singleAssetDeferred.promise,totalAssetDeferred.promise]).then(function(results){
				deferred.resolve();
			});
			
			return deferred.promise;
		},

		getAllLocationMeters : function (eventContext, woAssetLocMeterInfo){
			
			woAssetLocMeterInfo.set("loadingLocationMeterCount", true);
			var self = this;
			var totalLocationDeferred = new Deferred();
			var singleLocationDeferred = new Deferred(); 
			var deferred = new Deferred(); 
			var locationList = [];
			var wo = eventContext.application.getResource('workOrder').getCurrentRecord();
			
			//initialize complex attributes related to workorder
			var complexlistPromise = all([wo.getModelDataSet('multiassetloclist', true), wo.getModelDataSet('tasklist', true)]);
			
			//get location from workorder header level
			var location = wo.getPendingOrOriginalValue('location');
			if (location){
				if (locationList.indexOf(location)<0){
					locationList.push(location);
				}
			}
			
			complexlistPromise.then(function(){
				
				var taskSet = wo.tasklist;
				if (taskSet){
					arrayUtil.forEach(taskSet.data, function(task){
						var taskLocation = task['location'];
						if (taskLocation){
							if (locationList.indexOf(taskLocation)<0){
								locationList.push(taskLocation);
							}
						}
					});
				}

				var multiAssetLocciSet =  wo.multiassetloclist;
				if (multiAssetLocciSet){
					arrayUtil.forEach(multiAssetLocciSet.data, function(multiAssetLocci){
						var multiAssetLoc = multiAssetLocci['location'];
						if (multiAssetLoc){
							if (locationList.indexOf(multiAssetLoc)<0){
								locationList.push(multiAssetLoc);
							}
						}
					});
				}
				
				var updateWOLocMeter = function(meterData){
					self.setLocationMeterResource(eventContext, meterData, "woLocationMeters").then(function(count){
						woAssetLocMeterInfo.set("woLocationMeterCount", count);
						singleLocationDeferred.resolve();
					});
				};

				var updateTotalLocMeter = function(meterData){
					self.setLocationMeterResource(eventContext, meterData, "totalWOLocationMeters", null, locationList).then(function(count){
						//reset location meter count flag
						woAssetLocMeterInfo.set("loadingLocationMeterCount", false);
						woAssetLocMeterInfo.set("totalWOLocationMeterCount", count);
						if (!woAssetLocMeterInfo.get("loadingAssetMeterCount")) {
							//if loadingAssetMeterCount is false -- then mark it as resolved and update total meter count
							var total = woAssetLocMeterInfo.totalWOAssetMeterCount + woAssetLocMeterInfo.totalWOLocationMeterCount;
							wo.set('meterslistsize','' + total);
						}					
						totalLocationDeferred.resolve();
					});
					locationList = [];
				};
				
				if (locationList.length > 0){
					var siteid = CommonHandler._getWorkorderSiteId(eventContext);
					var localLocationFilter = [];
				//build in clause of locations
					var loclist = "";
					var locationFirstTime = true;
					var setFilter = null;
					locationList.forEach(function(location){
						if (locationFirstTime){
							loclist='%22'+location+'%22';	
							locationFirstTime = false;
							setFilter = 'location == "' + location +'"';
						} else {
							loclist+=',%22'+location+'%22';		
							setFilter += ' ||  location == "' + location +'"';
						}
						localLocationFilter.push({'location' : location, siteid : siteid});
						
					});	
					var oslcWhere = ("spi:location{oslc:shortTitle in ["+loclist+"]} and spi:siteid=%22"+siteid+"%22");

					ModelService.allWIthOslcWhereAndLocalQuery('locationMeters', oslcWhere, localLocationFilter, null, 1000, false).then (function(locationMeterSet) {
						locationMeterSet.filter('('+ setFilter + ') && active == true');
						updateTotalLocMeter(locationMeterSet.data);							
						var woLocMeters = locationMeterSet.find('location == $1  && siteid == $2', location, siteid);
						updateWOLocMeter(woLocMeters);
						locationMeterSet = null;
					}).otherwise(function(error){
						Logger.error("[WOExtDownloadHandler.loadMeters] failed getting location meters for wo " + wo.get("wonum") + " from JSONStore.", error);
						updateTotalLocMeter([]);							
						updateWOLocMeter([]);
					});
				}
				else{
					Logger.trace('[WOExtDownloadHandler.loadMeters] no locations on work orders.');
					updateWOLocMeter([]);
					updateTotalLocMeter([]);							
				}
				
			});
			
			all([singleLocationDeferred.promise,totalLocationDeferred.promise]).then(function(results){
				deferred.resolve();
			});
			
			return deferred.promise;
		},
		
		getMultiAssetLocationMeters : function(eventContext, selectedRecord){
			var self = this;
			var wo = eventContext.application.getResource('workOrder').getCurrentRecord();
			var siteid = CommonHandler._getWorkorderSiteId(eventContext);
			
			var deferred = new Deferred();
			var assetDeferred = new Deferred();
			var locationDeferred = new Deferred();
			
			var assetMeterCount = 0;
			var locationMeterCount = 0;
				
			//check if selected record exists / used when entering meterreadings from meterreading handler
			var multiAssetLocci = eventContext.getCurrentRecord();
			if (selectedRecord == null){
				multiAssetLocci =  eventContext.getCurrentRecord();
			} else {
				multiAssetLocci =  selectedRecord;
			}
			
			//initialize complex attributes related to workorder
			var complexlistPromise = wo.getModelDataSet('multiassetloclist', true);
			
			complexlistPromise.then(function(){
				if (multiAssetLocci){
					var location = multiAssetLocci.get('location');
					var updateMALLocList = function(meterData){
						self.setLocationMeterResource(eventContext, meterData, "tempListViewLocationMeter", multiAssetLocci).then(function(count){
							var tempListViewLocationMeter = eventContext.application.getResource('tempListViewLocationMeter');
							if(tempListViewLocationMeter.count()>0){
								tempListViewLocationMeter.setCurrentIndex(0);
							}
							locationMeterCount = count;
							locationDeferred.resolve(count);
						});
					};
					if (location){

						var meterFilter = {'location' : location, siteid : siteid};
						ModelService.filtered('locationMeters', null, meterFilter, 1000, false, false, null, true).then(function(locationMeterSet){
							locationMeterSet.filter('location == $1', location); //Filter set instead of using exactmatch index so users don't have to reinstall the app for added exact match index.
							updateMALLocList(locationMeterSet.data);
						}).otherwise(function(){
							updateMALLocList([]);
						});
					} else {
						updateMALLocList([]);
						locationDeferred.resolve(0);
					}

					var asset = multiAssetLocci.get('assetnum');
					var updateMALAssetMeterList = function(meterData){
						self.setAssetMeterResource(eventContext, meterData, "tempListViewAssetMeter", multiAssetLocci).then(function(count){
							var tempListViewAssetMeter = eventContext.application.getResource('tempListViewAssetMeter');
							if(tempListViewAssetMeter.count()>0){
								tempListViewAssetMeter.setCurrentIndex(0);
							}
							assetMeterCount = count;
							assetDeferred.resolve(count);
						});
					};
					if (asset){
						var meterFilter = {'assetnum' : asset, siteid : siteid};
						ModelService.filtered('assetMeters', null, meterFilter, 1000, false, false, null, true).then(function(assetMeterSet){
							assetMeterSet.filter('assetnum == $1', asset); //Filter set instead of using exactmatch index so users don't have to reinstall the app for added exact match index.
							updateMALAssetMeterList(assetMeterSet.data);
						}).otherwise(function(){
							updateMALAssetMeterList([]);
						});

					} else {
						updateMALAssetMeterList([]);
						assetDeferred.resolve(0);
					}
				}
				var woAssetLocMeterInfo = eventContext.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
				woAssetLocMeterInfo.set('originatingAction', "MULTIASSETLOC");
	
			});

			all([assetDeferred.promise,locationDeferred.promise]).then(function(results){
				var counts = {"assetMeterCount" : assetMeterCount, "locationMeterCount" : locationMeterCount};
				
				deferred.resolve(counts);
			});
			
			return deferred.promise;
		}, 
		
		setAssetMeterResource : function(eventContext, assetMeterData, resourceName, referenceName, assetList) {
			var self = this;
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var deferred = new Deferred();
			
			ModelService.empty(resourceName).then(function(assetMeterSet){
				var aMeter =  null;			
	            assetMeterData.sort(function(a, b) {
	                return a.sequence - b.sequence;
	             });
				arrayUtil.forEach(assetMeterData, function(assetmeter){
					//Need to check for false because temp lists don't have active attribute
					aMeter = assetMeterSet.createNewRecord(); 
					aMeter.set('assetnum',assetmeter['assetnum']);
					aMeter.set('assetnumdesc',assetmeter['assetnumdesc']);
					aMeter.setDateValue('lastreadingdate', assetmeter.getAsDateOrNull('lastreadingdate'));
					aMeter.set('metername', assetmeter['metername']);
					aMeter.set('meterdesc', assetmeter['meterdesc']);
					aMeter.set('lastreading', assetmeter['lastreading']);
					aMeter.set('metertype', assetmeter['metertype']);
					aMeter.set('domainid', assetmeter['domainid']);
					aMeter.set('readingtype', assetmeter['readingtype']);
					aMeter.set('rollover', assetmeter['rollover']);		
					aMeter.set('sequence', assetmeter['sequence']);

					if (assetmeter.get('localLastReading') && assetmeter.get('localLastReadingDate') && ((!assetmeter['lastreadingdate']) ||
							(assetmeter.get('localLastReadingDate') > assetmeter['lastreadingdate']))){
						aMeter.set('lastreading', assetmeter.get('localLastReading'));
						aMeter.setDateValue('lastreadingdate', assetmeter.getAsDateOrNull('localLastReadingDate'));
					} else {
						aMeter.set('lastreading', assetmeter['lastreading']);
						aMeter.setDateValue('lastreadingdate', assetmeter.getAsDateOrNull('lastreadingdate'));
					}
				});	
				
				woAssetLocMeterInfo.set('originatingAction',referenceName);
				assetMeterSet.resourceID = resourceName;
				eventContext.application.addResource(assetMeterSet);
				if(assetMeterSet.count() > 0) {
					assetMeterSet.setCurrentIndex(self.getIndexOf(resourceName));
				}
				deferred.resolve(assetMeterData.length);
			});
			
			return deferred.promise;
		},
		
		setLocationMeterResource : function(eventContext, locationMeterData, resourceName, referenceName, locationList) {
			var self = this;
			var woAssetLocMeterInfo = this.application.getResource('woAssetLocMeterInfo').getCurrentRecord();
			var deferred = new Deferred();
			
			ModelService.empty(resourceName).then(function(locationMeterSet){
				var lMeter =  null;
				locationMeterData.sort(function(a, b) {
	               return a.sequence - b.sequence;
	            });
				arrayUtil.forEach(locationMeterData, function(locationmeter){
					//Need to check for false because temp lists don't have active attribute
					lMeter = locationMeterSet.createNewRecord(); 
					lMeter.set('location',locationmeter['location']);
					lMeter.set('locationdesc',locationmeter['locationdesc']);
					lMeter.setDateValue('lastreadingdate', locationmeter.getAsDateOrNull('lastreadingdate'));
					lMeter.set('metername', locationmeter['metername']);
					lMeter.set('meterdesc', locationmeter['meterdesc']);
					lMeter.set('lastreading', locationmeter['lastreading']);
					lMeter.set('metertype', locationmeter['metertype']);
					lMeter.set('domainid', locationmeter['domainid']);
					lMeter.set('readingtype', locationmeter['readingtype']);
					lMeter.set('rollover', locationmeter['rollover']);
					lMeter.set('sequence', locationmeter['sequence']);
					
					if (locationmeter.get('localLastReadingDate') && ((!locationmeter['lastreadingdate']) ||
							(locationmeter.get('localLastReadingDate') > locationmeter['lastreadingdate']))){
						lMeter.set('lastreading', locationmeter.get('localLastReading'));
						lMeter.setDateValue('lastreadingdate', locationmeter.getAsDateOrNull('localLastReadingDate'));
					} else {
						lMeter.set('lastreading', locationmeter['lastreading']);
						lMeter.setDateValue('lastreadingdate', locationmeter.getAsDateOrNull('lastreadingdate'));
					}
				});	
				
				if (referenceName!=null){
					woAssetLocMeterInfo.set('originatingAction',referenceName);
				} else {
					woAssetLocMeterInfo.set('originatingAction',null);
				}
				
				locationMeterSet.resourceID = resourceName;
				eventContext.application.addResource(locationMeterSet);	
				if(locationMeterSet.count() > 0) {
					locationMeterSet.setCurrentIndex(self.getIndexOf(resourceName));
				}
				deferred.resolve(locationMeterData.length);
			});

			return deferred.promise;
		},
		
		setAssetResourceFromMulti : function(eventContext) {
			this.setAssetResource(eventContext,"MULTIASSETLOC");
		},
		
		setLocationResourceFromMulti : function(eventContext) {
			this.setLocationResource(eventContext,"MULTIASSETLOC");
		},
		
		setAssetResourceFromTask : function(eventContext) {
			this.setAssetResource(eventContext,"TASK");
		},
		
		setLocationResourceFromTask : function(eventContext) {
			this.setLocationResource(eventContext,"TASK");
		},
		
		setAssetResource : function(eventContext,refobjname) {
			var currentRecord = eventContext.getCurrentRecord();
			var currentSet = currentRecord.getOwner();
			if(currentSet) {
				this.setIndexOf(currentSet.name, currentSet.getCurrentIndex());
			}
			var dataArray = [currentRecord];
			this.setAssetMeterResource(eventContext,dataArray,'tempAssetMeter', refobjname);
			eventContext.ui.show('WorkExecution.AssetMeterDetailView');		
		},
		
		setLocationResource : function(eventContext, refobjname) {
			var currentRecord = eventContext.getCurrentRecord();
			var currentSet = currentRecord.getOwner();
			if(currentSet) {
				this.setIndexOf(currentSet.name, currentSet.getCurrentIndex());
			}
			var dataArray = [currentRecord];
			this.setLocationMeterResource(eventContext,dataArray,'tempLocationMeter', refobjname);
			eventContext.ui.show('WorkExecution.LocationMeterDetailView');		
		},
		
		setIndexOf: function(resourceName, index) {
			this._currentIndexOf[resourceName] = index;
		},
		
		getIndexOf: function(resourceName) {
			return this._currentIndexOf[resourceName] ? this._currentIndexOf[resourceName] : 0;
		},
		
		hideAssetMeters : function(eventContext){
			var assetMeters = eventContext.getResource();
			
			if ((assetMeters.data) && (assetMeters.data.length > 0)) {
				eventContext.setDisplay(true);
			} else {
				eventContext.setDisplay(false);
			}
		},
		
		isReadonly: function(eventContext){
			var wo = CommonHandler._getAdditionalResource(eventContext,"workOrder").getCurrentRecord();
			if(wo.status == 'CLOSE'){
				var ml = eventContext.getCurrentRecord();
				ml.getRuntimeFieldMetadata(eventContext.resourceAttribute).set('readonly', true);
			}
		},

		hideLocationMeters : function(eventContext){
			var locationMeters = eventContext.getResource();
			if ((locationMeters.data) && (locationMeters.data.length > 0)) {
				eventContext.setDisplay(true);
			} else {
				eventContext.setDisplay(false);
			}
		},
		
		showHeader : function(eventContext){
			eventContext.doShowHeader();
		}
		
		
	});		
	
});
