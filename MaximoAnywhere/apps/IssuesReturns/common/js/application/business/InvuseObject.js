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

define("application/business/InvuseObject", 
["application/business/FieldUtil",
 "platform/model/ModelService",
 "dojo/_base/array",
 "application/business/InvuseStatusHandler",
 "application/handlers/CommonHandler",
 "platform/translation/SynonymDomain",
 "platform/exception/PlatformRuntimeException",
 "platform/util/DateTimeUtil",
 "platform/logging/Logger",
 "platform/auth/UserManager",
 "dojo/Deferred",
 "platform/util/CurrentTimeProvider",
 "platform/store/_ResourceMetadataContext",
 "platform/warning/PlatformRuntimeWarning",], 
 function(fieldUtil, ModelService, array, InvuseStatusHandler, CommonHandler, SynonymDomain, PlatformRuntimeException, DateTimeUtil, Logger, UserManager, Deferred, CurrentTimeProvider, ResourceMetaData, PlatformRuntimeWarning) {	
	return {

/**@memberOf application.business.InvuseObject */
		checkDates: function(startDateTime, endDateTime) {
			Logger.trace("startDateTime: " + startDateTime + " endDateTime: " + endDateTime);
			if (endDateTime) {
				startDateTime = DateTimeUtil.zeroSecondsAndMilliseconds(startDateTime);
				endDateTime = DateTimeUtil.zeroSecondsAndMilliseconds(endDateTime);
				if(endDateTime < startDateTime){																	
					throw new PlatformRuntimeException('endtimebeforestarttime');
				}
			}
		},
		
		statusChanged : function(invuse, newValue, previousValue) {
			invuse.set("statusdesc", InvuseStatusHandler.getInstance().toDescription(newValue));
		},

		complete: function(invuse, statusDate, memo, eventContext){				
			var comp = InvuseStatusHandler.getInstance().toDefaultExternalLabel("COMPLETE");
			this.changeStatus(invuse, comp, statusDate, memo, eventContext);
		},
		
		cancelled: function(invuse, statusDate, memo, eventContext){				
			var cancel = InvuseStatusHandler.getInstance().toDefaultExternalLabel("CANCELLED");
			this.changeStatus(invuse, cancel, statusDate, memo, eventContext);
		},

		changeStatus: function(invuse, newStatus, statusDate, memo, eventContext){
			Logger.trace("[InvuseObject] changeStatus ");
			var domaininvusestatus = CommonHandler._getAdditionalResource(eventContext,'domaininvusestatus');
			var currentStatus = SynonymDomain.resolveToInternal(domaininvusestatus,invuse.get("status"));
			//var comp = InvuseStatusHandler.getInstance().toDefaultExternalLabel("COMPLETE");
			
			if(InvuseStatusHandler.getInstance().canPerformTransition(currentStatus, newStatus)){
				invuse.openPriorityChangeTransaction();
				invuse.set("status", newStatus);
				invuse.set('siteid',invuse.get("siteid"));
				invuse.setDateValue("statusDate", statusDate);
				invuse.setDateValue("changestatusdate", statusDate);
				invuse.set("memo", '');				
				invuse.closePriorityChangeTransaction();
			}
			else{			
				Logger.trace("[InvuseObject] changeStatus status can not be changed");
				 throw new PlatformRuntimeException('invalidstatustransition',[currentStatus, newStatus]);
			}
			Logger.trace("[InvuseObject] changeStatus status changed");
		}

	};
	
});
