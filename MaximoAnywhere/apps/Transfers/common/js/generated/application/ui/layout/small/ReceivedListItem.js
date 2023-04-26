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
// Build: 2023-04-25 12:01:06
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/ReceivedListItem", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.ReceivedListItem", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout ReceivedListItem ');

            var row = table.insertRow(-1);
            row.className  = 'ReceivedListItem_row_0';

            var col_r1item1 = row.insertCell(-1);
            col_r1item1.className  = 'ReceivedListItem_item1_column';
            col_r1item1.colSpan = '1';
            col_r1item1.style['text-align'] = 'left';
            var div_r1item1 = domConstruct.create('div');
            col_r1item1.appendChild(div_r1item1);
            domClass.add(div_r1item1, 'hideextra');
            this._storeAttachToDomReference('r1item1', div_r1item1);
            
            var col_r1item2 = row.insertCell(-1);
            col_r1item2.className  = 'ReceivedListItem_item2_column';
            col_r1item2.colSpan = '1';
            col_r1item2.style['text-align'] = 'left';
            var div_r1item2 = domConstruct.create('div');
            col_r1item2.appendChild(div_r1item2);
            domClass.add(div_r1item2, 'hideextra');
            this._storeAttachToDomReference('r1item2', div_r1item2);
            
            var row = table.insertRow(-1);
            row.className  = 'ReceivedListItem_row_1';

            var col_r2item1 = row.insertCell(-1);
            col_r2item1.className  = 'ReceivedListItem_item3_column';
            col_r2item1.colSpan = '1';
            col_r2item1.style['text-align'] = 'left';
            var div_r2item1 = domConstruct.create('div');
            col_r2item1.appendChild(div_r2item1);
            domClass.add(div_r2item1, 'hideextra');
            this._storeAttachToDomReference('r2item1', div_r2item1);
            
            var col_r2item2 = row.insertCell(-1);
            col_r2item2.className  = 'ReceivedListItem_item4_column';
            col_r2item2.colSpan = '1';
            col_r2item2.style['text-align'] = 'left';
            var div_r2item2 = domConstruct.create('div');
            col_r2item2.appendChild(div_r2item2);
            domClass.add(div_r2item2, 'hideextra');
            this._storeAttachToDomReference('r2item2', div_r2item2);
            
            var row = table.insertRow(-1);
            row.className  = 'ReceivedListItem_row_2';

            var col_r3item1 = row.insertCell(-1);
            col_r3item1.className  = 'ReceivedListItem_item5_column';
            col_r3item1.colSpan = '1';
            col_r3item1.style['text-align'] = 'left';
            var div_r3item1 = domConstruct.create('div');
            col_r3item1.appendChild(div_r3item1);
            domClass.add(div_r3item1, 'hideextra');
            this._storeAttachToDomReference('r3item1', div_r3item1);
            
            var col_r3item2 = row.insertCell(-1);
            col_r3item2.className  = 'ReceivedListItem_item6_column';
            col_r3item2.colSpan = '1';
            col_r3item2.style['text-align'] = 'left';
            var div_r3item2 = domConstruct.create('div');
            col_r3item2.appendChild(div_r3item2);
            domClass.add(div_r3item2, 'hideextra');
            this._storeAttachToDomReference('r3item2', div_r3item2);
            
            var row = table.insertRow(-1);
            row.className  = 'ReceivedListItem_row_3';

            var col_r4item1 = row.insertCell(-1);
            col_r4item1.className  = 'ReceivedListItem_item7_column';
            col_r4item1.colSpan = '2';
            col_r4item1.style['text-align'] = 'left';
            var div_r4item1 = domConstruct.create('div');
            col_r4item1.appendChild(div_r4item1);
            domClass.add(div_r4item1, 'hideextra');
            this._storeAttachToDomReference('r4item1', div_r4item1);
            
            this.domNode = table;
         }
      });
});
