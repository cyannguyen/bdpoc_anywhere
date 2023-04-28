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
 * Module returning a class to create and handle receipt for Shipment & Transfers application.
 * @module application/handlers/ReceiveShipmentHandler
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
define("application/handlers/ReceiveShipmentHandler", 
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
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
	     * @property {String} _className Name of this module
	     * @private
	     */
		_className: "[application.handlers.ReceiveShipmentHandler]",
		
		 /**
         * Validation for quantity field on Shipment Receive Item.
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - It brings context into function
         * @param	{Object} currentRecord - Object record to be validated against
         * @return	{Boolean} True if valid object, false otherwise.
         * @public
         */
/**@memberOf application.handlers.ReceiveShipmentHandler */
		validateNumericFieldShippedItem : function(eventContext, currentRecord){
			if(!currentRecord){
				currentRecord = eventContext.getCurrentRecord();
			}
			var item = currentRecord.get('itemnum');
			var qty = currentRecord.get('quantitydue');
			var rotassetnum = currentRecord.get('rotassetnum');
			var qtyAvailable = currentRecord.get('quantityAvailableToReceive');
			
			//verify if issue quantity is a positive number
			if (NumberUtil.parse(qty, this.application.getUserLocale()) < 0) {
				var msg = MessageService.createResolvedMessage('quantityPositive');
				this.ui.showMessage(msg);
				return false;
			}
			//verify if issue quantity is a valid number
			else if(qty==null || qty==undefined || isNaN(NumberUtil.parse(Number(qty)))){
				var msg = MessageService.createResolvedMessage('newReadingNaN', [qty]);
				this.ui.showMessage(msg);
				return false;
			}
			//quantity entered must not be greater than quantity available to receive
			else if(qtyAvailable < qty){
				var msg = MessageService.createResolvedMessage('quantityItemValidation', [qtyAvailable, item]);
				this.ui.showMessage(msg);
				return false;
			}
			//the quantity for rotating item must be 1
			else if(rotassetnum && qty >1){
				var msg = MessageService.createResolvedMessage('quantityForRotatingAsset', [item]);
				this.ui.showMessage(msg);
				return false;
			}
			return true;
		},
		
		/**
		 * Validate if wonum or gldebitacct are populated and Issue To field is empty 
		 * Show message indicating Issue To field is required.
		 *
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @return	{*} Sends transaction up to server
		 * @public
		 */
		validateIssueTo : function(eventContext, elem){
			
			var issue = elem.get("issue");
	
			//only validate if issue == true.
			if(issue == true){
				if (elem.issueTo == undefined || elem.issueTo == null) {
					var msg = MessageService.createResolvedMessage('issueToRequired', [elem.itemnum]);
					this.ui.showMessage(msg);
					return false;
				}	
			}

			return true;
		},

		/**
		 * Shipment Receive Item action.
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @return	{*} Sends transaction up to server
		 * @public
		 */
		shipmentReceiveItem : function(eventContext){ 
			//show busy
			eventContext.application.showBusy();

			var domainitemtypes = CommonHandler._getAdditionalResource(eventContext,'domainitemtype');
						
			var receiveExtPo = false;
			if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.ReceivePurchaseOrderItemsSeachView" ||
					WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id == "Transfers.MultiPOListView"){
				receiveExtPo = true;
			}
			
			//iterate over all records on list and check if at least on item has positive quantity
			var countItemsPositiveQuantity = 0;
			var issueToErrorThrown = false;
			for(var index in eventContext.getResource('receiptInput').data){ 
				var elem = eventContext.getResource('receiptInput').data[index];

				if (!elem.itemnum && elem.quantitydue > 0) { //IJ08694
					// record must have an itemnum otherwise it can't be received
					eventContext.ui.showMessage(msg);
					return;
				}
				
				if(issueToErrorThrown) {					
					eventContext.application.hideBusy();
					return;
				}
					
				
				//validate IssueTo for External Purchase Order Receiving
				if(receiveExtPo){
					var linetype = SynonymDomain.resolveToInternal(domainitemtypes,elem.linetype);
					if(linetype=='TOOL' && elem.quantitydue>0){
						if(!this.validateIssueTo(eventContext,elem)){
							issueToErrorThrown = true;
							eventContext.application.hideBusy();
							return;
						};
					};
				}

				if(!this.validateNumericFieldShippedItem(eventContext, elem)){
					eventContext.application.hideBusy();
					return;
				}
				if(elem.get('quantitydue') > 0){
					countItemsPositiveQuantity++;
				}
			}
			
			if(issueToErrorThrown){
				eventContext.application.hideBusy();
				return;
			}
			
			if(countItemsPositiveQuantity == 0){
				var msg = MessageService.createResolvedMessage('quantityPositive');
				eventContext.application.hideBusy();
				eventContext.ui.showMessage(msg);				
				return;
			}
			
			var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var issuetype ='';
			
			if(receiveExtPo){
				issuetype = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'RECEIPT');
			} else {
				issuetype = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'SHIPRECEIPT');				
			}


			//construct a list of items to display
			ModelService.empty("receivedMatrectrans").then(function(matrectransSet){
				var currentResource = eventContext.getResource();
				currentResource.foreach(function(currentRecord){
					
					//check if the qty to receive is valid
					if(currentRecord.quantitydue > 0){
						//create matrectrans record
						matrectrans = matrectransSet.createNewRecord();
						
						matrectrans.set('shipment', currentRecord.shipmentnum);
						matrectrans.set('shipmentlinenum', currentRecord.shipmentlinenum);
						//var linecost = currentRecord.qtyrequested * currentRecord.unitcost;
						//matrectrans.set('linecost', linecost);
						//receiptref comes from matrectransid of the first transaction of matrectrans
						matrectrans.set('receiptref', Number(currentRecord.matrectransid)); 
						matrectrans.set('ponum', currentRecord.ponum);
						matrectrans.set('polinenum', currentRecord.polinenum);
						matrectrans.set('issuetype', issuetype);
						//matrectrans.set('unitcost', currentRecord.unitcost);
						matrectrans.set('qtyrequested', currentRecord.qtyrequested);
						matrectrans.set('itemnum',currentRecord.itemnum);
						matrectrans.set('itemdesc',currentRecord.itemdesc);
						matrectrans.set('actualcost', currentRecord.actualcost);
						matrectrans.set('rejectqty', currentRecord.rejectqty);
						matrectrans.set('enterby', currentRecord.enterby);
						matrectrans.set('outside', currentRecord.outside);
						matrectrans.set('issue', currentRecord.issue);
						matrectrans.set('currencycode', currentRecord.currencycode);
						matrectrans.set('loadedcost', currentRecord.loadedcost);
						matrectrans.set('prorated', currentRecord.prorated);
						matrectrans.set('curbal', currentRecord.curbal);
						matrectrans.set('orgid', currentRecord.orgid);
						matrectrans.set('siteid', currentRecord.siteid);
						matrectrans.set('costinfo', currentRecord.costinfo);
						matrectrans.set('enteredastask', currentRecord.enteredastask);
						matrectrans.set('fromsiteid',currentRecord.fromsiteid);
						matrectrans.set('linetype', currentRecord.linetype);
						matrectrans.set('consignment', currentRecord.consignment);
						matrectrans.set('receiptquantity', currentRecord.quantitydue);//same works if use quantity
						matrectrans.set('conversion', currentRecord.conversion);
						//#region Loc-In: set Actual Date, tobin
						matrectrans.set('actualdate', currentRecord.actualdate);
						matrectrans.set('tobin', currentRecord.tobin);
						matrectrans.set('tolot', currentRecord.tolot);
						matrectrans.set('externalrefid', 'FROMMOBILE');
						//#endregion Loc-Out: set Actual Date, tobin
						
						if(receiveExtPo){
							matrectrans.set('issueto', currentRecord.issueTo);
							matrectrans.set('positeid', currentRecord.positeid);
						}
					}				
				});

				//this is here because when we are doing the search we are getting: <__created__><__search__> and this
				//makes our records not appears on search. So, removing the created part, we can see they inside set on search.
				arrayUtil.forEach(matrectransSet.data, function(data){
					data.removeFromQueryBase ("__created__");
				});
				
				ModelService.save(matrectransSet).then(function() {
					//this clear should be enough, but it is not working well, for this reason we are saving after removing the created query string.	
					ModelService.clearSearchResult(matrectransSet);
					//#region Loc-In: clear search fields
					eventContext.application["application.handlers.ReceiveShipmentHandler"].clearSearchFields(eventContext);
					//#endregion Loc-Out: clear search fields
					if(receiveExtPo){
						//eventContext.ui.returnToView("Transfers.ReceivePurchaseOrderItemsSeachView");
						 eventContext.ui.show("Transfers.TransactionSubmitDialog");
					} else {
						eventContext.ui.returnToView("Transfers.ReceiveShippedItemsSeachView");
					}
					eventContext.application.hideBusy();
					
				}).otherwise(function(err){
					eventContext.application.hideBusy();
					eventContext.ui.showMessage(err);						
				});
			}).otherwise(function(err){
				eventContext.application.hideBusy();
				eventContext.ui.showMessage(err);						
			});
			
		},
				
		/**
		 * Search from Shipment Search View
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object}	eventContext - Brings context into function
		 * @return	{}			Process list of shipments available for receipt
		 * @public
		 */
		searchShipment: function(eventContext){
			var filter = [];
			var oslcQueryParameters = {};
			var transfersRecord = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var siteid = UserManager.getInfo("defsite");
			var shipmentnum = transfersRecord.shipment;
			//#region Loc-In: Add FromNo, DocumentRef
			var formno = transfersRecord.formno;
			var documentref = transfersRecord.documentref;
			//#endregion Loc-Out: Add FromNo, DocumentRef
			var self = this;
			var emptySearchResultMsg = MessageService.createStaticMessage("emptySearchResult").getMessage();
			var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var shiptransferIssueType = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'SHIPTRANSFER');
			var shipreturnIssueType = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'SHIPRETURN');
			var transferIssueType = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'TRANSFER');
			var domaininvusereceipts = CommonHandler._getAdditionalResource(eventContext,'domaininvusereceipts');
			
			//verify if we have at least one field filled
			//#region Loc-In: Loc-In: Add FromNo, DocumentRef
			//if(!shipmentnum){{
				if(!shipmentnum && !formno && !documentref){
			//#endregion Loc-Out: Loc-In: Add FromNo, DocumentRef
				self.ui.showMessage(emptySearchResultMsg);
				return;
			}
			
			var transfersHand = new TransfersHandler();
			
			//check for errors
			if (transfersHand.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
			
			eventContext.application.showBusy();	
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){

						//#region Loc-In: Add FormNo, DocumentRef
						//filter.push({shipmentnum: shipmentnum});

						if(formno){
							filter.push({formnumber: '"'+formno+'"'});
						}
						if(documentref){
							filter.push({documentref: '"'+documentref+'"'});
						}
						
						if(shipmentnum){
							filter.push({shipmentnum: shipmentnum});
						}
						//#endregion Loc-Out: Add FormNo, DocumentRef
						filter.push({siteid: siteid});
						
						
						ModelService.all('shipment',PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(searchResultSet){
							ModelService.clearSearchResult(searchResultSet);	
							
							var shipmentPromise =  ModelService.filtered('shipment', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
							shipmentPromise.then(function(shipmentSet){
								
								//verify if search result data is empty
								if(shipmentSet.data.length == 0){
									self.ui.showMessage(emptySearchResultMsg);
									return;
								}

								//before look at shipmentline we need to guarantee that it is available
								shipmentSet.data[0].getModelDataSet("shipmentline",true).then(function(test){ 
										
									//verify if search result data is empty
									if(shipmentSet.data.length == 0){
										self.ui.showMessage(emptySearchResultMsg);
										return;
									}

									filter = [];
									//#region Loc-In: Add FormNo, DocumentRef
									//filter.push({shipment: shipmentnum});
									if(shipmentnum){
										filter.push({shipment: shipmentnum});
									}
									if(formno){
										filter.push({formnumber: formno});
									}
									if(documentref){
										filter.push({documentref: documentref});
									}
									//#region Loc-Out: Add FormNo, DocumentRef
									
									var matrectransPromise =  ModelService.filtered('receivedMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
									matrectransPromise.then(function(matrectransSet){
										
										//for each shipmentline we need to calculate the quantity to decided if there is something to receive
										if(!shipmentSet || !shipmentSet.data || !shipmentSet.data[0] || !shipmentSet.data[0].shipmentline){
											return;
										}
										
										//verify if search result data is empty
										if(matrectransSet.data.length == 0){
											self.ui.showMessage(emptySearchResultMsg);
											return;
										}
										
										//construct a list of items to display
										ModelService.empty("receiptInput").then(function(receiptInputSet){
											
											//verify if search result data is empty
											if(shipmentSet.data.length == 0){
												self.ui.showMessage(emptySearchResultMsg);
												return;
											}
		
											//we need a count to know if there are something to show on a list
											var count = 0;
											
											//iterate over each shipmentline record
											shipmentSet.data[0].shipmentline.data.forEach(function(shipmentlineElem){
												
												//verify if rectransid is null
												if(!shipmentlineElem.rectransid){
													
													/*
													 * This logic comes from maximo - file: ReceiptInputSet.java and method: createShipmentReceiptsPrep
													 */
													var shipmentLineConversion = 0;
													if(shipmentlineElem.conversion){
														shipmentLineConversion = shipmentlineElem.conversion;
													}
													if (shipmentLineConversion == 0){
														shipmentLineConversion = 1;
													}
				
													var qtySum = 0;
													var matrectransQuantityDue = 0;
													var receivedunit = [];
													//make a copy of shiptransfer item to fill some values on receive action
													var matrectransShipTransfer = null;
													matrectransSet.data.forEach(function(matrectransElem,matrectransPos,matrectransArray){ 
														if(matrectransElem.shipmentlinenum == shipmentlineElem.shipmentlinenum){
															//now we have a copy of matrectrans to fill some attribute values
															if(matrectransElem.issuetype == shiptransferIssueType){
																matrectransShipTransfer = matrectransElem;
															}
															//make the calculus of quantity that we can receive
															else if (matrectransElem.issuetype != transferIssueType && matrectransElem.issuetype != shipreturnIssueType){
																qtySum += matrectransElem.conversion / shipmentLineConversion * matrectransElem.quantity;
															}
														}
														//if issuetype is null, uses receivedunit
														if(!receivedunit[matrectransElem.itemnum]){
															receivedunit[matrectransElem.itemnum] = matrectransElem.receivedunit || matrectransElem.issueunit;
														}
													});
													matrectransQuantityDue = shipmentlineElem.shippedqty - qtySum;
													if(matrectransQuantityDue > 0){
														//put on list to display
														var newReceiptInputRecord = receiptInputSet.createNewRecord();
														newReceiptInputRecord.set('itemnum',shipmentlineElem.itemnum);
														newReceiptInputRecord.set('itemdesc',shipmentlineElem.itemdescription);
														newReceiptInputRecord.set('status',matrectransShipTransfer.status);
														newReceiptInputRecord.set('location',shipmentlineElem.tostoreloc);
														newReceiptInputRecord.set('qtyrequested',shipmentlineElem.shippedqty);
														newReceiptInputRecord.set('shipmentlineid',shipmentlineElem.shipmentlineid);
														newReceiptInputRecord.set('shipmentlinenum',shipmentlineElem.shipmentlinenum);
														newReceiptInputRecord.set('orgid',matrectransShipTransfer.orgid);
														newReceiptInputRecord.set('siteid',matrectransShipTransfer.siteid);
														newReceiptInputRecord.set('ponum',matrectransShipTransfer.ponum);
														newReceiptInputRecord.set('polinenum',matrectransShipTransfer.polinenum);
														newReceiptInputRecord.set('fromsiteid',matrectransShipTransfer.fromsiteid);
														newReceiptInputRecord.set('tostoreloc',matrectransShipTransfer.tostoreloc);
														newReceiptInputRecord.set('shipmentnum',matrectransShipTransfer.shipment);
														newReceiptInputRecord.set('unitcost',matrectransShipTransfer.unitcost);
														newReceiptInputRecord.set('qtyrequested',shipmentlineElem.shippedqty);
														newReceiptInputRecord.set('actualcost',matrectransShipTransfer.actualcost);
														newReceiptInputRecord.set('rejectqty',matrectransShipTransfer.rejectqty);
														newReceiptInputRecord.set('enterby',matrectransShipTransfer.enterby);
														newReceiptInputRecord.set('outside',matrectransShipTransfer.outside);
														newReceiptInputRecord.set('issue',matrectransShipTransfer.issue);
														newReceiptInputRecord.set('currencycode',matrectransShipTransfer.currencycode);
														newReceiptInputRecord.set('loadedcost',matrectransShipTransfer.loadedcost);
														newReceiptInputRecord.set('prorated',matrectransShipTransfer.prorated);
														newReceiptInputRecord.set('curbal',matrectransShipTransfer.curbal);
														newReceiptInputRecord.set('costinfo',matrectransShipTransfer.costinfo);
														newReceiptInputRecord.set('enteredastask',matrectransShipTransfer.enteredastask);
														newReceiptInputRecord.set('linetype',matrectransShipTransfer.linetype);
														newReceiptInputRecord.set('consignment',matrectransShipTransfer.consignment);
														newReceiptInputRecord.set('conversion',matrectransShipTransfer.conversion);
														newReceiptInputRecord.set('matrectransid',matrectransShipTransfer.matrectransid);
														newReceiptInputRecord.set('receivedunit',(matrectransShipTransfer.issueunit || receivedunit[matrectransShipTransfer.itemnum]));
														
														if(matrectransShipTransfer.rotassetnum){
															matrectransQuantityDue = 1;
															newReceiptInputRecord.set('rotassetnum',matrectransShipTransfer.rotassetnum); 
														}
														newReceiptInputRecord.set('quantitydue',matrectransQuantityDue);
														newReceiptInputRecord.set('quantityAvailableToReceive',matrectransQuantityDue);
														//#region Loc-In: set default actualdate
														newReceiptInputRecord.setDateValue('actualdate', eventContext.application.getCurrentDateTime());
														//#endregion Loc-Out: set default actualdate
														count++;
													} 
													/*
													 * end of logic that comes from maximo
													 */
												}
											//final iteration over each shipmentline record
											});
											
											//#region Loc-In: add hideBusy
											eventContext.application.hideBusy();
											//#endregion Loc-Out: add hideBusy
											if(count > 0){
												ModelService.clearSearchResult(matrectransSet);
												receiptInputSet.resourceID = "receiptInput";
												receiptInputSet.sort('itemnum');
												eventContext.application.addResource(receiptInputSet);
												eventContext.ui.show("Transfers.ShipmentItemsListView");
											}
											//verify if the shipment is on complete status
											else if(SynonymDomain.resolveToInternal(domaininvusereceipts,shipmentSet.data[0].receipts) == 'COMPLETE'){
												var msg = MessageService.createStaticMessage("shipmentReceived").getMessage();
												self.ui.showMessage(msg);
											}
											else{
												self.ui.showMessage(emptySearchResultMsg);
											}

										//receiptInputSet
										}).otherwise(function(error){
											//#region Loc-In: add hideBusy
											eventContext.application.hideBusy();
											//#endregion Loc-Out: add hideBusy
											Logger.trace(self._className + ": " + error);
										});
										
									//matrectransPromise
									}).otherwise(function(error){
										//#region Loc-In: add hideBusy
										eventContext.application.hideBusy();
										//#endregion Loc-Out: add hideBusy
										Logger.trace(self._className + ": " + error);
									});
								// shipment	
								}).otherwise(function(error){
									//#region Loc-In: add hideBusy
									eventContext.application.hideBusy();
									//#endregion Loc-Out: add hideBusy
									Logger.trace(self._className + ": " + error);
								});
							}).otherwise(function(error){
								//#region Loc-In: add hideBusy
								eventContext.application.hideBusy();
								//#endregion Loc-Out: add hideBusy
								Logger.trace(self._className + ": " + error);
							});						
						});						
					}).otherwise(function(error){
						//#region Loc-In: add hideBusy
						eventContext.application.hideBusy();
						//#endregion Loc-Out: add hideBusy
						Logger.trace(self._className + ": " + error);
					});			
				}else{
					//#region Loc-In: add hideBusy
					eventContext.application.hideBusy();
					//#endregion Loc-Out: add hideBusy
					self.ui.showMessage(MessageService.createStaticMessage('connectionFailure').getMessage());
				}
				//#region Loc-In: move hideBusy into else
				//eventContext.application.hideBusy();
				//#endregion Loc-Out: move hideBusy into else
			});	
			
		},
		
		/**
		 * Dynamic fetch for the Shipment lookup view
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} 	eventContext - Brings context into function
		 * @return	{}			Process list of shipments for lookup
		 * @public
		 */
		shipmentLookup : function(eventContext){
			var self = this;
			var siteid = UserManager.getInfo("defsite");
			var user = UserManager.getCurrentUser(); //IJ21206: Get the username to add into the filter
			var filter = [{siteid: siteid, enterby: user}]; //IJ21206: The lookup i now returning the records from the current user only.
			var domaininvusereceipts = CommonHandler._getAdditionalResource(eventContext,'domaininvusereceipts');
			var completeStatus = SynonymDomain.resolveToDefaultExternal(domaininvusereceipts, 'COMPLETE');
			var assetPromise =  ModelService.filtered('shipment', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, null, false);
			assetPromise.then(function(shipmentSet){
				shipmentSet.resourceID = 'shipment';
				eventContext.application.addResource(shipmentSet);
				
				shipmentSet.filter('invusenum != null');
				
				//make the filter based on history:
				// "Transfers.ReceiveShippedItemsSeachView" - do not show COMPLETE shipments
				if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-1].id == "Transfers.ReceiveShippedItemsSeachView"){
					shipmentSet.filter("receipts != \""+completeStatus+"\"");
				}
				
				//verify if search result data is empty
				if(shipmentSet.data.length == 0){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
				}
				else{
					eventContext.ui.show("Transfers.ShipmentListView");
				}
			});
		},
		
		/**
		 * Manage user selection of shipment from lookup
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} 	eventContext - Brings context into function
		 * @return	{}			Return shipment selected to previous screen
		 * @public
		 */
		selectShipmentSelection :  function(eventContext){
			var shipmentnum = eventContext.getCurrentRecord().get('shipmentnum');
			var transfers = eventContext.application.getResource('transfers').getCurrentRecord(); 
			transfers.set('shipment',shipmentnum);
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Cancel button for Shipment Select View
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public 	
		 */
		cancelShipmentSelection : function(eventContext){
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Clear shipment selection from Shipment Select View
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		clearShipmentSelection : function(eventContext){
			var transfers = eventContext.application.getResource('transfers').getCurrentRecord(); 
			transfers.set('shipment','');
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Transits back to Search view of shipment for receipt
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		transitsBackToReceiveShippedItemsSeachView : function(eventContext) {
			eventContext.application['application.handlers.ReceiveShipmentHandler'].clearSearchFields(eventContext);
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		
		/**
		 * Transits back to Search view of shipment for return
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		transitsBackToShipmentSearchView :  function (eventContext) {
			eventContext.application['application.handlers.ReceiveShipmentHandler'].clearSearchFields(eventContext);
			eventContext.ui.returnToView("Transfers.ManageReceivedShipmentSeachView");
		},
		
		/**
		 * Cancel receiving from shipped list items view
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		shipmentCancelItem : function(eventContext){ 
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Method deprecated
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @private
		 */
		searchVoidShipment :  function (eventContext) {
			
			this.searchShippedItemsToVoid(eventContext);
			//bypassing list of shipped items for test
			//eventContext.ui.show("Transfers.RecordsToVoidListView");
		},
		
		
		/**
		 * Search items already received
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 * @throws {PlatformRuntimeException} If error is found.
		 */
		searchReceivedItems :  function (eventContext) {
			
			var filter = [];
			var oslcQueryParameters = {};
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			
			var siteid = UserManager.getInfo("defsite");
			var shipmentNum = transfersLocalResource.shipment;
			//#region Loc-In: Add FromNo, DocumentRef
			var formno = transfersLocalResource.formno;
			var documentref = transfersLocalResource.documentref;
			//#endregion Loc-Out: Add FromNo, DocumentRef
			
			var self = this;
			
			//verify if we have at least one field filled
			//#region Loc-In: Add partNo
			//if(!shipmentNum){
				if(!shipmentNum && !formno && !documentref){
			//#endregion Loc-Out: Add partNo
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

						//#region Loc-In: Add FormNo, DocumentRef
						//filter = self.buildFilterForReceivedItems(eventContext, siteid, shipmentNum);
						filter = self.buildFilterForReceivedItems(eventContext, siteid, shipmentNum, formno, documentref);
						//#endregion Loc-Out: Add FormNo, DocumentRef

						var matrectransPromise =  ModelService.filtered('receivedMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matrectransPromise.then(function(matrectransSet){
							
							//verify if search result data is empty
							if(matrectransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							//#region Loc-In: filter list by condition [issuetype='SHIPRECEIPT' and not exists (select 1 from matrectrans matsub where receiptref=matrectrans.matrectransid) ]
							/* ModelService.clearSearchResult(matrectransSet);
							matrectransSet.resourceID = 'receivedMatrectrans';
							matrectransSet.sort('itemnum');
							eventContext.application.addResource(matrectransSet);
							eventContext.ui.show("Transfers.ReceivedItemsListView"); */

							else {
								filter = [];

								arrayUtil.forEach(matrectransSet.data, function(matrectrans){
									filter.push({receiptref : matrectrans.matrectransid});
								});
								
								ModelService.filtered('receivedMatrectrans', null, filter, 1000, true, true, oslcQueryParameters, false).then(function(refSet) {
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
									matrectransSet.resourceID = 'receivedMatrectrans';
									matrectransSet.sort('itemnum');
									eventContext.application.addResource(matrectransSet);
									eventContext.ui.show("Transfers.ReceivedItemsListView");
									
								}).otherwise(function(error){
									Logger.trace(self._className + ": " + error);
								});	
							}
							//#endregion Loc-Out: filter list by condition [issuetype='SHIPRECEIPT' and not exists (select 1 from matrectrans matsub where receiptref=matrectrans.matrectransid) ]
							
							
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
		 * Prepare data set of matrectrans objects for return/void process
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matrectransSet - Set of raw matrectrans objects
		 * @param	{String} returnProcess - Type of the process
		 * @return	{promise} Filtered matrectrans data set
		 * @public
		 */
		prepareMatrectransListToReturn :  function (eventContext, matrectransSet, returnProcess) {
			
			var prepDeferred = new Deferred();
			var receiptStatusSet = CommonHandler._getAdditionalResource(eventContext,'domainreceiptstatus');
			var deferreds = [];
			var invalidMarectrans = [];
			var isReturnProcess = true;
			var isVoidProcess = false;
			
			//Setting variables according to process type
			if (returnProcess.toLowerCase() == 'void'){
				isReturnProcess = false;
				isVoidProcess = true;
			}
			
			//For each matrectrans
			for(var i = 0; i < matrectransSet.data.length; i++) {
				
				var matrectransRecord = matrectransSet.data[i];
				
				//Get rotating attribute of item for matrectrans element
				var isRotatingItem = matrectransRecord.itemrotating ? true : false;
				
				//If returning item and item is rotating = remove item from list
				if (isReturnProcess && isRotatingItem){
					invalidMarectrans.push(matrectransRecord.matrectransid);
					continue;
				}
				
				var matrecStatus = matrectransRecord.status;
				//If voiding item and
				if (isVoidProcess){
					
					//If item is rotating and matrectrans status is not WINSP OR WASSET = remove item from list
					if (isRotatingItem && (! ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WASSET') 
							|| matrecStatus ==  SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WINSP') ) ) ) {
						invalidMarectrans.push(matrectransRecord.matrectransid);
						continue;
					}
				
					//If receipt status equals to COMP or WASSET or WINSP	AND 	inspectedqty attribute from receipt is greater than 0 = remove from list
					if ( ( matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'COMP') 
							|| matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WASSET') 
							|| matrecStatus == SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'WINSP') )  && matrectransRecord.inspectedqty > 0 ) {
						invalidMarectrans.push(matrectransRecord.matrectransid);
						continue;
					} 

					//If list of RETURNSHIPRECEIPTS relationship is not empty = remove item from list
					var isReturnShipReceiptsEmptyPromise = this.isReturnShipReceiptsRelationEmpty(eventContext, matrectransRecord);
					deferreds.push(isReturnShipReceiptsEmptyPromise);
					isReturnShipReceiptsEmptyPromise.then( function (response) {
						
						if (!response.isEmpty){
							invalidMarectrans.push(response.object.matrectransid);
						}
					});
				}
				
				var qtyToBeReturnedPromise = this.calcQuantityToReturn(eventContext, matrectransRecord, isVoidProcess);
				deferreds.push(qtyToBeReturnedPromise);
				qtyToBeReturnedPromise.then( function (response) {
					response.object.qtyToBeReturned = response.qty;
					if (response.qty == 0) {
						invalidMarectrans.push(response.object.matrectransid);
					}
					Logger.trace("quantity response is : " + response.qty);
				});
				
			}
			
			all(deferreds).then(function(results){
				
				arrayUtil.forEach (invalidMarectrans, function (id) {
					matrectransSet.filter('matrectransid != "' + id +'"');
				});
				
				ModelService.clearSearchResult(matrectransSet);
				matrectransSet.resourceID = 'matrectrans';
				eventContext.application.addResource(matrectransSet);
				
				prepDeferred.resolve();
				
			});
			
			return prepDeferred.promise;
			
		},
		
		/**
		 * Calculate quantity for return
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
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
			
			filter.push ( {receiptref : matRecParent.matrectransid.toString()} ) ;
			//filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'SHIPRETURN') } );
			//filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'VOIDSHIPRECEIPT') } );
			oslcQueryParameters = {};
			
			var matrectransChildrenPromise =  ModelService.filtered('receivedMatrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
			matrectransChildrenPromise.then(function(matrecChildrenSet){
				
				Logger.trace("calc for parent " +matRecParent.matrectransid+ " using filter " + JSON.stringify(filter) + " resulting total " + matrecChildrenSet.data.length);
				
				var shipreturnIssuetype = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'SHIPRETURN');
				var voidshipreceiptIssuetype = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'VOIDSHIPRECEIPT');
				
				matrecChildrenSet.filter('issuetype == $1 || issuetype == $3', shipreturnIssuetype, voidshipreceiptIssuetype);
				
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
		 * Check whether Relationship RETURNSHIPRECEIPTS return something 
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} matRecParent - Matrectrans object
		 * @return	{promise} Object with empty list indicator and matrectrans
		 * @public
		 */
		isReturnShipReceiptsRelationEmpty :  function (eventContext, matRecParent) {
			
			var deferred = new Deferred();
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var filter = [];
			
			filter.push ( {receiptref : matRecParent.matrectransid.toString()} ) ;
			filter.push ( {issuetype : SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'SHIPRETURN') } );
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
		 * Search shipped items possible to void
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 * @throws {PlatformRuntimeException} If error is found.
		 */
		searchShippedItemsToVoid :  function (eventContext) {
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var siteid = UserManager.getInfo("defsite");
			var shipmentNum = transfersLocalResource.shipment;
			//#region Loc-In: Add FromNo, DocumentRef
			var formno = transfersLocalResource.formno;
			var documentref = transfersLocalResource.documentref;
			//#endregion Loc-Out: Add FromNo, DocumentRef
			var self = this;
			var filter = [];
			var oslcQueryParameters = {};
			var transfersHand = new TransfersHandler();
			
			//verify if we have at least one field filled
			//#region Loc-In: Add FromNo, DocumentRef
			//if(!shipmentNum){
			if(!shipmentNum && !formno && !documentref){
			//#endregion Loc-Out: Add FromNo, DocumentRef
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

						//#region Loc-In: Add FormNo, DocumentRef
						//oslcQueryParameters['sqp:shipmentNum'] =  shipmentNum;
						if(shipmentNum){
							oslcQueryParameters['sqp:shipmentNum'] =  shipmentNum;
						}
						if(formno){
							filter.push({formnumber : formno});
						}
						if(documentref){
							filter.push({documentref : documentref});
						}
						//#endregion Loc-Out: Add FormNo, DocumentRef
						oslcQueryParameters['sqp:siteid'] =  siteid;
						
						var matrectransPromise =  ModelService.filtered('matrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matrectransPromise.then(function(matrectransSet){
							
							//verify if search result data is empty
							if(matrectransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							
							self.prepareMatrectransListToReturn(eventContext, matrectransSet, 'void').then( function () {
								
								//verify if search result data is empty
								if(matrectransSet.data.length == 0){
									var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
									self.ui.showMessage(msg);
									return;
								}
								eventContext.ui.show("Transfers.RecordsToVoidListView");
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
		 * Search shipped items possible to return
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 * @throws {PlatformRuntimeException} If error is found.
		 */
		searchShippedItemsToReturn :  function (eventContext) {
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var siteid = UserManager.getInfo("defsite");
			var shipmentNum = transfersLocalResource.shipment;
			//#region Loc-In: Add FromNo, DocumentRef
			var formno = transfersLocalResource.formno;
			var documentref = transfersLocalResource.documentref;
			//#endregion Loc-Out: Add FromNo, DocumentRef
			var transfersHand = new TransfersHandler();
			var self = this;
			var filter = [];
			var oslcQueryParameters = {};
			
			//verify if we have at least one field filled
			//#region Loc-In: Add FromNo, DocumentRef
			//if(!shipmentNum){
			if(!shipmentNum && !formno && !documentref){
			//#endregion Loc-Out: Add FromNo, DocumentRef
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

						//#region Loc-In: Add FormNo, DocumentRef
						//oslcQueryParameters['sqp:shipmentNum'] =  shipmentNum;
						if(shipmentNum){
							oslcQueryParameters['sqp:shipmentNum'] =  shipmentNum;
						}
						if(formno){
							filter.push({formnumber : formno});
						}
						if(documentref){
							filter.push({documentref : documentref});
						}
						//#endregion Loc-Out: Add FormNo, DocumentRef
						oslcQueryParameters['sqp:siteid'] =  siteid;
						
						var matrectransPromise =  ModelService.filtered('matrectrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matrectransPromise.then(function(matrectransSet){
							
							//verify if search result data is empty
							if(matrectransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							
							self.prepareMatrectransListToReturn(eventContext, matrectransSet, 'return').then( function () {
								
								//verify if search result data is empty
								if(matrectransSet.data.length == 0){
									var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
									self.ui.showMessage(msg);
									return;
								}
								eventContext.ui.show("Transfers.RecordsToReturnListView");
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
		 * Cancel void process
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		cancelReturnVoidSelection :  function (eventContext) {
			
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},
		
		/**
		 * Submit request with items to void
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		voidSelectedItems :  function (eventContext) {
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var shipmentNum = transfersLocalResource.shipment;
			//#region Loc-In: Add FromNo, DocumentRef
			var formno = transfersLocalResource.formno;
			var documentref = transfersLocalResource.documentref;
			//#endregion Loc-Out: Add FromNo, DocumentRef
			var matrectransSet = eventContext.getResource('matrectrans');
			var self = this;
			var filter = [];
			
			CommonHandler._clearFilterForResource(eventContext, matrectransSet);
			this.checkBoxValidation(eventContext, matrectransSet, 'voidindicator');

			
			//#region Loc-In: Add FormNo, DocumentRef
			//filter.push({shipmentnum: shipmentNum});
			if(shipmentNum){
				filter.push({shipmentnum: shipmentNum});
			}
			if(formno){
				filter.push({formnumber : formno});
			}
			if(documentref){
				filter.push({documentref : documentref});
			}
			//#endregion Loc-Out: Add FormNo, DocumentRef
			var shipmentPromise =  ModelService.filtered('shipment', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, {}, false);
			shipmentPromise.then(function(shipmentSet){
				
				if(shipmentSet.data.length == 0){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
					return;
				}
				
				var getShipmentLineModelPromise = shipmentSet.data[0].getModelDataSet("shipmentline",true);
				getShipmentLineModelPromise.then ( function (shipmentLineSet) {
					
					
					var shipmentLineRecord = null;
					if (shipmentLineSet.data.length > 0) {
						shipmentLineRecord = shipmentLineSet.data[0];
					}
					
					var size = matrectransSet.data.length;
					for (var i = 0 ; i < size ; i++ ){
						var matrectransToVoid = matrectransSet.data[i];
						var newReceipt = matrectransSet.createNewRecord();
						self.prepareReturnShipReceipt(eventContext, newReceipt, matrectransToVoid, 'void', shipmentLineRecord, shipmentSet);
					}
					
					ModelService.save(matrectransSet).then(function(event){
						Logger.trace("Save complete response");
						//flush transactions before checking for errors
//						var flushPromise = PushingCoordinatorService.flush();
//						flushPromise.then(function(){
//							/*self.clearSearchFields(eventContext);
//							eventContext.ui.returnToView("Transfers.ManageReceivedShipmentSeachView");*/
							self.searchReceivedItems(eventContext);
//						});

					}).otherwise(function(err){
						eventContext.ui.showMessage(err);
					});
						
				});
				
			});
		
		},
		
		/**
		 * Submit request with items to return
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		returnSelectedItems :  function (eventContext) {
			
			var transfersLocalResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var shipmentNum = transfersLocalResource.shipment;
			//#region Loc-In: Add FromNo, DocumentRef
			var formno = transfersLocalResource.formno;
			var documentref = transfersLocalResource.documentref;
			//#endregion Loc-Out: Add FromNo, DocumentRef
			var matrectransSet = eventContext.getResource('matrectrans');
			var self = this;
			var filter = [];
			var message = null;
			
			CommonHandler._clearFilterForResource(eventContext, matrectransSet);
			this.checkBoxValidation(eventContext, matrectransSet, 'returnindicator');
			
			//iterate over all records on list
			for(var index in matrectransSet.data){
				
				var elem = matrectransSet.data[index];
				if(!this.validateQuantityForReturn(eventContext, elem)){
					return;
				}
			}
			
			//#region Loc-In: Add FormNo, DocumentRef
			//filter.push({shipmentnum: shipmentNum});
			if(shipmentNum){
				filter.push({shipmentnum: shipmentNum});
			}
			if(formno){
				filter.push({formnumber : formno});
			}
			if(documentref){
				filter.push({documentref : documentref});
			}
			//#endregion Loc-Out: Add FormNo, DocumentRef
			var shipmentPromise =  ModelService.filtered('shipment', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, {}, false);
			shipmentPromise.then(function(shipmentSet){
				
				if(shipmentSet.data.length == 0){
					var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
					self.ui.showMessage(msg);
					return;
				}
				
				var getShipmentLineModelPromise = shipmentSet.data[0].getModelDataSet("shipmentline",true);
				getShipmentLineModelPromise.then ( function (shipmentLineSet) {
					
					
					var shipmentLineRecord = null;
					if (shipmentLineSet.data.length > 0) {
						shipmentLineRecord = shipmentLineSet.data[0];
					}
					
					var size = matrectransSet.data.length;
					for (var i = 0 ; i < size ; i++ ){
						var matrectransToReturn = matrectransSet.data[i];
						var newReceipt = matrectransSet.createNewRecord();
						self.prepareReturnShipReceipt(eventContext, newReceipt, matrectransToReturn, 'return', shipmentLineRecord, shipmentSet);
					}
					
					ModelService.save(matrectransSet).then(function(event){
						Logger.trace("Save complete response");
						//flush transactions before checking for errors
						var flushPromise = PushingCoordinatorService.flush();
						flushPromise.then(function(){
							/*self.clearSearchFields(eventContext);
							eventContext.ui.returnToView("Transfers.ManageReceivedShipmentSeachView");*/
							self.searchReceivedItems(eventContext);
						});

					}).otherwise(function(err){
						eventContext.ui.showMessage(err);
					});
						
				});
				
			});
			
		},
		
		/**
		 * Prepare matrectrans object
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} newReceipt - A new matrectrans object
		 * @param	{Object} matrectrans - Matrectrans object where attributes will be copied from
		 * @param	{String} process - Type of the process triggered
		 * @param	{Object} shipmentLine - Shipmentline object relative to matrectrans
		 * @return	{Object} Return the matrectrans attributes populated
		 * @public
		 */
		prepareReturnShipReceipt : function (eventContext, /*ModelData*/ newReceipt, /*ModelData*/ matrectrans, /*string*/process, /*ModelData*/shipmentLine) {
			//receivedMatrectrans
			var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var receiptStatusSet = CommonHandler._getAdditionalResource(eventContext,'domainreceiptstatus');
			var issueType = '';
			
			/*
			 * if it is VOID process
			 * 		set issuetype as VOIDSHIPRECEIPT and copy actualdate from current matrectrans
			 * else
			 * 		set issuetype as SHIPRETURN
			 */


			/*
			 * set receiptquantity as (qtyrequested from current matrectrans * -1)
			 */
			if (process.toLowerCase() == 'void'){
				issueType = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'VOIDSHIPRECEIPT');
				newReceipt.set('actualdate', matrectrans.actualdate );
				
				//	newReceipt.set('receiptquantity', ( matrectrans.qtyrequested * -1 ) );
//				newReceipt.set('receiptquantity',  matrectrans.receiptquantity );
				newReceipt.set('receiptquantity', ( matrectrans.receiptquantity * -1 ) );
			} else {
				issueType = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'SHIPRETURN');
//				newReceipt.set('receiptquantity',  matrectrans.qtyToBeReturned );
				newReceipt.set('receiptquantity', ( matrectrans.qtyToBeReturned * -1 ) );
			}
			newReceipt.set('issuetype',issueType);
			
			/*
			 * set new receipt attributes same as current matrectrans
			 * shipmentnum, shipmentlinenum, ponum, polinenum, exchangerate, 
			 * tostoreloc, tobin, tolot,
			 * enterby, receiptref
			 */
			newReceipt.set('receiptref', parseInt( matrectrans.matrectransid ) );
			newReceipt.set('shipment', matrectrans.shipment );
			newReceipt.set('shipmentlinenum', matrectrans.shipmentlinenum);
			newReceipt.set('ponum', matrectrans.ponum);
			newReceipt.set('polinenum', matrectrans.polinenum);
			newReceipt.set('exchangerate', matrectrans.exchangerate);
			
			if(shipmentLine){
				newReceipt.set('tostoreloc', shipmentLine.tostoreloc);
			} else {
				newReceipt.set('tostoreloc', matrectrans.tostoreloc);
			}
			
			newReceipt.set('tobin', matrectrans.tobin);
			newReceipt.set('tolot', matrectrans.tolot);
			newReceipt.set('enterby', matrectrans.enterby);
			newReceipt.set('invuselineid', matrectrans.invuselineid);
			newReceipt.set('conversion', matrectrans.conversion);
			newReceipt.set('fromsiteid', matrectrans.fromsiteid);
			
			newReceipt.markAsModified( 'tobin');
			newReceipt.markAsModified( 'tolot'); 
			
			/*
			 * if qtyrequested less than 0
			 * 		set qtyrequested as (qtyrequested from current matrectrans * -1)
			 */
			if (matrectrans.qtyrequested && matrectrans.qtyrequested < 0){
				newReceipt.set('qtyrequested', ( matrectrans.qtyrequested * -1 ) );
			}
			
			
			
			/*
			 * if new receipt conversion not equals to 0
			 * 		set quantity as ( receiptquantity from new receipt * conversion from new receipt)
			 * else
			 * 		set quantity as receiptquantity from new receipt
			 */
			var quantity = 0;
			if (newReceipt.conversion && newReceipt.conversion != 0){
				quantity = newReceipt.receiptquantity * newReceipt.conversion ;
			}else {
				quantity = newReceipt.receiptquantity ;
			}
			
			newReceipt.set('quantity', quantity );
			
			
			/*
			 * REMAKR ????
			 */
			
			/*
			 * if firstShipmentLine is not null
			 * 		set fromstoreloc from fromstoreloc of firstShipmentLine
			 */
			if (shipmentLine) {
				newReceipt.set('fromstoreloc', shipmentLine.fromstoreloc);
			}
			
			/*
			 * if inspectionrequired is true current matrectrans
			 * 		set status as COMPLETE 
			 */
//			if (matrectrans.inspectionrequired) {
//				newReceipt.set('status', SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'COMP') );
//			}
			newReceipt.set('status', SynonymDomain.resolveToDefaultExternal(receiptStatusSet, 'COMP') );
			
			/*
			 * Missing attribute
			 */
			newReceipt.set('siteid',matrectrans.siteid);
			
			return newReceipt;
			
		},
		
		/**
		 * Validate if any checkbox is selected. Throws PlatformRuntimeException.
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
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
		 * Validates quantity to be returned. Throws PlatformRuntimeException.
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
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
			
			var qtyToBeReturned = matrectransRecord.qtyToBeReturned;
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
				//matrectransRecord.clearPendingValue('qtyToBeReturned');
				//matrectransRecord.setPendingValue('qtyToBeReturned', qtyToBeReturned);
				throw new PlatformRuntimeException(message);
				return false;
			}
			return true;
		},
		
		/**
		 * Constructs filter to search received items
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{String} siteid - Site id of user
		 * @param	{String} shipment - Shipment number
		 * @return	{Object} Filter object
		 * @public
		 */
		//#region Loc-In: Add FormNo, DocumentRef
		//buildFilterForReceivedItems : function(eventContext, siteid, shipment) {
		buildFilterForReceivedItems : function(eventContext, siteid, shipment, formno, documentref) {
		//#region Loc-Out: Add FormNo, DocumentRef

			var types = this.selectableReceiptsFilter(eventContext);
			var filter = [];
			
			// create a filter for each status that has everything you need to filter on
			var mainFilter = {};
			//#region Loc-In: Add FormNo, DocumentRef
			//mainFilter.shipment = shipment;

			var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			if(shipment){
				mainFilter.shipment = shipment;
			}
			if(formno){
				mainFilter.formnumber = formno;
			}
			if(documentref){
				mainFilter.documentref = documentref;
			}

			//#endregion Loc-Out: Add FormNo, DocumentRef
			mainFilter.siteid = siteid;
			
			//#region Loc-In: filter only status is 'SHIPRECEIPT'
			/* arrayUtil.forEach(types, function(type, tin){
				var result = {};
				lang.mixin(result, type);
				lang.mixin(result, mainFilter);
				filter.push(result);
			}); */

			var issuetype = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'SHIPRECEIPT');
			mainFilter.issuetype = issuetype;
			filter = mainFilter;
			
			//#endregion Loc-Out: filter only status is 'SHIPRECEIPT'
			return filter;
		},
		
		/**
		 * Creates and validate fiter based on issue type domain
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @return	{Object} Filter of receipts
		 * @public
		 */
		selectableReceiptsFilter : function(eventContext){
			
			var domainIssueTypes = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var shipTransfer = SynonymDomain.resolveToDefaultExternal(domainIssueTypes, 'SHIPTRANSFER');
			
			var exceptionArray = [shipTransfer];
			var internalIssueTypes = this.getMaxvalueFromDomainExcept(eventContext, domainIssueTypes, exceptionArray);
			
			var filter = [];
			
			arrayUtil.forEach(internalIssueTypes, function(anIssueType){
				
				CommonHandler._clearFilterForResource(eventContext, domainIssueTypes);
				var externalOnes = Object.keys(SynonymDomain.resolveToExternal(domainIssueTypes, anIssueType));
				arrayUtil.forEach(externalOnes, function(aValue){
					filter.push({"issuetype": aValue});
				});
				
			});
			CommonHandler._clearFilterForResource(eventContext, domainIssueTypes);
			return filter;
		},
		
		/**
		 * Retrieve an array of all records from domainSet excluding exception array values.
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @param	{Object} domainSet - Set of values from domain
		 * @param	{Array} exceptionArray - Array of exceptions
		 * @return	{Array} Array of domain values
		 * @public
		 */
		getMaxvalueFromDomainExcept : function(eventContext, domainSet, exceptionArray){
			
			var maxvaluesArray = [];
			
			domainSet.data.forEach ( function (domainItem) {
				CommonHandler._clearFilterForResource(eventContext, domainSet);
				maxvaluesArray.push(domainItem.maxvalue);
			} );
			
			if (Array.isArray(exceptionArray) && exceptionArray.length > 0){
				exceptionArray.forEach( function(expItem) {
					if (expItem && maxvaluesArray.indexOf(expItem) >= 0) {
						//remove item from array
						maxvaluesArray.splice(maxvaluesArray.indexOf(expItem), 1);
						
					}
				});
			}
			
			return maxvaluesArray;
		},
		
		
		/**
		 * Clear search fields on search shipped items
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		clearSearchFields : function(eventContext) {
			var transfersResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			transfersResource.setNullValue('shipment');
			//#region Loc-In: clear new fields
			transfersResource.setNullValue('formno');
			transfersResource.setNullValue('documentref');
			//#endregion Loc-Out: clear new fields
		},
		
		/**
        * Processes the Item Inspection (Non -Rotating)
        * 
        * @memberof module:application/handlers/ReceiveShipmentHandler#
        * @param	{Object} eventContext - Brings context into function
        * @public
        */
        approveInspection: function(eventContext){
   	        //validate view before submitting to server
        	if (!eventContext.ui.getCurrentViewControl().validate()) {
    			return;
			}            
        	var matrectransSet = eventContext.getResource();       
            var matrectrans = matrectransSet.getCurrentRecord();
            var statusDate = this.application.getCurrentDateTime();
            var convertedQty = (matrectrans.quantity / matrectrans.conversion);
            
           
            var localacceptqty = matrectrans.localacceptqty;
            var localrejectqty = matrectrans.localrejectqty;
           
            var  noninspectedqty = convertedQty - matrectrans.inspectedqty;
            
            if(!localacceptqty){
            	localacceptqty = 0;
            }
            
            if (!localrejectqty){
            	localrejectqty = 0;
            }
            
            //validate that a positive entry has been entered
            if ((localacceptqty == 0 && localrejectqty == 0) || (localacceptqty < 0 || localrejectqty < 0)){
				var msg = MessageService.createResolvedMessage('quantityPositive');
				throw new PlatformRuntimeException(msg);	
            }
            
            //validate that accept+reject qty is <= receiptqunatity
            if((localacceptqty+localrejectqty) > noninspectedqty){
				var msg = MessageService.createResolvedMessage('AcceptQtyPlusRejectQtyGreaterInspQty');
				throw new PlatformRuntimeException(msg);	
            }
            
           
            if (matrectransSet.name == 'poListComplexMatrectrans'){
               if (localacceptqty>=0){
	                matrectrans.set('acceptedqty', localacceptqty);
	                matrectrans.set('rejectqty', 0);
               }            	
            } else {
               if (localacceptqty>=0){
                    matrectrans.set('acceptedqty', localacceptqty);
               }
              
               if (localrejectqty>=0){
                    matrectrans.set('rejectqty', localrejectqty);
               }            	
            }
            

            matrectrans.setDateValue( "statusdate", statusDate);
            matrectrans.set( 'receiptquantity', convertedQty);
            matrectrans.set( 'inspected', true );
   
            matrectrans.markAsModified( 'statusdate');
            matrectrans.markAsModified( 'receiptquantity');
            matrectrans.markAsModified( 'inspected');
            matrectrans.markAsModified( 'acceptedqty');
            matrectrans.markAsModified( 'rejectqty');
                       
            var receiveShipmentHandler = eventContext.application['application.handlers.ReceiveShipmentHandler' ];
            eventContext.application.showBusy();
            
            if (matrectransSet.name == 'poListComplexMatrectrans'){
                ModelService.save(matrectransSet).then( function(){
               	 if (localrejectqty>=0){
                        matrectrans.set('rejectqty', localrejectqty);
                        matrectrans.set('acceptedqty', 0);
                   }
               	 matrectrans.markAsModified( 'rejectqty');
                    matrectrans.markAsModified( 'statusdate');
                    matrectrans.markAsModified( 'receiptquantity');
                    matrectrans.markAsModified( 'inspected');
                    matrectrans.markAsModified( 'acceptedqty');
               	
               	 ModelService.save(matrectransSet).then( function(){
               		eventContext.ui.show("Transfers.TransactionSubmitDialog");
               	 });
               }).otherwise( function(err){
               	eventContext.application.hideBusy();
               	eventContext.ui.showMessage(err);
               });         	
            } else {
            	 ModelService.save(matrectransSet).then( function(){
            		 receiveShipmentHandler.searchReceivedItems(eventContext);                 
                 }).otherwise( function(err){
                 	eventContext.application.hideBusy();
                 	eventContext.ui.showMessage(err);
                 });
            }

        },
        
		 /**
         * Accepts rotating item and triggers function to inspect it
         *  
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        acceptRotatingInpection: function(eventContext){
                this.inspectRotatingItem(eventContext,true);
        },
        
        /**
        * Reject rotating item Inspection (Rotating)
        * 
        * @memberof module:application/handlers/ReceiveShipmentHandler#
        * @param	{Object} eventContext - Brings context into function
        * @public
        */
        rejectRotatingInpection: function(eventContext){
                this.inspectRotatingItem(eventContext,false);
        },
	        
        /**
        * Processes the Rotating Item Inspection (Rotating)
        * 
        * @memberof module:application/handlers/ReceiveShipmentHandler#
        * @param	{Object} eventContext - Brings context into function
        * @param	{Boolean} accepted - Rotating item acceptance indicator
        * @public
        */
        inspectRotatingItem: function(eventContext,accepted){
                var matrectransSet = eventContext.getResource();       
                var matrectrans = matrectransSet.getCurrentRecord();
                var statusDate = this.application.getCurrentDateTime();
               
               matrectrans.setDateValue( "statusdate", statusDate);
                if (accepted){
                     matrectrans.set( 'acceptedqty', 1);
                     matrectrans.set( 'rejectqty', 0);
               } else {
                     matrectrans.set( 'acceptedqty', 0);
                     matrectrans.set( 'rejectqty', 1);  
               }
               
               matrectrans.set( 'inspected', true );
               matrectrans.markAsModified( 'statusdate');
               matrectrans.markAsModified( 'inspected');
               matrectrans.markAsModified( 'acceptedqty');
               matrectrans.markAsModified( 'rejectqty');

               var receiveShipmentHandler = eventContext.application['application.handlers.ReceiveShipmentHandler' ];
               eventContext.application.showBusy();
           	
               ModelService.save(matrectransSet).then( function(){
	               	if(matrectransSet.name == 'poListComplexMatrectrans'){
	            		var handler = eventContext.application['application.handlers.ManagePurchaseOrderHandler'];
	            		handler.searchReceivedPurchaseOrders(eventContext);
	            	} else {
	            		receiveShipmentHandler.searchReceivedItems(eventContext);      	
	            	}            	   
               }).otherwise( function(err){
                     eventContext.application.hideBusy();
                     eventContext.ui.showMessage(err);
               });
        },
        
		/**
		 * Set Error Message on Error List Page
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		setErrorMessage : function(eventContext){
			var matrectrans = eventContext.getCurrentRecord();
			matrectrans.set('errorMessage', matrectrans._errorMessage);
		}, 
		
		/**
		 * Search for receivedmatrectrans that contains error
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @return	{Object} ModelDataSet of matrectrans filtered
		 * @public
		 */
        errorCheck : function(eventContext){
            var filter = {'_errored': 1};
            return ModelService.filtered('receivedMatrectrans', null, filter, 1000, false, true, null, true);
        },
     
        /**
         * Search for matrectrans that contains error
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @return	{Object} ModelDataSet of matrectrans filtered
         * @public
         */
        errorCheckVoidReturn : function(eventContext){
            var filter = {'_errored': 1};
            return ModelService.filtered('matrectrans', null, filter, 1000, false, true, null, true);
        },
        
        /**
         * This method hides/shows link if errors exist in receivedmatrectrans
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        hideShowErrorLink : function(eventContext){
            var self = this;
            if (self.errorWatch) {
                  self.errorWatch.remove();
            }
            
            self.errorWatch = topic.subscribe(PlatformConstants.DATA_REFRESH_TOPIC + '/receivedMatrectrans',function(fireEvent){
            self.errorCheck(eventContext).then(function(errorSet){
	            eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                  
	              if (errorSet.count()>0){
	                     self.setMatRecError(eventContext, true);
	                     eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                     errorSet.resourceID = 'receivedMatrectrans';
	                     eventContext.application.addResource(errorSet);
	                     eventContext.setDisplay(true);
	                     
	              } else {
	                     self.setMatRecError(eventContext, false);
	                     eventContext.setDisplay(false);   
	              }
	
	              return;
	            });
            });            
  
            //if topic already processesed, check if error exists
            if (this.getMatRecError(eventContext)){
                  eventContext.setLabel( MessageService.createResolvedMessage('errorExists'));
                  eventContext.setDisplay(true);
            } else {
                  eventContext.setDisplay(false);
            }
        },            

        /**
         * This method hides/shows link if errors exist in matrectrans
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        hideShowErrorLinkVoidReturn : function(eventContext){
            var self = this;
            if (self.errorWatch2) {
                  self.errorWatch2.remove();
            }
            
            self.errorWatch2 = topic.subscribe(PlatformConstants.DATA_REFRESH_TOPIC + '/matrectrans',function(fireEvent){
            self.errorCheckVoidReturn(eventContext).then(function(errorSet){
	            eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                  
	              if (errorSet.count()>0){
	                     self.setMatRecVoidReturnError(eventContext, true);
	                     eventContext.setLabel( MessageService.createResolvedMessage('errorExists')) ;
	                     errorSet.resourceID = 'matrectrans';
	                     eventContext.application.addResource(errorSet);
	                     eventContext.setDisplay(true);
	                     
	              } else {
	                     self.setMatRecVoidReturnError(eventContext, false);
	                     eventContext.setDisplay(false);   
	              }
	
	              return;
	            });
            });            
  
            //if topic already processesed, check if error exists
            if (this.getMatRecVoidReturnError(eventContext)){
                  eventContext.setLabel( MessageService.createResolvedMessage('errorExists'));
                  eventContext.setDisplay(true);
            } else {
                  eventContext.setDisplay(false);
            }
        }, 
        
        /**
         * Transits to error page
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        showErrorPage : function(eventContext){
        	eventContext.ui.show("Transfers.ReceivingErrorDetailPage");
        },
        
        /**
         * Show or Hide Shipment Label on Error Page
         * 
         * @memberof module:application/handlers/ReceiveShipmentHandler#
         * @param	{Object} eventContext - Brings context into function
         * @public
         */
        showShipmentErrorLabel : function(eventContext){
        	var shipment = eventContext.getCurrentRecord().get('shipment');
        	if(shipment){
        		 eventContext.setDisplay(true);
        	} else {
        		 eventContext.setDisplay(false);
        	}
        },
        
	    /**
	     * Transits to error page from void/return process
	     * 
	     * @memberof module:application/handlers/ReceiveShipmentHandler#
	     * @param	{Object} eventContext - Brings context into function
	     */
        showVoidReturnErrorPage : function(eventContext){
	            eventContext.ui.show("Transfers.matrectrans_ReceivingErrorDetailPage");
	     },
	     
	     /**
	      * Set error attribute from matrectrans for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      * @public
	      */
	     setMatRecError : function(eventContext,haserror){
	            var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
	            errorRes.set('hasMatRecError',haserror);
	     },
	     
	     /**
	      * Get error attribute from matrectrans for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      * @public
	      */
		 getMatRecError : function(eventContext){
			var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
			return errorRes.get('hasMatRecError');
		 },

		 /**
		  * Set error attribute from receivedmatrectrans for errorResource
		  * 
		  * @memberof module:application/handlers/ReceiveShipmentHandler#
		  * @param	{Object} eventContext - Brings context into function
		  */
		 setMatRecVoidReturnError : function(eventContext,haserror){
	            var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
	            errorRes.set('hasMatRecVoidReturnError',haserror);
	     },
	     
	     /**
	      * Get error attribute from receivedmatrectrans for errorResource
	      * 
	      * @memberof module:application/handlers/ReceiveShipmentHandler#
	      * @param	{Object} eventContext - Brings context into function
	      */
	     getMatRecVoidReturnError : function(eventContext){
			var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
			return errorRes.get('hasMatRecVoidReturnError');
		 },
		 
		 /**
		  * Discards and reverts exception thrown by server
		  * 
		  * @memberof module:application/handlers/ReceiveShipmentHandler#
		  * @param	{Object} eventContext - Brings context into function
		  * @public
		  */
		 undoAndDelete : function(eventContext){
			var test = new ApplicationHandlerBase();
			var matrectrans = eventContext.getResource().getCurrentRecord();
			var self = this;
			test.discardChanges(eventContext, matrectrans).then(function(){
				try{
					//if _originalState is null, that means its a new record
					if(matrectrans.get("_errored")  && !matrectrans.get("_originalState")){
						if(matrectrans.get("_errored")==1){
							var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
							if(eventContext.getResource().getResourceName()=="receivedMatrectrans"){
								errorRes.hasMatRecError=false;
							}
							if(eventContext.getResource().getResourceName()=="matrectrans"){
								errorRes.hasMatRecVoidReturnError=false;
							}
							if(eventContext.getResource().getResourceName()=="poComplexMatrectrans"){
								errorRes.hasPOExtMatRecError=false;
							}
							if(eventContext.getResource().getResourceName()=="poListComplexMatrectrans"){
								errorRes.hasPOListComplexExtMatRecError=false;
							}
						}
					}
					//change status to CANCELLED
					//self.changeStatus(invuse, eventContext, null, self, "CANCELLED");
				} catch (e){
					//transition back to search page.
					var  errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
					errorRes.hasMatRecError=false;
					eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
				}
				if(eventContext.getResource().getResourceName()=="poListComplexMatrectrans"){
					//re-execute the search and transition back to manage received items page
					if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id != 'Transfers.ManageReceivedPurchaseOrderSeachView'){
						var handler = eventContext.application['application.handlers.ManagePurchaseOrderHandler'];
						handler.searchReceivedPurchaseOrders(eventContext);
					} else {
						//transition back to search page.
						eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);	
					}
				} else {
					//transition back to search page.
					eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);					
				}

			});
			
		},

		/**
		 * Set asset for rotating item for receive process
		 * 
		 * @memberof module:application/handlers/ReceiveShipmentHandler#
		 * @param	{Object} eventContext - Brings context into function
		 * @public
		 */
		receiveRotatingItemProcessAsset : function(eventContext){
			 var matrectransSet = eventContext.getResource('matrectrans');
			 var currentRecord = matrectransSet.getCurrentRecord();
			 currentRecord.getModelDataSet("awreceiverotasset",true).then(function(rotAssetSet){ 
				 var rotAsset = rotAssetSet.createNewRecord();
				 var newassetnum = currentRecord.get('newassetnumber');
				 if(newassetnum){
					 rotAsset.set('assetnum', newassetnum);	 
				 } else {
					 rotAsset.set('assetnum', currentRecord.get('rotassetnum'));
					 currentRecord.markAsModified('assetnum');
				 }
				 rotAsset.matrectransid = currentRecord.get('matrectransid');
				 var receiveShipmentHandler = eventContext.application['application.handlers.ReceiveShipmentHandler'];
	             eventContext.application.showBusy();
				 ModelService.save(matrectransSet).then(function() {
					 receiveShipmentHandler.searchReceivedItems(eventContext);
					 Logger.trace("Matrectrans save ");
				 }).otherwise( function(err){
                     eventContext.application.hideBusy();
                     eventContext.ui.showMessage(err);
               });;
				 
			 });
		 },

		//#region Loc-In: process lookup
		// có thể phải đổi sang Bin Lookup
		 
		 toBinLotLookup : function(eventContext){
			var filter = [];
			
			var receiptInput = CommonHandler._getAdditionalResource(eventContext,'receiptInput').getCurrentRecord();
			var siteid = receiptInput.get('siteid');
			var storeroom = receiptInput.get('tostoreloc'); //.toUpperCase();
			var itemnum = receiptInput.get('itemnum');
			
			filter.push({siteid: siteid});
			filter.push({location: storeroom});
			filter.push({itemnum: itemnum});
			filter.push({stagingbin: 0});
			
			var invbalPromise =  ModelService.filtered('invbalance', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, null, false);
			invbalPromise.then(function(invbalSet){
				
				ModelService.clearSearchResult(invbalSet);
				invbalSet.resourceID = 'invbalTemp';
				eventContext.application.addResource(invbalSet);
				
				eventContext.ui.show("Transfers.ToBinListView");
			});
		},

		selectToBinLot: function(eventContext) {
			var  invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();
			var receiptInput = CommonHandler._getAdditionalResource(eventContext,'receiptInput').getCurrentRecord();

			// if an empty binnum is set on maximo it won't come down from oslc
			// but if we found it to be a valid invbal set the binnum to empty string
			if (!invbalTemp.binnum && invbalTemp.invbalancesid) {
				invbalTemp.binnum = "";
			}
			
			
			receiptInput.set('tobin', invbalTemp.binnum);
			receiptInput.set('tolot', invbalTemp.lotnum);
			
		    eventContext.ui.returnToView('Transfers.ShipmentItemsListView');
			
		},

		cancelBinLotSelection : function(eventContext){
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},

		clearToBinLotSelection : function(eventContext){			
			//console.log("CLEAR rotating asset selection");			
			var receiptInput = CommonHandler._getAdditionalResource('receiptInput').getCurrentRecord();
			
			receiptInput.set('tobin','');
			receiptInput.set('tolot','');
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
		},

		setDefaultActualDateShipment: function(eventContext) {
			var shipment = eventContext.getCurrentRecord();
			shipment.setDateValue('actualdate', this.application.getCurrentDateTime());
		},

		validateActualDateItems: function(eventContext) {
			var self = this;
			var currentRecord = eventContext.getResource().getCurrentRecord();
			if(!currentRecord.actualdate){
				var msg = MessageService.createStaticMessage("emptyActualDate").getMessage();
				if (self.ui.getCurrentDialog()) {
					if (self.ui.getCurrentDialog().id == 'Platform.DateTimeLookup') {
					setTimeout(function(){
						self.ui.showMessage(msg);
				    },10); 
					
					}
				}
			}
		},

		setFieldsReadonly : function(eventContext){
			var transfers = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var shipment = transfers.getPendingOrOriginalValue('shipment');
			var formno = transfers.getPendingOrOriginalValue('formno');
			var documentref = transfers.getPendingOrOriginalValue('documentref');

			if(shipment){
				transfers.getRuntimeFieldMetadata('formno').set('readonly', true);
				transfers.getRuntimeFieldMetadata('documentref').set('readonly', true);
			} else if (formno){
				transfers.getRuntimeFieldMetadata('shipment').set('readonly', true);
				transfers.getRuntimeFieldMetadata('documentref').set('readonly', true);
			} else if (documentref) {
				transfers.getRuntimeFieldMetadata('shipment').set('readonly', true);
				transfers.getRuntimeFieldMetadata('formno').set('readonly', true);
			} else {
				transfers.getRuntimeFieldMetadata('shipment').set('readonly', false);
				transfers.getRuntimeFieldMetadata('formno').set('readonly', false);
				transfers.getRuntimeFieldMetadata('documentref').set('readonly', false);
			}
		},

		/* enableTransitionTo: function(eventContext){
			if(WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id != 'Transfers.ReceivePurchaseOrderItemsSeachView'){
				eventContext.list.transitionTo = null;
			} else {
				eventContext.list.transitionTo = "Transfers.AttachmentsView";
			}
		}, */
		//#endregion Loc-Out
	});
});
