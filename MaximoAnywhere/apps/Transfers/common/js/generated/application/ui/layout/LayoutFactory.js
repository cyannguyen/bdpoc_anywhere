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
// Build: 2023-04-25 12:01:07
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/LayoutFactory", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/LayoutUtil", 
         "platform/ui/DeviceEnv", 
         "generated/application/ui/layout/small/Button1Item1", 
         "generated/application/ui/layout/small/Button2", 
         "generated/application/ui/layout/small/CenteredBottom2Buttons", 
         "generated/application/ui/layout/small/ConnectionManagementLayout", 
         "generated/application/ui/layout/small/DirectionsListItem", 
         "generated/application/ui/layout/small/Item1Button1", 
         "generated/application/ui/layout/small/Item1Button2list", 
         "generated/application/ui/layout/small/Item1Count1Button1", 
         "generated/application/ui/layout/small/Item1Count1Button2", 
         "generated/application/ui/layout/small/Item1Desc1", 
         "generated/application/ui/layout/small/Item2", 
         "generated/application/ui/layout/small/Item2Desc2", 
         "generated/application/ui/layout/small/Item2SideBySide", 
         "generated/application/ui/layout/small/landscape/MapDetail", 
         "generated/application/ui/layout/small/landscape/MapView", 
         "generated/application/ui/layout/small/ListHeader", 
         "generated/application/ui/layout/small/ListHeaderWithSearch", 
         "generated/application/ui/layout/small/ListItem3Input1", 
         "generated/application/ui/layout/small/ListItem5Button1", 
         "generated/application/ui/layout/small/ListItem6Button1", 
         "generated/application/ui/layout/small/MapEndPoint", 
         "generated/application/ui/layout/small/NotificationList", 
         "generated/application/ui/layout/small/portrait/MapDetail", 
         "generated/application/ui/layout/small/portrait/MapView", 
         "generated/application/ui/layout/small/ScanHeader", 
         "generated/application/ui/layout/small/WorkListItem", 
         "generated/application/ui/layout/small/ActualLaborListItem", 
         "generated/application/ui/layout/small/ActualMaterialListItem", 
         "generated/application/ui/layout/small/ActualToolListItem", 
         "generated/application/ui/layout/small/AttachmentsListItem", 
         "generated/application/ui/layout/small/BinLotLookupItem", 
         "generated/application/ui/layout/small/CopyPlansListItem", 
         "generated/application/ui/layout/small/CrewLaborList", 
         "generated/application/ui/layout/small/CrewToolList", 
         "generated/application/ui/layout/small/FailureReportList", 
         "generated/application/ui/layout/small/InvbalanceListItem", 
         "generated/application/ui/layout/small/InvreserveListItem", 
         "generated/application/ui/layout/small/IssuedItemList", 
         "generated/application/ui/layout/small/ItemLookup", 
         "generated/application/ui/layout/small/LaborAssignmentListItem", 
         "generated/application/ui/layout/small/LaborCraftRateLookupItem", 
         "generated/application/ui/layout/small/MaterialToolList", 
         "generated/application/ui/layout/small/MeterList", 
         "generated/application/ui/layout/small/MultiAssetListItem", 
         "generated/application/ui/layout/small/PlannedMaterialListItem", 
         "generated/application/ui/layout/small/PlannedToolListItem", 
         "generated/application/ui/layout/small/POListItem", 
         "generated/application/ui/layout/small/Progress", 
         "generated/application/ui/layout/small/Qtlayout", 
         "generated/application/ui/layout/small/ReceivedListItem", 
         "generated/application/ui/layout/small/ReturnExternalItemList", 
         "generated/application/ui/layout/small/ServiceAddressLookup", 
         "generated/application/ui/layout/small/ShipmentLookupListItem", 
         "generated/application/ui/layout/small/ShippedListItem", 
         "generated/application/ui/layout/small/SplitQtyRotateList", 
         "generated/application/ui/layout/small/TransferItemList", 
         "generated/application/ui/layout/small/UnreservedDetailItem", 
         "generated/application/ui/layout/small/VoidShippedItemList", 
         "generated/application/ui/layout/small/WorkLogListItem"
      ],

