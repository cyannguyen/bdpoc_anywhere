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

define("application/handlers/MeterDownloadManager",
["exports",
 "dojo/_base/lang",
 "dojo/Deferred",
 "platform/logging/Logger",
 "platform/store/SystemProperties",
 "platform/comm/_ConnectivityChecker",
 "platform/model/ResourceDownloadManager",
 "platform/store/_ResourceMetadataContext"], 
function(thisModule, lang, Deferred, Logger, SystemProperties, ConnectivityChecker, ResourceDownloadManager, ResourceMetadataContext) {

	var ttDownloadAllDataForWorklistResourceAndQueryBase = new TrackTime("MeterDownloadManager", "downloadMeters", "Meters download", false);

	var classBody = lang.mixin(thisModule, {

/**@memberOf application.handlers.MeterDownloadManager */
		_initClassIfNeeded: function() {
			if (!this.init && ResourceDownloadManager.init){
				lang.mixin(this, ResourceDownloadManager);
				this.init();
			}
		},

		downloadResource: function(resourceName, queryBase){
			this._initClassIfNeeded();

			var self = this;

			ttDownloadAllDataForWorklistResourceAndQueryBase.startTracking();

			this._overallProcessing = new Deferred();

			var resourceMetadata = ResourceMetadataContext.getResourceMetadata(resourceName);

			this.needRecordLevelProgressInfo = true;			

			this.resourcesCount = 1;
			this.resourcesQueryBaseCount[resourceMetadata.name] = 1;
			this.sendRequestForAllResourceData(resourceMetadata, queryBase);
			this._overallProcessing.promise.
			always(function(){
				resourceMetadata.setWhereClause(null);
				ttDownloadAllDataForWorklistResourceAndQueryBase.stopTracking();
				self.cleanUp();
			});

			return this.progressInfo;
		},

		downloadAssetMeters: function() {
			return this.downloadResource('assetMeters');
		},

		downloadLocationMeters: function() {
			return this.downloadResource('locationMeters');
		}

	}, ResourceDownloadManager);

	if (classBody.init){
		classBody.init();
	}

});
