/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2018,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

define("platform/util/XSSSanitizer",
		["dojo/_base/declare"],

function(declare) {
	
	require(['js/xss.js'], function () {
	});
	
	return {		
		sanitizeValue: function(value){
			var options = {'stripIgnoreTagBody' : ['script']};
			return filterXSS(value, options);
		}
	};
});
