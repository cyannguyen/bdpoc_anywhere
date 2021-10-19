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
// Build: 2021-10-15 16:02:23
//----------------------------------------------------------------//
define(   "generated/application/ui/layout/small/ConnectionManagementLayout", 
      [
         "dojo/_base/declare", 
         "platform/ui/layout/_LayoutWidgetBase", 
         "dojo/_base/array", 
         "dojo/dom-construct", 
         "dojo/dom-class"
      ],

function(declare, _LayoutWidgetBase, array, domConstruct, domClass) {
      return declare("generated.application.ui.layout.small.ConnectionManagementLayout", _LayoutWidgetBase, {

         buildRendering : function() {
            this.inherited(arguments);

            var table = domConstruct.create('table', {role:'presentation'} );
            table.style.width = '100%';
            domClass.add(table, 'layout ConnectionManagementLayout ');

            var row = table.insertRow(-1);
            row.className  = 'ConnectionManagementLayout_row_0';

            var col_Title = row.insertCell(-1);
            col_Title.className  = 'ConnectionManagementLayout_Title';
            col_Title.colSpan = '12';
            var div_Title = domConstruct.create('div');
            col_Title.appendChild(div_Title);
            domClass.add(div_Title, 'hideextra');
            this._storeAttachToDomReference('Title', div_Title);
            
            var row = table.insertRow(-1);
            row.className  = 'ConnectionManagementLayout_row_1';

            var col_description = row.insertCell(-1);
            col_description.className  = 'ConnectionManagementLayout_description';
            col_description.colSpan = '12';
            var div_description = domConstruct.create('div');
            col_description.appendChild(div_description);
            domClass.add(div_description, 'hideextra');
            this._storeAttachToDomReference('description', div_description);
            
            var row = table.insertRow(-1);
            row.className  = 'ConnectionManagementLayout_row_2';

            var col_button1 = row.insertCell(-1);
            col_button1.className  = 'ConnectionManagementLayout_button1';
            col_button1.colSpan = '4';
            var div_button1 = domConstruct.create('div');
            col_button1.appendChild(div_button1);
            domClass.add(div_button1, 'hideextra');
            this._storeAttachToDomReference('button1', div_button1);
            
            var col_button2 = row.insertCell(-1);
            col_button2.className  = 'ConnectionManagementLayout_button2';
            col_button2.colSpan = '4';
            var div_button2 = domConstruct.create('div');
            col_button2.appendChild(div_button2);
            domClass.add(div_button2, 'hideextra');
            this._storeAttachToDomReference('button2', div_button2);
            
            var col_button3 = row.insertCell(-1);
            col_button3.className  = 'ConnectionManagementLayout_button3';
            col_button3.colSpan = '4';
            var div_button3 = domConstruct.create('div');
            col_button3.appendChild(div_button3);
            domClass.add(div_button3, 'hideextra');
            this._storeAttachToDomReference('button3', div_button3);
            
            var col_button4 = row.insertCell(-1);
            col_button4.className  = 'ConnectionManagementLayout_button1';
            col_button4.colSpan = '3';
            var div_button4 = domConstruct.create('div');
            col_button4.appendChild(div_button4);
            domClass.add(div_button4, 'hideextra');
            this._storeAttachToDomReference('button4', div_button4);
            
            this.domNode = table;
         }
      });
});
