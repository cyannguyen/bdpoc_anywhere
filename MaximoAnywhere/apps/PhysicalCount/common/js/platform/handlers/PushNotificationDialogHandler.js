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

define("platform/handlers/PushNotificationDialogHandler", 
	   [ "dojo/_base/declare",
	     "platform/format/FormatterService",
	     "platform/model/ModelService",
	     "platform/auth/UserManager",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/exception/PlatformRuntimeException",
	     "platform/warning/PlatformRuntimeWarning",
	     "platform/util/PlatformConstants",
	     "platform/store/SystemProperties",
	     "platform/util/DateTimeUtil",
	     "platform/logging/Logger"],
function(declare, formatterService, ModelService, UserManager, ApplicationHandlerBase , PlatformRuntimeException, PlatformRuntimeWarning, PlatformConstants, SystemProperties, DateTimeUtil, Logger) {
	return declare( ApplicationHandlerBase, {
		
/**@memberOf platform.handlers.PushNotificationDialogHandler */

		closeNoRecord: function(eventContext){
			eventContext.ui.hideCurrentDialog();
		},

		resolveMessageProps: function(eventContext) {
			var localPushInfo = eventContext.application.getResource('PlatformTempPushNotification').getCurrentRecord();
			
			var msgProp1 = localPushInfo.get('msgProp1');			
			var msgProp2 = localPushInfo.get('msgProp2');
			var msgProp3 = localPushInfo.get('msgProp3');
			
			if (msgProp1 == undefined || msgProp1 == null)
				msgProp1 = "";
			
			if (msgProp2 == undefined || msgProp2 == null)
				msgProp2 = "";
			
			if (msgProp3 == undefined || msgProp3 == null)
				msgProp3 = "";
			
			return [msgProp1, msgProp2, msgProp3];
		},
		renderOpen: function(eventContext){
			Logger.trace("INFXPN_107: render Open dialog");
			var curTempNotf = eventContext.application.getResource('PlatformTempPushNotification').getCurrentRecord();
			var msgType = curTempNotf.get('msgType');
			
			if(msgType =='alert' || 
					//Need to check and do not show Open button if we're not on the main view
					!eventContext.ui.isPrimaryViewShowing()){
				eventContext.setDisplay(false);
			}
			
		},
		
		openFromMsgHistory: function(eventContext) {
			Logger.trace("INFXPN_108: Openinig from history");
			var curRec = eventContext.application.getResource('osusernotification').getCurrentRecord();
			var jss = JSON.parse(curRec.get('notfeventmessage'));
			
			var resourceForEventSource = SystemProperties.getProperty(curRec.get('eventName')+'_resource');
			//var msgTypeForEventSource = SystemProperties.getProperty(curRec.get('eventName')+'_msgType');
			var transitionToForEventSource = SystemProperties.getProperty(curRec.get('eventName')+'_transitionTo');
			
			var resource = resourceForEventSource;
			var recordId = jss['rdf:about'];
			var transitionTo = transitionToForEventSource;
			Logger.trace("INFXPN_109: recordId" + recordId);
			ModelService.byRef(resource, recordId).then(function(modelDataSet){
//			ModelService.filtered(resource, null, [{wonum: recordId}], null, true, true).then(function(modelDataSet){
					Logger.trace("INFXPN_110: popup history viewHistory after: ModelServiceRef before:manipulating history" + JSON.stringify(eventContext.ui.viewHistory));
					while(eventContext.ui.viewHistory[eventContext.ui.viewHistory.length-1].id != eventContext.application.ui.defaultView){
						Logger.trace("INFXPN_111: popup history viewHistory in:while" + JSON.stringify(eventContext.ui.viewHistory));
						eventContext.ui.viewHistory.pop();
					}
					Logger.trace("INFXPN_112: popup history viewHistory after: ModelServiceRef after:manipulating history" + JSON.stringify(eventContext.ui.viewHistory));
					//eventContext.application.ui.getViewFromId(eventContext.application.ui.defaultView).setQueryBaseIndexByQuery('__search_result__');
					/*var curWoList = eventContext.application.getResource(resource);
					curWoList.setCurrentIndexByRecord(modelDataSet.getCurrentRecord());*/
					eventContext.application.ui.getViewFromId(eventContext.application.ui.defaultView).onlyChangeQueryBaseIndex(PlatformConstants.SEARCH_RESULT_QUERYBASE);
					modelDataSet._queryBases = PlatformConstants.SEARCH_RESULT_QUERYBASE;
					eventContext.application.addResource(modelDataSet);
					eventContext.ui.hideCurrentDialog();
					eventContext.application.ui.show(transitionTo);
						});
		},
		
		renderMsgHistoryItem: function(eventContext) {
			//var resourceForEventSource = SystemProperties.getProperty('resourceForEventSource');
			var jss = eventContext.application.getResource('osusernotification').getCurrentRecord();
			var notDate = new Date(jss.get('notifDate'));
			var enventMsg = JSON.parse(jss.get('notfeventmessage'));
			jss.set('itemnum', enventMsg['oslc:shortTitle']);
			jss.set('itemDesc',enventMsg['dcterms:title']);
			jss.setDateValue('uiDate',notDate);
		},
		
		renderMsgHistory: function(eventContext) {
			var osusernotification = eventContext.application.getResource('osusernotification');
			var appName = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME).toUpperCase().replace(/\s+/g, '');
			//Sorting in memory using date since server sort with notificationid not working properly
			//and date sorting doesn't fit well with jsonstore.
			try{
				osusernotification.data.sort(function(a,b){
					return new Date(b.notifDate) - new Date(a.notifDate);
				})
			}catch(ex){
				
			}
			osusernotification.filter('appid == $1', appName);
			eventContext.application.ui.getViewFromId('Platform.Notifications').lists[0].refresh();
		}
		
	});
});
