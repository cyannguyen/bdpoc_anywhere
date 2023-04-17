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

define("application/handlers/TaskHandler", 
	   [ "dojo/_base/declare",
	     "platform/format/FormatterService",
	     "platform/model/ModelService",
	     "platform/auth/UserManager",
	     "application/handlers/CommonHandler",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/exception/PlatformRuntimeException",
	     "platform/warning/PlatformRuntimeWarning",
	     "platform/util/PlatformConstants",
	     "platform/translation/SynonymDomain",
	     "platform/model/state/MultiLabelStateMachineSupport"],
function(declare, formatterService, ModelService, UserManager, CommonHandler, ApplicationHandlerBase, PlatformRuntimeException, PlatformRuntimeWarning, PlatformConstants, SynonymDomain, MultiLabelStateMachineSupport) {
	return declare( ApplicationHandlerBase, {
	
		/**
	     * This method is dummy and stay here to solve a bug of initialization on app.xml
	     */
/**@memberOf application.handlers.TaskHandler */
		validateTask : function(eventContext){ 
			//do nothing!
	    },
	    
	    /**
	     * This method sort the tasks that is used on TaskLookUp
	     */
	    filterAndSortTasks: function(eventContext){
			var taskSet = CommonHandler._getAdditionalResource(eventContext,'workOrder.tasklist');
			CommonHandler._clearFilterForResource(eventContext,taskSet);
			
			//sort by task id
			ModelService.sort(taskSet, 'taskid asc').then(function(newSet){
				return newSet;
			}).otherwise(function(error){
				Logger.trace("[TaskHandler]: " + error);
			});
		},
		
	});
});