function(declare, LayoutUtil, DeviceEnv, small_Button1Item1, small_Button2, small_CenteredBottom2Buttons, small_ConnectionManagementLayout, small_DirectionsListItem, small_Item1Button1, small_Item1Button2list, small_Item1Count1Button1, small_Item1Count1Button2, small_Item1Desc1, small_Item2, small_Item2Desc2, small_Item2SideBySide, small_landscape_MapDetail, small_landscape_MapView, small_ListHeader, small_ListHeaderWithSearch, small_ListItem3Input1, small_ListItem5Button1, small_ListItem6Button1, small_MapEndPoint, small_NotificationList, small_portrait_MapDetail, small_portrait_MapView, small_ScanHeader, small_WorkListItem, small_ActualLaborListItem, small_ActualMaterialListItem, small_ActualToolListItem, small_AttachmentsListItem, small_BinLotLookupItem, small_CopyPlansListItem, small_CrewLaborList, small_CrewToolList, small_FailureReportList, small_InvbalanceListItem, small_InvreserveListItem, small_IssuedItemList, small_ItemLookup, small_LaborAssignmentListItem, small_LaborCraftRateLookupItem, small_MaterialToolList, small_MeterList, small_MultiAssetListItem, small_PlannedMaterialListItem, small_PlannedToolListItem, small_POListItem, small_Progress, small_Qtlayout, small_ReceivedListItem, small_ReturnExternalItemList, small_ServiceAddressLookup, small_ShipmentLookupListItem, small_ShippedListItem, small_SplitQtyRotateList, small_TransferItemList, small_UnreservedDetailItem, small_VoidShippedItemList, small_WorkLogListItem) {
      return declare("generated.application.ui.layout.LayoutFactory", [ ], {


         //
         // AUTO-GENERATED FILE CREATED ON: 2023-04-25 12:01:07
         //

         constructor : function(widget) {

            // TODO: get the screen width, height, size, orientation
            var node = widget?widget.domNode:null;
            this.layoutSize = DeviceEnv.getLayoutSize(node);
            var layoutUtil = new LayoutUtil(widget && widget.application?widget.application:null);
            this.screenOrientation = layoutUtil.getOrientation();

            this.layoutMap = {};
            // 
            // SMALL.PORTRAIT
            // 
            this.layoutMap['small.portrait'] = {};
            this.layoutMap['small.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['small.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['small.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['small.portrait']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['small.portrait']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['small.portrait']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['small.portrait']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['small.portrait']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['small.portrait']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['small.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['small.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['small.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['small.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['small.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['small.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['small.portrait']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['small.portrait']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['small.portrait']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['small.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['small.portrait']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['small.portrait']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['small.portrait']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['small.portrait']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['small.portrait']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['small.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['small.portrait']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['small.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['small.portrait']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['small.portrait']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['small.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['small.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['small.portrait']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['small.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['small.portrait']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['small.portrait']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['small.portrait']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['small.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['small.portrait']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['small.portrait']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['small.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['small.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['small.portrait']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['small.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['small.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['small.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['small.portrait']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['small.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['small.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['small.portrait']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['small.portrait']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['small.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['small.portrait']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['small.portrait']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['small.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['small.portrait']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['small.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['small.portrait']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            // 
            // SMALL.LANDSCAPE
            // 
            this.layoutMap['small.landscape'] = {};
            this.layoutMap['small.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['small.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['small.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['small.landscape']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['small.landscape']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['small.landscape']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['small.landscape']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['small.landscape']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['small.landscape']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['small.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['small.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['small.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['small.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['small.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['small.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['small.landscape']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['small.landscape']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['small.landscape']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['small.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['small.landscape']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['small.landscape']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['small.landscape']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['small.landscape']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['small.landscape']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['small.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['small.landscape']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['small.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['small.landscape']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['small.landscape']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['small.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['small.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['small.landscape']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['small.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['small.landscape']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['small.landscape']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['small.landscape']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['small.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['small.landscape']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['small.landscape']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['small.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['small.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['small.landscape']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['small.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['small.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['small.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['small.landscape']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['small.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['small.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['small.landscape']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['small.landscape']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['small.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['small.landscape']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['small.landscape']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['small.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['small.landscape']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['small.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['small.landscape']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            if (this.layoutSize == 'small') {
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.BinLotLookupItem');
               dojo.require('generated.application.ui.layout.small.InvreserveListItem');
               dojo.require('generated.application.ui.layout.small.MultiAssetListItem');
               dojo.require('generated.application.ui.layout.small.FailureReportList');
               dojo.require('generated.application.ui.layout.small.ServiceAddressLookup');
               dojo.require('generated.application.ui.layout.small.IssuedItemList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.CrewToolList');
               dojo.require('generated.application.ui.layout.small.MeterList');
               dojo.require('generated.application.ui.layout.small.ShippedListItem');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.CopyPlansListItem');
               dojo.require('generated.application.ui.layout.small.ActualLaborListItem');
               dojo.require('generated.application.ui.layout.small.LaborAssignmentListItem');
               dojo.require('generated.application.ui.layout.small.ShipmentLookupListItem');
               dojo.require('generated.application.ui.layout.small.TransferItemList');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CrewLaborList');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ReceivedListItem');
               dojo.require('generated.application.ui.layout.small.MaterialToolList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.LaborCraftRateLookupItem');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.PlannedMaterialListItem');
               dojo.require('generated.application.ui.layout.small.Qtlayout');
               dojo.require('generated.application.ui.layout.small.AttachmentsListItem');
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.PlannedToolListItem');
               dojo.require('generated.application.ui.layout.small.VoidShippedItemList');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.SplitQtyRotateList');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.WorkLogListItem');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.ReturnExternalItemList');
               dojo.require('generated.application.ui.layout.small.UnreservedDetailItem');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.POListItem');
               dojo.require('generated.application.ui.layout.small.ActualToolListItem');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.InvbalanceListItem');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.ActualMaterialListItem');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }

            // 
            // MEDIUM.PORTRAIT
            // 
            this.layoutMap['medium.portrait'] = {};
            this.layoutMap['medium.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['medium.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['medium.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['medium.portrait']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['medium.portrait']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['medium.portrait']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['medium.portrait']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['medium.portrait']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['medium.portrait']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['medium.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['medium.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['medium.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['medium.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['medium.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['medium.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['medium.portrait']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['medium.portrait']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['medium.portrait']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['medium.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['medium.portrait']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['medium.portrait']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['medium.portrait']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['medium.portrait']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['medium.portrait']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['medium.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['medium.portrait']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['medium.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['medium.portrait']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['medium.portrait']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['medium.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['medium.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['medium.portrait']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['medium.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['medium.portrait']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['medium.portrait']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['medium.portrait']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['medium.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['medium.portrait']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['medium.portrait']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['medium.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['medium.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['medium.portrait']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['medium.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['medium.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['medium.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['medium.portrait']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['medium.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['medium.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['medium.portrait']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['medium.portrait']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['medium.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['medium.portrait']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['medium.portrait']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['medium.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['medium.portrait']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['medium.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['medium.portrait']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            // 
            // MEDIUM.LANDSCAPE
            // 
            this.layoutMap['medium.landscape'] = {};
            this.layoutMap['medium.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['medium.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['medium.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['medium.landscape']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['medium.landscape']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['medium.landscape']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['medium.landscape']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['medium.landscape']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['medium.landscape']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['medium.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['medium.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['medium.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['medium.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['medium.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['medium.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['medium.landscape']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['medium.landscape']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['medium.landscape']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['medium.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['medium.landscape']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['medium.landscape']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['medium.landscape']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['medium.landscape']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['medium.landscape']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['medium.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['medium.landscape']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['medium.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['medium.landscape']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['medium.landscape']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['medium.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['medium.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['medium.landscape']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['medium.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['medium.landscape']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['medium.landscape']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['medium.landscape']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['medium.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['medium.landscape']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['medium.landscape']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['medium.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['medium.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['medium.landscape']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['medium.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['medium.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['medium.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['medium.landscape']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['medium.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['medium.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['medium.landscape']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['medium.landscape']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['medium.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['medium.landscape']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['medium.landscape']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['medium.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['medium.landscape']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['medium.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['medium.landscape']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            if (this.layoutSize == 'medium') {
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.BinLotLookupItem');
               dojo.require('generated.application.ui.layout.small.InvreserveListItem');
               dojo.require('generated.application.ui.layout.small.MultiAssetListItem');
               dojo.require('generated.application.ui.layout.small.FailureReportList');
               dojo.require('generated.application.ui.layout.small.ServiceAddressLookup');
               dojo.require('generated.application.ui.layout.small.IssuedItemList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.CrewToolList');
               dojo.require('generated.application.ui.layout.small.MeterList');
               dojo.require('generated.application.ui.layout.small.ShippedListItem');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.CopyPlansListItem');
               dojo.require('generated.application.ui.layout.small.ActualLaborListItem');
               dojo.require('generated.application.ui.layout.small.LaborAssignmentListItem');
               dojo.require('generated.application.ui.layout.small.ShipmentLookupListItem');
               dojo.require('generated.application.ui.layout.small.TransferItemList');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CrewLaborList');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ReceivedListItem');
               dojo.require('generated.application.ui.layout.small.MaterialToolList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.LaborCraftRateLookupItem');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.PlannedMaterialListItem');
               dojo.require('generated.application.ui.layout.small.Qtlayout');
               dojo.require('generated.application.ui.layout.small.AttachmentsListItem');
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.PlannedToolListItem');
               dojo.require('generated.application.ui.layout.small.VoidShippedItemList');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.SplitQtyRotateList');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.WorkLogListItem');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.ReturnExternalItemList');
               dojo.require('generated.application.ui.layout.small.UnreservedDetailItem');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.POListItem');
               dojo.require('generated.application.ui.layout.small.ActualToolListItem');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.InvbalanceListItem');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.ActualMaterialListItem');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }

            // 
            // LARGE.PORTRAIT
            // 
            this.layoutMap['large.portrait'] = {};
            this.layoutMap['large.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['large.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['large.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['large.portrait']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['large.portrait']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['large.portrait']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['large.portrait']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['large.portrait']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['large.portrait']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['large.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['large.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['large.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['large.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['large.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['large.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['large.portrait']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['large.portrait']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['large.portrait']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['large.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['large.portrait']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['large.portrait']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['large.portrait']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['large.portrait']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['large.portrait']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['large.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['large.portrait']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['large.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['large.portrait']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['large.portrait']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['large.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['large.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['large.portrait']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['large.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['large.portrait']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['large.portrait']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['large.portrait']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['large.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['large.portrait']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['large.portrait']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['large.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['large.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['large.portrait']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['large.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['large.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['large.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['large.portrait']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['large.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['large.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['large.portrait']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['large.portrait']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['large.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['large.portrait']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['large.portrait']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['large.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['large.portrait']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['large.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['large.portrait']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            // 
            // LARGE.LANDSCAPE
            // 
            this.layoutMap['large.landscape'] = {};
            this.layoutMap['large.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['large.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['large.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['large.landscape']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['large.landscape']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['large.landscape']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['large.landscape']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['large.landscape']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['large.landscape']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['large.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['large.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['large.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['large.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['large.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['large.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['large.landscape']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['large.landscape']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['large.landscape']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['large.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['large.landscape']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['large.landscape']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['large.landscape']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['large.landscape']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['large.landscape']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['large.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['large.landscape']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['large.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['large.landscape']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['large.landscape']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['large.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['large.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['large.landscape']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['large.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['large.landscape']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['large.landscape']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['large.landscape']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['large.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['large.landscape']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['large.landscape']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['large.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['large.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['large.landscape']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['large.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['large.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['large.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['large.landscape']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['large.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['large.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['large.landscape']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['large.landscape']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['large.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['large.landscape']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['large.landscape']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['large.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['large.landscape']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['large.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['large.landscape']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            if (this.layoutSize == 'large') {
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.BinLotLookupItem');
               dojo.require('generated.application.ui.layout.small.InvreserveListItem');
               dojo.require('generated.application.ui.layout.small.MultiAssetListItem');
               dojo.require('generated.application.ui.layout.small.FailureReportList');
               dojo.require('generated.application.ui.layout.small.ServiceAddressLookup');
               dojo.require('generated.application.ui.layout.small.IssuedItemList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.CrewToolList');
               dojo.require('generated.application.ui.layout.small.MeterList');
               dojo.require('generated.application.ui.layout.small.ShippedListItem');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.CopyPlansListItem');
               dojo.require('generated.application.ui.layout.small.ActualLaborListItem');
               dojo.require('generated.application.ui.layout.small.LaborAssignmentListItem');
               dojo.require('generated.application.ui.layout.small.ShipmentLookupListItem');
               dojo.require('generated.application.ui.layout.small.TransferItemList');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CrewLaborList');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ReceivedListItem');
               dojo.require('generated.application.ui.layout.small.MaterialToolList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.LaborCraftRateLookupItem');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.PlannedMaterialListItem');
               dojo.require('generated.application.ui.layout.small.Qtlayout');
               dojo.require('generated.application.ui.layout.small.AttachmentsListItem');
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.PlannedToolListItem');
               dojo.require('generated.application.ui.layout.small.VoidShippedItemList');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.SplitQtyRotateList');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.WorkLogListItem');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.ReturnExternalItemList');
               dojo.require('generated.application.ui.layout.small.UnreservedDetailItem');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.POListItem');
               dojo.require('generated.application.ui.layout.small.ActualToolListItem');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.InvbalanceListItem');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.ActualMaterialListItem');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }

            // 
            // XLARGE.PORTRAIT
            // 
            this.layoutMap['xlarge.portrait'] = {};
            this.layoutMap['xlarge.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['xlarge.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['xlarge.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['xlarge.portrait']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['xlarge.portrait']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['xlarge.portrait']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['xlarge.portrait']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['xlarge.portrait']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['xlarge.portrait']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['xlarge.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['xlarge.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['xlarge.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['xlarge.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['xlarge.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['xlarge.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['xlarge.portrait']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['xlarge.portrait']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['xlarge.portrait']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['xlarge.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['xlarge.portrait']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['xlarge.portrait']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['xlarge.portrait']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['xlarge.portrait']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['xlarge.portrait']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['xlarge.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['xlarge.portrait']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['xlarge.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['xlarge.portrait']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['xlarge.portrait']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['xlarge.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['xlarge.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['xlarge.portrait']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['xlarge.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['xlarge.portrait']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['xlarge.portrait']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['xlarge.portrait']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['xlarge.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['xlarge.portrait']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['xlarge.portrait']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['xlarge.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['xlarge.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['xlarge.portrait']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['xlarge.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['xlarge.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['xlarge.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['xlarge.portrait']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['xlarge.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['xlarge.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['xlarge.portrait']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['xlarge.portrait']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['xlarge.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['xlarge.portrait']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['xlarge.portrait']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['xlarge.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['xlarge.portrait']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['xlarge.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['xlarge.portrait']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            // 
            // XLARGE.LANDSCAPE
            // 
            this.layoutMap['xlarge.landscape'] = {};
            this.layoutMap['xlarge.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['xlarge.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['xlarge.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['xlarge.landscape']['BinLotLookupItem'] = 'generated.application.ui.layout.small.BinLotLookupItem';
            this.layoutMap['xlarge.landscape']['InvreserveListItem'] = 'generated.application.ui.layout.small.InvreserveListItem';
            this.layoutMap['xlarge.landscape']['MultiAssetListItem'] = 'generated.application.ui.layout.small.MultiAssetListItem';
            this.layoutMap['xlarge.landscape']['FailureReportList'] = 'generated.application.ui.layout.small.FailureReportList';
            this.layoutMap['xlarge.landscape']['ServiceAddressLookup'] = 'generated.application.ui.layout.small.ServiceAddressLookup';
            this.layoutMap['xlarge.landscape']['IssuedItemList'] = 'generated.application.ui.layout.small.IssuedItemList';
            this.layoutMap['xlarge.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['xlarge.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['xlarge.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['xlarge.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['xlarge.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['xlarge.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['xlarge.landscape']['CrewToolList'] = 'generated.application.ui.layout.small.CrewToolList';
            this.layoutMap['xlarge.landscape']['MeterList'] = 'generated.application.ui.layout.small.MeterList';
            this.layoutMap['xlarge.landscape']['ShippedListItem'] = 'generated.application.ui.layout.small.ShippedListItem';
            this.layoutMap['xlarge.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['xlarge.landscape']['CopyPlansListItem'] = 'generated.application.ui.layout.small.CopyPlansListItem';
            this.layoutMap['xlarge.landscape']['ActualLaborListItem'] = 'generated.application.ui.layout.small.ActualLaborListItem';
            this.layoutMap['xlarge.landscape']['LaborAssignmentListItem'] = 'generated.application.ui.layout.small.LaborAssignmentListItem';
            this.layoutMap['xlarge.landscape']['ShipmentLookupListItem'] = 'generated.application.ui.layout.small.ShipmentLookupListItem';
            this.layoutMap['xlarge.landscape']['TransferItemList'] = 'generated.application.ui.layout.small.TransferItemList';
            this.layoutMap['xlarge.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['xlarge.landscape']['CrewLaborList'] = 'generated.application.ui.layout.small.CrewLaborList';
            this.layoutMap['xlarge.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['xlarge.landscape']['ReceivedListItem'] = 'generated.application.ui.layout.small.ReceivedListItem';
            this.layoutMap['xlarge.landscape']['MaterialToolList'] = 'generated.application.ui.layout.small.MaterialToolList';
            this.layoutMap['xlarge.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['xlarge.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['xlarge.landscape']['LaborCraftRateLookupItem'] = 'generated.application.ui.layout.small.LaborCraftRateLookupItem';
            this.layoutMap['xlarge.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';
            this.layoutMap['xlarge.landscape']['PlannedMaterialListItem'] = 'generated.application.ui.layout.small.PlannedMaterialListItem';
            this.layoutMap['xlarge.landscape']['Qtlayout'] = 'generated.application.ui.layout.small.Qtlayout';
            this.layoutMap['xlarge.landscape']['AttachmentsListItem'] = 'generated.application.ui.layout.small.AttachmentsListItem';
            this.layoutMap['xlarge.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['xlarge.landscape']['PlannedToolListItem'] = 'generated.application.ui.layout.small.PlannedToolListItem';
            this.layoutMap['xlarge.landscape']['VoidShippedItemList'] = 'generated.application.ui.layout.small.VoidShippedItemList';
            this.layoutMap['xlarge.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['xlarge.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['xlarge.landscape']['SplitQtyRotateList'] = 'generated.application.ui.layout.small.SplitQtyRotateList';
            this.layoutMap['xlarge.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['xlarge.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['xlarge.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['xlarge.landscape']['WorkLogListItem'] = 'generated.application.ui.layout.small.WorkLogListItem';
            this.layoutMap['xlarge.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['xlarge.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['xlarge.landscape']['ReturnExternalItemList'] = 'generated.application.ui.layout.small.ReturnExternalItemList';
            this.layoutMap['xlarge.landscape']['UnreservedDetailItem'] = 'generated.application.ui.layout.small.UnreservedDetailItem';
            this.layoutMap['xlarge.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['xlarge.landscape']['POListItem'] = 'generated.application.ui.layout.small.POListItem';
            this.layoutMap['xlarge.landscape']['ActualToolListItem'] = 'generated.application.ui.layout.small.ActualToolListItem';
            this.layoutMap['xlarge.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['xlarge.landscape']['InvbalanceListItem'] = 'generated.application.ui.layout.small.InvbalanceListItem';
            this.layoutMap['xlarge.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['xlarge.landscape']['ActualMaterialListItem'] = 'generated.application.ui.layout.small.ActualMaterialListItem';

            if (this.layoutSize == 'xlarge') {
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.BinLotLookupItem');
               dojo.require('generated.application.ui.layout.small.InvreserveListItem');
               dojo.require('generated.application.ui.layout.small.MultiAssetListItem');
               dojo.require('generated.application.ui.layout.small.FailureReportList');
               dojo.require('generated.application.ui.layout.small.ServiceAddressLookup');
               dojo.require('generated.application.ui.layout.small.IssuedItemList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.CrewToolList');
               dojo.require('generated.application.ui.layout.small.MeterList');
               dojo.require('generated.application.ui.layout.small.ShippedListItem');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.CopyPlansListItem');
               dojo.require('generated.application.ui.layout.small.ActualLaborListItem');
               dojo.require('generated.application.ui.layout.small.LaborAssignmentListItem');
               dojo.require('generated.application.ui.layout.small.ShipmentLookupListItem');
               dojo.require('generated.application.ui.layout.small.TransferItemList');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CrewLaborList');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ReceivedListItem');
               dojo.require('generated.application.ui.layout.small.MaterialToolList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.LaborCraftRateLookupItem');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.PlannedMaterialListItem');
               dojo.require('generated.application.ui.layout.small.Qtlayout');
               dojo.require('generated.application.ui.layout.small.AttachmentsListItem');
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.PlannedToolListItem');
               dojo.require('generated.application.ui.layout.small.VoidShippedItemList');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.SplitQtyRotateList');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.WorkLogListItem');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.ReturnExternalItemList');
               dojo.require('generated.application.ui.layout.small.UnreservedDetailItem');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.POListItem');
               dojo.require('generated.application.ui.layout.small.ActualToolListItem');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.InvbalanceListItem');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.ActualMaterialListItem');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }


         }
,
         getLayout : function(layoutName, orientation) {

            this.screenOrientation = orientation;
            var screenBucket = this.layoutSize + '.' + this.screenOrientation;
            var proposedLayout = this.layoutMap[screenBucket][layoutName];
            if (!proposedLayout) {
               return proposedLayout;
            }
            return eval('new ' + proposedLayout + '()');

         }

      });
});

