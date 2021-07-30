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
// Build: 2021-06-24 15:10:35
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/LayoutFactory", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/LayoutUtil", 
         "platform/ui/DeviceEnv", 
         "generated/application/ui/layout/small/Item2", 
         "generated/application/ui/layout/small/Item1Desc1", 
         "generated/application/ui/layout/small/NotificationList", 
         "generated/application/ui/layout/small/MapEndPoint", 
         "generated/application/ui/layout/small/Item1Button1", 
         "generated/application/ui/layout/small/Item1Button2list", 
         "generated/application/ui/layout/small/portrait/MapDetail", 
         "generated/application/ui/layout/small/portrait/MapView", 
         "generated/application/ui/layout/small/ListItem6Button1", 
         "generated/application/ui/layout/small/ListItem5Button1", 
         "generated/application/ui/layout/small/ScanHeader", 
         "generated/application/ui/layout/small/Button2", 
         "generated/application/ui/layout/small/WorkListItem", 
         "generated/application/ui/layout/small/CenteredBottom2Buttons", 
         "generated/application/ui/layout/small/DirectionsListItem", 
         "generated/application/ui/layout/small/ConnectionManagementLayout", 
         "generated/application/ui/layout/small/Button1Item1", 
         "generated/application/ui/layout/small/Item2SideBySide", 
         "generated/application/ui/layout/small/Item2Desc2", 
         "generated/application/ui/layout/small/landscape/MapDetail", 
         "generated/application/ui/layout/small/landscape/MapView", 
         "generated/application/ui/layout/small/Item1Count1Button1", 
         "generated/application/ui/layout/small/Item1Count1Button2", 
         "generated/application/ui/layout/small/ListHeader", 
         "generated/application/ui/layout/small/ListHeaderWithSearch", 
         "generated/application/ui/layout/small/ListItem3Input1", 
         "generated/application/ui/layout/small/Progress", 
         "generated/application/ui/layout/small/ItemLookup", 
         "generated/application/ui/layout/small/InvbalanceLookup", 
         "generated/application/ui/layout/small/ItemList"
      ],

