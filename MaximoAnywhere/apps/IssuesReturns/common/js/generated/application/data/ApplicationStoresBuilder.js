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
// Build: 2023-04-17 13:32:28
//----------------------------------------------------------------//
define(   "generated/application/data/ApplicationStoresBuilder", 
      [
         "dojo/_base/declare", 
         "dojo/promise/all", 
         "platform/boot/data/_StoresBuilderBase", 
         "platform/store/ResourceMetadata", 
         "platform/store/PersistenceManager"
      ],

function(declare, all, StoresBuilderBase, ResourceMetadata, PersistenceManager) {
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
                  'artifactId' : 'issuesReturnsResource',
                  'resourceName' : 'issuesReturns',
                  'id' : 'aw17cf6238',
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
                  'artifactId' : 'issuesReturns_siteid_string',
                  'id' : 'aw652fb9ee',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeroom',
                  'index' : false,
                  'artifactId' : 'issuesReturns_storeroom_string',
                  'id' : 'awb6dd0f33',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wotask',
                  'index' : false,
                  'artifactId' : 'issuesReturns_wotask_string',
                  'id' : 'awa38e0ca1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'issuesReturns_wonum_string',
                  'id' : 'aw8102154',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'issuesReturns_asset_string',
                  'id' : 'aw52bd5d6d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'issuesReturns_location_string',
                  'id' : 'aweebf5258',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'issuesReturns_domainid_string',
                  'id' : 'awbeb46598',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : false,
                  'artifactId' : 'issuesReturns_itemnum_string',
                  'id' : 'aw7b9169dc',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemdesc',
                  'index' : false,
                  'artifactId' : 'issuesReturns_itemdesc_string',
                  'id' : 'aw3466f9ff',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'bin',
                  'index' : false,
                  'artifactId' : 'issuesReturns_bin_string',
                  'id' : 'aw8514f698',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'wasValidated',
                  'formula' : 'false',
                  'index' : false,
                  'artifactId' : 'issuesReturns_isvalidstoreroom_boolean',
                  'id' : 'awa8c9db40',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : false,
                  'artifactId' : 'issuesReturns_partno_string',
                  'id' : 'awc73bf2d4',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'modelnumref',
                  'index' : false,
                  'artifactId' : 'issuesReturns_modelnumref_string',
                  'id' : 'awf4c6cdc9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : false,
                  'artifactId' : 'issuesReturns_formnumber_string',
                  'id' : 'aw475ef804',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise004 = PersistenceManager.initCollection( resource004 );


            var resource005 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'issueAdditionalItemsResource',
                  'resourceName' : 'issueAdditionalItems',
                  'id' : 'awa2a22a8f',
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
                  'artifactId' : 'issueAdditionalItems_wonum_string',
                  'id' : 'aw2dea870c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_asset_string',
                  'id' : 'aw7747fb35',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_location_string',
                  'id' : 'aw29252d18',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_domainid_string',
                  'id' : 'aw792e1ad8',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'integer',
                  'name' : 'taskid',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_taskid_integer',
                  'id' : 'awe6bba16c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'issueQty',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_issueQty_string',
                  'id' : 'awa14b73d2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueTo',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_issueTo_string',
                  'id' : 'aw936a9c07',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'actualdate',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_actualDate_datetime',
                  'id' : 'aw4590c18d',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'frombin',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_fromBin_string',
                  'id' : 'awbb1a4b35',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'fromlot',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_string_fromlot',
                  'id' : 'aw7dc7525c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'frombincurbal',
                  'index' : false,
                  'artifactId' : 'issueAdditionalItems_string_frombincurbal',
                  'id' : 'awff38db2a',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise005 = PersistenceManager.initCollection( resource005 );


            var resource006 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'issueAdditionalUsageResource',
                  'resourceName' : 'issueAdditionalUsage',
                  'id' : 'aw80a60491',
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
                  'artifactId' : 'issueAdditionalUsage_storeroom_string',
                  'id' : 'awf613bd75',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : false,
                  'artifactId' : 'issueAdditionalUsage_formNumber_string',
                  'id' : 'aw6bdf99e6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'issueAdditionalUsage_description_string',
                  'id' : 'aw80466b57',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : false,
                  'artifactId' : 'issueAdditionalUsage_documentref_string',
                  'id' : 'awe4e5259a',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'createdate',
                  'index' : false,
                  'artifactId' : 'issueAdditionalUsage_createdate_datetime',
                  'id' : 'awacd608bf',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise006 = PersistenceManager.initCollection( resource006 );


            var resource007 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'issueReservedHeaderResource',
                  'resourceName' : 'issueReservedHeader',
                  'id' : 'awe7ff096e',
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
                  'artifactId' : 'issueReservedHeader_storeroom_string',
                  'id' : 'aw87e53769',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'formnumber',
                  'index' : false,
                  'artifactId' : 'issueReservedHeader_formNumber_string',
                  'id' : 'aw7faf3323',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'issueReservedHeader_description_string',
                  'id' : 'aw6b5c2dc2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : false,
                  'artifactId' : 'issueReservedHeader_documentref_string',
                  'id' : 'awfff630f',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'createdate',
                  'index' : false,
                  'artifactId' : 'issueReservedHeader_createdate_datetime',
                  'id' : 'aw2c587532',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise007 = PersistenceManager.initCollection( resource007 );


            var resource008 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : true,
                  'pageSize' : 1000,
                  'artifactId' : 'issueReturnHeaderResource',
                  'resourceName' : 'issueReturnHeader',
                  'id' : 'awbe11abe4',
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
                  'artifactId' : 'issueReturnHeader_formNumber_string',
                  'id' : 'aw64cd9bb6',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'issueReturnHeader_description_string',
                  'id' : 'aweb2228a1',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'documentref',
                  'index' : false,
                  'artifactId' : 'issueReturnHeader_documentref_string',
                  'id' : 'aw8f81666c',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'createdate',
                  'index' : false,
                  'artifactId' : 'issueReturnHeader_createdate_datetime',
                  'id' : 'awf8633bd5',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise008 = PersistenceManager.initCollection( resource008 );


            var resource009 = new ResourceMetadata({
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
            var resourcePromise009 = PersistenceManager.initCollection( resource009 );


            var resource010 = new ResourceMetadata({
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
                  'name' : 'hasError',
                  'index' : false,
                  'artifactId' : 'errorResource_hasErrors_boolean',
                  'id' : 'aw50938105',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise010 = PersistenceManager.initCollection( resource010 );


            var resource011 = new ResourceMetadata({
                  'pageSize' : 200,
                  'resourceName' : 'matusetrans',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'matusetrans',
                  'id' : 'awb4a7b54f',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi:itemnum,spi:itemsetid,spi:conditioncode,dcterms:title,spi:storeloc,spi:location,spi:assetnum,spi:siteid,spi:requestnum,spi:refwo,spi:binnum,spi:lotnum,spi:issueto,spi:rotassetnum,spi:quantity,spi:qtyreturned,spi:memo,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:wonum,spi:gldebitacct,spi:glcreditacct,spi:unitcost,spi:issueid,spi:taskid,spi:enteredastask,spi:issuetype,dcterms:identifier,spi:item{spi:modelnumref},spi:invuse{spi:formnumber}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_item',
                  'id' : 'aw8d0285e4',
                  'local' : false,
                  'remoteName' : 'spi:itemnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'matusetrans_itemsetid_spi_itemsetid',
                  'id' : 'aw35da6893',
                  'local' : false,
                  'remoteName' : 'spi:itemsetid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'conditioncode',
                  'index' : false,
                  'artifactId' : 'matusetrans_conditioncode_spi_conditioncode',
                  'id' : 'aw1d17e5c3',
                  'local' : false,
                  'remoteName' : 'spi:conditioncode',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_itemdesc',
                  'id' : 'aw14693e4f',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_storeloc',
                  'id' : 'aweb23312e',
                  'local' : false,
                  'remoteName' : 'spi:storeloc',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_location',
                  'id' : 'aweb3c7918',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'assetnum',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_assetnum',
                  'id' : 'awa7a83cc',
                  'local' : false,
                  'remoteName' : 'spi:assetnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_site',
                  'id' : 'awfb5aa91e',
                  'key' : '2',
                  'local' : false,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'requestnum',
                  'index' : false,
                  'artifactId' : 'matusetrans_requestnum_spi_requestnum',
                  'id' : 'awa8f9767b',
                  'local' : false,
                  'remoteName' : 'spi:requestnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'refwo',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_wo',
                  'id' : 'awb378c1b7',
                  'local' : false,
                  'remoteName' : 'spi:refwo',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_binnum',
                  'id' : 'awa0a2d444',
                  'local' : false,
                  'remoteName' : 'spi:binnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_lotnum',
                  'id' : 'aw2a4cf76f',
                  'local' : false,
                  'remoteName' : 'spi:lotnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueto',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_issueto',
                  'id' : 'aw461a48db',
                  'local' : false,
                  'remoteName' : 'spi:issueto',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_rotassetnum',
                  'id' : 'aw393b9329',
                  'local' : false,
                  'remoteName' : 'spi:rotassetnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'quantity',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_quantity',
                  'id' : 'aw2a51e6e5',
                  'local' : false,
                  'remoteName' : 'spi:quantity',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'qtyreturned',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_qtyreturned',
                  'id' : 'aw1372a54f',
                  'local' : false,
                  'remoteName' : 'spi:qtyreturned',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'memo',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_memo',
                  'id' : 'aw395330d0',
                  'local' : false,
                  'remoteName' : 'spi:memo',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'mrnum',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_mrnum',
                  'id' : 'aw184e5828',
                  'local' : false,
                  'remoteName' : 'spi:mrnum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'mrlinenum',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_mrlinenum',
                  'id' : 'awd02a054c',
                  'local' : false,
                  'remoteName' : 'spi:mrlinenum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'ponum',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_ponum',
                  'id' : 'aw224d8459',
                  'local' : false,
                  'remoteName' : 'spi:ponum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'polinenum',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_polinenum',
                  'id' : 'aw6a1b8490',
                  'local' : false,
                  'remoteName' : 'spi:polinenum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_wonum',
                  'id' : 'aw906d5849',
                  'local' : false,
                  'remoteName' : 'spi:wonum',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'gldebitacct',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_gldebitacct',
                  'id' : 'awcaf2d74',
                  'local' : false,
                  'remoteName' : 'spi:gldebitacct',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'glcreditacct',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_glcreditacct',
                  'id' : 'aw2ba35912',
                  'local' : false,
                  'remoteName' : 'spi:glcreditacct',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'unitcost',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_unitcost',
                  'id' : 'awf572d48b',
                  'local' : false,
                  'remoteName' : 'spi:unitcost',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issueid',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_issueid',
                  'id' : 'aw2ea4fd4f',
                  'local' : false,
                  'remoteName' : 'spi:issueid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'taskid',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_taskid',
                  'id' : 'aw7e4ed653',
                  'local' : false,
                  'remoteName' : 'spi:taskid',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'enteredastask',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_enteredastask',
                  'id' : 'aw98c4d1e2',
                  'local' : false,
                  'remoteName' : 'spi:enteredastask',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'issuetype',
                  'index' : true,
                  'artifactId' : 'matusetrans_item_spi_issuetype',
                  'id' : 'aw515eb270',
                  'local' : false,
                  'remoteName' : 'spi:issuetype',
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'matusetransid',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_spi_matusetransid',
                  'id' : 'aw78ae07e3',
                  'key' : '1',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'rotating',
                  'formula' : '${rotassetnum} ? true : false',
                  'index' : false,
                  'artifactId' : 'matusetrans_rotating',
                  'id' : 'awfb11fce2',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'double',
                  'name' : 'localreturnqty',
                  'formula' : '(${quantity}*-1) - ${qtyreturned}',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_localreturnqty',
                  'id' : 'aw664747b0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'boolean',
                  'name' : 'returnindicator',
                  'index' : false,
                  'artifactId' : 'matusetrans_item_returnindicator',
                  'id' : 'awccb63371',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'actualdate',
                  'formula' : 'new Date()',
                  'index' : false,
                  'artifactId' : 'matusetrans_actualDate',
                  'id' : 'aw6d4b100',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'string',
                  'referenceResource' : 'matusetrans',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'matusetrans_spiitem_spimodelnumref',
                  'maxSize' : 128,
                  'id' : 'awa4802dd5',
                  'local' : false,
                  'remoteName' : 'spi:item',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:formnumber',
                  'dataType' : 'string',
                  'referenceResource' : 'matusetrans',
                  'name' : 'formnumber',
                  'index' : true,
                  'artifactId' : 'matusetrans_spiinvuse_spiformnumber',
                  'maxSize' : 30,
                  'id' : 'awae93a834',
                  'local' : false,
                  'remoteName' : 'spi:invuse',
               }).
               setQueryBases([
                     {name:'getAllMatUseTrans', queryString:'\/oslc\/os\/oslcmatusetrans?savedQuery=getWithComplexQuery', queryLabel:'' }
               ]);
            var resourcePromise011 = PersistenceManager.initCollection( resource011 );


            var resource012 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('spi:displaytaskid,spi:requestnum,spi:description,spi:reservedqty,spi:location,spi:assetnum,spi:glaccount,spi:storelocsiteid,spi:requesteddate,spi:requireddate,spi:item{spi:itemtype,spi:modelnumref,spi:rotating,oslc:shortTitle},spi:workorder{dcterms:title,oslc:shortTitle},spi:inventory{spi:lotnum,spi:itemsetid,spi:binnum,spi:issueunit,spi:avblbalance}').
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
                  'key' : '1',
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
                  'key' : '2',
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
                  'multiplicity' : 'exactly-one',
                  'displayValueRemoteName' : 'spi:itemtype',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'referenceResource' : 'invreserve',
                  'name' : 'itemtype',
                  'index' : false,
                  'artifactId' : 'invreserveResource_item_spi_itemtype',
                  'maxSize' : 15,
                  'id' : 'aw24ff4d5a',
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
                  'dataType' : 'double',
                  'name' : 'localreservedqty',
                  'formula' : '${reservedqty}',
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
                  'dataType' : 'string',
                  'name' : 'issueTo',
                  'index' : false,
                  'artifactId' : 'invreserveResource_issueto',
                  'id' : 'aw66b276de',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'actualdate',
                  'formula' : 'new Date()',
                  'index' : false,
                  'artifactId' : 'invreserveResource_actualDate',
                  'id' : 'aw1222f85a',
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
               setCreationFactories([
                     {name:'invreserveResourceCF', creationString:'\/oslc\/os\/oslcinvreserve' }
               ]).
               setQueryBases([
                     {name:'searchAllInvreserve', queryString:'\/oslc\/os\/oslcinvreserve?savedQuery=getWithComplexQuery', defaultForSearch: true, queryLabel:'' }
               ]);
            var resourcePromise012 = PersistenceManager.initCollection( resource012 );


            var resource013 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('dcterms:identifier,oslc:shortTitle,dcterms:title,spi:usetype,spi:status,spi:fromstoreloc,spi:changeby,spi:changedate,spi:orgid,spi:siteid,spi:statusdate,spi:statusdate,spi:np_statusmemo,spi:formnumber,spi:documentref,spi:createdate').
               setSupportiveFieldsSelectExpression('spi:invuseline{spi:invuselinenum,spi:description,spi:usetype,spi:itemsetid,spi:tostoreloc,spi:tositeid,spi:quantity,spi:orgid,spi:linetype,spi:tobin,spi:tolot,spi:fromstoreloc,spi:assetnum,spi:location,spi:gldebitacct,spi:glcreditacct,spi:actualdate,spi:rotassetnum,spi:fromlot,spi:frombin,spi:split,spi:toorgid,spi:receivedqty,spi:returnedqty,spi:issueto,spi:refwo,spi:wonum,spi:taskid,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:remark,spi:unitcost,spi:issueid,spi:enteredastask,spi:fromconditioncode,spi:requestnum,spi:returnagainstissue,spi:anywhererefid,spi:item{oslc:shortTitle}},spi:invuselinesplit{spi:quantity,spi:fromlot,spi:frombin,spi:rotassetnum,spi:itemnum,spi:itemsetid,spi:fromstoreloc,spi:newassetnum,spi:invuselinelinkid}').
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
                  'selectExpression' : 'spi:invuseline{spi:invuselinenum,spi:description,spi:usetype,spi:itemsetid,spi:tostoreloc,spi:tositeid,spi:quantity,spi:orgid,spi:linetype,spi:tobin,spi:tolot,spi:fromstoreloc,spi:assetnum,spi:location,spi:gldebitacct,spi:glcreditacct,spi:actualdate,spi:rotassetnum,spi:fromlot,spi:frombin,spi:split,spi:toorgid,spi:receivedqty,spi:returnedqty,spi:issueto,spi:refwo,spi:wonum,spi:taskid,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:remark,spi:unitcost,spi:issueid,spi:enteredastask,spi:fromconditioncode,spi:requestnum,spi:returnagainstissue,spi:anywhererefid,spi:item{oslc:shortTitle}}',
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
                  'artifactId' : 'nvuseResourceResource_errorMessage',
                  'id' : 'aw6c49b198',
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
            var resourcePromise013 = PersistenceManager.initCollection( resource013 );


            var resource014 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('spi:invuselinenum,spi:description,spi:usetype,spi:itemsetid,spi:tostoreloc,spi:tositeid,spi:quantity,spi:orgid,spi:linetype,spi:tobin,spi:tolot,spi:fromstoreloc,spi:assetnum,spi:location,spi:gldebitacct,spi:glcreditacct,spi:actualdate,spi:rotassetnum,spi:fromlot,spi:frombin,spi:split,spi:toorgid,spi:receivedqty,spi:returnedqty,spi:issueto,spi:refwo,spi:wonum,spi:taskid,spi:mrnum,spi:mrlinenum,spi:ponum,spi:polinenum,spi:remark,spi:unitcost,spi:issueid,spi:enteredastask,spi:fromconditioncode,spi:requestnum,spi:returnagainstissue,spi:anywhererefid,spi:item{oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'integer',
                  'name' : 'invuselinenum',
                  'index' : false,
                  'artifactId' : 'invuselineResource_invuselinenum_spi_invuselinenum',
                  'id' : 'aw5f58d908',
                  'key' : '1',
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
            var resourcePromise014 = PersistenceManager.initCollection( resource014 );


            var resource015 = new ResourceMetadata({
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
            var resourcePromise015 = PersistenceManager.initCollection( resource015 );


            var resource016 = new ResourceMetadata({
                  'pageSize' : 1000,
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
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:binnum,spi:physcnt,spi:curbal,spi:conditioncode,spi:itemnum,spi:description,spi:itemsetid,spi:issueunit,spi:location,spi:siteid,spi:lotnum,spi:adjustedphyscnt,spi:physcntdate,spi:rotating,spi:stagingbin,spi:adjustedphyscntdate,spi:modelnum').
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
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'invbalance_modelnum_spimodelnum',
                  'maxSize' : 128,
                  'id' : 'aw21dff9f5',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
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
            var resourcePromise016 = PersistenceManager.initCollection( resource016 );


            var resource017 = new ResourceMetadata({
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
            var resourcePromise017 = PersistenceManager.initCollection( resource017 );


            var resource018 = new ResourceMetadata({
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
            var resourcePromise018 = PersistenceManager.initCollection( resource018 );


            var resource019 = new ResourceMetadata({
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
                  'key' : '6',
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
                  'key' : '5',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_itemnum_string',
                  'id' : 'aw9547f331',
                  'persistent' : true,
                  'key' : '1',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_itemsetid_string',
                  'id' : 'awc9f0ba32',
                  'persistent' : true,
                  'key' : '2',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_storeloc_string',
                  'id' : 'awfae2023d',
                  'persistent' : true,
                  'key' : '3',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'originalDataSplitBinQty_siteid_string',
                  'id' : 'awbdd478ec',
                  'persistent' : true,
                  'key' : '4',
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
            var resourcePromise019 = PersistenceManager.initCollection( resource019 );


            var resource020 = new ResourceMetadata({
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
                  'key' : '6',
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
                  'key' : '5',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemnum',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_itemnum_string',
                  'id' : 'aw180f2143',
                  'persistent' : true,
                  'key' : '1',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_itemsetid_string',
                  'id' : 'awbc249ff6',
                  'persistent' : true,
                  'key' : '2',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_storeloc_string',
                  'id' : 'aw44645aff',
                  'persistent' : true,
                  'key' : '3',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'siteid',
                  'index' : true,
                  'artifactId' : 'calculatedDataSplitBinQty_siteid_string',
                  'id' : 'awfd0bfff3',
                  'persistent' : true,
                  'key' : '4',
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
            var resourcePromise020 = PersistenceManager.initCollection( resource020 );


            var resource021 = new ResourceMetadata({
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
            var resourcePromise021 = PersistenceManager.initCollection( resource021 );


            var resource022 = new ResourceMetadata({
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
                  'key' : '4',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'lotnum',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_lotnum_string',
                  'id' : 'awbd45733',
                  'persistent' : true,
                  'key' : '6',
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
                  'key' : '7',
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
                  'key' : '1',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_itemsetid_string',
                  'id' : 'aw82985ce9',
                  'persistent' : true,
                  'key' : '2',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'splitrotateresource_location_string',
                  'id' : 'aw5cd88622',
                  'persistent' : true,
                  'key' : '5',
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
                  'key' : '3',
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
            var resourcePromise022 = PersistenceManager.initCollection( resource022 );


            var resource023 = new ResourceMetadata({
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
                  'key' : '4',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'rotassetnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_rotassetnum_string',
                  'id' : 'aw861dbb65',
                  'persistent' : true,
                  'key' : '6',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'binnum',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_binnum_string',
                  'id' : 'awab3eddf4',
                  'persistent' : true,
                  'key' : '5',
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
                  'key' : '1',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'itemsetid',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_itemsetid_string',
                  'id' : 'aw21366385',
                  'persistent' : true,
                  'key' : '2',
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'storeloc',
                  'index' : false,
                  'artifactId' : 'splitqtyacrossbins_storeloc_string',
                  'id' : 'aw84ef867a',
                  'persistent' : true,
                  'key' : '3',
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
            var resourcePromise023 = PersistenceManager.initCollection( resource023 );


            var resource024 = new ResourceMetadata({
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
            var resourcePromise024 = PersistenceManager.initCollection( resource024 );


            var resource025 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:siteid,oslc:shortTitle,dcterms:title,spi:status,spi:glaccount,spi:locoper{spi:failureCode{dcterms:title,oslc:shortTitle}}').
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
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glaccount',
                  'index' : true,
                  'artifactId' : 'additionallocations_glaccount_spiglaccount',
                  'maxSize' : 54,
                  'id' : 'awa12b85da',
                  'local' : false,
                  'remoteName' : 'spi:glaccount',
               }).
               setQueryBases([
                     {name:'getlocation', queryString:'\/oslc\/os\/oslcoperloc', queryLabel:'' }
               ]).
               setWhereClause('spi%3Astatus+in+%5B%24%7BdomainAssetstatus%5Bmaxvalue%3DOPERATING%5D.value%7D%5D');
            var resourcePromise025 = PersistenceManager.initCollection( resource025 );


            var resource026 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('dcterms:identifier,spi:siteid,oslc:shortTitle,dcterms:title,spi:status,spi:type').
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
               setQueryBases([
                     {name:'getlocationstoreroom', queryString:'\/oslc\/os\/oslcopersroom', queryLabel:'' }
               ]).
               setWhereClause('spi%3Atype+in+%5B%24%7Badditionalloctype%5Bmaxvalue%3DSTOREROOM%5D.value%7D%5D');
            var resourcePromise026 = PersistenceManager.initCollection( resource026 );


            var resource027 = new ResourceMetadata({
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
            var resourcePromise027 = PersistenceManager.initCollection( resource027 );


            var resource028 = new ResourceMetadata({
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
            var resourcePromise028 = PersistenceManager.initCollection( resource028 );


            var resource029 = new ResourceMetadata({
                  'pageSize' : 20,
                  'resourceName' : 'workOrder',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'workOrder',
                  'id' : 'aw900e7dbf',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('oslc:shortTitle,dcterms:title,spi_wm:siteid,spi:status,spi_wm:glaccount,dcterms:identifier,spi:asset{oslc:shortTitle},spi:location{oslc:shortTitle},spi_wm:parentwonum{oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('spi_wm:task{spi_wm:taskid,dcterms:title,spi_wm:description_longdescription,spi_wm:glaccount,dcterms:identifier,spi:asset{oslc:shortTitle},spi:location{oslc:shortTitle}}').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'wonum',
                  'index' : false,
                  'artifactId' : 'workOrder_wonum_oslcshortTitle',
                  'maxSize' : 10,
                  'id' : 'awf24d5b27',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'oslc:shortTitle',
               }).
               addField({
                  'multiplicity' : 'zero-or-many',
                  'dataType' : 'inline',
                  'referenceResource' : 'taskResource',
                  'name' : 'tasklist',
                  'index' : false,
                  'artifactId' : 'workOrder_tasklist_spi_wmtask',
                  'id' : 'aw6091f170',
                  'describedByResource' : 'taskResource',
                  'local' : false,
                  'remoteName' : 'spi_wm:task',
                  'selectExpression' : 'spi_wm:task{spi_wm:taskid,dcterms:title,spi_wm:description_longdescription,spi_wm:glaccount,dcterms:identifier,spi:asset{oslc:shortTitle},spi:location{oslc:shortTitle}}',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : true,
                  'artifactId' : 'workOrder_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'awa40073b2',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'siteid',
                  'index' : false,
                  'artifactId' : 'workOrder_siteid_spi_wmsiteid',
                  'maxSize' : 8,
                  'id' : 'aw832890e6',
                  'local' : false,
                  'pkIndex' : 1,
                  'remoteName' : 'spi_wm:siteid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'referenceResource' : 'additionallocations',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'name' : 'location',
                  'index' : true,
                  'artifactId' : 'workOrder_location_spilocationoslcshortTitle',
                  'maxSize' : 30,
                  'id' : 'aw7138f85d',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'status',
                  'index' : true,
                  'artifactId' : 'workOrder_status_spistatus',
                  'maxSize' : 16,
                  'id' : 'awedad2b53',
                  'local' : false,
                  'remoteName' : 'spi:status',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'workOrder_glaccount',
                  'maxSize' : 54,
                  'id' : 'aw70daf5c8',
                  'local' : false,
                  'remoteName' : 'spi_wm:glaccount',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'workOrder',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'workOrder_asset',
                  'maxSize' : 15,
                  'id' : 'aw7f85fcdd',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'workOrder',
                  'name' : 'parent',
                  'index' : false,
                  'artifactId' : 'workOrder_parent',
                  'maxSize' : 10,
                  'id' : 'awa74cf95f',
                  'local' : false,
                  'remoteName' : 'spi_wm:parentwonum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'identifier',
                  'index' : false,
                  'artifactId' : 'workOrder_identifier_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awb2f0cf08',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getworkorders', queryString:'\/oslc\/os\/oslcwodetail', queryLabel:'' }
               ]);
            var resourcePromise029 = PersistenceManager.initCollection( resource029 );


            var resource030 = new ResourceMetadata({
                  'pageSize' : 1000,
                  'resourceName' : 'taskResource',
                  'isAttachment' : false,
                  'isSystem' : false,
                  'inMemory' : false,
                  'artifactId' : 'taskResource',
                  'id' : 'aw2e4e5dd7',
                  'additionalData' : false,
                  'adapterName' : 'OSLCGenericAdapter',
                  'maxFetchDataLimit' : 0,
               }).
               setLocal( false ).
               setSimpleFieldsSelectExpression('spi_wm:taskid,dcterms:title,spi_wm:description_longdescription,spi_wm:glaccount,dcterms:identifier,spi:asset{oslc:shortTitle},spi:location{oslc:shortTitle}').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'integer',
                  'name' : 'taskid',
                  'index' : false,
                  'artifactId' : 'taskResource_taskid_spi_wmtaskid',
                  'id' : 'aw88e7e9a9',
                  'local' : false,
                  'remoteName' : 'spi_wm:taskid',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'taskdescription',
                  'index' : false,
                  'artifactId' : 'taskResource_taskdescription_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw47fcc3fb',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'longaln',
                  'name' : 'tasklongdesc',
                  'index' : false,
                  'artifactId' : 'taskResource_tasklongdesc_spi_wmdescription_longdescription',
                  'maxSize' : 32000,
                  'id' : 'aw379c057c',
                  'local' : false,
                  'remoteName' : 'spi_wm:description_longdescription',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'gl',
                  'name' : 'glaccount',
                  'index' : false,
                  'artifactId' : 'taskResource_glaccount',
                  'maxSize' : 54,
                  'id' : 'aw69ccc5ff',
                  'local' : false,
                  'remoteName' : 'spi_wm:glaccount',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'taskResource',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'taskResource_location',
                  'maxSize' : 30,
                  'id' : 'awe7896c2e',
                  'local' : false,
                  'remoteName' : 'spi:location',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'oslc:shortTitle',
                  'dataType' : 'reference',
                  'usage' : 'upper',
                  'referenceResource' : 'taskResource',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'taskResource_asset',
                  'maxSize' : 15,
                  'id' : 'awe37d5c9',
                  'local' : false,
                  'remoteName' : 'spi:asset',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'bigint',
                  'name' : 'identifier',
                  'index' : false,
                  'artifactId' : 'taskResource_identifier',
                  'maxSize' : 19,
                  'id' : 'aw84472b23',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               });
            var resourcePromise030 = PersistenceManager.initCollection( resource030 );


            var resource031 = new ResourceMetadata({
                  'pageSize' : 50,
                  'resourceName' : 'domainwostatus',
                  'isAttachment' : false,
                  'isSystem' : true,
                  'urlBase' : 'http:\/\/116.118.113.24:9082\/maximo',
                  'inMemory' : false,
                  'artifactId' : 'domainwostatus',
                  'id' : 'awe2144736',
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
                  'artifactId' : 'domainwostatus_orgid_spiorgid',
                  'maxSize' : 8,
                  'id' : 'aw9dce90ad',
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
                  'artifactId' : 'domainwostatus_siteid_spisiteid',
                  'maxSize' : 8,
                  'id' : 'aw21945a73',
                  'local' : false,
                  'pkIndex' : 4,
                  'remoteName' : 'spi:siteid',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'maxvalue',
                  'index' : false,
                  'artifactId' : 'domainwostatus_maxvalue_spimaxvalue',
                  'maxSize' : 50,
                  'id' : 'aw5a3a28bc',
                  'local' : false,
                  'pkIndex' : 2,
                  'remoteName' : 'spi:maxvalue',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'string',
                  'name' : 'value',
                  'index' : false,
                  'artifactId' : 'domainwostatus_value_spivalue',
                  'maxSize' : 50,
                  'id' : 'awd4228f01',
                  'local' : false,
                  'pkIndex' : 3,
                  'remoteName' : 'spi:value',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'domainwostatus_description_dctermstitle',
                  'maxSize' : 256,
                  'id' : 'aw230a1408',
                  'local' : false,
                  'remoteName' : 'dcterms:title',
               }).
               addField({
                  'multiplicity' : 'exactly-one',
                  'dataType' : 'boolean',
                  'name' : 'defaults',
                  'index' : false,
                  'artifactId' : 'domainwostatus_defaults_spidefaults',
                  'id' : 'awc2f0dafc',
                  'local' : false,
                  'remoteName' : 'spi:defaults',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'usage' : 'upper',
                  'name' : 'domainid',
                  'index' : false,
                  'artifactId' : 'domainwostatus_domainid_oslcshortTitle',
                  'maxSize' : 18,
                  'id' : 'aw60a698f6',
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
                  'artifactId' : 'domainwostatus_synonymdomainid_dctermsidentifier',
                  'maxSize' : 19,
                  'id' : 'awb1013430',
                  'local' : false,
                  'remoteName' : 'dcterms:identifier',
               }).
               setQueryBases([
                     {name:'getwostatus', queryString:'\/oslc\/os\/oslcsynonymdomain', queryLabel:'' }
               ]).
               setWhereClause('oslc%3AshortTitle%3D%22WOSTATUS%22');
            var resourcePromise031 = PersistenceManager.initCollection( resource031 );


            var resource032 = new ResourceMetadata({
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
            var resourcePromise032 = PersistenceManager.initCollection( resource032 );


            var resource033 = new ResourceMetadata({
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
            var resourcePromise033 = PersistenceManager.initCollection( resource033 );


            var resource034 = new ResourceMetadata({
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
            var resourcePromise034 = PersistenceManager.initCollection( resource034 );


            var resource035 = new ResourceMetadata({
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
            var resourcePromise035 = PersistenceManager.initCollection( resource035 );


            var resource036 = new ResourceMetadata({
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
            var resourcePromise036 = PersistenceManager.initCollection( resource036 );


            var resource037 = new ResourceMetadata({
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
            var resourcePromise037 = PersistenceManager.initCollection( resource037 );


            var resource038 = new ResourceMetadata({
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
            var resourcePromise038 = PersistenceManager.initCollection( resource038 );


            var resource039 = new ResourceMetadata({
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
            var resourcePromise039 = PersistenceManager.initCollection( resource039 );


            var resource040 = new ResourceMetadata({
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
            var resourcePromise040 = PersistenceManager.initCollection( resource040 );


            var resource041 = new ResourceMetadata({
                  'refreshOnLogin' : 'true',
                  'pageSize' : 200,
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
               setWhereClause('spi%3Avarname+in+%5B%22NEGATIVEAVAIL%22%5D');
            var resourcePromise041 = PersistenceManager.initCollection( resource041 );


            var resource042 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('spi:itemnum,spi:binnum,dcterms:identifier,spi:itemsetid,spi:location,spi:siteid,spi:status,spi:storeloc,spi:invitem{spi:itemtype,spi:rotating,dcterms:title},spi:invbalances{spi:curbal}').
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
                  'index' : false,
                  'artifactId' : 'additionalInventory_storeloc_spistoreloc',
                  'maxSize' : 30,
                  'id' : 'aw5af96676',
                  'local' : false,
                  'remoteName' : 'spi:storeloc',
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
            var resourcePromise042 = PersistenceManager.initCollection( resource042 );


            var resource043 = new ResourceMetadata({
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
               setSimpleFieldsSelectExpression('spi:itemnum,spi:binnum,spi:lotnum,dcterms:identifier,spi:itemsetid,spi:location,spi:siteid,spi:status,spi:storeloc,spi:avblbalance,spi:issueunit,spi:curbaltotal,spi:modelnum,spi:invitem{spi:itemtype,spi:modelnumref,spi:rotating,dcterms:title},spi:invbalances{spi:curbal}').
               setSupportiveFieldsSelectExpression('').
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
                  'index' : false,
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
                  'dataType' : 'double',
                  'name' : 'fake',
                  'index' : false,
                  'artifactId' : 'fakeField',
                  'maxSize' : 15,
                  'id' : 'aw58af5712',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'dataType' : 'string',
                  'name' : 'modelnum',
                  'index' : true,
                  'artifactId' : 'inventory_modelnum_spimodelnum',
                  'maxSize' : 128,
                  'id' : 'aw9c3b0e7e',
                  'local' : false,
                  'remoteName' : 'spi:modelnum',
               }).
               addField({
                  'multiplicity' : 'zero-or-one',
                  'displayValueRemoteName' : 'spi:modelnumref',
                  'dataType' : 'inline',
                  'referenceResource' : 'inventory',
                  'name' : 'modelnumref',
                  'index' : true,
                  'artifactId' : 'inventory_modelnumref_spiinvitemspimodelnumref',
                  'maxSize' : 128,
                  'id' : 'aw4ce5521b',
                  'local' : false,
                  'remoteName' : 'spi:invitem',
               }).
               setQueryBases([
                     {name:'getinventory', queryString:'\/oslc\/os\/oslcinventory', queryLabel:'' }
               ]);
            var resourcePromise043 = PersistenceManager.initCollection( resource043 );


            var resource044 = new ResourceMetadata({
                  'isSystem' : false,
                  'inMemory' : false,
                  'pageSize' : 1000,
                  'artifactId' : 'searchWorkOrder',
                  'resourceName' : 'searchWorkOrder',
                  'id' : 'aw2c6811c9',
                  'additionalData' : false,
                  'maxFetchDataLimit' : 0,
                  'isAttachment' : false,
               }).
               setLocal( true ).
               setSimpleFieldsSelectExpression('').
               setSupportiveFieldsSelectExpression('').
               addField({
                  'dataType' : 'string',
                  'name' : 'wonum',
                  'index' : true,
                  'artifactId' : 'searchWorkOrder_wonum_string',
                  'id' : 'awc4dca8c0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'description',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_description_string',
                  'id' : 'aw9d25a996',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'statusdesc',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_statusdesc_string',
                  'id' : 'aw8422b2e0',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'asset',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_asset_string',
                  'id' : 'aw9e71d4f9',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'location',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_location_string',
                  'id' : 'aw6c36ef21',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'string',
                  'name' : 'priority',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_priority_string',
                  'id' : 'awdfd90e58',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'startdate',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_startdate_date',
                  'id' : 'aw27ab3eaa',
                  'persistent' : true,
                  'local' : true,
               }).
               addField({
                  'dataType' : 'date',
                  'name' : 'enddate',
                  'index' : false,
                  'artifactId' : 'searchWorkOrder_enddate_date',
                  'id' : 'aw9521872e',
                  'persistent' : true,
                  'local' : true,
               });
            var resourcePromise044 = PersistenceManager.initCollection( resource044 );


            var resource045 = new ResourceMetadata({
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
            var resourcePromise045 = PersistenceManager.initCollection( resource045 );


            var resource046 = new ResourceMetadata({
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
            var resourcePromise046 = PersistenceManager.initCollection( resource046 );


            var resource047 = new ResourceMetadata({
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
            var resourcePromise047 = PersistenceManager.initCollection( resource047 );


            var resource048 = new ResourceMetadata({
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
            var resourcePromise048 = PersistenceManager.initCollection( resource048 );


            var resource049 = new ResourceMetadata({
                  'pageSize' : 200,
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
            var resourcePromise049 = PersistenceManager.initCollection( resource049 );


            var resource050 = new ResourceMetadata({
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
            var resourcePromise050 = PersistenceManager.initCollection( resource050 );


            var resource051 = new ResourceMetadata({
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
            var resourcePromise051 = PersistenceManager.initCollection( resource051 );


            var resource052 = new ResourceMetadata({
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
            var resourcePromise052 = PersistenceManager.initCollection( resource052 );


            var resource053 = new ResourceMetadata({
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
            var resourcePromise053 = PersistenceManager.initCollection( resource053 );


            var resource054 = new ResourceMetadata({
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
            var resourcePromise054 = PersistenceManager.initCollection( resource054 );


            var resource055 = new ResourceMetadata({
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
            var resourcePromise055 = PersistenceManager.initCollection( resource055 );


            var resource056 = new ResourceMetadata({
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
            var resourcePromise056 = PersistenceManager.initCollection( resource056 );


            var resource057 = new ResourceMetadata({
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
            var resourcePromise057 = PersistenceManager.initCollection( resource057 );


            var resource058 = new ResourceMetadata({
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
            var resourcePromise058 = PersistenceManager.initCollection( resource058 );


            var resource059 = new ResourceMetadata({
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
            var resourcePromise059 = PersistenceManager.initCollection( resource059 );


            var resource060 = new ResourceMetadata({
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
            var resourcePromise060 = PersistenceManager.initCollection( resource060 );


            var resource061 = new ResourceMetadata({
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
            var resourcePromise061 = PersistenceManager.initCollection( resource061 );


            var resource062 = new ResourceMetadata({
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
            var resourcePromise062 = PersistenceManager.initCollection( resource062 );


            var resource063 = new ResourceMetadata({
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
            var resourcePromise063 = PersistenceManager.initCollection( resource063 );


            var resource064 = new ResourceMetadata({
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
            var resourcePromise064 = PersistenceManager.initCollection( resource064 );


            var resource065 = new ResourceMetadata({
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
            var resourcePromise065 = PersistenceManager.initCollection( resource065 );


            var resource066 = new ResourceMetadata({
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
            var resourcePromise066 = PersistenceManager.initCollection( resource066 );


            var resource067 = new ResourceMetadata({
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
            var resourcePromise067 = PersistenceManager.initCollection( resource067 );


            var resource068 = new ResourceMetadata({
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
            var resourcePromise068 = PersistenceManager.initCollection( resource068 );


            var resource069 = new ResourceMetadata({
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
            var resourcePromise069 = PersistenceManager.initCollection( resource069 );


            var resource070 = new ResourceMetadata({
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
            var resourcePromise070 = PersistenceManager.initCollection( resource070 );


            var resource071 = new ResourceMetadata({
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
            var resourcePromise071 = PersistenceManager.initCollection( resource071 );


            var resource072 = new ResourceMetadata({
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
            var resourcePromise072 = PersistenceManager.initCollection( resource072 );


            var resource073 = new ResourceMetadata({
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
            var resourcePromise073 = PersistenceManager.initCollection( resource073 );


            var resource074 = new ResourceMetadata({
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
            var resourcePromise074 = PersistenceManager.initCollection( resource074 );


            all([resourcePromise001, resourcePromise002, resourcePromise003, resourcePromise004, resourcePromise005, resourcePromise006, resourcePromise007, resourcePromise008, resourcePromise009, resourcePromise010, resourcePromise011, resourcePromise012, resourcePromise013, resourcePromise014, resourcePromise015, resourcePromise016, resourcePromise017, resourcePromise018, resourcePromise019, resourcePromise020, resourcePromise021, resourcePromise022, resourcePromise023, resourcePromise024, resourcePromise025, resourcePromise026, resourcePromise027, resourcePromise028, resourcePromise029, resourcePromise030, resourcePromise031, resourcePromise032, resourcePromise033, resourcePromise034, resourcePromise035, resourcePromise036, resourcePromise037, resourcePromise038, resourcePromise039, resourcePromise040, resourcePromise041, resourcePromise042, resourcePromise043, resourcePromise044, resourcePromise045, resourcePromise046, resourcePromise047, resourcePromise048, resourcePromise049, resourcePromise050, resourcePromise051, resourcePromise052, resourcePromise053, resourcePromise054, resourcePromise055, resourcePromise056, resourcePromise057, resourcePromise058, resourcePromise059, resourcePromise060, resourcePromise061, resourcePromise062, resourcePromise063, resourcePromise064, resourcePromise065, resourcePromise066, resourcePromise067, resourcePromise068, resourcePromise069, resourcePromise070, resourcePromise071, resourcePromise072, resourcePromise073, resourcePromise074]).then(function(results) {
                 promise.resolve();
            }).
            otherwise(function(error) {
                 promise.reject(error);
            });
         }
      });
});
