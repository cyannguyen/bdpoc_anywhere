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

define( "platform/translation/DynamicMessage", 
		[ "dojo/_base/declare",
		  "dojox/html/entities",
		  "platform/translation/Message"
		     ],
	function(declare, HtmlEntities, Message) {
		return declare("platform.translation.DynamicMessage",Message, {
			//need to get label bundle through dojo stuff
			
					
			constructor:function(messageId,resolverClass, resolverMethod){
				this.textMsg = messageId;
				this.resolverClass = resolverClass;
				this.resolverMethod = resolverMethod;
			  },
			  
/**@memberOf platform.translation.DynamicMessage */
			getMessage: function(runtimeContext){
				var messageInfo = runtimeContext;
				if(this.resolverClass && this.resolverMethod){
					messageInfo = this;
				}
				var method = messageInfo.resolverFunction? messageInfo.resolverFunction : messageInfo.resolverMethod;
				if(messageInfo.resolverClass && method){
					var handlerClass = runtimeContext.application[messageInfo.resolverClass];
					if(handlerClass && handlerClass[method]){
						var params = handlerClass[method](runtimeContext);
						return this.replaceParams(this.textMsg, params);
					}
				}
				return this.textMsg;
			},
			
			replaceParams : function(strings, params) {
				var returnString = strings;
				if(typeof params == 'string') {
					params.apply();
				}
			    for (index in params) {
			    	returnString = returnString.replace("{" + index + "}", (typeof params[index] === 'string' && (params[index].indexOf('€') == -1 && params[index].indexOf('Š') == -1 && params[index].indexOf('š') == -1 && params[index].indexOf('Ž') == -1 && params[index].indexOf('ž') == -1 && params[index].indexOf('Č') == -1 && params[index].indexOf('č') == -1 && params[index].indexOf('Œ') == -1 && params[index].indexOf('œ') == -1 && params[index].indexOf('Ÿ') == -1 && params[index].indexOf('â') == -1 && params[index].indexOf('Â') == -1))? HtmlEntities.encode(params[index]) : params[index]);
			    }
			    return returnString;
			}
				
			});
		});
