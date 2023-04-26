/* 
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */
 
//----------------------------------------------------------------//
// This is auto generated code. Do not modify it manually.
// Product and Version: IBM Maximo Anywhere Version 7.5
// Build: 2023-04-25 12:01:00
//----------------------------------------------------------------//
define(   "generated/application/data/ApplicationStoresBuilder", 
      [
         "dojo/_base/declare", 
         "dojo/promise/all", 
         "platform/boot/data/_StoresBuilderBase", 
         "platform/store/ResourceMetadata", 
         "platform/store/PersistenceManager", 
         "application/business/AttachmentsObject"
      ],

function(declare, all, StoresBuilderBase, ResourceMetadata, PersistenceManager, AttachmentsObject) {
      return declare("generated.application.data.ApplicationStoresBuilder", StoresBuilderBase, {

         _buildStoresAsync : function(promise) {

            var resource001 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformLoginResource',
                  'resourceName' : 'PlatformLoginResource',
                  'id' : 'aw1792f489',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'username',
                  'index' : false,
                  'artifactId' : 'PlatformLoginResource_username_string',
                  'id' : 'awafcbeb63',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'password',
                  'index' : false,
                  'artifactId' : 'PlatformLoginResource_password_string',
                  'id' : 'awe076df82',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMsg',
                  'index' : false,
                  'artifactId' : 'PlatformLoginResource_errorMsg_string',
                  'id' : 'awfacff206',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'appName',
                  'index' : false,
                  'artifactId' : 'PlatformLoginResource_appName_string',
                  'id' : 'awb387ae25',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'relogin',
                  'index' : false,
                  'artifactId' : 'PlatformLoginResource_relogin_boolean',
                  'id' : 'aw178aa51a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'localPassword',
                  'index' : false,
                  'artifactId' : 'PlatformLoginResource_localPassword_string',
                  'id' : 'aw1d3649b5',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise001 = PersistenceManager.initCollection( resource001 );


            var resource002 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'SSODialogResource',
                  'resourceName' : 'SSODialogResource',
                  'id' : 'awafe1e4bb',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'platform' : 'true',
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMsg',
                  'index' : false,
                  'artifactId' : 'SSODialogResource_errorMsg_string',
                  'id' : 'awa30b8002',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise002 = PersistenceManager.initCollection( resource002 );


            var resource003 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'DeviceSizeResource',
                  'resourceName' : 'DeviceSizeResource',
                  'id' : 'awbd8820b5',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'platform' : 'true',
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'int',
                  'name' : 'ppi',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_ppi',
                  'id' : 'awa9e12d88',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'int',
                  'name' : 'width',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_width',
                  'id' : 'aw688ff7e6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'int',
                  'name' : 'height',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_height',
                  'id' : 'aw17110aa9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'layoutSize',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_layout',
                  'id' : 'awd8668444',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'orientation',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_orientation',
                  'id' : 'aw4e15b8b4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'density',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_density',
                  'id' : 'awffff30c8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'pane0_layoutSize',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_pane0_layout',
                  'id' : 'aw82cbe800',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'pane1_layoutSize',
                  'index' : false,
                  'artifactId' : 'DeviceSizeResource_pane1_layout',
                  'id' : 'aw4e61e89e',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise003 = PersistenceManager.initCollection( resource003 );


            var resource004 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'transfersResource',
                  'resourceName' : 'transfers',
                  'id' : 'awc093ca9d',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'transfers_siteid_string',
                  'id' : 'aw65b47e4b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'storeroom',
                  'index' : false,
                  'artifactId' : 'transfers_storeroom_string',
                  'id' : 'aw8a089bfd',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wotask',
                  'index' : false,
                  'artifactId' : 'transfers_wotask_string',
                  'id' : 'awa315cb04',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'transfers_wonum_string',
                  'id' : 'aw93d78454',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'transfers_asset_string',
                  'id' : 'awc97af86d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'transfers_location_string',
                  'id' : 'aw38cf4d7c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'transfers_domainid_string',
                  'id' : 'aw68c47abc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'transfers_itemnum_string',
                  'id' : 'awdd2da57c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'transfers_itemdesc_string',
                  'id' : 'awe216e6db',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'bin',
                  'index' : false,
                  'artifactId' : 'transfers_bin_string',
                  'id' : 'aw5ea442fa',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'tostoreroom',
                  'index' : false,
                  'artifactId' : 'transfers_tostoreroom_string',
                  'id' : 'aw1fe4e1a3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'tositeid',
                  'index' : false,
                  'artifactId' : 'transfers_tositeid_string',
                  'id' : 'awf9c94b5c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'transfers_ponum_string',
                  'id' : 'awe74f6ddb',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'transfers_polinenum_string',
                  'id' : 'aw368afc8b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'shipment',
                  'index' : false,
                  'artifactId' : 'transfers_shipmentid_string',
                  'id' : 'aw3006e701',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'transfers_status_string',
                  'id' : 'awdc449951',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'searchview',
                  'index' : false,
                  'artifactId' : 'transfers_searchview_string',
                  'id' : 'awa1874a26',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : false,
                  'artifactId' : 'transfers_formnumber_string',
                  'id' : 'aw3bbec227',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'transfers_formno_string',
                  'id' : 'awe1c8354a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'modelnumref',
                  'index' : false,
                  'artifactId' : 'transfers_modelnumref_string',
                  'id' : 'aw56dd5c81',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : false,
                  'artifactId' : 'transfers_documentref_string',
                  'id' : 'awc5b2ce3f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'storeroomoffs',
                  'index' : false,
                  'artifactId' : 'transfers_storeroom_offs_boolean',
                  'id' : 'aw6fb24948',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'tostoreroomoffs',
                  'index' : false,
                  'artifactId' : 'transfers_tostoreroom_offs_boolean',
                  'id' : 'aw8d255c3a',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise004 = PersistenceManager.initCollection( resource004 );


            var resource005 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'transferAdditionalItemsResource',
                  'resourceName' : 'transferAdditionalItems',
                  'id' : 'awd17a8380',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_wonum_string',
                  'id' : 'aw185108ef',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_asset_string',
                  'id' : 'aw42fc74d6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_location_string',
                  'id' : 'aw6229ad54',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_domainid_string',
                  'id' : 'aw32229a94',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'taskid',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_taskid_string',
                  'id' : 'aw7501c755',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'issueQty',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_issueQty_string',
                  'id' : 'awea47f39e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueTo',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_issueTo_string',
                  'id' : 'aw9b3e9722',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'tostoreroom',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_tostoreroom_string',
                  'id' : 'aw3ead4200',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'tositeid',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_tositeid_string',
                  'id' : 'awa32fab74',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glcreditacct',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_glcreditacct_string',
                  'id' : 'aw7e19b503',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_gldebitacct_string',
                  'id' : 'aw94344953',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_frombin_string',
                  'id' : 'awfc1343c0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tobin',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_tobin_string',
                  'id' : 'awb1888c17',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'fromlot',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_fromlot_string',
                  'id' : 'aw7cbb271a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tolot',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_tolot_string',
                  'id' : 'aw3120e8cd',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_conversion_double',
                  'id' : 'aw7708a51f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_actualDate_datetime',
                  'id' : 'aw38dcea9c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'frombincurbal',
                  'index' : false,
                  'artifactId' : 'transferAdditionalItems_frombincurbal_string',
                  'id' : 'awb1e3088e',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise005 = PersistenceManager.initCollection( resource005 );


            var resource006 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'transfersAdditionalUsage',
                  'resourceName' : 'transfersAdditionalUsage',
                  'id' : 'aw8dd31330',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : false,
                  'artifactId' : 'transfersAdditionalUsage_formNumber_string',
                  'id' : 'aw7cb65072',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'transfersAdditionalUsage_description_string',
                  'id' : 'aw773355c3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : false,
                  'artifactId' : 'transfersAdditionalUsage_documentref_string',
                  'id' : 'aw13901b0e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'createdate',
                  'index' : false,
                  'artifactId' : 'transfersAdditionalUsage_createdate_datetime',
                  'id' : 'aw5b432adc',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise006 = PersistenceManager.initCollection( resource006 );


            var resource007 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'transfersReservedHeader',
                  'resourceName' : 'transfersReservedHeader',
                  'id' : 'aw685e90d8',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'storeroom',
                  'index' : false,
                  'artifactId' : 'transfersReservedHeader_storeroom_string',
                  'id' : 'aw4bac6c84',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : false,
                  'artifactId' : 'transfersReservedHeader_formNumber_string',
                  'id' : 'awa1d8e4bd',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'transfersReservedHeader_description_string',
                  'id' : 'aw7c35e456',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : false,
                  'artifactId' : 'transfersReservedHeader_documentref_string',
                  'id' : 'aw1896aa9b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'createdate',
                  'index' : false,
                  'artifactId' : 'transfersReservedHeader_createdate_datetime',
                  'id' : 'awdb2d4ba6',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise007 = PersistenceManager.initCollection( resource007 );


            var resource008 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'poExternalResource',
                  'resourceName' : 'poExternalResource',
                  'id' : 'aw89da188',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'poExternalResource_ponum_string',
                  'id' : 'aw1a933801',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'vendor',
                  'index' : false,
                  'artifactId' : 'poExternalResource_vendor_string',
                  'id' : 'aw713fd111',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'reset_vendor_on_back',
                  'index' : false,
                  'artifactId' : 'poExternalResource_backvendor_string',
                  'id' : 'aw94b6d30d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'currentprocess',
                  'index' : false,
                  'artifactId' : 'poExternalResource_currentprocess_string',
                  'id' : 'aw443a7f64',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'poExternalResource_formno_string',
                  'id' : 'aw8733d2d5',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise008 = PersistenceManager.initCollection( resource008 );


            var resource009 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'errorResource',
                  'resourceName' : 'errorResource',
                  'id' : 'awaceb2611',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasInvuseError',
                  'index' : false,
                  'artifactId' : 'errorResource_hasInvuseError_boolean',
                  'id' : 'aw15b6c403',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasMatRecError',
                  'index' : false,
                  'artifactId' : 'errorResource_hasMatRecError_boolean',
                  'id' : 'awaa017e4d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasMatRecVoidReturnError',
                  'index' : false,
                  'artifactId' : 'errorResource_hasMatRecVoidReturnError_boolean',
                  'id' : 'aw215ba2d3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasPOExtMatRecError',
                  'index' : false,
                  'artifactId' : 'errorResource_hasPOExtMatRecError_boolean',
                  'id' : 'awa01269e9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasPOListComplexExtMatRecError',
                  'index' : false,
                  'artifactId' : 'errorResource_hasPOListComplexExtMatRecError_boolean',
                  'id' : 'aw5b10f1ea',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise009 = PersistenceManager.initCollection( resource009 );


            var resource010 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'invreserve',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'invreserve',
                  'id' : 'awb26ab0b1',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:displaytaskid,spi:requestnum,spi:description,spi:reservedqty,spi:shippedqty,spi:location,spi:assetnum,spi:glaccount,spi:storelocsiteid,spi:requesteddate,spi:requireddate,spi:orgid,spi:siteid,spi:tostoreloc,spi:ponum,spi:polinenum,spi:porevisionnum,spi:anywhere_formno,spi:item{spi:modelnumref,spi:rotating,oslc:shortTitle},spi:workorder{dcterms:title,oslc:shortTitle},spi:inventory{spi:lotnum,spi:itemsetid,spi:binnum,spi:issueunit,spi:avblbalance}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'taskid',
                  'index' : true,
                  'artifactId' : 'invreserveResource_taskid_spi_wmdisplaytaskid',
                  'id' : 'aw10abfa1f',
                  'local' : false,
                  'remoteName' : 'spi:displaytaskid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'requestnum',
                  'index' : false,
                  'artifactId' : 'invreserveResource_requestnum_spi_wmrequestnum',
                  'id' : 'awdf88f6ff',
                  'local' : false,
                  'remoteName' : 'spi:requestnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'invreserveResource_itemdesc_spi_wmdescription',
                  'id' : 'awf08ae222',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'reservedqty',
                  'index' : false,
                  'artifactId' : 'invreserveResource_quantity_spi_wmitemservedqty',
                  'id' : 'aw2a762905',
                  'local' : false,
                  'remoteName' : 'spi:reservedqty',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'shippedqty',
                  'index' : false,
                  'artifactId' : 'invreserveResource_quantity_spi_shippedqty',
                  'id' : 'aw4747e98',
                  'local' : false,
                  'remoteName' : 'spi:shippedqty',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'invreserveResource_quantity_spi_wmlocation',
                  'id' : 'aw86754411',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'assetnum',
                  'index' : true,
                  'artifactId' : 'invreserveResource_quantity_spi_assetnum',
                  'id' : 'awa2901136',
                  'local' : false,
                  'remoteName' : 'spi:assetnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'invreserveResource_quantity_spi_glaccount',
                  'id' : 'awfbba14e3',
                  'local' : false,
                  'remoteName' : 'spi:glaccount',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:itemsetid',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'invreserve',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'invreserveResource_itemsetid_spi_wmitemsetid',
                  'maxSize' : 8,
                  'id' : 'awbb56d4db',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'invreserveResource_storelocsite_string',
                  'id' : 'aw2cc09fc',
                  'local' : false,
                  'remoteName' : 'spi:storelocsiteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'string',
                  'referenceResource' : 'invreserve',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'invreserveResource_rotating_boolean',
                  'id' : 'aw2b5cf8a8',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'invreserve',
                  'name' : 'item',
                  'index' : false,
                  'artifactId' : 'invreserveResource_item_spi_wmitemnum',
                  'maxSize' : 30,
                  'id' : 'aw5095ddda',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:binnum',
                  'dataType' : 'string',
                  'referenceResource' : 'invreserve',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'invreserveResource_inventory_spi_binnum',
                  'maxSize' : 50,
                  'id' : 'aw970e7ece',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:issueunit',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'invreserve',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'invreserveResource_inventory_spi_issueunit',
                  'maxSize' : 16,
                  'id' : 'aw6611cccb',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:lotnum',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'invreserve',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'invreserveResource_inventory_spi_lotnum',
                  'maxSize' : 9,
                  'id' : 'aw1de05de5',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'invreserve',
                  'name' : 'wonum',
                  'index' : true,
                  'artifactId' : 'invreserveResource_quantity_spi_wonum',
                  'maxSize' : 10,
                  'id' : 'awed693264',
                  'local' : false,
                  'remoteName' : 'spi:workorder',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'string',
                  'referenceResource' : 'invreserve',
                  'name' : 'wodesc',
                  'index' : true,
                  'artifactId' : 'invreserveResource_quantity_spi_wodesc',
                  'maxSize' : 256,
                  'id' : 'aweb516fd7',
                  'local' : false,
                  'remoteName' : 'spi:workorder',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'requestdate',
                  'index' : false,
                  'artifactId' : 'invreserveResource_requesteddate',
                  'id' : 'aw2c8f769b',
                  'local' : false,
                  'remoteName' : 'spi:requesteddate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'requireddate',
                  'index' : true,
                  'artifactId' : 'invreserveResource_requireddate',
                  'id' : 'aw67e8285',
                  'local' : false,
                  'remoteName' : 'spi:requireddate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'invreserveResource_orgid',
                  'id' : 'aw9eea1445',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localreservedqty',
                  'formula' : '(${reservedqty} - ${shippedqty})',
                  'index' : false,
                  'artifactId' : 'invreserveResource_localreservation',
                  'id' : 'aw8a8703e5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tasklabel',
                  'index' : false,
                  'artifactId' : 'invreserveResource_localreservation2',
                  'id' : 'awca3f2ff9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'localsortbin',
                  'formula' : '${binnum}',
                  'index' : false,
                  'artifactId' : 'invreserveResource_localbin',
                  'id' : 'aw54d412be',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'qtyRemaining',
                  'formula' : '(${reservedqty} - ${shippedqty})>0 ? true : false',
                  'index' : false,
                  'artifactId' : 'invreserveResource_qtyRemaining',
                  'id' : 'aw716ab104',
                  'persistent' : false,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tositeid',
                  'index' : true,
                  'artifactId' : 'invreserveResource_tositeid_spi_storelocsiteid',
                  'id' : 'aw779356e9',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tostoreloc',
                  'index' : true,
                  'artifactId' : 'invreserveResource_tostoreloc_spi_tostoreloc',
                  'id' : 'awbd410080',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'invreserveResource_ponum_spi_ponum',
                  'id' : 'aw84b87665',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'polinenum',
                  'index' : true,
                  'artifactId' : 'invreserveResource_polinenum_spi_polinenum',
                  'id' : 'awacf5eec0',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'porevisionnum',
                  'index' : true,
                  'artifactId' : 'invreserveResource_polinenum_spi_porevisionnum',
                  'id' : 'aw14f3562c',
                  'local' : false,
                  'remoteName' : 'spi:porevisionnum',
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'actualdate',
                  'formula' : 'new Date()',
                  'index' : false,
                  'artifactId' : 'invreserveResource_actualdate',
                  'id' : 'awb2105764',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'string',
                  'referenceResource' : 'invreserve',
                  'name' : 'modelnumref',
                  'index' : false,
                  'artifactId' : 'invreserveResource_item_spimodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw1eb3d868',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'invreserveResource_string_frombin',
                  'id' : 'awf8ba0f4b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'fromlot',
                  'index' : false,
                  'artifactId' : 'invreserveResource_string_fromlot',
                  'id' : 'aw591c7cbd',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'frombincurbal',
                  'index' : false,
                  'artifactId' : 'invreserveResource_string_frombincurbal',
                  'id' : 'aw92c052cc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:avblbalance',
                  'dataType' : 'string',
                  'referenceResource' : 'invreserve',
                  'name' : 'avblbalance',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invreserveResource_inventory_spi_avblbalance',
                  'id' : 'awff8d2c5a',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : true,
                  'artifactId' : 'invreserveResource_spi_anywhere_formno',
                  'id' : 'aw69c39142',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_formno',
               }).
               setCreationFactories([
                     {name:'invreserveResourceCF', creationString:'\/oslc\/os\/oslcinvreserve' }
               ]).
               setQueryBases([
                     {name:'searchAllInvreserve', queryString:'\/oslc\/os\/oslcinvreserve', defaultForSearch: true, queryLabel:'' }
               ]).
               setWhereClause('spi%3Atostoreloc%3D%22*%22');
            var resourcePromise010 = PersistenceManager.initCollection( resource010 );


            var resource011 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'invuse',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'invuse',
                  'id' : 'aw9d9fdc04',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,oslc:shortTitle,dcterms:title,spi:usetype,spi:status,spi:fromstoreloc,spi:changeby,spi:changedate,spi:orgid,spi:siteid,spi:shipmentdate,spi:shiptoattn,spi:packingslipnum,spi:expreceiptdate,spi:carrier,spi:shipto,spi:statusdate,spi:statusdate,spi:np_statusmemo,spi:formnumber,spi:documentref,spi:createdate').
               setSupportiveFieldsSelectExpression('spi:invuseline{spi:invuselineid,spi:invuselinenum,spi:description,spi:usetype,spi:itemsetid,spi:tostoreloc,spi:tositeid,spi:quantity,spi:orgid,spi:linetype,spi:tobin,spi:tolot,spi:fromstoreloc,spi:assetnum,spi:location,spi:gldebitacct,spi:glcreditacct,spi:actualdate,spi:rotassetnum,spi:fromlot,spi:frombin,spi:split,spi:toorgid,spi:receivedqty,spi:returnedqty,spi:issueto,spi:refwo,spi:wonum,spi:taskid,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:porevisionnum,spi:conversion,spi:remark,spi:unitcost,spi:issueid,spi:enteredastask,spi:fromconditioncode,spi:requestnum,spi:returnagainstissue,spi:anywhererefid,spi:item{oslc:shortTitle}},spi:invuselinesplit{spi:quantity,spi:fromlot,spi:frombin,spi:rotassetnum,spi:itemnum,spi:itemsetid,spi:fromstoreloc,spi:newassetnum,spi:invuselinelinkid},spi:awshipment{spi:shipdate,spi:expreceiptdate,spi:carrier,spi:packingslipnum,spi:shiptoattn,spi:shipto,spi:siteid,spi:invusenum,spi:anywhererefid},spi:awshipmentline{spi:itemnum,spi:itemdescription,spi:itemsetid,spi:frombin,spi:fromlot,spi:toorgid,spi:rotassetnum,spi:shippedqty,spi:tostoreloc,spi:comments,spi:ponum,spi:polinenum,spi:revisionnum,spi:vendor,spi:siteid,spi:fromsiteid,spi:fromorgid,spi:anywhererefid,spi:shipmentlinelinkid}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'invuseid',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_invuseid_dcterms_invuseid',
                  'maxSize' : 19,
                  'id' : 'aw874ca2f',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'invusenum',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_invusenum_spi_invusenum',
                  'maxSize' : 8,
                  'id' : 'aw173002f1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_description_dcterms_description',
                  'maxSize' : 512,
                  'id' : 'awb76afd73',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'usetype',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_usetype_spi_usetype',
                  'maxSize' : 20,
                  'id' : 'aw8ffacd96',
                  'local' : false,
                  'remoteName' : 'spi:usetype',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_status_spi_status',
                  'maxSize' : 20,
                  'id' : 'awe9a12bd6',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_fromstoreloc_spi_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'aw1601886b',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'changeby',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_changeby_spi_changeby',
                  'maxSize' : 30,
                  'id' : 'aw8b2004b9',
                  'local' : false,
                  'remoteName' : 'spi:changeby',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'changedate',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_changedate_spi_changedate',
                  'id' : 'awf9484411',
                  'local' : false,
                  'remoteName' : 'spi:changedate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_orgid_spi_orgid',
                  'maxSize' : 8,
                  'id' : 'awd55d157e',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_siteid_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw5b5e55de',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'shipdate',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_shipdate_spi_shipdate',
                  'id' : 'aw182c0b1',
                  'local' : false,
                  'remoteName' : 'spi:shipmentdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'shiptoattn',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_shiptoattn_spi_shiptoattn',
                  'maxSize' : 30,
                  'id' : 'awbcfde02a',
                  'local' : false,
                  'remoteName' : 'spi:shiptoattn',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_packingslipnum_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'awe4f9106d',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'expreceiptdate',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_expreceiptdate_spi_expreceiptdate',
                  'id' : 'awbdf3dc2e',
                  'local' : false,
                  'remoteName' : 'spi:expreceiptdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'carrier',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_packingslipnum_spi_carrier',
                  'maxSize' : 50,
                  'id' : 'awbf85759d',
                  'local' : false,
                  'remoteName' : 'spi:carrier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'shipto',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_shipto_spi_shipto',
                  'maxSize' : 30,
                  'id' : 'awc0b26b5a',
                  'local' : false,
                  'remoteName' : 'spi:shipto',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'statusdate',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_statusdate_spi_statusdate',
                  'id' : 'aw9f540cbc',
                  'local' : false,
                  'remoteName' : 'spi:statusdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'invuselineResource',
                  'name' : 'invuseline',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_invuseline_spi_invuseline',
                  'id' : 'aw5ddd45f6',
                  'describedByResource' : 'invuselineResource',
                  'local' : false,
                  'remoteName' : 'spi:invuseline',
                  'selectExpression' : 'spi:invuseline{spi:invuselineid,spi:invuselinenum,spi:description,spi:usetype,spi:itemsetid,spi:tostoreloc,spi:tositeid,spi:quantity,spi:orgid,spi:linetype,spi:tobin,spi:tolot,spi:fromstoreloc,spi:assetnum,spi:location,spi:gldebitacct,spi:glcreditacct,spi:actualdate,spi:rotassetnum,spi:fromlot,spi:frombin,spi:split,spi:toorgid,spi:receivedqty,spi:returnedqty,spi:issueto,spi:refwo,spi:wonum,spi:taskid,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:porevisionnum,spi:conversion,spi:remark,spi:unitcost,spi:issueid,spi:enteredastask,spi:fromconditioncode,spi:requestnum,spi:returnagainstissue,spi:anywhererefid,spi:item{oslc:shortTitle}}',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'invuselineSplitResource',
                  'name' : 'npinvuselinesplit',
                  'index' : false,
                  'artifactId' : 'invuse_aw_npinvuselinesplit',
                  'id' : 'aw87b63985',
                  'describedByResource' : 'invuselineSplitResource',
                  'local' : false,
                  'remoteName' : 'spi:invuselinesplit',
                  'selectExpression' : 'spi:invuselinesplit{spi:quantity,spi:fromlot,spi:frombin,spi:rotassetnum,spi:itemnum,spi:itemsetid,spi:fromstoreloc,spi:newassetnum,spi:invuselinelinkid}',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'shipmentResource',
                  'name' : 'shipment',
                  'index' : false,
                  'artifactId' : 'invuse_awshipment',
                  'id' : 'aw19929663',
                  'describedByResource' : 'shipmentResource',
                  'local' : false,
                  'remoteName' : 'spi:awshipment',
                  'selectExpression' : 'spi:awshipment{spi:shipdate,spi:expreceiptdate,spi:carrier,spi:packingslipnum,spi:shiptoattn,spi:shipto,spi:siteid,spi:invusenum,spi:anywhererefid}',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'shipmentLineResource',
                  'name' : 'shipmentline',
                  'index' : false,
                  'artifactId' : 'invuse_awshipmentline',
                  'id' : 'aw26056801',
                  'describedByResource' : 'shipmentLineResource',
                  'local' : false,
                  'remoteName' : 'spi:awshipmentline',
                  'selectExpression' : 'spi:awshipmentline{spi:itemnum,spi:itemdescription,spi:itemsetid,spi:frombin,spi:fromlot,spi:toorgid,spi:rotassetnum,spi:shippedqty,spi:tostoreloc,spi:comments,spi:ponum,spi:polinenum,spi:revisionnum,spi:vendor,spi:siteid,spi:fromsiteid,spi:fromorgid,spi:anywhererefid,spi:shipmentlinelinkid}',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'changestatusdate',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_changestatusdate_spi_statusdate',
                  'id' : 'aw63c117d4',
                  'local' : false,
                  'remoteName' : 'spi:statusdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'memo',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_memo_spi_np_statusmemo',
                  'maxSize' : 200,
                  'id' : 'awbd031e91',
                  'local' : false,
                  'remoteName' : 'spi:np_statusmemo',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'invuseResourceResource_formnumber_spi_formnumber',
                  'maxSize' : 30,
                  'id' : 'aw94b45593',
                  'local' : false,
                  'remoteName' : 'spi:formnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'invuseResourceResource_documentref_spi_documentref',
                  'maxSize' : 100,
                  'id' : 'awf59ca444',
                  'local' : false,
                  'remoteName' : 'spi:documentref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'createdate',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_createdate_spi_createdate',
                  'id' : 'awaf872488',
                  'local' : false,
                  'remoteName' : 'spi:createdate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'invuseResourceResource_errorMessage',
                  'id' : 'aw5a77a3b3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'dateTime',
                  'name' : 'statusDate',
                  'index' : false,
                  'artifactId' : 'invuseResource_statusDate_dateTime',
                  'id' : 'awba8a7e79',
                  'persistent' : true,
                  'local' : true,
               }).
               setCreationFactories([
                     {name:'invuseResourceCF', creationString:'\/oslc\/os\/oslcinvuse' }
               ]).
               setQueryBases([
                     {name:'searchAllInvuse', queryString:'\/oslc\/os\/oslcinvuse', queryLabel:'' }
               ]);
            var resourcePromise011 = PersistenceManager.initCollection( resource011 );


            var resource012 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'invuselineResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'invuselineResource',
                  'id' : 'aw8932c154',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:invuselineid,spi:invuselinenum,spi:description,spi:usetype,spi:itemsetid,spi:tostoreloc,spi:tositeid,spi:quantity,spi:orgid,spi:linetype,spi:tobin,spi:tolot,spi:fromstoreloc,spi:assetnum,spi:location,spi:gldebitacct,spi:glcreditacct,spi:actualdate,spi:rotassetnum,spi:fromlot,spi:frombin,spi:split,spi:toorgid,spi:receivedqty,spi:returnedqty,spi:issueto,spi:refwo,spi:wonum,spi:taskid,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:porevisionnum,spi:conversion,spi:remark,spi:unitcost,spi:issueid,spi:enteredastask,spi:fromconditioncode,spi:requestnum,spi:returnagainstissue,spi:anywhererefid,spi:item{oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselineid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_invuselineid_spi_invuselineid',
                  'id' : 'awdb56293f',
                  'local' : false,
                  'remoteName' : 'spi:invuselineid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_invuselinenum_spi_invuselinenum',
                  'id' : 'aw5f58d908',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:invuselinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'invuselineResource_description_spi_description',
                  'maxSize' : 512,
                  'id' : 'aw94218788',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'usetype',
                  'index' : false,
                  'artifactId' : 'invuselineResource_usetype_spi_usetype',
                  'maxSize' : 20,
                  'id' : 'aw9c721053',
                  'local' : false,
                  'remoteName' : 'spi:usetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'invuselineResource',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_itemnum_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw4ee73bda',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_itemsetid_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw1fcdf566',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'invuselineResource_tostoreloc_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'awe92811ce',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tositeid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_tositeid_spi_tositeid',
                  'maxSize' : 8,
                  'id' : 'aw469e8384',
                  'local' : false,
                  'remoteName' : 'spi:tositeid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invuselineResource_quantity_spi_quantity',
                  'id' : 'awd6b0015c',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_orgid_spi_orgid',
                  'maxSize' : 8,
                  'id' : 'aw7ada2143',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'invuselineResource_linetype_spi_linetype',
                  'maxSize' : 15,
                  'id' : 'aw352c738e',
                  'local' : false,
                  'remoteName' : 'spi:linetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'tobin',
                  'index' : false,
                  'artifactId' : 'invuselineResource_tobin_spi_tobin',
                  'maxSize' : 50,
                  'id' : 'aw9dd9bd76',
                  'local' : false,
                  'remoteName' : 'spi:tobin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tolot',
                  'index' : false,
                  'artifactId' : 'invuselineResource_tolot_spi_tolot',
                  'maxSize' : 9,
                  'id' : 'aw65fdfb9f',
                  'local' : false,
                  'remoteName' : 'spi:tolot',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'invuselineResource_fromstoreloc_spi_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'awbb37f3dc',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'assetnum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_assetnum_spi_assetnum',
                  'maxSize' : 15,
                  'id' : 'aw98613533',
                  'local' : false,
                  'remoteName' : 'spi:assetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'invuselineResource_location_spi_location',
                  'maxSize' : 30,
                  'id' : 'aw58190481',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'invuselineResource_gldebitacct_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'awed4db096',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glcreditacct',
                  'index' : false,
                  'artifactId' : 'invuselineResource_glcreditacct_spi_glcreditacct',
                  'maxSize' : 54,
                  'id' : 'awfc92e5df',
                  'local' : false,
                  'remoteName' : 'spi:glcreditacct',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'invuselineResource_actualdate_spi_actualdate',
                  'id' : 'aw548b9c07',
                  'local' : false,
                  'remoteName' : 'spi:actualdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_rotassetnum_spi_rotassetnum',
                  'maxSize' : 15,
                  'id' : 'aw90a2cf40',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromlot',
                  'index' : false,
                  'artifactId' : 'invuselineResource_fromlot_spi_fromlot',
                  'maxSize' : 9,
                  'id' : 'awa3da38bc',
                  'local' : false,
                  'remoteName' : 'spi:fromlot',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'invuselineResource_frombin_spi_frombin',
                  'maxSize' : 50,
                  'id' : 'aw9995d875',
                  'local' : false,
                  'remoteName' : 'spi:frombin',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'split',
                  'index' : false,
                  'artifactId' : 'invuselineResource_split_spi_split',
                  'id' : 'awcde7e5a0',
                  'local' : false,
                  'remoteName' : 'spi:split',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'toorgid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_toorgid_spi_toorgid',
                  'maxSize' : 8,
                  'id' : 'awe31307ea',
                  'local' : false,
                  'remoteName' : 'spi:toorgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receivedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invuselineResource_receivedqty_spi_receivedqty',
                  'id' : 'aw3f4cb6ad',
                  'local' : false,
                  'remoteName' : 'spi:receivedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'returnedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invuselineResource_returnedqty_spi_returnedqty',
                  'id' : 'aw8fbcd411',
                  'local' : false,
                  'remoteName' : 'spi:returnedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueto',
                  'index' : false,
                  'artifactId' : 'invuselineResource_issueto_spi_issueto',
                  'maxSize' : 30,
                  'id' : 'aw3577debf',
                  'local' : false,
                  'remoteName' : 'spi:issueto',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'refwo',
                  'index' : false,
                  'artifactId' : 'invuselineResource_refwo_spi_refwo',
                  'maxSize' : 10,
                  'id' : 'awcdb88afa',
                  'local' : false,
                  'remoteName' : 'spi:refwo',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_wonum_spi_wonum',
                  'maxSize' : 10,
                  'id' : 'awb72a27db',
                  'local' : false,
                  'remoteName' : 'spi:wonum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'taskid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_taskid_spi_taskid',
                  'id' : 'awa9259106',
                  'local' : false,
                  'remoteName' : 'spi:taskid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'mrnum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_mrnum_spi_mrnum',
                  'maxSize' : 8,
                  'id' : 'awcd2c89d4',
                  'local' : false,
                  'remoteName' : 'spi:mrnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'mrlinenum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_mrlinenum_spi_mrlinenum',
                  'id' : 'aw2c26b7ce',
                  'local' : false,
                  'remoteName' : 'spi:mrlinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_ponum_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'aw9e0bf4d1',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_polinenum_spi_polinenum',
                  'id' : 'aw57ce23be',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'porevisionnum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_polinenum_spi_porevisionnum',
                  'id' : 'aw10b9403c',
                  'local' : false,
                  'remoteName' : 'spi:porevisionnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'scale' : 6,
                  'artifactId' : 'invuselineResource_conversion_spi_conversion',
                  'id' : 'aw7003ac38',
                  'local' : false,
                  'remoteName' : 'spi:conversion',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'remark',
                  'index' : false,
                  'artifactId' : 'invuselineResource_remark_spi_remark',
                  'maxSize' : 254,
                  'id' : 'aw275d878c',
                  'local' : false,
                  'remoteName' : 'spi:remark',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'unitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invuselineResource_unitcost_spi_unitcost',
                  'id' : 'awb4f07055',
                  'local' : false,
                  'remoteName' : 'spi:unitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'issueid',
                  'index' : false,
                  'artifactId' : 'invuselineResource_issueid_spi_issueid',
                  'id' : 'aw6b4898bf',
                  'local' : false,
                  'remoteName' : 'spi:issueid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'enteredastask',
                  'index' : false,
                  'artifactId' : 'invuselineResource_enteredastask_spi_enteredastask',
                  'id' : 'awc6fc2d8c',
                  'local' : false,
                  'remoteName' : 'spi:enteredastask',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromconditioncode',
                  'index' : false,
                  'artifactId' : 'invuselineResource_fromconditioncode_spi_fromconditioncode',
                  'maxSize' : 30,
                  'id' : 'aw10dedca2',
                  'local' : false,
                  'remoteName' : 'spi:fromconditioncode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'requestnum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_requestnum_spi_requestnum',
                  'maxSize' : 20,
                  'id' : 'aw4f8ca66d',
                  'local' : false,
                  'remoteName' : 'spi:requestnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'returnagainstissue',
                  'index' : false,
                  'artifactId' : 'invuselineResource_returnagainstissue_spi_returnagainstissue',
                  'id' : 'awd25f036',
                  'local' : false,
                  'remoteName' : 'spi:returnagainstissue',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'anywhereRefId',
                  'index' : false,
                  'artifactId' : 'invuselineResource_anywhereRefId_spi_anywhererefid',
                  'id' : 'awbac77b38',
                  'local' : false,
                  'remoteName' : 'spi:anywhererefid',
               });
            var resourcePromise012 = PersistenceManager.initCollection( resource012 );


            var resource013 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'invuselineSplitResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'invuselineSplitResource',
                  'id' : 'aw4a7f05bc',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:quantity,spi:fromlot,spi:frombin,spi:rotassetnum,spi:itemnum,spi:itemsetid,spi:fromstoreloc,spi:newassetnum,spi:invuselinelinkid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invuselineSplitResource_quantity_spi_quantity',
                  'id' : 'aw41821714',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromlot',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_fromlot_spi_fromlot',
                  'maxSize' : 8,
                  'id' : 'awb9f32db6',
                  'local' : false,
                  'remoteName' : 'spi:fromlot',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_frombin_spi_frombin',
                  'maxSize' : 50,
                  'id' : 'aw83bccd7f',
                  'local' : false,
                  'remoteName' : 'spi:frombin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_rotassetnum_spi_rotassetnum',
                  'maxSize' : 12,
                  'id' : 'aw3e77bb3c',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_itemnum_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw54ce2ed0',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_itemsetid_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'awd3b91208',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_fromstoreloc_spi_fromstoreloc',
                  'maxSize' : 12,
                  'id' : 'aw6fd5ded6',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'newassetnum',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_newassetnum_spi_newassetnum',
                  'maxSize' : 12,
                  'id' : 'aw3c0d8726',
                  'local' : false,
                  'remoteName' : 'spi:newassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselinelinkid',
                  'index' : false,
                  'artifactId' : 'invuselineSplitResource_invuselinelinkid_spi_invuselinelinkid',
                  'id' : 'awf1d6bb26',
                  'local' : false,
                  'remoteName' : 'spi:invuselinelinkid',
               });
            var resourcePromise013 = PersistenceManager.initCollection( resource013 );


            var resource014 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'tempShipmentResource',
                  'resourceName' : 'tempShipmentResource',
                  'id' : 'aw8aabb412',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'datetime',
                  'name' : 'shipdate',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_shipdate_spi_shipdate',
                  'id' : 'aw82e15aa8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'datetime',
                  'name' : 'expreceiptdate',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_expreceiptdate_spi_expreceiptdate',
                  'id' : 'aw72f2216a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'carrier',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_carrier_spi_carrier',
                  'id' : 'awfbfbc0f9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_packingslipnum_spi_packingslipnum',
                  'id' : 'aw2bf8ed29',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'shiptoattn',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_shiptoattn_spi_shiptoattn',
                  'id' : 'aw5b092fe7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'upper',
                  'name' : 'shipto',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_shipto_spi_shipto',
                  'id' : 'awd9d92101',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_siteid_spi_siteid',
                  'id' : 'aw42351f85',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'invusenum',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_invusenum_spi_invusenum',
                  'id' : 'aw9cea52d0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'anywhererefid',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_anywhererefid_spi_anywhererefid',
                  'id' : 'awad172fe3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'tempShipmentResource_asset_spi_rotassetnum',
                  'id' : 'aw165e0c04',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise014 = PersistenceManager.initCollection( resource014 );


            var resource015 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'shipmentResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'shipmentResource',
                  'id' : 'awda077198',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:shipdate,spi:expreceiptdate,spi:carrier,spi:packingslipnum,spi:shiptoattn,spi:shipto,spi:siteid,spi:invusenum,spi:anywhererefid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'shipdate',
                  'index' : false,
                  'artifactId' : 'shipmentResource_shipdate_spi_shipdate',
                  'id' : 'awed1f597e',
                  'local' : false,
                  'remoteName' : 'spi:shipdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'expreceiptdate',
                  'index' : false,
                  'artifactId' : 'shipmentResource_expreceiptdate_spi_expreceiptdate',
                  'id' : 'awd5ce2538',
                  'local' : false,
                  'remoteName' : 'spi:expreceiptdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'carrier',
                  'index' : false,
                  'artifactId' : 'shipmentResource_carrier_spi_carrier',
                  'maxSize' : 50,
                  'id' : 'aw8b4f421b',
                  'local' : false,
                  'remoteName' : 'spi:carrier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'shipmentResource_packingslipnum_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'aw8cc4e97b',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'shiptoattn',
                  'index' : false,
                  'artifactId' : 'shipmentResource_shiptoattn_spi_shiptoattn',
                  'maxSize' : 30,
                  'id' : 'awd42c701',
                  'local' : false,
                  'remoteName' : 'spi:shiptoattn',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'shipto',
                  'index' : false,
                  'artifactId' : 'shipmentResource_shipto_spi_shipto',
                  'maxSize' : 30,
                  'id' : 'aw142ae1ec',
                  'local' : false,
                  'remoteName' : 'spi:shipto',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'shipmentResource_siteid_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw8fc6df68',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'invusenum',
                  'index' : false,
                  'artifactId' : 'shipmentResource_invusenum_spi_invusenum',
                  'maxSize' : 8,
                  'id' : 'awd2810e0d',
                  'local' : false,
                  'remoteName' : 'spi:invusenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'anywhererefid',
                  'index' : false,
                  'artifactId' : 'shipmentResource_anywhererefid_spi_anywhererefid',
                  'id' : 'aw518ad65c',
                  'local' : false,
                  'remoteName' : 'spi:anywhererefid',
               });
            var resourcePromise015 = PersistenceManager.initCollection( resource015 );


            var resource016 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'shipmentLineResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'shipmentLineResource',
                  'id' : 'awedb907c8',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:itemnum,spi:itemdescription,spi:itemsetid,spi:frombin,spi:fromlot,spi:toorgid,spi:rotassetnum,spi:shippedqty,spi:tostoreloc,spi:comments,spi:ponum,spi:polinenum,spi:revisionnum,spi:vendor,spi:siteid,spi:fromsiteid,spi:fromorgid,spi:anywhererefid,spi:shipmentlinelinkid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_itemnum_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'awf72377d',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'itemdescription',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_itemdescription_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'awc1387116',
                  'local' : false,
                  'remoteName' : 'spi:itemdescription',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_frombin_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw36c8b034',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_frombin_spi_frombin',
                  'maxSize' : 50,
                  'id' : 'awd800d4d2',
                  'local' : false,
                  'remoteName' : 'spi:frombin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromlot',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_fromlot_spi_fromlot',
                  'maxSize' : 8,
                  'id' : 'awe24f341b',
                  'local' : false,
                  'remoteName' : 'spi:fromlot',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'toorgid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_fromlot_spi_toorgid',
                  'maxSize' : 8,
                  'id' : 'awe284b773',
                  'local' : false,
                  'remoteName' : 'spi:toorgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_rotassetnum_spi_rotassetnum',
                  'maxSize' : 12,
                  'id' : 'awdfb2bda8',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shippedqty',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_shippedqty_spi_shippedqty',
                  'maxSize' : 15,
                  'id' : 'aw67ba0e94',
                  'local' : false,
                  'remoteName' : 'spi:shippedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_tostoreloc_spi_tostoreloc',
                  'maxSize' : 12,
                  'id' : 'awd3072bf8',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'comments',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_comments',
                  'maxSize' : 254,
                  'id' : 'awbcf93c28',
                  'local' : false,
                  'remoteName' : 'spi:comments',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'aw2370a870',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_polinenum',
                  'id' : 'aw9b99a388',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'revisionnum',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_revisionnum',
                  'id' : 'aw234262c4',
                  'local' : false,
                  'remoteName' : 'spi:revisionnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'vendor',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_vendor',
                  'maxSize' : 12,
                  'id' : 'aw8f14ae70',
                  'local' : false,
                  'remoteName' : 'spi:vendor',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw86c11dd9',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromsiteid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_fromsiteid',
                  'maxSize' : 8,
                  'id' : 'aw4b8c82cf',
                  'local' : false,
                  'remoteName' : 'spi:fromsiteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromorgid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_commnets_spi_fromorgid',
                  'maxSize' : 8,
                  'id' : 'aw69507ce2',
                  'local' : false,
                  'remoteName' : 'spi:fromorgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'anywhererefid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_anywhererefid_spi_anywhererefid',
                  'id' : 'aw4ac1bc12',
                  'local' : false,
                  'remoteName' : 'spi:anywhererefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'shipmentlinelinkid',
                  'index' : false,
                  'artifactId' : 'shipmentLineResource_shipmentlinelinkid_spi_shipmentlinelinkid',
                  'id' : 'awbda7cb43',
                  'local' : false,
                  'remoteName' : 'spi:shipmentlinelinkid',
               });
            var resourcePromise016 = PersistenceManager.initCollection( resource016 );


            var resource017 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'invbalance',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'invbalance',
                  'id' : 'aw17e456d',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:binnum,spi:physcnt,spi:curbal,spi:conditioncode,spi:itemnum,spi:description,spi:itemsetid,spi:issueunit,spi:location,spi:siteid,spi:lotnum,spi:adjustedphyscnt,spi:physcntdate,spi:rotating,spi:stagingbin,spi:adjustedphyscntdate').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'invbalancesid',
                  'index' : false,
                  'artifactId' : 'invbalance_invbalancesid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awf631cf7e',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : true,
                  'artifactId' : 'invbalance_binnum_spibinnum',
                  'maxSize' : 50,
                  'id' : 'aw2dbee18',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:binnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'physcnt',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invbalance_physcnt_spiphyscnt',
                  'id' : 'aw8e8e4ab7',
                  'local' : false,
                  'remoteName' : 'spi:physcnt',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invbalance_curbal_spicurbal',
                  'id' : 'aw91790b7d',
                  'local' : false,
                  'remoteName' : 'spi:curbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'conditioncode',
                  'index' : false,
                  'artifactId' : 'invbalance_conditioncode_spiconditioncode',
                  'maxSize' : 30,
                  'id' : 'awf7310998',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:conditioncode',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'invbalance_itemnum_spiitemoslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'aw95cc0e57',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'invbalance_itemnumdesc_spiitemdctermstitle',
                  'maxSize' : 512,
                  'id' : 'aw96a8d0e7',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'invbalance_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw7392f29',
                  'local' : false,
                  'pkIndex' : 7,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueunit',
                  'index' : true,
                  'artifactId' : 'invbalance_issueunit_spiissueunit',
                  'maxSize' : 16,
                  'id' : 'aw1815b54',
                  'local' : false,
                  'remoteName' : 'spi:issueunit',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'invbalance_location_spilocation',
                  'maxSize' : 30,
                  'id' : 'aw4c0d9f98',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'invbalance_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awf57ea66',
                  'local' : false,
                  'pkIndex' : 6,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'invbalance_lotnum_spilotnum',
                  'maxSize' : 9,
                  'id' : 'aw3ec8099d',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:lotnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'adjustedphyscnt',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invbalance_adjustedphyscnt_spiadjustedphyscnt',
                  'id' : 'aw5ce6c9df',
                  'local' : false,
                  'remoteName' : 'spi:adjustedphyscnt',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'physcntdate',
                  'index' : false,
                  'artifactId' : 'invbalance_physcntdate_spiphyscntdate',
                  'id' : 'aw61a58470',
                  'local' : false,
                  'remoteName' : 'spi:physcntdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'invbalance_rotating_spirotating',
                  'id' : 'aw77015ae7',
                  'local' : false,
                  'remoteName' : 'spi:rotating',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'stagingbin',
                  'index' : true,
                  'artifactId' : 'invbalance_stagingbin_spistagingbin',
                  'id' : 'awa65ff423',
                  'local' : false,
                  'remoteName' : 'spi:stagingbin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'adjustedphyscntdate',
                  'index' : false,
                  'artifactId' : 'invbalance_adjustedphyscntdate_spiadjustedphyscntdate',
                  'id' : 'aw384120e',
                  'local' : false,
                  'remoteName' : 'spi:adjustedphyscntdate',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasbalance',
                  'formula' : '${currentbalance} > 0',
                  'index' : true,
                  'artifactId' : 'invbalance_hasbalance_boolean',
                  'id' : 'awd53f60bc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'show',
                  'formula' : '${adjustedphyscnt} == 0',
                  'index' : true,
                  'artifactId' : 'invbalance_show_boolean',
                  'id' : 'aw1505af29',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'count',
                  'index' : false,
                  'artifactId' : 'invbalance_count_double',
                  'maxSize' : 15,
                  'id' : 'awd845159',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getAllInvbalances', queryString:'\/oslc\/os\/oslcinvbalview', queryLabel:'' }
               ]);
            var resourcePromise017 = PersistenceManager.initCollection( resource017 );


            var resource018 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'rotatingAssets',
                  'resourceName' : 'rotatingAssets',
                  'id' : 'awe82f9d3',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'rotatingAssetMap',
                  'index' : false,
                  'artifactId' : 'rotatingAssets_string',
                  'id' : 'awe4c290e2',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise018 = PersistenceManager.initCollection( resource018 );


            var resource019 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'originalData',
                  'resourceName' : 'originalData',
                  'id' : 'aw356f5429',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'String',
                  'index' : false,
                  'artifactId' : 'originalDataQty_quantity_string',
                  'id' : 'awcf63286e',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise019 = PersistenceManager.initCollection( resource019 );


            var resource020 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'originalDataSplitBinQty',
                  'resourceName' : 'originalDataSplitBinQty',
                  'id' : 'aw102039c3',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'artifactId' : 'originalDataSplitBinQty_quantity_string',
                  'id' : 'aw7620df17',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'originalDataSplitBinQty_lotnum_string',
                  'id' : 'aw6cc5ff5a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'originalDataSplitBinQty_rotassetnum_string',
                  'id' : 'awd29601ac',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'originalDataSplitBinQty_binnum_string',
                  'id' : 'aw3547ca45',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_itemnum_string',
                  'id' : 'aw9547f331',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_itemsetid_string',
                  'id' : 'awc9f0ba32',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_storeloc_string',
                  'id' : 'awfae2023d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_siteid_string',
                  'id' : 'awbdd478ec',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'stagingbin',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_stagingbin_string',
                  'id' : 'awf5272149',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise020 = PersistenceManager.initCollection( resource020 );


            var resource021 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'calculatedDataSplitBinQty',
                  'resourceName' : 'calculatedDataSplitBinQty',
                  'id' : 'aw5fb5bee1',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'artifactId' : 'calculatedDataSplitBinQty_quantity_string',
                  'id' : 'awc8a687d5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'calculatedDataSplitBinQty_lotnum_string',
                  'id' : 'aw2c1a7845',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'calculatedDataSplitBinQty_rotassetnum_string',
                  'id' : 'aw3604b275',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'calculatedDataSplitBinQty_binnum_string',
                  'id' : 'aw75984d5a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_itemnum_string',
                  'id' : 'aw180f2143',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_itemsetid_string',
                  'id' : 'awbc249ff6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_storeloc_string',
                  'id' : 'aw44645aff',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_siteid_string',
                  'id' : 'awfd0bfff3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'stagingbin',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_stagingbin_string',
                  'id' : 'aw695bf3c5',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise021 = PersistenceManager.initCollection( resource021 );


            var resource022 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'invbalTemp',
                  'resourceName' : 'invbalTemp',
                  'id' : 'aw39806b7a',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'invbalTemp_binnum_string',
                  'id' : 'aw5f451923',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'invbalTemp_lotnum_string',
                  'id' : 'aw6c72c3c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'curbal',
                  'index' : false,
                  'artifactId' : 'invbalTemp_curbal_string',
                  'id' : 'aw897c5ba',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise022 = PersistenceManager.initCollection( resource022 );


            var resource023 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'invbalTemp2',
                  'resourceName' : 'invbalTemp2',
                  'id' : 'awaa3ca644',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'invbalTemp2_binnum_string',
                  'id' : 'aw54d25fe5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'invbalTemp2_lotnum_string',
                  'id' : 'awd506afa',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'curbal',
                  'index' : false,
                  'artifactId' : 'invbalTemp2_curbal_string',
                  'id' : 'aw300837c',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise023 = PersistenceManager.initCollection( resource023 );


            var resource024 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domaininvusestatus',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domaininvusestatus',
                  'id' : 'awe4e6eafe',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awba2979b5',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw7a59bf11',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awe6d12400',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awf3c56619',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw2e9c9ce',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_defaults_spidefaults',
                  'id' : 'aw7e1bd640',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw378febc2',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domaininvusestatus_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw197c4726',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getinvusestatus', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22INVUSESTATUS%22');
            var resourcePromise024 = PersistenceManager.initCollection( resource024 );


            var resource025 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domaininvusereceipts',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domaininvusereceipts',
                  'id' : 'awca4739b',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw134fffe5',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awc4396d36',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw1c1da7f5',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw5aa3e049',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw6a0509c2',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_defaults_spidefaults',
                  'id' : 'aw84d755b5',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw6fc1f10',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domaininvusereceipts_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awa549b251',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getinvusereceipts', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22RECEIPTS%22');
            var resourcePromise025 = PersistenceManager.initCollection( resource025 );


            var resource026 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domaininvusetype',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domaininvusetype',
                  'id' : 'aw54a40655',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw2efb9d8c',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awd3ba8018',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw6eb77244',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw67178220',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'awae6a9395',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_defaults_spidefaults',
                  'id' : 'awf67d8004',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw82cf0e9',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domaininvusetype_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awfabd5679',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getinvusetype', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22INVUSETYPE%22');
            var resourcePromise026 = PersistenceManager.initCollection( resource026 );


            var resource027 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'splitrotateresource',
                  'resourceName' : 'splitrotateresource',
                  'id' : 'awe26e38f7',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_description_string',
                  'id' : 'aw6cee086e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_quantity_string',
                  'id' : 'aw1a124332',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_lotnum_string',
                  'id' : 'awbd45733',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_rotassetnum_string',
                  'id' : 'awf933115d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_binnum_string',
                  'id' : 'aw5256622c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_invuselinenum_string',
                  'id' : 'awe60231a9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_itemnum_string',
                  'id' : 'awa14e3b65',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_itemsetid_string',
                  'id' : 'aw82985ce9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_location_string',
                  'id' : 'aw5cd88622',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'newassetnum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_newassetnum_string',
                  'id' : 'awd08d5fe4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'isSplit',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_isSplit_string',
                  'id' : 'aw6fbe6c4d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'processed',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_processed_string',
                  'id' : 'aw1261c089',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_issueunit_string',
                  'id' : 'aw6809fd43',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_siteid_string',
                  'id' : 'awdac5d085',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_isrotating_boolean',
                  'id' : 'awfd73cc2d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_isrotating_asset',
                  'id' : 'awa29e198d',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise027 = PersistenceManager.initCollection( resource027 );


            var resource028 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'splitqtyacrossbins',
                  'resourceName' : 'splitqtyacrossbins',
                  'id' : 'awa3333f43',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_description_string',
                  'id' : 'aw13c0a256',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_quantity_string',
                  'id' : 'aw82d5b50',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_lotnum_string',
                  'id' : 'awf2bce8eb',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_rotassetnum_string',
                  'id' : 'aw861dbb65',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_binnum_string',
                  'id' : 'awab3eddf4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_invuselinenum_string',
                  'id' : 'awc79eb88a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_itemnum_string',
                  'id' : 'aw29bf093c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_itemsetid_string',
                  'id' : 'aw21366385',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_storeloc_string',
                  'id' : 'aw84ef867a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'newassetnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_newassetnum_string',
                  'id' : 'awafa3f5dc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_issueunit_string',
                  'id' : 'awcba7c22f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_rotating_string',
                  'id' : 'aw26b6b690',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise028 = PersistenceManager.initCollection( resource028 );


            var resource029 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'receivedMatrectrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'receivedMatrectrans',
                  'id' : 'aw2963c7c5',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:location,spi:issueto,spi:rotassetnum,spi:packingslipnum,spi:itemsetid,spi:orgid,spi:invuselineid,spi:shipmentlinenum,spi:conversion,spi:invuselinesplitid,spi:commoditygroup,spi:requestedby,spi:positeid,spi:receivedunit,spi:currencylinecost,spi:status,spi:oldavgcost,spi:curbal,spi:statuschangeby,spi:proratecost,spi:loadedcost,spi:fromstoreloc,spi:linecost2,spi:linetype,spi:tax5,spi:consignment,spi:linecost,spi:receiptref,spi:tax1,spi:ponum,spi:tax2,spi:polinenum,spi:tax3,spi:prorated,spi:tax4,spi:shipmentnum,spi:exchangerate2,spi:fromsiteid,spi:langcode,spi:issuetype,spi:unitcost,spi:glcreditacct,spi:hasld,spi:statusdate,spi:currencycode,spi:enterby,spi:currencyunitcost,spi:invuselinenum,spi:frombin,spi:exchangerate,spi:actualdate,spi:siteid,spi:inspectedqty,spi:invuseid,spi:transdate,spi:outside,spi:qtyrequested,spi:gldebitacct,spi:financialperiod,spi:enteredastask,spi:rejectqty,spi:acceptedqty,spi:totalcurbal,spi:tostoreloc,spi:quantity,spi:actualcost,spi:issue,spi:costinfo,spi:inspected,spi:receiptquantity,spi:modelnum,spi:grnnumber,spi:anywhere_formnumber,spi:anywhere_documentref,spi:externalrefid,spi:formno,spi:item{spi:modelnumref,spi:rotating,spi:issueunit,dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('spi:awreceiverotasset{spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'awf665d138',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_location',
                  'maxSize' : 30,
                  'id' : 'aw6957bc9d',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueto',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_issueto',
                  'maxSize' : 30,
                  'id' : 'aw252b0c8d',
                  'local' : false,
                  'remoteName' : 'spi:issueto',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_rotassetnum',
                  'maxSize' : 15,
                  'id' : 'awb228d11b',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'aw402bf23d',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'awce9ad604',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_orgid',
                  'maxSize' : 8,
                  'id' : 'aw24038d5',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselineid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_invuselineid',
                  'id' : 'aw98ec33f8',
                  'local' : false,
                  'remoteName' : 'spi:invuselineid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipmentlinenum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_shipmentlinenum',
                  'maxSize' : 50,
                  'id' : 'aw3531627b',
                  'local' : false,
                  'remoteName' : 'spi:shipmentlinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'scale' : 6,
                  'artifactId' : 'receivedMatrectrans_spi_conversion',
                  'id' : 'aw7c32e7c',
                  'local' : false,
                  'remoteName' : 'spi:conversion',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselinesplitid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_invuselinesplitid',
                  'id' : 'awa98586f3',
                  'local' : false,
                  'remoteName' : 'spi:invuselinesplitid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'commoditygroup',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_commoditygroup',
                  'maxSize' : 8,
                  'id' : 'awcd61cb2e',
                  'local' : false,
                  'remoteName' : 'spi:commoditygroup',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'requestedby',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_requestedby',
                  'maxSize' : 30,
                  'id' : 'awb489c94d',
                  'local' : false,
                  'remoteName' : 'spi:requestedby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'awce70665f',
                  'local' : false,
                  'remoteName' : 'spi:positeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_receivedunit',
                  'maxSize' : 16,
                  'id' : 'aw5928e441',
                  'local' : false,
                  'remoteName' : 'spi:receivedunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencylinecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_currencylinecost',
                  'id' : 'aw4313fe90',
                  'local' : false,
                  'remoteName' : 'spi:currencylinecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_status',
                  'maxSize' : 12,
                  'id' : 'aw74add2c7',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'oldavgcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_oldavgcost',
                  'id' : 'aw7508ab72',
                  'local' : false,
                  'remoteName' : 'spi:oldavgcost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_curbal',
                  'id' : 'awb3ba04ff',
                  'local' : false,
                  'remoteName' : 'spi:curbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'statuschangeby',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_statuschangeby',
                  'maxSize' : 30,
                  'id' : 'aw15a571d1',
                  'local' : false,
                  'remoteName' : 'spi:statuschangeby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'proratecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_proratecost',
                  'id' : 'awf7cc3fee',
                  'local' : false,
                  'remoteName' : 'spi:proratecost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'loadedcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_loadedcost',
                  'id' : 'aw7f880792',
                  'local' : false,
                  'remoteName' : 'spi:loadedcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'awc2d47d22',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'linecost2',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_linecost2',
                  'id' : 'awfa919898',
                  'local' : false,
                  'remoteName' : 'spi:linecost2',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_linetype',
                  'maxSize' : 15,
                  'id' : 'aw53748df',
                  'local' : false,
                  'remoteName' : 'spi:linetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax5',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_tax5',
                  'id' : 'aw143e7177',
                  'local' : false,
                  'remoteName' : 'spi:tax5',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'consignment',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_consignment',
                  'id' : 'aw1a00121b',
                  'local' : false,
                  'remoteName' : 'spi:consignment',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'linecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_linecost',
                  'id' : 'aw91cf8b0a',
                  'local' : false,
                  'remoteName' : 'spi:linecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'receiptref',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_receiptref',
                  'id' : 'awe3205a3d',
                  'local' : false,
                  'remoteName' : 'spi:receiptref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax1',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_tax1',
                  'id' : 'aw1353b56e',
                  'local' : false,
                  'remoteName' : 'spi:tax1',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'awd2f969b2',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax2',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_tax2',
                  'id' : 'aw8a5ae4d4',
                  'local' : false,
                  'remoteName' : 'spi:tax2',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_polinenum',
                  'id' : 'awf74b98fa',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax3',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_tax3',
                  'id' : 'awfd5dd442',
                  'local' : false,
                  'remoteName' : 'spi:tax3',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'prorated',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_prorated',
                  'id' : 'aw7dcbdec4',
                  'local' : false,
                  'remoteName' : 'spi:prorated',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax4',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_tax4',
                  'id' : 'aw633941e1',
                  'local' : false,
                  'remoteName' : 'spi:tax4',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipment',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_shipment',
                  'maxSize' : 50,
                  'id' : 'aw3502158a',
                  'local' : false,
                  'remoteName' : 'spi:shipmentnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate2',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'receivedMatrectrans_spi_exchangerate2',
                  'id' : 'aw504bb5b0',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate2',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromsiteid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_fromsiteid',
                  'maxSize' : 8,
                  'id' : 'awf5eb40e4',
                  'local' : false,
                  'remoteName' : 'spi:fromsiteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'langcode',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_langcode',
                  'maxSize' : 4,
                  'id' : 'awb7d33269',
                  'local' : false,
                  'remoteName' : 'spi:langcode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_issuetype',
                  'maxSize' : 20,
                  'id' : 'awcc0eae1a',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'unitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_unitcost',
                  'id' : 'aw7719110e',
                  'local' : false,
                  'remoteName' : 'spi:unitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glcreditacct',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_glcreditacct',
                  'maxSize' : 54,
                  'id' : 'awe3ff1bd0',
                  'local' : false,
                  'remoteName' : 'spi:glcreditacct',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'hasld',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_hasld',
                  'id' : 'aw9494e35d',
                  'local' : false,
                  'remoteName' : 'spi:hasld',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'statusdate',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_statusdate',
                  'id' : 'aw83c8771a',
                  'local' : false,
                  'remoteName' : 'spi:statusdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'currencycode',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_currencycode',
                  'maxSize' : 8,
                  'id' : 'aw86b70f74',
                  'local' : false,
                  'remoteName' : 'spi:currencycode',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'enterby',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_enterby',
                  'maxSize' : 30,
                  'id' : 'aw4edf4940',
                  'local' : false,
                  'remoteName' : 'spi:enterby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencyunitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_currencyunitcost',
                  'id' : 'awa5c56494',
                  'local' : false,
                  'remoteName' : 'spi:currencyunitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_invuselinenum',
                  'id' : 'aw46951e0',
                  'local' : false,
                  'remoteName' : 'spi:invuselinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_frombin',
                  'maxSize' : 50,
                  'id' : 'awa5a6e03d',
                  'local' : false,
                  'remoteName' : 'spi:frombin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'receivedMatrectrans_spi_exchangerate',
                  'id' : 'aw41aefc64',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_actualdate',
                  'id' : 'aw80e97d52',
                  'local' : false,
                  'remoteName' : 'spi:actualdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'awf35a3784',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'inspectedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_inspectedqty',
                  'id' : 'aw2fdb369f',
                  'local' : false,
                  'remoteName' : 'spi:inspectedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuseid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_invuseid',
                  'id' : 'aw63f99462',
                  'local' : false,
                  'remoteName' : 'spi:invuseid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'transdate',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_transdate',
                  'id' : 'awd9b766c',
                  'local' : false,
                  'remoteName' : 'spi:transdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'outside',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_outside',
                  'id' : 'awa4e45b4d',
                  'local' : false,
                  'remoteName' : 'spi:outside',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_qtyrequested',
                  'id' : 'aw908535db',
                  'local' : false,
                  'remoteName' : 'spi:qtyrequested',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'aw87bc6f46',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'financialperiod',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_financialperiod',
                  'maxSize' : 7,
                  'id' : 'awa3aa185c',
                  'local' : false,
                  'remoteName' : 'spi:financialperiod',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'enteredastask',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_enteredastask',
                  'id' : 'awed662e3c',
                  'local' : false,
                  'remoteName' : 'spi:enteredastask',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'rejectqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_rejectqty',
                  'id' : 'aw58e1accf',
                  'local' : false,
                  'remoteName' : 'spi:rejectqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'acceptedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_acceptqty',
                  'id' : 'awb91b737d',
                  'local' : false,
                  'remoteName' : 'spi:acceptedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'totalcurbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_totalcurbal',
                  'id' : 'awdde5231d',
                  'local' : false,
                  'remoteName' : 'spi:totalcurbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'aw1e03144d',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_quantity',
                  'id' : 'awa83a2360',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'actualcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_actualcost',
                  'id' : 'aw3251ded4',
                  'local' : false,
                  'remoteName' : 'spi:actualcost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'issue',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_issue',
                  'id' : 'awbfe3cc77',
                  'local' : false,
                  'remoteName' : 'spi:issue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'costinfo',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_costinfo',
                  'id' : 'aw1a58a640',
                  'local' : false,
                  'remoteName' : 'spi:costinfo',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'inspected',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_inspected',
                  'id' : 'awfed931a4',
                  'local' : false,
                  'remoteName' : 'spi:inspected',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receiptquantity',
                  'index' : true,
                  'scale' : 2,
                  'artifactId' : 'receivedMatrectrans_spi_receiptquantity',
                  'id' : 'aw65ba5294',
                  'local' : false,
                  'remoteName' : 'spi:receiptquantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'receivedMatrectrans',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'awb9639eeb',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'receivedMatrectrans',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'aw2e559875',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'reference',
                  'referenceResource' : 'receivedMatrectrans',
                  'name' : 'itemrotating',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_itemrotating',
                  'id' : 'aw58ed6830',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:issueunit',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'receivedMatrectrans',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_issueunit',
                  'maxSize' : 16,
                  'id' : 'aw9c6bf560',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'awreceiverotassetResource',
                  'name' : 'awreceiverotasset',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_awreceiverotasset',
                  'id' : 'aw374f583b',
                  'describedByResource' : 'awreceiverotassetResource',
                  'local' : false,
                  'remoteName' : 'spi:awreceiverotasset',
                  'selectExpression' : 'spi:awreceiverotasset{spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid}',
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localrejectqty',
                  'formula' : '${0}',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_rejectqty',
                  'id' : 'awd1334055',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localacceptqty',
                  'formula' : '(${quantity}\/${conversion})-${inspectedqty}',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_acceptqty',
                  'id' : 'aw30c99fe7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'quantityDue',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_quantityDue',
                  'id' : 'awf522c420',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localqty',
                  'formula' : '${qtyrequested} - ${quantity}',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_localreturnqty',
                  'id' : 'awcbbd9fea',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'newassetnumber',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_newassetnumber',
                  'id' : 'awcda343d3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'matrecResourceResource_errorMessage',
                  'id' : 'aw461d4ed7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spi_modelnum',
                  'maxSize' : 128,
                  'id' : 'awf4bee8ef',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'grnnumber',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_grnnumber',
                  'maxSize' : 30,
                  'id' : 'aw4e9ada95',
                  'local' : false,
                  'remoteName' : 'spi:grnnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'reference',
                  'referenceResource' : 'receivedMatrectrans',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spi_itemmodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw67a67c61',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spianywhereformnumber',
                  'maxSize' : 30,
                  'id' : 'awbbf6aa63',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_formnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'receivedMatrectrans_spianywheredocumentref',
                  'maxSize' : 100,
                  'id' : 'awf25c7333',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_documentref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'externalrefid',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spiexternalrefid',
                  'maxSize' : 10,
                  'id' : 'aw7504d2d',
                  'local' : false,
                  'remoteName' : 'spi:externalrefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_spiformno',
                  'maxSize' : 30,
                  'id' : 'awf431a429',
                  'local' : false,
                  'remoteName' : 'spi:formno',
               }).
               setCreationFactories([
                     {name:'receivedMatrectransCF', creationString:'\/oslc\/os\/oslcmatrectrans' }
               ]).
               setQueryBases([
                     {name:'getAllReceivedMatRecTrans', queryString:'\/oslc\/os\/oslcmatrectrans', defaultForSearch: true, queryLabel:'' }
               ]);
            var resourcePromise029 = PersistenceManager.initCollection( resource029 );


            var resource030 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'childMatrectrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'childMatrectrans',
                  'id' : 'aw6d3d777b',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:location,spi:issueto,spi:rotassetnum,spi:packingslipnum,spi:itemsetid,spi:orgid,spi:invuselineid,spi:shipmentlinenum,spi:conversion,spi:invuselinesplitid,spi:commoditygroup,spi:requestedby,spi:positeid,spi:receivedunit,spi:currencylinecost,spi:status,spi:oldavgcost,spi:curbal,spi:statuschangeby,spi:proratecost,spi:loadedcost,spi:fromstoreloc,spi:linecost2,spi:linetype,spi:tax5,spi:consignment,spi:linecost,spi:receiptref,spi:tax1,spi:ponum,spi:tax2,spi:polinenum,spi:tax3,spi:prorated,spi:tax4,spi:shipmentnum,spi:exchangerate2,spi:fromsiteid,spi:langcode,spi:issuetype,spi:unitcost,spi:glcreditacct,spi:hasld,spi:statusdate,spi:currencycode,spi:enterby,spi:currencyunitcost,spi:invuselinenum,spi:frombin,spi:exchangerate,spi:actualdate,spi:siteid,spi:inspectedqty,spi:invuseid,spi:transdate,spi:outside,spi:qtyrequested,spi:gldebitacct,spi:financialperiod,spi:enteredastask,spi:rejectqty,spi:acceptedqty,spi:totalcurbal,spi:tostoreloc,spi:quantity,spi:actualcost,spi:issue,spi:costinfo,spi:inspected,spi:receiptquantity,spi:modelnum,spi:grnnumber,spi:anywhere_formnumber,spi:anywhere_documentref,spi:externalrefid,spi:formno,spi:item{spi:modelnumref,spi:rotating,spi:issueunit,dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('spi:awreceiverotasset{spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'aw19e481a6',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_location',
                  'maxSize' : 30,
                  'id' : 'awfdd57009',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueto',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_issueto',
                  'maxSize' : 30,
                  'id' : 'awc3dc1c04',
                  'local' : false,
                  'remoteName' : 'spi:issueto',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_rotassetnum',
                  'maxSize' : 15,
                  'id' : 'aw2ccbbbed',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'aw5773cd2e',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw396c0395',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_orgid',
                  'maxSize' : 8,
                  'id' : 'aw2af3f35c',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselineid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_invuselineid',
                  'id' : 'awccac87bb',
                  'local' : false,
                  'remoteName' : 'spi:invuselineid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipmentlinenum',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_shipmentlinenum',
                  'maxSize' : 50,
                  'id' : 'awb1987b9a',
                  'local' : false,
                  'remoteName' : 'spi:shipmentlinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'scale' : 6,
                  'artifactId' : 'childMatrectrans_spi_conversion',
                  'id' : 'aw803c7b7b',
                  'local' : false,
                  'remoteName' : 'spi:conversion',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselinesplitid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_invuselinesplitid',
                  'id' : 'aw8a8b6837',
                  'local' : false,
                  'remoteName' : 'spi:invuselinesplitid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'commoditygroup',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_commoditygroup',
                  'maxSize' : 8,
                  'id' : 'awda39f43d',
                  'local' : false,
                  'remoteName' : 'spi:commoditygroup',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'requestedby',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_requestedby',
                  'maxSize' : 30,
                  'id' : 'aw2a6aa3bb',
                  'local' : false,
                  'remoteName' : 'spi:requestedby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'aw5af2aacb',
                  'local' : false,
                  'remoteName' : 'spi:positeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_receivedunit',
                  'maxSize' : 16,
                  'id' : 'awd685002',
                  'local' : false,
                  'remoteName' : 'spi:receivedunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencylinecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_currencylinecost',
                  'id' : 'aw949a8567',
                  'local' : false,
                  'remoteName' : 'spi:currencylinecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_status',
                  'maxSize' : 12,
                  'id' : 'awe0e15a88',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'oldavgcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_oldavgcost',
                  'id' : 'awf2f7fe75',
                  'local' : false,
                  'remoteName' : 'spi:oldavgcost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_curbal',
                  'id' : 'aw27f68cb0',
                  'local' : false,
                  'remoteName' : 'spi:curbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'statuschangeby',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_statuschangeby',
                  'maxSize' : 30,
                  'id' : 'aw2fd4ec2',
                  'local' : false,
                  'remoteName' : 'spi:statuschangeby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'proratecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_proratecost',
                  'id' : 'aw692f5518',
                  'local' : false,
                  'remoteName' : 'spi:proratecost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'loadedcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_loadedcost',
                  'id' : 'awf8775295',
                  'local' : false,
                  'remoteName' : 'spi:loadedcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'aw9694c961',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'linecost2',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_linecost2',
                  'id' : 'awd674d09',
                  'local' : false,
                  'remoteName' : 'spi:linecost2',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_linetype',
                  'maxSize' : 15,
                  'id' : 'aw91b5844b',
                  'local' : false,
                  'remoteName' : 'spi:linetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax5',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_tax5',
                  'id' : 'awa54d664f',
                  'local' : false,
                  'remoteName' : 'spi:tax5',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'consignment',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_consignment',
                  'id' : 'aw84e378ed',
                  'local' : false,
                  'remoteName' : 'spi:consignment',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'linecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_linecost',
                  'id' : 'aw54d479e',
                  'local' : false,
                  'remoteName' : 'spi:linecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'receiptref',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_receiptref',
                  'id' : 'aw64df0f3a',
                  'local' : false,
                  'remoteName' : 'spi:receiptref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax1',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_tax1',
                  'id' : 'awa220a256',
                  'local' : false,
                  'remoteName' : 'spi:tax1',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'awfa4aa23b',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax2',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_tax2',
                  'id' : 'aw3b29f3ec',
                  'local' : false,
                  'remoteName' : 'spi:tax2',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_polinenum',
                  'id' : 'awbd4d6b',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax3',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_tax3',
                  'id' : 'aw4c2ec37a',
                  'local' : false,
                  'remoteName' : 'spi:tax3',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'prorated',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_prorated',
                  'id' : 'awe9491250',
                  'local' : false,
                  'remoteName' : 'spi:prorated',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax4',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_tax4',
                  'id' : 'awd24a56d9',
                  'local' : false,
                  'remoteName' : 'spi:tax4',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipment',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_shipment',
                  'maxSize' : 50,
                  'id' : 'awa180d91e',
                  'local' : false,
                  'remoteName' : 'spi:shipmentnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate2',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'childMatrectrans_spi_exchangerate2',
                  'id' : 'awbfcae52e',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate2',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromsiteid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_fromsiteid',
                  'maxSize' : 8,
                  'id' : 'aw721415e3',
                  'local' : false,
                  'remoteName' : 'spi:fromsiteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'langcode',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_langcode',
                  'maxSize' : 4,
                  'id' : 'aw2351fefd',
                  'local' : false,
                  'remoteName' : 'spi:langcode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_issuetype',
                  'maxSize' : 20,
                  'id' : 'aw3bf87b8b',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'unitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_unitcost',
                  'id' : 'awe39bdd9a',
                  'local' : false,
                  'remoteName' : 'spi:unitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glcreditacct',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_glcreditacct',
                  'maxSize' : 54,
                  'id' : 'awb7bfaf93',
                  'local' : false,
                  'remoteName' : 'spi:glcreditacct',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'hasld',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_hasld',
                  'id' : 'awbc2728d4',
                  'local' : false,
                  'remoteName' : 'spi:hasld',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'statusdate',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_statusdate',
                  'id' : 'aw437221d',
                  'local' : false,
                  'remoteName' : 'spi:statusdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'currencycode',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_currencycode',
                  'maxSize' : 8,
                  'id' : 'awd2f7bb37',
                  'local' : false,
                  'remoteName' : 'spi:currencycode',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'enterby',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_enterby',
                  'maxSize' : 30,
                  'id' : 'awa82859c9',
                  'local' : false,
                  'remoteName' : 'spi:enterby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencyunitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_currencyunitcost',
                  'id' : 'aw724c1f63',
                  'local' : false,
                  'remoteName' : 'spi:currencyunitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_invuselinenum',
                  'id' : 'awebe8017e',
                  'local' : false,
                  'remoteName' : 'spi:invuselinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_frombin',
                  'maxSize' : 50,
                  'id' : 'aw4351f0b4',
                  'local' : false,
                  'remoteName' : 'spi:frombin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'childMatrectrans_spi_exchangerate',
                  'id' : 'aw15ee4827',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_actualdate',
                  'id' : 'aw7162855',
                  'local' : false,
                  'remoteName' : 'spi:actualdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw6716bfcb',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'inspectedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_inspectedqty',
                  'id' : 'aw7b9b82dc',
                  'local' : false,
                  'remoteName' : 'spi:inspectedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuseid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_invuseid',
                  'id' : 'awf77b58f6',
                  'local' : false,
                  'remoteName' : 'spi:invuseid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'transdate',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_transdate',
                  'id' : 'awfa6da3fd',
                  'local' : false,
                  'remoteName' : 'spi:transdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'outside',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_outside',
                  'id' : 'aw42134bc4',
                  'local' : false,
                  'remoteName' : 'spi:outside',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_qtyrequested',
                  'id' : 'awc4c58198',
                  'local' : false,
                  'remoteName' : 'spi:qtyrequested',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'aw195f05b0',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'financialperiod',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_financialperiod',
                  'maxSize' : 7,
                  'id' : 'aw270301bd',
                  'local' : false,
                  'remoteName' : 'spi:financialperiod',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'enteredastask',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_enteredastask',
                  'id' : 'aw2e77ea2',
                  'local' : false,
                  'remoteName' : 'spi:enteredastask',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'rejectqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_rejectqty',
                  'id' : 'awaf17795e',
                  'local' : false,
                  'remoteName' : 'spi:rejectqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'acceptedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_acceptqty',
                  'id' : 'aw4eeda6ec',
                  'local' : false,
                  'remoteName' : 'spi:acceptedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'totalcurbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_totalcurbal',
                  'id' : 'aw430649eb',
                  'local' : false,
                  'remoteName' : 'spi:totalcurbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'aw99fc414a',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_quantity',
                  'id' : 'aw3cb8eff4',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'actualcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_actualcost',
                  'id' : 'awb5ae8bd3',
                  'local' : false,
                  'remoteName' : 'spi:actualcost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'issue',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_issue',
                  'id' : 'aw975007fe',
                  'local' : false,
                  'remoteName' : 'spi:issue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'costinfo',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_costinfo',
                  'id' : 'aw8eda6ad4',
                  'local' : false,
                  'remoteName' : 'spi:costinfo',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'inspected',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_inspected',
                  'id' : 'aw92fe435',
                  'local' : false,
                  'remoteName' : 'spi:inspected',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receiptquantity',
                  'index' : true,
                  'scale' : 2,
                  'artifactId' : 'childMatrectrans_spi_receiptquantity',
                  'id' : 'awe1134b75',
                  'local' : false,
                  'remoteName' : 'spi:receiptquantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'childMatrectrans',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw5f948e62',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'childMatrectrans',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'awaafc8194',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'reference',
                  'referenceResource' : 'childMatrectrans',
                  'name' : 'itemrotating',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_itemrotating',
                  'id' : 'awcaddc73',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:issueunit',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'childMatrectrans',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_issueunit',
                  'maxSize' : 16,
                  'id' : 'aw6b9d20f1',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'awreceiverotassetResource',
                  'name' : 'awreceiverotasset',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spi_awreceiverotasset',
                  'id' : 'aw1441b6ff',
                  'describedByResource' : 'awreceiverotassetResource',
                  'local' : false,
                  'remoteName' : 'spi:awreceiverotasset',
                  'selectExpression' : 'spi:awreceiverotasset{spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid}',
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localrejectqty',
                  'formula' : '${0}',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_rejectqty',
                  'id' : 'awf9808bdc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localacceptqty',
                  'formula' : '${quantity}',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_acceptqty',
                  'id' : 'aw187a546e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'quantityDue',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_quantityDue',
                  'id' : 'aw13d5d4a9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localqty',
                  'formula' : '${qtyrequested} - ${quantity}',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_localreturnqty',
                  'id' : 'aw4c42caed',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'newassetnumber',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_newassetnumber',
                  'id' : 'aw4a5c16d4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_errorMessage',
                  'id' : 'aw86462dcb',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_modelnum',
                  'maxSize' : 128,
                  'id' : 'aw603c247b',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'grnnumber',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_grnnumber',
                  'maxSize' : 30,
                  'id' : 'awb96c0f04',
                  'local' : false,
                  'remoteName' : 'spi:grnnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'reference',
                  'referenceResource' : 'childMatrectrans',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spi_itemmodelnumref',
                  'maxSize' : 128,
                  'id' : 'awe30f6580',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spianywhereformnumber',
                  'maxSize' : 30,
                  'id' : 'aw98f844a7',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_formnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'childMatrectrans_spianywheredocumentref',
                  'maxSize' : 100,
                  'id' : 'aw6e767b74',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_documentref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'externalrefid',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spiexternalrefid',
                  'maxSize' : 10,
                  'id' : 'aw5310f96e',
                  'local' : false,
                  'remoteName' : 'spi:externalrefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'childMatrectrans_spiformno',
                  'maxSize' : 30,
                  'id' : 'awdc826fa0',
                  'local' : false,
                  'remoteName' : 'spi:formno',
               }).
               setCreationFactories([
                     {name:'childMatrectransCF', creationString:'\/oslc\/os\/oslcmatrectrans' }
               ]).
               setQueryBases([
                     {name:'getAllchildMatrectrans', queryString:'\/oslc\/os\/oslcmatrectrans', defaultForSearch: true, queryLabel:'' }
               ]);
            var resourcePromise030 = PersistenceManager.initCollection( resource030 );


            var resource031 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'poListComplexMatrectrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'poListComplexMatrectrans',
                  'id' : 'awb74825be',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:location,spi:rotassetnum,spi:packingslipnum,spi:itemsetid,spi:status,spi:receiptquantity,spi:issuetype,spi:receivedunit,spi:fromstoreloc,spi:polinenum,spi:ponum,spi:siteid,spi:positeid,spi:porevisionnum,spi:tostoreloc,spi:quantity,spi:inspectedqty,spi:statusdate,spi:inspected,spi:conversion,spi:rejectqty,spi:acceptedqty,spi:modelnum,spi:grnnumber,spi:anywhere_formnumber,spi:anywhere_documentref,spi:externalrefid,spi:formno,spi:item{spi:modelnumref,dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('spi:awreceiverotasset{spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'aw75fd1d7e',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_location',
                  'maxSize' : 30,
                  'id' : 'awea1b5204',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_rotassetnum',
                  'maxSize' : 15,
                  'id' : 'awff7d813e',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'awdf178e54',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw47cab10a',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_status',
                  'maxSize' : 12,
                  'id' : 'awa0176081',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receiptquantity',
                  'index' : true,
                  'scale' : 2,
                  'artifactId' : 'poListComplexMatrectrans_spi_receiptquantity',
                  'id' : 'aw514bb714',
                  'local' : false,
                  'remoteName' : 'spi:receiptquantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spi_issuetype',
                  'maxSize' : 20,
                  'id' : 'aw455ec914',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_receivedunit',
                  'maxSize' : 16,
                  'id' : 'aw12616556',
                  'local' : false,
                  'remoteName' : 'spi:receivedunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'aw899dfc35',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_polinenum',
                  'id' : 'aw7e1bfff4',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'awd37bcdd1',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw27e085c2',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'aw4d3c88c6',
                  'local' : false,
                  'remoteName' : 'spi:positeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'porevisionnum',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_porevisionnum',
                  'id' : 'awde7e9d07',
                  'local' : false,
                  'remoteName' : 'spi:porevisionnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'poListComplexMatrectrans',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw2608c0fc',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'poListComplexMatrectrans',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'aw1aa47df5',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'awf932692d',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poListComplexMatrectrans_spi_quantity',
                  'id' : 'aw2b76cdf9',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'inspectedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poListComplexMatrectrans_spi_inspectedqty',
                  'id' : 'aw6492b788',
                  'local' : false,
                  'remoteName' : 'spi:inspectedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'statusdate',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_statusdate',
                  'id' : 'aw64f90a7a',
                  'local' : false,
                  'remoteName' : 'spi:statusdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'inspected',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_inspected',
                  'id' : 'aw778956aa',
                  'local' : false,
                  'remoteName' : 'spi:inspected',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'scale' : 6,
                  'artifactId' : 'poListComplexMatrectrans_spi_conversion',
                  'id' : 'awe0f2531c',
                  'local' : false,
                  'remoteName' : 'spi:conversion',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'rejectqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poListComplexMatrectrans_spi_rejectqty',
                  'id' : 'awd1b1cbc1',
                  'local' : false,
                  'remoteName' : 'spi:rejectqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'acceptedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poListComplexMatrectrans_spi_acceptqty',
                  'id' : 'aw304b1473',
                  'local' : false,
                  'remoteName' : 'spi:acceptedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'awreceiverotassetResource',
                  'name' : 'awreceiverotasset',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spi_awreceiverotasset',
                  'id' : 'awdcace276',
                  'describedByResource' : 'awreceiverotassetResource',
                  'local' : false,
                  'remoteName' : 'spi:awreceiverotasset',
                  'selectExpression' : 'spi:awreceiverotasset{spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid}',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spi_modelnum',
                  'maxSize' : 128,
                  'id' : 'aw77f20676',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'grnnumber',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spi_grnnumber',
                  'maxSize' : 30,
                  'id' : 'awc7cabd9b',
                  'local' : false,
                  'remoteName' : 'spi:grnnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'reference',
                  'referenceResource' : 'poListComplexMatrectrans',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spi_itemmodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw535799e1',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spianywhereformnumber',
                  'maxSize' : 30,
                  'id' : 'aw5015102e',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_formnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spianywheredocumentref',
                  'maxSize' : 100,
                  'id' : 'awfadaada4',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_documentref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'externalrefid',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_spiexternalrefid',
                  'maxSize' : 10,
                  'id' : 'aw4c19cc3a',
                  'local' : false,
                  'remoteName' : 'spi:externalrefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : true,
                  'artifactId' : 'poListComplexMatrectrans_spiformno',
                  'maxSize' : 30,
                  'id' : 'awf5b3004a',
                  'local' : false,
                  'remoteName' : 'spi:formno',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'newassetnumber',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_newassetnumber',
                  'id' : 'aw2a923eb3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localrejectqty',
                  'formula' : '${0}',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_rejectqty',
                  'id' : 'awd0b1e436',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localacceptqty',
                  'formula' : '(${quantity}\/${conversion})-${inspectedqty}',
                  'index' : false,
                  'artifactId' : 'receivedMatrectrans_acceptqtysss',
                  'id' : 'awdc242f7c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'convertedquantity',
                  'formula' : '${quantity}\/${conversion}',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_convertedquanity',
                  'id' : 'aw19abd363',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'poListComplexMatrectrans_errorMessage',
                  'id' : 'aw91880fc6',
                  'persistent' : true,
                  'local' : true,
               }).
               setCreationFactories([
                     {name:'poListComplexMatrectransCF', creationString:'\/oslc\/os\/oslcmatrectrans' }
               ]).
               setQueryBases([
                     {name:'getListPOMatrectrans', queryString:'\/oslc\/os\/oslcmatrectrans?savedQuery=getListPOReceiptsWithComplexQuery', queryLabel:'' }
               ]);
            var resourcePromise031 = PersistenceManager.initCollection( resource031 );


            var resource032 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'poComplexMatrectrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'poComplexMatrectrans',
                  'id' : 'aw2da3582b',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:location,spi:rotassetnum,spi:packingslipnum,spi:itemsetid,spi:status,spi:receiptquantity,spi:issuetype,spi:receivedunit,spi:qtyrequested,spi:positeid,spi:ponum,spi:polinenum,spi:porevisionnum,spi:exchangerate,spi:currencylinecost,spi:gldebitacct,spi:transdate,spi:tolot,spi:tobin,spi:conditioncode,spi:actualdate,spi:linetype,spi:orderqty,spi:remark,spi:receiptref,spi:asn,spi:tostoreloc,spi:enterby,spi:siteid,spi:quantity,spi:invoicenum,spi:inspectedqty,spi:issueto,spi:refwo,spi:issue,spi:modelnum,spi:grnnumber,spi:anywhere_formnumber,spi:anywhere_documentref,spi:externalrefid,spi:formno,spi:item{spi:modelnumref,spi:rotating,dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('spi:invoice{spi:invoicenum,spi:status}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'aw3548f24d',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_location',
                  'maxSize' : 30,
                  'id' : 'aw8b21de03',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_rotassetnum',
                  'maxSize' : 15,
                  'id' : 'awab08992f',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'aw60875aad',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'awd9cf1e25',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_status',
                  'maxSize' : 12,
                  'id' : 'awdc384b0',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receiptquantity',
                  'index' : true,
                  'scale' : 2,
                  'artifactId' : 'poComplexMatrectrans_spi_receiptquantity',
                  'id' : 'aw95956d78',
                  'local' : false,
                  'remoteName' : 'spi:receiptquantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spi_issuetype',
                  'maxSize' : 20,
                  'id' : 'awdb5b663b',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_receivedunit',
                  'maxSize' : 16,
                  'id' : 'aw788530bc',
                  'local' : false,
                  'remoteName' : 'spi:receivedunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poComplexMatrectrans_spi_qtyrequested',
                  'id' : 'awb128e126',
                  'local' : false,
                  'remoteName' : 'spi:qtyrequested',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'aw2c0604c1',
                  'local' : false,
                  'remoteName' : 'spi:positeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'aw6017babb',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_polinenum',
                  'id' : 'awe01e50db',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'porevisionnum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_porevisionnum',
                  'id' : 'aw9ecb7234',
                  'local' : false,
                  'remoteName' : 'spi:porevisionnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'poComplexMatrectrans_spi_exchangerate',
                  'id' : 'aw60032899',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencylinecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poComplexMatrectrans_spi_currencylinecost',
                  'id' : 'awea5f7ffc',
                  'local' : false,
                  'remoteName' : 'spi:currencylinecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'aw9e9c2772',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'transdate',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_transdate',
                  'id' : 'aw1acebe4d',
                  'local' : false,
                  'remoteName' : 'spi:transdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tolot',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_tolot',
                  'maxSize' : 9,
                  'id' : 'aw42559a0e',
                  'local' : false,
                  'remoteName' : 'spi:tolot',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'tobin',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_tobin',
                  'maxSize' : 50,
                  'id' : 'awe3f3e9f8',
                  'local' : false,
                  'remoteName' : 'spi:tobin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'conditioncode',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_conditioncode',
                  'maxSize' : 30,
                  'id' : 'awced23cad',
                  'local' : false,
                  'remoteName' : 'spi:conditioncode',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_actualdate',
                  'id' : 'awcc9738c4',
                  'local' : false,
                  'remoteName' : 'spi:actualdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_linetype',
                  'maxSize' : 15,
                  'id' : 'awe7412a41',
                  'local' : false,
                  'remoteName' : 'spi:linetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'float',
                  'usage' : 'float',
                  'name' : 'orderqty',
                  'index' : false,
                  'scale' : 0,
                  'artifactId' : 'poComplexMatrectrans_spi_orderqty',
                  'id' : 'awf69951df',
                  'local' : false,
                  'remoteName' : 'spi:orderqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'remark',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_remark',
                  'maxSize' : 254,
                  'id' : 'aw97093995',
                  'local' : false,
                  'remoteName' : 'spi:remark',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'receiptref',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_receiptref',
                  'id' : 'awaf5e1fab',
                  'local' : false,
                  'remoteName' : 'spi:receiptref',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'asn',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_asn',
                  'id' : 'awcd3865e4',
                  'local' : false,
                  'remoteName' : 'spi:asn',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'aw527d51db',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'enterby',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_enterby',
                  'maxSize' : 30,
                  'id' : 'aw80c7c389',
                  'local' : false,
                  'remoteName' : 'spi:enterby',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw8a3461f3',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poComplexMatrectrans_spi_quantity',
                  'id' : 'aw4a4c41fe',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'invoicenum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_invoicenum',
                  'maxSize' : 9,
                  'id' : 'aw65a7d70d',
                  'local' : false,
                  'remoteName' : 'spi:invoicenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'inspectedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'poComplexMatrectrans_spi_inspectedqty',
                  'id' : 'awe76e262',
                  'local' : false,
                  'remoteName' : 'spi:inspectedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueto',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_issueto',
                  'maxSize' : 30,
                  'id' : 'aweb338644',
                  'local' : false,
                  'remoteName' : 'spi:issueto',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_refwo',
                  'maxSize' : 10,
                  'id' : 'awa7415ba9',
                  'local' : false,
                  'remoteName' : 'spi:refwo',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'issue',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_issue',
                  'id' : 'awd0d1f7e',
                  'local' : false,
                  'remoteName' : 'spi:issue',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'invoiceResource',
                  'name' : 'invoice',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_invoice_spiinvoice',
                  'id' : 'aw432c253c',
                  'describedByResource' : 'invoiceResource',
                  'local' : false,
                  'remoteName' : 'spi:invoice',
                  'selectExpression' : 'spi:invoice{spi:invoicenum,spi:status}',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'poComplexMatrectrans',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw777b1422',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'poComplexMatrectrans',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'awde7aa799',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'reference',
                  'referenceResource' : 'poComplexMatrectrans',
                  'name' : 'itemrotating',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spi_itemrotating',
                  'id' : 'aw7940bccd',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spi_modelnum',
                  'maxSize' : 128,
                  'id' : 'aw16c88a71',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'grnnumber',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spi_grnnumber',
                  'maxSize' : 30,
                  'id' : 'aw59cf12b4',
                  'local' : false,
                  'remoteName' : 'spi:grnnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'reference',
                  'referenceResource' : 'poComplexMatrectrans',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spi_itemmodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw9789438d',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spianywhereformnumber',
                  'maxSize' : 30,
                  'id' : 'awff5bcb91',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_formnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'poComplexMatrectrans_spianywheredocumentref',
                  'maxSize' : 100,
                  'id' : 'awa1ab4d62',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_documentref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'externalrefid',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spiexternalrefid',
                  'maxSize' : 10,
                  'id' : 'aw26fd99d0',
                  'local' : false,
                  'remoteName' : 'spi:externalrefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_spiformno',
                  'maxSize' : 30,
                  'id' : 'aw46df7720',
                  'local' : false,
                  'remoteName' : 'spi:formno',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'voidindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_transfer_voidindicator',
                  'id' : 'awfd9259e6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'returnindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_transfer_returnindicator',
                  'id' : 'aw52c2bcd1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'qtyToBeReturned',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_transfer_qtyToBeReturned',
                  'id' : 'awd356d830',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'lifofiforeturnqty',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_transfer_lifofiforeturnqty',
                  'id' : 'aw2b7c1e7a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_transfer_errorMessage',
                  'id' : 'aw539e13a5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueTo',
                  'index' : false,
                  'artifactId' : 'poComplexMatrectrans_transfer_issueTo_local',
                  'id' : 'awdeb5b5fc',
                  'persistent' : true,
                  'local' : true,
               }).
               setCreationFactories([
                     {name:'poComplexMatrectransCF', creationString:'\/oslc\/os\/oslcmatrectrans' }
               ]).
               setQueryBases([
                     {name:'getAllMatRecTrans', queryString:'\/oslc\/os\/oslcmatrectrans?savedQuery=getPOReceiptsWithComplexQuery', queryLabel:'' }
               ]);
            var resourcePromise032 = PersistenceManager.initCollection( resource032 );


            var resource033 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'assignRotatingItemsMatrectransResource',
                  'resourceName' : 'assignRotatingItemsMatrectransResource',
                  'id' : 'awe57849c3',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_matrectransid',
                  'id' : 'aw7ec469c2',
                  'persistent' : true,
                  'key' : '1',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_location',
                  'id' : 'awaf10721e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_rotassetnum',
                  'id' : 'awec9a5af7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_packingslipnum',
                  'id' : 'aw1dcb4887',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_itemsetid',
                  'id' : 'awbaed4350',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_status',
                  'id' : 'aw6748afe2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'receiptquantity',
                  'index' : true,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_receiptquantity',
                  'id' : 'aw4e53e8bc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_issuetype',
                  'id' : 'awb8793b4e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_receivedunit',
                  'id' : 'awf0caf899',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_fromstoreloc',
                  'id' : 'aw6b3661fa',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_polinenum',
                  'id' : 'aw833c0dae',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_ponum',
                  'id' : 'aw5b1c1aaa',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_siteid',
                  'id' : 'awe0bf4aa1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'positeid',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_positeid',
                  'id' : 'aw837a8dc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_itemnum',
                  'id' : 'awf274afd1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_itemdescription',
                  'id' : 'aw5bc225d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_tostoreloc',
                  'id' : 'aw7271f635',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_quantity',
                  'id' : 'aw6e7dede3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'inspectedqty',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_inspectedqty',
                  'id' : 'aw86392a47',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'statusdate',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_statusdate',
                  'id' : 'awefba9562',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'inspected',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_inspected',
                  'id' : 'aw8aaea4f0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_conversion',
                  'id' : 'aw6bb1cc04',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'rejectqty',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_rejectqty',
                  'id' : 'aw2c96399b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'acceptedqty',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_spi_acceptqty',
                  'id' : 'awcd6ce629',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localrejectqty',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_rejectqty',
                  'id' : 'aw58d6334d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localacceptqty',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_acceptqtys',
                  'id' : 'aw36b50c6a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'convertedquantity',
                  'index' : false,
                  'artifactId' : 'assignRotatingItemsMatrectransResource_convertedquanity',
                  'id' : 'awfb004eac',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise033 = PersistenceManager.initCollection( resource033 );


            var resource034 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'matrectrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'matrectrans',
                  'additionalData' : false,
                  'id' : 'aw6c35f6bf',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:packingslipnum,spi:itemsetid,spi:orgid,spi:invuselineid,spi:shipmentlinenum,spi:conversion,spi:invuselinesplitid,spi:commoditygroup,spi:requestedby,spi:positeid,spi:receivedunit,spi:currencylinecost,spi:status,spi:oldavgcost,spi:curbal,spi:statuschangeby,spi:proratecost,spi:loadedcost,spi:fromstoreloc,spi:linecost2,spi:linetype,spi:tax5,spi:consignment,spi:linecost,spi:tax1,spi:ponum,spi:tax2,spi:polinenum,spi:tax3,spi:prorated,spi:tax4,spi:shipmentnum,spi:exchangerate2,spi:fromsiteid,spi:langcode,spi:issuetype,spi:unitcost,spi:glcreditacct,spi:hasld,spi:statusdate,spi:currencycode,spi:enterby,spi:currencyunitcost,spi:invuselinenum,spi:frombin,spi:exchangerate,spi:actualdate,spi:siteid,spi:inspectedqty,spi:invuseid,spi:transdate,spi:outside,spi:qtyrequested,spi:gldebitacct,spi:financialperiod,spi:enteredastask,spi:rejectqty,spi:totalcurbal,spi:tostoreloc,spi:quantity,spi:actualcost,spi:issue,spi:costinfo,spi:tobin,spi:tolot,spi:receiptquantity,spi:receiptref,spi:modelnum,spi:grnnumber,spi:anywhere_formnumber,spi:anywhere_documentref,spi:externalrefid,spi:formno,spi:item{spi:modelnumref,spi:rotating,dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'awf168844d',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'aw60437adb',
                  'local' : false,
                  'remoteName' : 'spi:packingslipnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw5874c131',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_orgid',
                  'maxSize' : 8,
                  'id' : 'aw5f1b598a',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselineid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_invuselineid',
                  'id' : 'awf87d5ffc',
                  'local' : false,
                  'remoteName' : 'spi:invuselineid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipmentlinenum',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_shipmentlinenum',
                  'maxSize' : 50,
                  'id' : 'aw7c784dbe',
                  'local' : false,
                  'remoteName' : 'spi:shipmentlinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'scale' : 6,
                  'artifactId' : 'matrectrans_spi_conversion',
                  'id' : 'aw51e60448',
                  'local' : false,
                  'remoteName' : 'spi:conversion',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuselinesplitid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_invuselinesplitid',
                  'id' : 'awb4d9d1e8',
                  'local' : false,
                  'remoteName' : 'spi:invuselinesplitid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'commoditygroup',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_commoditygroup',
                  'maxSize' : 8,
                  'id' : 'awed0943c8',
                  'local' : false,
                  'remoteName' : 'spi:commoditygroup',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'requestedby',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_requestedby',
                  'maxSize' : 30,
                  'id' : 'aw956b18d2',
                  'local' : false,
                  'remoteName' : 'spi:requestedby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'aw29cfdd15',
                  'local' : false,
                  'remoteName' : 'spi:positeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_receivedunit',
                  'maxSize' : 16,
                  'id' : 'aw39b98845',
                  'local' : false,
                  'remoteName' : 'spi:receivedunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencylinecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_currencylinecost',
                  'id' : 'awa8548180',
                  'local' : false,
                  'remoteName' : 'spi:currencylinecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_status',
                  'maxSize' : 12,
                  'id' : 'aw8f24c5c3',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'oldavgcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_oldavgcost',
                  'id' : 'aw232d8146',
                  'local' : false,
                  'remoteName' : 'spi:oldavgcost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_curbal',
                  'id' : 'aw483313fb',
                  'local' : false,
                  'remoteName' : 'spi:curbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'statuschangeby',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_statuschangeby',
                  'maxSize' : 30,
                  'id' : 'aw35cdf937',
                  'local' : false,
                  'remoteName' : 'spi:statuschangeby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'proratecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_proratecost',
                  'id' : 'awd62eee71',
                  'local' : false,
                  'remoteName' : 'spi:proratecost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'loadedcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_loadedcost',
                  'id' : 'aw29ad2da6',
                  'local' : false,
                  'remoteName' : 'spi:loadedcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'awa2451126',
                  'local' : false,
                  'remoteName' : 'spi:fromstoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'linecost2',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_linecost2',
                  'id' : 'aw6c7f8fad',
                  'local' : false,
                  'remoteName' : 'spi:linecost2',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_linetype',
                  'maxSize' : 15,
                  'id' : 'awe288f395',
                  'local' : false,
                  'remoteName' : 'spi:linetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax5',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_tax5',
                  'id' : 'aw27442c8d',
                  'local' : false,
                  'remoteName' : 'spi:tax5',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'consignment',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_consignment',
                  'id' : 'aw3be2c384',
                  'local' : false,
                  'remoteName' : 'spi:consignment',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'linecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_linecost',
                  'id' : 'aw76703040',
                  'local' : false,
                  'remoteName' : 'spi:linecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax1',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_tax1',
                  'id' : 'aw2029e894',
                  'local' : false,
                  'remoteName' : 'spi:tax1',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'aw8fa208ed',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax2',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_tax2',
                  'id' : 'awb920b92e',
                  'local' : false,
                  'remoteName' : 'spi:tax2',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_polinenum',
                  'id' : 'aw61a58fcf',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax3',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_tax3',
                  'id' : 'awce2789b8',
                  'local' : false,
                  'remoteName' : 'spi:tax3',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'prorated',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_prorated',
                  'id' : 'aw9a74658e',
                  'local' : false,
                  'remoteName' : 'spi:prorated',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'tax4',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_tax4',
                  'id' : 'aw50431c1b',
                  'local' : false,
                  'remoteName' : 'spi:tax4',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipment',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_shipment',
                  'maxSize' : 50,
                  'id' : 'awd2bdaec0',
                  'local' : false,
                  'remoteName' : 'spi:shipmentnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate2',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'matrectrans_spi_exchangerate2',
                  'id' : 'aw5746e0c5',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate2',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromsiteid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_fromsiteid',
                  'maxSize' : 8,
                  'id' : 'awa3ce6ad0',
                  'local' : false,
                  'remoteName' : 'spi:fromsiteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'langcode',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_langcode',
                  'maxSize' : 4,
                  'id' : 'aw506c8923',
                  'local' : false,
                  'remoteName' : 'spi:langcode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_issuetype',
                  'maxSize' : 20,
                  'id' : 'aw5ae0b92f',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'unitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_unitcost',
                  'id' : 'aw90a6aa44',
                  'local' : false,
                  'remoteName' : 'spi:unitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glcreditacct',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_glcreditacct',
                  'maxSize' : 54,
                  'id' : 'aw836e77d4',
                  'local' : false,
                  'remoteName' : 'spi:glcreditacct',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'hasld',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_hasld',
                  'id' : 'awc9cf8202',
                  'local' : false,
                  'remoteName' : 'spi:hasld',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'statusdate',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_statusdate',
                  'id' : 'awd5ed5d2e',
                  'local' : false,
                  'remoteName' : 'spi:statusdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'currencycode',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_currencycode',
                  'maxSize' : 8,
                  'id' : 'awe6266370',
                  'local' : false,
                  'remoteName' : 'spi:currencycode',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'enterby',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_enterby',
                  'maxSize' : 30,
                  'id' : 'aw4949044e',
                  'local' : false,
                  'remoteName' : 'spi:enterby',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'currencyunitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_currencyunitcost',
                  'id' : 'aw4e821b84',
                  'local' : false,
                  'remoteName' : 'spi:currencyunitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_invuselinenum',
                  'id' : 'aw3640495',
                  'local' : false,
                  'remoteName' : 'spi:invuselinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_frombin',
                  'maxSize' : 50,
                  'id' : 'awa230ad33',
                  'local' : false,
                  'remoteName' : 'spi:frombin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'exchangerate',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'matrectrans_spi_exchangerate',
                  'id' : 'aw213f9060',
                  'local' : false,
                  'remoteName' : 'spi:exchangerate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_actualdate',
                  'id' : 'awd6cc5766',
                  'local' : false,
                  'remoteName' : 'spi:actualdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw8d32080',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'inspectedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_inspectedqty',
                  'id' : 'aw4f4a5a9b',
                  'local' : false,
                  'remoteName' : 'spi:inspectedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'invuseid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_invuseid',
                  'id' : 'aw84462f28',
                  'local' : false,
                  'remoteName' : 'spi:invuseid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'transdate',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_transdate',
                  'id' : 'aw9b756159',
                  'local' : false,
                  'remoteName' : 'spi:transdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'outside',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_outside',
                  'id' : 'awa3721643',
                  'local' : false,
                  'remoteName' : 'spi:outside',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_qtyrequested',
                  'id' : 'awf01459df',
                  'local' : false,
                  'remoteName' : 'spi:qtyrequested',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'awa65ebed9',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'financialperiod',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_financialperiod',
                  'maxSize' : 7,
                  'id' : 'aweae33799',
                  'local' : false,
                  'remoteName' : 'spi:financialperiod',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'enteredastask',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_enteredastask',
                  'id' : 'awea6b7b49',
                  'local' : false,
                  'remoteName' : 'spi:enteredastask',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'rejectqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_rejectqty',
                  'id' : 'awce0fbbfa',
                  'local' : false,
                  'remoteName' : 'spi:rejectqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'totalcurbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_totalcurbal',
                  'id' : 'awfc07f282',
                  'local' : false,
                  'remoteName' : 'spi:totalcurbal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'aw48263e79',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_quantity',
                  'id' : 'aw4f85982a',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'usage' : 'amount',
                  'name' : 'actualcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_actualcost',
                  'id' : 'aw6474f4e0',
                  'local' : false,
                  'remoteName' : 'spi:actualcost',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'issue',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_issue',
                  'id' : 'awe2b8ad28',
                  'local' : false,
                  'remoteName' : 'spi:issue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'costinfo',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_costinfo',
                  'id' : 'awfde71d0a',
                  'local' : false,
                  'remoteName' : 'spi:costinfo',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'tobin',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_tobin',
                  'maxSize' : 50,
                  'id' : 'awc465bae',
                  'local' : false,
                  'remoteName' : 'spi:tobin',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tolot',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_toloc',
                  'maxSize' : 9,
                  'id' : 'aw2e33ad9f',
                  'local' : false,
                  'remoteName' : 'spi:tolot',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receiptquantity',
                  'index' : true,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_spi_receiptquantity',
                  'id' : 'aw2cf37d51',
                  'local' : false,
                  'remoteName' : 'spi:receiptquantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'matrectrans',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'awbef5d3e5',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'matrectrans',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'aw671cb7b0',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'reference',
                  'referenceResource' : 'matrectrans',
                  'name' : 'itemrotating',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_itemrotating',
                  'id' : 'aw387c0434',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'receiptref',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_receiptref',
                  'id' : 'awb5057009',
                  'local' : false,
                  'remoteName' : 'spi:receiptref',
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localqty',
                  'formula' : '${quantity}',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_localreturnqty',
                  'id' : 'aw88861461',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'voidindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'matrectrans_transfer_voidindicator',
                  'id' : 'aw241df20c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'returnindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'matrectrans_transfer_returnindicator',
                  'id' : 'awb7570458',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'qtyToBeReturned',
                  'index' : false,
                  'artifactId' : 'matrectrans_spi_qtyToBeReturned',
                  'id' : 'awbc187481',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'matrectrans_errorMessage',
                  'id' : 'awf57b5a15',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_modelnum',
                  'maxSize' : 128,
                  'id' : 'aw130153a5',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'grnnumber',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_grnnumber',
                  'maxSize' : 30,
                  'id' : 'awd874cda0',
                  'local' : false,
                  'remoteName' : 'spi:grnnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'reference',
                  'referenceResource' : 'matrectrans',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'matrectrans_spi_itemmodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw2eef53a4',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'matrectrans_spianywhereformnumber',
                  'maxSize' : 30,
                  'id' : 'awa6aafd78',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_formnumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'matrectrans_spianywheredocumentref',
                  'maxSize' : 100,
                  'id' : 'aw7824e688',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_documentref',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'externalrefid',
                  'index' : false,
                  'artifactId' : 'matrectrans_spiexternalrefid',
                  'maxSize' : 10,
                  'id' : 'aw67c12129',
                  'local' : false,
                  'remoteName' : 'spi:externalrefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'matrectrans_spiformno',
                  'maxSize' : 30,
                  'id' : 'awa96ac576',
                  'local' : false,
                  'remoteName' : 'spi:formno',
               }).
               setCreationFactories([
                     {name:'matrectransResourceCF', creationString:'\/oslc\/os\/oslcmatrectrans' }
               ]).
               setQueryBases([
                     {name:'getAllMatRecTrans', queryString:'\/oslc\/os\/oslcmatrectrans?savedQuery=getVoidReturnWithComplexQuery', queryLabel:'' }
               ]);
            var resourcePromise034 = PersistenceManager.initCollection( resource034 );


            var resource035 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'matrectransShippedItems',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'matrectransShippedItems',
                  'additionalData' : false,
                  'id' : 'aw54b10b3d',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:siteid,spi:positeid,dcterms:title,spi:issuetype,spi:shipmentnum,spi:quantity,spi:qtyrequested,spi:location,spi:externalrefid,spi:item{oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'aw667d3c85',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw328ec6ac',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'aw5997cbab',
                  'local' : false,
                  'remoteName' : 'spi:positeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'matrectransShippedItems',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw8c17e2e0',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_itemdesc',
                  'maxSize' : 512,
                  'id' : 'aw1e5563e',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issuetype',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_issuetype',
                  'maxSize' : 20,
                  'id' : 'aw76497fb2',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipment',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_shipment',
                  'maxSize' : 50,
                  'id' : 'awa2e5b87e',
                  'local' : false,
                  'remoteName' : 'spi:shipmentnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_shippedItems_spi_quantity',
                  'id' : 'aw3fdd8e94',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'matrectrans_shippedItems_spi_qtyrequested',
                  'id' : 'aw377519d4',
                  'local' : false,
                  'remoteName' : 'spi:qtyrequested',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spi_location',
                  'maxSize' : 30,
                  'id' : 'awfeb01169',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'voidindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_transfer_voidindicator',
                  'id' : 'aw1534a25',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localqty',
                  'formula' : '${qtyrequested} - ${quantity}',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_localreturnqty',
                  'id' : 'aw130af3e1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'externalrefid',
                  'index' : false,
                  'artifactId' : 'matrectrans_shippedItems_spiexternalrefid',
                  'maxSize' : 10,
                  'id' : 'awa0a06122',
                  'local' : false,
                  'remoteName' : 'spi:externalrefid',
               }).
               setQueryBases([
                     {name:'getReceiveRecTrans', queryString:'', queryLabel:'' }
               ]);
            var resourcePromise035 = PersistenceManager.initCollection( resource035 );


            var resource036 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'additionalServiceLineType',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalServiceLineType',
                  'id' : 'awc3bbdf0c',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw570ead92',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw2122f69e',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw1cd21c63',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw1ee2b23e',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw77476dca',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_defaults_spidefaults',
                  'id' : 'aw8418ee23',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'awf3887300',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'additionalServiceLineType_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw26eccb1d',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getlinetype', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22LINETYPE%22+and+spi%3Amaxvalue+in+%5B%22SERVICE%22%5D');
            var resourcePromise036 = PersistenceManager.initCollection( resource036 );


            var resource037 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'complexAssettrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'complexAssettrans',
                  'additionalData' : false,
                  'id' : 'awf8a98e3',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:assetnum,spi:toloc,spi:transdate,spi:enterby,spi:siteid,spi:matrectrans{spi:asn,spi:exchangerate,spi:tobin,spi:positeid,spi:packingslipnum,spi:polinenum,spi:receivedunit,spi:gldebitacct,spi:qtyrequested,spi:unitcost,spi:conditioncode,dcterms:identifier,spi:invoicenum,spi:remark,spi:receiptquantity,spi:tolot,spi:ponum,spi:actualdate},spi:asset{spi:itemnum,spi:binnum,spi:invcost,spi:moved,spi:location{oslc:shortTitle},dcterms:title}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'assettransid',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_spi_assettranssid',
                  'maxSize' : 19,
                  'id' : 'awa696e806',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'assetnum',
                  'index' : true,
                  'artifactId' : 'complexAssettrans_spi_assetnum',
                  'maxSize' : 15,
                  'id' : 'awcb5ef9a9',
                  'local' : false,
                  'remoteName' : 'spi:assetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'toloc',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_spi_toloc',
                  'maxSize' : 30,
                  'id' : 'awac32031c',
                  'local' : false,
                  'remoteName' : 'spi:toloc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'transdate',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_spi_transdate',
                  'id' : 'awadd2dbab',
                  'local' : false,
                  'remoteName' : 'spi:transdate',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'enterby',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_spi_enterby',
                  'maxSize' : 30,
                  'id' : 'aw6889c328',
                  'local' : false,
                  'remoteName' : 'spi:enterby',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw7ce0f3b4',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:identifier',
                  'dataType' : 'reference',
                  'usage' : 'bigint',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_matrectransid',
                  'maxSize' : 19,
                  'id' : 'aw92617c3c',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:tobin',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'tobin',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_tobin',
                  'maxSize' : 50,
                  'id' : 'aw4dd2f36d',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:tolot',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'tolot',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_tolot',
                  'maxSize' : 9,
                  'id' : 'awec74809b',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:ponum',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'awce36a02e',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:polinenum',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_polinenum',
                  'id' : 'awc6c0fce7',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:positeid',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'positeid',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_positeid',
                  'maxSize' : 8,
                  'id' : 'aw2b9a94f1',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:asn',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'asn',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_asn',
                  'id' : 'awb274c974',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:remark',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'remark',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_remark',
                  'maxSize' : 254,
                  'id' : 'aw17c27f44',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:unitcost',
                  'dataType' : 'reference',
                  'usage' : 'amount',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'unitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_unitcost',
                  'id' : 'aw92f3e3a0',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:receivedunit',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_receivedunit',
                  'maxSize' : 16,
                  'id' : 'aw362d2058',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:receiptquantity',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'receiptquantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_receiptquantity',
                  'id' : 'awa9b12cc1',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:actualdate',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_actualdate',
                  'id' : 'awe3de9aef',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:exchangerate',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'exchangerate',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_exchangerate',
                  'id' : 'aw2eab387d',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:packingslipnum',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_packingslipnum',
                  'maxSize' : 50,
                  'id' : 'aw47223289',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:qtyrequested',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_qtyrequested',
                  'id' : 'awff80f1c2',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:invoicenum',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'invoicenum',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_invoicenum',
                  'maxSize' : 9,
                  'id' : 'aw4aee7526',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:conditioncode',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'conditioncode',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_conditioncode',
                  'maxSize' : 30,
                  'id' : 'aw69fbb2dc',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:gldebitacct',
                  'dataType' : 'reference',
                  'usage' : 'gl',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_matrectrans_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'aw320f9790',
                  'local' : false,
                  'remoteName' : 'spi:matrectrans',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'assetdescription',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_asset_spi_description',
                  'maxSize' : 512,
                  'id' : 'aw290abf56',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:moved',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'moved',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_asset_spi_moved',
                  'id' : 'awf822bba',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:itemnum',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_asset_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'awe039a479',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_asset_spi_location',
                  'maxSize' : 30,
                  'id' : 'aw770f14cf',
                  'local' : false,
                  'remoteName' : 'spi:asset.spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:binnum',
                  'dataType' : 'reference',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_asset_spi_binnum',
                  'maxSize' : 50,
                  'id' : 'aw7e8dde25',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:invcost',
                  'dataType' : 'reference',
                  'usage' : 'amount',
                  'referenceResource' : 'complexAssettrans',
                  'name' : 'invcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'complexAssettrans_asset_spi_invcost',
                  'id' : 'awb6187a94',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'voidindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_transfer_voidindicator',
                  'id' : 'aw8b04da2f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'qtyToBeReturned',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_spi_qtyToBeReturned',
                  'id' : 'aw4e6f64b8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMessage',
                  'index' : false,
                  'artifactId' : 'complexAssettrans_errorMessage',
                  'id' : 'aw518b5ebf',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getAssettransWithQuery', queryString:'\/oslc\/os\/oslcassettrans?savedQuery=getAssettransWithComplexQuery', queryLabel:'' }
               ]);
            var resourcePromise037 = PersistenceManager.initCollection( resource037 );


            var resource038 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalasset',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalasset',
                  'additionalData' : true,
                  'id' : 'aw711eac89',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:assetid,spi:orgid,spi:siteid,oslc:shortTitle,dcterms:title,spi:status,spi:itemnum,spi:itemtype,spi:itemsetid,spi:parent,spi:description_longdescription,spi:failureCode{dcterms:title,oslc:shortTitle},spi:location{dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'assetuid',
                  'index' : false,
                  'artifactId' : 'additionalasset_assetuid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awd8171873',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'assetid',
                  'index' : false,
                  'artifactId' : 'additionalasset_assetid_spiassetid',
                  'id' : 'awd4ab7a83',
                  'local' : false,
                  'remoteName' : 'spi:assetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'additionalasset_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw2aee6fb6',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'additionalasset_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awa5a0c944',
                  'isExactMatchIndex' : 'true',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'assetnum',
                  'index' : true,
                  'artifactId' : 'additionalasset_assetnum_oslcshortTitle',
                  'maxSize' : 15,
                  'id' : 'awdaad4d29',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'additionalasset_description_dctermstitle',
                  'maxSize' : 512,
                  'id' : 'awa9af7124',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'referenceResource' : 'additionallocations',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'additionalasset_location_spilocationoslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'aw81c1bc95',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'referenceResource' : 'additionallocations',
                  'dataType' : 'reference',
                  'name' : 'locationdesc',
                  'index' : true,
                  'artifactId' : 'additionalasset_locationdesc_spilocationdctermstitle',
                  'maxSize' : 512,
                  'id' : 'aw39ac9bfe',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'additionalasset_status_spistatus',
                  'maxSize' : 20,
                  'id' : 'aw9f649d2f',
                  'isExactMatchIndex' : 'true',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'additionalasset_itemnum_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'aw14220733',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemtype',
                  'index' : true,
                  'artifactId' : 'additionalasset_itemtype_spiitemtype',
                  'maxSize' : 15,
                  'id' : 'awf32b8da9',
                  'local' : false,
                  'remoteName' : 'spi:itemtype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'additionalasset_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw4622868',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'additionalasset',
                  'name' : 'failurecode',
                  'index' : false,
                  'artifactId' : 'additionalasset_failurecode_spifailureCodeoslcshortTitle',
                  'maxSize' : 8,
                  'id' : 'awbd9bad1b',
                  'local' : false,
                  'remoteName' : 'spi:failureCode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'additionalasset',
                  'name' : 'failurecodedesc',
                  'index' : false,
                  'artifactId' : 'additionalasset_failurecodedesc_spifailureCodedctermstitle',
                  'maxSize' : 100,
                  'id' : 'aw46c3d9c2',
                  'local' : false,
                  'remoteName' : 'spi:failureCode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'reference',
                  'name' : 'parent',
                  'index' : true,
                  'artifactId' : 'additionalasset_parent_spiparent',
                  'id' : 'awa03437d3',
                  'local' : false,
                  'remoteName' : 'spi:parent',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'longaln',
                  'name' : 'assetlongdesc',
                  'index' : false,
                  'artifactId' : 'additionalasset_assetlongdesc_spidescription_longdescription',
                  'maxSize' : 32000,
                  'id' : 'awf7a54bd5',
                  'local' : false,
                  'remoteName' : 'spi:description_longdescription',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'itemnumnotnull',
                  'formula' : '${itemnum} ? true : false',
                  'index' : true,
                  'artifactId' : 'additionalasset_itemnumnotnull_boolean',
                  'id' : 'awfb346281',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getadditionalasset', queryString:'\/oslc\/os\/oslcasset', queryLabel:'' }
               ]).
               setWhereClause('spi%3Astatus+in+%5B%24%7BdomainAssetstatus%5Bmaxvalue%3DOPERATING%5D.value%7D%5D');
            var resourcePromise038 = PersistenceManager.initCollection( resource038 );


            var resource039 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionallocations',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionallocations',
                  'additionalData' : true,
                  'id' : 'aw83f7b30c',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:siteid,oslc:shortTitle,dcterms:title,spi:status,spi:anywhere_offs,spi:locoper{spi:failureCode{dcterms:title,oslc:shortTitle}}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'locationsid',
                  'index' : false,
                  'artifactId' : 'additionallocations_locationsid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw395bc857',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'additionallocations_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw71f68db9',
                  'isExactMatchIndex' : 'true',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'additionallocations_location_oslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'aw6ab9bcc8',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'additionallocations_description_dctermstitle',
                  'maxSize' : 512,
                  'id' : 'awdb2713a6',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'inline',
                  'usage' : 'upper',
                  'referenceResource' : 'additionallocations',
                  'name' : 'failurecode',
                  'index' : false,
                  'artifactId' : 'additionallocations_failurecode_spilocoperspifailureCodeoslcshortTitle',
                  'maxSize' : 8,
                  'id' : 'aw755584a3',
                  'local' : false,
                  'remoteName' : 'spi:locoper.spi:failureCode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'inline',
                  'referenceResource' : 'additionallocations',
                  'name' : 'failurecodedesc',
                  'index' : false,
                  'artifactId' : 'additionallocations_failurecodedesc_spilocoperspifailureCodedctermstitle',
                  'maxSize' : 100,
                  'id' : 'awf17444e',
                  'local' : false,
                  'remoteName' : 'spi:locoper.spi:failureCode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'additionallocations_status_spistatus',
                  'maxSize' : 20,
                  'id' : 'aw4b32d9d2',
                  'isExactMatchIndex' : 'true',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'anywhere_offs',
                  'index' : false,
                  'artifactId' : 'additionallocations_anywhereoffs_spianywhereoffs',
                  'id' : 'aw30167f48',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_offs',
               }).
               setQueryBases([
                     {name:'getlocation', queryString:'\/oslc\/os\/oslcoperloc', queryLabel:'' }
               ]).
               setWhereClause('spi%3Astatus+in+%5B%24%7BdomainAssetstatus%5Bmaxvalue%3DOPERATING%5D.value%7D%5D');
            var resourcePromise039 = PersistenceManager.initCollection( resource039 );


            var resource040 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalstoreroom',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalstoreroom',
                  'additionalData' : true,
                  'id' : 'awaa316b1e',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:siteid,oslc:shortTitle,dcterms:title,spi:status,spi:type,spi:anywhere_offs').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'locationsid',
                  'index' : false,
                  'artifactId' : 'additionalstoreroom_locationsid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw206b6574',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'additionalstoreroom_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw9098e670',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'additionalstoreroom_location_oslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'aw19ce7678',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'locationForSearch',
                  'formula' : '${location}',
                  'index' : true,
                  'artifactId' : 'additionalstoreroom_locationForSearch_string',
                  'id' : 'aw741a9d39',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'additionalstoreroom_description_dctermstitle',
                  'maxSize' : 512,
                  'id' : 'aw1035d7e0',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'additionalstoreroom_status_spistatus',
                  'maxSize' : 20,
                  'id' : 'awaa5cb21b',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'additionalstoreroom_type_spitype',
                  'maxSize' : 16,
                  'id' : 'aw40b3e4f4',
                  'local' : false,
                  'remoteName' : 'spi:type',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'anywhere_offs',
                  'index' : false,
                  'artifactId' : 'additionalstoreroom_anywhereoffs_spianywhereoffs',
                  'id' : 'aw6c8d2dde',
                  'local' : false,
                  'remoteName' : 'spi:anywhere_offs',
               }).
               setQueryBases([
                     {name:'getlocationstoreroom', queryString:'\/oslc\/os\/oslcoperloc', queryLabel:'' }
               ]).
               setWhereClause('spi%3Atype+in+%5B%24%7Badditionalloctype%5Bmaxvalue%3DSTOREROOM%5D.value%7D%5D');
            var resourcePromise040 = PersistenceManager.initCollection( resource040 );


            var resource041 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalitem',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalitem',
                  'additionalData' : true,
                  'id' : 'aw72fb7399',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('oslc:shortTitle,dcterms:identifier,dcterms:title,spi:itemtype,spi:rotating,spi:itemsetid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'additionalitem_itemnum_oslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'aw533a672',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'itemid',
                  'index' : false,
                  'artifactId' : 'additionalitem_itemid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awa60a52a3',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'additionalitem_description_dctermstitle',
                  'maxSize' : 512,
                  'id' : 'awa84fecae',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemtype',
                  'index' : false,
                  'artifactId' : 'additionalitem_itemtype_spiitemtype',
                  'maxSize' : 15,
                  'id' : 'aw5f0eb6cf',
                  'local' : false,
                  'remoteName' : 'spi:itemtype',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'additionalitem_rotating_spirotating',
                  'id' : 'aw86eac301',
                  'local' : false,
                  'remoteName' : 'spi:rotating',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'additionalitem_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw86cea148',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:itemsetid',
               }).
               setQueryBases([
                     {name:'getitem', queryString:'\/oslc\/os\/oslcitem', queryLabel:'' }
               ]);
            var resourcePromise041 = PersistenceManager.initCollection( resource041 );


            var resource042 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalbin',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalbin',
                  'additionalData' : true,
                  'id' : 'aw979536f8',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:binnum,spi:curbal,spi:itemnum,spi:itemsetid,spi:location,spi:siteid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'invbalancesid',
                  'index' : false,
                  'artifactId' : 'additionalbin_invbalancesid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw3ab7206b',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : true,
                  'artifactId' : 'additionalbin_binnum_spibinnum',
                  'maxSize' : 50,
                  'id' : 'aw6248dc74',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:binnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'currentbalance',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'additionalbin_currentbalance_spicurbal',
                  'id' : 'awa69ee43a',
                  'local' : false,
                  'remoteName' : 'spi:curbal',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'additionalbin_itemnum_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'aw10688f2e',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'additionalbin_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw44cc8e84',
                  'local' : false,
                  'pkIndex' : 7,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'additionalbin_location_spilocation',
                  'maxSize' : 30,
                  'id' : 'awdcc5e5c',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'additionalbin_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw6fc4d80a',
                  'local' : false,
                  'pkIndex' : 6,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'hasbalance',
                  'formula' : '${currentbalance} > 0',
                  'index' : true,
                  'artifactId' : 'additionalbin_hasbalance_boolean',
                  'id' : 'awd4a07504',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getinvbalances', queryString:'\/oslc\/os\/oslcinvbalances', queryLabel:'' }
               ]);
            var resourcePromise042 = PersistenceManager.initCollection( resource042 );


            var resource043 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'billtoshipto',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'billtoshipto',
                  'additionalData' : true,
                  'id' : 'aw1038fa6c',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:shipto,spi:siteid,spi:orgid,spi:addresscode{dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'billtoshiptoid',
                  'index' : false,
                  'artifactId' : 'billtoshipto_billtoshiptoid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw2736f820',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'billtoshipto',
                  'name' : 'addresscode',
                  'index' : true,
                  'artifactId' : 'billtoshipto_addresscode',
                  'maxSize' : 30,
                  'id' : 'awbe5d5fcf',
                  'local' : false,
                  'remoteName' : 'spi:addresscode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'reference',
                  'referenceResource' : 'billtoshipto',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'billtoshipto_description',
                  'maxSize' : 100,
                  'id' : 'awa2896c04',
                  'local' : false,
                  'remoteName' : 'spi:addresscode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'boolean',
                  'name' : 'shipto',
                  'index' : true,
                  'artifactId' : 'billtoshipto_shipto_spishipto',
                  'id' : 'aw250f0720',
                  'local' : false,
                  'remoteName' : 'spi:shipto',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'billtoshipto_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awb8429c9d',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'billtoshipto_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw6a755001',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'locationForSearch',
                  'formula' : '${addresscode}',
                  'index' : true,
                  'artifactId' : 'billtoshipto_locationForSearch_string',
                  'id' : 'aw66c37960',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getbilltoshipto', queryString:'\/oslc\/os\/oslcbilltoshipto', queryLabel:'' }
               ]).
               setWhereClause('spi%3Ashipto%3D1');
            var resourcePromise043 = PersistenceManager.initCollection( resource043 );


            var resource044 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domainissuetype',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainissuetype',
                  'id' : 'aw737f99c1',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainissuetype_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw3fb76fd1',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainissuetype_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw8f1c217d',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainissuetype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw20754492',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : true,
                  'artifactId' : 'domainissuetype_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw765b707d',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainissuetype_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'awe51b35a9',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainissuetype_defaults_spidefaults',
                  'id' : 'awb8bfb6d2',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainissuetype_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw7d5e8bcc',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainissuetype_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw711aaa84',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getissuetype', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22ISSUETYP%22');
            var resourcePromise044 = PersistenceManager.initCollection( resource044 );


            var resource045 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'additionalloctype',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalloctype',
                  'id' : 'awf341d40a',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:maxvalue,spi:value,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'additionalloctype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw34b204e7',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'additionalloctype_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw47c85490',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'additionalloctype_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'awda1d3975',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'additionalloctype_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw4075ca82',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getloctype', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22LOCTYPE%22+and+spi%3Amaxvalue%3D%22STOREROOM%22');
            var resourcePromise045 = PersistenceManager.initCollection( resource045 );


            var resource046 = new ResourceMetadata({
                  'pageSize' : 100,
                  'resourceName' : 'domainAssetstatus',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainAssetstatus',
                  'id' : 'aw1036c42d',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw83deed10',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw5e4b9917',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awbb8dd58c',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awca32f2bc',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw12b4e6bb',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_defaults_spidefaults',
                  'id' : 'aw234727cc',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'awb0dac458',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainAssetstatus_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awc2ca3baa',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getlocassetstatus', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22LOCASSETSTATUS%22+and+spi%3Asiteid%21%3D%22*%22+and+spi%3Aorgid%21%3D%22*%22');
            var resourcePromise046 = PersistenceManager.initCollection( resource046 );


            var resource047 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'assetattrtypes',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'assetattrtypes',
                  'id' : 'awe87f671c',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awbc6d2661',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw64d9f52b',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awc5c691fb',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awf58139cd',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw37ff9177',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_defaults_spidefaults',
                  'id' : 'aw5d0c63bb',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw947fa8ea',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'assetattrtypes_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw2bc1e679',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getassetattrtypes', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22DATATYPE%22');
            var resourcePromise047 = PersistenceManager.initCollection( resource047 );


            var resource048 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domaintypes',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domaintypes',
                  'id' : 'awa9c9d44c',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domaintypes_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awca00a0a4',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domaintypes_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awd68f8658',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domaintypes_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw237560f2',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domaintypes_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw83ecbf08',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domaintypes_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw78707d2c',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domaintypes_defaults_spidefaults',
                  'id' : 'awbbbf92b2',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domaintypes_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'awc461a149',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domaintypes_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw8fe92b5e',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getdomaintypes', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22DOMTYPE%22');
            var resourcePromise048 = PersistenceManager.initCollection( resource048 );


            var resource049 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'additionalLineType',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalLineType',
                  'id' : 'aw1e788268',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'additionalLineType_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw6d83daa4',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'additionalLineType_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw665fb9f9',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'additionalLineType_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awb3cccaac',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'additionalLineType_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw246fc508',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'additionalLineType_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw42455bbe',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'additionalLineType_defaults_spidefaults',
                  'id' : 'aw2b0638ec',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'additionalLineType_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw4416fd28',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'additionalLineType_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awb298409',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getlinetype', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22LINETYPE%22+and+spi%3Amaxvalue+in+%5B%22ITEM%22%2C%22MATERIAL%22%2C%22SERVICE%22%5D');
            var resourcePromise049 = PersistenceManager.initCollection( resource049 );


            var resource050 = new ResourceMetadata({
                  'pageSize' : 100,
                  'resourceName' : 'domainitemstatus',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainitemstatus',
                  'id' : 'aw7073e103',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw275f93fe',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw290bbfcf',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw5ab5d532',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aw6eb38c52',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw2f8bb107',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_defaults_spidefaults',
                  'id' : 'awc27f2772',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw5718af3d',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainitemstatus_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awd5b63334',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getitemstatus', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22ITEMSTATUS%22+and+spi%3Asiteid%21%3D%22*%22+and+spi%3Aorgid%21%3D%22*%22');
            var resourcePromise050 = PersistenceManager.initCollection( resource050 );


            var resource051 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domainrelatetype',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainrelatetype',
                  'id' : 'aw6a504711',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw95f5430a',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awdf08fb08',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awb94f227b',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awdc195ca6',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'awae4c7910',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_defaults_spidefaults',
                  'id' : 'aw2185d03b',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw2ec675e9',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainrelatetype_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw68022676',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getrelatetype', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22RELATETYPE%22');
            var resourcePromise051 = PersistenceManager.initCollection( resource051 );


            var resource052 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'domainitemtype',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainitemtype',
                  'additionalData' : true,
                  'id' : 'awb03fcd84',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainitemtype_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw62db75ea',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainitemtype_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw4ecc6a53',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainitemtype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw710cc987',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainitemtype_value_spivaljue',
                  'maxSize' : 50,
                  'id' : 'aw2df65f89',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainitemtype_title_spidescription',
                  'maxSize' : 256,
                  'id' : 'awc76742a8',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainitemtype_defaults_spidefaults',
                  'id' : 'awe9c63bc7',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainitemtype_shorttitle_spidomainid',
                  'maxSize' : 18,
                  'id' : 'aw52fb0acf',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainitemtype_orgid_spisynonymdomainid',
                  'maxSize' : 19,
                  'id' : 'aw9e188d81',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getItemType', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22ITEMTYPE%22');
            var resourcePromise052 = PersistenceManager.initCollection( resource052 );


            var resource053 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'domaincosttype',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domaincosttype',
                  'additionalData' : true,
                  'id' : 'awfc590d0d',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domaincosttype_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw39b75df',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domaincosttype_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awecfdc9a5',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domaincosttype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awf7baa6b3',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domaincosttype_value_spivaljue',
                  'maxSize' : 50,
                  'id' : 'aw7b24dbaa',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domaincosttype_title_spidescription',
                  'maxSize' : 256,
                  'id' : 'aw41d12d9c',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domaincosttype_defaults_spidefaults',
                  'id' : 'aw6f7054f3',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domaincosttype_shorttitle_spidomainid',
                  'maxSize' : 18,
                  'id' : 'aw34dc0347',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domaincosttype_orgid_spisynonymdomainid',
                  'maxSize' : 19,
                  'id' : 'aw149e4141',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getCostType', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22COSTTYPE%22');
            var resourcePromise053 = PersistenceManager.initCollection( resource053 );


            var resource054 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domainlocationstatustype',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainlocationstatustype',
                  'id' : 'aw7ccb22f7',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awa349b796',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awb82c3ea7',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw191d6ade',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'aweaa5a83a',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'awf42bd061',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_defaults_spidefaults',
                  'id' : 'aw81d7989e',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw4cb01f17',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainlocationstatustype_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awd9dc54bd',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getlocstat', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22LOCSTAT%22');
            var resourcePromise054 = PersistenceManager.initCollection( resource054 );


            var resource055 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'statusChangeResource',
                  'resourceName' : 'statusChangeResource',
                  'id' : 'aw8e54bcf7',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'statusChangeResource_status_string',
                  'id' : 'awa736a284',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'statusdesc',
                  'index' : false,
                  'artifactId' : 'statusChangeResource_statusdesc_string',
                  'id' : 'aw5085f7de',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'dateTime',
                  'name' : 'changedate',
                  'index' : false,
                  'artifactId' : 'statusChangeResource_changedate_dateTime',
                  'id' : 'aw333260f4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'memo',
                  'index' : false,
                  'artifactId' : 'statusChangeResource_memo_string',
                  'maxSize' : 50,
                  'id' : 'awbc5e5f99',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise055 = PersistenceManager.initCollection( resource055 );


            var resource056 = new ResourceMetadata({
                  'refreshOnLogin' : 'true',
                  'pageSize' : 20,
                  'resourceName' : 'oslcmaxvars',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'oslcmaxvars',
                  'id' : 'aw62c90710',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:varname,spi:varvalue,spi:orgid,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'varname',
                  'index' : true,
                  'artifactId' : 'oslcmaxvars_varname_spivarname',
                  'maxSize' : 18,
                  'id' : 'aw5856cfa4',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:varname',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'varvalue',
                  'index' : false,
                  'artifactId' : 'oslcmaxvars_varvalue_spivarvalue',
                  'maxSize' : 254,
                  'id' : 'aw13572ab1',
                  'local' : false,
                  'remoteName' : 'spi:varvalue',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'oslcmaxvars_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awf84390c8',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'identifier',
                  'index' : false,
                  'artifactId' : 'oslcmaxvars_identifier_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awd301f76a',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getmaxvarsinprglabtrans', queryString:'\/oslc\/os\/oslcmaxvars', queryLabel:'' }
               ]).
               setWhereClause('spi%3Avarname+in+%5B%22NEGATIVEAVAIL%22%2C%22POASSETRETVAL%22%5D');
            var resourcePromise056 = PersistenceManager.initCollection( resource056 );


            var resource057 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalInventory',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalInventory',
                  'additionalData' : true,
                  'id' : 'awa7cd3123',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:itemnum,spi:binnum,dcterms:identifier,spi:itemsetid,spi:location,spi:siteid,spi:status,spi:storeloc,spi:controlacc,spi:invitem{spi:itemtype,spi:rotating,dcterms:title},spi:invbalances{spi:curbal}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'additionalInventory_itemnum_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'awc2f5e7e0',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : true,
                  'artifactId' : 'additionalInventory_binnum_spibinnum',
                  'maxSize' : 50,
                  'id' : 'aw30666b7b',
                  'local' : false,
                  'remoteName' : 'spi:binnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'inventoryid',
                  'index' : false,
                  'artifactId' : 'additionalInventory_inventoryid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awe2db4393',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'additionalInventory_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw38a8ca86',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'additionalInventory_location_spilocation',
                  'maxSize' : 30,
                  'id' : 'aw1bdc9f6b',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'additionalInventory_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw3dea6f05',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'additionalInventory_status_spistatus',
                  'maxSize' : 16,
                  'id' : 'aw72e3b6e',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'additionalInventory_storeloc_spistoreloc',
                  'maxSize' : 30,
                  'id' : 'aw5af96676',
                  'local' : false,
                  'remoteName' : 'spi:storeloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'controlacc',
                  'index' : false,
                  'artifactId' : 'additionalInventory_controlacc_spicontrolacc',
                  'maxSize' : 54,
                  'id' : 'aw9b6699b5',
                  'local' : false,
                  'remoteName' : 'spi:controlacc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:curbal',
                  'dataType' : 'inline',
                  'referenceResource' : 'additionalInventory',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'additionalInventory_curbal_spiinvbalancesspicurbal',
                  'id' : 'aw858a62d',
                  'local' : false,
                  'remoteName' : 'spi:invbalances',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'inline',
                  'referenceResource' : 'additionalInventory',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'additionalInventory_description_spiinvitemdctermstitle',
                  'maxSize' : 512,
                  'id' : 'aw287e46b5',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:itemtype',
                  'dataType' : 'inline',
                  'usage' : 'upper',
                  'referenceResource' : 'additionalInventory',
                  'name' : 'itemtype',
                  'index' : true,
                  'artifactId' : 'additionalInventory_itemtype_spiinvitemspiitemtype',
                  'maxSize' : 15,
                  'id' : 'awd93c1476',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'inline',
                  'referenceResource' : 'additionalInventory',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'additionalInventory_rotating_spiinvitemspirotating',
                  'id' : 'aw26f36005',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'locationForSearch',
                  'formula' : '${location}',
                  'index' : true,
                  'artifactId' : 'additionalInventory_locationForSearch_string',
                  'id' : 'aw43795a01',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnumForSearch',
                  'formula' : '${itemnum}',
                  'index' : true,
                  'artifactId' : 'additionalInventory_itemnumForSearch_string',
                  'id' : 'awe8b1002b',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getinventory', queryString:'\/oslc\/os\/oslcinventory', queryLabel:'' }
               ]);
            var resourcePromise057 = PersistenceManager.initCollection( resource057 );


            var resource058 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'inventory',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'inventory',
                  'id' : 'awb12d4a36',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:itemnum,spi:binnum,spi:lotnum,dcterms:identifier,spi:itemsetid,spi:location,spi:siteid,spi:status,spi:storeloc,spi:avblbalance,spi:issueunit,spi:controlacc,spi:curbaltotal,spi:costtype,spi:modelnum,spi:invitem{spi:itemtype,spi:modelnumref,spi:rotating,dcterms:title},spi:invbalances{spi:curbal}').
               setSupportiveFieldsSelectExpression('spi:invlifofifocost{spi:refobject,spi:refobjectid,spi:quantity,spi:costtype}').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'inventory_itemnum_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'awa75d7dea',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : true,
                  'artifactId' : 'inventory_binnum_spibinnum',
                  'maxSize' : 50,
                  'id' : 'awc4ed44ac',
                  'local' : false,
                  'remoteName' : 'spi:binnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'lotnum',
                  'index' : true,
                  'artifactId' : 'inventory_lotnum_spilotnum',
                  'maxSize' : 9,
                  'id' : 'awf8fea329',
                  'local' : false,
                  'remoteName' : 'spi:lotnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'inventoryid',
                  'index' : false,
                  'artifactId' : 'inventory_inventoryid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw118a8d1c',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'inventory_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'awfc97b4f2',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'inventory_location_spilocation',
                  'maxSize' : 30,
                  'id' : 'awf1e96813',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'inventory_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awc96140d2',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'inventory_status_spistatus',
                  'maxSize' : 16,
                  'id' : 'awf3a514b9',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'inventory_storeloc_spistoreloc',
                  'maxSize' : 30,
                  'id' : 'awb0cc910e',
                  'local' : false,
                  'remoteName' : 'spi:storeloc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:curbal',
                  'dataType' : 'inline',
                  'referenceResource' : 'inventory',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'inventory_curbal_spiinvbalancesspicurbal',
                  'id' : 'aw75ac6952',
                  'local' : false,
                  'remoteName' : 'spi:invbalances',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'avblbalance',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'inventory_avblbalance_spiavblbalance',
                  'id' : 'aw91689ca8',
                  'local' : false,
                  'remoteName' : 'spi:avblbalance',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'inventory_issueunit_spiissueunit',
                  'maxSize' : 16,
                  'id' : 'awfa2fc08f',
                  'local' : false,
                  'remoteName' : 'spi:issueunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'controlacc',
                  'index' : false,
                  'artifactId' : 'inventory_issueunit_spicontrolacc',
                  'maxSize' : 54,
                  'id' : 'awf241c059',
                  'local' : false,
                  'remoteName' : 'spi:controlacc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'curbaltotal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'inventory_issueunit_curbaltotal',
                  'id' : 'awb29b2533',
                  'local' : false,
                  'remoteName' : 'spi:curbaltotal',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'costtype',
                  'index' : false,
                  'artifactId' : 'inventory_costtype',
                  'maxSize' : 16,
                  'id' : 'awde8c4ff9',
                  'local' : false,
                  'remoteName' : 'spi:costtype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'inline',
                  'referenceResource' : 'inventory',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'inventory_description_spiinvitemdctermstitle',
                  'maxSize' : 512,
                  'id' : 'awdfb50e3a',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:itemtype',
                  'dataType' : 'inline',
                  'usage' : 'upper',
                  'referenceResource' : 'inventory',
                  'name' : 'itemtype',
                  'index' : true,
                  'artifactId' : 'inventory_itemtype_spiinvitemspiitemtype',
                  'maxSize' : 15,
                  'id' : 'awa4c8db09',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'inline',
                  'referenceResource' : 'inventory',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'inventory_rotating_spiinvitemspirotating',
                  'id' : 'aw5b07af7a',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'invlifofifocostResource',
                  'name' : 'invlifofifocost',
                  'index' : true,
                  'artifactId' : 'inventory_lifofifo_spiinvlifofifocost',
                  'id' : 'aw389041f4',
                  'describedByResource' : 'invlifofifocostResource',
                  'local' : false,
                  'remoteName' : 'spi:invlifofifocost',
                  'selectExpression' : 'spi:invlifofifocost{spi:refobject,spi:refobjectid,spi:quantity,spi:costtype}',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'inline',
                  'referenceResource' : 'inventory',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'inventory_spiinvitemspimodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw9ac29d25',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'inventory_spimodelnum',
                  'maxSize' : 128,
                  'id' : 'awd8690966',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'locationForSearch',
                  'formula' : '${location}',
                  'index' : true,
                  'artifactId' : 'inventory_locationForSearch_string',
                  'id' : 'awbf977ef7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnumForSearch',
                  'formula' : '${itemnum}',
                  'index' : true,
                  'artifactId' : 'inventory_itemnumForSearch_string',
                  'id' : 'awbf1d8a70',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'storelocnotnull',
                  'formula' : '${storeloc} ? true : false',
                  'index' : true,
                  'artifactId' : 'inventory_storelocSearch_null_boolean',
                  'id' : 'aw925d0b14',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'fake',
                  'index' : false,
                  'artifactId' : 'fakeField',
                  'maxSize' : 15,
                  'id' : 'aw58af5712',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getinventory', queryString:'\/oslc\/os\/oslcinventory', queryLabel:'' }
               ]);
            var resourcePromise058 = PersistenceManager.initCollection( resource058 );


            var resource059 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'toinventory',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'toinventory',
                  'id' : 'aw52b491f8',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:itemnum,spi:binnum,spi:lotnum,dcterms:identifier,spi:itemsetid,spi:location,spi:siteid,spi:status,spi:storeloc,spi:avblbalance,spi:issueunit,spi:controlacc,spi:curbaltotal,spi:invitem{spi:itemtype,spi:rotating,dcterms:title},spi:invbalances{spi:curbal}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'toinventory_itemnum_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'awa3b4e45a',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : true,
                  'artifactId' : 'toinventory_binnum_spibinnum',
                  'maxSize' : 50,
                  'id' : 'awa3242180',
                  'local' : false,
                  'remoteName' : 'spi:binnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'lotnum',
                  'index' : true,
                  'artifactId' : 'toinventory_lotnum_spilotnum',
                  'maxSize' : 9,
                  'id' : 'aw9f37c605',
                  'local' : false,
                  'remoteName' : 'spi:lotnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'inventoryid',
                  'index' : false,
                  'artifactId' : 'toinventory_inventoryid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw616069f6',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'toinventory_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw9bf6f5ab',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'toinventory_location_spilocation',
                  'maxSize' : 30,
                  'id' : 'aw9cffe9a2',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'toinventory_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awaea825fe',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'toinventory_status_spistatus',
                  'maxSize' : 16,
                  'id' : 'aw946c7195',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'toinventory_storeloc_spistoreloc',
                  'maxSize' : 30,
                  'id' : 'awddda10bf',
                  'local' : false,
                  'remoteName' : 'spi:storeloc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:curbal',
                  'dataType' : 'inline',
                  'referenceResource' : 'toinventory',
                  'name' : 'curbal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'toinventory_curbal_spiinvbalancesspicurbal',
                  'id' : 'aw350388d0',
                  'local' : false,
                  'remoteName' : 'spi:invbalances',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'avblbalance',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'toinventory_avblbalance_spiavblbalance',
                  'id' : 'awf905956a',
                  'local' : false,
                  'remoteName' : 'spi:avblbalance',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'issueunit',
                  'index' : false,
                  'artifactId' : 'toinventory_issueunit_spiissueunit',
                  'maxSize' : 16,
                  'id' : 'aw9d4e81d6',
                  'local' : false,
                  'remoteName' : 'spi:issueunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'controlacc',
                  'index' : false,
                  'artifactId' : 'toinventory_issueunit_spicontrolacc',
                  'maxSize' : 54,
                  'id' : 'awe0914848',
                  'local' : false,
                  'remoteName' : 'spi:controlacc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'curbaltotal',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'toinventory_issueunit_curbaltotal',
                  'id' : 'awe90b0a8',
                  'local' : false,
                  'remoteName' : 'spi:curbaltotal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'dataType' : 'inline',
                  'referenceResource' : 'toinventory',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'toinventory_description_spiinvitemdctermstitle',
                  'maxSize' : 512,
                  'id' : 'aw6f862bab',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:itemtype',
                  'dataType' : 'inline',
                  'usage' : 'upper',
                  'referenceResource' : 'toinventory',
                  'name' : 'itemtype',
                  'index' : true,
                  'artifactId' : 'toinventory_itemtype_spiinvitemspiitemtype',
                  'maxSize' : 15,
                  'id' : 'awe4673a8b',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'inline',
                  'referenceResource' : 'toinventory',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'toinventory_rotating_spiinvitemspirotating',
                  'id' : 'aw1ba84ef8',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'locationForSearch',
                  'formula' : '${location}',
                  'index' : true,
                  'artifactId' : 'toinventory_locationForSearch_string',
                  'id' : 'awd5358e8d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnumForSearch',
                  'formula' : '${itemnum}',
                  'index' : true,
                  'artifactId' : 'toinventory_itemnumForSearch_string',
                  'id' : 'awadcd0261',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'fake',
                  'index' : false,
                  'artifactId' : 'tofakeField',
                  'maxSize' : 15,
                  'id' : 'awbb368cdc',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getinventory', queryString:'\/oslc\/os\/oslcinventory', queryLabel:'' }
               ]);
            var resourcePromise059 = PersistenceManager.initCollection( resource059 );


            var resource060 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'userInfo',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'userInfo',
                  'id' : 'awcdc6e618',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:userid,spi:loginid,spi:storeroomsite,spi:type,spi:personid,spi:sysuser,spi:querywithsite,spi:status,spi:emailpswd,spi:screenreader,spi:failedlogins,spi:inactivesites,spi:defsite{spi:orgid,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('spi:groupuser{spi:groupname}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'maxuserid',
                  'index' : false,
                  'artifactId' : 'userInfo_maxuserid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awde7d904c',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'userid',
                  'index' : false,
                  'artifactId' : 'userInfo_userid_spiuserid',
                  'maxSize' : 30,
                  'id' : 'aw1721e125',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:userid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'loginid',
                  'index' : false,
                  'artifactId' : 'userInfo_loginid_spiloginid',
                  'maxSize' : 50,
                  'id' : 'aw571ea7ff',
                  'local' : false,
                  'remoteName' : 'spi:loginid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'storeroomsite',
                  'index' : false,
                  'artifactId' : 'userInfo_storeroomsite_spistoreroomsite',
                  'maxSize' : 8,
                  'id' : 'aw783663cd',
                  'local' : false,
                  'remoteName' : 'spi:storeroomsite',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'userInfo_type_spitype',
                  'maxSize' : 30,
                  'id' : 'aw8dfd38c1',
                  'local' : false,
                  'remoteName' : 'spi:type',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'personid',
                  'index' : false,
                  'artifactId' : 'userInfo_personid_spipersonid',
                  'maxSize' : 30,
                  'id' : 'aw5921e790',
                  'local' : false,
                  'remoteName' : 'spi:personid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'sysuser',
                  'index' : false,
                  'artifactId' : 'userInfo_sysuser_spisysuser',
                  'id' : 'aw23d89622',
                  'local' : false,
                  'remoteName' : 'spi:sysuser',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'querywithsite',
                  'index' : false,
                  'artifactId' : 'userInfo_querywithsite_spiquerywithsite',
                  'id' : 'awb3145bb0',
                  'local' : false,
                  'remoteName' : 'spi:querywithsite',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'userInfo',
                  'name' : 'defsite',
                  'index' : false,
                  'artifactId' : 'userInfo_defsite_spidefsiteoslcshortTitle',
                  'maxSize' : 8,
                  'id' : 'awfde9fdbe',
                  'local' : false,
                  'remoteName' : 'spi:defsite',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:orgid',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'userInfo',
                  'name' : 'deforg',
                  'index' : false,
                  'artifactId' : 'userInfo_deforg_spidefsitespiorgid',
                  'maxSize' : 8,
                  'id' : 'aw4f037420',
                  'local' : false,
                  'remoteName' : 'spi:defsite',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'userInfo_status_spistatus',
                  'maxSize' : 12,
                  'id' : 'aw6215aa5a',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'emailpswd',
                  'index' : false,
                  'artifactId' : 'userInfo_emailpswd_spiemailpswd',
                  'id' : 'aw4014ff32',
                  'local' : false,
                  'remoteName' : 'spi:emailpswd',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'screenreader',
                  'index' : false,
                  'artifactId' : 'userInfo_screenreader_spiscreenreader',
                  'id' : 'aw33b6facb',
                  'local' : false,
                  'remoteName' : 'spi:screenreader',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'name' : 'failedlogins',
                  'index' : false,
                  'artifactId' : 'userInfo_failedlogins_spifailedlogins',
                  'id' : 'aw207c7908',
                  'local' : false,
                  'remoteName' : 'spi:failedlogins',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'inactivesites',
                  'index' : false,
                  'artifactId' : 'userInfo_inactivesites_spiinactivesites',
                  'id' : 'aw616d0513',
                  'local' : false,
                  'remoteName' : 'spi:inactivesites',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'userRoles',
                  'name' : 'groupList',
                  'index' : false,
                  'artifactId' : 'userInfo_groupList_spigroupuser',
                  'id' : 'aw52840d8c',
                  'describedByResource' : 'userRoles',
                  'local' : false,
                  'remoteName' : 'spi:groupuser',
                  'selectExpression' : 'spi:groupuser{spi:groupname}',
               }).
               setQueryBases([
                     {name:'currentUser', queryString:'\/oslc\/os\/oslcmaxuser?savedQuery=currentUser', queryLabel:'' }
               ]);
            var resourcePromise060 = PersistenceManager.initCollection( resource060 );


            var resource061 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'userRoles',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'userRoles',
                  'id' : 'aw505b3d11',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:groupname').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'roleName',
                  'index' : false,
                  'artifactId' : 'userRoles_roleName_spigroupname',
                  'maxSize' : 30,
                  'id' : 'aw96e0c83c',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:groupname',
               });
            var resourcePromise061 = PersistenceManager.initCollection( resource061 );


            var resource062 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'appDocType',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'appDocType',
                  'id' : 'aw1b80930e',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:appdoctypeid,spi:doctype,spi:app').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'identifier',
                  'index' : true,
                  'artifactId' : 'appDocType_identifier_spiappdoctypeid',
                  'id' : 'aw4e3b4d85',
                  'local' : false,
                  'remoteName' : 'spi:appdoctypeid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'doctype',
                  'index' : true,
                  'artifactId' : 'appDocType_doctype_spidoctype',
                  'maxSize' : 16,
                  'id' : 'aw8863ce66',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:doctype',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'app',
                  'index' : true,
                  'artifactId' : 'appDocType_app_spiapp',
                  'maxSize' : 40,
                  'id' : 'awc818771',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:app',
               }).
               setQueryBases([
                     {name:'getWODocTypes', queryString:'\/oslc\/os\/oslcappdoctype?oslc.where=spi:app=%22WOTRACK%22', queryLabel:'' }
               ]);
            var resourcePromise062 = PersistenceManager.initCollection( resource062 );


            var resource063 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'site',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'site',
                  'id' : 'aw694309e4',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('oslc:shortTitle,spi:description,spi:orgid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'site_siteid_oslcshortTitle',
                  'maxSize' : 8,
                  'id' : 'awed696d5a',
                  'key' : '1',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'site_description_spidescription',
                  'maxSize' : 100,
                  'id' : 'awae06cd2e',
                  'key' : '2',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'site_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw1ad86d03',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               setQueryBases([
                     {name:'getSite', queryString:'\/oslc\/os\/oslcsite', queryLabel:'' }
               ]).
               setWhereClause('spi%3Aactive%3D1');
            var resourcePromise063 = PersistenceManager.initCollection( resource063 );


            var resource064 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'domainreceiptstatus',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainreceiptstatus',
                  'id' : 'awd6f42994',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awdfac782',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awc687367d',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awa4a95b82',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_value_spivaljue',
                  'maxSize' : 50,
                  'id' : 'aw6ef09751',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_title_spidescription',
                  'maxSize' : 256,
                  'id' : 'aw12c2d0ad',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_defaults_spidefaults',
                  'id' : 'aw3c63a9c2',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_shorttitle_spidomainid',
                  'maxSize' : 18,
                  'id' : 'aw318dd947',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainreceiptstatus_orgid_spisynonymdomainid',
                  'maxSize' : 19,
                  'id' : 'aw72987fda',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getReceiptStatus', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22RECEIPTSTATUS%22');
            var resourcePromise064 = PersistenceManager.initCollection( resource064 );


            var resource065 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalperson',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalperson_personuid_resource',
                  'additionalData' : true,
                  'id' : 'aw4c7a7bff',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,foaf:name,foaf:givenName,foaf:familyName,oslc:shortTitle').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'personuid',
                  'index' : false,
                  'artifactId' : 'additionalperson_personuid',
                  'maxSize' : 19,
                  'id' : 'awb2126151',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'displayname',
                  'index' : false,
                  'artifactId' : 'additionalperson_displayname',
                  'maxSize' : 62,
                  'id' : 'aw36f2e677',
                  'local' : false,
                  'remoteName' : 'foaf:name',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'firstname',
                  'index' : false,
                  'artifactId' : 'additionalperson_firstname',
                  'maxSize' : 30,
                  'id' : 'aw25131748',
                  'local' : false,
                  'remoteName' : 'foaf:givenName',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'lastname',
                  'index' : false,
                  'artifactId' : 'additionalperson_lastname',
                  'maxSize' : 50,
                  'id' : 'aw3e6af213',
                  'local' : false,
                  'remoteName' : 'foaf:familyName',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'personid',
                  'index' : false,
                  'artifactId' : 'additionalperson_personid',
                  'maxSize' : 30,
                  'id' : 'aw38c6281b',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               setQueryBases([
                     {name:'getperson', queryString:'\/oslc\/os\/oslcperson', queryLabel:'' }
               ]);
            var resourcePromise065 = PersistenceManager.initCollection( resource065 );


            var resource066 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'rotatingAssetUsage',
                  'resourceName' : 'rotatingAssetUsage',
                  'id' : 'aw28c74a8c',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'rotatingObject',
                  'index' : false,
                  'artifactId' : 'rotatingAssetUsage_siteid_string',
                  'id' : 'aw3636b9f',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise066 = PersistenceManager.initCollection( resource066 );


            var resource067 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'asset',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'asset',
                  'id' : 'aw2af5a5c',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:assetid,spi:orgid,spi:siteid,oslc:shortTitle,dcterms:title,spi:status,spi:itemnum,spi:itemtype,spi:itemsetid,spi:parent,spi:description_longdescription,spi:location{dcterms:title,oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'assetuid',
                  'index' : false,
                  'artifactId' : 'asset_assetuid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw269abbd5',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'assetid',
                  'index' : false,
                  'artifactId' : 'asset_assetid_spiassetid',
                  'id' : 'awb5739ac0',
                  'local' : false,
                  'remoteName' : 'spi:assetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'asset_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw61f8901c',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'asset_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awdc4a39bc',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'assetnum',
                  'index' : true,
                  'artifactId' : 'asset_assetnum_oslcshortTitle',
                  'maxSize' : 15,
                  'id' : 'awecfd10e6',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'asset_description_dctermstitle',
                  'maxSize' : 512,
                  'id' : 'awa242fe58',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'referenceResource' : 'additionallocations',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'asset_location_spilocationoslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'awce8a7257',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'dcterms:title',
                  'referenceResource' : 'additionallocations',
                  'dataType' : 'reference',
                  'name' : 'locationdesc',
                  'index' : true,
                  'artifactId' : 'asset_locationdesc_spilocationdctermstitle',
                  'maxSize' : 512,
                  'id' : 'awbcbc8ece',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'asset_status_spistatus',
                  'maxSize' : 20,
                  'id' : 'awe68e6dd7',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'asset_itemnum_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'aw75fae770',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemtype',
                  'index' : true,
                  'artifactId' : 'asset_itemtype_spiitemtype',
                  'maxSize' : 15,
                  'id' : 'aw887512cf',
                  'local' : false,
                  'remoteName' : 'spi:itemtype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'asset_itemsetid_spiitemsetid',
                  'maxSize' : 8,
                  'id' : 'aw577511c2',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'reference',
                  'name' : 'parent',
                  'index' : true,
                  'artifactId' : 'asset_parent_spiparent',
                  'id' : 'awd9dec72b',
                  'local' : false,
                  'remoteName' : 'spi:parent',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'longaln',
                  'name' : 'assetlongdesc',
                  'index' : false,
                  'artifactId' : 'asset_assetlongdesc_spidescription_longdescription',
                  'maxSize' : 32000,
                  'id' : 'aw3d5e96b8',
                  'local' : false,
                  'remoteName' : 'spi:description_longdescription',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'itemnumnotnull',
                  'formula' : '${itemnum} ? true : false',
                  'index' : true,
                  'artifactId' : 'asset_itemnumnotnull_boolean',
                  'id' : 'awa8235b2b',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getTransactionalAsset', queryString:'\/oslc\/os\/oslcasset', queryLabel:'' }
               ]);
            var resourcePromise067 = PersistenceManager.initCollection( resource067 );


            var resource068 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'awreceiverotassetResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'awreceiverotassetResource',
                  'id' : 'aw3a02033d',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:assetnum,spi:description,spi:itemnum,spi:matrectransid,spi:orgid,spi:siteid,spi:tositeid,spi:autonumber,spi:anywhererefid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'assetnum',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_type_spi_assetnum',
                  'maxSize' : 12,
                  'id' : 'awe587f3aa',
                  'local' : false,
                  'remoteName' : 'spi:assetnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spidescription',
                  'maxSize' : 100,
                  'id' : 'aw5bb61fa4',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spiitemnum',
                  'maxSize' : 30,
                  'id' : 'aw51fdc15d',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spimatrectransid',
                  'id' : 'aw7adb6ec5',
                  'local' : false,
                  'remoteName' : 'spi:matrectransid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw50f5d3e5',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awd5d1b2c3',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tositeid',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spitositeid',
                  'maxSize' : 8,
                  'id' : 'aw68d0e043',
                  'local' : false,
                  'remoteName' : 'spi:tositeid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'boolean',
                  'name' : 'autonumber',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_desc_spiautonumber',
                  'id' : 'aw4438e899',
                  'local' : false,
                  'remoteName' : 'spi:autonumber',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'anywhereRefId',
                  'index' : false,
                  'artifactId' : 'assetMatRecResource_anywhereRefId_spi_anywhererefid',
                  'id' : 'aw50575cd0',
                  'local' : false,
                  'remoteName' : 'spi:anywhererefid',
               });
            var resourcePromise068 = PersistenceManager.initCollection( resource068 );


            var resource069 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'shipment',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'shipment',
                  'id' : 'aw2cb20dc',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:shipmentnum,spi:status,spi:siteid,spi:orgid,spi:fromsiteid,spi:enterby,spi:shipdate,spi:expreceiptdate,spi:invuse{spi:documentref,spi:formnumber},spi:invuseresource{spi:fromstoreloc,oslc:shortTitle,spi:receipts}').
               setSupportiveFieldsSelectExpression('spi:shipmentline{spi:shipmentlineid,spi:invuselinenum,spi:itemnum,spi:itemdescription,spi:itemsetid,spi:shippedqty,spi:tostoreloc,spi:comments,spi:ponum,spi:polinenum,spi:revisionnum,spi:vendor,spi:siteid,spi:shipmentlinenum,spi:rectransid}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'shipmentid',
                  'index' : false,
                  'artifactId' : 'shipment_shipmentnum_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw3556a1ae',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipmentnum',
                  'index' : true,
                  'artifactId' : 'shipment_shipmentnum_spi_shipmentnum',
                  'maxSize' : 50,
                  'id' : 'aw4cd19b17',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:shipmentnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'shipment_status_spistatus',
                  'maxSize' : 8,
                  'id' : 'awbf958f8a',
                  'isExactMatchIndex' : 'true',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'shipment_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw8551dbe1',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'shipment_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awd96db9b1',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'fromsiteid',
                  'index' : true,
                  'artifactId' : 'shipment_fromsiteid_spifromsiteid',
                  'maxSize' : 8,
                  'id' : 'aw66d59bb6',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:fromsiteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'enterby',
                  'index' : true,
                  'artifactId' : 'shipment_enterby_enterby',
                  'maxSize' : 30,
                  'id' : 'aw61410dfd',
                  'local' : false,
                  'remoteName' : 'spi:enterby',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'shipmentLine',
                  'name' : 'shipmentline',
                  'index' : true,
                  'artifactId' : 'shipment_shipmentline_spishipmentline',
                  'id' : 'awee582815',
                  'describedByResource' : 'shipmentLine',
                  'local' : false,
                  'remoteName' : 'spi:shipmentline',
                  'selectExpression' : 'spi:shipmentline{spi:shipmentlineid,spi:invuselinenum,spi:itemnum,spi:itemdescription,spi:itemsetid,spi:shippedqty,spi:tostoreloc,spi:comments,spi:ponum,spi:polinenum,spi:revisionnum,spi:vendor,spi:siteid,spi:shipmentlinenum,spi:rectransid}',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'shipment',
                  'name' : 'invusenum',
                  'index' : true,
                  'artifactId' : 'shipment_invuse_invusenum',
                  'maxSize' : 8,
                  'id' : 'aw3817b96e',
                  'local' : false,
                  'remoteName' : 'spi:invuseresource',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:receipts',
                  'dataType' : 'reference',
                  'referenceResource' : 'shipment',
                  'name' : 'receipts',
                  'index' : false,
                  'artifactId' : 'shipment_invuse_receipts',
                  'maxSize' : 20,
                  'id' : 'awac3b2e4a',
                  'local' : false,
                  'remoteName' : 'spi:invuseresource',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:fromstoreloc',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'shipment',
                  'name' : 'fromstoreloc',
                  'index' : false,
                  'artifactId' : 'shipment_invuse_fromstoreloc',
                  'maxSize' : 30,
                  'id' : 'aw1b75e9ee',
                  'local' : false,
                  'remoteName' : 'spi:invuseresource',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'datetime',
                  'name' : 'shipdate',
                  'index' : false,
                  'artifactId' : 'shipment_shipdate_spishipdate',
                  'id' : 'awd2c4aa8',
                  'local' : false,
                  'remoteName' : 'spi:shipdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'expreceiptdate',
                  'index' : false,
                  'artifactId' : 'shipment_expreceiptdate_spiexpreceiptdate',
                  'id' : 'awb73f180f',
                  'local' : false,
                  'remoteName' : 'spi:expreceiptdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:formnumber',
                  'dataType' : 'inline',
                  'referenceResource' : 'shipment',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'shipment_invuse_spiformnumber',
                  'maxSize' : 30,
                  'id' : 'aw972850f0',
                  'local' : false,
                  'remoteName' : 'spi:invuse',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:documentref',
                  'dataType' : 'inline',
                  'referenceResource' : 'shipment',
                  'name' : 'documentref',
                  'index' : true,
                  'artifactId' : 'shipment_invuse_spidocumentref',
                  'maxSize' : 100,
                  'id' : 'aw9b766f37',
                  'local' : false,
                  'remoteName' : 'spi:invuse',
               }).
               setQueryBases([
                     {name:'getShipments', queryString:'\/oslc\/os\/oslcshipment', queryLabel:'' }
               ]);
            var resourcePromise069 = PersistenceManager.initCollection( resource069 );


            var resource070 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'shipmentLine',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'shipmentLine',
                  'id' : 'awe3e934a0',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:shipmentlineid,spi:invuselinenum,spi:itemnum,spi:itemdescription,spi:itemsetid,spi:shippedqty,spi:tostoreloc,spi:comments,spi:ponum,spi:polinenum,spi:revisionnum,spi:vendor,spi:siteid,spi:shipmentlinenum,spi:rectransid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'shipmentlineid',
                  'index' : false,
                  'artifactId' : 'shipmentLine_shipmentlineid_spi_shipmentlineid',
                  'id' : 'awbb35c0a0',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:shipmentlineid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'shipmentLine_invuselinenum_spi_invuselinenum',
                  'id' : 'awb6ce67e1',
                  'local' : false,
                  'remoteName' : 'spi:invuselinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'shipmentLine_itemnum_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'awfe370e8b',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'itemdescription',
                  'index' : false,
                  'artifactId' : 'shipmentLine_itemdescription_spi_itemdescription',
                  'maxSize' : 512,
                  'id' : 'awa9f5e92b',
                  'local' : false,
                  'remoteName' : 'spi:itemdescription',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'shipmentLine_frombin_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw2b2b8f42',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'shippedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'shipmentLine_shippedqty_spi_shippedqty',
                  'id' : 'aw108c9f8f',
                  'local' : false,
                  'remoteName' : 'spi:shippedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'shipmentLine_tostoreloc_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'awa431bae3',
                  'local' : false,
                  'remoteName' : 'spi:tostoreloc',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'comments',
                  'index' : false,
                  'artifactId' : 'shipmentLine_commnets_spi_comments',
                  'maxSize' : 254,
                  'id' : 'awa11a035e',
                  'local' : false,
                  'remoteName' : 'spi:comments',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'shipmentLine_commnets_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'awb2ab1ca1',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'shipmentLine_commnets_spi_polinenum',
                  'id' : 'aw22e294be',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'name' : 'revisionnum',
                  'index' : false,
                  'artifactId' : 'shipmentLine_commnets_spi_revisionnum',
                  'id' : 'aw12e3efc5',
                  'local' : false,
                  'remoteName' : 'spi:revisionnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'vendor',
                  'index' : false,
                  'artifactId' : 'shipmentLine_commnets_spi_vendor',
                  'maxSize' : 128,
                  'id' : 'aw7e519786',
                  'local' : false,
                  'remoteName' : 'spi:vendor',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'shipmentLine_commnets_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw7784242f',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'shipmentlinenum',
                  'index' : false,
                  'artifactId' : 'shipmentLine_shipmentlinenum_spi_shipmentlinenum',
                  'maxSize' : 50,
                  'id' : 'aw7a1ba861',
                  'local' : false,
                  'remoteName' : 'spi:shipmentlinenum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'rectransid',
                  'index' : false,
                  'artifactId' : 'shipmentLine_rectransid_spi_rectransid',
                  'id' : 'aw35d49045',
                  'local' : false,
                  'remoteName' : 'spi:rectransid',
               });
            var resourcePromise070 = PersistenceManager.initCollection( resource070 );


            var resource071 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'receiptInput',
                  'resourceName' : 'receiptInput',
                  'id' : 'awd2b75644',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'shipmentlineid',
                  'index' : false,
                  'artifactId' : 'receiptInput_shipmentlineid_string',
                  'id' : 'awa185e291',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'shipmentlinenum',
                  'index' : false,
                  'artifactId' : 'receiptInput_shipmentlinenum_string',
                  'id' : 'awd13fcfaf',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'receiptInput_linetype_string',
                  'id' : 'awcfbaf1e8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'receiptInput_ponum_string',
                  'id' : 'aw81dbfa0e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'receiptInput_polinenum_string',
                  'id' : 'aw6ea09026',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'remark',
                  'index' : false,
                  'artifactId' : 'receiptInput_remark_string',
                  'id' : 'aw6012ccb7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tostoreloc',
                  'index' : false,
                  'artifactId' : 'receiptInput_tostoreloc_string',
                  'id' : 'aw9c87cb7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asn',
                  'index' : false,
                  'artifactId' : 'receiptInput_asn_string',
                  'id' : 'awf2ec70da',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'inspectionrequired',
                  'index' : false,
                  'artifactId' : 'receiptInput_inspectionrequired_string',
                  'id' : 'awc673d08e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'packingslipnum',
                  'index' : false,
                  'artifactId' : 'receiptInput_packingslipnum_string',
                  'id' : 'awe7f1b62d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'orderqty',
                  'index' : false,
                  'artifactId' : 'receiptInput_orderqty_double',
                  'id' : 'aw4d145af',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'currencylinecost',
                  'index' : false,
                  'artifactId' : 'receiptInput_currencylinecost_double',
                  'id' : 'aw9bf5f779',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'receiptInput_itemnum_string',
                  'id' : 'aw4f09f455',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'receiptInput_itemsetid_string',
                  'id' : 'aw56055b7c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'conditioncode',
                  'index' : false,
                  'artifactId' : 'receiptInput_conditioncode_string',
                  'id' : 'awa112c933',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'receiptInput_itemdescription_string',
                  'id' : 'awdea38f9e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'receiptInput_actualdate_datetime',
                  'id' : 'aw70f398e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'receiptInput_orgid_string',
                  'id' : 'aw339b80cb',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'receiptInput_siteid_string',
                  'id' : 'aw936bcc87',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'fromsiteid',
                  'index' : false,
                  'artifactId' : 'receiptInput_fromsiteid_string',
                  'id' : 'aw553eeacc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'qtyrequested',
                  'index' : false,
                  'artifactId' : 'receiptInput_qtyrequested_double',
                  'id' : 'aw43a4aa02',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'shipmentnum',
                  'index' : false,
                  'artifactId' : 'receiptInput_shipmentnum_string',
                  'id' : 'aw7e0c6813',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'exchangerate',
                  'index' : false,
                  'artifactId' : 'receiptInput_exchangerate_string',
                  'id' : 'awcfde5a98',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'matrectransid',
                  'index' : false,
                  'artifactId' : 'receiptInput_matrectransid_string',
                  'id' : 'aw4381bef7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'receiptInput_gldebitacct_string',
                  'id' : 'awead05d0d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'datetime',
                  'name' : 'transdate',
                  'index' : false,
                  'artifactId' : 'receiptInput_transdate_datetime',
                  'id' : 'awca97c669',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tolot',
                  'index' : false,
                  'artifactId' : 'receiptInput_tolot_string',
                  'id' : 'awdc32f3a3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'tobin',
                  'index' : false,
                  'artifactId' : 'receiptInput_tobin_string',
                  'id' : 'aw5c9a9779',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'enterby',
                  'index' : false,
                  'artifactId' : 'receiptInput_enterby_string',
                  'id' : 'awcb18945d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'invoicenum',
                  'index' : false,
                  'artifactId' : 'receiptInput_invoicenum_string',
                  'id' : 'awa78b1aed',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'receiptInput_status_string',
                  'id' : 'aw2a9b2b9d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'receiptInput_type_string',
                  'id' : 'aw16610978',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'receiptInput_location_string',
                  'id' : 'aw7aeff141',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'quantitydue',
                  'index' : false,
                  'artifactId' : 'receiptInput_quantitydue_double',
                  'id' : 'aw5b4ed8fd',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'receiptInput_rotassetnum_double',
                  'id' : 'aw2f386e7a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'unitcost',
                  'index' : false,
                  'artifactId' : 'receiptInput_unitcost_double',
                  'id' : 'aw12111912',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'actualcost',
                  'index' : false,
                  'artifactId' : 'receiptInput_actualcost_double',
                  'id' : 'aw2f85bee1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'rejectqty',
                  'index' : false,
                  'artifactId' : 'receiptInput_rejectqty_double',
                  'id' : 'aw60d6914a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'outside',
                  'index' : false,
                  'artifactId' : 'receiptInput_outside_boolean',
                  'id' : 'aw579da86d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'issue',
                  'index' : false,
                  'artifactId' : 'receiptInput_issue_boolean',
                  'id' : 'aw2612fcf0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'currencycode',
                  'index' : false,
                  'artifactId' : 'receiptInput_currencycode_string',
                  'id' : 'awbd6c8ead',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'loadedcost',
                  'index' : false,
                  'artifactId' : 'receiptInput_loadedcost_double',
                  'id' : 'awd0f42e8d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'prorated',
                  'index' : false,
                  'artifactId' : 'receiptInput_prorated_boolean',
                  'id' : 'aw8d34e13a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'curbal',
                  'index' : false,
                  'artifactId' : 'receiptInput_curbal_double',
                  'id' : 'aw873e2f1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'costinfo',
                  'index' : false,
                  'artifactId' : 'receiptInput_costinfo_boolean',
                  'id' : 'aw35223be6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'enteredastask',
                  'index' : false,
                  'artifactId' : 'receiptInput_enteredastask_boolean',
                  'id' : 'aw81535b60',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'consignment',
                  'index' : false,
                  'artifactId' : 'receiptInput_consignment_boolean',
                  'id' : 'aw5c48e625',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'artifactId' : 'receiptInput_conversion_double',
                  'id' : 'aw22604612',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'receivedunit',
                  'index' : false,
                  'artifactId' : 'receiptInput_receivedunit_string',
                  'id' : 'aw16d5f617',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'quantityAvailableToReceive',
                  'index' : false,
                  'artifactId' : 'receiptInput_quantityAvailableToReceive_double',
                  'id' : 'aw6c4339e3',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'quantityAvailableToReturn',
                  'index' : false,
                  'artifactId' : 'receiptInput_quantityAvailableToReturn_double',
                  'id' : 'awbf8273c2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'receiptInput_wonum_string',
                  'id' : 'awf5431381',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueTo',
                  'index' : false,
                  'artifactId' : 'receiptInput_issueTo_string',
                  'id' : 'awea25f5f5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'returnindicator',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'receiptInput_returnindicator_boolean',
                  'id' : 'awd9ac6a8f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'positeid',
                  'index' : false,
                  'artifactId' : 'receiptInput_positeid_string',
                  'id' : 'aw31959202',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'modelnumref',
                  'index' : false,
                  'artifactId' : 'receiptInput_modelnum_string',
                  'id' : 'awfce9e675',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'receiptInput_lotnum_string',
                  'id' : 'aw427a4b31',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : false,
                  'artifactId' : 'receiptInput_formno_string',
                  'id' : 'aw17178786',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise071 = PersistenceManager.initCollection( resource071 );


            var resource072 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'additionalvendor',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'additionalvendor_additionalVendor',
                  'additionalData' : true,
                  'id' : 'aw72baba40',
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,oslc:shortTitle,dcterms:identifier,dcterms:title,spi:type').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'additionalvendor_orgid',
                  'maxSize' : 8,
                  'id' : 'awd7552dec',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'company',
                  'index' : true,
                  'artifactId' : 'additionalvendor_company',
                  'maxSize' : 128,
                  'id' : 'aw3de813e0',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'companiesid',
                  'index' : false,
                  'artifactId' : 'additionalvendor_companiesid',
                  'maxSize' : 19,
                  'id' : 'awe3db85ed',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'name',
                  'index' : true,
                  'artifactId' : 'additionalvendor_name',
                  'maxSize' : 50,
                  'id' : 'aw210ac4e',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'additionalvendor_type',
                  'maxSize' : 1,
                  'id' : 'awd0ed8561',
                  'local' : false,
                  'remoteName' : 'spi:type',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'companyForSearch',
                  'formula' : '${company}',
                  'index' : true,
                  'artifactId' : 'additionalvendor_companyForSearch_string',
                  'id' : 'aw3bb493f5',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'getVendors', queryString:'\/oslc\/os\/oslccompanies', queryLabel:'' }
               ]);
            var resourcePromise072 = PersistenceManager.initCollection( resource072 );


            var resource073 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'poResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'poResource',
                  'id' : 'awb6dceab2',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,oslc:shortTitle,dcterms:title,spi:status,spi:siteid,spi:orgid,spi:vendor,spi:receipts,spi:internal,spi:orderdate,spi:formno').
               setSupportiveFieldsSelectExpression('spi:poline{spi:mrnum,spi:polineid,spi:polinenum,spi:linetype,spi:orderqty,spi:linecost,spi:receivedqty,spi:storeloc,spi:inspectionrequired,spi:remark,spi:receivedtotalcost,spi:conditioncode,spi:description,spi:receiptscomplete,spi:conversion,spi:orderunit,spi:unitcost,spi:wonum,spi:gldebitacct,spi:anywhererefid,spi:revisionnum,spi:siteid,spi:issue,spi:item{spi:rotating,oslc:shortTitle},spi:inventory{spi:itemsetid,spi:binnum}},spi:attachments{oslc_cm:attachmentSize,dcterms:title,spi:fileName,dcterms:description,dcterms:created,spi:urlType,spi:docType,spi:printthrulink,spi:contentLocation,spi:anywhererefid,spi:createby}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'poid',
                  'index' : false,
                  'artifactId' : 'po_poid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awb60c5ab',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'po_ponum_spi_ponum',
                  'maxSize' : 9,
                  'id' : 'aw250cfb71',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'po_description_dcterms_description',
                  'maxSize' : 200,
                  'id' : 'awe16448c1',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'po_status_spistatus',
                  'maxSize' : 20,
                  'id' : 'awc52b78e',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'po_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw3696e3e5',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'po_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw4ad43f10',
                  'local' : false,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'vendor',
                  'index' : true,
                  'artifactId' : 'po_vendor_spivendor',
                  'maxSize' : 128,
                  'id' : 'awc082b0a4',
                  'local' : false,
                  'remoteName' : 'spi:vendor',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'receipts',
                  'index' : true,
                  'artifactId' : 'po_receipts_spireceipts',
                  'maxSize' : 20,
                  'id' : 'aw825e5097',
                  'local' : false,
                  'remoteName' : 'spi:receipts',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'internal',
                  'index' : true,
                  'artifactId' : 'po_internal_spiinternal',
                  'id' : 'aw4703e0cc',
                  'local' : false,
                  'remoteName' : 'spi:internal',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'orderdate',
                  'index' : false,
                  'artifactId' : 'po_internal_spiorderdate',
                  'id' : 'awaf394e3c',
                  'local' : false,
                  'remoteName' : 'spi:orderdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'polineResource',
                  'name' : 'poline',
                  'index' : false,
                  'artifactId' : 'po_poline_spispoline',
                  'id' : 'awcc41123c',
                  'describedByResource' : 'polineResource',
                  'local' : false,
                  'remoteName' : 'spi:poline',
                  'selectExpression' : 'spi:poline{spi:mrnum,spi:polineid,spi:polinenum,spi:linetype,spi:orderqty,spi:linecost,spi:receivedqty,spi:storeloc,spi:inspectionrequired,spi:remark,spi:receivedtotalcost,spi:conditioncode,spi:description,spi:receiptscomplete,spi:conversion,spi:orderunit,spi:unitcost,spi:wonum,spi:gldebitacct,spi:anywhererefid,spi:revisionnum,spi:siteid,spi:issue,spi:item{spi:rotating,oslc:shortTitle},spi:inventory{spi:itemsetid,spi:binnum}}',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'attachments',
                  'name' : 'attachments',
                  'index' : false,
                  'artifactId' : 'po_attachments_spiattachments',
                  'id' : 'aw442dae79',
                  'describedByResource' : 'attachments',
                  'local' : false,
                  'remoteName' : 'spi:attachments',
                  'selectExpression' : 'spi:attachments{oslc_cm:attachmentSize,dcterms:title,spi:fileName,dcterms:description,dcterms:created,spi:urlType,spi:docType,spi:printthrulink,spi:contentLocation,spi:anywhererefid,spi:createby}',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'formno',
                  'index' : true,
                  'artifactId' : 'po_internal_spi_formno',
                  'maxSize' : 30,
                  'id' : 'awb399d15e',
                  'local' : false,
                  'remoteName' : 'spi:formno',
               }).
               setQueryBases([
                     {name:'getPO', queryString:'\/oslc\/os\/oslcpo', queryLabel:'' }
               ]).
               setWhereClause('spi%3Asiteid%3D%24%7Bdefsite%7D');
            var resourcePromise073 = PersistenceManager.initCollection( resource073 );


            var resource074 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'invoicematchResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'invoicematchResource',
                  'id' : 'awa395658f',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:matrectransid,spi:siteid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'invoicematchid',
                  'index' : false,
                  'artifactId' : 'invoicematchResource_poid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awa618e886',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'matrectransid',
                  'index' : true,
                  'artifactId' : 'invoicematchResource_spimatrectransid',
                  'id' : 'aw24cff044',
                  'local' : false,
                  'remoteName' : 'spi:matrectransid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'positeid',
                  'index' : true,
                  'artifactId' : 'invoicematchResource_spipositeid',
                  'maxSize' : 8,
                  'id' : 'aw1933e88',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               setQueryBases([
                     {name:'getInvoicematch', queryString:'\/oslc\/os\/oslcinvoicematch', queryLabel:'' }
               ]);
            var resourcePromise074 = PersistenceManager.initCollection( resource074 );


            var resource075 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'vendorPOResource',
                  'resourceName' : 'vendorPOResource',
                  'id' : 'awfc8b1b5d',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'poid',
                  'index' : false,
                  'artifactId' : 'vendorPOResource_poid_dctermsidentifier',
                  'id' : 'aw55bc74f8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_ponum_spi_ponum',
                  'id' : 'awc5490811',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'vendorPOResource_description_dcterms_description',
                  'id' : 'awea00e3fd',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_status_spistatus',
                  'id' : 'aw41009325',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_siteid_spisiteid',
                  'id' : 'aw7bc4c74e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'orgid',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_orgid_spiorgid',
                  'id' : 'awdace411a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'vendor',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_vendor_spivendor',
                  'id' : 'aw8dd0940f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'receipts',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_receipts_spireceipts',
                  'id' : 'awa7902254',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'internal',
                  'index' : true,
                  'artifactId' : 'vendorPOResource_internal_spiinternal',
                  'id' : 'aw62cd920f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'orderdate',
                  'index' : false,
                  'artifactId' : 'vendorPOResource_internal_spiorderdate',
                  'id' : 'awad711344',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise075 = PersistenceManager.initCollection( resource075 );


            var resource076 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'polineResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'polineResource',
                  'id' : 'awed89f5dc',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:mrnum,spi:polineid,spi:polinenum,spi:linetype,spi:orderqty,spi:linecost,spi:receivedqty,spi:storeloc,spi:inspectionrequired,spi:remark,spi:receivedtotalcost,spi:conditioncode,spi:description,spi:receiptscomplete,spi:conversion,spi:orderunit,spi:unitcost,spi:wonum,spi:gldebitacct,spi:anywhererefid,spi:revisionnum,spi:siteid,spi:issue,spi:item{spi:rotating,oslc:shortTitle},spi:inventory{spi:itemsetid,spi:binnum}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'mrnum',
                  'index' : false,
                  'artifactId' : 'polineResource_mrnum_spi_mrnum',
                  'maxSize' : 8,
                  'id' : 'awdce1fae',
                  'local' : false,
                  'remoteName' : 'spi:mrnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'polineid',
                  'index' : false,
                  'artifactId' : 'polineResource_polineid_spi_polineid',
                  'id' : 'aw718f8674',
                  'local' : false,
                  'remoteName' : 'spi:polineid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'polineResource_polinenum_spi_polinenum',
                  'id' : 'aw54dfbfb2',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'linetype',
                  'index' : false,
                  'artifactId' : 'polineResource_linetype_spi_frombin',
                  'maxSize' : 15,
                  'id' : 'aw41b7cd44',
                  'local' : false,
                  'remoteName' : 'spi:linetype',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'orderqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'polineResource_orderqty_spi_orderqty',
                  'id' : 'awfb71a25b',
                  'local' : false,
                  'remoteName' : 'spi:orderqty',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'linecost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'polineResource_linecost_spi_linecost',
                  'id' : 'awd0475690',
                  'local' : false,
                  'remoteName' : 'spi:linecost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'receivedqty',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'polineResource_receivedqty_spi_receivedqty',
                  'id' : 'aw4b433a2b',
                  'local' : false,
                  'remoteName' : 'spi:receivedqty',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'storeloc',
                  'index' : false,
                  'artifactId' : 'polineResource_tostoreloc_spi_tostoreloc',
                  'maxSize' : 30,
                  'id' : 'awbc2482bc',
                  'local' : false,
                  'remoteName' : 'spi:storeloc',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'inspectionrequired',
                  'index' : false,
                  'artifactId' : 'polineResource_inspectionrequired_spi_inspectionrequired',
                  'id' : 'aw1cbec91b',
                  'local' : false,
                  'remoteName' : 'spi:inspectionrequired',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'remark',
                  'index' : false,
                  'artifactId' : 'polineResource_remark_spi_remark',
                  'maxSize' : 50,
                  'id' : 'awebe1e063',
                  'local' : false,
                  'remoteName' : 'spi:remark',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'receivedtotalcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'polineResource_receivedtotalcost_spi_receivedtotalcost',
                  'id' : 'aw23265e98',
                  'local' : false,
                  'remoteName' : 'spi:receivedtotalcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'polineResource',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'polineResource_itemnum_spi_itemnum',
                  'maxSize' : 30,
                  'id' : 'aw44d7ecbe',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:rotating',
                  'dataType' : 'reference',
                  'referenceResource' : 'polineResource',
                  'name' : 'rotating',
                  'index' : false,
                  'artifactId' : 'polineResource_rotating_spi_rotating',
                  'id' : 'aw80e0f50f',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:itemsetid',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'polineResource',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'polineResource_itemsetid_spi_itemsetid',
                  'maxSize' : 8,
                  'id' : 'aw1cdc696a',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:binnum',
                  'dataType' : 'reference',
                  'referenceResource' : 'polineResource',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'polineResource_itemsetid_spi_binnum',
                  'maxSize' : 50,
                  'id' : 'awbe9ca5be',
                  'local' : false,
                  'remoteName' : 'spi:inventory',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'conditioncode',
                  'index' : false,
                  'artifactId' : 'polineResource_conditioncode_spi_conditioncode',
                  'maxSize' : 30,
                  'id' : 'aw41cc4f7e',
                  'local' : false,
                  'remoteName' : 'spi:conditioncode',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'polineResource_description_spi_description',
                  'maxSize' : 512,
                  'id' : 'awe02e0b0e',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'receiptscomplete',
                  'index' : false,
                  'artifactId' : 'polineResource_receiptscomplete_spi_receiptscomplete',
                  'id' : 'aw5ef0e35f',
                  'local' : false,
                  'remoteName' : 'spi:receiptscomplete',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'conversion',
                  'index' : false,
                  'scale' : 6,
                  'artifactId' : 'polineResource_conversion_spi_conversion',
                  'id' : 'aw250f3f4a',
                  'local' : false,
                  'remoteName' : 'spi:conversion',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orderunit',
                  'index' : false,
                  'artifactId' : 'polineResource_orderunit_spi_orderunit',
                  'maxSize' : 16,
                  'id' : 'aw8796a0ae',
                  'local' : false,
                  'remoteName' : 'spi:orderunit',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'unitcost',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'polineResource_unitcost_spi_unitcost',
                  'id' : 'awadd693b1',
                  'local' : false,
                  'remoteName' : 'spi:unitcost',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'polineResource_wonum_spi_wonum',
                  'maxSize' : 10,
                  'id' : 'aw77c8b1a1',
                  'local' : false,
                  'remoteName' : 'spi:wonum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'gldebitacct',
                  'index' : false,
                  'artifactId' : 'polineResource_wonum_spi_gldebitacct',
                  'maxSize' : 54,
                  'id' : 'aw5643e27',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'anywhererefid',
                  'index' : false,
                  'artifactId' : 'polineResource_anywhererefid_spi_anywhererefid',
                  'id' : 'aw52338542',
                  'local' : false,
                  'remoteName' : 'spi:anywhererefid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'name' : 'revisionnum',
                  'index' : false,
                  'artifactId' : 'polineResource_spi_revisionnum',
                  'id' : 'awd0fab83c',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:revisionnum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'polineResource_spi_siteid',
                  'maxSize' : 8,
                  'id' : 'aw1b13dd77',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'issue',
                  'index' : false,
                  'artifactId' : 'polineResource_spi_issue',
                  'id' : 'aw4edd0c30',
                  'local' : false,
                  'remoteName' : 'spi:issue',
               });
            var resourcePromise076 = PersistenceManager.initCollection( resource076 );


            var resource077 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domainpostatus',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainpostatus',
                  'id' : 'awe8d14e2f',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'domainpostatus_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aweb770803',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'domainpostatus_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'awefc4a6db',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainpostatus_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'awa85c2101',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainpostatus_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awa29b17af',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainpostatus_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'awa3d7e6d1',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainpostatus_defaults_spidefaults',
                  'id' : 'aw3096d341',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainpostatus_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'awd8338a63',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'domainpostatus_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw604fa638',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getpostatus', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22POSTATUS%22');
            var resourcePromise077 = PersistenceManager.initCollection( resource077 );


            var resource078 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'invlifofifocostResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'invlifofifocostResource',
                  'id' : 'awa3efb4f6',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:refobject,spi:refobjectid,spi:quantity,spi:costtype').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'refobject',
                  'index' : false,
                  'artifactId' : 'invlifofifocostResource_spi_refobject',
                  'maxSize' : 30,
                  'id' : 'awf36b2119',
                  'local' : false,
                  'remoteName' : 'spi:refobject',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'usage' : 'bigint',
                  'name' : 'refobjectid',
                  'index' : false,
                  'artifactId' : 'invlifofifocostResource_spi_refobjectid',
                  'id' : 'aw68502d7d',
                  'local' : false,
                  'remoteName' : 'spi:refobjectid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'double',
                  'name' : 'quantity',
                  'index' : false,
                  'scale' : 2,
                  'artifactId' : 'invlifofifocostResource_spi_quantity',
                  'id' : 'awcd81cf15',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'costtype',
                  'index' : false,
                  'artifactId' : 'invlifofifocostResource_spi_costtype',
                  'maxSize' : 16,
                  'id' : 'aw38b42c4b',
                  'local' : false,
                  'remoteName' : 'spi:costtype',
               });
            var resourcePromise078 = PersistenceManager.initCollection( resource078 );


            var resource079 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'invoiceResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'invoiceResource',
                  'id' : 'awc37641ee',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:invoicenum,spi:status').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'invoicenum',
                  'index' : false,
                  'artifactId' : 'invoiceResource_spi_invoicenum',
                  'maxSize' : 9,
                  'id' : 'awfd350ef',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:invoicenum',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : false,
                  'artifactId' : 'invoiceResource_spi_status',
                  'maxSize' : 10,
                  'id' : 'awce4c9d85',
                  'local' : false,
                  'remoteName' : 'spi:status',
               });
            var resourcePromise079 = PersistenceManager.initCollection( resource079 );


            var resource080 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'attachments',
                  'isAttachment' : true,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'attachments',
                  'id' : 'aw47c4fad6',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
                  'classInstance' : AttachmentsObject,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('oslc_cm:attachmentSize,dcterms:title,spi:fileName,dcterms:description,dcterms:created,spi:urlType,spi:docType,spi:printthrulink,spi:contentLocation,spi:anywhererefid,spi:createby').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'fileSize',
                  'index' : false,
                  'artifactId' : 'attachments_fileSize_oslc_cmattachmentSize',
                  'id' : 'awafc65e01',
                  'local' : false,
                  'remoteName' : 'oslc_cm:attachmentSize',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'fileName',
                  'index' : false,
                  'artifactId' : 'attachments_fileName_dctermstitle',
                  'id' : 'aw3390da65',
                  'key' : '1',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'fullFileName',
                  'index' : false,
                  'artifactId' : 'attachments_fullFileName_spifileName',
                  'id' : 'awf858d871',
                  'key' : '2',
                  'local' : false,
                  'remoteName' : 'spi:fileName',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'attachments_description_dctermsdescription',
                  'id' : 'awbe16d790',
                  'local' : false,
                  'remoteName' : 'dcterms:description',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'creationDate',
                  'index' : false,
                  'artifactId' : 'attachments_creationDate_dctermscreated',
                  'id' : 'awa88d4af8',
                  'key' : '3',
                  'local' : false,
                  'remoteName' : 'dcterms:created',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'urlType',
                  'index' : false,
                  'artifactId' : 'attachments_urlType_spiurlType',
                  'id' : 'aw85d66259',
                  'local' : false,
                  'remoteName' : 'spi:urlType',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'docType',
                  'index' : false,
                  'artifactId' : 'attachments_docType_spidocType',
                  'id' : 'aw3393c41b',
                  'local' : false,
                  'remoteName' : 'spi:docType',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'bulkDownload',
                  'index' : false,
                  'artifactId' : 'attachments_bulkDownload_spiprintthrulink',
                  'id' : 'aw679c4e95',
                  'local' : false,
                  'remoteName' : 'spi:printthrulink',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'contentLocation',
                  'index' : false,
                  'artifactId' : 'attachments_contentLocation_spicontentLocation',
                  'id' : 'aw1faa9ae7',
                  'local' : false,
                  'remoteName' : 'spi:contentLocation',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'anywhereRefId',
                  'index' : false,
                  'artifactId' : 'attachments_anywhereRefId_spianywhererefid',
                  'id' : 'awb58bd2df',
                  'local' : false,
                  'remoteName' : 'spi:anywhererefid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'createby',
                  'index' : false,
                  'artifactId' : 'attachments_createby_spicreateby',
                  'id' : 'aw2cff279b',
                  'local' : false,
                  'remoteName' : 'spi:createby',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'displaySize',
                  'index' : false,
                  'artifactId' : 'attachments_displaySize_string',
                  'id' : 'awa53cf2df',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'displayFileName',
                  'formula' : '(${fileName} || ${anywhereAttachName})',
                  'index' : false,
                  'artifactId' : 'attachments_displayFileName_string',
                  'id' : 'aw986667e5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'displayDescription',
                  'formula' : '(${description} || ${anywhereAttachDescription})',
                  'index' : false,
                  'artifactId' : 'attachments_displayDescription_string',
                  'id' : 'awce6df00e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'displayCategory',
                  'formula' : '(${docType} || ${anywhereAttachCategory})',
                  'index' : false,
                  'artifactId' : 'attachments_displayCategory_string',
                  'id' : 'awcdc99aca',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'dateTime',
                  'name' : 'displayCreationDate',
                  'formula' : '(${creationDate} || ${anywhereCreationDate})',
                  'index' : false,
                  'artifactId' : 'attachments_displayCreationDate_dateTime',
                  'id' : 'awd23c62ba',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'displayCreationDateISO',
                  'formula' : '${displayCreationDate}',
                  'index' : true,
                  'artifactId' : 'attachments_displayCreationDate_dateTime_ISO',
                  'id' : 'aw98265f86',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'displayFileType',
                  'index' : false,
                  'artifactId' : 'attachments_displayFileType_string',
                  'id' : 'awbdc99f90',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise080 = PersistenceManager.initCollection( resource080 );


            var resource081 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformAttachmentInfoResource',
                  'resourceName' : 'PlatformAttachmentInfoResource',
                  'id' : 'awdb366a89',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'name',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_name_string',
                  'maxSize' : 20,
                  'id' : 'aw7ad1254c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_description_string',
                  'maxSize' : 50,
                  'id' : 'aw91c3001f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'category',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_category_string',
                  'id' : 'aw5507e626',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'fileType',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_fileType_string',
                  'id' : 'aw2507e37c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'fileSize',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_fileSize_integer',
                  'id' : 'aw6141898c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'localPath',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_localPath_string',
                  'id' : 'awc2c06db6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'dateTime',
                  'name' : 'createDate',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentInfoResource_createDate_dateTime',
                  'id' : 'awc78ca0bd',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise081 = PersistenceManager.initCollection( resource081 );


            var resource082 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformAttachmentCategoryResource',
                  'resourceName' : 'PlatformAttachmentCategoryResource',
                  'id' : 'aw4ffdce67',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'folderName',
                  'index' : false,
                  'artifactId' : 'PlatformAttachmentCategoryResource_folderName_string',
                  'maxSize' : 20,
                  'id' : 'awee53f8c0',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise082 = PersistenceManager.initCollection( resource082 );


            var resource083 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'anywherePropVal',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'anywherePropValRes',
                  'id' : 'awb4801c67',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:propid,spi:propvalue,spi:description,spi:changedate,dcterms:identifier,spi:appid,spi:maxgroupid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'propid',
                  'index' : false,
                  'artifactId' : 'anywherePropValPropId',
                  'id' : 'aw344e19d',
                  'local' : false,
                  'remoteName' : 'spi:propid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'anywherePropValValues',
                  'id' : 'aw5cc16cbe',
                  'local' : false,
                  'remoteName' : 'spi:propvalue',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'anywherePropValDescription',
                  'id' : 'awba4810a1',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'changedate',
                  'index' : false,
                  'artifactId' : 'anywherePropValChangedate',
                  'id' : 'aw9752257c',
                  'local' : false,
                  'remoteName' : 'spi:changedate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'identifier',
                  'index' : true,
                  'artifactId' : 'anywherePropValIdentifier',
                  'id' : 'awd6acea8b',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'appName',
                  'index' : true,
                  'artifactId' : 'anywherePropValAppName',
                  'id' : 'awf8dec4e3',
                  'local' : false,
                  'remoteName' : 'spi:appid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'groupName',
                  'index' : true,
                  'artifactId' : 'anywherePropValGroupName',
                  'id' : 'aw6312bf1a',
                  'local' : false,
                  'remoteName' : 'spi:maxgroupid',
               }).
               setQueryBases([
                     {name:'anywherepropvalQB', queryString:'\/oslc\/os\/oslcanywherepropval', defaultForSearch: true, queryLabel:'' }
               ]);
            var resourcePromise083 = PersistenceManager.initCollection( resource083 );


            var resource084 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'anywhereResourceSrc',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'anywhereResourceSrcRes',
                  'id' : 'aw84adce73',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:resourceid,spi:type,spi:pagesize,spi:description,spi:changedate,spi:appid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'identifier',
                  'index' : true,
                  'artifactId' : 'anywhereResourceIdentifier',
                  'id' : 'aw69698b5d',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'resourceId',
                  'index' : false,
                  'artifactId' : 'anywhereResourceResourceId',
                  'id' : 'aw92b27486',
                  'local' : false,
                  'remoteName' : 'spi:resourceid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'anywhereResourceType',
                  'id' : 'awce0667d7',
                  'local' : false,
                  'remoteName' : 'spi:type',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'pageSize',
                  'index' : false,
                  'artifactId' : 'anywhereResourcePageSize',
                  'id' : 'aw45c77190',
                  'local' : false,
                  'remoteName' : 'spi:pagesize',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'anywhereResourceDescription',
                  'id' : 'awd547a221',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'changedate',
                  'index' : false,
                  'artifactId' : 'anywhereResourceChangedate',
                  'id' : 'aw289744aa',
                  'local' : false,
                  'remoteName' : 'spi:changedate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'appName',
                  'index' : true,
                  'artifactId' : 'anywhereResourceAppName',
                  'id' : 'aw751c4988',
                  'local' : false,
                  'remoteName' : 'spi:appid',
               }).
               setQueryBases([
                     {name:'anywhereResourceQB', queryString:'\/oslc\/os\/oslcanywhereresrc', defaultForSearch: true, queryLabel:'' }
               ]);
            var resourcePromise084 = PersistenceManager.initCollection( resource084 );


            var resource085 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'anywhereResVal',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'AnywhereResValRes',
                  'id' : 'aw282573c2',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:sort,spi:sequence,spi:changedate,dcterms:identifier,spi:appid,spi:maxgroupid,spi:queryid,spi:description,spi:resourceid,spi:blindcount,spi:resanywhereresource{spi:type}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'sort',
                  'index' : false,
                  'artifactId' : 'AnywhereResValSort',
                  'id' : 'aw5c180fb5',
                  'local' : false,
                  'remoteName' : 'spi:sort',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'sequence',
                  'index' : false,
                  'artifactId' : 'AnywhereResValSequence',
                  'id' : 'awc24febf7',
                  'local' : false,
                  'remoteName' : 'spi:sequence',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'changedate',
                  'index' : false,
                  'artifactId' : 'AnywhereResValChangedate',
                  'id' : 'aw34322ac0',
                  'local' : false,
                  'remoteName' : 'spi:changedate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'identifier',
                  'index' : true,
                  'artifactId' : 'AnywhereResValIdentifier',
                  'id' : 'aw75cce537',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'appName',
                  'index' : true,
                  'artifactId' : 'AnywhereResValAppName',
                  'id' : 'aweb29360a',
                  'local' : false,
                  'remoteName' : 'spi:appid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'groupName',
                  'index' : true,
                  'artifactId' : 'AnywhereResValGroupName',
                  'id' : 'awbf1d7778',
                  'local' : false,
                  'remoteName' : 'spi:maxgroupid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'query',
                  'index' : true,
                  'artifactId' : 'AnywhereResValQuery',
                  'id' : 'aw4adb8ff1',
                  'local' : false,
                  'remoteName' : 'spi:queryid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'queryDescription',
                  'index' : false,
                  'artifactId' : 'AnywhereResValQueryDescription',
                  'id' : 'aw9a342410',
                  'local' : false,
                  'remoteName' : 'spi:description',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'resourceId',
                  'index' : true,
                  'artifactId' : 'AnywhereResValResourceId',
                  'id' : 'aw8e171aec',
                  'local' : false,
                  'remoteName' : 'spi:resourceid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'blindCount',
                  'index' : false,
                  'artifactId' : 'AnywhereResValBlindCount',
                  'id' : 'aw8b5ff5c9',
                  'local' : false,
                  'remoteName' : 'spi:blindcount',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:type',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'anywhereResVal',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'AnywhereResValType',
                  'maxSize' : 80,
                  'id' : 'aw81e2aabe',
                  'local' : false,
                  'remoteName' : 'spi:resanywhereresource',
               }).
               setQueryBases([
                     {name:'AnywhereResValQB', queryString:'\/oslc\/os\/oslcanywhereresrval', defaultForSearch: true, queryLabel:'' }
               ]);
            var resourcePromise085 = PersistenceManager.initCollection( resource085 );


            var resource086 = new ResourceMetadata({
                  'defaultOrderBy' : 'notificationId desc',
                  'pageSize' : 5,
                  'resourceName' : 'osusernotification',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'osusernotification',
                  'id' : 'awe5c87076',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 10,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:osusernotificationid,spi:eventname,spi:intobjectname,spi:notfeventmessage,spi:notificationtime,spi:eventforuser,spi:appid').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'notificationId',
                  'index' : true,
                  'artifactId' : 'oslcosusernotificationid',
                  'id' : 'awceee3768',
                  'local' : false,
                  'remoteName' : 'spi:osusernotificationid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'eventName',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificatiEventName',
                  'id' : 'awf9242f79',
                  'local' : false,
                  'remoteName' : 'spi:eventname',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'intObjectName',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificatiIntobjectName',
                  'id' : 'awcf896a27',
                  'local' : false,
                  'remoteName' : 'spi:intobjectname',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'notfeventmessage',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificatiNotfeventmessage',
                  'id' : 'awba8ec9a7',
                  'local' : false,
                  'remoteName' : 'spi:notfeventmessage',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'notifDate',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_notifDate_dateTime',
                  'id' : 'aw1edc3be',
                  'local' : false,
                  'remoteName' : 'spi:notificationtime',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'owner',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_eventforuser_string',
                  'id' : 'aw4da92124',
                  'local' : false,
                  'remoteName' : 'spi:eventforuser',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'appid',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_appid_string',
                  'id' : 'aw26547590',
                  'local' : false,
                  'remoteName' : 'spi:appid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_itemnum_string',
                  'id' : 'aw8d6872e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemDesc',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_itemDesc_string',
                  'id' : 'awe13aa2f6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'viewed',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_viewed_boolean',
                  'id' : 'awee3971d8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'dateTime',
                  'name' : 'uiDate',
                  'index' : false,
                  'artifactId' : 'oslcosusernotificati_uiDate_dateTime',
                  'id' : 'awe4cea6a1',
                  'persistent' : true,
                  'local' : true,
               }).
               setQueryBases([
                     {name:'oslcosusernotificatiQB', queryString:'\/oslc\/os\/oslcosusernotificati', defaultForSearch: true, queryLabel:'' }
               ]).
               setWhereClause('spi%3Aeventforuser%3D%24%7Bpersonid%7D');
            var resourcePromise086 = PersistenceManager.initCollection( resource086 );


            var resource087 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformLongPressResource',
                  'resourceName' : 'PlatformLongPressResource',
                  'id' : 'awb1ffcb05',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'platform' : 'true',
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'label',
                  'index' : false,
                  'artifactId' : 'PlatformLongPressResource_label_string',
                  'id' : 'aw64d95f11',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'transitionTo',
                  'index' : false,
                  'artifactId' : 'PlatformLongPressResource_transitionTo_string',
                  'id' : 'awffa4a814',
                  'persistent' : true,
                  'key' : '1',
                  'local' : true,
               });
            var resourcePromise087 = PersistenceManager.initCollection( resource087 );


            var resource088 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformViewQueryResource',
                  'resourceName' : 'PlatformViewQueryResource',
                  'id' : 'awacb7affd',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'viewid',
                  'index' : false,
                  'artifactId' : 'PlatformViewQueryResource_viewid_string',
                  'id' : 'aw75cb4bd2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'index',
                  'index' : false,
                  'artifactId' : 'PlatformViewQueryResource_index_integer',
                  'id' : 'aw2e6fb89f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'queryid',
                  'index' : false,
                  'artifactId' : 'PlatformViewQueryResource_queryid_string',
                  'id' : 'aw94d0b850',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise088 = PersistenceManager.initCollection( resource088 );


            var resource089 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformListSortResource',
                  'resourceName' : 'PlatformListSortResource',
                  'id' : 'aw1a0eea87',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'listid',
                  'index' : false,
                  'artifactId' : 'PlatformListSortResource_listid_string',
                  'id' : 'aw9064a276',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'index',
                  'index' : false,
                  'artifactId' : 'PlatformListSortResource_index_integer',
                  'id' : 'awe8ec244c',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise089 = PersistenceManager.initCollection( resource089 );


            var resource090 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformListSearchResource',
                  'resourceName' : 'PlatformListSearchResource',
                  'id' : 'aw6a400d8e',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'listid',
                  'index' : false,
                  'artifactId' : 'PlatformListSearchResource_listid_string',
                  'id' : 'awcaa8923a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'search',
                  'index' : false,
                  'artifactId' : 'PlatformListSearchResource_search_string',
                  'id' : 'aw65d03ec8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'querybase',
                  'index' : false,
                  'artifactId' : 'PlatformListSearchResource_querybase_string',
                  'id' : 'aw91302f64',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'fromscan',
                  'index' : false,
                  'artifactId' : 'PlatformListSearchResource_fromscan_boolean',
                  'id' : 'awdf9c4f91',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'exact',
                  'index' : false,
                  'artifactId' : 'PlatformListSearchResource_exact_boolean',
                  'id' : 'aw8148e995',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise090 = PersistenceManager.initCollection( resource090 );


            var resource091 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformResourceMetricsResource',
                  'resourceName' : 'PlatformResourceMetricsResource',
                  'id' : 'aw589b431',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'resourceName',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_resourcename_string',
                  'id' : 'aw9ccdf5ce',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'queryBase',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_querybase_string',
                  'id' : 'aw8c157d61',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'serverCount',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_serverCount_integer',
                  'id' : 'awbfceeff2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'allDownloaded',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_allDownloaded_boolean',
                  'id' : 'aw300f625',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'pageCount',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_pageCount_integer',
                  'id' : 'aw5a6b5e5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'pageSize',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_pageSize_integer',
                  'id' : 'aw3c45365e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'worklistDownloaded',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_worklistDownloaded_boolean',
                  'id' : 'aw43cb396d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'scanFilter',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_scanFilter_string',
                  'id' : 'aw4f310615',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_type_string',
                  'id' : 'awd38d7b81',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'stringr',
                  'name' : 'errorCode',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_errorCode_integer',
                  'id' : 'awab704940',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'resourcePreviousPageSize',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_resourcePreviousPageSize_integer',
                  'id' : 'awca853d70',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'totalNumberOfPagesToDownlaod',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_totalNumberOfPagesToDownlaod_integer',
                  'id' : 'awe74022e4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'numberOfPagesDownloaded',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_numberOfPagesDownloaded_integer',
                  'id' : 'aw3628b6b1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'detlaTotalNumberOfPagesToDownlaod',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_detlaTotalNumberOfPagesToDownlaod_integer',
                  'id' : 'aw9778eaab',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'deltaNumberOfPagesDownloaded',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_deltaNumberOfPagesDownloaded_integer',
                  'id' : 'aw462530e7',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'attempt',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_attempt_integer',
                  'id' : 'aw84b751ff',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'maxrowstamp',
                  'index' : false,
                  'artifactId' : 'PlatformResourceMetricsResource_maxrowstamp_string',
                  'id' : 'aw7569ffdb',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise091 = PersistenceManager.initCollection( resource091 );


            var resource092 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'DataSyncTracking',
                  'resourceName' : 'DataSyncTracking',
                  'id' : 'aw9df5e2ad',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'resourceName',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_resourcename_string',
                  'id' : 'aw99060f54',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'type',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_type_integer',
                  'id' : 'aw1422fdcb',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'resourceCurrentPageSize',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_resourceCurrentPageSize_boolean',
                  'id' : 'awdee5c0b8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'resourcePreviousPageSize',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_resourcePreviousPageSize_integer',
                  'id' : 'aw2eacbe9e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'totalNumberOfPagesToDownlaod',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_totalNumberOfPagesToDownlaod_integer',
                  'id' : 'awd1b208bc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'numberOfPagesDownloaded',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_numberOfPagesDownloaded_boolean',
                  'id' : 'awc1ee705e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'dateAndTime',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_dateAndTime_string',
                  'id' : 'awd27b5819',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'queryBase',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_querybase_string',
                  'id' : 'awba2958d5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errrorCode',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_errrorCode_integer',
                  'id' : 'awdd1981da',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'detlaTotalNumberOfPagesToDownlaod',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_detlaTotalNumberOfPagesToDownlaod_boolean',
                  'id' : 'awbf423453',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'deltaNumberOfPagesDownloaded',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_deltaNumberOfPagesDownloaded_string',
                  'id' : 'aw29249252',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'attempt',
                  'index' : false,
                  'artifactId' : 'DataSyncTracking_attempt_string',
                  'id' : 'aw479ef4e2',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise092 = PersistenceManager.initCollection( resource092 );


            var resource093 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformDateLookupResource',
                  'resourceName' : 'PlatformDateLookupResource',
                  'id' : 'aw903a86e4',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'platform' : 'true',
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'date',
                  'name' : 'date',
                  'index' : false,
                  'artifactId' : 'PlatformDateLookupResource_date_date',
                  'id' : 'aw175ff2d4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'duration',
                  'index' : false,
                  'artifactId' : 'PlatformDateLookupResource_duration_string',
                  'id' : 'awaf69d37',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise093 = PersistenceManager.initCollection( resource093 );


            var resource094 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'LastADDownload',
                  'resourceName' : 'LastADDownload',
                  'id' : 'aw62f56f6f',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'platform' : 'true',
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'downloadStatus',
                  'index' : false,
                  'artifactId' : 'LastADDownload_downloadStatus_string',
                  'id' : 'aw78bd99e1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lastDownloadDateMsg',
                  'index' : false,
                  'artifactId' : 'LastADDownload_lastDownloadDateMsg_string',
                  'id' : 'aw8aff521f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'totalDownloaded',
                  'index' : false,
                  'artifactId' : 'LastADDownload_totalDownloaded_string',
                  'id' : 'awbfb04f52',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'downloadAttachments',
                  'index' : false,
                  'artifactId' : 'LastADDownload_downloadAttachments_boolean',
                  'id' : 'awbe6526f5',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'numberOfDaysToSync',
                  'index' : false,
                  'artifactId' : 'LastADDownload_numberOfDaysToSync_string',
                  'id' : 'aw636896bb',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise094 = PersistenceManager.initCollection( resource094 );


            var resource095 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformProgressResource',
                  'resourceName' : 'PlatformProgressResource',
                  'id' : 'aw6e8f90d1',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'progressMsg',
                  'index' : false,
                  'artifactId' : 'PlatformProgressResource_progressMsg_string',
                  'id' : 'aw88797d3c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'started',
                  'index' : false,
                  'artifactId' : 'PlatformProgressResource_started_boolean',
                  'id' : 'awa770aaae',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise095 = PersistenceManager.initCollection( resource095 );


            var resource096 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'timeTrack',
                  'resourceName' : 'timeTrack',
                  'id' : 'awe7baae94',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'ttid',
                  'index' : true,
                  'artifactId' : 'timeTrack_ttid_string',
                  'id' : 'awd1b2cb94',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'content',
                  'index' : false,
                  'artifactId' : 'timeTrack_content_string',
                  'id' : 'aw8ea513de',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise096 = PersistenceManager.initCollection( resource096 );


            var resource097 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformChangePasswordForm',
                  'resourceName' : 'PlatformChangePasswordForm',
                  'id' : 'aw58a2c8cd',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'username',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_username_string',
                  'id' : 'awedfd5901',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'currentpassword',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_currentpassword_string',
                  'id' : 'aw8978d11e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'newpassword',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_newpassword_string',
                  'maxSize' : 35,
                  'id' : 'aw40b72096',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'confirmnewpassword',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_confirmnewpassword_string',
                  'maxSize' : 35,
                  'id' : 'awd6f928ad',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'loginFailed',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_loginFailed_boolean',
                  'id' : 'aw601efe23',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorMsg',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_errorMsg_string',
                  'id' : 'awb8f94064',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'infoMsg',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_infoMsg_string',
                  'id' : 'aw9d64719b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'oslcMaxUserURL',
                  'index' : false,
                  'artifactId' : 'PlatformChangePasswordForm_oslcMaxUserURL_string',
                  'id' : 'aw82d3981b',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise097 = PersistenceManager.initCollection( resource097 );


            var resource098 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformTempPushNotification',
                  'resourceName' : 'PlatformTempPushNotification',
                  'id' : 'aw539422b',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'title',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_title_string',
                  'id' : 'aw9f0d98f1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_description_string',
                  'id' : 'aw534ca27b',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'resourceId',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_resourceId_string',
                  'id' : 'aw850e973d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'resource',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_resource_string',
                  'id' : 'awa816018f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'msgType',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_msgType_string',
                  'id' : 'aw61585e4a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'transitionTo',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_transitionTo_string',
                  'id' : 'awcb25d777',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'afterLogin',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_afterLogin_boolean',
                  'id' : 'aw6ff206dc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'msgProp1',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_msgProp1_string',
                  'id' : 'aw8bc5d3ed',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'msgProp2',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_msgProp2_string',
                  'id' : 'aw54ad40e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'msgProp3',
                  'index' : false,
                  'artifactId' : 'tempPushNotification_msgProp3_string',
                  'id' : 'awc9e0d490',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise098 = PersistenceManager.initCollection( resource098 );


            var resource099 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformDemoModeResource',
                  'resourceName' : 'PlatformDemoModeResource',
                  'id' : 'awa62d35c6',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'platform' : 'true',
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'boolean',
                  'name' : 'DemoONOFF',
                  'index' : false,
                  'artifactId' : 'PlatformDemoModeResource_mode_indicator',
                  'id' : 'aw80f9a21a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'MessageText',
                  'index' : false,
                  'artifactId' : 'PlatformDemoModeResource_message',
                  'id' : 'awc0326999',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise099 = PersistenceManager.initCollection( resource099 );


            var resource100 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformEsigResource',
                  'resourceName' : 'PlatformEsigResource',
                  'id' : 'aw8a065cd1',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'userName',
                  'index' : false,
                  'artifactId' : 'PlatformEsigResource_username_string',
                  'id' : 'awb26601cc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'password',
                  'index' : false,
                  'artifactId' : 'PlatformEsigResource_password_string',
                  'id' : 'awfddb352d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'reason',
                  'index' : false,
                  'artifactId' : 'PlatformEsigResource_reason_boolean',
                  'maxSize' : 50,
                  'id' : 'awb0845042',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'success',
                  'index' : false,
                  'artifactId' : 'PlatformEsigResource_success_boolean',
                  'id' : 'awc27b3d43',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise100 = PersistenceManager.initCollection( resource100 );


            var resource101 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'PlatformEsigAttributeResource',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'enableFeatureByProperty' : 'esig.enabled',
                  'inMemory' : false,
                  'artifactId' : 'PlatformEsigAttributeResource',
                  'id' : 'awe7711043',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:objectname,spi:attributename').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'objectname',
                  'index' : false,
                  'artifactId' : 'PlatformEsigAttributeResource_objectname_string',
                  'id' : 'awe55b6275',
                  'local' : false,
                  'remoteName' : 'spi:objectname',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'attributename',
                  'index' : false,
                  'artifactId' : 'PlatformEsigAttributeResource_attributename_string',
                  'id' : 'aw2ab13920',
                  'local' : false,
                  'remoteName' : 'spi:attributename',
               }).
               setQueryBases([
                     {name:'PlatformEsigAttributeResource_query', queryString:'\/oslc\/os\/oslcesigattribute', queryLabel:'' }
               ]).
               setWhereClause('spi%3Aesigenabled%3D1');
            var resourcePromise101 = PersistenceManager.initCollection( resource101 );


            var resource102 = new ResourceMetadata({
                  'defaultOrderBy' : 'attemptdate desc',
                  'pageSize' : 1000,
                  'resourceName' : 'PlatformLoginTrackingResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'enableFeatureByProperty' : 'esig.enabled',
                  'inMemory' : false,
                  'artifactId' : 'PlatformLoginTrackingResource',
                  'id' : 'aw39ae8c71',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:attemptdate,spi:attemptresult,spi:reason,spi:app,spi:keyvalue1,spi:keyvalue2,spi:userid,spi:loginid,spi:clienthost,spi:clientaddr,spi:ownertable').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'attemptdate',
                  'index' : true,
                  'artifactId' : 'PlatformLoginTrackingResource_attemptdate',
                  'id' : 'awff5afbab',
                  'local' : false,
                  'remoteName' : 'spi:attemptdate',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'attemptresult',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_attemptresult',
                  'id' : 'aw199bee12',
                  'local' : false,
                  'remoteName' : 'spi:attemptresult',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'reason',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_reason',
                  'id' : 'awa3d2f66f',
                  'local' : false,
                  'remoteName' : 'spi:reason',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'app',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_app',
                  'id' : 'awd0285547',
                  'local' : false,
                  'remoteName' : 'spi:app',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'keyvalue1',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_keyvalue1_site',
                  'id' : 'aw80f270fa',
                  'local' : false,
                  'remoteName' : 'spi:keyvalue1',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'keyvalue2',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_keyvalue2_wonum',
                  'id' : 'aw699cc6c',
                  'local' : false,
                  'remoteName' : 'spi:keyvalue2',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'userid',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_userid',
                  'id' : 'aw6958170d',
                  'local' : false,
                  'remoteName' : 'spi:userid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'loginid',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_loginid',
                  'id' : 'aw2d6e9ead',
                  'local' : false,
                  'remoteName' : 'spi:loginid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'clienthost',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_clienthost',
                  'id' : 'awb3d21c4f',
                  'local' : false,
                  'remoteName' : 'spi:clienthost',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'clientaddr',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_clientaddr',
                  'id' : 'aw2e6f9d87',
                  'local' : false,
                  'remoteName' : 'spi:clientaddr',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ownertable',
                  'index' : false,
                  'artifactId' : 'PlatformLoginTrackingResource_ownertable',
                  'id' : 'aw2b901921',
                  'local' : false,
                  'remoteName' : 'spi:ownertable',
               }).
               setCreationFactories([
                     {name:'logEsig', creationString:'\/oslc\/os\/oslclogintracking' }
               ]).
               setQueryBases([
                     {name:'PlatformLoginTrackingResource_query', queryString:'\/oslc\/os\/oslclogintracking', queryLabel:'' }
               ]).
               setWhereClause('spi%3Aattemptdate%21%3D%22*%22');
            var resourcePromise102 = PersistenceManager.initCollection( resource102 );


            var resource103 = new ResourceMetadata({
                  'pageSize' : 100,
                  'resourceName' : 'attemptResultDomain',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'enableFeatureByProperty' : 'esig.enabled',
                  'inMemory' : false,
                  'artifactId' : 'attemptResultDomain',
                  'id' : 'aw63d066a',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:orgid,spi:siteid,spi:maxvalue,spi:value,dcterms:title,spi:defaults,oslc:shortTitle,dcterms:identifier').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'orgid',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'awf56cb276',
                  'local' : false,
                  'pkIndex' : 5,
                  'remoteName' : 'spi:orgid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw96386fe1',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw3864f322',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awbc80adda',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw78cd28e0',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_defaults_spidefaults',
                  'id' : 'awa0ae0162',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw79346d49',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'synonymdomainid',
                  'index' : false,
                  'artifactId' : 'attemptResultDomain_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'aw8d7e08c0',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getAttemptResultDomain', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22ATTEMPTRESULT%22');
            var resourcePromise103 = PersistenceManager.initCollection( resource103 );


            var resource104 = new ResourceMetadata({
                  'pageSize' : 100,
                  'resourceName' : 'lbslocation',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'lbslocation',
                  'id' : 'aw16c9c8ec',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:altitude,spi:altitudeaccuracy,spi:key1,spi:key2,spi:key3,spi:longitude,spi:refobject,spi:speed,spi:lastupdate,spi:latitude,spi:wonum,spi:siteid,spi:heading,spi:locationaccuracy').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'altitude',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_altitude',
                  'id' : 'aw6c41f5f1',
                  'local' : false,
                  'remoteName' : 'spi:altitude',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'altitudeaccuracy',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_altitudeaccuracy',
                  'id' : 'awe0441ac',
                  'local' : false,
                  'remoteName' : 'spi:altitudeaccuracy',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'key1',
                  'index' : false,
                  'artifactId' : 'lbslocation_key1',
                  'maxSize' : 255,
                  'id' : 'awad42e064',
                  'local' : false,
                  'remoteName' : 'spi:key1',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'key2',
                  'index' : false,
                  'artifactId' : 'lbslocation_key2',
                  'maxSize' : 255,
                  'id' : 'aw344bb1de',
                  'local' : false,
                  'remoteName' : 'spi:key2',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'key3',
                  'index' : false,
                  'artifactId' : 'lbslocation_key3',
                  'maxSize' : 255,
                  'id' : 'aw434c8148',
                  'local' : false,
                  'remoteName' : 'spi:key3',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'longitude',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_longitude',
                  'id' : 'aw875b7731',
                  'local' : false,
                  'remoteName' : 'spi:longitude',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'refobject',
                  'index' : false,
                  'artifactId' : 'lbslocation_refobject',
                  'maxSize' : 30,
                  'id' : 'aw53e43ae8',
                  'local' : false,
                  'remoteName' : 'spi:refobject',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'speed',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_speed',
                  'id' : 'aw2e1314c7',
                  'local' : false,
                  'remoteName' : 'spi:speed',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'datetime',
                  'name' : 'lastupdate',
                  'index' : false,
                  'artifactId' : 'lbslocation_lastupdate',
                  'id' : 'awfbeaed0d',
                  'local' : false,
                  'remoteName' : 'spi:lastupdate',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'latitude',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_latitude',
                  'id' : 'aw969381e0',
                  'local' : false,
                  'remoteName' : 'spi:latitude',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'lbslocation_wonum',
                  'maxSize' : 10,
                  'id' : 'aweca2b0da',
                  'local' : false,
                  'remoteName' : 'spi:wonum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'lbslocation_siteid',
                  'maxSize' : 8,
                  'id' : 'awad08b58f',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'heading',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_heading',
                  'id' : 'aw84361220',
                  'local' : false,
                  'remoteName' : 'spi:heading',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'double',
                  'name' : 'locationaccuracy',
                  'index' : false,
                  'scale' : 10,
                  'artifactId' : 'lbslocation_locationaccuracy',
                  'id' : 'aw91161f6b',
                  'local' : false,
                  'remoteName' : 'spi:locationaccuracy',
               }).
               setCreationFactories([
                     {name:'createLbslocation', creationString:'\/oslc\/os\/oslclbslocation' }
               ]).
               setQueryBases([
                     {name:'getLbslocation', queryString:'\/oslc\/os\/oslclbslocation', queryLabel:'' }
               ]);
            var resourcePromise104 = PersistenceManager.initCollection( resource104 );


            var resource105 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'PlatformGeolocationLocalStore',
                  'resourceName' : 'PlatformGeolocationLocalStore',
                  'id' : 'awd5b5d51a',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSingleton( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_wonum_string',
                  'id' : 'awdbe10dd2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wositeid',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_wositeid_string',
                  'id' : 'aw28f7f0c4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'gpswatchid',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_gpswatchid_string',
                  'id' : 'awca7b645e',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'offlinecount',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_offlinecount_integer',
                  'id' : 'awbf02aa12',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'latitudey',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_LatitudeY_string',
                  'id' : 'awfd598fd9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'longitudex',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_LongitudeX_string',
                  'id' : 'awd56b4278',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'errorcode',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_errorcode_string',
                  'id' : 'awaea299c9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'watchid',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_watchID_string',
                  'id' : 'awc678254f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'timerid',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_timerID_string',
                  'id' : 'awa992dff6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'timestamp',
                  'index' : false,
                  'artifactId' : 'tempPlatformGeolocationLocalStore_timerstamp_string',
                  'id' : 'aw38b15ed8',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise105 = PersistenceManager.initCollection( resource105 );


            all([resourcePromise001, resourcePromise002, resourcePromise003, resourcePromise004, resourcePromise005, resourcePromise006, resourcePromise007, resourcePromise008, resourcePromise009, resourcePromise010, resourcePromise011, resourcePromise012, resourcePromise013, resourcePromise014, resourcePromise015, resourcePromise016, resourcePromise017, resourcePromise018, resourcePromise019, resourcePromise020, resourcePromise021, resourcePromise022, resourcePromise023, resourcePromise024, resourcePromise025, resourcePromise026, resourcePromise027, resourcePromise028, resourcePromise029, resourcePromise030, resourcePromise031, resourcePromise032, resourcePromise033, resourcePromise034, resourcePromise035, resourcePromise036, resourcePromise037, resourcePromise038, resourcePromise039, resourcePromise040, resourcePromise041, resourcePromise042, resourcePromise043, resourcePromise044, resourcePromise045, resourcePromise046, resourcePromise047, resourcePromise048, resourcePromise049, resourcePromise050, resourcePromise051, resourcePromise052, resourcePromise053, resourcePromise054, resourcePromise055, resourcePromise056, resourcePromise057, resourcePromise058, resourcePromise059, resourcePromise060, resourcePromise061, resourcePromise062, resourcePromise063, resourcePromise064, resourcePromise065, resourcePromise066, resourcePromise067, resourcePromise068, resourcePromise069, resourcePromise070, resourcePromise071, resourcePromise072, resourcePromise073, resourcePromise074, resourcePromise075, resourcePromise076, resourcePromise077, resourcePromise078, resourcePromise079, resourcePromise080, resourcePromise081, resourcePromise082, resourcePromise083, resourcePromise084, resourcePromise085, resourcePromise086, resourcePromise087, resourcePromise088, resourcePromise089, resourcePromise090, resourcePromise091, resourcePromise092, resourcePromise093, resourcePromise094, resourcePromise095, resourcePromise096, resourcePromise097, resourcePromise098, resourcePromise099, resourcePromise100, resourcePromise101, resourcePromise102, resourcePromise103, resourcePromise104, resourcePromise105]).then(function(results) {
                 promise.resolve();
            }).
            otherwise(function(error) {
                 promise.reject(error);
            });
         }
      });
});
