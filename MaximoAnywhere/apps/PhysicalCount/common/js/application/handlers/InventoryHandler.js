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
		 //[Loc]
		 ,"platform/store/_ResourceMetadataContext"
		 ,"platform/format/FormatterService",
		 "dojo/date/stamp"
	     ],
function(declare, arrayUtil, lang, ApplicationHandlerBase, CommunicationManager, SynonymDomain, ModelService, MessageService, CommonHandler, FieldUtil, PlatformRuntimeException, PlatformRuntimeWarning, UserManager, PlatformConstants, AsyncAwareMixin, Logger, DateTimeUtil, CodeScannerHandlerExt, BluetoothScanner, focusUtil, Deferred, appConfig, numberUtil, AdminModeManager, SystemProperties
	,ResourceMetadataContext, FormatterService, dateTimeISOFormatter) {	

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
						//Loc: filter by default storeroom
						var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
						dataSet.filter('location == $1', currentStoreRoom.get('location'));

		    			self.application.addResource(dataSet);
						//Loc: reload list QueryBase and default storeroom
						//self.loadInvbalanceByQueryBase(self);
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
                //var appname = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME).toUpperCase().replace(/\s+/g, '');
				var appname = "PHYSICALCOUNT"; //IBMCOUNT returns null or empty arrys in isBlindCOuntQuery
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

			//Loc: Add the field modelnum searching
			if (search.modelnum){
			    filter.modelnum = search.modelnum;
			    filteredItems++;
			}
			
			//In-Loc: bin range
			if (search.description){
				filter.description = search.description;
				filteredItems++;
			}

			var isBinRangeCheck = false; 
			if (search.binfrom && search.binto){
				var binFrom = search.binfrom;
				var binTo = search.binto;

				var binFromChecked = this.checkBinRange(binFrom);
				var binToChecked = this.checkBinRange(binTo);
				if (binFromChecked.result && binToChecked.result){
					if (binFromChecked.prefix == binToChecked.prefix){
						if (binFrom < binTo){
							isBinRangeCheck = true;

							filteredItems++;
						}
					}
				}

			/* } else if ((search.binfrom && !search.binto) || (search.binto && !search.binfrom)){
				isBinRangeCheck = false; */
			} else if (!search.binfrom && !search.binto){
				isBinRangeCheck = true;
			}

			if (!isBinRangeCheck){
				eventContext.application.showMessage('BinRange is incorrect');
				return;
			}
			//Out-Loc: bin range			
	
			if(filteredItems == 0){
				eventContext.ui.show('Inventory.RequiredSearchFieldMissing');
				return;
			}

			self.populateSearch(eventContext);
		},

		//Loc-In
		// Add checkBinRange method
		checkBinRange: function(value, prefix, suffix){
			var obj = {};
			if(typeof value != 'string'){
				obj.result = false;
				return obj;
			}
			var i = value.length;
			var cursor = -1;
			while(i--){
				if (isNaN(value.charAt(i))){
					cursor = i;
					break;
				}
			}

			if(cursor != -1){ 
				cursor++;
				prefix = value.substring(0, cursor);
				suffix = value.substring(cursor);
				
				obj.result = true;
				obj.prefix = prefix;
				obj.suffix = suffix;

				return obj;
			}

			obj.result = false;
			return obj;
		},
		//Loc-Out
		
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

				//In-Loc: set default storeroom
				/* if (search.location){				
				    filter.location = search.location;
				    filteredItems++;
				} */
				var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
			    if (currentStoreRoom.get('location') != null){				
				    filter.location = currentStoreRoom.get('location');
				}
				//Out-Loc: set default storeroom

				//Loc-In
				// Custimze searching by Like %
				/* if (search.location){				
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
				} */

				if (search.description){
					filter.description = '%'+ this._addBackSlash(search.description)+'%';
					filteredItems++;
				}
				if (search.binnum){				
				    filter.binnum = '%'+search.binnum+'%';
				    filteredItems++;
				}
				if (search.lotnum){						
				    filter.lotnum = '%'+search.lotnum+'%';
				    filteredItems++;
				}				
				if (search.siteid){
				    filter.siteid = search.siteid;
				}
				// Add the field modelnum searching
				if (search.modelnum){
					filter.modelnum = '%'+search.modelnum+'%';
					filteredItems++;
				}
				//Loc-Out

				//In-Loc: bin range
				if (search.binfrom && search.binto){
					var binFrom = search.binfrom;
					var binTo = search.binto;
				
					var binRangeFilter = {};
					if (search.binfrom){
						binRangeFilter.from = binFrom;
					}
					if (search.binto){
						binRangeFilter.to = binTo;
					}
					if (search.binfrom && search.binto){
						filter["binnum"] = binRangeFilter;
						filteredItems++;
					}
				}
				//Out-Loc: bin range
				
				if(filteredItems == 0){
					eventContext.application.showMessage(MessageService.createStaticMessage('norecords').getMessage());
					eventContext.application.ui.performSearch = false;
					eventContext.application.hideBusy();
					return;
				}

				//In-Loc: set querybase for search by current querybase
				var queryBaseForSearch = view.queries.children[eventContext.application.ui.savedQueryIndex].queryBase;
				var metdaData = ResourceMetadataContext.getResourceMetadata(view.queries.resource);
				metdaData.queryBaseForSearch = metdaData.queryBases[queryBaseForSearch];
				//Out-Loc: set querybase for search by current querybase
			
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
			// [Loc]
			// set Detail Label and add attributes: physcnt, orgid, count, modelnum, lastcountdate, memo
			this.loadDetailLabel(eventContext);
			var invbalance = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
						
			eventContext.getResource().getRecordAt(0).set("itemnum", invbalance.get('itemnum'));
			eventContext.getResource().getRecordAt(0).set("description", invbalance.get('description'));
			eventContext.getResource().getRecordAt(0).set("location", invbalance.get('location'));
			eventContext.getResource().getRecordAt(0).set("binnum", invbalance.get('binnum'));
			eventContext.getResource().getRecordAt(0).set("lot", invbalance.get('lotnum'));
			eventContext.getResource().getRecordAt(0).set("unit", invbalance.get('issueunit'));
			eventContext.getResource().getRecordAt(0).set("curbal", invbalance.get('curbal'));
			eventContext.getResource().getRecordAt(0).set("physcnt", invbalance.get('physcnt'));


			// Exercise Unit 4
			eventContext.getResource().getRecordAt(0).set("orgid", invbalance.get('orgid'));
			eventContext.getResource().getRecordAt(0).set("count", invbalance.get('count'));

			eventContext.getResource().getRecordAt(0).set("modelnum", invbalance.get('modelnum'));
			eventContext.getResource().getRecordAt(0).set("lastcountdate", invbalance.get('lastcountdate'));

			invbalance.set("memo", invbalance.get('anywhcountmemo'));
			
			// count++
			/*var count = invbalance.get('count');
			if (count == null || count === undefined){
				count = 0;
			}
			count++;
			//eventContext.getResource().getRecordAt(0).set("count", count);
			invbalance.set("count", count);*/
		},

		// #region Loc-In: Add methods: setStoreRoomTitle, reloadDefaultStoreRoom, loadInvbalanceList ..., _addBackSlash
		setStoreRoomTitle : function(eventContext, storeRoomTitle) {
			var currentRecord = CommonHandler._getAdditionalResource(eventContext,"additionalstoreroom").getCurrentRecord();
			var currentLocation = null;
			var storeRoom = eventContext.application.getResource('storeRoomResource');
			var localRecord = null;

			currentLocation = currentRecord != null ? currentRecord.get("location") : "";
			storeRoom = null;
			localRecord = eventContext.application.getResource("storeRoomResource").createNewRecord();
			//localRecord.set('location', currentLocation);
			localRecord.set('location', storeRoomTitle);
			/* if (storeRoom.count() > 0){
				storeRoom.data[0].location = currentLocation;
				//ModelService.save(storeRoom);
			} else {
				localRecord = storeRoom.createNewRecord();
				localRecord.set('location', currentLocation);
				//ModelService.save(storeRoom);
			} */
		},

		reloadDefaultStoreRoom : function(eventContext){
			var storeRoom = eventContext.application.getResource('storeRoomResource');
			if (storeRoom.getCurrentRecord().get('location') == null){
				var cuurentChooseStoreRoom = eventContext.application.getResource('chooseStoreRoomResource').getCurrentRecord();
				var chooseStoreRoom = cuurentChooseStoreRoom.get("location");
				var localRecord = storeRoom.createNewRecord();
				localRecord.set('location', chooseStoreRoom);
			}
		},

		/* loadInvbalanceList : function(eventContext){
			//var deferred = new Deferred();
			var currentRecord = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
			var physcntdate = currentRecord.get('physcntdate');
			var physcntdateFormat = FormatterService.toDisplayableValue(dateTimeISOFormatter.fromISOString(physcntdate), "dateTime", this.userInterface.application.getUserLocale());
			var row3 = "Unit: " + currentRecord.get('issueunit') + ", Last Count Date: " + physcntdateFormat;
			invbalance.set('row3', row3);

		}, */

		loadInvbalanceList : function(eventContext){
			//var deferred = new Deferred();
			var currentRecord = CommonHandler._getAdditionalResource(eventContext,"invbalance").getCurrentRecord();
			var physcntdate = currentRecord.get('physcntdate');
			//var physcntdateFormat = FormatterService.toDisplayableValue(dateTimeISOFormatter.fromISOString(physcntdate), "dateTime", this.userInterface.application.getUserLocale());
			var row3 = "Unit: " + currentRecord.get('issueunit') + ", Last Count Date: " + physcntdate; // physcntdateFormat;
			currentRecord.set('row3', row3);

			//invbalance.setValue('finishdate', row3);
			
		},

		loadInvbalances: function(actualInvbalance, newStartDateString){
			/* var physcntdate = actualInvbalance.getAsDateTimeOrNull('physcntdate');
			physcntdate += "AAA";
			actualInvbalance.set('row3', physcntdate);
			newStartDateString = physcntdate;
			return newStartDateString; */

			actualInvbalance.set('binnum', "AAA");
			actualInvbalance.set('row3', "AAA");
			
			/* if (newStartDate && enddate) {
				var startdatetime = DateTimeUtil.fromDateAndTimeToDateTime(newStartDate, starttime);
				var enddatetime = DateTimeUtil.fromDateAndTimeToDateTime(enddate, endtime);
				this.checkDates(startdatetime, enddatetime);
			}
			
			var hours = actualLabor.get('actuallaborhours');
			if (newStartDate && starttime){
				var startdatetime = DateTimeUtil.fromDateAndTimeToDateTime(newStartDate, starttime);
				//TODO: fix enddatetime to handle timezone correctly
				var enddatetime = new Date(startdatetime.getTime() + DateTimeUtil.fromHoursToMilliseconds(hours));
				//Note: sometimes due to calculations, the time comes out just shy of the minute
				enddatetime = DateTimeUtil.roundToNearestMinute(enddatetime);
				actualLabor.setDateValue('finishdate', DateTimeUtil.fromDateTimeToDate(enddatetime));
	            actualLabor.setTimestampValue('finishtime', DateTimeUtil.fromDateTimeToTime(enddatetime));				
			} */
				
		},

		loadDetailLabel : function(eventContext){
			if(!eventContext){
				return;
			}
			var resourceObject = CommonHandler._getAdditionalResource(eventContext,"invbalance");
			//var resourceObject = eventContext.getResource();
			if(!resourceObject){
				return;
			}
			var currentIndex = resourceObject.getCurrentIndex();
			var view = eventContext.ui.getViewFromId('Inventory.ItemDetailView');
			var label = MessageService.createResolvedMessage("detailLabel", [currentIndex + 1, resourceObject.count()]);
			view.label = label;
			view.refresh();
		},

		loadDetailItem : function(eventContext){
			var self = this;
			self.populateItemDetail(eventContext);
		},

		previousRecord : function(eventContext){
			if(!eventContext){
				return;
			}
			var resourceObject = eventContext.getResource();
			if(!resourceObject){
				return;
			}
			
			resourceObject.previous();
			this.ui.getCurrentViewControl().refresh();
		},

		nextRecord : function(eventContext){
			if(!eventContext){
				return;
			}
			var resourceObject = eventContext.getResource();
			if(!resourceObject){
				return;
			}

			resourceObject.next();			
			eventContext.ui.getCurrentViewControl().refresh();

			// call ApplicationHandlerBase method
			//this.nextRecord(eventContext);
			
			/* var i = 1;
			var total = 20;
			var view = eventContext.ui.getViewFromId('Inventory.ItemDetailView');
			var label = MessageService.createResolvedMessage("detailLabel", [i, total]);
			//var label = MessageService.createResolvedMessage("Detail {0}/{1}", [i, total]);
			//var label = "Detail (" + i + "/" + total + ")";
			//var label = "Detail (1/20)";
			view.label = label;
			view.refresh();
			return; */
		},

		checkCanCount : function(eventContext){
			var isCanCount = false;
			var currentUserId = UserManager.getInfo('userid');
			var additionaluserinfo = CommonHandler._getAdditionalResource(eventContext,"additionaluserinfo");
			arrayUtil.forEach(additionaluserinfo.data, function(user){
				var userid = user.get('userid');
				if (userid == currentUserId){
					if(user.get('cancount') == 1){
						isCanCount = true;
						return;
					}
				}
			});

			eventContext.setEnabled(isCanCount);
		},

		validateChooseStoreRoom : function(eventContext){
			//eventContext.application.showMessage('AAA');
			var res = false;
			var arrayStoreRoom = CommonHandler._getAdditionalResource(eventContext,"additionalstoreroom");
			var inputLocationResource = eventContext.getResource('chooseStoreRoomResource');
			var inputCurrentLocation = inputLocationResource.getCurrentRecord();
			//var inputLocationResource = CommonHandler._getAdditionalResource(eventContext,'storeRoomResource').getCurrentRecord();
			var pendingLocation = inputCurrentLocation.getPendingOrOriginalValue('location');
			if (pendingLocation !=""){

				if (arrayStoreRoom.count() > 0){
					var inputLocation = pendingLocation.toUpperCase();
					arrayUtil.forEach(arrayStoreRoom.data, function(item){
						var itemLocation = item.get('location');
						if (itemLocation == inputLocation){
							//inputCurrentLocation.set('location', itemLocation);
							res = true;
						}
					});
				} else {
					
				}

				if (!res){
					eventContext.ui.show('Inventory.NotExistStoreRoomWarning');
					//window.UI.showToastMessage(" " + inputCurrentLocation.get('location'));
				} else{
					this.setStoreRoomTitle(eventContext, pendingLocation.toUpperCase());
					this.filterAdditionalInvbalanceByStoreRoom(eventContext);	
				}
			}
		},

		clearChooseStoreRoom : function(eventContext){
			var chooseStoreRoom = eventContext.application.getResource('chooseStoreRoomResource').getCurrentRecord();
			chooseStoreRoom.setNullValue('location');
			this.hideDialog(eventContext);
		},

		//Apply a filter on Invbalance List by storeRoom
		filterAdditionalInvbalanceByStoreRoom : function(eventContext) {
			//this.setStoreRoomTitle(eventContext);

			//this.loadOnlineInvbalance(eventContext);
			this.showFilteredList(eventContext);
		},

		loadLocalInvbalanceByStoreRoom : function(eventContext){
			var invbalance = CommonHandler._getAdditionalResource(eventContext,'invbalance');
			CommonHandler._clearFilterForResource(eventContext,invbalance);			
			var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
			invbalance.filter('location == $1', currentStoreRoom.get('location'));
		},

		checkLocalInvbalanceResource : function(eventContext){
			var result = false;
			var invbalance = CommonHandler._getAdditionalResource(eventContext,'invbalance');
			if (invbalance.count() > 0){
				result = true;
			}
			return result;
		},

		loadInvbalanceByQueryBase : function(eventContext){
			//eventContext.application.showMessage('AAA');
			var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			//var queryBase = view.queries.children[eventContext.index].queryBase;
			var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
			if (currentStoreRoom.get('location') != null){
                var self = this;
				var promise = view.changeQueryBaseIndex(eventContext.index);
				promise.then(function(){
					self.showFilteredList(eventContext).then(function(result){
						if (result){
							view.lists[0].refresh();
						}
					});
				});
			} else {
				var promise = view.changeQueryBase(eventContext.index);
			}
		},

		showFilteredList : function(eventContext){
			var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			var querybase = view.queries.children[view.queryBaseIndex].queryBase;
			var self = this;

			var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();

			var deferred = new Deferred();

			if (currentStoreRoom){
                eventContext.application.showBusy();
				var filter = {};
				filter.location = currentStoreRoom.get('location');

				ModelService.scan("invbalance", querybase, filter).then(function (dataSet) {
					/* if (!eventContext.ui.combinedViews) {
						eventContext.ui.show("Inventory.ItemsView");
					} */
					dataSet.resourceID = 'invbalance';
					eventContext.application.addResource(dataSet);
					if (dataSet.count() > 0){
						ModelService.save(dataSet).then(function(){
							dataSet.setCurrentIndex(0);
						});
					} else {
						ModelService.clearSearchResult(dataSet);
						//eventContext.application.showMessage(MessageService.createStaticMessage("norecords").getMessage());
					}
					deferred.resolve(true);
					eventContext.application.hideBusy();
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
					deferred.resolve(false);
					eventContext.application.hideBusy();
				});						
			}
			return deferred.promise;
		},

		loadOnlineInvbalance : function(eventContext){
			var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			var querybase = view.queries.children[view.queryBaseIndex].queryBase;

			//eventContext.application.showBusy();
			var self = this;

			var filter = {};
			var oslcQueryParameters = {};
			
			var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
			filter.location = currentStoreRoom.get('location');

			/* ModelService.all('invbalance',querybase).then(function(searchResultSet){
				ModelService.clearSearchResult(searchResultSet);			
			}); */

			if (currentStoreRoom && !this.isFiltered){

			var deferred = new Deferred();

			ModelService.fetchFromServer("invbalance",querybase).then (function(hasConnectivity){
				eventContext.application.showBusy();
				if(hasConnectivity){
					/* var filter = {};
					var oslcQueryParameters = {};
					
					var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
					filter.location = currentStoreRoom.get('location'); */

					/* ModelService.all('invbalance',querybase).then(function(searchResultSet){
						ModelService.clearSearchResult(searchResultSet);			
					}); */

					//network fetch
					ModelService.filtered('invbalance', querybase, filter, null, true, false, oslcQueryParameters).then(function(dataSet){
						dataSet.resourceID = 'invbalance';
						eventContext.application.addResource(dataSet);
						if (dataSet.count() > 0){
							ModelService.save(dataSet).then(function(){
								dataSet.setCurrentIndex(0);
							});

							eventContext.application.hideBusy();
						} else {
							//offline fetch

							//removed attribute that was added by previous modelservice network call.
							delete filter._querybases;

							ModelService.filtered('invbalance', querybase, filter, null, false, false, oslcQueryParameters).then(function(invbalanceSet){
								deferred.resolve(invbalanceSet);
							});

							var promise = deferred.promise;
							
							promise.then(function(invbalanceSet){
								ModelService.clearSearchResult(invbalanceSet).then(function(){					
																	
									if (invbalanceSet.count()>0){
										/* arrayUtil.forEach(invbalanceSet.data, function(data){
											data.setQueryBase("__search_result__");									
										}); */	
					
										invbalanceSet.resourceID = 'invbalance';
										eventContext.application.addResource(invbalanceSet);
										
										ModelService.save(invbalanceSet).then(function(){
											invbalanceSet.setCurrentIndex(0);
										});
										
										eventContext.application.hideBusy();	
									} else {
										//ModelService.clearSearchResult(invbalanceSet);
										self.loadLocalInvbalanceByStoreRoom(eventContext);
										eventContext.application.hideBusy(); 
									}						
								});					
							});						
						}
						
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
				} else {
					//offline fetch - filter
					/* self.loadLocalInvbalanceByStoreRoom(eventContext);
					eventContext.application.hideBusy(); */


					//removed attribute that was added by previous modelservice network call.
					delete filter._querybases;

					ModelService.filtered('invbalance', querybase, filter, null, false, false, oslcQueryParameters).then(function(invbalanceSet){
						deferred.resolve(invbalanceSet);
					});

					var promise = deferred.promise;
					
					promise.then(function(invbalanceSet){
						ModelService.clearSearchResult(invbalanceSet).then(function(){							
							if (invbalanceSet.count()>0){	
			
								invbalanceSet.resourceID = 'invbalance';
								eventContext.application.addResource(invbalanceSet);
								
								ModelService.save(invbalanceSet).then(function(){
									invbalanceSet.setCurrentIndex(0);
								});
								
								eventContext.application.hideBusy();						
									
							} else {
								self.loadLocalInvbalanceByStoreRoom(eventContext);
								eventContext.application.hideBusy();						
							}
						});					
					});
				}
			});
		} 	
		},

		filterBinLookupTo : function(eventContext) {
			
			var invbalanceSet = CommonHandler._getAdditionalResource(eventContext,'invbalance');
			
			var binList = [];
			var search = eventContext.application.getResource("searchItems").getCurrentRecord();
			var binFrom = search.get('binfrom');
			if (binFrom){
				if (binFrom != null){
					invbalanceSet.filter('binnum > $1', binFrom);

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

					return invbalanceSet;

				}
			} 
			
			invbalanceSet.filter('1 == 0');
		
			return invbalanceSet;
		},

		handleConditionBinnum: function (eventContext) {
            var currentSearchItems = CommonHandler._getAdditionalResource(eventContext,"searchItems").getCurrentRecord();
            var binFrom = currentSearchItems.get("binfrom");
            var binTo = currentSearchItems.get("binto");
            if (!eventContext.hasResourceWatch("binFromWatch")) {
                eventContext.addResourceWatchHandle(
                    currentSearchItems.watch(
                        "binfrom",
                        lang.hitch(this, function (attrName, oldValue, newValue) {
                            if (newValue) {
                                eventContext.children[0]._setReadOnly(true);
                            } else {
                                eventContext.children[0]._setReadOnly(false);
                            }
                        })
                    ),
                    "binFromWatch"
                );
            }
            if (!eventContext.hasResourceWatch("binToWatch")) {
                eventContext.addResourceWatchHandle(
                    currentSearchItems.watch(
                        "binto",
                        lang.hitch(this, function (attrName, oldValue, newValue) {
                            if (newValue) {
                                eventContext.children[0]._setReadOnly(true);
                            } else {
                                eventContext.children[0]._setReadOnly(false);
                            }
                        })
                    ),
                    "binToWatch"
                );
            }
        },

        handleConditionBinRange: function (eventContext) {
            var currentSearchItems = CommonHandler._getAdditionalResource(eventContext,"searchItems").getCurrentRecord();
            var binNum = currentSearchItems.get("binnum");
            if (!eventContext.hasResourceWatch("binNumWatch")) {
                eventContext.addResourceWatchHandle(
                    currentSearchItems.watch(
                        "binnum",
                        lang.hitch(this, function (attrName, oldValue, newValue) {
                            if (newValue) {
                                eventContext.children[0]._setReadOnly(true);
                                eventContext.children[1]._setReadOnly(true);
                            } else {
                                eventContext.children[0]._setReadOnly(false);
                                eventContext.children[1]._setReadOnly(false);
                            }
                        })
                    ),
                    "binNumWatch"
                );
            }
        },

		_addBackSlash: function (str) {
            var result = "";
            var chars = str.split("");
            chars.forEach(function (oneChar) {
                if (oneChar === '"') {
                    oneChar = '\\"';
                }
                if (oneChar === "-") {
                    oneChar = "\\-";
                }
                if (oneChar === ",") {
                    oneChar = "\\,";
                }
                result += oneChar;
            });
            return result;
        },

		// Loc-Out
		//#endregion
		
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
			//#region Loc-In: Customize discardSummaryView method by location

			/* var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			view.changeQueryBase(eventContext.application.ui.savedQueryIndex);
		    var queryBase = view.queries.children[eventContext.application.ui.savedQueryIndex].queryBase;
			ModelService.all('invbalance', queryBase).then(function(modelDataSet){
				modelDataSet.resourceID = 'invbalance';
				eventContext.application.addResource(modelDataSet);
				eventContext.application.ui.getViewFromId('Inventory.ItemsView').lists[0].refresh();
			}); */

			var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			var savedQueryIndex = eventContext.application.ui.savedQueryIndex;
			var currentStoreRoom = eventContext.application.getResource('storeRoomResource').getCurrentRecord();
			if (currentStoreRoom.get('location') != null){
                var self = this;
				var promise = view.changeQueryBaseIndex(savedQueryIndex);
				promise.then(function(){
					self.showFilteredList(eventContext).then(function(result){
						if (result){
							view.lists[0].refresh();
						}
					});
				});
			} else {
				CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
					if (!hasConnectivity) {
						var promise = view.changeQueryBase(savedQueryIndex);{}
						promise.then(function(){
							CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
								if (!hasConnectivity) {
									var invbalanceSet = CommonHandler._getAdditionalResource(eventContext,'invbalance');
									CommonHandler._clearFilterForResource(eventContext,invbalanceSet);
									view.lists[0].refresh();
								}
							});
						});
					} else{
						var invbalanceSet = CommonHandler._getAdditionalResource(eventContext,'invbalance');
						CommonHandler._clearFilterForResource(eventContext,invbalanceSet);
						view.changeQueryBase(savedQueryIndex);
						//view.lists[0].refresh();
					}
				});
			}


			/* var view = eventContext.application.ui.getViewFromId('Inventory.ItemsView');
			view.changeQueryBase(eventContext.application.ui.savedQueryIndex);
		    var queryBase = view.queries.children[eventContext.application.ui.savedQueryIndex].queryBase;
			ModelService.all('invbalance', queryBase).then(function(modelDataSet){
				modelDataSet.resourceID = 'invbalance';
				eventContext.application.addResource(modelDataSet);
				eventContext.application.ui.getViewFromId('Inventory.ItemsView').lists[0].refresh();
			}); */

			//#endregion Loc-Out
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

		//#region Loc-In: Add filterStoreroomLookup method
		filterStoreroomLookup: function(eventContext) {
			var additionalstoreroom = CommonHandler._getAdditionalResource(eventContext,'additionalstoreroom');
			CommonHandler._clearFilterForResource(eventContext,additionalstoreroom);
			return additionalstoreroom;					
		},
		//#endregion Loc-Out
		
		//#region Loc-In: Adjust the filterBinLookup by getDistinctBin resource
		filterBinLookup : function(eventContext) {
			/* 
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
			*/

			// set lookup filter on getDistinctBin
			var distinctBin = CommonHandler._getAdditionalResource(eventContext,'getDistinctBin');
			CommonHandler._clearFilterForResource(eventContext,distinctBin);
			var binList = [];
			
			arrayUtil.forEach(distinctBin.data, function(item){
				var binnum = item.get('binnum');
				if (binnum){
					if (binList.indexOf(binnum)<0){
						binList.push(binnum);
					} else {
						item.deleteLocal();
					}
				} else {
					item.deleteLocal();
				}
			});
			
			binList = [];
		
			return distinctBin;

		},
		//#endregion Loc-Out
		
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

			//#region Loc-In: clear value of attributes: description, binfrom, binto, modelnum
			search.setNullValue('description');
			search.setNullValue('binfrom');
			search.setNullValue('binto');
			search.setNullValue('modelnum');
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
