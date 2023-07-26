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

define("application/business/TaskObject", 
		["application/business/FieldUtil",
		 "application/business/WorkOrderStatusHandler",
		 "platform/logging/Logger",
		 "dojo/Deferred",
		 "platform/warning/PlatformRuntimeWarning",
		 "platform/exception/PlatformRuntimeException"], 
		 function(fieldUtil, WorkOrderStatusHandler, Logger, Deferred, PlatformRuntimeWarning, PlatformRuntimeException) {
	return {
/**@memberOf application.business.TaskObject */
		onInitialize : function(task) {
			fieldUtil.initCompositeField("assetnum", "assetdescription", "assetnumanddescription", task);
			fieldUtil.initCompositeField("location", "locationdescription", "locationanddescription", task);
		},
		onAdd: function(task) {
			
		},
		beforeSave : function(task) {
			
		},
		statusChanged : function(task, newValue, previousValue) {
	         task.set("statusdesc", WorkOrderStatusHandler.getInstance().toDescription(newValue));
		},
		complete: function(task, asofdate, memo) {
			var deferred = new Deferred();
			Logger.trace("[TaskObject.complete] Task " + task['taskid'] + ": change status to COMPLETE...");
			var COMP = WorkOrderStatusHandler.getInstance().toDefaultExternalLabel("COMP");
			var currentStatus = task.get("status");
			if(WorkOrderStatusHandler.getInstance().canPerformTransition(currentStatus, COMP)){
				task.getModelDataSet('wochangestatus')
				.then(function(woChangeStatusSet) {
					task.getParent().openPriorityChangeTransaction();
					var woChangeStatus = woChangeStatusSet.createNewRecord();
					woChangeStatus.set("newstatus", COMP);
					woChangeStatus.setDateValue("asofdate", asofdate);
					woChangeStatus.set("memo", memo);
					task.getParent().closePriorityChangeTransaction();
					Logger.trace("[TaskObject.complete] Task " + task['taskid'] + ": status changed to " + COMP);
					deferred.resolve(task.getOwner().getParent()); // resolves with WO (ModelData)
				})
				.otherwise(function(error) {
					deferred.reject(new PlatformRuntimeWarning('Could not change status to ' + COMP + ' from task ' + task['taskid']));
				})
			}
			else{			
				Logger.trace("[TaskObject.complete] Task " + task['taskid'] + ": status cannot be changed to " + COMP);
				deferred.reject(new PlatformRuntimeWarning('invalidstatustransition',[currentStatus, newStatus]));
			}
			return deferred.promise;
		}
	}
});
