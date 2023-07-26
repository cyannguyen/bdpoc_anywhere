/*
 * Licensed Materials - Property of IBM
 *
 * 5725-M39
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * createdBy: lcassa@br.ibm.com
 * MarkerAnchor
 */
define("platform/map/directions/MarkerAnchor", 
[ "dojo/_base/declare"], 
function(declare) {
	return declare(null, {
		/** @memberOf platform.map.directions.MarkerAnchor */
		xOffset: 0,
		yOffset: 0,	

		constructor: function(xOffset, yOffset) {
			this.xOffset = xOffset;
			this.yOffset = yOffset;
		}
	});
});
