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

define("application/handlers/InventoryHandler", 
	   [ "dojo/_base/declare",
	     "dojo/_base/array",
		  "dojo/_base/lang",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/comm/CommunicationManager",
	     "platform/translation/SynonymDomain",
	     "platform/model/ModelService",
	     "platform/translation/MessageService",
	     "application/handlers/CommonHandler",
	     "application/business/FieldUtil",
	     "platform/exception/PlatformRuntimeException",
	     "platform/warning/PlatformRuntimeWarning",
	     "platform/auth/UserManager",
	     "platform/util/PlatformConstants",
	     "platform/util/AsyncAwareMixin",
	     "platform/logging/Logger",
	     "platform/util/DateTimeUtil",
	     "application/handlers/CodeScannerHandlerExt",
	     "platform/codeScanner/BluetoothScanner",
	     "dijit/focus",
         "dojo/Deferred",
	     "application/business/AppConfig",
	     "dojo/number",
	     "platform/auth/AdminModeManager",
	     "platform/store/SystemProperties"
	     ],
function(declare, arrayUtil, lang, ApplicationHandlerBase, CommunicationManager, SynonymDomain, ModelService, MessageService, CommonHandler, FieldUtil, PlatformRuntimeException, PlatformRuntimeWarning, UserManager, PlatformConstants, AsyncAwareMixin, Logger, DateTimeUtil, CodeScannerHandlerExt, BluetoothScanner, focusUtil, Deferred, appConfig, numberUtil, AdminModeManager, SystemProperties) {	

	var originatingQuerybase = null;
	return declare( [ApplicationHandlerBase],  {
		needsQueryReset : false,
		
/**@memberOf application.handlers.InventoryHandler */
		cancelCount : function(eventContext){
			// IJ17799 - LA-Fix begin Cancel button PC iPhone : Vyshantha
			//focusUtil.curNode.blur();
            // IJ17799 - end of LA-fix
			var invBalanceSet = eventContext.application.getResource('invbalance');
			var invBalance = invBalanceSet.getCurrentRecord();
			
			//need to define count as null, otherwise if count is not initialized, could fail.
			invBalance.count = null;
			
			//if coming from work list
			var querybase =  invBalance.getOwner().getQueryBase();	
			
			if (querybase == null || querybase=='__search_result__') {
				//if coming from search list
				querybase = this.getOriginatingQuerybase(eventContext);	
				
				var self = this;
				 // go back to list with querybase that was defined when we came in.
				 eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(querybase).then(function(){ 
					eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
											
					//clear out set querybase
					self.setOriginatingQuerybase(eventContext,null);
				 });
			} else {
				eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			}

		},

		/*
		 * Process the Physical Count entry.
		 * If online this will go to server, otherwise it will stay on localdevice until device is reconnected
		 */	
		processCount : function(eventContext){
			if (!eventContext.ui.getCurrentViewControl().validate()) {
				//Need to explicitly validate the view because of the way we hide it later
				return;
			}
			
			this.validateCount(eventContext);
			
			var invBalanceSet = eventContext.application.getResource('invbalance');
			var invBalance = invBalanceSet.getCurrentRecord();

			var currentDateTime = eventContext.application.getCurrentDateTime();

			invBalance.setDateValue('adjustedphyscntdate',currentDateTime);
			invBalance.set('adjustedphyscnt',invBalance.get('count'));


			var querybase =  invBalance.getOwner().getQueryBase();	

			if (querybase=='__search_result__') {
				querybase = this.getOriginatingQuerybase(eventContext);	
				this.needsQueryReset = true;
			} else {
				this.needsQueryReset = false;
			}

			var self = this;

			eventContext.application.showBusy();
			var invBalanceSet = CommonHandler._getAdditionalResource(eventContext,"invbalance");

			ModelService.fetchFromServer("invbalance",querybase).then (function(serverCheck){
				if(!serverCheck){
					invBalance.removeFromQueryBase(querybase);
				} 
				var afterDataFetch = function(dataSet){
	    			if (dataSet && dataSet.name){
						if(!dataSet.resourceID){
		    				dataSet.resourceID = dataSet.name;
		    			}
		    			self.application.addResource(dataSet);
	    			}
	    			eventContext.ui.hideCurrentView();
					self.setOriginatingQuerybase(eventContext,null);
	    		};
	    		
	    		ModelService.save(invBalanceSet).then(function() {
	    			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
			    		if(hasConnectivity){
			    			if (self.needsQueryReset){
				    			eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(querybase).always(afterDataFetch);
			    			}
			    			else{
			    				ModelService.refreshDataForWorkListIfPossible(invBalanceSet.name, invBalanceSet._queryBaseName, invBalanceSet.getPageCountInMemory(), true, true).always(afterDataFetch);
			    			}
			    		}
			    		else{
							ModelService.allCached(invBalanceSet.name, invBalanceSet._queryBaseName, invBalanceSet.count()).always(afterDataFetch);
			    		}	    				
	    			});
				}).otherwise(function(error){
				    if(error && error.error){
				    	switch (true) {				
				    		case (error.error instanceof PlatformRuntimeException):										
				    			self.showMessage(error.error.getMessage());
				    		break;				
				    	}
				    }
				    else {
				    	self.showMessage('No valid error message was returned!');
				    }
				});					
				
			});
		},	
				
		/*
		 * Display the Current Balance when querybase is defined as non-blind
		 */
		showCurrentBalance : function(eventContext){
			var self = this;			
			this.isBlindCount(eventContext).then(function(isBlindCount){
				var isLastPhysicalCountRecent = self.isLastPhysicalCountRecent(eventContext);
				
				if (isBlindCount){
					eventContext.setDisplay(false);
				} else {
					//display current balance if its a nonblind count and isLastPhysicalCountRecent = false
					if (!isLastPhysicalCountRecent){
						eventContext.setDisplay(true);
					} else {
						eventContext.setDisplay(false);
					}
				}
				
				if (!isBlindCount && !isLastPhysicalCountRecent){
					//set current balance to Physical count field or show empty Physical Count field depending on blind or nonblind count
					self.setBlindCount(isBlindCount, eventContext);
				}
			});
		},
		
		
		/*
		 * Check if record is defined on a Blind or Non Blind defined QueryBase
		 */
		isBlindCount : function(eventContext){
			var invBalance = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
			var querybase = invBalance.getOwner().getQueryBase();
			var deferred = new Deferred();
			
			//check if adminmode is enabled
			if(!SystemProperties.getProperty('si.adminmode') || SystemProperties.getProperty('si.adminmode') == "false"){
				var blindCountResource = eventContext.application.getResource("blindCountQueryBases");
				blindCountResource.createNewRecord();
				
				if (querybase=='__search_result__'){
					//coming from recount / adhoc (default blind count)
					deferred.resolve(true);			
				} else {
					if (blindCountResource.data[0].get(querybase) === undefined) {
						deferred.resolve(false);
			  		} else {
			  			deferred.resolve(true);
			  		}
				}
				
				blindCountResource.data = [];					
			} else {
                var appname = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME).toUpperCase().replace(/\s+/g, '');
				return AdminModeManager.isBlindCountQuery(querybase, appname, 'invbalance');
			}	
			
			return deferred.promise;
		},
		
		setBlindCount : function(blind, eventContext){
			//var invBalance = eventContext.getCurrentRecord();
			
			var invBalance = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
			
			if (blind === true){
				//blind count
				invBalance.setNullValue('count');
			} else {
				//non-blind count
				var currentBalance = invBalance.curbal;
				invBalance.set('count',currentBalance);
			}
			return false;
		},
		
		setSearchQuery: function(eventContext){
			var self = this;
			var search = eventContext.application.getResource("searchItems").getCurrentRecord();
			var filteredItems = 0;			
			
			//var siteid = UserManager.getInfo("defsite");
			var filter = {};		
			
			if (search.itemnum){
				filter.itemnum = search.itemnum;					
			    filteredItems++;
			}
			if (search.location){
			    filter.location = search.location;
			    filteredItems++;
			}
			if (search.binnum){
			    filter.binnum = search.binnum;
			    filteredItems++;
			}
			if (search.lotnum){
			    filter.lotnum = search.lotnum;
			    filteredItems++;
			}			
	
			if(filteredItems == 0){
				eventContext.ui.show('Inventory.RequiredSearchFieldMissing');
				return;
			}

			self.populateSearch(eventContext);
		},
		
		populateSearch: function(eventContext){
			var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			eventContext.application.ui.performSearch = true;
			if(eventContext.application.ui.performSearch){
				if(eventContext.application.getResource("searchItems") == null){ //TODO:  might be nice to still open to last search
					//must be first login.  If search was last page view just default to 0 index because search resource has been discarded.
					view.changeQueryBase(0);
				    var queryBase = view.queries.children[0].queryBase;
					ModelService.all('invbalance', queryBase).then(function(modelDataSet){
						modelDataSet.resourceID = 'invbalance';
						eventContext.application.addResource(modelDataSet);
						eventContext.application.ui.getViewFromId('Inventory.ItemsView').lists[0].refresh();
					});
					return;
				}
				var indexOfSearch = 0;
				var i = 0;
				if(view.queries && view.queries != null){
					while(i < view.queries.children.length){
						if(view.queries.children[i].queryBase == PlatformConstants.SEARCH_RESULT_QUERYBASE){
							indexOfSearch = i;
							i = view.queries.children.length;
						}
						i++;
					}
					view.changeQueryBase(indexOfSearch);
				}
				var search = eventContext.application.getResource("searchItems").getCurrentRecord();
				
				//var siteid = UserManager.getInfo("defsite");
				var filter = {};
				var oslcQueryParameters = {};
				
				var filteredItems = 0;
				if (search.itemnum){
					filter.itemnum = search.itemnum;
				    filteredItems++;
				}
				if (search.location){				
				    filter.location = search.location;
				    filteredItems++;
				}
				if (search.binnum){				
				    filter.binnum = search.binnum;
				    filteredItems++;
				}
				if (search.lotnum){						
				    filter.lotnum = search.lotnum;
				    filteredItems++;
				}				
				if (search.siteid){
				    filter.siteid = search.siteid;
				}
				
				if(filteredItems == 0){
					eventContext.application.showMessage(MessageService.createStaticMessage('norecords').getMessage());
					eventContext.application.ui.performSearch = false;
					eventContext.application.hideBusy();
					return;
				}
			
				ModelService.all('invbalance',PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(searchResultSet){
					ModelService.clearSearchResult(searchResultSet);			
				});

				
				var deferred = new Deferred();
				
				//CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				ModelService.fetchFromServer('invbalance',PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(hasConnectivity){
					eventContext.application.showBusy();
					if (hasConnectivity){
						//network fetch						
						ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, null, true, false, oslcQueryParameters).then(function(resultSet){
							resultSet.resourceID = 'invbalance';
							eventContext.application.addResource(resultSet);
							
							if (resultSet.count()>0){
								if(resultSet.count()==1){
									resultSet.setCurrentIndex(0);
									//eventContext.application.ui.getViewFromId('Inventory.ItemDetailView');
									eventContext.ui.show('Inventory.ItemDetailView');	
								} else {
									ModelService.save(resultSet).then(function(){
										resultSet.setCurrentIndex(0);
										 eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(){
											 eventContext.ui.show('Inventory.ItemsView');
										 });
									});
								}
								
								eventContext.application.hideBusy();						
							} else {
								//offline fetch
								if (search.itemnum){
									filter.itemnum = search.itemnum;	
								}
												
								//removed attribute that was added by previous modelservice network call.
								delete filter._querybases;
								
								ModelService.filtered('invbalance', null, filter, null, false, false, oslcQueryParameters).then(function(invbalanceSet){
									deferred.resolve(invbalanceSet);
								});

								var promise = deferred.promise;
								
								promise.then(function(invbalanceSet){
									ModelService.clearSearchResult(invbalanceSet).then(function(){					
																		
										if (invbalanceSet.count()>0){
											arrayUtil.forEach(invbalanceSet.data, function(data){
												data.setQueryBase("__search_result__");									
											});	
						
											invbalanceSet.resourceID = 'invbalance';
											eventContext.application.addResource(invbalanceSet);
											
											if(invbalanceSet.count()==1){
												invbalanceSet.setCurrentIndex(0);
												//eventContext.application.ui.getViewFromId('Inventory.ItemDetailView');
												eventContext.ui.show('Inventory.ItemDetailView');	
											} else {
												ModelService.save(invbalanceSet).then(function(){
													invbalanceSet.setCurrentIndex(0);
													 eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(){
														 eventContext.ui.show('Inventory.ItemsView');
													 });
												});
											}
											
											eventContext.application.hideBusy();	
										} else {
											
											ModelService.clearSearchResult(invbalanceSet);
											eventContext.application.showMessage(MessageService.createStaticMessage('norecords').getMessage());
											eventContext.application.ui.performSearch = false;
											eventContext.application.hideBusy(); 
										}						
									});					
								});						
							}

						});	
							
					}
					else{
						//offline fetch
						if (search.itemnum){
							filter.itemnum = search.itemnum;	
						}
										
						//removed attribute that was added by previous modelservice network call.
						delete filter._querybases;
						
						ModelService.filtered('invbalance', null, filter, null, false, false, oslcQueryParameters).then(function(invbalanceSet){
							deferred.resolve(invbalanceSet);
						});

						var promise = deferred.promise;
						
						promise.then(function(invbalanceSet){
							ModelService.clearSearchResult(invbalanceSet).then(function(){					
																
								if (invbalanceSet.count()>0){
									arrayUtil.forEach(invbalanceSet.data, function(data){
										data.setQueryBase("__search_result__");									
									});	
				
									invbalanceSet.resourceID = 'invbalance';
									eventContext.application.addResource(invbalanceSet);
									
									if(invbalanceSet.count()==1){
										invbalanceSet.setCurrentIndex(0);
										//eventContext.application.ui.getViewFromId('Inventory.ItemDetailView');
										eventContext.ui.show('Inventory.ItemDetailView');	
									} else {
										ModelService.save(invbalanceSet).then(function(){
											invbalanceSet.setCurrentIndex(0);
											 eventContext.ui.getViewFromId('Inventory.ItemsView').setQueryBaseIndexByQuery(PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(){
												 eventContext.ui.show('Inventory.ItemsView');
											 });
										});
									}
									
									eventContext.application.hideBusy();	
								} else {
									
									ModelService.clearSearchResult(invbalanceSet);
									eventContext.application.showMessage(MessageService.createStaticMessage('norecords').getMessage());
									eventContext.application.ui.performSearch = false;
									eventContext.application.hideBusy(); 
								}						
							});					
						});						
					}						
				});											
			}
		},	

		initSearchData: function(eventContext){
			
			var currentQueryBase = eventContext.application.getResource('invbalance')._queryBaseName;
			this.storePreviousQueryBase(eventContext,currentQueryBase);
			
			var searchData = eventContext.application.getResource("searchItems");
			if(searchData == null || searchData.getCurrentRecord() == null){
				searchData.createNewRecord();
			} else {
				//TODO cleanup
				searchData = null;
				searchData = eventContext.application.getResource("searchItems").createNewRecord();
			}
			eventContext.application.ui.savedQueryIndex = eventContext.application.ui.getViewFromId('Inventory.ItemsView').queryBaseIndex;
		},
		
		populateItemDetail : function(eventContext) {
			var invbalance = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
						
			eventContext.getResource().getRecordAt(0).set("itemnum", invbalance.get('itemnum'));
			eventContext.getResource().getRecordAt(0).set("description", invbalance.get('description'));
			eventContext.getResource().getRecordAt(0).set("location", invbalance.get('location'));
			eventContext.getResource().getRecordAt(0).set("binnum", invbalance.get('binnum'));
			eventContext.getResource().getRecordAt(0).set("lot", invbalance.get('lotnum'));
			eventContext.getResource().getRecordAt(0).set("unit", invbalance.get('issueunit'));
			eventContext.getResource().getRecordAt(0).set("curbal", invbalance.get('curbal'));
		},
		
		/*
		 * Triggered functionality when back button is selected
		 */
		handleBackButton : function(eventContext){
			var handler = eventContext.application['application.handlers.InventoryHandler'];			
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		showSearch: function(eventContext){
			eventContext.application.ui.showAllStatus = true;			
		},
		
		_showSearchFailedMessageNoConnectivity: function(eventContext){
			eventContext.application.showMessage(MessageService.createStaticMessage('downloadFailedNoConnectivity').getMessage());
			if(eventContext.application.ui.getViewFromId('Inventory.ItemsView').lists[0].baseWidget){
				eventContext.application.ui.getViewFromId('Inventory.ItemsView').lists[0].refresh();
			}
			eventContext.application.hideBusy();
			eventContext.application.ui.performSearch = false;
		},
		
		initializeBarcodeScanner : function(eventContext){
			var scannerHandler = this.application['application.handlers.CodeScannerHandlerExt'];
			this.scanHandler = this.application['platform.handlers.CodeScannerHandler'];
			if (this.scanHandler) {
				this.scanListener = this.scanHandler.scanListener;
				this.application['platform.handlers.CodeScannerHandler'].subHandler = this.application['application.handlers.CodeScannerHandlerExt'];

				if (!this.scanListener){
					//TODO log this
					return;
				}
		
				var findByScan = this.scanListener;
			}
		},
		
		showBusyList: function(eventContext){
			if(eventContext.application.ui.performSearch){
				this.application.showBusy();
				eventContext.application.ui.performSearch = false;
			}			
		},
		
		discardSummaryView: function(eventContext){
			
			var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			view.changeQueryBase(eventContext.application.ui.savedQueryIndex);
		    var queryBase = view.queries.children[eventContext.application.ui.savedQueryIndex].queryBase;
			ModelService.all('invbalance', queryBase).then(function(modelDataSet){
				modelDataSet.resourceID = 'invbalance';
				eventContext.application.addResource(modelDataSet);
				eventContext.application.ui.getViewFromId('Inventory.ItemsView').lists[0].refresh();
			});
		},
		
		filterItemsForLookup : function(eventContext) {
			// set lookup filter on additionalitem	
			var searchRecord = CommonHandler._getAdditionalResource(eventContext,'searchItems').getCurrentRecord();
			
			var siteid = searchRecord.get("siteid");
			var itemnum = searchRecord.get("itemnum");
			var location = searchRecord.get("location");
			var binnum = searchRecord.get("binnum");
			var lotnum = searchRecord.get("lotnum");
			
			
			var set = null;
			var filter = [];
			if (lotnum || binnum || location || itemnum){
				set = CommonHandler._getAdditionalResource(eventContext,'additionalInvbalance');
				CommonHandler._clearFilterForResource(eventContext,set);
								
				if (itemnum){
					filter.push({itemnum: itemnum});
				}
				if (location){
					filter.push({location: location});
				}
				if (binnum){
					filter.push({binnum: binnum});
				}
				if (lotnum){
					filter.push({lotnum: lotnum});
				}
				
				if (siteid){
					filter.push({siteid: siteid});
				}
						
				var result = this.buildFilterForItems(eventContext,filter);
				set.lookupFilterExactMatch = false;
				set.lookupFilter = result;			
	             
	
			} else {
				set = CommonHandler._getAdditionalResource(eventContext,'additionalitem');
				CommonHandler._clearFilterForResource(eventContext,set);
				filter.push({rotating: false});
				var result = this.buildFilterForItems(eventContext,filter);
				set.lookupFilter = result;	
			}

			set.resourceID = 'itemsResource';
			eventContext.application.addResource(set);
			
			return set;
		},	

		buildFilterForItems : function(eventContext, filter){
			
			var result = {};
			arrayUtil.forEach(filter, function(filterCriteria){
				 lang.mixin(result, filterCriteria);		
			});
			
			return result;
		
		},
		
		filterStoreroomForLookup: function(eventContext) {
			
			var searchRecord = CommonHandler._getAdditionalResource(eventContext,'searchItems').getCurrentRecord();
			//var siteid = UserManager.getInfo("defsite");
			var itemnum = searchRecord.get("itemnum");
			
			// Get the valid storerooms given specified ITEMNUM
			var additionalInventory = CommonHandler._getAdditionalResource(eventContext,'additionalInventory');
			CommonHandler._clearFilterForResource(eventContext,additionalInventory);
			
			var args = "";
			
			if(itemnum) {
				CommonHandler._filterAdditionalInventoryByItemnum(eventContext,additionalInventory, itemnum.toUpperCase());	
								
				// Mount filter key based on records from additionalInventory - refine the storeroom filter
				var keys = new Array();
				additionalInventory.foreach(function(record){
					var location = record.get('location');
					var siteid = record.get('siteid');
					keys.push("(location=='"+location+"' && siteid=='"+siteid+"')");
				});
				
				args = keys.join (' || ');
			} else {
				args = "1=1";
			}
			
			var additionalstoreroom = CommonHandler._getAdditionalResource(eventContext,'additionalstoreroom');
			CommonHandler._clearFilterForResource(eventContext,additionalstoreroom);

			additionalstoreroom.filter(args);					
		},

		
		filterBinLookup : function(eventContext) {
			// set lookup filter on additionalInvbalance
			var invbalanceSet = CommonHandler._getAdditionalResource(eventContext,'invbalance');
			CommonHandler._clearFilterForResource(eventContext,invbalanceSet);
			var binList = [];
			//var searchRecord = CommonHandler._getAdditionalResource(eventContext,'searchItems').getCurrentRecord();

			var siteid = UserManager.getInfo("defsite");
			invbalanceSet.filter('siteid == $1', siteid);
			
			arrayUtil.forEach(invbalanceSet.data, function(invbalance){
				var binnum = invbalance.get('binnum');
				if (binnum){
					if (binList.indexOf(binnum)<0){
						binList.push(binnum);
					} else {
						invbalance.deleteLocal();
					}
				} else {
					invbalance.deleteLocal();
				}
			});
			
			binList = [];
		
			return invbalanceSet;

		},
		
		/*
		 * Clear Adhoc Count Fields
		 */
		clearAdhocFields : function (eventContext){
			var search = eventContext.application.getResource("searchItems").getCurrentRecord();
			search.setNullValue('itemnum');
			search.setNullValue('location');
			search.setNullValue('binnum');
			search.setNullValue('lotnum');
			search.setNullValue('siteid');
		},
		
		adhocInit : function (eventContext) {
			this.setOriginatingQuerybase(eventContext);
		},
		
		/*
		 * Check if last physical count date is less than the defined frequency for recent counted records. (Default 24 hours)
		 */
		isLastPhysicalCountRecent : function (eventContext) {	
			var invBalance = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
			var countFreq = appConfig.getLastCountFrequencyInHours();
			var currentDateTime = eventContext.application.getCurrentDateTime();

			var lastPhysicalCountDate = invBalance.get('physcntdate');
			var physicalDateConverted = new Date(lastPhysicalCountDate);
			
			var deferred = new Deferred();
			var self = this;
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				if (!hasConnectivity) {
					//need to check if transaction exists when offline.
					var adjustedphyscnt = invBalance.get('adjustedphyscnt');
					if (adjustedphyscnt && adjustedphyscnt!=null){
						lastPhysicalCountDate = invBalance.get('adjustedphyscntdate');
						physicalDateConverted = new Date(lastPhysicalCountDate);
						physicalDateConverted = self.convertDateToUTC(physicalDateConverted);
					}
				} 
				
				deferred.resolve();
			});
			
			if (deferred){
				var milliseconds = currentDateTime - physicalDateConverted;
				var hours = milliseconds / (1000 * 3600);
					
				if (hours<=countFreq){
					return true;
				} else {
					return false;
				}
				deferred.promise;
			}
	
		},
		
		convertDateToUTC : function(date) { 
			return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
		},
		
		/*
		 * Called on render to hide / show Last Physical Count
		 */
		showLastPhysicalCount : function (eventContext){
			var isLastPhysicalCountRecent = this.isLastPhysicalCountRecent(eventContext);
			eventContext.setDisplay(isLastPhysicalCountRecent);	
		},
		
		setOriginatingQuerybase : function (eventContext,querybase) {
			if (querybase){
				originatingQuerybase = querybase;
			} else  {
				originatingQuerybase = eventContext.application.ui.getCurrentViewControl().queryBase;
			}
			
		},
		
		getOriginatingQuerybase : function (eventContext) {
			return originatingQuerybase;
		},
		
		/*
		 * Validate the entered count
		 */
		validateCount : function (eventContext) {
			var currentRecord = eventContext.getCurrentRecord();
			var count = currentRecord.getPendingOrOriginalValue('count');
					
			if (count!='' && (numberUtil.parse(count, this.application.getUserLocale()) < 0)) {
				throw new PlatformRuntimeException('newReadingNaN',[count]);
			}
		},
		
		storePreviousQueryBase : function(eventContext, currentQueryBase){
			var handler = eventContext.application['application.handlers.CodeScannerHandlerExt'];
			if (handler) {
				handler.setAndGetPreviousQueryBase(eventContext, currentQueryBase);
			}
		},
		
		clearSite : function(eventContext){
			var searchRecord = CommonHandler._getAdditionalResource(eventContext,'searchItems').getCurrentRecord();
			if (searchRecord.getPendingOrOriginalValue('location')==""){
				searchRecord.siteid=null;
			}
		},
		
		hideDialog : function(eventContext){
			eventContext.ui.hideCurrentDialog();
		}
	});
});
