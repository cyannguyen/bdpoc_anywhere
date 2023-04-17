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
// Build: 2023-04-17 13:32:33
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/MainButtonListItem", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.MainButtonListItem", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout MainButtonListItem ');

            var row = table.insertRow(-1);
            row.className  = 'MainButtonListItem_row_0';

            var col_button1 = row.insertCell(-1);
            col_button1.className  = 'MainButtonListItem_item1_column';
            col_button1.colSpan = '1';
            col_button1.style['text-align'] = 'center';
            var div_button1 = domConstruct.create('div');
            col_button1.appendChild(div_button1);
            domClass.add(div_button1, 'hideextra');
            this._storeAttachToDomReference('button1', div_button1);
            
            var row = table.insertRow(-1);
            row.className  = 'MainButtonListItem_row_1';

            var col_button2 = row.insertCell(-1);
            col_button2.className  = 'MainButtonListItem_item2_column';
            col_button2.colSpan = '1';
            col_button2.style['text-align'] = 'center';
            var div_button2 = domConstruct.create('div');
            col_button2.appendChild(div_button2);
            domClass.add(div_button2, 'hideextra');
            this._storeAttachToDomReference('button2', div_button2);
            
            var row = table.insertRow(-1);
            row.className  = 'MainButtonListItem_row_2';

            var col_button3 = row.insertCell(-1);
            col_button3.className  = 'MainButtonListItem_item3_column';
            col_button3.colSpan = '1';
            col_button3.style['text-align'] = 'center';
            var div_button3 = domConstruct.create('div');
            col_button3.appendChild(div_button3);
            domClass.add(div_button3, 'hideextra');
            this._storeAttachToDomReference('button3', div_button3);
            
            this.domNode = table;
         }
      });
});
