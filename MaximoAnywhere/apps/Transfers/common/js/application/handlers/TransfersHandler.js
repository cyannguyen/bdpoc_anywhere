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
 * Module returning a class to create and handle shipment of reserved items.
 * @module application/handlers/TransfersHandler
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
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html|base Declare Documentation}
 * @see {@link http://dojotoolkit.org/reference-guide/1.10/dojo/_base/array.html|base Array Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/_base/lang.html|base Lang Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/Deferred.html|Deferred Documentation}
 * @see {@link http://dojotoolkit.org/reference-guide/1.10/dojo/promise/all.html|Promise all Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/topic.html|Topic Documentation}
 * @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/number.html|Number Documentation}
 */

define("application/handlers/TransfersHandler", [
    "dojo/_base/declare",
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
], function (
    declare,
    arrayUtil,
    lang,
    ApplicationHandlerBase,
    CommunicationManager,
    PushingCoordinatorService,
    SynonymDomain,
    InvuseObject,
    ModelService,
    MessageService,
    CommonHandler,
    FieldUtil,
    PlatformRuntimeException,
    PlatformRuntimeWarning,
    UserManager,
    PlatformConstants,
    AsyncAwareMixin,
    Logger,
    PersistenceManager,
    StoreProvider,
    ResourceMetaData,
    Deferred,
    all,
    topic,
    AppConfig,
    NumberUtil
) {
    /* #region Tuan-in: handle tolot in case user input a new lot number  */
    var isFromBinChanging = false;
    /* #region Tuan-in: handle tolot in case user input a new lot number  */
    return declare([ApplicationHandlerBase, AsyncAwareMixin], {
        /**
         * @memberof module:application/handlers/TransfersHandler#
         * @property {String} _className Name of this module
         * @private
         */
        _className: "[application.handlers.TransfersHandler]",

        /**
         * Set lookup filter for Asset Lookup Data Filter
         *
         * @memberof module:application/handlers/TransfersHandler#
         * @param	{Object} eventContext - It brings context into function
         * @public
         */
        /**@memberOf application.handlers.TransfersHandler */
        filterAssetForLookup: function (eventContext) {
            var additionalasset = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalasset"
            );
            var filter = [];
            additionalasset._lookupFilter = null;

            var siteid = UserManager.getInfo("defsite");
            filter.push({ siteid: siteid });

            additionalasset.lookupFilter = filter;
        },

        /**
         * From storeroom Lookup Data Filter
         */
        filterStoreroomForLookup: function (eventContext) {
            var additionalStoreroom = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalstoreroom"
            );
            var filter = [];

            additionalStoreroom._lookupFilter = null;

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();

            var siteid = transfersResource.get("siteid");

            CommonHandler._clearFilterForResource(eventContext, additionalStoreroom);

            if (siteid) filter.push({ siteid: siteid });

            additionalStoreroom.lookupFilter = filter;
        },

        /**
         * To storeroom Lookup Data Filter
         */
        filterToStoreroomForLookup: function (eventContext) {
            var additionalStoreroom = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalstoreroom"
            );
            var filter = [];

            additionalStoreroom._lookupFilter = null;

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();

            var tositeid = transfersResource.get("tositeid");

            CommonHandler._clearFilterForResource(eventContext, additionalStoreroom);

            if (tositeid) {
                filter.push({ siteid: tositeid });
                additionalStoreroom.lookupFilter = filter;
            }
        },

        /**
         * Check and validate From storeroom input
         */
        validateFromStoreroom: function (eventContext) {
            var transfersResource = eventContext.getCurrentRecord();
            var siteid = transfersResource.getPendingOrOriginalValue("siteid");
            var storeroom = transfersResource.getPendingOrOriginalValue("storeroom");

            if (storeroom && storeroom.length > 0) {
                var self = this;
                // Querying storerooms available
                ModelService.filtered(
                    "additionalstoreroom",
                    null,
                    [{ location: storeroom, siteid: siteid }],
                    null,
                    false,
                    true
                ).then(function (storeroomSet) {
                    if (storeroomSet.count() == 0) {
                        self.ui.showMessage(
                            MessageService.createStaticMessage("invalidLocation").getMessage()
                        );
                        transfersResource.set("storeroom", "");
                    } else {
                        var validStoreroom = storeroomSet.getRecordAt(0);
                        transfersResource.set("storeroom", validStoreroom.location);
                    }
                });
            }
        },

        /**
         * Check and validate To storeroom input
         */
        validateToStoreroom: function (eventContext) {
            var transfersResource = eventContext.getCurrentRecord();
            var siteid = transfersResource.getPendingOrOriginalValue("tositeid");
            var storeroom = transfersResource.getPendingOrOriginalValue("tostoreroom");

            var filter = [];

            if (siteid && storeroom) {
                filter.push({ siteid: siteid, location: storeroom });
            } else if (storeroom && !siteid) {
                filter.push({ location: storeroom });
            }

            if (storeroom && storeroom.length > 0) {
                var self = this;
                // Querying storerooms available
                ModelService.filtered("additionalstoreroom", null, filter, null, false, true).then(
                    function (storeroomSet) {
                        if (storeroomSet.count() == 0) {
                            self.ui.showMessage(
                                MessageService.createStaticMessage("invalidLocation").getMessage()
                            );
                            transfersResource.set("tostoreroom", "");
                        } else {
                            var validStoreroom = storeroomSet.getRecordAt(0);
                            transfersResource.set("tostoreroom", validStoreroom.location);
                        }
                    }
                );
            }
        },

        /**
         * Rotating Asset Lookup Data Filter
         */
        filterRotAssetForLookup: function (eventContext) {
            var additionalasset = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalasset"
            );
            var itemnum = this.ui.application
                .getResource("splitqtyacrossbins")
                .getCurrentRecord()
                .get("itemnum");
            var siteid = UserManager.getInfo("defsite");
            var storeroom = this.ui.application
                .getResource("splitqtyacrossbins")
                .getCurrentRecord()
                .get("storeloc");
            var filter = [];
            CommonHandler._clearFilterForResource(eventContext, additionalasset);
            filter.push({ itemnum: itemnum, siteid: siteid, storeloc: storeroom });

            additionalasset.lookupFilter = filter;
        },

        /**
         * Item Lookup Data Filter
         *
         * Filter Hint:
         * 	a. It is case sensitive
         * 	b. Each object added is considered in filter as OR
         * 	c. Each attribute of an object in filter is considered as AND
         */

        asyncfilterItemForLookup: function (eventContext) {
            var additionalInventory = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalInventory"
            );

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var siteid = transfersResource.get("siteid");
            var storeroom = transfersResource.get("storeroom"); //.toUpperCase();

            CommonHandler._clearFilterForResource(eventContext, additionalInventory);

            additionalInventory.lookupFilter = this.buildFilterForItem(
                eventContext,
                siteid,
                storeroom
            );
        },

        /**
         * Location Lookup Data Filter
         */
        filterLocationForLookup: function (eventContext) {
            var additionallocations = CommonHandler._getAdditionalResource(
                eventContext,
                "additionallocations"
            );
            var filter = [];
            additionallocations.lookupFilter = null;

            var siteid = UserManager.getInfo("defsite");
            filter.push({ siteid: siteid });

            additionallocations.lookupFilter = filter;
        },

        /**
         * Set Default Site Id on storeroom view
         */
        storeroomSiteRender: function (eventContext) {
            var siteid = UserManager.getInfo("defsite");
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfers.set("siteid", siteid);
        },

        /**
         * Set fields readonly exclusive of each other on Search View.
         */
        setFieldsReadonly: function (eventContext) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var ponum = transfers.getPendingOrOriginalValue("ponum");
            //var assetnum = transfers.getPendingOrOriginalValue('asset');

            //transfers.getRuntimeFieldMetadata('ponum').set('readonly', false);
            //transfers.getRuntimeFieldMetadata('polinenum').set('readonly', false);

            //#region Loc-In: Add fields
            var formno = transfers.getPendingOrOriginalValue("formno");

            if (ponum) {
                transfers.getRuntimeFieldMetadata("formno").set("readonly", true);
            } else if (formno) {
                transfers.getRuntimeFieldMetadata("ponum").set("readonly", true);
            } else {
                transfers.getRuntimeFieldMetadata("formno").set("readonly", false);
                transfers.getRuntimeFieldMetadata("ponum").set("readonly", false);
            }
            //#endregion Loc-Out: Add fields
        },

        /**
         * Search Reserved Items - Button action on search view
         */
        searchReservedItem: function (eventContext) {
            var filter = [];
            var filter2 = [];
            var oslcQueryParameters = {};
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var domainIssueTypes = CommonHandler._getAdditionalResource(
                eventContext,
                "domainissuetype"
            );
            var shiptransferIssueType = SynonymDomain.resolveToDefaultExternal(
                domainIssueTypes,
                "SHIPTRANSFER"
            );
            //var wonum = transfers.wonum;
            //var assetnum = transfers.asset;
            var siteid = UserManager.getInfo("defsite");
            var storeroom = transfers.storeroom;
            var tostoreroom = transfers.tostoreroom;
            var tositeid = transfers.tositeid;
            var ponum = transfers.ponum;
            //#region Loc-In: Add fields
            var formno = transfers.formno;
            //#endregion Loc-Out: Add fields
            var reservationDaysInAdvance = AppConfig.getSearchDays();
            var self = this;

            //PO is required
            //#region Loc-In: Add FormNo is required
            //if(!ponum){
            //var msg = MessageService.createStaticMessage("reqPO").getMessage();
            if (!ponum && !formno) {
                var msg = MessageService.createStaticMessage("reqPOorFormNo").getMessage();
                //#endregion Add FormNo is required
                self.ui.showMessage(msg);
                return;
            }

            //verify if we have at least one field filled
            if (!storeroom && !tostoreroom && !tositeid) {
                var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
                self.ui.showMessage(msg);
                return;
            }

            //from storeroom is required
            if (!storeroom) {
                var msg = MessageService.createStaticMessage("reqFromStoreroom").getMessage();
                self.ui.showMessage(msg);
                return;
            }

            //verify if fromstoreroom is different of tostoreroom
            if (storeroom == tostoreroom && siteid == tositeid) {
                var msg = MessageService.createStaticMessage(
                    "fromStoreroomEqualsToStoreroom"
                ).getMessage();
                self.ui.showMessage(msg);
                return;
            }

            if (this.getError(eventContext)) {
                throw new PlatformRuntimeException("reviewErrors");
            }

            // Checking connectivity
            CommunicationManager.checkConnectivityAvailable().then(function (hasConnectivity) {
                //eventContext.application.showBusy();
                if (hasConnectivity) {
                    //flush transactions before searching
                    var flushPromise = PushingCoordinatorService.flush();
                    flushPromise
                        .then(function () {
                            filter.push({ siteid: siteid });

                            if (storeroom) {
                                filter.push({ location: storeroom });
                            }
                            if (tostoreroom) {
                                filter.push({ tostoreloc: tostoreroom });
                            }
                            if (tositeid) {
                                filter.push({ tositeid: tositeid });
                            }
                            if (ponum) {
                                filter.push({ ponum: ponum });
                            }
                            //#region Loc-In: Add fields
                            if (formno) {
                                filter.push({ formno: "%" + formno + "%" });
                            }

                            var invreserveSet = eventContext.getResource("invreserve");
                            CommonHandler._clearFilterForResource(eventContext, invreserveSet);
                            //#endregion Loc-Out: Add fields

                            var invreservePromise = ModelService.filtered(
                                "invreserve",
                                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                                filter,
                                1000,
                                true,
                                true,
                                oslcQueryParameters,
                                false
                            );
                            invreservePromise
                                .then(function (invreserveSet) {
                                    //display records which have remaining reservations
                                    invreserveSet.filter("qtyRemaining == true");

                                    //verify if search result data is empty
                                    if (invreserveSet.data.length == 0) {
                                        var msg =
                                            MessageService.createStaticMessage(
                                                "emptySearchResult"
                                            ).getMessage();
                                        self.ui.showMessage(msg);
                                        return;
                                    }

                                    ModelService.clearSearchResult(invreserveSet);
                                    invreserveSet.resourceID = "invreserve";
                                    //sort by localsortbin - needed since dynamic mapped bin sorting is not working on initial load.
                                    invreserveSet.sort("localsortbin asc");
                                    eventContext.application.addResource(invreserveSet);
                                    eventContext.ui.show("Transfers.InvreserveListView");
                                })
                                .otherwise(function (error) {
                                    Logger.trace(self._className + ": " + error);
                                });
                        })
                        .otherwise(function (error) {
                            Logger.trace(self._className + ": " + error);
                        });
                } else {
                    self.ui.showMessage(
                        MessageService.createStaticMessage("connectionFailure").getMessage()
                    );
                }
                eventContext.application.hideBusy();
            });
        },

        /**
         * Cancels the Additional Items on Items Details View (Unreserved Item) and returns back to the list view or search view with fields cleared.
         */
        cancelAdditionalItems: function (eventContext) {
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
            this.clearSearchFields(eventContext);
        },

        completeAdditionalItems: function (eventContext) {
            Logger.trace(self._className + ": completeAdditionalItems");
        },

        /**
         * Clears search view fields.
         */
        clearSearchFields: function (eventContext) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfers.setNullValue("ponum");
            transfers.setNullValue("itemnum");
            transfers.setNullValue("itemdesc");
            transfers.setNullValue("bin");
            transfers.setNullValue("storeroom");
            transfers.setNullValue("tositeid");
            transfers.setNullValue("tostoreroom");
            //#region Loc-In: clear formno value
            transfers.setNullValue("formno");
            //#endregion Loc-Out: clear formno value
        },

        /**
         * Reset search fields upon initial entry of the view, initialize within app.xml
         */
        resetSearchFields: function (eventContext) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfers.setNullValue("ponum");
            transfers.setNullValue("itemnum");
            transfers.setNullValue("itemdesc");
            transfers.setNullValue("bin");
            transfers.setNullValue("shipment");
            //#region Loc-In: clear new field value
            transfers.setNullValue("formno");
            transfers.setNullValue("documentref");
            //#endregion Loc-Out: clear formno value
        },

        resetAdditionalItemFields: function (eventContext) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transferAdditionalItems"
            ).getCurrentRecord();
            transfers.setNullValue("wonum");
            transfers.setNullValue("asset");
            transfers.setNullValue("location");
            transfers.setNullValue("glaccount");
            transfers.setNullValue("taskid");
            transfers.setNullValue("issueto");
            transfers.setNullValue("glcreditacct");
            transfers.setNullValue("gldebitacct");
            transfers.setNullValue("frombin");
            transfers.setNullValue("tobin");
            transfers.setNullValue("fromlot");
            transfers.setNullValue("tolot");

            //#region Loc-In: clear new fields
            transfers.setNullValue("actualdate");
            transfers.setNullValue("frombincurbal");
            transfers.setNullValue("issueTo");
            transfers.setNullValue("issueQty");
            transfers.setNullValue("tostoreroom");
            transfers.setNullValue("tositeid");
            transfers.setNullValue("conversion");

            eventContext.application[
                "application.handlers.TransfersAvailableItemsHandler"
            ].clearAdditionalUsage(eventContext);
            //#region Loc-Out: clear new fields
        },

        /**
         * Clears search fields for Transferred Items for Return
         */
        /*clearReturnSearchFields : function(eventContext) {
			var transfers = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			transfers.setNullValue('itemnum');
			transfers.setNullValue('wonum');
		},*/

        /**
         * Validation for quantity field on Transfer Receive Item (Ship and Complete action)
         */
        validateNumericFieldTransferItem: function (eventContext, currentRecord) {
            if (!currentRecord) {
                currentRecord = eventContext.getCurrentRecord();
            }
            var item = currentRecord.get("item");
            var qty = currentRecord.get("localreservedqty");
            var qtyAvailable = currentRecord.get("reservedqty");

            //verify if issue quantity is a positive number
            if (NumberUtil.parse(qty, this.application.getUserLocale()) < 0) {
                var msg = MessageService.createResolvedMessage("quantityPositive");
                this.ui.showMessage(msg);
                return false;
            }
            //verify if issue quantity is a valid number
            else if (qty == null || qty == undefined || isNaN(NumberUtil.parse(Number(qty)))) {
                var msg = MessageService.createResolvedMessage("newReadingNaN", [qty]);
                this.ui.showMessage(msg);
                return false;
            }
            return true;
        },

        iterateAllRecordsToCheckQuantity: function (eventContext) {
            //iterate over all records on list and check if at least on item has positive quantity
            var countItemsPositiveQuantity = 0;
            for (var index in eventContext.getResource("invreserve").data) {
                var elem = eventContext.getResource("invreserve").data[index];
                if (!this.validateNumericFieldTransferItem(eventContext, elem)) {
                    return false;
                }
                if (elem.get("localreservedqty") > 0) {
                    countItemsPositiveQuantity++;
                }
            }
            if (countItemsPositiveQuantity == 0) {
                var msg = MessageService.createResolvedMessage("quantityPositive");
                eventContext.ui.showMessage(msg);
                return false;
            }
            return true;
        },

        completeReservation: function (eventContext) {
            if (this.iterateAllRecordsToCheckQuantity(eventContext)) {
                this.initiateTransfer(eventContext, "COMPLETE");
            }
        },

        shipReservation: function (eventContext) {
            /* #region Tuan-in: add checkbox to reserved Items List  */
            var invreserveSet = eventContext.getResource();
            this.checkBoxValidation(eventContext, invreserveSet);
            /* #endregion Tuan-out: add checkbox to reserved Items List  */
            if (this.iterateAllRecordsToCheckQuantity(eventContext)) {
                this.initiateTransfer(eventContext, "SHIPPED");
            }
        },

        /**
         * Cancels the Reservation and returns back to the search view with fields cleared.
         */
        cancelReservation: function (eventContext) {
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
            this.clearSearchFields(eventContext);
            //#region Loc-In: clear reserved header
            this.clearReservedHeader(eventContext);
            //#endregion Loc-Out: clear reserved header
        },

        /**
         * Create Shipment and change status to shipped.
         */
        shipItems: function (eventContext) {
            eventContext.application.showBusy();
            var invuse = this.application.getResource("invuse").getCurrentRecord();
            var self = this;
            var searchView = this.getSearchView(eventContext);
            var status = this.getStatus(eventContext);

            //create shipment record
            this.shipment(eventContext, self);

            //change status after shipment record is created
            self.changeStatus(invuse, eventContext, searchView, self, status);
            this.clearStatus(eventContext);
            this.clearSearchView(eventContext);
        },

        /**
		 * Create Shipment document and load items on shipment document
		 
		shipItemsNoSplits : function(eventContext){
			var transfers = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();
			var invuse = this.application.getResource("invuse").getCurrentRecord();
			var self = this;
			
			var shipmentline = "";
			invuse.getModelDataSet("shipment", true).then(function(shipmentSet){
				invuse.openPriorityChangeTransaction();
				var shipment = shipmentSet.createNewRecord();
				shipment.set('siteid',transfers.tositeid);
				shipment.setDateValue('shipdate',self.application.getCurrentDateTime());
								
				invuse.getModelDataSet("invuseline", true).then(function(invuselineSet){
					arrayUtil.forEach(invuselineSet.data, function(ivline){
						//create and populate shipment lines
						invuse.getModelDataSet("shipmentline", true).then(function(shipmentlineset){
							shipmentline = shipmentlineset.createNewRecord();	

							shipmentline.set('itemnum',ivline.itemnum);
							shipmentline.set('itemdescription',ivline.description);
							shipmentline.set('itemsetid',ivline.itemsetid);
							var qty = ivline.quantity;
							shipmentline.set('shippedqty',qty.toString());
							shipmentline.set('fromstoreloc',ivline.fromstoreloc);
							shipmentline.set('tostoreloc',ivline.tostoreloc);							
							//shipmentline.set('fromsiteid',ivline.fromsiteid);
							shipmentline.set('siteid',ivline.tositeid);
							shipmentline.set('toorgid',ivline.toorgid);
							//shipmentline.set('fromorgid',ivline.fromorgid);

							shipmentline.set('invuselinenum',ivline.invuselinenum);
							//shipmentline.set('invuselineid',ivline.invuselineid);
							//shipmentline.set('invuselinesplitid',ivline.invuselinesplitid);
							
							shipmentline.set('frombin',ivline.frombin);
							shipmentline.set('fromlot',ivline.fromlot);
							shipmentline.set('rotassetnum',ivline.rotassetnum);

							shipmentline.set('comments','');

							shipmentline.set('ponum',ivline.ponum);
							shipmentline.set('polinenum',ivline.polinenum);
							shipmentline.set('polineid',ivline.polineid);
							shipmentline.set('revisionnum',ivline.porevisionnum);
						});
					});
					invuse.closePriorityChangeTransaction();	
					shipmentSet.resourceID = 'shipmentResource';
					eventContext.application.addResource(shipmentSet);
					
					//Display shipment view after shipment lines have been created and populated
					eventContext.ui.show("Transfers.ShipmentDetailView");
				});				
			});
			
		},
		 */

        /**
         * Reset Shipment Detail View
         */
        clearSetShipmentDetailData: function (eventContext) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var tempShipmentResource = CommonHandler._getAdditionalResource(
                eventContext,
                "tempShipmentResource"
            ).getCurrentRecord();
            tempShipmentResource.set("siteid", transfers.tositeid);
            tempShipmentResource.setDateValue("shipdate", this.application.getCurrentDateTime());

            var splitqtyacrossbinsResource = CommonHandler._getAdditionalResource(
                eventContext,
                "splitqtyacrossbins"
            );

            if (splitqtyacrossbinsResource != null) {
                var splitqtyacrossbins = splitqtyacrossbinsResource.getCurrentRecord();

                if (splitqtyacrossbins != null) {
                    var rotassetnum = splitqtyacrossbins.get("rotassetnum");
                    if (rotassetnum != null) tempShipmentResource.set("rotassetnum", rotassetnum);
                }
            }

            tempShipmentResource.setNullValue("expreceiptdate");
            tempShipmentResource.setNullValue("carrier");
            tempShipmentResource.setNullValue("packingslipnum");
            tempShipmentResource.setNullValue("shiptoattn");
            tempShipmentResource.setNullValue("shipto");
        },

        /**
         * Transition to Shipment Detail View
         */
        shipItemsWithSplits: function (eventContext, myThis) {
            //Display tempShipmentRecource view to collect shipment data
            eventContext.ui.show("Transfers.ShipmentDetailView");
        },

        /**
         * Create Shipment document and load items on shipment document with Splits
         */
        shipment: function (eventContext, myThis) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var tempShipmentResource = CommonHandler._getAdditionalResource(
                eventContext,
                "tempShipmentResource"
            ).getCurrentRecord();
            var self = this;

            //need this if coming from other handler
            if (myThis) {
                self = myThis;
            }

            var invuse = self.application.getResource("invuse").getCurrentRecord();

            var shipmentline = "";
            invuse.getModelDataSet("shipment", true).then(function (shipmentSet) {
                invuse.openPriorityChangeTransaction();
                var shipment = shipmentSet.createNewRecord();
                shipment.set("siteid", transfers.tositeid);
                shipment.set("shipdate", tempShipmentResource.shipdate);
                shipment.set("expreceiptdate", tempShipmentResource.expreceiptdate);
                shipment.set("carrier", tempShipmentResource.carrier);
                shipment.set("packingslipnum", tempShipmentResource.packingslipnum);
                shipment.set("shiptoattn", tempShipmentResource.shiptoattn);
                shipment.set("shipto", tempShipmentResource.shipto);

                shipment.setDateValue("shipdate", self.application.getCurrentDateTime());
                invuse.getModelDataSet("shipmentline", true).then(function (shipmentlineset) {
                    invuse.getModelDataSet("invuseline", true).then(function (invuselineSet) {
                        invuse
                            .getModelDataSet("npinvuselinesplit", true)
                            .then(function (npSplitSet) {
                                arrayUtil.forEach(invuselineSet.data, function (ivline) {
                                    var foundSplitRecord = false;
                                    arrayUtil.forEach(npSplitSet.data, function (iSplit) {
                                        if (
                                            ivline.get("anywhereRefId") ==
                                            iSplit.get("invuselinelinkid")
                                        ) {
                                            foundSplitRecord = true;
                                        }
                                    });

                                    if (foundSplitRecord == false) {
                                        //invuseline record has no split records.
                                        //add invuseline into shipment
                                        shipmentline = shipmentlineset.createNewRecord();

                                        shipmentline.set("itemnum", ivline.itemnum);
                                        shipmentline.set("itemdescription", ivline.description);
                                        shipmentline.set("itemsetid", ivline.itemsetid);
                                        var qty = ivline.quantity;
                                        shipmentline.set("shippedqty", qty.toString());
                                        shipmentline.set("fromstoreloc", ivline.fromstoreloc);
                                        shipmentline.set("tostoreloc", ivline.tostoreloc);
                                        shipmentline.set("fromsiteid", invuse.siteid);
                                        //shipmentline.set('tositeid',ivline.tositeid);
                                        shipmentline.set("toorgid", ivline.toorgid);
                                        shipmentline.set("fromorgid", invuse.orgid);

                                        shipmentline.set(
                                            "shipmentlinelinkid",
                                            ivline.get("anywhereRefId")
                                        ); //link invuseline with shipmentline

                                        shipmentline.set("invuselinenum", ivline.invuselinenum);
                                        //shipmentline.set('invuselineid',ivline.invuselineid);
                                        //shipmentline.set('invuselinesplitid',ivline.invuselinesplitid);

                                        shipmentline.set("frombin", ivline.frombin);
                                        shipmentline.set("fromlot", ivline.fromlot);
                                        shipmentline.set("rotassetnum", ivline.rotassetnum);

                                        shipmentline.set("comments", "");

                                        shipmentline.set("ponum", ivline.ponum);
                                        shipmentline.set("polinenum", ivline.polinenum);
                                        shipmentline.set("polineid", ivline.polineid);
                                        var porevisionnum = 0;
                                        if (ivline.porevisionnum) {
                                            porevisionnum = ivline.porevisionnum;
                                        }
                                        shipmentline.set("revisionnum", porevisionnum);
                                    }
                                });

                                //check if split records exist and create shipment lines.
                                if (npSplitSet.count() > 0) {
                                    arrayUtil.forEach(
                                        npSplitSet.data,
                                        function (invuselineSplitRec) {
                                            shipmentline = shipmentlineset.createNewRecord();

                                            shipmentline.set("itemnum", invuselineSplitRec.itemnum);
                                            shipmentline.set(
                                                "itemdescription",
                                                invuselineSplitRec.invuseline.description
                                            );
                                            shipmentline.set(
                                                "itemsetid",
                                                invuselineSplitRec.itemsetid
                                            );
                                            var qty = invuselineSplitRec.quantity;
                                            shipmentline.set("shippedqty", qty.toString());
                                            shipmentline.set(
                                                "fromstoreloc",
                                                invuselineSplitRec.fromstoreloc
                                            );
                                            shipmentline.set(
                                                "tostoreloc",
                                                invuselineSplitRec.invuseline.tostoreloc
                                            );
                                            shipmentline.set("fromsiteid", invuse.siteid);
                                            shipmentline.set(
                                                "siteid",
                                                invuselineSplitRec.invuseline.tositeid
                                            );
                                            shipmentline.set(
                                                "toorgid",
                                                invuselineSplitRec.invuseline.toorgid
                                            );
                                            shipmentline.set("fromorgid", invuse.orgid);

                                            shipmentline.set(
                                                "shipmentlinelinkid",
                                                invuselineSplitRec.invuseline.get("anywhereRefId")
                                            ); //link invuseline with shipmentline

                                            shipmentline.set(
                                                "invuselinenum",
                                                invuselineSplitRec.invuseline.invuselinenum
                                            );
                                            //shipmentline.set('invuselineid',ivline.invuselineid);
                                            //shipmentline.set('invuselinesplitid',ivline.invuselinesplitid);

                                            shipmentline.set("frombin", invuselineSplitRec.frombin);
                                            shipmentline.set("fromlot", invuselineSplitRec.fromlot);
                                            shipmentline.set(
                                                "rotassetnum",
                                                invuselineSplitRec.rotassetnum
                                            );

                                            shipmentline.set("comments", "");

                                            shipmentline.set(
                                                "ponum",
                                                invuselineSplitRec.invuseline.ponum
                                            );
                                            shipmentline.set(
                                                "polinenum",
                                                invuselineSplitRec.invuseline.polinenum
                                            );
                                            shipmentline.set(
                                                "polineid",
                                                invuselineSplitRec.invuseline.polineid
                                            );

                                            var porevisionnum = 0;
                                            if (invuselineSplitRec.invuseline.porevisionnum) {
                                                porevisionnum =
                                                    invuselineSplitRec.invuseline.porevisionnum;
                                            }

                                            shipmentline.set("revisionnum", porevisionnum);
                                        }
                                    );
                                }

                                invuse.closePriorityChangeTransaction();
                                //							shipmentSet.resourceID = 'shipmentResource';
                                //							eventContext.application.addResource(shipmentSet);

                                //Display shipment view after shipment lines have been created and populated
                                // eventContext.ui.show("Transfers.ShipmentDetailView");
                                /* #region Tuan-In: Show search in reserve View after shipment complete */
                                eventContext.ui.returnToView("Transfers.SearchInvreserveView");
                                /* #endregion Tuan-In: Show search in reserve View after shipment complete*/
                            });
                    });
                });
            });
        },

        /* #region Tuan-in: clear fillter for checkbox */
        clearFilterShipmentData: function (eventContext) {
            var records = CommonHandler._getAdditionalResource(eventContext, "invreserve");
            CommonHandler._clearFilterForResource(eventContext, records);
        },
        /* #endregion Tuan-out: clear fillter for checkbox */

        /**
         * Transfers an Item
         * Invuse and Invuselines are created everytime an item is transferred.
         */
        initiateTransfer: function (eventContext, newStatus) {
            var invreserveSet = eventContext.getResource();
            var invuseResource = this.application.getResource("invuse");
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var invuse = null;
            var invuseline = null;
            var storeroom = transfers.storeroom;
            var siteid = transfers.siteid;
            var self = this;

            //#region Loc-In: Add attributes
            var transfersReservedHeader = eventContext.application
                .getResource("transfersReservedHeader")
                .getCurrentRecord();
            var formNumber = transfersReservedHeader.get("formnumber");
            var description = transfersReservedHeader.get("description");
            var documentRef = transfersReservedHeader.get("documentref");
            var createDate = transfersReservedHeader.get("createdate");

            /* #region  Tuan-in: require formlot */
            var validFromlot = true;
            arrayUtil.forEach(invreserveSet.data, function (item) {
                if (!item.fromlot) validFromlot = false;
            });
            if (!validFromlot) {
                var msg = MessageService.createStaticMessage("requiredField").getMessage();
                self.ui.showMessage(msg);
                return;
            }
            /* #endregion  Tuan-in: require formlot*/

            if (!formNumber || !description || !createDate) {
                var msg = MessageService.createStaticMessage("requiredField").getMessage();
                self.ui.showMessage(msg);
                return;
            }
            //#endregion Loc-Out: Add attributes

            //show busy message
            eventContext.application.showBusy();

            //check negative availability
            var negPromise = this.checkNegativeAvailability(eventContext, invreserveSet, transfers);
            negPromise
                .then(function (negObject) {
                    //clear any data that may have been stuck in resource from prior transactions
                    invuseResource.data = [];
                    invuseResource._recordsToCreate = [];

                    //reset splitrotateresource
                    var splitrotateresource =
                        eventContext.application.getResource("splitrotateresource");
                    splitrotateresource.data = [];

                    var domaininvusestatus = CommonHandler._getAdditionalResource(
                        eventContext,
                        "domaininvusestatus"
                    );
                    var currentStatus = SynonymDomain.resolveToDefaultExternal(
                        domaininvusestatus,
                        "ENTERED"
                    );

                    var domainitemtypes = CommonHandler._getAdditionalResource(
                        eventContext,
                        "domainitemtype"
                    );
                    var toolItemType = SynonymDomain.resolveToInternal(
                        domainitemtypes,
                        SynonymDomain.resolveToDefaultExternal(domainitemtypes, "TOOL")
                    );

                    var domainusetype = CommonHandler._getAdditionalResource(
                        eventContext,
                        "domainusetype"
                    );

                    var domaininvusetype = CommonHandler._getAdditionalResource(
                        eventContext,
                        "domaininvusetype"
                    );
                    var transfertype = SynonymDomain.resolveToDefaultExternal(
                        domaininvusetype,
                        "TRANSFER"
                    );
                    //Loc-In
                    // set actualDate is current DateTime
                    var actualDate = self.application.getCurrentDateTime();
                    //Loc-Out

                    //check if records exist in order to create invuse
                    arrayUtil.forEach(invreserveSet.data, function (invreserve) {
                        if (invreserve.localreservedqty > 0) {
                            if (!invuse) {
                                var ponum = invreserve.ponum;
                                invuse = invuseResource.createNewRecord();
                                invuse.openPriorityChangeTransaction();
                                invuse.set("usetype", transfertype);
                                if (ponum && ponum.length > 0) {
                                    invuse.set(
                                        "description",
                                        MessageService.createResolvedMessage(
                                            "invuseDescriptionPO",
                                            [ponum]
                                        )
                                    );
                                } else {
                                    invuse.set(
                                        "description",
                                        MessageService.createResolvedMessage("invuseDescription")
                                    );
                                }
                                invuse.set("fromstoreloc", storeroom);
                                invuse.set("status", currentStatus);
                                invuse.set("siteid", siteid);
                                //#region Loc-In: set header fields
                                invuse.set("formnumber", formNumber);
                                invuse.set("description", description);
                                invuse.set("documentref", documentRef);
                                invuse.set("createdate", createDate);
                                //#endregion Loc-Out: set header fields
                                invuse.closePriorityChangeTransaction();
                            }
                            return;
                        }
                    });

                    //initialize invuseline on new invuse record
                    invuse.getModelDataSet("invuseline", true).then(function (ivline) {
                        var i = 1;
                        var deferreds = [];
                        //The Invuseline transactions are wrapped around a priorityChangeTransaction in order for them to get
                        //sent to the server before the change status transaction.  Important to note, that the  openPriorityChangeTransaction
                        //is defined using the parent object invuse.
                        invuse.openPriorityChangeTransaction();
                        arrayUtil.forEach(invreserveSet.data, function (invreserve) {
                            if (invreserve.localreservedqty > 0) {
                                invuseline = ivline.createNewRecord();

                                var splitPromise = new Deferred();
                                invuseline.set("usetype", transfertype);
                                //invuseline.set('tostoreloc',storeroom);
                                invuseline.set("quantity", invreserve.localreservedqty);
                                invuseline.set("siteid", siteid);

                                invuseline.set("invuselinenum", i++);
                                invuseline.set("itemnum", invreserve.item);
                                invuseline.set("description", invreserve.itemdesc);
                                invuseline.set("itemsetid", invreserve.itemsetid);
                                invuseline.set("frombin", invreserve.binnum);
                                invuseline.set("fromlot", invreserve.lotnum);
                                invuseline.set("gldebitacct", invreserve.glaccount);
                                invuseline.set("requestnum", invreserve.requestnum);
                                invuseline.set("tositeid", invreserve.tositeid);
                                invuseline.set("tostoreloc", invreserve.tostoreloc);
                                invuseline.set("issueto", invreserve.issueTo);
                                invuseline.set("ponum", invreserve.ponum);
                                invuseline.set("polinenum", invreserve.polinenum);
                                invuseline.set("porevisionnum", invreserve.porevisionnum);
                                //#region Loc-In
                                // A value required for the ActualDate field on the INVUSELINE object
                                //invuseline.setDateValue("actualdate", actualDate);
                                invuseline.set("actualdate", invreserve.actualdate);
                                //#endregion Loc-Out

                                var dataKey =
                                    invreserve.item +
                                    "::" +
                                    storeroom +
                                    "::" +
                                    siteid +
                                    "::" +
                                    invreserve.itemsetid;
                                var negativeAvailMaxvar = negObject.negativeAvailMaxvar;
                                var itemBalanceMap = negObject.itemBalanceMap;
                                var curbaltotalMap = negObject.curbaltotalMap;
                                var itemAvailableBalanceMap = negObject.itemAvailableBalanceMap;

                                //rotating
                                if (invreserve.rotating) {
                                    var rotatingItemTotalQty = itemBalanceMap[dataKey];
                                    var curbaltotalQty = curbaltotalMap[dataKey];

                                    if (rotatingItemTotalQty > curbaltotalQty) {
                                        //not enough rotating item balance in bins stop
                                        //have user change reserve qty
                                        var msg =
                                            MessageService.createResolvedMessage("splitLineQtyRot");
                                        self.ui.showMessage(msg);
                                        eventContext.application.hideBusy();
                                        throw new PlatformRuntimeException("splitLineQtyRot");
                                    }
                                }

                                /* Negative Availability check is not needed here, since reserved items already get checked when the PO is created/approved
							if(!invreserve.rotating && negativeAvailMaxvar=='ALLOW'){
								var itemBalanceRequested = itemBalanceMap[dataKey];
								var itemQtyAvailable = itemAvailableBalanceMap[dataKey];
								
								if(itemBalanceRequested>itemQtyAvailable){
									//skip splitting this one
									splitPromise.resolve();
									deferreds.push(splitPromise);
									return;
								}
							}
							*/

                                //check split
                                splitPromise = self.checkSplit(
                                    eventContext,
                                    invreserve,
                                    invuse,
                                    invuseline
                                );
                                deferreds.push(splitPromise);
                            }
                        });
                        //#region Loc-In: adjust closePriorityChangeTransaction order
                        /* invuse.closePriorityChangeTransaction();

					all(deferreds).then(function(){ */

                        var execCloseTransaction = false;
                        all(deferreds).then(function () {
                            if (execCloseTransaction == false) {
                                invuse.closePriorityChangeTransaction();
                                execCloseTransaction = true;
                            }
                            //#endregion Loc-Out: adjust closePriorityChangeTransaction order
                            var splitrotateresource =
                                eventContext.application.getResource("splitrotateresource");
                            if (splitrotateresource && splitrotateresource.count() > 0) {
                                self.setStatus(eventContext, newStatus);
                                self.setSearchView(eventContext, "Transfers.SearchInvreserveView");
                                eventContext.ui.show("Transfers.SplitQtyRotatingAssetView");
                            } else {
                                //no split necessary  -- CHANGE STATUS
                                if (newStatus && newStatus == "SHIPPED") {
                                    self.setStatus(eventContext, "SHIPPED");
                                    self.setSearchView(
                                        eventContext,
                                        "Transfers.SearchInvreserveView"
                                    );
                                    self.shipItemsWithSplits(eventContext);
                                } else {
                                    self.changeStatus(
                                        invuse,
                                        eventContext,
                                        "Transfers.SearchInvreserveView",
                                        self,
                                        "COMPLETE"
                                    );
                                }
                            }
                        });
                    });
                })
                .otherwise(function (error) {
                    Logger.trace(self._className + ": " + error);
                });
        },

        /**
         * Change Status
         *
         * Status will be change to Complete when issuing an item
         */
        changeStatus: function (invuse, eventContext, startingSearchView, currentThis, status) {
            var statusChange = CommonHandler._getAdditionalResource(
                currentThis,
                "statusChangeResource"
            ).getCurrentRecord();
            var transferAdditionItemRecord = eventContext.application
                .getResource("transferAdditionalItems")
                .getCurrentRecord();
            var memo = statusChange.get("memo");
            var statusDate = this.application.getCurrentDateTime();
            var invuseResource = invuse.getOwner();
            var self = this;

            //change status
            if (status == "COMPLETE") {
                InvuseObject.complete(invuse, statusDate, memo, eventContext);
            } else if (status == "SHIPPED") {
                InvuseObject.shipped(invuse, statusDate, memo, eventContext);
            } else {
                InvuseObject.cancelled(invuse, statusDate, memo, eventContext);
            }

            ModelService.save(invuseResource)
                .then(function () {
                    //flush transactions before checking for errors
                    var flushPromise = PushingCoordinatorService.flush();
                    flushPromise.then(function () {
                        self.clearSearchFields(eventContext);

                        //#region Loc-In: clear Reserved Header
                        self.clearReservedHeader(eventContext);
                        //#endregion Loc-Out: clear Reserved Header

                        //clear non-persistents
                        //					invuse.npinvuselinesplit = [];
                        //					invuse.shipment = [];
                        //					invuse.shipmentline = [];

                        //reset fields
                        transferAdditionItemRecord.issueQty = "";
                        transferAdditionItemRecord.conversion = "";
                        self.resetAdditionalItemFields(eventContext);

                        //startingSearchView - if null or not defined just change status no transition needed
                        if (startingSearchView) {
                            eventContext.application.hideBusy();
                            eventContext.ui.returnToView(startingSearchView);
                        }
                    });
                })
                .otherwise(function (err) {
                    //#region Loc-In: clear Reserved Header
                    self.clearReservedHeader(eventContext);
                    //#endregion Loc-Out: clear Reserved Header
                    eventContext.application.hideBusy();
                    eventContext.ui.showMessage(err);
                });
        },

        discardView: function (eventContext) {
            //cleanupEditAssetView method is invoked as callback of hideCurrentView
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        hideDialog: function (eventContext) {
            eventContext.ui.hideCurrentDialog();
        },

        /**
         **** VIEW TRANSITION METHODS ****
         */

        /**
         * Transits to Search view of Transfer Planned Items
         * Validates required data and transits to Transfer Planned Items Search view
         */
        transitsToTransferPlannedSearchView: function (eventContext) {
            if (!this._isRequiredFieldFilled(eventContext)) {
                this.ui.showMessage(
                    MessageService.createStaticMessage("requiredField").getMessage()
                );
                return;
            }
            this.clearSearchFields(eventContext);
            this.ui.show("Transfers.SearchInvreserveView");
        },

        /**
         * Transits Back to Search view of Transfer Planned Items
         * transits to Transfer Planned Items Search view
         */
        transitsBackToTransferPlannedSearchView: function (eventContext) {
            eventContext.application["application.handlers.TransfersHandler"].clearSearchFields(
                eventContext
            );
            //#region Loc-In: clear Reserved Header
            eventContext.application["application.handlers.TransfersHandler"].clearReservedHeader(
                eventContext
            );
            //#endregion Loc-Out: clear Reserved Header
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Transits Back to Search view of Return Items
         * transits to Return Item Item Search view
         */
        transitsBackToReturnSearchView: function (eventContext) {
            eventContext.application[
                "application.handlers.TransfersHandler"
            ].clearReturnSearchFields(eventContext);
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Check if required fields are populated
         */
        _isRequiredFieldFilled: function (eventContext) {
            var transfersResource = CommonHandler._getAdditionalResource(
                this,
                "transfers"
            ).getCurrentRecord();
            var site = transfersResource.get("siteid");
            var storeroom = transfersResource.get("storeroom");

            if (!site || !storeroom) {
                return false;
            }

            return true;
        },

        /**
         * Check and validate to storeroom input
         */
        validateToSite: function (eventContext) {
            //var transfersResource = CommonHandler._getAdditionalResource(eventContext,'transfers').getCurrentRecord();

            var transfersResource = eventContext.getCurrentRecord();
            var siteid = transfersResource.getPendingOrOriginalValue("tositeid");

            if (siteid && siteid.trim().length > 0) {
                siteid = siteid.toUpperCase();

                var self = this;
                // Querying storerooms available
                ModelService.filtered("site", null, [{ siteid: siteid }], null, false, true).then(
                    function (siteSet) {
                        if (siteSet.count() == 0) {
                            self.ui.showMessage(
                                MessageService.createStaticMessage("invalidSite").getMessage()
                            );
                            transfersResource.set("tositeid", "");
                        } else {
                            var validSite = siteSet.getRecordAt(0);
                            transfersResource.set("tositeid", validSite.siteid);
                        }
                    }
                );
            }
        },

        /**
         * Check if any records need to be split when completing the transfer.
         */
        checkSplit: function (eventContext, invreserve, invuse, invuseline) {
            //invreserve info
            var itemnum = invreserve.get("item");
            var siteid = invreserve.get("siteid");
            var itemsetid = invreserve.get("itemsetid");
            var location = invreserve.get("location");
            var binnum = invreserve.get("binnum");
            var lotnum = invreserve.get("lotnum");
            var issueunit = invreserve.get("issueunit");
            var description = invreserve.get("itemdesc");
            var localreservedqty = invreserve.get("localreservedqty");
            var rotating = invreserve.get("rotating");
            var processed = invreserve.get("processed");
            //#region Loc-In: Add fields
            var frombin = invreserve.get("frombin");
            var fromlot = invreserve.get("fromlot");
            var frombinCurbal = invreserve.get("frombincurbal");
            //#endregion Loc-Out: Add fields
            var self = this;

            var invbalanceFilter = [
                { itemnum: itemnum, siteid: siteid, itemsetid: itemsetid, location: location },
            ];

            //if(binnum){
            //	invbalanceFilter.push({'binnum':binnum});
            //}
            //#region Loc-In: remove this line
            //var invbalanceFilter = {'itemnum': itemnum, 'siteid':siteid, 'itemsetid':itemsetid, 'location':location, 'binnum':binnum};
            //#region Loc-Out: remove this line
            var invbalancesPromise = ModelService.filtered(
                "invbalance",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                invbalanceFilter,
                1000,
                true,
                true,
                null,
                false
            );
            return invbalancesPromise.then(function (invbalanceSet) {
                /* #region Tuan-in: fix invbalance null, currentBalance null  */
                invbalanceSet.filter("curbal > 0");
                /* #region Tuan-out: fix invbalance null, currentBalance null  */
                if (invbalanceSet && invbalanceSet.count() > 0) {
                    //#region Loc-In:

                    /* //check if default binnum exists in invbalance
					var invbalBinSet = invbalanceSet.find('binnum == $1', binnum);
					if(invbalBinSet.length==0){
						invuseline.set('frombin',invbalance.binnum);
					} else {
						//invbalance rec for the bin exists, so just set default bin
						invuseline.set('frombin',binnum);
					} 

					//if(invbalanceSet && invbalanceSet.count()>0){
					var invbalance = invbalanceSet.data[0];
					var currentBalance = invbalance.curbal;

					*/

                    //If exist frombin that user inputted => set frombin = INPUTTED frombin
                    // Else if default binnum exists in invbalance => set frombin = DEFAULT binnum
                    // ELse set frombin = FIRST binnum exists in invbalance

                    /* #region Tuan-in: fix invbalance null, currentBalance null  */
                    // invbalanceSet.filter('curbal > 0');
                    var invbalance = invbalanceSet.data[0];
                    var currentBalance = invbalance.curbal;
                    /* #endregion Tuan-out: fix invbalance null, currentBalance null  */
                    var dynamicBin;
                    var dynamicLot;
                    if (fromlot) {
                        dynamicBin = frombin;
                        dynamicLot = fromlot;
                        currentBalance = frombinCurbal;
                    } else {
                        //check if default binnum exists in invbalance
                        var invbalBinSet = invbalanceSet.find("binnum == $1", binnum);
                        if (invbalBinSet.length == 0) {
                            dynamicBin = invbalance.binnum;
                            dynamicLot = invbalance.lotnum;
                        } else {
                            dynamicBin = binnum;
                            dynamicLot = lotnum;
                            currentBalance = invbalBinSet[0].curbal;
                        }
                    }
                    invuseline.set("frombin", dynamicBin);
                    invuseline.set("fromlot", dynamicLot);
                    //#endregion Loc-Out: Add fields

                    if (rotating || localreservedqty > currentBalance) {
                        var splitrotateresource = eventContext.application
                            .getResource("splitrotateresource")
                            .createNewRecord();
                        splitrotateresource.set("itemnum", itemnum);
                        splitrotateresource.set("description", description);
                        splitrotateresource.set("binnum", binnum);
                        splitrotateresource.set("lotnum", lotnum);
                        splitrotateresource.set("issueunit", issueunit);
                        splitrotateresource.set("quantity", localreservedqty);
                        splitrotateresource.set("itemsetid", itemsetid);
                        splitrotateresource.set("siteid", siteid);
                        splitrotateresource.set("location", location);
                        splitrotateresource.set("rotating", rotating);
                        splitrotateresource.set("processed", processed);
                        splitrotateresource.invuseline = invuseline;
                        splitrotateresource.invuse = invuse;
                    } else {
                        //Sufficient quantity exists, no need to split.
                        return;
                    }
                    //sort asc by item
                    splitrotateresource.getOwner().sort("itemnum asc");
                } else {
                    //reset resource
                    var splitrotateresource =
                        eventContext.application.getResource("splitrotateresource");
                    splitrotateresource.data = [];

                    invuse = null;
                    invuseline = null;
                    //throw message
                    var msg = MessageService.createResolvedMessage("noItemFoundInStoreroom", [
                        itemnum,
                    ]);
                    self.ui.showMessage(msg);
                    throw new PlatformRuntimeException("noItemFoundInStoreroom");
                }
            });
        },

        /**
         * Handle Back Button - reset data
         */
        handleBackButtonOnSplitQtyRotView: function (eventContext) {
            var splitrotateresource = eventContext.application.getResource("splitrotateresource");
            splitrotateresource.data = [];

            var rotatingAssetResource = eventContext.application.getResource("rotatingAssetUsage");
            var originalDataSplitBinQty =
                eventContext.application.getResource("originalDataSplitBinQty");
            var invuse = eventContext.application.getResource("invuse").getCurrentRecord();
            invuse.invuseline = []; // clear invuselines
            invuse.npinvuselinesplit = []; //reset since backing out.
            originalDataSplitBinQty.data = [];

            if (rotatingAssetResource) {
                rotatingAssetResource.data[0].rotatingArray = [];
            }

            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        handleBackButtonOnSplitQtyAcrossBinsView: function (eventContext) {
            //var rotatingAssetsMapResource = eventContext.application.getResource('rotatingAssets');
            var rotatingAssetUsage = eventContext.application.getResource("rotatingAssetUsage");
            if (rotatingAssetUsage) {
                rotatingAssetUsage.data[0].rotatingArray = [];
            }
            rotatingAssetsMapResource = null;
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        showSplitButton: function (eventContext) {
            //var  splitrotateresource = eventContext.application.getResource("splitrotateresource").getCurrentRecord();
            var processed = eventContext.getCurrentRecord().get("processed");
            var rotating = eventContext.getCurrentRecord().get("rotating");

            //hide split button on nonrotating record
            if (rotating && rotating == true) {
                eventContext.setDisplay(false);
                return;
            }

            if (processed && processed == true) {
                eventContext.setDisplay(false);
            } else {
                eventContext.setDisplay(true);
            }
        },

        showRotateButton: function (eventContext) {
            var processed = eventContext.getCurrentRecord().get("processed");
            var rotating = eventContext.getCurrentRecord().get("rotating");

            if (rotating && rotating == true) {
                if (processed && processed == true) {
                    eventContext.setDisplay(false);
                } else {
                    eventContext.setDisplay(true);
                }
            } else {
                eventContext.setDisplay(false);
            }
        },

        /**
         * Dynamicaly hide/show WINSP icon on Received Items View
         */
        showInspectButton: function (eventContext) {
            var quantity = eventContext.getCurrentRecord().get("receiptquantity");
            var status = eventContext.getCurrentRecord().get("status");

            var domainreceiptstatus = CommonHandler._getAdditionalResource(
                eventContext,
                "domainreceiptstatus"
            );
            status = SynonymDomain.resolveToInternal(domainreceiptstatus, status);

            if (status == "WINSP" && quantity > 0) {
                eventContext.setDisplay(true);
            } else {
                eventContext.setDisplay(false);
            }
        },

        /**
         * Toggle Inspection View based on Rotating Item
         */
        inspectItem: function (eventContext) {
            var currentRecord = eventContext.getCurrentRecord();

            if (currentRecord.get("itemrotating") == true) {
                eventContext.ui.show("Transfers.InspectRotatingItemView");
            } else {
                eventContext.ui.show("Transfers.InspectItemView");
            }
        },

        /**
         * Dynamicaly hide/show icon on Received Rotating Items View
         */
        showReceiveRotatingtButton: function (eventContext) {
            var quantity = eventContext.getCurrentRecord().get("receiptquantity");
            var status = eventContext.getCurrentRecord().get("status");

            var domainreceiptstatus = CommonHandler._getAdditionalResource(
                eventContext,
                "domainreceiptstatus"
            );
            var externalStatus = SynonymDomain.resolveToDefaultExternal(
                domainreceiptstatus,
                "WASSET"
            );

            if (status == externalStatus && quantity > 0) {
                eventContext.setDisplay(true);
            } else {
                eventContext.setDisplay(false);
            }
        },

        /**
         * Toggle Receiving Rotating View based on Rotating Item
         */
        receiveRotatingItem: function (eventContext) {
            var currentRecord = eventContext.getCurrentRecord();

            if (currentRecord.get("itemrotating") == true) {
                eventContext.ui.show("Transfers.ReceiveRotatingItemView");
            }
        },

        loadSplitQtyResource: function (eventContext, invbalanceSet, invbalanceFilter) {
            var originalDataSplitBinQty =
                eventContext.application.getResource("originalDataSplitBinQty");
            if (
                originalDataSplitBinQty &&
                originalDataSplitBinQty.count() == 1 &&
                originalDataSplitBinQty.data[0].itemnum == null
            ) {
                //first time no data
                originalDataSplitBinQty.data = [];
            } else if (
                originalDataSplitBinQty &&
                originalDataSplitBinQty.count > 0 &&
                originalDataSplitBinQty.data[0].itemnum != null
            ) {
                //real data exists
            }
            var deferred = new Deferred();
            //var promise =  ModelService.filtered('originalDataSplitBinQty', PlatformConstants.SEARCH_RESULT_QUERYBASE, invbalanceFilter, 1000, false, true, null, true);
            //ModelService.allCached('originalDataSplitBinQty',null,null).then(function(set){
            //var invbalanceFilter = {'itemnum': itemnum, 'siteid':siteid, 'itemsetid':itemsetid, 'location':location, 'stagingbin': false};
            var invbalanceSplitBinQtySet = originalDataSplitBinQty.find(
                "itemnum == $1  && siteid == $2 && itemsetid == $3 && storeloc == $4",
                invbalanceFilter.itemnum,
                invbalanceFilter.siteid,
                invbalanceFilter.itemsetid,
                invbalanceFilter.location
            );

            //promise.then(function(invbalanceSplitBinQtySet){
            if (invbalanceSplitBinQtySet && invbalanceSplitBinQtySet.length > 0) {
                //record exists in memory resource
            } else {
                var memoryRecord = null;
                //loop through invbalance set adding to in memory resource.
                arrayUtil.forEach(invbalanceSet.data, function (invbalance) {
                    memoryRecord = originalDataSplitBinQty.createNewRecord();
                    memoryRecord.set("siteid", invbalance.siteid);
                    memoryRecord.set("itemnum", invbalance.itemnum);
                    memoryRecord.set("itemsetid", invbalance.itemsetid);
                    memoryRecord.set("storeloc", invbalance.location);
                    memoryRecord.set("quantity", invbalance.curbal);
                    memoryRecord.set("binnum", invbalance.binnum);
                });

                invbalanceSplitBinQtySet = originalDataSplitBinQty.find(
                    "itemnum == $1  && siteid == $2 && itemsetid == $3 && storeloc == $4",
                    invbalanceFilter.itemnum,
                    invbalanceFilter.siteid,
                    invbalanceFilter.itemsetid,
                    invbalanceFilter.location
                );
            }

            var calculatedlDataSplitBinQtyTEMP = null;
            //set original data
            if (invbalanceSplitBinQtySet.length == 0) {
                calculatedlDataSplitBinQtyTEMP = lang.clone(originalDataSplitBinQty.data);
            } else {
                calculatedlDataSplitBinQtyTEMP = lang.clone(invbalanceSplitBinQtySet);
            }

            deferred.resolve(calculatedlDataSplitBinQtyTEMP);

            //});

            return deferred.promise;
        },

        /**
         * Splits the selected record into available bins with balances
         */
        autoSplit: function (eventContext) {
            var splitqtyacrossbins = eventContext.application.getResource("splitqtyacrossbins");
            var self = this;

            //reset
            splitqtyacrossbins.data = [];

            var recordToSplit = eventContext.getCurrentRecord();
            //recordToSplit.set('processed', true);
            var balance = recordToSplit.get("quantity");

            //findInvbalance
            var itemnum = recordToSplit.get("itemnum");
            var itemsetid = recordToSplit.get("itemsetid");
            var siteid = recordToSplit.get("siteid");
            var location = recordToSplit.get("location");
            var invuseline = recordToSplit.get("invuseline");
            var invuse = recordToSplit.get("invuse");
            var description = recordToSplit.get("description");
            var issueunit = recordToSplit.get("issueunit");
            var rotating = recordToSplit.get("rotating");

            var invbalanceFilter = {
                itemnum: itemnum,
                siteid: siteid,
                itemsetid: itemsetid,
                location: location,
                stagingbin: false,
            };
            var invbalancesPromise = ModelService.filtered(
                "invbalance",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                invbalanceFilter,
                1000,
                true,
                true,
                null,
                false
            );
            invbalancesPromise.then(function (invbalanceSet) {
                if (invbalanceSet && invbalanceSet.count() > 0) {
                    //loadSplitQtyResource - inmemory
                    var loadSplitQtyResource = self.loadSplitQtyResource(
                        eventContext,
                        invbalanceSet,
                        invbalanceFilter
                    );
                    var data = null;
                    //splitting of rotating
                    if (rotating && rotating == true) {
                        loadSplitQtyResource.then(function (calculatedlDataSplitBinQtyTEMP) {
                            arrayUtil.forEach(calculatedlDataSplitBinQtyTEMP, function (inMemory) {
                                if (inMemory.quantity == 0) {
                                    return;
                                } else if (
                                    (balance > 0 && balance >= inMemory.quantity) ||
                                    (balance > 0 && balance < inMemory.quantity)
                                ) {
                                    while (inMemory.quantity > 0 && balance > 0) {
                                        var splitrec = splitqtyacrossbins.createNewRecord();

                                        inMemory.quantity = inMemory.quantity - 1;
                                        splitrec.set("quantity", 1);
                                        balance = balance - 1;

                                        splitrec.set("quantity", 1);
                                        splitrec.set("itemnum", inMemory.itemnum);
                                        splitrec.set("itemsetid", inMemory.itemsetid);
                                        splitrec.set("location", location);
                                        splitrec.set("siteid", inMemory.siteid);
                                        splitrec.set("binnum", inMemory.binnum);
                                        splitrec.set("lotnum", inMemory.lotnum);
                                        splitrec.set("description", description);
                                        splitrec.set("rotating", rotating);
                                        splitrec.set("issueunit", issueunit);
                                        //splitrec.set('rotassetnum', rotassetnum);
                                        splitrec.invuseline = invuseline;
                                        splitrec.invuse = invuse;

                                        if (balance == 0) {
                                            return;
                                        }
                                    }
                                } else {
                                    return;
                                }
                            });

                            data = lang.clone(calculatedlDataSplitBinQtyTEMP);

                            //sort by item asc
                            splitqtyacrossbins.sort("itemnum asc");

                            var calculatedDataSplitBinQty = eventContext.application.getResource(
                                "calculatedDataSplitBinQty"
                            );
                            calculatedDataSplitBinQty.data = data;

                            eventContext.ui.show("Transfers.SplitQtyAcrossBinsView");
                        });
                    } else {
                        loadSplitQtyResource.then(function (calculatedlDataSplitBinQtyTEMP) {
                            var invbalanceCount = 0;
                            arrayUtil.forEach(calculatedlDataSplitBinQtyTEMP, function (inMemory) {
                                //check if bin in inventory has 0 qty, if so skip to next bin
                                if (inMemory.quantity == 0) {
                                    invbalanceCount++; //track number of invbalance records
                                    if (inMemory.getOwner().data.length == invbalanceCount) {
                                        invbalanceCount = 0;
                                        //if no records have a balance throw message
                                        var currentRecord = eventContext.getCurrentRecord();
                                        currentRecord.processed = true;
                                        var msg =
                                            MessageService.createStaticMessage(
                                                "noBalanceRecord"
                                            ).getMessage();
                                        self.ui.showMessage(msg);
                                        throw new PlatformRuntimeException("noBalanceRecord");
                                    }
                                    return;
                                } else if (
                                    (balance > 0 && balance >= inMemory.quantity) ||
                                    (balance > 0 && balance < inMemory.quantity)
                                ) {
                                    var splitrec = splitqtyacrossbins.createNewRecord();

                                    if (balance > 0 && balance < inMemory.quantity) {
                                        splitrec.set("quantity", balance);
                                        inMemory.quantity = inMemory.quantity - balance;
                                        if (inMemory.quantity >= 0) {
                                            balance = 0;
                                        }
                                    } else {
                                        splitrec.set("quantity", inMemory.quantity);
                                        balance = balance - inMemory.quantity;
                                        inMemory.quantity = 0;
                                    }

                                    splitrec.set("itemnum", inMemory.itemnum);
                                    splitrec.set("itemsetid", inMemory.itemsetid);
                                    splitrec.set("location", inMemory.location);
                                    splitrec.set("siteid", inMemory.siteid);
                                    splitrec.set("binnum", inMemory.binnum);
                                    splitrec.set("lotnum", inMemory.lotnum);
                                    splitrec.set("description", description);
                                    splitrec.set("rotating", rotating);
                                    splitrec.set("issueunit", issueunit);
                                    splitrec.invuseline = invuseline;
                                    splitrec.invuse = invuse;

                                    if (balance < 0) {
                                        return;
                                    }
                                } else {
                                    return;
                                }
                            });
                            data = lang.clone(calculatedlDataSplitBinQtyTEMP);

                            //sort by item asc
                            splitqtyacrossbins.sort("itemnum asc");

                            var calculatedDataSplitBinQty = eventContext.application.getResource(
                                "calculatedDataSplitBinQty"
                            );
                            calculatedDataSplitBinQty.data = data;

                            eventContext.ui.show("Transfers.SplitQtyAcrossBinsView");
                        });
                    }
                    //					//sort by item asc
                    //					splitqtyacrossbins.sort('itemnum asc');
                    //
                    //					var  calculatedDataSplitBinQty = eventContext.application.getResource("calculatedDataSplitBinQty");
                    //					calculatedDataSplitBinQty.data = data;
                    //
                    //					eventContext.ui.show("Transfers.SplitQtyAcrossBinsView");
                }
            });
        },

        /**
         * Confirms the Split and Commits the transaction
         */
        doneSplitQtyAcrossBins: function (eventContext) {
            var splitRecords = eventContext.getResource("splitqtyacrossbins");
            var invuse = null;

            if (splitRecords && splitRecords.count() > 0) {
                var il = splitRecords.data[0].invuseline;
                invuse = il.getOwner().getParent();
                invuse.openPriorityChangeTransaction();
            }

            //validate records by checking if rotating asset field is populated
            arrayUtil.forEach(splitRecords.data, function (splitRecord) {
                if (splitRecord.rotating) {
                    var rotassetnum = splitRecord.get("rotassetnum");
                    if (rotassetnum == null || rotassetnum == undefined) {
                        //throw message indicating rotating asset field on one of the records is empty
                        throw new PlatformRuntimeException("rotatingAssetRequired");
                    }
                }
            }),
                arrayUtil.forEach(splitRecords.data, function (splitRecord) {
                    var invuseline = splitRecord.get("invuseline");
                    var anywhererefid = invuseline.get("anywhereRefId");
                    //invuse = invuseline.getOwner().getParent();
                    var quantity = splitRecord.get("quantity");
                    var itemnum = splitRecord.get("itemnum");
                    var itemsetid = splitRecord.get("itemsetid");
                    var frombin = splitRecord.get("binnum");
                    var fromlot = splitRecord.get("lotnum");
                    var fromstoreloc = splitRecord.get("location");
                    var rotassetnum = splitRecord.get("rotassetnum");

                    //initialize invuselinesplit on new invuseline record
                    invuse
                        .getModelDataSet("npinvuselinesplit", true)
                        .then(function (invuseuselinesplit) {
                            var ilSplit = invuseuselinesplit.createNewRecord();
                            ilSplit.set("itemnum", itemnum);
                            ilSplit.set("itemsetid", itemsetid);
                            ilSplit.set("frombin", frombin);
                            ilSplit.set("fromlot", fromlot);
                            ilSplit.set("fromstoreloc", fromstoreloc);
                            ilSplit.set("quantity", quantity);
                            ilSplit.set("invuselinelinkid", anywhererefid);
                            ilSplit.set("rotassetnum", rotassetnum);
                            ilSplit.invuseline = invuseline;
                        });
                });

            invuse.closePriorityChangeTransaction();

            //splitrotateresource - will be null processding unreserved item issue.
            var splitrotateresource = eventContext.application.getResource("splitrotateresource");
            if (splitrotateresource) {
                var splitrotaterec = splitrotateresource.getCurrentRecord();
                if (splitrotaterec) {
                    splitrotaterec.set("processed", true);
                }
            }

            var allprocessed = true;
            arrayUtil.forEach(splitrotateresource.data, function (record) {
                if (record.processed == undefined || record.processed == false) {
                    allprocessed = false;
                    return;
                }
            });

            if (allprocessed) {
                var status = this.getStatus(eventContext);
                if (splitrotateresource.data.length == 0) {
                    //call issueAvailableItemsHandler Change Status
                    if (status == "COMPLETE") {
                        this.changeStatus(
                            invuse,
                            eventContext,
                            "Transfers.SearchUnreservedView",
                            this,
                            status
                        );
                    } else {
                        //shipped status
                        this.setSearchView(eventContext, "Transfers.SearchUnreservedView");
                        this.shipItemsWithSplits(eventContext);
                    }
                } else {
                    if (status == "COMPLETE") {
                        this.changeStatus(
                            invuse,
                            eventContext,
                            "Transfers.SearchInvreserveView",
                            this,
                            status
                        );
                    } else {
                        //shipped status
                        this.setSearchView(eventContext, "Transfers.SearchInvreserveView");
                        this.shipItemsWithSplits(eventContext);
                    }
                }
            } else {
                var originalDataSplitBinQty =
                    eventContext.application.getResource("originalDataSplitBinQty");
                var calculatedDataSplitBinQty = eventContext.application.getResource(
                    "calculatedDataSplitBinQty"
                );
                originalDataSplitBinQty.data = lang.clone(calculatedDataSplitBinQty.data);
                calculatedDataSplitBinQty.data = [];

                //eventContext.ui.returnToView("Transfers.SplitQtyRotatingAssetView");
                eventContext.ui.hideCurrentView();
            }
        },
        negativeAvailability: function (eventContext) {},

        errorCheck: function (eventContext) {
            var filter = { _errored: 1 };
            return ModelService.filtered("invuse", null, filter, 1000, false, true, null, true);
        },

        hideShowErrorLink: function (eventContext) {
            var self = this;
            if (self.errorWatch) {
                self.errorWatch.remove();
            }

            self.errorWatch = topic.subscribe(
                PlatformConstants.DATA_REFRESH_TOPIC + "/invuse",
                function (fireEvent) {
                    self.errorCheck(eventContext).then(function (errorSet) {
                        eventContext.setLabel(MessageService.createResolvedMessage("errorExists"));

                        if (errorSet.count() > 0) {
                            self.setError(eventContext, true);
                            eventContext.setLabel(
                                MessageService.createResolvedMessage("errorExists")
                            );
                            errorSet.resourceID = "invuse";
                            eventContext.application.addResource(errorSet);
                            eventContext.setDisplay(true);
                        } else {
                            self.setError(eventContext, false);
                            eventContext.setDisplay(false);
                        }

                        return;
                    });
                }
            );

            //if topic already processesed, check if error exists
            if (this.getError(eventContext)) {
                eventContext.setLabel(MessageService.createResolvedMessage("errorExists"));
                eventContext.setDisplay(true);
            } else {
                eventContext.setDisplay(false);
            }
        },

        showErrorPage: function (eventContext) {
            eventContext.ui.show("Transfers.ErrorDetailPage");
        },

        showErrorList: function (eventContext) {
            eventContext.ui.show("Transfers.ErrorListPage");
        },

        setError: function (eventContext, haserror) {
            var errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
            errorRes.set("hasError", haserror);
        },

        getError: function (eventContext) {
            var errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
            return errorRes.get("hasError");
        },

        undoAndDelete: function (eventContext) {
            var test = new ApplicationHandlerBase();
            var invuse = eventContext.getResource().getCurrentRecord();
            var self = this;
            test.discardChanges(eventContext, invuse).then(function () {
                try {
                    //clear rotatingArray if error occurs.
                    var rotatingAssetUsage =
                        eventContext.application.getResource("rotatingAssetUsage");
                    if (rotatingAssetUsage && rotatingAssetUsage.data.length > 0) {
                        rotatingAssetUsage.data[0].rotatingArray = [];
                    }

                    //change status to CANCELLED
                    self.changeStatus(invuse, eventContext, null, self, "CANCELLED");
                } catch (e) {
                    //transition back to search page.
                    var errorRes = eventContext.application
                        .getResource("errorResource")
                        .getCurrentRecord();
                    errorRes.hasError = false;
                    eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
                }
                //transition back to search page.
                eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
            });
        },

        hideRotatingField: function (eventContext) {
            var rotating = eventContext.getCurrentRecord().get("rotating");
            if (rotating && rotating == true) {
                eventContext.setDisplay(true);
            } else {
                eventContext.setDisplay(false);
            }
        },

        /**
         * Handle Rotating Asset Assignment when splitting rotating items
         */
        assignRotatingAsset: function (eventContext, itemnum) {
            var siteid = UserManager.getInfo("defsite");
            var rotatingAssetResource = eventContext.application.getResource("additionalasset");
            var rotatingAssetsMapResource = eventContext.application
                .getResource("rotatingAssets")
                .getCurrentRecord();

            CommonHandler._clearFilterForResource(eventContext, rotatingAssetResource);
            rotatingAssetResource.filter("itemnum == $1 && siteid == $2", itemnum, siteid);

            if (rotatingAssetResource && rotatingAssetResource.count() > 0) {
                var map = rotatingAssetsMapResource.get("map");

                arrayUtil.forEach(rotatingAssetResource.data, function (rotatingAsset) {
                    if (map) {
                        if (map.indexOf(rotatingAsset) < 0) {
                            map.push(rotatingAsset);
                            return rotatingAsset.assetnum;
                        }
                    } else {
                        rotatingAssetsMapResource.map = [];
                        rotatingAssetsMapResource.map.push(rotatingAsset);
                        return rotatingAsset.assetnum;
                    }
                });
            }
        },

        /*validateToSite: function(eventContext) {
			var tosite = eventContext.getCurrentRecord().getPendingOrOriginalValue('tositeid');
			var additionalsite = CommonHandler._getAdditionalResource(eventContext,'site');
			if ( !additionalsite || !tosite ) return;
			
			var siteSet = additionalsite.find('siteid == $1', tosite);
			
			if(siteSet.length == 0) {
				throw new PlatformRuntimeWarning('invalidSite');
			}
		
		},*/

        /**
         * Validate data if entered manually into field.
         * Not Used.
         */
        asyncvalidateRotatingItemUsage: function (eventContext) {
            var filter = [];

            var rotassetnum = eventContext
                .getCurrentRecord()
                .getPendingOrOriginalValue("rotassetnum");
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var siteid = transfersResource.get("siteid");
            var storeroom = transfersResource.get("storeroom").toUpperCase();
            var itemnum = eventContext.getCurrentRecord().get("itemnum");

            filter.push({ siteid: siteid });
            filter.push({ location: storeroom });
            filter.push({ itemnum: itemnum });
            filter.push({ assetnum: rotassetnum });

            //			ModelService.all('asset',PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(searchResultSet){
            //				ModelService.clearSearchResult(searchResultSet).then(function(){
            //
            //				});
            //			});
            //
            var assetPromise = ModelService.filtered(
                "asset",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                filter,
                1000,
                true,
                true,
                null,
                false
            );
            assetPromise
                .then(function (rotatingAssetSet) {
                    if (rotatingAssetSet.count() > 0) {
                        //records found validated
                    } else {
                        throw new PlatformRuntimeException("dupRotatingAsset");
                    }
                })
                .otherwise(function (error) {
                    throw new PlatformRuntimeException("dupRotatingAsset");
                });
        },

        /**
         * Dynamic fetch for the Rotating Assets lookup view
         */
        rotateLookup: function (eventContext) {
            var filter = {};

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var siteid = transfersResource.get("siteid");
            var storeroom = transfersResource.get("storeroom").toUpperCase();
            var itemnum = eventContext.getCurrentRecord().get("itemnum");

            filter.siteid = siteid;
            filter.location = storeroom;
            filter.itemnum = itemnum;
            filter = this.buildFilterForStatus(eventContext, [filter]);
            var assetPromise = ModelService.filtered(
                "asset",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                filter,
                1000,
                true,
                true,
                null,
                false
            );
            assetPromise.then(function (rotatingAssetSet) {
                rotatingAssetSet.resourceID = "asset";
                eventContext.application.addResource(rotatingAssetSet);
                ModelService.clearSearchResult(rotatingAssetSet);
                eventContext.ui.show("Transfers.RotatingItemListView");
            });
        },

        /**
         * Validate and Manage selected rotating assets.
         * Prevent from entering multiple rows with the same rotating asset
         */
        selectRotatingAsset: function (eventContext) {
            var assetRecord = eventContext.getCurrentRecord();
            var newRotatingAssetNum = assetRecord.get("assetnum");
            var splitRecord = eventContext.application
                .getResource("splitqtyacrossbins")
                .getCurrentRecord();
            var rotatingAssetResource = eventContext.application
                .getResource("rotatingAssetUsage")
                .getCurrentRecord();

            //check if changing rotateassetnum
            var originalRotatingAssetnum = splitRecord.get("rotassetnum");

            //check if rotating asset changed, if it did remove original from map.
            if (originalRotatingAssetnum && originalRotatingAssetnum != newRotatingAssetNum) {
                if (rotatingAssetResource && rotatingAssetResource.rotatingArray != null) {
                    if (
                        rotatingAssetResource.rotatingArray.indexOf(originalRotatingAssetnum) > -1
                    ) {
                        //remove original from map
                        rotatingAssetResource.rotatingArray.splice(
                            rotatingAssetResource.rotatingArray.indexOf(originalRotatingAssetnum),
                            1
                        );
                        splitRecord.set("rotassetnum", "");
                    }
                }
            }

            //update map
            if (rotatingAssetResource) {
                if (
                    rotatingAssetResource.rotatingArray == null ||
                    rotatingAssetResource.rotatingArray == undefined ||
                    rotatingAssetResource.rotatingArray.length == 0
                ) {
                    rotatingAssetResource.rotatingArray = [];
                    rotatingAssetResource.rotatingArray.push(newRotatingAssetNum);
                } else if (rotatingAssetResource.rotatingArray.length > 0) {
                    if (rotatingAssetResource.rotatingArray.indexOf(newRotatingAssetNum) > -1) {
                        //splitRecord.set( 'rotassetnum' , originalRotatingAssetnum );
                        //rotatingAssetResource.rotatingArray.push( originalRotatingAssetnum );

                        throw new PlatformRuntimeException("dupRotatingAsset");
                    } else {
                        rotatingAssetResource.rotatingArray.push(newRotatingAssetNum);
                    }
                }
            }

            splitRecord.set("rotassetnum", newRotatingAssetNum);
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * constructs filter for item
         */
        buildFilterForItem: function (eventContext, siteid, storeroom) {
            var statuses = this.selectableItemStatusesAsFilter(eventContext);
            var types = this.selectableItemTypesAsFilter(eventContext);

            var filter = [];

            // create a filter for each status that has everything you need to filter on
            locationFilter = {};
            if (siteid && siteid != "") {
                locationFilter.siteid = siteid;
            }
            if (storeroom && storeroom != "") {
                locationFilter.location = storeroom;
            }

            arrayUtil.forEach(statuses, function (status, sin) {
                arrayUtil.forEach(types, function (type, tin) {
                    var result = {};
                    lang.mixin(result, type);
                    lang.mixin(result, status);
                    lang.mixin(result, locationFilter);
                    filter.push(result);
                });
            });

            return filter;
        },

        /**
         * Retrieve an array from respective domain
         */
        selectableItemStatusesAsFilter: function (eventContext) {
            var domainitemstatus = CommonHandler._getAdditionalResource(
                eventContext,
                "domainitemstatus"
            );
            var internalStatuses = ["ACTIVE", "PENDOBS"];
            var filter = [];
            arrayUtil.forEach(internalStatuses, function (anStatus) {
                CommonHandler._clearFilterForResource(eventContext, domainitemstatus);
                var externalOnes = Object.keys(
                    SynonymDomain.resolveToExternal(domainitemstatus, anStatus)
                );
                arrayUtil.forEach(externalOnes, function (aValue) {
                    filter.push({ status: aValue });
                });
            });
            CommonHandler._clearFilterForResource(eventContext, domainitemstatus);
            return filter;
        },

        /**
         * Retrieve an array from respective domain
         */
        selectableItemTypesAsFilter: function (eventContext) {
            var domainitemtypes = CommonHandler._getAdditionalResource(
                eventContext,
                "domainitemtype"
            );
            var internalTypes = ["ITEM", "TOOL"];
            var filter = [];
            arrayUtil.forEach(internalTypes, function (anType) {
                CommonHandler._clearFilterForResource(eventContext, domainitemtypes);
                var externalOnes = Object.keys(
                    SynonymDomain.resolveToExternal(domainitemtypes, anType)
                );
                arrayUtil.forEach(externalOnes, function (aValue) {
                    filter.push({ itemtype: aValue });
                });
            });
            CommonHandler._clearFilterForResource(eventContext, domainitemtypes);
            return filter;
        },

        /*
         * Validate the transfer quantity
         */
        validateQty: function (eventContext) {
            var currentRecord = eventContext.getCurrentRecord();
            var qty = currentRecord.getPendingOrOriginalValue("localreservedqty");

            if (qty != "" && NumberUtil.parse(qty, this.application.getUserLocale()) < 0) {
                throw new PlatformRuntimeException("quantityPositive");
            }
        },

        /**
         * Get Negative Availability Maxvar Setting
         * ALLOW or DISALLOW
         */
        getNegativeAvailabilityMaxvar: function (eventContext) {
            var orgid = UserManager.getInfo("deforg");
            var maxVarsSet = CommonHandler._getAdditionalResource(this, "oslcmaxvars");
            if (maxVarsSet) {
                var result = maxVarsSet.find(
                    "varname == $1 && orgid == $2",
                    "NEGATIVEAVAIL",
                    orgid
                );
                if (result.length > 0) {
                    var negAvailable = result[0].get("varvalue");
                    return negAvailable;
                }
            }
        },

        /*
         * Check Negative Availability
         */
        checkNegativeAvailability: function (eventContext, invreserveSet, transfers) {
            //if negative availability is enabled, then skip check negative availability check.
            var negativeAvailMaxvar = this.getNegativeAvailabilityMaxvar(eventContext);
            if (negativeAvailMaxvar == "ALLOW") return;

            var itemBalanceMap = {}; //create map
            var storeroom = transfers.storeroom;
            var siteid = transfers.siteid;
            var self = this;

            //create map
            arrayUtil.forEach(invreserveSet.data, function (invreserve) {
                var dataKey =
                    invreserve.item +
                    "::" +
                    invreserve.location +
                    "::" +
                    invreserve.siteid +
                    "::" +
                    invreserve.itemsetid;

                if (!itemBalanceMap || itemBalanceMap[dataKey] == null) {
                    itemBalanceMap[dataKey] = invreserve.localreservedqty;
                } else {
                    var quantity = itemBalanceMap[dataKey];

                    //record exists in map
                    if (quantity) {
                        var totalQty = invreserve.localreservedqty + quantity;
                        itemBalanceMap[dataKey] = totalQty;
                    } else {
                        itemBalanceMap[dataKey] = invreserve.localreservedqty;
                    }
                }
            });

            //create array of items
            var itemList = [];
            var itemBalanceKeys = Object.keys(itemBalanceMap);
            for (key in itemBalanceKeys) {
                //var totalItemQty = assetlcnMap[itemBalanceKeys[key]];
                var itemnum = itemBalanceKeys[key].slice(0, itemBalanceKeys[key].indexOf("::"));
                itemList.push(itemnum);
            }

            //create string from array of items
            var itemFirstTime = true;
            itemList.forEach(function (item) {
                if (itemFirstTime) {
                    itemList = "%22" + item + "%22";
                    itemFirstTime = false;
                } else {
                    itemList += ",%22" + item + "%22";
                }
            });

            var inventoryMetadata = ResourceMetaData.getResourceMetadata("inventory");
            var originalinventoryMetadataWhereClause = inventoryMetadata.whereClause;
            inventoryMetadata.setWhereClause(
                "spi:itemnum in [" +
                    itemList +
                    "] and spi:siteid=%22" +
                    siteid +
                    "%22 and spi:location=%22" +
                    storeroom +
                    "%22"
            );

            ModelService.all("inventory", null, null)
                .then(function (inventorySet) {
                    arrayUtil.forEach(inventorySet.data, function (inventoryRec) {
                        var invDataKey =
                            inventoryRec.itemnum +
                            "::" +
                            inventoryRec.location +
                            "::" +
                            inventoryRec.siteid +
                            "::" +
                            inventoryRec.itemsetid;
                        var availableBalance = inventoryRec.avblbalance;
                        var transferQty = itemBalanceMap[invDataKey];

                        if (transferQty) {
                            if (transferQty > availableBalance) {
                                //availablebalance will go negative
                                var msg = MessageService.createStaticMessage(
                                    "negativeAvailabilityCheck"
                                ).getMessage();
                                self.ui.showMessage(msg, inventoryRec.itemnum);
                                throw new PlatformRuntimeException("negativeAvailabilityCheck");
                            }
                        }
                    });
                })
                .always(function () {
                    //reset whereclause
                    inventoryMetadata.setWhereClause(originalinventoryMetadataWhereClause);
                });
        },
        /* #region Tuan-in: handle tolot in case user input a new lot number  */

        updateBinReservedItem: function (eventContext) {
            var filter = [];

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var siteid = transfersResource.get("siteid");
            var storeroom = transfersResource.get("storeroom");

            var receiptInput = CommonHandler._getAdditionalResource(eventContext, "invreserve");
            if (siteid) {
                filter.push({ siteid: siteid });
            }
            if (storeroom) {
                filter.push({ location: storeroom });
            }
            filter.push({ stagingbin: 0 });

            arrayUtil.forEach(receiptInput.data, function (record) {
                filter.push({ itemnum: record.item });
            });

            var invbalPromise = ModelService.filtered(
                "invbalance",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                filter,
                1000,
                true,
                true,
                null,
                false
            );

            invbalPromise.then(function (invbalSet) {
                ModelService.clearSearchResult(invbalSet);
                invbalSet.filter("curbal > 0");
                invbalSet.resourceID = "invbalForBinLookup";
                eventContext.application.addResource(invbalSet);
            });
        },

        filterFrombinReservedLookup: function (eventContext) {
            var currentRecord = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            ).getCurrentRecord();
            var dataLookup = CommonHandler._getAdditionalResource(
                eventContext,
                "invbalForBinLookup"
            );
            CommonHandler._clearFilterForResource(eventContext, dataLookup);
            var filter = [];

            filter.push({ itemnum: currentRecord.item, location: currentRecord.location });
            dataLookup.lookupFilter = filter;
            console.log("Check data:", dataLookup.data);
            console.log("Check filter:", filter);
        },

        /* #endregion Tuan-out: handle tolot in case user input a new lot number */

        /**
         * Dynamic fetch for the Rotating Assets lookup view
         */
        fromBinLotLookup: function (eventContext) {
            var filter = [];

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var siteid = transfersResource.get("siteid");
            var storeroom = transfersResource.get("storeroom"); //.toUpperCase();
            //#region Loc-In:
            //var itemnum = transfersResource.get('itemnum');
            var invreserve = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            ).getCurrentRecord();
            var itemnum = invreserve.get("item");
            //#endregion Loc-Out:

            if (siteid) {
                filter.push({ siteid: siteid });
            }

            if (storeroom) {
                filter.push({ location: storeroom });
            }

            filter.push({ itemnum: itemnum });
            filter.push({ stagingbin: 0 });

            var invbalPromise = ModelService.filtered(
                "invbalance",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                filter,
                1000,
                true,
                true,
                null,
                false
            );
            invbalPromise.then(function (invbalSet) {
                ModelService.clearSearchResult(invbalSet);
                //#region Loc-In: where curbal > 0 for frombin
                invbalSet.filter("curbal > 0");
                //#endregion Loc-Out: where curbal > 0 for frombin
                invbalSet.resourceID = "invbalTemp";
                eventContext.application.addResource(invbalSet);

                eventContext.ui.show("Transfers.FromBinListView");
            });
        },

        /**
         * Dynamic fetch for the bin lookup view
         */
        toBinLotLookup: function (eventContext) {
            var filter = [];

            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transferAdditionalItems"
            ).getCurrentRecord();
            var inventory = CommonHandler._getAdditionalResource(
                eventContext,
                "inventory"
            ).getCurrentRecord();
            var siteid = transfersResource.get("tositeid");
            var storeroom = transfersResource.get("tostoreroom"); //.toUpperCase();
            var itemnum = inventory.get("itemnum");

            filter.push({ siteid: siteid });
            filter.push({ location: storeroom });
            filter.push({ itemnum: itemnum });
            filter.push({ stagingbin: 0 });

            var invbalPromise = ModelService.filtered(
                "invbalance",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                filter,
                1000,
                true,
                true,
                null,
                false
            );
            invbalPromise.then(function (invbalSet) {
                ModelService.clearSearchResult(invbalSet);
                invbalSet.resourceID = "invbalTemp";
                eventContext.application.addResource(invbalSet);

                eventContext.ui.show("Transfers.ToBinListView");
            });
        },

        hideLotnum: function (eventontext) {
            var additionalInventory = eventContext.application
                .getResource("inventory")
                .getCurrentRecord();
            if (additionalInventory) {
                if (additionalInventory.lotnum) {
                    eventContext.setDisplay(true);
                } else {
                    eventContext.setDisplay(false);
                }
            }
        },

        selectToBinLot: function (eventContext) {
            var invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transferAdditionalItems"
            ).getCurrentRecord();

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

            transfersResource.set("tobin", invbalTemp.binnum);
            transfersResource.set("tolot", invbalTemp.lotnum);

            eventContext.ui.returnToView("Transfers.AdditionalItemsDetailsView");
        },

        //#region Loc-In: Adjust selectFromBinLot
        selectFromBinLot: function (eventContext) {
            /* var  invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();
			var transfersResource = CommonHandler._getAdditionalResource(eventContext,'transferAdditionalItems').getCurrentRecord();
			
			transfersResource.set('frombin', invbalTemp.binnum);
			transfersResource.set('fromlot', invbalTemp.lotnum);
			
			//eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			eventContext.ui.returnToView('Transfers.AdditionalItemsDetailsView'); */

            var invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();

            var previousView =
                WL.application.ui.viewHistory[WL.application.ui.viewHistory.length - 2].id;
            if (previousView == "Transfers.InvreserveListView") {
                var issueResource = CommonHandler._getAdditionalResource(
                    eventContext,
                    "invreserve"
                ).getCurrentRecord();
                issueResource.set("frombin", invbalTemp.binnum);
                issueResource.set("frombincurbal", invbalTemp.curbal);
                issueResource.set("fromlot", invbalTemp.lotnum);
                //eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
                eventContext.ui.returnToView("Transfers.InvreserveListView");
            } else if (previousView == "Transfers.AdditionalItemsDetailsView") {
                eventContext.application[
                    "application.handlers.TransferAvailableItemsHandler"
                ].selectFromBinLot(eventContext);
            }
        },
        //#endregion Loc-Out: Adjust selectFromBinLot

        /**
         * Cancel button for Rotating Asset Select View
         */
        cancelBinLotSelection: function (eventContext) {
            //console.log("CANCEL rotating asset selection");
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Clear button for Rotating Asset Select View
         */
        clearFromBinLotSelection: function (eventContext) {
            //console.log("CLEAR rotating asset selection");
            var transferAdditionalItems = eventContext.application
                .getResource("transferAdditionalItems")
                .getCurrentRecord();

            transferAdditionalItems.set("frombin", "");
            transferAdditionalItems.set("fromlot", "");
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Clear button for Rotating Asset Select View
         */
        clearToBinLotSelection: function (eventContext) {
            //console.log("CLEAR rotating asset selection");
            var transferAdditionalItems = eventContext.application
                .getResource("transferAdditionalItems")
                .getCurrentRecord();

            transferAdditionalItems.set("tobin", "");
            transferAdditionalItems.set("tolot", "");
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },
        /**
         * Set Error Message on Error List Page
         */
        setErrorMessage: function (eventContext) {
            var invuse = eventContext.getCurrentRecord();
            invuse.set("errorMessage", invuse._errorMessage);
        },

        /**
         * Get Negative Availability Maxvar Setting
         * ALLOW or DISALLOW
         */
        getNegativeAvailabilityMaxvar: function (eventContext) {
            var orgid = UserManager.getInfo("deforg");
            var maxVarsSet = CommonHandler._getAdditionalResource(eventContext, "oslcmaxvars");
            if (maxVarsSet) {
                var result = maxVarsSet.find(
                    "varname == $1 && orgid == $2",
                    "NEGATIVEAVAIL",
                    orgid
                );
                if (result.length > 0) {
                    var negAvailable = result[0].get("varvalue");
                    return negAvailable;
                }
            }
        },

        /**
         * Check Negative Availability
         */
        checkNegativeAvailability: function (eventContext, invreserveSet, transfers, issueQty) {
            var negObject = {};
            var deferred = new Deferred();

            var itemBalanceMap = {}; //create item balance map
            var itemAvailableBalanceMap = {}; //create item available balance map
            var curbaltotalMap = {}; //create curbaltotal map
            var storeroom = transfers.storeroom;
            var siteid = transfers.siteid;
            var self = this;

            //create map
            arrayUtil.forEach(invreserveSet.data, function (invreserve) {
                var dataKey =
                    invreserve.item +
                    "::" +
                    invreserve.location +
                    "::" +
                    invreserve.siteid +
                    "::" +
                    invreserve.itemsetid;

                if (issueQty) {
                    //data comes from issue unreserved item
                    invreserve.localreservedqty = issueQty;
                    dataKey =
                        invreserve.itemnum +
                        "::" +
                        invreserve.location +
                        "::" +
                        invreserve.siteid +
                        "::" +
                        invreserve.itemsetid;
                }

                if (!itemBalanceMap || itemBalanceMap[dataKey] == null) {
                    itemBalanceMap[dataKey] = invreserve.localreservedqty;
                } else {
                    var quantity = itemBalanceMap[dataKey];

                    //record exists in map
                    if (quantity) {
                        var totalQty = invreserve.localreservedqty + quantity;
                        itemBalanceMap[dataKey] = totalQty;
                    } else {
                        itemBalanceMap[dataKey] = invreserve.localreservedqty;
                    }
                }
            });

            negObject.itemBalanceMap = itemBalanceMap;
            //create array of items
            var itemList = [];
            var itemBalanceKeys = Object.keys(itemBalanceMap);
            for (key in itemBalanceKeys) {
                //var totalItemQty = assetlcnMap[itemBalanceKeys[key]];
                var itemnum = itemBalanceKeys[key].slice(0, itemBalanceKeys[key].indexOf("::"));
                itemList.push(itemnum);
            }

            //create string from array of items
            var itemFirstTime = true;
            itemList.forEach(function (item) {
                if (itemFirstTime) {
                    itemList = "%22" + item + "%22";
                    itemFirstTime = false;
                } else {
                    itemList += ",%22" + item + "%22";
                }
            });

            var inventoryMetadata = ResourceMetaData.getResourceMetadata("inventory");
            var originalinventoryMetadataWhereClause = inventoryMetadata.whereClause;
            inventoryMetadata.setWhereClause(
                "spi:itemnum in [" +
                    itemList +
                    "] and spi:siteid=%22" +
                    siteid +
                    "%22 and spi:location=%22" +
                    storeroom +
                    "%22"
            );

            ModelService.all("inventory", null, null)
                .then(function (inventorySet) {
                    arrayUtil.forEach(inventorySet.data, function (inventoryRec) {
                        var invDataKey =
                            inventoryRec.itemnum +
                            "::" +
                            inventoryRec.location +
                            "::" +
                            inventoryRec.siteid +
                            "::" +
                            inventoryRec.itemsetid;
                        var availableBalance = inventoryRec.avblbalance;
                        var curbaltotal = inventoryRec.curbaltotal;
                        var issueQty = itemBalanceMap[invDataKey];

                        //if negative availability is not allowed, then throw message
                        var negativeAvailMaxvar = self.getNegativeAvailabilityMaxvar(eventContext);
                        negObject.negativeAvailMaxvar = negativeAvailMaxvar;
                        if (negativeAvailMaxvar == "DISALLOW") {
                            if (issueQty) {
                                if (issueQty > availableBalance) {
                                    //availablebalance will go negative
                                    var msg = MessageService.createResolvedMessage(
                                        "negativeAvailabilityCheck",
                                        [inventoryRec.itemnum]
                                    );
                                    self.ui.showMessage(msg);
                                    deferred.resolve(negObject);
                                    throw new PlatformRuntimeException("negativeAvailabilityCheck");
                                }
                            }
                        }

                        //load curbaltotalMap into Map
                        curbaltotalMap[invDataKey] = curbaltotal;
                        negObject.curbaltotalMap = curbaltotalMap;

                        //load itemAvailableBalancedata into Map
                        itemAvailableBalanceMap[invDataKey] = availableBalance;
                        negObject.itemAvailableBalanceMap = itemAvailableBalanceMap;
                    });
                    deferred.resolve(negObject);
                })
                .always(function () {
                    //reset whereclause
                    inventoryMetadata.setWhereClause(originalinventoryMetadataWhereClause);
                });

            return deferred.promise;
        },

        /**
         * Cancel button for Rotating Asset Select View
         */
        cancelRotatingAssetSelection: function (eventContext) {
            //			console.log("CANCEL rotating asset selection");
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Clear button for Rotating Asset Select View
         */
        clearRotatingAssetSelection: function (eventContext) {
            //			console.log("CLEAR rotating asset selection");

            var originalRotatingAssetnum = eventContext.application
                .getResource("splitqtyacrossbins")
                .getCurrentRecord();
            this._removeUsedRotatingAsset(
                eventContext,
                originalRotatingAssetnum.get("rotassetnum")
            );

            originalRotatingAssetnum.set("rotassetnum", "");
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Remove rotating assets used in rotating item selection
         *
         * check if rotating asset changed, if it did remove original from map
         * remove original from map
         */
        _removeUsedRotatingAsset: function (eventContext, rotatingAssetNum) {
            var rotatingAssetResource = eventContext.application
                .getResource("rotatingAssetUsage")
                .getCurrentRecord();

            //check if rotating asset changed, if it did remove original from map.
            if (
                rotatingAssetNum &&
                rotatingAssetResource &&
                rotatingAssetResource.rotatingArray != null &&
                rotatingAssetResource.rotatingArray.indexOf(rotatingAssetNum) > -1
            ) {
                //remove original from map
                rotatingAssetResource.rotatingArray.splice(
                    rotatingAssetResource.rotatingArray.indexOf(rotatingAssetNum),
                    1
                );
            }
        },

        setSearchView: function (eventContext, view) {
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfersResource.set("searchview", view);
        },

        getSearchView: function (eventContext) {
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var searchView = transfersResource.get("searchview");
            return searchView;
        },

        setStatus: function (eventContext, status) {
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfersResource.set("status", status);
        },

        getStatus: function (eventContext) {
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var status = transfersResource.get("status");
            return status;
        },

        clearStatus: function (eventContext) {
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfersResource.setNullValue("status");
        },

        clearSearchView: function (eventContext) {
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            transfersResource.setNullValue("searchview");
        },

        /**
         * Validate the Attention Of field
         */
        validateAttentionOf: function (eventContext) {
            var person = eventContext.getCurrentRecord().getPendingOrOriginalValue("shiptoattn");
            var additionalperson = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalperson"
            );

            if (!person) return;

            var personSet = additionalperson.find("personid == $1", person);

            if (personSet.length == 0) {
                throw new PlatformRuntimeWarning("invalidPerson");
            }
        },

        /**
         * Validate the Ship To field
         */
        validateShipto: function (eventContext) {
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var siteid = transfers.tositeid;
            var shipto = eventContext.getCurrentRecord().getPendingOrOriginalValue("shipto");
            var billtoshipto = CommonHandler._getAdditionalResource(eventContext, "billtoshipto");

            if (!shipto) return;

            var billtoShiptoSet = billtoshipto.find(
                "addresscode == $1 && siteid == $2",
                shipto,
                siteid
            );

            if (billtoShiptoSet.length == 0) {
                throw new PlatformRuntimeWarning("invalidAddresscode");
            }
        },

        /**
         * Asset Lookup Data Filter
         */
        filterShiptoForLookup: function (eventContext) {
            var billtoshipto = CommonHandler._getAdditionalResource(eventContext, "billtoshipto");
            var transfers = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            var filter = [];
            billtoshipto._lookupFilter = null;

            var siteid = transfers.tositeid;
            filter.push({ siteid: siteid });

            billtoshipto.lookupFilter = filter;
        },

        /**
         * Create list of Rotating Asset Status
         */
        selectableRotatingAssetFilter: function (eventContext) {
            var domainAssetstatus = CommonHandler._getAdditionalResource(
                eventContext,
                "domainAssetstatus"
            );
            var internalStatus = ["OPERATING", "NOT READY"];
            var filter = [];
            arrayUtil.forEach(internalStatus, function (status) {
                CommonHandler._clearFilterForResource(eventContext, domainAssetstatus);
                var externalOnes = Object.keys(
                    SynonymDomain.resolveToExternal(domainAssetstatus, status)
                );
                arrayUtil.forEach(externalOnes, function (aValue) {
                    filter.push({ status: aValue });
                });
            });
            CommonHandler._clearFilterForResource(eventContext, domainAssetstatus);
            return filter;
        },

        /**
         * Combine field filters with Asset Status filter
         */
        buildFilterForStatus: function (eventContext, filter) {
            var statuses = this.selectableRotatingAssetFilter(eventContext);
            return arrayUtil.map(statuses, function (status) {
                var result = lang.mixin({}, status);
                arrayUtil.forEach(filter, function (condition) {
                    lang.mixin(result, condition);
                });
                return result;
            });
        },

        /**
         * Return specific label for reused view
         *
         * According to type of data received there is a
         * respective label for rotating asset, non rotating asset]
         */
        resolveViewLabel: function (eventContext) {
            var itemsSet = eventContext.application.getResource("splitqtyacrossbins");
            var label;

            if (itemsSet.data[0].rotating) {
                label = MessageService.createStaticMessage("assignAssetLabel").getMessage();
            } else {
                label = MessageService.createStaticMessage("splitAcrossBinsLabel").getMessage();
            }
            return [label];
        },

        //#region Loc-In: init Reserved Header, default ActualDate
        initializeReservedHeader: function (eventContext) {
            var reservedHeader = eventContext.getResource().getCurrentRecord();
            var transfersResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfers"
            ).getCurrentRecord();
            reservedHeader.setDateValue("createdate", this.application.getCurrentDateTime());
            reservedHeader.set("storeroom", transfersResource.storeroom);
        },

        setDefaultActualDateReservedItems: function (eventContext) {
            var reservedItem = eventContext.getCurrentRecord();
            reservedItem.setDateValue("actualdate", this.application.getCurrentDateTime());
        },

        validateActualDateIssueReturnItems: function (eventContext) {
            var self = this;
            var currentRecord = eventContext.getResource().getCurrentRecord();
            /* #region Tuan-in: fix currentRecord null*/
            if (currentRecord && !currentRecord.actualdate) {
                /* #endregion Tuan-out: fix currentRecord null*/
                var msg = MessageService.createStaticMessage("emptyActualDate").getMessage();
                if (self.ui.getCurrentDialog().id == "Platform.DateTimeLookup") {
                    setTimeout(function () {
                        self.ui.showMessage(msg);
                    }, 10);
                }
            }
        },

        clearReservedHeader: function (eventContext) {
            var reservedHeaderResource = CommonHandler._getAdditionalResource(
                eventContext,
                "transfersReservedHeader"
            );
            if (reservedHeaderResource) {
                var reservedHeaderRecord = reservedHeaderResource.getCurrentRecord();
                reservedHeaderRecord.formnumber = "";
                reservedHeaderRecord.description = "";
                reservedHeaderRecord.documentref = "";
                reservedHeaderRecord.createdate = null;
            }
        },

        checkExistFormNo: function (eventContext) {
            var self = this;
            var filter = [];

            var currentRecord = eventContext.getCurrentRecord();
            var formnumber = currentRecord.get("formnumber");
            if (formnumber) {
                filter.push({ formnumber: formnumber });

                eventContext.application.showBusy();
                var deferred = new Deferred();
                ModelService.filtered("invuse", null, filter, 1000, true, true, null, false).then(
                    function (invuseSet) {
                        deferred.resolve(invuseSet);
                    }
                );

                var promise = deferred.promise;
                promise
                    .then(function (invuseSet) {
                        eventContext.application.hideBusy();
                        //ModelService.clearSearchResult(invuseSet);
                        if (invuseSet.count() > 0) {
                            eventContext.getCurrentRecord().setNullValue("formnumber");
                            var msg = MessageService.createResolvedMessage("existFormNumber");
                            self.ui.showMessage(msg);
                            return;
                        }
                    })
                    .otherwise(function (error) {
                        eventContext.application.hideBusy();
                    });
            }
        },

        selecToBinLotByPreviousView: function (eventContext) {
            var previousView =
                WL.application.ui.viewHistory[WL.application.ui.viewHistory.length - 2].id;
            if (previousView == "Transfers.AdditionalItemsDetailsView") {
                eventContext.application[
                    "application.handlers.TransfersAvailableItemsHandler"
                ].selectToBinLot(eventContext);
            } else if (previousView == "Transfers.ShipmentItemsListView") {
                eventContext.application[
                    "application.handlers.ReceiveShipmentHandler"
                ].selectToBinLot(eventContext);
            }
        },

        clearToBinLotSelectionByPreviousView: function (eventContext) {
            var previousView =
                WL.application.ui.viewHistory[WL.application.ui.viewHistory.length - 2].id;
            if (previousView == "Transfers.AdditionalItemsDetailsView") {
                eventContext.application[
                    "application.handlers.TransfersAvailableItemsHandler"
                ].clearToBinLotSelection(eventContext);
            } else if (previousView == "Transfers.ShipmentItemsListView") {
                eventContext.application[
                    "application.handlers.ReceiveShipmentHandler"
                ].clearToBinLotSelection(eventContext);
            }
        },

        transitsBackToView: function (eventContext) {
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },
        //#endregion Loc-Out: init Reserved Header, default ActualDate
        //#region Loc-In: Research Attachment
        onAttachment: function (eventContext) {
            //eventContext.application['application.handlers.TransfersHandler'].clearSearchFields(eventContext)
            eventContext.ui.show("Transfers.InvreserveListView");
        },
        //#endregion Loc-Out: Research Attachment

        /* #region Tuan-in: add selectall checkbox to reserved Items List   */
        handleClickAllFilterItem: function (eventContext) {
            var records = CommonHandler._getAdditionalResource(eventContext, "invreserve");
            var header = CommonHandler._getAdditionalResource(
                eventContext,
                "transfersReservedHeader"
            ).getCurrentRecord();
            if (!header) return;
            var isSelectAll = header.selectall;
            if (isSelectAll == null) isSelectAll = true;
            arrayUtil.forEach(records.data, function (item) {
                item.set("reservedIndicator", !isSelectAll);
            });
            header.set("selectall", !isSelectAll);
        },
        /* #endregion Tuan-out: add selectall checkbox to reserved Items List  */

        /* #region Tuan-in: add checkbox to reserved Items List */
        checkBoxValidation: function (eventContext, invreserveSet) {
            invreserveSet.filter("reservedIndicator == true");

            if (invreserveSet && invreserveSet.count() == 0) {
                CommonHandler._clearFilterForResource(eventContext, invreserveSet);
                throw new PlatformRuntimeException("atLeastOneItem");
            }
        },
        /* #endregion Tuan-out: add checkbox to reserved Items List */
    });
});
