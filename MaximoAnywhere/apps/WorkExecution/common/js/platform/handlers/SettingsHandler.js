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

define("platform/handlers/SettingsHandler", 
	   [ "dojo/_base/declare",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/store/SystemProperties",
	 	"platform/model/SystemDataManager",
		 "platform/util/PlatformConstants",
		 "platform/comm/_ConnectivityChecker",
		 "platform/comm/CommunicationManager",
		 "dojo/topic"],
function(declare, ApplicationHandlerBase, SystemProperties, SystemDataManager, PlatformConstants, ConnectivityChecker, CommunicationManager, topic) {
	return declare( ApplicationHandlerBase, {
		name: 'SettingsHandler',
		connectionNames: {"All Types": "All Connection", "Only WiFi": "WIFI", "Only Cellular": "MOBILE"},
		
/**@memberOf platform.handlers.SettingsHandler */
		refreshAdditionalData: function(eventContext){
			this.application.log("STUB: refreshAdditionalData");
		},
		
		updateFieldValue: function(eventContext) {
			eventContext.checkBoxWidget.set('checked', SystemProperties.getDownloadAttachmentsSetting());
		},

		updateSettingsValue: function(eventContext) {
			var newValue = !!eventContext.checkBoxWidget.get('value');
			if(SystemProperties.getProperty('si.adminmode') && SystemProperties.getProperty('si.adminmode') == "false"){
				SystemProperties.setProperty("downloadAttachments", newValue, true);
			} else {
						SystemProperties.setProperty(PlatformConstants.BULK_ATTACH_DOWNLOAD, newValue, true);
					} 
			
		},
		
		downloadSystemData: function(eventContext) {
			eventContext.application.ui.hideCurrentDialog();
			SystemProperties.setProperty('wasDeltaLastSystemDataDownload', false, true);
			SystemProperties.setProperty(PlatformConstants.SYS_DATA_DOWNLOADED_FLAG, false, true);
			SystemDataManager.downloadSystemDataIfNeeded(true);
			
		},
		
		renderDownloadSytemDataActionButton: function(eventContext) {
			
			ConnectivityChecker.checkConnectivityAvailable().
			then(function(isConnectionAvailable){
				if(!isConnectionAvailable){
					eventContext.setDisplay(false);
				}
			});
			
			
		},
		confirmSystemDataDeltaDownload: function(eventContext) {
			eventContext.application.ui.hideCurrentDialog();
			SystemProperties.setProperty('wasDeltaLastSystemDataDownload', true, true);
			SystemProperties.setProperty(PlatformConstants.SYS_DATA_DOWNLOADED_FLAG, false, true);
			SystemDataManager.downloadSystemDataIfNeeded(true);
		},
		
		closeDialogAndShowDefaultViewIfNeeded: function(eventContext) {
			eventContext.application.ui.hideCurrentDialog();
		},
		
		openDownloadSystemDataDialog: function(eventContext) {
			var doDelta = SystemProperties.getProperty('System.data.delta.support');
			
			if((doDelta && (doDelta == true || doDelta == 'true')) ){
				eventContext.application.ui.show("Platform.LoadSystemDataDeltaDownload");
			} else {
				this.downloadSystemData(eventContext);
			}
			
		},
		
		renderDayToSYnc: function(eventContext) {
			var LastADDownloadSet = eventContext.application.getResource("LastADDownload");
			var currLastADDownload = LastADDownloadSet.getCurrentRecord();
			var daysToSync = SystemProperties.getProperty('numberOfDaysToSync');
			currLastADDownload.set('numberOfDaysToSync', daysToSync ? daysToSync : 30);
			
		},

		saveDayToSync: function(eventContext) {
			
			var LastADDownloadSet = eventContext.application.getResource("LastADDownload");
			var currLastADDownload = LastADDownloadSet.getCurrentRecord();
			var daysToSync = currLastADDownload.getPendingOrOriginalValue('numberOfDaysToSync');
			
			SystemProperties.setProperty('numberOfDaysToSync', daysToSync, true);
			
		},

		connetionManagementSetting: function(eventContext) {

			var matchedNetwork = eventContext.artifactId.match(/(wifi)|(cellular)|(all)/i);
			var connectionSetting = "";
			
			if (matchedNetwork) {
				switch (matchedNetwork[0].toUpperCase()) {
					case 'WIFI':
					connectionSetting = "Only WiFi";
					break;
					case 'CELLULAR':
					connectionSetting = "Only Cellular";
					break;
					// ALL
					default:
					connectionSetting = "All Types";
				}
			}
			else {
				// something went wrong, forcing all types
				connectionSetting = "All Types";
			}
			var networkInfoPromise = null;
			

			SystemProperties.setProperty('connectionSelected', this.connectionNames[connectionSetting], true);
			window.ConnectionType = this.connectionNames[connectionSetting];

			if(window.ConnectionType === 'All Connection'){
				if(window.connectionTypeCheckInterval){
					clearInterval(window.connectionTypeCheckInterval);
					window.connectionTypeCheckInterval = null;
				}
				ConnectivityChecker.handleConnectionsChange({'networkType' :window.currentConnectionType});
			}else{
				ConnectivityChecker.handleNetworkChange();
				ConnectivityChecker.runNetworkCheck().then(function(){
					ConnectivityChecker.handleConnectionsChange({'networkType' :window.currentConnectionType});
				});
				//If network change checker is not regieterd...start it
				if(!window.connectionTypeCheckInterval){
					networkInfoPromise = ConnectivityChecker.registerConnectionTypeCheck();
				}
			}
			
			eventContext.radiobutton.domNode.firstElementChild.firstElementChild.checked = true
		},

		renderConnetionManagementSetting: function(eventContext){
            var connectionSel =  SystemProperties.getProperty('connectionSelected');
            
            var matchedNetwork = eventContext.artifactId.match(/(wifi)|(cellular)|(all)/i);
			
			if (matchedNetwork) {
				switch (matchedNetwork[0].toUpperCase()) {
					case 'ALL':
						if (connectionSel === 'All Connection' || !connectionSel) {
							eventContext.radiobutton.domNode.firstElementChild.firstElementChild.checked = true
						}
					break;
					case 'WIFI':
						if (connectionSel === 'WIFI') {
							eventContext.radiobutton.domNode.firstElementChild.firstElementChild.checked = true
						}
					break;
					case 'CELLULAR':
						if (connectionSel === 'MOBILE') {
							eventContext.radiobutton.domNode.firstElementChild.firstElementChild.checked = true
						}
					break;
					default:
					// do nothing
				}
			}
        },
		
	});
});
