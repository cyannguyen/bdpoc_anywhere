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
 * This is the implementation for MXSPATIAL store.
 */

require( [
           "dojo/_base/declare", "dojo/parser", "dojo/ready",
           "dojo/Deferred",
           "dojo/_base/lang", 
           "platform/logging/Logger",
           "dojo/_base/array",            
           "dojo/Deferred",
           "platform/store/ResourceMetadata",
           "platform/store/PersistenceManager",
           "platform/auth/UserAuthenticationManager"
         ], function(declare, parser, ready, Deferred, lang,
        		 Logger, array, Deferred, ResourceMetadata, PersistenceManager, UserAuthenticationManager){

	declare( "platform.map.spatial.store.MaximoSpatialStore", null, {
		
		_mapConfigMetaData: null,
		_sketchToolMetaData: null,
		
		constructor : function ( options ) {
			
		},
		getSketchToolMetaData: function() {
			if (this._sketchToolMetaData == null) {
				this._sketchToolMetaData = new ResourceMetadata({
					resourceName: 'SketchTool'
				}).
				setLocal(true).
				addField({name: 'measuresEnabled', dataType: 'boolean', local: true, index: true}).
				addField({name: 'measureLengthUnit', dataType: 'string', local: true, index: true}).
				addField({name: 'measuresAreaUnit', dataType: 'string', local: true, index: true})
			}
			return this._sketchToolMetaData;
		},
		getMapConfigData: function() {
			if (this._mapConfigMetaData == null) {
				this._mapConfigMetaData = new ResourceMetadata({
					resourceName: 'plussmapconfig'
				}).
				setLocal(true).
				addField({
					name: 'showingOnlineMap',
					dataType: 'boolean',
					local: true,
					index: true
				})
			}
			return this._mapConfigMetaData;
		},
		
		initMapConfigCollection: function() {
			var metaData = this.getMapConfigData();		
			var credentials = {username: UserAuthenticationManager._getCurrentUser()};			
			PersistenceManager.initCollection(metaData, credentials);
		},
		
		deleteMapServicesCache: function() {
			var deferred = new Deferred();
			var mapServiceResource = new ResourceMetadata({
				resourceName: 'plussmapservice'
			}).
			setLocal(true).
			addField({name: 'exactremoteid', dataType: 'string', local: true,	index: true}).
			addField({name: 'identifier', dataType: 'string', local: true,	index: true}).
			addField({name: 'istiledlayer', dataType: 'boolean', local: true,	index: true}).
			addField({name: 'jsonfeatureserver', dataType: 'string', local: true,	index: true}).
			addField({name: 'jsonlayers', dataType: 'string', local: true,	index: true}).
			addField({name: 'jsonmapserver', dataType: 'string', local: true,	index: true}).
			addField({name: 'mapname', dataType: 'string', local: true,	index: true}).
			addField({name: 'proxy', dataType: 'boolean', local: true,	index: true}).
			addField({name: 'remoteid', dataType: 'string', local: true,	index: true}).
			addField({name: 'servicename', dataType: 'string', local: true,	index: true}).
			addField({name: 'serviceorder', dataType: 'integer', local: true,	index: true}).
			addField({name: 'tokensecuritypswd', dataType: 'string', local: true,	index: true}).
			addField({name: 'tokensecurityusername', dataType: 'string', local: true,	index: true}).
			addField({name: 'transparency', dataType: 'integer', local: true,	index: true}).
			addField({name: 'url', dataType: 'string', local: true,	index: true}).
			addField({name: 'visible', dataType: 'boolean', local: true,	index: true}).
			addField({name: 'webmapdefined', dataType: 'boolean', local: true,	index: true}).
			addField({name: '_querybases', dataType: 'string', local: true,	index: true}).
			addField({name: '_isChanged', dataType: 'boolean', local: true,	index: true}).
			addField({name: '_cleanupTokens', dataType: 'string', local: true,	index: true}).
			addField({name: '_errored', dataType: 'integer', local: true,	index: true}).
			addField({name: '_originalState', dataType: 'string', local: true,	index: true});
			
			PersistenceManager.findAll(mapServiceResource).then(lang.hitch(this, function(mapservices) {
				PersistenceManager.remove(mapServiceResource, mapservices).then(function () {
					deferred.resolve(true);
				});
			}));
			return deferred.promise;
		},
		
		deleteMapManagerCache: function() {
			var deferred = new Deferred();
			var mapManagerColletion = new ResourceMetadata({
				resourceName: 'plussmapmanager'
			}).
			setLocal(true).
			addField({name: 'active', dataType: 'boolean', local: true,	index: true}).
			addField({name: 'description', dataType: 'string', local: true,	index: true}).
			addField({name: 'exactremoteid', dataType: 'string', local: true, index: true}).
			addField({name: 'identifier', dataType: 'string', local: true, index: true}).
			addField({name: 'ismobile', dataType: 'boolean', local: true, index: true}).
			addField({name: 'mapsiteslist', dataType: 'string', local: true, index: true}).
			addField({name: 'remoteid', dataType: 'string', local: true, index: true}).
			addField({name: 'servicelist', dataType: 'string', local: true,	index: true}).
			addField({name: 'spatialtokensecurity', dataType: 'boolean', local: true, index: true}).
			addField({name: 'useproxy', dataType: 'boolean', local: true, index: true}).
			addField({name: '_cleanupTokens', dataType: 'string', local: true, index: true}).
			addField({name: '_errored',	dataType: 'integer', local: true, index: true}).
			addField({name: '_isChanged', dataType: 'boolean', local: true,	index: true}).
			addField({name: '_originalState', dataType: 'string', local: true, index: true}).
			addField({name: '_querybases', dataType: 'string', local: true, index: true});
			
			PersistenceManager.findAll(mapManagerColletion).then(lang.hitch(this, function(mapmanagers) {
				PersistenceManager.remove(mapManagerColletion, mapmanagers).then(function () {
					deferred.resolve(true);
				});
			}));
			return deferred.promise;
		},
		
		updateSketchToolConfig: function(measuresEnabled, measureLengthUnit, measuresAreaUnit) {
			var metaData = this.getSketchToolMetaData();
			var promise = this.getSketchToolConfig();
			promise.then(lang.hitch(this, function(sketchConfig) {
				if (sketchConfig == null) {
					var jsonToAdd = [{
						'measuresEnabled': measuresEnabled,
						'measureLengthUnit': measureLengthUnit,
						'measuresAreaUnit': measuresAreaUnit,
					}];
					PersistenceManager.add(metaData, jsonToAdd).then(lang.hitch(this, function () {
					   	this.logEvent("Json added to Sketch Config store ", jsonToAdd);
					}));
				} else {
					if (measuresEnabled != null) {
						sketchConfig.json.measuresEnabled = measuresEnabled;
					}
					if (measureLengthUnit != null) {
						sketchConfig.json.measureLengthUnit = measureLengthUnit;
					}
					if (measuresAreaUnit != null) {
						sketchConfig.json.measuresAreaUnit = measuresAreaUnit;
					}
					PersistenceManager.replace(metaData, sketchConfig).then(lang.hitch(this, function () {
					   	this.logEvent("Json REPLACED to Sketch Config store ", sketchConfig);
					}));
				}
			}));
		},
		updateMapConfig: function(showingOnlineMap) {
			this.initMapConfigCollection();
			var metaData = this.getMapConfigData();
			var promise = this.getMapConfig();
			promise.then(lang.hitch(this, function(mapConfig) {
				var jsonToAdd = [{
					'showingOnlineMap': showingOnlineMap
				}];
				if (mapConfig == null) {
					PersistenceManager.add(metaData, jsonToAdd).then(lang.hitch(this, function () {
					   	this.logEvent("Json added to Map Config store ", jsonToAdd);
					}));
				} else {
					mapConfig.json.showingOnlineMap = showingOnlineMap;
					PersistenceManager.replace(metaData, mapConfig).then(lang.hitch(this, function () {
					   	this.logEvent("Json REPLACED to Map Config store ", mapConfig);
					}));
				}
			}));
		},
		
		getSketchToolConfig: function() {
			var deferred = new Deferred();
			var metaData = this.getSketchToolMetaData();		
			PersistenceManager.findAll(metaData).then(lang.hitch(this, function(sketchConfigs) {
				if (sketchConfigs.length > 0) {
					deferred.resolve(sketchConfigs[0]);
				} else {
					deferred.resolve(null);
				}
				
			}));
			return deferred.promise;
		},
		getMapConfig: function() {
			var deferred = new Deferred();
			var metaData = this.getMapConfigData();		
			PersistenceManager.findAll(metaData).then(lang.hitch(this, function(mapConfigs) {
				if (mapConfigs.length > 0) {
					deferred.resolve(mapConfigs[0]);
				} else {
					deferred.resolve(null);
				}
				
			}));
			return deferred.promise;
		},
		
		logEvent: function(msg) {
			Logger.trace(msg);
			console.log(msg);
		},
		
	});
});