function(declare, LayoutUtil, DeviceEnv, small_Item2, small_Item1Desc1, small_NotificationList, small_MapEndPoint, small_Item1Button1, small_Item1Button2list, small_portrait_MapDetail, small_portrait_MapView, small_ListItem6Button1, small_ListItem5Button1, small_ScanHeader, small_Button2, small_WorkListItem, small_CenteredBottom2Buttons, small_DirectionsListItem, small_ConnectionManagementLayout, small_Button1Item1, small_Item2SideBySide, small_Item2Desc2, small_landscape_MapDetail, small_landscape_MapView, small_Item1Count1Button1, small_Item1Count1Button2, small_ListHeader, small_ListHeaderWithSearch, small_ListItem3Input1, small_Progress, small_ItemLookup, small_InvbalanceLookup, small_ItemList) {
      return declare("generated.application.ui.layout.LayoutFactory", [ ], {


         //
         // AUTO-GENERATED FILE CREATED ON: 2021-06-24 15:10:35
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
            this.layoutMap['small.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['small.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['small.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['small.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['small.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['small.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['small.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['small.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['small.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['small.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['small.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['small.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['small.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['small.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['small.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['small.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['small.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['small.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['small.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['small.portrait']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['small.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['small.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['small.portrait']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['small.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['small.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['small.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['small.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['small.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            // 
            // SMALL.LANDSCAPE
            // 
            this.layoutMap['small.landscape'] = {};
            this.layoutMap['small.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['small.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['small.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['small.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['small.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['small.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['small.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['small.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['small.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['small.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['small.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['small.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['small.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['small.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['small.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['small.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['small.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['small.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['small.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['small.landscape']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['small.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['small.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['small.landscape']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['small.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['small.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['small.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['small.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['small.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            if (this.layoutSize == 'small') {
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.InvbalanceLookup');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ItemList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }

            // 
            // MEDIUM.PORTRAIT
            // 
            this.layoutMap['medium.portrait'] = {};
            this.layoutMap['medium.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['medium.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['medium.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['medium.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['medium.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['medium.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['medium.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['medium.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['medium.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['medium.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['medium.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['medium.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['medium.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['medium.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['medium.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['medium.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['medium.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['medium.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['medium.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['medium.portrait']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['medium.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['medium.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['medium.portrait']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['medium.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['medium.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['medium.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['medium.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['medium.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            // 
            // MEDIUM.LANDSCAPE
            // 
            this.layoutMap['medium.landscape'] = {};
            this.layoutMap['medium.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['medium.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['medium.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['medium.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['medium.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['medium.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['medium.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['medium.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['medium.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['medium.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['medium.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['medium.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['medium.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['medium.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['medium.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['medium.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['medium.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['medium.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['medium.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['medium.landscape']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['medium.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['medium.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['medium.landscape']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['medium.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['medium.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['medium.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['medium.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['medium.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            if (this.layoutSize == 'medium') {
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.InvbalanceLookup');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ItemList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }

            // 
            // LARGE.PORTRAIT
            // 
            this.layoutMap['large.portrait'] = {};
            this.layoutMap['large.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['large.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['large.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['large.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['large.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['large.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['large.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['large.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['large.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['large.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['large.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['large.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['large.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['large.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['large.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['large.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['large.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['large.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['large.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['large.portrait']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['large.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['large.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['large.portrait']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['large.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['large.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['large.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['large.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['large.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            // 
            // LARGE.LANDSCAPE
            // 
            this.layoutMap['large.landscape'] = {};
            this.layoutMap['large.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['large.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['large.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['large.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['large.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['large.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['large.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['large.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['large.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['large.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['large.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['large.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['large.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['large.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['large.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['large.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['large.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['large.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['large.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['large.landscape']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['large.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['large.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['large.landscape']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['large.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['large.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['large.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['large.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['large.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            if (this.layoutSize == 'large') {
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.InvbalanceLookup');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ItemList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
               dojo.require('generated.application.ui.layout.small.landscape.MapView');
               dojo.require('generated.application.ui.layout.small.landscape.MapDetail');
            }

            // 
            // XLARGE.PORTRAIT
            // 
            this.layoutMap['xlarge.portrait'] = {};
            this.layoutMap['xlarge.portrait']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['xlarge.portrait']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['xlarge.portrait']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['xlarge.portrait']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['xlarge.portrait']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['xlarge.portrait']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['xlarge.portrait']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['xlarge.portrait']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['xlarge.portrait']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['xlarge.portrait']['MapView'] = 'generated.application.ui.layout.small.portrait.MapView';
            this.layoutMap['xlarge.portrait']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['xlarge.portrait']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['xlarge.portrait']['MapDetail'] = 'generated.application.ui.layout.small.portrait.MapDetail';
            this.layoutMap['xlarge.portrait']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['xlarge.portrait']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['xlarge.portrait']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['xlarge.portrait']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['xlarge.portrait']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['xlarge.portrait']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['xlarge.portrait']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['xlarge.portrait']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['xlarge.portrait']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['xlarge.portrait']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['xlarge.portrait']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['xlarge.portrait']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['xlarge.portrait']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['xlarge.portrait']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['xlarge.portrait']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            // 
            // XLARGE.LANDSCAPE
            // 
            this.layoutMap['xlarge.landscape'] = {};
            this.layoutMap['xlarge.landscape']['WorkListItem'] = 'generated.application.ui.layout.small.WorkListItem';
            this.layoutMap['xlarge.landscape']['Item1Count1Button1'] = 'generated.application.ui.layout.small.Item1Count1Button1';
            this.layoutMap['xlarge.landscape']['ConnectionManagementLayout'] = 'generated.application.ui.layout.small.ConnectionManagementLayout';
            this.layoutMap['xlarge.landscape']['NotificationList'] = 'generated.application.ui.layout.small.NotificationList';
            this.layoutMap['xlarge.landscape']['ScanHeader'] = 'generated.application.ui.layout.small.ScanHeader';
            this.layoutMap['xlarge.landscape']['DirectionsListItem'] = 'generated.application.ui.layout.small.DirectionsListItem';
            this.layoutMap['xlarge.landscape']['ListItem6Button1'] = 'generated.application.ui.layout.small.ListItem6Button1';
            this.layoutMap['xlarge.landscape']['ListItem5Button1'] = 'generated.application.ui.layout.small.ListItem5Button1';
            this.layoutMap['xlarge.landscape']['ListHeader'] = 'generated.application.ui.layout.small.ListHeader';
            this.layoutMap['xlarge.landscape']['MapView'] = 'generated.application.ui.layout.small.landscape.MapView';
            this.layoutMap['xlarge.landscape']['Item1Button1'] = 'generated.application.ui.layout.small.Item1Button1';
            this.layoutMap['xlarge.landscape']['Button1Item1'] = 'generated.application.ui.layout.small.Button1Item1';
            this.layoutMap['xlarge.landscape']['MapDetail'] = 'generated.application.ui.layout.small.landscape.MapDetail';
            this.layoutMap['xlarge.landscape']['Item1Desc1'] = 'generated.application.ui.layout.small.Item1Desc1';
            this.layoutMap['xlarge.landscape']['ItemLookup'] = 'generated.application.ui.layout.small.ItemLookup';
            this.layoutMap['xlarge.landscape']['Progress'] = 'generated.application.ui.layout.small.Progress';
            this.layoutMap['xlarge.landscape']['Item2'] = 'generated.application.ui.layout.small.Item2';
            this.layoutMap['xlarge.landscape']['Item2SideBySide'] = 'generated.application.ui.layout.small.Item2SideBySide';
            this.layoutMap['xlarge.landscape']['ListItem3Input1'] = 'generated.application.ui.layout.small.ListItem3Input1';
            this.layoutMap['xlarge.landscape']['InvbalanceLookup'] = 'generated.application.ui.layout.small.InvbalanceLookup';
            this.layoutMap['xlarge.landscape']['Item2Desc2'] = 'generated.application.ui.layout.small.Item2Desc2';
            this.layoutMap['xlarge.landscape']['CenteredBottom2Buttons'] = 'generated.application.ui.layout.small.CenteredBottom2Buttons';
            this.layoutMap['xlarge.landscape']['ItemList'] = 'generated.application.ui.layout.small.ItemList';
            this.layoutMap['xlarge.landscape']['Button2'] = 'generated.application.ui.layout.small.Button2';
            this.layoutMap['xlarge.landscape']['Item1Count1Button2'] = 'generated.application.ui.layout.small.Item1Count1Button2';
            this.layoutMap['xlarge.landscape']['ListHeaderWithSearch'] = 'generated.application.ui.layout.small.ListHeaderWithSearch';
            this.layoutMap['xlarge.landscape']['Item1Button2list'] = 'generated.application.ui.layout.small.Item1Button2list';
            this.layoutMap['xlarge.landscape']['MapEndPoint'] = 'generated.application.ui.layout.small.MapEndPoint';

            if (this.layoutSize == 'xlarge') {
               dojo.require('generated.application.ui.layout.small.WorkListItem');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button1');
               dojo.require('generated.application.ui.layout.small.ConnectionManagementLayout');
               dojo.require('generated.application.ui.layout.small.NotificationList');
               dojo.require('generated.application.ui.layout.small.ScanHeader');
               dojo.require('generated.application.ui.layout.small.DirectionsListItem');
               dojo.require('generated.application.ui.layout.small.ListItem6Button1');
               dojo.require('generated.application.ui.layout.small.ListItem5Button1');
               dojo.require('generated.application.ui.layout.small.ListHeader');
               dojo.require('generated.application.ui.layout.small.portrait.MapView');
               dojo.require('generated.application.ui.layout.small.Item1Button1');
               dojo.require('generated.application.ui.layout.small.Button1Item1');
               dojo.require('generated.application.ui.layout.small.portrait.MapDetail');
               dojo.require('generated.application.ui.layout.small.Item1Desc1');
               dojo.require('generated.application.ui.layout.small.ItemLookup');
               dojo.require('generated.application.ui.layout.small.Progress');
               dojo.require('generated.application.ui.layout.small.Item2');
               dojo.require('generated.application.ui.layout.small.Item2SideBySide');
               dojo.require('generated.application.ui.layout.small.ListItem3Input1');
               dojo.require('generated.application.ui.layout.small.InvbalanceLookup');
               dojo.require('generated.application.ui.layout.small.Item2Desc2');
               dojo.require('generated.application.ui.layout.small.CenteredBottom2Buttons');
               dojo.require('generated.application.ui.layout.small.ItemList');
               dojo.require('generated.application.ui.layout.small.Button2');
               dojo.require('generated.application.ui.layout.small.Item1Count1Button2');
               dojo.require('generated.application.ui.layout.small.ListHeaderWithSearch');
               dojo.require('generated.application.ui.layout.small.Item1Button2list');
               dojo.require('generated.application.ui.layout.small.MapEndPoint');
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

