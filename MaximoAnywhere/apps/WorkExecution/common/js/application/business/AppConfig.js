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

define("application/business/AppConfig",
[ "dojo/_base/declare"], 
  function(declare) {
	
	
	//Number of Records to be displayed in Previous Work Order List
	var DisplayRecordLimit = 5;
	
	return {
/**@memberOf application.business.AppConfig */
		getDisplayRecordLimit: function(){
			return DisplayRecordLimit;
		},
			
				
	};
});
