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

define("application/business/MaxVars",
[ "dojo/_base/declare", 
  "dojo/Deferred",
  "platform/util/DateTimeUtil"], 
  function(declare, 
		   Deferred,
		   DateTimeUtil) {
	return {
/**@memberOf application.business.MaxVars */
		shouldInProgressWOWhenTimerStarted : function(maxVarsSet) {
			if(maxVarsSet){
				var result = maxVarsSet.find("varname == $1", 'STARTTIMERINPRG');
				if (result.length > 0) {
					return result[0].get("varvalue") == 1;
				}
			}
			return false;
		},

		isActualLaborDateValid: function(maxVarsSet, datetime, currentdatetime, orgid) {
			
			if(maxVarsSet){
			    var result = maxVarsSet.find("varname == $1 && orgid == $2", 'LABTRANSTOLERANCE', orgid);
				var laborTime = DateTimeUtil.zeroSecondsAndMilliseconds(datetime);
				var currentTime = DateTimeUtil.zeroSecondsAndMilliseconds(currentdatetime);
				
			    if (result.length > 0) {
			    	//Validation: the date value cannot exceed the current date + future tolerance
					var tolerance =  result[0].get("varvalue");
															
					if (tolerance) 
						return(laborTime.getTime() <= (currentTime.getTime() + DateTimeUtil.fromDurationToMilliseconds(tolerance)));
			    	
			    }
		    }
		    return false;
	    }
	
	};
});
