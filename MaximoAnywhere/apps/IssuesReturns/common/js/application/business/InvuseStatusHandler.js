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

define("application/business/InvuseStatusHandler", 
["dojo/_base/declare",
 "platform/model/state/MultiLabelStateMachineSupport",
 "platform/model/ModelService",
 "platform/logging/Logger"
 ], function(declare, MultiLabelStateMachineSupport, ModelService, Logger) {
	// TODO validate if user is allowed to perform all the status changes between the 'from' and 'to'
	// FIXME site/org support?
	var thisClass = declare([MultiLabelStateMachineSupport], {		
/**@memberOf application.business.InvuseStatusHandler */
		init: function(modelDataSet){
			var settings = {};
			settings.resourceName = "invuse";
			settings.stateToAlias = {};
			settings.configuration = {
				"ENTERED": ["COMPLETE", "CANCELLED"]
			};
			settings.labelStateConfiguration = MultiLabelStateMachineSupport.fromModelDataSetToLabelStateConfiguration(
					modelDataSet, "value", "maxvalue", "description");
			this.setupMachine(settings);						
		}
	});
	var instance = null;
	var InvuseStatusHandler = {};
	InvuseStatusHandler.getInstance = function(){		
		if(!instance){
			instance = new thisClass({});
			/* this is cached data */
			ModelService.all("domaininvusestatus").then(function(dataSet){
				instance.init(dataSet);
			});					
		}
		return instance;
	};	
	return InvuseStatusHandler;
});
