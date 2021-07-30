/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2013,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

define("platform/ui/control/ReturnAttributes", 
	   [ "dojo/_base/declare",
	     "platform/ui/control/_ContainerControlBase"],
function(declare, ContainerControlBase) {
	return declare( [ContainerControlBase], {
		/**@memberOf platform.ui.control.ReturnAttributes */
		constructor : function(options) {
			this._controlType = 'ReturnAttributes';
		},
	});
});
