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
 * Represent a generic localized resource under Anywhere framework
 */
define("platform/map/LocalizedResource",
[ "dojo/_base/declare"], 
function(declare) {
	return declare(null, {
		x: null,
		y: null,
		attributes: null,
		/** @memberOf platform.map.LocalizedResource */
		constructor: function(/*double*/ x, /*double*/ y, /*JsonObject*/ attributes) {
			this.x = x;
			this.y = y;
			this.attributes = attributes;
		}
	});
});
