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

define("platform/auth/UserAuthenticationManager", [
    "exports",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/promise/all",
    "dojo/topic",
	"platform/auth/ServerAuthenticationProvider",
	"platform/logging/Logger",
	"platform/translation/MessageService",
	"platform/comm/ConnectionHeartBeat",
	"platform/auth/UserRolesManager",
	"platform/auth/UserManager",
	"platform/auth/UserSessionHelper",
	"platform/model/ModelService",
	"platform/util/CurrentTimeProvider",
    "platform/ui/control/BusyIndicator",
    "platform/model/AdditionalDataManager",
    "platform/model/WorklistDataManager",
    "platform/util/runOrRejectWithError",
    "platform/comm/_ConnectivityChecker",
    "platform/store/_StoreProvider",
    "platform/store/_ResourceMetadataContext",
    "platform/store/PersistenceManager",
    "platform/store/SystemProperties",
    "platform/auth/AdminModeManager",
	"platform/auth/SecureRequestManager",
	"platform/geolocation/GeoLocationTrackingService",
], function(thisModule, lang, Deferred, all, topic, ServerAuthenticationProvider, Logger, MessageService, ConnectionHeartBeat, UserRolesManager, UserManager, userSessionHelper, ModelService,
		CurrentTimeProvider, BusyIndicator, AdditionalDataManager, WorklistDataManager, runOrRejectWithError, ConnectivityChecker, StoreProvider,ResourceContext, PersistenceManager,
		SystemProperties, AdminModeManager, SecureRequestManager, GeoLocationTrackingService){


	var currentUser = null;
	var currentUserSite = null;
	var password = null;
	var sessionid = null;
	var userIdentity = null;
	var cachingUserInfo = false;
	var previousInvalidSession  = false;
	var reauthInProgress = false;

	/*
	 * Causing nls errors, at this point, the message service is not initialized yet:
	 * ApplicationUIBuilder.js --> LoginHandler.js --> UserAuthenticationManager.js
	 */
	//var invalidLoginMsg = MessageService.createStaticMessage('Invalid user credentials.').getMessage();
	//var invalidFirstLoginMsg = MessageService.createStaticMessage('Unable to authenticate on server for first authentication').getMessage();
	//var unableLoginMsg = MessageService.createStaticMessage('Unable to authenticate user on both server and locally').getMessage();
	//var errorLoadingInfoMsg = MessageService.createStaticMessage('Error loading user information.').getMessage();
	//var errorLoadingServerClockMsg = MessageService.createStaticMessage('Error loading clock server.').getMessage();

	// TODO research on better solutions, eg, cache the first msg label for the second round, anyways it is not a very big concern.
 	function invalidLoginMsg() {
		return MessageService.createStaticMessage('Invalid user credentials.').getMessage();
	}
 	function invalidServerConnection() {
		return MessageService.createStaticMessage('serverunreachable').getMessage();
	}
	function invalidFirstLoginMsg() {
		return MessageService.createStaticMessage('Unable to authenticate on server for first authentication').getMessage();
	}
	function unableLoginMsg() {
		return MessageService.createStaticMessage('Unable to authenticate user on both server and locally').getMessage();
	}
	function errorLoadingInfoMsg() {
		return MessageService.createStaticMessage('Error loading user information.').getMessage();
	}
	function errorLoadingServerClockMsg() {
		return MessageService.createStaticMessage('Error loading clock server.').getMessage();
	}
	function passwordExpiredMsg() {
		return MessageService.createStaticMessage('Your password has expired, and you are required to change it.').getMessage();
	}
	function maximoUnavailableMsg(){
		return MessageService.createStaticMessage('Could not connect to maximo server.').getMessage();
	}
	function mfpUnavailableMsg(){
		return MessageService.createStaticMessage('Could not connect to mobilefirst server').getMessage();
	}
	function deployAdapterMsg(){
		return MessageService.createStaticMessage('Adapters not found. Please make sure all adapters are deployed on the mobile first server.').getMessage();
	}
	function requestTimeoutMsg(){
		return MessageService.createStaticMessage('Login request timed out. Make sure the server is running and accessible').getMessage();
	}

	function setSessionId(thisObj, newSessionId) {
		sessionid = newSessionId;
		//If running from test send the test the sessionid
		if ('testSessionCallback' in thisObj){
			thisObj['testSessionCallback'](sessionid);
		}
	}

	function setPassword(thisObj, newPassword) {
		password = newPassword;

		//If running from test send the test the password
		if ('testPasswordCallback' in thisObj){
			thisObj['testPasswordCallback'](password);
		}
	}

	function setUserIdentity(thisObj, newUserIdentity) {
		userIdentity = newUserIdentity;
		//If running from test send the test the password
		if ('testUserIdentityCallback' in thisObj){
			thisObj['testUserIdentityCallback'](userIdentity);
		}
	}

	lang.mixin(thisModule, {
		reLoginError : null,

/**@memberOf platform.auth.UserAuthenticationManager */
		CLAZZ: 'platform.auth.UserAuthenticationManager',

		authState: {
			authenticatedLocally: false,
			server_auth: null,
			password_change: false,
			connected: null,
			error:null
		},

		relogin: function(user, pwd){
			SecureRequestManager.enableAuthLock();
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'relogin');
			var deferred = new Deferred();
			var self = this;
			deferred.promise.then(function(){
				BusyIndicator.ignoreTimeout = false;
				reauthInProgress = false;
			});
			if (!user){
				user = currentUser;
			}
			if (!pwd){
				pwd = password;
			}
			self.authState.connected = false;
			self.authState.server_auth = null;
			ConnectivityChecker.checkConnectivityAvailable(true).
			then(function(isConnectionAvailable) {
				if(isConnectionAvailable){
					self.authState.connected = true;
					var timeout = SystemProperties.getConnectivityTimeout();
					self._serverAuthentication(user, pwd, timeout).then(function(response){
						//open/initialize the local store
						Logger.log("{RELOGIN] Successfully relogged in to server", 1);
						self.authState.server_auth = response;
						self.authState.error = null;
						SecureRequestManager.authorizationSuccessful();
						if(password != pwd){
							var oldPassword = password;
							password = pwd;
							StoreProvider._changePassword(user, oldPassword, pwd).then(function(){
								Logger.trace('[RELOGIN] Changed password for JSONStore', null, clazzmethod);
								self._cacheUserInfo(deferred);
							}).otherwise(function(error){
								Logger.error('[RELOGIN] Failed to change password on store: ' + JSON.stringify(error), null, clazzmethod);
								self.authState.authenticatedLocally = false;
								self._handleAuthenticationError(error, true);
								deferred.reject(error);
							});
						}
						else{
							self._cacheUserInfo(deferred);
						}
					}).otherwise(function(error){
						var errorResponse = error;
						Logger.errorJSON('[RELOGIN] Failed to login to server: ',  error, clazzmethod);
						if (error.responseJSON && error.responseJSON['oslc:Error']){
							var oslcError = error.responseJSON['oslc:Error'];
							if(oslcError['oslc:statusCode'] == "403"){
								errorResponse = {};
								errorResponse['oslcError'] = oslcError['oslc:statusCode'];
								errorResponse['relogin'] = true;
								errorResponse['loginFailed'] = true;
								errorResponse['errorMsg'] = oslcError['oslc:message'];
								errorResponse['username'] = currentUser;
								errorResponse['password'] = password;
								errorResponse['oslcMaxUserURL'] = oslcError['spi:user']['rdf:resource'];
							}
						}
						self._handleAuthenticationError(errorResponse, true);
						SecureRequestManager.authorizationFailed(errorResponse);
						deferred.reject(errorResponse);
					});
				}else{
					Logger.trace('[RELOGIN] Failed to login.  No connection. ',  null, clazzmethod);
					var error = {errorCode : 'lostconnection', errorMsg : 'lostconnection'};
					deferred.reject(error);
					SecureRequestManager.authorizationFailed(error);
				}
			});

			return deferred.promise;
		},

		login: function(user, pwd, timeout){
			timeout = 5000;
			this.reLoginError = null;
			var deferred = new Deferred();
			var self = this;
			if (pwd.indexOf("ssouser") > -1) {
				setSessionId(this, localStorage.getItem("ltpaToken2"));
			}
			if (user && pwd) {
				currentUser = user;
				password = pwd;
				BusyIndicator.ignoreTimeout = true;
				deferred.promise.then(function(){
					Logger.timerEnd("UserAuthenticationManager - login");
					BusyIndicator.ignoreTimeout = false;
					reauthInProgress = false;
				});
				ConnectivityChecker.checkConnectivityAvailable(true).
				then(lang.hitch(this, function(isConnectionAvailable) {
					if(isConnectionAvailable){
						self.authState.connected = true;
						self._serverAuthentication(user, pwd, timeout).then(function(response){
							//open/initialize the local store
							console.log("Successfully logged in");
							self.authState.server_auth = response;
							self.authState.error = null;
							password = pwd;
							self._localAuthentication(user, pwd).then(function(result){
								deferred.resolve(self.authState);
							}).otherwise(function(error){
								//Server passed and local failed? Is it a password change or a new user
								if (error.error && error.error.recoverPassword){
									self.authState.authenticated = false;
									self.authState.error = error.error;
									deferred.reject(self.authState);
									return;
								}
								var response = {};
								self._initializeLocalStorage(true).then(function(result){
									response.response = result
									response.authenticated = true;
									self._cacheUserInfo(deferred);
								}).otherwise(function(error){ //Something wrong with json store initializing new credentials
									self.authState.error = error;
									deferred.reject(self.authState);

								})
							})

						}).otherwise(function(error){//server auth failed maybe due to timeout or change password or somethin else
							self.authState.authenticated = false;
							self.authState.server_auth = error;
							self.authState.error = error;

							//Only if its a timeout error, do local authentication
							if(error.error === 'REQUEST TIMEOUT'){
								self.authState.connected = false;
								self._localAuthentication(user, pwd).then(function(result){
									//Work Offline
									deferred.resolve(self.authState);
								}).otherwise(function(result){
									//Show login page and login failure message
									deferred.reject(self.authState);
								});
							}else{
								//Check if password expired. Show change password screen
								if(error.error && error.error.status && error.error.status  === 403){
									var expiredPasswordInfo = {'loginFailed' : true};
									if (error.responseJSON && error.responseJSON['oslc:Error']){
										var oslcError = error.responseJSON['oslc:Error'];
										expiredPasswordInfo.errorMsg = oslcError['oslc:message'];
										expiredPasswordInfo.oslcMaxUserURL = oslcError['spi:user']['rdf:resource'];
									}
									self.authState.password_change = expiredPasswordInfo ;
									deferred.reject(self.authState);
								}
								else{
									deferred.reject(self.authState);
								}
							}

						});

					}else{
						self.authState.connected = false;
						self.authState.server_auth = {authenticated : false};
						//No connection available. Try authenticating locally
						self._localAuthentication(user, pwd).then(function(){
							deferred.resolve(self.authState);
							//Locall passed. Continue working offline.
						}).otherwise(function(result){
							deferred.reject(self.authState);
							//Local failed. Show login page and login failure message
						});
					}

				}));
			} else {
				dfd.reject(invalidLoginMsg());
			}

			return deferred.promise;
		},

		/*
		 * Realm authentication give us the benefit to use WL.Client.isUserAuthenticated()
		 * Once the user is authenticated in the realm WL framework is notified about
		 * UserIdentity (token).
		 */
		_serverAuthentication: function(user, pwd, timeout) {
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_realmAuthentication');
			this.reLoginError = null;
			Logger.trace('[LOGIN] REALM AUTHENTICATION FOR USER: ' + user, null, this.CLAZZ);
			var self = this;
			//need to skip the server check in case there's an authenticating proxy
			var options = {
				'baseUrl': WL.StaticAppProps.WORKLIGHT_BASE_URL,
				'username': user,
				'password':pwd,
				'timeout':timeout
			}
			var dfd = new Deferred();
			var callbacks = {
				onSuccess: function(response){
					dfd.resolve(response);
				},

				onFailure: function(error){
					dfd.reject(error);
				}
			}

			if (window.WkWebView && window.WkWebView.flushWKWebview) {
				window.WkWebView.flushWKWebview().then ( function() { 
					WL.Client.login(options, callbacks);
				});
			} else {
				WL.Client.login(options, callbacks);	
			}

			return dfd.promise;
			//return ServerAuthenticationProvider.login(user, pwd)

		},

		_localAuthentication: function(user, pwd){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_localAuthentication');
			var self = this;
			var dfd = new Deferred();
			Logger.trace('[LOGIN] LOCAL AUTHENTICATION for user: ' + user, null, this.CLAZZ);
			if (user && pwd) {
				// collect the credentials to handle challenges
				ServerAuthenticationProvider.setCredentials(user, pwd);

				var credentials = {username: user, password: pwd};
				credentials.authenticated = (this.authState.server_auth && this.authState.server_auth.authenticated);
				var response = {}
				PersistenceManager.activateCollectionsOrFail(credentials).then(function(result){
					self.authState.authenticatedLocally = true;
					response.authenticated = true;
					response.response = result;
					self._cacheUserInfo(dfd);
					//dfd.resolve(response);
					ConnectionHeartBeat.initialize();

				}).otherwise(function(result){
					self.authState.authenticatedLocally = false;
					response.authenticated = false;
					response.error = result;
					response.response = result;
					dfd.reject(response);

				});
			} else {
				Logger.trace('[LOGIN] Either Username or Password or both are empty, please re-try with required credentials', null, clazzmethod);
				dfd.reject(invalidLoginMsg());
			}

			return dfd.promise;

		},

		noSessionChangePassword	: function(username, currentpassword, newpassword, confirmnewpassword, oslcMaxUserURL){
			var deferred = new Deferred();
			this.reLoginError = null;
			var self = this;
			ConnectivityChecker.checkConnectivityAvailable().
			then(lang.hitch(this, function(isConnectionAvailable){
				if(isConnectionAvailable){
					var invocationData;
					if(oslcMaxUserURL.match("triMyProfileRS") != null){
						invocationData = {
								adapter:	'OSLCGenericAdapter',
								procedure:	'noSessionChangePassword',
								parameters: [{payload: {
										"spi:Password":newpassword
									},
									url: oslcMaxUserURL + "?USERNAME=" + username + "&PASSWORD=" + currentpassword
								}]
							};
						}
					else{
						invocationData = {
						procedure:	'noSessionChangePassword',
						parameters: [{"username" : username, "password" : currentpassword,
									 "payload": {"spi:passwordinput":newpassword, "spi:passwordcheck":confirmnewpassword, "spi:forceexpiration":false},
									 "url": oslcMaxUserURL}]
						};
					}

					WL.Client.invokeProcedure(invocationData, {
						onSuccess: lang.hitch(this, function(response) {
							setPassword(this, newpassword);
							self.changeStoredPassword(currentpassword).then(function(){
								self.relogin(username, newpassword).then(function(){
									deferred.resolve();
								}).otherwise(function(error){
									deferred.reject(error);
								});
							}).otherwise(function(error){
								deferred.reject(error);
							});
						}),
						onConnectionFailure: lang.hitch(this, function(response) {
							deferred.reject(MessageService.createStaticMessage('Cannot change password offline.').getMessage());
						}),
						onFailure: lang.hitch(this, function(response) {
							//IJ26394
							var message;
							try{
								message = response.invocationResult["oslc:Error"]["oslc:message"];
								var index = message.indexOf(' - ')
								if (index >= 0) {
									message = message.substr(index + 3)
								}
							}
							catch(error){
								message = MessageService.createStaticMessage('Password change failed.').getMessage();
							}
							deferred.reject(message);
							//deferred.reject(MessageService.createStaticMessage('Password change failed.').getMessage());
						})
					});
				}else{
					deferred.reject(MessageService.createStaticMessage('Cannot change password offline.').getMessage());
				}
			}));
			return deferred.promise;
		},

		changePassword: function(currentpassword, newpassword, confirmnewpassword){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'changePassword');
			var deferred = new Deferred();
			var self = this;
			this.reLoginError = null;
			var oslcUrl = SystemProperties.getProperty('si.auth.oslcUrl');
			var authType = SystemProperties.getProperty('si.auth.type');
			// before anything else, do a connectivity check
			ConnectivityChecker.checkConnectivityAvailable().
			then(lang.hitch(this, function(isConnectionAvailable){
				if(isConnectionAvailable){
					if(currentpassword!=password){
						deferred.reject(MessageService.createStaticMessage('Password change failed.').getMessage());
						return;
					}

					// then do change password
					var resource = ResourceContext.getResourceMetadata("userInfo");
					var queryBase = Object.keys(resource.queryBases)[0];

					ModelService.all("userInfo", queryBase).then(function(userInfoSet){
						var invocationData;
						Logger.trace('[LOGIN] si.auth.type: ' + authType, null, clazzmethod);
						if(authType == 'tririga'){

								invocationData= {
									adapter:	'OSLCGenericAdapter',
									procedure:	'changePassword',
									parameters: [{payload: {"spi:Password":newpassword},url:oslcUrl}]

										};
						}
						else{
							if (oslcUrl==null)
								oslcUrl = "http://dummyhost:000/maximo/oslc/os/oslcmaxuser/";

							invocationData= {
									procedure:	'changePassword',
									parameters: [{payload: {"spi:passwordinput":newpassword, "spi:passwordcheck":confirmnewpassword},url:oslcUrl+userInfoSet.getRecordAt(0).maxuserid}]
							};
						}
						WL.Client.invokeProcedure(invocationData, {
							onSuccess: lang.hitch(this, function(response) {
								StoreProvider._changePassword(currentUser, currentpassword, newpassword).
								always(function(){
									password = newpassword;
									deferred.resolve();
								});
							}),
							onConnectionFailure: lang.hitch(this, function(response) {
								deferred.reject(MessageService.createStaticMessage('Cannot change password offline.').getMessage());
							}),
							onFailure: lang.hitch(this, function(response) {
								var message = 'Password change failed.';
								if(response && response.invocationResult && response.invocationResult.errors){
									var error = response.invocationResult.errors[0];
									if (error["oslc:message"]){
										message = error["oslc:message"].slice(13);
									}
								}
								deferred.reject(MessageService.createStaticMessage(message).getMessage());
							})
						});

					});

				}else{
					deferred.reject(MessageService.createStaticMessage('Cannot change password offline.').getMessage());
				}
			}));


			return deferred.promise;
		},

		changeStoredPassword: function(oldpassword){
			var deferred = new Deferred();
			var storageDeferred = new Deferred();

			//change the password in JSONStore (either the encryption itself or the encrypted pw)
			var currentPassword = password;
			setPassword(this, oldpassword);
			var self = this;
			var response = {};
			this._initializeLocalStorage(false).then(function(result){
				setPassword(self, currentPassword);
				response.response = result;
				StoreProvider._changePassword(currentUser, oldpassword, password).
				then(function(){
					response.authenticated = true;
					self._cacheUserInfo(deferred);
				}).
				otherwise(function(err){
					response.authenticated = false;
					self.authState.authenticatedLocally = false;
					deferred.reject(err);
				});
			})
			.otherwise(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		},

		resetDataStore: function(){
			StoreProvider.reset().then(lang.hitch(this, function(){
				this.logout();
			}));
		},

		_setUpUserData: function(userInfoSet, deferred){
			var userData = userInfoSet.getCurrentRecord();
			var groups = userData.getLoadedModelDataSetOrNull('groupList');
			var deferreds = [];

			if(groups)
			{
				deferreds.push(this._loadDataToUserRolesManager(groups));
			}
			deferreds.push(this._loadDataToUserManager(userData));

			all(deferreds).
			then(function() {
				cachingUserInfo = false;
				deferred.resolve();
			}).
			otherwise(function() {
				cachingUserInfo = false;
				deferred.reject();
			});
		},



		_handleServerAuthenticationFailure: function(user, pwd, result, isRelogin, deferred) {
			if (this._isServerLoginFailure(result)){
				Logger.trace('[LOGIN] Invalid server credentials for user ' + user, null, this.CLAZZ);
				deferred.reject( invalidLoginMsg() );

			} else if (isRelogin){
				//MM improve memory utilization remove json.stringify
				//Logger.log('Failed to reauthenticate user ' + user + ': ' + JSON.stringify(result));
				deferred.resolve();

			} else {
				Logger.trace('[LOGIN] Unable to authenticate user ' + user + ' on server', null, this.CLAZZ);
				//this._localAuthentication(user, pwd, deferred);
				deferred.reject( invalidFirstLoginMsg() );
			}
		},

		_handleAuthenticationError: function(response, isRelogin, promise){
			if(response){
				Logger.traceJSON("[INFXAM132] _handleAuthenticationError ", response);
			}

			if (response && response.oslcError && response.oslcError ==  'null oslcError'){
				Logger.trace('[LOGIN] Sending oslcServerDown ' + response, null, this.CLAZZ);
				//this._oslcServerDown();

				if (!isRelogin){
					this._oslcServerDown();
				}
				else{
					ConnectivityChecker.noOSLCConnection();
				}

				return {errorCode : 'oslcServerDown', errorMsg : 'oslcServerDown'};
			}

			var loginErrorMessage = invalidLoginMsg();
			if (this.authState.authenticatedLocally){
		    	BusyIndicator.ignoreTimeout = false;
			}

			if (response && response == "lostconnection"){
				//In case of lost connectiion, just error the queued requests and keep sessionid.
				Logger.trace('[UserAuthenticationManager._handleAuthenticationError] received lostconnect when authenticating.', null, this.CLAZZ);
				return {errorCode : 'lostconnection', errorMsg : 'lostconnection'};
			}
			var errorObject = {'username' : currentUser , 'localPassword' : password };
			var error;
			if(!response || typeof response =='string'){
				error = {'relogin':isRelogin, 'error' : (response?response:'')};
			}
			else{
				error = response;
			}
			errorObject['error'] = error;

			if(this._isServerLoginFailure(response) || !isRelogin){
				Logger.trace('[UserAuthenticationManager._handleAuthenticationError] publishing reAuthError.');
				topic.publish('reAuthError', errorObject);
				return {errorCode : 'reAuthError'};
			}
			else{
				ConnectivityChecker.noOSLCConnection();
				return {'error' : error};
			}
		},



		_retrieveUserAccessData: function(deferred){
			this._cacheUserInfo(deferred);
		},

		_isServerLoginFailure: function(result){
			if (result.errorCode == 'AUTHENTICATION REQUIRED'){
				return true;
			}
			//If there's no invocationResult or responseJSON, a proxy server has stopped us before MobileFirst
			if (!result.invocationResult && !result.responseJSON && (result.status=="401" || result.status=="302" || result.status =="301")) {
				Logger.trace("[LOGIN] UserAuthenticationManager: detected 401 perhaps your proxy token has expired, clearing session to force relogin", null, this.CLAZZ);
				//Detected proxy response on expired token, need to force relogin
				return true;
			}
			var statusCode = result.oslcError;
			if (!statusCode){
				var errorResult = null;
				if (result['invocationResult']){
					errorResult = result['invocationResult'];
				}
				else if (result['responseJSON']){
					errorResult = result['responseJSON'];
				}

				if (errorResult != null){
					statusCode = errorResult['statusCode'] ? errorResult['statusCode'] : null;
					 if (errorResult.oslcError){
							statusCode = errorResult.oslcError;
					 }
					 else if (errorResult['oslc:Error']){
						 statusCode = errorResult['oslc:Error']['oslc:statusCode'];
					 }
					 else if (errorResult['errors'] &&
						lang.isArray(errorResult['errors']) &&
						errorResult['errors'].length > 0){

						 statusCode = errorResult['errors'][0]["oslc:statusCode"];
					 }
				}
			}
			return (statusCode && (statusCode == '401' || statusCode == '403' || statusCode == '302' || statusCode == '301')); //401: Invalid login; 403: password expired; 302: found; 301: moved
		},

		_initializeLocalStorage: function(force){
			Logger.trace('[LOGIN] Initializing local storage [user: ' + currentUser + ']', null, this.CLAZZ);
			var self = this;
			return PersistenceManager.activateOrCreateCollections({username: currentUser, password: password, authenticated: true}, force).
			then(function() {
				// heartbeat rely on local storage to be initialized
				self.authState.authenticatedLocally = true;
				return ConnectionHeartBeat.initialize()

			}).otherwise(function(){
				self.authState.authenticatedLocally = false;
			});
		},

		_adapterLogout: function(){
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_adapterLogout');
			Logger.timerStart("UserAuthenticationManager - _adapterLogout");
			Logger.trace('[LOGOUT] Logging out user ' + currentUser + ' from server', null, this.CLAZZ);
			return runOrRejectWithError(this, function(){
				var deferred = new Deferred();
				//TODO Adapter is defined at resource level
				//Need to define how to get the adapter for authentication
				var invocationData = {
					adapter:	'OSLCGenericAdapter',
					procedure:	'logout',
					parameters: []
				};

				WL.Client.invokeProcedure(invocationData, {
					onSuccess: function(response){
						Logger.trace('[LOGOUT] User ' + currentUser + ' successfully logged out from server', null, clazzmethod);
						deferred.resolve();
						Logger.timerEnd("UserAuthenticationManager - _adapterLogout");
					},
					onFailure: function (err) {
						// MM improve memory utilization remove json.stringify object
						//Logger.trace('Unable to logout user ' + currentUser + ' from server: ' + JSON.stringify(err));
						deferred.reject(err);
						Logger.timerEnd("UserAuthenticationManager - _adapterLogout");
					}
				});

				return deferred.promise;
			});
		},

		_realmLogout: function() {
			Logger.timerStart("UserAuthenticationManager - _realmLogout");
			Logger.trace("[INFXUAM667] Entering realmLogout");
			Logger.trace('[LOGOUT] Logging out user ' + currentUser + ' from server (realm)', null, this.CLAZZ);
			return ServerAuthenticationProvider.logout();
		},

		_cleanUp: function() {
			currentUser = null;
			setPassword(this, null);
			this.authState = {
					authenticatedLocally: false,
					server_auth: null,
					password_change: false,
					connected: null,
					error:null
				};
			Logger.trace('User successfully logged out');
		},

		logout: function(){
			Logger.timerStart("UserAuthenticationManager - logout");
			return this._stopDownloadsInProgress().
			always(lang.hitch(this, this._doLogout));
		},

		_doLogout: function() {
			var self = this;

			return this._realmLogout().always(function() {
				Logger.trace('Closing local storage for user ' + currentUser);
				return PersistenceManager.closeAllStores().
					always(function() {
						self._cleanUp();
						Logger.timerEnd("UserAuthenticationManager - logout");
					});
				}
			);
		},

		_stopDownloadsInProgress: function(){
			WorklistDataManager.cancelLastWorklistDataDownloadRequest();
			AdditionalDataManager.cancelLastAdditionalDataDownloadRequest();

			var worklistPromise = WorklistDataManager._overallProcessing.promise;
			var additionalDataPromise = AdditionalDataManager._overallProcessing;

			//Need to chain instead of use all() because when the first promise
			//gets canceled, all() won't wait for the other before canceling itself
			return worklistPromise.always(function(){
				return additionalDataPromise;
			});
		},

		_appendLangCodeParameter: function(invocationData) {
			var langcode = (WL && WL.App && WL.App.getDeviceLocale() || 'en-US');
			invocationData.parameters[0]['langcode'] = langcode;
		},

		invokeAdapterSecurely: function(invocationData, preventReLogin){
			//invocationData.parameters[0].url = invocationData.parameters[0].url + "&ignorecollectionref=1";
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, 'invokeAdapterSecurely');
			this.reLoginError = null;
			var self = this;

			var env = WL.Client.getEnvironment();

			var isLoggedIn = WL.Client.getMaximoAuthKey();
			if (!preventReLogin && currentUser && password && SecureRequestManager.determineIfIdleTimeHasElapsed(invocationData)){
				//The user never logged into the server so authenticate
				Logger.trace('Attempting to authenticate user with server. ', clazzmethod);
				return this.relogin().then(function(){
					Logger.trace('User sucessfully authenticated with server, sending request. ', clazzmethod);
					return self.invokeAdapterSecurely(invocationData, true);
				});
			} else if (isLoggedIn == null && currentUser && password && !SecureRequestManager.determineIfIdleTimeHasElapsed(invocationData)) {
				Logger.trace('Attempting to authenticate user with server - after App on device was Offline ', clazzmethod);
				return this.relogin().then(function(){
					Logger.trace('User sucessfully authenticated with server, sending request. ', clazzmethod);
					return self.invokeAdapterSecurely(invocationData, true);
				});
			}
			var deferred = new Deferred();
			if (currentUser == null){
				deferred.reject('User not logged in');
				return deferred.promise;
			}

			this._appendLangCodeParameter(invocationData);

			var options = {
				onSuccess: lang.hitch(self, function(result){

					/* LTPA token expiration case (APAR IJ00728)
					 * The LTPA token has been expired, however MF send us a HTTP 200, making 'onSuccess' callback. This will cause SYNC problems
					 * and the changes will be lost. So we need to monitor the responseJSON or invocationResult to check 'statusCode' to ensure
					 * that we aren't receiving HTTP 401 hidden in the response. For these cases we must re-authenticate and re-send pending requests.
					 */


					if(result && (self._isServerLoginFailure(result) || 
						(result.invocationResult && result.invocationResult.url && (result.invocationResult.url.indexOf('webclient/login/login.jsp') > -1 || result.invocationResult.url.indexOf('ui/maximo.jsp') > -1)))){  
						Logger.traceJSON('[LOGIN] HTTP Authentication error: ', result, clazzmethod);
						self.relogin().then(function(){
							if(SecureRequestManager.hasPendingRequest()){
								SecureRequestManager.resendRequestsAfterAuth();
							}else{
								SecureRequestManager.callAdaptor(invocationData, options, deferred);
							}
						}).otherwise(function(error){
							deferred.reject(error);
						});
					}
					//Custom SSO Logout code when Azure Gateway & Websphere Token Timeouts are not synced
					/* else if(result.invocationResult && 
						result.invocationResult.redirected && 
						result.invocationResult.status == 200 && 
						result.invocationResult.url.indexOf('login.microsoftonline.com') > -1) {
						try {
							if(WL.Client.getEnvironment() == WL.Environment.ANDROID) {
								// disable GPS tracking service
								var gpsWatchObject = new GeoLocationTrackingService();
								gpsWatchObject.stopGpsTracking();
							}
						}
						catch(error) {
							Logger.error('Logout: failed to stop GPS tracking service!');
							console.log(error);
						}
						// do logout
						self.logout().
						always(function () {
							// app reload
							location.reload();
						});
					} */
					else {
						// MM improve memory utilization remove json.stringify object
						//Logger.trace('UserAuthenticationManager.invokeAdapterSecurely: onSuccess ' + JSON.stringify(result));
						/* APAR IV67241
						 * LDAP: sometimes the authentication process doesn't get all
						 * cookies, then we need to monitor set-cookie in the response
						 * to avoid open multiple sessions in the backend.
						 */
						deferred.resolve(result);
					}
				}),
				onFailure: function(result){
					// MM improve memory utilization remove json.stringify object
					Logger.trace("[UserAuthenticationManager] onFailure INFXAM130");
					if(result)
						Logger.traceJSON('result', result);

					if (result && !reauthInProgress && self._isServerLoginFailure(result)){
						reauthInProgress = true;
						if (result.errorCode == 'AUTHENTICATION REQUIRED' ){
							self.relogin().then(function(){
								if(SecureRequestManager.hasPendingRequest()){
									SecureRequestManager.resendRequestsAfterAuth();
								}else{
									SecureRequestManager.callAdaptor(invocationData, options, deferred);
								}
							}).otherwise(function(error){
								deferred.reject(error);
							});
							return;
						}
						if (result.invocationResult){
							var errorResult = result.invocationResult;
							if (errorResult['errors'] && lang.isArray(errorResult['errors']) &&
									errorResult['errors'].length > 0){
								var oslcError = errorResult['errors'][0];
								if(oslcError['oslc:statusCode'] == "400"){  //Logged out by admin
									self.relogin().then(function(){
										if(SecureRequestManager.hasPendingRequest()){
											SecureRequestManager.resendRequestsAfterAuth();
										}else{
											SecureRequestManager.callAdaptor(invocationData, options, deferred);
										}
									}).otherwise(function(error){
										deferred.reject(error);
									});
									return;
								}
								var errorResponse = {};
								errorResponse['oslcError'] = oslcError['oslc:statusCode'];
								errorResponse['relogin'] = true;
								errorResponse['loginFailed'] = true;
								if(oslcError['oslc:statusCode'] == "403"){
									errorResponse['errorMsg'] = oslcError['oslc:message'];
									errorResponse['username'] = currentUser;
									errorResponse['password'] = password;
									errorResponse['oslcMaxUserURL'] = oslcError['spi:user']['rdf:resource'];
								} else{
									errorResponse['errorMsg'] = invalidLoginMsg();
								}
								self._handleAuthenticationError(errorResponse, true);
								deferred.reject(errorResponse);
								return
							 }
						}
						self._handleAuthenticationError(result, true);
					}else if (reauthInProgress && SecureRequestManager.isAwaitingReauth(invocationData)){
						return;  //do nothing the request will be sent again after auth attempt
					}
					deferred.reject(result);
				}
			};

			if (invocationData.timeout){
				options.timeout = invocationData.timeout;
				delete invocationData.timeout;
			} else {
				options.timeout = SystemProperties.getConnectivityTimeout();
			}

			// MM improve memory utilization remove json.stringify object
			//Logger.trace('Invoking adapter  with these parameters: ' + JSON.stringify(invocationData));
			try{
				Logger.trace("INFXUAM604 REQUEST:" +  JSON.stringify(invocationData));
			}catch(e){}

			return SecureRequestManager.callAdaptor(invocationData, options, deferred);
		},

		_oslcServerDown: function(){
			Logger.trace("INFAM135");
			ConnectivityChecker.noOSLCConnection();
		},

		_getCurrentUser: function(){
			return currentUser;
		},
		_getSessionId: function(){
			return sessionid;
		},
		getFreshActiveCredentialsAsPromise: function(){
			// created this method to force a relogin and get a fresh session id
			var deferred = new Deferred();
			this.relogin(currentUser, password).then(function(){
				deferred.resolve();
			}).otherwise(function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		},
		_loadDataToUserRolesManager: function(userRolesSet){
			UserRolesManager.setCurrentUser(currentUser);
			var roles = [];
			if(userRolesSet){
				for(var i = 0; i < userRolesSet.count(); i++){
					roles.push(userRolesSet.getRecordAt(i).get("roleName"));
				}
			}
			UserRolesManager.addRolesToCurrentUser(roles);
		},

		_loadDataToUserManager: function(userInfoObj){
			UserManager.addInfoToCurrentUser(userInfoObj);
		},

		isCachingUserInfo: function(){
			return cachingUserInfo;
		},

		_cacheUserInfo: function(deferred){
			if (cachingUserInfo){
				deferred.resolve();
			}
			else{
				var self = this;
				var resource = ResourceContext.getResourceMetadata("userInfo");
				var queryBase = Object.keys(resource.queryBases)[0];

				cachingUserInfo = true;
				//All applications need a userinfo resource defined, also resource cannot be defined as a system table or additional data.
				ModelService.allWithComplexAttributes("userInfo", queryBase, ['groupList']).then(function(userInfoSet){
					 Logger.trace("[UserAuthenticationManager] _cacheUserInfo.ModelService call INFXAM125");
					//store the timeout value when downloading user info to reset in case od anywherepropval fail
					var lastTimeout = null;//SystemProperties.getLastTimeoutMoment();

					var propDeferred = new Deferred();

					self._getServerTime();
					self._setUpUserData(userInfoSet, propDeferred);

					self.currentUserSite = userInfoSet.getCurrentRecord().defsite;

					//retrive admin app data and update system properties, resources and resources value based on retrieved data
					propDeferred.promise.then(function(result){
						//only execute admin steops if si.adminmode = true at worklight.properties
						Logger.trace("[UserAuthenticationManager] _cacheUserInfo.propDeferred.promise.then call INFXAM126");

						/*TO DO: uncoment this code after implementation of properties load*/
						//if(!SystemProperties.getProperty('si.adminmode') || SystemProperties.getProperty('si.adminmode') == "false"){
						//	deferred.resolve();
						//}else{
								AdminModeManager.loadAdminData(deferred, userInfoSet, lastTimeout);
						//	}
					}).otherwise(function(){
						Logger.trace("[UserAuthenticationManager] _cacheUserInfo.propDeferred.promise.then call INFXAM127");
						deferred.reject();
					});
				}).
				otherwise(function(e){
					Logger.trace("[UserAuthenticationManager] ModelService.otherwise call INFXAM128");
					Logger.traceJSON("Error (e)", e);
					if (e && 'oslcServerDown' == e.errorCode ){
						if (self.authState.authenticatedLocally){
							cachingUserInfo = false;
							deferred.resolve();
						}
						else{
							ModelService.allLocalOnly("userInfo", queryBase).then(function(userInfoSet){
						    	self._setUpUserData(userInfoSet, deferred);
							}).otherwise(function(error){
								cachingUserInfo = false;
								deferred.reject(errorLoadingInfoMsg());
							});
						}
					}
					else{
						cachingUserInfo = false;
						deferred.reject(errorLoadingInfoMsg());
					}
				});
			}

		},
		_getServerTime: function(){
			var deferred = new Deferred();
			//TODO Implement the replacement of getServerDate
			var clazzmethod = Logger.getCallerClazzMethodString(this.CLAZZ, '_getServerTime');
			var self = this;
			//Need to define how to get the adapter
			var url = WL.StaticAppProps.WORKLIGHT_BASE_URL;

			var invocationDataClock = {
				procedure:	'getServerDate',
				parameters: [{"url": url}]
			};

			WL.Client.invokeProcedure(invocationDataClock, {
				onSuccess: lang.hitch(this, function(response) {
					var requestDuration = response.invocationResult.requestDuration;
					var serverDate = response.invocationResult['spi:currentDate'];

					Logger.trace('Server date was successfully retrieved from adapter::'+serverDate, null, clazzmethod);
					Logger.trace('UserAuthenticationManager._getServerTime: requestDuration = '+ requestDuration, null, clazzmethod);
					//Invoke CurrentTimeProvider
					//provider, beginTrans, endTrans, operationCost, serverDate
					CurrentTimeProvider.setTimeAdjustment('',0,requestDuration,0,serverDate);

					deferred.resolve(serverDate);

				}),
				onFailure: lang.hitch(this, function(result) {
					try{
						var errors = (lang.getObject("invocationResult.errors", false, result) || []).join(",");
						Logger.error('Could not retrieve server date from Adapter::' + errors, null, clazzmethod);
					} finally {
						deferred.reject(errorLoadingServerClockMsg());
					}
				})
			});
			return deferred.promise;
		},
		// FOR TESTING PURPOSES ONLY
		____setSessionId: function(fakeSessionId) {
			sessionid = fakeSessionId;
		},
		____setCurrentUser: function(fakeCurrentUser){
			currentUser = fakeCurrentUser;
		},
		____setPassword: function(fakePassword){
			password = fakePassword;
		},
		____setPassLocalAuth: function(fakePassLocalAuth){
			var passLocalAuth = fakePassLocalAuth;
		}

	});

});
