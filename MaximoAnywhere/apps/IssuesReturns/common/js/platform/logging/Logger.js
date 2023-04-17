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

define(
		"platform/logging/Logger",
		["dojo/_base/declare",
		  "dojo/_base/lang",
		  "dojo/_base/array",
		  "dojo/json",
		  "platform/util/PlatformConstants",
		  "platform/translation/MessageService",
		  "dojo/number"],
		function (declare, lang, array, json, PlatformConstants, MessageService, numberUtil) {
			
			 var messageCache = [];
			 var windowsLogFileName = null;
			/** @class platform.logging.Logger */
			return {
				CLAZZ: 'platform.logging.Logger',
		        name: 'logger',
		        level: 0,
		        timeStamps: {},
		        timers: {},
		        timeTrackers: {},
		        filters: null,
		        reportEnableError: false,
		        reportEnableWarn: false,
		        reportEnableInfo: false,
		        reportEnableDebug: false,
		        reportEnableLog: false,
		        flushingBuffer: false,
		        loggerStore: null,
		        loggerId: 1,
		        //Start the logLimit high so we don't lose logs, then load from SystemProperties
		        logLimit: 0,

		        /** @memberOf platform.logging.Logger */
		        init: function (options) {
		            lang.mixin(this, options);
		            if (options.logLevel) {
		                this.level = options.logLevel;
		                
		                //If the app was built with a non-standard logLevel setting, we need to capture logs
		                if (this.level > 0) {
		                	localStorage.reportEnableError = true;
		                    localStorage.reportEnableInfo = true;
		                }
		                if (this.level > 1) {
		                    localStorage.reportEnableDebug = true;
		                } 
		            }

		            if (this.filters) {
		                this.filters = this.filters.split(',');
		            }

		            if (!localStorage.reportEnableError || localStorage.reportEnableError == "false") {
		                this.reportEnableError = false;
		            } else {
		                this.reportEnableError = true;
		            }

		            if (!localStorage.reportEnableInfo || localStorage.reportEnableInfo == "false") {
		                this.reportEnableInfo = false;
		            } else {
		                this.reportEnableInfo = true;
		                if (this.level < 1) {
		                    this.level = 1;
		                }
		            }

		            if (!localStorage.reportEnableDebug || localStorage.reportEnableDebug == "false") {
		                this.reportEnableDebug = false;
		            } else {
		                this.reportEnableDebug = true;
		                this.level = 2;
		            }
		            //Wait until I've loaded the level
		            this._initWorklightLogger(this.level);
		            if (localStorage.logLimit && localStorage.logLimit != "undefined" && !isNaN(JSON.parse(localStorage.logLimit))) {
		                this.logLimit = JSON.parse(localStorage.logLimit);
		            }
		            
		         
		        	if (WL.Client.getEnvironment() == WL.Environment.WINDOWS8) {
		        		this._preventWindowsCrash();
		            }
		        	
		            if (WL.Client.getEnvironment() == WL.Environment.WINDOWS8) {
			             this._enableWindowsLogFile();
		        	}
		        },
		        
		        /* This handles any error reporting on Windows
		         * If we don't do this, the app will actually crash whenever any javascript exception is thrown
		         */
		        _preventWindowsCrash: function() {
		        	if (WinJS && WinJS.Application) {
			        	//Catch and handle error by default
		                WinJS.Application.onerror = $.proxy(function (eventInfo) {
		                    var error;
		                    if (eventInfo.detail && eventInfo.detail.error) {
		                        error = eventInfo.detail.error;
		                        this.error("fatal error file: "+error.filename + " lineNumber: " + error.lineno + " message: " + error.message);
		                    } else {
		                        error = eventInfo;
		                        this.error("fatal error file: "+error.filename + " lineNumber: " + error.lineno + " message: " + error.message);
		                    }
		                    //Logged the error, keep the app from crashing
		                    if (UI && UI.application && UI.application.debug) {
		                    	var md = Windows.UI.Popups.MessageDialog;
		                    	var msg = new md(MessageService.createStaticMessage("checkAppLog").getMessage(), MessageService.createStaticMessage("JavascriptError").getMessage());
		                    	msg.showAsync();
		                    }
		                    return true;
		                },this);//Need to bind to this so I can log the error
		        	}
		        },
		        
		        _enableWindowsLogFile: function() {
		        	 /**
                    *
                    *This section enables persistent logging on Windows apps if debug is true for the app (instead of the traditional javascript logging)
                    * It writes a log file called log-<timestamp>Z.log to this directory:
                    * C:\Users\<yourusername>\AppData\Local\Packages\<the app UUID>\LocalState
                    * Usually you can just look into the most recently updated UUID directory to find the currently running app
                    */
	                
		            if (typeof (Worker) !== "undefined" && WL.Client.getEnvironment() == WL.Environment.WINDOWS8 && WinJS.Application && !this.log_worker) {
		                this.log_worker = new Worker('js/platform/logging/LogWorker.js');
		                this.log_worker.postMessage({ "action": "initLogFile", "data": "" });
		                //startFileLog();
		                //WinJS.log("hi there");
	                function logToFile(message) {
		                    messageCache.push('[TRACE] ' + dojo.date.locale.format(new Date(), { datePattern: "yyyy-MM-dd", timePattern: "HH:mm:ss.SSS" }) + ' ' + message);
	                };
		                var self = this;
		                setInterval(function () {
		                    if (messageCache && messageCache.length > 0) {
		                        var loglines = messageCache.join("\r\n");
		                        messageCache = [];
		                        self.log_worker.postMessage({ "action": "log", "data": loglines });
		                        //WinJS.log(loglines);
		                        messageCache = [];
		                    }
		                }, 5);

		                var console = {};
		                var messageCache = [];
	                window.console.log = logToFile;
	                window.console.error = logToFile;
	                window.console.warn = logToFile;
	                window.console.info = logToFile;
		            }

		        },
		        
		        _flushLogBuffer: function() {
		        	if (messageCache && messageCache.length > 0 && !this.flushingBuffer) {
		        		this.flushingBuffer = true;
                        var loglines = messageCache.join("\r\n");
                        WinJS.log(loglines);
                        messageCache = [];
                        this.flushingBuffer = false;
                    }
		        },

		        _initWorklightLogger: function (desiredLevel) {
		            //Worklight logger
		            switch (desiredLevel) {
		            	case (-2):
		            		WL.Logger.config({ level: 'ANAYTICS'});
		            		break;
		            	case (-1):
		            		WL.Logger.config({ level: 'FATAL'});
		            		break;
		                case (0):
		                    WL.Logger.config({ level: 'ERROR' });
		                    break;
		                case (1):
		                    WL.Logger.config({ level: 'WARN' });
		                    break;
		                case (2):
		                    WL.Logger.config({ level: 'INFO' });
		                    break;
		                case (3):
		                	WL.Logger.config({ level: 'LOG' });
		                	break;
		                case (4):
		                	WL.Logger.config({ level: 'DEBUG' });
		                	break;
		                case (5):
		                	WL.Logger.config({ level: 'TRACE' });
		                	break;
		                default:
		                    WL.Logger.config({ level: 'ERROR' });
		                    break;
		            }

		        },



		        getMessage: function (msg, params, ts, language) {
		            //to be defined if will use translation or not
		            var returnMessage = { string: msg };
		            if (params) {
		                returnMessage.string = this.replaceParams(returnMessage.string, params);
		            }
		            if (ts) {
		                returnMessage.string = ts + ":" + returnMessage.string;
		            }
		            return returnMessage;
		        },

		        replaceParams: function (string, params) {
		            var returnString = string;
		            for (index in params) {
		                returnString = returnString.replace("{" + index + "}", params[index]);
		            }
		            return returnString;
		        },

		        setLevel: function (level) {
		            this.level = level;
		            this._initWorklightLogger(level);
		            if (WL.Client.getEnvironment() == WL.Environment.WINDOWS8) {
		            	this._enableWindowsLogFile();
		            }
		        },

		        enableDebug: function () {
		            if (this.level < 2)
		                this.setLevel(2);
		        },
		        enableInfo: function () {
		            if (this.level < 1)
		                this.setLevel(1);
		        },
		        disableDebug: function () {
		            if (this.reportEnableInfo)
		                this.setLevel(1);
		            else
		                this.setLevel(0);
		        },
		        disableInfo: function () {
		            this.setLevel(0);
		        },

		        getTSKey: function (params) {
		            var key = "";
		            for (var paramIndex in params) {
		                key += params[paramIndex];
		            }
		            return key;
		        },

		        clear: function () {
		            this.loggerStore = null;
		        },

		        _addLoggerReport: function (logMsg) {
		            if (WL.Client.getEnvironment() == WL.Environment.WINDOWS8)
		                return;
		            if (this.logLimit == 0) {
		                this._reduceLogLimit();
		            }

		            if (this.loggerStore == null) {
		                var perfData = [{ id: this.loggerId, msg: logMsg }];
		                this.loggerStore = new dojo.store.Memory({ data: perfData });
		            } else {
		                this.loggerStore.put({ id: this.loggerId, msg: logMsg });           
		            }

		            this.loggerId += 1;
		            if (this.logLimit != 0 && this.loggerId > this.logLimit) {
		                this.loggerId = 1;
		                this.clear();
		            }
		        },

		        _reduceLogLimit: function () {
		            var self = this;
		            require(["platform/store/SystemProperties"],
							function (SystemProperties) {
							    if (SystemProperties) {
							        var limit = SystemProperties.getLogLineLimit();
							        if (!limit ||
											limit == undefined ||
											limit == NaN ||
											limit == '') {
							            return;
							        }
							        if (limit != self.logLimit) {
							            self.logLimit = numberUtil.parse(limit);
							            localStorage.logLimit = numberUtil.parse(limit);
							        }
							    }
							});
		        },

		        writeToLog: function (msg, level, clazzmethod) {
		            if (!msg.string) {
		                msg = { string: msg };
		            }
		            if (this.filters && level > 0) {
		                if (!dojo.some(this.filters, function (filter) {
					    	return msg.string.indexOf(filter) > -1;
		                })) {
		                    return;
		                }
		            }
		            switch (level) {
		                case (0):
		                    console.error(this._formatLogEntry(level, msg.string, clazzmethod));
		                    if (this.reportEnableError) {
		                        this._addLoggerReport(this._formatLogEntry(level, msg.string));
		                    }
		                    break;
		                case (1):
		                    console.warn(this._formatLogEntry(level, msg.string, clazzmethod));
		                    if (this.reportEnableInfo) {
		                        this._addLoggerReport(this._formatLogEntry(level, msg.string));
		                    }
		                    break;
		                case (2):
		                	console.info(this._formatLogEntry(level, msg.string, clazzmethod));
	                    	if (this.reportEnableDebug) {
	                    		this._addLoggerReport(this._formatLogEntry(level, msg.string));
	                    	}
	                    	break;
		                case (3):
	                    	console.debug(this._formatLogEntry(level, msg.string, clazzmethod));
		                    if (this.reportEnableDebug) {
		                        this._addLoggerReport(this._formatLogEntry(level, msg.string));
		                    }
		                    break;
		                default:
		                    console.log(this._formatLogEntry(level, msg.string, clazzmethod));
		                    if (this.reportEnableInfo) {
		                        this._addLoggerReport(this._formatLogEntry(level, msg.string));
		                    }
		                    break;
		            }
		        },

		        _formatLogEntry: function(logLevel, message, clazzmethod) {
		        	var levelString = 'ERROR';
		        	switch (logLevel) {
		        	case (1):
		        		levelString='INFO';
		        	    break;
		        	case (2):
		        		levelString='DEBUG';
		        		break;
		        	}
		        	var logentry = '[' + MessageService.createStaticMessage(levelString).getMessage(this) + '] ';
		        	logentry += clazzmethod ? clazzmethod + ': ' + message : message;
		        	return dojo.date.locale.format(new Date(), { datePattern: "yyyy-MM-dd", timePattern: "HH:mm:ss.SSS" }) + logentry;
		        },
		        
		        profileStart: function (string) {
		            if (this.level >= 3) {
		                string = PlatformConstants.LOG_PROFILE + string;
		                if (this.filters && level > 0) {
		                    if (!dojo.some(this.filters, function (filter) {
						    	return string.indexOf(filter) > -1;
		                    })) {
		                        return;
		                    }
		                }
		                console.profile(string);
		            }
		        },

		        profileEnd: function (string) {
		            if (this.level >= 3) {
		                console.profileEnd(PlatformConstants.LOG_PROFILE + string);
		            }
		        },

		        timerStart: function (string, level) {
		        	if (!level) {
		        		level=1;
		        	}
		            if (trackTimeEnabled) {
		                // we always want to record to TimeTrack
		                var trackTimer = new TrackTime("Logger -> TimeTrack", string, string, false);
		                trackTimer.startTracking();
		                this.timeTrackers[string] = trackTimer;
		            }
		            
		            if(this.canLog(level)) {
		            	string = PlatformConstants.LOG_TIMER + string;
			            if (this.filters && level > 0) {
			            	if (!dojo.some(this.filters, function (filter) {
							    return string.indexOf(filter) > -1;
			                })) {
			                    return;
			                }
			            }
			            this.timers[string] = { start: (new Date()).valueOf() };
		            }
		        },

		        timerEnd: function (string, level) {
		        	if (!level) {
		        		level=1;
		        	}
		            if (trackTimeEnabled) {
		                var timeTracker = this.timeTrackers[string];
		                if (timeTracker) {
		                    timeTracker.stopTracking();
		                    delete this.timeTrackers[string];
		                }

		            }
					if (this.canLog(level)) {
						var endDate = new Date();
						string = PlatformConstants.LOG_TIMER + string;
						var timer = this.timers[string];
						if (!timer) {
							// console.log('no timer with id ['+string+'] has been started');
							return;
						}
						this.writeToLog(string + ': ' + (endDate.valueOf() - timer.start) + 'ms', level);
						delete this.timers[string];
					}
		        },

		        getCallerClazzMethodString: function(clazz, callee) {
		        	/* Helper method to get the caller class & method string
		        	 * parameters:
		        	 * clazz (String)
		        	 * method (String)
		        	 * returns (String) i.e.: Logger.getCallerClazzMethodString
		        	 */
		        	var callerMethod = this._getCallerMethod(callee);
		        	if(clazz) {
		        		// check if the method isn't in the clazz param
		        		if(clazz.search(callerMethod) == -1) {
		        			return clazz + '.' + callerMethod;
		        		}
		        		else {
		        			return clazz;
		        		}
		        	}
		        	else if(callerMethod != 'NO-METHOD') {
		        		// no clazz, but at least a method name
		        		return 'NO-CLASS.' + callerMethod;
		        	}
		        	else {
		        		// we have nothing
		        		return null;
		        	}
		        },
		        
		        log: function (string, level, params, clazz, callee) {
		        	if(this.canLog(level)) {
		        		var ts = this.timeStamps[this.getTSKey(params)];
			            if (ts) {
			            	ts = ((new Date()).getTime() - ts.getTime()) / 1000;
			            }
			            var msg = this.getMessage(string, params, ts);
			            if (level == undefined)
			               level = 2;
			            this.writeToLog(msg, level, this.getCallerClazzMethodString(clazz, callee));
		            }
		        },

		        systemLog: function (string, level, params, clazz) { //no localization to avoid redundancy
		        	if(this.canLog(level)) {
		        		var msg = this.getMessage(string, params, null, 'EN');
		        		this.writeToLog(msg, 1, this.getCallerClazzMethodString(clazz, arguments.callee)); //write out English message as a warning
		            }
		        },
		        debug: function (string, params, clazz) {
		        	this.log(PlatformConstants.LOG_DEBUG + string, 3, params, clazz, arguments.callee);
		        },
		        trace: function (string, params, clazz) {
		        	this.log(PlatformConstants.LOG_TRACE + string, 2, params, clazz, arguments.callee);	
		        },
		        warn: function (string, params, clazz) {
		        	this.log(PlatformConstants.LOG_WARN + string, 1, params, clazz, arguments.callee);
		        },
		        error: function (string, params, clazz) {
		        	this.log(PlatformConstants.LOG_ERROR + string, 0, params, clazz, arguments.callee);
		            //Always flush the LogBuffer on error to catch critical exceptions
		            this._flushLogBuffer();
		        },
		        traceJSON: function (string, jsonObject, clazz) {
		        	var level = 2;
		        	var jsonString = "";
		        	if(this.canLog(level)){ 
		        		try {
		        			jsonString = JSON.stringify(jsonObject);
		        		} finally {
		        			this.log(PlatformConstants.LOG_TRACE + string + " json: " + jsonString, 2, null, clazz, arguments.callee);
		        		}
		        	}
		        },
		        traceModelData: function(string, level, record, clazz, metadata) {
		        	var remoteid = record[PlatformConstants.LOCAL_UNIQUEID_ATTRIBUTE];
		        	if(!metadata) {
		        		metadata = typeof record.getMetadata == 'function' ? record.getMetadata() : {name: '--no-metadata--'};
		        	}
		        	var encodedKey = remoteid.substring(remoteid.lastIndexOf('/')+2); // skip the first char in the id '_
		        	var decodedKey = null;
		        	try {
		        		decodedKey = atob(encodedKey);
		        	}
		        	catch(e) {
		        		return;
		        	}
		        	string += string + ' | ' + metadata.name + ' | ' + decodedKey + ' | ' + remoteid;
		        	this.log(PlatformConstants.LOG_TRACE + string, level, null, clazz, arguments.callee);
		        },
		        traceModelDataSet: function(string, level, resource, clazz) { 
		        	var metadata = typeof resource.getMetadata == 'function' ? resource.getMetadata() : {name: '--no-metadata--'};
		        	this.log(PlatformConstants.LOG_TRACE + string, level, null, clazz, arguments.callee);
		        	for(index in Object.keys(resource.data)) {
		        		this.traceModelData(string, level, resource.data[index], this.CLAZZ, metadata);
		        	}
		        },
		        
		        errorJSON: function (string, jsonObject, clazz) {
		        	var level = 0;
		        	if (level <= this.level) {
		        		var jsonString = "";
		        		try {
		        			jsonString = JSON.stringify(jsonObject);
		        		} finally {
		        			this.log(string + " json: " + jsonString, 0, null, clazz, arguments.callee);
		        		}
		        	}
		        },
		        logEntry: function (params) {
		            this.timeStamps[this.getTSKey(params)] = new Date();
		            this.log("entry", 2, params);
		        },

		        logExit: function (className, funcName, id) {
		            this.log("exit", [className, 2, funcName, id]);
		        },

		        logObject: function (object, level, clazz) {
		        	if(this.canLog(level))
			        	this.writeToLog(json.stringify(object), 2, clazz+'.'+method);
			           
		        },
		        
		        canLog: function(level){
		        	if(level == null || isNaN(level)){
		        		return false;
		        	}
		        	
		        	return (level <= this.level);
		        },
		        
		        _getCallerMethod: function(callee) {
		        	var method = '';
		        	try {
		        		method = callee.caller.name;
		        	}
		        	catch(e) {
		        		method = 'NO-METHOD';
		        	}
		        	finally {
		        		return method ? method : 'NO-METHOD';
		        	}
		        }
		        
		    };
		});
