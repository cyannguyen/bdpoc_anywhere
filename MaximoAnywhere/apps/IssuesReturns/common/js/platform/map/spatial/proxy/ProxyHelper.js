/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2016,2020
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
/*
 All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

;

/**
 * JS file to manage Proxy
 */

require([ "dojo/_base/declare", "dojo/parser", "dojo/ready", "dojo/Deferred",
		"dojo/_base/lang", "platform/logging/Logger",
		"platform/model/ModelService",
		"platform/store/_ResourceMetadataContext",
		 "dojo/_base/array",
		"dijit/Tooltip", "dijit/form/Button",
		"platform/store/SystemProperties", "platform/util/PlatformConstants",
		"dojo/promise/all" ], function(declare, parser, ready, Deferred, lang,
		Logger, ModelService, ResourceMetaData,
		 array, Tooltip, Button, SystemProperties,
		PlatformConstants, all) {

	declare("platform.map.spatial.proxy.ProxyHelper", null, {

		//Default URL provided by TPAE
		urlProxy : "/webclient/pluss/proxy.jsp?",

		constructor : function(options) {

		},

		/**
		 * Method to remore the Proxy URL
		 * @param url
		 * @returns New Url without proxy
		 */
		removeProxyURL : function(url) {
			var newUrl = url;
			var stringToRemove = this.getProxyURL();
			if (url.indexOf(stringToRemove) > -1) {
				newUrl = newUrl.replace(stringToRemove, "");
			}
			return newUrl;
		},
		
		/**
		 * Get the Max header to authenticate
		 */
		_getMaxAuthHeader: function() {
			var loginResource = WL.application.getResource('PlatformLoginResource').getCurrentRecord();
			return btoa(loginResource.username + ":" + loginResource.password);
		},

		/**
		 * Methid to include the Proxy URL
		 * @param url
		 * @param mapManager
		 * @returns New Url with proxy
		 */
		includeProxyURLIfEnabled : function(url, mapManager) {
			var newUrl = url;
			if (this.isProxyEnabled(mapManager) == true
					&& url.indexOf(this.urlProxy) == -1) {
				newUrl = this.getProxyURL(mapManager) + url;
			}
			return newUrl;
		},
		
		getMobileMaximoSpatialInstance: function() {
			var spatialMapHandler = WL.application["platform.handlers.spatial.SpatialMapHandler"];
			var mobileMaximoSpatial = spatialMapHandler["getMobileMaximoSpatialInstance"]();
			return mobileMaximoSpatial;
		},

		/**
		 * Method to return the base proxy URL, usually: <host>:<ip>/webclient/pluss/proxy.jsp?
		 * @returns {String}
		 */
		getProxyURL : function(mapManager) {
			var maximoUrl;
			if (mapManager){
				maximoUrl = mapManager.maximoAddress;
			}else{
				var mobileMaximoSpatial = this.getMobileMaximoSpatialInstance();
				maximoUrl = mobileMaximoSpatial.mapManager.maximoAddress;
			}
			
			return maximoUrl + this.urlProxy;
		},

		/**
		 * Method to verify if the Map Manager has the Proxy enabled
		 * @param mapManager
		 * @returns {Boolean}
		 */
		isProxyEnabled : function(mapManager) {
			var isEnabled = false;
			if (mapManager && mapManager.useproxy
					&& mapManager.useproxy == true) {
				isEnabled = true;
			}
			return isEnabled;
		},

		/**
		 * Method to verify if proxy is enabled on Anywhere global property
		 * @returns {Boolean}
		 */
		isMobileFirstProxyEnabled : function() {
			return false;
		},

		/**
		 * Method to do the request to Mobile First Adapter proxy
		 * @param adapterPath
		 * @param url
		 * @param mapManager
		 * @param method
		 * @param params
		 * @returns promise
		 */
		_requestProxy : function(adapterPath, url, mapManager, method, params) {
			if (method == null) {
				method = WLResourceRequest.GET;
			}
			var deferred = new Deferred();
			Logger.timerStart("ProxyHelper - _requestProxy request to adapter " + adapterPath + " using url " + url);
			Logger.trace('Starting request to adapter ' + adapterPath + ' using url ' + url);

			WLAuthorizationManager.obtainAuthorizationHeader().then(
					lang.hitch(this, function(accessToken) {
						//Token added automatically
						var resourceRequest = new WLResourceRequest(
								adapterPath, method);

						var mapServiceMeta = ResourceMetaData
								.getResourceMetadata("plussmapservice");

						var urlToRequest = url;
						var skipMaximo = !this.isProxyEnabled(mapManager);
						var maximoUrl = mapManager.maximoAddress;

						if (method == WLResourceRequest.GET) {
							resourceRequest.setQueryParameter('url',
									urlToRequest);
							resourceRequest.setQueryParameter('skipMaximo',
									skipMaximo);
							resourceRequest.setQueryParameter('maximoUrl',
									maximoUrl);
						} else {
							resourceRequest.addHeader("Content-Type",
									"application/json");
							params.url = urlToRequest;
							params.skipMaximo = "" + skipMaximo;
							params.maximoUrl = maximoUrl;
						}

						resourceRequest.send(params).then(function(response) {
							Logger.timerEnd("ProxyHelper - _requestProxy request to adapter " + adapterPath + " using url " + url);
							deferred.resolve(response);
						}, function(error) {
							deferred.reject(error);
						});
					}), lang.hitch(this, function(error) {
						deferred.reject(error);
					}));
			return deferred.promise;
		},

		/**
		 * Do the request throu the adapter, normal request returning json
		 * @param url
		 * @param mapManager
		 * @param method
		 * @param params
		 * @returns
		 */
		useAdapterProxy : function(url, mapManager, method, params) {
			return this._requestProxy(
					"/adapters/OSLCSpatialAdapter/spatial/proxy", url,
					mapManager, method, params);
		},

		/**
		 * Do the request throu the adapter, image request returning base64 string image
		 * @param url
		 * @param mapManager
		 * @param method
		 * @param params
		 * @returns
		 */
		useImgAdapterProxy : function(url, mapManager, method, params) {

			return this._requestProxy(
					"/adapters/OSLCSpatialAdapter/spatial/imgProxy", url,
					mapManager, method, params);

		},
		
		doRequest: function(url, params, isPost, isImage, mapManager) {
			var deferred = new Deferred();
			if (this.isMobileFirstProxyEnabled()) {
				var method;
				if (isPost) {
					method =  WLResourceRequest.POST;
				} else {
					method =  WLResourceRequest.GET;
				}
				url = this.removeProxyURL(url);
				var adapterPromise = null;
				if (isImage == null || isImage == false) {
					adapterPromise = this.useAdapterProxy( url, mapManager, method, params );
				} else {
					adapterPromise = this.useImgAdapterProxy( url, mapManager, method, params )
				}
				
				adapterPromise.then(lang.hitch(this, function(result) {		
					if (result.status == 200 && result.responseText) {
						deferred.resolve(JSON.parse(result.responseText));
					} else {
						deferred.reject(result);	
					}
				})).otherwise(lang.hitch(this, function(error) {		
					deferred.reject(error);	
				}));
			} else {
				url = this.includeProxyURLIfEnabled(url, mapManager)
				if (isPost) {
					$.post( url, params).done(lang.hitch(this, function( data ) {
						deferred.resolve(data)							    
					})).fail(function(error) {
					  	deferred.reject(error);
					});
				} else {
					$.get( url, null).done(lang.hitch(this, function( data ) {
						deferred.resolve(data)							    
					})).fail(function(error) {
					  	deferred.reject(error);
					});
				}
				
			}
			return deferred.promise;
		}

	});
});
