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
// Build: 2023-03-13 16:39:52
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/ItemList3", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.ItemList3", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout ItemList ');

            var row = table.insertRow(-1);
            row.className  = 'ItemList3_row_0';

            var col_item1 = row.insertCell(-1);
            col_item1.className  = 'ItemList3_item1_column';
            col_item1.colSpan = '12';
            var div_item1 = domConstruct.create('div');
            col_item1.appendChild(div_item1);
            domClass.add(div_item1, 'hideextra');
            this._storeAttachToDomReference('item1', div_item1);
            
            var row = table.insertRow(-1);
            row.className  = 'ItemList3_row_1';

            var col_item2 = row.insertCell(-1);
            col_item2.className  = 'ItemList3_item2_column';
            col_item2.colSpan = '12';
            var div_item2 = domConstruct.create('div');
            col_item2.appendChild(div_item2);
            domClass.add(div_item2, 'hideextra');
            this._storeAttachToDomReference('item2', div_item2);
            
            var row = table.insertRow(-1);
            row.className  = 'ItemList3_row_2';

            var col_item3 = row.insertCell(-1);
            col_item3.className  = 'ItemList3_item3_column';
            col_item3.colSpan = '2';
            var div_item3 = domConstruct.create('div');
            col_item3.appendChild(div_item3);
            domClass.add(div_item3, 'hideextra');
            this._storeAttachToDomReference('item3', div_item3);
            
            var col_item4 = row.insertCell(-1);
            col_item4.className  = 'ItemList3_item4_column';
            col_item4.colSpan = '3';
            var div_item4 = domConstruct.create('div');
            col_item4.appendChild(div_item4);
            domClass.add(div_item4, 'hideextra');
            this._storeAttachToDomReference('item4', div_item4);
            
            var col_item5 = row.insertCell(-1);
            col_item5.className  = 'ItemList3_item5_column';
            col_item5.colSpan = '3';
            var div_item5 = domConstruct.create('div');
            col_item5.appendChild(div_item5);
            domClass.add(div_item5, 'hideextra');
            this._storeAttachToDomReference('item5', div_item5);
            
            var col_item6 = row.insertCell(-1);
            col_item6.className  = 'ItemList3_item6_column';
            col_item6.colSpan = '4';
            var div_item6 = domConstruct.create('div');
            col_item6.appendChild(div_item6);
            domClass.add(div_item6, 'hideextra');
            this._storeAttachToDomReference('item6', div_item6);
            
            var row = table.insertRow(-1);
            row.className  = 'ItemList3_row_3';

            var col_item7 = row.insertCell(-1);
            col_item7.className  = 'ItemList3_item7_column';
            col_item7.colSpan = '2';
            var div_item7 = domConstruct.create('div');
            col_item7.appendChild(div_item7);
            domClass.add(div_item7, 'hideextra');
            this._storeAttachToDomReference('item7', div_item7);
            
            var col_item8 = row.insertCell(-1);
            col_item8.className  = 'ItemList3_item8_column';
            col_item8.colSpan = '3';
            var div_item8 = domConstruct.create('div');
            col_item8.appendChild(div_item8);
            domClass.add(div_item8, 'hideextra');
            this._storeAttachToDomReference('item8', div_item8);
            
            var col_item9 = row.insertCell(-1);
            col_item9.className  = 'ItemList3_item9_column';
            col_item9.colSpan = '2';
            var div_item9 = domConstruct.create('div');
            col_item9.appendChild(div_item9);
            domClass.add(div_item9, 'hideextra');
            this._storeAttachToDomReference('item9', div_item9);
            
            var col_item10 = row.insertCell(-1);
            col_item10.className  = 'ItemList3_item10_column';
            col_item10.colSpan = '2';
            var div_item10 = domConstruct.create('div');
            col_item10.appendChild(div_item10);
            domClass.add(div_item10, 'hideextra');
            this._storeAttachToDomReference('item10', div_item10);
            
            var row = table.insertRow(-1);
            row.className  = 'ItemList3_row_4';

            var col_item11 = row.insertCell(-1);
            col_item11.className  = 'ItemList3_item11_column';
            col_item11.colSpan = '3';
            var div_item11 = domConstruct.create('div');
            col_item11.appendChild(div_item11);
            domClass.add(div_item11, 'hideextra');
            this._storeAttachToDomReference('item11', div_item11);
            
            var col_item12 = row.insertCell(-1);
            col_item12.className  = 'ItemList3_item12_column';
            col_item12.colSpan = '9';
            var div_item12 = domConstruct.create('div');
            col_item12.appendChild(div_item12);
            domClass.add(div_item12, 'hideextra');
            this._storeAttachToDomReference('item12', div_item12);
            
            var row = table.insertRow(-1);
            row.className  = 'ItemList3_row_5';

            var col_item13 = row.insertCell(-1);
            col_item13.className  = 'ItemList3_item13_column';
            col_item13.colSpan = '11';
            var div_item13 = domConstruct.create('div');
            col_item13.appendChild(div_item13);
            domClass.add(div_item13, 'hideextra');
            this._storeAttachToDomReference('item13', div_item13);
            
            var col_item14 = row.insertCell(-1);
            col_item14.className  = 'ItemList3_item14_column';
            col_item14.colSpan = '1';
            var div_item14 = domConstruct.create('div');
            col_item14.appendChild(div_item14);
            domClass.add(div_item14, 'hideextra');
            this._storeAttachToDomReference('item14', div_item14);
            
            this.domNode = table;
         }
      });
});
