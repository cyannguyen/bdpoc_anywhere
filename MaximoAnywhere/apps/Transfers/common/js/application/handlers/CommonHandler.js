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

define("application/handlers/CommonHandler",
		["platform/model/ModelService"], function(ModelService) {
		return {
		
		//Reusable method: Clear filter for a specific resource
/**@memberOf application.handlers.CommonHandler */
		_clearFilterForResource : function(self, resource) {
			if(resource && resource.isFiltered()) {
				resource.clearFilterAndSort();
			}
		},
		
		//Reusable method: Returns a reference to a specific resource
		_getAdditionalResource : function(self ,resourceName) {
			return self.application.getResource(resourceName);
		},
		
		//Reusable method: Get ItemSetId related to a Site on the Inventory resource
		_getItemSetIdForSiteId : function(self, siteid, additionalInventory) {
			var inventorySet = additionalInventory.find('siteid == $1', siteid);
			return (inventorySet.length > 0) ? inventorySet[0].get('itemsetid') : null;
		},
		
		//Reusable method: Apply a filter on Inventory for a specific item 
		_filterAdditionalInventoryByItemnum : function(self ,additionalInventory, itemnum) {
			this._clearFilterForResource(self, additionalInventory);				
			additionalInventory.filter('itemnum == $1', itemnum);
		},
			
		//Reusable method: Clear all record of a set
		_clearAll : function(recSet){
			recSet.deleteLocalAll();
			ModelService.save(recSet);
		}
		
	};
});
