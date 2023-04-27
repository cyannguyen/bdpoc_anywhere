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
// Build: 2023-04-26 15:55:39
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/ReturnExternalItemList", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.ReturnExternalItemList", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout ReturnExternalItemList ');

            var row = table.insertRow(-1);
            row.className  = 'ReturnExternalItemList_row_0';

            var col_r1item1 = row.insertCell(-1);
            col_r1item1.className  = 'ReturnExternalItemList_item1_column';
            col_r1item1.colSpan = '1';
            var div_r1item1 = domConstruct.create('div');
            col_r1item1.appendChild(div_r1item1);
            domClass.add(div_r1item1, 'hideextra');
            this._storeAttachToDomReference('r1item1', div_r1item1);
            
            var col_r1item2 = row.insertCell(-1);
            col_r1item2.className  = 'ReturnExternalItemList_item2_column';
            col_r1item2.colSpan = '1';
            var div_r1item2 = domConstruct.create('div');
            col_r1item2.appendChild(div_r1item2);
            domClass.add(div_r1item2, 'hideextra');
            this._storeAttachToDomReference('r1item2', div_r1item2);
            
            var col_checkbox1 = row.insertCell(-1);
            col_checkbox1.className  = 'ReturnExternalItemList_item3_column';
            col_checkbox1.colSpan = '1';
            col_checkbox1.rowSpan = '3';
            col_checkbox1.style['vertical-align'] = 'middle';
            col_checkbox1.style['text-align'] = 'right';
            var div_checkbox1 = domConstruct.create('div');
            col_checkbox1.appendChild(div_checkbox1);
            domClass.add(div_checkbox1, 'hideextra');
            this._storeAttachToDomReference('checkbox1', div_checkbox1);
            
            var row = table.insertRow(-1);
            row.className  = 'ReturnExternalItemList_row_1';

            var col_r2item1 = row.insertCell(-1);
            col_r2item1.className  = 'ReturnExternalItemList_item3_column';
            col_r2item1.colSpan = '1';
            var div_r2item1 = domConstruct.create('div');
            col_r2item1.appendChild(div_r2item1);
            domClass.add(div_r2item1, 'hideextra');
            this._storeAttachToDomReference('r2item1', div_r2item1);
            
            var col_r2item2 = row.insertCell(-1);
            col_r2item2.className  = 'ReturnExternalItemList_item4_column';
            col_r2item2.colSpan = '1';
            var div_r2item2 = domConstruct.create('div');
            col_r2item2.appendChild(div_r2item2);
            domClass.add(div_r2item2, 'hideextra');
            this._storeAttachToDomReference('r2item2', div_r2item2);
            
            var row = table.insertRow(-1);
            row.className  = 'ReturnExternalItemList_row_1';

            var col_r3item1 = row.insertCell(-1);
            col_r3item1.className  = 'ReturnExternalItemList_item5_column';
            col_r3item1.colSpan = '2';
            var div_r3item1 = domConstruct.create('div');
            col_r3item1.appendChild(div_r3item1);
            domClass.add(div_r3item1, 'hideextra');
            this._storeAttachToDomReference('r3item1', div_r3item1);
            
            this.domNode = table;
         }
      });
});
