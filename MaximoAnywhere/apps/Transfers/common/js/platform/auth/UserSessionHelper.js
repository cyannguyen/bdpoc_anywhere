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

define("platform/auth/UserSessionHelper", [
	   "dojo/_base/lang",
       "dojo/_base/array",
	   "dojox/string/Builder"
	   ],	function(lang, arrayUtil, StringBuilder) {

	var cookieDirectives = ['expires', 'max-age', 'domain', 'path', 'secure', 'samesite', 'httponly'];

	/* User Session Helper
	 * set of methods to help in user session manipulation (cookie)
	 */
	return {

		// Given a sessionid, returns a string updating and/or adding new tokens.
/**@memberOf platform.auth.UserSessionHelper */
		
		updateSession: function(sessionid, setCookie) {
			var sessionidMap = this.mapCookie(sessionid);
			var setCookieMap = this.mapCookie(setCookie);
			lang.mixin(sessionidMap, setCookieMap);
			return this.getCookieFromMap(sessionidMap);
		},
		
		// Given a Set-Cookie, maps it returning the content in a JSON map style
		mapCookie: function(setCookie) {
			var map = {};
			var setCookieArray = null;
			if(lang.isArray(setCookie)) {
				setCookieArray = setCookie;
			}
			else {
				//TpaeCustomLoginModule separates cookies with a comma
				setCookieArray = setCookie.trim().split(',');
			}
			arrayUtil.forEach(setCookieArray, function(item) {
				var cookiePieces = item.trim().split(';');
				//Break up pieces of cookie.  Could have cookie directives like HttpOnly or path that are not needed for requests
				arrayUtil.forEach(cookiePieces, function(piece) {
					var equalIndexOf = piece.indexOf('=');
					if(equalIndexOf > 0) {
						var key = piece.slice(0, equalIndexOf).trim();
						if (cookieDirectives.indexOf( key.toLowerCase()) == -1){
							var value = piece.slice(equalIndexOf+1); 
							map[key] = value;
						}
					}
				});
			});
			return map;
		},
		
		// Given a JSON map, returns a cookie containing all tokens
		getCookieFromMap: function(map) {
			cookieBuilder = new StringBuilder();
			var first = true;
			for(var member in map) {
				if(!first) {
					cookieBuilder.append('; ');
				}
				cookieBuilder.append(member);
				first = false;
				if(map[member]) {
					cookieBuilder.append('=' + map[member]);
				}
			}
			return cookieBuilder.toString();
		}
	};
});
	 
