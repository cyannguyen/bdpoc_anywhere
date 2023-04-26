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

define("platform/auth/OfflineLogout",
      ["dojo/_base/lang",
       "platform/logging/Logger",
       "dojo/Deferred"
       ],
function(lang, Logger, Deferred) {
	function expireSessionId(){
		var sessionId = WL.CookieManager.getJSessionID();
		var expires = new Date(1970,0,1,12,12,12).toGMTString();
		document.cookie = "JSESSIONID=" + sessionId +"; expires=" + expires + "; path=/"; 
		WL.CookieManager.clearCookies();
	};
	return {		
		/**@memberOf platform.auth.OfflineLogout */
		CLAZZ: 'platform.auth.OfflineLogout',
		
		logoutWithPromise: function(){
			var deferred = new Deferred();
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'logoutWithPromise');
			self = this;
			Logger.trace("[LOGOUT] Offline logout", null, this.CLAZZ);
			if(typeof cordova === "undefined") {
				/* browser behavior */
				expireSessionId();
				deferred.resolve();
			}
			else{
				if(WL.Client.getEnvironment() != WL.Environment.PREVIEW) {
					WL.CookieManager.clearCookies({
						onSuccess:function(){},
						onFailure: function(){}
					});
				    if (WL.Client.getEnvironment() == 'windows8') {
				        WL.App.getServerUrl(
                            // success
                            function (serverUrl) {
                                Logger.trace("[LOGOUT] server url = " + serverUrl, null, clazzmethod);
                                var cm = new Windows.Web.Http.Filters.HttpBaseProtocolFilter().cookieManager;
                                var cookieJar = cm.getCookies(new Windows.Foundation.Uri(serverUrl));
                                for(var i=0; i<cookieJar.length; i++){
                                    var cookie = cookieJar[i];
                                    //Logger.trace('Removing Cookie: {' + cookie.name + ': ' + cookie.value + '}');
                                    cm.deleteCookie(cookie);
                                }
                                Logger.trace('[LOGOUT] Offline Logout cookie removal succeeded.', null, clazzmethod);
                                deferred.resolve();
                            },
                            // failure
							function () {
							    Logger.trace("[LOGOUT] Offline Logout failed.  could not get server url", null, clazzmethod);
							    deferred.reject("Offline Logout - failed");
							}
					    );

				    }
				    else {
						cordova.exec(
								function() { 
									Logger.trace("[LOGOUT] Offline Logout - completed", null, clazzmethod);
									deferred.resolve(); 
								}, 
								function() { 
									Logger.trace("[LOGOUT] Offline Logout - failed", null, clazzmethod); 
									deferred.reject("Offline Logout - failed"); 
								}, 
								"OfflineLogoutPlugin", 
								"logout", []
						);
				    }
				}
				else{
					/* browser behavior */
					expireSessionId();
					deferred.resolve();
				}				
			}
			return deferred.promise;
		}
	};
});
