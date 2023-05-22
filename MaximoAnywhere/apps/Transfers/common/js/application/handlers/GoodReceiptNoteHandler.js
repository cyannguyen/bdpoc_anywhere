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
 * @module application/handlers/GoodReceiptNoteHandler
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
define("application/handlers/GoodReceiptNoteHandler", [
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
    "application/handlers/TransfersHandler",
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
    return declare(
        [ApplicationHandlerBase, AsyncAwareMixin],
        /**
         * @lends platform.handlers._ApplicationHandlerBase#
         * @lends platform.util.AsyncAwareMixin#
         */
        {
            updateGRNLookupData: function (eventContext) {
                // var grnPromise = ModelService.filtered(
                //     "grnResource",
                //     PlatformConstants.SEARCH_RESULT_QUERYBASE,
                //     1000,
                //     true,
                // );
                // grnPromise.then(function (grnSet) {
                //     ModelService.clearSearchResult(grnSet);
                //     grnSet.resourceID = "grnSearchLookupData";
                //     eventContext.application.addResource(grnSet);
                // });
                console.log("TODO");
            },

            updateGRNPoLookupData: function (eventContext) {
                eventContext.application.showBusy();
                var self = this;
                var filter = [{ internal: false }];

                filter.push({ status: "APPR" });
                var poPromise = ModelService.filtered(
                    "poResource",
                    PlatformConstants.SEARCH_RESULT_QUERYBASE,
                    filter,
                    50,
                    true,
                    true,
                    null,
                    false
                );
                poPromise
                    .then(function (poSet) {
                        poSet.sort("orderdate asc");
                        poSet.resourceID = "grnPonumTemp";
                        eventContext.application.addResource(poSet);

                        eventContext.application.hideBusy();

                        //verify if search result data is empty
                        if (poSet.data.length == 0) {
                            var msg =
                                MessageService.createStaticMessage(
                                    "emptySearchResult"
                                ).getMessage();
                            self.ui.showMessage(msg);
                        }
                    })
                    .otherwise(function (error) {
                        Logger.trace(self._className + ": " + error);
                    });
            },

            clearForm: function (eventContext) {
                var formRecord = CommonHandler._getAdditionalResource(
                    eventContext,
                    "createGRNForm"
                ).getCurrentRecord();
                formRecord.setNullValue("grnnumber");
                formRecord.setNullValue("ponum");
                formRecord.setNullValue("description");
                formRecord.setNullValue("type");
                formRecord.setNullValue("supplierref");
                var currentDate = new Date();
                formRecord.setDateValue("actualdate", currentDate);
            },

            checkExistGRN: function (eventContext) {
                var formRecord = CommonHandler._getAdditionalResource(
                    eventContext,
                    "createGRNForm"
                ).getCurrentRecord();
                var grnno = formRecord.get("grnnumber");
                if (grnno == null || grnno == "") return;

                var self = this;
                var filter = [];

                filter.push({ grnnumber: grnno });
                var deferred = new Deferred();
                ModelService.filtered(
                    "grnResource",
                    PlatformConstants.SEARCH_RESULT_QUERYBASE,
                    filter,
                    1000,
                    true,
                    true,
                    null,
                    false
                ).then(function (invuseSet) {
                    deferred.resolve(invuseSet);
                });
                var promise = deferred.promise;
                promise
                    .then(function (grnSet) {
                        if (grnSet.count() > 0) {
                            formRecord.setNullValue("grnnumber");
                            var msg = MessageService.createResolvedMessage("existFormNumber");
                            self.ui.showMessage(msg);
                            return;
                        }
                    })
                    .catch(function () {
                        console.log("Promise Rejected");
                    });
            },

            submitGRN: function (eventContext) {
                var formRecord = CommonHandler._getAdditionalResource(
                    eventContext,
                    "createGRNForm"
                ).getCurrentRecord();
                var grnno = formRecord.get("grnnumber");
                var ponum = formRecord.get("ponum");
                var desc = formRecord.get("description");
                var type = formRecord.get("type");
                var status = formRecord.get("status");

                var supplierref = formRecord.get("supplierref");
                var createdate = formRecord.get("createdate");
                var actualdate = formRecord.get("actualdate");
                var pic = formRecord.get("pic");
                var createby = formRecord.get("createby");

                if (
                    grnno == null ||
                    ponum == null ||
                    desc == null ||
                    type == null ||
                    status == null
                ) {
                    var requiredMsg =
                        MessageService.createStaticMessage("requiredField").getMessage();
                    eventContext.ui.showMessage(requiredMsg);
                    return;
                }

                var grnResources = CommonHandler._getAdditionalResource(
                    eventContext,
                    "grnResource"
                );

                var newGrn = grnResources.createNewRecord();

                newGrn.set("grnnumber", grnno);
                newGrn.set("ponum", ponum);
                newGrn.set("description", desc);
                newGrn.set("type", type);
                newGrn.set("status", status);

                newGrn.set("supplierref", supplierref);
                newGrn.set("createdate", createdate);
                newGrn.set("actualdate", actualdate);
                newGrn.set("pic", pic);
                newGrn.set("createby", createby);

                ModelService.save(grnResources)
                    .then(function () {
                        //flush transactions before checking for errors
                        var flushPromise = PushingCoordinatorService.flush();
                        flushPromise.then(function () {
                            eventContext.application.hideBusy();
                            // eventContext.ui.returnToView("Transfers.ModuleSelectionView");
                            eventContext.ui.hideCurrentView(PlatformConstants.CLEANUP);
                        });
                    })
                    .otherwise(function (err) {
                        eventContext.application.hideBusy();
                        eventContext.ui.showMessage(err);
                    });
            },

            initGRNform: function (eventContext) {
                this.clearForm(eventContext);
                var record = CommonHandler._getAdditionalResource(
                    eventContext,
                    "createGRNForm"
                ).getCurrentRecord();
                record.set("status", "ENTERED");
                var currentDate = new Date();
                record.setDateValue("createdate", currentDate);
                record.setDateValue("actualdate", currentDate);

                var userInfo = CommonHandler._getAdditionalResource(
                    eventContext,
                    "userInfo"
                ).getCurrentRecord();
                var personid = userInfo.get("personid");

                record.set("pic", personid);
                record.set("createby", personid);
            },
        }
    );
});
