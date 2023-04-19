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

define("application/handlers/IssuesAvailableItemsHandler", 
	   [ "dojo/_base/declare",
	     "dojo/_base/array",
		 "dojo/_base/lang",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/comm/CommunicationManager",
	     "platform/model/PushingCoordinatorService",
	     "platform/translation/SynonymDomain",
	     "application/business/InvuseObject",
	     "platform/model/ModelService",
	     "platform/translation/MessageService",
	     "application/handlers/CommonHandler",
	     "application/handlers/IssuesReturnsHandler",
	     "application/business/FieldUtil",
	     "platform/exception/PlatformRuntimeException",
	     "platform/warning/PlatformRuntimeWarning",
	     "platform/auth/UserManager",
	     "platform/util/PlatformConstants",
	     "application/business/WpEditSettings",
	     "platform/util/AsyncAwareMixin",
	     "platform/logging/Logger",
	     "platform/store/PersistenceManager",
	     "platform/store/_StoreProvider",
	     "platform/store/_ResourceMetadataContext",
	     "dojo/Deferred",
	     "dojo/promise/all",
	     "dojo/topic", 
	     "dojo/number"],
function(declare, arrayUtil, lang, ApplicationHandlerBase, CommunicationManager, PushingCoordinatorService, SynonymDomain, InvuseObject, ModelService, MessageService, CommonHandler, IssuesReturnsHandler, FieldUtil, PlatformRuntimeException, PlatformRuntimeWarning, UserManager, PlatformConstants, WpEditSettings, AsyncAwareMixin, Logger,PersistenceManager, StoreProvider, ResourceMetadata, Deferred, all, topic, NumberUtil) {
	//#region Loc-In: declare global variables
	var isWODataChanged = false;
	var isLocationDataChanged = false;
	//#endregion Loc-Out:declare global variables
	return declare( [ApplicationHandlerBase, AsyncAwareMixin],  {
		//isWODataChanged: false,
		//isLocationDataChanged: false,
	_className: "[application.handlers.IssuesAvailableItemsHandler]",
		
		/*
		 * Validate the issue quantity
		 */
/**@memberOf application.handlers.IssuesAvailableItemsHandler */
		validateQty : function (eventContext) {
			var  additionalItemData = eventContext.application.getResource("issueAdditionalItems").getCurrentRecord();
			var qty = additionalItemData.getPendingOrOriginalValue('issueQty');
			
			return true;
		},
			
		completeAvailableItems : function(eventContext){
			var additionalInventoryItemResource = eventContext.application.getResource("inventory");
			var additionalInventoryItem = additionalInventoryItemResource.getCurrentRecord();
			var issueAdditionalItemsResource = eventContext.application.getResource("issueAdditionalItems");
			var additionalItemData = issueAdditionalItemsResource.getCurrentRecord();
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			var invuseResource = this.application.getResource("invuse");
			var invuseline = null;
			var storeroom = issuesReturns.storeroom;
			var siteid = issuesReturns.siteid;
			var itemnum = additionalInventoryItem.get('itemnum');
			var itemsetid = additionalInventoryItem.get('itemsetid');
			var binnum = additionalInventoryItem.get('binnum');
			var lotnum = additionalInventoryItem.get('lotnum');
			var rotating = additionalInventoryItem.get('rotating');
			var itemType = additionalInventoryItem.get('itemtype');
			var glaccount = additionalItemData.get('glaccount');
			var wonum = additionalItemData.get('wonum');
			var asset = additionalItemData.get('asset');
			var location = additionalItemData.get('location');
			var issueTo = additionalItemData.get('issueTo');
			var issueQty = additionalItemData.get('issueQty');
			var taskid = additionalItemData.get('taskid');
			var self = this;
			//#region Loc-In: Add attributes
			var issueAdditionalUsage  = eventContext.application.getResource("issueAdditionalUsage").getCurrentRecord();
			var formNumber = issueAdditionalUsage.get('formnumber');
			var description = issueAdditionalUsage.get('description');
			var documentRef = issueAdditionalUsage.get('documentref');
			var createDate = issueAdditionalUsage.get('createdate');

			//var actualDate = this.application.getCurrentDateTime();
			var actualDate = additionalItemData.get('actualdate');

			var fromBin = additionalItemData.get('frombin');
			//var invbalTemp = CommonHandler._getAdditionalResource(eventContext,'invbalTemp').getCurrentRecord();
			var fromLot = additionalItemData.get('fromlot');

			if (!formNumber || !description || !createDate  
				|| (!wonum && !location && !glaccount)
				|| !actualDate || !fromLot) {
				var msg = MessageService.createStaticMessage("requiredField").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			//#endregion Loc-Out:Add attributes		
			
			//validate view, check if required fields are populated
			if (!eventContext.ui.getCurrentViewControl().validate()) {
				return;
			}
			
			if(!this.validateQty(eventContext)){
				return;
			}
			
			//show busy
			eventContext.application.showBusy();

			//clear any data that may have been stuck in resource from prior transactions
			invuseResource.data = [];
			invuseResource._recordsToCreate = [];
			
			//reset splitrotateresource
			var  splitrotateresource = eventContext.application.getResource("splitrotateresource");
			splitrotateresource.data = [];
			
			//setup status
			var domaininvusestatus = CommonHandler._getAdditionalResource(eventContext,'domaininvusestatus');
			var currentStatus = SynonymDomain.resolveToDefaultExternal(domaininvusestatus,'ENTERED');
			//var currentStatus = SynonymDomain.resolveToInternal(domaininvusestatus,'ENTERED');
			
			var domainitemtypes = CommonHandler._getAdditionalResource(eventContext,'domainitemtype');
			//var toolItemType = SynonymDomain.resolveToInternal(domainitemtypes,'TOOL');
			var toolItemType = SynonymDomain.resolveToDefaultExternal(domainitemtypes,'TOOL');
			
			
			var domaininvusetype = CommonHandler._getAdditionalResource(eventContext,'domaininvusetype');
			var issueType = SynonymDomain.resolveToDefaultExternal(domaininvusetype, 'ISSUE');
			
				//check qty of item being issued.  If qty exists continue with issue.
				if(additionalItemData.issueQty && additionalItemData.issueQty>0){
					//check negative availability
					var issuesReturnsHandler = new IssuesReturnsHandler();
					var negPromise = issuesReturnsHandler.checkNegativeAvailability(eventContext, additionalInventoryItemResource, issuesReturns, issueQty);
					negPromise.then(function(negObject){						
						//create invuse record
						invuse = invuseResource.createNewRecord();
						invuse.openPriorityChangeTransaction();
						invuse.set('usetype', issueType);
						invuse.set('description', MessageService.createResolvedMessage('invuseDescription'));
						invuse.set('fromstoreloc', storeroom);
						invuse.set('status', currentStatus);
						invuse.set('siteid',siteid);
						//#region Loc-In: set header fields
						invuse.set('formnumber', formNumber);
						invuse.set('description', description);
						invuse.set('documentref', documentRef);
						invuse.set('createdate', createDate);
						/* invuse.set('formnumber', formNumber);
						invuse.set('documentref', documentRef);
						if (creatDate == null) {
							creatDate = this.application.getCurrentDateTime();
							invuseline.setDateValue("createdate", creatDate);
						} else {
							invuseline.set("createdate", creatDate);
						} */
						//#endregion Loc-Out: set header fields
						invuse.closePriorityChangeTransaction();
						
						//initialize invuseline on new invuse record
						invuse.getModelDataSet("invuseline", true).then(function(ivline){
							invuse.openPriorityChangeTransaction();
							var deferreds = [];
							var splitPromise = new Deferred();
							invuseline = ivline.createNewRecord();
							var invuselineUsetype = SynonymDomain.resolveToDefaultExternal(domaininvusetype, 'ISSUE');
							invuseline.set('usetype', invuselineUsetype);
							invuseline.set('quantity',issueQty);
							invuseline.set('siteid', siteid);
							invuseline.set('invuselinenum',1);
							invuseline.set('itemnum',itemnum);
							invuseline.set('itemsetid',itemsetid);
							//invuseline.set('frombin',binnum);
							invuseline.set('fromlot',lotnum);
						
							invuseline.set('wonum',wonum);
							invuseline.set('assetnum',asset);
							invuseline.set('location',location);

							//#region Loc-In: A value required for the ActualDate field on the INVUSELINE object
							invuseline.set("actualdate", actualDate);
							/* if (actualDate == null) {
								actualDate = this.application.getCurrentDateTime();
								invuseline.setDateValue("actualdate", actualDate);
							} else {
								invuseline.set("actualdate", actualDate);
							} */
							//#endregion Loc-Out: A value required for the ActualDate field on the INVUSELINE object
							
							if ( itemType == toolItemType && ( !issueTo ) ){
								var msg = MessageService.createResolvedMessage('issueToRequired',[itemnum]);
								eventContext.application.hideBusy();
								self.ui.showMessage(msg);
								throw new PlatformRuntimeException('issueToRequired', [itemnum]);
							}
							
							invuseline.set('issueto',issueTo);
							if(taskid){
								invuseline.set('taskid',taskid);
							}
							
							var dataKey = itemnum+'::'+storeroom+'::'+siteid+'::'+itemsetid;
							var negativeAvailMaxvar = negObject.negativeAvailMaxvar;
							var itemBalanceMap = negObject.itemBalanceMap;
							var curbaltotalMap = negObject.curbaltotalMap;
							var itemAvailableBalanceMap = negObject.itemAvailableBalanceMap;
						
							//rotating
							if(rotating){
								var rotatingItemTotalQty = itemBalanceMap[dataKey];
								var curbaltotalQty = curbaltotalMap[dataKey];							
								
								if(rotatingItemTotalQty>curbaltotalQty){
									 //not enough rotating item balance in bins stop
									 //have user change reserve qty
									var msg = MessageService.createResolvedMessage('splitLineQtyRot');
									eventContext.application.hideBusy();
									self.ui.showMessage(msg);
									throw new PlatformRuntimeException('splitLineQtyRot');
								}
							}
							
							if(!rotating && negativeAvailMaxvar=='ALLOW'){
								var itemBalanceRequested = itemBalanceMap[dataKey];
								var itemQtyAvailable = itemAvailableBalanceMap[dataKey];
								var curbaltotalQty = curbaltotalMap[dataKey];
								
								if(itemBalanceRequested>curbaltotalQty){
									//skip splitting this one
									splitPromise.resolve();
									deferreds.push(splitPromise);
									
									invuse.closePriorityChangeTransaction();
									self.changeStatus(invuse,eventContext,'IssuesReturns.SearchUnreservedView', self);
									return;
								}
							}
							
							//check split
							splitPromise = self.checkSplit(eventContext, additionalInventoryItem, additionalItemData, invuse, invuseline);
							deferreds.push(splitPromise);
							//invuse.closePriorityChangeTransaction();							
						});
					});
				}else{
					self.ui.showMessage(MessageService.createResolvedMessage('materialQuantityPositive'));
					eventContext.application.hideBusy();
				}

		},

		
		/**
		 * Splits the selected record into available bins with balances
		 */
		checkSplit : function(eventContext, inventory, itemdata, invuse, invuseline){
			var  splitqtyacrossbins = eventContext.application.getResource("splitqtyacrossbins");
			var self = this;
			
			//reset
			splitqtyacrossbins.data=[];
			
			var itemnum = inventory.get('itemnum');
			var siteid = inventory.get('siteid');
			var itemsetid = inventory.get('itemsetid');
			var location = inventory.get('location');
			var binnum = inventory.get('binnum');
			var issueQty = itemdata.get('issueQty');
			var rotating = inventory.get('rotating');
			//#region Loc-In: Add fields
			var frombin = itemdata.get('frombin');
			var fromlot = itemdata.get('fromlot');
			var frombinCurbal = itemdata.get('frombincurbal');
			//#endregion Loc-Out: Add fields
			
			var invbalanceFilter = [{'itemnum': itemnum, 'siteid':siteid, 'itemsetid':itemsetid, 'location':location}];
			
//			if(binnum){
//				invbalanceFilter.push({'binnum':binnum});
//			}
			
			var invbalancesPromise =  ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, invbalanceFilter, 1000, true, true, null, false);
			invbalancesPromise.then(function(invbalanceSet){
				if(invbalanceSet && invbalanceSet.count()>0){
					
					var invbalance = invbalanceSet.data[0];

					//#region Loc-In:
					
					/* //check if default binnum exists in invbalance
					var invbalBinSet = invbalanceSet.find('binnum == $1', binnum);
					if(invbalBinSet.length==0){
						invuseline.set('frombin',invbalance.binnum);
					} else {
						//invbalance rec for the bin exists, so just set default bin
						invuseline.set('frombin',binnum);
					}
					
					var currentBalance = invbalance.curbal; */

					//If exist frombin that user inputted => set frombin = INPUTTED frombin
					// Else if default binnum exists in invbalance => set frombin = DEFAULT binnum
					// ELse set frombin = FIRST binnum exists in invbalance
					var dynamicBin;
					var dynamicLot;
					if(fromlot){
						dynamicBin = frombin;
						dynamicLot = fromlot;
						currentBalance = frombinCurbal;
					} else {
						//check if default binnum exists in invbalance
						var invbalBinSet = invbalanceSet.find('binnum == $1', binnum);
						if(invbalBinSet.length == 0){
							dynamicBin = invbalance.binnum;
							dynamicLot = invbalance.lotnum;

						} else {
							dynamicBin = binnum;
							dynamicLot = lotnum;
							currentBalance = invbalBinSet[0].curbal;
						}
					}
					invuseline.set('frombin', dynamicBin);
					invuseline.set('fromlot', dynamicLot);
					//#endregion Loc-Out: Add fields
					
					
					if (rotating && rotating==true && issueQty>=1){
						self.autoSplit(eventContext, inventory, itemdata, invuse, invuseline);
					} else if (issueQty>currentBalance){
						self.autoSplit(eventContext, inventory, itemdata, invuse, invuseline);
					} else {
						self.changeStatus(invuse,eventContext,'IssuesReturns.SearchUnreservedView', self);
					}
					invuse.closePriorityChangeTransaction();
				} else {
					//reset resource
					var  splitrotateresource = eventContext.application.getResource("splitrotateresource");
					splitrotateresource.data=[];
					invuse.closePriorityChangeTransaction();
					invuse = null;
					invuseline = null;
					//throw message
					var msg = MessageService.createResolvedMessage('noItemFoundInStoreroom', [itemnum]);
					self.ui.showMessage(msg);
					throw new PlatformRuntimeException('noItemFoundInStoreroom'); 
				}
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});	
		},
			
		
		/**
		 * Splits the selected record into available bins with balances
		 */
		autoSplit : function(eventContext,inventory, itemdata, invuse, invuseline){
			var  splitqtyacrossbins = eventContext.application.getResource("splitqtyacrossbins");
			var self = this;
						
			var itemnum = inventory.get('itemnum');
			var siteid = inventory.get('siteid');
			var itemsetid = inventory.get('itemsetid');
			var location = inventory.get('location');
			var issueunit = inventory.get('issueunit');
			var description = inventory.get('description');
			var issueQty = itemdata.get('issueQty');
			var rotating = inventory.get('rotating');
			
			var invbalanceFilter = {'itemnum': itemnum, 'siteid':siteid, 'itemsetid':itemsetid, 'location':location, 'stagingbin': false};
			var invbalancesPromise =  ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, invbalanceFilter, 1000, true, true, null, false);
			invbalancesPromise.then(function(invbalanceSet){
				if(invbalanceSet && invbalanceSet.count()>0){
					var issuesReturnsHandler = new IssuesReturnsHandler();
					//loadSplitQtyResource - inmemory
					var loadSplitQtyResource = issuesReturnsHandler.loadSplitQtyResource(eventContext, invbalanceSet, invbalanceFilter);
					var data = null;
					//splitting of rotating
					if (rotating && rotating==true){
						loadSplitQtyResource.then(function(calculatedlDataSplitBinQtyTEMP){
							arrayUtil.forEach(calculatedlDataSplitBinQtyTEMP, function(inMemory){
								if(inMemory.quantity==0){
									return;
								} else if ((issueQty>0 && issueQty >= inMemory.quantity) || (issueQty>0 && issueQty < inMemory.quantity)){
									while(inMemory.quantity>0 && issueQty>0){
										var splitrec = splitqtyacrossbins.createNewRecord();
										
										inMemory.quantity = inMemory.quantity - 1;
										issueQty = issueQty - 1;
										
										splitrec.set('quantity', 1);
										splitrec.set('itemnum', inMemory.itemnum);
										splitrec.set('itemsetid', inMemory.itemsetid);
										splitrec.set('location', location);
										splitrec.set('siteid', inMemory.siteid);
										splitrec.set('binnum', inMemory.binnum);
										splitrec.set('lotnum', inMemory.lotnum);
										splitrec.set('description', description);
										splitrec.set('rotating', rotating);
										splitrec.set('issueunit', issueunit);
										//splitrec.set('rotassetnum', rotassetnum);
										splitrec.invuseline = invuseline;
										splitrec.invuse = invuse;
										
										if(issueQty==0){
											return;
										}
									} 
								} else {
									return;
								}									
							});
							data = lang.clone(calculatedlDataSplitBinQtyTEMP);
							
							//sort by item asc
							splitqtyacrossbins.sort('itemnum asc');
							
							var  calculatedDataSplitBinQty = eventContext.application.getResource("calculatedDataSplitBinQty");
							calculatedDataSplitBinQty.data = data;
							
							eventContext.ui.show("IssuesReturns.SplitQtyAcrossBinsView");							
						});
					} else {
						loadSplitQtyResource.then(function(calculatedlDataSplitBinQtyTEMP){
							arrayUtil.forEach(calculatedlDataSplitBinQtyTEMP, function(inMemory){
								//check if bin in inventory has 0 qty, if so skip to next bin
								if(inMemory.quantity==0){
									return;
								} else if ((issueQty>0 && issueQty >= inMemory.quantity) || (issueQty>0 && issueQty < inMemory.quantity)){
									var splitrec = splitqtyacrossbins.createNewRecord();
									
									if (issueQty>0 && issueQty < inMemory.quantity){
										splitrec.set('quantity', issueQty);
										inMemory.quantity = inMemory.quantity-issueQty;
										if (inMemory.quantity>=0){
											issueQty = 0;	
										}
									} else {
										splitrec.set('quantity', inMemory.quantity);
										issueQty = issueQty - inMemory.quantity;
										inMemory.quantity = 0;
									}
									
									splitrec.set('itemnum', inMemory.itemnum);
									splitrec.set('itemsetid', inMemory.itemsetid);
									splitrec.set('location', inMemory.location);
									splitrec.set('siteid', inMemory.siteid);
									splitrec.set('binnum', inMemory.binnum);
									splitrec.set('lotnum', inMemory.lotnum);
									splitrec.set('description', description);
									splitrec.set('rotating', rotating);
									splitrec.set('issueunit', issueunit);
									splitrec.invuseline = invuseline;
									splitrec.invuse = invuse;
									
									if(issueQty<0){
										return;
									}
								} else {
									return;
								}
							});
							data = lang.clone(calculatedlDataSplitBinQtyTEMP);
							
							//sort by item asc
							splitqtyacrossbins.sort('itemnum asc');
							
							var  calculatedDataSplitBinQty = eventContext.application.getResource("calculatedDataSplitBinQty");
							calculatedDataSplitBinQty.data = data;
							
							eventContext.ui.show("IssuesReturns.SplitQtyAcrossBinsView");							
							
						});	
						
					}
//					//sort by item asc
//					splitqtyacrossbins.sort('itemnum asc');
//					
//					var  calculatedDataSplitBinQty = eventContext.application.getResource("calculatedDataSplitBinQty");
//					calculatedDataSplitBinQty.data = data;
//					
//					eventContext.ui.show("IssuesReturns.SplitQtyAcrossBinsView");
				}
				
			});	
		},	
		
		/**
		 * Change Status
		 * 
		 * Status will be change to Complete when issuing an item
		 */
		changeStatus: function(invuse, eventContext, startingSearchView, currentThis){
			var statusChange = CommonHandler._getAdditionalResource(currentThis,"statusChangeResource").getCurrentRecord();
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			var memo = statusChange.get("memo");
			var statusDate = this.application.getCurrentDateTime();
			var invuseResource = invuse.getOwner();
			var self = this;
			
			//change status to complete
			InvuseObject.complete(invuse, statusDate, memo, eventContext);

			ModelService.save(invuseResource).then(function(){
				//flush transactions before checking for errors
				var flushPromise = PushingCoordinatorService.flush();
				flushPromise.then(function(){
					issueAdditionItemRecord.issueTo 	= "";
					issueAdditionItemRecord.wonum 		= "";			
					issueAdditionItemRecord.issueQty	= "";
					//#region Loc-In: clear actualDate, frombin AND header usage
					issueAdditionItemRecord.actualdate  = null;
					issueAdditionItemRecord.frombin  = "";
					self.clearAdditionalUsage(eventContext);
					//#endregion Loc-Out: clear actualDate, frombin AND header usage
					self.clearBaseFieldsFromWO(eventContext);
					self.clearUnreservedSearchFields(eventContext);
					eventContext.application.hideBusy();
					eventContext.ui.returnToView(startingSearchView);
				});

			}).otherwise(function(err){
				eventContext.application.hideBusy();
				eventContext.ui.showMessage(err);
			});
			
		},
		
		getError : function(eventContext){
			var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
			return errorRes.get('hasError');
		},
		
		/**
		 * Clears SEARCH view fields.
		 */
		clearSearchFields : function(eventContext) {
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			issuesReturns.setNullValue('wonum');
			issuesReturns.setNullValue('asset');
		},
		
		/**
		 * Check if required fields are populated
		 */
		_isRequiredFieldFilled : function (eventContext) {
			
			var issuesReturnsResource = CommonHandler._getAdditionalResource(this,"issuesReturns").getCurrentRecord();
			var site = issuesReturnsResource.get('siteid');
			var storeroom = issuesReturnsResource.get('storeroom');
			
			if ( !site || !storeroom ){
				return false;
			}
			
			return true;
		},
		
		/**
		 * Transits to Search view of Additional Item
		 * Validates required data and transits to Issue Additional Item Search view
		 */
		transitsToIssueAdditionalSearchView : function (eventContext) {
			if (!this._isRequiredFieldFilled(eventContext)){
				this.ui.showMessage(MessageService.createStaticMessage('requiredField').getMessage());
				return;
			}
			this.clearUnreservedSearchFields(eventContext);
			this.ui.show("IssuesReturns.SearchUnreservedView");
		},
		
		/**
		 * Transits Back to Search view of Additional Item
		 * transits to Issue Additional Item Search view
		 */
		transitsBackToIssueAdditionalSearchView : function (eventContext) {
			eventContext.application['application.handlers.IssuesAvailableItemsHandler'].clearUnreservedSearchFields(eventContext);
			//#region Loc-In: clear Additional header, SearchField, reference fields
			var handler = eventContext.application['application.handlers.IssuesAvailableItemsHandler'];
			handler.clearAdditionalUsage(eventContext);
			handler.clearBaseFieldsFromWO(eventContext);
			handler.clearAdditionalItems(eventContext);
			//#endregion Loc-Out: clear Additional header, SearchField, reference fields
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Clears search fields for Unreserved Items
		 */
		clearUnreservedSearchFields : function(eventContext) {
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			issuesReturns.setNullValue('itemnum');
			issuesReturns.setNullValue('itemdesc');
			issuesReturns.setNullValue('bin');
			//#region Loc-In: clear partno value
			issuesReturns.setNullValue('modelnumref');
			//#endregion Loc-Out: clear partno value
		},
		
		/**
		 * Clear some fields (taskid, glaccount, location and asset)
		 */
		clearBaseFieldsFromWO: function(eventContext){
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			issueAdditionItemRecord.taskid 		= "";
			issueAdditionItemRecord.glaccount 	= "";
			issueAdditionItemRecord.location 	= "";
			issueAdditionItemRecord.asset 		= "";
		},
		
		/**
		 * Cancels the Additional Items on Items Details View (Unreserved Item) and returns back to the list view or search view with fields cleared.
		 */
		cancelAdditionalItems : function(eventContext){
			//#region Loc-In: clear Addtional Item, SearchFields, HeaderFields
			/* var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			issueAdditionItemRecord.issueTo 	= "";
			issueAdditionItemRecord.wonum 		= "";			
			issueAdditionItemRecord.issueQty	= ""
			this.clearBaseFieldsFromWO(eventContext);
			this.clearUnreservedSearchFields(eventContext);*/

			this.clearAdditionalItems(eventContext);
			this.clearBaseFieldsFromWO(eventContext);
			this.clearUnreservedSearchFields(eventContext);
			this.clearAdditionalUsage(eventContext);
			//#endregion Loc-Out: clear Addtional Item, SearchFields, HeaderFields
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Search for item (unreserved)
		 */
		searchUnreservedItem : function(eventContext) {
			var filter = [];
			var oslcQueryParameters = {};
			var currentRecord = eventContext.getCurrentRecord();
			var itemNum = currentRecord.itemnum;
			var itemDesc = currentRecord.itemdesc;
			var bin = currentRecord.bin;
			//#region Loc-In: Add partNo
			var partno = currentRecord.modelnumref;
			//#endregion Loc-Out: Add partNo
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			var storeroom = issuesReturns.storeroom;
			var self = this;			

			//verify if we have at least one field filled
			//#region Loc-In: Add partNo
			//if(!itemNum && !itemDesc && !bin){
			if(!itemNum && !itemDesc && !bin && !partno){
			//#endregion Loc-Out: Add partNo
				var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			
			//check for errors
			if (this.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				eventContext.application.showBusy();
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){
						var siteid = UserManager.getInfo("defsite");		
						filter.push({siteid: siteid});
						filter.push({location: storeroom});
						
						if (itemNum){
							filter.push({itemnum: itemNum});
						}
						if (itemDesc){
							filter.push({description: '%'+itemDesc+'%'});
						} 
						if (bin){
							filter.push({binnum: '%'+bin+'%'});
						}
						//#region Loc-In: Add partNo and change logic partno searching on inventory, partno is modelnumref of invitem
						if (partno){
							filter.push({modelnumref: '"%'+partno+'%"'});
						}

						/* eventContext.application.showBusy();
						var invbalancePromise =  ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						invbalancePromise.then(function(invbalanceSet){
							
							//verify if search result data is empty
							if(invbalanceSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							
							//This is a workaround to solve a limitation on platform to search by description on inventory resource
							filter = [];
							invbalanceSet.foreach(function(elem,pos,array){ 
								if(bin){
									filter.push({siteid: siteid, location: storeroom, itemnum: elem.itemnum, binnum: elem.binnum});
								}
								else{
									filter.push({siteid: siteid, location: storeroom, itemnum: elem.itemnum});
								}
							});
							
							ModelService.filtered('inventory',null,filter,1000,false,false).then(function(set){

								set.resourceID = 'inventory';
								eventContext.application.addResource(set);
								
								if(set.data.length == 1) {
									eventContext.ui.show("IssuesReturns.AdditionalItemsDetailsView");
								}else{
									eventContext.ui.show("IssuesReturns.AdditionalItemsListView");
								}
								
								//clear model data service
								ModelService.clearSearchResult(set);
							});
							
							//clear model data service
							ModelService.clearSearchResult(invbalanceSet);
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						}); */
						
						eventContext.application.showBusy();

						var onlyPartNoSearching = false;
						if (partno && !itemNum && !itemDesc && !bin) {
							onlyPartNoSearching = true;
						}

						if (onlyPartNoSearching) {
							
							ModelService.filtered('inventory', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, false, oslcQueryParameters, false).then(function(set){
								
								set.resourceID = 'inventory';
								eventContext.application.addResource(set);
								
								if(set.data.length == 1) {
									eventContext.ui.show("IssuesReturns.AdditionalItemsDetailsView");
								} else if (set.data.length > 1){ 
									eventContext.ui.show("IssuesReturns.AdditionalItemsListView");
								} else {
									var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
									self.ui.showMessage(msg);
								}
								
								//clear model data service
								ModelService.clearSearchResult(set);
							});
						} else {
							eventContext.application.showBusy();
							var invbalancePromise =  ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
							invbalancePromise.then(function(invbalanceSet){
								
								//verify if search result data is empty
								if(invbalanceSet.data.length == 0){
									var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
									self.ui.showMessage(msg);
									return;
								}
								
								//This is a workaround to solve a limitation on platform to search by description on inventory resource
								filter = [];
								invbalanceSet.foreach(function(elem,pos,array){
									if(bin){
										//#region Loc-In: no search bin on inventory resource
										//filter.push({siteid: siteid, location: storeroom, itemnum: elem.itemnum, binnum: elem.binnum});
										filter.push({siteid: siteid, location: storeroom, itemnum: elem.itemnum});
										//#endregion Loc-Out: no search bin on inventory resource
									}
									else{
										filter.push({siteid: siteid, location: storeroom, itemnum: elem.itemnum});
									}
								});

								//#region Loc-In: Add partNo
								if (partno){
									filter.push({modelnumref: '"%'+partno+'%"'});
								}
								//#endregion Loc-Out: Add partNo
								
								ModelService.filtered('inventory',null,filter,1000,false,false).then(function(set){
									//Loc-In: set binnum of invbalance to inventory
									/* arrayUtil.forEach(set, function(inve){
										arrayUtil.forEach(invbalanceSet, function(invb){
											if (inve.location == invb.location && inve.itemnum == invb.itemnum) {
												inve.binnum = invb.binnum;
											}
										});
									}); */
									//Loc-Out:
	
									set.resourceID = 'inventory';
									eventContext.application.addResource(set);
									//Loc-In: 
									// show emptySearchResult message for count result is 0
									/* if(set.data.length == 1) {
										eventContext.ui.show("IssuesReturns.AdditionalItemsDetailsView");
									}else{
										eventContext.ui.show("IssuesReturns.AdditionalItemsListView");
									} */
									if(set.data.length == 1) {
										eventContext.ui.show("IssuesReturns.AdditionalItemsDetailsView");
									} else if (set.data.length > 1){ 
										eventContext.ui.show("IssuesReturns.AdditionalItemsListView");
									} else {
										var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
										self.ui.showMessage(msg);
									}
									//Loc-Out
									
									//clear model data service
									ModelService.clearSearchResult(set);
								});
								
								//clear model data service
								ModelService.clearSearchResult(invbalanceSet);
								
							}).otherwise(function(error){
								Logger.trace(self._className + ": " + error);
							});
						}
						//#endregion Loc-Out: Add partNo and change logic partno searching on inventory, partno is modelnumref of invite
						
					}).otherwise(function(error){
						Logger.trace(self._className + ": " + error);
					});			
					
				}else{
					self.ui.showMessage(MessageService.createStaticMessage('connectionFailure').getMessage());
				}
				eventContext.application.hideBusy();
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});	
		},
		
		/**
		 * When data on work field from Issue Additional Details view is changed, 
		 * this method is called to filter the tasks that will be used on task lookup
		 */
		additionalItemWODataChanged: function(eventContext){
			var filter = [];
			var oslcQueryParameters = {};
			var self = this;
			
			this.clearBaseFieldsFromWO(eventContext);
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			var wonum = issueAdditionItemRecord.get('wonum');
			var siteid = UserManager.getInfo("defsite");
			var msg = MessageService.createStaticMessage("noworkorderfound").getMessage();
			issueAdditionItemRecord.set("taskid", null);
			
			filter.push({siteid: siteid});
			filter.push({wonum: wonum});
			if(wonum){
				//#region  Loc-In: prevent handleLocationDataChanged excute to hanle for GLaccount
				//if (isLocationDataChanged) return; 						
				isWODataChanged = true;
				//#endregion Loc-Out: prevent handleLocationDataChanged excute to hanle for GLaccount
				issueAdditionItemRecord.getRuntimeFieldMetadata('taskid').set('readonly', false);
				eventContext.application.showBusy();
				var workOrderPromise =  ModelService.filtered('workOrder', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
				workOrderPromise.then(function(workOrderSet){
					workOrderSet.resourceID = 'workOrder';
					eventContext.application.addResource(workOrderSet);
					var wo = workOrderSet.getCurrentRecord();
					
					var domainwostatus = CommonHandler._getAdditionalResource(eventContext,"domainwostatus");
					var currentStatus = SynonymDomain.resolveToInternal(domainwostatus,wo.get('status'));
					
					//verify if the wo status is valid, that is, WO status must be different from CANCELED, CLOSE or WAPPR
					if(currentStatus){
						switch(currentStatus){
							case "CAN":
							case "CLOSE":
							case "WAPPR":
								msg = MessageService.createResolvedMessage('wostatusvalid', [wonum]);
								self.ui.showMessage(msg);
								return;
						}
					}
					else{
						msg = MessageService.createResolvedMessage('wostatusvalid', [wonum]);
						self.ui.showMessage(msg);
						return;
					}
			
					issueAdditionItemRecord.set('glaccount',wo.glaccount);
					issueAdditionItemRecord.set('location', wo.location);
					issueAdditionItemRecord.set('asset', 	wo.asset);
					
					//#region  Loc-In: restore handleLocationDataChanged event			
					isWODataChanged = false;
					//#endregion Loc-Out: restore handleLocationDataChanged event

					//clear model data service
					ModelService.clearSearchResult(workOrderSet);
					
				}).otherwise(function(error){
					//#region  Loc-In: restore handleLocationDataChanged event			
					isWODataChanged = false;
					//#endregion Loc-Out: restore handleLocationDataChanged event
					Logger.trace(self._className + ": " + error);
					self.ui.showMessage(msg);
					return;
				});				
			}
			else{
				issueAdditionItemRecord.getRuntimeFieldMetadata('taskid').set('readonly', true);
			}
			
			eventContext.application.hideBusy();
		},

		//#region Loc-In: init Additional Usage
		initializeAdditionalUsage: function(eventContext) {
			var additionalUsage = eventContext.getResource().getCurrentRecord();
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			additionalUsage.setDateValue('createdate', this.application.getCurrentDateTime());
			additionalUsage.set('storeroom', issuesReturns.storeroom);
		},

		initializeAdditionalItems: function(eventContext) {
			var additionalDetailItem = eventContext.getResource().getCurrentRecord();
			additionalDetailItem.setDateValue('actualdate', this.application.getCurrentDateTime());
		},

		initializeAdditionalDetailView: function(eventContext){
			this.getInvbalTemList(eventContext);
		},
		
		clearAdditionalUsage : function(eventContext){
			var issueAdditionUsageRecord = eventContext.application.getResource('issueAdditionalUsage').getCurrentRecord();
			issueAdditionUsageRecord.formnumber = "";
			issueAdditionUsageRecord.description = "";			
			issueAdditionUsageRecord.documentref = "";
			issueAdditionUsageRecord.createdate	= null;
			
		},

		clearAdditionalItems : function(eventContext){
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			issueAdditionItemRecord.issueTo 	= "";
			issueAdditionItemRecord.wonum 		= "";			
			issueAdditionItemRecord.issueQty	= "";
			issueAdditionItemRecord.actualdate  = null;
			issueAdditionItemRecord.frombin  = "";
		},

		/**
		 * Dynamic fetch for the bin lookup view
		 */
		fromBinLookup: function(eventContext){
			this.getInvbalTemList(eventContext).then(function(invbalSet){
				/* if (invbalSet.data.length > 0){

				} */
				eventContext.ui.show("IssuesReturns.FromBinListView");
			});
		},

		getInvbalTemList: function(eventContext){
			var filter = [];
			
			var issueResource = CommonHandler._getAdditionalResource(eventContext,'issueAdditionalItems').getCurrentRecord();
			issueResource.frombin = "";

			var inventory = CommonHandler._getAdditionalResource(eventContext,'inventory').getCurrentRecord();
			var siteid = inventory.get('siteid');
			var storeroom = inventory.get('location');
			var itemnum = inventory.get('itemnum');
			
			filter.push({siteid: siteid});
			filter.push({location: storeroom});
			filter.push({itemnum: itemnum});
			//filter.push({stagingbin: 0});

			var deferred = new Deferred();
			var invbalPromise =  ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, null, false);
			invbalPromise.then(function(invbalSet){
				
				ModelService.clearSearchResult(invbalSet);
				invbalSet.resourceID = 'invbalTemp';
				eventContext.application.addResource(invbalSet);

				deferred.resolve(invbalSet);
			});
			
			return deferred.promise;
		},

		hideLotnum: function(eventontext) {			
			var  additionalInventory = eventContext.application.getResource("inventory").getCurrentRecord();
			if (additionalInventory ) {
				if ( additionalInventory.lotnum) {
					eventContext.setDisplay(true);					
				}
				else {
					eventContext.setDisplay(false);
				}
					
			}
			
		},
		
		
		selectToBinLot: function(eventContext) {
			var  invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();
			var issueResource = CommonHandler._getAdditionalResource(eventContext,'issueAdditionalItems').getCurrentRecord();

			// if an empty binnum is set on maximo it won't come down from oslc
			// but if we found it to be a valid invbal set the binnum to empty string
			if (!invbalTemp.binnum && invbalTemp.invbalancesid) {
				invbalTemp.binnum = "";
			}
			
			// if an empty binnum is set on maximo it won't come down from oslc
			// but if we found it to be a valid invbal set the binnum to empty string
			if (!invbalTemp.binnum && invbalTemp.invbalancesid) {
				invbalTemp.binnum = "";
			}
			
			issueResource.set('tobin', invbalTemp.binnum);
			issueResource.set('tolot', invbalTemp.lotnum);
			
		    eventContext.ui.returnToView('IssuesReturns.AdditionalItemsDetailsView');
			
		},
		
		
		selectFromBinLot: function(eventContext) {
			var  invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();
			var issueResource = CommonHandler._getAdditionalResource(eventContext,'issueAdditionalItems').getCurrentRecord();
			
			issueResource.set('frombin', invbalTemp.binnum);
			issueResource.set('frombincurbal', invbalTemp.curbal);
			issueResource.set('fromlot', invbalTemp.lotnum);
			
			//eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			eventContext.ui.returnToView('IssuesReturns.AdditionalItemsDetailsView');
			
		},

		setFromLotCurbal: function (eventContext) {
            var self = this;
            var issueResource = CommonHandler._getAdditionalResource(
                eventContext,
                "issueAdditionalItems"
            ).getCurrentRecord();
            // if (!issueResource.frombin) return;
            // customize
            var invbalTempResource = eventContext.application.getResource("invbalTemp");
            if (invbalTempResource) {
                console.log("Current record: ", invbalTempResource.getCurrentRecord());
                // var invbalTempSet = invbalTempResource.find("binnum == $1", issueResource.frombin);
                var invbalRecord = invbalTempResource.getCurrentRecord();
                // if (invbalTempSet.length > 0) {
                if (invbalRecord) {
                    // var invbalTempRecord = invbalTempSet.getRecortAt(0);
                    // issueResource.set("frombincurbal", invbalTempRecord.curbal);
                    // issueResource.set("fromlot", invbalTempRecord.lotnum);
                    issueResource.set("frombincurbal", invbalRecord.curbal);
                    issueResource.set("fromlot", invbalRecord.lotnum);
                    console.log("fromlot: ", invbalRecord.lotnum);
                } else {
                    console.log("set bin 2");
                    issueResource.setNullValue("frombin");
                    issueResource.setNullValue("frombincurbal");
                    issueResource.setNullValue("fromlot");
                    self.ui.showMessage(
                        MessageService.createStaticMessage("invalidBin").getMessage()
                    );
                }
            } else {
                console.log("set bin else");
                issueResource.setNullValue("frombincurbal");
                issueResource.setNullValue("fromlot");
            }
        },
		
		/**
		 * Cancel button for Rotating Asset Select View
		 */
		cancelBinLotSelection : function(eventContext){
			//console.log("CANCEL rotating asset selection");
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Clear button for Rotating Asset Select View
		 */
		clearFromBinLotSelection : function(eventContext){			
			//console.log("CLEAR rotating asset selection");			
			var issueAdditionalItems = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			
			issueAdditionalItems.set('frombin','');
			issueAdditionalItems.set('frombincurbal', 0);
			issueAdditionalItems.set('fromlot','');
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		
		/**
		 * Clear button for Rotating Asset Select View
		 */
		clearToBinLotSelection : function(eventContext){			
			//console.log("CLEAR rotating asset selection");			
			var issueAdditionalItems = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			
			issueAdditionalItems.set('tobin','');
			issueAdditionalItems.set('tolot','');
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},

		/**
		 * Transits Back to Search view of Additional Item
		 * transits to Issue Additional Item Search view
		 */
		 transitsBackToView : function (eventContext) {
			//eventContext.application['application.handlers.IssuesAvailableItemsHandler'].clearUnreservedSearchFields(eventContext);
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},

		clearReferFields: function(eventContext, wo, location, glaccount){
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			if(wo){
				issueAdditionItemRecord.setNullValue('location');
				issueAdditionItemRecord.setNullValue('glaccount');
			} else if (location) {
				issueAdditionItemRecord.setNullValue('wonum');
				issueAdditionItemRecord.set("taskid", null);
				issueAdditionItemRecord.getRuntimeFieldMetadata('taskid').set('readonly', true);
				issueAdditionItemRecord.setNullValue('glaccount');
			} else if (glaccount) {
				issueAdditionItemRecord.setNullValue('wonum');
				issueAdditionItemRecord.set("taskid", null);
				issueAdditionItemRecord.getRuntimeFieldMetadata('taskid').set('readonly', true);
				issueAdditionItemRecord.setNullValue('location');
			}
		},

		handleLocationDataChanged: function(eventContext){
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			var location = issueAdditionItemRecord.get('location');
			if (isWODataChanged || !location) return;
			var filter = [];
			var oslcQueryParameters = {};
			var self = this;
		
			isLocationDataChanged = true;
			self.clearReferFields(eventContext, false, true, false);
			var siteid = UserManager.getInfo("defsite");
			var msg = MessageService.createStaticMessage("noLocationfound").getMessage();

			eventContext.application.showBusy();
			ModelService.filtered('additionallocations', null, [{location: location, siteid: siteid}], null, false, true).then(function(locationSet){
				
				/* locationSet.resourceID = 'additionallocations';
				eventContext.application.addResource(locationSet); */
				
				if(locationSet.count() > 0){
					var location = locationSet.getCurrentRecord();
					issueAdditionItemRecord.set('glaccount',location.glaccount);
				} else {
					self.ui.showMessage(msg);
					return;
				}
				//#region  Loc-In: restore handleGLaccountDataChanged event			
				isLocationDataChanged = false;
				//#endregion Loc-Out: restore handleGLaccountDataChanged event
			}).otherwise(function(error){
				//#region  Loc-In: restore handleGLaccountDataChanged event			
				isLocationDataChanged = false;
				//#endregion Loc-Out: restore handleGLaccountDataChanged event
				Logger.trace(self._className + ": " + error);
				self.ui.showMessage(msg);
				return;
			});	
			eventContext.application.hideBusy();
		},
		handleGLaccountDataChanged: function(eventContext){
			var issueAdditionItemRecord = eventContext.application.getResource('issueAdditionalItems').getCurrentRecord();
			var glaccount = issueAdditionItemRecord.get('glaccount'); 
			if (isWODataChanged || isLocationDataChanged || !glaccount) {
				return;
			}
			this.clearReferFields(eventContext, false, false, true);
		},
		//#endregion Loc-In: init Additional Usage
	});
});
