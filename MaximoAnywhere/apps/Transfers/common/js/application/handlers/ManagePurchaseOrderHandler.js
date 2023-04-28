/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2015,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

/**
 * Module manages receipts for external purchase orders in application.
 * @module application/handlers/ManagePurchaseOrderHandler
 * @augments dojo._base.declare
 * @augments dojo._base.array
 * @augments dojo._base.lang
 * @augments dojo.Deferred
 * @augments dojo.promise.all
 * @augments dojo.topic
 * @augments dojo.number
 * @augments platform.handlers._ApplicationHandlerBase
 * @augments platform.comm.CommunicationManager
 * @augments platform.model.PushingCoordinatorService
 * @augments platform.translation.SynonymDomain
 * @augments platform.exception.PlatformRuntimeException
 * @augments platform.warning.PlatformRuntimeWarning
 * @augments platform.auth.UserManager
 * @augments platform.util.PlatformConstants
 * @augments platform.util.AsyncAwareMixin
 * @augments platform.logging.Logger
 * @augments platform.store.PersistenceManager
 * @augments platform.store._StoreProvider
 * @augments platform.store._ResourceMetadataContext
 * @augments application.business.AppConfig
 * @augments application.business.InvuseObject
 * @augments application.handlers.CommonHandler
 * @augments application.business.FieldUtil
 * @augments application.handlers.TransfersHandler
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html|base Declare Documentation}
 * @see {@link http://dojotoolkit.org/reference-guide/1.10/dojo/_base/array.html|base Array Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/_base/lang.html|base Lang Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/Deferred.html|Deferred Documentation}
 * @see {@link http://dojotoolkit.org/reference-guide/1.10/dojo/promise/all.html|Promise all Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/topic.html|Topic Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/number.html|Number Documentation}
 * @see {@link module:application/handlers/TransfersHandler}
 * 
 */
define("application/handlers/ManagePurchaseOrderHandler", 
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
	     "application/business/FieldUtil",
	     "platform/exception/PlatformRuntimeException",
	     "platform/warning/PlatformRuntimeWarning",
	     "platform/auth/UserManager",
	     "platform/util/PlatformConstants",
	     "platform/util/AsyncAwareMixin",
	     "platform/logging/Logger",
	     "platform/store/PersistenceManager",
	     "platform/store/_StoreProvider",
	     "platform/store/_ResourceMetadataContext",
	     "dojo/Deferred",
	     "dojo/promise/all",
	     "dojo/topic",
	     "application/business/AppConfig",
	     "dojo/number",
	     "application/handlers/TransfersHandler",],
