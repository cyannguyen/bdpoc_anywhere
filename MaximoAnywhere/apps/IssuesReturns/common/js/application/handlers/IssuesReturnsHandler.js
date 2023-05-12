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

define("application/handlers/IssuesReturnsHandler", [
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
    "application/business/WpEditSettings",
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
    "platform/store/_ResourceMetadataContext",
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
    WpEditSettings,
    AsyncAwareMixin,
    Logger,
    PersistenceManager,
    StoreProvider,
    ResourceMetadata,
    Deferred,
    all,
    topic,
    AppConfig,
    NumberUtil,
    ResourceMetaData
) {
    return declare([ApplicationHandlerBase, AsyncAwareMixin], {
        _className: "[application.handlers.IssuesReturnsHandler]",

        /**
         * Asset Lookup Data Filter
         */
        /**@memberOf application.handlers.IssuesReturnsHandler */
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
            var filter = [];
            CommonHandler._clearFilterForResource(eventContext, additionalasset);
            filter.push({ itemnum: itemnum, siteid: siteid });

            additionalasset.lookupFilter = filter;
        },

        /* #region  Tuan-in: add update bin for lookup */
        updateBinnumLookupReserved: function (eventContext) {
            var invreserveRecords = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            );

            var filter = [];

            arrayUtil.forEach(invreserveRecords.data, function (item) {
                filter.push({ itemnum: item.item, location: item.location });
            });

            var binnumPromise = ModelService.filtered(
                "invbalance",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                filter,
                1000,
                true,
                true,
                null,
                false
            );
            binnumPromise.then(function (data) {
                ModelService.clearSearchResult(data);
                data.resourceID = "invbalTempReserved";
                eventContext.application.addResource(data);
            });
        },
        /* #endregion */

        /* #region  Tuan-in: add handle update fromlot */
        setFromLotCurbalReserved: function (eventContext) {
            var self = this;
            var issueResource = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            ).getCurrentRecord();
            if (!issueResource || !issueResource.frombin) return;

            var invbalTempResource = eventContext.application.getResource("invbalTempReserved");
            if (invbalTempResource) {
                var invbalTempSet = invbalTempResource.find("binnum == $1", issueResource.frombin);
                if (invbalTempSet.length > 0) {
                    var invbalTempRecord = invbalTempSet[0];
                    var lotnum = issueResource.fromlot;
                    // handle user choose a binnum from lookup which has multiple lotnums
                    if (invbalTempSet.length > 1 && lotnum) {
                        invbalTempSet = invbalTempResource.find("lotnum == $1", lotnum);
                        if (invbalTempSet.length > 0) {
                            invbalTempRecord = invbalTempSet[0];
                        }
                    }
                    issueResource.set("frombincurbal", invbalTempRecord.curbal);
                    issueResource.set("fromlot", invbalTempRecord.lotnum);
                    issueResource.set("frombin", invbalTempRecord.binnum);
                } else {
                    issueResource.setNullValue("frombin");
                    issueResource.setNullValue("frombincurbal");
                    issueResource.setNullValue("fromlot");
                    self.ui.showMessage(
                        MessageService.createStaticMessage("invalidBin").getMessage()
                    );
                }
            } else {
                issueResource.setNullValue("frombincurbal");
                issueResource.setNullValue("fromlot");
            }
        },
        /* #endregion Tuan-out: add handle update fromlot */

        /* #region  Tuan-in: add filter for bin lookup*/
        filterBinReservedForLookup: function (eventContext) {
            console.log("filter reserved bin");
            var invreserveRecord = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            ).getCurrentRecord();
            var filter = [];
            var records = CommonHandler._getAdditionalResource(eventContext, "invbalTempReserved");
            CommonHandler._clearFilterForResource(eventContext, records);
            var itemnum = invreserveRecord.item;
            var location = invreserveRecord.location;
            console.log("filter reserved bin record before filter: ", records);
            filter.push({ itemnum: itemnum, location: location });
            console.log("filter reserved bin filter: ", filter);
            records.lookupFilter = filter;
            console.log("filter reserved bin record: ", records);
        },
        /* #endregion Tuan-out: add filter for bin lookup*/

        /* #region  Tuan-in: add filter for formnumber lookup */
        filterFornumnumberForLookup: function (eventContext) {
            console.log("filter called");
            var records = CommonHandler._getAdditionalResource(
                eventContext,
                "additionalMatusetrans"
            );
            CommonHandler._clearFilterForResource(eventContext, records);
        },
        /* #endregion Tuan-out: add filter for formnumber lookup */

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

            var issuesReturnsResource = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var siteid = issuesReturnsResource.get("siteid");
            var storeroom = issuesReturnsResource.get("storeroom").toUpperCase();

            CommonHandler._clearFilterForResource(eventContext, additionalInventory);

            //filter.push({'siteid': siteid, 'location': storeroom});

            //additionalInventory.lookupFilter = filter;

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
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            issuesReturns.set("siteid", siteid);
        },

        /**
         * Set fields readonly exclusive of each other on Search View.
         */
        setFieldsReadonly: function (eventContext) {
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var wonum = issuesReturns.getPendingOrOriginalValue("wonum");
            var assetnum = issuesReturns.getPendingOrOriginalValue("asset");

            if (wonum) {
                issuesReturns.getRuntimeFieldMetadata("asset").set("readonly", true);
            } else if (assetnum) {
                issuesReturns.getRuntimeFieldMetadata("wonum").set("readonly", true);
            } else {
                issuesReturns.getRuntimeFieldMetadata("wonum").set("readonly", false);
                issuesReturns.getRuntimeFieldMetadata("asset").set("readonly", false);
            }
        },

        /**
         * Search Reserved Items - Button action on search view
         */
        searchReservedItem: function (eventContext) {
            //eventContext.application.showBusy();

            var filter = [];
            var oslcQueryParameters = {};
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var wonum = issuesReturns.wonum;
            var assetnum = issuesReturns.asset;
            var storeroom = issuesReturns.storeroom;
            var reservationDaysInAdvance = AppConfig.getSearchDays();
            var self = this;

            //verify if we have at least one field filled
            if (!wonum && !assetnum) {
                var msg = MessageService.createStaticMessage("emptySearchFields").getMessage();
                self.ui.showMessage(msg);
                return;
            }

            if (this.getError(eventContext)) {
                throw new PlatformRuntimeException("reviewErrors");
            }

            // Checking connectivity
            CommunicationManager.checkConnectivityAvailable().then(function (hasConnectivity) {
                if (hasConnectivity) {
                    //flush transactions before searching
                    var flushPromise = PushingCoordinatorService.flush();
                    flushPromise
                        .then(function () {
                            var siteid = UserManager.getInfo("defsite");
                            filter.push({ siteid: siteid });
                            filter.push({ location: storeroom });

                            if (wonum) {
                                oslcQueryParameters["sqp:wonum"] = wonum;
                                oslcQueryParameters["sqp:days"] = 0; //need to set default, not executed in comple query for workorder search
                            } else if (assetnum) {
                                filter.push({ assetnum: assetnum });
                                oslcQueryParameters["sqp:days"] = reservationDaysInAdvance;
                            }

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
                                    //verify if search result data is empty
                                    if (invreserveSet.data.length == 0) {
                                        var msg =
                                            MessageService.createStaticMessage(
                                                "emptySearchResult"
                                            ).getMessage();
                                        self.ui.showMessage(msg);
                                        return;
                                    }

                                    //#region Loc-In:
                                    // to do filter thêm trong invbalanceview để get lotnum, binnum, modelnum where itemnum,location
                                    // rồi set vào lotnum, binnum, modelnum của invreserve
                                    //#endregion Loc-Out:

                                    ModelService.clearSearchResult(invreserveSet);
                                    invreserveSet.resourceID = "invreserve";
                                    //sort by localsortbin - needed since dynamic mapped bin sorting is not working on initial load.
                                    invreserveSet.sort("localsortbin asc");
                                    eventContext.application.addResource(invreserveSet);
                                    eventContext.ui.show("IssuesReturns.InvreserveListView");
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
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            issuesReturns.setNullValue("wonum");
            issuesReturns.setNullValue("asset");
        },

        /**
         * Clears search fields for Issued Items for Return
         */
        clearReturnSearchFields: function (eventContext) {
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            issuesReturns.setNullValue("itemnum");
            issuesReturns.setNullValue("wonum");

            //#region Loc-In: clear searching fileds of Return Item
            issuesReturns.setNullValue("formnumber");
            issuesReturns.setNullValue("location");
            issuesReturns.setNullValue("glaccount");
            //#endregion Loc-Out: clear searching fileds of Return Item
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
         * Issues an Item
         * Invuse and Invuselines are created everytime an item is issued.
         */
        completeReservation: function (eventContext) {
            var invreserveSet = eventContext.getResource();
            var invuseResource = this.application.getResource("invuse");
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var invuse = null;
            var invuseline = null;
            var storeroom = issuesReturns.storeroom;
            var siteid = issuesReturns.siteid;
            var self = this;
            var wonum = "";

            //#region Loc-In: Add attributes
            var issueReservedHeader = eventContext.application
                .getResource("issueReservedHeader")
                .getCurrentRecord();
            var formNumber = issueReservedHeader.get("formnumber");
            var description = issueReservedHeader.get("description");
            var documentRef = issueReservedHeader.get("documentref");
            var createDate = issueReservedHeader.get("createdate");

            if (!formNumber || !description || !createDate) {
                var msg = MessageService.createStaticMessage("requiredField").getMessage();
                self.ui.showMessage(msg);
                return;
            }

            //var actualDate = this.application.getCurrentDateTime();
            //var actualDate = issueReservedHeader.get('actualdate');
            //#endregion Loc-Out: Add attributes

            //validate if checkbox is selected
            this.checkBoxValidation(eventContext, invreserveSet);

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

            //show busy message
            eventContext.application.showBusy();

            if (invreserveSet && invreserveSet.count() > 0) {
                wonum = invreserveSet.data[0].wonum;
            }

            var wofilter = { siteid: siteid, wonum: wonum };
            var workOrderPromise = ModelService.filtered(
                "workOrder",
                PlatformConstants.SEARCH_RESULT_QUERYBASE,
                wofilter,
                1000,
                true,
                true,
                null,
                false
            );
            workOrderPromise.then(function (workOrderSet) {
                var parent = "";
                if (workOrderSet.count() > 0) {
                    parent = workOrderSet.data[0].parent;
                    if (parent) {
                        wonum = parent;
                    } else {
                        wonum = workOrderSet.data[0].wonum;
                    }
                }

                //clear search results
                ModelService.clearSearchResult(workOrderSet);

                //check negative availability
                var negPromise = self.checkNegativeAvailability(
                    eventContext,
                    invreserveSet,
                    issuesReturns
                );
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
                        var toolItemType = SynonymDomain.resolveToInternal(domainitemtypes, "TOOL");

                        var domaininvusetype = CommonHandler._getAdditionalResource(
                            eventContext,
                            "domaininvusetype"
                        );
                        var issueUseType = SynonymDomain.resolveToDefaultExternal(
                            domaininvusetype,
                            "ISSUE"
                        );

                        //Loc-In
                        // set actualDate is current DateTime
                        var actualDate = self.application.getCurrentDateTime();
                        //Loc-Out

                        //check if records exist in order to create invuse
                        arrayUtil.forEach(invreserveSet.data, function (invreserve) {
                            if (invreserve.localreservedqty > 0) {
                                if (!invuse) {
                                    //var wonum = invreserve.wonum;
                                    invuse = invuseResource.createNewRecord();
                                    invuse.openPriorityChangeTransaction();
                                    invuse.set("usetype", issueUseType);
                                    if (wonum && wonum.length > 0) {
                                        invuse.set(
                                            "description",
                                            MessageService.createResolvedMessage(
                                                "invuseDescriptionWO",
                                                [wonum]
                                            )
                                        );
                                    } else {
                                        invuse.set(
                                            "description",
                                            MessageService.createResolvedMessage(
                                                "invuseDescription"
                                            )
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
                                    invuseline.set("usetype", issueUseType);
                                    //invuseline.set('tostoreloc',storeroom);
                                    invuseline.set("quantity", invreserve.localreservedqty);
                                    invuseline.set("siteid", siteid);
                                    invuseline.set("invuselinenum", i++);
                                    invuseline.set("itemnum", invreserve.item);
                                    //invuseline.set('frombin',invreserve.binnum);
                                    invuseline.set("fromlot", invreserve.lotnum);

                                    invuseline.set("requestnum", invreserve.requestnum);

                                    //#region Loc-In

                                    // A value required for the ActualDate field on the INVUSELINE object
                                    //invuseline.setDateValue("actualdate", actualDate);
                                    invuseline.set("actualdate", invreserve.actualdate);
                                    //#endregion Loc-Out

                                    if (invreserve.itemtype == toolItemType) {
                                        if (
                                            invreserve.issueTo !== undefined &&
                                            invreserve.issueTo !== null
                                        ) {
                                            invuseline.set("issueto", invreserve.issueTo);
                                        } else {
                                            var msg = MessageService.createResolvedMessage(
                                                "issueToRequired",
                                                [invreserve.item]
                                            );
                                            self.ui.showMessage(msg);
                                            throw new PlatformRuntimeException("issueToRequired", [
                                                invreserve.item,
                                            ]);
                                        }
                                    }

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
                                                MessageService.createResolvedMessage(
                                                    "splitLineQtyRot"
                                                );
                                            self.ui.showMessage(msg);
                                            eventContext.application.hideBusy();
                                            throw new PlatformRuntimeException("splitLineQtyRot");
                                        }
                                    }

                                    if (!invreserve.rotating && negativeAvailMaxvar == "ALLOW") {
                                        var itemBalanceRequested = itemBalanceMap[dataKey];
                                        var itemQtyAvailable = itemAvailableBalanceMap[dataKey];
                                        var curbaltotalQty = curbaltotalMap[dataKey];

                                        if (itemBalanceRequested > curbaltotalQty) {
                                            //skip splitting this one
                                            splitPromise.resolve();
                                            deferreds.push(splitPromise);
                                            return;
                                        }
                                    }
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
                            var execCloseTransaction = false;
                            all(deferreds).then(function () {
                                if (execCloseTransaction == false) {
                                    invuse.closePriorityChangeTransaction();
                                    execCloseTransaction = true;
                                }
                                var splitrotateresource =
                                    eventContext.application.getResource("splitrotateresource");
                                if (splitrotateresource && splitrotateresource.count() > 0) {
                                    eventContext.ui.show("IssuesReturns.SplitQtyRotatingAssetView");
                                } else {
                                    //change status to complete
                                    self.changeStatus(
                                        invuse,
                                        eventContext,
                                        "IssuesReturns.SearchInvreserveView",
                                        self,
                                        "COMPLETE"
                                    );
                                }
                            });
                        });
                    })
                    .otherwise(function (error) {
                        Logger.trace(self._className + ": " + error);
                    });
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
            var memo = statusChange.get("memo");
            var statusDate = this.application.getCurrentDateTime();
            var invuseResource = invuse.getOwner();
            var self = this;

            //change status to complete

            if (status == "COMPLETE") {
                InvuseObject.complete(invuse, statusDate, memo, eventContext);
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
         * Hide "Task" label case item has no task associated with
         */
        hideTaskLabel: function (eventContext) {
            console.log("we're here, hold on, now select the element and hide it.");

            var currentReservedItem = eventContext.getCurrentRecord();
            if (!currentReservedItem.get("taskid")) {
                eventContext.setDisplay(false);
            }
        },

        /**
         * Hide "Issue To" label and lookup case item is not a TOOL type
         */
        hideIssueToLabel: function (eventContext) {
            console.log("Hide issue to field");

            var domainitemtypes = CommonHandler._getAdditionalResource(
                eventContext,
                "domainitemtype"
            );
            var toolItemType = SynonymDomain.resolveToInternal(domainitemtypes, "TOOL");

            var currentItem = eventContext.getCurrentRecord();
            var itemType = currentItem.get("itemtype");

            if (itemType != toolItemType) {
                eventContext.setDisplay(false);
            }
        },

        /**
         **** VIEW TRANSITION METHODS ****
         */

        /**
         * Transits to Search view of Issue Planned Items
         * Validates required data and transits to Issue Planned Items Search view
         */
        transitsToIssuePlannedSearchView: function (eventContext) {
            if (!this._isRequiredFieldFilled(eventContext)) {
                this.ui.showMessage(
                    MessageService.createStaticMessage("requiredField").getMessage()
                );
                return;
            }
            this.clearSearchFields(eventContext);
            this.ui.show("IssuesReturns.SearchInvreserveView");
        },

        /**
         * Transits Back to Search view of Issue Planned Items
         * transits to Issue Planned Items Search view
         */
        transitsBackToIssuePlannedSearchView: function (eventContext) {
            //#region Loc-In: clear Reserved Header
            eventContext.application[
                "application.handlers.IssuesReturnsHandler"
            ].clearReservedHeader(eventContext);
            //#endregion Loc-Out: clear Reserved Header
            eventContext.application["application.handlers.IssuesReturnsHandler"].clearSearchFields(
                eventContext
            );
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Transits to Search view of Return Items
         * Validates required data and transits to Return Item Item Search view
         */
        transitsToReturnSearchView: function (eventContext) {
            if (!this._isRequiredFieldFilled(eventContext)) {
                this.ui.showMessage(
                    MessageService.createStaticMessage("requiredField").getMessage()
                );
                return;
            }
            this.clearReturnSearchFields(eventContext);
            this.ui.show("IssuesReturns.SearchReturnView");
        },

        /**
         * Transits Back to Search view of Return Items
         * transits to Return Item Item Search view
         */
        transitsBackToReturnSearchView: function (eventContext) {
            //#region Loc-In: clear Return Header
            //var previousView = WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-1].id;
            //var previousView = this.ui.getCurrentView().id;
            eventContext.application[
                "application.handlers.ReturnIssuedItemsHandler"
            ].clearReturnHeader(eventContext);
            //#endregion Loc-Out: clear Return Header
            eventContext.application[
                "application.handlers.IssuesReturnsHandler"
            ].clearReturnSearchFields(eventContext);
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        /**
         * Check if required fields are populated
         */
        _isRequiredFieldFilled: function (eventContext) {
            var issuesReturnsResource = CommonHandler._getAdditionalResource(
                this,
                "issuesReturns"
            ).getCurrentRecord();
            var site = issuesReturnsResource.get("siteid");
            var storeroom = issuesReturnsResource.get("storeroom");

            if (!site || !storeroom) {
                return false;
            }

            return true;
        },

        /**
         * Check and validate storeroom input
         */
        validateStoreroom: function (eventContext) {
            var issuesReturnsResource = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var siteid = issuesReturnsResource.get("siteid");
            var stroom = issuesReturnsResource.get("storeroom");
            var wasValidated = issuesReturnsResource.get("wasValidated");

            if (!stroom) {
                return;
            }

            if (stroom.trim().length > 0 && !wasValidated) {
                issuesReturnsResource.set("wasValidated", true);
                stroom = stroom.toUpperCase();

                var self = this;
                // Querying storerooms available
                ModelService.filtered(
                    "additionalstoreroom",
                    null,
                    [{ location: stroom, siteid: siteid }],
                    null,
                    false,
                    true
                )
                    .then(function (storeroomSet) {
                        if (storeroomSet.count() == 0) {
                            self.ui.showMessage(
                                MessageService.createStaticMessage("invalidLocation").getMessage()
                            );
                            issuesReturnsResource.set("storeroom", "");
                        } else {
                            var validStoreroom = storeroomSet.getRecordAt(0);
                            issuesReturnsResource.set("storeroom", validStoreroom.location);
                        }
                    })
                    .always(function () {
                        issuesReturnsResource.set("wasValidated", false);
                    });
            }
        },

        /* #region  Tuan-in: add click add filter handler */
        handleClickAllFilterItem: function (eventContext) {
            var records = CommonHandler._getAdditionalResource(eventContext, "invreserve");
            var header = CommonHandler._getAdditionalResource(
                eventContext,
                "issueReservedHeader"
            ).getCurrentRecord();
            if (!header) return;
            var isSelectAll = header.selectall;
            if (isSelectAll == null) isSelectAll = true;
            arrayUtil.forEach(records.data, function (item) {
                item.set("reservedIndicator", !isSelectAll);
            });
            header.set("selectall", !isSelectAll);
        },
        /* #endregion Tuan-out: add click add filter handler */

        /**
         * Check if any records need to be split when completing the issue.
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

            //			if(binnum){
            //				invbalanceFilter.push({'binnum':binnum});
            //			}

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
                if (invbalanceSet && invbalanceSet.count() > 0) {
                    var invbalance = invbalanceSet.data[0];
                    var currentBalance = invbalance.curbal;

                    //#region Loc-In:

                    /* //check if default binnum exists in invbalance
					var invbalBinSet = invbalanceSet.find('binnum == $1', binnum);
					if(invbalBinSet.length==0){
						invuseline.set('frombin',invbalance.binnum);
					} else {
						//invbalance rec for the bin exists, so just set default bin
						invuseline.set('frombin',binnum);
					} */

                    //If exist frombin that user inputted => set frombin = INPUTTED frombin
                    // Else if default binnum exists in invbalance => set frombin = DEFAULT binnum
                    // ELse set frombin = FIRST binnum exists in invbalance
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

                    var self = this;

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

            eventContext.application[
                "application.handlers.IssuesReturnsHandler"
            ].clearSelectedFilter(eventContext);

            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },

        handleBackButtonOnSplitQtyAcrossBinsView: function (eventContext) {
            var rotatingAssetsMapResource = eventContext.application.getResource("rotatingAssets");
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

            //			if(eventContext.ui.movingBack && processed){
            //				processed = false;
            //			}
            if (processed && processed == true) {
                eventContext.setDisplay(false);
            } else {
                eventContext.setDisplay(true);
            }
        },

        showRotateButton: function (eventContext) {
            //var  splitrotateresource = eventContext.application.getResource("splitrotateresource").getCurrentRecord();
            var processed = eventContext.getCurrentRecord().get("processed");
            var rotating = eventContext.getCurrentRecord().get("rotating");

            //reset
            //			if(eventContext.ui.movingBack && processed){
            //				processed = false;
            //			}

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

                            eventContext.ui.show("IssuesReturns.SplitQtyAcrossBinsView");
                        });
                    } else {
                        loadSplitQtyResource.then(function (calculatedlDataSplitBinQtyTEMP) {
                            arrayUtil.forEach(calculatedlDataSplitBinQtyTEMP, function (inMemory) {
                                //check if bin in inventory has 0 qty, if so skip to next bin
                                if (inMemory.quantity == 0) {
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
         * Confirms the Split and Commits the transaction
         */
        doneSplitQtyAcrossBins: function (eventContext) {
            var splitRecords = eventContext.getResource();
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
                if (splitrotateresource.data.length == 0) {
                    //call issueAvailableItemsHandler Change Sttatus
                    this.changeStatus(
                        invuse,
                        eventContext,
                        "IssuesReturns.SearchUnreservedView",
                        this,
                        "COMPLETE"
                    );
                } else {
                    this.changeStatus(
                        invuse,
                        eventContext,
                        "IssuesReturns.SearchInvreserveView",
                        this,
                        "COMPLETE"
                    );
                }

                //reset data
                var originalDataSplitBinQty =
                    eventContext.application.getResource("originalDataSplitBinQty");
                var calculatedDataSplitBinQty = eventContext.application.getResource(
                    "calculatedDataSplitBinQty"
                );
                originalDataSplitBinQty.data = [];
                calculatedDataSplitBinQty.data = [];
            } else {
                var originalDataSplitBinQty =
                    eventContext.application.getResource("originalDataSplitBinQty");
                var calculatedDataSplitBinQty = eventContext.application.getResource(
                    "calculatedDataSplitBinQty"
                );
                originalDataSplitBinQty.data = lang.clone(calculatedDataSplitBinQty.data);
                calculatedDataSplitBinQty.data = [];

                //eventContext.ui.returnToView("IssuesReturns.SplitQtyRotatingAssetView");
                eventContext.ui.hideCurrentView();
            }
        },
        /**
         *
         */
        negativeAvailability: function (eventContext) {},

        /**
         *
         */
        errorCheck: function (eventContext) {
            var filter = { _errored: 1 };
            return ModelService.filtered("invuse", null, filter, 1000, false, true, null, true);
        },

        /**
         *
         */
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
            eventContext.ui.show("IssuesReturns.ErrorDetailPage");
        },

        setError: function (eventContext, haserror) {
            var errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
            errorRes.set("hasError", haserror);
        },

        getError: function (eventContext) {
            var errorRes = eventContext.application.getResource("errorResource").getCurrentRecord();
            return errorRes.get("hasError");
        },

        /**
         * Set Error Message on Error List Page
         */
        setErrorMessage: function (eventContext) {
            var invuse = eventContext.getCurrentRecord();
            invuse.set("errorMessage", invuse._errorMessage);
        },

        undoAndDelete: function (eventContext) {
            var test = new ApplicationHandlerBase();
            var invuse = eventContext.getResource().getCurrentRecord();
            var self = this;
            test.discardChanges(eventContext, invuse).then(function () {
                //change status to CANCELLED
                self.changeStatus(invuse, eventContext, null, self, "CANCELLED");

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

        /**
         * Validate data if entered manually into field.
         * Not Used.
         */
        asyncvalidateRotatingItemUsage: function (eventContext) {
            var filter = [];

            var rotassetnum = eventContext
                .getCurrentRecord()
                .getPendingOrOriginalValue("rotassetnum");
            var issuesReturnsResource = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var siteid = issuesReturnsResource.get("siteid");
            var storeroom = issuesReturnsResource.get("storeroom").toUpperCase();
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
            var filter = [];

            var issuesReturnsResource = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var siteid = issuesReturnsResource.get("siteid");
            var storeroom = issuesReturnsResource.get("storeroom").toUpperCase();
            var itemnum = eventContext.getCurrentRecord().get("itemnum");

            filter.push({ siteid: siteid });
            filter.push({ location: storeroom });
            filter.push({ itemnum: itemnum });

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
                eventContext.ui.show("IssuesReturns.RotatingItemListView");
            });
        },

        /**
         * Validate Rotating Assets
         */
        validateRotatingAsset: function (eventContext) {
            var filter = [];
            var assetRecord = eventContext.getCurrentRecord();
            var origRotatingAssetNum = assetRecord.get("rotassetnum");
            var issuesReturnsResource = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            var newRotatingAssetNum = assetRecord.getPendingOrOriginalValue("rotassetnum");
            var siteid = issuesReturnsResource.get("siteid");
            var storeroom = issuesReturnsResource.get("storeroom").toUpperCase();
            var itemnum = eventContext.getCurrentRecord().get("itemnum");
            var self = this;

            filter.push({ assetnum: newRotatingAssetNum });
            filter.push({ siteid: siteid });
            filter.push({ location: storeroom });
            filter.push({ itemnum: itemnum });

            //sometimes we will loop through a second time.Make sure we exit.
            if (!origRotatingAssetNum && !newRotatingAssetNum) {
                return;
            }

            if (!newRotatingAssetNum) {
                this.selectRotatingAsset(eventContext, origRotatingAssetNum, newRotatingAssetNum);
                return;
            }

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
                if (rotatingAssetSet.count() == 0) {
                    ModelService.clearSearchResult(rotatingAssetSet);
                    self.ui.showMessage(
                        MessageService.createStaticMessage("invalidAsset").getMessage()
                    );
                    assetRecord.setNullValue("rotassetnum");
                    return;
                } else {
                    ModelService.clearSearchResult(rotatingAssetSet);
                    self.selectRotatingAsset(
                        eventContext,
                        origRotatingAssetNum,
                        newRotatingAssetNum
                    );
                    return;
                }
            });
        },

        /**
         * Validate and Manage selected rotating assets.
         * Prevent from entering multiple rows with the same rotating asset
         */
        selectRotatingAsset: function (eventContext, origRotatrotassetnum, rotassetnum) {
            var assetRecord = eventContext.getCurrentRecord();
            var newRotatingAssetNum = "";
            var self = this;

            var splitRecord = eventContext.application
                .getResource("splitqtyacrossbins")
                .getCurrentRecord();
            var rotatingAssetResource = eventContext.application
                .getResource("rotatingAssetUsage")
                .getCurrentRecord();

            //check if changing rotateassetnum
            var originalRotatingAssetnum = splitRecord.get("rotassetnum");

            if (origRotatrotassetnum || rotassetnum) {
                newRotatingAssetNum = rotassetnum;
                originalRotatingAssetnum = origRotatrotassetnum;
            } else {
                newRotatingAssetNum = assetRecord.get("assetnum");
                originalRotatingAssetnum = splitRecord.get("rotassetnum");
            }

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
                        splitRecord.set("rotassetnum", originalRotatingAssetnum);
                        rotatingAssetResource.rotatingArray.push(originalRotatingAssetnum);
                        self.ui.showMessage(
                            MessageService.createStaticMessage("dupRotatingAsset").getMessage()
                        );
                        throw new PlatformRuntimeException("dupRotatingAsset");
                    } else {
                        if (newRotatingAssetNum) {
                            rotatingAssetResource.rotatingArray.push(newRotatingAssetNum);
                        }
                    }
                }
            }

            if (!origRotatrotassetnum && !rotassetnum) {
                //if we are here, we are validating
                splitRecord.set("rotassetnum", newRotatingAssetNum);
                eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
            }
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
            locationFilter.siteid = siteid;
            locationFilter.location = storeroom;

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

        /**
         * Validate the issue quantity
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
        checkNegativeAvailability: function (eventContext, invreserveSet, issuesReturns, issueQty) {
            var negObject = {};
            var deferred = new Deferred();

            var itemBalanceMap = {}; //create item balance map
            var itemAvailableBalanceMap = {}; //create item available balance map
            var curbaltotalMap = {}; //create curbaltotal map
            var storeroom = issuesReturns.storeroom;
            var siteid = issuesReturns.siteid;
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

                        var currentRecord = eventContext.getCurrentRecord();

                        //if negative availability is not allwoed, then throw message
                        var negativeAvailMaxvar = self.getNegativeAvailabilityMaxvar(eventContext);
                        negObject.negativeAvailMaxvar = negativeAvailMaxvar;
                        if (negativeAvailMaxvar == "DISALLOW") {
                            if (issueQty) {
                                if (
                                    currentRecord.inventoryid == inventoryRec.inventoryid &&
                                    issueQty > availableBalance
                                ) {
                                    //availablebalance will go negative
                                    var msg = MessageService.createResolvedMessage(
                                        "negativeAvailabilityCheck",
                                        [inventoryRec.itemnum]
                                    );
                                    /* #region  Loc-in: fix show error message */
                                    // self.ui.showMessage(msg);
                                    UI.application.showMessage(msg);
                                    /* #endregion Loc-out: fix show error message */
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
            var issuesReturns = CommonHandler._getAdditionalResource(
                eventContext,
                "issuesReturns"
            ).getCurrentRecord();
            reservedHeader.setDateValue("createdate", this.application.getCurrentDateTime());
            reservedHeader.set("storeroom", issuesReturns.storeroom);
        },

        setDefaultActualDateReservedItems: function (eventContext) {
            var reservedItem = eventContext.getCurrentRecord();
            reservedItem.setDateValue("actualdate", this.application.getCurrentDateTime());
            /* var invreserveSet = eventContext.getResource();
			var currentDate = this.application.getCurrentDateTime();
			if (invreserveSet.count()>0){
				arrayUtil.forEach(invreserveSet.data, function(invreserve){
					reservedItems.setDateValue('actualdate', this.application.getCurrentDateTime());
				});
			} */
        },

        validateActualDateIssueReturnItems: function (eventContext) {
            var self = this;
            var currentRecord = eventContext.getResource().getCurrentRecord();
            if (currentRecord && !currentRecord.actualdate) {
                var msg = MessageService.createStaticMessage("emptyActualDate").getMessage();
                if (self.ui.getCurrentDialog().id == "Platform.DateTimeLookup") {
                    setTimeout(function () {
                        self.ui.showMessage(msg);
                    }, 10);
                }
            }
        },

        /**
         * Validate if a checkbox is selected
         */
        checkBoxValidation: function (eventContext, invreserveSet) {
            //check if checkboxes are selected
            invreserveSet.filter("reservedIndicator == true");

            if (invreserveSet && invreserveSet.count() == 0) {
                /* #region  Tuan-in: clear filter to prevent empty data*/
                CommonHandler._clearFilterForResource(eventContext, invreserveSet);
                /* #endregion Tuan-out: clear filter to prevent empty data */
                throw new PlatformRuntimeException("atLeastOneItem");
            }
        },

        clearSelectedFilter: function (eventContext) {
            var invreserveRecords = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            );
            console.log("test before clear filter", invreserveRecords.data);
            CommonHandler._clearFilterForResource(eventContext, invreserveRecords);
            console.log("test after clear filter", invreserveRecords.data);
        },

        clearReservedHeader: function (eventContext) {
            var reservedHeaderRecord = eventContext.application
                .getResource("issueReservedHeader")
                .getCurrentRecord();
            reservedHeaderRecord.formnumber = "";
            reservedHeaderRecord.description = "";
            reservedHeaderRecord.documentref = "";
            reservedHeaderRecord.createdate = null;
            reservedHeaderRecord.selectall = true;
        },

        /* setStoreroomTitle: function(eventContext){
			var issuesReturns = CommonHandler._getAdditionalResource(eventContext,'issuesReturns').getCurrentRecord();
			var storeroom = issuesReturns.storeroom;
			var view = eventContext.ui.getViewFromId('IssuesReturns.InvreserveListView');
			var storeRoomAction = view.actions.children[0];
			storeRoomAction.label = storeroom;
			storeRoomAction
			//view.refresh();
		} */

        checkExistFormNo: function (eventContext) {
            var self = this;
            var filter = [];

            var currentRecord = eventContext.getCurrentRecord();
            var formnumber = currentRecord.get("formnumber");
            if (formnumber) {
                filter.push({ formnumber: formnumber });

                /* ModelService.all('invuse',PlatformConstants.SEARCH_RESULT_QUERYBASE).then(function(searchResultSet){
					ModelService.clearSearchResult(searchResultSet).then(function(){
						
					});		
				}); */

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

        /**
         * Dynamic fetch for the bin lookup view
         */
        fromBinLookup: function (eventContext) {
            var filter = [];

            var issueReservedHeader = CommonHandler._getAdditionalResource(
                eventContext,
                "issueReservedHeader"
            ).getCurrentRecord();
            var invreserve = CommonHandler._getAdditionalResource(
                eventContext,
                "invreserve"
            ).getCurrentRecord();
            var siteid = invreserve.get("siteid");
            var itemnum = invreserve.get("item");
            var storeroom = issueReservedHeader.get("storeroom");

            filter.push({ siteid: siteid });
            filter.push({ location: storeroom });
            filter.push({ itemnum: itemnum });
            //filter.push({stagingbin: 0});

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

                eventContext.ui.show("IssuesReturns.FromBinListView");
            });
        },

        selectFromBinLot: function (eventContext) {
            var invbalTemp = eventContext.application.getResource("invbalTemp").getCurrentRecord();

            var previousView =
                WL.application.ui.viewHistory[WL.application.ui.viewHistory.length - 2].id;
            if (previousView == "IssuesReturns.InvreserveListView") {
                var issueResource = CommonHandler._getAdditionalResource(
                    eventContext,
                    "invreserve"
                ).getCurrentRecord();
                issueResource.set("frombin", invbalTemp.binnum);
                issueResource.set("frombincurbal", invbalTemp.curbal);
                issueResource.set("fromlot", invbalTemp.lotnum);
                //eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
                eventContext.ui.returnToView("IssuesReturns.InvreserveListView");
            } else if (previousView == "IssuesReturns.AdditionalItemsDetailsView") {
                eventContext.application[
                    "application.handlers.IssuesAvailableItemsHandler"
                ].selectFromBinLot(eventContext);
            }
        },

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
            var previousView =
                WL.application.ui.viewHistory[WL.application.ui.viewHistory.length - 2].id;
            if (previousView == "IssuesReturns.InvreserveListView") {
                var issueResource = CommonHandler._getAdditionalResource(
                    eventContext,
                    "invreserve"
                ).getCurrentRecord();
                issueResource.set("frombin", "");
                issueResource.set("frombincurbal", 0);
                issueResource.set("fromlot", "");
                eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
            } else if (previousView == "IssuesReturns.AdditionalItemsDetailsView") {
                eventContext.application[
                    "application.handlers.IssuesAvailableItemsHandler"
                ].clearFromBinLotSelection(eventContext);
            }
        },

        /**
         * Transits Back to InvreserveListView or AdditionalItemsDetailsView
         */
        transitsBackToView: function (eventContext) {
            /* var previousView = WL.application.ui.viewHistory[WL.application.ui.viewHistory.length-2].id;
			if(previousView == "IssuesReturns.InvreserveListView"){
				eventContext.application['application.handlers.IssuesReturnsHandler'].clearUnreservedSearchFields(eventContext);
				eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			} else if (previousView == "IssuesReturns.AdditionalItemsDetailsView"){
				eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
			} */
            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
        },
        //#endregion Loc-In: init Reserved Header, default ActualDate
    });
});
