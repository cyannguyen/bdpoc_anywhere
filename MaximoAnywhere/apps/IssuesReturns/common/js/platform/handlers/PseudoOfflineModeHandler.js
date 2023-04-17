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

define("platform/handlers/PseudoOfflineModeHandler", 
	   [ "dojo/_base/declare",
	     "application/handlers/CommonHandler",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/exception/PlatformRuntimeException",
	     "platform/warning/PlatformRuntimeWarning",
	     "platform/comm/_ConnectivityChecker",
	      "dojo/dom",
	      "dojo/dom-style",
	      "platform/translation/MessageService",
	      //"platform/auth/UserAuthenticationManager",
	      "platform/model/PushingCoordinatorService"],
function(declare, CommonHandler, ApplicationHandlerBase, PlatformRuntimeException, PlatformRuntimeWarning, ConnectivityChecker, dom, domStyle, MessageService, PushingCoordinatorService) {
	return declare( ApplicationHandlerBase, {
	
		toggleOfflineMode : function(eventContext){ 
			
			setActionLabel = function(textMsg){
				var items = eventContext.ui.getCurrentViewControl().actions.children
				for (var item in items){
	    			if(items[item].artifactId === 'PseudoOffline_goOffline'){
	    				items[item].label.textMsg = textMsg;
	    			}
	    		}
			}

			var disconnectIcon = dom.byId(eventContext.ui.getCurrentViewControl().id+"_disconnect_Image");

			if(!ConnectivityChecker.getPseudoOfflineModeEnabled())
			{
            	
            	eventContext.application.showMessage(MessageService.createResolvedMessage('confirmOfflineSimulation'), function(){
	            	ConnectivityChecker.pseudoOfflineMode(true);
	            	ConnectivityChecker.handleConnectionsChange({networkType: window.currentConnectionType}); //IJ18289
	            	setActionLabel(MessageService.createStaticMessage('disableOfflineMode').getMessage());
	            	ConnectivityChecker._reportConnectionStatus(false)
	            	if (disconnectIcon != null) {
	            		domStyle.set(disconnectIcon, 'visibility', 'visible');
	            	}
            	});
            	

			}else{
				eventContext.application.showMessage(MessageService.createResolvedMessage('confirmSimulationCancelled'), function(){
					ConnectivityChecker.pseudoOfflineMode(false);
	            	setActionLabel(MessageService.createStaticMessage('enableOfflineMode').getMessage());
	            	ConnectivityChecker._reportConnectionStatus(true);
	            	ConnectivityChecker.checkConnectivityAvailable().then(function(isConnected) {
	            		if(isConnected) {
	            			PushingCoordinatorService.ensureFlushComplete();
	            		}
	            	});
	            	if (disconnectIcon != null) {
	            		domStyle.set(disconnectIcon, 'visibility', 'hidden');
	            	}
				});
			}

	
		},

		
	    
	});
});