function(declare, arrayUtil, lang, ApplicationHandlerBase, CommunicationManager, PushingCoordinatorService, 
		SynonymDomain, InvuseObject, ModelService, MessageService, CommonHandler, FieldUtil, 
		PlatformRuntimeException, PlatformRuntimeWarning, UserManager, PlatformConstants, AsyncAwareMixin, 
		Logger,PersistenceManager, StoreProvider, ResourceMetaData, Deferred, all, topic, 
		AppConfig, NumberUtil, TransfersHandler) {
	
	
		return declare( [ApplicationHandlerBase, AsyncAwareMixin],
				/** 
				 * @lends platform.handlers._ApplicationHandlerBase#
				 * @lends platform.util.AsyncAwareMixin#
				 */
		{
		
		/**
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
	     * @property {String} _className Name of this module
	     * @private
	     */
		_className: "[application.handlers.ManagePurchaseOrderHandler]",
		
		
		/**
		 * Check if any errors exist, then search items already 
		 * received from purchase orders (External)
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 * @throws {PlatformRuntimeException} If error is found.
		 */
		searchReceivedPurchaseOrdersandCheckForErrors :  function (eventContext) {
			if (this.getPOExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			if (this.getPOListComplexExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			this.searchReceivedPurchaseOrders(eventContext);			
		},
		
		/**
		 * Search items already received from purchase orders (External)
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 * @throws {PlatformRuntimeException} If error is found.
		 */
		searchReceivedPurchaseOrders :  function (eventContext) {
			
			var filter = [];
			var oslcQueryParameters = {};
			var externalPoLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			
			var siteid = UserManager.getInfo("defsite");
			var ponum = externalPoLocalResource.ponum;
			//#region Loc-In: add formNo
			var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var formno = externalPoLocalResource.formno;
			//#endregion Loc-Out: add formNo
			//var vendor = externalPoLocalResource.vendor;

			var self = this;
			
			//verify if we have at least one field filled
			//if(!ponum && !vendor){
			//#region Loc-In: add formNo
			//if (!ponum) {
			if (!ponum && !formno) {
			//#endregion Loc-Out: add formNo
				var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			
			var transfersHand = new TransfersHandler();
			
			//check for errors
			if (transfersHand.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				eventContext.application.showBusy();
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){

						//#region Loc-In: add formNo
						//oslcQueryParameters['sqp:poNum'] =  ponum;
						if (ponum) {
							oslcQueryParameters['sqp:poNum'] =  ponum;
						}
						if (formno) {
							filter.push({formno: formno});
						}

						var issuetype = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'RECEIPT');
						filter.push({issuetype: issuetype});
						
						//#endregion Loc-Out: add formNo
						oslcQueryParameters['sqp:siteid'] =  siteid;
						
						var matrectransPromise =  ModelService.filtered('poListComplexMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matrectransPromise.then(function(matrectransSet){
							
							//verify if search result data is empty
							if(matrectransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							//#region Loc-In: filter list by condition [issuetype='RECEIPT' and not exists (select 1 from matrectrans matsub where receiptref=matrectrans.matrectransid) ]
							/* ModelService.clearSearchResult(matrectransSet);
							matrectransSet.resourceID = 'poListComplexMatrectrans';
							matrectransSet.sort('itemnum');
							eventContext.application.addResource(matrectransSet);
							eventContext.ui.show("Transfers.POMaterialReceiptsListView"); */
							
							else {
								filter = [];

								arrayUtil.forEach(matrectransSet.data, function(matrectrans){
									filter.push({receiptref : matrectrans.matrectransid});
								});
								
								ModelService.filtered('poListComplexMatrectrans', null, filter, 1000, true, true, oslcQueryParameters, false).then(function(refSet) {
									var deleteIndexs = [];
									if (refSet.data.length > 0) {
										for (let index = 0; index < matrectransSet.count(); index++) {
											arrayUtil.forEach(refSet.data, function(set){
												var currentRecord = matrectransSet.getRecordAt(index);
													if (currentRecord.matrectransid == set.receiptref) {
														deleteIndexs.push(index);
														return;
													}
											});
										}
									}

									for (let index = deleteIndexs.length - 1 ; index >= 0; index--) {
										matrectransSet.getRecordAt(index).deleteLocal();
									}

									ModelService.clearSearchResult(matrectransSet);
									matrectransSet.resourceID = 'poListComplexMatrectrans';
									matrectransSet.sort('itemnum');
									eventContext.application.addResource(matrectransSet);
									eventContext.ui.show("Transfers.POMaterialReceiptsListView");
									
								}).otherwise(function(error){
									Logger.trace(self._className + ": " + error);
								});	
							}
							//#endregion Loc-Out: filter list by condition [issuetype='RECEIPT' and not exists (select 1 from matrectrans matsub where receiptref=matrectrans.matrectransid) ]
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});
					}).otherwise(function(error){
						Logger.trace(self._className + ": " + error);
					});			
					
				}else{
					self.ui.showMessage(MessageService.createStaticMessage('connectionFailure').getMessage());
				}
				eventContext.application.hideBusy();
			});	
		},
		
		/**
		 * Select PO from Vendor Purchase Order List View
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object}	eventContext - Brings context into function
		 * @return	{}			Display  purchase order items to be received
		 * @public
		 */
/**@memberOf application.handlers.ManagePurchaseOrderHandler */
		searchVendorPO : function(eventContext){
			var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
			var currentPORecord = eventContext.getCurrentRecord();
			var ponum = currentPORecord.get("ponum");
			var vendor = currentPORecord.get("vendor");
			poExternalResource.set('ponum', ponum);
			poExternalResource.set('reset_vendor_on_back', vendor);
			poExternalResource.setNullValue('vendor');
			this.searchPurchaseOrders(eventContext);
		},
		
		/**
		 * Transits Back to Multi Purchase Order List view
		 *
		 */
		transitsBackToMultiPOListView : function (eventContext) {
			var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
			var reset_vendor_on_back = poExternalResource.get("reset_vendor_on_back");
			poExternalResource.setNullValue('ponum');
			poExternalResource.set('vendor', reset_vendor_on_back);
			poExternalResource.setNullValue('reset_vendor_on_back');
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Search from Purchase Order Search View
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object}	eventContext - Brings context into function
		 * @param	{Object}	purchaseOrderResource - Purchase Order resource reference
		 * @return	{}			Process list of purchase orders available for receipt
		 * @public
		 */
		searchPurchaseOrders: function(eventContext, purchaseOrderResource){

			//show loading
			eventContext.application.showBusy();
			
			this.setCurrentProcess(eventContext, 'receipt');
			
			//fetch reference to api to check if error's exist
			 var handler = eventContext.application['application.handlers.ReceiveShipmentHandler'];
			if (handler.getMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
			var ponum = poExternalResource.get('ponum');
			var vendor = poExternalResource.get('vendor');
			//#region Loc-In: Add FormNo field
			var formno = poExternalResource.get('formno');
			//#endregion Loc-Out: Add FormNo field
			var filter = [];
			var self = this;
			
			var domaininvusereceipts = CommonHandler._getAdditionalResource(eventContext,'domaininvusereceipts');
			domaininvusereceipts.clearFilterAndSort();
			var completeStatus = SynonymDomain.resolveToExternal(domaininvusereceipts, 'COMPLETE');
			var domainpostatus = CommonHandler._getAdditionalResource(eventContext,'domainpostatus');
			
			if(ponum){
				filter = [{'internal':false, 'ponum':ponum}];
			}
			if(vendor){
				purchaseOrderResource = 'vendorPOResource';
				filter = [{'internal':false, 'vendor':'%'+vendor+'%'}];				
			}
			//#region Loc-In: Add FormNo field
			if(formno){
				filter = [{'internal':false, 'formno':'%'+formno+'%'}];
			}	
			//#endregion Loc-Out: Add FormNo field
			
			if(!purchaseOrderResource){
				purchaseOrderResource = 'poResource';
			}
			
			this._searchPurchaseOrders(eventContext,filter, purchaseOrderResource).then(function(poSet){
				//#region Loc-In: Add FormNo field
				//if(ponum){
				if(ponum || formno){
				//#endregion Loc-Out: Add FormNo field
					if(poSet.count()>0){
						//po exists and its external
						
						var totalRecordCount = poSet.count()

						//check if PO receipts is COMPLETED, the PO could be in a different status, but receipts will be COMPLETED
						poSet.filter('$1[receipts]', completeStatus);
						
						if(poSet.count() >= totalRecordCount){
							var msg = MessageService.createStaticMessage("poReceived").getMessage();
							self.ui.showMessage(msg);
							return;
						}
					} else {
						//purchase order not found
						var msg = MessageService.createStaticMessage("invalidPO").getMessage();
						self.ui.showMessage(msg);
						return;
					}
					poSet.clearFilterAndSort();
				}
				
				domainpostatus.clearFilterAndSort();
				var apprPOStatus = SynonymDomain.resolveToExternal(domainpostatus, 'APPR');
				
				domainpostatus.clearFilterAndSort();
				var inprgPOStatus = SynonymDomain.resolveToExternal(domainpostatus, 'INPRG');
								
				//only show none COMPLETE Purchase Orders
				poSet.filter('!$1[receipts]', completeStatus);
				
				//only show PO's in APPR or INPRG
				poSet.filter('$1[status] || $2[status]', apprPOStatus, inprgPOStatus);
				
				if(poSet.count()>1){
					eventContext.application.hideBusy();
					eventContext.ui.show("Transfers.MultiPOListView");
				}else if (poSet.count() == 1) {
					//transition to single PO INFO
					var canReceive = true;
					
					var poRec = poSet.getCurrentRecord();
					var status = poRec.get('status');
					domainpostatus.clearFilterAndSort();
					var currentPOStatus = SynonymDomain.resolveToInternal(domainpostatus,status);
					
					if (!canReceive || currentPOStatus == 'HOLD' || currentPOStatus == 'REVISE' || currentPOStatus == 'PNDREV')
					{
						throw new PlatformRuntimeWarning('NotAPPROrINPRG');
					}	
					
					ModelService.empty("receiptInput").then(function(receiptInputSet){
						poSet.data[0].getModelDataSet("poline",true).then(function(polineSet){
							var deferreds = [];
							var count = 0;
							arrayUtil.forEach(polineSet.data, function(poline){
								
								//skip if linetype of service or material
								var polinetype = poline.get('linetype');
								var additionalLineType = CommonHandler._getAdditionalResource(eventContext,'additionalLineType');
								var linetype = SynonymDomain.resolveToInternal(additionalLineType,polinetype);
								if((linetype == 'SERVICE') || (linetype == 'MATERIAL')){
									return;
								}
								
								//skip if receiptscomplete is true
								var receiptscomplete = poline.get('receiptscomplete');
								if (receiptscomplete==true){
									return;
								}

					            var ponum = poRec.get('ponum');
					            var siteid = poRec.get('siteid');								
								//#region Loc-In: Add FormNo field
								//var oslcQueryParameters = {'sqp:poNum':ponum, 'sqp:siteid':siteid};
								//#endregion Loc-Out: Add FormNo field
								
								var deferred = new Deferred();
								deferreds.push(deferred);

								filter = [];
								//#region Loc-In: Add FormNo field
								//filter.push({ponum: ponum});
								var oslcQueryParameters = {};
								oslcQueryParameters['sqp:siteid'] =  siteid;

								if (ponum){
									filter.push({ponum: ponum});
									oslcQueryParameters['sqp:poNum'] =  ponum;
								}

								var formno = poRec.get('formno');
								if (formno){
									filter.push({formno: formno});
									//oslcQueryParameters.push({'sqp:formno':formno})
								}
								//#endregion Loc-Out: Add FormNo field
								var matrectransPromise =  ModelService.filtered('poListComplexMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
								matrectransPromise.then(function(matrectransSet){										
										var orderQty = poline.get('orderqty');
										if(orderQty){
											var poLineConversion = 0;
											var conversion = poline.get('conversion');
											if(conversion){
												poLineConversion = conversion;
											}
											if(poLineConversion == 0){
												poLineConversion = 1;
											}
											
											// Loop through all of the receipts to calculate the quantity
											var qtySum = 0;
											var matrectransQuantityDue = 0;
											var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
											
											arrayUtil.forEach(matrectransSet.data, function(matrectrans){
												if(matrectrans.polinenum == poline.polinenum){	
													var inspectionRequired = poline.inspectionrequired;
													var itemnum = poline.itemnum;
													var rotating = poline.rotating;
													var issue = matrectrans.issue;
													var issueType = matrectrans.issuetype;
													var internalIssueType = SynonymDomain.resolveToInternal(domainIssueTypes, issueType);
													
													//TODO Do we need to do this? Direct Issue?
//													if (itemnum && inspectionRequired == false && rotating == false && internalIssueType!='TRANSFER'){
//														if(issue == true && internalIssueType=='RECEIPT'){
//														//	var conversion = 
//														} else {
//															qtySum += matrectrans.get('receiptquantity');
//														}
//													}
												
													if (internalIssueType != 'TRANSFER'){
														qtySum += matrectrans.get('receiptquantity');	
													}

												};													
											});
											
											if(!poline.receivedqty){
												poline.receivedqty = 0;
											}
											
											//matrectransQuantityDue =  poline.qtytoreceive - qtySum;
											matrectransQuantityDue =  poline.orderqty - qtySum; /*poline.receivedqty*/
											if(matrectransQuantityDue > 0){
												var newReceiptInputRecord = receiptInputSet.createNewRecord();
														
												newReceiptInputRecord.set('mrnum',poline.mrnum);
												newReceiptInputRecord.set('ponum',poRec.ponum);
												newReceiptInputRecord.set('polinenum',poline.polinenum);
												newReceiptInputRecord.set('linetype',poline.linetype);
												newReceiptInputRecord.set('orderqty',poline.orderqty);
												newReceiptInputRecord.set('linecost',poline.linecost);
												newReceiptInputRecord.set('receivedqty',poline.receivedqty);
												newReceiptInputRecord.set('location',poline.storeloc);
												newReceiptInputRecord.set('wonum',poline.wonum);
												newReceiptInputRecord.set('inspectionrequired',poline.inspectionrequired);
												newReceiptInputRecord.set('remark',poline.remark);
												newReceiptInputRecord.set('gldebitacct',poline.gldebitacct);
												
												newReceiptInputRecord.set('qtyrequested', poline.orderqty /*poline.get('orderqty') - qtySum*/);
												newReceiptInputRecord.set('currencyamtrcved',poline.receivedtotalcost);
											
												newReceiptInputRecord.set('issue',poline.issue);
												newReceiptInputRecord.set('itemnum',poline.itemnum);
												newReceiptInputRecord.set('itemdesc',poline.description);
												newReceiptInputRecord.set('itemsetid',poline.itemsetid);
												newReceiptInputRecord.set('conditioncode',poline.conditioncode);
												newReceiptInputRecord.set('description',poline.description);
												newReceiptInputRecord.set('receivedunit',poline.orderunit);
												newReceiptInputRecord.set('quantitydue',matrectransQuantityDue);
												//newReceiptInputRecord.set('invoicenum',getInvoiceMgtMaxVar(dummyReceipt.getString("orgid"))); //TODO getInvoiceMgtMaxVar(dummyReceipt.getString("orgid"))
												//	return (getMboServer().getMaxVar().getBoolean("INVOICEMGT", orgID));
												newReceiptInputRecord.set('asn',false);
												newReceiptInputRecord.set('quantityAvailableToReceive',matrectransQuantityDue);
												
												newReceiptInputRecord.set('siteid',poRec.siteid);
												newReceiptInputRecord.set('positeid',poRec.siteid);
												newReceiptInputRecord.set('orgid',poRec.orgid);
												newReceiptInputRecord.set('unitcost',poline.unitcost);
												//#region Loc-In: set default actualdate
												newReceiptInputRecord.setDateValue('actualdate', eventContext.application.getCurrentDateTime());
												newReceiptInputRecord.set('tostoreloc', poline.storeloc);
												//#endregion Loc-Out: set default actualdate
											
												if(linetype != 'SERVICE'){
													if(poline.storeloc){
														if(poline.binnnum){
															newReceiptInputRecord.set('tobin',poline.binnum);
														}
													}
												}
												
												count++;	
											}
											
											deferred.resolve();
												
										} //orderQty	
									});
								});//polineset array
								
								//process when all polines have been processed and promises resolved
								all(deferreds).then(function(){
									eventContext.application.hideBusy();
									if(count > 0){
										//ModelService.clearSearchResult(matrectransSet);
										receiptInputSet.resourceID = "receiptInput";
										receiptInputSet.sort('itemnum');
										eventContext.application.addResource(receiptInputSet);
										eventContext.ui.show("Transfers.ShipmentItemsListView");
									}
									//verify if the purchase order is on complete status
									else if(SynonymDomain.resolveToInternal(domaininvusereceipts,poSet.data[0].receipts) == 'COMPLETE'){
										var msg = MessageService.createStaticMessage("poReceived").getMessage();
										self.ui.showMessage(msg);
									}
									else{
										var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
										self.ui.showMessage(msg);
									}
								});	//all								
						});					
					});
				} else {
					//no purchase order records found
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
				}
			});
		},
		
		
		/**
		 * Common API to search Purchase Order Resource
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object}	eventContext - Brings context into function
		 * @param	{Object}	purchaseOrderResource - Assign resource to receive set
		 * @return	{}			Process list of purchase orders available for receipt
		 * @private
		 */
		_searchPurchaseOrders : function(eventContext, filter, purchaseOrderResource){
			var deferred = new Deferred();
			if(!purchaseOrderResource){
				purchaseOrderResource = 'poResource';
			}
			var poPromise =  ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, null, false);
			poPromise.then(function(poSet){
				poSet.sort('orderdate asc');
				poSet.resourceID = purchaseOrderResource;
				eventContext.application.addResource(poSet);
				deferred.resolve(poSet);
			});
			return deferred.promise;
		},
		
		/**
		 * Clear search fields for poExternal resource
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		clearSearchFields : function(eventContext) {
			var poExternalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			poExternalResource.setNullValue('ponum');
			poExternalResource.setNullValue('vendor');
			poExternalResource.setNullValue('reset_vendor_on_back');

			//#region Loc-In: clear value field
			poExternalResource.setNullValue('formno');
			//#endregion Loc-Out: clear value field
		},
		
		/**
		 * Clear search fields for poExternal resource and hide view
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		clearSearchFieldsAndBack : function(eventContext) {
			var handler = eventContext.application['application.handlers.ManagePurchaseOrderHandler'];
			handler.clearSearchFields(eventContext);
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Dynamic fetch for the Purchase Order lookup view
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} 	eventContext - Brings context into function
		 * @return	{}			Process list of purchase orders for lookup
		 * @public
		 */
		purchaseOrderLookup : function(eventContext){
			eventContext.application.showBusy();
			var self = this;
			var filter = [{'internal':false}];
			var domaininvusereceipts = CommonHandler._getAdditionalResource(eventContext,'domaininvusereceipts');
			var domainpostatus = CommonHandler._getAdditionalResource(eventContext,'domainpostatus');
						
			domaininvusereceipts.clearFilterAndSort();
			var noneStatus = SynonymDomain.resolveToExternal(domaininvusereceipts, 'NONE');
			
			domaininvusereceipts.clearFilterAndSort();
			var partialStatus = SynonymDomain.resolveToExternal(domaininvusereceipts, 'PARTIAL');
			
			domainpostatus.clearFilterAndSort();
			var poAPPRStatus = SynonymDomain.resolveToExternal(domainpostatus, 'APPR');

			//make the filter based on history:
			// "Transfers.ReceivePurchaseOrderItemsSeachView" - do not show COMPLETE shipments
			if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-1].id == "Transfers.ReceivePurchaseOrderItemsSeachView"){					
				filter.push({'receipts' : Object.keys(noneStatus)[0]});
				filter.push({'receipts' : Object.keys(partialStatus)[0]});
				for( i = 0; i < Object.keys(poAPPRStatus).length; i++){
					filter.push({'status' : Object.keys(poAPPRStatus)[i]});	
				}
			}

			if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-1].id == "Transfers.ManageReceivedPurchaseOrderSeachView"){
				for( i = 0; i < Object.keys(poAPPRStatus).length; i++){
					filter.push({'status' : Object.keys(poAPPRStatus)[i]});	
				}
			}

			var poPromise =  ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, null, false);
			poPromise.then(function(poSet){
				poSet.sort('orderdate asc');
				poSet.resourceID = 'poResource';
				eventContext.application.addResource(poSet);
			
				eventContext.application.hideBusy();
				
				//verify if search result data is empty
				if(poSet.data.length == 0){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
				}
				else{
					eventContext.ui.show("Transfers.POListView");
				}
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
		},
		
		/**
         * Transits to error page
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        showErrorPage : function(eventContext){
        	eventContext.ui.show("Transfers.ReceivingErrorDetailPage");
        },

		/**
         * Transits to External PO Matrectrans (poComplexMatrectrans)error page
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        showPOExtErrorPage : function(eventContext){
        	eventContext.ui.show("Transfers.matrectrans_ReceivingExtPOErrorDetailPage");
        },
		
		/**
         * Transits to External PO Matrectrans (poListComplexMatrectrans) error page 
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        showPOListComplexExtErrorPage : function(eventContext){
        	eventContext.ui.show("Transfers.matrectrans_ReceivingPOListComplexErrorDetailPage");
        },
        
        /**
         * Show or Hide Purchase Order Label on Error Page
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        showPOErrorLabel : function(eventContext){
        	var ponum = eventContext.getCurrentRecord().get('ponum');
        	if(ponum){
        		 eventContext.setDisplay(true);
        	} else {
        		 eventContext.setDisplay(false);
        	}
        },
        
		/**
         * This method hides/shows link if errors exist in receivedmatrectrans
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        hideShowErrorLink : function(eventContext){
            var self = this;
            var handler = eventContext.application['application.handlers.ReceiveShipmentHandler'];
            
            if (self.errorWatch) {
                  self.errorWatch.remove();
            }
            
            self.errorWatch = topic.subscribe(PlatformConstants.DATA_REFRESH_TOPIC + '/receivedMatrectrans',function(fireEvent){
            handler.errorCheck(eventContext).then(function(errorSet){
	            eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                  
	              if (errorSet.count()>0){
	                     handler.setMatRecError(eventContext, true);
	                     eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                     errorSet.resourceID = 'receivedMatrectrans';
	                     eventContext.application.addResource(errorSet);
	                     eventContext.setDisplay(true);
	                     
	              } else {
	                     handler.setMatRecError(eventContext, false);
	                     eventContext.setDisplay(false);   
	              }
	
	              return;
	            });
            });            
  
            //if topic already processesed, check if error exists
            if (handler.getMatRecError(eventContext)){
                  eventContext.setLabel( MessageService.createResolvedMessage('errorExists'));
                  eventContext.setDisplay(true);
            } else {
                  eventContext.setDisplay(false);
            }
        },

		/**
         * This method hides/shows link if errors exist in poComplexMatrectrans
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        hideShowPOExtErrorLink : function(eventContext){
            var self = this;
            var handler = eventContext.application['application.handlers.ManagePurchaseOrderHandler'];
            
            if (self.errorWatch2) {
                  self.errorWatch2.remove();
            }
            
            self.errorWatch2 = topic.subscribe(PlatformConstants.DATA_REFRESH_TOPIC + '/poComplexMatrectrans',function(fireEvent){
            handler.errorCheckPOExtReturn(eventContext).then(function(errorSet){
	            eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                  
	              if (errorSet.count()>0){
	                     handler.setPOExtMatRecError(eventContext, true);
	                     eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                     errorSet.resourceID = 'poComplexMatrectrans';
	                     eventContext.application.addResource(errorSet);
	                     eventContext.setDisplay(true);
	                     
	              } else {
	                     handler.setPOExtMatRecError(eventContext, false);
	                     eventContext.setDisplay(false);   
	              }
	
	              return;
	            });
            });            
  
            //if topic already processesed, check if error exists
            if (handler.getPOExtMatRecError(eventContext)){
                  eventContext.setLabel( MessageService.createResolvedMessage('errorExists'));
                  eventContext.setDisplay(true);
            } else {
                  eventContext.setDisplay(false);
            }
        },
 
		/**
         * This method hides/shows link if errors exist in poListComplexMatrectrans
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        hideShowPOListComplexExtErrorLink : function(eventContext){
            var self = this;
            var handler = eventContext.application['application.handlers.ManagePurchaseOrderHandler'];
            
            if (self.errorWatch3) {
                  self.errorWatch3.remove();
            }
            
            self.errorWatch3 = topic.subscribe(PlatformConstants.DATA_REFRESH_TOPIC + '/poListComplexMatrectrans',function(fireEvent){
            handler.errorCheckPOListComplexExtReturn(eventContext).then(function(errorSet){
	            eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                  
	              if (errorSet.count()>0){
	                     handler.setPOListComplexExtMatRecError(eventContext, true);
	                     eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                     errorSet.resourceID = 'poListComplexMatrectrans';
	                     eventContext.application.addResource(errorSet);
	                     eventContext.setDisplay(true);
	                     
	              } else {
	                     handler.setPOListComplexExtMatRecError(eventContext, false);
	                     eventContext.setDisplay(false);   
	              }
	
	              return;
	            });
            });            
  
            //if topic already processesed, check if error exists
            if (handler.getPOListComplexExtMatRecError(eventContext)){
                  eventContext.setLabel( MessageService.createResolvedMessage('errorExists'));
                  eventContext.setDisplay(true);
            } else {
                  eventContext.setDisplay(false);
            }
        },
        
        /**
         * Search for matrectrans that contains error
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @return	{Object} ModelDataSet of matrectrans filtered
         * @public
         */
        errorCheckPOExtReturn : function(eventContext){
            var filter = {'_errored': 1};
            return ModelService.filtered('poComplexMatrectrans', null, filter, 1000, false, true, null, true);
        },

	     /**
	      * Set error attribute from matrectrans(poComplexMatrectrans) for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      * @public
	      */
	     setPOExtMatRecError : function(eventContext,haserror){
	            var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
	            errorRes.set('hasPOExtMatRecError',haserror);
	     },
	     
	     /**
	      * Get error attribute from matrectrans(poComplexMatrectrans) for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      * @public
	      */
		 getPOExtMatRecError : function(eventContext){
			var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
			return errorRes.get('hasPOExtMatRecError');
		 },

        /**
         * Search for matrectrans that contains error on the poListComplexMatrectrans resource
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @return	{Object} ModelDataSet of matrectrans filtered
         * @public
         */
        errorCheckPOListComplexExtReturn : function(eventContext){
            var filter = {'_errored': 1};
            return ModelService.filtered('poListComplexMatrectrans', null, filter, 1000, false, true, null, true);
        },

	     /**
	      * Set error attribute from matrectrans(poListComplexMatrectrans) for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      * @public
	      */
	     setPOListComplexExtMatRecError : function(eventContext,haserror){
	            var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
	            errorRes.set('hasPOListComplexExtMatRecError',haserror);
	     },
	     
	     /**
	      * Get error attribute from matrectrans(poListComplexMatrectrans) for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      * @public
	      */
		 getPOListComplexExtMatRecError : function(eventContext){
			var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
			return errorRes.get('hasPOListComplexExtMatRecError');
		 },
			 
		/**
         * Set lookup filter for Vendor Lookup Data Filter
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - It brings context into function
         * @public
         */
		filterVendorForLookup : function(eventContext){
			var additionalvendor = CommonHandler._getAdditionalResource(eventContext,'additionalvendor');
			var filter = [];
			additionalvendor._lookupFilter = null;
			
			var orgid = UserManager.getInfo("deforg");
			filter.push({orgid: orgid});
			
			additionalvendor.lookupFilter = filter;		
		},
		
		/**
         * Validate the Vendor field
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - It brings context into function
         * @public
         */
		validateVendor: function(eventContext) {
			var vendor = eventContext.getCurrentRecord().getPendingOrOriginalValue('vendor');
			var additionalvendor = CommonHandler._getAdditionalResource(eventContext,'additionalvendor');
			var orgid = UserManager.getInfo("deforg");
			
			if ( !vendor ) return;
			
			var vendorSet = additionalvendor.find('company == $1 && orgid == $2', vendor, orgid);
			
			if(vendorSet.length == 0) {
				throw new PlatformRuntimeWarning('invalidVendor');
			}
		},
		
		/**
		 * Manage user selection of purchase order from lookup
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} 	eventContext - Brings context into function
		 * @return	{}			Return ponum selected to previous screen
		 * @public
		 */
		selectPOSelection : function(eventContext){
			var ponum = eventContext.getCurrentRecord().get('ponum');
			var poExternalResource = eventContext.application.getResource('poExternalResource').getCurrentRecord(); 
			poExternalResource.set('ponum',ponum);
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
         * Validate the External Purchase Order
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - It brings context into function
         * @public
         */
		validatePO: function(eventContext) {
			var self = this;
			var ponum = eventContext.getCurrentRecord().getPendingOrOriginalValue('ponum');
						
			eventContext.application.showBusy();
			var filter = [{'internal':false, 'ponum':ponum}];
			var domainporeceipts = CommonHandler._getAdditionalResource(eventContext,'domaininvusereceipts');
			var domainpostatus = CommonHandler._getAdditionalResource(eventContext,'domainpostatus');
			var completeStatus = SynonymDomain.resolveToDefaultExternal(domainporeceipts, 'COMPLETE');
			var poAPPRStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'APPR');
			var poPromise =  ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, null, false);
			poPromise.then(function(poSet){
						
				//make the filter based on history:
				// "Transfers.ReceivePurchaseOrderItemsSeachView" - do not show COMPLETE shipments
				if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-1].id == "Transfers.ReceivePurchaseOrderItemsSeachView"){
					//TODO Verify multiple synonyms are ok
					poSet.filter('receipts != $1 && status == $2', completeStatus, poAPPRStatus);
				}
				
				eventContext.application.hideBusy();
				if ( !ponum ) return;
				
				//verify if search result data is empty
				if(poSet.data.length == 0){
					var msg = MessageService.createStaticMessage("invalidPO").getMessage();
					self.ui.showMessage(msg);
				}
			});
		},
		
		/**
		 * Set fields readonly exclusive of each other on Search View.
		 * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - It brings context into function
         * @public
         */
		setFieldsReadonly : function(eventContext){
			var poExternalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var ponum = poExternalResource.getPendingOrOriginalValue('ponum');
			var vendor = poExternalResource.getPendingOrOriginalValue('vendor');
			//#region Loc-In: adjust for formno fields
			/* if(ponum){
				poExternalResource.getRuntimeFieldMetadata('vendor').set('readonly', true);
			} else if (vendor){
				poExternalResource.getRuntimeFieldMetadata('ponum').set('readonly', true);
			} else {
				poExternalResource.getRuntimeFieldMetadata('ponum').set('readonly', false);
				poExternalResource.getRuntimeFieldMetadata('vendor').set('readonly', false);
			} */

			var formno = poExternalResource.getPendingOrOriginalValue('formno');
			if(ponum){
				poExternalResource.getRuntimeFieldMetadata('vendor').set('readonly', true);
				poExternalResource.getRuntimeFieldMetadata('formno').set('readonly', true);
			} else if (vendor){
				poExternalResource.getRuntimeFieldMetadata('ponum').set('readonly', true);
				poExternalResource.getRuntimeFieldMetadata('formno').set('readonly', true);
			} else if (formno){
				poExternalResource.getRuntimeFieldMetadata('ponum').set('readonly', true);
				poExternalResource.getRuntimeFieldMetadata('vendor').set('readonly', true);
			} else {
				poExternalResource.getRuntimeFieldMetadata('ponum').set('readonly', false);
				poExternalResource.getRuntimeFieldMetadata('vendor').set('readonly', false);
				poExternalResource.getRuntimeFieldMetadata('formno').set('readonly', false);
			}
			//#endregion Loc-In: adjust for formno fields
		},
				
		/**
		 * Set button readonly when vendor field is populated on  Search View.
		 * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - It brings context into function
         * @public
         */
		setButtonReadonly : function(eventContext){
			var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
			//#endregion Loc-In: adjust for formno fields
			
			/* var vendor = poExternalResource.get('vendor');
			if (vendor){
				eventContext.setEnabled(false);
			}
			
			eventContext.addResourceWatchHandle(poExternalResource.watch("vendor", lang.hitch(this, function(attrName, oldValue, newValue){
				if(newValue && newValue!=null){
					eventContext.setEnabled(false);
				} else{
					eventContext.setEnabled(true);
				}
		    }))); */

			var formno = poExternalResource.get('formno');
			if (formno){
				eventContext.setEnabled(false);
			}
			
			eventContext.addResourceWatchHandle(poExternalResource.watch("formno", lang.hitch(this, function(attrName, oldValue, newValue){
				if(newValue && newValue!=null){
					eventContext.setEnabled(false);
				} else{
					eventContext.setEnabled(true);
				}
		    })));
			
			//#region Loc-In: adjust for formno fields
		},
		
		
		/**
		 * Cancel po selection
		 * 
		 * It hides the current view only
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		cancelPOSelection :  function (eventContext) {
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Clear the selected PO
		 * 
		 * Clear the PO value and hides the lookup view
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		clearPOSelection :  function (eventContext) {
			var poExtRes = eventContext.application.getResource('poExternalResource').getCurrentRecord(); 
			poExtRes.set('ponum','');
			this.cancelPOSelection(eventContext);
		},
		
		/**
		 * Transits back to Search view of manage PO
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		transitsBackToManagePOSearchView :  function (eventContext) {
			eventContext.application['application.handlers.ManagePurchaseOrderHandler'].clearSearchFields(eventContext);
			eventContext.ui.returnToView("Transfers.ManageReceivedPurchaseOrderSeachView");
		},
		
		/**
		 * Search items possible to return from an external PO
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		searchPOItemsToReturn : function (eventContext) {
			
			eventContext.application.showBusy();
			
			this.setCurrentProcess(eventContext, 'return');
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var siteid = UserManager.getInfo("defsite");
			var poNum = transfersLocalResource.ponum;
			//#region Loc-In: add formNo
			var formno = externalPoLocalResource.formno;
			//#endregion Loc-Out: add formNo
			var self = this;
			var filter = [];
			var oslcQueryParameters = {};
			var transfersHand = new TransfersHandler();
			var deferredsArray = [];
			
			//verify if we have at least one field filled
			//#region Loc-In: add formNo
			//if(!poNum){
			if (!poNum && !formno) {
			//#endregion Loc-Out: add formNo
				var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			
			//check for errors
			if (transfersHand.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			if (this.getPOExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			if (this.getPOListComplexExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
				
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				eventContext.application.showBusy();
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){
						
						//All set to get data from server
						
						//#region Loc-In: Add FormNo
						// oslcQueryParameters['sqp:poNum'] =  poNum;
						if(poNum){
							oslcQueryParameters['sqp:poNum'] =  poNum;
						}
						if(formno){
							filter.push({formno : formno});
						}
						//#endregion Loc-Out: Add FormNo
						oslcQueryParameters['sqp:siteid'] =  siteid;
						
						var matrectransPromise =  ModelService.filtered('poComplexMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matrectransPromise.then(function(matrectransSet){
							//console.log(matrectransSet.data);
				
							//verify if search result data is empty
							if(matrectransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							
							deferredsArray.push(self.prepareExternalMatrectransListToReturn(eventContext, matrectransSet, 'return'));
							deferredsArray.push(self.prepareExternalListRotatingItemsToReturn(eventContext));
							
							all(deferredsArray).then( function (results){

								//ModelService.empty("receiptInput").then(function(receiptInputSet){
								arrayUtil.forEach (results, function (resultObject) {
									
									if (resultObject.dataSet.count() > 0){
										
										if (resultObject.isRotating){
											//TODO converts assettrans into receiptinput
											//self.convertAssettransToReceipt(eventContext, resultObject.dataSet, receiptInputSet);
											self.mergeAssettransWithMatrectrans(eventContext, resultObject.dataSet, matrectransSet);
										}else{
											//TODO converts matrectrans into receiptinput
											//self.convertMatrectransToReceipt(resultObject.dataSet, matrectransSet);
										}
										
									}
									
								});
								
								//verify if search result data is empty
								if(matrectransSet.data.length == 0){
									var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
									self.ui.showMessage(msg);
									return;
								}
								
								//We dont want to save any updates on the persistent list hence the commented line
								//ModelService.clearSearchResult(matrectransSet);
								matrectransSet.resourceID = 'poComplexMatrectrans';
								eventContext.application.addResource(matrectransSet);
								
								eventContext.application.hideBusy();
								eventContext.ui.show("Transfers.PurchaseOrderItemsToReturnListView");
								//});
								
							});
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});
					}).otherwise(function(error){
						Logger.trace(self._className + ": " + error);
					});			
					
				}else{
					self.ui.showMessage(MessageService.createStaticMessage('connectionFailure').getMessage());
				}
				eventContext.application.hideBusy();
			});

		},
		
		
		/**
		 * Search rotating items possible to return from an external PO
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @return	{Object} list of modeldata
		 * @public
		 */
		prepareExternalListRotatingItemsToReturn : function (eventContext) {
			
			var prepareExternalListRotatingItemsToReturnDeferred = new Deferred();
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var poAssetReturnValue = this.getPoAssetRetValMaxvar(eventContext);
			
			var siteid = UserManager.getInfo("defsite");
			var poNum = transfersLocalResource.ponum;
			var self = this;
			var oslcQueryParameters = {};
			var invalidaAssettransArray = [];
			var transfersHand = new TransfersHandler();
			
			//verify if we have at least one field filled
			if(!poNum){
				var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			
			//check for errors
			if (transfersHand.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
				
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				eventContext.application.showBusy();
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){
						
						//All set to get data from server
						oslcQueryParameters['sqp:poNum'] =  poNum;
						oslcQueryParameters['sqp:siteid'] =  siteid;
						
						//Using complex query to retrieve assettrans
						var assettransPromise =  ModelService.filtered('complexAssettrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, [], 1000, true, true, oslcQueryParameters, false);
						assettransPromise.then(function(assettransSet){
							
							//TODO implement logic return rotating item
							Logger.trace(self._className + "assettrans size = " + assettransSet.data.length);
							var returnIssueType = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'RETURN');
							var filter = [{issuetype: returnIssueType}];
							
							//get list of materectrans
							var matrectransPromise =  ModelService.filtered('receivedMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, {}, false);
							matrectransPromise.then(function(matrectransSet){
								
								var innerFilter = [{ponum: poNum}];
								
								var poPromise = ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, innerFilter, 1000, true, true, {}, false);
								poPromise.then(function(poSet){
									
									var getPOLineModelPromise = poSet.data[0].getModelDataSet("poline",true);
									getPOLineModelPromise.then ( function (polineSet) {
										
										//For each assettrans
										for(var i = 0; i < assettransSet.data.length; i++) {
											
											var assettransRecord = assettransSet.data[i];
											
											//Getting poline resource
											polineSet.clearFilterAndSort();
											polineSet.filter('polinenum == "' + assettransRecord.polinenum + '"');
											var polineRecord = polineSet.getRecordAt(0);
											
											
											//Getting matrectrans resource
											matrectransSet.clearFilterAndSort();
											matrectransSet.filter('rotassetnum == "' + assettransRecord.assetnum +
													'" && ponum == "' + assettransRecord.ponum + 
													'" && positeid == "' + assettransRecord.positeid + '"');

											
											Logger.trace(self._className + "matrectrans size = " + matrectransSet.data.length);
											
											if (matrectransSet.count()!= 0) {
												invalidaAssettransArray.push(assettransRecord.assettransid);
												Logger.trace(self._className + "Invalid assettrans due: no matrectrans");
												continue;
											}
											
											if (assettransRecord.assetnum){
												
												if (assettransRecord.moved) {
													invalidaAssettransArray.push(assettransRecord.assettransid);
													Logger.trace(self._className + "Invalid assettrans due: assettrans moved");
													continue;
												}
												
												if (assettransRecord.itemnum != polineRecord.itemnum){
													invalidaAssettransArray.push(assettransRecord.assettransid);
													Logger.trace(self._className + "Invalid assettrans due: different itemnum");
													continue;
												}
												
												if (polineRecord && polineRecord.issue){
													
													if (assettransRecord.location != assettransRecord.toloc) {
														invalidaAssettransArray.push(assettransRecord.assettransid);
														Logger.trace(self._className + "Invalid assettrans due: different location");
														continue;
													}
													
													if (poAssetReturnValue == "1")	{
														//TODO pending to understand this part, ReceiptInputSet.createReturnsForAssets()
														/*
														if (diHasFinancialTransactions(mrt,asset)){
															invalidaAssettransArray.push(assettransRecord.assettransid);
															continue;
														}
														*/
														
													}
													
												}else{
													
													if (assettransRecord.location != polineRecord.storeloc) {
														invalidaAssettransArray.push(assettransRecord.assettransid);
														Logger.trace(self._className + "Invalid assettrans due: different location");
														continue;
													}else if(assettransRecord.binnum != assettransRecord.tobin){
														invalidaAssettransArray.push(assettransRecord.assettransid);
														Logger.trace(self._className + "Invalid assettrans due: different bin destination");
														continue;
													}
													
													if (poAssetReturnValue == "1"){
														if (assettransRecord.unitcost != assettransRecord.invcost){
															invalidaAssettransArray.push(assettransRecord.assettransid);
															Logger.trace(self._className + "Invalid assettrans due: different cost");
															continue;
														}
													}
													
												}
											}
											
										}
										
										//TODO filter assettrans from invalidated ones
										arrayUtil.forEach (invalidaAssettransArray, function (id) {
											assettransSet.filter('assettransid != "' + id +'"');
										});
										
										prepareExternalListRotatingItemsToReturnDeferred.resolve({dataSet: assettransSet, isRotating: true});
										
									}).otherwise(function(error){
										Logger.trace(self._className + ": poline promise " + error);
									});
									
								}).otherwise(function(error){
									Logger.trace(self._className + ": po promise " + error);
								});
							}).otherwise(function(error){
								Logger.trace(self._className + ": matrectrans promise " + error);
							});
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": assettrans promise " + error);
						});
					}).otherwise(function(error){
						Logger.trace(self._className + ": flush promise " + error);
					});
				}
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
			
			return prepareExternalListRotatingItemsToReturnDeferred.promise;
		},
		
		/**
		 * Search items possible to void from an external PO
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		searchPOItemsToVoid : function (eventContext) {
			
			eventContext.application.showBusy();
			
			this.setCurrentProcess(eventContext, 'void');
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var siteid = UserManager.getInfo("defsite");
			var poNum = transfersLocalResource.ponum;
			//#region Loc-In: add formNo
			var formno = externalPoLocalResource.formno;
			//#endregion Loc-Out: add formNo
			var self = this;
			var filter = [];
			var oslcQueryParameters = {};
			var transfersHand = new TransfersHandler();
			
			//verify if we have at least one field filled
			//#region Loc-In: add formNo
			//if(!poNum){
			if (!poNum && !formno) {
			//#endregion Loc-Out: add formNo
				var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			
			//check for errors
			if (transfersHand.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			if (this.getPOExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			if (this.getPOListComplexExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				eventContext.application.showBusy();
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){
						
						//All set to get data from server
						//#region Loc-In: Add FormNo
						// oslcQueryParameters['sqp:poNum'] =  poNum;
						if(poNum){
							oslcQueryParameters['sqp:poNum'] =  poNum;
						}
						if(formno){
							filter.push({formno : formno});
						}
						//#endregion Loc-Out: Add FormNo
						oslcQueryParameters['sqp:siteid'] =  siteid;
						
						var matrectransPromise =  ModelService.filtered('poComplexMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matrectransPromise.then(function(matrectransSet){
							//console.log(matrectransSet.data);
				
							//verify if search result data is empty
							if(matrectransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							
							self.prepareExternalMatrectransListToReturn(eventContext, matrectransSet, 'void').then( function (resultObject) {
								
								//verify if search result data is empty
								if(matrectransSet.data.length == 0){
									var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
									self.ui.showMessage(msg);
									return;
								}
								
								ModelService.clearSearchResult(matrectransSet);
								matrectransSet.resourceID = 'poComplexMatrectrans';
								eventContext.application.addResource(matrectransSet);
								
								eventContext.application.hideBusy();
								eventContext.ui.show("Transfers.PurchaseOrderItemsToVoidListView");
								
							});
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});
					}).otherwise(function(error){
						Logger.trace(self._className + ": " + error);
					});			
					
				}else{
					self.ui.showMessage(MessageService.createStaticMessage('connectionFailure').getMessage());
				}
				eventContext.application.hideBusy();
			});
		},
		
		/**
		 * Prepare data set of external matrectrans objects for return/void process
		 * 
		 * 
		 * This method mimics the maximo method createReceiptsForReturnPrep on class ReceiptInputSet
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matrectransSet - Set of raw matrectrans objects
		 * @param	{String} returnProcess - Type of the process
		 * @return	{promise} Filtered matrectrans data set
		 * @public
		 */
		prepareExternalMatrectransListToReturn :  function (eventContext, matrectransSet, returnProcess) {
			
			var prepDeferred = new Deferred();
			var receiptStatusSet = CommonHandler._getAdditionalResource(eventContext,'domainreceiptstatus');
			var deferreds = [];
			var invalidMarectrans = [];
			var isReturnProcess = true;
			var isVoidProcess = false;
			var self = this;
			
			//Setting variables according to process type
			if (returnProcess.toLowerCase() == 'void'){
				isReturnProcess = false;
				isVoidProcess = true;
			}
			
			//Pre process the validation
			var canReceivePreProcessPromise = this.canReceivePreProcess(eventContext, isReturnProcess);
			canReceivePreProcessPromise.then( function (response) {
				
				//console.log(response);
				
				if (!response.canReceive){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
					return;	
				}
				
				//For each matrectrans
				for(var i = 0; i < matrectransSet.data.length; i++) {
					
					var matrectransRecord = matrectransSet.data[i];
					
					//Get rotating attribute of item for matrectrans element
					var isRotatingItem = matrectransRecord.itemrotating ? true : false;
					
					//If returning item and item is rotating = remove item from list
					if (isReturnProcess && isRotatingItem){
						invalidMarectrans.push(matrectransRecord.matrectransid);
						Logger.trace(self._className + "Invalid matrectrans due: return process and rotating item");
						continue;
					}
					
					var matrecStatus = matrectransRecord.status;
					
					//If voiding item and
					if (isVoidProcess){
						
						//If item is rotating and matrectrans status is not WINSP OR WASSET = remove item from list
						if (isRotatingItem && (! ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WASSET') 
								|| matrecStatus ==  SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WINSP') ) ) ) {
							invalidMarectrans.push(matrectransRecord.matrectransid);
							Logger.trace(self._className + "Invalid matrectrans due: rotating item and status");
							continue;
						}
						
						//If invoicenum of receipt is NOT null and invoice status equals APPR then set receipt invalid
						if (matrectransRecord.invoice){
							var invoiceChildrenPromise = matrectransRecord.getModelDataSet("invoice",true);
							deferreds.push(invoiceChildrenPromise);
							invoiceChildrenPromise.then(function(invoiceSet){
								
								if (invoiceSet.data.length > 0 && 
										invoiceSet.data[0].status.toUpperCase() == "APPR"){
									
									invalidMarectrans.push(matrectransRecord.matrectransid);
									Logger.trace(self._className + "Invalid matrectrans due: invoice approved");
								}
							}).otherwise(function(error){
								Logger.trace(self._className + ": " + error);
							});
						}
						
						//if list of INVOICEMATCH relationship is not empty = remove item from list
						var isInvoiceMatchRelationEmptyPromise = self.isInvoiceMatchRelationEmpty(eventContext, matrectransRecord);
						deferreds.push(isInvoiceMatchRelationEmptyPromise);
						isInvoiceMatchRelationEmptyPromise.then( function (response) {
							if (!response.isEmpty){
								invalidMarectrans.push(response.object.matrectransid);
								Logger.trace(self._className + "Invalid matrectrans due: invoice match relation is empty");
							}
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});

						//If list of RETURNRECEIPTS relationship is not empty = remove item from list
						var isReturnExternalReceiptsRelationEmptyPromise = self.isReturnExternalReceiptsRelationEmpty(eventContext, matrectransRecord);
						deferreds.push(isReturnExternalReceiptsRelationEmptyPromise);
						isReturnExternalReceiptsRelationEmptyPromise.then( function (response) {
							
							if (!response.isEmpty){
								invalidMarectrans.push(response.object.matrectransid);
								Logger.trace(self._className + "Invalid matrectrans due: return receipt relation is empty");
							}
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});
					
						//If receipt status equals to COMP or WASSET or WINSP	AND 	inspectedqty attribute from receipt is greater than 0 = remove from list
						if ( ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'COMP') 
								|| matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WASSET') 
								|| matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WINSP') )  && matrectransRecord.inspectedqty > 0 ) {
							invalidMarectrans.push(matrectransRecord.matrectransid);
							Logger.trace(self._className + "Invalid matrectrans due: receipt status");
							continue;
						} 

					}

					// Promise below retrieves the quantity to be returned
					var getQuantityToReturnPromise = self.getQuantityToReturn(eventContext, matrectransRecord, isVoidProcess);
					deferreds.push(getQuantityToReturnPromise);
					getQuantityToReturnPromise.then( function (response) {
						
						if (response.object.qtyToBeReturned == 0) {
							invalidMarectrans.push(response.object.matrectransid);
							Logger.trace(self._className + "Invalid matrectrans due: no quantity to return");
						}
						
						Logger.trace(self._className + "quantity response is : " + response.qty);
					}).otherwise(function(error){
						Logger.trace(self._className + ": " + error);
					});
					
				}
				
				all(deferreds).then(function(results){
					
					arrayUtil.forEach (invalidMarectrans, function (id) {
						matrectransSet.filter('matrectransid != "' + id +'"');
					});
					
					prepDeferred.resolve({dataSet: matrectransSet, isRotating: false});
					
				}).otherwise(function(error){
					Logger.trace(self._className + ": " + error);
				});
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
			
			return prepDeferred.promise;
			
		},
		
		/**
		 * Cancel void/return process of purchase order and moves user back to last screen
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		cancelReturnVoidSelection :  function (eventContext) {
			
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Submit request with selected items to void
		 * 
		 * Method mimicked from maximo ReceiptInputSet.generateReturnReceipts()
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		voidSelectedItems :  function (eventContext) {
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var poNum = transfersLocalResource.ponum;
			//#region Loc-In: add formNo
			var formno = externalPoLocalResource.formno;
			//#endregion Loc-Out: add formNo
			var matrectransSet = eventContext.getResource('poComplexMatrectrans');
			var self = this;
			var filter = [];
			var receiveHandler = eventContext.application['application.handlers.ReceiveShipmentHandler'];
			var domainitemtypes = CommonHandler._getAdditionalResource(eventContext,'domainitemtype');
		//	var matrectransToRemove = [];
			var receiveExtPo = false;
			if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.ReceivePurchaseOrderItemsSeachView" ||
					WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.MultiPOListView" ||
					WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.POMaterialReceiptsListView"){
				receiveExtPo = true;
			}
			
			CommonHandler._clearFilterForResource(eventContext, matrectransSet);
			this.checkBoxValidation(eventContext, matrectransSet, 'voidindicator');

			//#region Loc-In: Add FormNo
			//filter.push({ponum: poNum});
			if(poNum){
				filter.push({ponum: poNum});
			}
			if(formno){
				filter.push({formno : formno});
			}
			//#endregion Loc-Out: Add FormNo
			
			var poPromise =  ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, {}, false);
			poPromise.then( function ( poSet ) {
				
				if(poSet.data.length == 0){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
					return;
				}
				
				var getPOLineModelPromise = poSet.data[0].getModelDataSet("poline",true);
				getPOLineModelPromise.then ( function (polineSet) {
			
					var size = matrectransSet.data.length;
					
				//	arrayUtil.forEach (matrectransSet, function (matrectrans) {
				//		matrectransToRemove.push(matrectrans.matrectransid);
				//	});
					
					var issueToErrorThrown = false;
					for (var i = 0 ; i < size ; i++ ){
						
						var matrectransToVoid = matrectransSet.data[i];
						
						if(issueToErrorThrown)
							return;
						
						//validate IssueTo for External Purchase Order Receiving
						if(receiveExtPo){
							var linetype = SynonymDomain.resolveToInternal(domainitemtypes,matrectransToVoid.linetype);
							if(linetype=='TOOL' && matrectransToVoid.qtyToBeReturned>0){
								if(!receiveHandler.validateIssueTo(eventContext,matrectransToVoid)){
									issueToErrorThrown = true;
									return;
								};
							};
						}
						
						//Exception for returning more than receipt
						if (matrectransToVoid.lifofiforeturnqty && matrectransToVoid.qtyToBeReturned > lifofiforeturnqty){
							Logger.error("Returning item " + matrectransToVoid.itemnum + " more than receipt quantity.");
							var msg = MessageService.createResolvedMessage('returnMoreThanReceipt', [matrectransToVoid.itemnum]);
							self.ui.showMessage(msg);
							return;
						}
						
						//Filter polineset based on matrectrans
						polineSet.clearFilterAndSort();
						polineSet.filter('polinenum == $1', matrectransToVoid.polinenum);
						
						var poLine = null;
						if (polineSet.count() > 0) {
							poLine = polineSet.getRecordAt(0);
						}
						
						var newReceipt = matrectransSet.createNewRecord();
						
						self.prepareReturnExternalReceipt(eventContext, newReceipt, matrectransToVoid, 'void', poLine);
					}
					
				//	arrayUtil.forEach (matrectransToRemove, function (id) {
				//		matrectransSet.filter('matrectransid != "' + id +'"');
				//	});
					
					ModelService.save(matrectransSet).then(function(event){
						Logger.trace(self._className + "Save complete response");
						eventContext.ui.show("Transfers.TransactionSubmitDialog");
					}).otherwise(function(err){
						eventContext.ui.showMessage(err);
					});
					
				});
				
			});
			
		},
		
		/**
		 * Submit request with selected items to return
		 * 
		 * Method mimicked from maximo ReceiptInputSet.generateReturnReceipts()
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		returnSelectedItems :  function (eventContext) {

			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var poNum = transfersLocalResource.ponum;
			//#region Loc-In: add formNo
			var formno = externalPoLocalResource.formno;
			//#endregion Loc-Out: add formNo
			var matrectransSet = eventContext.getResource('poComplexMatrectrans');
			var self = this;
			var filter = [];
			//var matrectransToRemove = [];
			
			//do not create records that were used to build Return Items List.
			//clear out records to be created.
			matrectransSet._recordsToCreate = [];
			
			CommonHandler._clearFilterForResource(eventContext, matrectransSet);
			this.checkBoxValidation(eventContext, matrectransSet, 'returnindicator');

			//iterate over all records on list
			for(var index in matrectransSet.data){
				
				var elem = matrectransSet.data[index];
				if(!this.validateQuantityForReturn(eventContext, elem)){
					return;
				}
			}
			
			//#region Loc-In: Add FormNo
			//filter.push({ponum: poNum});
			if(poNum){
				filter.push({ponum: poNum});
			}
			if(formno){
				filter.push({formno : formno});
			}
			//#endregion Loc-Out: Add FormNo
			
			var poPromise =  ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, {}, false);
			poPromise.then( function ( poSet ) {
				
				if(poSet.data.length == 0){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
					return;
				}
				
				var getPOLineModelPromise = poSet.data[0].getModelDataSet("poline",true);
				getPOLineModelPromise.then ( function (polineSet) {
			
					var size = matrectransSet.data.length;
					
				//	arrayUtil.forEach (matrectransSet.data, function (matrectrans) {
				//		matrectransToRemove.push(matrectrans.matrectransid);
				//	});
					
					for (var i = 0 ; i < size ; i++ ){
						
						//var matrectransToVoid = matrectransSet.data[i];
						var matrectransToVoid = matrectransSet.data[i];
						
						//Exception for returning more than receipt
						if (matrectransToVoid.lifofiforeturnqty && matrectransToVoid.qtyToBeReturned > lifofiforeturnqty){
							Logger.error("Returning item " + matrectransToVoid.itemnum + " more than receipt quantity.");
							var msg = MessageService.createResolvedMessage('returnMoreThanReceipt', [matrectransToVoid.itemnum]);
							self.ui.showMessage(msg);
							return;
						}
						
						//Filter polineset based on matrectrans
						polineSet.clearFilterAndSort();
						polineSet.filter('polinenum == $1', matrectransToVoid.polinenum);
						
						var poLine = null;
						if (polineSet.count() > 0) {
							poLine = polineSet.getRecordAt(0);
						}
						
						var newReceipt = matrectransSet.createNewRecord();
						
						self.prepareReturnExternalReceipt(eventContext, newReceipt, matrectransToVoid, 'return', poLine);
					}
					
				//	arrayUtil.forEach (matrectransToRemove, function (id) {
				//		matrectransSet.filter('matrectransid != "' + id +'"');
				//	});
					
					ModelService.save(matrectransSet).then(function(event){
						Logger.trace(self._className + "Save complete response");
						eventContext.ui.show("Transfers.TransactionSubmitDialog");
					}).otherwise(function(err){
						eventContext.ui.showMessage(err);
					});
					
				});
				
			});
			
		},
		
		/**
		 * Validate if any checkbox is selected. Throws PlatformRuntimeException.
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} recordSet - Set of records to iterate
		 * @param	{String} indicator - Attribute to check against
		 * @public
		 * @throws {PlatformRuntimeException} If set of records does not exist or has 0 records.
		 */
		checkBoxValidation : function(eventContext, recordSet, indicator){
			//check if checkboxes are selected
			recordSet.filter(indicator + ' == true');
			
			if (recordSet && recordSet.count() == 0){
				//#region Loc-In: fix not clear filter
				CommonHandler._clearFilterForResource(eventContext, recordSet);
				//#endregion Loc-Out: fix not clear filter
				throw new PlatformRuntimeException('atLeastOneItem');
			}
		},
		
		
		/**
		 * Decides which method use to calculate quantity to return
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matRecParent - Matrectrans object
		 * @param	{Boolean} isVoidProcess - If this is a void process
		 * @return	{promise} Quantity available for return from matRecParent
		 * @public
		 */
		getQuantityToReturn : function (eventContext, matRecParent, isVoidProcess) {
			
			var deferred = new Deferred();
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var costTypeSet = CommonHandler._getAdditionalResource(eventContext,'domaincosttype');
			var filter = [];
			var self = this;
			
			//Getting parent of matrectrans
			filter.push ( {receiptref : matRecParent.matrectransid.toString()} ) ;
			filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'TRANSFER') } );
			oslcQueryParameters = {};
			
			var matrectransChildrenPromise =  ModelService.filtered('receivedMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
			matrectransChildrenPromise.then(function(matrecChildrenSet){
				
				var matrectransRef;
				
				if(matrecChildrenSet.data.length == 0){
					matrectransRef = matRecParent;
				}else {
					var matrecChildren = matrecChildrenSet.getRecordAt(0);
					matrectransRef = matrecChildren;
				}
				
				//Getting inventory data from matrectrans
				ModelService.clearSearchResult(matrecChildrenSet);
				var getInventoryPromise = self.getInventoryFromMatrectrans(matrectransRef, matRecParent);
				getInventoryPromise.then( function (result) {
					
					var invObject = result.invObject;
					var matrectransObject = result.matrecObj;
					var receiptId = result.matrecObj.matrectransid;
					
					if (invObject && ( invObject.costtype == SynonymDomain.resolveToDefaultExternal(costTypeSet, 'FIFO') 
							|| invObject.costtype == SynonymDomain.resolveToDefaultExternal(costTypeSet, 'LIFO' ) ) ) {
						
						var lifoFifoReturnQty = 0;
						
						invObject.getModelDataSet("invlifofifocost",true).then(function(invlifofifocostSet){
							
							arrayUtil.forEach (invlifofifocostSet.data, function (invlifofifoRecord) {
								
								if (receiptId == invlifofifoRecord.refobjectid && invlifofifoRecord.refobject.toUpperCase() == "MATRECTRANS"){
									lifoFifoReturnQty = lifoFifoReturnQty + invlifofifoRecord.quantity;
								}
								
							});
							
							matrectransObject.lifofiforeturnqty = lifoFifoReturnQty;
							matrectransObject.qtyToBeReturned = lifoFifoReturnQty;
							deferred.resolve({object: matrectransObject});
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});
						
					}else {
						
						self.calcQuantityToReturn(eventContext, matrectransObject, isVoidProcess).then( function (response) {
							
							var qtyToBeReturned = response.qty;
							var matrectransInnerObject = response.object;
							matrectransInnerObject.qtyToBeReturned = qtyToBeReturned;
							
							deferred.resolve({object: matrectransInnerObject});
							
						}).otherwise(function(error){
							Logger.trace(self._className + ": " + error);
						});
						
					}
					
				}).otherwise(function(error){
					Logger.trace(self._className + ": " + error);
				});
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
					
			return deferred.promise;
		},
		
		/**
		 * Calculate quantity possbile to return
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matRecParent - Matrectrans object
		 * @param	{Boolean} isVoidProcess - If this is a void process
		 * @return	{promise} Quantity available for return from matRecParent
		 * @public
		 */
		calcQuantityToReturn :  function (eventContext, matRecParent, isVoidProcess) {
			
			var deferred = new Deferred();
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var receiptStatusSet = CommonHandler._getAdditionalResource(eventContext,'domainreceiptstatus');
			var filter = [];
			
			//Retrieve matrectrans based on this relation RETURNVOIDRECEIPTS
			filter.push ( {receiptref : matRecParent.matrectransid.toString()} ) ;
			//filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'RETURN') } );
			//filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'VOIDRECEIPT') } );
			oslcQueryParameters = {};
			
			var matrectransChildrenPromise =  ModelService.filtered('childMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
			matrectransChildrenPromise.then(function(matrecChildrenSet){
				
				var returnExtIssuetype = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'RETURN');
				var voidreceiptExtIssuetype = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'VOIDRECEIPT');
				
				matrecChildrenSet.filter('issuetype == $1 || issuetype == $3', returnExtIssuetype, voidreceiptExtIssuetype);
				
				Logger.trace("calc for parent " +matRecParent.matrectransid+ " using filter " + JSON.stringify(filter) + " resulting total " + matrecChildrenSet.data.length);
				
				var qtyToBeReturned = 0;
				var matrecStatus = matRecParent.status;
				
				if(matrecChildrenSet.count() == 0){
					
					if ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'COMP') ) {
						qtyToBeReturned = matRecParent.receiptquantity;
					}else if ( isVoidProcess 
							&& ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WINSP') 
									|| matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WASSET') ) ) {
						qtyToBeReturned = matRecParent.receiptquantity;
					}
					
				}else {
					var receiptSum = 0;
					
					arrayUtil.forEach(matrecChildrenSet.data, function (child) {
						if (child.quantity)
						receiptSum += child.receiptquantity;
					});
					
					if ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WINSP') ) {
						qtyToBeReturned = matRecParent.inspectedqty - (receiptSum * -1 );
					} else {
						qtyToBeReturned = matRecParent.receiptquantity - (receiptSum * -1 ) ;
					}
				}
				
				ModelService.clearSearchResult(matrecChildrenSet);
				deferred.resolve({qty: qtyToBeReturned, object: matRecParent});
				
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
			return deferred.promise;
		},
		
		/**
		 * Grab inventory record from matrectrans 
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{object} matrectrans - Matrectrans object
		 * @return	{promise} Object with empty list indicator and matrectrans
		 * @public
		 */
		getInventoryFromMatrectrans :  function (eventContext, matrectrans, matRecParent) {
			
			var deferred = new Deferred();
			var filter = [];
			
			filter.push ( {itemnum : matrectrans.itemnum} ) ;
			filter.push ( {itemsetid : matrectrans.itemsetid } );
			//if (matrectrans.positeid){
				filter.push ( {siteid : matrectrans.positeid} );
			//}

			//this null handling is needed for devices
			if(matrectrans.location){
				filter.push ( {storeloc : matrectrans.location } );	
			} else {
				filter.push ( {storelocnotnull : false } );	
			}
			
			oslcQueryParameters = {};
			
			var inventoryChildrenPromise =  ModelService.filtered('inventory', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
			inventoryChildrenPromise.then(function(invChildrenSet){
				
				var returnObject = null;
				if(invChildrenSet.data.length > 0){
					returnObject = invChildrenSet.getRecordAt(0);
				}
					
				ModelService.clearSearchResult(invChildrenSet);
				deferred.resolve({invObject: returnObject, matrecObj: matrectrans, matrecParent: matRecParent});
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
			
			return deferred.promise;
		},

		/**
		 * Check whether matrectrans has parent with issue type as RETURN 
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matRecParent - Matrectrans object
		 * @return	{promise} Object with empty list indicator and matrectrans
		 * @public
		 */
		isReturnExternalReceiptsRelationEmpty :  function (eventContext, matRecParent) {
			
			var deferred = new Deferred();
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var filter = [];
			
			filter.push ( {receiptref : matRecParent.matrectransid.toString()} ) ;
			filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'RETURN') } );
			oslcQueryParameters = {};
			
			var matrectransChildrenPromise =  ModelService.filtered('childMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
			matrectransChildrenPromise.then(function(matrecChildrenSet){
				
				Logger.trace("isEmpty for parent " +matRecParent.matrectransid+ " using filter " + JSON.stringify(filter) + " resulting total " + matrecChildrenSet.data.length);
				
				var isEmpty = false;
				if(matrecChildrenSet.data.length == 0){
					isEmpty = true;
				}
					
				ModelService.clearSearchResult(matrecChildrenSet);
				deferred.resolve({isEmpty: isEmpty, object: matRecParent});
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
			
			return deferred.promise;
		},
		
		
		/**
		 * Check whether matrectrans has children with INVOICEMATCH resource 
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matRecParent - Matrectrans object
		 * @return	{promise} Object with empty list indicator and matrectrans
		 * @public
		 */
		isInvoiceMatchRelationEmpty :  function (eventContext, matRecParent) {
			
			var deferred = new Deferred();
			var filter = [];
			
			filter.push ( {matrectransid : NumberUtil.parse(matRecParent.matrectransid)} ) ;
			filter.push ( {positeid : matRecParent.positeid } );
			oslcQueryParameters = {};
			
			var matrectransChildrenPromise =  ModelService.filtered('invoicematchResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
			matrectransChildrenPromise.then(function(matrecChildrenSet){
				
				Logger.trace("isEmpty for parent " +matRecParent.matrectransid+ " using filter " + JSON.stringify(filter) + " resulting total " + matrecChildrenSet.data.length);
				
				var isEmpty = false;
				if(matrecChildrenSet.data.length == 0){
					isEmpty = true;
				}
					
				ModelService.clearSearchResult(matrecChildrenSet);
				deferred.resolve({isEmpty: isEmpty, object: matRecParent});
				
			}).otherwise(function(error){
				Logger.trace(self._className + ": " + error);
			});
			
			return deferred.promise;
		},
		
		/**
		 * Pre process required mimicked from ReceiptInputSet.setup() 
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{boolean} isReturnProcess - it is a return process
		 * @return	{promise} Object with indicator whether matrectrans is valid
		 * @public
		 */
		canReceivePreProcess :  function (eventContext, isReturnProcess) {
			
			var domainpostatus = CommonHandler._getAdditionalResource(eventContext,'domainpostatus');
			domainpostatus.clearFilterAndSort();
			var apprPOStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'APPR');
			var inprgPOStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'INPRG');
			var canPOStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'CAN');
			var pndrevPOStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'PNDREV');
			var holdPOStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'HOLD');
			var revisePOStatus = SynonymDomain.resolveToDefaultExternal(domainpostatus, 'REVISE');
			
			var deferred = new Deferred();
			var filter = [];
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'poExternalResource').getCurrentRecord();
			var poNum = transfersLocalResource.ponum;
			
			filter.push( {ponum: poNum} );
			
			var poPromise =  ModelService.filtered('poResource', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, {}, false);
			poPromise.then( function (poSet) {
				
				var canReceive = true;
				
				if(poSet.count() == 0){
					canReceive = false;
				}
				var mainPO = poSet.getRecordAt(0);
				var mainPOStatus = mainPO.status;
				
				if ( (!mainPOStatus == apprPOStatus) ||  (!mainPOStatus == inprgPOStatus) ) {
					if (!isReturnProcess) {
						canReceive = false;
					}
				}else{
					
					poSet.filter('siteid == $1 && status != $2 && status != $3', mainPO.siteid, canPOStatus, pndrevPOStatus);
					
					if(poSet.count()>1){
						
						var innerPO = poSet.getRecordAt(0);
						if ( (!innerPO.status == apprPOStatus) ||  (!innerPO.status == inprgPOStatus) ) {
							canReceive = false;
						}
					}
					
					
				}

				if (mainPOStatus == holdPOStatus || mainPOStatus == revisePOStatus || mainPOStatus == pndrevPOStatus){
					canReceive = false;
				}
				deferred.resolve({canReceive: canReceive});
				
			});
			
			return deferred.promise;
		},
		
		/**
		 * Hides the confirmation dialog and
		 * Returns user back to previous screen
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		receiveTransSubmitted : function (eventContext) {
			
			eventContext.ui.hideCurrentDialog();
			
			var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
        	var currentProcess = poExternalResource.get('currentprocess');
			
        	if (currentProcess == 'RECEIPT') {
    			this.clearSearchFields(eventContext);
    			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			} else {
				this.searchReceivedPurchaseOrders(eventContext);
			}
				
		},
		
		
		/**
		 * Toggle External PO Item Inspection View based on Rotating Item

		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		inspectPOItem : function (eventContext){
			this.setCurrentProcess(eventContext, 'inspection');
			eventContext.ui.show("Transfers.InspectPOItemView");
		},
		
		/**
		 * Prepare receipt - matrectrans object
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} newReceipt - A new matrectrans object
		 * @param	{Object} matrectransRef - Matrectrans object where attributes will be copied from
		 * @param	{Boolean} isVoidProcess - void process indicator
		 * @param	{Object} poLine - PO line object relative to matrectrans
		 * @param	{Object} inventory - Inventory object
		 * @return	{Object} Return the matrectrans attributes populated
		 * @public
		 */
		prepareReturnExternalReceipt : function (eventContext, /*ModelData*/ newReceipt, /*ModelData*/ matrectransRef, /*string*/process, /*ModelData*/poLine) {
			
			var domainIssueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var receiptStatusSet = CommonHandler._getAdditionalResource(eventContext,'domainreceiptstatus');
			//var costTypeSet = CommonHandler._getAdditionalResource(eventContext,'domaincosttype');
			
			if (process.toLowerCase() == 'void'){
				newReceipt.set('issuetype', SynonymDomain.resolveToDefaultExternal(domainIssueTypeSet, 'VOIDRECEIPT'));
				newReceipt.set('actualdate', matrectransRef.actualdate);
			}else{
				newReceipt.set('issuetype', SynonymDomain.resolveToDefaultExternal(domainIssueTypeSet, 'RETURN'));
			}
			
			newReceipt.set('receiptref', parseInt( matrectransRef.matrectransid ) );
			newReceipt.set('ponum', matrectransRef.ponum );
			newReceipt.set('polinenum', matrectransRef.polinenum );
			newReceipt.set('exchangerate', matrectransRef.exchangerate);
			
			if (matrectransRef.packingslipnum && matrectransRef.packingslipnum.length > 0) {
				newReceipt.set('packingslipnum', matrectransRef.packingslipnum);	
			}
			
			if (matrectransRef.qtyrequested < 0) {
				newReceipt.set('qtyrequested', ( matrectransRef.qtyrequested * -1 ) );	
			}
			
			if ( process.toLowerCase() == 'void' && poLine && poLine.orderqty < 0 ) {
				newReceipt.setNullValue('quantity');
				newReceipt.set('receiptquantity', matrectransRef.qtyToBeReturned);
			} else if ( process.toLowerCase() == 'return' && poLine && poLine.orderqty < 0 ) {
				newReceipt.set('receiptquantity', matrectransRef.qtyToBeReturned);
			} else {
				newReceipt.set('receiptquantity', ( matrectransRef.qtyToBeReturned * -1 ) );
			}
			
			if(matrectransRef.itemrotating==true){
				newReceipt.set('rotassetnum', matrectransRef.rotassetnum );
			}
			
			newReceipt.set('asn', matrectransRef.asn);
			newReceipt.set('invoicenum', matrectransRef.invoicenum);
			if (!matrectransRef.remark) {
				newReceipt.set('remark', matrectransRef.remark);	
			}
			newReceipt.set('tostoreloc', matrectransRef.tostoreloc);
			newReceipt.set('tobin', matrectransRef.tobin);
			newReceipt.set('tolot', matrectransRef.tolot);
			newReceipt.set('conditioncode', matrectransRef.conditioncode);
			newReceipt.set('issueto', matrectransRef.issueTo );

			if (poLine.inspectionrequired){
				newReceipt.set('gldebitacct', matrectransRef.gldebitacct);
			}
			
			
			newReceipt.set('enterby', UserManager.getCurrentUser());
			
			newReceipt.set('positeid', matrectransRef.positeid);
			newReceipt.set('siteid', matrectransRef.siteid);
			
			//#206126 - Updated quantity to fix conversion issue
			newReceipt.set('quantity', (matrectransRef.qtyToBeReturned * poLine.conversion * -1) );
			newReceipt.set('status', SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'COMP') );
			
			return newReceipt;
			
		},

		/**
		 * Toggle Receiving Rotating View based on Rotating Item
		 */
		receivePORotatingItem : function (eventContext){
			
			//check for errors
			if (this.getPOListComplexExtMatRecError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			var currentRecord = eventContext.getCurrentRecord();
			var qty = currentRecord.get('receiptquantity');
			var rejectqty = currentRecord.get('rejectqty');
			var totalQty = qty - rejectqty;
			var matrectrans = null;
			
			ModelService.empty("poListComplexMatrectrans").then(function(poMatRecSet){
				for(var i = 1 ; i <= totalQty; i++){ 
					matrectrans = poMatRecSet.createNewRecord(); 
					matrectrans.set('itemnum',currentRecord.itemnum);
					matrectrans.set('itemdesc',currentRecord.itemdesc);
					matrectrans.set('itemsetid',currentRecord.itemsetid);
					matrectrans.set('quantity',1);
					matrectrans.set('tostoreloc',currentRecord.tostoreloc);
					matrectrans.set('siteid',currentRecord.siteid);
					matrectrans.set('matrectransid',parseInt(currentRecord.matrectransid));
					matrectrans.parentRecord = currentRecord;
				}

				poMatRecSet.resourceID = 'assignRotatingItemsMatrectransResource';
				eventContext.application.addResource(poMatRecSet);
				eventContext.ui.show("Transfers.ReceiveExternalPORotatingItemView");
			});
		},
		
		/**
		 * Autonumber all fields when receiving rotating items
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		receiveRotatingItemProcessAssetAutonum : function(eventContext){
			this.receiveRotatingItemProcessAsset(eventContext, true);
		},
		
		/**
		 * Receive Rotating items for external purchase orders
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{boolean} autonum - true autonumber all asset fields 
		 * @public
		 * @throws {PlatformRuntimeException} If newassetnum is empty for any of the records.
		 */
		receiveRotatingItemProcessAsset : function(eventContext, autonum){
			this.setCurrentProcess(eventContext, 'assignment');
			 var matrectransSet = eventContext.getResource();
			 if(matrectransSet.count()>0){
				 var record = matrectransSet.data[0];
				 var currentRecord = record.parentRecord;
				 var saveresource = currentRecord.getOwner();
				 
				 //very all asset fields are populated if not autonumber enabled.
				 if (!autonum){
					 arrayUtil.forEach (matrectransSet.data, function (matrectrans) { 
						 var newassetnum = matrectrans.get('newassetnumber');
						 if (!newassetnum){
							 throw new PlatformRuntimeException('assetneeded'); 
						 }
					 });
				 }
				 
				 currentRecord.getModelDataSet("awreceiverotasset",true).then(function(rotAssetSet){ 
					 arrayUtil.forEach (matrectransSet.data, function (matrectrans) {
						 var rotAsset = rotAssetSet.createNewRecord();
						 var newassetnum = matrectrans.get('newassetnumber');
						 if(newassetnum){
							 rotAsset.set('assetnum', newassetnum);	 
						 } else {
							 //rotAsset.set('assetnum', matrectrans.get('rotassetnum'));
							 matrectrans.markAsModified('assetnum');
						 }
						 rotAsset.matrectransid = matrectrans.get('matrectransid');
						 
						 if(autonum && autonum == true){
							 rotAsset.set('autonumber', true);
							 rotAsset.markAsModified('matrectransid');
						 }
					 });
					
		             eventContext.application.showBusy();
					 ModelService.save(saveresource).then(function() {
						 eventContext.ui.show("Transfers.TransactionSubmitDialog");
					 }).otherwise( function(err){
	                    eventContext.application.hideBusy();
	                    eventContext.ui.showMessage(err);
					 });
				 }); 
			 }
		 },

		 
		 /**
         * This method switch the message in confimation dialog according to process
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @return	{Array} array with elements to resolve the text.
         * @public
         */
		 resolveConfirmationMessage : function(eventContext){
        	
        	var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
        	var currentProcess = poExternalResource.get('currentprocess');
        	var processes = this._acceptedProcesses();
        	var index = arrayUtil.indexOf(processes, currentProcess.toUpperCase() );
        	var messagesMap = ['receiptRequestSucess','voidRequestSucess','returnRequestSucess','inspectionRequestSucess','rotatingitemRequestSucess'];
        	
        	if (index < 0){
        		Logger.error(self._className + ": unavailable process. ");
        		index = 0;
        	}
        	
        	var msg = MessageService.createStaticMessage(messagesMap[index]).getMessage();
        	return [msg];
        	
        },
		 
        /**
         * Set current process to local variable
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
		 setCurrentProcess : function(eventContext, process){
        	
        	var poExternalResource = this.application.getResource('poExternalResource').getCurrentRecord();
        	var currentProcess = null;
        	var processes = this._acceptedProcesses();
        	var index = arrayUtil.indexOf(processes, process.toUpperCase() );
        	
        	if (index >= 0){
        		currentProcess = processes[index];
        	}else {
        		Logger.error(self._className + ": unavailable process. ");
        		Logger.error(self._className + " Setting default process. ");
        	
        		currentProcess = processes[0];
        	}
        	
        	poExternalResource.set('currentprocess', currentProcess);
        	
        },
        
        /**
         * Set current process to local variable
         * 
         * @memberof module:application/handlers/ManagePurchaseOrderHandler#
         * @return {Array} Array with the available processes
         * @public
         */
        _acceptedProcesses : function () {
        	return ['RECEIPT','VOID','RETURN','INSPECTION','ASSIGNMENT'];
        },
        		 
		/**
		 * Hide "Issue To" label and lookup case item if not a TOOL type
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */		 
		hideIssueToLabel : function(eventContext) {
			console.log("Hide issue to field");
			
			var domainitemtypes = CommonHandler._getAdditionalResource(eventContext,'domainitemtype');
			var currentItem = eventContext.getCurrentRecord();
			var itemType = currentItem.get("linetype");
			var issue = currentItem.get("issue");
			var linetype = SynonymDomain.resolveToInternal(domainitemtypes,itemType);
			
			var receiveExtPo = false;
			if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.ReceivePurchaseOrderItemsSeachView" ||
					WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.MultiPOListView" ||
					WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.POMaterialReceiptsListView"){
				receiveExtPo = true;
			}
			
			if (receiveExtPo && linetype == 'TOOL' && (issue == true)){
				eventContext.setDisplay(true);
			} else {
				eventContext.setDisplay(false);
			}
		},
		
		/**
		 * Validates quantity to be returned. Throws PlatformRuntimeException.
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matrectransRecord - Object to execute validation
		 * @return	{Boolean} True for a valid record. False otherwise.
		 * @public
		 * @throws {PlatformRuntimeException} If quantity is not a number or quantity is higher than allowed.
		 */
		validateQuantityForReturn : function( eventContext, matrectransRecord ) {
			
			//var matrectransRecord = eventContext.getCurrentRecord();
			if(!matrectransRecord){
				matrectransRecord = eventContext.getCurrentRecord();
			}
			
			var qtyToBeReturned = matrectransRecord.receiptquantity;
			var newQtyToBeReturned = matrectransRecord.getPendingOrOriginalValue('qtyToBeReturned');
			var message = null;
			
			//verify if issue quantity is a positive number
			if (newQtyToBeReturned !== '' && ( NumberUtil.parse( newQtyToBeReturned, this.application.getUserLocale() ) <= 0) ) {
				message = 'quantityPositive';
				throw new PlatformRuntimeException(message);
				return false;
			}
			//verify if issue quantity is a valid number
			else if( isNaN ( NumberUtil.parse ( Number( newQtyToBeReturned ) ) ) ){
				message = MessageService.createResolvedMessage('newReadingNaN', [newQtyToBeReturned]);
				throw new PlatformRuntimeException(message);
				return false;
			}
			
			//verify if issue quantity is greater than quantity available
			else if( (!isNaN ( NumberUtil.parse ( Number( newQtyToBeReturned ) ) ) ) && qtyToBeReturned < newQtyToBeReturned ){
				message = MessageService.createResolvedMessage('quantityItemValidation', [qtyToBeReturned, matrectransRecord.itemnum]);
				throw new PlatformRuntimeException(message);
				return false;
			}
			return true;
		},
		
		/**
		 * Retrieve flag Maxvar Setting.
		 * 
		 * Flag indicates: Do not allow assets to be returned to vendor if transactions are posted
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @return	{Boolean} True if allow assets to be returned to vendor if transactions are posted.
		 * @public
		 */
		getPoAssetRetValMaxvar : function(eventContext){
			var orgid = UserManager.getInfo("deforg");
			var maxVarsSet =  CommonHandler._getAdditionalResource(this,"oslcmaxvars");
			if(maxVarsSet){
			    var result = maxVarsSet.find("varname == $1 && orgid == $2", 'POASSETRETVAL', orgid);
			    if (result.length > 0) {
					var flag =  result[0].get("varvalue");
					return flag;
			    }
			}
		},
		
		/**
		 * Creates new receiptInput instance based on Assettrans properties
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} assettransSet - Assettrans data set
		 * @param	{Object} receiptInputSet - ReceiptInput data set
		 * @public
		 * @deprecated
		 */
		convertAssettransToReceipt : function(eventContext, assettransSet, receiptInputSet){
			
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var returnIssueType = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'RETURN');
			
			arrayUtil.forEach (assettransSet.data, function (assettransRecord) {

				var newReceiptInputRecord = receiptInputSet.createNewRecord();
				
				/* required for display */
				newReceiptInputRecord.set('itemnum',assettransRecord.itemnum);
				newReceiptInputRecord.set('receivedunit',assettransRecord.receivedunit);
				newReceiptInputRecord.set('itemdesc',assettransRecord.assetdescription);
				newReceiptInputRecord.set('quantityAvailableToReturn',assettransRecord.receiptquantity);
				newReceiptInputRecord.set('rotassetnum',assettransRecord.assetnum);
				
				newReceiptInputRecord.set('matrectransid',assettransRecord.matrectransid);
				newReceiptInputRecord.set('linetype',returnIssueType);
				newReceiptInputRecord.set('rotassetnum',assettransRecord.assetnum);
				newReceiptInputRecord.set('tostoreloc',assettransRecord.toloc);
				newReceiptInputRecord.set('tobin',assettransRecord.tobin);
				newReceiptInputRecord.set('tolot',assettransRecord.tolot);
				newReceiptInputRecord.set('transdate',assettransRecord.transdate);
				newReceiptInputRecord.set('enterby', UserManager.getCurrentUser());
				newReceiptInputRecord.set('polinenum',assettransRecord.polinenum);
				newReceiptInputRecord.set('asn',assettransRecord.asn);
				newReceiptInputRecord.set('remark',assettransRecord.remark);
				newReceiptInputRecord.set('ponum',assettransRecord.ponum);
				newReceiptInputRecord.set('actualdate',assettransRecord.actualdate);
				
				newReceiptInputRecord.set('exchangerate',assettransRecord.exchangerate);
				newReceiptInputRecord.set('packingslipnum',assettransRecord.packingslipnum);
				newReceiptInputRecord.set('qtyrequested',assettransRecord.qtyrequested);
				newReceiptInputRecord.set('invoicenum',assettransRecord.invoicenum);
				newReceiptInputRecord.set('conditioncode',assettransRecord.conditioncode);
				newReceiptInputRecord.set('gldebitacct',assettransRecord.gldebitacct);
				newReceiptInputRecord.set('positeid',assettransRecord.positeid);
				newReceiptInputRecord.set('siteid',assettransRecord.siteid);
				
			});

		},
		
		/**
		 * Creates matrectrans based on Assettrans properties
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} assettransSet - Assettrans data set
		 * @param	{Object} matrectransSet - Matrectrans data set
		 * @public
		 */
		mergeAssettransWithMatrectrans : function(eventContext, assettransSet, matrectransSet){
			
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var returnIssueType = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'RETURN');
			
			arrayUtil.forEach (assettransSet.data, function (assettransRecord) {

				var newReceiptInputRecord = matrectransSet.createNewRecord();
				
				/* required for display */
				newReceiptInputRecord.set('itemnum',assettransRecord.itemnum);
				newReceiptInputRecord.set('receivedunit',assettransRecord.receivedunit);
				newReceiptInputRecord.set('itemdesc',assettransRecord.assetdescription);
				newReceiptInputRecord.set('rotassetnum',assettransRecord.assetnum);
				
				if(assettransRecord.assetnum==null){
					newReceiptInputRecord.set('qtyToBeReturned',newReceiptInputRecord.receiptquantity);
					newReceiptInputRecord.set('receiptquantity',assettransRecord.receiptquantity);
				} else {
					newReceiptInputRecord.set('itemrotating',true);
					newReceiptInputRecord.set('qtyToBeReturned',1);
					newReceiptInputRecord.set('receiptquantity',1);	
				}
				
				newReceiptInputRecord.set('matrectransid',parseInt( assettransRecord.matrectransid ));
				newReceiptInputRecord.set('issuetype',returnIssueType);
				//newReceiptInputRecord.set('linetype',returnIssueType);
				newReceiptInputRecord.set('rotassetnum',assettransRecord.assetnum);
				newReceiptInputRecord.set('tostoreloc',assettransRecord.toloc);
				newReceiptInputRecord.set('tobin',assettransRecord.tobin);
				newReceiptInputRecord.set('tolot',assettransRecord.tolot);
				newReceiptInputRecord.set('transdate',assettransRecord.transdate);
				newReceiptInputRecord.set('enterby', UserManager.getCurrentUser());
				newReceiptInputRecord.set('polinenum',assettransRecord.polinenum);
				newReceiptInputRecord.set('asn',assettransRecord.asn);
				newReceiptInputRecord.set('remark',assettransRecord.remark);
				newReceiptInputRecord.set('ponum',assettransRecord.ponum);
				newReceiptInputRecord.set('actualdate',assettransRecord.actualdate);
				
				newReceiptInputRecord.set('exchangerate',assettransRecord.exchangerate);
				newReceiptInputRecord.set('packingslipnum',assettransRecord.packingslipnum);
				newReceiptInputRecord.set('qtyrequested',assettransRecord.qtyrequested);
				newReceiptInputRecord.set('invoicenum',assettransRecord.invoicenum);
				newReceiptInputRecord.set('conditioncode',assettransRecord.conditioncode);
				newReceiptInputRecord.set('gldebitacct',assettransRecord.gldebitacct);
				newReceiptInputRecord.set('positeid',assettransRecord.positeid);
				newReceiptInputRecord.set('siteid',assettransRecord.siteid);
				
			});

		},
		
		/**
		 * Creates new receiptInput instance based on Matrectrans properties
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} matrectransSet - Matrectrans data set
		 * @param	{Object} receiptInputSet - ReceiptInput data set
		 * @public
		 */
		convertMatrectransToReceipt : function(matrectransSet, receiptInputSet){
			
			arrayUtil.forEach (matrectransSet.data, function (matrectransRecord) {

				var newReceiptInputRecord = receiptInputSet.createNewRecord();
				
				/* required for display */
				newReceiptInputRecord.set('itemnum',matrectransRecord.itemnum);
				newReceiptInputRecord.set('receivedunit',matrectransRecord.receivedunit);
				newReceiptInputRecord.set('itemdesc',matrectransRecord.itemdesc);
				newReceiptInputRecord.set('quantityAvailableToReturn',matrectransRecord.receiptquantity);
				
				newReceiptInputRecord.set('ponum',matrectransRecord.ponum);
				newReceiptInputRecord.set('polinenum',matrectransRecord.polinenum);
				newReceiptInputRecord.set('tostoreloc',matrectransRecord.tostoreloc);
				newReceiptInputRecord.set('exchangerate',matrectransRecord.exchangerate);
				newReceiptInputRecord.set('itemsetid',matrectransRecord.itemsetid);
				newReceiptInputRecord.set('currencylinecost',matrectransRecord.currencylinecost);
				newReceiptInputRecord.set('orderqty',matrectransRecord.qtyToBeReturned);
				newReceiptInputRecord.set('matrectransid',matrectransRecord.matrectransid);
				newReceiptInputRecord.set('gldebitacct',matrectransRecord.gldebitacct);
				newReceiptInputRecord.set('transdate',matrectransRecord.transdate);
				newReceiptInputRecord.set('tobin',matrectransRecord.tobin);
				newReceiptInputRecord.set('tolot',matrectransRecord.tolot);
				newReceiptInputRecord.set('conditioncode',matrectransRecord.conditioncode);
				newReceiptInputRecord.set('enterby', UserManager.getCurrentUser());
				newReceiptInputRecord.set('actualdate',matrectransRecord.actualdate);
				newReceiptInputRecord.set('linetype',matrectransRecord.linetype);
				newReceiptInputRecord.set('remark',matrectransRecord.remark);
				newReceiptInputRecord.set('asn',matrectransRecord.asn);
				newReceiptInputRecord.set('tostoreloc',matrectransRecord.tostoreloc);
				newReceiptInputRecord.set('invoicenum',matrectransRecord.invoicenum);
				newReceiptInputRecord.set('positeid',matrectransRecord.positeid);
				newReceiptInputRecord.set('siteid',matrectransRecord.siteid);
				newReceiptInputRecord.set('qtyrequested',matrectransRecord.qtyrequested);
				
				
			});

		},
		
		/**
		 * Show or Hide rotating asset value from list
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		showHideRotatingAssetAttributes : function(eventContext){

			var rotating = eventContext.getCurrentRecord().get('rotassetnum');
			
			//hide split button on nonrotating record
			if(rotating){
				eventContext.setDisplay(true);
				return;
			}else{
				eventContext.setDisplay(false);
				return;
			}
		},
		
		/**
		 * Show or Hide non rotating asset value from list
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		showHideNonRotatingAssetAttributes : function(eventContext){

			var rotating = eventContext.getCurrentRecord().get('rotassetnum');
			
			//hide split button on nonrotating record
			if(rotating){
				eventContext.setDisplay(false);
				return;
			}else{
				eventContext.setDisplay(true);
				return;
			}
		},
		
		/**
		 * Set return quantity editable or not
		 * 
		 * @memberof module:application/handlers/ManagePurchaseOrderHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		setEditable : function(eventContext){
			
			var rotating = eventContext.getCurrentRecord().get('rotassetnum');
			var receiptInputRecord = CommonHandler._getAdditionalResource(eventContext,'receiptInput').getCurrentRecord();
			var quantityAvailableToReturn = receiptInputRecord.getRuntimeFieldMetadata('quantityAvailableToReturn');
			
			//hide split button on nonrotating record
			if(rotating){
				quantityAvailableToReturn.set('readonly', true);
				return;
			}else{
				quantityAvailableToReturn.set('readonly', false);
				return;
			}
		},

		//#region Loc-In: Customize methods
		/* validateActualDateItems: function(eventContext) {
			var self = this;
			var currentRecord = eventContext.getResource().getCurrentRecord();
			if(!currentRecord.actualdate){
				var msg = MessageService.createStaticMessage("emptyActualDate").getMessage();
				if (self.ui.getCurrentDialog().id == 'Platform.DateTimeLookup') {
					setTimeout(function(){
						self.ui.showMessage(msg);
				    },10); 
					
				}
			}
		}, */

		transitionToAttachment: function(eventContext){
			eventContext.application.showBusy();
			eventContext.ui.show("Transfers.AttachmentsView");
		},

		displayAttachmentAction: function(eventContext){
			var historyView = WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-1].id;
				
			if(historyView == 'Transfers.ReceivePurchaseOrderItemsSeachView'
			  || historyView == 'Transfers.ShipmentItemsListView'){
				eventContext.setDisplay(true);
			} else {
				eventContext.setDisplay(false);
			}
		},
		//#endregion Loc-Out: Customize methods
	});
});
