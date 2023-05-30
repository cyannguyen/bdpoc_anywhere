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

define("application/handlers/CodeScannerHandlerExt", 
[ "dojo/_base/declare",
  "platform/handlers/_ApplicationHandlerBase",
  "platform/logging/Logger",
  "platform/codeScanner/CodeScanner",
  "platform/model/ModelDataSet",
  "platform/model/ModelData",
  "platform/util/PlatformConstants",
  "platform/logging/Logger",
  "application/business/AppConfig",
  "platform/translation/MessageService",
  "platform/model/ModelService",
  "dojo/Deferred",
  "platform/comm/CommunicationManager",
  "dojo/_base/array"],
function(declare, ApplicationHandlerBase, Logger, CodeScanner, ModelDataSet, ModelData, PlatformConstants, Logger, appConfig, MessageService, ModelService, Deferred, CommunicationManager, arrayUtil) {
	return declare( ApplicationHandlerBase, {
		name: 'CodeScannerHandler',
		
		scanListener: null,
	
/**@memberOf application.handlers.CodeScannerHandlerExt */
		findByScan : function(eventContext){	
			var self = this;

			self.scanHandler = self.application['platform.handlers.CodeScannerHandler'];
			var scanner = new CodeScanner("barcode");

			scanner.scan().then(function (result) {
				if (result && result.text) {
					self.handleScan(result.text, eventContext).then(function(){
						//following line needed to refresh UI for ETL devices returning from barcode.			
						self.ui.getCurrentViewControl().refresh();
					});
				}	
			}).otherwise(function(error){
				Logger.systemLog('Scan error: ' + error);
			});
		},
		
		getNextAttribute : function(i) {
			var attributeSet = appConfig.getBarCodeAttributes();
			return attributeSet[i];
		},
		
		getFilteredSetData : function(i, scanResult, querybase){
			var deferred = new Deferred();
			var oslcQueryParameters = {};
			var filter = {};
			var self = this;
	   			
 			var attr = self.getNextAttribute(i);
 			
 			if (attr==undefined){
 				deferred.resolve();
 				return deferred.promise;
 			}
 			
 			
 			filter[attr]=scanResult;
 			
			ModelService.filtered('invbalance', querybase, filter, null, true, false, oslcQueryParameters).then(function(resultSet){
				
				arrayUtil.forEach(resultSet.data, function(data){
					data.setQueryBase("__search_result__");									
				});
				
				if (resultSet.count()>0){
					resultSet.resourceID = 'invbalance';
					WL.application.addResource(resultSet);
					deferred.resolve(resultSet);
				} else {
					i++;
					self.getFilteredSetData(i, scanResult, querybase).then(function(set){
						deferred.resolve(set);
					});
				}
				
			});
				
	    	return deferred.promise;
		},
		
		handleScan : function(scanResult, eventContext) {

			this.scanResult = scanResult;
			var self = this;
			var currentQueryBase=null;
			var controlType = eventContext._controlType;
			
			//check if scan is from list page
			if (controlType=='findByScan'){
				currentQueryBase = eventContext.parentControl.parentControl.queryBase;
			} else {
				currentQueryBase = eventContext.parentControl.queryBase;
			}
			
			currentQueryBase = this.setAndGetPreviousQueryBase(eventContext, currentQueryBase);		
			
			if (!currentQueryBase) {
				currentQueryBase = this.ui.getCurrentViewControl().queryBase;
				currentQueryBase = this.setAndGetPreviousQueryBase(eventContext, currentQueryBase);	
			}
			
			//clear previous search results
			ModelService.all('invbalance',PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(searchResultSet){
				ModelService.clearSearchResult(searchResultSet);			
			});
			
			eventContext.application.hideBusy();
			var promise = self.getFilteredSetData(0, scanResult, currentQueryBase);
			return promise.then(function(resultSet){
					//var list = findByScan.getParent();
					//var searchRecord = list.searchRecord;
					
					if (resultSet==undefined){
						eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(PlatformConstants.SEARCH_RESULT_QUERYBASE);
					} else {
						var count = null;
						count = resultSet.count();
				
						if (count == 1) {

							//commented because offline bin search N-10-9 was causing error (1 record returned)
							/*
							if (hasConnectivity){
								resource.setCurrentIndexByRecord(resultSet.data[0]);
							} else {
								resource.setCurrentIndexByRecord(resultSet[0]);
							}
							*/
						
							eventContext.ui.show('Inventory.ItemDetailView');
						}
						else {
							ModelService.save(resultSet).then(function(){
								resultSet.setCurrentIndex(0);
								eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(){
									eventContext.application.hideBusy();
								});
							});
						}
						
						//self.ui.getCurrentViewControl().refresh();						
					}
				
			});
			
		},
		
		//Set previous querybase
		setAndGetPreviousQueryBase : function(eventContext, currentQueryBase){
			// Keep track of previous querybase, needed when  attempting barcode search from search querybase
			var appInfo = eventContext.application.getResource('appInfo');
			var localRecord = null;
			var previousQueryBase = null;
			
			if (appInfo.count()>0){
				previousQueryBase = appInfo.data[0].previousQueryBase;
				
				if (currentQueryBase=='__search_result__' || currentQueryBase=='__errored__'){
					currentQueryBase = previousQueryBase;
				} else {
					appInfo.data[0].previousQueryBase = currentQueryBase;
					ModelService.save(appInfo);	
				}
			} else {
				localRecord = appInfo.createNewRecord();
				localRecord.set('previousQueryBase',currentQueryBase);
				ModelService.save(appInfo);
			}
			
			return currentQueryBase;
		},
	
	});		
		
});	

			
			
