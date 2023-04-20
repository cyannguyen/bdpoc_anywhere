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

define("application/handlers/ReturnIssuedItemsHandler", 
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
	     "application/business/WpEditSettings",
	     "platform/util/AsyncAwareMixin",
	     "platform/logging/Logger",
	     "platform/store/PersistenceManager",
	     "platform/store/_StoreProvider",
	     "platform/store/_ResourceMetadataContext",
	     "dojo/Deferred",
	     "dojo/promise/all",
	     "dojo/topic",
	     "application/handlers/IssuesReturnsHandler",
	     "dojo/number"],
function(declare, arrayUtil, lang, ApplicationHandlerBase, CommunicationManager, PushingCoordinatorService, 
		SynonymDomain, InvuseObject, ModelService, MessageService, CommonHandler, FieldUtil, PlatformRuntimeException, 
		PlatformRuntimeWarning, UserManager, PlatformConstants, WpEditSettings, AsyncAwareMixin, Logger,
		PersistenceManager, StoreProvider, ResourceMetadata, Deferred, all, topic, IssuesReturnsHandler, NumberUtil) {
		return declare( [ApplicationHandlerBase, AsyncAwareMixin],  {
		
		_className: "[application.handlers.ReturnIssuedItemsHandler]",
		
		/**
		 * Filter for Material Use Transactions
		 */
/**@memberOf application.handlers.ReturnIssuedItemsHandler */
		filterUsedItemLookup : function (eventContext) {
			var additionalInventory = CommonHandler._getAdditionalResource(eventContext,'additionalInventory');
			var filter = [];
			var issuesReturnsResource = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			var siteid = issuesReturnsResource.get('siteid');
			var storeroom = issuesReturnsResource.get('storeroom').toUpperCase();
			
			CommonHandler._clearFilterForResource(eventContext, additionalInventory);
			
			filter.push({'siteid': siteid, 'location': storeroom});
			
			additionalInventory.lookupFilter = filter;
		},
		
		setFieldsReadonly : function (eventContext) {
			
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			var wonum = issuesReturns.getPendingOrOriginalValue('wonum');
			var itemnum = issuesReturns.getPendingOrOriginalValue('itemnum');

			//#region Loc-In: Add fields
			/* if(wonum){
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', true);
			} else if (itemnum){
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', true);
			} else {
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', false);
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', false);
			} */

			var formnumber = issuesReturns.getPendingOrOriginalValue('formnumber');
			var location = issuesReturns.getPendingOrOriginalValue('location');
			var glaccount = issuesReturns.getPendingOrOriginalValue('glaccount');

			if(wonum){
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('formnumber').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('location').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('glaccount').set('readonly', true);
			} else if (itemnum){
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('formnumber').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('location').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('glaccount').set('readonly', true);
			} else if (formnumber){
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('location').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('glaccount').set('readonly', true);
			} else if (location){
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('formnumber').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('glaccount').set('readonly', true);
			} else if (glaccount){
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('formnumber').set('readonly', true);
				issuesReturns.getRuntimeFieldMetadata('location').set('readonly', true);
			} else {
				issuesReturns.getRuntimeFieldMetadata('wonum').set('readonly', false);
				issuesReturns.getRuntimeFieldMetadata('itemnum').set('readonly', false);
				issuesReturns.getRuntimeFieldMetadata('formnumber').set('readonly', false);
				issuesReturns.getRuntimeFieldMetadata('location').set('readonly', false);
				issuesReturns.getRuntimeFieldMetadata('glaccount').set('readonly', false);
			}
			//#endregion Loc-Out: Add fields
		},
		
		/**
		 * Search issued items for return
		 */
		searchIssuedItems : function(eventContext) {

			var filter = [];
			var oslcQueryParameters = {};
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			
			var issueTypeSet = CommonHandler._getAdditionalResource(eventContext,'domainissuetype');
			var issueType = SynonymDomain.resolveToDefaultExternal(issueTypeSet, 'ISSUE');
			
			var siteid = issuesReturns.siteid;
			var storeroom = issuesReturns.storeroom;
			
			var wonum = issuesReturns.wonum;
			var itemnum = issuesReturns.itemnum;

			//#region Loc-In: add fields
			var formnumber = issuesReturns.formnumber;
			var location = issuesReturns.location;
			var glaccount = issuesReturns.glaccount;
			//#endregion Loc-Out: add fields

			var self = this;
			
			//verify if we have at least one field filled
			//#region Loc-In: check more fields
			//if(!wonum && !itemnum){
			if(!wonum && !itemnum && !formnumber && !location && !glaccount){
			//#endregion Loc-Out: check more fields
				var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
				self.ui.showMessage(msg);
				return;
			}
			
			//IJ26453
			var wofilter = {siteid: siteid, wonum: wonum};
			var workOrderPromise =  ModelService.filtered('workOrder', PlatformConstants.SEARCH_RESULT_QUERYBASE, wofilter, 1000, true, true, null, false);
			workOrderPromise.then(function(workOrderSet){
				var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
				if (workOrderSet.count()>0){
					switch(workOrderSet.data[0].status){
						case "CAN":
						case "CLOSE":
						case "COMP":
							self.ui.showMessage(msg);
							return;
					}
				}
			});
			
			var issuesReturnsHand = new IssuesReturnsHandler();
			
			//check for errors
			if (issuesReturnsHand.getError(eventContext)){
				throw new PlatformRuntimeException('reviewErrors');
			}
				
			// Checking connectivity
			CommunicationManager.checkConnectivityAvailable().then(function(hasConnectivity){
				eventContext.application.showBusy();
				if (hasConnectivity){
					//flush transactions before searching
					var flushPromise = PushingCoordinatorService.flush();
					flushPromise.then(function(){

						filter.push({issuetype: issueType});

						//#region Loc-In: Add new fields
						if(formnumber){
							filter.push({formnumber: formnumber});
						}
						if(location){
							filter.push({location: location});
						}
						if(glaccount){
							filter.push({gldebitacct: glaccount});
						}
						//#region Loc-Out: Add new fields

						// validate itemnum has value before adding to the query to search correctly
						if (itemnum) {
							oslcQueryParameters["sqp:itemnum"] = itemnum;
						}

						oslcQueryParameters["sqp:storeloc"] = storeroom;
						oslcQueryParameters["sqp:siteid"] = siteid;

						// validate wonum has value before adding to the query to search correctly
						if (wonum) {
							oslcQueryParameters["sqp:wonum"] = wonum;
						}
						//#region Loc-In: Add new fields
						/* oslcQueryParameters['sqp:formnumber'] =  formnumber;
						oslcQueryParameters['sqp:location'] =  location;
						oslcQueryParameters['sqp:gldebitacct'] =  glaccount; */
						//#region Loc-Out: Add new fields
						
						var matusetransPromise =  ModelService.filtered('matusetrans', PlatformConstants.SEARCH_RESULT_QUERYBASE, filter, 1000, true, true, oslcQueryParameters, false);
						matusetransPromise.then(function(matusetransSet){
							
							//verify if search result data is empty
							if(matusetransSet.data.length == 0){
								var msg = MessageService.createStaticMessage("emptySearchResult").getMessage();
								self.ui.showMessage(msg);
								return;
							}
							
							ModelService.clearSearchResult(matusetransSet);
							matusetransSet.resourceID = 'matusetrans';
							eventContext.application.addResource(matusetransSet);
							eventContext.ui.show("IssuesReturns.IssuedItemsListView");
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

		updateFormnumLookupData: function (eventContext) {
            console.log("Render called");
            var record = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalMatusetrans"
            ).getCurrentRecord();

            if (!record) return;

            var storeloc = record.storeloc;

            var formnumberPromise = ModelService.removeAndFilter(
                "additionalMatusetrans",
                [{ storeloc: storeloc }],
                1000,
                true
            );
            formnumberPromise.then(function (data) {
                if (data.length > 0) {
                    data.resourceID = "additionalMatusetrans";
                    eventContext.application.addResource(data);

                    data.filter("formnumber != null");
                }
            });
        },
		
		/**
		 * Cancel process of returning issued items
		 */
		cancelReturn : function(eventContext) {
			console.log("Cancel process of returning issued items");
			eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			var issuesReturnsHand = new IssuesReturnsHandler();
			issuesReturnsHand.clearReturnSearchFields(eventContext);
			//#region Loc-In: clear Return header
			this.clearReturnHeader(eventContext);
			//#endregion Loc-Out: clear Return header
		},
		
		/**
		 * Finish the process of returning issued items
		 */
		completeReturn : function(eventContext) {
			
			if(!this.validateQuantity(eventContext)){
				return;
			}
			
			var invuseResource = this.application.getResource("invuse");
			var matusetransSet = eventContext.getResource('matusetrans');
			//var statuschange = CommonHandler._getAdditionalResource(this,"statusChangeResource");
			//var issuesReturnsHandler = new IssuesReturnsHandler();
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			var self = this;
			var storeroom = issuesReturns.storeroom;
			var siteid = issuesReturns.siteid;
			
			//status info
			var domaininvusestatus = CommonHandler._getAdditionalResource(eventContext,'domaininvusestatus');
			var currentStatus = SynonymDomain.resolveToDefaultExternal(domaininvusestatus,'ENTERED');
			
			var domaininvusetype = CommonHandler._getAdditionalResource(eventContext,'domaininvusetype');
			var mixedUseType = SynonymDomain.resolveToDefaultExternal(domaininvusetype,'MIXED');
			var returnedUseType = SynonymDomain.resolveToDefaultExternal(domaininvusetype,'RETURN');

			//#region Loc-In: Add attributes
			var issueReturnHeader  = eventContext.application.getResource("issueReturnHeader").getCurrentRecord();
			var formNumber = issueReturnHeader.get('formnumber');
			var description = issueReturnHeader.get('description');
			var documentRef = issueReturnHeader.get('documentref');
			var createDate = issueReturnHeader.get('createdate');

			/* if (!formNumber || !description || !createDate){
				var msg = MessageService.createStaticMessage("requiredField").getMessage();
				self.ui.showMessage(msg);
				return;
			} */

			//validate view, check if required fields are populated
			if (!eventContext.ui.getCurrentViewControl().validate()) {
				return;
			}
			//#endregion Loc-Out:Add attributes
			
			//clear filter
			CommonHandler._clearFilterForResource(eventContext, matusetransSet);
			
			//validate if checkbox is selected
			this.checkBoxValidation(eventContext, matusetransSet);

			//create invuse header
			invuse = invuseResource.createNewRecord();
			invuse.openPriorityChangeTransaction();
			invuse.set('usetype', mixedUseType);
			invuse.set('description', MessageService.createResolvedMessage('invuseDescription'));
			invuse.set('fromstoreloc', storeroom);
			invuse.set('status', currentStatus);
			invuse.set('siteid',siteid);
			//#region Loc-In: set header fields
			invuse.set('formnumber', formNumber);
			invuse.set('description', description);
			invuse.set('documentref', documentRef);
			invuse.set('createdate', createDate);
			//#endregion Loc-Out: set header fields
			invuse.closePriorityChangeTransaction();
			
			
			//initialize invuseline on new invuse record
			invuse.getModelDataSet("invuseline", true).then(function(ivline){
				var i = 1;

				//The Invuseline transactions are wrapped around a priorityChangeTransaction in order for them to get
				//sent to the server before the change status transaction.  Important to note, that the  openPriorityChangeTransaction
				//is defined using the parent object invuse.
				invuse.openPriorityChangeTransaction();
				arrayUtil.forEach(matusetransSet.data, function(matusetrans){
					
					//create invuseline
					invuseline = ivline.createNewRecord();
											
					//invuseline.set('siteid', siteid);
					invuseline.set('invuselinenum',i++);
					invuseline.set('tositeid', matusetrans.tositeid);
					invuseline.set('itemnum',matusetrans.itemnum);
					invuseline.set('itemsetid',matusetrans.itemsetid);
					invuseline.set('fromconditioncode',matusetrans.conditioncode);
					invuseline.set('fromstoreloc',matusetrans.storeloc);
					invuseline.set('usetype',returnedUseType); //translate
					invuseline.set('frombin',matusetrans.binnum);
					invuseline.set('fromlot',matusetrans.lotnum);
					invuseline.set('returnagainstissue',true);
					invuseline.set('requestnum',matusetrans.requestnum);
					invuseline.set('quantity',matusetrans.localreturnqty);
					invuseline.set('wonum',matusetrans.wonum);
					invuseline.set('refwo',matusetrans.refwo);
					invuseline.set('enteredastask',matusetrans.enteredastask);
					invuseline.set('taskid',matusetrans.taskid);
					invuseline.set('issueto',matusetrans.issueto);					
					invuseline.set('location',matusetrans.location);
					invuseline.set('assetnum',matusetrans.assetnum);
					invuseline.set('rotassetnum',matusetrans.rotassetnum);
					invuseline.set('remark',matusetrans.memo);
					invuseline.set('mrnum',matusetrans.mrnum);
					invuseline.set('mrlinenum',matusetrans.mrlinenum);
					invuseline.set('ponum',matusetrans.ponum);
					invuseline.set('polinenum',matusetrans.polinenum);
					invuseline.set('gldebitacct',matusetrans.gldebitacct);
					invuseline.set('glcreditacct',matusetrans.glcreditacct);
					invuseline.set('unitcost',matusetrans.unitcost);
					var matusetransidint = matusetrans.matusetransid;
					invuseline.set('issueid',parseInt(matusetransidint));
					//Loc-In
					// A value required for the ActualDate field on the INVUSELINE object
					invuseline.set("actualdate", matusetrans.actualdate);
					//Loc-Out
				});
				invuse.closePriorityChangeTransaction();
				//change status to complete				
				self.changeStatus(invuse,eventContext);
			});
		
			console.log("Finish the process of returning issued items");
		},
		
		renderReturnQuantity : function(eventContext) {
			var currentMatUseTrans = eventContext.getCurrentRecord();
			
			if (currentMatUseTrans.get("rotating")) {
				currentMatUseTrans.getRuntimeFieldMetadata('localreturnqty').set('readonly', true);
			};
		},
		
		hideRotatingAssetLabel : function(eventContext) {
			var currentMatUseTrans = eventContext.getCurrentRecord();
			if (!currentMatUseTrans.get("rotassetnum")) {
				eventContext.setDisplay(false);
			}
		},
		
		/**
		 * Validate if a checkbox is selected
		 */
		checkBoxValidation : function(eventContext, matusetransSet){
			//check if checkboxes are selected
			matusetransSet.filter('returnindicator == true');
			
			if (matusetransSet && matusetransSet.count() == 0){
				throw new PlatformRuntimeException('atLeastOneItem');
			}
		},
		
		/**
		 * Change Status
		 * 
		 * Status will be change to Complete when issuing an item
		 */
		changeStatus: function(invuse, eventContext){
			var statusChange = CommonHandler._getAdditionalResource(this,"statusChangeResource").getCurrentRecord();
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
					//self.ui.hideCurrentView();
					self.clearSearchFields(eventContext);
					//#region Loc-In: clear Return Header
					self.clearReturnHeader(eventContext);
					//#endregion Loc-Out: clear Return Header
					eventContext.ui.returnToView("IssuesReturns.SearchReturnView");
				});

			}).otherwise(function(err){
				//#region Loc-In: clear Return Header
				self.clearReturnHeader(eventContext);
				//#endregion Loc-Out: clear Return Header
				eventContext.ui.showMessage(err);
			});
			
		},	
		
		/**
		 * Clears search view fields.
		 */
		clearSearchFields : function(eventContext) {
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			issuesReturns.setNullValue('itemnum');
			issuesReturns.setNullValue('wonum');
		},
		

		/**
		 * Validates quantity to be returned
		 */
		validateQuantity : function(eventContext) {
			var currentMatUseTrans = eventContext.getCurrentRecord();
//			var requestedQuantity = currentMatUseTrans.qtyrequested;
			var returnedQuantity = currentMatUseTrans.localreturnqty;
			
//			if ( requestedQuantity && 
//					returnedQuantity  &&  
//					returnedQuantity > requestedQuantity ){
//
//				Logger.log("Edition not allowed: " + returnedQuantity + " is greater than issue items");
//				this.ui.showMessage(MessageService.createStaticMessage("notGreaterThanIssueItems").getMessage());
//				currentMatUseTrans.set('localreturnqty',requestedQuantity);
//			}
			
			//verify if issue quantity is a positive number
			if (returnedQuantity!='' && (NumberUtil.parse(returnedQuantity, this.application.getUserLocale()) <= 0)) {
				throw new PlatformRuntimeException('quantityPositive');
				return false;
			}
			//verify if issue quantity is a valid number
			else if(isNaN(NumberUtil.parse(Number(returnedQuantity)))){
				var msg = MessageService.createResolvedMessage('newReadingNaN', [returnedQuantity]);
				throw new PlatformRuntimeException(msg);
				return false;
			}
			return true;
		},
		
		//#region Loc-In: init Return Header, default ActualDate
		initializeReturnHeader: function(eventContext) {
			var returnHeader = eventContext.getResource().getCurrentRecord();
			returnHeader.setDateValue('createdate', this.application.getCurrentDateTime());
		},

		setDefaultActualDateReturnItems: function(eventContext) {
			var returnItem = eventContext.getCurrentRecord();
			returnItem.setDateValue('actualdate', this.application.getCurrentDateTime());
		},

		clearReturnHeader : function(eventContext){
			var returnHeaderRecord = eventContext.application.getResource('issueReturnHeader').getCurrentRecord();
			returnHeaderRecord.formnumber = "";
			returnHeaderRecord.description = "";			
			returnHeaderRecord.documentref = "";
			returnHeaderRecord.createdate = null;
		},
		//#endregion Loc-In: init Return Header, default ActualDate
	});
});
