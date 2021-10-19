/* 
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */
 
//----------------------------------------------------------------//
// This is auto generated code. Do not modify it manually.
// Product and Version: IBM Maximo Anywhere Version 7.5
// Build: 2021-10-15 16:02:21
//----------------------------------------------------------------//
define(   "generated/application/ui/ApplicationUIBuilder", 
      [
         "dojo/_base/declare", 
         "dojo/promise/all", 
         "platform/ui/builder/_UIBuilderBase", 
         "dojo/_base/window", 
         "dojo/_base/array", 
         "dojo/io-query", 
         "platform/model/AdditionalDataManager", 
         "platform/model/AdditionalDataUIManager", 
         "platform/translation/MessageService", 
         "platform/ui/control/Application", 
         "platform/ui/control/UserInterface", 
         "platform/ui/control/Dialog", 
         "platform/ui/control/Container", 
         "platform/ui/control/Text", 
         "platform/ui/control/Button", 
         "platform/handlers/SSOHandler", 
         "platform/handlers/LoginHandler", 
         "platform/ui/control/View", 
         "platform/ui/control/Image", 
         "platform/handlers/_ApplicationHandlerBase", 
         "platform/ui/control/Queries", 
         "platform/ui/control/Query", 
         "application/handlers/InventoryHandler", 
         "platform/ui/control/Actions", 
         "platform/ui/control/Action", 
         "platform/handlers/WorkOfflineHandler", 
         "platform/ui/control/ProgressIndicator", 
         "platform/ui/control/List", 
         "platform/ui/control/FindByScan", 
         "platform/ui/control/SortOptions", 
         "platform/ui/control/SortOption", 
         "platform/ui/control/SortAttribute", 
         "platform/ui/control/ListItemTemplate", 
         "platform/ui/control/ListText", 
         "platform/ui/control/Group", 
         "platform/ui/control/GroupItem", 
         "platform/ui/control/ErrorIndicator", 
         "platform/ui/control/Footer", 
         "platform/ui/control/Lookup", 
         "platform/ui/control/SearchAttributes", 
         "platform/ui/control/SearchAttribute", 
         "platform/ui/control/ReturnAttributes", 
         "platform/ui/control/ReturnAttribute", 
         "platform/handlers/AttachmentHandler", 
         "platform/handlers/PseudoOfflineModeHandler", 
         "platform/handlers/CreateQueryBaseHandler", 
         "platform/ui/control/ErrorActions", 
         "platform/handlers/LookupHandler", 
         "platform/handlers/PushNotificationDialogHandler", 
         "platform/ui/control/DateTimePicker", 
         "platform/handlers/SettingsHandler", 
         "platform/handlers/ChangePasswordHandler", 
         "platform/handlers/AdditionalDataDialogHandler", 
         "platform/ui/control/RadioButton", 
         "platform/logging/handler/LoggerReportHandler", 
         "platform/performance/handler/TimeTrackHandler", 
         "platform/handlers/DialogHandler", 
         "platform/ui/control/DurationPicker", 
         "platform/handlers/EsigHandler", 
         "platform/signature/handler/SignatureHandler"
      ],

function(declare, all, BuilderBase, window, array, ioQuery, AdditionalDataManager, AdditionalDataUIManager, MessageService, Application, UserInterface, Dialog, Container, Text, Button, SSOHandler, LoginHandler, View, Image, _ApplicationHandlerBase, Queries, Query, InventoryHandler, Actions, Action, WorkOfflineHandler, ProgressIndicator, List, FindByScan, SortOptions, SortOption, SortAttribute, ListItemTemplate, ListText, Group, GroupItem, ErrorIndicator, Footer, Lookup, SearchAttributes, SearchAttribute, ReturnAttributes, ReturnAttribute, AttachmentHandler, PseudoOfflineModeHandler, CreateQueryBaseHandler, ErrorActions, LookupHandler, PushNotificationDialogHandler, DateTimePicker, SettingsHandler, ChangePasswordHandler, AdditionalDataDialogHandler, RadioButton, LoggerReportHandler, TimeTrackHandler, DialogHandler, DurationPicker, EsigHandler, SignatureHandler) {
      return declare("generated.application.ui.ApplicationUIBuilder", BuilderBase, {

         build : function() {
            console.log('Creating App');

            MessageService.init('artifact');


            var app001 = new Application({
               'logLevel' : 0,
               'xsi:noNamespaceSchemaLocation' : '..\/..\/..\/build\/app.xsd',
               'xmlns:xsi' : 'http:\/\/www.w3.org\/2001\/XMLSchema-instance',
               'id' : 'PhysicalCount',
               'blindQuerySupport' : 'true',
               'version' : '201506161051',
               'requiredRole' : 'ANYWHERE_PHYSICAL_COUNT',
            });
            app001.setFeatures({
            'update.artifact.timestamps' : false,
            'esig.enabled' : true,
            'gps.enabled' : false,
            'enableDataEncryption' : true,
            'barcode.enabled' : true,
            'attachments.enabled' : false,
            'globalization.use.mock' : false,
            'run.bvt.scripts' : false,
            'build.update.check.enabled' : true,
            'pushnotification.enabled' : false,
            'map.enabled' : false,

            });

            var ui001 = new UserInterface({
               'artifactId' : 'ui',
               'id' : 'aw27ff46b0',
            });
            app001.addChild( ui001 );
            AdditionalDataManager._setAdditionalDataUIManager(new AdditionalDataUIManager(ui001));

            var dialog001 = new Dialog({
               'id' : 'Platform.SSOError',
               'label' : MessageService.createStaticMessage('SSO Login Error'),
            });
            ui001.addChild( dialog001 );


            var container001 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'resource' : 'SSODialogResource',
               'artifactId' : 'Platform.SSOError_SSODialogResource_container_0',
               'id' : 'aw8b213d94',
            });
            dialog001.addChild( container001 );


            var text001 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.SSOError_SSODialogResource_container_0_ErrorusingSSOLogi',
               'id' : 'awa51c0f06',
               'value' : MessageService.createStaticMessage('Error using SSO Login'),
            });
            container001.addChild( text001 );


            var text002 = new Text({
               'resourceAttribute' : 'errorMsg',
               'editable' : false,
               'artifactId' : 'Platform.SSOError_SSODialogResource_container_0_errorMsg',
               'id' : 'awf2a9265',
            });
            container001.addChild( text002 );


            var container002 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.SSOError_container_0',
               'id' : 'awbf273d01',
            });
            dialog001.addChild( container002 );


            var button001 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.SSOError_Retry_button',
               'id' : 'aw7e9aa474',
               'label' : MessageService.createStaticMessage('Retry'),
            });
            var eventHandlers001 = [
               {
                     'method' : 'performSSOLogin',
                     'artifactId' : 'Platform.SSOError_Retry_button_eventHandlers_click_performSSOLogin',
                     'id' : 'aw18912c1f',
                     'event' : 'click',
                     'class' : 'platform.handlers.SSOHandler',
               }
            ];
            button001.eventHandlers = eventHandlers001;
            container002.addChild( button001 );


            var dialog002 = new Dialog({
               'id' : 'Platform.SSOUserNameError',
               'label' : MessageService.createStaticMessage('SSO User Name Error'),
            });
            ui001.addChild( dialog002 );


            var container003 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'resource' : 'SSODialogResource',
               'artifactId' : 'Platform.SSOUserNameError_SSODialogResource_container_0',
               'id' : 'awe49a2936',
            });
            dialog002.addChild( container003 );


            var text003 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.SSOUserNameError_SSODialogResource_container_0_Errorretrievingthe',
               'id' : 'aw1211d176',
               'value' : MessageService.createStaticMessage('Error retrieving the user name from the device'),
            });
            container003.addChild( text003 );


            var text004 = new Text({
               'resourceAttribute' : 'errorMsg',
               'editable' : false,
               'artifactId' : 'Platform.SSOUserNameError_SSODialogResource_container_0_errorMsg',
               'id' : 'awe659a10b',
            });
            container003.addChild( text004 );


            var container004 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.SSOUserNameError_container_0',
               'id' : 'awd7539907',
            });
            dialog002.addChild( container004 );


            var button002 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.SSOUserNameError_Retry_button',
               'id' : 'aw979175e5',
               'label' : MessageService.createStaticMessage('Retry'),
            });
            var eventHandlers002 = [
               {
                     'method' : 'performSSOLogin',
                     'artifactId' : 'Platform.SSOUserNameError_Retry_button_eventHandlers_click_performSSOLogin',
                     'id' : 'aw74e4917c',
                     'event' : 'click',
                     'class' : 'platform.handlers.SSOHandler',
               }
            ];
            button002.eventHandlers = eventHandlers002;
            container004.addChild( button002 );


            var dialog003 = new Dialog({
               'id' : 'Platform.DownloadError',
               'label' : MessageService.createStaticMessage('System Data Download Error'),
            });
            ui001.addChild( dialog003 );


            var container005 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.DownloadError.container',
               'id' : 'awb89e88b',
            });
            dialog003.addChild( container005 );


            var text005 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.DownloadError.text',
               'id' : 'aw63a3744e',
               'value' : MessageService.createStaticMessage('Error downloading System Data'),
            });
            container005.addChild( text005 );


            var container006 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.DownloadError.container2',
               'id' : 'aw60b46d4d',
            });
            dialog003.addChild( container006 );


            var button003 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.DownloadError.button',
               'id' : 'awcf9d5479',
               'label' : MessageService.createStaticMessage('Retry'),
            });
            var eventHandlers003 = [
               {
                     'method' : 'retrySystemDownload',
                     'artifactId' : 'Platform.DownloadError.eventHandler',
                     'id' : 'awa24338f8',
                     'event' : 'click',
                     'class' : 'platform.handlers.LoginHandler',
               }
            ];
            button003.eventHandlers = eventHandlers003;
            container006.addChild( button003 );


            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'platform.LoginView', false);
               trackTimer.startTracking();
            }

            var view001 = new View({
               'cssClass' : 'mainLogin',
               'resource' : 'PlatformLoginResource',
               'showHeader' : false,
               'id' : 'platform.LoginView',
            });
            ui001.addChild( view001 );

            var requiredResources001 = {
               'PlatformLongPressResource' : {
                  'artifactId' : 'platform.LoginView_PlatformLongPressResource',
                  'id' : 'aw9dc81534',
               },
               'PlatformProgressResource' : {
                  'artifactId' : 'platform.LoginView_PlatformProgressResource',
                  'id' : 'aw80cf2a6f',
               },
               'PlatformChangePasswordForm' : {
                  'artifactId' : 'platform.LoginView_PlatformChangePasswordForm',
                  'id' : 'aw950ff29',
               },
            };
            view001.addRequiredResources( requiredResources001 );

            var container007 = new Container({
               'cssClass' : 'loginForm',
               'artifactId' : 'platform.LoginView_container_0',
               'id' : 'aw1429aadd',
            });
            view001.addChild( container007 );


            var image001 = new Image({
               'image' : '..\/..\/..\/..\/..\/..\/images\/mdpi\/BDPOCLogo.png',
               'cssClass' : 'productLogo',
               'artifactId' : 'platform.LoginView_image_0',
               'id' : 'aw9576ccdf',
            });
            container007.addChild( image001 );


            var text006 = new Text({
               'resourceAttribute' : 'appName',
               'cssClass' : 'productName',
               'editable' : false,
               'artifactId' : 'platform.LoginView_container_0_appName',
               'id' : 'aw22401029',
            });
            container007.addChild( text006 );


            var text007 = new Text({
               'resourceAttribute' : 'errorMsg',
               'cssClass' : 'errorMsg',
               'editable' : false,
               'artifactId' : 'platform.LoginView_container_0_errorMsg',
               'id' : 'aw87817020',
            });
            container007.addChild( text007 );


            var text008 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'username',
               'cssClass' : 'loginUsername',
               'editable' : true,
               'artifactId' : 'platform.LoginView_container_0_username',
               'id' : 'awca3922ff',
               'placeHolder' : MessageService.createStaticMessage('Username'),
            });
            container007.addChild( text008 );


            var text009 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'password',
               'cssClass' : 'loginPassword',
               'editable' : true,
               'artifactId' : 'platform.LoginView_container_0_password',
               'id' : 'aw7a5625d',
               'type' : 'password',
               'placeHolder' : MessageService.createStaticMessage('Password'),
            });
            container007.addChild( text009 );


            var button004 = new Button({
               'cssClass' : 'loginBtn',
               'artifactId' : 'platform.LoginView_LogIn_button',
               'id' : 'awe0510eac',
               'label' : MessageService.createStaticMessage('Sign In'),
               'primary' : 'true',
            });
            var eventHandlers004 = [
               {
                     'method' : 'loginClickHandler',
                     'artifactId' : 'platform.LoginView_LogIn_button_eventHandlers_click_loginClickHandler',
                     'id' : 'awa8e7b081',
                     'event' : 'click',
                     'class' : 'platform.handlers.LoginHandler',
               }
            ];
            button004.eventHandlers = eventHandlers004;
            container007.addChild( button004 );


            var text010 = new Text({
               'labelCss' : 'loginLink',
               'artifactId' : 'PrivacyPolicy_link',
               'id' : 'aw8e500c53',
               'label' : MessageService.createStaticMessage('Privacy Policy'),
            });
            container007.addChild( text010 );

            var eventHandlers005 = [
               {
                     'method' : 'privacyPolicyLinkClicked',
                     'artifactId' : 'PrivacyPolicy_link_eventHandlers_click',
                     'id' : 'aw3c2baacc',
                     'event' : 'click',
                     'class' : 'platform.handlers.LoginHandler',
               }
            ];
            text010.eventHandlers = eventHandlers005;

            var image002 = new Image({
               'image' : 'IBMLogo.svg',
               'cssClass' : 'IBMLogo',
               'artifactId' : 'platform.LoginView_image_1',
               'id' : 'awe271fc49',
            });
            container007.addChild( image002 );

            var eventHandlers006 = [
               {
                     'method' : 'initializeLogin',
                     'artifactId' : 'platform.LoginView_eventHandlers_show_initializeLogin',
                     'id' : 'aw9137190b',
                     'event' : 'show',
                     'class' : 'platform.handlers.LoginHandler',
               },
               {
                     'method' : 'changeQueryBase',
                     'artifactId' : 'platform.LoginView_eventHandlers_initialize_changeQueryBase',
                     'id' : 'aw5f76d673',
                     'event' : 'initialize',
                     'class' : 'platform.handlers._ApplicationHandlerBase',
               }
            ];
            view001.eventHandlers = eventHandlers006;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Inventory.ItemsView', false);
               trackTimer.startTracking();
            }

            var view002 = new View({
               'showBackButton' : 'false',
               'id' : 'Inventory.ItemsView',
               'label' : MessageService.createStaticMessage('Items'),
            });
            ui001.addChild( view002 );


            var queries001 = new Queries({
               'resource' : 'invbalance',
               'artifactId' : 'Inventory.ItemsView_invbalance_queries',
               'id' : 'aw416405f7',
            });
            view002.addChild( queries001 );


            var query001 = new Query({
               'system' : 'true',
               'artifactId' : 'Inventory.ItemsView_physicalcount',
               'id' : 'aw943dab82',
               'label' : MessageService.createStaticMessage('Physical Count'),
               'queryBase' : 'physicalcount',
            });
            queries001.addChild( query001 );

            var eventHandlers007 = [
               {
                     'method' : 'loadInvbalanceByQueryBase',
                     'artifactId' : 'Inventory.ItemsView_physicalcount_eventHandlers_render',
                     'id' : 'awdfc28e51',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            query001.eventHandlers = eventHandlers007;

            var query002 = new Query({
               'system' : 'true',
               'artifactId' : 'Inventory.ItemsView_physicalcountNB',
               'id' : 'awff40445c',
               'label' : MessageService.createStaticMessage('Physical Count NB'),
               'queryBase' : 'physicalcountNB',
            });
            queries001.addChild( query002 );

            var eventHandlers008 = [
               {
                     'method' : 'loadInvbalanceByQueryBase',
                     'artifactId' : 'Inventory.ItemsView_physicalcountNB_eventHandlers_render',
                     'id' : 'awec280a78',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            query002.eventHandlers = eventHandlers008;

            var query003 = new Query({
               'system' : 'true',
               'artifactId' : 'Inventory.ItemsView___errored__',
               'id' : 'aw162c98e1',
               'label' : MessageService.createStaticMessage('Records with Errors'),
               'queryBase' : '__errored__',
            });
            queries001.addChild( query003 );

            var eventHandlers009 = [
               {
                     'method' : 'hideShowErrorMenu',
                     'artifactId' : 'Inventory.ItemsView___errored___eventHandlers_render_hideShowErrorMenu',
                     'id' : 'awd9cab79d',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            query003.eventHandlers = eventHandlers009;

            var query004 = new Query({
               'system' : 'true',
               'artifactId' : 'Inventory.ItemsView___search_result__',
               'id' : 'aw8187e730',
               'label' : MessageService.createStaticMessage('Search Results'),
               'queryBase' : '__search_result__',
            });
            queries001.addChild( query004 );


            var actions001 = new Actions({
               'artifactId' : 'Inventory.ItemsView_actions',
               'id' : 'aw9d32919d',
            });
            view002.addChild( actions001 );


            var action001 = new Action({
               'overflow' : true,
               'artifactId' : 'Inventory.ItemsView_DownloadWorkList_action',
               'id' : 'awe198234',
               'label' : MessageService.createStaticMessage('Download Work List'),
            });
            actions001.addChild( action001 );

            var eventHandlers010 = [
               {
                     'method' : 'workoffline',
                     'artifactId' : 'WorkExecution.WorkItemsView_DownloadWorkList_action_eventHandlers_click_workoffline',
                     'id' : 'aw36aebb93',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               },
               {
                     'method' : 'enableDisableMenu',
                     'artifactId' : 'WorkExecution.WorkItemsView_DownloadWorkList_action_eventHandlers_render_enableDisableMenu',
                     'id' : 'awc7d508d8',
                     'event' : 'render',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            action001.eventHandlers = eventHandlers010;

            var action002 = new Action({
               'image' : '\/images\/header_recount_OFF.svg',
               'transitionTo' : 'Inventory.ItemRecountView',
               'artifactId' : 'Inventory.ItemsView_Recount_action',
               'id' : 'awaf3f032e',
               'label' : MessageService.createStaticMessage('Recount'),
            });
            actions001.addChild( action002 );

            var requiredResources002 = {
               'invbalance' : {
                  'artifactId' : 'Inventory.ItemsView_invbalance',
                  'id' : 'aw83260a4e',
               },
               'appInfo' : {
                  'artifactId' : 'Inventory.ItemsView_appInfo',
                  'id' : 'aw90d85426',
               },
               'storeRoomResource' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.ItemsView_additionalstoreroom',
                  'id' : 'awa2b2173a',
               },
            };
            view002.addRequiredResources( requiredResources002 );

            var progressIndicator001 = new ProgressIndicator({
               'artifactId' : 'Inventory.ItemsView_0',
               'id' : 'awed262ada',
            });
            view002.addChild( progressIndicator001 );


            var container008 = new Container({
               'cssClass' : 'storeRoomHeaderContainer',
               'resource' : 'storeRoomResource',
               'artifactId' : 'Inventory.ItemsView_StoreRoom_container_',
               'id' : 'awf25bf19d',
            });
            view002.addChild( container008 );


            var text011 = new Text({
               'resourceAttribute' : 'location',
               'cssClass' : 'storeRoomHeader',
               'editable' : false,
               'artifactId' : 'Inventory.ItemsView.StoreRoom_Label',
               'id' : 'awd8a949f',
            });
            container008.addChild( text011 );



            var findByScan001 = new FindByScan({
               'resourceAttribute' : 'itemnum',
               'enableFeatureByProperty' : 'barcode.enabled',
               'headerLabel' : 'Records matching: {0}',
               'artifactId' : 'Inventory.ItemsView_itemnum',
               'id' : 'aw30175872',
            });


            var sortOptions001 = new SortOptions({
               'artifactId' : 'Inventory.ItemsView_invbalance_list_sortOptions',
               'id' : 'awc382739b',
            });

            var sortOption001 = new SortOption({
               'artifactId' : 'Inventory.ItemsView_sortOption_Bin',
               'id' : 'awd8ea86b9',
               'label' : MessageService.createStaticMessage('Bin'),
            });
            sortOptions001.addChild( sortOption001 );


            var sortAttribute001 = new SortAttribute({
               'name' : 'location',
               'artifactId' : 'Inventory.ItemsView_Bin_sortAttribute_location',
               'id' : 'awd1140c8b',
               'direction' : 'asc',
            });
            sortOption001.addChild( sortAttribute001 );


            var sortAttribute002 = new SortAttribute({
               'name' : 'binnum',
               'artifactId' : 'Inventory.ItemsView_Bin_sortAttribute_binnum',
               'id' : 'aw56881ac1',
               'direction' : 'asc',
            });
            sortOption001.addChild( sortAttribute002 );


            var sortOption002 = new SortOption({
               'artifactId' : 'Inventory.ItemsView_sortOption_ItemNumber',
               'id' : 'aw5376b8a3',
               'label' : MessageService.createStaticMessage('Item Number'),
            });
            sortOptions001.addChild( sortOption002 );


            var sortAttribute003 = new SortAttribute({
               'name' : 'itemnum',
               'artifactId' : 'Inventory.ItemsView_ItemNumber_sortAttribute_itemnum',
               'id' : 'awe42d8a9',
               'direction' : 'asc',
            });
            sortOption002.addChild( sortAttribute003 );


            var sortOption003 = new SortOption({
               'artifactId' : 'Inventory.ItemsView_sortOption_CountDate',
               'id' : 'aw2970d975',
               'label' : MessageService.createStaticMessage('Count Date'),
            });
            sortOptions001.addChild( sortOption003 );


            var sortAttribute004 = new SortAttribute({
               'name' : 'dateparse',
               'artifactId' : 'Inventory.ItemsView_CountDate_sortAttribute_physcntdate',
               'id' : 'aw791fd773',
               'direction' : 'desc',
            });
            sortOption003.addChild( sortAttribute004 );



            var listItemTemplate001 = new ListItemTemplate({
               'layout' : 'ItemList3',
               'artifactId' : 'Inventory.ItemsView_invbalance_listItemTemplate_ItemList',
               'id' : 'aw7c94012a',
            });

            var listtext001 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'bold textappearance-smallerer descriptionListItem',
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row1',
               'id' : 'aw4cfe2d40',
            });
            listItemTemplate001.addChild( listtext001 );


            var listtext002 = new ListText({
               'cssClass' : 'bold textappearance-smaller listItemTiltle',
               'layoutInsertAt' : 'item3',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row2_col0',
               'id' : 'aw96416c27',
               'value' : MessageService.createStaticMessage('Item: '),
            });
            listItemTemplate001.addChild( listtext002 );


            var listtext003 = new ListText({
               'resourceAttribute' : 'itemnum',
               'cssClass' : 'bold textappearance-smaller listItemMargin',
               'layoutInsertAt' : 'item4',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row2_col1',
               'id' : 'awe1465cb1',
            });
            listItemTemplate001.addChild( listtext003 );


            var listtext004 = new ListText({
               'cssClass' : 'bold textappearance-smaller listItemTiltle',
               'layoutInsertAt' : 'item5',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row2_col2',
               'id' : 'aw784f0d0b',
               'value' : MessageService.createStaticMessage('Bin Num: '),
            });
            listItemTemplate001.addChild( listtext004 );


            var listtext005 = new ListText({
               'resourceAttribute' : 'binnum',
               'cssClass' : 'bold textappearance-smaller listItemMargin',
               'layoutInsertAt' : 'item6',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row2_col3',
               'id' : 'awf483d9d',
            });
            listItemTemplate001.addChild( listtext005 );


            var listtext006 = new ListText({
               'cssClass' : 'bold textappearance-smaller listItemTiltle',
               'layoutInsertAt' : 'item7',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row3_col0',
               'id' : 'aw5d1dbf82',
               'value' : MessageService.createStaticMessage('Unit: '),
            });
            listItemTemplate001.addChild( listtext006 );


            var listtext007 = new ListText({
               'resourceAttribute' : 'issueunit',
               'cssClass' : 'bold textappearance-smaller listItemMargin',
               'layoutInsertAt' : 'item8',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row3_col1',
               'id' : 'aw2a1a8f14',
            });
            listItemTemplate001.addChild( listtext007 );


            var listtext008 = new ListText({
               'cssClass' : 'bold textappearance-smaller listItemTiltle',
               'layoutInsertAt' : 'item9',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row3_col2',
               'id' : 'awb313deae',
               'value' : MessageService.createStaticMessage('Qty: '),
            });
            listItemTemplate001.addChild( listtext008 );


            var listtext009 = new ListText({
               'resourceAttribute' : 'curbal',
               'cssClass' : 'bold textappearance-smaller listItemMargin',
               'layoutInsertAt' : 'item10',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row3_col3',
               'id' : 'awc414ee38',
            });
            listItemTemplate001.addChild( listtext009 );


            var listtext010 = new ListText({
               'cssClass' : 'bold textappearance-smaller listItemTiltle',
               'layoutInsertAt' : 'item11',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row4_col0',
               'id' : 'aw40188f3a',
               'value' : MessageService.createStaticMessage('Part no: '),
            });
            listItemTemplate001.addChild( listtext010 );


            var listtext011 = new ListText({
               'resourceAttribute' : 'modelnum',
               'cssClass' : 'bold textappearance-smaller listItemMargin',
               'layoutInsertAt' : 'item12',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row4_col1',
               'id' : 'aw371fbfac',
            });
            listItemTemplate001.addChild( listtext011 );


            var listtext012 = new ListText({
               'resourceAttribute' : 'joinedlastcountdate',
               'cssClass' : 'bold textappearance-smaller listItemMargin',
               'layoutInsertAt' : 'item13',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row5_col1',
               'id' : 'awfc436c09',
            });
            listItemTemplate001.addChild( listtext012 );


            var image003 = new Image({
               'resourceAttribute' : 'row0',
               'cssClass' : 'checkImage',
               'layoutInsertAt' : 'item14',
               'artifactId' : 'Inventory.ItemsView_invbalance_ItemList2_row0',
               'id' : 'aw3bf91dd6',
            });
            listItemTemplate001.addChild( image003 );


            var eventHandlers011 = [
               {
                     'method' : 'initializeBarcodeScanner',
                     'artifactId' : 'Inventory.ItemsView_invbalance_list_eventHandlers_render_initializeBarcodeScanner',
                     'id' : 'awf5a405d9',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               },
               {
                     'method' : 'keepWorkListResource',
                     'artifactId' : 'Inventory.ItemsView_invbalance_list_eventHandlers_render_keepWorkListResource',
                     'id' : 'awf4ae3048',
                     'event' : 'render',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];

            var list001 = new List({
               'recordLabel' : MessageService.createStaticMessage('Item'),
               'resource' : 'invbalance',
               'transitionTo' : 'Inventory.ItemDetailView',
               'sortOptions' : sortOptions001,
               'findByScan' : findByScan001,
               'listItemTemplate' : listItemTemplate001,
               'artifactId' : 'Inventory.ItemsView_invbalance_list',
               'eventHandlers' : eventHandlers011,
               'id' : 'awbdfd7f95',
               'displayPageSize' : '20',
            });
            view002.addChild( list001 );

            var eventHandlers012 = [
               {
                     'method' : 'showBusyList',
                     'artifactId' : 'Inventory.ItemsView_eventHandlers_render_showBusyList',
                     'id' : 'aw89a4cff2',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            view002.eventHandlers = eventHandlers012;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Inventory.ItemDetailView', false);
               trackTimer.startTracking();
            }

            var view003 = new View({
               'resource' : 'invbalance',
               'showOverflow' : false,
               'showKeyboard' : 'false',
               'id' : 'Inventory.ItemDetailView',
               'label' : MessageService.createStaticMessage('Item Details'),
            });
            ui001.addChild( view003 );

            var requiredResources003 = {
               'invbalance' : {
                  'artifactId' : 'Inventory.ItemDetailView_invbalance',
                  'id' : 'aw7cb735be',
               },
               'blindCountQueryBases' : {
                  'artifactId' : 'Inventory.ItemDetailView_blindCountQueryBases',
                  'id' : 'aw21d7e23b',
               },
               'itemDetailResource' : {
                  'artifactId' : 'Inventory.ItemDetailView_itemDetailResource',
                  'id' : 'aw8ba7ad13',
               },
            };
            view003.addRequiredResources( requiredResources003 );

            var actions002 = new Actions({
               'artifactId' : 'Inventory.ItemDetailView_actions',
               'id' : 'awe6c67933',
            });
            view003.addChild( actions002 );


            var action003 = new Action({
               'image' : 'left_arrow.png',
               'overflow' : false,
               'artifactId' : 'Inventory.ItemDetailView_Previous_action',
               'id' : 'aw9b6881c3',
               'label' : MessageService.createStaticMessage('Previous'),
            });
            actions002.addChild( action003 );

            var eventHandlers013 = [
               {
                     'method' : 'previousRecord',
                     'artifactId' : 'Inventory.ItemDetailView_Previous_action_eventHandlers_click',
                     'id' : 'aw9d6d367f',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               },
               {
                     'method' : 'disableOnFirstRecord',
                     'artifactId' : 'Inventory.ItemDetailView_Previous_action_eventHandlers_datachange_disableOnFirstRecord',
                     'id' : 'aw81a83ddc',
                     'event' : 'datachange',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            action003.eventHandlers = eventHandlers013;

            var action004 = new Action({
               'image' : 'right_arrow.png',
               'overflow' : false,
               'artifactId' : 'Inventory.ItemDetailView_Next_action',
               'id' : 'aw87224ce7',
               'label' : MessageService.createStaticMessage('Next'),
            });
            actions002.addChild( action004 );

            var eventHandlers014 = [
               {
                     'method' : 'nextRecord',
                     'artifactId' : 'Inventory.ItemDetailView_Next_action_eventHandlers_click',
                     'id' : 'aw30f6da9',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            action004.eventHandlers = eventHandlers014;


            var listItemTemplate002 = new ListItemTemplate({
               'layout' : 'DetailItemList',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_listItemTemplate_ItemList',
               'id' : 'aw95cd7028',
            });

            var listtext013 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'detailDescriptionItem',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row0',
               'id' : 'aw6ac7c7d6',
            });
            listItemTemplate002.addChild( listtext013 );


            var listtext014 = new ListText({
               'cssClass' : 'detailItemTitle',
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row1_col0',
               'id' : 'awd469e3fb',
               'value' : MessageService.createStaticMessage('Item'),
            });
            listItemTemplate002.addChild( listtext014 );


            var listtext015 = new ListText({
               'cssClass' : 'detailItemTitle',
               'layoutInsertAt' : 'item3',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row1_col1',
               'id' : 'awa36ed36d',
               'value' : MessageService.createStaticMessage('Part No:'),
            });
            listItemTemplate002.addChild( listtext015 );


            var listtext016 = new ListText({
               'resourceAttribute' : 'itemnum',
               'cssClass' : 'detailItem',
               'layoutInsertAt' : 'item4',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row2_col0',
               'id' : 'aw52fd9155',
            });
            listItemTemplate002.addChild( listtext016 );


            var listtext017 = new ListText({
               'resourceAttribute' : 'modelnum',
               'cssClass' : 'detailItem',
               'layoutInsertAt' : 'item5',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row2_col1',
               'id' : 'aw25faa1c3',
            });
            listItemTemplate002.addChild( listtext017 );


            var listtext018 = new ListText({
               'cssClass' : 'detailItemTitle',
               'layoutInsertAt' : 'item6',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row3_col0',
               'id' : 'aw99a142f0',
               'value' : MessageService.createStaticMessage('Quantity:'),
            });
            listItemTemplate002.addChild( listtext018 );


            var listtext019 = new ListText({
               'cssClass' : 'detailItemTitle',
               'layoutInsertAt' : 'item7',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row3_col1',
               'id' : 'aweea67266',
               'value' : MessageService.createStaticMessage('Bin Num:'),
            });
            listItemTemplate002.addChild( listtext019 );


            var listtext020 = new ListText({
               'resourceAttribute' : 'curbal',
               'cssClass' : 'detailItem',
               'layoutInsertAt' : 'item8',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row4_col0',
               'id' : 'aw84a47248',
            });
            listItemTemplate002.addChild( listtext020 );


            var listtext021 = new ListText({
               'resourceAttribute' : 'binnum',
               'cssClass' : 'detailItem',
               'layoutInsertAt' : 'item9',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row4_col1',
               'id' : 'awf3a342de',
            });
            listItemTemplate002.addChild( listtext021 );


            var listtext022 = new ListText({
               'cssClass' : 'detailItemTitle',
               'layoutInsertAt' : 'item10',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row5_col0',
               'id' : 'aw4ff8a1ed',
               'value' : MessageService.createStaticMessage('Unit:'),
            });
            listItemTemplate002.addChild( listtext022 );


            var listtext023 = new ListText({
               'cssClass' : 'detailItemTitle',
               'layoutInsertAt' : 'item11',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row_col1',
               'id' : 'aw76ab60ae',
               'value' : MessageService.createStaticMessage('Last Count Date:'),
            });
            listItemTemplate002.addChild( listtext023 );


            var listtext024 = new ListText({
               'resourceAttribute' : 'unit',
               'cssClass' : 'detailItem',
               'layoutInsertAt' : 'item12',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row6_col0',
               'id' : 'awc96cd343',
            });
            listItemTemplate002.addChild( listtext024 );


            var listtext025 = new ListText({
               'resourceAttribute' : 'lastcountdate',
               'cssClass' : 'detailItem',
               'layoutInsertAt' : 'item13',
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_ItemList_row6_col1',
               'id' : 'awbe6be3d5',
            });
            listItemTemplate002.addChild( listtext025 );


            var eventHandlers015 = [
               {
                     'method' : 'populateItemDetail',
                     'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_list_eventHandlers_render_populateItemDetail',
                     'id' : 'awb20c0dd',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];

            var list002 = new List({
               'resource' : 'itemDetailResource',
               'showHeader' : false,
               'listItemTemplate' : listItemTemplate002,
               'artifactId' : 'Inventory.ItemDetailView_itemDetailResource_list',
               'eventHandlers' : eventHandlers015,
               'id' : 'aw85ecaeec',
            });
            view003.addChild( list002 );


            var container009 = new Container({
               'resource' : 'invbalance',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_container_0',
               'id' : 'awba4bbe78',
            });
            view003.addChild( container009 );


            var group001 = new Group({
               'artifactId' : 'Inventory.ItemDetailView_group_0',
               'id' : 'aw7e912056',
            });
            container009.addChild( group001 );


            var groupitem001 = new GroupItem({
               'layout' : 'ItemList',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_groupitem_0',
               'id' : 'awff902f6b',
            });
            group001.addChild( groupitem001 );


            var text012 = new Text({
               'editable' : false,
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_groupitem_0_CurrentBalance',
               'id' : 'awa9e0e343',
               'label' : MessageService.createStaticMessage('Current Balance:'),
            });
            groupitem001.addChild( text012 );


            var text013 = new Text({
               'resourceAttribute' : 'curbal',
               'editable' : false,
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_groupitem_0_curbal',
               'id' : 'aw356cdaba',
            });
            groupitem001.addChild( text013 );

            var eventHandlers016 = [
               {
                     'method' : 'showCurrentBalance',
                     'artifactId' : 'Inventory.ItemDetailView_container_0_eventHandlers_render_showCurrentBalance',
                     'id' : 'awb273c88a',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            container009.eventHandlers = eventHandlers016;

            var container010 = new Container({
               'resource' : 'invbalance',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_container_1',
               'id' : 'awcd4c8eee',
            });
            view003.addChild( container010 );


            var errorIndicator001 = new ErrorIndicator({
               'artifactId' : 'Inventory.ItemDetailView_errorIndicator',
               'id' : 'aw1bdc6d63',
            });
            container010.addChild( errorIndicator001 );


            var container011 = new Container({
               'cssClass' : 'blankContainer',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_container_blank',
               'id' : 'aw231ec3d7',
            });
            view003.addChild( container011 );


            var container012 = new Container({
               'cssClass' : 'inputCountContainer',
               'resource' : 'invbalance',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_container_2',
               'id' : 'aw5445df54',
            });
            view003.addChild( container012 );


            var text014 = new Text({
               'cssClass' : 'inputCountLabel',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_groupitem_3_label_PhysicalCount',
               'id' : 'awed906e0c',
               'value' : MessageService.createStaticMessage('New Physical Count'),
            });
            container012.addChild( text014 );


            var text015 = new Text({
               'resourceAttribute' : 'count',
               'cssClass' : 'inputCountText',
               'editable' : true,
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_groupitem_3_count_PhysicalCount',
               'id' : 'aw51d17708',
               'placeHolder' : MessageService.createStaticMessage('e.g. 2 (must be non-negative)'),
            });
            container012.addChild( text015 );


            var container013 = new Container({
               'cssClass' : 'detailButtonContainer',
               'artifactId' : 'Inventory.ItemDetailView_invbalance_container_3',
               'id' : 'aw2342efc2',
            });
            view003.addChild( container013 );


            var button005 = new Button({
               'cssClass' : 'mblUpdateButton',
               'artifactId' : 'Inventory.ItemDetailView_Update_button',
               'id' : 'awc8e6e9d0',
               'label' : MessageService.createStaticMessage('Update Physical Count'),
            });
            var eventHandlers017 = [
               {
                     'method' : 'processCount',
                     'artifactId' : 'Inventory.ItemDetailView_Update_button_eventHandlers_click_processCount',
                     'id' : 'aw28c603ee',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button005.eventHandlers = eventHandlers017;
            container013.addChild( button005 );

            var eventHandlers018 = [
               {
                     'method' : 'handleBackButton',
                     'artifactId' : 'Inventory.ItemDetailView_eventHandlers_back_handleBackButton',
                     'id' : 'aw189b1bd1',
                     'event' : 'back',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            view003.eventHandlers = eventHandlers018;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Inventory.ItemRecountView', false);
               trackTimer.startTracking();
            }

            var view004 = new View({
               'id' : 'Inventory.ItemRecountView',
               'label' : MessageService.createStaticMessage('Recount \/ Ad Hoc Count'),
            });
            ui001.addChild( view004 );

            var requiredResources004 = {
               'searchItems' : {
                  'artifactId' : 'Inventory.ItemRecountView_searchItems',
                  'id' : 'awd68a9be',
               },
               'itemsResource' : {
                  'artifactId' : 'Inventory.ItemRecountView_itemsResource',
                  'id' : 'aweb0e81a4',
               },
               'locTestDomain' : {
                  'artifactId' : 'Inventory.ItemRecountView_locTestDomain',
                  'id' : 'aw23d8b2f3',
               },
               'getDistinctBin' : {
                  'artifactId' : 'Inventory.ItemRecountView_getDistinctBin',
                  'id' : 'aw232a08c8',
               },
            };
            view004.addRequiredResources( requiredResources004 );

            var container014 = new Container({
               'resource' : 'searchItems',
               'artifactId' : 'Inventory.ItemRecountView_searchItems_container_0',
               'id' : 'aw2084deb9',
            });
            view004.addChild( container014 );


            var group002 = new Group({
               'artifactId' : 'Inventory.ItemRecountView_group_0',
               'id' : 'awba003c60',
            });
            container014.addChild( group002 );


            var groupitem002 = new GroupItem({
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_0',
               'id' : 'aw655f4faa',
            });
            group002.addChild( groupitem002 );


            var text016 = new Text({
               'resourceAttribute' : 'itemnum',
               'lookup' : 'Inventory.ItemsLookup',
               'editable' : true,
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_0_itemnum_Item',
               'id' : 'aw1c2de0dd',
               'label' : MessageService.createStaticMessage('Item'),
               'codeScannable' : true,
               'lookupAttribute' : 'itemnum',
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem002.addChild( text016 );

            var eventHandlers019 = [
               {
                     'method' : 'setFieldsReadonly',
                     'artifactId' : 'Inventory.ItemRecountView_searchItems_eventHandlers_click_setSearchQuery',
                     'id' : 'awa86e03a1',
                     'event' : 'datachange',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            text016.eventHandlers = eventHandlers019;

            var groupitem003 = new GroupItem({
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_1',
               'id' : 'aw12587f3c',
            });
            group002.addChild( groupitem003 );


            var text017 = new Text({
               'resourceAttribute' : 'description',
               'cssClass' : 'recountlDescription',
               'editable' : true,
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_1_description_Description',
               'id' : 'aw535686f8',
               'label' : MessageService.createStaticMessage('Description'),
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem003.addChild( text017 );


            var groupitem004 = new GroupItem({
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_2',
               'id' : 'aw8b512e86',
            });
            group002.addChild( groupitem004 );


            var text018 = new Text({
               'resourceAttribute' : 'binnum',
               'lookup' : 'Inventory.BinLookup',
               'editable' : true,
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_2_binnum_Bin',
               'id' : 'awda4b0bee',
               'label' : MessageService.createStaticMessage('Bin'),
               'codeScannable' : true,
               'lookupAttribute' : 'binnum',
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem004.addChild( text018 );

            var eventHandlers020 = [
               {
                     'method' : 'handleConditionBinnum',
                     'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_1_binnum_Bin_eventHandlers_render_handleConditionBinnum',
                     'id' : 'aw2439c190',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            groupitem004.eventHandlers = eventHandlers020;

            var groupitem005 = new GroupItem({
               'layout' : 'ItemBinRange',
               'cssClass' : 'binRangeContainer',
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_4',
               'id' : 'aw62328bb3',
            });
            group002.addChild( groupitem005 );


            var text019 = new Text({
               'resourceAttribute' : 'binfrom',
               'lookup' : 'Inventory.BinLookup',
               'cssClass' : 'binRange',
               'editable' : true,
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_2_binfrom_BinFrom',
               'id' : 'aw83b57c58',
               'label' : MessageService.createStaticMessage('Bin from'),
               'codeScannable' : true,
               'lookupAttribute' : 'binnum',
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem005.addChild( text019 );


            var text020 = new Text({
               'resourceAttribute' : 'binto',
               'lookup' : 'Inventory.BinLookup',
               'cssClass' : 'binRange',
               'editable' : true,
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_2_binto_BinTo',
               'id' : 'awe0a5ec05',
               'label' : MessageService.createStaticMessage('Bin to'),
               'codeScannable' : true,
               'lookupAttribute' : 'binnum',
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem005.addChild( text020 );

            var eventHandlers021 = [
               {
                     'method' : 'handleConditionBinRange',
                     'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_4_bin_BinRange_eventHandlers_render_handleConditionBinRange',
                     'id' : 'aw880f3468',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            groupitem005.eventHandlers = eventHandlers021;

            var groupitem006 = new GroupItem({
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_3',
               'id' : 'awfc561e10',
            });
            group002.addChild( groupitem006 );


            var text021 = new Text({
               'resourceAttribute' : 'lotnum',
               'editable' : true,
               'artifactId' : 'Inventory.ItemRecountView_searchItems_groupitem_3_lotnum_Lot',
               'id' : 'aw60e050ad',
               'label' : MessageService.createStaticMessage('Lot'),
               'codeScannable' : true,
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem006.addChild( text021 );


            var footer001 = new Footer({
               'artifactId' : 'Inventory.ItemRecountView_footer',
               'id' : 'awffe44522',
            });
            view004.addChild( footer001 );


            var button006 = new Button({
               'artifactId' : 'Inventory.ItemRecountView_Clear_button',
               'id' : 'aw37e500cb',
               'label' : MessageService.createStaticMessage('Clear'),
            });
            var eventHandlers022 = [
               {
                     'method' : 'clearAdhocFields',
                     'artifactId' : 'Inventory.ItemRecountView_Clear_button_eventHandlers_click_clearAdhocFields',
                     'id' : 'aw9f573dda',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button006.eventHandlers = eventHandlers022;
            footer001.addChild( button006 );


            var button007 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Inventory.ItemRecountView_Search_button',
               'id' : 'awf6bb264f',
               'label' : MessageService.createStaticMessage('Search'),
               'primary' : 'true',
            });
            var eventHandlers023 = [
               {
                     'method' : 'setSearchQuery',
                     'artifactId' : 'Inventory.ItemRecountView_Search_button_eventHandlers_click_setSearchQuery',
                     'id' : 'awebbe56c',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button007.eventHandlers = eventHandlers023;
            footer001.addChild( button007 );

            var eventHandlers024 = [
               {
                     'method' : 'initSearchData',
                     'artifactId' : 'Inventory.ItemRecountView_eventHandlers_initialize_initSearchData',
                     'id' : 'aw80441876',
                     'event' : 'initialize',
                     'class' : 'application.handlers.InventoryHandler',
               },
               {
                     'method' : 'discardSummaryView',
                     'artifactId' : 'Inventory.ItemRecountView_eventHandlers_cleanup_discardSummaryView',
                     'id' : 'aw9a32d704',
                     'event' : 'cleanup',
                     'class' : 'application.handlers.InventoryHandler',
               },
               {
                     'method' : 'adhocInit',
                     'artifactId' : 'Inventory.ItemRecountView_eventHandlers_initialize_adhocInit',
                     'id' : 'awff5ad897',
                     'event' : 'initialize',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            view004.eventHandlers = eventHandlers024;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'WorkExecution.WOMeterList', false);
               trackTimer.startTracking();
            }

            var view005 = new View({
               'id' : 'WorkExecution.WOMeterList',
               'label' : MessageService.createStaticMessage('Recount List'),
            });
            ui001.addChild( view005 );



            var listItemTemplate003 = new ListItemTemplate({
               'layout' : 'ItemList',
               'artifactId' : 'WorkExecution.WOMeterList_temp_listItemTemplate_ItemList',
               'id' : 'aw55fea464',
            });

            var listtext026 = new ListText({
               'resourceAttribute' : 'itemnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'WorkExecution.WOMeterList_temp_ItemList_itemnum',
               'id' : 'aw100cb385',
            });
            listItemTemplate003.addChild( listtext026 );


            var listtext027 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item2',
               'artifactId' : 'WorkExecution.WOMeterList_temp_ItemList_itemnumdesc',
               'id' : 'awa728f57c',
            });
            listItemTemplate003.addChild( listtext027 );


            var listtext028 = new ListText({
               'resourceAttribute' : 'location',
               'layoutInsertAt' : 'item3',
               'artifactId' : 'WorkExecution.WOMeterList_temp_ItemList_location',
               'id' : 'awc3f49fef',
            });
            listItemTemplate003.addChild( listtext028 );


            var listtext029 = new ListText({
               'resourceAttribute' : 'binnum',
               'layoutInsertAt' : 'item4',
               'artifactId' : 'WorkExecution.WOMeterList_temp_ItemList_binnum',
               'id' : 'aw440966b5',
            });
            listItemTemplate003.addChild( listtext029 );


            var listtext030 = new ListText({
               'resourceAttribute' : 'lotnum',
               'layoutInsertAt' : 'item5',
               'artifactId' : 'WorkExecution.WOMeterList_temp_ItemList_lotnum',
               'id' : 'awcee7459e',
            });
            listItemTemplate003.addChild( listtext030 );



            var list003 = new List({
               'recordLabel' : MessageService.createStaticMessage('Item'),
               'resource' : 'temp',
               'transitionTo' : 'Inventory.ItemDetailView',
               'showHeader' : false,
               'listItemTemplate' : listItemTemplate003,
               'artifactId' : 'WorkExecution.WOMeterList_temp_list',
               'id' : 'aw66798111',
               'displayPageSize' : '20',
            });
            view005.addChild( list003 );

            var eventHandlers025 = [
               {
                     'method' : 'showBusyList',
                     'artifactId' : 'WorkExecution.WOMeterList_eventHandlers_render_showBusyList',
                     'id' : 'awf5e08803',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            view005.eventHandlers = eventHandlers025;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Inventory.ItemDetailTempView', false);
               trackTimer.startTracking();
            }

            var view006 = new View({
               'resource' : 'temp',
               'id' : 'Inventory.ItemDetailTempView',
               'label' : MessageService.createStaticMessage('Item Details'),
            });
            ui001.addChild( view006 );


            var container015 = new Container({
               'resource' : 'temp',
               'artifactId' : 'Inventory.ItemDetailTempView_temp_container_0',
               'id' : 'awf5b29bfa',
            });
            view006.addChild( container015 );


            var errorIndicator002 = new ErrorIndicator({
               'artifactId' : 'Inventory.ItemDetailTempView_errorIndicator',
               'id' : 'awd8335db3',
            });
            container015.addChild( errorIndicator002 );


            var group003 = new Group({
               'artifactId' : 'Inventory.ItemDetailTempView_group_0',
               'id' : 'aw61160a81',
            });
            container015.addChild( group003 );


            var groupitem007 = new GroupItem({
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_0',
               'id' : 'awb0690ae9',
            });
            group003.addChild( groupitem007 );


            var text022 = new Text({
               'resourceAttribute' : 'itemnum',
               'editable' : false,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_0_itemnum_Item',
               'id' : 'awcd4d180a',
               'label' : MessageService.createStaticMessage('Item'),
            });
            groupitem007.addChild( text022 );


            var text023 = new Text({
               'resourceAttribute' : 'description',
               'editable' : false,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_0_itemnumdesc_Description',
               'id' : 'awa819c47d',
               'label' : MessageService.createStaticMessage('Description'),
            });
            groupitem007.addChild( text023 );


            var groupitem008 = new GroupItem({
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_1',
               'id' : 'awc76e3a7f',
            });
            group003.addChild( groupitem008 );


            var text024 = new Text({
               'resourceAttribute' : 'location',
               'editable' : false,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_1_location_Storeroom',
               'id' : 'awb548db0f',
               'label' : MessageService.createStaticMessage('Storeroom'),
            });
            groupitem008.addChild( text024 );


            var text025 = new Text({
               'resourceAttribute' : 'binnum',
               'editable' : false,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_1_binnum_Bin',
               'id' : 'aw893aab34',
               'label' : MessageService.createStaticMessage('Bin'),
            });
            groupitem008.addChild( text025 );


            var text026 = new Text({
               'resourceAttribute' : 'lotnum',
               'editable' : false,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_1_lotnum_Lot',
               'id' : 'awa834bc18',
               'label' : MessageService.createStaticMessage('Lot'),
            });
            groupitem008.addChild( text026 );


            var text027 = new Text({
               'resourceAttribute' : 'physcnt',
               'editable' : false,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_1_physcnt_PhysicalCount',
               'id' : 'aw8ca97d3a',
               'label' : MessageService.createStaticMessage('Physical Count'),
            });
            groupitem008.addChild( text027 );


            var groupitem009 = new GroupItem({
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_2',
               'id' : 'aw5e676bc5',
            });
            group003.addChild( groupitem009 );


            var text028 = new Text({
               'resourceAttribute' : 'adjustedphyscnt',
               'editable' : true,
               'artifactId' : 'Inventory.ItemDetailTempView_temp_groupitem_2_adjustedphyscnt_PhysicalCount',
               'id' : 'awf4e9d4d1',
               'label' : MessageService.createStaticMessage('Physical Count'),
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem009.addChild( text028 );

            var eventHandlers026 = [
               {
                     'method' : 'renderDetail',
                     'artifactId' : 'Inventory.ItemDetailTempView_container_0_eventHandlers_render_renderDetail',
                     'id' : 'awa45c9b32',
                     'event' : 'render',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            container015.eventHandlers = eventHandlers026;

            var footer002 = new Footer({
               'artifactId' : 'Inventory.ItemDetailTempView_footer',
               'id' : 'aw521b7208',
            });
            view006.addChild( footer002 );


            var button008 = new Button({
               'artifactId' : 'Inventory.ItemDetailTempView_Cancel_button',
               'id' : 'aweaa98519',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers027 = [
               {
                     'method' : 'cancelCount',
                     'artifactId' : 'Inventory.ItemDetailTempView_Cancel_button_eventHandlers_click_cancelCount',
                     'id' : 'aw97a9530e',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button008.eventHandlers = eventHandlers027;
            footer002.addChild( button008 );


            var button009 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Inventory.ItemDetailTempView_Done_button',
               'id' : 'aw173def24',
               'label' : MessageService.createStaticMessage('Done'),
               'primary' : 'true',
            });
            var eventHandlers028 = [
               {
                     'method' : 'processCount',
                     'artifactId' : 'Inventory.ItemDetailTempView_Done_button_eventHandlers_click_processCount',
                     'id' : 'awedf77f58',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button009.eventHandlers = eventHandlers028;
            footer002.addChild( button009 );

            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            var lookup001 = new Lookup({
               'resource' : 'locTestDomain',
               'id' : 'Inventory.LocTestLookup',
               'label' : MessageService.createStaticMessage('Select LocTest'),
            });
            ui001.addChild( lookup001 );

            var requiredResources005 = {
               'locTestDomain' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.LocTestLookup_requireResource',
                  'id' : 'aw88f6c100',
               },
            };
            lookup001.addRequiredResources( requiredResources005 );


            var listItemTemplate004 = new ListItemTemplate({
               'layout' : 'ItemLookup',
               'artifactId' : 'Inventory.LocTestLookup_listItemTemplate',
               'id' : 'aw792ced64',
            });

            var listtext031 = new ListText({
               'resourceAttribute' : 'value',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.LocTestLookup_listItemTemplate_value',
               'id' : 'aw65aab9d3',
            });
            listItemTemplate004.addChild( listtext031 );


            var listtext032 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.LocTestLookup_listItemTemplate_desc',
               'id' : 'awd19de91c',
            });
            listItemTemplate004.addChild( listtext032 );



            var list004 = new List({
               'resource' : 'locTestDomain',
               'listItemTemplate' : listItemTemplate004,
               'artifactId' : 'Inventory.LocTestLookup_list',
               'id' : 'awd6e764cf',
            });
            lookup001.addChild( list004 );


            var lookup002 = new Lookup({
               'filterMethod' : 'filterItemsForLookup',
               'resource' : 'itemsResource',
               'filterClass' : 'application.handlers.InventoryHandler',
               'id' : 'Inventory.ItemsLookup',
               'label' : MessageService.createStaticMessage('Select Item'),
            });
            ui001.addChild( lookup002 );

            var requiredResources006 = {
               'searchItems' : {
                  'artifactId' : 'Inventory.ItemsLookup_searchItems',
                  'id' : 'awef379fc0',
               },
               'itemsResource' : {
                  'artifactId' : 'Inventory.ItemsLookup_itemsResource',
                  'id' : 'aw9508a21a',
               },
               'additionalInvbalance' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.ItemsLookup_additionalInvbalance',
                  'id' : 'awf2f7283f',
               },
               'additionalitem' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.ItemsLookup_additionalitem',
                  'id' : 'awa02ed1e9',
               },
            };
            lookup002.addRequiredResources( requiredResources006 );


            var searchAttributes001 = new SearchAttributes({
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_searchAttributes',
               'id' : 'aw6674dd0b',
            });

            var searchAttribute001 = new SearchAttribute({
               'name' : 'itemnum',
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_searchAttribute_itemnum',
               'id' : 'awb80cfac2',
            });
            searchAttributes001.addChild( searchAttribute001 );



            var listItemTemplate005 = new ListItemTemplate({
               'layout' : 'ItemList',
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_listItemTemplate_ItemList',
               'id' : 'aw79d923d5',
            });

            var listtext033 = new ListText({
               'resourceAttribute' : 'itemnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_ItemList_itemnum',
               'id' : 'aw2bcc5e5e',
            });
            listItemTemplate005.addChild( listtext033 );


            var listtext034 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_ItemList_description',
               'id' : 'awc9c1d017',
            });
            listItemTemplate005.addChild( listtext034 );


            var listtext035 = new ListText({
               'resourceAttribute' : 'binnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item3',
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_ItemList_binnum',
               'id' : 'aweac47595',
            });
            listItemTemplate005.addChild( listtext035 );


            var listtext036 = new ListText({
               'resourceAttribute' : 'lotnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item4',
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_ItemList_lotnum',
               'id' : 'aw602a56be',
            });
            listItemTemplate005.addChild( listtext036 );



            var list005 = new List({
               'resource' : 'itemsResource',
               'listItemTemplate' : listItemTemplate005,
               'artifactId' : 'Inventory.ItemsLookup_itemsResource_list',
               'id' : 'awd6faf949',
               'searchAttributes' : searchAttributes001,
               'displayPageSize' : '40',
            });
            lookup002.addChild( list005 );


            var returnAttributes001 = new ReturnAttributes({
               'artifactId' : 'Inventory.ItemsLookup_returnAttributes',
               'id' : 'awd1a4ebea',
            });
            lookup002.addChild( returnAttributes001 );


            var returnAttribute001 = new ReturnAttribute({
               'targetAttribute' : 'itemnum',
               'artifactId' : 'Inventory.ItemsLookup_itemnum_itemnum',
               'id' : 'awe3435e05',
               'sourceAttribute' : 'itemnum',
            });
            returnAttributes001.addChild( returnAttribute001 );


            var returnAttribute002 = new ReturnAttribute({
               'targetAttribute' : 'location',
               'artifactId' : 'Inventory.ItemsLookup_location_location',
               'id' : 'awb1b23b9b',
               'sourceAttribute' : 'location',
            });
            returnAttributes001.addChild( returnAttribute002 );


            var returnAttribute003 = new ReturnAttribute({
               'targetAttribute' : 'binnum',
               'artifactId' : 'Inventory.ItemsLookup_binnum_binnum',
               'id' : 'awcc299c5a',
               'sourceAttribute' : 'binnum',
            });
            returnAttributes001.addChild( returnAttribute003 );


            var returnAttribute004 = new ReturnAttribute({
               'targetAttribute' : 'lotnum',
               'artifactId' : 'Inventory.ItemsLookup_lotnum_lotnum',
               'id' : 'aw1f458a6e',
               'sourceAttribute' : 'lotnum',
            });
            returnAttributes001.addChild( returnAttribute004 );


            var lookup003 = new Lookup({
               'filterMethod' : 'filterBinLookup',
               'resource' : 'getDistinctBin',
               'filterClass' : 'application.handlers.InventoryHandler',
               'id' : 'Inventory.BinLookup',
               'label' : MessageService.createStaticMessage('Select Bin'),
            });
            ui001.addChild( lookup003 );

            var requiredResources007 = {
               'getDistinctBin' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.BinLookup_invbalance',
                  'id' : 'aw1bce60c4',
               },
            };
            lookup003.addRequiredResources( requiredResources007 );


            var searchAttributes002 = new SearchAttributes({
               'artifactId' : 'Inventory.BinLookup_invbalance_searchAttributes',
               'id' : 'awcc86c9c7',
            });

            var searchAttribute002 = new SearchAttribute({
               'name' : 'binnum',
               'artifactId' : 'Inventory.BinLookup_invbalance_searchAttribute_binnum',
               'id' : 'aw28559d0f',
            });
            searchAttributes002.addChild( searchAttribute002 );



            var listItemTemplate006 = new ListItemTemplate({
               'layout' : 'ItemLookup',
               'artifactId' : 'Inventory.BinLookup_invbalance_listItemTemplate_ItemLookup',
               'id' : 'aw9932a136',
            });

            var listtext037 = new ListText({
               'resourceAttribute' : 'binnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.BinLookup_invbalance_ItemLookup_binnum',
               'id' : 'awa1891a28',
            });
            listItemTemplate006.addChild( listtext037 );



            var list006 = new List({
               'resource' : 'getDistinctBin',
               'listItemTemplate' : listItemTemplate006,
               'artifactId' : 'Inventory.BinLookup_invbalance_list',
               'id' : 'awc5941cb',
               'searchAttributes' : searchAttributes002,
            });
            lookup003.addChild( list006 );


            var lookup004 = new Lookup({
               'filterMethod' : 'filterBinLookupTo',
               'resource' : 'invbalance',
               'filterClass' : 'application.handlers.InventoryHandler',
               'id' : 'Inventory.BinLookupTo',
               'label' : MessageService.createStaticMessage('Select Bin To'),
            });
            ui001.addChild( lookup004 );

            var requiredResources008 = {
               'invbalance' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.BinLookupTo_invbalance',
                  'id' : 'awfba9471b',
               },
            };
            lookup004.addRequiredResources( requiredResources008 );


            var searchAttributes003 = new SearchAttributes({
               'artifactId' : 'Inventory.BinLookupTo_invbalance_searchAttributes',
               'id' : 'awc6c86449',
            });

            var searchAttribute003 = new SearchAttribute({
               'name' : 'binnum',
               'artifactId' : 'Inventory.BinLookupTo_invbalance_searchAttribute_binnum',
               'id' : 'awf2041958',
            });
            searchAttributes003.addChild( searchAttribute003 );



            var listItemTemplate007 = new ListItemTemplate({
               'layout' : 'ItemLookup',
               'artifactId' : 'Inventory.BinLookupTo_invbalance_listItemTemplate_ItemLookup',
               'id' : 'aw6793fa93',
            });

            var listtext038 = new ListText({
               'resourceAttribute' : 'binnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.BinLookupTo_invbalance_ItemLookup_binnum',
               'id' : 'awab83faa2',
            });
            listItemTemplate007.addChild( listtext038 );



            var list007 = new List({
               'resource' : 'invbalance',
               'listItemTemplate' : listItemTemplate007,
               'artifactId' : 'Inventory.BinLookupTo_invbalance_list',
               'id' : 'aw29ff108d',
               'searchAttributes' : searchAttributes003,
            });
            lookup004.addChild( list007 );


            var lookup005 = new Lookup({
               'filterMethod' : 'filterStoreroomForLookup',
               'resource' : 'additionalstoreroom',
               'filterClass' : 'application.handlers.InventoryHandler',
               'id' : 'Inventory.StoreroomLookup',
               'label' : MessageService.createStaticMessage('Select Storeroom'),
            });
            ui001.addChild( lookup005 );

            var requiredResources009 = {
               'additionalstoreroom' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom',
                  'id' : 'aw92f0696c',
               },
               'additionalInventory' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.StoreroomLookup_additionalInventory',
                  'id' : 'aw9f0c3351',
               },
            };
            lookup005.addRequiredResources( requiredResources009 );


            var searchAttributes004 = new SearchAttributes({
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_searchAttributes',
               'id' : 'aw6f33d893',
            });

            var searchAttribute004 = new SearchAttribute({
               'name' : 'locationForSearch',
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_searchAttribute_locationForSearch',
               'id' : 'aw9b6a8705',
            });
            searchAttributes004.addChild( searchAttribute004 );


            var searchAttribute005 = new SearchAttribute({
               'name' : 'description',
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_searchAttribute_description',
               'id' : 'aw629bc0b7',
            });
            searchAttributes004.addChild( searchAttribute005 );



            var listItemTemplate008 = new ListItemTemplate({
               'layout' : 'ItemLookup',
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_listItemTemplate_ItemLookup',
               'id' : 'awbf0880fb',
            });

            var listtext039 = new ListText({
               'resourceAttribute' : 'location',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_ItemLookup_location',
               'id' : 'awddcf51f3',
            });
            listItemTemplate008.addChild( listtext039 );


            var listtext040 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'desc1',
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_ItemLookup_description',
               'id' : 'aw1211daf8',
            });
            listItemTemplate008.addChild( listtext040 );



            var list008 = new List({
               'resource' : 'additionalstoreroom',
               'listItemTemplate' : listItemTemplate008,
               'artifactId' : 'Inventory.StoreroomLookup_additionalstoreroom_list',
               'id' : 'awf5b2318e',
               'searchAttributes' : searchAttributes004,
            });
            lookup005.addChild( list008 );


            var returnAttributes002 = new ReturnAttributes({
               'artifactId' : 'Inventory.StoreroomLookup_returnAttributes',
               'id' : 'awfa695426',
            });
            lookup005.addChild( returnAttributes002 );


            var returnAttribute005 = new ReturnAttribute({
               'targetAttribute' : 'location',
               'artifactId' : 'Inventory.StoreroomLookup_location_location',
               'id' : 'aw234b78bf',
               'sourceAttribute' : 'location',
            });
            returnAttributes002.addChild( returnAttribute005 );


            var returnAttribute006 = new ReturnAttribute({
               'targetAttribute' : 'siteid',
               'artifactId' : 'Inventory.StoreroomLookup_siteid_siteid',
               'id' : 'awc5c789cd',
               'sourceAttribute' : 'siteid',
            });
            returnAttributes002.addChild( returnAttribute006 );


            var lookup006 = new Lookup({
               'resource' : 'invlot',
               'id' : 'Inventory.LotLookup',
               'label' : MessageService.createStaticMessage('Select Lot'),
            });
            ui001.addChild( lookup006 );

            var requiredResources010 = {
               'invlot' : {
                  'reload' : true,
                  'artifactId' : 'Inventory.LotLookup_invlot',
                  'id' : 'aw27b0126a',
               },
            };
            lookup006.addRequiredResources( requiredResources010 );


            var searchAttributes005 = new SearchAttributes({
               'artifactId' : 'Inventory.LotLookup_invlot_searchAttributes',
               'id' : 'aw2b474979',
            });

            var searchAttribute006 = new SearchAttribute({
               'name' : 'lotnum',
               'artifactId' : 'Inventory.LotLookup_invlot_searchAttribute_lotnum',
               'id' : 'aw51c133f5',
            });
            searchAttributes005.addChild( searchAttribute006 );



            var listItemTemplate009 = new ListItemTemplate({
               'layout' : 'ItemLookup',
               'artifactId' : 'Inventory.LotLookup_invlot_listItemTemplate_ItemLookup',
               'id' : 'aw5463c6c1',
            });

            var listtext041 = new ListText({
               'resourceAttribute' : 'lotnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Inventory.LotLookup_invlot_ItemLookup_lotnum',
               'id' : 'aw7596608',
            });
            listItemTemplate009.addChild( listtext041 );


            var listtext042 = new ListText({
               'resourceAttribute' : 'mfglotnum',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'desc1',
               'artifactId' : 'Inventory.LotLookup_invlot_ItemLookup_mfglotnum',
               'id' : 'awe7cb64a6',
            });
            listItemTemplate009.addChild( listtext042 );



            var list009 = new List({
               'resource' : 'invlot',
               'listItemTemplate' : listItemTemplate009,
               'artifactId' : 'Inventory.LotLookup_invlot_list',
               'id' : 'aw2fe4348e',
               'searchAttributes' : searchAttributes005,
            });
            lookup006.addChild( list009 );


            var dialog004 = new Dialog({
               'id' : 'Inventory.RequiredSearchFieldMissing',
            });
            ui001.addChild( dialog004 );


            var container016 = new Container({
               'artifactId' : 'Inventory.RequiredSearchFieldMissing_container_0',
               'id' : 'aw20f79bc9',
            });
            dialog004.addChild( container016 );


            var text029 = new Text({
               'editable' : false,
               'artifactId' : 'Inventory.RequiredSearchFieldMissing_container_0_Somerequiredfields',
               'id' : 'aw2345266f',
               'value' : MessageService.createStaticMessage('Some required fields are empty. Specify the missing information.'),
            });
            container016.addChild( text029 );


            var button010 = new Button({
               'artifactId' : 'Inventory.RequiredSearchFieldMissing_Ok_button',
               'id' : 'aw5ae1873c',
               'label' : MessageService.createStaticMessage('Ok'),
               'primary' : 'true',
            });
            var eventHandlers029 = [
               {
                     'method' : 'hideDialog',
                     'artifactId' : 'Inventory.RequiredSearchFieldMissing_Ok_button_eventHandlers_click_hideDialog',
                     'id' : 'aw6512d255',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button010.eventHandlers = eventHandlers029;
            container016.addChild( button010 );


            var dialog005 = new Dialog({
               'id' : 'Inventory.NotExistStoreRoomWarning',
            });
            ui001.addChild( dialog005 );


            var container017 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.LogOutPrompt_container_0',
               'id' : 'awcf20d41b',
            });
            dialog005.addChild( container017 );


            var text030 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LogOutPrompt_container_0_Doyouwanttologo',
               'id' : 'aw15a96005',
               'value' : MessageService.createStaticMessage('Not exist this storeRoom'),
            });
            container017.addChild( text030 );


            var container018 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Inventory.NotExistStoreRoomWarning_container_1',
               'id' : 'aw71cc0fd5',
            });
            dialog005.addChild( container018 );


            var button011 = new Button({
               'artifactId' : 'Inventory.NotExistStoreRoomWarning_Ok_button',
               'id' : 'aw1b79baf1',
               'label' : MessageService.createStaticMessage('Ok'),
               'primary' : 'true',
            });
            var eventHandlers030 = [
               {
                     'method' : 'clearChooseStoreRoom',
                     'artifactId' : 'Inventory.NotExistStoreRoomWarning_Ok_button_eventHandlers_click_hideDialog',
                     'id' : 'awfb602c75',
                     'event' : 'click',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            button011.eventHandlers = eventHandlers030;
            container018.addChild( button011 );


            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.AttachmentInfoView', false);
               trackTimer.startTracking();
            }

            var view007 = new View({
               'resource' : 'PlatformAttachmentInfoResource',
               'id' : 'Platform.AttachmentInfoView',
               'label' : MessageService.createStaticMessage('Attachment Details'),
            });
            ui001.addChild( view007 );

            var requiredResources011 = {
               'PlatformAttachmentInfoResource' : {
                  'reload' : true,
                  'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource',
                  'id' : 'awedbd920b',
               },
            };
            view007.addRequiredResources( requiredResources011 );

            var container019 = new Container({
               'resource' : 'PlatformAttachmentInfoResource',
               'artifactId' : 'Platform.AttachmentInfoView_container_0',
               'id' : 'aw22b80d5f',
            });
            view007.addChild( container019 );


            var group004 = new Group({
               'artifactId' : 'Platform.AttachmentInfoView_group_0',
               'id' : 'aw80e7b381',
            });
            container019.addChild( group004 );


            var groupitem010 = new GroupItem({
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_0',
               'id' : 'aw15768e0',
            });
            group004.addChild( groupitem010 );


            var text031 = new Text({
               'resourceAttribute' : 'name',
               'editable' : true,
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_0_name_Name',
               'id' : 'awddf675f4',
               'label' : MessageService.createStaticMessage('Name'),
               'required' : true,
            });
            groupitem010.addChild( text031 );


            var groupitem011 = new GroupItem({
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_1',
               'id' : 'aw76505876',
            });
            group004.addChild( groupitem011 );


            var text032 = new Text({
               'resourceAttribute' : 'description',
               'editable' : true,
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_1_description_Description',
               'id' : 'awc2735258',
               'label' : MessageService.createStaticMessage('Description'),
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem011.addChild( text032 );


            var groupitem012 = new GroupItem({
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_2',
               'id' : 'awef5909cc',
            });
            group004.addChild( groupitem012 );


            var text033 = new Text({
               'resourceAttribute' : 'category',
               'lookup' : 'PlatformAttachmentIn.CategoryLookup',
               'editable' : false,
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_2_category_Folder',
               'id' : 'aw3a5ae064',
               'label' : MessageService.createStaticMessage('Folder'),
               'lookupAttribute' : 'folderName',
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem012.addChild( text033 );

            var eventHandlers031 = [
               {
                     'method' : 'renderCategory',
                     'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_2_category_Folder_eventHandlers_render_renderCategory',
                     'id' : 'awa205ff23',
                     'event' : 'render',
                     'class' : 'platform.handlers.AttachmentHandler',
               }
            ];
            text033.eventHandlers = eventHandlers031;

            var groupitem013 = new GroupItem({
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_3',
               'id' : 'aw985e395a',
            });
            group004.addChild( groupitem013 );


            var text034 = new Text({
               'resourceAttribute' : 'fileType',
               'editable' : false,
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_3_fileType_FileType',
               'id' : 'awf0b55f9',
               'label' : MessageService.createStaticMessage('File Type'),
            });
            groupitem013.addChild( text034 );


            var groupitem014 = new GroupItem({
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_4',
               'id' : 'aw63aacf9',
            });
            group004.addChild( groupitem014 );


            var text035 = new Text({
               'resourceAttribute' : 'fileSize',
               'editable' : false,
               'artifactId' : 'Platform.AttachmentInfoView_PlatformAttachmentInfoResource_groupitem_4_fileSize_FileSizeKB',
               'id' : 'awa8aac05f',
               'label' : MessageService.createStaticMessage('File Size (KB)'),
            });
            groupitem014.addChild( text035 );


            var footer003 = new Footer({
               'artifactId' : 'Platform.AttachmentInfoView_footer',
               'id' : 'awad3a6a43',
            });
            view007.addChild( footer003 );


            var button012 = new Button({
               'artifactId' : 'Platform.AttachmentInfoView_Cancel_button',
               'id' : 'aw61842429',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers032 = [
               {
                     'method' : 'handleBackButtonAttachmentDetailsView',
                     'artifactId' : 'Platform.AttachmentInfoView_Cancel_button_eventHandlers_click_handleBackButtonAttachmentDetailsView',
                     'id' : 'aw2e660b65',
                     'event' : 'click',
                     'class' : 'platform.handlers.AttachmentHandler',
               }
            ];
            button012.eventHandlers = eventHandlers032;
            footer003.addChild( button012 );


            var button013 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.AttachmentInfoView_Save_button',
               'id' : 'aw8904293b',
               'label' : MessageService.createStaticMessage('Save'),
            });
            var eventHandlers033 = [
               {
                     'method' : 'commitAttachmentEntry',
                     'artifactId' : 'Platform.AttachmentInfoView_Save_button_eventHandlers_click_commitAttachmentEntry',
                     'id' : 'awbff90b7f',
                     'event' : 'click',
                     'class' : 'platform.handlers.AttachmentHandler',
               }
            ];
            button013.eventHandlers = eventHandlers033;
            footer003.addChild( button013 );

            var eventHandlers034 = [
               {
                     'method' : 'init',
                     'artifactId' : 'Platform.AttachmentInfoView_eventHandlers_initialize_init',
                     'id' : 'awbe3d1849',
                     'event' : 'initialize',
                     'class' : 'platform.handlers.AttachmentHandler',
               },
               {
                     'method' : 'cancelAttachmentDetailsView',
                     'artifactId' : 'Platform.AttachmentInfoView_eventHandlers_cleanup_handleBackButtonAttachmentDetailsView',
                     'id' : 'awb6598e9',
                     'event' : 'cleanup',
                     'class' : 'platform.handlers.AttachmentHandler',
               }
            ];
            view007.eventHandlers = eventHandlers034;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.AttachmentFileDialog', false);
               trackTimer.startTracking();
            }

            var view008 = new View({
               'id' : 'Platform.AttachmentFileDialog',
            });
            ui001.addChild( view008 );


            var footer004 = new Footer({
               'artifactId' : 'Platform.AttachmentFileDialog_footer',
               'id' : 'awb513dc05',
            });
            view008.addChild( footer004 );


            var button014 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.UnsavedSketch_doNotAllow_button',
               'id' : 'aw150d1bc',
               'label' : MessageService.createStaticMessage('Close'),
            });
            var eventHandlers035 = [
               {
                     'method' : 'closeFileDialog',
                     'artifactId' : 'Platform.AttachmentFileDialog_closeDialog',
                     'id' : 'awc0d2f7fd',
                     'event' : 'click',
                     'class' : 'platform.handlers.AttachmentHandler',
               }
            ];
            button014.eventHandlers = eventHandlers035;
            footer004.addChild( button014 );

            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            var lookup007 = new Lookup({
               'resource' : 'PlatformAttachmentCategoryResource',
               'id' : 'PlatformAttachmentIn.CategoryLookup',
               'label' : MessageService.createStaticMessage('Select Folder'),
            });
            ui001.addChild( lookup007 );

            var requiredResources012 = {
               'PlatformAttachmentCategoryResource' : {
                  'artifactId' : 'PlatformAttachmentIn.CategoryLookup_PlatformAttachmentCategoryResource',
                  'id' : 'aw18cc3542',
               },
            };
            lookup007.addRequiredResources( requiredResources012 );


            var searchAttributes006 = new SearchAttributes({
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_PlatformAttachmentCategoryResource_searchAttributes',
               'id' : 'awb7d9341f',
            });

            var searchAttribute007 = new SearchAttribute({
               'name' : 'folderName',
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_PlatformAttachmentCategoryResource_searchAttribute_folderName',
               'id' : 'aw9514e6e6',
            });
            searchAttributes006.addChild( searchAttribute007 );



            var listItemTemplate010 = new ListItemTemplate({
               'layout' : 'Item2Desc2',
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_PlatformAttachmentCategoryResource_listItemTemplate_Item2Desc2',
               'id' : 'aweb3659e3',
            });

            var listtext043 = new ListText({
               'resourceAttribute' : 'folderName',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_PlatformAttachmentCategoryResource_Item2Desc2_folderName',
               'id' : 'aw48fc196b',
            });
            listItemTemplate010.addChild( listtext043 );



            var list010 = new List({
               'resource' : 'PlatformAttachmentCategoryResource',
               'listItemTemplate' : listItemTemplate010,
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_PlatformAttachmentCategoryResource_list',
               'id' : 'awe6857cc4',
               'searchAttributes' : searchAttributes006,
            });
            lookup007.addChild( list010 );


            var returnAttributes003 = new ReturnAttributes({
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_returnAttributes',
               'id' : 'aw4860e6b5',
            });
            lookup007.addChild( returnAttributes003 );


            var returnAttribute007 = new ReturnAttribute({
               'targetAttribute' : 'category',
               'artifactId' : 'PlatformAttachmentIn.CategoryLookup_folderName_category',
               'id' : 'awb2f5d728',
               'sourceAttribute' : 'folderName',
            });
            returnAttributes003.addChild( returnAttribute007 );


            var actions003 = new Actions({
               'artifactId' : 'actions',
               'id' : 'aw548f1ef',
            });
            ui001.addChild( actions003 );


            var action005 = new Action({
               'overflow' : true,
               'artifactId' : 'ResetWorkList_action',
               'id' : 'aw956f5d3b',
               'label' : MessageService.createStaticMessage('Reset Work List'),
            });
            actions003.addChild( action005 );

            var eventHandlers036 = [
               {
                     'method' : 'resetWorkList',
                     'artifactId' : 'ResetWorkList_action_eventHandlers_click_findByScan',
                     'id' : 'aw11a2bd29',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               },
               {
                     'method' : 'enableResetWorkList',
                     'artifactId' : 'ResetWorkList_action_eventHandlers_render_enableResetWorkList',
                     'id' : 'awfb6356a8',
                     'event' : 'render',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            action005.eventHandlers = eventHandlers036;

            var action006 = new Action({
               'overflow' : true,
               'artifactId' : 'PseudoOffline_goOffline',
               'id' : 'aw90309912',
               'label' : MessageService.createStaticMessage('Enable Offline Mode'),
            });
            actions003.addChild( action006 );

            var eventHandlers037 = [
               {
                     'method' : 'toggleOfflineMode',
                     'artifactId' : 'PseudoOffline_enableoffline_action_eventHandlers_click',
                     'id' : 'aw33d3b70c',
                     'event' : 'click',
                     'class' : 'platform.handlers.PseudoOfflineModeHandler',
               }
            ];
            action006.eventHandlers = eventHandlers037;

            var action007 = new Action({
               'overflow' : true,
               'transitionTo' : 'Platform.Settings',
               'artifactId' : 'Settings_action',
               'id' : 'awc0b1927e',
               'label' : MessageService.createStaticMessage('Settings'),
            });
            actions003.addChild( action007 );


            var action008 = new Action({
               'overflow' : true,
               'transitionTo' : 'Platform.HelpAbout',
               'artifactId' : 'About_action',
               'id' : 'aw49fae06b',
               'label' : MessageService.createStaticMessage('About'),
            });
            actions003.addChild( action008 );


            var action009 = new Action({
               'overflow' : true,
               'transitionTo' : 'Platform.LogOutPrompt',
               'artifactId' : 'LogOut_action',
               'id' : 'awd566efa2',
               'label' : MessageService.createStaticMessage('Log Out'),
            });
            actions003.addChild( action009 );


            var action010 = new Action({
               'artifactId' : 'action',
               'id' : 'aw47cc8c92',
            });
            actions003.addChild( action010 );

            var eventHandlers038 = [
               {
                     'artifactId' : 'action_eventHandlers_click',
                     'id' : 'aw871940b2',
                     'event' : 'click',
                     'class' : 'platform.handlers.CreateQueryBaseHandler',
               }
            ];
            action010.eventHandlers = eventHandlers038;

            var erroractions001 = new ErrorActions({
               'artifactId' : 'erroractions',
               'id' : 'aw6a5d95e9',
            });
            ui001.addChild( erroractions001 );


            var action011 = new Action({
               'artifactId' : 'UndoChanges_action',
               'id' : 'aw2236d58a',
               'label' : MessageService.createStaticMessage('Undo Changes'),
            });
            erroractions001.addChild( action011 );

            var eventHandlers039 = [
               {
                     'method' : 'confirmClearChanges',
                     'artifactId' : 'UndoChanges_action_eventHandlers_click_confirmClearChanges',
                     'id' : 'awcf857f5c',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            action011.eventHandlers = eventHandlers039;

            var action012 = new Action({
               'artifactId' : 'ResendChanges_action',
               'id' : 'awccf9e70e',
               'label' : MessageService.createStaticMessage('Resend Changes'),
            });
            erroractions001.addChild( action012 );

            var eventHandlers040 = [
               {
                     'method' : 'retryRecordChanges',
                     'artifactId' : 'ResendChanges_action_eventHandlers_click_retryRecordChanges',
                     'id' : 'aw543ac47e',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            action012.eventHandlers = eventHandlers040;
            var eventHandlers041 = [
               {
                     'method' : 'none',
                     'artifactId' : 'eventHandlers_none_none',
                     'id' : 'aw1e2e7ded',
                     'event' : 'none',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            ui001.eventHandlers = eventHandlers041;

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.emptyview', false);
               trackTimer.startTracking();
            }

            var view009 = new View({
               'showHeader' : false,
               'id' : 'Platform.emptyview',
               'showFooter' : false,
            });
            ui001.addChild( view009 );

            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.Notifications', false);
               trackTimer.startTracking();
            }

            var view010 = new View({
               'id' : 'Platform.Notifications',
               'label' : MessageService.createStaticMessage('My Notifications'),
               'fullScreen' : 'true',
            });
            ui001.addChild( view010 );

            var requiredResources013 = {
               'osusernotification' : {
                  'reload' : true,
                  'artifactId' : 'Platform.Notifications_osusernotification',
                  'id' : 'awed6a5e70',
               },
               'PlatformTempPushNotification' : {
                  'reload' : true,
                  'artifactId' : 'Platform.Notifications_PlatformTempPushNotification',
                  'id' : 'aw9993c5cb',
               },
            };
            view010.addRequiredResources( requiredResources013 );


            var listItemTemplate011 = new ListItemTemplate({
               'layout' : 'NotificationList',
               'artifactId' : 'Platform.Notifications_listItemTemplate',
               'id' : 'aw718eb447',
            });

            var listtext044 = new ListText({
               'resourceAttribute' : 'uiDate',
               'layoutInsertAt' : 'date1',
               'artifactId' : 'Platform.Notifications_uiDate',
               'id' : 'aw56b07378',
            });
            listItemTemplate011.addChild( listtext044 );


            var listtext045 = new ListText({
               'resourceAttribute' : 'itemnum',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Platform.Notifications_itemnum',
               'id' : 'aw4dbbd111',
            });
            listItemTemplate011.addChild( listtext045 );


            var listtext046 = new ListText({
               'resourceAttribute' : 'itemDesc',
               'layoutInsertAt' : 'item2',
               'artifactId' : 'Platform.Notifications_itemDesc',
               'id' : 'aw6bac97b9',
            });
            listItemTemplate011.addChild( listtext046 );

            var eventHandlers042 = [
               {
                     'method' : 'openFromMsgHistory',
                     'artifactId' : 'Platform.Notifications_Open_button_eventHandlers_click_FromList',
                     'id' : 'awf03f57bd',
                     'event' : 'click',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               },
               {
                     'method' : 'renderMsgHistoryItem',
                     'artifactId' : 'Platform.Notifications_Open_button_eventHandlers_render_FromList',
                     'id' : 'awfd2341e9',
                     'event' : 'render',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               }
            ];
            listItemTemplate011.eventHandlers = eventHandlers042;


            var list011 = new List({
               'resource' : 'osusernotification',
               'listItemTemplate' : listItemTemplate011,
               'artifactId' : 'Platform.Notifications_list',
               'id' : 'awb4916253',
               'label' : MessageService.createStaticMessage('List of notifications'),
            });
            view010.addChild( list011 );

            var eventHandlers043 = [
               {
                     'method' : 'renderMsgHistory',
                     'artifactId' : 'Platform.Notifications_eventHandlers_render_FromList',
                     'id' : 'awa8aedc90',
                     'event' : 'render',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               }
            ];
            view010.eventHandlers = eventHandlers043;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            var dialog006 = new Dialog({
               'cssClass' : 'dialogDateTimeLookup',
               'resource' : 'PlatformDateLookupResource',
               'id' : 'Platform.DateTimeLookup',
               'label' : MessageService.createStaticMessage('Change Time or Date'),
            });
            ui001.addChild( dialog006 );

            var eventHandlers044 = [
               {
                     'method' : 'initLookup',
                     'artifactId' : 'Platform.DateTimeLookup_eventHandlers_show_initLookup',
                     'id' : 'aw576c44ec',
                     'event' : 'show',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            dialog006.eventHandlers = eventHandlers044;

            var container020 = new Container({
               'artifactId' : 'Platform.DateTimeLookup_container_0',
               'id' : 'aw3cdb37d7',
            });
            dialog006.addChild( container020 );


            var datetimepicker001 = new DateTimePicker({
               'artifactId' : 'Platform.DateTimeLookup_datetimepicker_0',
               'id' : 'aw7d2f0e0d',
            });
            container020.addChild( datetimepicker001 );


            var container021 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.DateTimeLookup_container_1',
               'id' : 'aw4bdc0741',
            });
            dialog006.addChild( container021 );


            var button015 = new Button({
               'artifactId' : 'Platform.DateTimeLookup_Cancel_button',
               'id' : 'aw54d2f1bb',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers045 = [
               {
                     'method' : 'Cancel',
                     'artifactId' : 'Platform.DateTimeLookup_Cancel_button_eventHandlers_click_Cancel',
                     'id' : 'aw5ced0c47',
                     'event' : 'click',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            button015.eventHandlers = eventHandlers045;
            container021.addChild( button015 );


            var button016 = new Button({
               'artifactId' : 'Platform.DateTimeLookup_Clear_button',
               'id' : 'awfd1238bd',
               'label' : MessageService.createStaticMessage('Clear'),
            });
            var eventHandlers046 = [
               {
                     'method' : 'Clear',
                     'artifactId' : 'Platform.DateTimeLookup_Clear_button_eventHandlers_click_Clear',
                     'id' : 'aw47510f1f',
                     'event' : 'click',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            button016.eventHandlers = eventHandlers046;
            container021.addChild( button016 );


            var button017 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.DateTimeLookup_OK_button',
               'id' : 'awb1e0d280',
               'label' : MessageService.createStaticMessage('OK'),
               'primary' : 'true',
            });
            var eventHandlers047 = [
               {
                     'method' : 'SetSelection',
                     'artifactId' : 'Platform.DateTimeLookup_OK_button_eventHandlers_click_SetSelection',
                     'id' : 'aw6c08b2ff',
                     'event' : 'click',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            button017.eventHandlers = eventHandlers047;
            container021.addChild( button017 );


            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.HelpAbout', false);
               trackTimer.startTracking();
            }

            var view011 = new View({
               'resource' : 'PlatformLoginResource',
               'id' : 'Platform.HelpAbout',
               'label' : MessageService.createStaticMessage('About'),
               'fullScreen' : 'true',
            });
            ui001.addChild( view011 );


            var container022 = new Container({
               'cssClass' : 'platformHelpAboutContainer',
               'artifactId' : 'Platform.HelpAbout_container_0',
               'id' : 'awf8c0259e',
            });
            view011.addChild( container022 );


            var image004 = new Image({
               'image' : 'ibmLogoDark.svg',
               'artifactId' : 'Platform.HelpAbout_image_0',
               'id' : 'awfebf608a',
            });
            container022.addChild( image004 );


            var text036 = new Text({
               'resourceAttribute' : 'appName',
               'cssClass' : 'productName bold textappearance-large',
               'editable' : false,
               'artifactId' : 'Platform.HelpAbout_container_0_appName',
               'id' : 'aw27632fa8',
            });
            container022.addChild( text036 );


            var text037 = new Text({
               'cssClass' : 'version',
               'editable' : false,
               'artifactId' : 'Platform.HelpAbout_container_0_Version7.5.2.1',
               'id' : 'awf060501a',
               'value' : MessageService.createStaticMessage('Version 7.6.4.0'),
            });
            container022.addChild( text037 );


            var text038 = new Text({
               'cssClass' : 'build',
               'editable' : false,
               'artifactId' : 'Platform.HelpAbout_container_0_Buildnumberbuild',
               'id' : 'awd289f042',
               'value' : MessageService.createStaticMessage('Build number @build@'),
            });
            container022.addChild( text038 );


            var text039 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.HelpAbout_container_0_LicensedMaterials-',
               'id' : 'aw31046f88',
               'value' : MessageService.createStaticMessage('Licensed Materials - Property of IBM. \u00A9IBM Corp. 2020. IBM, the IBM logo, and ibm.com are trademarks of IBM Corp., registered in many jurisdictions worldwide. Other product and service names might be trademarks of IBM or other companies. A current list of IBM trademarks is available on the Web at www.ibm.com\/legal\/copytrade.shtml. This Program is licensed under the terms of the license agreement for the Program. Please read this agreement carefully before using the Program. By using the Program, you agree to these terms.'),
            });
            container022.addChild( text039 );


            var group005 = new Group({
               'debugOnly' : 'true',
               'artifactId' : 'Platform.Settings_group_2',
               'id' : 'awc5ac5572',
            });
            container022.addChild( group005 );


            var groupitem015 = new GroupItem({
               'layout' : 'ScreenInfo',
               'cssClass' : 'screenInfo',
               'artifactId' : 'Platform.Settings_screenInfo_item',
               'id' : 'aw5de3d82',
            });
            group005.addChild( groupitem015 );


            var text040 = new Text({
               'cssClass' : 'textappearance-large',
               'layoutInsertAt' : 'title',
               'artifactId' : 'Platform.Settings_screenInfo_title',
               'id' : 'awd295621c',
               'value' : MessageService.createStaticMessage('Screen Information'),
            });
            groupitem015.addChild( text040 );


            var text041 = new Text({
               'resourceAttribute' : 'ppi',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'pixels',
               'artifactId' : 'Platform.Settings_screenInfo_ppi_text',
               'id' : 'aw4219624',
               'label' : MessageService.createStaticMessage('PPI'),
            });
            groupitem015.addChild( text041 );


            var text042 = new Text({
               'resourceAttribute' : 'width',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'width',
               'artifactId' : 'Platform.Settings_screenInfo_width_text',
               'id' : 'aw6564040e',
               'label' : MessageService.createStaticMessage('Width'),
            });
            groupitem015.addChild( text042 );


            var text043 = new Text({
               'resourceAttribute' : 'height',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'height',
               'artifactId' : 'Platform.Settings_screenInfo_height_text',
               'id' : 'awcd6ab682',
               'label' : MessageService.createStaticMessage('Height'),
            });
            groupitem015.addChild( text043 );


            var text044 = new Text({
               'resourceAttribute' : 'layoutSize',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'size',
               'artifactId' : 'Platform.Settings_screenInfo_layout_text',
               'id' : 'awd74c1b0',
               'label' : MessageService.createStaticMessage('Layout Size'),
            });
            groupitem015.addChild( text044 );


            var text045 = new Text({
               'resourceAttribute' : 'orientation',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'orientation',
               'artifactId' : 'Platform.Settings_screenInfo_orientation_text',
               'id' : 'aw22df9e6f',
               'label' : MessageService.createStaticMessage('Orientation'),
            });
            groupitem015.addChild( text045 );


            var text046 = new Text({
               'resourceAttribute' : 'density',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'density',
               'artifactId' : 'Platform.Settings_screenInfo_density_text',
               'id' : 'aw6b4b20e2',
               'label' : MessageService.createStaticMessage('Density'),
            });
            groupitem015.addChild( text046 );


            var text047 = new Text({
               'resourceAttribute' : 'pane0_layoutSize',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'pane0',
               'artifactId' : 'Platform.Settings_screenInfo_pane0',
               'id' : 'aw39d3d4a7',
               'label' : MessageService.createStaticMessage('Pane 1 Size'),
            });
            groupitem015.addChild( text047 );


            var text048 = new Text({
               'resourceAttribute' : 'pane1_layoutSize',
               'resource' : 'DeviceSizeResource',
               'editable' : false,
               'layoutInsertAt' : 'pane1',
               'artifactId' : 'Platform.Settings_screenInfo_pane1',
               'id' : 'aw4ed4e431',
               'label' : MessageService.createStaticMessage('Pane 2 Size'),
            });
            groupitem015.addChild( text048 );

            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.Settings', false);
               trackTimer.startTracking();
            }

            var view012 = new View({
               'id' : 'Platform.Settings',
               'label' : MessageService.createStaticMessage('Settings'),
               'fullScreen' : 'true',
            });
            ui001.addChild( view012 );

            var requiredResources014 = {
               'LastADDownload' : {
                  'artifactId' : 'Platform.Settings_LastADDownload',
                  'id' : 'aw879343e2',
               },
               'chooseStoreRoomResource' : {
                  'artifactId' : 'Platform.Settings_storeRoomResource',
                  'id' : 'aw3199f2b0',
               },
               'additionalstoreroom' : {
                  'artifactId' : 'Platform.Settings_additionalstoreroom',
                  'id' : 'aw66f0bf80',
               },
            };
            view012.addRequiredResources( requiredResources014 );

            var actions004 = new Actions({
               'artifactId' : 'Platform.Settings_actions',
               'id' : 'awb3f56d3b',
            });
            view012.addChild( actions004 );


            var action013 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.Settings_RefreshSystemData_action',
               'id' : 'awccb0ee65',
               'label' : MessageService.createStaticMessage('Refresh System Data'),
            });
            actions004.addChild( action013 );

            var eventHandlers048 = [
               {
                     'method' : 'openDownloadSystemDataDialog',
                     'artifactId' : 'Platform.Settings_RefreshSystemData_action_eventHandlers_click_downloadSystemData',
                     'id' : 'aw490b2801',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               },
               {
                     'method' : 'renderDownloadSytemDataActionButton',
                     'artifactId' : 'Platform.Settings_RefreshSystemData_action_eventHandlers_render_renderDownloadSytemDataActionButton',
                     'id' : 'awa42bdfcc',
                     'event' : 'render',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            action013.eventHandlers = eventHandlers048;

            var container023 = new Container({
               'resource' : 'LastADDownload',
               'artifactId' : 'Platform.Settings_container_0',
               'id' : 'aw74ff68b5',
            });
            view012.addChild( container023 );


            var group006 = new Group({
               'artifactId' : 'Platform.Settings_group_0',
               'id' : 'aw2ba2345e',
            });
            container023.addChild( group006 );


            var groupitem016 = new GroupItem({
               'transitionTo' : 'Platform.ChangePassword',
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_Platform.ChangePassword_0',
               'id' : 'awd48342a3',
            });
            group006.addChild( groupitem016 );


            var text049 = new Text({
               'cssClass' : 'relatedRecords',
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_Platform.ChangePassword_0_ChangePassword',
               'id' : 'aw6c14924a',
               'value' : MessageService.createStaticMessage('Change Password'),
            });
            groupitem016.addChild( text049 );

            var eventHandlers049 = [
               {
                     'method' : 'enableChangePasswordFunction',
                     'artifactId' : 'Platform.Settings_LastADDownload_groupitem_Platform.ChangePassword_0_eventHandlers_render_enableChangePasswordFunction',
                     'id' : 'awa81f4a5',
                     'event' : 'render',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            groupitem016.eventHandlers = eventHandlers049;

            var groupitem017 = new GroupItem({
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_0',
               'id' : 'aw82635ebb',
            });
            group006.addChild( groupitem017 );


            var text050 = new Text({
               'cssClass' : 'relatedRecords',
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_0_RefreshLookupData',
               'id' : 'awcddf2167',
               'value' : MessageService.createStaticMessage('Refresh Lookup Data'),
            });
            groupitem017.addChild( text050 );


            var text051 = new Text({
               'resourceAttribute' : 'downloadStatus',
               'editable' : false,
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_0_downloadStatus',
               'id' : 'aw8a1673e3',
            });
            groupitem017.addChild( text051 );

            var eventHandlers050 = [
               {
                     'method' : 'renderLastDownload',
                     'artifactId' : 'Platform.Settings_LastADDownload_groupitem_0_downloadStatus_eventHandlers_render_renderLastDownload',
                     'id' : 'aw72547fb7',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            text051.eventHandlers = eventHandlers050;

            var text052 = new Text({
               'cssClass' : 'textappearance-small',
               'editable' : false,
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_0_Updatesthelookupd',
               'id' : 'aw38a24bec',
               'value' : MessageService.createStaticMessage('Updates the lookup data on your device. Lookup data includes objects, such as assets and locations, that can be added to records.'),
            });
            groupitem017.addChild( text052 );

            var eventHandlers051 = [
               {
                     'method' : 'refreshAdditionalData',
                     'artifactId' : 'Platform.Settings_LastADDownload_groupitem_0_eventHandlers_click_refreshAdditionalData',
                     'id' : 'aw93ad06fe',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            groupitem017.eventHandlers = eventHandlers051;

            var groupitem018 = new GroupItem({
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_3_Number_of_day_to_sync',
               'id' : 'aw97e66cd6',
            });
            group006.addChild( groupitem018 );


            var text053 = new Text({
               'resourceAttribute' : 'numberOfDaysToSync',
               'editable' : true,
               'artifactId' : 'Platform.Settings_LastADDownload_text_Number_of_day_to_sync',
               'id' : 'aw69a517e3',
               'label' : MessageService.createStaticMessage('How often changes need to be refresh in days:'),
            });
            groupitem018.addChild( text053 );

            var eventHandlers052 = [
               {
                     'method' : 'renderDayToSYnc',
                     'artifactId' : 'Platform.Settings_LastADDownload_text_Number_of_day_to_sync_eventHandlers_renderDayToSYnc',
                     'id' : 'awdc11c959',
                     'event' : 'render',
                     'class' : 'platform.handlers.SettingsHandler',
               },
               {
                     'method' : 'saveDayToSync',
                     'artifactId' : 'Platform.Settings_LastADDownload_text_Number_of_day_to_sync_eventHandlers_saveDayToSYnc',
                     'id' : 'aw57729721',
                     'event' : 'validate',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            text053.eventHandlers = eventHandlers052;

            var groupitem019 = new GroupItem({
               'transitionTo' : 'Platform.AdvancedSettings',
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_Platform.AdvancedSettings_0',
               'id' : 'aw741c4d60',
            });
            group006.addChild( groupitem019 );


            var text054 = new Text({
               'cssClass' : 'relatedRecords',
               'artifactId' : 'Platform.Settings_LastADDownload_groupitem_Platform.AdvancedSettings_0_AdvancedSettings',
               'id' : 'aw2d662633',
               'value' : MessageService.createStaticMessage('Advanced Settings'),
            });
            groupitem019.addChild( text054 );


            var container024 = new Container({
               'artifactId' : 'ConnectionContainer',
               'id' : 'awef0b2658',
            });
            view012.addChild( container024 );


            var group007 = new Group({
               'artifactId' : 'Platform.Settings.ConnectionManagement.group',
               'id' : 'aw9ad5002d',
            });
            container024.addChild( group007 );


            var groupitem020 = new GroupItem({
               'layout' : 'ConnectionManagementLayout',
               'artifactId' : 'Platform.Settings.ConnectionManagement.groupItem1',
               'id' : 'aw81b0980b',
            });
            group007.addChild( groupitem020 );


            var text055 = new Text({
               'cssClass' : 'relatedRecords',
               'layoutInsertAt' : 'Title',
               'artifactId' : 'Platform.Settings.ConnectionManagement.Title',
               'id' : 'aw1de21387',
               'value' : MessageService.createStaticMessage('Connection Behavior'),
            });
            groupitem020.addChild( text055 );


            var text056 = new Text({
               'cssClass' : 'wrap-content',
               'layoutInsertAt' : 'description',
               'artifactId' : 'Platform.Settings.ConnectionManagement.Description',
               'id' : 'aw6b506a6f',
               'value' : MessageService.createStaticMessage('Specifies which network connections should enable the application to work online'),
            });
            groupitem020.addChild( text056 );


            var radiobutton001 = new RadioButton({
               'cssClass' : 'firstradiobutton',
               'name' : 'Connectiongrp',
               'layoutInsertAt' : 'button1',
               'artifactId' : 'Platform.Settings.ConnectionManagement.Button.AllConnections',
               'id' : 'awcb83aecb',
               'label' : MessageService.createStaticMessage('All Types'),
            });
            groupitem020.addChild( radiobutton001 );

            var eventHandlers053 = [
               {
                     'method' : 'renderConnetionManagementSetting',
                     'artifactId' : 'Platform.Settings.ConnectionManagement.AllConnection.EventHandler1',
                     'id' : 'awe9d7776d',
                     'event' : 'render',
                     'class' : 'platform.handlers.SettingsHandler',
               },
               {
                     'method' : 'connetionManagementSetting',
                     'artifactId' : 'Platform.Settings.allCOnnection.click.EventHandler',
                     'id' : 'aw76203443',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            radiobutton001.eventHandlers = eventHandlers053;

            var radiobutton002 = new RadioButton({
               'name' : 'Connectiongrp',
               'layoutInsertAt' : 'button2',
               'artifactId' : 'Platform.Settings.ConnectionManagement.Button.WiFi',
               'id' : 'aw42dec2bb',
               'label' : MessageService.createStaticMessage('Only WiFi'),
            });
            groupitem020.addChild( radiobutton002 );

            var eventHandlers054 = [
               {
                     'method' : 'renderConnetionManagementSetting',
                     'artifactId' : 'Platform.Settings.ConnectionManagement.AllConnection.EventHandler2',
                     'id' : 'aw70de26d7',
                     'event' : 'render',
                     'class' : 'platform.handlers.SettingsHandler',
               },
               {
                     'method' : 'connetionManagementSetting',
                     'artifactId' : 'Platform.Settings.WiFi.click.EventHandler',
                     'id' : 'aw183e4c0c',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            radiobutton002.eventHandlers = eventHandlers054;

            var radiobutton003 = new RadioButton({
               'name' : 'Connectiongrp',
               'layoutInsertAt' : 'button3',
               'artifactId' : 'Platform.Settings.ConnectionManagement.Button.Cellular',
               'id' : 'aw7032481d',
               'label' : MessageService.createStaticMessage('Only Cellular'),
            });
            groupitem020.addChild( radiobutton003 );

            var eventHandlers055 = [
               {
                     'method' : 'renderConnetionManagementSetting',
                     'artifactId' : 'Platform.Settings.ConnectionManagement.AllConnection.EventHandler3',
                     'id' : 'aw7d91641',
                     'event' : 'render',
                     'class' : 'platform.handlers.SettingsHandler',
               },
               {
                     'method' : 'connetionManagementSetting',
                     'artifactId' : 'Platform.Settings.ConnectionManagement.Cellular.EventHandler',
                     'id' : 'aw2a978e73',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            radiobutton003.eventHandlers = eventHandlers055;

            var container025 = new Container({
               'resource' : 'chooseStoreRoomResource',
               'artifactId' : 'Platform.Settings_Storeroom_container',
               'id' : 'aw3fbd7348',
            });
            view012.addChild( container025 );


            var group008 = new Group({
               'artifactId' : 'Platform.Settings_Storeroom_group_0',
               'id' : 'awabbbc405',
            });
            container025.addChild( group008 );


            var groupitem021 = new GroupItem({
               'artifactId' : 'Platform.Settings_groupitem_Platform.Storeroom_0',
               'id' : 'awdda12a79',
            });
            group008.addChild( groupitem021 );


            var text057 = new Text({
               'cssClass' : 'relatedRecords',
               'artifactId' : 'Platform.Settings_groupitem_Platform.Storeroom_0_Label',
               'id' : 'aw928420df',
               'value' : MessageService.createStaticMessage('Change Default Storeroom'),
            });
            groupitem021.addChild( text057 );


            var text058 = new Text({
               'resourceAttribute' : 'location',
               'lookup' : 'Platform.Settings_Storeroom.StoreroomLookup',
               'cssClass' : 'textLookupNoScan',
               'editable' : true,
               'artifactId' : 'Platform.Settings_groupitem_Platform.Storeroom_0_StoreroomChange',
               'id' : 'awb2a85828',
               'lookupAttribute' : 'location',
               'placeHolder' : MessageService.createStaticMessage('Tap to enter'),
            });
            groupitem021.addChild( text058 );

            var eventHandlers056 = [
               {
                     'method' : 'validateChooseStoreRoom',
                     'artifactId' : 'Platform.Settings_groupitem_Platform.Storeroom_0_Change_eventHandler',
                     'id' : 'awd46b9fba',
                     'event' : 'validate',
                     'class' : 'application.handlers.InventoryHandler',
               }
            ];
            text058.eventHandlers = eventHandlers056;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.AdvancedSettings', false);
               trackTimer.startTracking();
            }

            var view013 = new View({
               'id' : 'Platform.AdvancedSettings',
               'label' : MessageService.createStaticMessage('Settings'),
            });
            ui001.addChild( view013 );


            var container026 = new Container({
               'artifactId' : 'Platform.AdvancedSettings_container_0',
               'id' : 'aw5c13274d',
            });
            view013.addChild( container026 );


            var group009 = new Group({
               'artifactId' : 'Platform.AdvancedSettings_group_0',
               'id' : 'awebdfb82c',
            });
            container026.addChild( group009 );


            var groupitem022 = new GroupItem({
               'transitionTo' : 'Platform.TimeTrackReport',
               'artifactId' : 'Platform.AdvancedSettings_groupitem_Platform.TimeTrackReport_0',
               'id' : 'awba4384a8',
            });
            group009.addChild( groupitem022 );


            var text059 = new Text({
               'cssClass' : 'relatedRecords',
               'artifactId' : 'Platform.AdvancedSettings_groupitem_Platform.TimeTrackReport_0_TrackPerformanceDa',
               'id' : 'awc0a6dde7',
               'value' : MessageService.createStaticMessage('Track Performance Data'),
            });
            groupitem022.addChild( text059 );


            var text060 = new Text({
               'cssClass' : 'red-text',
               'editable' : false,
               'artifactId' : 'Platform.AdvancedSettings_groupitem_Platform.TimeTrackReport_0_Thisoptionusesmem',
               'id' : 'aw4367e95f',
               'value' : MessageService.createStaticMessage('This option uses memory and might slow the performance of your device. Disable performance tracking when you are done.'),
            });
            groupitem022.addChild( text060 );


            var groupitem023 = new GroupItem({
               'transitionTo' : 'Platform.LoggerReport',
               'artifactId' : 'Platform.AdvancedSettings_groupitem_Platform.LoggerReport_0',
               'id' : 'aw10ca73e0',
            });
            group009.addChild( groupitem023 );


            var text061 = new Text({
               'cssClass' : 'relatedRecords',
               'artifactId' : 'Platform.AdvancedSettings_groupitem_Platform.LoggerReport_0_Logging',
               'id' : 'awffa3ff9c',
               'value' : MessageService.createStaticMessage('Logging'),
            });
            groupitem023.addChild( text061 );


            var text062 = new Text({
               'cssClass' : 'red-text',
               'editable' : false,
               'artifactId' : 'Platform.AdvancedSettings_groupitem_Platform.LoggerReport_0_Thisoptionusesmem',
               'id' : 'aw30da1efa',
               'value' : MessageService.createStaticMessage('This option uses memory and might slow the performance of your device. Disable logging when you are done.'),
            });
            groupitem023.addChild( text062 );

            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.LoggerReport', false);
               trackTimer.startTracking();
            }

            var view014 = new View({
               'cssClass' : 'loggerReport',
               'scrollDir' : 'vh',
               'id' : 'Platform.LoggerReport',
               'label' : MessageService.createStaticMessage('Logging Data'),
            });
            ui001.addChild( view014 );


            var actions005 = new Actions({
               'artifactId' : 'Platform.LoggerReport_actions',
               'id' : 'aw5b090344',
            });
            view014.addChild( actions005 );


            var action014 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.LoggerReport_EnableErrorLogging_action',
               'id' : 'awc05e82b4',
               'label' : MessageService.createStaticMessage('Enable Error Logging'),
            });
            actions005.addChild( action014 );

            var eventHandlers057 = [
               {
                     'method' : 'enableDisableLoggerErro',
                     'artifactId' : 'Platform.LoggerReport_EnableErrorLogging_action_eventHandlers_click_enableDisableLoggerErro',
                     'id' : 'awf5ad7151',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               },
               {
                     'method' : 'setLabelError',
                     'artifactId' : 'Platform.LoggerReport_EnableErrorLogging_action_eventHandlers_render_setLabelError',
                     'id' : 'aw4faa4e07',
                     'event' : 'render',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action014.eventHandlers = eventHandlers057;

            var action015 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.LoggerReport_EnableInfoLogging_action',
               'id' : 'aw6d618335',
               'label' : MessageService.createStaticMessage('Enable Info Logging'),
            });
            actions005.addChild( action015 );

            var eventHandlers058 = [
               {
                     'method' : 'enableDisableLoggerInfo',
                     'artifactId' : 'Platform.LoggerReport_EnableInfoLogging_action_eventHandlers_click_enableDisableLoggerInfo',
                     'id' : 'aw164710f9',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               },
               {
                     'method' : 'setLabelInfo',
                     'artifactId' : 'Platform.LoggerReport_EnableInfoLogging_action_eventHandlers_render_setLabelInfo',
                     'id' : 'awc8b2e890',
                     'event' : 'render',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action015.eventHandlers = eventHandlers058;

            var action016 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.LoggerReport_EnableDebugLogging_action',
               'id' : 'awaa11689b',
               'label' : MessageService.createStaticMessage('Enable Debug Logging'),
            });
            actions005.addChild( action016 );

            var eventHandlers059 = [
               {
                     'method' : 'enableDisableLoggerDebug',
                     'artifactId' : 'Platform.LoggerReport_EnableDebugLogging_action_eventHandlers_click_enableDisableLoggerDebug',
                     'id' : 'aw49ea32aa',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               },
               {
                     'method' : 'setLabelDebug',
                     'artifactId' : 'Platform.LoggerReport_EnableDebugLogging_action_eventHandlers_render_setLabelDebug',
                     'id' : 'aw1cc86c8a',
                     'event' : 'render',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action016.eventHandlers = eventHandlers059;

            var action017 = new Action({
               'overflow' : true,
               'transitionTo' : 'Platform.TransLoggerReport',
               'artifactId' : 'Platform.LoggerReport_ViewTransactionLog_action',
               'id' : 'awdaed3d40',
               'label' : MessageService.createStaticMessage('View Transaction Log'),
            });
            actions005.addChild( action017 );


            var action018 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.LoggerReport_ClearLogData_action',
               'id' : 'awb6d3895c',
               'label' : MessageService.createStaticMessage('Clear Log Data'),
            });
            actions005.addChild( action018 );

            var eventHandlers060 = [
               {
                     'method' : 'clear',
                     'artifactId' : 'Platform.LoggerReport_ClearLogData_action_eventHandlers_click_clear',
                     'id' : 'aw10958c5',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action018.eventHandlers = eventHandlers060;

            var action019 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.LoggerReport_UploadLog_action',
               'id' : 'aw7510fce3',
               'label' : MessageService.createStaticMessage('Save Log'),
            });
            actions005.addChild( action019 );

            var eventHandlers061 = [
               {
                     'method' : 'showIfConnected',
                     'artifactId' : 'Platform.LoggerReport_UploadLog_action_eventHandlers_render_uploadCurrent',
                     'id' : 'aw4d53a4f5',
                     'event' : 'render',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               },
               {
                     'method' : 'uploadCurrent',
                     'artifactId' : 'Platform.LoggerReport_UploadLog_action_eventHandlers_click_uploadCurrent',
                     'id' : 'aw2b172289',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action019.eventHandlers = eventHandlers061;

            var action020 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.LoggerReport_EmailLog_action',
               'id' : 'aw90d8a401',
               'label' : MessageService.createStaticMessage('Email Log'),
            });
            actions005.addChild( action020 );

            var eventHandlers062 = [
               {
                     'method' : 'emailCurrent',
                     'artifactId' : 'Platform.LoggerReport_EmailLog_action_eventHandlers_click_emailCurrent',
                     'id' : 'awf10881b9',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action020.eventHandlers = eventHandlers062;
            var eventHandlers063 = [
               {
                     'method' : 'renderLoggerReport',
                     'artifactId' : 'Platform.LoggerReport_eventHandlers_show_renderLoggerReport',
                     'id' : 'aw9b7c5c73',
                     'event' : 'show',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            view014.eventHandlers = eventHandlers063;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.TransLoggerReport', false);
               trackTimer.startTracking();
            }

            var view015 = new View({
               'scrollDir' : 'vh',
               'id' : 'Platform.TransLoggerReport',
               'label' : MessageService.createStaticMessage('Logging Data'),
            });
            ui001.addChild( view015 );


            var actions006 = new Actions({
               'artifactId' : 'Platform.TransLoggerReport_actions',
               'id' : 'aw49b00040',
            });
            view015.addChild( actions006 );


            var action021 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.TransLoggerReport_ClearLogData_action',
               'id' : 'awdce21e26',
               'label' : MessageService.createStaticMessage('Clear Log Data'),
            });
            actions006.addChild( action021 );

            var eventHandlers064 = [
               {
                     'method' : 'clearTransLog',
                     'artifactId' : 'Platform.TransLoggerReport_ClearLogData_action_eventHandlers_click_clear',
                     'id' : 'aw71c2398e',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action021.eventHandlers = eventHandlers064;

            var action022 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.TransLoggerReport_EmailLog_action',
               'id' : 'aw29f3639',
               'label' : MessageService.createStaticMessage('Email Log'),
            });
            actions006.addChild( action022 );

            var eventHandlers065 = [
               {
                     'method' : 'emailCurrentTranslog',
                     'artifactId' : 'Platform.TransLoggerReport_EmailLog_action_eventHandlers_click_emailCurrent',
                     'id' : 'awfd97a236',
                     'event' : 'click',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            action022.eventHandlers = eventHandlers065;
            var eventHandlers066 = [
               {
                     'method' : 'renderTransLoggerReport',
                     'artifactId' : 'Platform.TransLoggerReport_eventHandlers_show_renderTransLoggerReport',
                     'id' : 'aw4261a98a',
                     'event' : 'show',
                     'class' : 'platform.logging.handler.LoggerReportHandler',
               }
            ];
            view015.eventHandlers = eventHandlers066;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.ChangePassword', false);
               trackTimer.startTracking();
            }

            var view016 = new View({
               'resource' : 'PlatformChangePasswordForm',
               'id' : 'Platform.ChangePassword',
               'label' : MessageService.createStaticMessage('Change Password'),
            });
            ui001.addChild( view016 );


            var container027 = new Container({
               'cssClass' : 'changePasswordForm',
               'artifactId' : 'Platform.ChangePassword_container_0',
               'id' : 'awf7c2a2a',
            });
            view016.addChild( container027 );


            var text063 = new Text({
               'resourceAttribute' : 'errorMsg',
               'cssClass' : 'errorMsg',
               'editable' : false,
               'artifactId' : 'Platform.ChangePassword_container_0_errorMsg',
               'id' : 'aw3ed16fe1',
            });
            container027.addChild( text063 );


            var text064 = new Text({
               'resourceAttribute' : 'infoMsg',
               'cssClass' : 'infoMsg',
               'editable' : false,
               'artifactId' : 'Platform.ChangePassword_container_0_infoMsg',
               'id' : 'awe28ebedd',
            });
            container027.addChild( text064 );


            var text065 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'currentpassword',
               'editable' : true,
               'artifactId' : 'Platform.ChangePassword_container_0_currentpassword',
               'id' : 'aw7df0b045',
               'type' : 'password',
               'placeHolder' : MessageService.createStaticMessage('Current password'),
            });
            container027.addChild( text065 );

            var eventHandlers067 = [
               {
                     'method' : 'hidePasswordField',
                     'artifactId' : 'Platform.ChangePassword_container_0_currentpassword_eventHandlers_render_hidePasswordField',
                     'id' : 'aw27f3eacb',
                     'event' : 'render',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            text065.eventHandlers = eventHandlers067;

            var text066 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'newpassword',
               'editable' : true,
               'artifactId' : 'Platform.ChangePassword_container_0_newpassword',
               'id' : 'aw618d08b5',
               'type' : 'password',
               'placeHolder' : MessageService.createStaticMessage('New password'),
            });
            container027.addChild( text066 );


            var text067 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'confirmnewpassword',
               'editable' : true,
               'artifactId' : 'Platform.ChangePassword_container_0_confirmnewpassword',
               'id' : 'awd274537a',
               'type' : 'password',
               'placeHolder' : MessageService.createStaticMessage('Confirm password'),
            });
            container027.addChild( text067 );


            var button018 = new Button({
               'artifactId' : 'Platform.ChangePassword_Cancel_button',
               'id' : 'aw96c63135',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers068 = [
               {
                     'method' : 'cancelPasswordClickHandler',
                     'artifactId' : 'Platform.ChangePassword_Cancel_button_eventHandlers_click_cancelPasswordClickHandler',
                     'id' : 'aw7492b621',
                     'event' : 'click',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            button018.eventHandlers = eventHandlers068;
            container027.addChild( button018 );


            var button019 = new Button({
               'artifactId' : 'Platform.ChangePassword_Change_button',
               'id' : 'aw5cd0477f',
               'label' : MessageService.createStaticMessage('Change'),
               'primary' : 'true',
            });
            var eventHandlers069 = [
               {
                     'method' : 'changePasswordClickHandler',
                     'artifactId' : 'Platform.ChangePassword_Change_button_eventHandlers_click_changePasswordClickHandler',
                     'id' : 'awfdba8feb',
                     'event' : 'click',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            button019.eventHandlers = eventHandlers069;
            container027.addChild( button019 );

            var eventHandlers070 = [
               {
                     'method' : 'initializeChangePasswordView',
                     'artifactId' : 'Platform.ChangePassword_eventHandlers_show_initializeChangePasswordView',
                     'id' : 'awbbd173b',
                     'event' : 'show',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               },
               {
                     'method' : 'changePasswordBack',
                     'artifactId' : 'Platform.ChangePassword_eventHandlers_back_changePasswordBack',
                     'id' : 'awc25c9010',
                     'event' : 'back',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            view016.eventHandlers = eventHandlers070;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.RetrieveOldPassword', false);
               trackTimer.startTracking();
            }

            var view017 = new View({
               'resource' : 'PlatformChangePasswordForm',
               'showHeader' : false,
               'showOverflow' : false,
               'id' : 'Platform.RetrieveOldPassword',
               'label' : MessageService.createStaticMessage('Recover App Data'),
            });
            ui001.addChild( view017 );


            var container028 = new Container({
               'cssClass' : 'changePasswordForm',
               'artifactId' : 'Platform.RetrieveOldPassword_container_0',
               'id' : 'awecdef66d',
            });
            view017.addChild( container028 );


            var text068 = new Text({
               'artifactId' : 'Platform.RetrieveOldPassword_container_0_Enterthepasswordt',
               'id' : 'aw14ebf03b',
               'value' : MessageService.createStaticMessage('Enter the password that you last used to log in to the app. If you do not have this password, you must reset the app before you can log in.'),
            });
            container028.addChild( text068 );


            var text069 = new Text({
               'resourceAttribute' : 'errorMsg',
               'cssClass' : 'errorMsg',
               'editable' : false,
               'artifactId' : 'Platform.RetrieveOldPassword_container_0_errorMsg',
               'id' : 'aw9574c917',
            });
            container028.addChild( text069 );


            var text070 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'currentpassword',
               'editable' : true,
               'artifactId' : 'Platform.RetrieveOldPassword_container_0_currentpassword',
               'id' : 'aw97b6c3b7',
               'type' : 'password',
               'placeHolder' : MessageService.createStaticMessage('Previous password'),
            });
            container028.addChild( text070 );


            var button020 = new Button({
               'artifactId' : 'Platform.RetrieveOldPassword_Recover_button',
               'id' : 'aw3a0ff2',
               'label' : MessageService.createStaticMessage('Recover'),
               'primary' : 'true',
            });
            var eventHandlers071 = [
               {
                     'method' : 'recoverOldPasswordClickHandler',
                     'artifactId' : 'Platform.RetrieveOldPassword_Recover_button_eventHandlers_click_recoverOldPasswordClickHandler',
                     'id' : 'awecb18d1c',
                     'event' : 'click',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            button020.eventHandlers = eventHandlers071;
            container028.addChild( button020 );


            var button021 = new Button({
               'artifactId' : 'Platform.RetrieveOldPassword_Reset_button',
               'id' : 'aw8bb551dc',
               'label' : MessageService.createStaticMessage('Reset'),
            });
            var eventHandlers072 = [
               {
                     'method' : 'resetStorageClickHandler',
                     'artifactId' : 'Platform.RetrieveOldPassword_Reset_button_eventHandlers_click_resetStorageClickHandler',
                     'id' : 'awfe7a73d2',
                     'event' : 'click',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            button021.eventHandlers = eventHandlers072;
            container028.addChild( button021 );

            var eventHandlers073 = [
               {
                     'method' : 'initializeRetrieveOldPasswordView',
                     'artifactId' : 'Platform.RetrieveOldPassword_eventHandlers_show_initializeRetrieveOldPasswordView',
                     'id' : 'aw26f17c5a',
                     'event' : 'show',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            view017.eventHandlers = eventHandlers073;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            var dialog007 = new Dialog({
               'closeOnBackgroundClick' : 'true',
               'id' : 'Platform.ConfirmResetDataStore',
            });
            ui001.addChild( dialog007 );


            var container029 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.ConfirmResetDataStore_container_0',
               'id' : 'awacb7e535',
            });
            dialog007.addChild( container029 );


            var text071 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.ConfirmResetDataStore_container_0_WarningAllappdat',
               'id' : 'aw68bdf3e8',
               'value' : MessageService.createStaticMessage('Warning! All app data on the device will be cleared. Any data that has not been sent to the server will be lost.'),
            });
            container029.addChild( text071 );


            var container030 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.ConfirmResetDataStore_container_1',
               'id' : 'awdbb0d5a3',
            });
            dialog007.addChild( container030 );


            var button022 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.ConfirmResetDataStore_Continue_button',
               'id' : 'awba645d10',
               'label' : MessageService.createStaticMessage('Continue'),
            });
            var eventHandlers074 = [
               {
                     'method' : 'resetDataStoreClickHandler',
                     'artifactId' : 'Platform.ConfirmResetDataStore_Continue_button_eventHandlers_click_resetDataStoreClickHandler',
                     'id' : 'aw5074e6c8',
                     'event' : 'click',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            button022.eventHandlers = eventHandlers074;
            container030.addChild( button022 );


            var button023 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.ConfirmResetDataStore_Cancel_button',
               'id' : 'aw50474341',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers075 = [
               {
                     'method' : 'cancelResetDataStoreClickHandler',
                     'artifactId' : 'Platform.ConfirmResetDataStore_Cancel_button_eventHandlers_click_cancelResetDataStoreClickHandler',
                     'id' : 'awda7121b8',
                     'event' : 'click',
                     'class' : 'platform.handlers.ChangePasswordHandler',
               }
            ];
            button023.eventHandlers = eventHandlers075;
            container030.addChild( button023 );


            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.TimeTrackReport', false);
               trackTimer.startTracking();
            }

            var view018 = new View({
               'cssClass' : 'loggerReport',
               'scrollDir' : 'vh',
               'id' : 'Platform.TimeTrackReport',
               'label' : MessageService.createStaticMessage('Performance Data'),
            });
            ui001.addChild( view018 );

            var requiredResources015 = {
               'timeTrack' : {
                  'artifactId' : 'Platform.TimeTrackReport_timeTrack',
                  'id' : 'aw8d707cee',
               },
            };
            view018.addRequiredResources( requiredResources015 );

            var actions007 = new Actions({
               'artifactId' : 'Platform.TimeTrackReport_actions',
               'id' : 'aw9d9a4864',
            });
            view018.addChild( actions007 );


            var action023 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.TimeTrackReport_EnablePerformanceTracking_action',
               'id' : 'aw34736a63',
               'label' : MessageService.createStaticMessage('Enable Performance Tracking'),
            });
            actions007.addChild( action023 );

            var eventHandlers076 = [
               {
                     'method' : 'enableDisableTT',
                     'artifactId' : 'Platform.TimeTrackReport_EnablePerformanceTracking_action_eventHandlers_click_enableDisableTT',
                     'id' : 'aw10972127',
                     'event' : 'click',
                     'class' : 'platform.performance.handler.TimeTrackHandler',
               },
               {
                     'method' : 'setLabel',
                     'artifactId' : 'Platform.TimeTrackReport_EnablePerformanceTracking_action_eventHandlers_render_setLabel',
                     'id' : 'awf9abf636',
                     'event' : 'render',
                     'class' : 'platform.performance.handler.TimeTrackHandler',
               }
            ];
            action023.eventHandlers = eventHandlers076;

            var action024 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.TimeTrackReport_ClearPerformanceData_action',
               'id' : 'aw1edf54cf',
               'label' : MessageService.createStaticMessage('Clear Performance Data'),
            });
            actions007.addChild( action024 );

            var eventHandlers077 = [
               {
                     'method' : 'clear',
                     'artifactId' : 'Platform.TimeTrackReport_ClearPerformanceData_action_eventHandlers_click_clear',
                     'id' : 'aw85273d1b',
                     'event' : 'click',
                     'class' : 'platform.performance.handler.TimeTrackHandler',
               }
            ];
            action024.eventHandlers = eventHandlers077;

            var action025 = new Action({
               'overflow' : true,
               'artifactId' : 'Platform.TimeTrackReport_EmailReport_action',
               'id' : 'aw6ff8fae1',
               'label' : MessageService.createStaticMessage('Email Report'),
            });
            actions007.addChild( action025 );

            var eventHandlers078 = [
               {
                     'method' : 'emailCurrent',
                     'artifactId' : 'Platform.TimeTrackReport_EmailReport_action_eventHandlers_click_emailCurrent',
                     'id' : 'awc00583a0',
                     'event' : 'click',
                     'class' : 'platform.performance.handler.TimeTrackHandler',
               }
            ];
            action025.eventHandlers = eventHandlers078;
            var eventHandlers079 = [
               {
                     'method' : 'renderTT',
                     'artifactId' : 'Platform.TimeTrackReport_eventHandlers_show_renderTT',
                     'id' : 'awca05a315',
                     'event' : 'show',
                     'class' : 'platform.performance.handler.TimeTrackHandler',
               }
            ];
            view018.eventHandlers = eventHandlers079;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            var lookup008 = new Lookup({
               'filterMethod' : 'filterStoreroomLookup',
               'resource' : 'additionalstoreroom',
               'filterClass' : 'application.handlers.InventoryHandler',
               'id' : 'Platform.Settings_Storeroom.StoreroomLookup',
               'label' : MessageService.createStaticMessage('Select Storeroom'),
            });
            ui001.addChild( lookup008 );

            var requiredResources016 = {
               'additionalstoreroom' : {
                  'reload' : true,
                  'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom',
                  'id' : 'awc07370c4',
               },
            };
            lookup008.addRequiredResources( requiredResources016 );


            var searchAttributes007 = new SearchAttributes({
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_searchAttributes',
               'id' : 'awbfcfcbad',
            });

            var searchAttribute008 = new SearchAttribute({
               'name' : 'locationForSearch',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_searchAttribute_locationForSearch',
               'id' : 'aw8505f9f4',
            });
            searchAttributes007.addChild( searchAttribute008 );


            var searchAttribute009 = new SearchAttribute({
               'name' : 'description',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_searchAttribute_description',
               'id' : 'awa2c1dcd4',
            });
            searchAttributes007.addChild( searchAttribute009 );



            var listItemTemplate012 = new ListItemTemplate({
               'layout' : 'ItemLookup',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_listItemTemplate_ItemLookup',
               'id' : 'aw7f529c98',
            });

            var listtext047 = new ListText({
               'resourceAttribute' : 'location',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'item1',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_ItemLookup_location',
               'id' : 'aw26de661c',
            });
            listItemTemplate012.addChild( listtext047 );


            var listtext048 = new ListText({
               'resourceAttribute' : 'description',
               'cssClass' : 'bold textappearance-medium',
               'layoutInsertAt' : 'desc1',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_ItemLookup_description',
               'id' : 'aw4a18cd58',
            });
            listItemTemplate012.addChild( listtext048 );



            var list012 = new List({
               'resource' : 'additionalstoreroom',
               'listItemTemplate' : listItemTemplate012,
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_additionalstoreroom_list',
               'id' : 'awf30a67c3',
               'searchAttributes' : searchAttributes007,
            });
            lookup008.addChild( list012 );


            var returnAttributes004 = new ReturnAttributes({
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_returnAttributes',
               'id' : 'aw5d21c671',
            });
            lookup008.addChild( returnAttributes004 );


            var returnAttribute008 = new ReturnAttribute({
               'targetAttribute' : 'location',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_location_location',
               'id' : 'awd6e3f47a',
               'sourceAttribute' : 'location',
            });
            returnAttributes004.addChild( returnAttribute008 );


            var returnAttribute009 = new ReturnAttribute({
               'targetAttribute' : 'siteid',
               'artifactId' : 'Platform.Settings_Storeroom.StoreroomLookup_siteid_siteid',
               'id' : 'aw346d63e7',
               'sourceAttribute' : 'siteid',
            });
            returnAttributes004.addChild( returnAttribute009 );


            var dialog008 = new Dialog({
               'closeOnBackgroundClick' : 'true',
               'id' : 'Platform.ListLongPressDialog',
            });
            ui001.addChild( dialog008 );



            var listItemTemplate013 = new ListItemTemplate({
               'cssClass' : 'dialogListItem textappearance-medium',
               'artifactId' : 'Platform.ListLongPressDialog_PlatformLongPressResource_listItemTemplate',
               'id' : 'awefd72fd8',
            });

            var listtext049 = new ListText({
               'resourceAttribute' : 'label',
               'artifactId' : 'Platform.ListLongPressDialog_PlatformLongPressResource_label',
               'id' : 'awe2e495b2',
            });
            listItemTemplate013.addChild( listtext049 );



            var list013 = new List({
               'resource' : 'PlatformLongPressResource',
               'showHeader' : false,
               'listItemTemplate' : listItemTemplate013,
               'artifactId' : 'Platform.ListLongPressDialog_PlatformLongPressResource_list',
               'id' : 'aw64ff84d9',
               'queryBase' : '',
            });
            dialog008.addChild( list013 );


            var dialog009 = new Dialog({
               'id' : 'Platform.LoadingAdditionalData',
            });
            ui001.addChild( dialog009 );


            var container031 = new Container({
               'artifactId' : 'Platform.LoadingAdditionalData_container_0',
               'id' : 'aw48b509d9',
            });
            dialog009.addChild( container031 );


            var text072 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadingAdditionalData_container_0_Downloadinglookupd',
               'id' : 'aw4cec47c0',
               'value' : MessageService.createStaticMessage('Downloading lookup data.'),
            });
            container031.addChild( text072 );


            var button024 = new Button({
               'artifactId' : 'Platform.LoadingAdditionalData_Cancel_button',
               'id' : 'awb30b5f0',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers080 = [
               {
                     'method' : 'cancelADDownload',
                     'artifactId' : 'Platform.LoadingAdditionalData_Cancel_button_eventHandlers_click_cancelADDownload',
                     'id' : 'awc41dac4c',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button024.eventHandlers = eventHandlers080;
            container031.addChild( button024 );


            var dialog010 = new Dialog({
               'id' : 'Platform.AdditionalDataNoConn',
            });
            ui001.addChild( dialog010 );


            var container032 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.AdditionalDataNoConn_container_0',
               'id' : 'aw666da461',
            });
            dialog010.addChild( container032 );


            var text073 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.AdditionalDataNoConn_container_0_Lookupdatacouldno',
               'id' : 'aw96b90fd8',
               'value' : MessageService.createStaticMessage('Lookup data could not be downloaded. Go to Settings > Refresh Lookup Data when you are online.'),
            });
            container032.addChild( text073 );


            var container033 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.AdditionalDataNoConn_container_1',
               'id' : 'aw116a94f7',
            });
            dialog010.addChild( container033 );


            var button025 = new Button({
               'artifactId' : 'Platform.AdditionalDataNoConn_OK_button',
               'id' : 'aw9b370278',
               'label' : MessageService.createStaticMessage('OK'),
            });
            var eventHandlers081 = [
               {
                     'method' : 'closeDialogAndShowDefaultViewIfNeeded',
                     'artifactId' : 'Platform.AdditionalDataNoConn_OK_button_eventHandlers_click_closeDialogAndShowDefaultViewIfNeeded',
                     'id' : 'aw108159b3',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button025.eventHandlers = eventHandlers081;
            container033.addChild( button025 );


            var dialog011 = new Dialog({
               'id' : 'Platform.ConfirmReloadWorkList',
            });
            ui001.addChild( dialog011 );


            var container034 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.ConfirmReloadWorkList_container_0',
               'id' : 'aw2054aa9e',
            });
            dialog011.addChild( container034 );


            var text074 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.ConfirmReloadWorkList_container_0_Doyouwanttoclose',
               'id' : 'aw83f81a4b',
               'value' : MessageService.createStaticMessage('Reloading the work list takes time if you are downloading large amounts of data.  Are you sure that you want to continue?'),
            });
            container034.addChild( text074 );


            var container035 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.ConfirmReloadWorkList_container_1',
               'id' : 'aw57539a08',
            });
            dialog011.addChild( container035 );


            var button026 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.ConfirmReloadWorkList_Yes_button',
               'id' : 'aw5bc89627',
               'label' : MessageService.createStaticMessage('Yes'),
            });
            var eventHandlers082 = [
               {
                     'method' : 'reloadConfirmed',
                     'artifactId' : 'Platform.ConfirmReloadWorkList_Yes_button_eventHandlers_click_processDialog',
                     'id' : 'awafdb701f',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button026.eventHandlers = eventHandlers082;
            container035.addChild( button026 );


            var button027 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.ConfirmReloadWorkList_No_button',
               'id' : 'aw4487e9e7',
               'label' : MessageService.createStaticMessage('No'),
            });
            var eventHandlers083 = [
               {
                     'method' : 'closeDialog',
                     'artifactId' : 'Platform.ConfirmReloadWorkList_No_button_eventHandlers_click_closeDialog',
                     'id' : 'aw56d1743',
                     'event' : 'click',
                     'class' : 'platform.handlers.DialogHandler',
               }
            ];
            button027.eventHandlers = eventHandlers083;
            container035.addChild( button027 );


            var dialog012 = new Dialog({
               'resource' : 'PlatformProgressResource',
               'id' : 'Platform.ReloadingCurrentWorklist',
            });
            ui001.addChild( dialog012 );


            var container036 = new Container({
               'cssClass' : 'mblSimpleMessageText',
               'artifactId' : 'Platform.ReloadCurrentWorklist_container_0',
               'id' : 'awce0c0b72',
            });
            dialog012.addChild( container036 );


            var text075 = new Text({
               'resourceAttribute' : 'progressMsg',
               'editable' : false,
               'artifactId' : 'Platform.ReloadCurrentWorklist_container_0_progressMsg',
               'id' : 'awaa894933',
            });
            container036.addChild( text075 );


            var dialog013 = new Dialog({
               'id' : 'Platform.AdditionalDataFailed',
            });
            ui001.addChild( dialog013 );


            var container037 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.AdditionalDataFailed.container',
               'id' : 'aw275627fb',
            });
            dialog013.addChild( container037 );


            var text076 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.AdditionalDataFailed.text',
               'id' : 'awb25e5b66',
               'value' : MessageService.createStaticMessage('Lookup data could not be downloaded. If you are connected, go to Settings > Refresh Lookup Data.'),
            });
            container037.addChild( text076 );


            var container038 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.AdditionalDataFailed.container2',
               'id' : 'aw309dc3be',
            });
            dialog013.addChild( container038 );


            var button028 = new Button({
               'artifactId' : 'Platform.AdditionalDataFailed.button',
               'id' : 'aw39111677',
               'label' : MessageService.createStaticMessage('OK'),
            });
            var eventHandlers084 = [
               {
                     'method' : 'closeDialogAndShowDefaultViewIfNeeded',
                     'artifactId' : 'Platform.AdditionalDataFailed.eventHandler',
                     'id' : 'awacbc5440',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button028.eventHandlers = eventHandlers084;
            container038.addChild( button028 );


            var dialog014 = new Dialog({
               'resource' : 'PlatformProgressResource',
               'id' : 'Platform.LoadingSystemData',
            });
            ui001.addChild( dialog014 );


            var container039 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.LoadingSystemData_container_0',
               'id' : 'aw13d3cc6a',
            });
            dialog014.addChild( container039 );


            var text077 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadingSystemData_container_0_Downloadingsystemd',
               'id' : 'awfc1b5f79',
               'value' : MessageService.createStaticMessage('Downloading system data.'),
            });
            container039.addChild( text077 );


            var text078 = new Text({
               'resourceAttribute' : 'progressMsg',
               'editable' : false,
               'artifactId' : 'Platform.LoadingSystemData_container_0_progressMsg',
               'id' : 'aw635d9968',
            });
            container039.addChild( text078 );


            var dialog015 = new Dialog({
               'id' : 'Platform.LoadAdditionalDataYesNo',
            });
            ui001.addChild( dialog015 );


            var container040 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0',
               'id' : 'aw22834650',
            });
            dialog015.addChild( container040 );


            var text079 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0_Thelookupdatafor',
               'id' : 'aw89be3f27',
               'value' : MessageService.createStaticMessage('The lookup data for this app must be downloaded. Download it now or later?'),
            });
            container040.addChild( text079 );

            var eventHandlers085 = [
               {
                     'method' : 'theLookupdataText',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0_Thelookupdatafor_eventHandlers_render_setAdditionalDownloadText',
                     'id' : 'aw9051ca24',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            text079.eventHandlers = eventHandlers085;

            var text080 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0_Retrylookupdatafor',
               'id' : 'awb287d1cc',
               'value' : MessageService.createStaticMessage('Lookup data was partially downloaded. Click Retry to download the remaining lookup data. Click Reset to refresh all of the lookup data. Click Close if you are through downloading lookup data.'),
            });
            container040.addChild( text080 );

            var eventHandlers086 = [
               {
                     'method' : 'retrylookupdataText',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0_Retrylookupdatafor_eventHandlers_render_setAdditionalDownloadText',
                     'id' : 'aw5ad2ed31',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            text080.eventHandlers = eventHandlers086;

            var text081 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0_Whenrunninginabr',
               'id' : 'awb757e4d5',
               'value' : MessageService.createStaticMessage('When running in a browser, a maximum of 200 records are downloaded per lookup.'),
            });
            container040.addChild( text081 );

            var eventHandlers087 = [
               {
                     'method' : 'showInPreview',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_0_Whenrunninginabr_eventHandlers_render_showInPreview',
                     'id' : 'awb7d271e9',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            text081.eventHandlers = eventHandlers087;

            var container041 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_container_1',
               'id' : 'aw558476c6',
            });
            dialog015.addChild( container041 );


            var button029 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_Later_button',
               'id' : 'awa2501fe3',
               'label' : MessageService.createStaticMessage('Later'),
            });
            var eventHandlers088 = [
               {
                     'method' : 'closeDialogAndShowDefaultViewIfNeeded',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_Later_button_eventHandlers_click_closeDialogAndShowDefaultViewIfNeeded',
                     'id' : 'aw257121b',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               },
               {
                     'method' : 'setBtLabelLaterOrCancel',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_Retry_button_eventHandlers_render_setBtLabelLaterOrCancel',
                     'id' : 'aw6ece4695',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button029.eventHandlers = eventHandlers088;
            container041.addChild( button029 );


            var button030 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_Now_button',
               'id' : 'aw35a14c11',
               'label' : MessageService.createStaticMessage('Now'),
            });
            var eventHandlers089 = [
               {
                     'method' : 'confirmADDownload',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_Now_button_eventHandlers_click_confirmADDownload',
                     'id' : 'aw7df27335',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               },
               {
                     'method' : 'setBtLabelNowOrRefresh',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_Retry_button_eventHandlers_render_setBtLabelNowOrRefresh',
                     'id' : 'aw83fe125f',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button030.eventHandlers = eventHandlers089;
            container041.addChild( button030 );


            var button031 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.LoadAdditionalDataYesNo_Retry_button',
               'id' : 'aw626b616d',
               'label' : MessageService.createStaticMessage('Retry'),
            });
            var eventHandlers090 = [
               {
                     'method' : 'retryADDownload',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_Retry_button_eventHandlers_click_retryADDownload',
                     'id' : 'aw7bef6fb1',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               },
               {
                     'method' : 'renderRetryButton',
                     'artifactId' : 'Platform.LoadAdditionalDataYesNo_Retry_button_eventHandlers_render_retryADDownload',
                     'id' : 'awfa4998f7',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button031.eventHandlers = eventHandlers090;
            container041.addChild( button031 );


            var dialog016 = new Dialog({
               'id' : 'Platform.LoadAdditionalDataDeltaDownload',
            });
            ui001.addChild( dialog016 );


            var container042 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0',
               'id' : 'aw79883531',
            });
            dialog016.addChild( container042 );


            var text082 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0_Thelookupdatafor',
               'id' : 'aw3d94f20f',
               'value' : MessageService.createStaticMessage('Click Changes to download only lookup data changes.'),
            });
            container042.addChild( text082 );


            var text083 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0_Retrylookupdatafor',
               'id' : 'awa0f7541',
               'value' : MessageService.createStaticMessage('Click All to download all the lookup data.'),
            });
            container042.addChild( text083 );


            var text084 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0_cancel',
               'id' : 'aw62270e4c',
               'value' : MessageService.createStaticMessage('Click Cancel to cancel the lookup download.'),
            });
            container042.addChild( text084 );


            var text085 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0_action',
               'id' : 'aw73fd47ac',
               'value' : MessageService.createStaticMessage('Which refresh do you want to perform?'),
            });
            container042.addChild( text085 );


            var text086 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0_Whenrunninginabr',
               'id' : 'aw37d29fd',
               'value' : MessageService.createStaticMessage('When running in a browser, a maximum of 200 records are downloaded per lookup.'),
            });
            container042.addChild( text086 );

            var eventHandlers091 = [
               {
                     'method' : 'showInPreview',
                     'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_0_Whenrunninginabr_eventHandlers_render_showInPreview',
                     'id' : 'aw1edf10f3',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            text086.eventHandlers = eventHandlers091;

            var container043 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_container_1',
               'id' : 'awe8f05a7',
            });
            dialog016.addChild( container043 );


            var button032 = new Button({
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_Cancel_button',
               'id' : 'awb2f881ae',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers092 = [
               {
                     'method' : 'closeDialogAndShowDefaultViewIfNeeded',
                     'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_Later_button_eventHandlers_click_closeDialogAndShowDefaultViewIfNeeded',
                     'id' : 'awcaa29f5a',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button032.eventHandlers = eventHandlers092;
            container043.addChild( button032 );


            var button033 = new Button({
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_RefreshAll_button',
               'id' : 'aw8ab2882',
               'label' : MessageService.createStaticMessage('All'),
            });
            var eventHandlers093 = [
               {
                     'method' : 'confirmADDownload',
                     'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_Now_button_eventHandlers_click_confirmADDownload',
                     'id' : 'awa5526bd4',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button033.eventHandlers = eventHandlers093;
            container043.addChild( button033 );


            var button034 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_RefreshChanges_button',
               'id' : 'aw9c0cf49a',
               'label' : MessageService.createStaticMessage('Changes'),
            });
            var eventHandlers094 = [
               {
                     'method' : 'confirmADDeltaDownload',
                     'artifactId' : 'Platform.LoadAdditionalDataDeltaDownload_Later_button_eventHandlers_click_confirmADDeltaDownload',
                     'id' : 'aw46619626',
                     'event' : 'click',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            button034.eventHandlers = eventHandlers094;
            container043.addChild( button034 );


            var dialog017 = new Dialog({
               'id' : 'Platform.LoadSystemDataDeltaDownload',
            });
            ui001.addChild( dialog017 );


            var container044 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0',
               'id' : 'aw47beed1c',
            });
            dialog017.addChild( container044 );


            var text087 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0_Thelookupdatafor',
               'id' : 'aw682ebd2f',
               'value' : MessageService.createStaticMessage('Click Changes to download only the system data changes.'),
            });
            container044.addChild( text087 );


            var text088 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0_Retrylookupdatafor',
               'id' : 'aw79e85858',
               'value' : MessageService.createStaticMessage('Click All to download all the system data.'),
            });
            container044.addChild( text088 );


            var text089 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0_cancel',
               'id' : 'awcb50ae6',
               'value' : MessageService.createStaticMessage('Click Cancel to cancel the system download.'),
            });
            container044.addChild( text089 );


            var text090 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0_action',
               'id' : 'aw1d6f4306',
               'value' : MessageService.createStaticMessage('Which refresh do you want to perform?'),
            });
            container044.addChild( text090 );


            var text091 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0_Whenrunninginabr',
               'id' : 'aw56c766dd',
               'value' : MessageService.createStaticMessage('When running in a browser, a maximum of 200 records are downloaded per System.'),
            });
            container044.addChild( text091 );

            var eventHandlers095 = [
               {
                     'method' : 'showInPreview',
                     'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_0_Whenrunninginabr_eventHandlers_render_showInPreview',
                     'id' : 'aw37b2ac2a',
                     'event' : 'render',
                     'class' : 'platform.handlers.AdditionalDataDialogHandler',
               }
            ];
            text091.eventHandlers = eventHandlers095;

            var container045 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_container_1',
               'id' : 'aw30b9dd8a',
            });
            dialog017.addChild( container045 );


            var button035 = new Button({
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_Cancel_button',
               'id' : 'aw1adabf91',
               'label' : MessageService.createStaticMessage('cancel'),
            });
            var eventHandlers096 = [
               {
                     'method' : 'closeDialogAndShowDefaultViewIfNeeded',
                     'artifactId' : 'Platform.LoadSystemDataDeltaDownload_Later_button_eventHandlers_click_closeDialogAndShowDefaultViewIfNeeded',
                     'id' : 'aw2569598a',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            button035.eventHandlers = eventHandlers096;
            container045.addChild( button035 );


            var button036 = new Button({
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_RefreshAll_button',
               'id' : 'awf1a96515',
               'label' : MessageService.createStaticMessage('All'),
            });
            var eventHandlers097 = [
               {
                     'method' : 'downloadSystemData',
                     'artifactId' : 'Platform.LoadSystemDataDeltaDownload_Now_button_eventHandlers_click_confirmdownloadSystemData',
                     'id' : 'aw8d600b10',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            button036.eventHandlers = eventHandlers097;
            container045.addChild( button036 );


            var button037 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.LoadSystemDataDeltaDownload_RefreshChanges_button',
               'id' : 'aw328e1b2e',
               'label' : MessageService.createStaticMessage('Changes'),
            });
            var eventHandlers098 = [
               {
                     'method' : 'confirmSystemDataDeltaDownload',
                     'artifactId' : 'Platform.LoadSystemDataDeltaDownload_Later_button_eventHandlers_click_confirmSystemDataDeltaDownload',
                     'id' : 'awbd23e928',
                     'event' : 'click',
                     'class' : 'platform.handlers.SettingsHandler',
               }
            ];
            button037.eventHandlers = eventHandlers098;
            container045.addChild( button037 );


            var dialog018 = new Dialog({
               'id' : 'Platform.ExitApplicationPrompt',
            });
            ui001.addChild( dialog018 );


            var container046 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.ExitApplicationPrompt_container_0',
               'id' : 'aw71d2ddca',
            });
            dialog018.addChild( container046 );


            var text092 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.ExitApplicationPrompt_container_0_Doyouwanttoclose',
               'id' : 'aw4e0184c3',
               'value' : MessageService.createStaticMessage('Do you want to close the app?'),
            });
            container046.addChild( text092 );


            var container047 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.ExitApplicationPrompt_container_1',
               'id' : 'aw6d5ed5c',
            });
            dialog018.addChild( container047 );


            var button038 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.ExitApplicationPrompt_Yes_button',
               'id' : 'aw3bff816',
               'label' : MessageService.createStaticMessage('Yes'),
            });
            var eventHandlers099 = [
               {
                     'method' : 'processDialog',
                     'artifactId' : 'Platform.ExitApplicationPrompt_Yes_button_eventHandlers_click_processDialog',
                     'id' : 'awfa220200',
                     'event' : 'click',
                     'class' : 'platform.handlers.DialogHandler',
               }
            ];
            button038.eventHandlers = eventHandlers099;
            container047.addChild( button038 );


            var button039 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.ExitApplicationPrompt_No_button',
               'id' : 'aw5ba5c9da',
               'label' : MessageService.createStaticMessage('No'),
            });
            var eventHandlers100 = [
               {
                     'method' : 'closeDialog',
                     'artifactId' : 'Platform.ExitApplicationPrompt_No_button_eventHandlers_click_closeDialog',
                     'id' : 'aw5256cc3',
                     'event' : 'click',
                     'class' : 'platform.handlers.DialogHandler',
               }
            ];
            button039.eventHandlers = eventHandlers100;
            container047.addChild( button039 );


            var dialog019 = new Dialog({
               'id' : 'Platform.LogOutPrompt',
            });
            ui001.addChild( dialog019 );


            var container048 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.LogOutPrompt_container_0',
               'id' : 'awcf20d41b',
            });
            dialog019.addChild( container048 );


            var text093 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.LogOutPrompt_container_0_Doyouwanttologo',
               'id' : 'aw15a96005',
               'value' : MessageService.createStaticMessage('Do you want to log out of the app?'),
            });
            container048.addChild( text093 );


            var container049 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.LogOutPrompt_container_1',
               'id' : 'awb827e48d',
            });
            dialog019.addChild( container049 );


            var button040 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.LogOutPrompt_No_button',
               'id' : 'awfbbbd446',
               'label' : MessageService.createStaticMessage('No'),
            });
            var eventHandlers101 = [
               {
                     'method' : 'closeDialog',
                     'artifactId' : 'Platform.LogOutPrompt_No_button_eventHandlers_click_closeDialog',
                     'id' : 'aw364ad2c7',
                     'event' : 'click',
                     'class' : 'platform.handlers.DialogHandler',
               }
            ];
            button040.eventHandlers = eventHandlers101;
            container049.addChild( button040 );


            var button041 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.LogOutPrompt_Yes_button',
               'id' : 'awfaa63964',
               'label' : MessageService.createStaticMessage('Yes'),
            });
            var eventHandlers102 = [
               {
                     'method' : 'logoutDialog',
                     'artifactId' : 'Platform.LogOutPrompt_Yes_button_eventHandlers_click_logoutDialog',
                     'id' : 'aw82db52a6',
                     'event' : 'click',
                     'class' : 'platform.handlers.DialogHandler',
               }
            ];
            button041.eventHandlers = eventHandlers102;
            container049.addChild( button041 );


            var dialog020 = new Dialog({
               'cssClass' : 'dialogDurationLookup',
               'resource' : 'PlatformDateLookupResource',
               'id' : 'Platform.DurationLookup',
               'label' : MessageService.createStaticMessage('Change Duration'),
            });
            ui001.addChild( dialog020 );

            var eventHandlers103 = [
               {
                     'method' : 'initLookup',
                     'artifactId' : 'Platform.DurationLookup_eventHandlers_show_initLookup',
                     'id' : 'aw2898d5b1',
                     'event' : 'show',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            dialog020.eventHandlers = eventHandlers103;

            var container050 = new Container({
               'artifactId' : 'Platform.DurationLookup_container_0',
               'id' : 'awc7b6d6e2',
            });
            dialog020.addChild( container050 );


            var durationpicker001 = new DurationPicker({
               'artifactId' : 'Platform.DurationLookup_durationpicker_0',
               'id' : 'awbdafea4f',
            });
            container050.addChild( durationpicker001 );


            var container051 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.DurationLookup_container_1',
               'id' : 'awb0b1e674',
            });
            dialog020.addChild( container051 );


            var button042 = new Button({
               'artifactId' : 'Platform.DurationLookup_Cancel_button',
               'id' : 'aw21ee1a8e',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers104 = [
               {
                     'method' : 'Cancel',
                     'artifactId' : 'Platform.DurationLookup_Cancel_button_eventHandlers_click_Cancel',
                     'id' : 'aw7fc46e19',
                     'event' : 'click',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            button042.eventHandlers = eventHandlers104;
            container051.addChild( button042 );


            var button043 = new Button({
               'artifactId' : 'Platform.DurationLookup_Clear_button',
               'id' : 'awab5a917f',
               'label' : MessageService.createStaticMessage('Clear'),
            });
            var eventHandlers105 = [
               {
                     'method' : 'Clear',
                     'artifactId' : 'Platform.DurationLookup_Clear_button_eventHandlers_click_Clear',
                     'id' : 'aw4d23bc8f',
                     'event' : 'click',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            button043.eventHandlers = eventHandlers105;
            container051.addChild( button043 );


            var button044 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.DurationLookup_OK_button',
               'id' : 'aw7a6484f6',
               'label' : MessageService.createStaticMessage('OK'),
               'primary' : 'true',
            });
            var eventHandlers106 = [
               {
                     'method' : 'SetSelection',
                     'artifactId' : 'Platform.DurationLookup_OK_button_eventHandlers_click_SetSelection',
                     'id' : 'aweb8ce178',
                     'event' : 'click',
                     'class' : 'platform.handlers.LookupHandler',
               }
            ];
            button044.eventHandlers = eventHandlers106;
            container051.addChild( button044 );


            var dialog021 = new Dialog({
               'id' : 'Platform.CancelDownload',
            });
            ui001.addChild( dialog021 );


            var container052 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.CancelDownload_container_0',
               'id' : 'awf839de44',
            });
            dialog021.addChild( container052 );


            var text094 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.CancelDownload_container_0_Doyouwanttostop',
               'id' : 'awdb2316b3',
               'value' : MessageService.createStaticMessage('Do you want to stop downloading work list records?'),
            });
            container052.addChild( text094 );


            var container053 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.CancelDownload_container_1',
               'id' : 'aw8f3eeed2',
            });
            dialog021.addChild( container053 );


            var button045 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.CancelDownload_Yes_button',
               'id' : 'aw3b97968f',
               'label' : MessageService.createStaticMessage('Yes'),
            });
            var eventHandlers107 = [
               {
                     'method' : 'cancelDownload',
                     'artifactId' : 'Platform.CancelDownload_Yes_button_eventHandlers_click_cancelDownload',
                     'id' : 'awadc6ff1d',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button045.eventHandlers = eventHandlers107;
            container053.addChild( button045 );


            var button046 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.CancelDownload_No_button',
               'id' : 'awab099478',
               'label' : MessageService.createStaticMessage('No'),
            });
            var eventHandlers108 = [
               {
                     'method' : 'closeDialog',
                     'artifactId' : 'Platform.CancelDownload_No_button_eventHandlers_click_closeDialog',
                     'id' : 'aw9ceda703',
                     'event' : 'click',
                     'class' : 'platform.handlers.DialogHandler',
               }
            ];
            button046.eventHandlers = eventHandlers108;
            container053.addChild( button046 );


            var dialog022 = new Dialog({
               'id' : 'Platform.ConfirmClearChanges',
            });
            ui001.addChild( dialog022 );


            var container054 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.ConfirmClearChanges_container_0',
               'id' : 'aw3965500f',
            });
            dialog022.addChild( container054 );


            var text095 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.ConfirmClearChanges_container_0_Changesthathaveno',
               'id' : 'aw66e22f87',
               'value' : MessageService.createStaticMessage('Changes that have not been sent to the server will be discarded.'),
            });
            container054.addChild( text095 );


            var container055 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.ConfirmClearChanges_container_1',
               'id' : 'aw4e626099',
            });
            dialog022.addChild( container055 );


            var button047 = new Button({
               'artifactId' : 'Platform.ConfirmClearChanges_Cancel_button',
               'id' : 'awcee54fe9',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers109 = [
               {
                     'method' : 'cancelClearChanges',
                     'artifactId' : 'Platform.ConfirmClearChanges_Cancel_button_eventHandlers_click_cancelClearChanges',
                     'id' : 'awb208eba2',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button047.eventHandlers = eventHandlers109;
            container055.addChild( button047 );


            var button048 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.ConfirmClearChanges_OK_button',
               'id' : 'aw8a3b05f2',
               'label' : MessageService.createStaticMessage('OK'),
            });
            var eventHandlers110 = [
               {
                     'method' : 'doClearChanges',
                     'artifactId' : 'Platform.ConfirmClearChanges_OK_button_eventHandlers_click_doClearChanges',
                     'id' : 'aw32f778d4',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button048.eventHandlers = eventHandlers110;
            container055.addChild( button048 );


            var dialog023 = new Dialog({
               'resource' : 'PlatformProgressResource',
               'id' : 'Platform.DownloadCurrentWorklist',
            });
            ui001.addChild( dialog023 );


            var container056 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.DownloadCurrentWorklist_container_0',
               'id' : 'awfd35c5df',
            });
            dialog023.addChild( container056 );


            var text096 = new Text({
               'resourceAttribute' : 'progressMsg',
               'editable' : false,
               'artifactId' : 'Platform.DownloadCurrentWorklist_container_0_progressMsg',
               'id' : 'aw3c55ae56',
            });
            container056.addChild( text096 );


            var container057 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.DownloadCurrentWorklist_container_1',
               'id' : 'aw8a32f549',
            });
            dialog023.addChild( container057 );


            var button049 = new Button({
               'artifactId' : 'Platform.DownloadCurrentWorklist_Cancel_button',
               'id' : 'awcfb8296d',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers111 = [
               {
                     'method' : 'cancelDownload',
                     'artifactId' : 'Platform.DownloadCurrentWorklist_Cancel_button_eventHandlers_click_cancelDownload',
                     'id' : 'aw5541afbb',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button049.eventHandlers = eventHandlers111;
            container057.addChild( button049 );


            var dialog024 = new Dialog({
               'id' : 'Platform.NoRecordFoundDialog',
            });
            ui001.addChild( dialog024 );


            var container058 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.NoRecordFoundDialog_container_0',
               'id' : 'awa73a1c57',
            });
            dialog024.addChild( container058 );


            var text097 = new Text({
               'artifactId' : 'Platform.NoRecordFoundDialog_container_0_Stopthetimeronwo',
               'id' : 'awd6cf8f25',
               'value' : MessageService.createStaticMessage('No record was found. If you are working offline, try downloading worklist when online to access your workorder'),
            });
            container058.addChild( text097 );


            var container059 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.NoRecordFoundDialog_container_1',
               'id' : 'awd03d2cc1',
            });
            dialog024.addChild( container059 );


            var button050 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.NoRecordFoundDialog_OK_button',
               'id' : 'aw3de0cad2',
               'label' : MessageService.createStaticMessage('Close'),
            });
            var eventHandlers112 = [
               {
                     'method' : 'closeNoRecord',
                     'artifactId' : 'Platform.NoRecordFoundDialog_OK_button_multiple',
                     'id' : 'aw41a4b840',
                     'event' : 'click',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               }
            ];
            button050.eventHandlers = eventHandlers112;
            container059.addChild( button050 );


            var dialog025 = new Dialog({
               'id' : 'Platform.MultiplePushNotificationDialog',
            });
            ui001.addChild( dialog025 );


            var container060 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.MultiplePushNotificationDialog_container_0',
               'id' : 'aw7b338e5e',
            });
            dialog025.addChild( container060 );


            var text098 = new Text({
               'artifactId' : 'Platform.MultiplePushNotificationDialog_container_0_Stopthetimeronwo',
               'id' : 'aw72fc5fcc',
               'value' : MessageService.createStaticMessage('Multiple notification were recieved. Go to notification view to access them.'),
            });
            container060.addChild( text098 );


            var container061 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.MultiplePushNotificationDialog_container_1',
               'id' : 'awc34bec8',
            });
            dialog025.addChild( container061 );


            var button051 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.MultiplePushNotificationDialog_OK_button',
               'id' : 'awc2c9277e',
               'label' : MessageService.createStaticMessage('Close'),
            });
            var eventHandlers113 = [
               {
                     'method' : 'close',
                     'artifactId' : 'Platform.MultiplePushNotificationDialog_OK_button_multiple',
                     'id' : 'awe5002e8b',
                     'event' : 'click',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               }
            ];
            button051.eventHandlers = eventHandlers113;
            container061.addChild( button051 );


            var dialog026 = new Dialog({
               'resource' : 'PlatformTempPushNotification',
               'id' : 'Platform.PushNotificationDialog',
            });
            ui001.addChild( dialog026 );


            var container062 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.PushNotificationDialog_container_0',
               'id' : 'awb0eedc9',
            });
            dialog026.addChild( container062 );


            var text099 = new Text({
               'artifactId' : 'Platform.PushNotificationDialog_container_0_Stopthetimeronwo',
               'id' : 'aw35fc28ff',
               'value' : MessageService.createDynamicMessage('{0} {1} {2}', 'platform.handlers.PushNotificationDialogHandler', 'resolveMessageProps'),
               'resolverFunction' : 'resolveMessageProps',
               'resolverClass' : 'platform.handlers.PushNotificationDialogHandler',
            });
            container062.addChild( text099 );


            var container063 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.PushNotificationDialog_container_1',
               'id' : 'aw7c09dd5f',
            });
            dialog026.addChild( container063 );


            var button052 = new Button({
               'artifactId' : 'Platform.PushNotificationDialog_Open_button',
               'id' : 'aw4151795',
               'label' : MessageService.createStaticMessage('Open'),
            });
            var eventHandlers114 = [
               {
                     'method' : 'openRecord',
                     'artifactId' : 'Platform.PushNotificationDialog_Open_button_eventHandlers_click_WOStartedDialogNoClickHandler',
                     'id' : 'aw32cc643',
                     'event' : 'click',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               },
               {
                     'method' : 'renderOpen',
                     'artifactId' : 'Platform.PushNotificationDialog_Open_button_eventHandlers_render_RenderOpenButton',
                     'id' : 'awff1adc93',
                     'event' : 'render',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               }
            ];
            button052.eventHandlers = eventHandlers114;
            container063.addChild( button052 );


            var button053 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.PushNotificationDialog_OK_button',
               'id' : 'aw3d64070a',
               'label' : MessageService.createStaticMessage('OK'),
            });
            var eventHandlers115 = [
               {
                     'method' : 'close',
                     'artifactId' : 'Platform.PushNotificationDialog_OK_button_eventHandlers_click_WOStartedDialogYesClickHandler',
                     'id' : 'aw40f88c32',
                     'event' : 'click',
                     'class' : 'platform.handlers.PushNotificationDialogHandler',
               }
            ];
            button053.eventHandlers = eventHandlers115;
            container063.addChild( button053 );


            var dialog027 = new Dialog({
               'resource' : 'PlatformDemoModeResource',
               'id' : 'Platform.DemoDownloadWarning',
            });
            ui001.addChild( dialog027 );


            var container064 = new Container({
               'cssClass' : 'mblSimpleDialogText',
               'artifactId' : 'Platform.DemoDownloadWarning_container_0',
               'id' : 'awf840ab79',
            });
            dialog027.addChild( container064 );


            var text100 = new Text({
               'editable' : false,
               'artifactId' : 'Platform.DemoDownloadWarning_container_0_progressMsg',
               'id' : 'awf3cb0903',
               'value' : MessageService.createStaticMessage('MessageText'),
            });
            container064.addChild( text100 );


            var container065 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.DemoDownloadWarning_container_1',
               'id' : 'aw8f479bef',
            });
            dialog027.addChild( container065 );


            var button054 = new Button({
               'artifactId' : 'Platform.DemoDownloadWarning_Continue_button',
               'id' : 'aw2659f8c8',
               'label' : MessageService.createStaticMessage('Continue'),
            });
            var eventHandlers116 = [
               {
                     'method' : 'doClearChanges',
                     'artifactId' : 'Platform.DemoDownloadWarning_Continue_button_eventHandlers_click_doClearChanges',
                     'id' : 'awbdf1879f',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button054.eventHandlers = eventHandlers116;
            container065.addChild( button054 );


            var button055 = new Button({
               'artifactId' : 'Platform.DemoDownloadWarning_Cancel_button',
               'id' : 'aw9def7b28',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers117 = [
               {
                     'method' : 'cancelDownload',
                     'artifactId' : 'Platform.DemoDownloadWarning_Cancel_button_eventHandlers_click_cancelDownload',
                     'id' : 'awd4960a86',
                     'event' : 'click',
                     'class' : 'platform.handlers.WorkOfflineHandler',
               }
            ];
            button055.eventHandlers = eventHandlers117;
            container065.addChild( button055 );


            var dialog028 = new Dialog({
               'resource' : 'PlatformEsigResource',
               'id' : 'Platform.EsigLoginView',
               'label' : MessageService.createStaticMessage('Electronic Signature Authentication'),
            });
            ui001.addChild( dialog028 );

            var requiredResources017 = {
               'attemptResultDomain' : {
                  'enableFeatureByProperty' : 'esig.enabled',
                  'artifactId' : 'Platform.EsigLoginView_attemptResultDomain',
                  'id' : 'aw3c53638b',
               },
            };
            dialog028.addRequiredResources( requiredResources017 );

            var container066 = new Container({
               'artifactId' : 'Platform.EsigLoginView_container_0',
               'id' : 'aw44fd9611',
            });
            dialog028.addChild( container066 );


            var group010 = new Group({
               'artifactId' : 'Platform.EsigLoginView_group_0',
               'id' : 'aw7bf6135f',
            });
            container066.addChild( group010 );


            var groupitem024 = new GroupItem({
               'artifactId' : 'Platform.EsigLoginView_group_0_groupitem_1',
               'id' : 'aw209714b9',
            });
            group010.addChild( groupitem024 );


            var text101 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'userName',
               'cssClass' : 'loginUsername',
               'editable' : false,
               'artifactId' : 'Platform.EsigLoginView_container_0_username',
               'id' : 'aw15aabb30',
               'label' : MessageService.createStaticMessage('User Name'),
               'placeHolder' : MessageService.createStaticMessage('User name'),
            });
            groupitem024.addChild( text101 );


            var text102 = new Text({
               'border' : 'true',
               'resourceAttribute' : 'password',
               'cssClass' : 'loginPassword',
               'editable' : true,
               'artifactId' : 'Platform.EsigLoginView_container_0_password',
               'id' : 'awd836fb92',
               'label' : MessageService.createStaticMessage('Password'),
               'type' : 'password',
               'placeHolder' : MessageService.createStaticMessage('Password'),
               'required' : true,
            });
            groupitem024.addChild( text102 );


            var text103 = new Text({
               'resourceAttribute' : 'reason',
               'cssClass' : 'loginUsername',
               'editable' : true,
               'artifactId' : 'Platform.EsigLoginView_container_0_reason',
               'id' : 'aw6ccf562d',
               'label' : MessageService.createStaticMessage('Reason for Change'),
               'placeHolder' : MessageService.createStaticMessage('Reason for Change'),
               'required' : true,
            });
            groupitem024.addChild( text103 );


            var container067 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.EsigLoginView_footer',
               'id' : 'aw68d6d11c',
            });
            dialog028.addChild( container067 );


            var button056 = new Button({
               'artifactId' : 'Platform.EsigLoginView_Cancel_button',
               'id' : 'aw68a36a2b',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers118 = [
               {
                     'method' : 'cancelEsig',
                     'artifactId' : 'Platform.EsigLoginView_Cancel_button_eventHandlers_click_cancelEsig',
                     'id' : 'awdba9800d',
                     'event' : 'click',
                     'class' : 'platform.handlers.EsigHandler',
               }
            ];
            button056.eventHandlers = eventHandlers118;
            container067.addChild( button056 );


            var button057 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.EsigLoginView_Save_button',
               'id' : 'awef41b275',
               'label' : MessageService.createStaticMessage('OK'),
               'primary' : 'true',
            });
            var eventHandlers119 = [
               {
                     'method' : 'submitEsig',
                     'artifactId' : 'Platform.EsigLoginView_Save_button_eventHandlers_click_submitEsig',
                     'id' : 'awa9f3497f',
                     'event' : 'click',
                     'class' : 'platform.handlers.EsigHandler',
               }
            ];
            button057.eventHandlers = eventHandlers119;
            container067.addChild( button057 );

            var eventHandlers120 = [
               {
                     'method' : 'initializeEsig',
                     'artifactId' : 'Platform.EsigLoginView_eventHandlers_show_initializeEsig',
                     'id' : 'aw681e6384',
                     'event' : 'show',
                     'class' : 'platform.handlers.EsigHandler',
               }
            ];
            dialog028.eventHandlers = eventHandlers120;

            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating View: ' + 'Platform.Signature', false);
               trackTimer.startTracking();
            }

            var view019 = new View({
               'id' : 'Platform.Signature',
               'label' : MessageService.createStaticMessage('Capture Real Signature'),
            });
            ui001.addChild( view019 );

            var requiredResources018 = {
               'PlatformAttachmentInfoResource' : {
                  'artifactId' : 'Platform.Signature_PlatformAttachmentInfoResource',
                  'id' : 'aw8cc44736',
               },
            };
            view019.addRequiredResources( requiredResources018 );

            var footer005 = new Footer({
               'artifactId' : 'Platform.Signature_footer',
               'id' : 'aw16b9ee39',
            });
            view019.addChild( footer005 );


            var button058 = new Button({
               'artifactId' : 'Platform.Signature_Cancel_button',
               'id' : 'aw9088fe5b',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers121 = [
               {
                     'method' : 'cancelSignature',
                     'artifactId' : 'Platform.Signature_Cancel_button_eventHandlers_click_handleBackButtonClickEditAssetView',
                     'id' : 'awc27cd6a4',
                     'event' : 'click',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            button058.eventHandlers = eventHandlers121;
            footer005.addChild( button058 );


            var button059 = new Button({
               'artifactId' : 'Platform.Signature_Clear_button',
               'id' : 'awc6576044',
               'label' : MessageService.createStaticMessage('Clear'),
            });
            var eventHandlers122 = [
               {
                     'method' : 'clearSignature',
                     'artifactId' : 'Platform.Signature_Clear_button_eventHandlers_click_handleBackButtonClickEditAssetView',
                     'id' : 'aw90653ab1',
                     'event' : 'click',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            button059.eventHandlers = eventHandlers122;
            footer005.addChild( button059 );


            var button060 = new Button({
               'cssClass' : 'mblPrimaryButton',
               'artifactId' : 'Platform.Signature_Save_button',
               'id' : 'awbc1f2293',
               'label' : MessageService.createStaticMessage('Save'),
               'primary' : 'true',
            });
            var eventHandlers123 = [
               {
                     'method' : 'saveSignature',
                     'artifactId' : 'Platform.Signature_Save_button_eventHandlers_click_saveSignature',
                     'id' : 'aw7d8e432b',
                     'event' : 'click',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            button060.eventHandlers = eventHandlers123;
            footer005.addChild( button060 );

            var eventHandlers124 = [
               {
                     'method' : 'initSignature',
                     'artifactId' : 'Platform.Signature_eventHandlers_show_initStopWorkView',
                     'id' : 'awb8cf4cb7',
                     'event' : 'initialize',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            view019.eventHandlers = eventHandlers124;
            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }

            var dialog029 = new Dialog({
               'id' : 'Platform.SignatureDialog',
            });
            ui001.addChild( dialog029 );


            var container068 = new Container({
               'cssClass' : 'mblSimpleDialogFooter',
               'artifactId' : 'Platform.SignatureDialog_container_buttons',
               'id' : 'aw91450791',
            });
            dialog029.addChild( container068 );


            var button061 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.SignatureDialog_container_buttons_Cancel_button',
               'id' : 'aw51ebe6e8',
               'label' : MessageService.createStaticMessage('Cancel'),
            });
            var eventHandlers125 = [
               {
                     'method' : 'cancelSignatureDialog',
                     'artifactId' : 'Platform.SignatureDialog_container_buttons_Cancel_button_eventHandlers_click_handleBackButtonClickEditAssetView',
                     'id' : 'aw198ca753',
                     'event' : 'click',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            button061.eventHandlers = eventHandlers125;
            container068.addChild( button061 );


            var button062 = new Button({
               'cssClass' : 'dialogButton',
               'artifactId' : 'Platform.SignatureDialog_container_buttons_clear_button',
               'id' : 'awdc63a382',
               'label' : MessageService.createStaticMessage('Clear'),
            });
            var eventHandlers126 = [
               {
                     'method' : 'clearSignature',
                     'artifactId' : 'Platform.SignatureDialog_container_buttons_clear_button_eventHandlers_click_handleBackButtonClickEditAssetView',
                     'id' : 'aw72eacc40',
                     'event' : 'click',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            button062.eventHandlers = eventHandlers126;
            container068.addChild( button062 );


            var button063 = new Button({
               'cssClass' : 'mblPrimaryButton dialogButton',
               'artifactId' : 'Platform.SignatureDialog_container_buttons_Save_button',
               'id' : 'awd4941650',
               'label' : MessageService.createStaticMessage('Save'),
               'primary' : 'true',
            });
            var eventHandlers127 = [
               {
                     'method' : 'saveSignature',
                     'artifactId' : 'Platform.SignatureDialog_container_buttons_Save_button_eventHandlers_click_saveSignature',
                     'id' : 'awa59c7577',
                     'event' : 'click',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            button063.eventHandlers = eventHandlers127;
            container068.addChild( button063 );

            var eventHandlers128 = [
               {
                     'method' : 'initSignature',
                     'artifactId' : 'Platform.SignatureDialog_eventHandlers_show_initStopWorkView',
                     'id' : 'aw71e7bce4',
                     'event' : 'show',
                     'class' : 'platform.signature.handler.SignatureHandler',
               }
            ];
            dialog029.eventHandlers = eventHandlers128;
            app001.addHandler( {name : 'application.handlers.InventoryHandler', 'class': new InventoryHandler()} );
            app001.addHandler( {name : 'platform.handlers.AdditionalDataDialogHandler', 'class': new AdditionalDataDialogHandler()} );
            app001.addHandler( {name : 'platform.handlers.AttachmentHandler', 'class': new AttachmentHandler()} );
            app001.addHandler( {name : 'platform.handlers.ChangePasswordHandler', 'class': new ChangePasswordHandler()} );
            app001.addHandler( {name : 'platform.handlers.CreateQueryBaseHandler', 'class': new CreateQueryBaseHandler()} );
            app001.addHandler( {name : 'platform.handlers.DialogHandler', 'class': new DialogHandler()} );
            app001.addHandler( {name : 'platform.handlers.EsigHandler', 'class': new EsigHandler()} );
            app001.addHandler( {name : 'platform.handlers.LoginHandler', 'class': new LoginHandler()} );
            app001.addHandler( {name : 'platform.handlers.LookupHandler', 'class': new LookupHandler()} );
            app001.addHandler( {name : 'platform.handlers.PseudoOfflineModeHandler', 'class': new PseudoOfflineModeHandler()} );
            app001.addHandler( {name : 'platform.handlers.PushNotificationDialogHandler', 'class': new PushNotificationDialogHandler()} );
            app001.addHandler( {name : 'platform.handlers.SSOHandler', 'class': new SSOHandler()} );
            app001.addHandler( {name : 'platform.handlers.SettingsHandler', 'class': new SettingsHandler()} );
            app001.addHandler( {name : 'platform.handlers.WorkOfflineHandler', 'class': new WorkOfflineHandler()} );
            app001.addHandler( {name : 'platform.handlers._ApplicationHandlerBase', 'class': new _ApplicationHandlerBase()} );
            app001.addHandler( {name : 'platform.logging.handler.LoggerReportHandler', 'class': new LoggerReportHandler()} );
            app001.addHandler( {name : 'platform.performance.handler.TimeTrackHandler', 'class': new TimeTrackHandler()} );
            app001.addHandler( {name : 'platform.signature.handler.SignatureHandler', 'class': new SignatureHandler()} );


            if (trackTimeEnabled) {
               var trackTimer = new TrackTime('ApplicationUIBuilder', 'build', 'Creating Resources in ApplicationUIBuilder', false);
               trackTimer.startTracking();
            }
            var that001 = this;
            all([
               app001.createResource(null, null, 'PlatformDemoModeResource'),
               app001.createResource(null, null, 'LastADDownload'),
               app001.createResource(null, null, 'DeviceSizeResource'),
               app001.createResource(null, null, 'SSODialogResource'),
               app001.createResource(null, null, 'PlatformLongPressResource'),
               app001.createResource(null, null, 'PlatformDateLookupResource')
            ]).then(
               function(){
                  that001.addApplication( app001 );
               }
            );

            if (trackTimeEnabled) {
               trackTimer.stopTracking();
            }
            console.log('Finished Creating App');
         }
      });
});
