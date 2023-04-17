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

define("platform/auth/ServerAuthenticationProvider", [
	"dojo/_base/lang",
	"dojo/Deferred",
	"platform/logging/Logger",
	"platform/auth/CustomChallengeHandler",
	"platform/auth/WASLTPAChallengeHandler",
	"platform/store/SystemProperties",
	"platform/auth/OfflineLogout",
	"platform/comm/_ConnectivityChecker",
], function(lang, Deferred, Logger, CustomChallengeHandler, WASLTPAChallengeHandler, SystemProperties, OfflineLogout, ConnectivityChecker) {
	
	return {
		
		/**@memberOf platform.auth.ServerAuthenticationProvider */
		CLAZZ: 'platform.auth.ServerAuthenticationProvider',
		
		login: function(user, pwd) {	
			var deferred = new Deferred();
			//var challengeHandler = this._getChallengeHandler();
			Logger.trace('[LOGIN] Getting challenge handler for realm: ' + challengeHandler.REALM, null, this.CLAZZ);
			//challengeHandler.login(user, pwd, deferred);
			var successCallback = function(response){
				deferred.resolve(response);
			}

			var errorCallback = function(error){
				deferred.reject(error);
			}

			WL.Client.login(user,pwd, successCallback, errorCallback)
			
			return deferred.promise;
		},
	
		logout: function() {
			var deferred = new Deferred();
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'logout');
			var self = this;
			Logger.trace('[LOGOUT] Calling WL.Client.logout', null, self.CLAZZ);
			
			var onSuccess = function(){
				deferred.resolve();
			}

			var onFailure = function(error){
				Logger.trace('[LOGOUT]Logout errored out ', error, self.CLAZZ);
				deferred.reject(error);
			}
			
			WL.Client.logout({onSuccess, onFailure});
				
			return deferred.promise;
		},
		
		_logoutCallBack: function(deferred) {
			deferred.resolve(OfflineLogout.logoutWithPromise());
		},
		
		_getChallengeHandler: function() {
			return CustomChallengeHandler;
		},
		
		setCredentials: function(user, pwd) {
			// keep them in the challenge handler
			this._getChallengeHandler().setCredentials(user, pwd);
			Logger.trace('[LOGIN] Credentials set for user: ' + user, null, this.CLAZZ);
		},
		
	};
	
});
