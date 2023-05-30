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

define("application/business/AppConfig",
[ "dojo/_base/declare"], 
  function(declare) {
	
	//Add attributes to check in priority order.
	var barcode = ['itemnum','binnum'];
	
	//Count Frequency in hours
	var countFreq= 24;
	
	return {
/**@memberOf application.business.AppConfig */
		getBarCodeAttributes: function(){
			return barcode;
		},
			
		getLastCountFrequencyInHours: function(){
			return countFreq;
		}		
	};
});
