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

define("platform/comm/_DeviceConnectivityChecker", [
    "dojo/Deferred", "platform/logging/Logger", "platform/util/DateTimeUtil", "dojo/topic", "platform/store/SystemProperties", "dojo/touch", "dojo/on", "platform/translation/MessageService", "dojo/number", "dojo/_base/array"
], function (Deferred, Logger, DateTimeUtil, topic, SystemProperties, touch, on, MessageService, numberUtil, array) {
    
    var pseudoOfflineModeEnabled = false;
    var networkChangeSubscriber = null;
    return {
        delta: 10, // seconds
        lastTimeConnected: 0,
        noOSLCConnectionErrorTime: 0,
        isConnected: false,
        runningConnect: false,
        connectionType:null,
        //How long to wait after a fail before retrying
        retryInterval: 0,
        connectRunningDeferredWaitlist: [],
        lastOfflineDeviceQueryTime:0,
        
        flushConnectRunningWaitlist: function(shouldResolve, error){
            //if(shouldResolve)
            var self = this;
            array.map(this.connectRunningDeferredWaitlist, function(def){
                def.resolve(shouldResolve);
            });
            this.connectRunningDeferredWaitlist = [];
        },
        
        checkServer: function(deferred){
            var selfE=this;
            var serverCheckTimeout = SystemProperties.getProperty('si.device.servercheck.timeout') || 10000;
            try {
                serverCheckTimeout = numberUtil.parse(serverCheckTimeout);
            }
            catch(e) {
                Logger.trace("Error Converting serverCheckTimeout to number", e);
                serverCheckTimeout = 10000;
            }
            //we can not run connect while it does not return yet
            if(!this.runningConnect){
                this.runningConnect = true;
                //If device has connection then check for WL server using the default time out that is 10 sec
                Logger.trace("INFXDC1024 Calling WL Client Connect");
                Logger.timerStart("[COMM] INFXDC1025 Timer for WL.Client.Connect", 1);
                WL.Client.connect({
                    onSuccess: function(){
                        Logger.trace('[_DeviceCOnnectivityChecker.checkServer] [DEBUG] INFXDC102 checkServer onSuccess ');
                        Logger.timerEnd("[COMM] INFXDC1025 Timer for WL.Client.Connect", 1);
                        selfE.runningConnect = false;
                        selfE.lastTimeConnected = new Date();
                        selfE._reportConnectionStatus(true, deferred);
                        selfE.flushConnectRunningWaitlist(true);
                        Logger.trace("INFXDC1029");
                        
                    },
                    onFailure: function(failureResponse){
                        Logger.traceJSON('[_DeviceConnectivityChecker.checkServer] [DEBUG] INFXDC103 failureResponse onSuccess ', failureResponse);
                        Logger.timerEnd("[COMM] INFXDC1025 Timer for WL.Client.Connect", 1); 
                        selfE.runningConnect = false;
                        selfE._reportConnectionStatus(false, deferred);
                        selfE.flushConnectRunningWaitlist(selfE.isConnected, failureResponse.errorCode);
                        Logger.trace("INFXDC1030");
                    },
                    timeout: serverCheckTimeout
                });
            }else{
                this.connectRunningDeferredWaitlist.push(deferred);
            }
            
        },

        validURL: function(urlString) {
            var pattern = new RegExp("^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{2,4})?(/[-\\w@\\+\\.~#\\?&/=%]*)?$");
  		    return (pattern.test(urlString) == true)? urlString : "";
        },  
        
        checkConnectivityAvailable: function (skipServer) {
                Logger.trace('INFXDC109 CheckConnectivity called');
                
                selfC = this;
                var deferred = new Deferred();
                
                // Added to ensure Anywhere will reconnect to VPN on wake up
                var maximoUrl = selfC.validURL(localStorage.getItem('maximo_url')) + '/ping';
                $.ajax({
                    url : maximoUrl,
                    type : 'get',
                    success : function (data) {
                        Logger.trace('[_DeviceCOnnectivityChecker.checkCOnnectivityAvailable] ping success');
                    },
                    error: function(model, response){ 
                        Logger.trace('[_DeviceCOnnectivityChecker.checkCOnnectivityAvailable] ping error');
                    }
                });

                if(pseudoOfflineModeEnabled){
                     selfC._reportConnectionStatus(false);
                     return deferred.resolve(false);
                }
                
                if (this.retryInterval==0) {
                    this.retryInterval = SystemProperties.getConnectivityTimeoutInterval();
                }
                
                Logger.trace('[_DeviceCOnnectivityChecker.checkCOnnectivityAvailable] [DEBUG] INFXDC100 Retry Interval ' + this.retryInterval);
                
                try {
                    Logger.timerStart("[COMM] Fetching device for connectivity", 1);
                    
                    if (this.noOSLCConnectionErrorTime > 0 && DateTimeUtil.absDifferenceInSeconds(this.noOSLCConnectionErrorTime, new Date()) <= this.retryInterval/1000) {
                          Logger.trace('INFXDC240');
                          Logger.timerEnd("[COMM] Fetching device for connectivity", 1);
                          return deferred.resolve(false);
                    }
                    
                    if (DateTimeUtil.absDifferenceInSeconds(this.lastTimeConnected, new Date()) <= this.delta) {
                          Logger.trace('INFXDC241');
                          skipServer = true;
                    }else{
                        skipServer = false
                    }
                    
                       
                       
                    var cordovaConnectionType =  navigator.connection.type;
                        
                    if (cordovaConnectionType != Connection.NONE && cordovaConnectionType != Connection.UNKNOWN && cordovaConnectionType.toUpperCase() != 'NONE' && cordovaConnectionType.toUpperCase() != 'UNKNOWN') {
                        Logger.trace('INFXDC242: connectionType: ' + cordovaConnectionType);
                        Logger.trace('INFXDC243:');
                                
                        if (skipServer){
                            Logger.trace('INFXDC245:');
                            selfC._reportConnectionStatus(this.isConnected, deferred);
                                   
                        }
                        else {
                            Logger.trace('INFXDC244:');
                            selfC.checkServer(deferred);
                        }
                        
                     }else {
                         var timeDiff = DateTimeUtil.absDifferenceInSeconds(this.lastOfflineDeviceQueryTime, new Date())
                         Logger.trace('INFXDC254: Time difference ' + timeDiff.toString());
                         if(timeDiff >= this.delta){
                             Logger.trace('INFXDC255');
                             navigator.connection.getInfo(function(type){
                                 Logger.trace('INFXDC256');
                                 selfC.lastOfflineDeviceQueryTime = new Date();
                                 navigator.connection.type = type;
                                 Logger.trace('INFXDC256: Actual cordova connection type: ' + type);
                                 if(type.toUpperCase() != 'NONE' && type.toUpperCase() != 'UNKNOWN')
                                 {
                                     Logger.trace('INFXDC257: Actual Cordova connection as true. Check server as needed');
                                     Logger.trace('INFXDC257: Report Actual Cordova connection as true');
                                     if (skipServer){
                                         selfC._reportConnectionStatus(true,deferred);
                                     }else{
                                         selfC.checkServer(deferred);
                                     }
                                        
                                 }else{
                                     Logger.trace('INFXDC257: Report Actual Cordova connection as true');
                                     selfC._reportConnectionStatus(false,deferred);
                                 }
                             });
                         }else{
                             Logger.trace('INFXDC247:');
                             selfC._reportConnectionStatus(false,deferred);
                         }
                         
                                                  
                     }
                    
                } catch (e) {
                    Logger.trace('INFXDC248:');
                    Logger.error('[COMM] Error fetching device connectivity' + e);
                    selfC.noOSLCConnection();
                    deferred.resolve(false);
                }
                
                return deferred.promise;
           
        },
        
        _reportConnectionStatus: function(connectionStatus, deferred) {
            Logger.trace('INFXDC249: connectionStatus: ' + connectionStatus);
              this.isConnected = connectionStatus;
              
              if(pseudoOfflineModeEnabled){
                  Logger.trace('INFXDC250');
                  this.isConnected = false;
              }
              
              Logger.trace('INFXDC260: publishing connection status: ' + connectionStatus);
              topic.publish('isConnected', { 'connected': this.isConnected });
              Logger.timerEnd("[COMM] Fetching device for connectivity", 1);
              Logger.log('[ConnectivityChecker] Server connectivity: ' + connectionStatus);
              if (!connectionStatus){
                  Logger.trace('INFXDC2510');
                  this.noOSLCConnectionErrorTime = new Date();
              }
              
              if (deferred)
                  deferred.resolve(this.isConnected);
        },
        
        noOSLCConnection: function () {
            Logger.trace('INFXDC251');
            this.noOSLCConnectionErrorTime = new Date();
            this.isConnected = false;
        },
        
        resetNoOSLCConnection: function(){
             Logger.trace('INFXDC252');
            this.noOSLCConnectionErrorTime = 0;
            this.isConnected = true;
        },  
        
        isDeviceConnected: function() {
             Logger.trace('INFXDC253');
            return this.isConnected;
        },
        
        pseudoOfflineMode: function(isOffline){
            pseudoOfflineModeEnabled = isOffline;
        },
        
         getPseudoOfflineModeEnabled: function(){
            return pseudoOfflineModeEnabled;
        },

        registerConnectionTypeCheck: function(){
                var self = this;

                window.connectionTypeCheckInterval = setInterval(function(){
                    self.runNetworkCheck(true);

                }, SystemProperties.getConnectivityTimeoutInterval());
            
        },

        runNetworkCheck: function(showMessage){
            var deferred = new Deferred();

            WL.Device.getNetworkInfo(function (networkInfo) {
                        //connectionType: mobile/WIFI
                var connection_type = networkInfo.networkConnectionType.toUpperCase().trim();
                if(window.currentConnectionType !== connection_type){
                    window.currentConnectionType = connection_type;
                    var toastMessage = '';
                    var conMessage = '';
                    if(connection_type === 'MOBILE'){
                        conMessage = MessageService.createStaticMessage('Cellular').getMessage();
                        toastMessage = MessageService.createResolvedMessage('NetworkChanged', [conMessage]);
                    }
                    else if(connection_type === 'WIFI'){
                        conMessage = MessageService.createStaticMessage('WiFi').getMessage();
                        toastMessage = MessageService.createResolvedMessage('NetworkChanged', [conMessage]);
                    }
                    else if(connection_type === ''){
                        toastMessage = MessageService.createStaticMessage('NetworkChangedToOffline').getMessage();
                    }

                    if(toastMessage && showMessage)
                        window.UI.showToastMessage(toastMessage);
                    
                    topic.publish('networkTypeChanged', {'networkType': connection_type});

                    
                }
                deferred.resolve();

                
            });

            return deferred.promise;
        },

        handleNetworkChange: function(){
            var self = this;

            if(!networkChangeSubscriber){
                networkChangeSubscriber = topic.subscribe('networkTypeChanged', function(info){
                    
                    self.handleConnectionsChange(info);

                });
            }
        },

        handleConnectionsChange: function(info){
            var self = this;
            var connectionSel =  SystemProperties.getProperty('connectionSelected');
            if(info.networkType === ''){
                topic.publish('isConnected', { 'connected': false });
                return
            }

            if(connectionSel !== 'All Connection'){
                if(connectionSel === info.networkType){
                    self.pseudoOfflineMode(false);
                    topic.publish('isConnected', { 'connected': true });
                }
                else{
                    self.pseudoOfflineMode(true);
                    topic.publish('isConnected', { 'connected': false });
                }
            }else{
                self.pseudoOfflineMode(false);
                topic.publish('isConnected', { 'connected': true });
            }
        },

    };

});

