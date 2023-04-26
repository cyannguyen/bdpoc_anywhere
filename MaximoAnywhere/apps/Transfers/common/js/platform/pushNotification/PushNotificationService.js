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

define("platform/pushNotification/PushNotificationService",
["dojo/_base/declare",
 "dojo/Deferred",
 "dojo/_base/lang",
 "dojo/_base/array",
 "platform/model/ModelService",
 "platform/logging/Logger",
 "platform/util/PlatformConstants",
 "dojo/topic",
 "platform/store/SystemProperties"
 ], 
function(declare, Deferred, lang, arrayUtil, ModelService,Logger, PlatformConstants, topic, SystemProperties) {
	// needed to keep here because of UT
	(function(){
		if(typeof WL === "undefined"){
			WL = {};
			WL.Client.Push={};
			WL.Client.Push.prototype.onReadyToSubscribe = function(){ };
			WL.Client.Push.prototype.registerEventSourceCallback = function(alias, adapter, eventSource, callback){ onSuccess(); };
			
		}
		/*if (WL.Client.Push) {	
			WL.Client.Push.onReadyToSubscribe = function() {
				WL.Client.Push.registerEventSourceCallback(
					"myPush", 
					"PushAdapter", 
					"PushEventSource", 
					function(){alert();});
			};
			
		}*/
	})();

	allowPushNotificationDialog = true;
	topic.subscribe(PlatformConstants.ALLOW_PUSH_NOTIFICATION, function(){
		allowPushNotificationDialog = true;
		if(showNotif && notifications_counter){
			showNotif();
		}
	});

	topic.subscribe(PlatformConstants.BAN_PUSH_NOTIFICATION, function(){
		allowPushNotificationDialog = false;
	});

	notifications_counter = 0;

	showNotif = null;
		
	return declare(null, {
		
		_custonDoSubscribeSuccess: null,
		_custonDoSubscribeFailure: null,
		
/**@memberOf platform.pushNotification.PushNotificationService */
		setCustonDoSubscribeSuccess: function(custonDoSubscribeSuccess){
			this._custonDoSubscribeSuccess = custonDoSubscribeSuccess;
		},
		setCustonDoSubscribeFailure: function(custonDoSubscribeFailure){
			this._custonDoSubscribeFailure = custonDoSubscribeFailure;
		},
		 
		 //-------------------------------Subscribe user to receive push notifications
		 
		 doSubscribe: function(eventSourceAlias) {
			
			let success = this._custonDoSubscribeSuccess ? this._custonDoSubscribeSuccess : this.doSubscribeSuccess;
			let failure = this._custonDoSubscribeFailure ? this._custonDoSubscribeFailure : this.doSubscribeFailure;

			let options = {};
			let self = this;
      	 	options.onSuccess = function(resp){
      	 		Logger.trace("INFX_PNS_106: Maximo api key received");
				//resp;
				pushnotification.subscribeEventwithApiKey(WL.StaticAppProps.WORKLIGHT_BASE_URL, resp.invocationResult.apikey, eventSourceAlias,success, failure);    

				let failureL = function() {
					Logger.trace("INFX_PNS_105: Error calling push notification listner");
				};
				let  successL = function(message) {
					Logger.trace("INFX_PNS_105: Success calling push notification listner");
				};
				pushnotification.listen(true,self.pushNotificationReceived, failureL);
				pushnotification.getBackgroundMessages(successL,failureL);
        	};
        	
        	options.onFailure = function(err){
        		Logger.trace("INFX_PNS_107: Error to retrieve maximo api key");
            	return err;
        	}
			let resp2 = WL.Client.getApiKey(options);
			
				
	},
	
	eventsArray: null,
	pushEventIndex: 0,
	apiKey: null,
	subscribeForEvents: function(pushEvents) {
		var self = this;
		let success = self._custonDoSubscribeSuccess ? self._custonDoSubscribeSuccess : self.doSubscribeSuccess;
		let failure = self._custonDoSubscribeFailure ? self._custonDoSubscribeFailure : self.doSubscribeFailure;

		let options = {};
		self.eventsArray = pushEvents;
  	 	options.onSuccess = function(resp){
  	 		self.apiKey = resp.invocationResult.apikey;
  	 		Logger.trace("INFX_PNS_106: Maximo api key received");
  	 		var index = 0;
  			pushnotification.subscribeEventwithApiKey(WL.StaticAppProps.WORKLIGHT_BASE_URL, resp.invocationResult.apikey, self.eventsArray[0], lang.hitch(self, success), lang.hitch(self, failure));
			let failureL = function() {
				Logger.trace("INFX_PNS_105: Error calling push notification listner");
			};
			let  successL = function(message) {
				Logger.trace("INFX_PNS_105: Success calling push notification listner");
			};
			pushnotification.listen(true,self.pushNotificationReceived, failureL);
			pushnotification.getBackgroundMessages(successL,failureL);
    	};
    	
    	options.onFailure = function(err){
    		Logger.trace("INFX_PNS_107: Error to retrieve maximo api key");
        	return err;
    	}
    	
    	let resp2 = WL.Client.getApiKey(options);
    },
			
		laterDisplayNotification: function(){
			var deferred = new Deferred();
			ModelService.all('PlatformTempPushNotification', null).then(
					function(modelDataSet) {
							var tempDowntimeResource = modelDataSet.getCurrentRecord();
							if(tempDowntimeResource && tempDowntimeResource.get('afterLogin')){
								tempDowntimeResource.set('afterLogin',false);
								ModelService.save(modelDataSet).then(
										function(){
											deferred.resolve(true);
										});
									
								} else {
									deferred.resolve(false);
								}
							});
			return deferred.promise;
		},
			
		doSubscribeSuccess: function() {
			var self = this;
			Logger.trace("INFX_PNS_108: Application success subscribe to push notifications");
			if(self.pushEventIndex < self.eventsArray.length) {
				pushnotification.subscribeEventwithApiKey(WL.StaticAppProps.WORKLIGHT_BASE_URL, self.apiKey, self.eventsArray[self.pushEventIndex++], lang.hitch(self, self.doSubscribeSuccess), lang.hitch(self, self.doSubscribeFailure));
			}
		},

		doSubscribeFailure: function(err) {
			var self = this;
			Logger.trace("INFX_PNS_109: Application got error ro subscribe for push notifications" + err);
			if(self.pushEventIndex < self.eventsArray.length) {
				pushnotification.subscribeEventwithApiKey(WL.StaticAppProps.WORKLIGHT_BASE_URL, self.apiKey, self.eventsArray[self.pushEventIndex++], lang.hitch(self, self.doSubscribeSuccess), lang.hitch(self, self.doSubscribeFailure));
			}
		},
			
		//------------------------------Subscribe to a tag notification
		doTagSubscribe: function(tagName) {
				WL.Client.Push.subscribeTag( tagName, {
					onFailure : this.tagSubscriptionError,
					onSuccess: this.tagSubscriptionSuccess});
		},

		tagSubscriptionError: function(response) {
			alert("tag Error " + response.errorMsg);
		},

		tagSubscriptionSuccess: function(success) {
				alert("Tag Success " );
		},
		
		//------------------------------- Unsubscribe ---------------------------------------
		doUnsubscribe: function() {
			let options = {};
			let self = this;
      	 	options.onSuccess = function(resp){
      	 		Logger.trace("INFX_PNS_106: Maximo api key received");
				
				pushnotification.unsubscribewithApiKey(WL.StaticAppProps.WORKLIGHT_BASE_URL, resp.invocationResult.apikey, self.doUnsubscribeSuccess, self.doUnsubscribeFailure);    
        	};
        	
        	options.onFailure = function(err){
        		Logger.trace("INFX_PNS_107: Error to retrieve maximo api key");
            	return err;
			}
			
			WL.Client.getApiKey(options);
			
			// WL.Client.Push.unsubscribe("myPush", {
			// 	onSuccess: this.doUnsubscribeSuccess,
			// 	onFailure: this.doUnsubscribeFailure
			// });
		},

		doUnsubscribeSuccess: function() {
			//alert("doUnsubscribeSuccess");
		},

		doUnsubscribeFailure: function() {
			//alert("doUnsubscribeFailure");
		},
		//tag Unsubscribe
		doTagUnsubscribe: function(tagName) {
			WL.Client.Push.unsubscribeTag( tagName, {
				onFailure : this.doTagUnsubscribeFailure,
				onSuccess: this.doTagUnsubscribeSuccess});
		},
		
		doTagUnsubscribeSuccess: function() {
			alert("doTagUnsubscribeSuccess");
		},

		doTagUnsubscribeFailure: function() {
			alert("doTagUnsubscribeFailure");
		},
		
		//---------------------default method to receive notification and send to all device os specific User 	
		pushNotificationReceived : function(props, payload) {
			Logger.trace("INFX_PNS_100: Calling model Service all");
			

			payload = props;

			ModelService.all('PlatformTempPushNotification', null).then(
				function(modelDataSet) {
						var tempDowntimeResource  = modelDataSet.createNewRecord();
						Logger.trace("INFX_PNS_101: model Service all return");
						tempDowntimeResource.set('recordId',payload['rdf:about']);
						tempDowntimeResource.set('resource',SystemProperties.getProperty(payload.notificationmeta.eventname + '_resource'));
						tempDowntimeResource.set('msgType',payload.msgType);
						tempDowntimeResource.set('transitionTo',SystemProperties.getProperty(payload.notificationmeta.eventname + '_transitionTo'));
						tempDowntimeResource.set('title',payload['oslc:shortTitle']);
						

						var dataHandler = WL.application.getNotificationDataHandler();
						if(dataHandler){
							var handlerFunc = lang.hitch(WL, dataHandler)
							handlerFunc(payload, showRecord);
						}else{
							var description = [];
							msgSize = 0;
						    
						    for(var field in payload){
						    	   
						    	   if(field != 'notificationmeta' && field != '_rowstamp' && field != 'rdf:about' && msgSize <3){
						    		   
						    		   description.push(payload[field])
						    		   msgSize++;
						    	   }
						    }

						    tempDowntimeResource.set('description' , description.join(' | '));
						}

						modelDataSet.resourceID = 'PlatformTempPushNotification';
						WL.application.addResource(modelDataSet);

						if(WL.application.ui.getCurrentView().id != "platform.LoginView"){
							Logger.trace("INFX_PNS_102: current view:" + WL.application.ui.getCurrentView().id);
							tempDowntimeResource.set('afterLogin',false);
							ModelService.save(modelDataSet).then(
								function() {
									Logger.trace("INFX_PNS_104: About to show Push dialog");
									if(allowPushNotificationDialog){
										WL.application.ui.getCurrentView().parentControl.showNotificationIcon(modelDataSet);
										WL.application.ui.getCurrentView().parentControl.showNotificationModal(modelDataSet);
									}
									
								});	
						} else {
							Logger.trace("INFX_PNS_103:");
							tempDowntimeResource.set('afterLogin',true);
							ModelService.save(modelDataSet);/*.then(
								function() {
									WL.application.ui.show('Platform.PushNotificationDialog');
								});*/
						}

						});
			},

			
			
			
			//--------------------send notification from Device
			sendNotificaiton: function (adapterName, adapterMethod, notificationEventSource, userId, message)
			{

				var invocationData= {
						adapter:	adapterName,
						procedure:	adapterMethod,									
						parameters: [adapterName,notificationEventSource, userId, message]	
				};


				WL.Client.invokeProcedure(invocationData, {
					onSuccess: function(response) {
						//alert("Success");
					},
					onConnectionFailure: function(response) {
						alert("Connection Fail");
					},
					onFailure: function(response) {
						alert("Fail");
					}
				});

			}
	
		
	
	});
});
