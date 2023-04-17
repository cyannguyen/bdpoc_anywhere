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
// Build: 2023-04-17 13:32:32
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/BinLotLookupItem", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.BinLotLookupItem", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout BinLotLookupItem ');

            var row = table.insertRow(-1);
            row.className  = 'BinLotLookupItem_row_0';

            var col_item1 = row.insertCell(-1);
            col_item1.className  = 'BinLotLookupItem_item1_column';
            col_item1.colSpan = '4';
            col_item1.style['text-align'] = 'left';
            var div_item1 = domConstruct.create('div');
            col_item1.appendChild(div_item1);
            domClass.add(div_item1, 'hideextra');
            this._storeAttachToDomReference('item1', div_item1);
            
            var col_item2 = row.insertCell(-1);
            col_item2.className  = 'BinLotLookupItem_item2_column';
            col_item2.colSpan = '4';
            col_item2.style['text-align'] = 'left';
            var div_item2 = domConstruct.create('div');
            col_item2.appendChild(div_item2);
            domClass.add(div_item2, 'hideextra');
            this._storeAttachToDomReference('item2', div_item2);
            
            var col_item3 = row.insertCell(-1);
            col_item3.className  = 'BinLotLookupItem_item3_column';
            col_item3.colSpan = '4';
            col_item3.rowSpan = '3';
            col_item3.style['vertical-align'] = 'middle';
            var div_item3 = domConstruct.create('div');
            col_item3.appendChild(div_item3);
            domClass.add(div_item3, 'hideextra');
            this._storeAttachToDomReference('item3', div_item3);
            
            this.domNode = table;
         }
      });
});
