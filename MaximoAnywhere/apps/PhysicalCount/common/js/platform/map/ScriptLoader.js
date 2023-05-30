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
 * This class loads a given script into the DOM
  */
define("platform/map/ScriptLoader",
[ "dojo/_base/lang",
  "dojo/Deferred" ], 
function(lang, Deferred) {
	var result = {
		// returns a promise, once the OpenLayer api is loaded it resolves it
/**@memberOf platform.map.ScriptLoader */
		/*Promise*/ load: function(url) {
			var deferred = new Deferred();
			var script = document.createElement("script");
			//script.setAttribute("type", "text/javascript");//this is causing warnings on windows environment
			script.setAttribute("src", url);
			script.onload = function(){
			    deferred.resolve();
			};
			document.body.appendChild(script);
			
			return deferred.promise;
		}
	};
	return lang.setObject("platform.map.ScriptLoader", result);
});
