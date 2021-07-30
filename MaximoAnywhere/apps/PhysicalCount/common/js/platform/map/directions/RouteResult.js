/*
 * Licensed Materials - Property of IBM
 *
 * 5725-M39
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * createdBy: lcassa@br.ibm.com
 * This class holds data about a route result from a directions service
 */
define("platform/map/directions/RouteResult", 
[ "dojo/_base/declare",
  "platform/logging/Logger"], 
function(declare, Logger) {
	/** @class platform.map.directions.RouteResult */
	return declare(null, {
		// a set of x,y points,
		// i.e. [[-46.624919, -23.609519],[-46.626919, -23.609719]]
		
		geometryPath: [], 
		// the estimated time arrival for the whole directions path
		ETA: null,
		// distance covered by all the legs/steps
		distance: null,
		// km or mi
		distanceUnit: null,
		// language to retrieve the step-by-step directions
		// i.e. en-US, pt-BR, etc
		language: null,
		// if this route is for driving, walking, etc
		travelMode: null,
		// the step-by-step directions
		directions: null,
		// an array of platform.map.directions.DirectionsLeg, 
		// which should contain an array of platform.map.directions.DirectionsStep
		/*DirectionsLeg*/ legs: [],
		// the original result from the directions service being used
		_originalRouteResults: null,
		
		//keeping on RouteResult the points that were the source to generate routes in the exact that they were used on route service, 
		//we can know if we can reuse a RouteResult (cache) or we need generate a new one from route service.
		//IMPORTANT: We are not using 'pure' localizedResources to avoid circular reference and save memory.
		points: [],

		constructor: function(/*Array*/ geometryPath, /*double*/ ETA, /*double*/ distance, /*String*/ distanceUnit, /*String*/ language, /*String*/ travelMode, /*String*/ directions, /*DirectionsLeg[]*/ legs, /*LocalizedResource*/ localizedResources) {
			this.geometryPath = geometryPath;
			this.ETA = ETA;
			this.distance = distance;
			this.distanceUnit = distanceUnit;
			this.language = language;
			this.travelMode = travelMode;
			this.directions = directions;
			this.legs = legs;
			this.points = [];
			
			//store just the points, not the entire LocalizedResources
			var self = this;
			localizedResources.forEach(function(elem, pos, array){
                self.points.push({"x":elem.x, "y":elem.y});
            });
		},
		/** @memberOf platform.map.directions.RouteResult 
		* the implementation should set the original route results generated by the Directions service provider used
		* i.e. Google Maps Directions API
		*/
		setProviderRouteResults: function(originalRouteResults) {
			this._originalRouteResults = originalRouteResults;
		},

		// return the original route results generated by the Directions service provider used
		// i.e. Google Maps Directions API
		getProviderRouteResults: function() {
			if (!this._originalRouteResults) {
				Logger.warn("Original RouteResults from provider not available");
			};
			return _originalRouteResults;
		}
	});
});
