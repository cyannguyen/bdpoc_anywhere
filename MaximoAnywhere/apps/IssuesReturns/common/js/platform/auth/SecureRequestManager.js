/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2015,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

/**
 * This is a lock object to maintain an order to updates to the local store.  
 */
define("platform/auth/SecureRequestManager",
		["dojo/_base/array",
		 "dojo/_base/lang",
		 "dojo/Deferred",
		 "platform/logging/Logger"], 
		 function(arrayUtil, lang, Deferred, Logger){

	var adaptorRequests = {};
	var lockedRequests = {};
	var authorizationLock = false;
	var _REQUEST_IDENTIFIER = '_Anywhere_ID_';
	var logIdentifier = "INF_SRM_1001";
	var allowedTIme = 10; //mins;
	var idleLock = null;
	//var idleTimeLock = false;
	var idle_time = (new Date()).getTime();
	
	return {
		CLAZZ: 'platform.auth.SecureRequestManager',
		/**
		 * This function allows the platform to keep track or requests sent to the adaptor so upon any reauthorization the 
		 * platfrom can correctly resend the request.  It will also allow requests to be queued to call the adaptor if a an 
		 * earlier request required reauthorization.
		 */
/**@memberOf platform.auth.SecureRequestManager */
		callAdaptor: function(invocationData, options, deferred){
			var promise = deferred.promise;
			var self = this;
			if(!invocationData[_REQUEST_IDENTIFIER]){
				var requestID = new Date().getTime();
				invocationData[_REQUEST_IDENTIFIER] = requestID;
				var requestObject = {requestID: requestID, invocationData: invocationData, options: options, deferred: deferred};
				promise.always(function(result){
					if (result.error != "REQUEST TIMEOUT" && result.errorCode != "UNRESPONSIVE_HOST")
						Logger.trace('SecureRequestManager removing request.  ID =  ' +  requestID);
					if (lockedRequests[requestID]){
						delete lockedRequests[requestID];
					}
					else if (result.error != "REQUEST TIMEOUT" && result.errorCode != "UNRESPONSIVE_HOST") {
						delete adaptorRequests[requestID];
					}
					if(idleLock === requestID){
						idleLock = null;
						if(authorizationLock){
							Logger.trace("Releasing authorization lock after sending first request")
							self._releaseLock();
							self.resendRequestsAfterAuth();
						}
					}
					return result;
				});
				Logger.trace('SecureRequestManager adding request.  ID = ' +  requestID);
				adaptorRequests[requestID] = requestObject;
				if (authorizationLock){
					Logger.trace('SecureRequestManager locked not sending request to adaptor.  ID = ' +  requestID);
					return promise;
				}
			}
			Logger.trace('SecureRequestManager sending request.  ID = ' +  invocationData[_REQUEST_IDENTIFIER]);
			idle_time = (new Date()).getTime();
			WL.Client.invokeProcedure(invocationData, options);
			Logger.trace("[Request][URLBase] " + logIdentifier + "URL BASE: "  + invocationData.parameters[0].url.substr(0, invocationData.parameters[0].url.indexOf('?')),null, 'platform.auth.SecureRequestManager');
			Logger.traceJSON("[Request] " + logIdentifier, invocationData.parameters[0],null, 'platform.auth.SecureRequestManager');
			Logger.trace("[Request][Timeout] " + logIdentifier + "The request timeout set at: " + options.timeout, null, 'platform.auth.SecureRequestManager');
			
			return promise;
		},

		determineIfIdleTimeHasElapsed: function(invocationData) {
			if(!invocationData[_REQUEST_IDENTIFIER]){
				var requestID = new Date().getTime();
				var curTime = (new Date()).getTime();
				if(curTime > (idle_time + (allowedTIme * 60000)) ){
					Logger.trace("15 min elapsed with no request. Forcing reauthorization");
					this.enableAuthLock();
					idleLock = requestID;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},

		hasPendingRequest: function(){
			return (Object.keys(lockedRequests).length > 0);
		},
		
		resendRequestsAfterAuth: function(sessionID){
			arrayUtil.forEach( Object.keys(lockedRequests), function(requestID){
				var requestObject = lockedRequests[requestID];
				var invocationData = requestObject.invocationData;
				if (sessionID){
					invocationData.parameters[0]['sessionid'] = sessionID;
				}
				Logger.trace('SecureRequestManager resending request.  ID = ' +  requestID);
				WL.Client.invokeProcedure(invocationData, requestObject.options);
			});
	        lockedRequests = {};
		},

		_releaseLock : function(){
			if (authorizationLock){
				Logger.trace('SecureRequestManager auth lock relesased');
				authorizationLock = false;
				lang.mixin(lockedRequests, adaptorRequests);
				adaptorRequests = {};
			}
			
		},
		
		authorizationSuccessful: function(){
			this._releaseLock();
		},
		
		enableAuthLock: function(){
			Logger.trace('SecureRequestManager LOCKED for authorization');
			authorizationLock = true;
			lockedRequests = adaptorRequests;
			adaptorRequests = {};
		},
		
		isAwaitingReauth: function(invocationData){
			if(authorizationLock && invocationData[_REQUEST_IDENTIFIER]){
				var requestID = invocationData[_REQUEST_IDENTIFIER];
				return typeof lockedRequests[requestID] !== 'undefined';
			}
			return false;
		},
		
		isAuthLocked: function(){
			return authorizationLock;
		},
		
		authorizationFailed: function(errorObject){
			this.idle_time = 0;
			this._releaseLock();
			arrayUtil.forEach( Object.keys(lockedRequests), function(requestID){
				var requestObject = lockedRequests[requestID];
				Logger.trace('SecureRequestManager rejecting request.  ID = ' +  requestID);
				requestObject.deferred.reject(errorObject);
			});
	        lockedRequests = {};
		},
		
	    clearLock: function(){
	        authorizationLock = false;
	        adaptorRequests = {};
	        lockedRequests = {};
	    }
	};
});
