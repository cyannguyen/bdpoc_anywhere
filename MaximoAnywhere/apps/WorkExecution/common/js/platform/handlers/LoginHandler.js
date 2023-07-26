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
				else if(authState.connected && !authState.server_auth.authenticated && authState.server_auth && authState.server_auth.error && authState.server_auth.error.status === 401){
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
			if(!localStorage.getItem("appPermission")) {
				this.ui.show('Platform.AppPermission');
				return;
			}
			SystemProperties.setProperty(PlatformConstants.REFRESH_DATA_ON_LOGIN_FLAG, false, true);
			var requiredRole = this.application.getRequiredRoleOrNull();
			var self = this;
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
					
					if (self.application.isFeatureEnabled('pushnotification.enabled') && self.application.isFeatureEnabled('pushnotification.enabled') == true) {
						// Push Notifications
						var push = new PushNotificationSelfRegistrationGenerated();
						push.register();
					}
					
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
	    try{
	    //GPS Plugin Logout Changes
		if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
			var gpsWatchObject = new GeoLocationTrackingService();
			gpsWatchObject.stopGpsTracking();
	    	}

		if (eventContext.ui.application.features["pushnotification.enabled"] && eventContext.ui.application.features["pushnotification.enabled"] == true) {
			var push = new PushNotificationSelfRegistrationGenerated();
			push.doUnsubscribe();
	    	}
	    } catch (error) {
		console.error('Logout failed to Unsubscribe for GPS Tracker or Push notification!!!');
		console.log(error);
	    }
		
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
			//cordova.InAppBrowser.open("https://www.ibm.com/support/pages/node/6574761","_blank","location=no,footer=yes");
			/*var dialogTitle = "Privacy Policy";
			
			var msg = this.getPrivacyPolicy();

			WL.SimpleDialog.show(dialogTitle, msg, [ {
				text : 'Done'
			}]);
			
			navigator.notification.alert (
				msg,  // message
				function() {},         // callback
				dialogTitle,            // title
				'Done'                  // buttonName
			);*/
			var link = document.getElementsByClassName("WL_ loginLink")[0];
			var privacyModal = document.getElementById("privacyDialog");
			var span = document.getElementsByClassName("close")[0];

			link.onclick = function() {
				privacyModal.style.display = "block";
			}

			span.onclick = function() {
				privacyModal.style.display = "none";
			}

			window.onclick = function(event) {
				if (event.target.className == "WL_ loginLink") {
					privacyModal.style.display = "block";
				}
    		}

			document.getElementById("modal-header").innerHTML= "Privacy Policy" ;
			document.getElementById("modal-header").style = "font-weight:bold";

			document.getElementById("modal-text").innerHTML= this.getPrivacyPolicy() ;
			document.getElementById("modal-text").style = "text-align:left";
		},

		getPrivacyPolicy: function (){
			var lines = [];
			
			lines.push('This Privacy Statement is effective as of 25, January 2022');
			lines.push('');
			lines.push('Contact us: https://www.ibm.com/privacy/portal/contact/us-en');
			lines.push('');
			lines.push('Introduction');
			lines.push('');
			lines.push('At IBM, we value your privacy and are committed to protecting and processing your personal information responsibly.');
			lines.push('');
			lines.push('This privacy statement describes how IBM collects, uses and shares your information. It applies to IBM Corporation and IBM subsidiaries except where a subsidiary presents its own statement without reference to IBM\'s.');
			lines.push('');
			lines.push('App Specific Statement');
			lines.push('');
			lines.push('The App allows the user to take images of machines or other assets as part of using the Maximo Application Suite of software. While this App is designed for images solely of assets, background may be inadvertently included. Accordingly, you must ensure you have all necessary permissions to take and use the images, including but not restricted to, permission to take images in the area in which you are working. You are solely responsible for the images, voice recordings, annotations and the like which are taken by the App and used by the Authorized Programs.');
			lines.push('');
			lines.push('In addition, as part of the operation of the App, certain data may be transmitted and stored, including, but not limited to, user ID, phone numbers, email addresses, digital signatures, geolocations, camera (for images and video), audio and similar personal information. You may also choose to include other data of a personal or sensitive nature. To the extent you control any such data, you are responsible for obtaining all necessary permissions and adhering to all applicable data privacy regulations');
			lines.push('');
			lines.push('IBM may push certain notifications to your copy of the App. You agree to receive such notifications. We may provide additional data privacy information by using a supplementary privacy notice.');
			lines.push('');
			lines.push('In General');
			lines.push('Personal Information We Collect and Use');
			lines.push('');
			lines.push('This section describes the various types of information that we collect and how we use it.');
			lines.push('');
			lines.push('Your Account - If your mobile app requires an IBMid');
			lines.push('');
			lines.push('You can create an account with IBM by creating an IBMid. An IBMid provides IBM with your name, email address, and country or region of residence. We may require an IBMid for certain services, such as the use of IBM Cloud and Online Services (see below).');
			lines.push('');
			lines.push('We may also store your details from business contact information that you provide to us, or that we collect from your organization, our Business Partners, or our suppliers.');
			lines.push('');
			lines.push('An IBMid uniquely identifies you when you access our websites, make a request or order, or use a product or service. If you log in to our websites with an IBMid we may link the information we collect with your account. An IBMid is also used to give you access to IBM Cloud and Online Services (see below) and allows you to manage your contract and billing history. The email address in your IBMid may be used to contact you in relation to any services to which you subscribe.');
			lines.push('');
			lines.push('An IBMid uniquely identifies you when you access our websites, make a request or order, or use a product or service. If you log in to our websites with an IBMid we may link the information we collect with your account. An IBMid is also used to give you access to IBM Cloud and Online Services and allows you to manage your contract and billing history. The email address in your IBMid may be used to contact you in relation to any services to which you subscribe.');
			lines.push('');
			lines.push('Business contact information is typically information that you would find on a business card, such as name and business contact details. We use this information to contact or communicate with you about business matters. If we receive business contact information from a third party, such as an IBM Business Partner or supplier, we will confirm that the information was shared appropriately.');
			lines.push('');
			lines.push('We may also combine your business contact information with other business-relevant information, such as information about your professional education, skills, work experience, or other publicly available information, such as business-related blogs, publications, job roles, and certifications. This information may be used to tailor our interactions with you in any part of IBM\'s business, for example in the sales process, to maintain a relationship with you, and for post-contractual relationships.');
			lines.push('');
			lines.push('IBM websites - If your mobile app accesses an IBM website');
			lines.push('');
			lines.push('Our websites offer ways to communicate with you about us, our products, and services. The information that we collect on websites is used to provide you with access to the website, to operate the website, to improve your experience, and to personalize the way that information is provided to you. If you visit our websites without logging in with an account (see above), we may still collect information that is connected to your website visit.');
			lines.push('');
			lines.push('For more information on the technologies that we use to collect website information, and setting your preferences, see Cookies and Similar Technologies (below).');
			lines.push('');
			lines.push('We collect information about your use of our websites, such as:');
			lines.push('');
			lines.push('    the webpages you view');
			lines.push('');
			lines.push('    the amount of time you spend on pages');
			lines.push('');
			lines.push('    the website URL that referred you to our pages');
			lines.push('');
			lines.push('    your geographic information derived from your IP address');
			lines.push('');
			lines.push('    and any hyperlinks or advertisements you select');
			lines.push('');
			lines.push('We use this information to improve and personalize your experience with our websites, provide you with content that you may be interested in, create marketing insights, and to improve our websites, online services, and related technologies.');
			lines.push('');
			lines.push('We also collect the information that your browser or device automatically sends, such as:');
			lines.push('');
			lines.push('    your browser type and IP address');
			lines.push('');
			lines.push('    operating system, device type, and version information');
			lines.push('');
			lines.push('    language settings');
			lines.push('');
			lines.push('    crash logs');
			lines.push('');
			lines.push('    IBMid information (if signed in)');
			lines.push('');
			lines.push('    and passwords');
			lines.push('');
			lines.push('We use this information to provide you with access to our webpages, improve the webpage view on your device and browser, adapt to your settings and language, and adapt content for relevancy or any legal requirements for your country. We also use this information to comply with system and network security requirements, and to provide support. For more information see Support Services and Protecting You and IBM (below).');
			lines.push('');
			lines.push('We also provide platforms and forums that enable online sharing, support, and collaboration among registered members. Any information that you submit to these platforms may be made available others on the internet, or removed by us, as covered in the platform privacy notice or terms. We are not responsible for any content that you make available through your use of our products or services.');
			lines.push('');
			lines.push('We prepare reports on our websites to derive insights into trending topics and general market knowledge. These reports may be provided to third parties with details on how users interacted or showed interest in the third-party product or service that was presented on our websites. All reports display aggregated information and cannot be used to identify our website visitors.');
			lines.push('');
			lines.push('We accept no responsibility for the content provided on, or privacy practices, of third-party websites or applications.');
			lines.push('');
			lines.push('IBM Cloud and Online Services - If your mobile app connects to an IBM Cloud or Online Service');
			lines.push('');
			lines.push('Our cloud and online services include "as-a-service" and desktop applications, mobile applications (or apps), and IBM Learning services. We collect information about the use of these services, such as pages you view or your interactions on that page, to improve and develop our services and to generate technical and market insights. We may require an IBMid for the use of our cloud and online services (see Your Account (above)).');
			lines.push('');
			lines.push('The information that we collect on our cloud and online services may include:');
			lines.push('');
			lines.push('    the pages you view,');
			lines.push('');
			lines.push('    your settings within the service,');
			lines.push('');
			lines.push('    your browser type and IP address,');
			lines.push('');
			lines.push('    operating system, device type, and version information,');
			lines.push('');
			lines.push('    crash logs,');
			lines.push('');
			lines.push('    IBMid information (if signed in),');
			lines.push('');
			lines.push('    and passwords.');
			lines.push('');
			lines.push('This information is collected to provide you with access, to operate the service, for support, to personalize and improve your experience of the service, to develop other services and technologies, and generate technical and market insights. For more information on the technologies that we use to collect this information, and setting your preferences, (see Cookies and Similar Technologies (below)).');
			lines.push('');
			lines.push('Where we provide products and services as a business-to-business provider, the client is responsible for the collection and use of personal information while using our products or services, unless otherwise described. Our agreement with clients may also allow us to request and collect information about authorized users of our products or services for reasons of contract management.');
			lines.push('');
			lines.push('IBM Learning offers education services and collects information on course completions to be able to provide you with credentials, certificates, or further information when needed.');
			lines.push('');
			lines.push('We accept no responsibility for the content provided on, or privacy practices, of third-party websites or applications.');
			lines.push('');
			lines.push('Marketing');
			lines.push('');
			lines.push('We use the information that we collect to communicate with you about relevant products, services, and offerings. We also use this information to personalize your experience with our content and advertisements, and to develop internal marketing and business intelligence. To set or update your marketing communications preferences, visit the IBM Privacy Preference Center at https://myibm.ibm.com/profile/dataprivacypreferences/welcome/us-en. You may also submit an opt-out request, (https://www.ibm.com/account/reg/us-en/signup?formid=urx-42537) or select Unsubscribe at the bottom of each marketing email. To review or set your preferences regarding the information that we collect about you on our websites select Cookie Preferences in the website footer.');
			lines.push('');
			lines.push('We use contact information that we collect directly from you, your organization, or third-party data providers, to communicate with you about our products, services, and offerings. When we obtain information about you indirectly from third parties, we implement checks and controls to confirm that this information was legally acquired by the third party and that the third party has the right to provide the information to us for our use in marketing.');
			lines.push('');
			lines.push('We may, subject to your preferences, collect information about your interactions with our websites (see above), our emails (such as whether emails are opened or links selected), and other IBM content, including content on third-party sites. For more information on the technologies that we use to collect this information, and setting your preferences, see Cookies and Similar Technologies (below).');
			lines.push('');
			lines.push('We use this information to develop internal marketing and business intelligence. For example, we may:');
			lines.push('');
			lines.push('    Combine the information collected to better understand your interests and potential business needs, such as IBM events you attend, content you review, or any of our websites that you visit.');
			lines.push('');
			lines.push('    Aggregate the information that is collected about website visitors for the purposes of developing and modelling marketing audiences.');
			lines.push('');
			lines.push('    Leverage insights from the information collected to personalize content and advertisements across multiple interactions and devices.');
			lines.push('');
			lines.push('    Engage with advertising partners, such as publishers and social media platforms, to deliver targeted IBM advertisements on their websites, aggregate information for analysis, and track engagement with those advertisements on our behalf. These advertising partners may also track your interactions with us on our websites.');
			lines.push('');
			lines.push('Contractual Relationships');
			lines.push('');
			lines.push('A contractual relationship is created when you order a trial, or a product or service from us. While we mainly provide our products and services to businesses, individuals may also enter into an agreement with us directly as a client. We may collect any information that is reasonably necessary to prepare for, enter, and fulfill, the contractual agreement.');
			lines.push('');
			lines.push('The information collected in a contractual relationship may include the business contact information of the requester, an IBMid, and the order details. Information that is required for shipment and payment, for the implementation of services, or to grant access to the product or service may also be collected.');
			lines.push('');
			lines.push('This information may be collected for various purposes, depending on the nature of the products or services, for example, for contractual management and compliance, to provide support, for the improvement or development of our products and services, to contact you for customer satisfaction surveys, and to generate technical and market insights. For more information, see IBM Cloud and Online Services (above).');
			lines.push('');
			lines.push('Support Services');
			lines.push('');
			lines.push('When you contact us to request support, we collect your contact information, problem description, and possible resolutions. We record the information that is provided to handle the support query, for administrative purposes, to foster our relationship with you, for staff training, and for quality assurance purposes.');
			lines.push('');
			lines.push('The information that we collect may include any information exchanged during our phone conversations or provided during Live Chat support sessions on our websites. We may use this information to inform you of products or services that are related to your support request. This can include product updates or fixes, and we may combine the information that is collected through other interactions with you or your organization to provide more valuable suggestions in relation to product support, such as any available training regarding the issue.');
			lines.push('');
			lines.push('While we handle the support case, we may have incidental access to information that you have provided or information that is on your system. This information may contain information about you, your organization\'s employees, customers, or other relevant parties. The conditions regarding the handling and processing of this information is covered by the applicable Terms of Use or other agreements between your organization and IBM, such as the Terms of Use for Exchanging Diagnostic Data.');
			lines.push('');
			lines.push('Protecting You and IBM');
			lines.push('');
			lines.push('We may collect and use information to protect you and IBM from IT security threats and to secure the information that we hold from unauthorized access, disclosure, alteration, or destruction. This includes information from our IT access authorization systems, such as log-in information.');
			lines.push('');
			lines.push('The security solutions we use to protect your information, our infrastructure, and our networks may collect information such as IP addresses and log files. This is necessary for the functionality and utility of security programs to enable the investigation of any potential security incidents and generate insights on security threats.');
			lines.push('');
			lines.push('We may use specialized tooling and other technical means to collect information at access points to, and in, IT systems and networks to detect unauthorized access, viruses, and indications of malicious activities. The information we collect may be used to conduct investigations when unauthorized access, malware or malicious activities are suspected, and to remove or isolate malicious code or content.');
			lines.push('');
			lines.push('IBM Locations');
			lines.push('');
			lines.push('When you visit an IBM location, we collect your name or business contact information (see Your Account), and, in some cases, information from a government-issued ID. This information is collected for access management and to protect the security and safety of our locations and employees.');
			lines.push('');
			lines.push('The information that is collected at our locations is used to issue access badges. We may verify the identity of visitors where legally permissible and, for supplier personnel working on site, a badge with a photo identification may be requested for identification purposes.');
			lines.push('');
			lines.push('Camera supervision and access management are used for reasons of security and safety of our locations, employees, and assets. More information may be available at the IBM location.');
			lines.push('');
			lines.push('Recruitment and Former Employees');
			lines.push('');
			lines.push('We are constantly searching for new talent for our organization, and we collect information about job applicants or prospective candidates from several sources. Applicants are referred to the Talent Acquisition Privacy Notice at https://www.ibm.com/employment/talent_acquisition_privacy.html for more information. When an employee leaves IBM, we continue to process information that is related to them for any remaining business, contractual, employment, legal, and fiscal purposes, including the management of pensions to the extent handled by IBM.');
			lines.push('');
			lines.push('Regarding recruitment, we may look for prospective candidates with the help of recruitment intermediaries and may use publicly available information on social media platforms to identify prospective candidates for a specific function.');
			lines.push('');
			lines.push('When an employee leaves IBM, we retain basic information from the former employee about their employment at IBM.');
			lines.push('');
			lines.push('After an employee retires, we process information about the retiree for fulfilling the pension obligations toward the retiree. Information about the processing of pension information, or other retirement programs, can be found with the local organization responsible for pensions. In some countries, this may be an independent organization. In some cases, retirees may still participate in IBM-organized initiatives or programs, such as volunteer and social responsibility programs. Such participation is voluntary, and more information is provided on the relevant websites or information pages for those initiatives.');
			lines.push('');
			lines.push('Conducting our Business Operations');
			lines.push('');
			lines.push('We collect and use information to improve our business operations, systems, and processes. For example, information may be used to conduct, maintain, audit, and optimize our operations, to protect our assets and employees, for product development, and to defend our rights.');
			lines.push('');
			lines.push('We collect information about our business operations to make informed decisions about the organization, the business, and to report on performance, audits, and trends. For example, we use this information to analyze the costs and quality of our operations. Where possible, this is done by using aggregated information, but it may use personal information.');
			lines.push('');
			lines.push('We collect and use information from our business systems, which may include personal information, to:');
			lines.push('');
			lines.push('    Protect or enforce our rights, including to detect fraud or other criminal activities (for example, by using information in payment systems)');
			lines.push('');
			lines.push('    Handle and resolve disputes');
			lines.push('');
			lines.push('    Answer complaints and defend IBM in legal proceedings');
			lines.push('');
			lines.push('    Comply with legal obligations in the countries where we do business');
			lines.push('');
			lines.push('We collect information from the use of our business processes, websites, cloud and online services, products, or technologies. This information may include personal information and is used for product and process development. For example, we may use this information to increase efficiency, decrease costs, or improve services by developing automated processes and tools, or to develop or improve the technologies on which these are based.');
			lines.push('');
			lines.push('Cookies and Similar Technologies');
			lines.push('');
			lines.push('When you visit our websites, cloud and online services, software products, or view our content on certain third-party websites, we collect information regarding your connection by using various online tracking technologies, such as cookies, web beacons, Local Storage, or HTML5. Information that is collected with these technologies may be necessary to operate the website or service, to improve performance, to help us understand how our online services are used, or to determine the interests of our users. We use advertising partners to provide and assist in the use of such technologies on IBM and other sites.');
			lines.push('');
			lines.push('A cookie is a piece of data that a website may send to your browser, which may be stored on your computer and can be used to identify your computer. Web beacons, including pixels and tags, are technologies that are used to track a user visiting an IBM web page or if a web page was copied to another website. Web beacons may be used in email messages or newsletters to determine whether messages are read, forwarded, or links selected. Local Shared Objects can store content information displayed on the webpage visited, and preferences. These may be used to provide connected features across our websites or display targeted IBM advertising on other websites based on your interests.');
			lines.push('');
			lines.push('Session cookies can be used to track your progression from page to page so that you are not asked for information that you have already provided during the current session, or information that is needed to be able to complete a transaction. Session cookies are erased when the web browser is closed. Persistent cookies store user preferences for successive visits to a website, such as recording your choice of language and country location. Persistent cookies erase their data within 12 months.');
			lines.push('');
			lines.push('You can use the IBM Cookie Manager to learn more about the online tracking technologies we use and to review or set your preferences regarding the information that we collect about you on our websites. The IBM Cookie Manager is either presented as a notification window when you first visit a webpage or opened by selecting Cookie Preferences in the website footer. The IBM Cookie Manager does not address all types of tracking technologies (for example, web beacons). When using mobile apps, use the options on your mobile device to manage settings.');
			lines.push('');
			lines.push('Blocking, disabling, or rejecting IBM cookies may cause services to not function properly, such as in connection with a shopping cart, or block the use of websites or IBM Cloud services that require you to sign in. Disabling cookies does not disable other online tracking technologies, but prevents the other technologies from accessing any details stored in cookies.');
			lines.push('');
			lines.push('Our websites offer the possibility to use third-party social media options. If you elect to use these options, these third-party sites may log information about you, such as your IP address, access time, and referring website URLs. If you are logged in to those social media sites, they may also link collected information with your profile information. We accept no responsibility for the privacy practices of these third-party services and encourage you to review their privacy policies for more information.');
			lines.push('');
			lines.push('For information on cookies and how to remove these technologies by using browser settings, see https://www.allaboutcookies.org/.');
			lines.push('');
			lines.push('Children');
			lines.push('');
			lines.push('Unless otherwise indicated, this mobile app and any related websites, products, and services are not intended for use by children under the age of 16.');
			lines.push('');
			lines.push('Sharing Personal Information');
			lines.push('');
			lines.push('We may share your personal information internally and externally with suppliers, advisors, or Business Partners for IBM\'s legitimate business purposes, and only on a need-to-know basis. This section describes how we share information and how we facilitate that sharing.');
			lines.push('');
			lines.push('How We Share Personal Information');
			lines.push('');
			lines.push('When sharing personal information, we implement appropriate checks and controls to confirm that the information can be shared.');
			lines.push('');
			lines.push('If we decide to sell, buy, merge, or otherwise reorganize businesses in some countries, such a transaction may involve disclosing some personal information to prospective or actual business purchasers, or the collection of personal information from those selling such businesses.');
			lines.push('');
			lines.push('Internally, personal information is shared for our legitimate business purposes, such as managing our relationship with you and other external parties, compliance programs, or systems and networks security. We do this to improve efficiency, for cost savings, and internal collaboration between our subsidiaries. Our internal access to personal information is restricted and granted only on a need-to-know basis. Sharing of this information is subject to the appropriate intracompany arrangements, our policies, and security standards.');
			lines.push('');
			lines.push('Externally,');
			lines.push('');
			lines.push('    Our business with suppliers may include the collection, use, analysis, or other types of processing of personal information on our behalf.');
			lines.push('');
			lines.push('    Our business model includes cooperation with independent Business Partners for marketing, selling, and the provision of IBM products and services. Where appropriate, we share business contact information with selected Business Partners.');
			lines.push('');
			lines.push('    We may share personal information with professional advisors, including lawyers, auditors, and insurance companies to receive their services.');
			lines.push('    We may share contractual relationship information with others, for instance, our Business Partners, financial institutions, shipping companies, postal, or government authorities, such as the customs authorities that are involved in fulfillment.');
			lines.push('');
			lines.push('In certain circumstances, personal information may be subject to disclosure to government agencies in accordance with judicial proceedings, court orders, or legal processes. We may also share personal information to protect the rights of IBM or others when IBM believes that such rights may be affected, for example to prevent fraud.');
			lines.push('');
			lines.push('Facilitating International Transfers');
			lines.push('');
			lines.push('Your information may be transferred to or accessed by IBM subsidiaries and third parties around the world. IBM complies with laws on the transfer of personal information between countries to keep your personal information protected, wherever it may be.');
			lines.push('');
			lines.push('We have implemented various safeguards including:');
			lines.push('');
			lines.push('    Contractual Clauses, such as those approved by the EU Commission and accepted in several other countries. You can request a copy of the EU Standard Contractual Clauses (EU SCCs) by selecting Contact Us in the header of this page.');
			lines.push('');
			lines.push('    Binding Corporate Rules for controllers (IBM BCR-C). We have BCR-C approved by the European Data Protection Authorities and the UK Information Commissioner\'s Office. For more information, see IBM Controller Binding Corporate Rules. (https://www.ibm.com/privacy/bcr)');
			lines.push('    IBM\'s privacy practices, described in this Privacy Statement, comply with the APEC Cross Border Privacy Rules Framework. The APEC Cross Border Privacy Rules (CBPR) system (http://cbprs.org/) provides protection of personal information that is transferred among participating APEC economies (http://cbprs.org/about-cbprs/ ) as it pertains to online information collected through ibm.com.');
			lines.push('');
			lines.push('While the EU-US and Swiss-US Privacy Shield Framework can no longer be relied upon for the transfer of Personal Information, we continue to comply with all EU-US Privacy Shield Framework and Swiss-US Privacy Shield Framework obligations. For more information, see IBM Privacy Shield Privacy Policy (https://www.ibm.com/privacy/privacy-shield) and US Department of Commerce. (https://www.privacyshield.gov/welcome)');
			lines.push('');
			lines.push('Controller and Representative Information - If your mobile app connects to an IBM Cloud or Online Service');
			lines.push('');
			lines.push('IBM does business through its subsidiaries worldwide. The privacy laws in some countries consider a controller to be the legal entity (or natural person) who defines the purposes for which the processing of personal information takes place and how that information is processed. Parties that are involved in processing operations on behalf of a controller may be designated as processors. Designations and associated obligations differ, depending on the jurisdiction.');
			lines.push('');
			lines.push('Where this is relevant for the privacy laws in your country, the controller of your personal information is IBM\'s main subsidiary in your country or region, unless International Business Machines Corporation (IBM Corp.) or another IBM subsidiary identifies itself as the controller for a specific interaction with you.');
			lines.push('');
			lines.push('The contact details of our main subsidiary of a country or region can be found by selecting your country or region and selecting Contact on the footer of ibm.com websites. IBM Corp. can be contacted at: International Business Machines Corporation, 1, North Castle Drive, Armonk, New York, United States of America.');
			lines.push('');
			lines.push('Where IBM Corp. or a subsidiary it controls is required to appoint a legal representative, the following representatives have been appointed.');
			lines.push('');
			lines.push('European Economic Area (EEA)');
			lines.push('');
			lines.push('IBM International Group B.V., Johan Huizingalaan 765,');
			lines.push('1066 VH Amsterdam,');
			lines.push('The Netherlands');
			lines.push('');
			lines.push('United Kingdom (UK)');
			lines.push('');
			lines.push('IBM United Kingdom Limited, PO Box 41, North Harbour, Portsmouth,');
			lines.push('Hampshire, PO6 3AU,');
			lines.push('');
			lines.push('United Kingdom');
			lines.push('');
			lines.push('Information Security and Retention');
			lines.push('');
			lines.push('To protect your personal information from unauthorized access, use, and disclosure, we implement reasonable physical, administrative, and technical safeguards. These safeguards include role-based access controls and encryption to keep personal information private while in transit. We also require our Business Partners, suppliers, and third parties to implement appropriate safeguards, such as contract terms and access restrictions, to protect information from unauthorized access, use, and disclosure.');
			lines.push('');
			lines.push('We only retain personal information as long as necessary to fulfill the purposes for which it is processed, or to comply with legal and regulatory retention requirements. Legal and regulatory retention requirements may include retaining information for:');
			lines.push('');
			lines.push('    audit and accounting purposes,');
			lines.push('');
			lines.push('    statutory retention terms,');
			lines.push('');
			lines.push('    the handling of disputes,');
			lines.push('    and the establishment, exercise, or defense of legal claims in the countries where we do business.');
			lines.push('');
			lines.push('We retain any contractual relationship information for administrative purposes, legal and regulatory retention requirements, defending IBM rights, and to manage IBM\'s relationship with you. The information that is provided in a supplementary privacy notice may provide more detailed information on applicable retention terms.');
			lines.push('');
			lines.push('When personal information is no longer needed, we have processes in place to securely delete it, for example by erasing electronic files and shredding physical records.');
			lines.push('');
			lines.push('Your Rights');
			lines.push('');
			lines.push('You have certain rights when it comes to the handling of your personal information. The Contact Us form found in the link in the header of this page can be used to:');
			lines.push('');
			lines.push('    request access to the personal information that we have on you, or have it updated. Depending on the applicable law, you may have additional rights concerning your personal information.');
			lines.push('');
			lines.push('    ask questions related to this Privacy Statement and privacy practices. Your message is forwarded to the appropriate member of IBM\'s Data Privacy Team, including the responsible Data Protection Officers.');
			lines.push('    submit a complaint to IBM if you are not satisfied with how IBM is processing your personal information.');
			lines.push('');
			lines.push('Information about additional rights and when they apply can be found https://www.ibm.com/privacy/additional-data-subjects-rights. Your rights may be subject to limitations and exceptions resulting from applicable laws. For example, there may be situations where we cannot share certain information that you seek if disclosing this means disclosing information about others.');
			lines.push('');
			lines.push('You may also have the right to complain to the competent supervisory authority. Contact details of Data Protection Authorities in the European Economic Area can be found at https://edpb.europa.eu/about-edpb/about-edpb/members_en and in the UK at https://ico.org.uk/.');
			lines.push('');
			lines.push('If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, please contact our U.S.-based third-party dispute resolution provider (free of charge) a https://feedback-form.truste.com/watchdog/request.');
			lines.push('');
			lines.push('To set or update your marketing communications preferences, visit the IBM Privacy Preference Center. (https://myibm.ibm.com/profile/dataprivacypreferences/welcome/us-en). You can also submit an opt-out request, (https://www.ibm.com/account/reg/us-en/signup?formid=urx-42537 or select Unsubscribe at the end of each marketing email.');
			lines.push('');
			lines.push('Legal Basis');
			lines.push('');
			lines.push('In some jurisdictions, the lawful handling of personal information is subject to a justification, sometimes referred to as legal basis. The legal bases that we rely on for the lawful handling of your personal information vary depending on the purpose and applicable law.');
			lines.push('');
			lines.push('The different legal bases that we use are:');
			lines.push('Necessary for the performance of a contract with you:');
			lines.push('');
			lines.push('We rely on this legal basis when we need to process certain personal information, such as your contact details, payment details, and shipment details, to perform our obligations or to manage our contractual relationship (see above) with you.');
			lines.push('');
			lines.push('Examples:');
			lines.push('');
			lines.push('    If you intend to purchase a product or service, we require your business contact information to enter into a contract with you or you may need to create an IBMid (see Your Account (above) to access a purchased product online.');
			lines.push('');
			lines.push('    When fulfilling a contact, you may need to receive support services (see above) for which we will need to collect your contact information.');
			lines.push('    We need personal information to consider job applicants or manage the pension entitlements of retirees (see Recruitment and Former employees (above)).');
			lines.push('');
			lines.push('Necessary for the purposes of IBM\'s or a third party\'s legitimate interest');
			lines.push('');
			lines.push('Legitimate interests relate to being able to conduct and organize business, which includes the marketing of our offerings, protecting our legal interests, securing our IT environment, or meeting client requirements.');
			lines.push('Examples:');
			lines.push('');
			lines.push('    We capture your use of, and interaction with our websites (see above) to improve them.');
			lines.push('');
			lines.push('    We process your IBMid (see Your Account (above) ) to manage access authorization of our services.');
			lines.push('');
			lines.push('    Where we have a contractual relationship (see above) with the organization that you are working for, we have a legitimate interest to process your personal information used to manage this contract.');
			lines.push('');
			lines.push('    We process your business contact information (see Your Account (above)) in combination with other business-relevant information to tailor our interactions with you and promote our products and services. We may process your contact information together with details of an IBM event you attended to develop Marketing (see above) and business intelligence.');
			lines.push('');
			lines.push('    We process the personal information of applicants based on our legitimate interest to source suitable talent (see Recruitment and Former Employees (above)).');
			lines.push('    We have to keep our general business operations (see above) functional. To this end we may, for example, processes the log in information of our IT systems and networks, or CCTV footage at IBM locations (see above) for security and safety purposes.');
			lines.push('');
			lines.push('We may also process personal information where it is necessary to defend our rights in judicial, administrative, or arbitral proceedings. This also falls under the legal basis of legitimate interest in countries where they are not a separate legal basis.');
			lines.push('');
			lines.push('We process personal information for credit protection, which is a specific legal basis under Brazilian law (LGPD) but is also covered under the legal basis of legitimate interest in other countries.');
			lines.push('');
			lines.push('Consent');
			lines.push('');
			lines.push('The processing is based on your consent where we request this. Example:');
			lines.push('');
			lines.push('the optional use of cookies or similar technologies (see above) or email of marketing (see above) materials.');
			lines.push('');
			lines.push('Legal obligation');
			lines.push('Where we need to process certain personal information based on our legal obligation. Example:');
			lines.push('');
			lines.push('We may be obliged to ask for a government-issued ID for certain transactions, such as for a financing transaction (see Contractual Relationship (above)).');
			lines.push('');
			lines.push('Privacy Statement Updates');
			lines.push('');
			lines.push('If a material change is made to this Privacy Statement, the effective date is revised, and a notice is posted on the updated Privacy Statement for 30 days. By continuing to use our websites and services after a revision takes effect, it is considered that users have read and understand the changes.');
			lines.push('');
			lines.push('Previous versions of the Privacy Statement are available at https://www.ibm.com/privacy/portal/previous-versions-of-IBM-privacy-statements');
			lines.push('');
			lines.push('V20220125 M20220415');
			lines.push('');
			
			msg = "";
			lines.forEach(function(line){
				msg += line+"\n"
			});
			
			return msg;
		},
		
		acceptAppPermission: function(eventContext) {
			localStorage.setItem('appPermission', true);
			this.ui.hideCurrentDialog();
			this.afterLogin(true);
		},

		setAppPermissionText: function(eventContext) {
			var msg = null;
			var gpsIsOn = this.application.isFeatureEnabled('gps.enabled');
			if(gpsIsOn) {
				msg = MessageService.createResolvedMessage('appPermissions');
			}
			else {
				msg = MessageService.createResolvedMessage('appPermissionsMedia');
			}
			eventContext.textWidget.set('value', msg);
    	}
	});
});
