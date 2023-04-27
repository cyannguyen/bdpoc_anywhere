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
// Build: 2023-04-26 15:55:40
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/TransferItemList", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.TransferItemList", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout TransferItemList ');

            var row = table.insertRow(-1);
            row.className  = 'TransferItemList_row_0';

            var col_id_cel = row.insertCell(-1);
            col_id_cel.className  = 'TransferItemList_item1_column';
            col_id_cel.colSpan = '1';
            var div_id_cel = domConstruct.create('div');
            col_id_cel.appendChild(div_id_cel);
            domClass.add(div_id_cel, 'hideextra');
            this._storeAttachToDomReference('id_cel', div_id_cel);
            
            var col_description_cel = row.insertCell(-1);
            col_description_cel.className  = 'TransferItemList_item2_column';
            col_description_cel.colSpan = '2';
            var div_description_cel = domConstruct.create('div');
            col_description_cel.appendChild(div_description_cel);
            domClass.add(div_description_cel, 'hideextra');
            this._storeAttachToDomReference('description_cel', div_description_cel);
            
            var col_flag_cel = row.insertCell(-1);
            col_flag_cel.className  = 'TransferItemList_item3_column';
            col_flag_cel.colSpan = '1';
            col_flag_cel.rowSpan = '3';
            col_flag_cel.style['vertical-align'] = 'middle';
            var div_flag_cel = domConstruct.create('div');
            col_flag_cel.appendChild(div_flag_cel);
            domClass.add(div_flag_cel, 'hideextra');
            this._storeAttachToDomReference('flag_cel', div_flag_cel);
            
            var row = table.insertRow(-1);
            row.className  = 'TransferItemList_row_1';

            var col_bin_cel = row.insertCell(-1);
            col_bin_cel.className  = 'TransferItemList_item4_column';
            col_bin_cel.colSpan = '1';
            var div_bin_cel = domConstruct.create('div');
            col_bin_cel.appendChild(div_bin_cel);
            domClass.add(div_bin_cel, 'hideextra');
            this._storeAttachToDomReference('bin_cel', div_bin_cel);
            
            var col_wonum_cel = row.insertCell(-1);
            col_wonum_cel.className  = 'TransferItemList_item5_column';
            col_wonum_cel.colSpan = '1';
            var div_wonum_cel = domConstruct.create('div');
            col_wonum_cel.appendChild(div_wonum_cel);
            domClass.add(div_wonum_cel, 'hideextra');
            this._storeAttachToDomReference('wonum_cel', div_wonum_cel);
            
            var col_return_qty_cel = row.insertCell(-1);
            col_return_qty_cel.className  = 'TransferItemList_item6_column';
            col_return_qty_cel.colSpan = '1';
            col_return_qty_cel.rowSpan = '2';
            col_return_qty_cel.style['vertical-align'] = 'middle';
            var div_return_qty_cel = domConstruct.create('div');
            col_return_qty_cel.appendChild(div_return_qty_cel);
            domClass.add(div_return_qty_cel, 'hideextra');
            this._storeAttachToDomReference('return_qty_cel', div_return_qty_cel);
            
            var row = table.insertRow(-1);
            row.className  = 'TransferItemList_row_2';

            var col_rotating_asset_label_cel = row.insertCell(-1);
            col_rotating_asset_label_cel.className  = 'TransferItemList_item7_column';
            col_rotating_asset_label_cel.colSpan = '1';
            var div_rotating_asset_label_cel = domConstruct.create('div');
            col_rotating_asset_label_cel.appendChild(div_rotating_asset_label_cel);
            domClass.add(div_rotating_asset_label_cel, 'hideextra');
            this._storeAttachToDomReference('rotating_asset_label_cel', div_rotating_asset_label_cel);
            
            var col_rotating_asset_cel = row.insertCell(-1);
            col_rotating_asset_cel.className  = 'TransferItemList_item8_column';
            col_rotating_asset_cel.colSpan = '1';
            var div_rotating_asset_cel = domConstruct.create('div');
            col_rotating_asset_cel.appendChild(div_rotating_asset_cel);
            domClass.add(div_rotating_asset_cel, 'hideextra');
            this._storeAttachToDomReference('rotating_asset_cel', div_rotating_asset_cel);
            
            this.domNode = table;
         }
      });
});
