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

define("platform/handlers/LoginHandler", 
	   [ "dojo/_base/declare",
	     "platform/handlers/_ApplicationHandlerBase",
	     "platform/model/AdditionalDataManager",
	     "platform/model/SystemDataManager",
	     "platform/model/SystemDataUIManager",
	     "platform/auth/UserAuthenticationManager",
	     "platform/store/SystemProperties",
	     "platform/translation/MessageService",
	     "dijit/focus",
	     "platform/auth/UserRolesManager",
	     "platform/store/_StoreProvider",
	     "platform/auth/OfflineLogout",
	 	 "dojo/Deferred",
	     "platform/util/PlatformConstants",
	     "platform/comm/_ConnectivityChecker",
	     "generated/application/pushNotification/PushNotificationSelfRegistrationGenerated",
	     "platform/auth/ServerAuthenticationProvider",
	     "platform/geolocation/GeoLocationTrackingService",
],
function(declare, ApplicationHandlerBase, AdditionalDataManager, SystemDataManager, SystemDataUIManager, UserAuthenticationManager, SystemProperties, MessageService, dijitFocus, UserRolesManager, StoreProvider, OfflineLogout, Deferred, PlatformConstants, ConnectivityChecker, PushNotificationSelfRegistrationGenerated, ServerAuthenticationProvider, GeoLocationTrackingService) {
	return declare( ApplicationHandlerBase, {
		name: 'LoginHandler',
		LOGIN_DATA: 'PlatformLoginResource',
		loginForm: null,
		loginInitialized: false,

/**@memberOf platform.handlers.LoginHandler */
		initializeLogin: function(eventContext){
			WL.App.hideSplashScreen();
			var loginForm = this.application.getResource(this.LOGIN_DATA).getCurrentRecord();
			var self = this;
			var lgn_msg = function(){
				console.log(loginForm);
				var elem = document.createElement("div");
				elem.className = "floatToastLoginText";
				var disconnect_icon = document.createElement('div');
				disconnect_icon.className = "alert-square filled icon";
				var txt = document.createElement("p");
				txt.className = "logintextp";
				txt.innerHTML = MessageService.createStaticMessage('InitialServerCheckFail').getMessage(); 
				//"Server unreachable. You may continue to login if you have previusly logged into this device"
				
				elem.appendChild(disconnect_icon);
				elem.appendChild(txt);
				var current_view = this.UI.ui.getCurrentView()
				if(current_view.id === 'platform.LoginView')
					current_view.domNode.appendChild(elem);
			}
			var connect_interval = setInterval(function(){
				WL.Client.connect({
					onFailure: function(err){
						if(err.errorCode !== 'CONNECTION_IN_PROGRESS'){
							clearInterval(connect_interval);
							console.log("MF not connected")
							lgn_msg();
						}
					},
					onSuccess: function(){
						console.log("Connection success");
						clearInterval(connect_interval);
						
						
					},
					timeout: 10000
			})}, 50);
			var authkey1 = 'username';
			var authkey2 = 'password';
			
			if (this._hasUserName()) {
				// Ensure we don't save username/password
				loginForm.set(authkey1, null);
				loginForm.set(authkey2, null);
			}
			var appName = MessageService.createStaticMessage('applicationName').getMessage();
			appName = appName == 'applicationName' ? '' : appName;
			loginForm.set('appName', decodeURIComponent(appName)); // use decodeURIComponent to support multiple line app name
		},
		
		showWLSettingsPage: function(eventContext) {
			WL.App.__showWLSettingActivity();
		},
		
		showHideSettingsLink: function(eventContext) {
			eventContext.setVisibility((WL.Client.getEnvironment() === 'android'));
		},

		initializeConnectionTypes: function(){
			var connectionTypeSelected = SystemProperties.getProperty('connectionSelected');
			if (connectionTypeSelected === null || connectionTypeSelected === undefined){
				connectionTypeSelected = 'All Connection'
				//SystemProperties.setProperty('connectionSelected', connectionTypeSelected, true);

			}

			window.ConnectionType = connectionTypeSelected;
			if(connectionTypeSelected !== 'All Connection'){
				ConnectivityChecker.registerConnectionTypeCheck();
				ConnectivityChecker.handleNetworkChange();
			}
			

		},
		
		loginClickHandler: function(eventContext){
			var loginForm = this.application.getResource(this.LOGIN_DATA).getCurrentRecord();
			loginForm.set('errorMsg', '');
			var reLogin = loginForm.get('relogin') == true;
			var username = loginForm.get('username');
			var password = loginForm.get('password');
			if(!(username && password) || !username || !password){
				loginForm.set('errorMsg', MessageService.createStaticMessage('Invalid user credentials.').getMessage());
				return;
			}
			eventContext.focus(); //Android 2.3 devices need special handling to set focus when button tapped
			this.application.showBusy();
			var self = this;
			
			var loginDeferred; 
			if (reLogin){
				loginDeferred = UserAuthenticationManager.relogin(username, password);
			}
			else{
				loginDeferred = UserAuthenticationManager.login(username, password, false);
			}
			loginDeferred.
			then(function(result) {//Comes in here if server passed and local passed or if only localpassed(with request timedout or device offline)
				
				console.log("Login Succeeded. Proceed to load system properties")
				//loginForm.set('errorMsg', "Login Succeeded. Proceed to load system properties");
				//self.ui.show('WorkExecution.WorkItemsView');
				self.afterLogin(true);
			}).
			otherwise(function(authState) { //Comes in here if auth failed everywhere or change password screen
				if(authState.connected && !authState.server_auth.authenticated && authState.password_change){
					var changePasswordForm = self.application.getResource('PlatformChangePasswordForm').getCurrentRecord();
					var expiredPasswordInfo = authState.password_change;
					changePasswordForm.set('loginFailed', expiredPasswordInfo.loginFailed);
					changePasswordForm.set('errorMsg', expiredPasswordInfo.errorMsg);
					changePasswordForm.set('username', username);
					changePasswordForm.set('currentpassword', password);
					changePasswordForm.set('oslcMaxUserURL', expiredPasswordInfo.oslcMaxUserURL);
					self.application.hideBusy();
					self.ui.show('Platform.ChangePassword');
				}else if(authState.error && authState.error.recoverPassword){
					loginForm.set('errorMsg', '');
					self.application.hideBusy();
					self.ui.show('Platform.RetrieveOldPassword');
					return;
				}
				else if(authState.connected && !authState.server_auth.authenticated && authState.server_auth.error.status === 401){
					console.log("Server rejected the credentials");
					loginForm.set('errorMsg', MessageService.createStaticMessage('Invalid user credentials.').getMessage());
					self.application.hideBusy();

				}else if(!authState.connected && !authState.authenticatedLocally) {
					//Decide wether to show request timeout for first time login, or actual local auth failed for second time login
					loginForm.set('errorMsg',MessageService.createStaticMessage('Unable to reach server. Local authentication failed for given credentials. Please check you credentials. If you are a first time user, check server connection and try again').getMessage());
					self.application.hideBusy();
				}else{
					loginForm.set('errorMsg', MessageService.createStaticMessage('Invalid user credentials.').getMessage());
					self.application.hideBusy();
				}
				//self.handleLoginError(error, username, password, '');
			}).always(function(){
				self.initializeConnectionTypes();
			});
			//ServerConnectivity.pingServer();
			
		},
		

		retrySystemDownload : function(context) {
			var self = this;
			//Need to clear the OSLC error so it actually tries to connect	
			ConnectivityChecker.resetNoOSLCConnection();
			ConnectivityChecker.checkConnectivityAvailable().then(function(){								
				self.application.ui.hideCurrentDialog();
				SystemProperties.setProperty(PlatformConstants.SYS_DATA_DOWNLOADED_FLAG, false, true);
				self.afterLogin(true);				
			});			
		},

		/**
		 * This function is triggered after the login is successful and loads system data and prompts for 
		 * whether we should load lookup data
		 */
		afterLogin : function(onLoginVIew){
			SystemProperties.setProperty(PlatformConstants.REFRESH_DATA_ON_LOGIN_FLAG, false, true);
			var requiredRole = this.application.getRequiredRoleOrNull();
			var self = this;
			
			var push = new PushNotificationSelfRegistrationGenerated();
			push.register();
			
			if(!requiredRole || UserRolesManager.isCurrentUserInRole(requiredRole)){
				var loginResource = this.application.getResource(this.LOGIN_DATA);
				//Might not have username/password if we're doing single signon
				if (this._hasUserName()) {
					var loginForm = loginResource.getCurrentRecord();
					var reLogin = loginForm.get('relogin') == true;
					loginForm.set('errorMsg', '');
					if (reLogin){
						loginForm.set('relogin', false);
						loginForm.set('localPassword', null);
						this.application.ui.closeLoginView(onLoginVIew);
						return;
					}	
				}
				var sysUIManager = new SystemDataUIManager(this.application.ui);
				SystemDataManager._setSystemDataUIManager(sysUIManager);
				return SystemDataManager.downloadSystemDataIfNeeded().
				then(function(msg){
					var defaultView = self.ui._getPrimaryViewID();
//					if (self.ui.getCurrentView().id == 'platform.LoginView'){
//						defaultView = self.ui.getCurrentView().getNextSibling().id;
//					}
//					else{
//						self.ui.viewHistory.pop();
//						defaultView = self.ui.getViewFromId('platform.LoginView').baseWidget.getNextSibling().id;
//					}
					
					var doAutoRefresh = SystemProperties.getProperty('Lookup.data.delta.autorefresh');
					var numberOfTry = SystemProperties.getProperty('Lookup.data.delta.autorefresh.numbers.retry');
					
					//Only try and download additional data if system data finished
					if (msg!=SystemDataManager.getErrorLoadingDataMsg()) {
						self.loginInitialized=true;
						AdditionalDataManager.setDefaultView(defaultView, true);
						self.ui.defaultView = defaultView;
						if(SystemProperties.getProperty(PlatformConstants.META_DATA_UPDATED)){
							if (!AdditionalDataManager.isDownloadInProgress){
								SystemProperties.setProperty(PlatformConstants.META_DATA_UPDATED, false, true);
								AdditionalDataManager.refreshAdditionalData();
							}
						}else{
							var downloadState = SystemProperties.getProperty('additionalDataDownloadState');
							if(!downloadState || downloadState == 'error' || downloadState == 'started'){
								SystemProperties.setProperty('additionalDataDownloadState', 'firstLogin', true);
		                        AdditionalDataManager.checkIfAdditionalDataDownloadIsNeeded(true);
		                    }
		                     else if(AdditionalDataManager.getUIManager().checkIfIsSyncTime() && 
		         					( (doAutoRefresh && (doAutoRefresh == true || doAutoRefresh == 'true'))  && !SystemProperties.getProperty('aDSyncTryCount') || SystemProperties.getProperty('aDSyncTryCount') < numberOfTry)){
		         				SystemProperties.setProperty('isADSyncRequest', true, true);
		         				AdditionalDataManager.getUIManager().showStartADConfirmationDialog();
		         				
		         			} else
		                    {
		                    	AdditionalDataManager.checkIfAdditionalDataDownloadIsNeeded(false);
		                    } 
						}	
					}
				}).
				otherwise(function(err) {
					return UserAuthenticationManager.logout().
					always(function() {
						//Had to hide dialog here instead of within SystemDataManager
						//otherwise user would stay with no feedback until logout finishes
						//and may try to login before logout finished
						sysUIManager.hideDownloadInProgressDialog();
						var loginForm = loginResource.getCurrentRecord();
						loginForm.set('errorMsg', err);	
						throw err;
					});					
				});
			}
			else{
				UserAuthenticationManager.logout().always(function(){					
					var loginResource = self.application.getResource(self.LOGIN_DATA);
					var loginForm = loginResource.getCurrentRecord();
					loginForm.set("errorMsg", MessageService.createStaticMessage("The user you specified during login is not authorized to use this application.").getMessage());
							
					OfflineLogout.logoutWithPromise().always(function () {
					    self.application.hideBusy();
						//Might not have a username if we're doing single signon
						if (self._hasUserName()) {
							var loginResource = self.application.getResource(self.LOGIN_DATA);
							var loginForm = loginResource.getCurrentRecord();
							loginForm.set("relogin", false);	
							loginForm.set('localPassword', null);
					    	if (!onLoginVIew){
					    		self.application.show( 'platform.LoginView');
					    	}
						}
					});									
				});
			}
		},

	    handleLoginError: function(error, username, password, oldPassword){
	    	var loginResource = this.application.getResource(this.LOGIN_DATA);
			if (this._hasUserName()) {
	    		//Only do these relogin/password change events if we actually have a username field
	    		//Otherwise we're probably in device-side SSO
				var self = this;
				if (error){
					var loginForm = loginResource.getCurrentRecord();		
					if (error.relogin){
						loginForm.set('relogin', true);
						loginForm.set('localPassword', password);
					}
					else if(error.recoverPassword){
						loginForm.set('errorMsg', '');
						self.application.hideBusy();
						self.ui.show('Platform.RetrieveOldPassword');
						return;
					}
	
					if ( error.oslcError == '403'){
						var changePasswordForm = this.application.getResource('PlatformChangePasswordForm').getCurrentRecord();
						changePasswordForm.set('loginFailed', true);
						changePasswordForm.set('errorMsg', error.errorMsg);
						changePasswordForm.set('username', error.username);
						changePasswordForm.set('currentpassword', (error.relogin? null: error.password));
						changePasswordForm.set('oslcMaxUserURL', error.oslcMaxUserURL);
						this.application.hideBusy();
						this.ui.show('Platform.ChangePassword', null, null, null, true);
						return;
					}
					if(error.errorCode === 'REQUEST_TIMEOUT'){
						var err_msg = MessageService.createStaticMessage('Login request timed out. Make sure the server is running and accessible').getMessage(); 
						loginForm.set('errorMsg', error.errorMsg);	
					}
					else if (error.errorMsg){
						loginForm.set('errorMsg', error.errorMsg);				
					}
					else if (typeof error == 'string'){
						loginForm.set('errorMsg', error);				
					}
					else if (error.messageId){
						loginForm.set('errorMsg', MessageService.createResolvedMessage(error.messageId, error.parameters));
					}
				}
				if (this.ui.getCurrentView().id == 'platform.LoginView'){
					this.logout(null, true);
				} else {
					this.logout(null, false);
				}
			}
	    },
	    
        logout: function (eventContext, preventReload) {
            UI.application.showBusy();
            //GPS Plugin Logout Changes
            if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
                var gpsWatchObject = new GeoLocationTrackingService();
			    gpsWatchObject.stopGpsTracking();
			}

			var push = new PushNotificationSelfRegistrationGenerated();
			push.doUnsubscribe();
            
            var self = this;
            UserAuthenticationManager.logout().
			always(function () {
			    if (!preventReload) {
			        location.reload();
			    }
			    else {
			        UI.application.hideBusy();
			    }
			});
        },
	    
		hideDialog : function(eventContext){
			eventContext.ui.hideCurrentDialog();
			location.reload();
		},
		
		_hasUserName: function() {			
			var loginResource = this.application.getResource(this.LOGIN_DATA);
			return (loginResource && loginResource.getField("username"));
		},
		needsLogin: function() {
			return !this.loginInitialized;
		},
		
		privacyPolicyLinkClicked: function(){
			var dialogTitle = "Privacy Policy";
			
			var msg = this.getPrivacyPolicy();

			/*WL.SimpleDialog.show(dialogTitle, msg, [ {
				text : 'Done'
			}]);*/
			
			navigator.notification.alert (
					msg,  // message
					function() {},         // callback
					dialogTitle,            // title
		            'Done'                  // buttonName
		    );
		},
		
		getPrivacyPolicy: function (){
			var lines = [];
			
			lines.push("This IBM Mobile Application Privacy Statement (\"Mobile Privacy Statement\") explains the data IBM may collect on behalf of the entity that entitles you to use this IBM mobile application (or \"App\") used in connection with an IBM product offering. This Mobile Privacy Statement only applies to the information IBM may collect on behalf of that entity. It does not apply to the information that entity may collect for its own use.");
			lines.push("\n");
			lines.push("Downloading, accessing, or otherwise using the App indicates that you have read this Mobile Privacy Statement and consent to its terms. If you do not consent to the terms of this Mobile Privacy Statement, do not proceed to download, access, or otherwise use the App.");
			lines.push("\n");
			lines.push("IBM may collect the following information through the App:");
			lines.push("\u2022 Personal information you may provide to download and use the App, including your email address, name, and password");
			lines.push("\u2022 Information about your usage of the App, including crash logs and usage statistics");
			lines.push("\u2022 Information about your device and its interaction with the App, including the type of mobile device you use with the App, its unique user ID, IP address, and operating system, and the type of mobile Internet browsers in use");
			lines.push("\u2022 Information about the location of your device, including geo-location information");
			lines.push("\n");
			lines.push("IBM may use the information collected through this App in the following ways:");
			lines.push("\u2022 To review the quality and improve the functionality of the App");
			lines.push("\u2022 To better improve the way the App works with your device");
			lines.push("\u2022 To create new Apps");
			lines.push("\u2022 To provide anonymized user analytics and industry benchmarking");
			lines.push("\u2022 To share anonymized data with third parties");
			lines.push("\n");
			lines.push("Provided that this information is not required to be retained pursuant to judicial proceeding, court order, or legal process, this information will be deleted when it is no longer needed to provide the services associated with the App, unless it has been anonymized and does not longer contained personally identifiable information.");
			lines.push("\n");
			lines.push("IBM may use cookies and/or other web tracking technology through this App. While Apps at this time do not recognize automated browser signals regarding tracking mechanisms, such as \'do not track\" instructions, you can generally express your privacy preferences regarding the use of most cookies and similar technologies though your web browser. You consent to their use by using this App.");
			lines.push("\n");
			lines.push("IBM does not use the App to knowingly solicit data from or market to children under the age of 13. If a parent or guardian becomes aware that their child has provided us with information without their consent, they should contact us via http://www.ibm.com/scripts/contact/contact/us/en/privacy/. We will delete such information from our files within a reasonable time.");
			lines.push("\n");
			lines.push("You may opt-out of all collection of information by IBM by uninstalling this App from your mobile device.");
			lines.push("\n");
			lines.push("This Mobile Privacy Statement may be updated from time to time. We will notify you of any changes to this Mobile Privacy Statement by posting a new version at http://www.ibm.com/privacy/us/en/. We will post a notice at the top of the page notifying users when it is updated or modified in a material way. If we are going to use your personal information in a manner different from what is stated at the time of collection, we will notify you, and you will have a choice as to whether or not we can use your personal information in such a way. By downloading, accessing or otherwise using this App after any changes to this Mobile Privacy Statement, you indicate that you have read the updated Mobile Privacy Statement and consent to its terms.");
			lines.push("\n");
			lines.push("As a global organization, we process information we collect, including personal information, in various countries around the world. You give us consent to process such information worldwide, both directly and through third party service providers working on our behalf.");
			
			msg = "";
			lines.forEach(function(line){
				msg += line+"\n"
			});
			
			return msg;
		}		
	});
});
