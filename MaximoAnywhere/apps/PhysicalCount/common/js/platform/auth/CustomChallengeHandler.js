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

define("platform/auth/CustomChallengeHandler", [ 
	"dojo/_base/lang",
	"dojo/Deferred",
    "dojo/topic",
	"platform/logging/Logger",
	"platform/handlers/SSOHandler",
	"platform/auth/SecureRequestManager",
	"platform/comm/_ConnectivityChecker"
	
], function(lang, Deferred, topic, Logger, SSOHandler, SecureRequestManager, ConnectivityChecker) {
	//WL.Client.removeGlobalHeader causes issue on Windows
	if (WL.Client.getEnvironment() != WL.Environment.WINDOWS8 ){
		//These two WL.Client lines are solving security warning got on AppScan for ios
		if(WL.Client.removeGlobalHeader && WL.Client.addGlobalHeader){
			WL.Client.removeGlobalHeader();
			WL.Client.addGlobalHeader('Cache-Control', 'no-store, no-cache');	
		}
	}
	
	var CUSTOM_AUTH_REALM_NAME = 'CustomAuthenticationRealm';
	//WL.Client.login(CUSTOM_AUTH_REALM_NAME);
	var customChallengeHandler = WL.Client.createChallengeHandler(CUSTOM_AUTH_REALM_NAME);
	var _username = null;
	var _password = null;
	var UserAuthenticationManager = null;
	var SystemProperties = null;
	var WL_TIMEOUT_MAX_ATTEMPTS = 3;
	
	require(["platform/auth/UserAuthenticationManager", "platform/auth/ServerAuthenticationProvider", "platform/store/SystemProperties"], 
			function(_UsrAuthManager, _SrvAuthProvider, _SysProps) {
				UserAuthenticationManager = _UsrAuthManager;
				ServerAuthenticationProvider = _SrvAuthProvider;
				SystemProperties = _SysProps;
			}
	);
	
	return lang.mixin(customChallengeHandler, {
			
		/* CUSTOMIZERS
		 * If you plan on writing your own CustomChallengeHandler
		 * override these next methods with a mixin.
		 */
		
		/*
		 * evaluates the response from server, if authStatus is returned, 
		 * then, we determine if this is a response from CustomAuthenticatorRealm.
		 */
/**@memberOf platform.auth.CustomChallengeHandler */
		isCustomResponse: function(response) {
			if(response) {
				// Vyshantha - LA-Fix #RTC 346937 - Case TS002764297 : APAR IJ20068 : Begin
				var responsePwdHidden = response;
				if (responsePwdHidden != undefined) {
					if (responsePwdHidden.request != null && responsePwdHidden.request != undefined) {
						if (responsePwdHidden.request.body != null && responsePwdHidden.request.body != undefined) {
							if (responsePwdHidden.request.body.indexOf('changePassword') !== -1) {
								var oldPwd = "", newPwd = "", parameterWithPwdVisible = [];
								if (responsePwdHidden['request']['options']['parameters']['parameters'] != undefined) {
									parameterWithPwdVisible = JSON.parse(responsePwdHidden['request']['options']['parameters']['parameters']);
									oldPwd = parameterWithPwdVisible[0]['payload']['spi:passwordinput'];
									parameterWithPwdVisible[0]['payload']['spi:passwordinput'] = "********";
									newPwd = parameterWithPwdVisible[0]['payload']['spi:passwordcheck'];
									parameterWithPwdVisible[0]['payload']['spi:passwordcheck'] = "********";
									responsePwdHidden['request']['options']['parameters']['parameters'] = '"' + JSON.stringify(parameterWithPwdVisible) + '"';
									responsePwdHidden.request.body = responsePwdHidden.request.body.replace(oldPwd, "********");
									responsePwdHidden.request.body = responsePwdHidden.request.body.replace(newPwd, "********");
								}
								if (responsePwdHidden['request']['parameters']['parameters'] != undefined) {
									parameterWithPwdVisible = JSON.parse(responsePwdHidden['request']['parameters']['parameters']);
									parameterWithPwdVisible[0]['payload']['spi:passwordinput'] = "********";
									parameterWithPwdVisible[0]['payload']['spi:passwordcheck'] = "********";
									responsePwdHidden['request']['parameters']['parameters'] = '"' + JSON.stringify(parameterWithPwdVisible) + '"';
								}
							}
							if (responsePwdHidden.request.body.indexOf('password=') !== -1) {
								var bodyAttrWithPwd = responsePwdHidden['request']['body'];
								responsePwdHidden['request']['body'] = bodyAttrWithPwd.split("&")[0] + "&password=********&" + bodyAttrWithPwd.split("&")[2] + "&" + bodyAttrWithPwd.split("&")[3];
							}
						}
					}
				}
				Logger.traceJSON("[CustomChallengeHandler] is CustomResponse INFXCCH100 client", responsePwdHidden);
				// Vyshantha - End
			}

			if(!response || !response.responseJSON) {
				Logger.trace('[CustomChallangeHandler.isCustomResponse] false - no response or no JSON response');
				return false;
			}
			if (this.isAuthenticating && response.responseJSON.authStatus == 'required' && response.request
					&& response.request.parameters && response.request.parameters.realm == CUSTOM_AUTH_REALM_NAME){
				//This means either WL.Client.Login or WL.Client.Logout was called during login (or relogin) and
				// the response is returning authstatus required.  To prevent a waitList hang in worklight code
				//just return false.
				Logger.trace('[CustomChallangeHandler.isCustomResponse] false - WL.Client.Login response');
				return false;
			}
			if(response.responseJSON.authStatus && response.request && response.request.parameters && response.request.parameters.adapter == "OSLCGenericAdapter" || 
					(UserAuthenticationManager._isServerLoginFailure(response) && !UserAuthenticationManager.isCachingUserInfo())){
				Logger.trace('[CustomChallangeHandler.isCustomResponse] true ' + 
						(response.responseJSON.authStatus ? 'authStatus: ' + response.responseJSON.authStatus:' _isServerLoginFailure'));
				return true;
			}
			else {
				Logger.trace('[CustomChallangeHandler.isCustomResponse] false');
				return false;
			}
		},
		
		/*
		 * Send Login credentials to your authentication service, you are passed a user and password from the login form
		 * 
		 * ATTN: You do not return a response to this method, you resolve or reject the passed in deferred thread
		 * based on the asynchronous response from the server.
		 * 
		 * If you override this method, don't forget to indicate that you're in the middle of authentication
		 * by setting and checking the isAuthenticating boolean to handle possible multiple threads.
		 * 
		 */
		login: function(user, pwd, deferred) {
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'login');
			Logger.trace("INFXCCH1400 Called Login")
			this.isAuthenticating = true;
			var self = this;
			var sysPropDeferred = SystemProperties.loadPlatformProperties();
			var wlTimeoutAttempts = 0;
			if (user && pwd) {
				sysPropDeferred.always(function(){
					self.getLoginOptions(user, pwd)
					.then(lang.hitch(self, function(loginOptions) {
						Logger.trace('CustomChallengeHandler login calling submitLoginForm');
						var loginOptionsPwdHidden = lang.clone(loginOptions);
						loginOptionsPwdHidden.parameters.password = '********';
						Logger.traceJSON('[LOGIN] Sending login request with Login options: ', loginOptionsPwdHidden, clazzmethod);
						var resubmit = true; 
						var afterSubmit = function(response) {
							Logger.trace('CustomChallengeHandler.afterSubmit');
							if(response){
								// Vyshantha - LA-Fix #RTC 346937 - Case TS002764297 : APAR IJ20068 : Begin
								var responsePwdHidden = response;
								if (responsePwdHidden != undefined) {
									if (responsePwdHidden.request != null && responsePwdHidden.request != undefined) {
										if(responsePwdHidden['request']['options'] != undefined) {
											if (responsePwdHidden['request']['options']['parameters'] != undefined) {
												responsePwdHidden['request']['options']['parameters']['password'] = "********";
											}
										}
										if (responsePwdHidden['request']['parameters'] != undefined)
											responsePwdHidden['request']['parameters']['password'] = "********";
										if (responsePwdHidden.request.body != null && responsePwdHidden.request.body != undefined) {
											if (responsePwdHidden.request.body.indexOf('password=') !== -1) {
												var bodyAttrWithPwd = responsePwdHidden['request']['body'];
												responsePwdHidden['request']['body'] = bodyAttrWithPwd.split("&")[0] + "&password=********&" + bodyAttrWithPwd.split("&")[2] + "&" + bodyAttrWithPwd.split("&")[3];
											}
										}
									}
								}
								Logger.traceJSON("[CustomChallengeHandler] is CustomResponse INFXCCH101 client", responsePwdHidden);
								// Vyshantha - End
							}
							if(self._isAuthenticated(response)) {
								Logger.trace("INFXCCH112")
								Logger.trace('[LOGIN] User ' + user + ' successfully authentication against realm "' + self.REALM + '"', null, clazzmethod);								
								self.isAuthenticating = false;
								wlTimeoutAttempts = 0;
								deferred.resolve(response);
							}
							else if (resubmit && (response['responseJSON'] && response['responseJSON']['challenges'] && response['responseJSON']['challenges']['wl_antiXSRFRealm']) || response.status == '500'){
								//This is the XSRF error.  So call the client login to get the token needed to get past this
								//The submit the login again
								//WL.Client.login(CUSTOM_AUTH_REALM_NAME);
								Logger.trace("INFXCCH113");
								Logger.trace('[CustomChallengeHandler] XSRF chanllenge, re-connecting to MF Server...');
								self.connectMFServer()
								.then(function() {
									Logger.trace('[CustomChallengeHandler] XSRF chanllenge resolved, re-connected to MF Server!');
									resubmit = false;
									self.submitLoginForm(self.getAuthURL(), loginOptions, lang.hitch(self,afterSubmit));
								})
								.otherwise(function(error) {
									Logger.trace('[CustomChallengeHandler] XSRF chanllenge not resolved, re-connected to MF Server failed!');
									self.isAuthenticating = false;
									deferred.reject(error);
								});						
							}
							else if (!self.isAuthenticating && resubmit && response['responseJSON'] && response['responseJSON']['oslcError'] && response['responseJSON']['oslcError'] == "401" && response.status == '200'){
								//This is the a session timeout error.  So call the client login to get the token needed to get past this
								//The submit the login again to avoid display the login view
								Logger.trace("INFXCCH114");
								Logger.trace("Clearing credentials");
								self.setCredentials(null, null);
								Logger.trace('[CustomChallengeHandler] Returned a 401 oslcError');
								var responseError = self._parseAuthenticationError(response);
								self.isAuthenticating = false;
								deferred.reject(responseError);
							}
							else if (response['responseJSON'] && response['responseJSON']['errorCode'] == WL.ErrorCode.REQUEST_TIMEOUT) {
								//We've reached the WL timeout (initOptions.js), commonly caused by some network latency
								//Try to resend login request again
								Logger.traceJSON('[CustomChallengeHandler] response.responseJSON.errorCode: ' + WL.ErrorCode.REQUEST_TIMEOUT, response);
								if(wlTimeoutAttempts < WL_TIMEOUT_MAX_ATTEMPTS) {
									wlTimeoutAttempts++;
									Logger.trace('[CustomChallengeHandler] Timeout attempt #' + wlTimeoutAttempts);
									Logger.trace('[CustomChallengeHandler] Trying to re-connect to MF Server...');
									self.connectMFServer()
									.then(function() {
										Logger.trace('[CustomChallengeHandler] Re-connected to MF Server successfully! Submiting a new login request...');
										resubmit = false;
										Logger.trace("Setting the wlTImeout to max timeout attempts");
										wlTimeoutAttempts = WL_TIMEOUT_MAX_ATTEMPTS; 
										self.submitLoginForm(self.getAuthURL(), loginOptions, lang.hitch(self,afterSubmit));
									})
									.otherwise(function(error) {
										Logger.traceJSON('[CustomChallengeHandler] Re-connecting to MF Server failed!');
										self.isAuthenticating = false;
										deferred.reject(error);
									});
								}
								else {
									Logger.trace('[CustomChallengeHandler] Exceeded max timeout attempts "' + wlTimeoutAttempts + '", WL_TIMEOUT_MAX_ATTEMPTS is ' + WL_TIMEOUT_MAX_ATTEMPTS);
									self.isAuthenticating = false;
									deferred.reject("lostconnection");
								}
							}
							else{
								Logger.trace("INFXCCH115");
								Logger.traceJSON('[CustomChallengeHandler] Unknown authentication error: ', response);
								Logger.traceJSON('[CustomChallengeHandler] Unable to authenticate, unknown error:', response);
								var responseError = self._parseAuthenticationError(response);
								self.isAuthenticating = false;
								deferred.reject(responseError);
							}
						};
						Logger.trace('[CustomChallengeHandler.login] CHALLENGE HANDLER submitLoginForm call: ' + (new Date()));
						self.connectMFServer().then(function(){
							self.submitLoginForm(self.getAuthURL(), loginOptions, lang.hitch(self,afterSubmit));
						}).otherwise(function(error){
							self.isAuthenticating = false;
							deferred.reject(error);
						});
					}));
				});
			} else {
				Logger.trace('[CustomChallengeHandler.login] Either Username or Password or both are empty, please re-try with required credentials');
			}
		},
		
		/*
		 * CUSTOMIZERS: End of methods to override with your mixin
		 */
		
		/* invoked by WL authentication framework always when isCustomResponse returns true
		 */
		handleChallenge: function(response) {
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'handleChallenge');
			Logger.trace("INFXCCH1001 ENtering handleChallenge");
			if (response.request)
				Logger.trace("handleChallenge url: " + response.request.url);
			var self = this;	
			require(["platform/boot/main/Main"], function(Main) {
				if (!window.UI) {
					//Gotta load up the app for the SSO case where the ChallengeHandler fires before the Startup.js
					new Main().start();
				}
							
				//Go get the username from the potential SSO Handler
				var mySSOHandler = window.UI.application["platform.handlers.SSOHandler"];
				var userName = mySSOHandler.retrieveUserNameFromSSO(); 
				userName.then(function(userName) {
					//To support SSO-type authentication store off the username
					if (userName) {
						_username = userName;
						
					}	
					var authStatus = response.responseJSON && response.responseJSON.authStatus;
					if (authStatus){
						Logger.trace('[LOGIN] authStatus: ' + authStatus, null, clazzmethod);
					}
					//Assuming reverse proxy if authStatus is undefined and not a _isServerLoginFailure
					var needToLogin =  _username && ((authStatus == 'required' || UserAuthenticationManager._isServerLoginFailure(response)) || !authStatus);
					if(needToLogin) {
						
						// MM improve memory utilizaiton 
						//Logger.trace('[CustomChallangeHandler.handleChallenge] challenge request: ' + JSON.stringify(response.request.body));
						Logger.trace("INFXCCH109");
						var prevAuth = UserAuthenticationManager.previouslyAuthenticated();
						if(!self.isAuthenticating) {
							SecureRequestManager.enableAuthLock();
							Logger.trace('[LOGIN] Start realm authentication for user ' + _username, null, clazzmethod);
							var authDeferred = new Deferred();
							Logger.trace("INFXCCH109");
							UserAuthenticationManager._realmAuthentication(_username, _password, prevAuth, authDeferred, null);
							authDeferred
							.then(lang.hitch(self, function(response) {
								Logger.trace('[LOGIN] User ' + _username + ' successfully authenticated, processing waiting list request', null, clazzmethod);
								//In the SSO Case where the challenge handler fires first, we might need to setup the application
								if (window.UI.application.isSSOEnabled() && mySSOHandler.needsLogin())
								{
									Logger.trace("INFXCCH108");
									mySSOHandler.afterLogin(true);	
								}
								if(SecureRequestManager.hasPendingRequest()){
									Logger.trace("INFXCCH106");
									this.submitFailure(); //Seems weird but doing this to prevent WL from resending requests with invalid credentials.
									SecureRequestManager.resendRequestsAfterAuth(UserAuthenticationManager._getSessionId());
								}
								else{
									//Something other than SecureRequestManager made the request so submit success to promise with be resolved.
									Logger.trace("INFXCCH107");
									this.submitSuccess();
								}
							}))
							.otherwise(lang.hitch(self, function(response) {
								if(response){
									Logger.traceJSON("[CustomChallengeHandler] is CustomResponse INFXCCH102", response);
								}
								var errorResponse = UserAuthenticationManager._handleAuthenticationError(response, prevAuth, authDeferred.promise);
								if (errorResponse.errorCode != 'reAuthError'){
									Logger.trace('[LOGIN] Call to _realmAuthentication failed.', null, clazzmethod);
									SecureRequestManager.authorizationFailed(errorResponse);
								}
								else {
								    SecureRequestManager.clearLock();
								}
								this.submitFailure();
							}));
						}
						else if (UserAuthenticationManager.isCachingUserInfo()){
							//Just in case an auth error happens while fetching the user data.  Error everything out so the app isn't hung
							Logger.trace("[CustomChallengeHandler] UserAuthenticationManager.isCachingUserInfo() INFXCCH104");
								
							if (response && response.responseJSON){
								response['invocationResult'] = response.responseJSON;
								Logger.traceJSON("[CustomChallengeHandler] UserAuthenticationManager.isCachingUserInfo() INFXCCH105", response);
							}
							SecureRequestManager.authorizationFailed(response);
							self.submitFailure();
						}
						else {
							Logger.trace('[CustomChallangeHandler.handleChallenge] waiting for authentication response...');
						}
						
					}
					else if(authStatus == self.COMPLETE) {
						Logger.trace('[CustomChallangeHandler.handleChallenge] submitSuccess()');
						self.submitSuccess();
					} else {
						Logger.trace('[CustomChallangeHandler.handleChallenge] submitFailure()');
						SecureRequestManager.authorizationFailed(response);
						self.submitFailure();
					}
				}).
				otherwise(function(error) {
					Logger.trace('[CustomChallangeHandler.handleChallenge] no username is set yet');					
				});
			});
		},
		
		
		getAuthURL: function() {
			return this.CUSTOM_AUTH_URL;
		},
		
		getLoginOptions: function(user, pwd) {
			// keep credentials up-to-date
			_username = user;
			_password = pwd;
			var langcode = WL.App.getDeviceLocale().replace('_','-');
			var deferred = new Deferred();
			SystemProperties.getAuthType()
			.then(function(authType) {
				 var options = {
						 parameters: {
							 'username': user,
							 'password': pwd,
							 'authType': authType,
							 'langcode': langcode
					}
				 };
				 deferred.resolve(options);
			});
			return deferred.promise;
		},
		
		setCredentials: function(user, pwd) {
			_username = user;
			_password = pwd;
		},
		
		
		
		getRealmName: function() {
			return this.REALM;
		},
		
		logout: function(deferred, logoutCallBack) {
			var realm = this.getRealmName();
			//Adding timeout due to MobileFirst bug if logout request has an unexpected error.
			var timeout = (WLJSX.Ajax.WLRequest.options.timeout || SystemProperties.getConnectivityTimeout());
			timeout += 5000;  //Pad to allow MobileFirst timeout to do it's job
			var logoutTimer = window.setTimeout(function(){
				Logger.error('Logout from ' + realm + ' timed out.');
				deferred.reject('logout-timeout');
			}, timeout);
			WL.Client.logout(realm, {
				onSuccess: function() {					
					window.clearTimeout(logoutTimer);
					Logger.trace('Logout from ' + realm + ' completed');
					logoutCallBack(deferred);
				},
				onFailure: function(error) {
					// MM improve memory utilization remove json.stringify object 
					Logger.errorJSON('Logout from ' + realm + ' failed, error: ', error);
					window.clearTimeout(logoutTimer);
					logoutCallBack(deferred);
				}
			});
		},
		
		isAuthenticating: false,
		REALM: CUSTOM_AUTH_REALM_NAME,
		CUSTOM_AUTH_URL: 'my_custom_auth_request_url',
		COMPLETE: 'complete',
		
		/*
		 *  evaluates the response from server to parse the error
		 *  RETURNS the authentication error as a JSON style object for logging
		 */
		_parseAuthenticationError: function(response) {
			var responseError = null; 
			if(response && response.responseJSON) {
				responseError = {
						responseJSON: {
							oslcError: response.responseJSON.oslcError ? response.responseJSON.oslcError : 'null oslcError',
							oslcMaxUserURL: response.responseJSON.oslcMaxUserURL ? response.responseJSON.oslcMaxUserURL : 'null oslcMaxUserURL',
							nosetcookie: response.responseJSON.nosetcookie ? response.responseJSON.nosetcookie : false
						},
						status: response.status ? response.status : 'null status'
				};
			}
			else {
				responseError = {
						responseJSON: {
							oslcError: 'null oslcError',
							oslcMaxUserURL: 'null oslcMaxUserURL',
							nosetcookie: false,
						},
						status: response.status ? response.status : 'null status'
				};
			}
			return responseError;
		},
		
		/*
		 *  evaluates the response from server, determines if we are authenticated already
		 */
		_isAuthenticated: function(response) {
			var isAuthenticated = false;
			if(response && response.responseJSON && response.responseJSON.authStatus) {
				isAuthenticated=(response.responseJSON['authStatus'] == this.COMPLETE) ? true : false;
			}
			return isAuthenticated;
		},
		
		connectMFServer: function() {
			var deferred = new Deferred();
			ConnectivityChecker.checkConnectivityAvailable().then(function(connection){
				if(connection){
					Logger.trace("[CONNECT] SUCCESSFULL connecting to MobileFirst Server");
					WL.Client.login(CUSTOM_AUTH_REALM_NAME);
					deferred.resolve();
				}else{
					deferred.reject("lostconnection");
				}
				
			});
			return deferred.promise;
		}
	});
	
});
