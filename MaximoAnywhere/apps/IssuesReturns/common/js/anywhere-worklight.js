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
var WLFoundation = (function () {
	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var MFConstants_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MFConstants = void 0;
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
	// eslint-disable-next-line no-undef

	const MFConstants = {
	  REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
	  FRAMEWORK: 'MF'
	};
	exports.MFConstants = MFConstants;
	});

	unwrapExports(MFConstants_1);
	var MFConstants_2 = MFConstants_1.MFConstants;

	var NetworkUtil = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;


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


	var _default = {
	  timeoutTimer: null,

	  /*
	   * Timeout a function call(usually request calls) after the specified timeout period.
	   *
	   * @param {function} requestFunction A function to be called (Ussually a request function)
	   * @param {Array} callArgsArray Argument that needs to passed when the requestFunction is called
	   * @param {Number} ms Timeout value after which this method will abort the requestFunction call
	   * @returns {Object|String} Return a Request_TImeout error if the function call was aborted or else returns the requestFunction response
	   */

	  /*
	  * @example
	  * Assuming a sendPingRequest need to be called with options as its argument
	  * let sendPing = this.sendPingRequest.bind(this);
	  * let result = await NetworkUtil.requestWithAnExpiry(sendPing, [options], timeout); 
	  */
	  requestWithAnExpiry: function requestWithAnExpiry(requestFunction, callArgsArray, ms) {
	    return Promise.race([Reflect.apply(requestFunction, undefined, callArgsArray), this.timeout(ms)]).then(resp => {
	      if (this.timeoutTimer) {
	        clearTimeout(this.timeoutTimer);
	      }

	      return resp;
	    });
	  },

	  /*
	   * Timer function that count till a certain period
	   *
	   * @param {Number} ms Timeout Value that the funtion counts till before returning
	   * @returns {Primose} Returns if Timeout error string after the function completes counting
	   */
	  timeout: function timeout(ms) {
	    return new Promise(resolve => {
	      this.timeoutTimer = setTimeout(() => {
	        resolve(MFConstants_1.MFConstants.REQUEST_TIMEOUT);
	      }, ms);
	    });
	  }
	};
	exports.default = _default;
	});

	unwrapExports(NetworkUtil);

	var Factory_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	/**
	 * A Factory Holder for managing an implementation.  A factory can hold a class reference and instantiate when it is needed.  The purpose of the
	 * factory pattern is to allow the implementation of some parts of the system to be pluggable either at runtime or build time.
	 */

	class Factory {
	  /**
	   * Setup Factory with default class implementation.
	   * 
	   * @param {class} Klass - The class reference that the factory will build.
	   */
	  constructor(Klass) {
	    this.Klass = Klass;
	    this.instance = null;
	  }
	  /**
	   * Return the singleton instance.  Create an instance if it has not been created yet.
	   * 
	   * @param {Object} options - Options that should be passed to class instance.
	   * 
	   * @returns {any} - An instance of type Klass.
	   */


	  get(options) {
	    if (!this.instance) this.instance = this.newInstance(options);
	    return this.instance;
	  }
	  /**
	   * Set/Override the Class Implementation for the factory. 
	   * 
	   * @param {class} klass - The new Class Implementation.
	   */


	  setImplementation(klass) {
	    this.Klass = klass;
	    this.instance = null;
	  }
	  /**
	   * Create a new instance of the current implementation.
	   * 
	   * @param {Object} options - Options for the new instance.
	   * @returns {any} - A new instance of type Klass.
	   */


	  newInstance(options) {
	    return new this.Klass(options);
	  }

	}

	var _default = Factory;
	exports.default = _default;
	});

	unwrapExports(Factory_1);

	var LogPrinter_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.LogPrinterFactory = exports.LogPrinter = void 0;

	var _Factory = _interopRequireDefault(Factory_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/**
	 * LogPrinter is a Factory class that manages "where" and "how" a log message is printed.  The defult implementation using the console.
	 */


	class LogPrinter {
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // istanbul ignore next - used in testing
	    // eslint-disable-next-line no-console

	    this.log = options.log || console.log; // NOTE: 5 is how many stack frame we have to traverse in order to get to the caller.  This changes depending on the LogPrinter Impl, etc.
	    // istanbul ignore next - almost never going to be used

	    this.initialStackFrame = options.initialStackFrame instanceof Number ? options.initialStackFrame : 5; // istanbul ignore next - almost never going to be used

	    this.stackFrameCount = options.stackFrameCount instanceof Number ? options.stackFrameCount : 2;
	  }
	  /**
	   * @param {any} value - Value to test.
	   * @returns {boolean} True if the value is a function.
	   * @private
	   */


	  isFunction(value) {
	    return value && (typeof value === 'function' || value instanceof Function);
	  }
	  /**
	   * @returns {Function} JSON.stringify() replacer function that will remove circular references and functions.
	   * @private
	   */


	  stringifyHelper() {
	    const seen = new WeakSet();
	    return (key, value) => {
	      if (typeof value === 'object' && value !== null) {
	        if (seen.has(value)) {
	          return;
	        }

	        seen.add(value);
	      }

	      if (this.isFunction(value)) {
	        return;
	      }

	      return value;
	    };
	  }
	  /**
	   * Formats and then prints a log message to the given Log instance.
	   *
	   *
	   * @param {Log} logImpl - Log instance.
	   * @param {string} prefix - Usally ERROR, WARN, DEBUG, etc.
	   * @param {number} level - Numeric log level.
	   * @param {string} tag - Arbitratry string to tag on a message.  Might be clssname, system area, etc.
	   * @param {string} msg - String message %s format characters.
	   * @param  {...any} args - Any other items to be printed, or any errors.
	   *
	   * @returns {any} - An error only if there is one, otherwise nothing is returned.
	   */


	  print(logImpl, prefix, level, tag, msg) {
	    for (var _len = arguments.length, args = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
	      args[_key - 5] = arguments[_key];
	    } // istanbul ignore else


	    if (args) {
	      args = args.map(e => {
	        if (e instanceof Error) return e;

	        if (typeof e === 'object' || Array.isArray(e)) {
	          try {
	            // in the browser, objects and arrays need to be converted before being logged, or
	            // the state of the object is mutated later in the console.
	            return JSON.parse(JSON.stringify(e, this.stringifyHelper()));
	          } catch (ex) {
	            // failed to stringify, but don't crash everything.
	            // istanbul ignore next
	            return e;
	          }
	        }

	        return e;
	      });
	    }

	    let formattedDate = new Date().toISOString();

	    if (logImpl.logCaller) {
	      const logLines = new Error().stack.split('\n');
	      const callerNames = logLines.slice(this.initialStackFrame, this.initialStackFrame + this.stackFrameCount);

	      if (logImpl.context) {
	        this.log(`${formattedDate}: [${prefix}]: [${logImpl.context}]: [${tag}]: ${msg}`, ...args, callerNames);
	      } else {
	        this.log(`${formattedDate}: [${prefix}]: [${tag}]: ${msg}`, ...args, callerNames);
	      }
	    } else if (logImpl.context) {
	      this.log(`${formattedDate}: [${prefix}]: [${logImpl.context}]: [${tag}]: ${msg}`, ...args);
	    } else {
	      this.log(`${formattedDate}: [${prefix}]: [${tag}]: ${msg}`, ...args);
	    }
	  }

	}

	exports.LogPrinter = LogPrinter;
	const LogPrinterFactory = new _Factory.default(LogPrinter); // export the Class and Factory

	exports.LogPrinterFactory = LogPrinterFactory; // the default export is the factory, so that default consumers will need to call .get() in order to get the impl.

	var _default = LogPrinterFactory;
	exports.default = _default;
	});

	unwrapExports(LogPrinter_1);
	var LogPrinter_2 = LogPrinter_1.LogPrinterFactory;
	var LogPrinter_3 = LogPrinter_1.LogPrinter;

	var Log_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.Log = exports.log = void 0;

	var _LogPrinter = _interopRequireDefault(LogPrinter_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/*
	 * @license
	 * Licensed Materials - Property of IBM
	 * 5724-U18
	 * Copyright IBM Corporation. 2018
	 */

	/**
	 * Simple Log abstraction with ability to log messages at different levels.  The {level} is used to determine the log level.
	 *
	 * Log messages can accept the slf4j {} argument holders or browser %s argument placeholders.  Developers should avoid
	 * using javascript template strings, even though they are supported, and pass arguments as parameters, which has better performance
	 * especially when log levels are disabled.
	 *
	 * For normal logging developers should not need to worry about using the isXXX methods.  We may automatically rewrite the javascript
	 * log.X methods and prefix with the isXXX checks.
	 */


	const LOG_PREFIXES = ['ERROR', ' WARN', ' INFO', 'DEBUG', 'TRACE'];

	class Log {
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    this.level = options.level || Log.LEVEL_INFO; // eslint-disable-next-line no-console

	    this.log = options.log || console.log;
	    this.logCaller = options.logCaller === true;
	    this.logPrinter = options.logPrinter || _LogPrinter.default.get(); // the context is a global log indentier that can be set to a string, and will appear in every log message.
	    // this would be used, eg, to set the application ID, or the Page Name, so that all logging statements within
	    // that context would print those values.

	    this.context = null;
	  }
	  /**
	   * Log a TRACE message.
	   *
	   * @param {string} tag -Tag representing where the log was called from.
	   * @param {any} args - Additional items to be logged.
	   */


	  t(tag) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    this.print(Log.LEVEL_TRACE, tag, ...args);
	  }
	  /**
	   * Return true if TRACE is enabled.
	   *
	   * @returns {boolean} - True if TRACE is enabled.
	   */


	  isTrace() {
	    return Log.LEVEL_TRACE <= this.level;
	  }
	  /**
	   * Log a debug message.
	   *
	   * @param {string} tag -Tag representing where the log was called from.
	   * @param {any} args - Additional items to be logged.
	   */


	  d(tag) {
	    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    this.print(Log.LEVEL_DEBUG, tag, ...args);
	  }
	  /**
	   * Return true if DEBUG is enabled.
	   *
	   * @returns {boolean} - True if DEBUG is enabled.
	   */


	  isDebug() {
	    return Log.LEVEL_DEBUG <= this.level;
	  }
	  /**
	   * Log an INFO message.
	   *
	   * @param {string} tag -Tag representing where the log was called from.
	   * @param {any} args - Additional items to be logged.
	   */


	  i(tag) {
	    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    this.print(Log.LEVEL_INFO, tag, ...args);
	  }
	  /**
	   * Return true if INFO is enabled.
	   *
	   * @returns {boolean} - True if INFO is enabled.
	   */


	  isInfo() {
	    return Log.LEVEL_INFO <= this.level;
	  }
	  /**
	   * Log a WARN message.
	   *
	   * @param {string} tag -Tag representing where the log was called from.
	   * @param {any} args - Additional items to be logged.
	   */


	  w(tag) {
	    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      args[_key4 - 1] = arguments[_key4];
	    }

	    this.print(Log.LEVEL_WARN, tag, ...args);
	  }
	  /**
	   * Return true if WARN is enabled.
	   *
	   * @returns {boolean} - True if WARN is enabled.
	   */


	  isWarn() {
	    return Log.LEVEL_WARN <= this.level;
	  }
	  /**
	   * Log an ERROR message.
	   *
	   * @param {string} tag -Tag representing where the log was called from.
	   * @param {any} args - Additional items to be logged.
	   */


	  e(tag) {
	    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	      args[_key5 - 1] = arguments[_key5];
	    }

	    this.print(Log.LEVEL_ERROR, tag, ...args);
	  }
	  /**
	   * Return true if ERROR is enabled.
	   *
	   * @returns {boolean} - True if ERROR is enabled.
	   */


	  isError() {
	    return Log.LEVEL_ERROR <= this.level;
	  }

	  print(level, tag, msg) {
	    if (level <= this.level) {
	      for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
	        args[_key6 - 3] = arguments[_key6];
	      }

	      this.logPrinter.print(this, LOG_PREFIXES[level], level, tag, msg, ...args);
	    }
	  }

	}

	exports.Log = Log;
	Log.LEVEL_TRACE = 4;
	Log.LEVEL_DEBUG = 3;
	Log.LEVEL_INFO = 2;
	Log.LEVEL_WARN = 1;
	Log.LEVEL_ERROR = 0;
	const log = new Log();
	exports.log = log;
	var _default = log;
	exports.default = _default;
	});

	unwrapExports(Log_1);
	var Log_2 = Log_1.Log;
	var Log_3 = Log_1.log;

	var Constants = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.framework = void 0;
	const framework = "JS";
	exports.framework = framework;
	});

	unwrapExports(Constants);
	var Constants_1 = Constants.framework;

	var EventEmitter_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-EventEmitter';
	/**
	 * The EventHolder class maintains the event function and other information about the event that needs to be run.
	 */

	class EventHolder {
	  constructor(event, func, bus) {
	    let once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    this.event = event;
	    this.func = func;
	    this.bus = bus;
	    this.once = once;
	  }

	  run() {
	    this.func(...arguments);
	  }

	}
	/**
	 * EventEmitter is an event bus that can be used by other classes that need to offer publish/subscribe messaging.
	 */


	class EventEmitter {
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    this._events = {};

	    if (options.canThrowEventErrors) {
	      this.canThrowEventErrors = true;
	    }
	  }
	  /**
	   * Register listener for the given event name.  If once is true, then the listener will only be called once.
	   * 
	   * @param {string} event - Event name.
	   * @param {Function} listener - Listener for the event.
	   * @param {boolean} once - If true then the listener will only be called once.
	   */


	  on(event, listener) {
	    let once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    if (typeof event !== 'string') {
	      throw new Error(`Error: .on() first arg needs to be a string but was ${typeof event}`);
	    }

	    if (typeof listener !== 'function') {
	      throw new Error(`Error: .on() second arg needs to be a function but was ${typeof listener}`);
	    }

	    let listeners = this._events[event];
	    if (!listeners) this._events[event] = listeners = [];

	    let i = this._findIndex(listeners, listener);

	    if (i < 0) {
	      listeners.push(new EventHolder(event, listener, this, once));
	    } else {
	      _Log.default.t(TAG, 'Attempted to add a listener %s, but listener function already exists', event, listener);
	    }

	    return this;
	  }
	  /**
	   * Register listener that is only ever called once for the given event name.  Convenience method for .on(event, listener, true).
	   * 
	   * @param {event} event - The event to be listened for.
	   * @param {Function} listener - The listener for the event. 
	   * 
	   * @returns {EventEmitter} - The EventEmitter, with the given listener registered.
	   */


	  once(event, listener) {
	    return this.on(event, listener, true);
	  }
	  /**
	   * Find the index of the listener within the listeners array.
	   * 
	   * @param {Array} listeners - The array of all listeners.
	   * @param {Function} listener - The listener hat is being searched for. 
	   * @returns {number} - The index of listener in listeners (or -1 if it is not in the list).
	   * @private
	   * 
	   */


	  _findIndex(listeners, listener) {
	    let i = listeners.findIndex(e => {
	      return e.func === listener;
	    });
	    return i;
	  }
	  /**
	   * Turn off or remove the given listener for the event name.
	   * 
	   * @param {string} event - Event name.
	   * @param {Function} listener - Listener function.
	   */


	  off(event, listener) {
	    if (typeof event !== 'string') {
	      throw new Error(`Error: .off() first arg needs to be a string but was ${typeof event}`);
	    }

	    if (typeof listener !== 'function') {
	      throw new Error(`Error: .off() second arg needs to be a function but was ${typeof listener}`);
	    }

	    let listeners = this._events[event];

	    if (listeners && listeners.length) {
	      let i = this._findIndex(listeners, listener);

	      if (i > -1) {
	        listeners.splice(i, 1);
	      } else {
	        _Log.default.w(TAG, 'Attempted to remove a listener from event "%s", but listener does not exist', event, listener);
	      }
	    } else {
	      _Log.default.t(TAG, 'Attempted to remove listener from event %s but event does not exist', event);
	    }

	    return this;
	  }
	  /**
	   * Emit or fire the given event name with the args passed.
	   *
	   * @param {string} event - Event name.
	   * @param {...Object} args - Event parameters.
	   */


	  emit(event) {
	    let remove = [];
	    let listeners = this._events[event];

	    if (listeners && listeners.length) {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      for (let i = 0; i < listeners.length; i++) {
	        let listener = listeners[i];

	        _Log.default.t(TAG, "Handling event '%s' in %s:%s (function: %s)", event, this.constructor.name, this.name, listener.func.name);

	        try {
	          if (listener.once) {
	            listener.run(...args);
	            remove.push(listener.func);
	          } else {
	            listener.run(...args);
	          }
	        } catch (e) {
	          _Log.default.w(TAG, 'Unhandled error while dispatching event %s.  Listeners should not throw errors.  In instance %s:%s (function: %s)', event, this.constructor.name, this.name, listener.func.name, e);

	          if (this.canThrowEventErrors) throw e;
	        }
	      }

	      if (remove.length) {
	        for (let i = 0; i < remove.length; i++) {
	          this.off(event, remove[i]);
	        }
	      }
	    } else {
	      _Log.default.t(TAG, '"%s" event was not handled in this instance (%s:%s)', event, this.constructor.name, this.name);
	    }
	  }
	  /**
	   * Returns the # of listeners for this event name.
	   * 
	   * @param {string} event - Event name.
	   * @returns {number} - The number of listeners that are listening for the specified event.
	   */


	  listenerCount(event) {
	    let listeners = this._events[event];
	    if (!listeners) return 0;
	    return listeners.length;
	  }
	  /**
	   * Returns the array of listeners bound to this event.
	   * 
	   * @param {string} event - Event name.
	   * @returns {Array} - The array of listeners bound to the specified event.
	   */


	  listeners(event) {
	    return this._events[event];
	  }

	}

	var _default = EventEmitter;
	exports.default = _default;
	});

	unwrapExports(EventEmitter_1);

	var Controllable_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _EventEmitter = _interopRequireDefault(EventEmitter_1);

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-Controllable';
	/**
	 * @typedef {class} Controller - A user supplied controller class for handling events in the UI
	 *
	 * @typedef {object} ControllableOptions
	 * @property {Controller[]} controllers - Array of controllers to manager
	 * @property {Controllable} parent - parent Controllable object to which events can be forwarded
	 */

	/**
	 * A Controllable object is a base object that manages controllers, and dispatching events to controllers.
	 */

	class Controllable extends _EventEmitter.default {
	  constructor(options) {
	    super();
	    this.controllers = [];

	    if (options) {
	      if (options.controllers && options.controllers.length) {
	        options.controllers.forEach(c => {
	          this.registerController(c);
	        });
	      }

	      if (options.parent) {
	        this.parent = options.parent;
	      }
	    }
	  }
	  /**
	   * Registers a controller to handle events.  The event name would need to match a method in the controller.
	   *
	   * @param {class} controller - Controller instance.
	   * @param {Array.string} events - Array of event names to which to bind to this controller.
	   */


	  registerController(controller, events) {
	    _Log.default.t(TAG, `Registering ${controller.constructor.name} with events`, events);

	    this.controllers.push(controller);
	    this.bindControllerToEvents(controller, events);
	    this.registerLifecycleEvents(controller);
	  }
	  /**
	   * Each "controllable" class might have a known set of lifecycle events that can be bound to events.  This method allows sub-classes
	   * to wire up those bound events.
	   *
	   * @param {Controllable} controller
	   */

	  /* eslint-disable no-unused-vars, no-empty-function */


	  registerLifecycleEvents(controller) {}
	  /**
	   * Binds this controller to the given events. The event name would need to match a method in the controller.
	   *
	   * @param {class} controller - Controller instance.
	   * @param {Array.string} events - Array of event names to which to bind to this controller. 
	   * @returns {void}
	   */


	  bindControllerToEvents(controller, events) {
	    if (events && events.length) {
	      events.forEach(e => this.bindEventOnController(controller, e));
	    }
	  }
	  /**
	   * Binds this controller to the given event name. The event name would need to match a method in the controller.
	   *
	   * @param {class} controller - Controller instance.
	   * @param {Array.string} event - Array of event names to which to bind to this controller.
	   */


	  bindEventOnController(controller, event) {
	    if (controller[event]) {
	      _Log.default.t(TAG, `Binding ${controller.constructor.name}.${event}`);

	      this.on(event, controller[event].bind(controller));
	    }
	  }
	  /**
	   * Bind all registered controllers to the given event name.  The event name would need to match a method in the controller.
	   * 
	   * @param {string} event - The event to bind controllers to.
	   */


	  bindControllersToEvent(event) {
	    if (this.controllers.length) {
	      this.controllers.forEach(c => {
	        this.bindEventOnController(c, event);
	      });
	    }
	  }
	  /**
	   * Emit or fire the given event name with the args passed. The behaviour here is that the event will be handled, and then, if there is a parent
	   * then the parent will given the chance to handle the event as well.
	   *
	   * @param {event} event - Event name.
	   * @param {any} args - Event args.
	   */


	  emit(event) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    super.emit(event, ...args);

	    if (this.parent) {
	      this.parent.emit(event, ...args);
	    }
	  }

	}

	var _default = Controllable;
	exports.default = _default;
	});

	unwrapExports(Controllable_1);

	/** MobX - (c) Michel Weststrate 2015 - 2018 - MIT Licensed */

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	/* global Reflect, Promise */
	var extendStatics = Object.setPrototypeOf || {
	  __proto__: []
	} instanceof Array && function (d, b) {
	  d.__proto__ = b;
	} || function (d, b) {
	  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	};

	function __extends(d, b) {
	  extendStatics(d, b);

	  function __() {
	    this.constructor = d;
	  }

	  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = Object.assign || function __assign(t) {
	  for (var s, i = 1, n = arguments.length; i < n; i++) {
	    s = arguments[i];

	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	  }

	  return t;
	};

	function __values(o) {
	  var m = typeof Symbol === "function" && o[Symbol.iterator],
	      i = 0;
	  if (m) return m.call(o);
	  return {
	    next: function () {
	      if (o && i >= o.length) o = void 0;
	      return {
	        value: o && o[i++],
	        done: !o
	      };
	    }
	  };
	}

	function __read(o, n) {
	  var m = typeof Symbol === "function" && o[Symbol.iterator];
	  if (!m) return o;
	  var i = m.call(o),
	      r,
	      ar = [],
	      e;

	  try {
	    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	  } catch (error) {
	    e = {
	      error: error
	    };
	  } finally {
	    try {
	      if (r && !r.done && (m = i["return"])) m.call(i);
	    } finally {
	      if (e) throw e.error;
	    }
	  }

	  return ar;
	}

	function __spread() {
	  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

	  return ar;
	}

	var OBFUSCATED_ERROR$$1 = "An invariant failed, however the error is obfuscated because this is an production build.";
	var EMPTY_ARRAY$$1 = [];
	Object.freeze(EMPTY_ARRAY$$1);
	var EMPTY_OBJECT$$1 = {};
	Object.freeze(EMPTY_OBJECT$$1);

	function getNextId$$1() {
	  return ++globalState$$1.mobxGuid;
	}

	function fail$$1(message) {
	  invariant$$1(false, message);
	  throw "X"; // unreachable
	}

	function invariant$$1(check, message) {
	  if (!check) throw new Error("[mobx] " + (message || OBFUSCATED_ERROR$$1));
	}
	/**
	 * Prints a deprecation message, but only one time.
	 * Returns false if the deprecated message was already printed before
	 */


	var deprecatedMessages = [];

	function deprecated$$1(msg, thing) {
	  if (process.env.NODE_ENV === "production") return false;

	  if (thing) {
	    return deprecated$$1("'" + msg + "', use '" + thing + "' instead.");
	  }

	  if (deprecatedMessages.indexOf(msg) !== -1) return false;
	  deprecatedMessages.push(msg);
	  console.error("[mobx] Deprecated: " + msg);
	  return true;
	}
	/**
	 * Makes sure that the provided function is invoked at most once.
	 */


	function once$$1(func) {
	  var invoked = false;
	  return function () {
	    if (invoked) return;
	    invoked = true;
	    return func.apply(this, arguments);
	  };
	}

	var noop$$1 = function () {};

	function unique$$1(list) {
	  var res = [];
	  list.forEach(function (item) {
	    if (res.indexOf(item) === -1) res.push(item);
	  });
	  return res;
	}

	function isObject$$1(value) {
	  return value !== null && typeof value === "object";
	}

	function isPlainObject$$1(value) {
	  if (value === null || typeof value !== "object") return false;
	  var proto = Object.getPrototypeOf(value);
	  return proto === Object.prototype || proto === null;
	}

	function addHiddenProp$$1(object, propName, value) {
	  Object.defineProperty(object, propName, {
	    enumerable: false,
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	function addHiddenFinalProp$$1(object, propName, value) {
	  Object.defineProperty(object, propName, {
	    enumerable: false,
	    writable: false,
	    configurable: true,
	    value: value
	  });
	}

	function isPropertyConfigurable$$1(object, prop) {
	  var descriptor = Object.getOwnPropertyDescriptor(object, prop);
	  return !descriptor || descriptor.configurable !== false && descriptor.writable !== false;
	}

	function assertPropertyConfigurable$$1(object, prop) {
	  if (process.env.NODE_ENV !== "production" && !isPropertyConfigurable$$1(object, prop)) fail$$1("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
	}

	function createInstanceofPredicate$$1(name, clazz) {
	  var propName = "isMobX" + name;
	  clazz.prototype[propName] = true;
	  return function (x) {
	    return isObject$$1(x) && x[propName] === true;
	  };
	}
	/**
	 * Returns whether the argument is an array, disregarding observability.
	 */


	function isArrayLike$$1(x) {
	  return Array.isArray(x) || isObservableArray$$1(x);
	}

	function isES6Map$$1(thing) {
	  return thing instanceof Map;
	}

	function getMapLikeKeys$$1(map) {
	  if (isPlainObject$$1(map)) return Object.keys(map);
	  if (Array.isArray(map)) return map.map(function (_a) {
	    var _b = __read(_a, 1),
	        key = _b[0];

	    return key;
	  });
	  if (isES6Map$$1(map) || isObservableMap$$1(map)) return Array.from(map.keys());
	  return fail$$1("Cannot get keys from '" + map + "'");
	}

	function toPrimitive$$1(value) {
	  return value === null ? null : typeof value === "object" ? "" + value : value;
	}

	var $mobx$$1 = Symbol("mobx administration");

	var Atom$$1 =
	/** @class */
	function () {
	  /**
	   * Create a new atom. For debugging purposes it is recommended to give it a name.
	   * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
	   */
	  function Atom$$1(name) {
	    if (name === void 0) {
	      name = "Atom@" + getNextId$$1();
	    }

	    this.name = name;
	    this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

	    this.isBeingObserved = false;
	    this.observers = new Set();
	    this.diffValue = 0;
	    this.lastAccessedBy = 0;
	    this.lowestObserverState = IDerivationState.NOT_TRACKING;
	  }

	  Atom$$1.prototype.onBecomeUnobserved = function () {// noop
	  };

	  Atom$$1.prototype.onBecomeObserved = function () {
	    /* noop */
	  };
	  /**
	   * Invoke this method to notify mobx that your atom has been used somehow.
	   * Returns true if there is currently a reactive context.
	   */


	  Atom$$1.prototype.reportObserved = function () {
	    return reportObserved$$1(this);
	  };
	  /**
	   * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
	   */


	  Atom$$1.prototype.reportChanged = function () {
	    startBatch$$1();
	    propagateChanged$$1(this);
	    endBatch$$1();
	  };

	  Atom$$1.prototype.toString = function () {
	    return this.name;
	  };

	  return Atom$$1;
	}();

	var isAtom$$1 = createInstanceofPredicate$$1("Atom", Atom$$1);

	function createAtom$$1(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
	  if (onBecomeObservedHandler === void 0) {
	    onBecomeObservedHandler = noop$$1;
	  }

	  if (onBecomeUnobservedHandler === void 0) {
	    onBecomeUnobservedHandler = noop$$1;
	  }

	  var atom = new Atom$$1(name);
	  onBecomeObserved$$1(atom, onBecomeObservedHandler);
	  onBecomeUnobserved$$1(atom, onBecomeUnobservedHandler);
	  return atom;
	}

	function identityComparer(a, b) {
	  return a === b;
	}

	function structuralComparer(a, b) {
	  return deepEqual$$1(a, b);
	}

	function defaultComparer(a, b) {
	  return Object.is(a, b);
	}

	var comparer$$1 = {
	  identity: identityComparer,
	  structural: structuralComparer,
	  default: defaultComparer
	};
	var mobxDidRunLazyInitializersSymbol$$1 = Symbol("mobx did run lazy initializers");
	var mobxPendingDecorators$$1 = Symbol("mobx pending decorators");
	var enumerableDescriptorCache = {};
	var nonEnumerableDescriptorCache = {};

	function createPropertyInitializerDescriptor(prop, enumerable) {
	  var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
	  return cache[prop] || (cache[prop] = {
	    configurable: true,
	    enumerable: enumerable,
	    get: function () {
	      initializeInstance$$1(this);
	      return this[prop];
	    },
	    set: function (value) {
	      initializeInstance$$1(this);
	      this[prop] = value;
	    }
	  });
	}

	function initializeInstance$$1(target) {
	  if (target[mobxDidRunLazyInitializersSymbol$$1] === true) return;
	  var decorators = target[mobxPendingDecorators$$1];

	  if (decorators) {
	    addHiddenProp$$1(target, mobxDidRunLazyInitializersSymbol$$1, true);

	    for (var key in decorators) {
	      var d = decorators[key];
	      d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
	    }
	  }
	}

	function createPropDecorator$$1(propertyInitiallyEnumerable, propertyCreator) {
	  return function decoratorFactory() {
	    var decoratorArguments;

	    var decorator = function decorate$$1(target, prop, descriptor, applyImmediately // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
	    // as the instance to apply the decorator to equals the target
	    ) {
	      if (applyImmediately === true) {
	        propertyCreator(target, prop, descriptor, target, decoratorArguments);
	        return null;
	      }

	      if (process.env.NODE_ENV !== "production" && !quacksLikeADecorator$$1(arguments)) fail$$1("This function is a decorator, but it wasn't invoked like a decorator");

	      if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators$$1)) {
	        var inheritedDecorators = target[mobxPendingDecorators$$1];
	        addHiddenProp$$1(target, mobxPendingDecorators$$1, __assign({}, inheritedDecorators));
	      }

	      target[mobxPendingDecorators$$1][prop] = {
	        prop: prop,
	        propertyCreator: propertyCreator,
	        descriptor: descriptor,
	        decoratorTarget: target,
	        decoratorArguments: decoratorArguments
	      };
	      return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
	    };

	    if (quacksLikeADecorator$$1(arguments)) {
	      // @decorator
	      decoratorArguments = EMPTY_ARRAY$$1;
	      return decorator.apply(null, arguments);
	    } else {
	      // @decorator(args)
	      decoratorArguments = Array.prototype.slice.call(arguments);
	      return decorator;
	    }
	  };
	}

	function quacksLikeADecorator$$1(args) {
	  return (args.length === 2 || args.length === 3) && typeof args[1] === "string" || args.length === 4 && args[3] === true;
	}

	function deepEnhancer$$1(v, _, name) {
	  // it is an observable already, done
	  if (isObservable$$1(v)) return v; // something that can be converted and mutated?

	  if (Array.isArray(v)) return observable$$1.array(v, {
	    name: name
	  });
	  if (isPlainObject$$1(v)) return observable$$1.object(v, undefined, {
	    name: name
	  });
	  if (isES6Map$$1(v)) return observable$$1.map(v, {
	    name: name
	  });
	  return v;
	}

	function shallowEnhancer$$1(v, _, name) {
	  if (v === undefined || v === null) return v;
	  if (isObservableObject$$1(v) || isObservableArray$$1(v) || isObservableMap$$1(v)) return v;
	  if (Array.isArray(v)) return observable$$1.array(v, {
	    name: name,
	    deep: false
	  });
	  if (isPlainObject$$1(v)) return observable$$1.object(v, undefined, {
	    name: name,
	    deep: false
	  });
	  if (isES6Map$$1(v)) return observable$$1.map(v, {
	    name: name,
	    deep: false
	  });
	  return fail$$1(process.env.NODE_ENV !== "production" && "The shallow modifier / decorator can only used in combination with arrays, objects and maps");
	}

	function referenceEnhancer$$1(newValue) {
	  // never turn into an observable
	  return newValue;
	}

	function refStructEnhancer$$1(v, oldValue, name) {
	  if (process.env.NODE_ENV !== "production" && isObservable$$1(v)) throw "observable.struct should not be used with observable values";
	  if (deepEqual$$1(v, oldValue)) return oldValue;
	  return v;
	}

	function createDecoratorForEnhancer$$1(enhancer) {
	  invariant$$1(enhancer);
	  var decorator = createPropDecorator$$1(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
	    if (process.env.NODE_ENV !== "production") {
	      invariant$$1(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + propertyName + "\"), use @computed instead.");
	    }

	    var initialValue = descriptor ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
	    asObservableObject$$1(target).addObservableProp(propertyName, initialValue, enhancer);
	  });
	  var res = // Extra process checks, as this happens during module initialization
	  typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production" ? function observableDecorator() {
	    // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
	    // and simply return the created prop decorator
	    if (arguments.length < 2) return fail$$1("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
	    return decorator.apply(null, arguments);
	  } : decorator;
	  res.enhancer = enhancer;
	  return res;
	} // Predefined bags of create observable options, to avoid allocating temporarily option objects
	// in the majority of cases


	var defaultCreateObservableOptions$$1 = {
	  deep: true,
	  name: undefined,
	  defaultDecorator: undefined,
	  proxy: true
	};
	Object.freeze(defaultCreateObservableOptions$$1);

	function assertValidOption(key) {
	  if (!/^(deep|name|defaultDecorator|proxy)$/.test(key)) fail$$1("invalid option for (extend)observable: " + key);
	}

	function asCreateObservableOptions$$1(thing) {
	  if (thing === null || thing === undefined) return defaultCreateObservableOptions$$1;
	  if (typeof thing === "string") return {
	    name: thing,
	    deep: true,
	    proxy: true
	  };

	  if (process.env.NODE_ENV !== "production") {
	    if (typeof thing !== "object") return fail$$1("expected options object");
	    Object.keys(thing).forEach(assertValidOption);
	  }

	  return thing;
	}

	var deepDecorator$$1 = createDecoratorForEnhancer$$1(deepEnhancer$$1);
	var shallowDecorator = createDecoratorForEnhancer$$1(shallowEnhancer$$1);
	var refDecorator$$1 = createDecoratorForEnhancer$$1(referenceEnhancer$$1);
	var refStructDecorator = createDecoratorForEnhancer$$1(refStructEnhancer$$1);

	function getEnhancerFromOptions(options) {
	  return options.defaultDecorator ? options.defaultDecorator.enhancer : options.deep === false ? referenceEnhancer$$1 : deepEnhancer$$1;
	}
	/**
	 * Turns an object, array or function into a reactive structure.
	 * @param v the value which should become observable.
	 */


	function createObservable(v, arg2, arg3) {
	  // @observable someProp;
	  if (typeof arguments[1] === "string") {
	    return deepDecorator$$1.apply(null, arguments);
	  } // it is an observable already, done


	  if (isObservable$$1(v)) return v; // something that can be converted and mutated?

	  var res = isPlainObject$$1(v) ? observable$$1.object(v, arg2, arg3) : Array.isArray(v) ? observable$$1.array(v, arg2) : isES6Map$$1(v) ? observable$$1.map(v, arg2) : v; // this value could be converted to a new observable data structure, return it

	  if (res !== v) return res; // otherwise, just box it

	  fail$$1(process.env.NODE_ENV !== "production" && "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
	}

	var observableFactories = {
	  box: function (value, options) {
	    if (arguments.length > 2) incorrectlyUsedAsDecorator("box");
	    var o = asCreateObservableOptions$$1(options);
	    return new ObservableValue$$1(value, getEnhancerFromOptions(o), o.name);
	  },
	  array: function (initialValues, options) {
	    if (arguments.length > 2) incorrectlyUsedAsDecorator("array");
	    var o = asCreateObservableOptions$$1(options);
	    return createObservableArray$$1(initialValues, getEnhancerFromOptions(o), o.name);
	  },
	  map: function (initialValues, options) {
	    if (arguments.length > 2) incorrectlyUsedAsDecorator("map");
	    var o = asCreateObservableOptions$$1(options);
	    return new ObservableMap$$1(initialValues, getEnhancerFromOptions(o), o.name);
	  },
	  object: function (props, decorators, options) {
	    if (typeof arguments[1] === "string") incorrectlyUsedAsDecorator("object");
	    var o = asCreateObservableOptions$$1(options);

	    if (o.proxy === false) {
	      return extendObservable$$1({}, props, decorators, o);
	    } else {
	      var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(o);
	      var base = extendObservable$$1({}, undefined, undefined, o);
	      var proxy = createDynamicObservableObject$$1(base);
	      extendObservableObjectWithProperties$$1(proxy, props, decorators, defaultDecorator);
	      return proxy;
	    }
	  },
	  ref: refDecorator$$1,
	  shallow: shallowDecorator,
	  deep: deepDecorator$$1,
	  struct: refStructDecorator
	};
	var observable$$1 = createObservable; // weird trick to keep our typings nicely with our funcs, and still extend the observable function

	Object.keys(observableFactories).forEach(function (name) {
	  return observable$$1[name] = observableFactories[name];
	});

	function incorrectlyUsedAsDecorator(methodName) {
	  fail$$1( // process.env.NODE_ENV !== "production" &&
	  "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
	}

	var computedDecorator$$1 = createPropDecorator$$1(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
	  var get$$1 = descriptor.get,
	      set$$1 = descriptor.set; // initialValue is the descriptor for get / set props
	  // Optimization: faster on decorator target or instance? Assuming target
	  // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
	  // Forcing instance now, fixes hot reloadig issues on React Native:

	  var options = decoratorArgs[0] || {};
	  asObservableObject$$1(instance).addComputedProp(instance, propertyName, __assign({
	    get: get$$1,
	    set: set$$1,
	    context: instance
	  }, options));
	});
	var computedStructDecorator = computedDecorator$$1({
	  equals: comparer$$1.structural
	});
	/**
	 * Decorator for class properties: @computed get value() { return expr; }.
	 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
	 */

	var computed$$1 = function computed$$1(arg1, arg2, arg3) {
	  if (typeof arg2 === "string") {
	    // @computed
	    return computedDecorator$$1.apply(null, arguments);
	  }

	  if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
	    // @computed({ options })
	    return computedDecorator$$1.apply(null, arguments);
	  } // computed(expr, options?)


	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(typeof arg1 === "function", "First argument to `computed` should be an expression.");
	    invariant$$1(arguments.length < 3, "Computed takes one or two arguments if used as function");
	  }

	  var opts = typeof arg2 === "object" ? arg2 : {};
	  opts.get = arg1;
	  opts.set = typeof arg2 === "function" ? arg2 : opts.set;
	  opts.name = opts.name || arg1.name || "";
	  /* for generated name */

	  return new ComputedValue$$1(opts);
	};

	computed$$1.struct = computedStructDecorator;

	function createAction$$1(actionName, fn) {
	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(typeof fn === "function", "`action` can only be invoked on functions");
	    if (typeof actionName !== "string" || !actionName) fail$$1("actions should have valid names, got: '" + actionName + "'");
	  }

	  var res = function () {
	    return executeAction$$1(actionName, fn, this, arguments);
	  };

	  res.isMobxAction = true;
	  return res;
	}

	function executeAction$$1(actionName, fn, scope, args) {
	  var runInfo = startAction(actionName, fn, scope, args);

	  try {
	    return fn.apply(scope, args);
	  } finally {
	    endAction(runInfo);
	  }
	}

	function startAction(actionName, fn, scope, args) {
	  var notifySpy = isSpyEnabled$$1() && !!actionName;
	  var startTime = 0;

	  if (notifySpy && process.env.NODE_ENV !== "production") {
	    startTime = Date.now();
	    var l = args && args.length || 0;
	    var flattendArgs = new Array(l);
	    if (l > 0) for (var i = 0; i < l; i++) flattendArgs[i] = args[i];
	    spyReportStart$$1({
	      type: "action",
	      name: actionName,
	      object: scope,
	      arguments: flattendArgs
	    });
	  }

	  var prevDerivation = untrackedStart$$1();
	  startBatch$$1();
	  var prevAllowStateChanges = allowStateChangesStart$$1(true);
	  return {
	    prevDerivation: prevDerivation,
	    prevAllowStateChanges: prevAllowStateChanges,
	    notifySpy: notifySpy,
	    startTime: startTime
	  };
	}

	function endAction(runInfo) {
	  allowStateChangesEnd$$1(runInfo.prevAllowStateChanges);
	  endBatch$$1();
	  untrackedEnd$$1(runInfo.prevDerivation);
	  if (runInfo.notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1({
	    time: Date.now() - runInfo.startTime
	  });
	}

	function allowStateChanges$$1(allowStateChanges$$1, func) {
	  var prev = allowStateChangesStart$$1(allowStateChanges$$1);
	  var res;

	  try {
	    res = func();
	  } finally {
	    allowStateChangesEnd$$1(prev);
	  }

	  return res;
	}

	function allowStateChangesStart$$1(allowStateChanges$$1) {
	  var prev = globalState$$1.allowStateChanges;
	  globalState$$1.allowStateChanges = allowStateChanges$$1;
	  return prev;
	}

	function allowStateChangesEnd$$1(prev) {
	  globalState$$1.allowStateChanges = prev;
	}

	function allowStateChangesInsideComputed$$1(func) {
	  var prev = globalState$$1.computationDepth;
	  globalState$$1.computationDepth = 0;
	  var res;

	  try {
	    res = func();
	  } finally {
	    globalState$$1.computationDepth = prev;
	  }

	  return res;
	}

	var ObservableValue$$1 =
	/** @class */
	function (_super) {
	  __extends(ObservableValue$$1, _super);

	  function ObservableValue$$1(value, enhancer, name, notifySpy) {
	    if (name === void 0) {
	      name = "ObservableValue@" + getNextId$$1();
	    }

	    if (notifySpy === void 0) {
	      notifySpy = true;
	    }

	    var _this = _super.call(this, name) || this;

	    _this.enhancer = enhancer;
	    _this.hasUnreportedChange = false;
	    _this.value = enhancer(value, undefined, name);

	    if (notifySpy && isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
	      // only notify spy if this is a stand-alone observable
	      spyReport$$1({
	        type: "create",
	        name: _this.name,
	        newValue: "" + _this.value
	      });
	    }

	    return _this;
	  }

	  ObservableValue$$1.prototype.dehanceValue = function (value) {
	    if (this.dehancer !== undefined) return this.dehancer(value);
	    return value;
	  };

	  ObservableValue$$1.prototype.set = function (newValue) {
	    var oldValue = this.value;
	    newValue = this.prepareNewValue(newValue);

	    if (newValue !== globalState$$1.UNCHANGED) {
	      var notifySpy = isSpyEnabled$$1();

	      if (notifySpy && process.env.NODE_ENV !== "production") {
	        spyReportStart$$1({
	          type: "update",
	          name: this.name,
	          newValue: newValue,
	          oldValue: oldValue
	        });
	      }

	      this.setNewValue(newValue);
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	    }
	  };

	  ObservableValue$$1.prototype.prepareNewValue = function (newValue) {
	    checkIfStateModificationsAreAllowed$$1(this);

	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        object: this,
	        type: "update",
	        newValue: newValue
	      });
	      if (!change) return globalState$$1.UNCHANGED;
	      newValue = change.newValue;
	    } // apply modifier


	    newValue = this.enhancer(newValue, this.value, this.name);
	    return this.value !== newValue ? newValue : globalState$$1.UNCHANGED;
	  };

	  ObservableValue$$1.prototype.setNewValue = function (newValue) {
	    var oldValue = this.value;
	    this.value = newValue;
	    this.reportChanged();

	    if (hasListeners$$1(this)) {
	      notifyListeners$$1(this, {
	        type: "update",
	        object: this,
	        newValue: newValue,
	        oldValue: oldValue
	      });
	    }
	  };

	  ObservableValue$$1.prototype.get = function () {
	    this.reportObserved();
	    return this.dehanceValue(this.value);
	  };

	  ObservableValue$$1.prototype.intercept = function (handler) {
	    return registerInterceptor$$1(this, handler);
	  };

	  ObservableValue$$1.prototype.observe = function (listener, fireImmediately) {
	    if (fireImmediately) listener({
	      object: this,
	      type: "update",
	      newValue: this.value,
	      oldValue: undefined
	    });
	    return registerListener$$1(this, listener);
	  };

	  ObservableValue$$1.prototype.toJSON = function () {
	    return this.get();
	  };

	  ObservableValue$$1.prototype.toString = function () {
	    return this.name + "[" + this.value + "]";
	  };

	  ObservableValue$$1.prototype.valueOf = function () {
	    return toPrimitive$$1(this.get());
	  };

	  ObservableValue$$1.prototype[Symbol.toPrimitive] = function () {
	    return this.valueOf();
	  };

	  return ObservableValue$$1;
	}(Atom$$1);

	var isObservableValue$$1 = createInstanceofPredicate$$1("ObservableValue", ObservableValue$$1);
	/**
	 * A node in the state dependency root that observes other nodes, and can be observed itself.
	 *
	 * ComputedValue will remember the result of the computation for the duration of the batch, or
	 * while being observed.
	 *
	 * During this time it will recompute only when one of its direct dependencies changed,
	 * but only when it is being accessed with `ComputedValue.get()`.
	 *
	 * Implementation description:
	 * 1. First time it's being accessed it will compute and remember result
	 *    give back remembered result until 2. happens
	 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
	 * 3. When it's being accessed, recompute if any shallow dependency changed.
	 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
	 *    go to step 2. either way
	 *
	 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
	 */

	var ComputedValue$$1 =
	/** @class */
	function () {
	  /**
	   * Create a new computed value based on a function expression.
	   *
	   * The `name` property is for debug purposes only.
	   *
	   * The `equals` property specifies the comparer function to use to determine if a newly produced
	   * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
	   * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
	   * Structural comparison can be convenient if you always produce a new aggregated object and
	   * don't want to notify observers if it is structurally the same.
	   * This is useful for working with vectors, mouse coordinates etc.
	   */
	  function ComputedValue$$1(options) {
	    this.dependenciesState = IDerivationState.NOT_TRACKING;
	    this.observing = []; // nodes we are looking at. Our value depends on these nodes

	    this.newObserving = null; // during tracking it's an array with new observed observers

	    this.isBeingObserved = false;
	    this.isPendingUnobservation = false;
	    this.observers = new Set();
	    this.diffValue = 0;
	    this.runId = 0;
	    this.lastAccessedBy = 0;
	    this.lowestObserverState = IDerivationState.UP_TO_DATE;
	    this.unboundDepsCount = 0;
	    this.__mapid = "#" + getNextId$$1();
	    this.value = new CaughtException$$1(null);
	    this.isComputing = false; // to check for cycles

	    this.isRunningSetter = false;
	    this.isTracing = TraceMode$$1.NONE;
	    if (process.env.NODE_ENV !== "production" && !options.get) throw "[mobx] missing option for computed: get";
	    this.derivation = options.get;
	    this.name = options.name || "ComputedValue@" + getNextId$$1();
	    if (options.set) this.setter = createAction$$1(this.name + "-setter", options.set);
	    this.equals = options.equals || (options.compareStructural || options.struct ? comparer$$1.structural : comparer$$1.default);
	    this.scope = options.context;
	    this.requiresReaction = !!options.requiresReaction;
	    this.keepAlive = !!options.keepAlive;
	  }

	  ComputedValue$$1.prototype.onBecomeStale = function () {
	    propagateMaybeChanged$$1(this);
	  };

	  ComputedValue$$1.prototype.onBecomeUnobserved = function () {};

	  ComputedValue$$1.prototype.onBecomeObserved = function () {};
	  /**
	   * Returns the current value of this computed value.
	   * Will evaluate its computation first if needed.
	   */


	  ComputedValue$$1.prototype.get = function () {
	    if (this.isComputing) fail$$1("Cycle detected in computation " + this.name + ": " + this.derivation);

	    if (globalState$$1.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
	      if (shouldCompute$$1(this)) {
	        this.warnAboutUntrackedRead();
	        startBatch$$1(); // See perf test 'computed memoization'

	        this.value = this.computeValue(false);
	        endBatch$$1();
	      }
	    } else {
	      reportObserved$$1(this);
	      if (shouldCompute$$1(this)) if (this.trackAndCompute()) propagateChangeConfirmed$$1(this);
	    }

	    var result = this.value;
	    if (isCaughtException$$1(result)) throw result.cause;
	    return result;
	  };

	  ComputedValue$$1.prototype.peek = function () {
	    var res = this.computeValue(false);
	    if (isCaughtException$$1(res)) throw res.cause;
	    return res;
	  };

	  ComputedValue$$1.prototype.set = function (value) {
	    if (this.setter) {
	      invariant$$1(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
	      this.isRunningSetter = true;

	      try {
	        this.setter.call(this.scope, value);
	      } finally {
	        this.isRunningSetter = false;
	      }
	    } else invariant$$1(false, process.env.NODE_ENV !== "production" && "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
	  };

	  ComputedValue$$1.prototype.trackAndCompute = function () {
	    if (isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
	      spyReport$$1({
	        object: this.scope,
	        type: "compute",
	        name: this.name
	      });
	    }

	    var oldValue = this.value;
	    var wasSuspended =
	    /* see #1208 */
	    this.dependenciesState === IDerivationState.NOT_TRACKING;
	    var newValue = this.computeValue(true);
	    var changed = wasSuspended || isCaughtException$$1(oldValue) || isCaughtException$$1(newValue) || !this.equals(oldValue, newValue);

	    if (changed) {
	      this.value = newValue;
	    }

	    return changed;
	  };

	  ComputedValue$$1.prototype.computeValue = function (track) {
	    this.isComputing = true;
	    globalState$$1.computationDepth++;
	    var res;

	    if (track) {
	      res = trackDerivedFunction$$1(this, this.derivation, this.scope);
	    } else {
	      if (globalState$$1.disableErrorBoundaries === true) {
	        res = this.derivation.call(this.scope);
	      } else {
	        try {
	          res = this.derivation.call(this.scope);
	        } catch (e) {
	          res = new CaughtException$$1(e);
	        }
	      }
	    }

	    globalState$$1.computationDepth--;
	    this.isComputing = false;
	    return res;
	  };

	  ComputedValue$$1.prototype.suspend = function () {
	    if (!this.keepAlive) {
	      clearObserving$$1(this);
	      this.value = undefined; // don't hold on to computed value!
	    }
	  };

	  ComputedValue$$1.prototype.observe = function (listener, fireImmediately) {
	    var _this = this;

	    var firstTime = true;
	    var prevValue = undefined;
	    return autorun$$1(function () {
	      var newValue = _this.get();

	      if (!firstTime || fireImmediately) {
	        var prevU = untrackedStart$$1();
	        listener({
	          type: "update",
	          object: _this,
	          newValue: newValue,
	          oldValue: prevValue
	        });
	        untrackedEnd$$1(prevU);
	      }

	      firstTime = false;
	      prevValue = newValue;
	    });
	  };

	  ComputedValue$$1.prototype.warnAboutUntrackedRead = function () {
	    if (process.env.NODE_ENV === "production") return;

	    if (this.requiresReaction === true) {
	      fail$$1("[mobx] Computed value " + this.name + " is read outside a reactive context");
	    }

	    if (this.isTracing !== TraceMode$$1.NONE) {
	      console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
	    }

	    if (globalState$$1.computedRequiresReaction) {
	      console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
	    }
	  };

	  ComputedValue$$1.prototype.toJSON = function () {
	    return this.get();
	  };

	  ComputedValue$$1.prototype.toString = function () {
	    return this.name + "[" + this.derivation.toString() + "]";
	  };

	  ComputedValue$$1.prototype.valueOf = function () {
	    return toPrimitive$$1(this.get());
	  };

	  ComputedValue$$1.prototype[Symbol.toPrimitive] = function () {
	    return this.valueOf();
	  };

	  return ComputedValue$$1;
	}();

	var isComputedValue$$1 = createInstanceofPredicate$$1("ComputedValue", ComputedValue$$1);
	var IDerivationState;

	(function (IDerivationState$$1) {
	  // before being run or (outside batch and not being observed)
	  // at this point derivation is not holding any data about dependency tree
	  IDerivationState$$1[IDerivationState$$1["NOT_TRACKING"] = -1] = "NOT_TRACKING"; // no shallow dependency changed since last computation
	  // won't recalculate derivation
	  // this is what makes mobx fast

	  IDerivationState$$1[IDerivationState$$1["UP_TO_DATE"] = 0] = "UP_TO_DATE"; // some deep dependency changed, but don't know if shallow dependency changed
	  // will require to check first if UP_TO_DATE or POSSIBLY_STALE
	  // currently only ComputedValue will propagate POSSIBLY_STALE
	  //
	  // having this state is second big optimization:
	  // don't have to recompute on every dependency change, but only when it's needed

	  IDerivationState$$1[IDerivationState$$1["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE"; // A shallow dependency has changed since last computation and the derivation
	  // will need to recompute when it's needed next.

	  IDerivationState$$1[IDerivationState$$1["STALE"] = 2] = "STALE";
	})(IDerivationState || (IDerivationState = {}));

	var TraceMode$$1;

	(function (TraceMode$$1) {
	  TraceMode$$1[TraceMode$$1["NONE"] = 0] = "NONE";
	  TraceMode$$1[TraceMode$$1["LOG"] = 1] = "LOG";
	  TraceMode$$1[TraceMode$$1["BREAK"] = 2] = "BREAK";
	})(TraceMode$$1 || (TraceMode$$1 = {}));

	var CaughtException$$1 =
	/** @class */
	function () {
	  function CaughtException$$1(cause) {
	    this.cause = cause; // Empty
	  }

	  return CaughtException$$1;
	}();

	function isCaughtException$$1(e) {
	  return e instanceof CaughtException$$1;
	}
	/**
	 * Finds out whether any dependency of the derivation has actually changed.
	 * If dependenciesState is 1 then it will recalculate dependencies,
	 * if any dependency changed it will propagate it by changing dependenciesState to 2.
	 *
	 * By iterating over the dependencies in the same order that they were reported and
	 * stopping on the first change, all the recalculations are only called for ComputedValues
	 * that will be tracked by derivation. That is because we assume that if the first x
	 * dependencies of the derivation doesn't change then the derivation should run the same way
	 * up until accessing x-th dependency.
	 */


	function shouldCompute$$1(derivation) {
	  switch (derivation.dependenciesState) {
	    case IDerivationState.UP_TO_DATE:
	      return false;

	    case IDerivationState.NOT_TRACKING:
	    case IDerivationState.STALE:
	      return true;

	    case IDerivationState.POSSIBLY_STALE:
	      {
	        var prevUntracked = untrackedStart$$1(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.

	        var obs = derivation.observing,
	            l = obs.length;

	        for (var i = 0; i < l; i++) {
	          var obj = obs[i];

	          if (isComputedValue$$1(obj)) {
	            if (globalState$$1.disableErrorBoundaries) {
	              obj.get();
	            } else {
	              try {
	                obj.get();
	              } catch (e) {
	                // we are not interested in the value *or* exception at this moment, but if there is one, notify all
	                untrackedEnd$$1(prevUntracked);
	                return true;
	              }
	            } // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
	            // and `derivation` is an observer of `obj`
	            // invariantShouldCompute(derivation)


	            if (derivation.dependenciesState === IDerivationState.STALE) {
	              untrackedEnd$$1(prevUntracked);
	              return true;
	            }
	          }
	        }

	        changeDependenciesStateTo0$$1(derivation);
	        untrackedEnd$$1(prevUntracked);
	        return false;
	      }
	  }
	} // function invariantShouldCompute(derivation: IDerivation) {
	//     const newDepState = (derivation as any).dependenciesState
	//     if (
	//         process.env.NODE_ENV === "production" &&
	//         (newDepState === IDerivationState.POSSIBLY_STALE ||
	//             newDepState === IDerivationState.NOT_TRACKING)
	//     )
	//         fail("Illegal dependency state")
	// }


	function isComputingDerivation$$1() {
	  return globalState$$1.trackingDerivation !== null; // filter out actions inside computations
	}

	function checkIfStateModificationsAreAllowed$$1(atom) {
	  var hasObservers$$1 = atom.observers.size > 0; // Should never be possible to change an observed observable from inside computed, see #798

	  if (globalState$$1.computationDepth > 0 && hasObservers$$1) fail$$1(process.env.NODE_ENV !== "production" && "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name); // Should not be possible to change observed state outside strict mode, except during initialization, see #563

	  if (!globalState$$1.allowStateChanges && (hasObservers$$1 || globalState$$1.enforceActions === "strict")) fail$$1(process.env.NODE_ENV !== "production" && (globalState$$1.enforceActions ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") + atom.name);
	}
	/**
	 * Executes the provided function `f` and tracks which observables are being accessed.
	 * The tracking information is stored on the `derivation` object and the derivation is registered
	 * as observer of any of the accessed observables.
	 */


	function trackDerivedFunction$$1(derivation, f, context) {
	  // pre allocate array allocation + room for variation in deps
	  // array will be trimmed by bindDependencies
	  changeDependenciesStateTo0$$1(derivation);
	  derivation.newObserving = new Array(derivation.observing.length + 100);
	  derivation.unboundDepsCount = 0;
	  derivation.runId = ++globalState$$1.runId;
	  var prevTracking = globalState$$1.trackingDerivation;
	  globalState$$1.trackingDerivation = derivation;
	  var result;

	  if (globalState$$1.disableErrorBoundaries === true) {
	    result = f.call(context);
	  } else {
	    try {
	      result = f.call(context);
	    } catch (e) {
	      result = new CaughtException$$1(e);
	    }
	  }

	  globalState$$1.trackingDerivation = prevTracking;
	  bindDependencies(derivation);
	  return result;
	}
	/**
	 * diffs newObserving with observing.
	 * update observing to be newObserving with unique observables
	 * notify observers that become observed/unobserved
	 */


	function bindDependencies(derivation) {
	  // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
	  var prevObserving = derivation.observing;
	  var observing = derivation.observing = derivation.newObserving;
	  var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE; // Go through all new observables and check diffValue: (this list can contain duplicates):
	  //   0: first occurrence, change to 1 and keep it
	  //   1: extra occurrence, drop it

	  var i0 = 0,
	      l = derivation.unboundDepsCount;

	  for (var i = 0; i < l; i++) {
	    var dep = observing[i];

	    if (dep.diffValue === 0) {
	      dep.diffValue = 1;
	      if (i0 !== i) observing[i0] = dep;
	      i0++;
	    } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
	    // not hitting the condition


	    if (dep.dependenciesState > lowestNewObservingDerivationState) {
	      lowestNewObservingDerivationState = dep.dependenciesState;
	    }
	  }

	  observing.length = i0;
	  derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
	  // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
	  //   0: it's not in new observables, unobserve it
	  //   1: it keeps being observed, don't want to notify it. change to 0

	  l = prevObserving.length;

	  while (l--) {
	    var dep = prevObserving[l];

	    if (dep.diffValue === 0) {
	      removeObserver$$1(dep, derivation);
	    }

	    dep.diffValue = 0;
	  } // Go through all new observables and check diffValue: (now it should be unique)
	  //   0: it was set to 0 in last loop. don't need to do anything.
	  //   1: it wasn't observed, let's observe it. set back to 0


	  while (i0--) {
	    var dep = observing[i0];

	    if (dep.diffValue === 1) {
	      dep.diffValue = 0;
	      addObserver$$1(dep, derivation);
	    }
	  } // Some new observed derivations may become stale during this derivation computation
	  // so they have had no chance to propagate staleness (#916)


	  if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
	    derivation.dependenciesState = lowestNewObservingDerivationState;
	    derivation.onBecomeStale();
	  }
	}

	function clearObserving$$1(derivation) {
	  // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
	  var obs = derivation.observing;
	  derivation.observing = [];
	  var i = obs.length;

	  while (i--) removeObserver$$1(obs[i], derivation);

	  derivation.dependenciesState = IDerivationState.NOT_TRACKING;
	}

	function untracked$$1(action$$1) {
	  var prev = untrackedStart$$1();

	  try {
	    return action$$1();
	  } finally {
	    untrackedEnd$$1(prev);
	  }
	}

	function untrackedStart$$1() {
	  var prev = globalState$$1.trackingDerivation;
	  globalState$$1.trackingDerivation = null;
	  return prev;
	}

	function untrackedEnd$$1(prev) {
	  globalState$$1.trackingDerivation = prev;
	}
	/**
	 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
	 *
	 */


	function changeDependenciesStateTo0$$1(derivation) {
	  if (derivation.dependenciesState === IDerivationState.UP_TO_DATE) return;
	  derivation.dependenciesState = IDerivationState.UP_TO_DATE;
	  var obs = derivation.observing;
	  var i = obs.length;

	  while (i--) obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
	}
	/**
	 * These values will persist if global state is reset
	 */


	var persistentKeys = ["mobxGuid", "spyListeners", "enforceActions", "computedRequiresReaction", "disableErrorBoundaries", "runId", "UNCHANGED"];

	var MobXGlobals$$1 =
	/** @class */
	function () {
	  function MobXGlobals$$1() {
	    /**
	     * MobXGlobals version.
	     * MobX compatiblity with other versions loaded in memory as long as this version matches.
	     * It indicates that the global state still stores similar information
	     *
	     * N.B: this version is unrelated to the package version of MobX, and is only the version of the
	     * internal state storage of MobX, and can be the same across many different package versions
	     */
	    this.version = 5;
	    /**
	     * globally unique token to signal unchanged
	     */

	    this.UNCHANGED = {};
	    /**
	     * Currently running derivation
	     */

	    this.trackingDerivation = null;
	    /**
	     * Are we running a computation currently? (not a reaction)
	     */

	    this.computationDepth = 0;
	    /**
	     * Each time a derivation is tracked, it is assigned a unique run-id
	     */

	    this.runId = 0;
	    /**
	     * 'guid' for general purpose. Will be persisted amongst resets.
	     */

	    this.mobxGuid = 0;
	    /**
	     * Are we in a batch block? (and how many of them)
	     */

	    this.inBatch = 0;
	    /**
	     * Observables that don't have observers anymore, and are about to be
	     * suspended, unless somebody else accesses it in the same batch
	     *
	     * @type {IObservable[]}
	     */

	    this.pendingUnobservations = [];
	    /**
	     * List of scheduled, not yet executed, reactions.
	     */

	    this.pendingReactions = [];
	    /**
	     * Are we currently processing reactions?
	     */

	    this.isRunningReactions = false;
	    /**
	     * Is it allowed to change observables at this point?
	     * In general, MobX doesn't allow that when running computations and React.render.
	     * To ensure that those functions stay pure.
	     */

	    this.allowStateChanges = true;
	    /**
	     * If strict mode is enabled, state changes are by default not allowed
	     */

	    this.enforceActions = false;
	    /**
	     * Spy callbacks
	     */

	    this.spyListeners = [];
	    /**
	     * Globally attached error handlers that react specifically to errors in reactions
	     */

	    this.globalReactionErrorHandlers = [];
	    /**
	     * Warn if computed values are accessed outside a reactive context
	     */

	    this.computedRequiresReaction = false;
	    /*
	     * Don't catch and rethrow exceptions. This is useful for inspecting the state of
	     * the stack when an exception occurs while debugging.
	     */

	    this.disableErrorBoundaries = false;
	  }

	  return MobXGlobals$$1;
	}();

	var canMergeGlobalState = true;
	var isolateCalled = false;

	var globalState$$1 = function () {
	  var global = getGlobal$$1();
	  if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals) canMergeGlobalState = false;
	  if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals$$1().version) canMergeGlobalState = false;

	  if (!canMergeGlobalState) {
	    setTimeout(function () {
	      if (!isolateCalled) {
	        fail$$1("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
	      }
	    }, 1);
	    return new MobXGlobals$$1();
	  } else if (global.__mobxGlobals) {
	    global.__mobxInstanceCount += 1;
	    if (!global.__mobxGlobals.UNCHANGED) global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible

	    return global.__mobxGlobals;
	  } else {
	    global.__mobxInstanceCount = 1;
	    return global.__mobxGlobals = new MobXGlobals$$1();
	  }
	}();

	function isolateGlobalState$$1() {
	  if (globalState$$1.pendingReactions.length || globalState$$1.inBatch || globalState$$1.isRunningReactions) fail$$1("isolateGlobalState should be called before MobX is running any reactions");
	  isolateCalled = true;

	  if (canMergeGlobalState) {
	    if (--getGlobal$$1().__mobxInstanceCount === 0) getGlobal$$1().__mobxGlobals = undefined;
	    globalState$$1 = new MobXGlobals$$1();
	  }
	}

	function getGlobalState$$1() {
	  return globalState$$1;
	}
	/**
	 * For testing purposes only; this will break the internal state of existing observables,
	 * but can be used to get back at a stable state after throwing errors
	 */


	function resetGlobalState$$1() {
	  var defaultGlobals = new MobXGlobals$$1();

	  for (var key in defaultGlobals) if (persistentKeys.indexOf(key) === -1) globalState$$1[key] = defaultGlobals[key];

	  globalState$$1.allowStateChanges = !globalState$$1.enforceActions;
	}

	function getGlobal$$1() {
	  return typeof window !== "undefined" ? window : global;
	}

	function hasObservers$$1(observable$$1) {
	  return observable$$1.observers && observable$$1.observers.size > 0;
	}

	function getObservers$$1(observable$$1) {
	  return observable$$1.observers;
	} // function invariantObservers(observable: IObservable) {
	//     const list = observable.observers
	//     const map = observable.observersIndexes
	//     const l = list.length
	//     for (let i = 0; i < l; i++) {
	//         const id = list[i].__mapid
	//         if (i) {
	//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
	//         } else {
	//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
	//         }
	//     }
	//     invariant(
	//         list.length === 0 || Object.keys(map).length === list.length - 1,
	//         "INTERNAL ERROR there is no junk in map"
	//     )
	// }


	function addObserver$$1(observable$$1, node) {
	  // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
	  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
	  // invariantObservers(observable);
	  observable$$1.observers.add(node);
	  if (observable$$1.lowestObserverState > node.dependenciesState) observable$$1.lowestObserverState = node.dependenciesState; // invariantObservers(observable);
	  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
	}

	function removeObserver$$1(observable$$1, node) {
	  // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
	  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
	  // invariantObservers(observable);
	  observable$$1.observers.delete(node);

	  if (observable$$1.observers.size === 0) {
	    // deleting last observer
	    queueForUnobservation$$1(observable$$1);
	  } // invariantObservers(observable);
	  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");

	}

	function queueForUnobservation$$1(observable$$1) {
	  if (observable$$1.isPendingUnobservation === false) {
	    // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
	    observable$$1.isPendingUnobservation = true;
	    globalState$$1.pendingUnobservations.push(observable$$1);
	  }
	}
	/**
	 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
	 * During a batch `onBecomeUnobserved` will be called at most once per observable.
	 * Avoids unnecessary recalculations.
	 */


	function startBatch$$1() {
	  globalState$$1.inBatch++;
	}

	function endBatch$$1() {
	  if (--globalState$$1.inBatch === 0) {
	    runReactions$$1(); // the batch is actually about to finish, all unobserving should happen here.

	    var list = globalState$$1.pendingUnobservations;

	    for (var i = 0; i < list.length; i++) {
	      var observable$$1 = list[i];
	      observable$$1.isPendingUnobservation = false;

	      if (observable$$1.observers.size === 0) {
	        if (observable$$1.isBeingObserved) {
	          // if this observable had reactive observers, trigger the hooks
	          observable$$1.isBeingObserved = false;
	          observable$$1.onBecomeUnobserved();
	        }

	        if (observable$$1 instanceof ComputedValue$$1) {
	          // computed values are automatically teared down when the last observer leaves
	          // this process happens recursively, this computed might be the last observabe of another, etc..
	          observable$$1.suspend();
	        }
	      }
	    }

	    globalState$$1.pendingUnobservations = [];
	  }
	}

	function reportObserved$$1(observable$$1) {
	  var derivation = globalState$$1.trackingDerivation;

	  if (derivation !== null) {
	    /**
	     * Simple optimization, give each derivation run an unique id (runId)
	     * Check if last time this observable was accessed the same runId is used
	     * if this is the case, the relation is already known
	     */
	    if (derivation.runId !== observable$$1.lastAccessedBy) {
	      observable$$1.lastAccessedBy = derivation.runId; // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...

	      derivation.newObserving[derivation.unboundDepsCount++] = observable$$1;

	      if (!observable$$1.isBeingObserved) {
	        observable$$1.isBeingObserved = true;
	        observable$$1.onBecomeObserved();
	      }
	    }

	    return true;
	  } else if (observable$$1.observers.size === 0 && globalState$$1.inBatch > 0) {
	    queueForUnobservation$$1(observable$$1);
	  }

	  return false;
	} // function invariantLOS(observable: IObservable, msg: string) {
	//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
	//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
	//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
	//     throw new Error(
	//         "lowestObserverState is wrong for " +
	//             msg +
	//             " because " +
	//             min +
	//             " < " +
	//             observable.lowestObserverState
	//     )
	// }

	/**
	 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
	 * It will propagate changes to observers from previous run
	 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
	 * Hopefully self reruning autoruns aren't a feature people should depend on
	 * Also most basic use cases should be ok
	 */
	// Called by Atom when its value changes


	function propagateChanged$$1(observable$$1) {
	  // invariantLOS(observable, "changed start");
	  if (observable$$1.lowestObserverState === IDerivationState.STALE) return;
	  observable$$1.lowestObserverState = IDerivationState.STALE; // Ideally we use for..of here, but the downcompiled version is really slow...

	  observable$$1.observers.forEach(function (d) {
	    if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
	      if (d.isTracing !== TraceMode$$1.NONE) {
	        logTraceInfo(d, observable$$1);
	      }

	      d.onBecomeStale();
	    }

	    d.dependenciesState = IDerivationState.STALE;
	  }); // invariantLOS(observable, "changed end");
	} // Called by ComputedValue when it recalculate and its value changed


	function propagateChangeConfirmed$$1(observable$$1) {
	  // invariantLOS(observable, "confirmed start");
	  if (observable$$1.lowestObserverState === IDerivationState.STALE) return;
	  observable$$1.lowestObserverState = IDerivationState.STALE;
	  observable$$1.observers.forEach(function (d) {
	    if (d.dependenciesState === IDerivationState.POSSIBLY_STALE) d.dependenciesState = IDerivationState.STALE;else if (d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
	    ) observable$$1.lowestObserverState = IDerivationState.UP_TO_DATE;
	  }); // invariantLOS(observable, "confirmed end");
	} // Used by computed when its dependency changed, but we don't wan't to immediately recompute.


	function propagateMaybeChanged$$1(observable$$1) {
	  // invariantLOS(observable, "maybe start");
	  if (observable$$1.lowestObserverState !== IDerivationState.UP_TO_DATE) return;
	  observable$$1.lowestObserverState = IDerivationState.POSSIBLY_STALE;
	  observable$$1.observers.forEach(function (d) {
	    if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
	      d.dependenciesState = IDerivationState.POSSIBLY_STALE;

	      if (d.isTracing !== TraceMode$$1.NONE) {
	        logTraceInfo(d, observable$$1);
	      }

	      d.onBecomeStale();
	    }
	  }); // invariantLOS(observable, "maybe end");
	}

	function logTraceInfo(derivation, observable$$1) {
	  console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable$$1.name + "'");

	  if (derivation.isTracing === TraceMode$$1.BREAK) {
	    var lines = [];
	    printDepTree(getDependencyTree$$1(derivation), lines, 1); // prettier-ignore

	    new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable$$1.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue$$1 ? derivation.derivation.toString() : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
	  }
	}

	function printDepTree(tree, lines, depth) {
	  if (lines.length >= 1000) {
	    lines.push("(and many more)");
	    return;
	  }

	  lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)

	  if (tree.dependencies) tree.dependencies.forEach(function (child) {
	    return printDepTree(child, lines, depth + 1);
	  });
	}

	var Reaction$$1 =
	/** @class */
	function () {
	  function Reaction$$1(name, onInvalidate, errorHandler) {
	    if (name === void 0) {
	      name = "Reaction@" + getNextId$$1();
	    }

	    this.name = name;
	    this.onInvalidate = onInvalidate;
	    this.errorHandler = errorHandler;
	    this.observing = []; // nodes we are looking at. Our value depends on these nodes

	    this.newObserving = [];
	    this.dependenciesState = IDerivationState.NOT_TRACKING;
	    this.diffValue = 0;
	    this.runId = 0;
	    this.unboundDepsCount = 0;
	    this.__mapid = "#" + getNextId$$1();
	    this.isDisposed = false;
	    this._isScheduled = false;
	    this._isTrackPending = false;
	    this._isRunning = false;
	    this.isTracing = TraceMode$$1.NONE;
	  }

	  Reaction$$1.prototype.onBecomeStale = function () {
	    this.schedule();
	  };

	  Reaction$$1.prototype.schedule = function () {
	    if (!this._isScheduled) {
	      this._isScheduled = true;
	      globalState$$1.pendingReactions.push(this);
	      runReactions$$1();
	    }
	  };

	  Reaction$$1.prototype.isScheduled = function () {
	    return this._isScheduled;
	  };
	  /**
	   * internal, use schedule() if you intend to kick off a reaction
	   */


	  Reaction$$1.prototype.runReaction = function () {
	    if (!this.isDisposed) {
	      startBatch$$1();
	      this._isScheduled = false;

	      if (shouldCompute$$1(this)) {
	        this._isTrackPending = true;

	        try {
	          this.onInvalidate();

	          if (this._isTrackPending && isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
	            // onInvalidate didn't trigger track right away..
	            spyReport$$1({
	              name: this.name,
	              type: "scheduled-reaction"
	            });
	          }
	        } catch (e) {
	          this.reportExceptionInDerivation(e);
	        }
	      }

	      endBatch$$1();
	    }
	  };

	  Reaction$$1.prototype.track = function (fn) {
	    startBatch$$1();
	    var notify = isSpyEnabled$$1();
	    var startTime;

	    if (notify && process.env.NODE_ENV !== "production") {
	      startTime = Date.now();
	      spyReportStart$$1({
	        name: this.name,
	        type: "reaction"
	      });
	    }

	    this._isRunning = true;
	    var result = trackDerivedFunction$$1(this, fn, undefined);
	    this._isRunning = false;
	    this._isTrackPending = false;

	    if (this.isDisposed) {
	      // disposed during last run. Clean up everything that was bound after the dispose call.
	      clearObserving$$1(this);
	    }

	    if (isCaughtException$$1(result)) this.reportExceptionInDerivation(result.cause);

	    if (notify && process.env.NODE_ENV !== "production") {
	      spyReportEnd$$1({
	        time: Date.now() - startTime
	      });
	    }

	    endBatch$$1();
	  };

	  Reaction$$1.prototype.reportExceptionInDerivation = function (error) {
	    var _this = this;

	    if (this.errorHandler) {
	      this.errorHandler(error, this);
	      return;
	    }

	    if (globalState$$1.disableErrorBoundaries) throw error;
	    var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this;
	    console.error(message, error);
	    /** If debugging brought you here, please, read the above message :-). Tnx! */

	    if (isSpyEnabled$$1()) {
	      spyReport$$1({
	        type: "error",
	        name: this.name,
	        message: message,
	        error: "" + error
	      });
	    }

	    globalState$$1.globalReactionErrorHandlers.forEach(function (f) {
	      return f(error, _this);
	    });
	  };

	  Reaction$$1.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;

	      if (!this._isRunning) {
	        // if disposed while running, clean up later. Maybe not optimal, but rare case
	        startBatch$$1();
	        clearObserving$$1(this);
	        endBatch$$1();
	      }
	    }
	  };

	  Reaction$$1.prototype.getDisposer = function () {
	    var r = this.dispose.bind(this);
	    r[$mobx$$1] = this;
	    return r;
	  };

	  Reaction$$1.prototype.toString = function () {
	    return "Reaction[" + this.name + "]";
	  };

	  Reaction$$1.prototype.trace = function (enterBreakPoint) {
	    if (enterBreakPoint === void 0) {
	      enterBreakPoint = false;
	    }

	    trace$$1(this, enterBreakPoint);
	  };

	  return Reaction$$1;
	}();

	function onReactionError$$1(handler) {
	  globalState$$1.globalReactionErrorHandlers.push(handler);
	  return function () {
	    var idx = globalState$$1.globalReactionErrorHandlers.indexOf(handler);
	    if (idx >= 0) globalState$$1.globalReactionErrorHandlers.splice(idx, 1);
	  };
	}
	/**
	 * Magic number alert!
	 * Defines within how many times a reaction is allowed to re-trigger itself
	 * until it is assumed that this is gonna be a never ending loop...
	 */


	var MAX_REACTION_ITERATIONS = 100;

	var reactionScheduler = function (f) {
	  return f();
	};

	function runReactions$$1() {
	  // Trampolining, if runReactions are already running, new reactions will be picked up
	  if (globalState$$1.inBatch > 0 || globalState$$1.isRunningReactions) return;
	  reactionScheduler(runReactionsHelper);
	}

	function runReactionsHelper() {
	  globalState$$1.isRunningReactions = true;
	  var allReactions = globalState$$1.pendingReactions;
	  var iterations = 0; // While running reactions, new reactions might be triggered.
	  // Hence we work with two variables and check whether
	  // we converge to no remaining reactions after a while.

	  while (allReactions.length > 0) {
	    if (++iterations === MAX_REACTION_ITERATIONS) {
	      console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
	      allReactions.splice(0); // clear reactions
	    }

	    var remainingReactions = allReactions.splice(0);

	    for (var i = 0, l = remainingReactions.length; i < l; i++) remainingReactions[i].runReaction();
	  }

	  globalState$$1.isRunningReactions = false;
	}

	var isReaction$$1 = createInstanceofPredicate$$1("Reaction", Reaction$$1);

	function setReactionScheduler$$1(fn) {
	  var baseScheduler = reactionScheduler;

	  reactionScheduler = function (f) {
	    return fn(function () {
	      return baseScheduler(f);
	    });
	  };
	}

	function isSpyEnabled$$1() {
	  return process.env.NODE_ENV !== "production" && !!globalState$$1.spyListeners.length;
	}

	function spyReport$$1(event) {
	  if (process.env.NODE_ENV === "production") return; // dead code elimination can do the rest

	  if (!globalState$$1.spyListeners.length) return;
	  var listeners = globalState$$1.spyListeners;

	  for (var i = 0, l = listeners.length; i < l; i++) listeners[i](event);
	}

	function spyReportStart$$1(event) {
	  if (process.env.NODE_ENV === "production") return;

	  var change = __assign({}, event, {
	    spyReportStart: true
	  });

	  spyReport$$1(change);
	}

	var END_EVENT = {
	  spyReportEnd: true
	};

	function spyReportEnd$$1(change) {
	  if (process.env.NODE_ENV === "production") return;
	  if (change) spyReport$$1(__assign({}, change, {
	    spyReportEnd: true
	  }));else spyReport$$1(END_EVENT);
	}

	function spy$$1(listener) {
	  if (process.env.NODE_ENV === "production") {
	    console.warn("[mobx.spy] Is a no-op in production builds");
	    return function () {};
	  } else {
	    globalState$$1.spyListeners.push(listener);
	    return once$$1(function () {
	      globalState$$1.spyListeners = globalState$$1.spyListeners.filter(function (l) {
	        return l !== listener;
	      });
	    });
	  }
	}

	function dontReassignFields() {
	  fail$$1(process.env.NODE_ENV !== "production" && "@action fields are not reassignable");
	}

	function namedActionDecorator$$1(name) {
	  return function (target, prop, descriptor) {
	    if (descriptor) {
	      if (process.env.NODE_ENV !== "production" && descriptor.get !== undefined) {
	        return fail$$1("@action cannot be used with getters");
	      } // babel / typescript
	      // @action method() { }


	      if (descriptor.value) {
	        // typescript
	        return {
	          value: createAction$$1(name, descriptor.value),
	          enumerable: false,
	          configurable: true,
	          writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)

	        };
	      } // babel only: @action method = () => {}


	      var initializer_1 = descriptor.initializer;
	      return {
	        enumerable: false,
	        configurable: true,
	        writable: true,
	        initializer: function () {
	          // N.B: we can't immediately invoke initializer; this would be wrong
	          return createAction$$1(name, initializer_1.call(this));
	        }
	      };
	    } // bound instance methods


	    return actionFieldDecorator$$1(name).apply(this, arguments);
	  };
	}

	function actionFieldDecorator$$1(name) {
	  // Simple property that writes on first invocation to the current instance
	  return function (target, prop, descriptor) {
	    Object.defineProperty(target, prop, {
	      configurable: true,
	      enumerable: false,
	      get: function () {
	        return undefined;
	      },
	      set: function (value) {
	        addHiddenProp$$1(this, prop, action$$1(name, value));
	      }
	    });
	  };
	}

	function boundActionDecorator$$1(target, propertyName, descriptor, applyToInstance) {
	  if (applyToInstance === true) {
	    defineBoundAction$$1(target, propertyName, descriptor.value);
	    return null;
	  }

	  if (descriptor) {
	    // if (descriptor.value)
	    // Typescript / Babel: @action.bound method() { }
	    // also: babel @action.bound method = () => {}
	    return {
	      configurable: true,
	      enumerable: false,
	      get: function () {
	        defineBoundAction$$1(this, propertyName, descriptor.value || descriptor.initializer.call(this));
	        return this[propertyName];
	      },
	      set: dontReassignFields
	    };
	  } // field decorator Typescript @action.bound method = () => {}


	  return {
	    enumerable: false,
	    configurable: true,
	    set: function (v) {
	      defineBoundAction$$1(this, propertyName, v);
	    },
	    get: function () {
	      return undefined;
	    }
	  };
	}

	var action$$1 = function action$$1(arg1, arg2, arg3, arg4) {
	  // action(fn() {})
	  if (arguments.length === 1 && typeof arg1 === "function") return createAction$$1(arg1.name || "<unnamed action>", arg1); // action("name", fn() {})

	  if (arguments.length === 2 && typeof arg2 === "function") return createAction$$1(arg1, arg2); // @action("name") fn() {}

	  if (arguments.length === 1 && typeof arg1 === "string") return namedActionDecorator$$1(arg1); // @action fn() {}

	  if (arg4 === true) {
	    // apply to instance immediately
	    addHiddenProp$$1(arg1, arg2, createAction$$1(arg1.name || arg2, arg3.value));
	  } else {
	    return namedActionDecorator$$1(arg2).apply(null, arguments);
	  }
	};

	action$$1.bound = boundActionDecorator$$1;

	function runInAction$$1(arg1, arg2) {
	  var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
	  var fn = typeof arg1 === "function" ? arg1 : arg2;

	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
	    if (typeof actionName !== "string" || !actionName) fail$$1("actions should have valid names, got: '" + actionName + "'");
	  }

	  return executeAction$$1(actionName, fn, this, undefined);
	}

	function isAction$$1(thing) {
	  return typeof thing === "function" && thing.isMobxAction === true;
	}

	function defineBoundAction$$1(target, propertyName, fn) {
	  addHiddenProp$$1(target, propertyName, createAction$$1(propertyName, fn.bind(target)));
	}
	/**
	 * Creates a named reactive view and keeps it alive, so that the view is always
	 * updated if one of the dependencies changes, even when the view is not further used by something else.
	 * @param view The reactive view
	 * @returns disposer function, which can be used to stop the view from being updated in the future.
	 */


	function autorun$$1(view, opts) {
	  if (opts === void 0) {
	    opts = EMPTY_OBJECT$$1;
	  }

	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(typeof view === "function", "Autorun expects a function as first argument");
	    invariant$$1(isAction$$1(view) === false, "Autorun does not accept actions since actions are untrackable");
	  }

	  var name = opts && opts.name || view.name || "Autorun@" + getNextId$$1();
	  var runSync = !opts.scheduler && !opts.delay;
	  var reaction$$1;

	  if (runSync) {
	    // normal autorun
	    reaction$$1 = new Reaction$$1(name, function () {
	      this.track(reactionRunner);
	    }, opts.onError);
	  } else {
	    var scheduler_1 = createSchedulerFromOptions(opts); // debounced autorun

	    var isScheduled_1 = false;
	    reaction$$1 = new Reaction$$1(name, function () {
	      if (!isScheduled_1) {
	        isScheduled_1 = true;
	        scheduler_1(function () {
	          isScheduled_1 = false;
	          if (!reaction$$1.isDisposed) reaction$$1.track(reactionRunner);
	        });
	      }
	    }, opts.onError);
	  }

	  function reactionRunner() {
	    view(reaction$$1);
	  }

	  reaction$$1.schedule();
	  return reaction$$1.getDisposer();
	}

	var run = function (f) {
	  return f();
	};

	function createSchedulerFromOptions(opts) {
	  return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
	    return setTimeout(f, opts.delay);
	  } : run;
	}

	function reaction$$1(expression, effect, opts) {
	  if (opts === void 0) {
	    opts = EMPTY_OBJECT$$1;
	  }

	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(typeof expression === "function", "First argument to reaction should be a function");
	    invariant$$1(typeof opts === "object", "Third argument of reactions should be an object");
	  }

	  var name = opts.name || "Reaction@" + getNextId$$1();
	  var effectAction = action$$1(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
	  var runSync = !opts.scheduler && !opts.delay;
	  var scheduler = createSchedulerFromOptions(opts);
	  var firstTime = true;
	  var isScheduled = false;
	  var value;
	  var equals = opts.compareStructural ? comparer$$1.structural : opts.equals || comparer$$1.default;
	  var r = new Reaction$$1(name, function () {
	    if (firstTime || runSync) {
	      reactionRunner();
	    } else if (!isScheduled) {
	      isScheduled = true;
	      scheduler(reactionRunner);
	    }
	  }, opts.onError);

	  function reactionRunner() {
	    isScheduled = false; // Q: move into reaction runner?

	    if (r.isDisposed) return;
	    var changed = false;
	    r.track(function () {
	      var nextValue = expression(r);
	      changed = firstTime || !equals(value, nextValue);
	      value = nextValue;
	    });
	    if (firstTime && opts.fireImmediately) effectAction(value, r);
	    if (!firstTime && changed === true) effectAction(value, r);
	    if (firstTime) firstTime = false;
	  }

	  r.schedule();
	  return r.getDisposer();
	}

	function wrapErrorHandler(errorHandler, baseFn) {
	  return function () {
	    try {
	      return baseFn.apply(this, arguments);
	    } catch (e) {
	      errorHandler.call(this, e);
	    }
	  };
	}

	function onBecomeObserved$$1(thing, arg2, arg3) {
	  return interceptHook("onBecomeObserved", thing, arg2, arg3);
	}

	function onBecomeUnobserved$$1(thing, arg2, arg3) {
	  return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
	}

	function interceptHook(hook, thing, arg2, arg3) {
	  var atom = typeof arg2 === "string" ? getAtom$$1(thing, arg2) : getAtom$$1(thing);
	  var cb = typeof arg2 === "string" ? arg3 : arg2;
	  var orig = atom[hook];
	  if (typeof orig !== "function") return fail$$1(process.env.NODE_ENV !== "production" && "Not an atom that can be (un)observed");

	  atom[hook] = function () {
	    orig.call(this);
	    cb.call(this);
	  };

	  return function () {
	    atom[hook] = orig;
	  };
	}

	function configure$$1(options) {
	  var enforceActions = options.enforceActions,
	      computedRequiresReaction = options.computedRequiresReaction,
	      disableErrorBoundaries = options.disableErrorBoundaries,
	      reactionScheduler = options.reactionScheduler;

	  if (enforceActions !== undefined) {
	    if (typeof enforceActions === "boolean" || enforceActions === "strict") deprecated$$1("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
	    var ea = void 0;

	    switch (enforceActions) {
	      case true:
	      case "observed":
	        ea = true;
	        break;

	      case false:
	      case "never":
	        ea = false;
	        break;

	      case "strict":
	      case "always":
	        ea = "strict";
	        break;

	      default:
	        fail$$1("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
	    }

	    globalState$$1.enforceActions = ea;
	    globalState$$1.allowStateChanges = ea === true || ea === "strict" ? false : true;
	  }

	  if (computedRequiresReaction !== undefined) {
	    globalState$$1.computedRequiresReaction = !!computedRequiresReaction;
	  }

	  if (options.isolateGlobalState === true) {
	    isolateGlobalState$$1();
	  }

	  if (disableErrorBoundaries !== undefined) {
	    if (disableErrorBoundaries === true) console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
	    globalState$$1.disableErrorBoundaries = !!disableErrorBoundaries;
	  }

	  if (reactionScheduler) {
	    setReactionScheduler$$1(reactionScheduler);
	  }
	}

	function decorate$$1(thing, decorators) {
	  process.env.NODE_ENV !== "production" && invariant$$1(isPlainObject$$1(decorators), "Decorators should be a key value map");
	  var target = typeof thing === "function" ? thing.prototype : thing;

	  var _loop_1 = function (prop) {
	    var propertyDecorators = decorators[prop];

	    if (!Array.isArray(propertyDecorators)) {
	      propertyDecorators = [propertyDecorators];
	    }

	    process.env.NODE_ENV !== "production" && invariant$$1(propertyDecorators.every(function (decorator) {
	      return typeof decorator === "function";
	    }), "Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
	    var descriptor = Object.getOwnPropertyDescriptor(target, prop);
	    var newDescriptor = propertyDecorators.reduce(function (accDescriptor, decorator) {
	      return decorator(target, prop, accDescriptor);
	    }, descriptor);
	    if (newDescriptor) Object.defineProperty(target, prop, newDescriptor);
	  };

	  for (var prop in decorators) {
	    _loop_1(prop);
	  }

	  return thing;
	}

	function extendObservable$$1(target, properties, decorators, options) {
	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
	    invariant$$1(typeof target === "object", "'extendObservable' expects an object as first argument");
	    invariant$$1(!isObservableMap$$1(target), "'extendObservable' should not be used on maps, use map.merge instead");
	  }

	  options = asCreateObservableOptions$$1(options);
	  var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(options);
	  initializeInstance$$1(target); // Fixes #1740

	  asObservableObject$$1(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props

	  if (properties) extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator);
	  return target;
	}

	function getDefaultDecoratorFromObjectOptions$$1(options) {
	  return options.defaultDecorator || (options.deep === false ? refDecorator$$1 : deepDecorator$$1);
	}

	function extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator) {
	  if (process.env.NODE_ENV !== "production") {
	    invariant$$1(!isObservable$$1(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
	    if (decorators) for (var key in decorators) if (!(key in properties)) fail$$1("Trying to declare a decorator for unspecified property '" + key + "'");
	  }

	  startBatch$$1();

	  try {
	    for (var key in properties) {
	      var descriptor = Object.getOwnPropertyDescriptor(properties, key);

	      if (process.env.NODE_ENV !== "production") {
	        if (Object.getOwnPropertyDescriptor(target, key)) fail$$1("'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '" + key + "' already exists on '" + target + "'");
	        if (isComputed$$1(descriptor.value)) fail$$1("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
	      }

	      var decorator = decorators && key in decorators ? decorators[key] : descriptor.get ? computedDecorator$$1 : defaultDecorator;
	      if (process.env.NODE_ENV !== "production" && typeof decorator !== "function") fail$$1("Not a valid decorator for '" + key + "', got: " + decorator);
	      var resultDescriptor = decorator(target, key, descriptor, true);
	      if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
	      ) Object.defineProperty(target, key, resultDescriptor);
	    }
	  } finally {
	    endBatch$$1();
	  }
	}

	function getDependencyTree$$1(thing, property) {
	  return nodeToDependencyTree(getAtom$$1(thing, property));
	}

	function nodeToDependencyTree(node) {
	  var result = {
	    name: node.name
	  };
	  if (node.observing && node.observing.length > 0) result.dependencies = unique$$1(node.observing).map(nodeToDependencyTree);
	  return result;
	}

	function getObserverTree$$1(thing, property) {
	  return nodeToObserverTree(getAtom$$1(thing, property));
	}

	function nodeToObserverTree(node) {
	  var result = {
	    name: node.name
	  };
	  if (hasObservers$$1(node)) result.observers = Array.from(getObservers$$1(node)).map(nodeToObserverTree);
	  return result;
	}

	var generatorId = 0;

	function flow$$1(generator) {
	  if (arguments.length !== 1) fail$$1(process.env.NODE_ENV && "Flow expects one 1 argument and cannot be used as decorator");
	  var name = generator.name || "<unnamed flow>"; // Implementation based on https://github.com/tj/co/blob/master/index.js

	  return function () {
	    var ctx = this;
	    var args = arguments;
	    var runId = ++generatorId;
	    var gen = action$$1(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
	    var rejector;
	    var pendingPromise = undefined;
	    var res = new Promise(function (resolve, reject) {
	      var stepId = 0;
	      rejector = reject;

	      function onFulfilled(res) {
	        pendingPromise = undefined;
	        var ret;

	        try {
	          ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
	        } catch (e) {
	          return reject(e);
	        }

	        next(ret);
	      }

	      function onRejected(err) {
	        pendingPromise = undefined;
	        var ret;

	        try {
	          ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
	        } catch (e) {
	          return reject(e);
	        }

	        next(ret);
	      }

	      function next(ret) {
	        if (ret && typeof ret.then === "function") {
	          // an async iterator
	          ret.then(next, reject);
	          return;
	        }

	        if (ret.done) return resolve(ret.value);
	        pendingPromise = Promise.resolve(ret.value);
	        return pendingPromise.then(onFulfilled, onRejected);
	      }

	      onFulfilled(undefined); // kick off the process
	    });
	    res.cancel = action$$1(name + " - runid: " + runId + " - cancel", function () {
	      try {
	        if (pendingPromise) cancelPromise(pendingPromise); // Finally block can return (or yield) stuff..

	        var res_1 = gen.return(); // eat anything that promise would do, it's cancelled!

	        var yieldedPromise = Promise.resolve(res_1.value);
	        yieldedPromise.then(noop$$1, noop$$1);
	        cancelPromise(yieldedPromise); // maybe it can be cancelled :)
	        // reject our original promise

	        rejector(new Error("FLOW_CANCELLED"));
	      } catch (e) {
	        rejector(e); // there could be a throwing finally block
	      }
	    });
	    return res;
	  };
	}

	function cancelPromise(promise) {
	  if (typeof promise.cancel === "function") promise.cancel();
	}

	function interceptReads$$1(thing, propOrHandler, handler) {
	  var target;

	  if (isObservableMap$$1(thing) || isObservableArray$$1(thing) || isObservableValue$$1(thing)) {
	    target = getAdministration$$1(thing);
	  } else if (isObservableObject$$1(thing)) {
	    if (typeof propOrHandler !== "string") return fail$$1(process.env.NODE_ENV !== "production" && "InterceptReads can only be used with a specific property, not with an object in general");
	    target = getAdministration$$1(thing, propOrHandler);
	  } else {
	    return fail$$1(process.env.NODE_ENV !== "production" && "Expected observable map, object or array as first array");
	  }

	  if (target.dehancer !== undefined) return fail$$1(process.env.NODE_ENV !== "production" && "An intercept reader was already established");
	  target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
	  return function () {
	    target.dehancer = undefined;
	  };
	}

	function intercept$$1(thing, propOrHandler, handler) {
	  if (typeof handler === "function") return interceptProperty(thing, propOrHandler, handler);else return interceptInterceptable(thing, propOrHandler);
	}

	function interceptInterceptable(thing, handler) {
	  return getAdministration$$1(thing).intercept(handler);
	}

	function interceptProperty(thing, property, handler) {
	  return getAdministration$$1(thing, property).intercept(handler);
	}

	function _isComputed$$1(value, property) {
	  if (value === null || value === undefined) return false;

	  if (property !== undefined) {
	    if (isObservableObject$$1(value) === false) return false;
	    if (!value[$mobx$$1].values.has(property)) return false;
	    var atom = getAtom$$1(value, property);
	    return isComputedValue$$1(atom);
	  }

	  return isComputedValue$$1(value);
	}

	function isComputed$$1(value) {
	  if (arguments.length > 1) return fail$$1(process.env.NODE_ENV !== "production" && "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
	  return _isComputed$$1(value);
	}

	function isComputedProp$$1(value, propName) {
	  if (typeof propName !== "string") return fail$$1(process.env.NODE_ENV !== "production" && "isComputed expected a property name as second argument");
	  return _isComputed$$1(value, propName);
	}

	function _isObservable(value, property) {
	  if (value === null || value === undefined) return false;

	  if (property !== undefined) {
	    if (process.env.NODE_ENV !== "production" && (isObservableMap$$1(value) || isObservableArray$$1(value))) return fail$$1("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");

	    if (isObservableObject$$1(value)) {
	      return value[$mobx$$1].values.has(property);
	    }

	    return false;
	  } // For first check, see #701


	  return isObservableObject$$1(value) || !!value[$mobx$$1] || isAtom$$1(value) || isReaction$$1(value) || isComputedValue$$1(value);
	}

	function isObservable$$1(value) {
	  if (arguments.length !== 1) fail$$1(process.env.NODE_ENV !== "production" && "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
	  return _isObservable(value);
	}

	function isObservableProp$$1(value, propName) {
	  if (typeof propName !== "string") return fail$$1(process.env.NODE_ENV !== "production" && "expected a property name as second argument");
	  return _isObservable(value, propName);
	}

	function keys$$1(obj) {
	  if (isObservableObject$$1(obj)) {
	    return obj[$mobx$$1].getKeys();
	  }

	  if (isObservableMap$$1(obj)) {
	    return Array.from(obj.keys());
	  }

	  if (isObservableArray$$1(obj)) {
	    return obj.map(function (_, index) {
	      return index;
	    });
	  }

	  return fail$$1(process.env.NODE_ENV !== "production" && "'keys()' can only be used on observable objects, arrays and maps");
	}

	function values$$1(obj) {
	  if (isObservableObject$$1(obj)) {
	    return keys$$1(obj).map(function (key) {
	      return obj[key];
	    });
	  }

	  if (isObservableMap$$1(obj)) {
	    return keys$$1(obj).map(function (key) {
	      return obj.get(key);
	    });
	  }

	  if (isObservableArray$$1(obj)) {
	    return obj.slice();
	  }

	  return fail$$1(process.env.NODE_ENV !== "production" && "'values()' can only be used on observable objects, arrays and maps");
	}

	function entries$$1(obj) {
	  if (isObservableObject$$1(obj)) {
	    return keys$$1(obj).map(function (key) {
	      return [key, obj[key]];
	    });
	  }

	  if (isObservableMap$$1(obj)) {
	    return keys$$1(obj).map(function (key) {
	      return [key, obj.get(key)];
	    });
	  }

	  if (isObservableArray$$1(obj)) {
	    return obj.map(function (key, index) {
	      return [index, key];
	    });
	  }

	  return fail$$1(process.env.NODE_ENV !== "production" && "'entries()' can only be used on observable objects, arrays and maps");
	}

	function set$$1(obj, key, value) {
	  if (arguments.length === 2) {
	    startBatch$$1();
	    var values_1 = key;

	    try {
	      for (var key_1 in values_1) set$$1(obj, key_1, values_1[key_1]);
	    } finally {
	      endBatch$$1();
	    }

	    return;
	  }

	  if (isObservableObject$$1(obj)) {
	    var adm = obj[$mobx$$1];
	    var existingObservable = adm.values.get(key);

	    if (existingObservable) {
	      adm.write(key, value);
	    } else {
	      adm.addObservableProp(key, value, adm.defaultEnhancer);
	    }
	  } else if (isObservableMap$$1(obj)) {
	    obj.set(key, value);
	  } else if (isObservableArray$$1(obj)) {
	    if (typeof key !== "number") key = parseInt(key, 10);
	    invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
	    startBatch$$1();
	    if (key >= obj.length) obj.length = key + 1;
	    obj[key] = value;
	    endBatch$$1();
	  } else {
	    return fail$$1(process.env.NODE_ENV !== "production" && "'set()' can only be used on observable objects, arrays and maps");
	  }
	}

	function remove$$1(obj, key) {
	  if (isObservableObject$$1(obj)) {
	    obj[$mobx$$1].remove(key);
	  } else if (isObservableMap$$1(obj)) {
	    obj.delete(key);
	  } else if (isObservableArray$$1(obj)) {
	    if (typeof key !== "number") key = parseInt(key, 10);
	    invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
	    obj.splice(key, 1);
	  } else {
	    return fail$$1(process.env.NODE_ENV !== "production" && "'remove()' can only be used on observable objects, arrays and maps");
	  }
	}

	function has$$1(obj, key) {
	  if (isObservableObject$$1(obj)) {
	    // return keys(obj).indexOf(key) >= 0
	    var adm = getAdministration$$1(obj);
	    return adm.has(key);
	  } else if (isObservableMap$$1(obj)) {
	    return obj.has(key);
	  } else if (isObservableArray$$1(obj)) {
	    return key >= 0 && key < obj.length;
	  } else {
	    return fail$$1(process.env.NODE_ENV !== "production" && "'has()' can only be used on observable objects, arrays and maps");
	  }
	}

	function get$$1(obj, key) {
	  if (!has$$1(obj, key)) return undefined;

	  if (isObservableObject$$1(obj)) {
	    return obj[key];
	  } else if (isObservableMap$$1(obj)) {
	    return obj.get(key);
	  } else if (isObservableArray$$1(obj)) {
	    return obj[key];
	  } else {
	    return fail$$1(process.env.NODE_ENV !== "production" && "'get()' can only be used on observable objects, arrays and maps");
	  }
	}

	function observe$$1(thing, propOrCb, cbOrFire, fireImmediately) {
	  if (typeof cbOrFire === "function") return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);else return observeObservable(thing, propOrCb, cbOrFire);
	}

	function observeObservable(thing, listener, fireImmediately) {
	  return getAdministration$$1(thing).observe(listener, fireImmediately);
	}

	function observeObservableProperty(thing, property, listener, fireImmediately) {
	  return getAdministration$$1(thing, property).observe(listener, fireImmediately);
	}

	var defaultOptions = {
	  detectCycles: true,
	  exportMapsAsObjects: true,
	  recurseEverything: false
	};

	function cache(map, key, value, options) {
	  if (options.detectCycles) map.set(key, value);
	  return value;
	}

	function toJSHelper(source, options, __alreadySeen) {
	  if (!options.recurseEverything && !isObservable$$1(source)) return source;
	  if (typeof source !== "object") return source; // Directly return null if source is null

	  if (source === null) return null; // Directly return the Date object itself if contained in the observable

	  if (source instanceof Date) return source;
	  if (isObservableValue$$1(source)) return toJSHelper(source.get(), options, __alreadySeen); // make sure we track the keys of the object

	  if (isObservable$$1(source)) keys$$1(source);
	  var detectCycles = options.detectCycles === true;

	  if (detectCycles && source !== null && __alreadySeen.has(source)) {
	    return __alreadySeen.get(source);
	  }

	  if (isObservableArray$$1(source) || Array.isArray(source)) {
	    var res_1 = cache(__alreadySeen, source, [], options);
	    var toAdd = source.map(function (value) {
	      return toJSHelper(value, options, __alreadySeen);
	    });
	    res_1.length = toAdd.length;

	    for (var i = 0, l = toAdd.length; i < l; i++) res_1[i] = toAdd[i];

	    return res_1;
	  }

	  if (isObservableMap$$1(source) || Object.getPrototypeOf(source) === Map.prototype) {
	    if (options.exportMapsAsObjects === false) {
	      var res_2 = cache(__alreadySeen, source, new Map(), options);
	      source.forEach(function (value, key) {
	        res_2.set(key, toJSHelper(value, options, __alreadySeen));
	      });
	      return res_2;
	    } else {
	      var res_3 = cache(__alreadySeen, source, {}, options);
	      source.forEach(function (value, key) {
	        res_3[key] = toJSHelper(value, options, __alreadySeen);
	      });
	      return res_3;
	    }
	  } // Fallback to the situation that source is an ObservableObject or a plain object


	  var res = cache(__alreadySeen, source, {}, options);

	  for (var key in source) {
	    res[key] = toJSHelper(source[key], options, __alreadySeen);
	  }

	  return res;
	}

	function toJS$$1(source, options) {
	  // backward compatibility
	  if (typeof options === "boolean") options = {
	    detectCycles: options
	  };
	  if (!options) options = defaultOptions;
	  options.detectCycles = options.detectCycles === undefined ? options.recurseEverything === true : options.detectCycles === true;

	  var __alreadySeen;

	  if (options.detectCycles) __alreadySeen = new Map();
	  return toJSHelper(source, options, __alreadySeen);
	}

	function trace$$1() {
	  var args = [];

	  for (var _i = 0; _i < arguments.length; _i++) {
	    args[_i] = arguments[_i];
	  }

	  var enterBreakPoint = false;
	  if (typeof args[args.length - 1] === "boolean") enterBreakPoint = args.pop();
	  var derivation = getAtomFromArgs(args);

	  if (!derivation) {
	    return fail$$1(process.env.NODE_ENV !== "production" && "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
	  }

	  if (derivation.isTracing === TraceMode$$1.NONE) {
	    console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
	  }

	  derivation.isTracing = enterBreakPoint ? TraceMode$$1.BREAK : TraceMode$$1.LOG;
	}

	function getAtomFromArgs(args) {
	  switch (args.length) {
	    case 0:
	      return globalState$$1.trackingDerivation;

	    case 1:
	      return getAtom$$1(args[0]);

	    case 2:
	      return getAtom$$1(args[0], args[1]);
	  }
	}
	/**
	 * During a transaction no views are updated until the end of the transaction.
	 * The transaction will be run synchronously nonetheless.
	 *
	 * @param action a function that updates some reactive state
	 * @returns any value that was returned by the 'action' parameter.
	 */


	function transaction$$1(action$$1, thisArg) {
	  if (thisArg === void 0) {
	    thisArg = undefined;
	  }

	  startBatch$$1();

	  try {
	    return action$$1.apply(thisArg);
	  } finally {
	    endBatch$$1();
	  }
	}

	function when$$1(predicate, arg1, arg2) {
	  if (arguments.length === 1 || arg1 && typeof arg1 === "object") return whenPromise(predicate, arg1);
	  return _when(predicate, arg1, arg2 || {});
	}

	function _when(predicate, effect, opts) {
	  var timeoutHandle;

	  if (typeof opts.timeout === "number") {
	    timeoutHandle = setTimeout(function () {
	      if (!disposer[$mobx$$1].isDisposed) {
	        disposer();
	        var error = new Error("WHEN_TIMEOUT");
	        if (opts.onError) opts.onError(error);else throw error;
	      }
	    }, opts.timeout);
	  }

	  opts.name = opts.name || "When@" + getNextId$$1();
	  var effectAction = createAction$$1(opts.name + "-effect", effect);
	  var disposer = autorun$$1(function (r) {
	    if (predicate()) {
	      r.dispose();
	      if (timeoutHandle) clearTimeout(timeoutHandle);
	      effectAction();
	    }
	  }, opts);
	  return disposer;
	}

	function whenPromise(predicate, opts) {
	  if (process.env.NODE_ENV !== "production" && opts && opts.onError) return fail$$1("the options 'onError' and 'promise' cannot be combined");
	  var cancel;
	  var res = new Promise(function (resolve, reject) {
	    var disposer = _when(predicate, resolve, __assign({}, opts, {
	      onError: reject
	    }));

	    cancel = function () {
	      disposer();
	      reject("WHEN_CANCELLED");
	    };
	  });
	  res.cancel = cancel;
	  return res;
	}

	function getAdm(target) {
	  return target[$mobx$$1];
	} // Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
	// and skip either the internal values map, or the base object with its property descriptors!


	var objectProxyTraps = {
	  has: function (target, name) {
	    if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1) return true;
	    var adm = getAdm(target); // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
	    // TODO: check performance stats!
	    // if (adm.values.get(name as string)) return true

	    if (typeof name === "string") return adm.has(name);
	    return name in target;
	  },
	  get: function (target, name) {
	    if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1) return target[name];
	    var adm = getAdm(target);
	    var observable$$1 = adm.values.get(name);

	    if (observable$$1 instanceof Atom$$1) {
	      var result = observable$$1.get();

	      if (result === undefined) {
	        // This fixes #1796, because deleting a prop that has an
	        // undefined value won't retrigger a observer (no visible effect),
	        // the autorun wouldn't subscribe to future key changes (see also next comment)
	        adm.has(name);
	      }

	      return result;
	    } // make sure we start listening to future keys
	    // note that we only do this here for optimization


	    if (typeof name === "string") adm.has(name);
	    return target[name];
	  },
	  set: function (target, name, value) {
	    if (typeof name !== "string") return false;
	    set$$1(target, name, value);
	    return true;
	  },
	  deleteProperty: function (target, name) {
	    if (typeof name !== "string") return false;
	    var adm = getAdm(target);
	    adm.remove(name);
	    return true;
	  },
	  ownKeys: function (target) {
	    var adm = getAdm(target);
	    adm.keysAtom.reportObserved();
	    return Reflect.ownKeys(target);
	  },
	  preventExtensions: function (target) {
	    fail$$1("Dynamic observable objects cannot be frozen");
	    return false;
	  }
	};

	function createDynamicObservableObject$$1(base) {
	  var proxy = new Proxy(base, objectProxyTraps);
	  base[$mobx$$1].proxy = proxy;
	  return proxy;
	}

	function hasInterceptors$$1(interceptable) {
	  return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
	}

	function registerInterceptor$$1(interceptable, handler) {
	  var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
	  interceptors.push(handler);
	  return once$$1(function () {
	    var idx = interceptors.indexOf(handler);
	    if (idx !== -1) interceptors.splice(idx, 1);
	  });
	}

	function interceptChange$$1(interceptable, change) {
	  var prevU = untrackedStart$$1();

	  try {
	    var interceptors = interceptable.interceptors;
	    if (interceptors) for (var i = 0, l = interceptors.length; i < l; i++) {
	      change = interceptors[i](change);
	      invariant$$1(!change || change.type, "Intercept handlers should return nothing or a change object");
	      if (!change) break;
	    }
	    return change;
	  } finally {
	    untrackedEnd$$1(prevU);
	  }
	}

	function hasListeners$$1(listenable) {
	  return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
	}

	function registerListener$$1(listenable, handler) {
	  var listeners = listenable.changeListeners || (listenable.changeListeners = []);
	  listeners.push(handler);
	  return once$$1(function () {
	    var idx = listeners.indexOf(handler);
	    if (idx !== -1) listeners.splice(idx, 1);
	  });
	}

	function notifyListeners$$1(listenable, change) {
	  var prevU = untrackedStart$$1();
	  var listeners = listenable.changeListeners;
	  if (!listeners) return;
	  listeners = listeners.slice();

	  for (var i = 0, l = listeners.length; i < l; i++) {
	    listeners[i](change);
	  }

	  untrackedEnd$$1(prevU);
	}

	var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859

	var arrayTraps = {
	  get: function (target, name) {
	    if (name === $mobx$$1) return target[$mobx$$1];
	    if (name === "length") return target[$mobx$$1].getArrayLength();

	    if (typeof name === "number") {
	      return arrayExtensions.get.call(target, name);
	    }

	    if (typeof name === "string" && !isNaN(name)) {
	      return arrayExtensions.get.call(target, parseInt(name));
	    }

	    if (arrayExtensions.hasOwnProperty(name)) {
	      return arrayExtensions[name];
	    }

	    return target[name];
	  },
	  set: function (target, name, value) {
	    if (name === "length") {
	      target[$mobx$$1].setArrayLength(value);
	      return true;
	    }

	    if (typeof name === "number") {
	      arrayExtensions.set.call(target, name, value);
	      return true;
	    }

	    if (!isNaN(name)) {
	      arrayExtensions.set.call(target, parseInt(name), value);
	      return true;
	    }

	    return false;
	  },
	  preventExtensions: function (target) {
	    fail$$1("Observable arrays cannot be frozen");
	    return false;
	  }
	};

	function createObservableArray$$1(initialValues, enhancer, name, owned) {
	  if (name === void 0) {
	    name = "ObservableArray@" + getNextId$$1();
	  }

	  if (owned === void 0) {
	    owned = false;
	  }

	  var adm = new ObservableArrayAdministration(name, enhancer, owned);
	  addHiddenFinalProp$$1(adm.values, $mobx$$1, adm);
	  var proxy = new Proxy(adm.values, arrayTraps);
	  adm.proxy = proxy;

	  if (initialValues && initialValues.length) {
	    var prev = allowStateChangesStart$$1(true);
	    adm.spliceWithArray(0, 0, initialValues);
	    allowStateChangesEnd$$1(prev);
	  }

	  return proxy;
	}

	var ObservableArrayAdministration =
	/** @class */
	function () {
	  function ObservableArrayAdministration(name, enhancer, owned) {
	    this.owned = owned;
	    this.values = [];
	    this.proxy = undefined;
	    this.lastKnownLength = 0;
	    this.atom = new Atom$$1(name || "ObservableArray@" + getNextId$$1());

	    this.enhancer = function (newV, oldV) {
	      return enhancer(newV, oldV, name + "[..]");
	    };
	  }

	  ObservableArrayAdministration.prototype.dehanceValue = function (value) {
	    if (this.dehancer !== undefined) return this.dehancer(value);
	    return value;
	  };

	  ObservableArrayAdministration.prototype.dehanceValues = function (values$$1) {
	    if (this.dehancer !== undefined && this.values.length > 0) return values$$1.map(this.dehancer);
	    return values$$1;
	  };

	  ObservableArrayAdministration.prototype.intercept = function (handler) {
	    return registerInterceptor$$1(this, handler);
	  };

	  ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
	    if (fireImmediately === void 0) {
	      fireImmediately = false;
	    }

	    if (fireImmediately) {
	      listener({
	        object: this.proxy,
	        type: "splice",
	        index: 0,
	        added: this.values.slice(),
	        addedCount: this.values.length,
	        removed: [],
	        removedCount: 0
	      });
	    }

	    return registerListener$$1(this, listener);
	  };

	  ObservableArrayAdministration.prototype.getArrayLength = function () {
	    this.atom.reportObserved();
	    return this.values.length;
	  };

	  ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
	    if (typeof newLength !== "number" || newLength < 0) throw new Error("[mobx.array] Out of range: " + newLength);
	    var currentLength = this.values.length;
	    if (newLength === currentLength) return;else if (newLength > currentLength) {
	      var newItems = new Array(newLength - currentLength);

	      for (var i = 0; i < newLength - currentLength; i++) newItems[i] = undefined; // No Array.fill everywhere...


	      this.spliceWithArray(currentLength, 0, newItems);
	    } else this.spliceWithArray(newLength, currentLength - newLength);
	  };

	  ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
	    if (oldLength !== this.lastKnownLength) throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
	    this.lastKnownLength += delta;
	  };

	  ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
	    var _this = this;

	    checkIfStateModificationsAreAllowed$$1(this.atom);
	    var length = this.values.length;
	    if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
	    if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
	    if (newItems === undefined) newItems = EMPTY_ARRAY$$1;

	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        object: this.proxy,
	        type: "splice",
	        index: index,
	        removedCount: deleteCount,
	        added: newItems
	      });
	      if (!change) return EMPTY_ARRAY$$1;
	      deleteCount = change.removedCount;
	      newItems = change.added;
	    }

	    newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
	      return _this.enhancer(v, undefined);
	    });

	    if (process.env.NODE_ENV !== "production") {
	      var lengthDelta = newItems.length - deleteCount;
	      this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
	    }

	    var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
	    if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice(index, newItems, res);
	    return this.dehanceValues(res);
	  };

	  ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
	    var _a;

	    if (newItems.length < MAX_SPLICE_SIZE) {
	      return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
	    } else {
	      var res = this.values.slice(index, index + deleteCount);
	      this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
	      return res;
	    }
	  };

	  ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
	    var notifySpy = !this.owned && isSpyEnabled$$1();
	    var notify = hasListeners$$1(this);
	    var change = notify || notifySpy ? {
	      object: this.proxy,
	      type: "update",
	      index: index,
	      newValue: newValue,
	      oldValue: oldValue
	    } : null; // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
	    // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled

	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	      name: this.atom.name
	    }));
	    this.atom.reportChanged();
	    if (notify) notifyListeners$$1(this, change);
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	  };

	  ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
	    var notifySpy = !this.owned && isSpyEnabled$$1();
	    var notify = hasListeners$$1(this);
	    var change = notify || notifySpy ? {
	      object: this.proxy,
	      type: "splice",
	      index: index,
	      removed: removed,
	      added: added,
	      removedCount: removed.length,
	      addedCount: added.length
	    } : null;
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	      name: this.atom.name
	    }));
	    this.atom.reportChanged(); // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe

	    if (notify) notifyListeners$$1(this, change);
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	  };

	  return ObservableArrayAdministration;
	}();

	var arrayExtensions = {
	  intercept: function (handler) {
	    return this[$mobx$$1].intercept(handler);
	  },
	  observe: function (listener, fireImmediately) {
	    if (fireImmediately === void 0) {
	      fireImmediately = false;
	    }

	    var adm = this[$mobx$$1];
	    return adm.observe(listener, fireImmediately);
	  },
	  clear: function () {
	    return this.splice(0);
	  },
	  replace: function (newItems) {
	    var adm = this[$mobx$$1];
	    return adm.spliceWithArray(0, adm.values.length, newItems);
	  },

	  /**
	   * Converts this array back to a (shallow) javascript structure.
	   * For a deep clone use mobx.toJS
	   */
	  toJS: function () {
	    return this.slice();
	  },
	  toJSON: function () {
	    // Used by JSON.stringify
	    return this.toJS();
	  },

	  /*
	   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
	   * since these functions alter the inner structure of the array, the have side effects.
	   * Because the have side effects, they should not be used in computed function,
	   * and for that reason the do not call dependencyState.notifyObserved
	   */
	  splice: function (index, deleteCount) {
	    var newItems = [];

	    for (var _i = 2; _i < arguments.length; _i++) {
	      newItems[_i - 2] = arguments[_i];
	    }

	    var adm = this[$mobx$$1];

	    switch (arguments.length) {
	      case 0:
	        return [];

	      case 1:
	        return adm.spliceWithArray(index);

	      case 2:
	        return adm.spliceWithArray(index, deleteCount);
	    }

	    return adm.spliceWithArray(index, deleteCount, newItems);
	  },
	  spliceWithArray: function (index, deleteCount, newItems) {
	    var adm = this[$mobx$$1];
	    return adm.spliceWithArray(index, deleteCount, newItems);
	  },
	  push: function () {
	    var items = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      items[_i] = arguments[_i];
	    }

	    var adm = this[$mobx$$1];
	    adm.spliceWithArray(adm.values.length, 0, items);
	    return adm.values.length;
	  },
	  pop: function () {
	    return this.splice(Math.max(this[$mobx$$1].values.length - 1, 0), 1)[0];
	  },
	  shift: function () {
	    return this.splice(0, 1)[0];
	  },
	  unshift: function () {
	    var items = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      items[_i] = arguments[_i];
	    }

	    var adm = this[$mobx$$1];
	    adm.spliceWithArray(0, 0, items);
	    return adm.values.length;
	  },
	  reverse: function () {
	    // reverse by default mutates in place before returning the result
	    // which makes it both a 'derivation' and a 'mutation'.
	    // so we deviate from the default and just make it an dervitation
	    if (process.env.NODE_ENV !== "production") {
	      console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
	    }

	    var clone = this.slice();
	    return clone.reverse.apply(clone, arguments);
	  },
	  sort: function (compareFn) {
	    // sort by default mutates in place before returning the result
	    // which goes against all good practices. Let's not change the array in place!
	    if (process.env.NODE_ENV !== "production") {
	      console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
	    }

	    var clone = this.slice();
	    return clone.sort.apply(clone, arguments);
	  },
	  remove: function (value) {
	    var adm = this[$mobx$$1];
	    var idx = adm.dehanceValues(adm.values).indexOf(value);

	    if (idx > -1) {
	      this.splice(idx, 1);
	      return true;
	    }

	    return false;
	  },
	  get: function (index) {
	    var adm = this[$mobx$$1];

	    if (adm) {
	      if (index < adm.values.length) {
	        adm.atom.reportObserved();
	        return adm.dehanceValue(adm.values[index]);
	      }

	      console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
	    }

	    return undefined;
	  },
	  set: function (index, newValue) {
	    var adm = this[$mobx$$1];
	    var values$$1 = adm.values;

	    if (index < values$$1.length) {
	      // update at index in range
	      checkIfStateModificationsAreAllowed$$1(adm.atom);
	      var oldValue = values$$1[index];

	      if (hasInterceptors$$1(adm)) {
	        var change = interceptChange$$1(adm, {
	          type: "update",
	          object: this,
	          index: index,
	          newValue: newValue
	        });
	        if (!change) return;
	        newValue = change.newValue;
	      }

	      newValue = adm.enhancer(newValue, oldValue);
	      var changed = newValue !== oldValue;

	      if (changed) {
	        values$$1[index] = newValue;
	        adm.notifyArrayChildUpdate(index, newValue, oldValue);
	      }
	    } else if (index === values$$1.length) {
	      // add a new item
	      adm.spliceWithArray(index, 0, [newValue]);
	    } else {
	      // out of bounds
	      throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values$$1.length);
	    }
	  }
	};
	["concat", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString"].forEach(function (funcName) {
	  arrayExtensions[funcName] = function () {
	    var adm = this[$mobx$$1];
	    adm.atom.reportObserved();
	    var res = adm.dehanceValues(adm.values);
	    return res[funcName].apply(res, arguments);
	  };
	});
	var isObservableArrayAdministration = createInstanceofPredicate$$1("ObservableArrayAdministration", ObservableArrayAdministration);

	function isObservableArray$$1(thing) {
	  return isObject$$1(thing) && isObservableArrayAdministration(thing[$mobx$$1]);
	}

	var _a;

	var ObservableMapMarker = {}; // just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
	// But: https://github.com/mobxjs/mobx/issues/1556

	var ObservableMap$$1 =
	/** @class */
	function () {
	  function ObservableMap$$1(initialData, enhancer, name) {
	    if (enhancer === void 0) {
	      enhancer = deepEnhancer$$1;
	    }

	    if (name === void 0) {
	      name = "ObservableMap@" + getNextId$$1();
	    }

	    this.enhancer = enhancer;
	    this.name = name;
	    this[_a] = ObservableMapMarker;
	    this._keysAtom = createAtom$$1(this.name + ".keys()");
	    this[Symbol.toStringTag] = "Map";

	    if (typeof Map !== "function") {
	      throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
	    }

	    this._data = new Map();
	    this._hasMap = new Map();
	    this.merge(initialData);
	  }

	  ObservableMap$$1.prototype._has = function (key) {
	    return this._data.has(key);
	  };

	  ObservableMap$$1.prototype.has = function (key) {
	    if (this._hasMap.has(key)) return this._hasMap.get(key).get();
	    return this._updateHasMapEntry(key, false).get();
	  };

	  ObservableMap$$1.prototype.set = function (key, value) {
	    var hasKey = this._has(key);

	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        type: hasKey ? "update" : "add",
	        object: this,
	        newValue: value,
	        name: key
	      });
	      if (!change) return this;
	      value = change.newValue;
	    }

	    if (hasKey) {
	      this._updateValue(key, value);
	    } else {
	      this._addValue(key, value);
	    }

	    return this;
	  };

	  ObservableMap$$1.prototype.delete = function (key) {
	    var _this = this;

	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        type: "delete",
	        object: this,
	        name: key
	      });
	      if (!change) return false;
	    }

	    if (this._has(key)) {
	      var notifySpy = isSpyEnabled$$1();
	      var notify = hasListeners$$1(this);
	      var change = notify || notifySpy ? {
	        type: "delete",
	        object: this,
	        oldValue: this._data.get(key).value,
	        name: key
	      } : null;
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	        name: this.name,
	        key: key
	      }));
	      transaction$$1(function () {
	        _this._keysAtom.reportChanged();

	        _this._updateHasMapEntry(key, false);

	        var observable$$1 = _this._data.get(key);

	        observable$$1.setNewValue(undefined);

	        _this._data.delete(key);
	      });
	      if (notify) notifyListeners$$1(this, change);
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	      return true;
	    }

	    return false;
	  };

	  ObservableMap$$1.prototype._updateHasMapEntry = function (key, value) {
	    // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
	    var entry = this._hasMap.get(key);

	    if (entry) {
	      entry.setNewValue(value);
	    } else {
	      entry = new ObservableValue$$1(value, referenceEnhancer$$1, this.name + "." + key + "?", false);

	      this._hasMap.set(key, entry);
	    }

	    return entry;
	  };

	  ObservableMap$$1.prototype._updateValue = function (key, newValue) {
	    var observable$$1 = this._data.get(key);

	    newValue = observable$$1.prepareNewValue(newValue);

	    if (newValue !== globalState$$1.UNCHANGED) {
	      var notifySpy = isSpyEnabled$$1();
	      var notify = hasListeners$$1(this);
	      var change = notify || notifySpy ? {
	        type: "update",
	        object: this,
	        oldValue: observable$$1.value,
	        name: key,
	        newValue: newValue
	      } : null;
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	        name: this.name,
	        key: key
	      }));
	      observable$$1.setNewValue(newValue);
	      if (notify) notifyListeners$$1(this, change);
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	    }
	  };

	  ObservableMap$$1.prototype._addValue = function (key, newValue) {
	    var _this = this;

	    checkIfStateModificationsAreAllowed$$1(this._keysAtom);
	    transaction$$1(function () {
	      var observable$$1 = new ObservableValue$$1(newValue, _this.enhancer, _this.name + "." + key, false);

	      _this._data.set(key, observable$$1);

	      newValue = observable$$1.value; // value might have been changed

	      _this._updateHasMapEntry(key, true);

	      _this._keysAtom.reportChanged();
	    });
	    var notifySpy = isSpyEnabled$$1();
	    var notify = hasListeners$$1(this);
	    var change = notify || notifySpy ? {
	      type: "add",
	      object: this,
	      name: key,
	      newValue: newValue
	    } : null;
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	      name: this.name,
	      key: key
	    }));
	    if (notify) notifyListeners$$1(this, change);
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	  };

	  ObservableMap$$1.prototype.get = function (key) {
	    if (this.has(key)) return this.dehanceValue(this._data.get(key).get());
	    return this.dehanceValue(undefined);
	  };

	  ObservableMap$$1.prototype.dehanceValue = function (value) {
	    if (this.dehancer !== undefined) {
	      return this.dehancer(value);
	    }

	    return value;
	  };

	  ObservableMap$$1.prototype.keys = function () {
	    this._keysAtom.reportObserved();

	    return this._data.keys();
	  };

	  ObservableMap$$1.prototype.values = function () {
	    var self = this;
	    var nextIndex = 0;
	    var keys$$1 = Array.from(this.keys());
	    return makeIterable({
	      next: function () {
	        return nextIndex < keys$$1.length ? {
	          value: self.get(keys$$1[nextIndex++]),
	          done: false
	        } : {
	          done: true
	        };
	      }
	    });
	  };

	  ObservableMap$$1.prototype.entries = function () {
	    var self = this;
	    var nextIndex = 0;
	    var keys$$1 = Array.from(this.keys());
	    return makeIterable({
	      next: function () {
	        if (nextIndex < keys$$1.length) {
	          var key = keys$$1[nextIndex++];
	          return {
	            value: [key, self.get(key)],
	            done: false
	          };
	        }

	        return {
	          done: true
	        };
	      }
	    });
	  };

	  ObservableMap$$1.prototype[(_a = $mobx$$1, Symbol.iterator)] = function () {
	    return this.entries();
	  };

	  ObservableMap$$1.prototype.forEach = function (callback, thisArg) {
	    var e_1, _a;

	    try {
	      for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
	        var _d = __read(_c.value, 2),
	            key = _d[0],
	            value = _d[1];

	        callback.call(thisArg, value, key, this);
	      }
	    } catch (e_1_1) {
	      e_1 = {
	        error: e_1_1
	      };
	    } finally {
	      try {
	        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	      } finally {
	        if (e_1) throw e_1.error;
	      }
	    }
	  };
	  /** Merge another object into this object, returns this. */


	  ObservableMap$$1.prototype.merge = function (other) {
	    var _this = this;

	    if (isObservableMap$$1(other)) {
	      other = other.toJS();
	    }

	    transaction$$1(function () {
	      if (isPlainObject$$1(other)) Object.keys(other).forEach(function (key) {
	        return _this.set(key, other[key]);
	      });else if (Array.isArray(other)) other.forEach(function (_a) {
	        var _b = __read(_a, 2),
	            key = _b[0],
	            value = _b[1];

	        return _this.set(key, value);
	      });else if (isES6Map$$1(other)) other.forEach(function (value, key) {
	        return _this.set(key, value);
	      });else if (other !== null && other !== undefined) fail$$1("Cannot initialize map from " + other);
	    });
	    return this;
	  };

	  ObservableMap$$1.prototype.clear = function () {
	    var _this = this;

	    transaction$$1(function () {
	      untracked$$1(function () {
	        var e_2, _a;

	        try {
	          for (var _b = __values(_this.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;

	            _this.delete(key);
	          }
	        } catch (e_2_1) {
	          e_2 = {
	            error: e_2_1
	          };
	        } finally {
	          try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	          } finally {
	            if (e_2) throw e_2.error;
	          }
	        }
	      });
	    });
	  };

	  ObservableMap$$1.prototype.replace = function (values$$1) {
	    var _this = this;

	    transaction$$1(function () {
	      // grab all the keys that are present in the new map but not present in the current map
	      // and delete them from the map, then merge the new map
	      // this will cause reactions only on changed values
	      var newKeys = getMapLikeKeys$$1(values$$1);
	      var oldKeys = Array.from(_this.keys());
	      var missingKeys = oldKeys.filter(function (k) {
	        return newKeys.indexOf(k) === -1;
	      });
	      missingKeys.forEach(function (k) {
	        return _this.delete(k);
	      });

	      _this.merge(values$$1);
	    });
	    return this;
	  };

	  Object.defineProperty(ObservableMap$$1.prototype, "size", {
	    get: function () {
	      this._keysAtom.reportObserved();

	      return this._data.size;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  /**
	   * Returns a plain object that represents this map.
	   * Note that all the keys being stringified.
	   * If there are duplicating keys after converting them to strings, behaviour is undetermined.
	   */

	  ObservableMap$$1.prototype.toPOJO = function () {
	    var e_3, _a;

	    var res = {};

	    try {
	      for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
	        var _d = __read(_c.value, 2),
	            key = _d[0],
	            value = _d[1];

	        res["" + key] = value;
	      }
	    } catch (e_3_1) {
	      e_3 = {
	        error: e_3_1
	      };
	    } finally {
	      try {
	        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	      } finally {
	        if (e_3) throw e_3.error;
	      }
	    }

	    return res;
	  };
	  /**
	   * Returns a shallow non observable object clone of this map.
	   * Note that the values migth still be observable. For a deep clone use mobx.toJS.
	   */


	  ObservableMap$$1.prototype.toJS = function () {
	    return new Map(this);
	  };

	  ObservableMap$$1.prototype.toJSON = function () {
	    // Used by JSON.stringify
	    return this.toPOJO();
	  };

	  ObservableMap$$1.prototype.toString = function () {
	    var _this = this;

	    return this.name + "[{ " + Array.from(this.keys()).map(function (key) {
	      return key + ": " + ("" + _this.get(key));
	    }).join(", ") + " }]";
	  };
	  /**
	   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
	   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
	   * for callback details
	   */


	  ObservableMap$$1.prototype.observe = function (listener, fireImmediately) {
	    process.env.NODE_ENV !== "production" && invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
	    return registerListener$$1(this, listener);
	  };

	  ObservableMap$$1.prototype.intercept = function (handler) {
	    return registerInterceptor$$1(this, handler);
	  };

	  return ObservableMap$$1;
	}();
	/* 'var' fixes small-build issue */


	var isObservableMap$$1 = createInstanceofPredicate$$1("ObservableMap", ObservableMap$$1);

	var ObservableObjectAdministration$$1 =
	/** @class */
	function () {
	  function ObservableObjectAdministration$$1(target, values$$1, name, defaultEnhancer) {
	    if (values$$1 === void 0) {
	      values$$1 = new Map();
	    }

	    this.target = target;
	    this.values = values$$1;
	    this.name = name;
	    this.defaultEnhancer = defaultEnhancer;
	    this.keysAtom = new Atom$$1(name + ".keys");
	  }

	  ObservableObjectAdministration$$1.prototype.read = function (key) {
	    return this.values.get(key).get();
	  };

	  ObservableObjectAdministration$$1.prototype.write = function (key, newValue) {
	    var instance = this.target;
	    var observable$$1 = this.values.get(key);

	    if (observable$$1 instanceof ComputedValue$$1) {
	      observable$$1.set(newValue);
	      return;
	    } // intercept


	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        type: "update",
	        object: this.proxy || instance,
	        name: key,
	        newValue: newValue
	      });
	      if (!change) return;
	      newValue = change.newValue;
	    }

	    newValue = observable$$1.prepareNewValue(newValue); // notify spy & observers

	    if (newValue !== globalState$$1.UNCHANGED) {
	      var notify = hasListeners$$1(this);
	      var notifySpy = isSpyEnabled$$1();
	      var change = notify || notifySpy ? {
	        type: "update",
	        object: this.proxy || instance,
	        oldValue: observable$$1.value,
	        name: key,
	        newValue: newValue
	      } : null;
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	        name: this.name,
	        key: key
	      }));
	      observable$$1.setNewValue(newValue);
	      if (notify) notifyListeners$$1(this, change);
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	    }
	  };

	  ObservableObjectAdministration$$1.prototype.has = function (key) {
	    var map = this.pendingKeys || (this.pendingKeys = new Map());
	    var entry = map.get(key);
	    if (entry) return entry.get();else {
	      var exists = !!this.values.get(key); // Possible optimization: Don't have a separate map for non existing keys,
	      // but store them in the values map instead, using a special symbol to denote "not existing"

	      entry = new ObservableValue$$1(exists, referenceEnhancer$$1, this.name + "." + key.toString() + "?", false);
	      map.set(key, entry);
	      return entry.get(); // read to subscribe
	    }
	  };

	  ObservableObjectAdministration$$1.prototype.addObservableProp = function (propName, newValue, enhancer) {
	    if (enhancer === void 0) {
	      enhancer = this.defaultEnhancer;
	    }

	    var target = this.target;
	    assertPropertyConfigurable$$1(target, propName);

	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        object: this.proxy || target,
	        name: propName,
	        type: "add",
	        newValue: newValue
	      });
	      if (!change) return;
	      newValue = change.newValue;
	    }

	    var observable$$1 = new ObservableValue$$1(newValue, enhancer, this.name + "." + propName, false);
	    this.values.set(propName, observable$$1);
	    newValue = observable$$1.value; // observableValue might have changed it

	    Object.defineProperty(target, propName, generateObservablePropConfig$$1(propName));
	    this.notifyPropertyAddition(propName, newValue);
	  };

	  ObservableObjectAdministration$$1.prototype.addComputedProp = function (propertyOwner, // where is the property declared?
	  propName, options) {
	    var target = this.target;
	    options.name = options.name || this.name + "." + propName;
	    this.values.set(propName, new ComputedValue$$1(options));
	    if (propertyOwner === target || isPropertyConfigurable$$1(propertyOwner, propName)) Object.defineProperty(propertyOwner, propName, generateComputedPropConfig$$1(propName));
	  };

	  ObservableObjectAdministration$$1.prototype.remove = function (key) {
	    if (!this.values.has(key)) return;
	    var target = this.target;

	    if (hasInterceptors$$1(this)) {
	      var change = interceptChange$$1(this, {
	        object: this.proxy || target,
	        name: key,
	        type: "remove"
	      });
	      if (!change) return;
	    }

	    try {
	      startBatch$$1();
	      var notify = hasListeners$$1(this);
	      var notifySpy = isSpyEnabled$$1();
	      var oldObservable = this.values.get(key);
	      var oldValue = oldObservable && oldObservable.get();
	      oldObservable && oldObservable.set(undefined); // notify key and keyset listeners

	      this.keysAtom.reportChanged();
	      this.values.delete(key);

	      if (this.pendingKeys) {
	        var entry = this.pendingKeys.get(key);
	        if (entry) entry.set(false);
	      } // delete the prop


	      delete this.target[key];
	      var change = notify || notifySpy ? {
	        type: "remove",
	        object: this.proxy || target,
	        oldValue: oldValue,
	        name: key
	      } : null;
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	        name: this.name,
	        key: key
	      }));
	      if (notify) notifyListeners$$1(this, change);
	      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();
	    } finally {
	      endBatch$$1();
	    }
	  };

	  ObservableObjectAdministration$$1.prototype.illegalAccess = function (owner, propName) {
	    /**
	     * This happens if a property is accessed through the prototype chain, but the property was
	     * declared directly as own property on the prototype.
	     *
	     * E.g.:
	     * class A {
	     * }
	     * extendObservable(A.prototype, { x: 1 })
	     *
	     * classB extens A {
	     * }
	     * console.log(new B().x)
	     *
	     * It is unclear whether the property should be considered 'static' or inherited.
	     * Either use `console.log(A.x)`
	     * or: decorate(A, { x: observable })
	     *
	     * When using decorate, the property will always be redeclared as own property on the actual instance
	     */
	    console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
	  };
	  /**
	   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
	   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
	   * for callback details
	   */


	  ObservableObjectAdministration$$1.prototype.observe = function (callback, fireImmediately) {
	    process.env.NODE_ENV !== "production" && invariant$$1(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
	    return registerListener$$1(this, callback);
	  };

	  ObservableObjectAdministration$$1.prototype.intercept = function (handler) {
	    return registerInterceptor$$1(this, handler);
	  };

	  ObservableObjectAdministration$$1.prototype.notifyPropertyAddition = function (key, newValue) {
	    var notify = hasListeners$$1(this);
	    var notifySpy = isSpyEnabled$$1();
	    var change = notify || notifySpy ? {
	      type: "add",
	      object: this.proxy || this.target,
	      name: key,
	      newValue: newValue
	    } : null;
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart$$1(__assign({}, change, {
	      name: this.name,
	      key: key
	    }));
	    if (notify) notifyListeners$$1(this, change);
	    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd$$1();

	    if (this.pendingKeys) {
	      var entry = this.pendingKeys.get(key);
	      if (entry) entry.set(true);
	    }

	    this.keysAtom.reportChanged();
	  };

	  ObservableObjectAdministration$$1.prototype.getKeys = function () {
	    var e_1, _a;

	    this.keysAtom.reportObserved(); // return Reflect.ownKeys(this.values) as any

	    var res = [];

	    try {
	      for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
	        var _d = __read(_c.value, 2),
	            key = _d[0],
	            value = _d[1];

	        if (value instanceof ObservableValue$$1) res.push(key);
	      }
	    } catch (e_1_1) {
	      e_1 = {
	        error: e_1_1
	      };
	    } finally {
	      try {
	        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	      } finally {
	        if (e_1) throw e_1.error;
	      }
	    }

	    return res;
	  };

	  return ObservableObjectAdministration$$1;
	}();

	function asObservableObject$$1(target, name, defaultEnhancer) {
	  if (name === void 0) {
	    name = "";
	  }

	  if (defaultEnhancer === void 0) {
	    defaultEnhancer = deepEnhancer$$1;
	  }

	  if (Object.prototype.hasOwnProperty.call(target, $mobx$$1)) return target[$mobx$$1];
	  process.env.NODE_ENV !== "production" && invariant$$1(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
	  if (!isPlainObject$$1(target)) name = (target.constructor.name || "ObservableObject") + "@" + getNextId$$1();
	  if (!name) name = "ObservableObject@" + getNextId$$1();
	  var adm = new ObservableObjectAdministration$$1(target, new Map(), name, defaultEnhancer);
	  addHiddenProp$$1(target, $mobx$$1, adm);
	  return adm;
	}

	var observablePropertyConfigs = Object.create(null);
	var computedPropertyConfigs = Object.create(null);

	function generateObservablePropConfig$$1(propName) {
	  return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
	    configurable: true,
	    enumerable: true,
	    get: function () {
	      return this[$mobx$$1].read(propName);
	    },
	    set: function (v) {
	      this[$mobx$$1].write(propName, v);
	    }
	  });
	}

	function getAdministrationForComputedPropOwner(owner) {
	  var adm = owner[$mobx$$1];

	  if (!adm) {
	    // because computed props are declared on proty,
	    // the current instance might not have been initialized yet
	    initializeInstance$$1(owner);
	    return owner[$mobx$$1];
	  }

	  return adm;
	}

	function generateComputedPropConfig$$1(propName) {
	  return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
	    configurable: true,
	    enumerable: false,
	    get: function () {
	      return getAdministrationForComputedPropOwner(this).read(propName);
	    },
	    set: function (v) {
	      getAdministrationForComputedPropOwner(this).write(propName, v);
	    }
	  });
	}

	var isObservableObjectAdministration = createInstanceofPredicate$$1("ObservableObjectAdministration", ObservableObjectAdministration$$1);

	function isObservableObject$$1(thing) {
	  if (isObject$$1(thing)) {
	    // Initializers run lazily when transpiling to babel, so make sure they are run...
	    initializeInstance$$1(thing);
	    return isObservableObjectAdministration(thing[$mobx$$1]);
	  }

	  return false;
	}

	function getAtom$$1(thing, property) {
	  if (typeof thing === "object" && thing !== null) {
	    if (isObservableArray$$1(thing)) {
	      if (property !== undefined) fail$$1(process.env.NODE_ENV !== "production" && "It is not possible to get index atoms from arrays");
	      return thing[$mobx$$1].atom;
	    }

	    if (isObservableMap$$1(thing)) {
	      var anyThing = thing;
	      if (property === undefined) return anyThing._keysAtom;

	      var observable$$1 = anyThing._data.get(property) || anyThing._hasMap.get(property);

	      if (!observable$$1) fail$$1(process.env.NODE_ENV !== "production" && "the entry '" + property + "' does not exist in the observable map '" + getDebugName$$1(thing) + "'");
	      return observable$$1;
	    } // Initializers run lazily when transpiling to babel, so make sure they are run...


	    initializeInstance$$1(thing);
	    if (property && !thing[$mobx$$1]) thing[property]; // See #1072

	    if (isObservableObject$$1(thing)) {
	      if (!property) return fail$$1(process.env.NODE_ENV !== "production" && "please specify a property");
	      var observable$$1 = thing[$mobx$$1].values.get(property);
	      if (!observable$$1) fail$$1(process.env.NODE_ENV !== "production" && "no observable property '" + property + "' found on the observable object '" + getDebugName$$1(thing) + "'");
	      return observable$$1;
	    }

	    if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing)) {
	      return thing;
	    }
	  } else if (typeof thing === "function") {
	    if (isReaction$$1(thing[$mobx$$1])) {
	      // disposer function
	      return thing[$mobx$$1];
	    }
	  }

	  return fail$$1(process.env.NODE_ENV !== "production" && "Cannot obtain atom from " + thing);
	}

	function getAdministration$$1(thing, property) {
	  if (!thing) fail$$1("Expecting some object");
	  if (property !== undefined) return getAdministration$$1(getAtom$$1(thing, property));
	  if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing)) return thing;
	  if (isObservableMap$$1(thing)) return thing; // Initializers run lazily when transpiling to babel, so make sure they are run...

	  initializeInstance$$1(thing);
	  if (thing[$mobx$$1]) return thing[$mobx$$1];
	  fail$$1(process.env.NODE_ENV !== "production" && "Cannot obtain administration from " + thing);
	}

	function getDebugName$$1(thing, property) {
	  var named;
	  if (property !== undefined) named = getAtom$$1(thing, property);else if (isObservableObject$$1(thing) || isObservableMap$$1(thing)) named = getAdministration$$1(thing);else named = getAtom$$1(thing); // valid for arrays as well

	  return named.name;
	}

	var toString = Object.prototype.toString;

	function deepEqual$$1(a, b) {
	  return eq(a, b);
	} // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
	// Internal recursive comparison function for `isEqual`.


	function eq(a, b, aStack, bStack) {
	  // Identical objects are equal. `0 === -0`, but they aren't identical.
	  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

	  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

	  if (a !== a) return b !== b; // Exhaust primitive checks

	  var type = typeof a;
	  if (type !== "function" && type !== "object" && typeof b != "object") return false;
	  return deepEq(a, b, aStack, bStack);
	} // Internal recursive comparison function for `isEqual`.


	function deepEq(a, b, aStack, bStack) {
	  // Unwrap any wrapped objects.
	  a = unwrap(a);
	  b = unwrap(b); // Compare `[[Class]]` names.

	  var className = toString.call(a);
	  if (className !== toString.call(b)) return false;

	  switch (className) {
	    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	    case "[object RegExp]": // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

	    case "[object String]":
	      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	      // equivalent to `new String("5")`.
	      return "" + a === "" + b;

	    case "[object Number]":
	      // `NaN`s are equivalent, but non-reflexive.
	      // Object(NaN) is equivalent to NaN.
	      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

	      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

	    case "[object Date]":
	    case "[object Boolean]":
	      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	      // millisecond representations. Note that invalid dates with millisecond representations
	      // of `NaN` are not equivalent.
	      return +a === +b;

	    case "[object Symbol]":
	      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);
	  }

	  var areArrays = className === "[object Array]";

	  if (!areArrays) {
	    if (typeof a != "object" || typeof b != "object") return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	    // from different frames are.

	    var aCtor = a.constructor,
	        bCtor = b.constructor;

	    if (aCtor !== bCtor && !(typeof aCtor === "function" && aCtor instanceof aCtor && typeof bCtor === "function" && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
	      return false;
	    }
	  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
	  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	  // Initializing stack of traversed objects.
	  // It's done here since we only need them for objects and arrays comparison.


	  aStack = aStack || [];
	  bStack = bStack || [];
	  var length = aStack.length;

	  while (length--) {
	    // Linear search. Performance is inversely proportional to the number of
	    // unique nested structures.
	    if (aStack[length] === a) return bStack[length] === b;
	  } // Add the first object to the stack of traversed objects.


	  aStack.push(a);
	  bStack.push(b); // Recursively compare objects and arrays.

	  if (areArrays) {
	    // Compare array lengths to determine if a deep comparison is necessary.
	    length = a.length;
	    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

	    while (length--) {
	      if (!eq(a[length], b[length], aStack, bStack)) return false;
	    }
	  } else {
	    // Deep compare objects.
	    var keys$$1 = Object.keys(a),
	        key;
	    length = keys$$1.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

	    if (Object.keys(b).length !== length) return false;

	    while (length--) {
	      // Deep compare each member
	      key = keys$$1[length];
	      if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	    }
	  } // Remove the first object from the stack of traversed objects.


	  aStack.pop();
	  bStack.pop();
	  return true;
	}

	function unwrap(a) {
	  if (isObservableArray$$1(a)) return a.slice();
	  if (isES6Map$$1(a) || isObservableMap$$1(a)) return Array.from(a.entries());
	  return a;
	}

	function has$1(a, key) {
	  return Object.prototype.hasOwnProperty.call(a, key);
	}

	function makeIterable(iterator) {
	  iterator[Symbol.iterator] = self$1;
	  return iterator;
	}

	function self$1() {
	  return this;
	}
	/*
	The only reason for this file to exist is pure horror:
	Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
	it will cause undefined errors (for example because super classes or local variables not being hosted).
	With this file that will still happen,
	but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
	*/

	/**
	 * (c) Michel Weststrate 2015 - 2018
	 * MIT Licensed
	 *
	 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
	 * this is a good place to start:
	 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
	 *
	 * Source folders:
	 * ===============
	 *
	 * - api/     Most of the public static methods exposed by the module can be found here.
	 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
	 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
	 * - utils/   Utility stuff.
	 *
	 */


	if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
	  throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
	}

	try {
	  // define process.env if needed
	  // if this is not a production build in the first place
	  // (in which case the expression below would be substituted with 'production')
	  process.env.NODE_ENV;
	} catch (e) {
	  var g = typeof window !== "undefined" ? window : global;
	  if (typeof process === "undefined") g.process = {};
	  g.process.env = {};
	}

	(function () {
	  function testCodeMinification() {}

	  if (testCodeMinification.name !== "testCodeMinification" && process.env.NODE_ENV !== "production") {
	    console.warn( // Template literal(backtick) is used for fix issue with rollup-plugin-commonjs https://github.com/rollup/rollup-plugin-commonjs/issues/344
	    "[mobx] you are running a minified build, but 'process.env.NODE_ENV' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
	  }
	})(); // Devtools support


	if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
	  // See: https://github.com/andykog/mobx-devtools/
	  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
	    spy: spy$$1,
	    extras: {
	      getDebugName: getDebugName$$1
	    },
	    $mobx: $mobx$$1
	  });
	}

	var mobx_module = /*#__PURE__*/Object.freeze({
		Reaction: Reaction$$1,
		untracked: untracked$$1,
		get IDerivationState () { return IDerivationState; },
		createAtom: createAtom$$1,
		spy: spy$$1,
		comparer: comparer$$1,
		isObservableObject: isObservableObject$$1,
		isBoxedObservable: isObservableValue$$1,
		isObservableArray: isObservableArray$$1,
		ObservableMap: ObservableMap$$1,
		isObservableMap: isObservableMap$$1,
		transaction: transaction$$1,
		observable: observable$$1,
		computed: computed$$1,
		isObservable: isObservable$$1,
		isObservableProp: isObservableProp$$1,
		isComputed: isComputed$$1,
		isComputedProp: isComputedProp$$1,
		extendObservable: extendObservable$$1,
		observe: observe$$1,
		intercept: intercept$$1,
		autorun: autorun$$1,
		reaction: reaction$$1,
		when: when$$1,
		action: action$$1,
		isAction: isAction$$1,
		runInAction: runInAction$$1,
		keys: keys$$1,
		values: values$$1,
		entries: entries$$1,
		set: set$$1,
		remove: remove$$1,
		has: has$$1,
		get: get$$1,
		decorate: decorate$$1,
		configure: configure$$1,
		onBecomeObserved: onBecomeObserved$$1,
		onBecomeUnobserved: onBecomeUnobserved$$1,
		flow: flow$$1,
		toJS: toJS$$1,
		trace: trace$$1,
		getDependencyTree: getDependencyTree$$1,
		getObserverTree: getObserverTree$$1,
		_resetGlobalState: resetGlobalState$$1,
		_getGlobalState: getGlobalState$$1,
		getDebugName: getDebugName$$1,
		getAtom: getAtom$$1,
		_getAdministration: getAdministration$$1,
		_allowStateChanges: allowStateChanges$$1,
		_allowStateChangesInsideComputed: allowStateChangesInsideComputed$$1,
		isArrayLike: isArrayLike$$1,
		$mobx: $mobx$$1,
		_isComputingDerivation: isComputingDerivation$$1,
		onReactionError: onReactionError$$1,
		_interceptReads: interceptReads$$1
	});

	var ObjectUtil = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isObject = isObject;
	exports.mergeDeep = mergeDeep;
	exports.get = get;
	exports.set = set;
	/**
	 * @param {Object} item -Object to test.
	 * @returns {boolean} True if the item is an Object.
	 */

	function isObject(item) {
	  return item && typeof item === 'object' && !Array.isArray(item);
	}
	/**
	 * Merges the source objects into the target object.
	 *
	 * @param {Object} target - Target object.
	 * @param  {...any} sources - Source objects.
	 * @returns {Object} Target object with merges.
	 */


	function mergeDeep(target) {
	  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    sources[_key - 1] = arguments[_key];
	  }

	  if (!sources.length) return target;
	  const source = sources.shift(); // istanbul ignore else - nothing to do on the else

	  if (isObject(target) && isObject(source)) {
	    for (const key in source) {
	      if (isObject(source[key])) {
	        if (!target[key]) Object.assign(target, {
	          [key]: {}
	        });
	        mergeDeep(target[key], source[key]);
	      } else {
	        Object.assign(target, {
	          [key]: source[key]
	        });
	      }
	    }
	  }

	  return mergeDeep(target, ...sources);
	}
	/**
	 * Returns the value of the given path within the given object.
	 *
	 * @param {Object} object - Object to search.
	 * @param {string} path - Path to find.
	 * @param {any} defaultValue - Value to use if not found.
	 * @returns {any} The value of the found item, or default value, or undefined.
	 */


	function get(object, path, defaultValue) {
	  if (!object || !path) return defaultValue;
	  let paths = path.split('.');
	  let obj = object;

	  for (let i = 0; i < paths.length - 1; i++) {
	    obj = obj[paths[i]];
	    if (!obj) break;
	  }

	  if (obj === undefined) return defaultValue;
	  let val = obj[paths[paths.length - 1]];
	  if (val === undefined) return defaultValue;
	  return val;
	}
	/**
	 * Sets a value within an object hierarchy.
	 *
	 * @param {Object} object - Source object.
	 * @param {string} path - Path within the object.
	 * @param {any} value - Value to set.
	 *
	 * @returns {void}
	 */


	function set(object, path, value) {
	  if (!object || !path) return;
	  let paths = path.split('.');
	  let obj = object;

	  for (let i = 0; i < paths.length - 1; i++) {
	    let o = obj[paths[i]];

	    if (o === undefined) {
	      obj[paths[i]] = {};
	      o = obj[paths[i]];
	    }

	    obj = o;
	  }

	  obj[paths[paths.length - 1]] = value;
	}
	});

	unwrapExports(ObjectUtil);
	var ObjectUtil_1 = ObjectUtil.isObject;
	var ObjectUtil_2 = ObjectUtil.mergeDeep;
	var ObjectUtil_3 = ObjectUtil.get;
	var ObjectUtil_4 = ObjectUtil.set;

	var Page_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _Controllable = _interopRequireDefault(Controllable_1);







	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-Page';
	/**
	 * @typedef {object} PageOptions
	 * @property {string} name - page name
	 * @property {Controllable} parent? - parent page or application
	 */

	/**
	 * A Page manages the state of a screen or part of a screen.  A page may be a hierarchical collection of sub pages.
	 * @fires page-changed - when we route to a new page
	 */

	class Page extends _Controllable.default {
	  /**
	   *
	   * @param {PageOptions} options - Options for this page.
	   */
	  constructor(options) {
	    super(options);
	    /**
	     * Convenience accessor for the logging system.  If you have access to the Page or Application you can always get a logger.
	     *
	     * @member {Log}
	     */

	    this.log = _Log.default;

	    if (options) {
	      this.name = options.name ? options.name : 'Name Not Set';
	      this.parent = options.parent;

	      if (options.logLevel !== undefined) {
	        this.log.level = options.logLevel;
	      }
	    }

	    this.labels = {};
	    this.pages = [];
	    /**
	     * @type {object}
	     * @property {Page} currentPage - Current Page if the page/app is managing multiple pages.
	     * @property {string} currentPage - Current path for this page.
	     */

	    this.state = (0, mobx_module.observable)({
	      currentPage: null,
	      currentPath: null
	    });
	    /**
	     * The datasources managed by this page, where each key in the datasource name/id and the value is the datasource instance.
	     *
	     * @member {Map<string, Datasource>}
	     */

	    this.datasources = {};
	    this.initialized = false;
	  }
	  /**
	   * Registers a datasource for use within this page.
	   *
	   * @param {Datasource} datasource - Datasource to register for the page.
	   */


	  registerDatasource(datasource) {
	    if (!datasource.name) {
	      throw new Error('Datasource should have a name');
	    }

	    if (this.datasources[datasource.name]) {
	      throw new Error(`Datasource ${datasource.name} is already registered in ${this.name}`);
	    }

	    if (datasource.parent !== undefined) {
	      _Log.default.w(TAG, 'Datasource %s is being assigned a new parent %s.  Datasources should not set a parent explicitly.', datasource.name, datasource.parent.name);
	    } // because a datasource is controllable, we need to ensure that we are the parent, so that any events can travel up our
	    // event heirarchy tree


	    datasource.parent = this;
	    this.datasources[datasource.name] = datasource;
	    this.registerDatasourceLifecycleWithPage(datasource);
	    datasource.initialize();
	  }
	  /**
	   * Registers this datasource's lifecycle events with the controllers of this page.
	   * It will send this datasource to all parent pages as well.
	   * 
	   * @param {Datasource} datasource - Datasource to which to bind to lifecycle events.
	   */


	  registerDatasourceLifecycleWithPage(datasource) {
	    // allow our controllers to response to datasource events.
	    this.controllers.forEach(c => {
	      datasource.registerLifecycleEvents(c);
	    });

	    if (this.parent) {
	      this.parent.registerDatasourceLifecycleWithPage(datasource);
	    }
	  }
	  /**
	   * Register Application Lifecycle events with this controller, if the controller supports those lifecycle events.
	   *
	   * @param {Controllable} controller - Controller to register.
	   * @override
	   */


	  registerLifecycleEvents(controller) {
	    // if the controller has an applicationInitialized method, then bind it to the initialize event
	    // if the controller has an pageInitialized method, then bind it to the initialize event
	    if (controller.pageInitialized) {
	      // note page initialize is only ever called once
	      this.once('page-initialized', controller.pageInitialized.bind(controller));
	    }
	  }
	  /**
	   * Should be called when the page is initialized.  It will fire the page-initialized event.
	   *
	   * @fires page-initialized with this page instance and the application instance
	   */


	  initialize() {
	    //We need to set a boolean here so we don't initialize a page more than once
	    this.initialized = true; // we are not doing much, except telling others that we are initialized.  We pass a reference to ourself.

	    this.emit('page-initialized', this, this.getApplication());
	  }
	  /**
	   * Gets called when this page is returned to after previously being initialized.
	   *
	   * @fires page-resumed with this page instance and the application instance
	   */


	  resume() {
	    this.emit('page-resumed', this, this, this.getApplication());
	  }
	  /**
	   * Get the Application instance to which this page belongs.
	   *
	   * @returns {Application} - The application.
	   */


	  getApplication() {
	    if (this.constructor.name === 'Application') return this;
	    if (this.parent) return this.parent.getApplication(); // istanbul ignore next

	    _Log.default.w(TAG, 'Apparently there is no Application, which should never be the case');

	    return null;
	  }
	  /**
	   * Merge this state object into the current state.
	   *
	   * @param {Object} state - State object to merge.
	   */


	  setState(state) {
	    // istanbul ignore else
	    if (state) (0, ObjectUtil.mergeDeep)(this.state, state);
	  }
	  /**
	   * If this page is a container of other child pages, then this sets the current page to one of it's children.
	   * It will optionally fire the 'page-changed' event if notify is set to true.
	   *
	   * @param {string} name - Name of new page.
	   * @param {boolean} notify - True if 'page-changed' event should fire.
	   * @returns {Page} - The new page, or null if it is invalid.
	   */


	  setCurrentPage(name) {
	    let notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    if (this.state.currentPage && this.state.currentPage.name === name) return;
	    let page = this.findPage(name);

	    if (!page) {
	      _Log.default.w(TAG, "Invalid Page '%s'", name);

	      return null;
	    }

	    let oldPage = this.state.currentPage;
	    this.state.currentPage = page; // istanbul ignore else

	    if (notify) this.emit('page-changed', page, oldPage);
	    return page;
	  }
	  /**
	   * Finds a child page based on the name.
	   *
	   * @param {string} name - Name of child page.
	   * @returns {Page} The child page, or null if it doesn't exist.
	   */


	  findPage(name) {
	    let pages = this.pages.filter(v => v.name === name);

	    if (pages.length) {
	      return pages[0];
	    }

	    return null;
	  }
	  /**
	   * Gets a datasource in this page, by name.
	   *
	   * @param {string} name - Name of datasource.
	   * @returns {Datasource} - Found datasource.
	   */


	  getDatasource(name) {
	    let datasource = this.datasources[name];

	    if (datasource) {
	      _Log.default.i(TAG, 'Found Datasource %s in page %s', name, this.name);

	      return datasource;
	    }

	    return datasource;
	  }
	  /**
	   * Finds a datasource by name, by searching this page and all sub pages.
	   *
	   * @param {string} name - Datasource name to find.
	   * @returns {Datasource} - Found datasource.
	   */


	  findDatasource(name) {
	    let datasource = this.getDatasource(name);
	    if (datasource) return datasource;

	    for (let i = 0; i < this.pages.length; i++) {
	      datasource = this.pages[i].findDatasource(name);
	      if (datasource) break;
	    }

	    return datasource;
	  }
	  /**
	   * Add a new page to this parent.
	   *
	   * @param {Page} page - Page to add.
	   */


	  registerPage(page) {
	    page.parent = this;
	    this.pages.push(page);
	  }
	  /**
	   * Check if a specific page has been registered.
	   *
	   * @param {Page} page - Page to check for.
	   * @returns {boolean} - True if the page has been registered.
	   */


	  hasPage(page) {
	    return this.pages.includes(page);
	  }
	  /**
	   * Check if a specific datasource has been registered.
	   *
	   * @param {Datasource} ds - Datasource to check for.
	   * @returns {boolean} - True if the datasource has been registered.
	   */


	  hasDatasource(ds) {
	    return Object.keys(this.datasources).includes(ds.name);
	  }
	  /**
	   * Return the number of child pages of this parent.
	   *
	   * @returns {number} - Number of child pages.
	   */


	  get pageCount() {
	    return this.pages.length;
	  }

	}

	var _default = Page;
	exports.default = _default;
	});

	unwrapExports(Page_1);

	var uaParser = createCommonjsModule(function (module, exports) {
	/*!
	 * UAParser.js v0.7.19
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 or MIT
	 */
	(function (window, undefined$1) {
	  // Constants
	  /////////////

	  var LIBVERSION = '0.7.19',
	      EMPTY = '',
	      UNKNOWN = '?',
	      FUNC_TYPE = 'function',
	      UNDEF_TYPE = 'undefined',
	      OBJ_TYPE = 'object',
	      STR_TYPE = 'string',
	      MAJOR = 'major',
	      // deprecated
	  MODEL = 'model',
	      NAME = 'name',
	      TYPE = 'type',
	      VENDOR = 'vendor',
	      VERSION = 'version',
	      ARCHITECTURE = 'architecture',
	      CONSOLE = 'console',
	      MOBILE = 'mobile',
	      TABLET = 'tablet',
	      SMARTTV = 'smarttv',
	      WEARABLE = 'wearable',
	      EMBEDDED = 'embedded'; ///////////
	  // Helper
	  //////////

	  var util = {
	    extend: function (regexes, extensions) {
	      var margedRegexes = {};

	      for (var i in regexes) {
	        if (extensions[i] && extensions[i].length % 2 === 0) {
	          margedRegexes[i] = extensions[i].concat(regexes[i]);
	        } else {
	          margedRegexes[i] = regexes[i];
	        }
	      }

	      return margedRegexes;
	    },
	    has: function (str1, str2) {
	      if (typeof str1 === "string") {
	        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	      } else {
	        return false;
	      }
	    },
	    lowerize: function (str) {
	      return str.toLowerCase();
	    },
	    major: function (version) {
	      return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, '').split(".")[0] : undefined$1;
	    },
	    trim: function (str) {
	      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	    }
	  }; ///////////////
	  // Map helper
	  //////////////

	  var mapper = {
	    rgx: function (ua, arrays) {
	      //var result = {},
	      var i = 0,
	          j,
	          k,
	          p,
	          q,
	          matches,
	          match; //, args = arguments;

	      /*// construct object barebones
	      for (p = 0; p < args[1].length; p++) {
	          q = args[1][p];
	          result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
	      }*/
	      // loop through all regexes maps

	      while (i < arrays.length && !matches) {
	        var regex = arrays[i],
	            // even sequence (0,2,4,..)
	        props = arrays[i + 1]; // odd sequence (1,3,5,..)

	        j = k = 0; // try matching uastring with regexes

	        while (j < regex.length && !matches) {
	          matches = regex[j++].exec(ua);

	          if (!!matches) {
	            for (p = 0; p < props.length; p++) {
	              match = matches[++k];
	              q = props[p]; // check if given property is actually array

	              if (typeof q === OBJ_TYPE && q.length > 0) {
	                if (q.length == 2) {
	                  if (typeof q[1] == FUNC_TYPE) {
	                    // assign modified match
	                    this[q[0]] = q[1].call(this, match);
	                  } else {
	                    // assign given value, ignore regex match
	                    this[q[0]] = q[1];
	                  }
	                } else if (q.length == 3) {
	                  // check whether function or regex
	                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                    // call function (usually string mapper)
	                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
	                  } else {
	                    // sanitize match using given regex
	                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
	                  }
	                } else if (q.length == 4) {
	                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
	                }
	              } else {
	                this[q] = match ? match : undefined$1;
	              }
	            }
	          }
	        }

	        i += 2;
	      } // console.log(this);
	      //return this;

	    },
	    str: function (str, map) {
	      for (var i in map) {
	        // check if array
	        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	          for (var j = 0; j < map[i].length; j++) {
	            if (util.has(map[i][j], str)) {
	              return i === UNKNOWN ? undefined$1 : i;
	            }
	          }
	        } else if (util.has(map[i], str)) {
	          return i === UNKNOWN ? undefined$1 : i;
	        }
	      }

	      return str;
	    }
	  }; ///////////////
	  // String map
	  //////////////

	  var maps = {
	    browser: {
	      oldsafari: {
	        version: {
	          '1.0': '/8',
	          '1.2': '/1',
	          '1.3': '/3',
	          '2.0': '/412',
	          '2.0.2': '/416',
	          '2.0.3': '/417',
	          '2.0.4': '/419',
	          '?': '/'
	        }
	      }
	    },
	    device: {
	      amazon: {
	        model: {
	          'Fire Phone': ['SD', 'KF']
	        }
	      },
	      sprint: {
	        model: {
	          'Evo Shift 4G': '7373KT'
	        },
	        vendor: {
	          'HTC': 'APA',
	          'Sprint': 'Sprint'
	        }
	      }
	    },
	    os: {
	      windows: {
	        version: {
	          'ME': '4.90',
	          'NT 3.11': 'NT3.51',
	          'NT 4.0': 'NT4.0',
	          '2000': 'NT 5.0',
	          'XP': ['NT 5.1', 'NT 5.2'],
	          'Vista': 'NT 6.0',
	          '7': 'NT 6.1',
	          '8': 'NT 6.2',
	          '8.1': 'NT 6.3',
	          '10': ['NT 6.4', 'NT 10.0'],
	          'RT': 'ARM'
	        }
	      }
	    }
	  }; //////////////
	  // Regex map
	  /////////////

	  var regexes = {
	    browser: [[// Presto based
	    /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
	    /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
	    /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
	    /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
	    ], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
	    ], [[NAME, 'Opera Mini'], VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
	    ], [[NAME, 'Opera'], VERSION], [// Mixed
	    /(kindle)\/([\w\.]+)/i, // Kindle
	    /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, // Lunascape/Maxthon/Netfront/Jasmine/Blazer
	    // Trident based
	    /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, // Avant/IEMobile/SlimBrowser/Baidu
	    /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer
	    // Webkit/KHTML based
	    /(rekonq)\/([\w\.]*)/i, // Rekonq
	    /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
	    ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
	    ], [[NAME, 'IE'], VERSION], [/(edge|edgios|edga)\/((\d+)?[\w\.]+)/i // Microsoft Edge
	    ], [[NAME, 'Edge'], VERSION], [/(yabrowser)\/([\w\.]+)/i // Yandex
	    ], [[NAME, 'Yandex'], VERSION], [/(puffin)\/([\w\.]+)/i // Puffin
	    ], [[NAME, 'Puffin'], VERSION], [/(focus)\/([\w\.]+)/i // Firefox Focus
	    ], [[NAME, 'Firefox Focus'], VERSION], [/(opt)\/([\w\.]+)/i // Opera Touch
	    ], [[NAME, 'Opera Touch'], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
	    ], [[NAME, 'UCBrowser'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
	    ], [[NAME, /_/g, ' '], VERSION], [/(micromessenger)\/([\w\.]+)/i // WeChat
	    ], [[NAME, 'WeChat'], VERSION], [/(brave)\/([\w\.]+)/i // Brave browser
	    ], [[NAME, 'Brave'], VERSION], [/(qqbrowserlite)\/([\w\.]+)/i // QQBrowserLite
	    ], [NAME, VERSION], [/(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
	    ], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
	    ], [NAME, VERSION], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i // Baidu Browser
	    ], [NAME, VERSION], [/(2345Explorer)[\/\s]?([\w\.]+)/i // 2345 Browser
	    ], [NAME, VERSION], [/(MetaSr)[\/\s]?([\w\.]+)/i // SouGouBrowser
	    ], [NAME], [/(LBBROWSER)/i // LieBao Browser
	    ], [NAME], [/xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
	    ], [VERSION, [NAME, 'MIUI Browser']], [/;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
	    ], [VERSION, [NAME, 'Facebook']], [/safari\s(line)\/([\w\.]+)/i, // Line App for iOS
	    /android.+(line)\/([\w\.]+)\/iab/i // Line App for Android
	    ], [NAME, VERSION], [/headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
	    ], [VERSION, [NAME, 'Chrome Headless']], [/\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
	    ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [// Oculus / Samsung Browser
	    /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
	    ], [VERSION, [NAME, 'Android Browser']], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
	    ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
	    ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
	    ], [[NAME, 'Chrome'], VERSION], [/(coast)\/([\w\.]+)/i // Opera Coast
	    ], [[NAME, 'Opera Coast'], VERSION], [/fxios\/([\w\.-]+)/i // Firefox for iOS
	    ], [VERSION, [NAME, 'Firefox']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
	    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
	    ], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
	    ], [[NAME, 'GSA'], VERSION], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
	    ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, // Konqueror
	    /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [// Gecko based
	    /(navigator|netscape)\/([\w\.-]+)/i // Netscape
	    ], [[NAME, 'Netscape'], VERSION], [/(swiftfox)/i, // Swiftfox
	    /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	    /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	    /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla
	    // Other
	    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
	    /(links)\s\(([\w\.]+)/i, // Links
	    /(gobrowser)\/?([\w\.]*)/i, // GoBrowser
	    /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
	    /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
	    ], [NAME, VERSION]
	    /* /////////////////////
	    // Media players BEGIN
	    ////////////////////////
	     , [
	     /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	    /(coremedia) v((\d+)[\w\._]+)/i
	    ], [NAME, VERSION], [
	     /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	    ], [NAME, VERSION], [
	     /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	    ], [NAME, VERSION], [
	     /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                        // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                        // NSPlayer/PSP-InternetRadioPlayer/Videos
	    /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	    /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	    /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	    ], [NAME, VERSION], [
	    /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	    ], [NAME, VERSION], [
	     /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	    ], [[NAME, 'Flip Player'], VERSION], [
	     /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                        // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	    ], [NAME], [
	     /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                        // Gstreamer
	    ], [NAME, VERSION], [
	     /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	    /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                        // Java/urllib/requests/wget/cURL
	    /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	    ], [NAME, VERSION], [
	     /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	    ], [[NAME, /_/g, ' '], VERSION], [
	     /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                        // MPlayer SVN
	    ], [NAME, VERSION], [
	     /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	    ], [NAME, VERSION], [
	     /(mplayer)/i,                                                       // MPlayer (no other info)
	    /(yourmuze)/i,                                                      // YourMuze
	    /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	    ], [NAME], [
	     /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	    ], [NAME, VERSION], [
	     /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	    ], [NAME, VERSION], [
	     /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	    ], [NAME, VERSION], [
	     /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	    /(winamp)\s((\d+)[\w\.-]+)/i,
	    /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	    ], [NAME, VERSION], [
	     /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                        // inlight radio
	    ], [NAME], [
	     /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                        // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                        // SoundTap/Totem/Stagefright/Streamium
	    ], [NAME, VERSION], [
	     /(smp)((\d+)[\d\.]+)/i                                              // SMP
	    ], [NAME, VERSION], [
	     /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	    /(vlc)\/((\d+)[\w\.-]+)/i,
	    /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	    /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	    /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	    ], [NAME, VERSION], [
	     /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	    /(windows-media-player)\/((\d+)[\w\.-]+)/i
	    ], [[NAME, /-/g, ' '], VERSION], [
	     /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                        // Windows Media Server
	    ], [VERSION, [NAME, 'Windows']], [
	     /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	    ], [NAME, VERSION], [
	     /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	    /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	    ], [[NAME, 'rad.io'], VERSION]
	     //////////////////////
	    // Media players END
	    ////////////////////*/
	    ],
	    cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
	    ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
	    ], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32
	    ], [[ARCHITECTURE, 'ia32']], [// PocketPC mistakenly identified as PowerPC
	    /windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
	    ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i // SPARC
	    ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	    ], [[ARCHITECTURE, util.lowerize]]],
	    device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
	    ], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/ // iPad
	    ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i // Apple TV
	    ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i, // Archos
	    /(hp).+(touchpad)/i, // HP TouchPad
	    /(hp).+(tablet)/i, // HP Tablet
	    /(kindle)\/([\w\.]+)/i, // Kindle
	    /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
	    /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/.+silk\//i // Kindle Fire HD
	    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i // Fire Phone
	    ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [/android.+aft([bms])\sbuild/i // Fire TV
	    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [/\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
	    ], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i // iPod/iPhone
	    ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, // BlackBerry
	    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
	    /(hp)\s([\w\s]+\w)/i, // HP iPAQ
	    /(asus)-?(\w+)/i // Asus
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i // BlackBerry 10
	    ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [// Asus Tablets
	    /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
	    /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [/\s(ouya)\s/i, // Ouya
	    /(nintendo)\s([wids3u]+)/i // Nintendo
	    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i // Nvidia
	    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i // Playstation
	    ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i // Sprint Phones
	    ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
	    /(zte)-(\w*)/i, // ZTE
	    /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
	    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i // HTC Nexus 9
	    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i // Huawei
	    ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [/(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
	    ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
	    ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [// Motorola
	    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
	    ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
	    ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
	    /smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV], MODEL], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [/sie-(\w*)/i // Siemens
	    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
	    /(nokia)[\s_-]?([\w-]*)/i], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
	    ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [/android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
	    ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
	    ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i // LG SmartTV
	    ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, // LG
	    /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
	    ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [/linux;.+((jolla));/i // Jolla
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i // Pebble
	    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/crkey/i // Google Chromecast
	    ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [/android.+;\s(glass)\s\d/i // Google Glass
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [/android.+;\s(pixel c)[\s)]/i // Google Pixel C
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [/android.+;\s(pixel( [23])?( xl)?)\s/i // Google Pixel
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [/android.+;\s(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
	    /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
	    /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, // Xiaomi Mi
	    /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i // Redmi Phones
	    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i // Mi Pad tablets
	    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [/android.+;\s(m[1-5]\snote)\sbuild/i // Meizu Tablet
	    ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [/(mz)-([\w-]{2,})/i // Meizu Phone
	    ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [/android.+a000(1)\s+build/i, // OnePlus
	    /android.+oneplus\s(a\d{4})\s+build/i], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
	    ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i // Dell Venue Tablets
	    ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
	    ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
	    ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
	    ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [/android.+;\s(k88)\sbuild/i // ZTE K Series Tablet
	    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
	    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [/android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
	    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
	    ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i // Dragon Touch Tablet
	    ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i // Insignia Tablets
	    ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i // NextBook Tablets
	    ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [// Voice Xtreme Phones
	    /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i // LvTel Phones
	    ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [/android.+;\s(PH-1)\s/i], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [// Essential PH-1
	    /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
	    ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i // Le Pan Tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
	    ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
	    ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [/android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
	    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i // Gigaset Tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
	    /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
	    ], [[TYPE, util.lowerize], VENDOR, MODEL], [/(android[\w\.\s\-]{0,9});.+build/i // Generic Android Device
	    ], [MODEL, [VENDOR, 'Generic']]
	    /*//////////////////////////
	        // TODO: move to string map
	        ////////////////////////////
	         /(C6603)/i                                                          // Sony Xperia Z C6603
	        ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	        /(C6903)/i                                                          // Sony Xperia Z 1
	        ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	         /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	        ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	        ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	        ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	        ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	        ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	        /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	        ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	        ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	         /(T3C)/i                                                            // Advan Vandroid T3C
	        ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	        /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	        ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	        /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	        ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
	         /(V972M)/i                                                          // ZTE V972M
	        ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
	         /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	        /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	        ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	        /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	        /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	        ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	         /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	        ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
	         /////////////
	        // END TODO
	        ///////////*/
	    ],
	    engine: [[/windows.+\sedge\/([\w\.]+)/i // EdgeHTML
	    ], [VERSION, [NAME, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, // Presto
	    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	    /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
	    /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
	    ], [NAME, VERSION], [/rv\:([\w\.]{1,9}).+(gecko)/i // Gecko
	    ], [VERSION, NAME]],
	    os: [[// Windows based
	    /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
	    ], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
	    /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, // Windows Phone
	    /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [// Mobile/Embedded OS
	    /\((bb)(10);/i // BlackBerry 10
	    ], [[NAME, 'BlackBerry'], VERSION], [/(blackberry)\w*\/?([\w\.]*)/i, // Blackberry
	    /(tizen)[\/\s]([\w\.]+)/i, // Tizen
	    /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	    /linux;.+(sailfish);/i // Sailfish OS
	    ], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i // Symbian
	    ], [[NAME, 'Symbian'], VERSION], [/\((series40);/i // Series 40
	    ], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
	    ], [[NAME, 'Firefox OS'], VERSION], [// Console
	    /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation
	    // GNU/Linux based
	    /(mint)[\/\s\(]?(\w*)/i, // Mint
	    /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
	    /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	    // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	    /(hurd|linux)\s?([\w\.]*)/i, // Hurd/Linux
	    /(gnu)\s?([\w\.]*)/i // GNU
	    ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
	    ], [[NAME, 'Chromium OS'], VERSION], [// Solaris
	    /(sunos)\s?([\w\.\d]*)/i // Solaris
	    ], [[NAME, 'Solaris'], VERSION], [// BSD based
	    /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	    ], [NAME, VERSION], [/(haiku)\s(\w+)/i // Haiku
	    ], [NAME, VERSION], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
	    ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
	    ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [// Other
	    /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, // Solaris
	    /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, // AIX
	    /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
	    /(unix)\s?([\w\.]*)/i // UNIX
	    ], [NAME, VERSION]]
	  }; /////////////////
	  // Constructor
	  ////////////////

	  /*
	  var Browser = function (name, version) {
	      this[NAME] = name;
	      this[VERSION] = version;
	  };
	  var CPU = function (arch) {
	      this[ARCHITECTURE] = arch;
	  };
	  var Device = function (vendor, model, type) {
	      this[VENDOR] = vendor;
	      this[MODEL] = model;
	      this[TYPE] = type;
	  };
	  var Engine = Browser;
	  var OS = Browser;
	  */

	  var UAParser = function (uastring, extensions) {
	    if (typeof uastring === 'object') {
	      extensions = uastring;
	      uastring = undefined$1;
	    }

	    if (!(this instanceof UAParser)) {
	      return new UAParser(uastring, extensions).getResult();
	    }

	    var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes; //var browser = new Browser();
	    //var cpu = new CPU();
	    //var device = new Device();
	    //var engine = new Engine();
	    //var os = new OS();

	    this.getBrowser = function () {
	      var browser = {
	        name: undefined$1,
	        version: undefined$1
	      };
	      mapper.rgx.call(browser, ua, rgxmap.browser);
	      browser.major = util.major(browser.version); // deprecated

	      return browser;
	    };

	    this.getCPU = function () {
	      var cpu = {
	        architecture: undefined$1
	      };
	      mapper.rgx.call(cpu, ua, rgxmap.cpu);
	      return cpu;
	    };

	    this.getDevice = function () {
	      var device = {
	        vendor: undefined$1,
	        model: undefined$1,
	        type: undefined$1
	      };
	      mapper.rgx.call(device, ua, rgxmap.device);
	      return device;
	    };

	    this.getEngine = function () {
	      var engine = {
	        name: undefined$1,
	        version: undefined$1
	      };
	      mapper.rgx.call(engine, ua, rgxmap.engine);
	      return engine;
	    };

	    this.getOS = function () {
	      var os = {
	        name: undefined$1,
	        version: undefined$1
	      };
	      mapper.rgx.call(os, ua, rgxmap.os);
	      return os;
	    };

	    this.getResult = function () {
	      return {
	        ua: this.getUA(),
	        browser: this.getBrowser(),
	        engine: this.getEngine(),
	        os: this.getOS(),
	        device: this.getDevice(),
	        cpu: this.getCPU()
	      };
	    };

	    this.getUA = function () {
	      return ua;
	    };

	    this.setUA = function (uastring) {
	      ua = uastring; //browser = new Browser();
	      //cpu = new CPU();
	      //device = new Device();
	      //engine = new Engine();
	      //os = new OS();

	      return this;
	    };

	    return this;
	  };

	  UAParser.VERSION = LIBVERSION;
	  UAParser.BROWSER = {
	    NAME: NAME,
	    MAJOR: MAJOR,
	    // deprecated
	    VERSION: VERSION
	  };
	  UAParser.CPU = {
	    ARCHITECTURE: ARCHITECTURE
	  };
	  UAParser.DEVICE = {
	    MODEL: MODEL,
	    VENDOR: VENDOR,
	    TYPE: TYPE,
	    CONSOLE: CONSOLE,
	    MOBILE: MOBILE,
	    SMARTTV: SMARTTV,
	    TABLET: TABLET,
	    WEARABLE: WEARABLE,
	    EMBEDDED: EMBEDDED
	  };
	  UAParser.ENGINE = {
	    NAME: NAME,
	    VERSION: VERSION
	  };
	  UAParser.OS = {
	    NAME: NAME,
	    VERSION: VERSION
	  }; //UAParser.Utils = util;
	  ///////////
	  // Export
	  //////////
	  // check js environment

	  {
	    // nodejs env
	    if (module.exports) {
	      exports = module.exports = UAParser;
	    } // TODO: test!!!!!!!!

	    /*
	    if (require && require.main === module && process) {
	        // cli
	        var jsonize = function (arr) {
	            var res = [];
	            for (var i in arr) {
	                res.push(new UAParser(arr[i]).getResult());
	            }
	            process.stdout.write(JSON.stringify(res, null, 2) + '\n');
	        };
	        if (process.stdin.isTTY) {
	            // via args
	            jsonize(process.argv.slice(2));
	        } else {
	            // via pipe
	            var str = '';
	            process.stdin.on('readable', function() {
	                var read = process.stdin.read();
	                if (read !== null) {
	                    str += read;
	                }
	            });
	            process.stdin.on('end', function () {
	                jsonize(str.replace(/\n$/, '').split('\n'));
	            });
	        }
	    }
	    */


	    exports.UAParser = UAParser;
	  } // jQuery/Zepto specific (optional)
	  // Note:
	  //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	  //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	  //   and we should catch that.


	  var $ = window && (window.jQuery || window.Zepto);

	  if (typeof $ !== UNDEF_TYPE && !$.ua) {
	    var parser = new UAParser();
	    $.ua = parser.getResult();

	    $.ua.get = function () {
	      return parser.getUA();
	    };

	    $.ua.set = function (uastring) {
	      parser.setUA(uastring);
	      var result = parser.getResult();

	      for (var prop in result) {
	        $.ua[prop] = result[prop];
	      }
	    };
	  }
	})(typeof window === 'object' ? window : commonjsGlobal);
	});
	var uaParser_1 = uaParser.UAParser;

	var Debouncer_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	/**
	 * A Douncer is a class that manages a function call to ensure that as many calls are made, only the last one is ever invoked.
	 * Typical use cases might include calling function as you resize a browser, where you only want the last invocation to be called
	 * instead of each drag movement of the mouse.  Debuoncer is also used in the Datasource to ensure that when load() is called, only the last
	 * invocation is called.  ie, in a Datasource as you scroll a large amount of items multiple calls might be made to the load() method
	 * but we only want to do the loading once the user has stopped scrolling.
	 */

	class Debouncer {
	  constructor(delay) {
	    this.delay = delay;
	    this.pending = null;
	    this.resolvedData = null;
	    this.promise = null;
	  }
	  /**
	   * Calls func after the given delay (in the constructor).  If multiple calls to dounce happen before the function before the delay
	   * time has passed, then the previous call is discarded and the new func will be the function that is called once the time is up.
	   *
	   * @param {Function} func - Function to debounce.
	   * @param {Function} resolve - Optional function to call once the debounce function completes.
	   * @param {Function} error - Optional function to call if the debounce function has an error.
	   */


	  debounce(func, resolve, error) {
	    if (this.pending !== null) {
	      clearTimeout(this.pending);
	    }
	    /* eslint func-style: off */


	    let runLater = () => {
	      try {
	        let result = func();
	        this.resolvedData = result; // istanbul ignore else

	        if (resolve) resolve(result);
	      } catch (e) {
	        // istanbul ignore else
	        if (error) error(e);
	      } finally {
	        this.pending = null;
	      }
	    };

	    this.pending = setTimeout(runLater, this.delay);
	  }
	  /**
	   * Returns a promise that will be resolved when debounced function is complete.
	   *
	   * @returns {Promise} A promise that will be resolved with the data.
	   */


	  resolve() {
	    if (this.pending === null) {
	      // we are not waiting, so, just resolve it.
	      return Promise.resolve(this.resolvedData);
	    } // if we already created the promise then just return it


	    if (this.promise !== null) {
	      return this.promise;
	    } // create a promise to resolve the data


	    this.promise = new Promise(resolve => {
	      this.resolveWhenReady(resolve);
	    });
	    return this.promise;
	  }
	  /**
	   * Resolve the promise function, if ready, otherwise, it will wait for the data, and then resolve the function once it arrives.
	   *
	   * @param {Function} resolve - Promise Function to resolve with data.
	   */


	  resolveWhenReady(resolve) {
	    if (this.pending === null) {
	      this.promise = null;

	      if (this.resolvedData instanceof Promise) {
	        // if the data returned in a promise, then resolve it first
	        this.resolvedData.then(data => resolve(data));
	      } else {
	        resolve(this.resolvedData);
	      }
	    } else {
	      setTimeout(this.resolveWhenReady.bind(this), 50, resolve);
	    }
	  }

	}

	var _default = Debouncer;
	exports.default = _default;
	});

	unwrapExports(Debouncer_1);

	var Device_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.Device = exports.DeviceConstants = exports.DefaultDevice = void 0;

	var _Factory = _interopRequireDefault(Factory_1);

	var _uaParserJs = _interopRequireDefault(uaParser);

	var _Log = _interopRequireDefault(Log_1);



	var _EventEmitter = _interopRequireDefault(EventEmitter_1);

	var _Debouncer = _interopRequireDefault(Debouncer_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/* eslint max-lines:off */


	const TAG = Constants.framework + '-Device';
	/**
	 * Breakpoints as defined in the Carbon Grid spec.
	 * https://www.carbondesignsystem.com/guidelines/layout/#breakpoints
	 */

	const BREAKPOINTS = {
	  sm: {
	    columns: 4,
	    margin: 0,
	    width: 320
	  },
	  md: {
	    columns: 8,
	    margin: 16,
	    width: 672
	  },
	  lg: {
	    columns: 16,
	    margin: 16,
	    width: 1056
	  },
	  xlg: {
	    columns: 16,
	    margin: 16,
	    width: 1312
	  },
	  max: {
	    columns: 16,
	    margin: 16,
	    width: 1584
	  }
	};
	/**
	 * Device Constants
	 */

	class DeviceConstants {}
	/**
	 * @constant {string}
	 * @default
	 */


	exports.DeviceConstants = DeviceConstants;
	DeviceConstants.ORIENTATION_LANDSCAPE = 'landscape';
	/**
	 * @constant {string}
	 * @default
	 */

	DeviceConstants.ORIENTATION_PORTRAIT = 'portrait';
	/**
	 * Device API with implementation for the default device running on Browser.
	 *
	 * @alias Device
	 * @fires Device#orientation-changed
	 * @fires Device#screen-size-changed
	 */

	class DefaultDevice extends _EventEmitter.default {
	  /**
	   * A device should be created by importing the Device and calling Device.get() to get the Device instance.
	   */
	  constructor() {
	    super(); // create the event debouncers

	    this.orientationChangedDebouncer = new _Debouncer.default(500);
	    this.screenSizeChangedDebouncer = new _Debouncer.default(100);
	    /**
	     * @member {string} - Name of this device.
	     */

	    this.name = 'browser';
	    /**
	     * @member {boolean} - True if we are a browser
	     */

	    this.isBrowser = true;
	    /**
	     * @member {boolean} - True if we are mobile (ie, phone or tablet)
	     */

	    this.isMobile = false;
	    /**
	     * @member {boolean} - True if we are a tablet
	     */

	    this.isTablet = false;
	    /**
	     * @member {boolean} - True if we are a desktop computer
	     */

	    this.isDesktop = false;
	    /**
	     * @member {boolean} - True if we are Anywhere
	     */

	    this.isAnywhere = false;
	    /**
	     * @member {boolean} - True if we are headless (no browser or screen)
	     */

	    this.isHeadless = false;
	    /**
	     * @member {boolean} - True if we are in emulation mode
	     */

	    this.isEmulated = false;
	    /**
	     * @type ScreenInfo
	     * @property {number} width - Viewport width.
	     * @property {number} height - Viewport height.
	     * @property {number} dpi - DPI information.
	     * @property {'landscape'|'portrait'} orientation - Viewport orientation.
	     * @property {'sm'|'md'|'lg'|'xlg'|'max'} size - Screen size
	     */

	    this.screen = {
	      width: 0,
	      height: 0,
	      dpi: 0,
	      orientation: DeviceConstants.ORIENTATION_PORTRAIT,
	      size: ''
	    };
	    /**
	     * @type OperatingSystemInfo
	     * @property {string} name
	     * @property {string} version
	     *
	     * @member {OperatingSystemInfo}
	     */

	    this.os = {
	      name: '',
	      version: ''
	    };
	    /**
	     * @type BrowserInfo
	     * @property {string} userAgent - Browser's user agent
	     * @property {Object} engine - Browser rendering engine.
	     * @property {Object} engine.name - Rendering engine name.
	     * @property {Object} engine.version - Rendering engine version.
	     * @property {boolean} isIE - True if Internet Explorer
	     * @property {boolean} isFF - True if FireFox
	     * @property {boolean} isEdge - True if Edge
	     * @property {boolean} isChrome - True if Chrome
	     * @property {boolean} isSafari - True if Safari
	     * @property {boolean} isRecent - True if one of the 4 recent browers (Edge, FF, Chrome or Safari)
	     *
	     * @member {BrowserInfo}
	     */

	    this.browser = {
	      userAgent: '',
	      engine: {
	        name: '',
	        version: ''
	      },
	      isFF: false,
	      isIE: false,
	      isChrome: false,
	      isEdge: false,
	      isSafari: false
	    };
	    /**
	     * @type HardwareInfo
	     * @property {number} memory - Amount of memory in MB.
	     * @property {Object} cpu - CPU information.
	     * @property {string} cpu.architecture - CPU architecture.
	     * @property {Object} device - Device information.
	     * @property {string} device.type - Device type information.
	     * @property {string} device.model - Device model information.
	     * @property {string} device.vendor - Device vendor information.
	     *
	     * @member {HardwareInfo}
	     */

	    this.hardware = {
	      memory: 0,
	      cpu: {
	        architecture: ''
	      },
	      device: {
	        type: '',
	        model: '',
	        vendor: ''
	      }
	    };
	    /**
	     * @member {string} - UUID of this device.
	     */

	    this.uuid = '';
	    this.discoverFeatures();
	    this.setupEvents();
	  }
	  /**
	   * Discovers the features of this device, populating various fields.
	   *
	   * @protected
	   */


	  discoverFeatures() {
	    let ua = new _uaParserJs.default(window.navigator.userAgent).getResult();

	    _Log.default.t(TAG, 'Device Information', JSON.stringify(ua, null, 2)); // istanbul ignore next


	    this.os = ua.os || {}; // istanbul ignore next

	    this.browser = ua.browser || {};
	    this.browser.userAgent = ua.ua; // istanbul ignore next

	    this.browser.engine = ua.engine || {};
	    this.browser.isIE = this.browser.name === 'IE';
	    this.browser.isFF = this.browser.name === 'Firefox';
	    this.browser.isEdge = this.browser.name === 'Edge';
	    this.browser.isChrome = this.browser.name.indexOf('Chrom') >= 0;
	    this.browser.isSafari = this.browser.name === 'Safari'; // istanbul ignore next

	    this.browser.isRecent = this.browser.isFF || this.browser.isEdge || this.browser.isChrome || this.browser.isSafari; // istanbul ignore next

	    this.hardware = {
	      cpu: ua.cpu || {},
	      device: ua.device || {}
	    };
	    this.isPhone = this.hardware.device.type === 'mobile';
	    this.isTablet = this.hardware.device.type === 'tablet';
	    this.isMobile = this.isPhone || this.isTablet || this.isAnywhere;
	    this.isDesktop = !this.isMobile;
	    this.isAnywhere = false;
	    this.isAnywhereEmulation = false;
	    this.updateScreenInfo();
	  }
	  /**
	   * Returns the size of the screen a form factor of sm, md, lg, xlg, or max.
	   *
	   * @param {number} width - The current width of the screen.
	   * @returns {string} The screen's size as sm, md, lg, xlg, or max.
	   */


	  getScreenSize(width) {
	    if (width <= BREAKPOINTS.sm.width) {
	      return 'sm';
	    }

	    if (width <= BREAKPOINTS.md.width) {
	      return 'md';
	    }

	    if (width <= BREAKPOINTS.lg.width) {
	      return 'lg';
	    }

	    if (width <= BREAKPOINTS.xlg.width) {
	      return 'xlg';
	    }

	    return 'max';
	  }
	  /**
	   * Discovers screen information and updates the current screen state.
	   *
	   * @fires orientation-changed
	   * @protected
	   */


	  updateScreenInfo() {
	    let lastH = this.screen.height;
	    let lastW = this.screen.width;
	    this.screen.height = Math.max(document.documentElement.clientHeight, // istanbul ignore next
	    window.innerHeight || 0);
	    this.screen.width = Math.max(document.documentElement.clientWidth, // istanbul ignore next
	    window.innerWidth || 0);
	    this.screen.size = this.getScreenSize(this.screen.width);
	    let lastOrientation = this.screen.orientation;
	    this.screen.orientation = this.screen.width > this.screen.height ? DeviceConstants.ORIENTATION_LANDSCAPE : DeviceConstants.ORIENTATION_PORTRAIT; // fire an orientation change if necessary

	    if (lastOrientation !== this.screen.orientation) {
	      /**
	       * @event Device#orientation-changed
	       * @type {object}
	       * @property {'portrait'|'landscape'} orientation - current screen orientation
	       */
	      this.orientationChangedDebouncer.debounce(() => {
	        this.emit('orientation-changed', {
	          orientation: this.screen.orientation
	        });
	      });
	    } // fire a screen change if necessary


	    if (lastH) {
	      // istanbul ignore else
	      if (lastH !== this.screen.height || lastW !== this.screen.width) {
	        /**
	         * @event Device#screen-size-changed
	         * @type {Object}
	         * @property {number} height - Screen height.
	         * @property {number} width - Screen width.
	         * @property {'sm'|'md'|'lg'|'xlg'|'max'} size - Screen size.
	         */
	        this.screenSizeChangedDebouncer.debounce(() => {
	          this.emit('screen-size-changed', {
	            height: this.screen.height,
	            width: this.screen.width,
	            size: this.screen.size
	          });
	        });
	      }
	    }
	  }
	  /**
	   * Sets up event bindings.
	   *
	   * @protected
	   */


	  setupEvents() {
	    if (this._windowResizer !== undefined) {
	      window.removeEventListener('resize', this._windowResizer);
	      this._windowResizer = undefined;
	    } // istanbul ignore else


	    if (this._windowResizer === undefined) {
	      this._windowResizer = () => {
	        this.updateScreenInfo();
	      };
	    }

	    window.addEventListener('resize', this._windowResizer);
	  } // private method for testing purposes only, to wait for the Device's events to fully resolve.


	  resolveDebouncers() {
	    return Promise.all([this.orientationChangedDebouncer.resolve(), this.screenSizeChangedDebouncer.resolve()]);
	  }

	} // setup the factory for the device to use the default Device impl


	exports.DefaultDevice = DefaultDevice;
	const Device = new _Factory.default(DefaultDevice); // export the Device class so that others can subclass it

	exports.Device = Device; // the default export is the factory, so that default consumers will need to call .get() in order to get the impl.

	var _default = Device;
	exports.default = _default;
	});

	unwrapExports(Device_1);
	var Device_2 = Device_1.Device;
	var Device_3 = Device_1.DeviceConstants;
	var Device_4 = Device_1.DefaultDevice;

	var Application_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Page = _interopRequireDefault(Page_1);



	var _Device = _interopRequireWildcard(Device_1);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) {
	          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

	          if (desc.get || desc.set) {
	            Object.defineProperty(newObj, key, desc);
	          } else {
	            newObj[key] = obj[key];
	          }
	        }
	      }
	    }

	    newObj.default = obj;
	    return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}
	/**
	 * @typedef {Controller} AppController - user supplied controller class for handling application or page events
	 * @typedef {Controller} PageController - user supplied controller class for handling page events
	 *
	 * @typedef {object} ApplicationOptions
	 * @property {AppController[]} controllers? - Application controllers for this Application.
	 * @property {MaxmioClient} client? - MaximoClient to use for this Application
	 * @property {PageController[]} pages - Page controllers that this Application will manage
	 */

	/**
	 * An Application represents the main controller for a collection of pages that make up an application.
	 * It manages states, controllers, pages, and emits lifecycle events, etc.
	 *
	 * Application is really just another kind of "Page" and as such, it just extends Page and adds in the Application specific behaviour.
	 *
	 * The following contains functions that the Application/Page would manage (and this will grow over time)
	 * datasources, busy, managing message, managing dialogs, getting current user information, getting application details, state
	 *
	 * It's important to realize that the Application/Page is a NON-UI structure and has no access to the UI.  But, the UI, may bind to aspects of the
	 * Application/Page via the Observable state data.  eg, Application may have a 'busy' flag, that is set to 'true' when it's busy.  The UI may
	 * bind to state.busy and update accordingly.   Also, when looking at messages, and dialogs, the Application may manage the information around
	 * whether or not they are being shown, etc, but, the application would not directly "show" them, just set a state variable that the UI can use to
	 * triggher when to show, etc.  ie, the Application/Page doesn't have direct access to the UI, but, it can affect what the UI is showing by changing
	 * the state of the Application/Page.
	 *
	 * @fires initialized - when the application initializes
	 * @fires page-changed - when the application routes to a new page
	 *
	 * @listens change-page - will accept 1 arg as the page name and change to that page
	 *
	 * @extends {Page}
	 */


	class Application extends _Page.default {
	  /**
	   * Creates a new Application with the Application Options.
	   *
	   * @param {ApplicationOptions} options - Options for the Application.
	   */
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    super(options);
	    /**
	     * Application Options that were used to initialize this application.
	     *
	     * @member {ApplicationOptions}
	     */

	    this.options = options;
	    /**
	     * Stateful information about the application.  This extends Page.state structure, since an App extends Page.  Stateful properties can be
	     * used in the Application's UI to bind to, and when they change, the UI will update to reflect those changes.
	     *
	     * @type {object}
	     * @property {boolean} connected - Is the application connected to a remote system.
	     * @property {boolean} authenticated - Is the user authenticted in this application.
	     * @property {object} screen - Current screen/display information.
	     * @property {number} screen.width - Screen width.
	     * @property {number} screen.height - Screen height.
	     * @property {boolean} screen.isPortrait - Convenience method to access the screen orientation.
	     * @property {boolean} screen.isLandscape - Convenience method to access the screen orientation.
	     */

	    this.state = (0, mobx_module.observable)(_objectSpread({}, this.state, {
	      connected: false,
	      authenticated: false,
	      screen: {
	        width: 0,
	        height: 0,
	        isPortrait: false,
	        isLandscape: false
	      }
	    })); // set the logging context name to be our application name

	    this.log.context = this.name;
	    this.handleDefaultEvents(); // istanbul ignore else

	    if (options) {
	      this.localizer = options.localizer;

	      if (options.client) {
	        this.setClient(options.client);
	      }
	    }

	    this.setDevice(options.device);
	  }
	  /**
	   * Sets the device on which the Application is running.
	   *
	   * @param {Device} device - Device instance.
	   * @private
	   */


	  setDevice() {
	    let device = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Device.default.get();
	    /**
	     * The device that is running this application.
	     *
	     * @member {Device}
	     */

	    this.device = device; // update our current screen info from device

	    this.updateScreenInfo(); // when the screen changes, or the orientation changes, let's update the state.

	    this.device.on('screen-size-changed', this.updateScreenInfo.bind(this));
	    this.device.on('orientation-changed', this.updateScreenInfo.bind(this));
	  }
	  /**
	   * Updates the screen information for the application.
	   *
	   * @private
	   */


	  updateScreenInfo() {
	    (0, mobx_module.transaction)(() => {
	      let isPortrait = this.device.screen.orientation === _Device.DeviceConstants.ORIENTATION_PORTRAIT;
	      this.state.screen = _objectSpread({}, this.state.screen, this.device.screen, {
	        isPortrait: isPortrait,
	        isLandscape: !isPortrait
	      });
	    });
	  }
	  /**
	   * Sets the MaximoClient to be used with the Application.
	   *
	   * @param {MaximoClient} client - MaximoClient to be used with the Application.
	   */


	  setClient(client) {
	    // if there is a "client" then set it that we can easily access it later.
	    // istanbul ignore else
	    if (client) {
	      this.client = client; // bind our state based on the connection and authentication states of the client connection

	      this.client.on('connected', val => {
	        this.state.connected = val;
	      });
	      this.client.on('authenticated', val => {
	        this.state.authenticated = val;
	      });
	    }
	  }
	  /**
	   * Setup to handle default events.
	   */


	  handleDefaultEvents() {
	    this.on('change-page', page => {
	      this.setCurrentPage(page);
	    });
	  }
	  /**
	   * Register Application Lifecycle events with this controller, if the controller supports those lifecycle events.
	   *
	   * @param {Controllable} controller - Controller to register.
	   * @override
	   */


	  registerLifecycleEvents(controller) {
	    super.registerLifecycleEvents(controller); // if the controller has an applicationInitialized method, then bind it to the initialize event

	    if (controller.applicationInitialized) {
	      // note initialize is only ever called once
	      this.once('app-initialized', controller.applicationInitialized.bind(controller));
	    }

	    if (controller.applicationInitializing) {
	      // note initialize is only ever called once
	      this.once('app-initializing', controller.applicationInitializing.bind(controller));
	    }
	  }
	  /**
	   * Called when the application object is created and has controllers, and before things are configured.  Generally used to get a
	   * reference to the application instance for logging purposes.
	   */


	  initializing() {
	    // we are not doing much, except telling others that we are initializing.  We pass a reference to ourself.
	    this.emit('app-initializing', this);
	  }
	  /**
	   * Initialize the application.This should not be an expensive operation.
	   */


	  async initialize() {
	    //load all labels and messages for the app.
	    if (this.localizer) {
	      await this.localizer.loadAll();
	    } // we are not doing much, except telling others that we are initialized.  We pass a reference to ourself.


	    this.emit('app-initialized', this); // after initialization, we need to connect

	    this.connect();
	  }
	  /**
	   * Connect using the configured client.  This might force authentication, if needed.
	   */


	  async connect() {
	    if (this.client) {
	      await this.client.connect();
	    }
	  }
	  /**
	   * Returns the label for the current language.
	   *
	   * @param {string} id - The labels unique id.
	   * @param {string} value - The default label if not able to localize.
	   * @param {Array} params - An array of strings to replace placeholders in string.
	   * @returns {string} - The localized label if it exists, or the value parameter passed in.
	   */


	  getLocalizedLabel(id, value, params) {
	    return this.localizer ? this.localizer.getLabel(id, value, params) : value;
	  }
	  /**
	   * Returns the message for the current language.
	   *
	   * @param {string} group - The messages group identifier.
	   * @param {string} key - The messages unique key.
	   * @param {Array} params - An array of strings to replace placeholders in string.
	   * @returns {string} - The localized message if it exists.
	   */


	  getLocalizedMessage(group, key, params) {
	    return this.localizer ? this.localizer.getMessage(group, key, params) : `${group}#${key}`;
	  }

	}

	var _default = Application;
	exports.default = _default;
	});

	unwrapExports(Application_1);

	var AuthState_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	const AuthState = {
	  OK: 0,
	  FAILED: 1,
	  REQUESTING_CREDENTIALS: 2
	};
	var _default = AuthState;
	exports.default = _default;
	});

	unwrapExports(AuthState_1);

	var Authenticator_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _AuthState = _interopRequireDefault(AuthState_1);

	var _EventEmitter = _interopRequireDefault(EventEmitter_1);





	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	const TAG = Constants.framework + "-Authenticator";
	/**
	 *  Scenarios
	 *  1. Maximo App with with it's own Form Login
	 *  2. Maximo App with external SSO
	 *  3. Console App with prompts for username/password
	 *  4. Device with disconnected support
	 *
	 * An authenticator can accept a generic options.  What is in an options can vary based on the authenticator.
	 *
	 * Authenticators also accepts a CredentialProvider.  The CredentialProvider is used by the authenticator to resolve
	 * credentials used during the Authentication Process.  For example, a MAXAUTHAuthenticator can use a ConsoleCredentialProvider
	 * to resolve the username and password that gets turned into the MAXAUTH header by the Authenticator.
	 *
	 * Authenticators are used in the RESTConnection communication to ensure that a user is Authenticated, and to resolve
	 * credentials if needed, to pass them to the Maximo Server.
	 *
	 * If a CredentialProvider is not provided, then the authenticator will simply attempt to login using only the options
	 * passed in the login() method.
	 *
	 * @fires authenticated - when authentication happens.  It will be passed the options and an AuthCode status
	 */

	class Authenticator extends _EventEmitter.default {
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let credentialProvider = arguments.length > 1 ? arguments[1] : undefined;
	    super();
	    this.options = options;
	    this.credentialProvider = credentialProvider;
	    this._authenticated = false;
	    this.interactive = true;
	    this._bindOnRequest = this.onRequest.bind(this);
	    this._bindOnResponse = this.onResponse.bind(this);
	  }

	  set authenticated(v) {
	    this._authenticated = v;
	    this.emit('authenticated', this._authenticated, this.options);
	  }

	  get authenticated() {
	    return this._authenticated;
	  }
	  /**
	   * Return true if this authenticator meets it's authentication requirements.  ie, do we have enough information
	   * to perform an authentication.
	   *
	   * @returns {boolean} - True if we can proceed with authentication.
	   */
	  //Param doc written but not used yet (commented out to pass jsdoc linting)
	  //@param request Current authentication options, from the request, which might contain username, password, headers, etc.


	  hasAuthentication() {
	    return false;
	  }
	  /**
	   * Performs a login using this authenticator.
	   * The possible returns values from the Promise are defined in {@link AuthState}.
	   *
	   * REQUESTING_CREDENTIALS could be considered a failed login, for this session.  Ultimately the Credential Provider will
	   * be returning back with some credentials after a successful login from the external site, and this authentication would
	   * retried again, once it passes control back to our application.  REQUESTING_CREDENTIALS is generally used for SSO.
	   *
	   * @param {Object} options - Authentication options that are understood by the authenticator.
	   * @param {RESTClient} restclient - The REST Client is passed in the event that the Authenticator needs it.
	   * @returns {Promise<number>} - Constant from {AuthState} constants.
	   */


	  async login() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let restclient = arguments.length > 1 ? arguments[1] : undefined; // istanbul ignore else - there is no else
	    // let's register the authenticator with the client to handle injecting the authentication data in the request.

	    if (restclient) {
	      restclient.on('request', this._bindOnRequest);
	      restclient.on('response', this._bindOnResponse);
	    }

	    let newOptions = _objectSpread({}, this.options, options);

	    _Log.default.t(TAG, 'Logging In', newOptions);

	    if (!this.hasAuthentication(newOptions)) {
	      _Log.default.t(TAG, "We dont' have credentials, resolving them"); // some authenticators, may not be interactive, and if they are not, then we can't resolve credentials dynamically.


	      if (this.interactive && this.credentialProvider) {
	        // we don't have a MAXAUTH header, yet, so let's get it
	        try {
	          newOptions = await this.credentialProvider.resolveCredentials(newOptions);

	          if (!this.hasAuthentication(newOptions)) {
	            throw new Error('Unable to get credentials');
	          }
	        } catch (e) {
	          _Log.default.t(TAG, 'Unable to get credentials', e);

	          if (e === _AuthState.default.FAILED) return _AuthState.default.FAILED; // istanbul ignore else - not concerned since it throws error

	          if (e === _AuthState.default.REQUESTING_CREDENTIALS) return _AuthState.default.REQUESTING_CREDENTIALS;
	          throw e;
	        }
	      } else {
	        _Log.default.t(TAG, "Failing the login, since, we don't have a CredentialProvider, OR, we are not interactive"); // we are non-interactive, and we don't have credentials


	        return _AuthState.default.FAILED;
	      }
	    } // we have our authentication requirements, now let's use the rest client to do a login


	    let response = await this._performLogin(newOptions, restclient);
	    if (response !== _AuthState.default.OK) return response;
	    (0, ObjectUtil.mergeDeep)(this.options, newOptions); // update our authentication status, should trigger authenticated event

	    this.authenticated = true;
	    return _AuthState.default.OK;
	  }
	  /**
	   * Abstract Method required to be implemented by sub classes to do the actual login process for the authenticator.
	   *
	   * @returns {Promise<number>} - Constant from the {AuthState} constants.
	   * @private
	   */
	  //Param doc written but not used yet (commented out to pass jsdoc linting)
	  // @param {Object} options - Options passed from the login() method.
	  //@param {RESTClient} restclient - Optional RESTConnection instance.


	  _performLogin() {
	    return _AuthState.default.FAILED;
	  }
	  /**
	   * Perform a logout.
	   * 
	   * @param {Object} options - Options to send with the request.
	   * @param {RESTConnection} restclient - Optional RESTConnection instance.
	   * @returns {Promise<boolean>} - True if the logout was successful. 
	   */


	  logout(options, restclient) {
	    // istanbul ignore else  
	    if (restclient) {
	      restclient.off('response', this._bindOnResponse);
	      restclient.off('request', this._bindOnRequest);
	    }

	    return false;
	  }
	  /**
	   * On each request of the RESTConnection, the authenticator will get the url and the request options.  Authenticators
	   * can manipulate the options, adding headers, query args, etc.
	   * @param url
	   * @param options
	   * @abstract
	   */
	  // istanbul ignore next - this is an interface declaration method
	  // eslint-disable-next-line no-empty-function, no-unused-vars


	  onRequest(url) {
	  }
	  /**
	   * On a response from the RESTConnection the Authenticator will get the raw response.  The authenticator
	   * @param response
	   * @param url
	   * @param options
	   * @param json?
	   * @abstract
	   */
	  // eslint-disable-next-line no-empty-function, no-unused-vars


	  onResponse(response, url, options, json) {}

	}

	var _default = Authenticator;
	exports.default = _default;
	});

	unwrapExports(Authenticator_1);

	var CredentialProvider_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _AuthState = _interopRequireDefault(AuthState_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/**
	 * A Credential Provider provides an abstract way for a Maximo Client Connection to resolve credentials for a
	 * Maximo connection.   Credentials might be resolved from a terminal user input (nodejs server), or a browser's
	 * form, or from some external SSO page.  The Credential Provider is used by an Authenticator to get a user's
	 * credentials during an Authentication process.
	 */


	class CredentialProvider {
	  /**
	   * Attempt to resolve the credentials.  Calling the promise's resolve or reject methods depending on the scenario.
	   *
	   * If credentials cannot be resolved, then reject with AuthState.FAILED.  If credentials could be resolved later,
	   * then return a Promise that when resolved, would contain the updated options.
	   *
	   * If it is known that credentials are going to resolved using some SSO process that leaves our process, then, you can
	   * reject it using AuthState.REQUESTING_CREDENTIALS to differentiate between a FAILURE vs REQUESTING credentials.
	   *
	   * @returns {Promise<options>} - The modified options with credentials provided.
	   */
	  resolveCredentials() {
	    return Promise.reject(_AuthState.default.FAILED);
	  }

	}

	var _default = CredentialProvider;
	exports.default = _default;
	});

	unwrapExports(CredentialProvider_1);

	var MAXAUTHAuthenticator_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Authenticator = _interopRequireDefault(Authenticator_1);

	var _Log = _interopRequireDefault(Log_1);

	var _AuthState = _interopRequireDefault(AuthState_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + "-MAXAUTHAuthenticator";

	class MAXAUTHAuthenticator extends _Authenticator.default {
	  hasUsernameCredentials(options) {
	    return options && options.username && options.password || this.options && this.options.username && this.options.password;
	  }

	  hasAuthentication(options) {
	    return options && options.headers && options.headers.maxauth || this.hasUsernameCredentials(options) || this.options && this.options.headers && this.options.headers.maxauth || this.hasUsernameCredentials(this.options);
	  }

	  async _performLogin(options, restclient) {
	    if (restclient) {
	      _Log.default.t(TAG, "Sending request to Maximo using RESTConnection"); // we have our authentication requirements, now let's use the rest client to do a login


	      try {
	        await restclient.login(options);
	        return _AuthState.default.OK;
	      } catch (e) {
	        _Log.default.e(TAG, "Login Failed", e);

	        return _AuthState.default.FAILED;
	      }
	    } else {
	      _Log.default.e(TAG, "MAXAUTHAuthenticator doesn't have a RESTConnection");

	      return _AuthState.default.FAILED;
	    }
	  }

	  onRequest(url, options) {
	    // need to populate the options.headers.maxauth with the auth value
	    if (!options.headers) options.headers = {};
	    if (options.headers.maxauth) return;
	    if (!this.options.headers) this.options.headers = {};

	    if (this.options.headers.maxauth) {
	      options.headers.maxauth = this.options.headers.maxauth;
	      return;
	    }

	    if (options.username && options.password) {
	      options.headers.maxauth = btoa(options.username + ":" + options.password);
	      return;
	    }

	    if (this.options.username && this.options.password) {
	      options.headers.maxauth = btoa(this.options.username + ":" + this.options.password);
	    }
	  }

	}

	var _default = MAXAUTHAuthenticator;
	exports.default = _default;
	});

	unwrapExports(MAXAUTHAuthenticator_1);

	var MaximoAuthenticator_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Authenticator = _interopRequireDefault(Authenticator_1);

	var _Log = _interopRequireDefault(Log_1);

	var _AuthState = _interopRequireDefault(AuthState_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-MaximoAuthenticator';
	/**
	 * Maximo Authenticator will be used to intelligently inject authentication into a Maximo Application.  The purpose of this authenticator is that
	 * it will use a variety of methods to authenticate a user, including checking the session for an existing login, etc.
	 */

	class MaximoAuthenticator extends _Authenticator.default {
	  constructor() {
	    super(null, null);
	    this.name = 'MaximoAuthenticator';

	    _Log.default.i(TAG, 'Using Maximo Authenticator');
	  }

	  hasAuthentication() {
	    // We'll fill this in, once we understand exactly has needs to happen.
	    return true;
	  }

	  _performLogin() {
	    // we'll fill this in once we understand what needs to happen.
	    return _AuthState.default.OK;
	  }

	}

	var _default = MaximoAuthenticator;
	exports.default = _default;
	});

	unwrapExports(MaximoAuthenticator_1);

	var MAXLDAPAuthenticator_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Authenticator = _interopRequireDefault(Authenticator_1);

	var _Log = _interopRequireDefault(Log_1);

	var _AuthState = _interopRequireDefault(AuthState_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + "-MAXLDAPAuthenticator";

	class MAXLDAPAuthenticator extends _Authenticator.default {
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    super();
	    this.authType = options.authType;
	  }

	  hasUsernameCredentials(options) {
	    return options && options.username && options.password || this.options && this.options.username && this.options.password;
	  }

	  hasAuthentication(options) {
	    return options && options.headers && options.headers.maxauth || this.hasUsernameCredentials(options) || this.options && this.options.headers && this.options.headers.maxauth || this.hasUsernameCredentials(this.options);
	  }

	  async _performLogin(options, restclient) {
	    if (restclient) {
	      _Log.default.t(TAG, "Sending request to Maximo using RESTConnection"); // we have our authentication requirements, now let's use the rest client to do a login


	      try {
	        // The check for "si.auth.sso.isLTPA" is done as Application Server should not required double authentication and only the header "Cookie" with LtpaToken2 & JSESSIONID should be passed when using SAML SSO with 'form' authentication
	        if (this.authType && this.authType.toUpperCase() === 'FORM' && (WL.StaticAppProps["si.auth.sso.isLTPA"] == false || !WL.StaticAppProps["si.auth.sso.isLTPA"])) {
	          options.post = true;
	          options.query = {};
	          options.postUrl = 'j_security_check';
	          let params = new URLSearchParams();
	          params.append('j_username', options.username);
	          params.append('j_password', options.password);
	          options.body = params;
	          if (!options.headers) options.headers = {};
	          options.headers["Content-type"] = 'application/x-www-form-urlencoded';
	          options.headers["requestsource"] = "anywhere";
	        }

	        await restclient.login(options);
	        return _AuthState.default.OK;
	      } catch (e) {
	        _Log.default.e(TAG, "Login Failed", e);

	        return _AuthState.default.FAILED;
	      }
	    } else {
	      _Log.default.e(TAG, "MAXLDAPAuthenticator doesn't have a RESTConnection");

	      return _AuthState.default.FAILED;
	    }
	  }

	  onRequest(url, options) {
	    // need to populate the options.headers.maxauth with the auth value
	    if (!options.headers) options.headers = {};
	    if (options.headers.maxauth) return;
	    if (!this.options.headers) this.options.headers = {};

	    if (this.options.headers.maxauth) {
	      options.headers.maxauth = this.options.headers.maxauth;
	      options.headers.Authorization = 'Basic ' + this.options.headers.maxauth;
	      return;
	    }

	    if (options.username && options.password) {
	      options.headers.maxauth = btoa(options.username + ":" + options.password);
	      options.headers.Authorization = 'Basic ' + btoa(options.username + ":" + options.password);
	      return;
	    }

	    if (this.options.username && this.options.password) {
	      options.headers.maxauth = btoa(this.options.username + ":" + this.options.password);
	      options.headers.Authorization = 'Basic ' + btoa(this.options.username + ":" + this.options.password);
	    }
	  }

	}

	var _default = MAXLDAPAuthenticator;
	exports.default = _default;
	});

	unwrapExports(MAXLDAPAuthenticator_1);

	var SuccessAuthenticator_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Authenticator = _interopRequireDefault(Authenticator_1);

	var _Log = _interopRequireDefault(Log_1);

	var _AuthState = _interopRequireDefault(AuthState_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-SuccessAuthenticator';
	/**
	 * Always return true for authenticated.  Used in testing, and in React Proxy servers where the authentication is managed by the proxy request.
	 */

	class SuccessAuthenticator extends _Authenticator.default {
	  constructor() {
	    super(null, null);

	    _Log.default.i(TAG, "Using Success Authenticator");
	  }

	  hasAuthentication() {
	    return true;
	  }

	  _performLogin() {
	    return _AuthState.default.OK;
	  }

	}

	var _default = SuccessAuthenticator;
	exports.default = _default;
	});

	unwrapExports(SuccessAuthenticator_1);

	var RESTError_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	class RESTError extends Error {
	  constructor(code, message, url, jsonResponse) {
	    super();
	    this.code = code;
	    this.message = message;
	    this.url = url;
	    this.jsonResponse = jsonResponse;
	  }

	}

	var _default = RESTError;
	exports.default = _default;
	});

	unwrapExports(RESTError_1);

	var RESTConnection_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.RESTConnectionFactory = exports.RESTConnection = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _RESTError = _interopRequireDefault(RESTError_1);

	var _EventEmitter = _interopRequireDefault(EventEmitter_1);



	var _Factory = _interopRequireDefault(Factory_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	const TAG = Constants.framework + '-RESTConnection';
	/**
	 * Creates a low level REST Connection to a Maximo Server based on the Options in the constructor, and, the options passed per call.
	 *
	 * @fires request - before a request, contains path, and options as args
	 * @fires response - after the response is received and before it is fully validated.  Contains response, url, options, and json as args
	 */

	class RESTConnection extends _EventEmitter.default {
	  /**
	   * Creates a new RESTConnection.
	   *
	   * @param {ConnectionOptions} options - Options to set on the connection.
	   */
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    super();
	    this.options = options;
	    this.baseUrl = options.baseUrl;
	    this.oslcContext = options.oslcContext; // oslcContext cannot start or end with '/'

	    if (this.oslcContext) {
	      if (this.oslcContext.charAt(0) === '/') throw new Error("REST oslcContext should not start with '/'");
	      if (this.oslcContext.charAt(this.oslcContext.length - 1) === '/') throw new Error("REST oslcContext should not end with '/'");
	    } else {
	      this.oslcContext = 'oslc';
	    } // baseUrl cannot contain query args or end with '/'


	    if (this.baseUrl) {
	      if (this.baseUrl.indexOf('?') >= 0) throw new Error('REST baseUrl cannot contain query args.');
	      if (this.baseUrl.charAt(this.baseUrl.length - 1) === '/') throw new Error("REST baseUrl should not end with '/'");
	    } else {
	      this.baseUrl = '';
	    } // istanbul ignore else


	    if (options.lean !== false) options.lean = true;
	    this.connected = false; // set our "fetch" implementation

	    this.fetchOverride = options.fetch;
	  }

	  getUrl(path, options) {
	    // hrefs returned from maximo json api calls begin with oslcContext and no preceeding '/'
	    if (path.charAt(0) !== '/') {
	      path = '/' + path;
	    }

	    let url = this.baseUrl;

	    if (path.indexOf(this.oslcContext) !== 1) {
	      // add oslcContext if the path doesn't already have it
	      url += '/' + this.oslcContext;
	    }

	    url += path; // istanbul ignore else

	    if (!options.query) options.query = {};

	    this._updateLeanSupport(options); // the only time we don't append URL args is if we are posting, and, we don't have a body.
	    // if we are posting, with a body, then we need to allow those args to be appended to the URL.


	    if (options.method === 'post' && !options.body && !options.query) {
	      return url;
	    } // append our query args to the URL


	    let append = false;
	    let keys = Object.keys(options.query); // istanbul ignore else

	    if (keys.length > 0) {
	      url += url.includes('?') ? '&' : '?';

	      for (let i = 0; i < keys.length; i++) {
	        if (append) url += '&';
	        url += keys[i] + '=' + encodeURIComponent(options.query[keys[i]]);
	        append = true;
	      }
	    }

	    return url;
	  }
	  /**
	   * Post a message to the Maximo Server.
	   *
	   * @param {string} path - Path of the request, starting with '/' and it will be appended to the baseUrl.
	   * @param {Request} options - Request options specific to this request instance.
	   * @returns {Promise<Response>} - Promise containing the reponse to the posted message.
	   */


	  post(path) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    options.method = 'post';

	    if (this.options) {
	      _Log.default.t(TAG, 'Removing query for POST');

	      this.options.query = {};
	    }

	    return this._fetch(path, options);
	  }
	  /**
	   * Send a request to the Maximo Server.
	   *
	   * @param {string} path - Path of the request, starting with '/' and it will be appended to the baseUrl.
	   * @param {Request} options - Request options specific to this request instance.
	   * @returns {Promise<Response>} - Promise containing the response to the sent message.
	   */


	  get(path) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    options.method = 'get';
	    return this._fetch(path, options);
	  }
	  /**
	   * Send a request to the Maximo Server.
	   *
	   * @param {string} path - Path of the request, starting with '/' and it will be appended to the baseUrl.
	   * @param {Request} options - Request options specific to this request instance.
	   * @returns {Promise<Response>} - Promise containing the response to the sent message.
	   */


	  delete(path) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    options.method = 'delete';
	    return this._fetch(path, options);
	  }

	  updateRequestFromOptions(request, options) {
	    // istanbul ignore if - if there are no options we just return what's to test
	    if (!options) return;

	    if (options.headers) {
	      // istanbul ignore else
	      if (!request.headers) request.headers = {};
	      Object.assign(request.headers, options.headers);
	    }

	    request.cache = options.cache || 'no-cache';

	    if (options.includeCredentials) {
	      request.credentials = 'include';
	    }

	    if (options.cors) {
	      request.mode = 'cors';
	    } // if we're doing a POST with a query and there's no body, create a formData with the params


	    if (options.method === 'post' && options.query && !request.body) {
	      let formData = new FormData();
	      let keys = Object.keys(options.query);

	      for (let i = 0; i < keys.length; i++) {
	        formData.append(keys[i], encodeURI(options.query[keys[i]]));
	      }

	      request.body = formData;
	    } // istanbul ignore else


	    if (options.followRedirects !== false) {
	      request.redirect = 'follow';
	    } // istanbul ignore else


	    if (options.clientReferrer !== false) {
	      request.referrer = 'client';
	    }
	  }

	  _updateLeanSupport(options) {
	    // set lean support
	    // istanbul ignore else
	    if (options.lean !== false) options.query.lean = 1;
	  }

	  async _fetch(path, options) {
	    let fetchOptions = _objectSpread({}, this.options, options);

	    if (this.listenerCount('request')) this.emit('request', path, fetchOptions);
	    let requestOptions = {
	      method: fetchOptions.method || 'get'
	    }; // update the options from the core options and our per fetch options

	    this.updateRequestFromOptions(requestOptions, fetchOptions);
	    let url = this.getUrl(path, fetchOptions);

	    if (fetchOptions.body) {
	      requestOptions.body = fetchOptions.body;
	    }

	    _Log.default.t(TAG, 'Fetching: %s', url, requestOptions);

	    let response = null;
	    if (this.fetchOverride) response = await this.fetchOverride(url, requestOptions);else response = await fetch(url, requestOptions);

	    if (RESTConnection.isJsonResponse(response)) {
	      // istanbul ignore else
	      if (response.headers) {
	        let tokenTemp = response.headers.get('csrftoken');

	        if (tokenTemp) {
	          this.csrftoken = tokenTemp;
	        }
	      }

	      let json = await response.json();

	      _Log.default.t(TAG, 'Json Response', json);

	      if (this.listenerCount('response')) this.emit('response', response, path, fetchOptions, json);
	      this.validateJsonResponse(json, response, url);
	      return json;
	    }

	    if (this.listenerCount('response')) this.emit('response', response, path, fetchOptions);
	    this.validateRawResponse(response, url);
	    return response;
	  }

	  static isJsonResponse(response) {
	    return response.headers.get('Content-Type') === 'application/json';
	  }

	  validateRawResponse(response, url) {
	    if (response.ok) return response;
	    throw new _RESTError.default(response.status, response.statusText, url);
	  }

	  validateJsonResponse(json, response, url) {
	    let error = json.Error ? json.Error : json['oslc:Error'];

	    if (error) {
	      // we have a json error
	      throw new _RESTError.default(error.statusCode ? error.statusCode : error['oslc:statusCode'], error.message ? error.message : error['oslc:message'], url, json);
	    }

	    this.validateRawResponse(response, url);
	    return json;
	  }
	  /**
	   * Performs a login to the Maximo Server.
	   *
	   * @param {Request} options - Options to pass to the request.
	   * @returns {Promise<Response>} - Response from the server.
	   */


	  async login() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (!(options.body instanceof URLSearchParams)) {
	      options.body = null;
	    }

	    options.headers = {};
	    options.headers["requestsource"] = "anywhere";

	    if (options.query) {
	      options.query.csrf = '1';
	    } else {
	      options.query = {
	        csrf: '1'
	      };
	    }

	    let resp = {};

	    if (options.post) {
	      // note it post should throw an error if it fails, so, if we succeed, then we can say we are connected.
	      let loginUrl = '/login';

	      if (options.postUrl) {
	        loginUrl = loginUrl + '/' + options.postUrl;
	      }

	      resp = await this.post(loginUrl, options);
	    } else {
	      // note it post should throw an error if it fails, so, if we succeed, then we can say we are connected.
	      resp = await this.get('/login', options);
	    } // note it post should throw an error if it fails, so, if we succeed, then we can say we are connected.


	    this.connected = true;
	    return resp;
	  }
	  /**
	   * Performs a logout from the Maximo Server.
	   *
	   * @returns {Promise<Response>} - Response from the server.
	   */


	  async logout() {
	    let resp = await this.get('/logout', {}); // note it post should throw an error if it fails, so, if we succeed, then we can say we are disconnected.

	    this.connected = false;
	    return resp;
	  }

	  getCSRFToken() {
	    return this.csrftoken;
	  }

	} // Allow the RESTConnection to be a factory


	exports.RESTConnection = RESTConnection;
	const RESTConnectionFactory = new _Factory.default(RESTConnection);
	exports.RESTConnectionFactory = RESTConnectionFactory;
	var _default = RESTConnectionFactory;
	exports.default = _default;
	});

	unwrapExports(RESTConnection_1);
	var RESTConnection_2 = RESTConnection_1.RESTConnectionFactory;
	var RESTConnection_3 = RESTConnection_1.RESTConnection;

	var DataAdapter_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	} // this basically an interface class, so, we have lots of empty functions

	/* eslint no-empty-function: off */

	/* eslint no-unused-vars: off */


	const TAG = Constants.framework + '-DataAdapter';
	/**
	 * A DataAdapter is primarily an Interface.  It is here to document methods supported.
	 */

	class DataAdapter {
	  constructor(options) {
	    this.options = options;
	    this.schema = undefined;
	    this.itemCount = undefined;
	    this.totalPages = undefined;
	    this.totalCount = undefined;
	    this.pageNumber = undefined;
	    this.pageSize = options ? options.pageSize : undefined;
	  }
	  /**
	   * Clears the current count and page information.
	   *
	   * @returns {void}
	   */


	  clearCounts() {
	    this.itemCount = undefined;
	    this.totalPages = undefined;
	    this.totalCount = undefined;
	    this.pageNumber = undefined;
	  }
	  /**
	   * Used to clean up the data properties based on the known information.
	   *
	   * @protected
	   */


	  sanitizeProperties() {
	    if (this.items === undefined) this.items = [];
	    if (this.itemCount === undefined) this.itemCount = this.items.length;
	    if (this.totalPages === undefined) this.totalPages = this.itemCount ? 1 : 0;
	    if (this.pageNumber === undefined) this.pageNumber = 0;
	    if (this.pageSize === undefined) this.pageSize = this.itemCount;
	    if (this.totalCount === undefined) this.totalCount = this.itemCount;
	    if (this.schema === undefined) this.schema = {};
	  }
	  /**
	   * Given the query, load the data.  The query will have common elements, such as 'select' or 'orderBy',
	   * but each data adapter can define Data Adapter specific features.
	   *
	   * The load method should return a DataWindow with the .start and .items properties set as a minimum.
	   *
	   * @param {Query} query data adapter query
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {DataWindow} Data window including the loaded results
	   */
	  // istanbul ignore next


	  load(query) {
	  }
	  /**
	   * Adds an object to the data adapter.  If the object already exists, it should fail.
	   *
	   * @param {Object} json json object to add
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  add(json) {
	  }
	  /**
	   * Adds an array of objects to the data adapater.
	   *
	   * @param {Array} jsonItems array of json items to add
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  batchAdd(jsonItems) {
	  }
	  /**
	   * A put is like an "add or update".  If the object exists, it will be updated.  If it does not exist, it will be added.
	   *
	   * @param {Object} json object to put
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  put(json) {
	  }
	  /**
	   * Puts a list of objects into the data adapater.
	   *
	   * @param {Array} jsonItems array of items to put
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  batchPut(jsonItems) {
	  }
	  /**
	   * Updates an object in the data adapter.  If the object does not exist, it should fail.
	   *
	   * @param {Object} json object to update
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  update(json) {
	  }
	  /**
	   * Updates an array of objects in the data adapter.
	   *
	   * @param {Array} jsonItems array of objects to update
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  batchUpdate(jsonItems) {
	  }
	  /**
	   * Deletes an item from the data adapter.  It should fail if the item does not exist.
	   *
	   * @param {Object} json deletes an item
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {number} Number of items deleted.
	   */
	  // istanbul ignore next


	  delete(json) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    return this.batchDelete([json], options);
	  }
	  /**
	   * delets an array of itesm from the data adapater.
	   *
	   * @param {Array} jsonItems array of items to delete
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {number} Number of items deleted.
	   */
	  // istanbul ignore next


	  batchDelete(jsonItems) {
	  }
	  /**
	   * fetch the next page of items for this data adapter, returning those items in an array.
	   *
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {Array}
	   */
	  // istanbul ignore next


	  nextPage() {
	  }
	  /**
	   * Fetch the previous page of items for this data adapter, returning those items in an array.
	   *
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {Array}
	   */
	  // istanbul ignore next


	  prevPage() {
	  }
	  /**
	   * All operations on the data adapter are not "committed" until a save happens.
	   *
	   * @param {Object} options? optional options that might be passed to the method
	   */
	  // istanbul ignore next


	  save() {
	  }
	  /**
	   * Return the page size for this data adapter.
	   *
	   * @returns {number} - The page size.
	   */


	  getPageSize() {
	    return this.pageSize;
	  }
	  /**
	   * Returns the number of loaded items in this data adapter.
	   *
	   * @returns {number} - Number of loaded items.
	   */


	  getLoadedItemsCount() {
	    return this.itemCount;
	  }
	  /**
	   * Returns the total possible number of items in this data adapter.
	   *
	   * @returns {number} - Number of total possible items.
	   */


	  getTotalItemsCount() {
	    return this.totalCount;
	  }
	  /**
	   * Returns the current page number starting at 0.
	   *
	   * @returns {number} - Current page number.
	   */


	  getPageNumber() {
	    return this.pageNumber;
	  }
	  /**
	   * Returns the total number of pages in this data adapter.
	   *
	   * @returns {number} - Number of total pages.
	   */


	  getTotalPages() {
	    return this.totalPages;
	  }
	  /**
	   * Return the schema associated with the item objects in this data adapter.
	   *
	   * @returns {Object} - Current schema.
	   */


	  getSchema() {
	    return this.schema;
	  }

	}

	var _default = DataAdapter;
	exports.default = _default;
	});

	unwrapExports(DataAdapter_1);

	var NOOP = function () {};

	var IDENTITY = function (_) {
	  return _;
	};

	function invariant(cond, message) {
	  if (message === void 0) {
	    message = "Illegal state";
	  }

	  if (!cond) throw new Error("[mobx-utils] " + message);
	}

	var deprecatedMessages$1 = [];

	function deprecated(msg) {
	  if (deprecatedMessages$1.indexOf(msg) !== -1) return;
	  deprecatedMessages$1.push(msg);
	  console.error("[mobx-utils] Deprecated: " + msg);
	}

	function addHiddenProp(object, propName, value) {
	  Object.defineProperty(object, propName, {
	    enumerable: false,
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	var PENDING = "pending";
	var FULFILLED = "fulfilled";
	var REJECTED = "rejected";

	function caseImpl(handlers) {
	  switch (this.state) {
	    case PENDING:
	      return handlers.pending && handlers.pending(this.value);

	    case REJECTED:
	      return handlers.rejected && handlers.rejected(this.value);

	    case FULFILLED:
	      return handlers.fulfilled ? handlers.fulfilled(this.value) : this.value;
	  }
	}

	function createObservablePromise(origPromise, oldPromise) {
	  invariant(arguments.length <= 2, "fromPromise expects up to two arguments");
	  invariant(typeof origPromise === "function" || typeof origPromise === "object" && origPromise && typeof origPromise.then === "function", "Please pass a promise or function to fromPromise");
	  if (origPromise.isPromiseBasedObservable === true) return origPromise;

	  if (typeof origPromise === "function") {
	    // If it is a (reject, resolve function, wrap it)
	    origPromise = new Promise(origPromise);
	  }

	  var promise = origPromise;
	  origPromise.then(action$$1("observableFromPromise-resolve", function (value) {
	    promise.value = value;
	    promise.state = FULFILLED;
	  }), action$$1("observableFromPromise-reject", function (reason) {
	    promise.value = reason;
	    promise.state = REJECTED;
	  }));
	  promise.isPromiseBasedObservable = true;
	  promise.case = caseImpl;
	  var oldData = oldPromise && oldPromise.state === FULFILLED ? oldPromise.value : undefined;
	  extendObservable$$1(promise, {
	    value: oldData,
	    state: PENDING
	  }, {}, {
	    deep: false
	  });
	  return promise;
	}
	/**
	 * `fromPromise` takes a Promise, extends it with 2 observable properties that track
	 * the status of the promise and returns it. The returned object has the following observable properties:
	 *  - `value`: either the initial value, the value the Promise resolved to, or the value the Promise was rejected with. use `.state` if you need to be able to tell the difference.
	 *  - `state`: one of `"pending"`, `"fulfilled"` or `"rejected"`
	 *
	 * And the following methods:
	 * - `case({fulfilled, rejected, pending})`: maps over the result using the provided handlers, or returns `undefined` if a handler isn't available for the current promise state.
	 * - `then((value: TValue) => TResult1 | PromiseLike<TResult1>, [(rejectReason: any) => any])`: chains additional handlers to the provided promise.
	 *
	 * The returned object implements `PromiseLike<TValue>`, so you can chain additional `Promise` handlers using `then`. You may also use it with `await` in `async` functions.
	 *
	 * Note that the status strings are available as constants:
	 * `mobxUtils.PENDING`, `mobxUtils.REJECTED`, `mobxUtil.FULFILLED`
	 *
	 * fromPromise takes an optional second argument, a previously created `fromPromise` based observable.
	 * This is useful to replace one promise based observable with another, without going back to an intermediate
	 * "pending" promise state while fetching data. For example:
	 *
	 * ```javascript
	 * @observer
	 * class SearchResults extends React.Component {
	 *   @observable searchResults
	 *
	 *   componentWillReceiveProps(nextProps) {
	 *     if (nextProps.query !== this.props.query)
	 *       this.comments = fromPromse(
	 *         window.fetch("/search?q=" + nextProps.query),
	 *         // by passing, we won't render a pending state if we had a successful search query before
	 *         // rather, we will keep showing the previous search results, until the new promise resolves (or rejects)
	 *         this.searchResults
	 *       )
	 *   }
	 *
	 *   render() {
	 *     return this.searchResults.case({
	 *        pending(staleValue) {
	 *          return staleValue || "searching" // <- value might set to previous results while the promise is still pending
	 *        },
	 *        fullfilled(value) {
	 *          return value // the fresh results
	 *        },
	 *        rejected(error) {
	 *          return "Oops: " + error
	 *        }
	 *     })
	 *   }
	 * }
	 * ```
	 *
	 * Observable promises can be created immediately in a certain state using
	 * `fromPromise.reject(reason)` or `fromPromise.resolve(value?)`.
	 * The main advantage of `fromPromise.resolve(value)` over `fromPromise(Promise.resolve(value))` is that the first _synchronously_ starts in the desired state.
	 *
	 * It is possible to directly create a promise using a resolve, reject function:
	 * `fromPromise((resolve, reject) => setTimeout(() => resolve(true), 1000))`
	 *
	 * @example
	 * const fetchResult = fromPromise(fetch("http://someurl"))
	 *
	 * // combine with when..
	 * when(
	 *   () => fetchResult.state !== "pending",
	 *   () => {
	 *     console.log("Got ", fetchResult.value)
	 *   }
	 * )
	 *
	 * // or a mobx-react component..
	 * const myComponent = observer(({ fetchResult }) => {
	 *   switch(fetchResult.state) {
	 *      case "pending": return <div>Loading...</div>
	 *      case "rejected": return <div>Ooops... {fetchResult.value}</div>
	 *      case "fulfilled": return <div>Gotcha: {fetchResult.value}</div>
	 *   }
	 * })
	 *
	 * // or using the case method instead of switch:
	 *
	 * const myComponent = observer(({ fetchResult }) =>
	 *   fetchResult.case({
	 *     pending:   () => <div>Loading...</div>,
	 *     rejected:  error => <div>Ooops.. {error}</div>,
	 *     fulfilled: value => <div>Gotcha: {value}</div>,
	 *   }))
	 *
	 * // chain additional handler(s) to the resolve/reject:
	 *
	 * fetchResult.then(
	 *   (result) =>  doSomeTransformation(result),
	 *   (rejectReason) => console.error('fetchResult was rejected, reason: ' + rejectReason)
	 * ).then(
	 *   (transformedResult) => console.log('transformed fetchResult: ' + transformedResult)
	 * )
	 *
	 * @param {IThenable<T>} promise The promise which will be observed
	 * @param {IThenable<T>} oldPromise? The promise which will be observed
	 * @returns {IPromiseBasedObservable<T>}
	 */


	var fromPromise = createObservablePromise;
	fromPromise.reject = action$$1("fromPromise.reject", function (reason) {
	  var p = fromPromise(Promise.reject(reason));
	  p.state = REJECTED;
	  p.value = reason;
	  return p;
	});
	fromPromise.resolve = action$$1("fromPromise.resolve", function (value) {
	  if (value === void 0) {
	    value = undefined;
	  }

	  var p = fromPromise(Promise.resolve(value));
	  p.state = FULFILLED;
	  p.value = value;
	  return p;
	});
	/**
	 * Returns true if the provided value is a promise-based observable.
	 * @param value any
	 * @returns {boolean}
	 */

	function isPromiseBasedObservable(value) {
	  return value && value.isPromiseBasedObservable === true;
	}
	/**
	 * Moves an item from one position to another, checking that the indexes given are within bounds.
	 *
	 * @example
	 * const source = observable([1, 2, 3])
	 * moveItem(source, 0, 1)
	 * console.log(source.map(x => x)) // [2, 1, 3]
	 *
	 * @export
	 * @param {ObservableArray<T>} target
	 * @param {number} fromIndex
	 * @param {number} toIndex
	 * @returns {ObservableArray<T>}
	 */


	function moveItem(target, fromIndex, toIndex) {
	  checkIndex(target, fromIndex);
	  checkIndex(target, toIndex);

	  if (fromIndex === toIndex) {
	    return;
	  }

	  var oldItems = target[$mobx$$1].values;
	  var newItems;

	  if (fromIndex < toIndex) {
	    newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
	  } else {
	    // toIndex < fromIndex
	    newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
	  }

	  target.replace(newItems);
	  return target;
	}
	/**
	 * Checks whether the specified index is within bounds. Throws if not.
	 *
	 * @private
	 * @param {ObservableArray<any>} target
	 * @param {number }index
	 */


	function checkIndex(target, index) {
	  if (index < 0) {
	    throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
	  }

	  var length = target[$mobx$$1].values.length;

	  if (index >= length) {
	    throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
	  }
	}
	/**
	 * `lazyObservable` creates an observable around a `fetch` method that will not be invoked
	 * until the observable is needed the first time.
	 * The fetch method receives a `sink` callback which can be used to replace the
	 * current value of the lazyObservable. It is allowed to call `sink` multiple times
	 * to keep the lazyObservable up to date with some external resource.
	 *
	 * Note that it is the `current()` call itself which is being tracked by MobX,
	 * so make sure that you don't dereference to early.
	 *
	 * @example
	 * const userProfile = lazyObservable(
	 *   sink => fetch("/myprofile").then(profile => sink(profile))
	 * )
	 *
	 * // use the userProfile in a React component:
	 * const Profile = observer(({ userProfile }) =>
	 *   userProfile.current() === undefined
	 *   ? <div>Loading user profile...</div>
	 *   : <div>{userProfile.current().displayName}</div>
	 * )
	 *
	 * // triggers refresh the userProfile
	 * userProfile.refresh()
	 *
	 * @param {(sink: (newValue: T) => void) => void} fetch method that will be called the first time the value of this observable is accessed. The provided sink can be used to produce a new value, synchronously or asynchronously
	 * @param {T} [initialValue=undefined] optional initialValue that will be returned from `current` as long as the `sink` has not been called at least once
	 * @returns {{
	 *     current(): T,
	 *     refresh(): T,
	 *     reset(): T
	 * }}
	 */


	function lazyObservable(fetch, initialValue) {
	  if (initialValue === void 0) {
	    initialValue = undefined;
	  }

	  var started = false;
	  var value = observable$$1.box(initialValue, {
	    deep: false
	  });

	  var currentFnc = function () {
	    if (!started) {
	      started = true;
	      fetch(function (newValue) {
	        allowStateChanges$$1(true, function () {
	          value.set(newValue);
	        });
	      });
	    }

	    return value.get();
	  };

	  var resetFnc = action$$1("lazyObservable-reset", function () {
	    value.set(initialValue);
	    return value.get();
	  });
	  return {
	    current: currentFnc,
	    refresh: function () {
	      if (started) {
	        started = false;
	        return currentFnc();
	      } else {
	        return value.get();
	      }
	    },
	    reset: function () {
	      return resetFnc();
	    }
	  };
	}
	/**
	 * `fromResource` creates an observable whose current state can be inspected using `.current()`,
	 * and which can be kept in sync with some external datasource that can be subscribed to.
	 *
	 * The created observable will only subscribe to the datasource if it is in use somewhere,
	 * (un)subscribing when needed. To enable `fromResource` to do that two callbacks need to be provided,
	 * one to subscribe, and one to unsubscribe. The subscribe callback itself will receive a `sink` callback, which can be used
	 * to update the current state of the observable, allowing observes to react.
	 *
	 * Whatever is passed to `sink` will be returned by `current()`. The values passed to the sink will not be converted to
	 * observables automatically, but feel free to do so.
	 * It is the `current()` call itself which is being tracked,
	 * so make sure that you don't dereference to early.
	 *
	 * For inspiration, an example integration with the apollo-client on [github](https://github.com/apollostack/apollo-client/issues/503#issuecomment-241101379),
	 * or the [implementation](https://github.com/mobxjs/mobx-utils/blob/1d17cf7f7f5200937f68cc0b5e7ec7f3f71dccba/src/now.ts#L43-L57) of `mobxUtils.now`
	 *
	 * The following example code creates an observable that connects to a `dbUserRecord`,
	 * which comes from an imaginary database and notifies when it has changed.
	 *
	 * @example
	 * function createObservableUser(dbUserRecord) {
	 *   let currentSubscription;
	 *   return fromResource(
	 *     (sink) => {
	 *       // sink the current state
	 *       sink(dbUserRecord.fields)
	 *       // subscribe to the record, invoke the sink callback whenever new data arrives
	 *       currentSubscription = dbUserRecord.onUpdated(() => {
	 *         sink(dbUserRecord.fields)
	 *       })
	 *     },
	 *     () => {
	 *       // the user observable is not in use at the moment, unsubscribe (for now)
	 *       dbUserRecord.unsubscribe(currentSubscription)
	 *     }
	 *   )
	 * }
	 *
	 * // usage:
	 * const myUserObservable = createObservableUser(myDatabaseConnector.query("name = 'Michel'"))
	 *
	 * // use the observable in autorun
	 * autorun(() => {
	 *   // printed everytime the database updates its records
	 *   console.log(myUserObservable.current().displayName)
	 * })
	 *
	 * // ... or a component
	 * const userComponent = observer(({ user }) =>
	 *   <div>{user.current().displayName}</div>
	 * )
	 *
	 * @export
	 * @template T
	 * @param {(sink: (newValue: T) => void) => void} subscriber
	 * @param {IDisposer} [unsubscriber=NOOP]
	 * @param {T} [initialValue=undefined] the data that will be returned by `get()` until the `sink` has emitted its first data
	 * @returns {{
	 *     current(): T;
	 *     dispose(): void;
	 *     isAlive(): boolean;
	 * }}
	 */


	function fromResource(subscriber, unsubscriber, initialValue) {
	  if (unsubscriber === void 0) {
	    unsubscriber = NOOP;
	  }

	  if (initialValue === void 0) {
	    initialValue = undefined;
	  }

	  var isActive = false;
	  var isDisposed = false;
	  var value = initialValue;

	  var suspender = function () {
	    if (isActive) {
	      isActive = false;
	      unsubscriber();
	    }
	  };

	  var atom = createAtom$$1("ResourceBasedObservable", function () {
	    invariant(!isActive && !isDisposed);
	    isActive = true;
	    subscriber(function (newValue) {
	      allowStateChanges$$1(true, function () {
	        value = newValue;
	        atom.reportChanged();
	      });
	    });
	  }, suspender);
	  return {
	    current: function () {
	      invariant(!isDisposed, "subscribingObservable has already been disposed");
	      var isBeingTracked = atom.reportObserved();
	      if (!isBeingTracked && !isActive) console.warn("Called `get` of a subscribingObservable outside a reaction. Current value will be returned but no new subscription has started");
	      return value;
	    },
	    dispose: function () {
	      isDisposed = true;
	      suspender();
	    },
	    isAlive: function () {
	      return isActive;
	    }
	  };
	}

	var __decorate = function (decorators, target, key, desc) {
	  var c = arguments.length,
	      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	      d;
	  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	  return c > 3 && r && Object.defineProperty(target, key, r), r;
	};

	function observableSymbol() {
	  return typeof Symbol === "function" && Symbol.observable || "@@observable";
	}

	function self$2() {
	  return this;
	}
	/**
	 * Converts an expression to an observable stream (a.k.a. TC 39 Observable / RxJS observable).
	 * The provided expression is tracked by mobx as long as there are subscribers, automatically
	 * emitting when new values become available. The expressions respect (trans)actions.
	 *
	 * @example
	 *
	 * const user = observable({
	 *   firstName: "C.S",
	 *   lastName: "Lewis"
	 * })
	 *
	 * Rx.Observable
	 *   .from(mobxUtils.toStream(() => user.firstname + user.lastName))
	 *   .scan(nameChanges => nameChanges + 1, 0)
	 *   .subscribe(nameChanges => console.log("Changed name ", nameChanges, "times"))
	 *
	 * @export
	 * @template T
	 * @param {() => T} expression
	 * @param {boolean} fireImmediately (by default false)
	 * @returns {IObservableStream<T>}
	 */


	function toStream(expression, fireImmediately) {
	  var _a;

	  if (fireImmediately === void 0) {
	    fireImmediately = false;
	  }

	  var computedValue = computed$$1(expression);
	  return _a = {
	    subscribe: function (observer) {
	      return {
	        unsubscribe: computedValue.observe(typeof observer === "function" ? function (_a) {
	          var newValue = _a.newValue;
	          return observer(newValue);
	        } : function (_a) {
	          var newValue = _a.newValue;
	          return observer.next(newValue);
	        }, fireImmediately)
	      };
	    }
	  }, _a[observableSymbol()] = self$2, _a;
	}

	var StreamListener =
	/** @class */
	function () {
	  function StreamListener(observable$$1, initialValue) {
	    var _this = this;

	    this.current = undefined;
	    runInAction$$1(function () {
	      _this.current = initialValue;
	      _this.subscription = observable$$1.subscribe(_this);
	    });
	  }

	  StreamListener.prototype.dispose = function () {
	    if (this.subscription) {
	      this.subscription.unsubscribe();
	    }
	  };

	  StreamListener.prototype.next = function (value) {
	    this.current = value;
	  };

	  StreamListener.prototype.complete = function () {
	    this.dispose();
	  };

	  StreamListener.prototype.error = function (value) {
	    this.current = value;
	    this.dispose();
	  };

	  __decorate([observable$$1.ref], StreamListener.prototype, "current", void 0);

	  __decorate([action$$1.bound], StreamListener.prototype, "next", null);

	  __decorate([action$$1.bound], StreamListener.prototype, "complete", null);

	  __decorate([action$$1.bound], StreamListener.prototype, "error", null);

	  return StreamListener;
	}();
	/**
	 *
	 * Converts a subscribable, observable stream (TC 39 observable / RxJS stream)
	 * into an object which stores the current value (as `current`). The subscription can be cancelled through the `dispose` method.
	 * Takes an initial value as second optional argument
	 *
	 * @example
	 * const debouncedClickDelta = MobxUtils.fromStream(Rx.Observable.fromEvent(button, 'click')
	 *     .throttleTime(1000)
	 *     .map(event => event.clientX)
	 *     .scan((count, clientX) => count + clientX, 0)
	 * )
	 *
	 * autorun(() => {
	 *     console.log("distance moved", debouncedClickDelta.current)
	 * })
	 *
	 * @export
	 * @template T
	 * @param {IObservableStream<T>} observable
	 * @returns {{
	 *     current: T;
	 *     dispose(): void;
	 * }}
	 */


	function fromStream(observable$$1, initialValue) {
	  if (initialValue === void 0) {
	    initialValue = undefined;
	  }

	  return new StreamListener(observable$$1, initialValue);
	}

	var __decorate$1 = function (decorators, target, key, desc) {
	  var c = arguments.length,
	      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	      d;
	  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	  return c > 3 && r && Object.defineProperty(target, key, r), r;
	};

	var RESERVED_NAMES = ["model", "reset", "submit", "isDirty", "isPropertyDirty", "resetProperty"];

	var ViewModel =
	/** @class */
	function () {
	  function ViewModel(model) {
	    var _this = this;

	    this.model = model;
	    this.localValues = observable$$1.map({});
	    this.localComputedValues = observable$$1.map({});

	    this.isPropertyDirty = function (key) {
	      return _this.localValues.has(key);
	    };

	    invariant(isObservableObject$$1(model), "createViewModel expects an observable object");
	    Object.getOwnPropertyNames(model).forEach(function (key) {
	      if (key === $mobx$$1 || key === "__mobxDidRunLazyInitializers") {
	        return;
	      }

	      invariant(RESERVED_NAMES.indexOf(key) === -1, "The propertyname " + key + " is reserved and cannot be used with viewModels");

	      if (isComputedProp$$1(model, key)) {
	        var derivation = getAdministration$$1(model, key).derivation; // Fixme: there is no clear api to get the derivation


	        _this.localComputedValues.set(key, computed$$1(derivation.bind(_this)));
	      }

	      var enumerable = Object.getOwnPropertyDescriptor(model, key).enumerable;
	      Object.defineProperty(_this, key, {
	        enumerable: enumerable,
	        configurable: true,
	        get: function () {
	          if (isComputedProp$$1(model, key)) return _this.localComputedValues.get(key).get();
	          if (_this.isPropertyDirty(key)) return _this.localValues.get(key);else return _this.model[key];
	        },
	        set: action$$1(function (value) {
	          if (value !== _this.model[key]) {
	            _this.localValues.set(key, value);
	          } else {
	            _this.localValues.delete(key);
	          }
	        })
	      });
	    });
	  }

	  Object.defineProperty(ViewModel.prototype, "isDirty", {
	    get: function () {
	      return this.localValues.size > 0;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  Object.defineProperty(ViewModel.prototype, "changedValues", {
	    get: function () {
	      return this.localValues.toJS();
	    },
	    enumerable: true,
	    configurable: true
	  });

	  ViewModel.prototype.submit = function () {
	    var _this = this;

	    keys$$1(this.localValues).forEach(function (key) {
	      var source = _this.localValues.get(key);

	      var destination = _this.model[key];

	      if (isObservableArray$$1(destination)) {
	        destination.replace(source);
	      } else if (isObservableMap$$1(destination)) {
	        destination.clear();
	        destination.merge(source);
	      } else if (!isComputed$$1(source)) {
	        _this.model[key] = source;
	      }
	    });
	    this.localValues.clear();
	  };

	  ViewModel.prototype.reset = function () {
	    this.localValues.clear();
	  };

	  ViewModel.prototype.resetProperty = function (key) {
	    this.localValues.delete(key);
	  };

	  __decorate$1([computed$$1], ViewModel.prototype, "isDirty", null);

	  __decorate$1([computed$$1], ViewModel.prototype, "changedValues", null);

	  __decorate$1([action$$1.bound], ViewModel.prototype, "submit", null);

	  __decorate$1([action$$1.bound], ViewModel.prototype, "reset", null);

	  __decorate$1([action$$1.bound], ViewModel.prototype, "resetProperty", null);

	  return ViewModel;
	}();
	/**
	 * `createViewModel` takes an object with observable properties (model)
	 * and wraps a viewmodel around it. The viewmodel proxies all enumerable properties of the original model with the following behavior:
	 *  - as long as no new value has been assigned to the viewmodel property, the original property will be returned.
	 *  - any future change in the model will be visible in the viewmodel as well unless the viewmodel property was dirty at the time of the attempted change.
	 *  - once a new value has been assigned to a property of the viewmodel, that value will be returned during a read of that property in the future. However, the original model remain untouched until `submit()` is called.
	 *
	 * The viewmodel exposes the following additional methods, besides all the enumerable properties of the model:
	 * - `submit()`: copies all the values of the viewmodel to the model and resets the state
	 * - `reset()`: resets the state of the viewmodel, abandoning all local modifications
	 * - `resetProperty(propName)`: resets the specified property of the viewmodel
	 * - `isDirty`: observable property indicating if the viewModel contains any modifications
	 * - `isPropertyDirty(propName)`: returns true if the specified property is dirty
	 * - `changedValues`: returns a key / value map with the properties that have been changed in the model so far
	 * - `model`: The original model object for which this viewModel was created
	 *
	 * You may use observable arrays, maps and objects with `createViewModel` but keep in mind to assign fresh instances of those to the viewmodel's properties, otherwise you would end up modifying the properties of the original model.
	 * Note that if you read a non-dirty property, viewmodel only proxies the read to the model. You therefore need to assign a fresh instance not only the first time you make the assignment but also after calling `reset()` or `submit()`.
	 *
	 * @example
	 * class Todo {
	 *   \@observable title = "Test"
	 * }
	 *
	 * const model = new Todo()
	 * const viewModel = createViewModel(model);
	 *
	 * autorun(() => console.log(viewModel.model.title, ",", viewModel.title))
	 * // prints "Test, Test"
	 * model.title = "Get coffee"
	 * // prints "Get coffee, Get coffee", viewModel just proxies to model
	 * viewModel.title = "Get tea"
	 * // prints "Get coffee, Get tea", viewModel's title is now dirty, and the local value will be printed
	 * viewModel.submit()
	 * // prints "Get tea, Get tea", changes submitted from the viewModel to the model, viewModel is proxying again
	 * viewModel.title = "Get cookie"
	 * // prints "Get tea, Get cookie" // viewModel has diverged again
	 * viewModel.reset()
	 * // prints "Get tea, Get tea", changes of the viewModel have been abandoned
	 *
	 * @param {T} model
	 * @returns {(T & IViewModel<T>)}
	 * ```
	 */


	function createViewModel(model) {
	  return new ViewModel(model);
	}
	/**
	 * Like normal `when`, except that this `when` will automatically dispose if the condition isn't met within a certain amount of time.
	 *
	 * @example
	 * test("expect store to load", t => {
	 *   const store = {
	 *     items: [],
	 *     loaded: false
	 *   }
	 *   fetchDataForStore((data) => {
	 *     store.items = data;
	 *     store.loaded = true;
	 *   })
	 *   whenWithTimeout(
	 *     () => store.loaded
	 *     () => t.end()
	 *     2000,
	 *     () => t.fail("store didn't load with 2 secs")
	 *   )
	 * })
	 *
	 *
	 * @export
	 * @param {() => boolean} expr see when, the expression to await
	 * @param {() => void} action see when, the action to execut when expr returns truthy
	 * @param {number} [timeout=10000] maximum amount when spends waiting before giving up
	 * @param {any} [onTimeout=() => {}] the ontimeout handler will be called if the condition wasn't met within the given time
	 * @returns {IDisposer} disposer function that can be used to cancel the when prematurely. Neither action or onTimeout will be fired if disposed
	 */


	function whenWithTimeout(expr, action$$1, timeout, onTimeout) {
	  if (timeout === void 0) {
	    timeout = 10000;
	  }

	  if (onTimeout === void 0) {
	    onTimeout = function () {};
	  }

	  deprecated("whenWithTimeout is deprecated, use mobx.when with timeout option instead");
	  return when$$1(expr, action$$1, {
	    timeout: timeout,
	    onError: onTimeout
	  });
	}
	/**
	 * MobX normally suspends any computed value that is not in use by any reaction,
	 * and lazily re-evaluates the expression if needed outside a reaction while not in use.
	 * `keepAlive` marks a computed value as always in use, meaning that it will always fresh, but never disposed automatically.
	 *
	 * @example
	 * const obj = observable({
	 *   number: 3,
	 *   doubler: function() { return this.number * 2 }
	 * })
	 * const stop = keepAlive(obj, "doubler")
	 *
	 * @param {Object} target an object that has a computed property, created by `@computed` or `extendObservable`
	 * @param {string} property the name of the property to keep alive
	 * @returns {IDisposer} stops this keep alive so that the computed value goes back to normal behavior
	 */

	/**
	 * @example
	 * const number = observable(3)
	 * const doubler = computed(() => number.get() * 2)
	 * const stop = keepAlive(doubler)
	 * // doubler will now stay in sync reactively even when there are no further observers
	 * stop()
	 * // normal behavior, doubler results will be recomputed if not observed but needed, but lazily
	 *
	 * @param {IComputedValue<any>} computedValue created using the `computed` function
	 * @returns {IDisposer} stops this keep alive so that the computed value goes back to normal behavior
	 */


	function keepAlive(_1, _2) {
	  var computed$$1 = getAtom$$1(_1, _2);
	  if (!computed$$1) throw new Error("No computed provided, please provide an object created with `computed(() => expr)` or an object + property name");
	  return computed$$1.observe(function () {});
	}
	/**
	 * `queueProcessor` takes an observable array, observes it and calls `processor`
	 * once for each item added to the observable array, optionally deboucing the action
	 *
	 * @example
	 * const pendingNotifications = observable([])
	 * const stop = queueProcessor(pendingNotifications, msg => {
	 *   // show Desktop notification
	 *   new Notification(msg);
	 * })
	 *
	 * // usage:
	 * pendingNotifications.push("test!")
	 *
	 * @param {T[]} observableArray observable array instance to track
	 * @param {(item: T) => void} processor action to call per item
	 * @param {number} [debounce=0] optional debounce time in ms. With debounce 0 the processor will run synchronously
	 * @returns {IDisposer} stops the processor
	 */


	function queueProcessor(observableArray, processor, debounce) {
	  if (debounce === void 0) {
	    debounce = 0;
	  }

	  if (!isObservableArray$$1(observableArray)) throw new Error("Expected observable array as first argument");
	  if (!isAction$$1(processor)) processor = action$$1("queueProcessor", processor);

	  var runner = function () {
	    // construct a final set
	    var items = observableArray.slice(0); // clear the queue for next iteration

	    runInAction$$1(function () {
	      return observableArray.splice(0);
	    }); // fire processor

	    items.forEach(processor);
	  };

	  if (debounce > 0) return autorun$$1(runner, {
	    delay: debounce
	  });else return autorun$$1(runner);
	}
	/**
	 * `chunkProcessor` takes an observable array, observes it and calls `processor`
	 * once for a chunk of items added to the observable array, optionally deboucing the action.
	 * The maximum chunk size can be limited by number.
	 * This allows both, splitting larger into smaller chunks or (when debounced) combining smaller
	 * chunks and/or single items into reasonable chunks of work.
	 *
	 * @example
	 * const trackedActions = observable([])
	 * const stop = chunkProcessor(trackedActions, chunkOfMax10Items => {
	 *   sendTrackedActionsToServer(chunkOfMax10Items);
	 * }, 100, 10)
	 *
	 * // usage:
	 * trackedActions.push("scrolled")
	 * trackedActions.push("hoveredButton")
	 * // when both pushes happen within 100ms, there will be only one call to server
	 *
	 * @param {T[]} observableArray observable array instance to track
	 * @param {(item: T[]) => void} processor action to call per item
	 * @param {number} [debounce=0] optional debounce time in ms. With debounce 0 the processor will run synchronously
	 * @param {number} [maxChunkSize=0] optionally do not call on full array but smaller chunks. With 0 it will process the full array.
	 * @returns {IDisposer} stops the processor
	 */


	function chunkProcessor(observableArray, processor, debounce, maxChunkSize) {
	  if (debounce === void 0) {
	    debounce = 0;
	  }

	  if (maxChunkSize === void 0) {
	    maxChunkSize = 0;
	  }

	  if (!isObservableArray$$1(observableArray)) throw new Error("Expected observable array as first argument");
	  if (!isAction$$1(processor)) processor = action$$1("chunkProcessor", processor);

	  var runner = function () {
	    var _loop_1 = function () {
	      var chunkSize = maxChunkSize === 0 ? observableArray.length : Math.min(observableArray.length, maxChunkSize); // construct a final set

	      var items = observableArray.slice(0, chunkSize); // clear the slice for next iteration

	      runInAction$$1(function () {
	        return observableArray.splice(0, chunkSize);
	      }); // fire processor

	      processor(items);
	    };

	    while (observableArray.length > 0) {
	      _loop_1();
	    }
	  };

	  if (debounce > 0) return autorun$$1(runner, {
	    delay: debounce
	  });else return autorun$$1(runner);
	}

	var tickers = {};
	/**
	 * Returns the current date time as epoch number.
	 * The date time is read from an observable which is updated automatically after the given interval.
	 * So basically it treats time as an observable.
	 *
	 * The function takes an interval as parameter, which indicates how often `now()` will return a new value.
	 * If no interval is given, it will update each second. If "frame" is specified, it will update each time a
	 * `requestAnimationFrame` is available.
	 *
	 * Multiple clocks with the same interval will automatically be synchronized.
	 *
	 * Countdown example: https://jsfiddle.net/mweststrate/na0qdmkw/
	 *
	 * @example
	 *
	 * const start = Date.now()
	 *
	 * autorun(() => {
	 *   console.log("Seconds elapsed: ", (mobxUtils.now() - start) / 1000)
	 * })
	 *
	 *
	 * @export
	 * @param {(number | "frame")} [interval=1000] interval in milliseconds about how often the interval should update
	 * @returns
	 */

	function now(interval) {
	  if (interval === void 0) {
	    interval = 1000;
	  }

	  if (!isComputingDerivation$$1()) {
	    // See #40
	    return Date.now();
	  }

	  if (!tickers[interval]) {
	    if (typeof interval === "number") tickers[interval] = createIntervalTicker(interval);else tickers[interval] = createAnimationFrameTicker();
	  }

	  return tickers[interval].current();
	}

	function createIntervalTicker(interval) {
	  var subscriptionHandle;
	  return fromResource(function (sink) {
	    subscriptionHandle = setInterval(function () {
	      return sink(Date.now());
	    }, interval);
	  }, function () {
	    clearInterval(subscriptionHandle);
	  }, Date.now());
	}

	function createAnimationFrameTicker() {
	  var frameBasedTicker = fromResource(function (sink) {
	    function scheduleTick() {
	      window.requestAnimationFrame(function () {
	        sink(Date.now());
	        if (frameBasedTicker.isAlive()) scheduleTick();
	      });
	    }

	    scheduleTick();
	  }, function () {}, Date.now());
	  return frameBasedTicker;
	}

	var __assign$1 = Object.assign || function (t) {
	  for (var s, i = 1, n = arguments.length; i < n; i++) {
	    s = arguments[i];

	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	  }

	  return t;
	};
	/**
	 * _deprecated_ this functionality can now be found as `flow` in the mobx package. However, `flow` is not applicable as decorator, where `asyncAction` still is.
	 *
	 *
	 *
	 * `asyncAction` takes a generator function and automatically wraps all parts of the process in actions. See the examples below.
	 * `asyncAction` can be used both as decorator or to wrap functions.
	 *
	 * - It is important that `asyncAction should always be used with a generator function (recognizable as `function*` or `*name` syntax)
	 * - Each yield statement should return a Promise. The generator function will continue as soon as the promise settles, with the settled value
	 * - When the generator function finishes, you can return a normal value. The `asyncAction` wrapped function will always produce a promise delivering that value.
	 *
	 * When using the mobx devTools, an asyncAction will emit `action` events with names like:
	 * * `"fetchUsers - runid: 6 - init"`
	 * * `"fetchUsers - runid: 6 - yield 0"`
	 * * `"fetchUsers - runid: 6 - yield 1"`
	 *
	 * The `runId` represents the generator instance. In other words, if `fetchUsers` is invoked multiple times concurrently, the events with the same `runid` belong toghether.
	 * The `yield` number indicates the progress of the generator. `init` indicates spawning (it won't do anything, but you can find the original arguments of the `asyncAction` here).
	 * `yield 0` ... `yield n` indicates the code block that is now being executed. `yield 0` is before the first `yield`, `yield 1` after the first one etc. Note that yield numbers are not determined lexically but by the runtime flow.
	 *
	 * `asyncActions` requires `Promise` and `generators` to be available on the target environment. Polyfill `Promise` if needed. Both TypeScript and Babel can compile generator functions down to ES5.
	 *
	 *  N.B. due to a [babel limitation](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy/issues/26), in Babel generatos cannot be combined with decorators. See also [#70](https://github.com/mobxjs/mobx-utils/issues/70)
	 *
	 *
	 * @example
	 * import {asyncAction} from "mobx-utils"
	 *
	 * let users = []
	 *
	 * const fetchUsers = asyncAction("fetchUsers", function* (url) {
	 *   const start = Date.now()
	 *   const data = yield window.fetch(url)
	 *   users = yield data.json()
	 *   return start - Date.now()
	 * })
	 *
	 * fetchUsers("http://users.com").then(time => {
	 *   console.dir("Got users", users, "in ", time, "ms")
	 * })
	 *
	 * @example
	 * import {asyncAction} from "mobx-utils"
	 *
	 * mobx.configure({ enforceActions: "observed" }) // don't allow state modifications outside actions
	 *
	 * class Store {
	 * 	\@observable githubProjects = []
	 * 	\@state = "pending" // "pending" / "done" / "error"
	 *
	 * 	\@asyncAction
	 * 	*fetchProjects() { // <- note the star, this a generator function!
	 * 		this.githubProjects = []
	 * 		this.state = "pending"
	 * 		try {
	 * 			const projects = yield fetchGithubProjectsSomehow() // yield instead of await
	 * 			const filteredProjects = somePreprocessing(projects)
	 * 			// the asynchronous blocks will automatically be wrapped actions
	 * 			this.state = "done"
	 * 			this.githubProjects = filteredProjects
	 * 		} catch (error) {
	 * 			this.state = "error"
	 * 		}
	 * 	}
	 * }
	 *
	 * @export
	 * @returns {Promise}
	 */


	function asyncAction(arg1, arg2) {
	  // decorator
	  if (typeof arguments[1] === "string") {
	    var name_1 = arguments[1];
	    var descriptor_1 = arguments[2];

	    if (descriptor_1 && descriptor_1.value) {
	      return Object.assign({}, descriptor_1, {
	        value: flow$$1(descriptor_1.value)
	      });
	    } else {
	      return Object.assign({}, descriptor_1, {
	        set: function (v) {
	          Object.defineProperty(this, name_1, __assign$1({}, descriptor_1, {
	            value: flow$$1(v)
	          }));
	        }
	      });
	    }
	  } // direct invocation


	  var generator = typeof arg1 === "string" ? arg2 : arg1;
	  deprecated("asyncAction is deprecated. use mobx.flow instead");
	  return flow$$1(generator); // name get's dropped..
	}
	/**
	 * _deprecated_ whenAsync is deprecated, use mobx.when without effect instead.
	 *
	 * Like normal `when`, except that this `when` will return a promise that resolves when the expression becomes truthy
	 *
	 * @example
	 * await whenAsync(() => !state.someBoolean)
	 *
	 * @export
	 * @param {() => boolean} fn see when, the expression to await
	 * @param {number} timeout maximum amount of time to wait, before the promise rejects
	 * @returns Promise for when an observable eventually matches some condition. Rejects if timeout is provided and has expired
	 */


	function whenAsync(fn, timeout) {
	  if (timeout === void 0) {
	    timeout = 0;
	  }

	  deprecated("whenAsync is deprecated, use mobx.when without effect instead");
	  return when$$1(fn, {
	    timeout: timeout
	  });
	}
	/**
	 * expr can be used to create temporarily views inside views.
	 * This can be improved to improve performance if a value changes often, but usually doesn't affect the outcome of an expression.
	 *
	 * In the following example the expression prevents that a component is rerender _each time_ the selection changes;
	 * instead it will only rerenders when the current todo is (de)selected.
	 *
	 * @example
	 * const Todo = observer((props) => {
	 *     const todo = props.todo;
	 *     const isSelected = mobxUtils.expr(() => props.viewState.selection === todo);
	 *     return <div className={isSelected ? "todo todo-selected" : "todo"}>{todo.title}</div>
	 * });
	 *
	 */


	function expr(expr) {
	  if (!isComputingDerivation$$1()) console.warn("'expr' should only be used inside other reactive functions."); // optimization: would be more efficient if the expr itself wouldn't be evaluated first on the next change, but just a 'changed' signal would be fired

	  return computed$$1(expr).get();
	}

	var memoizationId = 0;
	/**
	 * Creates a function that maps an object to a view.
	 * The mapping is memoized.
	 *
	 * See: https://mobx.js.org/refguide/create-transformer.html
	 */

	function createTransformer(transformer, onCleanup) {
	  invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument"); // Memoizes: object id -> reactive view that applies transformer to the object

	  var views = {};

	  function createView(sourceIdentifier, sourceObject) {
	    var latestValue;
	    var expr = computed$$1(function () {
	      return latestValue = transformer(sourceObject);
	    }, {
	      name: "Transformer-" + transformer.name + "-" + sourceIdentifier
	    });
	    var disposer = onBecomeUnobserved$$1(expr, function () {
	      delete views[sourceIdentifier];
	      disposer();
	      if (onCleanup) onCleanup(latestValue, sourceObject);
	    });
	    return expr;
	  }

	  return function (object) {
	    var identifier = getMemoizationId(object);
	    var reactiveView = views[identifier];
	    if (reactiveView) return reactiveView.get(); // Not in cache; create a reactive view

	    reactiveView = views[identifier] = createView(identifier, object);
	    return reactiveView.get();
	  };
	}

	function getMemoizationId(object) {
	  var objectType = typeof object;
	  if (objectType === "string") return "string:" + object;
	  if (objectType === "number") return "number:" + object;
	  if (object === null || objectType !== "object" && objectType !== "function") throw new Error("[mobx-utils] transform expected an object, function, string or number, got: " + String(object));
	  var tid = object.$transformId;

	  if (tid === undefined) {
	    tid = "memoizationId:" + ++memoizationId;
	    addHiddenProp(object, "$transformId", tid);
	  }

	  return tid;
	}

	function buildPath(entry) {
	  var res = [];

	  while (entry.parent) {
	    res.push(entry.path);
	    entry = entry.parent;
	  }

	  return res.reverse().join("/");
	}
	/**
	 * Given an object, deeply observes the given object.
	 * It is like `observe` from mobx, but applied recursively, including all future children
	 *
	 * Note that the given object cannot ever contain cycles and should be a tree.
	 *
	 * As benefit: path and root will be provided in the callback, so the signature of the listener is
	 * (change, path, root) => void
	 *
	 * The returned disposer can be invoked to clean up the listener
	 *
	 * deepObserve cannot be used on computed values.
	 *
	 * @example
	 * const disposer = deepObserve(target, (change, path) => {
	 *    console.dir(change)
	 * })
	 */


	function deepObserve(target, listener) {
	  var entrySet = new WeakMap();

	  function genericListener(change) {
	    var entry = entrySet.get(change.object);
	    processChange(change, entry);
	    listener(change, buildPath(entry), target);
	  }

	  function processChange(change, parent) {
	    switch (change.type) {
	      // Object changes
	      case "add":
	        // also for map
	        observeRecursively(change.newValue, parent, change.name);
	        break;

	      case "update":
	        // also for array and map
	        unobserveRecursively(change.oldValue);
	        observeRecursively(change.newValue, parent, change.name || "" + change.index);
	        break;

	      case "remove": // object

	      case "delete":
	        // map
	        unobserveRecursively(change.oldValue);
	        break;
	      // Array changes

	      case "splice":
	        change.removed.map(unobserveRecursively);
	        change.added.forEach(function (value, idx) {
	          return observeRecursively(value, parent, "" + (change.index + idx));
	        }); // update paths

	        for (var i = change.index + change.addedCount; i < change.object.length; i++) {
	          var entry = entrySet.get(change.object[i]);
	          if (entry) entry.path = "" + i;
	        }

	        break;
	    }
	  }

	  function observeRecursively(thing, parent, path) {
	    if (isObservableObject$$1(thing) || isObservableArray$$1(thing) || isObservableMap$$1(thing)) {
	      if (entrySet.has(thing)) {
	        var entry = entrySet.get(thing);
	        if (entry.parent !== parent || entry.path !== path) // MWE: this constraint is artificial, and this tool could be made to work with cycles,
	          // but it increases administration complexity, has tricky edge cases and the meaning of 'path'
	          // would become less clear. So doesn't seem to be needed for now
	          throw new Error("The same observable object cannot appear twice in the same tree, trying to assign it to '" + buildPath(parent) + "/" + path + "', but it already exists at '" + buildPath(entry.parent) + "/" + entry.path + "'");
	      } else {
	        var entry_1 = {
	          parent: parent,
	          path: path,
	          dispose: observe$$1(thing, genericListener)
	        };
	        entrySet.set(thing, entry_1);
	        entries$$1(thing).forEach(function (_a) {
	          var key = _a[0],
	              value = _a[1];
	          return observeRecursively(value, entry_1, key);
	        });
	      }
	    }
	  }

	  function unobserveRecursively(thing) {
	    var entry = entrySet.get(thing);
	    if (!entry) return;
	    entrySet.delete(thing);
	    entry.dispose();
	    values$$1(thing).forEach(unobserveRecursively);
	  }

	  observeRecursively(target, undefined, "");
	  return function () {
	    unobserveRecursively(target);
	  };
	}

	var mobxUtils_module = /*#__PURE__*/Object.freeze({
		PENDING: PENDING,
		FULFILLED: FULFILLED,
		REJECTED: REJECTED,
		fromPromise: fromPromise,
		isPromiseBasedObservable: isPromiseBasedObservable,
		moveItem: moveItem,
		lazyObservable: lazyObservable,
		fromResource: fromResource,
		toStream: toStream,
		fromStream: fromStream,
		ViewModel: ViewModel,
		createViewModel: createViewModel,
		whenWithTimeout: whenWithTimeout,
		keepAlive: keepAlive,
		queueProcessor: queueProcessor,
		chunkProcessor: chunkProcessor,
		now: now,
		NOOP: NOOP,
		IDENTITY: IDENTITY,
		invariant: invariant,
		deprecated: deprecated,
		addHiddenProp: addHiddenProp,
		asyncAction: asyncAction,
		whenAsync: whenAsync,
		expr: expr,
		createTransformer: createTransformer,
		deepObserve: deepObserve
	});

	var DataWindowManager_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-Datasource';
	/**
	 * A Loader is used as a functional interface to load a range of data
	 * @callback Loader - Loader from which to load items
	 * @param {number} start - start item to load
	 * @param {number} size - number of items to load
	 * @returns {DataWindow} data window that includes the loaded data
	 */

	/**
	 * A DataWindow is a structure that holds information about the window/page of data
	 * @typedef {object} DataWindow - a window (or page) of data
	 * @property {number} start - start index of the window
	 * @property {number} end - end index of the window
	 * @property {boolean} filled - is the data window fully loaded
	 * @property {number} size - the size of window
	 * @property {array<object>} items - the items for this window
	 */

	/**
	 * Manages a window of data for a DataSource.  A DataWindow is a block of data.
	 */

	class DataWindowManager {
	  constructor(windowSize, itemInstrumenter) {
	    this.windows = [];
	    this.windowSize = windowSize || 50;
	    this.itemInstrumenter = itemInstrumenter;
	  }
	  /**
	   * Loads a range of data using the Loader.  It may end up loading multiple windows of data in order to fulfill the complete range.
	   *
	   * @param {Loader} loader - Loader from which to load items.
	   * @param {number} start - Index to start loading from.
	   * @param {number} size - Number of items to load.
	   * @returns {Array.object} - The loaded items.
	   */


	  async load(loader, start, size) {
	    let startWindow = this.getWindowIndexForRow(start);
	    let endWindow = this.getWindowIndexForRow(start + (size - 1));
	    let loaders = [];

	    _Log.default.t(TAG, 'Loading items %s items starting at %s', size, start);

	    _Log.default.t(TAG, 'Loading windowed items from window %s to window %s with window size of %s', startWindow, endWindow, this.windowSize);

	    for (let w = startWindow; w <= endWindow; w += this.windowSize) {
	      loaders.push(this.loadWindow(loader, w));
	    }

	    let results = await Promise.all(loaders);
	    let items = []; // istanbul ignore next - sanity checking

	    if (Array.isArray(results[0])) {
	      throw new Error('Expected a DataWindow object but got an array.  Your loader method should return a window.');
	    }

	    items.push(...this.resolveItemsInWindow(results[0], start, size));

	    for (let i = 1; i < results.length; i++) {
	      items.push(...this.resolveItemsInWindow(results[i], results[i].start, size - items.length));
	    }

	    return items;
	  }
	  /**
	   * Clears the windows containing the indexes.
	   *
	   * @param {Array} indexes - Array of indexes to clear.
	   */


	  clearWindowsForIndexes(indexes) {
	    // istanbul ignore else
	    if (indexes) {
	      indexes.forEach(i => {
	        let w = this.getWindowIndexForRow(i);

	        _Log.default.t(TAG, 'Clearing window %s with index %s', w, i);

	        this.windows[w] = null;
	      });
	    }
	  }
	  /**
	   * Given the window, resolve the item list based on the start index and the count of items.
	   *
	   * @param {DataWindow} window - Data window.
	   * @param {number} itemStart - Item start index.
	   * @param {number} size - Count of items to load from the window.
	   * @returns {Array} - The list of size {size} items from the data window, starting from index itemStart.
	   */


	  resolveItemsInWindow(window, itemStart, size) {
	    _Log.default.t(TAG, 'Resolving Window Items: window start: %s, item start: %s, size: %s', window.start, itemStart, size);

	    let items = [];
	    items.push(...window.items.slice(itemStart - window.start, itemStart - window.start + size));
	    return items;
	  }
	  /**
	   * Loads a window of data.
	   *
	   * @param {Loader} loader - Loader from which to load the items.
	   * @param {number} start - Start index of the item to load.
	   * @returns {DataWindow} - The loaded window.
	   */


	  async loadWindow(loader, start) {
	    // check if we already have this window, and that the window is filled
	    let existingWindow = this.getWindow(start);
	    if (existingWindow && existingWindow.filled) return existingWindow; // load the window

	    let resp = await loader(start, this.windowSize); // istanbul ignore next - sanity checking

	    if (Array.isArray(resp)) {
	      throw new Error('DataWindowManager got an array back from the Loader, but it should be a DataWindow object.  This is a programmer error.');
	    }

	    if (!resp || !Array.isArray(resp.items)) {
	      _Log.default.t(TAG, 'No loaded items for start: %s, or response was not an array.  Response was', start, resp);

	      let window = {
	        start: start,
	        end: start,
	        items: [],
	        size: 0,
	        filled: true
	      };
	      this.setWindow(window);
	    } else if (resp.start !== start) {
	      /* istanbul ignore next */
	      _Log.default.w(TAG, 'DataWindowManager asked for a window starting at %s but got back a window starting %s.  The DataAdapter should manage this better.  This can lead to data issues.', start, resp.start);
	      /* istanbul ignore next */


	      this.createWindow(start, this.instrumentItems(resp.items));
	    } else {
	      this.createWindow(start, this.instrumentItems(resp.items));
	    }

	    return this.windows[start];
	  }
	  /**
	   * If an item intrumenter was passed, then as the items are loaded, they are intrumented.
	   * 
	   * @param {Array} items - Items to instrument.
	   * @returns {Array} Array of items.
	   * @private
	   */


	  instrumentItems(items) {
	    if (!items) return;
	    if (!this.itemInstrumenter) return items;
	    items = items.map(item => {
	      return this.itemInstrumenter(item);
	    });
	    return items;
	  }
	  /**
	   * Set/store this window in our managed windows array.
	   *
	   * @param {DataWindow} window - Window to be set.
	   */


	  setWindow(window) {
	    this.windows[window.start] = window;
	    this.hasMoreWindows = !window.filled;
	  }
	  /**
	   * Gets the window for the given start index.
	   *
	   * @param {number} start - Start index of the window.
	   * @returns {DataWindow} - The window at the specified index.
	   */


	  getWindow(start) {
	    return this.windows[start];
	  }
	  /**
	   * Create a window for the given start index and item array.
	   *
	   * @param {number} start - Start index of the window.
	   * @param {Array.object} items - Item array.
	   */


	  createWindow(start, items) {
	    let size = this.windowSize;

	    _Log.default.t(TAG, 'Creating window: start: %s, size: %s', start, size);

	    if (items.length > size) {
	      let window = {
	        start: start,
	        end: start + (size - 1),
	        size: size,
	        filled: true,
	        items: items.slice(0, size)
	      };
	      this.setWindow(window); // create a new window for the remainder

	      this.createWindow(start + size, items.slice(size));
	    } else {
	      let window = {
	        start: start,
	        size: items.length,
	        filled: items.length === size,
	        items: items
	      };
	      this.setWindow(window);
	    }
	  }
	  /**
	   * For the given row, return the window index.  Ie, if our window was from 0-9 and we passed 5, it would return 0, since the window index for that row is 0.
	   *
	   * @param {number} row - Row to find the window for.
	   * @returns {number} - The index of the window that covers the specified row.
	   */


	  getWindowIndexForRow(row) {
	    return Math.floor(row / this.windowSize) * this.windowSize;
	  }
	  /**
	   * Returns true if that row is loaded and we have it.
	   *
	   * @param {number} row - The row in question.
	   * @returns {boolean} - True if the row is covered by a window and the row is loaded.
	   */


	  isRowLoaded(row) {
	    let window = this.getWindow(this.getWindowIndexForRow(row));
	    if (!window) return false;
	    return row <= window.start + (window.size - 1);
	  }
	  /**
	   * Fetches a loaded row.
	   *
	   * @param {number} row - Row index to return.
	   * @returns {Object} Row if loaded, otherwise, null.
	   */


	  get(row) {
	    let window = this.getWindow(this.getWindowIndexForRow(row)); // istanbul ignore if

	    if (!window) return null;
	    return window.items[row - window.start];
	  }
	  /**
	   * Clears the loaded data.
	   *
	   * @returns {void}
	   */


	  clear() {
	    this.windows.length = 0;
	  }
	  /**
	   * @returns {number} Count of total loaded items.
	   */


	  getLoadedCount() {
	    let count = 0;
	    this.windows.forEach(w => {
	      count += w.size;
	    });
	    return count;
	  }

	}

	var _default = DataWindowManager;
	exports.default = _default;
	});

	unwrapExports(DataWindowManager_1);

	var Datasource_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _Controllable = _interopRequireDefault(Controllable_1);







	var _DataWindowManager = _interopRequireDefault(DataWindowManager_1);

	var _Debouncer = _interopRequireDefault(Debouncer_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	const TAG = Constants.framework + '-Datasource'; // Datasource is going to be a large file

	/* eslint max-lines: off */

	const DEFAULT_PAGESIZE = 50;
	/**
	 * DatasourceOptions are the options that are passed to the Datasource when we create it.
	 * @typedef {object} DatasourceOptions - Options for the datasource
	 * @property {string} name - friendly name of this datasource.  Mainly used for logging.
	 * @property {number} pageSize - data page size when requesting windows of data
	 * @property {'single'|'multiple'|'none'} selectionMode='multiple' - selection model of the datasource. one of multiple, single, or none
	 * @property {string} selectedAttribute - attribute on a row in which the selection state will be stored/read
	 * @property {boolean} selectionRequired=false - if true, then at least 1 selected item must be set, and cannot be unset
	 * @property {string} idAttribute - attribute on a row from which the unique ID of the row can be determined
	 * @property {Query} query - base query for the datasource.  The .load() method can override the query, but, this will be the base for all querries if provided.
	 */

	/**
	 * Defines an ENUM for sort direction
	 * @typedef {"ascending" | "descending"} SortEnum
	 */

	/**
	 * OrderBy is a structure that holds a sort field and the sort direction
	 * @typedef {object} OrderBy - Order By Configuration
	 * @property {string} field - Field on which to order by
	 * @property {SortEnum} sort='ascending' - Sort direction
	 */

	/**
	 * A Query is an object that contains the information needed to apply a query against a datasource.
	 * @typedef {object} Query - Datasource Query
	 * @property {number} pageSize - page size of the data to return (ie, number of items to return)
	 * @property {number} start - starting index of the data to return
	 * @property {string} searchText - search text to apply across the entire data
	 * @property {array<string>} searchAttributes - search text to apply across these fields. If blank, up to DataAdapter to decide.
	 * @property {array<string>} select - fields to select (return).  If empty then the Adpater can choose what to return
	 * @property {object} qbe - qbe filter where each object key is the field name and value is the query, such as `wonum: '1000'`
	 * @property {string} where - data adapter specific 'where' clause.
	 * @property {array<OrderBy>} orderBy - order by
	 */

	/**
	 * SelectionState holds the state of the currently selected items in a Datasource
	 * @typedef {object} SelectionState
	 * @property {"none"|"single"|"multiple"} mode - selection mode for the datasource items
	 * @property {number} count - count of items currently selected
	 * @property {string} selectedAttribute="_selected" - attribute in the row that holds the selection state
	 * @property {boolean} required - true if at least 1 item must be selected
	 */

	/**
	 * CurrentSortState holds the state of the current sort for the datasource
	 * @typedef {object} CurrentSortState
	 * @property {string} attribute - currently sorted attribute/column
	 * @property {SortEnum} direction="ascending" - current sort directionality
	 *
	 * SortState holds the sort state for the datasource
	 * @typedef {object} SortState
	 * @property {CurrentSortState} current - current sort start
	 * @property {array<string>} - columns/attributes that can be sorted
	 */

	/**
	 * The stateful properties of the Datasource
	 * @typedef {object} DatasourceState - Stateful information about the Datasource
	 * @property {number} pageSize=50 - page size of the data in the datasource
	 * @property {number} pageCount - if known, the number of total pages that can be accessed
	 * @property {number} page - if known, the current page that is loaded in the datasource
	 * @property {number} itemCount - the number of items loaded in the datasource
	 * @property {number} totalCount - total count of items that can be loaded in the datasource
	 * @property {boolean} loading - true when the datasource is loading data
	 * @property {boolean} hasData - true when the datasource has done loading.  The item count may still be 0
	 * @property {object} error - will be set to an error object in the event of an error.  It will be cleared on the next load()
	 * @property {string} currentSearch - if the datasource was supplied a broad text search, the search text will be stored here
	 * @property {object} qbe - Column filtering object in QBE format, where each key is the column, and the value is the filter.
	 * @property {string} idAttribute="_id" - the name of the ID field for the item row data
	 * @property {number} changedFlag - flag will increment when the items array changes
	 * @property {SelectionState} selection - selection state of the datasource
	 * @property {SortState} sort - sort sate of the datasource
	 */

	/**
	 * @typedef DataTypeEnum - Implementation of an enum with possible datatypes
	 * @property {string} ALN
	 * @property {double} AMOUNT
	 * @property {number} BIGINT
	 * @property {object} BLOB
	 * @property {object} CLOB
	 * @property {date} DATE
	 * @property {date} DATETIME
	 * @property {double} DECIMAL
	 * @property {double} DURATION
	 * @property {number} INTEGER
	 * @property {string} LONGALN
	 * @property {string} LOWER
	 * @property {string} UPPER
	 * @property {boolean} YORN
	 */

	const DataTypeEnum = {
	  ALN: 'ALN',
	  AMOUNT: 'AMOUNT',
	  BIGINT: 'BIGINT',
	  BLOB: 'BLOB',
	  CLOB: 'CLOB',
	  DATE: 'DATE',
	  DATETIME: 'DATETIME',
	  DECIMAL: 'DECIMAL',
	  DURATION: 'DURATION',
	  INTEGER: 'INTEGER',
	  LONGALN: 'LONGALN',
	  LOWER: 'LOWER',
	  UPPER: 'UPPER',
	  YORN: 'YORN'
	};
	/**
	 * Datasource manages the lifecycle for a sounce of data.  The data fetched using a query, and from that point, the datasource
	 * can manage changes and updates to the data.  Specific DataAdapter implementations will load and update data in different ways.
	 *
	 * @fires before-load-data before a fetch happens, passing the datasource and the current query
	 * @fires after-load-data after the fetch happens and the response is good, passing the datasource and the response and query
	 * @fires load-data-failed if the fetch operation fails, passing the error, datasource, and query
	 *
	 * @extends Controllable
	 */

	class Datasource extends _Controllable.default {
	  /**
	   * A Datasource will manage the DataAdapter fetching items as needed.
	   *
	   * @param {DataAdapter} dataAdapter - Adapter to use when reading and updating data.
	   * @param {DatasourceOptions} options - Datasource options.
	   */
	  constructor(dataAdapter) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    super(options);
	    this.options = options;
	    /**
	     * DataAdapter being used by the Datasource.  Typically the DataAdapter should not be directly accessed, but rather,
	     * methods and propertes of the Datasource should be accessed.
	     * @type DataAdapter
	     */

	    this.dataAdapter = dataAdapter;
	    /**
	     * Datatype enum
	     */

	    this.DataTypeEnum = DataTypeEnum; // we need self aliased here so that we can referent 'this' inside a getter property in the state

	    /* eslint consistent-this: off */

	    let self = this;
	    /**
	     * The stateful properties of the DataSource
	     * @type DatasourceState
	     */

	    this.state = mobx_module.observable.object({
	      pageSize: options.pageSize || DEFAULT_PAGESIZE,
	      pageCount: 0,
	      page: 0,
	      itemCount: 0,
	      totalCount: 0,
	      loading: false,
	      hasData: false,
	      error: null,
	      currentSearch: '',
	      qbe: {},
	      sort: {
	        current: {
	          direction: null,
	          attribute: null
	        },
	        attributes: []
	      },
	      selection: {
	        mode: options.selectionMode || 'multiple',
	        count: 0,
	        attribute: options.selectedAttribute || '_selected',
	        required: options.selectionRequired,
	        selected: {}
	      },
	      idAttribute: options.idAttribute || '_id',
	      changedFlag: 0,

	      get currentItemIndex() {
	        return self.currentItemIndex;
	      }

	    }); // store the base query so that we can use it later

	    this.baseQuery = options.query || {}; // last know query of the datasource

	    this.lastQuery = {}; // manage the mappings of IDs to indexes

	    this.idIndex = {}; // manage data windows

	    this.dataWindows = new _DataWindowManager.default(options.pageSize, this.itemInstrumenter.bind(this)); // This logs out every change that happens to the state of the datasource
	    // eventually we'll configure it to be an option, but for now, since
	    // datasources are so new, we'll always keep it on

	    this.debugStateChanges = true; // istanbul ignore else

	    if (this.debugStateChanges) {
	      (0, mobxUtils_module.deepObserve)(this.state, change => {
	        _Log.default.t(TAG, 'Datasource State Change', change);
	      });
	    }

	    this.name = options.name; // if load is called many times, then debounce the calls

	    this.loadDebouncer = new _Debouncer.default(options.debounceTime || 100); // Map of attribute aliaes for an item
	    // ie, we might map, 'locationnum' to 'object.location.locationnumber'

	    this.aliases = options.aliases || {}; // track the last accessed item

	    this.currentItem = null;
	    this.currentItemIndex = -1; // temp cache of items to optimize getItems()

	    this.__items = null;
	  }
	  /**
	   * Returns the last item accessed by the datasource.  Note, it will return null until an item is loaded and has been fetched using .get().
	   *
	   * @returns {Object} Last item accessed by the Datasource.
	   */


	  get item() {
	    if (this.currentItemIndex === -1) {
	      _Log.default.w(TAG, 'Accessing datasource item without first loading the item into the datasource.  Did you forget to call .get() or .load()?');

	      return this.itemInstrumenter({});
	    }

	    return this.currentItem;
	  }
	  /**
	   * Returns a list of the loaded items.
	   *
	   * @returns {Array<Object>} List of loaded items.
	   */


	  get items() {
	    return this.getItems();
	  }
	  /**
	   * Instruments an item adding to observable support and support for aliased fields.
	   *
	   * @param {Object} item - Item to instrument.
	   * @returns {Object} Item.
	   * @private
	   */


	  itemInstrumenter(item) {
	    // istanbul ignore else
	    if (this.aliases) {
	      Object.entries(this.aliases).forEach(_ref => {
	        let _ref2 = _slicedToArray(_ref, 2),
	            key = _ref2[0],
	            path = _ref2[1];

	        Reflect.defineProperty(item, key, {
	          configurable: true,
	          enumerable: true,

	          get() {
	            return (0, ObjectUtil.get)(this, path);
	          },

	          set(val) {
	            (0, ObjectUtil.set)(this, path, val);
	          }

	        });
	      });
	    } // make the item observable


	    item = mobx_module.observable.object(item); // istanbul ignore else

	    if (this.debugStateChanges) {
	      (0, mobxUtils_module.deepObserve)(item, change => {
	        _Log.default.t(TAG, 'Datasource Item Change', change);
	      });
	    }

	    return item;
	  }
	  /**
	   * Returns an array of the loaded items.
	   *
	   * @returns {Array} Currently loaded item array.
	   * @private
	   */


	  getItems() {
	    // we only rebuild this if we load new items.
	    if (this.__items) return this.__items;
	    let items = [];

	    _Log.default.t(TAG, 'Populating Items with %s items', this.state.itemCount);

	    for (let i = 0; i < this.state.itemCount; i++) {
	      // only add loaded items
	      // istanbul ignore else
	      if (this.isItemLoaded(i)) items.push(this.get(i));
	    }

	    _Log.default.t(TAG, 'Populated %s items', items.length);

	    this.__items = items;
	    return items;
	  }
	  /**
	   * Register Datasource Lifecycle events with this controller, if the controller supports those lifecycle events.
	   *
	   * @param {Controllable} controller - Controller to register.
	   * @override
	   */


	  registerLifecycleEvents(controller) {
	    super.registerLifecycleEvents(controller);

	    if (controller.onBeforeLoadData) {
	      this.on('before-load-data', controller.onBeforeLoadData.bind(controller));
	    }

	    if (controller.onAfterLoadData) {
	      this.on('after-load-data', controller.onAfterLoadData.bind(controller));
	    }

	    if (controller.onLoadDataFailed) {
	      this.on('load-data-failed', controller.onLoadDataFailed.bind(controller));
	    }

	    if (controller.onDatasourceInitialized) {
	      this.once('datasource-initialized', controller.onDatasourceInitialized.bind(controller));
	    }

	    this.on('delete-selected', this.deleteSelectedItems.bind(this));
	  }
	  /**
	   * Should be called when the page is initialized.  It will fire the page-initialized event.
	   *
	   * @fires page-initialized with this page instance and the application instance
	   */


	  initialize() {
	    //We need to set a boolean here so we don't initialize a page more than once
	    this.initialized = true; // we are not doing much, except telling others that we are initialized.  We pass a reference to ourself.

	    this.emit('datasource-initialized', this);
	  }
	  /**
	   * Clears the current state of the datasource.  This generally happens if the user is searching, filtering, sorting, etc, since, the internal state
	   * needs to be cleared to make way for new set of data.
	   */


	  clearState() {
	    (0, mobx_module.transaction)(() => {
	      this.idIndex = {};
	      this.dataWindows.clear();
	    });
	  }
	  /**
	   * Returns the item at the given index.  NOTE: in a datasource that is paged, the internal items array might be an array of 10 items starting at
	   * index 100.  So, if you get(100), we return the first item from the internal items array.
	   *
	   * @param {number} index - Item index.
	   * @returns {Object} - The item from the datas source or undefined if the item hasn't been loaded or is no longer in the datasource.
	   */


	  get(index) {
	    this.currentItemIndex = index;
	    this.currentItem = this.dataWindows.get(index);
	    return this.currentItem;
	  }
	  /**
	   * Searches and filters the datasource by searching for the text across all searchable fields.
	   * This delegates to the DataAdapter for the actual search.
	   *
	   * @param {string} text - Text to search for across any searchable fields.
	   */


	  async search(text) {
	    _Log.default.t(TAG, 'Searching for "%s"', text);

	    let query = _objectSpread({}, this.lastQuery, {
	      searchText: text
	    });

	    let items = await this.load(query);
	    (0, mobx_module.transaction)(() => {
	      this.state.currentSearch = text || '';
	    });
	    return items;
	  }
	  /**
	   * Searches the Datasource using a QBE (Query by Example) structure where each property in the QBE object is the field and the value is value to find.
	   *
	   * @param {Object} qbe - QBE field structure.
	   * @returns {Promise<Array>} Promise of the found items array.
	   */


	  async searchQBE(qbe) {
	    _Log.default.t(TAG, 'QBE Searching for', qbe);

	    let query = _objectSpread({}, this.lastQuery, {
	      searchText: '',
	      qbe: qbe
	    });

	    let items = await this.load(query);
	    (0, mobx_module.transaction)(() => {
	      this.state.qbe = qbe;
	    });
	    return items;
	  }
	  /**
	   * Sorts the datasource items.This delegates to the DataAdapter to do the actual sorting.
	   *
	   * @param {SortOptions} sortOptions - Directions on how to sort the items.
	   * @returns {Promise<Object[]>} - Promise containing the loaded items array.
	   */


	  async sort(sortOptions) {
	    _Log.default.t(TAG, 'Sorting', sortOptions);

	    let query = _objectSpread({}, this.lastQuery, {
	      start: 0,
	      orderBy: [{
	        field: sortOptions.attribute,
	        sort: sortOptions.direction || 'ascending'
	      }]
	    });

	    let items = await this.load(query);
	    (0, mobx_module.transaction)(() => {
	      this.state.sort.current.attribute = sortOptions.attribute;
	      this.state.sort.current.direction = sortOptions.direction || 'ascending';
	    });
	    return items;
	  }
	  /**
	   * Convenience method to toggle the current sort direction.
	   *
	   * @returns {Promise<Object[]>} - Promise containing the loaded items array.
	   */


	  toggleSortDirection() {
	    let sort = _objectSpread({}, this.state.sort.current);

	    sort.direction = sort.direction === 'ascending' ? 'descending' : 'ascending';
	    return this.sort(sort);
	  }
	  /**
	   * Given the index, find the item and toggle the selected attribute on that item.
	   *
	   * @param {number} index - Index of the item.
	   * @returns {void}
	   */


	  toggleSelected(index) {
	    this.setSelected(index, !this.isSelected(index));
	  }
	  /**
	   * Returns true if the item is selected.
	   *
	   * @param {number} index - Row index.
	   * @returns {boolean} Returns true if selected.
	   */


	  isSelected(index) {
	    return this.getSelectedItemById(this.getId(this.get(index)));
	  }
	  /**
	   * Returns the selected item by using the item id.
	   *
	   * @param {any} id - Item id.
	   * @returns {Object} - Returns selected item, or null/undefined.
	   */


	  getSelectedItemById(id) {
	    return this.state.selection.selected[id];
	  }
	  /**
	   * Returns the id of the given item by using the idAttribute of the item.
	   *
	   * @param {Object} item - Item.
	   * @returns {any} - Returns the id of the item, or null/undefined, if no item or no id on the the item.
	   */


	  getId(item) {
	    // istanbul ignore if - edge case, should never be null.
	    if (!item) throw new Error('Item cannot be null');
	    let id = item[this.state.idAttribute];

	    if (id === undefined) {
	      _Log.default.w(TAG, `No Id (${this.state.idAttribute}) for Item: : ${JSON.stringify(item)}`);

	      return '__NO_ID';
	    }

	    return id;
	  }
	  /**
	   * Clears the selection on all selected items.
	   *
	   * @param {Array} items - Array of items on which to clear the selection.
	   * @returns {void}
	   */


	  clearSelections() {
	    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelectedItems(); // clear the selection

	    (0, mobx_module.transaction)(() => {
	      items.forEach(e => {
	        e[this.state.selection.attribute] = false;
	      });
	      this.state.selection.selected = {};
	      this.state.selection.count = 0;
	    });
	  }
	  /**
	   * Given the index, find the item and set the selected attribute on that item.
	   *
	   * @param {number} index - Index of the item.
	   * @param {boolean} selectedVal - The value to set the selected attribute to.
	   * @returns {void} - Just returns if items cannot be selected (otherwise there is no return value).
	   */


	  setSelected(index, selectedVal) {
	    if (this.state.selection.mode === 'none') return;
	    (0, mobx_module.transaction)(() => {
	      if (this.state.selection.mode === 'none') return; // istanbul ignore else

	      if (this.state.selection.mode === 'single' && this.state.selection.count > 0) {
	        this.clearSelections();
	      }

	      let item = this.get(index);

	      if (selectedVal) {
	        this.state.selection.selected[this.getId(item)] = true;
	      } else {
	        Reflect.deleteProperty(this.state.selection.selected, this.getId(item));
	      }

	      item[this.state.selection.attribute] = selectedVal;
	      this.updateSelectionCount();
	    });
	  }
	  /**
	   * Delete all selected items from the Datasource.
	   *
	   * @returns {number} Number of items deleted.
	   */


	  async deleteSelectedItems() {
	    let items = this.getSelectedItems();
	    let count = await this.deleteItems(items); // istanbul ignore else

	    if (count > 0) this.clearSelections(items);
	    return count;
	  }
	  /**
	   * Deletes the array of items from the Datasource.  Note, deleting items on the datasource does force a reload of those pages that are affected,
	   * it it up to the caller to decide what to do after a delete.  The state of the datasource after a delete is that those items are removed,
	   * and the data windows holding those items are removed.  A call to isItemLoaded can be used to check if an item is still valid.
	   *
	   * @param {Array} items - Array of items to delete.
	   * @returns {number} Number of items deleted.
	   */


	  async deleteItems(items) {
	    let deletedCount = 0; // istanbul ignore else

	    if (items && items.length) {
	      deletedCount = await this.dataAdapter.batchDelete(items); // istanbul ignore else

	      if (deletedCount > 0) {
	        this.clearIndexes(items);
	      } // we now need to re-load the last query, to get the updated counts, etc.


	      await this.load();
	    }

	    return deletedCount;
	  }
	  /**
	   * Given the items, it removes those items from the managed index map and notifies the window manager to clear out the data windows for those indexes.
	   *
	   * @param {Array} items - Array of items to clear.
	   * @returns {void}
	   */


	  clearIndexes(items) {
	    // istanbul ignore else
	    if (items) {
	      // capture the indexes before we clear them out
	      let itemIndexes = items.map(e => this.getIndex(e)); // clean up the idIndex map

	      items.forEach(e => {
	        Reflect.deleteProperty(this.idIndex, this.getId(e));
	      }); // clear out the indexes

	      this.dataWindows.clearWindowsForIndexes(itemIndexes);
	    }
	  }
	  /**
	   * Updates the count of selected items.
	   */


	  updateSelectionCount() {
	    this.state.selection.count = Object.keys(this.state.selection.selected).length;
	  }
	  /**
	   * Returns an array of selected items from this datasource.
	   *
	   * @returns {Array.object} - All selected items.
	   */


	  getSelectedItems() {
	    return Object.keys(this.state.selection.selected).map(id => this.getById(id));
	  }
	  /**
	   * Gets an item from the loaded items in the datasource, by id.
	   *
	   * @param {string} id - The id of the item to get.
	   * @returns {Object} Found item, or null/undefined if not found.
	   */


	  getById(id) {
	    return this.get(this.idIndex[id]);
	  }
	  /**
	   * Gets the index of the given item.
	   *
	   * @param {Object} item - Item.
	   * @returns {number} Returns the item's index.
	   */


	  getIndex(item) {
	    return this.idIndex[this.getId(item)];
	  }
	  /**
	   * Loads the data into the datasource from the provided data adapter.  If the query does not have .start and .pageSize then the
	   * start is set to 0 and the pageSize is the set to the default page size.
	   *
	   * @fires before-load-data Before data is loaded.
	   * @fires after-load-data After the data is loaded.
	   * @fires load-data-failed If the data failed to load.
	   * @param {Query} query - DataAdapter query to pass to the data adapater.
	   * @returns {Promise<Object[]>} - Promise containing the loaded items array.
	   */


	  load() {
	    let query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    if (query.start === undefined) query.start = 0;
	    if (query.pageSize === undefined) query.pageSize = this.state.pageSize || DEFAULT_PAGESIZE;
	    return this.loadRange(query.start, query.pageSize, query);
	  }
	  /**
	   * Loads the data from the data adapater.
	   *
	   * @private
	   * @param {Query} query - Query to load.
	   * @returns {DataWindow} - Loaded data.
	   */


	  _load(query) {
	    return this.dataAdapter.load(query);
	  }
	  /**
	   * Returns true if the primary query has changed, and should result in a new set of data to be managed.  Filtering, sorting, etc, would
	   * cause the query to be changed.
	   *
	   * @param {Query} prevQuery - Previous query.
	   * @param {Query} newQuery - New query.
	   * @returns {boolean} Returns true if the primary query parts have changed.
	   */


	  hasQueryChanged(prevQuery, newQuery) {
	    if (!prevQuery || !newQuery) return true;
	    let q1 = this.extractQuery(prevQuery);
	    let q2 = this.extractQuery(newQuery);
	    let changed = JSON.stringify(q1) !== JSON.stringify(q2);

	    if (changed) {
	      _Log.default.t(TAG, 'Query Changed Old, New', q1, q2);
	    }

	    return changed;
	  }
	  /**
	   * Returns a Query with core query fields.
	   *
	   * @param {Query} query - Query from which to extract core query fields.
	   * @returns {Query} Core query fields.
	   */


	  extractQuery(query) {
	    // istanbul ignore if
	    if (!query) return {};
	    return {
	      select: query.select,
	      where: query.where,
	      qbe: query.qbe,
	      searchText: query.searchText,
	      orderBy: query.orderBy
	    };
	  }
	  /**
	   * Loads a range of data into the datasource from the provided data adapter.
	   *
	   * @fires before-load-data Before data is loaded.
	   * @fires after-load-data After the data is loaded.
	   * @fires load-data-failed If the data failed to load.
	   * @param {number} start - Start of the item range.
	   * @param {number} size - Number of items to load.
	   * @param {Object} userQuery - DataAdapter specific query to pass to the data adapater.
	   * @returns {Promise<Object[]>} - Promise containing the loaded items array.
	   */


	  loadRange(start) {
	    let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.pageSize;
	    let userQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (this.state.loading) {
	      _Log.default.t(TAG, 'Datasource busy debouncing');

	      this.loadDebouncer.debounce(() => {
	        return this.loadRange(start, size, userQuery);
	      });
	      return this.loadDebouncer.resolve();
	    }

	    return this.loadRangeImpl(start, size, userQuery);
	  }
	  /**
	   * Loads a range of data into the datasource from the provided data adapter.
	   *
	   * @fires before-load-data Before data is loaded.
	   * @fires after-load-data After the data is loaded.
	   * @fires load-data-failed If the data failed to load.
	   * @param {number} start - Start of the item range.
	   * @param {number} size - Number of items to load.
	   * @param {Object} userQuery - DataAdapter specific query to pass to the data adapater.
	   * @returns {Promise<Object[]>} - Promise containing the loaded items array.
	   * @private
	   */


	  async loadRangeImpl(start) {
	    let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.pageSize;
	    let userQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    let newQuery = _objectSpread({}, this.baseQuery, this.lastQuery, userQuery, {
	      start: start,
	      pageSize: size
	    });

	    let isDirty = this.hasQueryChanged(this.lastQuery, newQuery);

	    if (isDirty) {
	      _Log.default.t(TAG, 'Query Changed.  Clearing datasource state.', newQuery, this.lastQuery);

	      this.clearState();
	    }

	    this.lastQuery = newQuery;

	    const loader = (qStart, qSize) => {
	      let query = _objectSpread({}, newQuery, {
	        start: qStart,
	        pageSize: qSize
	      });

	      return this._load(query);
	    };

	    (0, mobx_module.transaction)(() => {
	      this.state.loading = true;
	      this.state.error = null;
	    });
	    let items = null;

	    try {
	      this.emit('before-load-data', this, newQuery);
	      items = await this.dataWindows.load(loader, start, size);
	      this.setItems(items, start);
	      this.emit('after-load-data', this, items, newQuery);
	    } catch (e) {
	      _Log.default.e(TAG, 'Datasource fetch failed', newQuery, e);

	      this.state.error = e;
	      this.emit('load-data-failed', e, this, newQuery);
	    } finally {
	      (0, mobx_module.transaction)(() => {
	        if (this.currentItemIndex < 0) {
	          // just load and get the first item which populates the currentItem after a load.
	          this.get(0);
	        } // update our state


	        this.state.itemCount = this.dataWindows.getLoadedCount();
	        this.state.pageNumber = this.dataAdapter.getPageNumber();
	        this.state.totalPages = this.dataAdapter.getTotalPages();
	        this.state.pageSize = this.dataAdapter.getPageSize();
	        this.state.totalCount = this.dataAdapter.getTotalItemsCount();
	        this.setSchema(this.dataAdapter.getSchema());
	        this.updateSelectionCount(); // we clear out the last set of __items so that a new set can be built, if someone is using getItems()

	        this.__items = null;
	        this.state.loading = false; // note if we've tried loading, even if we have no data, hasData will be true, since, we have loaded whatever data we could, which might be nothing.

	        this.state.hasData = true;
	        this.notifyChanged(); // notify that we are no longer loading

	        this.emit('loading', false);
	      });
	    } // return our loaded items


	    return items;
	  }
	  /**
	   * Updates/Replaces the current item arrary and changes the state of the datasource basedon the items and the data adapter.
	   *
	   * @param {Array} jsonItems - Loaded json item array.
	   * @param {number} start - Index of the first item into which these items should be placed into the datasource.
	   * @protected
	   * @returns {void}
	   */


	  setItems(jsonItems) {
	    let start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    (0, mobx_module.transaction)(() => {
	      _Log.default.t(TAG, 'setItems()', jsonItems, start); // if the start>0 and we are maintaining the item set, then we are simply adding our items to the list
	      // this allows the datasource to work in UIs where the UI needs to have the entire item state in memory as it
	      // incrementatally loads it.  Ideally, UIs should not need this, but, in many cases, it does.


	      let count = 0; // push our items into the datasource
	      // istanbul ignore else

	      if (jsonItems && jsonItems.length) {
	        jsonItems = jsonItems.map((item, index) => {
	          this.idIndex[this.getId(item)] = start + index;

	          if (item[this.state.selection.attribute]) {
	            this.state.selection.selected[this.getId(item)] = true;
	          }

	          return item;
	        });
	        count = jsonItems.length;
	      } else {
	        // istanbul ignore next - just logging
	        _Log.default.t(TAG, 'setData(): Setting Null or Empty Item array');
	      }

	      _Log.default.t(TAG, 'setData(): Loaded %s rows', count);
	    });
	  }
	  /**
	   * Set the schema for the current items.
	   *
	   * @param {Object} schema - New schema.
	   */


	  setSchema(schema) {
	    if (!schema || !schema.properties) {
	      _Log.default.d(TAG, 'No schema', schema);

	      return;
	    }

	    _Log.default.t(TAG, 'Setting Schema', schema);

	    this.schema = schema; // update the sort attributes based on the schema
	    // NOTE: not sure we will keep it this way.  We might way to simply
	    // pass in the sort attributes on the options

	    if (!this.state.sort.attributes.length) {
	      _Log.default.t('Updating Sort Attributes');

	      Object.keys(schema.properties).forEach(e => this.state.sort.attributes.push(e)); // even though we are not going to sort, let's set the default selected

	      this.state.sort.current.attribute = this.state.sort.attributes[0];
	    }
	  }
	  /**
	   * Increments the changed flag on the datasource.  Because this is
	   * a stateful property, the UI can bind to this and update the UI if it changes.
	   */


	  notifyChanged() {
	    this.state.changedFlag = this.state.changedFlag + 1; // fire an event in case something is listening

	    this.emit('changed', this);
	  }
	  /**
	   * Returns true if our datasource currently has the given row loaded.
	   *
	   * @param {number} row - Row to test if loaded.
	   * @returns {boolean} - True if the given row is loaded.
	   */


	  isItemLoaded(row) {
	    return this.dataWindows.isRowLoaded(row);
	  }
	  /**
	   * Given the id, find the item and set the selected attribute on that item.
	   *
	   * @param {string} id - Id of the item.
	   * @param {boolean} selectedVal - The value to set the selected attribute to.
	   * @returns {void} - Just returns if items cannot be selected (otherwise there is no return value).
	   */


	  setSelectedById(id, selectedVal) {
	    this.setSelected(this.idIndex[id], selectedVal);
	  }
	  /**
	   * Given the id, find the item and toggle the selected attribute on that item.
	   *
	   * @param {string} id - ID of the item to toggle.
	   */


	  toggleSelectedById(id) {
	    this.setSelectedById(id, !this.isSelectedById(id));
	  }
	  /**
	   * Given the boolean value, find all items and set the selected attribute on the items.
	   *
	   * @param {bool} aBool - The selection value.
	   */


	  setSelectAll(aBool) {
	    Object.values(this.idIndex).forEach(index => {
	      this.setSelected(index, aBool);
	    });
	  }
	  /**
	   * Returns an array of selected item Ids from this datasource.
	   *
	   * @returns {Array.object} - All selected item Ids.
	   */


	  getSelectedIds() {
	    return Object.keys(this.state.selection.selected);
	  }
	  /**
	   * Returns the loaded schema.
	   *
	   * @returns {Object} Schema - Current schema.
	   * @private
	   */


	  getSchema() {
	    return this.schema;
	  }
	  /**
	   * Returns true if the item is selected.
	   *
	   * @param {number} id - Row index.
	   * @returns {boolean} Returns true if selected.
	   */


	  isSelectedById(id) {
	    return this.getSelectedItemById(id);
	  }
	  /**
	   * Returns the attribute's schema properties.
	   *
	   * @param {*} attr - Attribute on object.
	   * @returns {Object} Prop - Json containing schema properites.
	   */


	  getSchemaInfo(attr) {
	    let prop = this.getFieldData(attr);
	    return prop;
	  }
	  /**
	   * The attribute's title from the attributes schema.
	   *
	   * @param {*} attr - Attribute on object.
	   * @returns {string} - Title.
	   */


	  getFieldTitle(attr) {
	    let prop = this.getFieldData(attr);

	    if (prop && prop.title) {
	      return prop.title;
	    } // return something that allows the user to see that there is no field title


	    return `#${attr}`;
	  }
	  /**
	   * The attribute's max field length from the attributes schema.
	   *
	   * @param {*} attr - Attribute on object.
	   * @returns {integer} - Maximum field length.
	   */


	  getFieldSize(attr) {
	    let prop = this.getFieldData(attr);

	    if (prop && prop.maxLength) {
	      return prop.maxLength;
	    } // we don't know the size


	    return -1;
	  }
	  /**
	   * The attribute's data type from the attributes schema.
	   *
	   * @param {*} attr - Attribute on object.
	   * @returns {integer} - Maximum field length.
	   */


	  getFieldType(attr) {
	    let prop = this.getFieldData(attr);

	    if (prop && prop.subType) {
	      return prop.subType;
	    } // we don't know the type


	    return null;
	  }
	  /**
	   * Gets the schema data from the object for the passed in parameter.
	   *
	   * @param {*} attr - Attribute or nested attribute.
	   * @returns {*} Prop - schema object.
	   */


	  getFieldData(attr) {
	    let schema = this.getSchema();
	    let prop = '';

	    if (schema) {
	      //check if dot notation exists
	      if (attr.includes('.')) {
	        let attrArray = attr.split('.');
	        prop = this.findAttribute(schema, attrArray);
	      } else {
	        prop = schema.properties[attr];
	      }

	      if (prop) {
	        return prop;
	      }

	      _Log.default.w(`The attribute '${attr}' was not found in the schema.`);

	      return {};
	    }

	    _Log.default.t('The schema was not found.');

	    return {};
	  }
	  /**
	   * Traverse schema properties looking for attribute.
	   *
	   * @param {*} schema - Schema.
	   * @param {*} attrArray - Array of items making up the path to the attribute.
	   * @returns {string} - Element containing metadata for attribute.
	   */


	  findAttribute(schema, attrArray) {
	    let element = null;

	    for (let x = 0; x < attrArray.length; x++) {
	      if (element) {
	        element = element.properties[attrArray[x]];
	      } else {
	        element = schema.properties[attrArray[x]];
	      }

	      if (element) {
	        if (element.type === 'object') {
	          _Log.default.d(`Object found: ${attrArray[x]}`); // eslint-disable-next-line no-continue


	          continue;
	        }

	        if (element.type === 'array') {
	          _Log.default.e(`An invalid array reference was detected.`);

	          return;
	        }
	      }

	      return element;
	    }
	  }

	}

	var _default = Datasource;
	exports.default = _default;
	});

	unwrapExports(Datasource_1);

	var JSONDataAdapter_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _DataAdapter = _interopRequireDefault(DataAdapter_1);

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	const TAG = Constants.framework + '-JSONDataAdapter';
	/**
	 * @type JSONDataAdapterOptions
	 * @property {string} schema? - property from which to retrieve the schema
	 * @property {string} items - property from which to retrieve the items array
	 * @property {string} idAttribute - the ID property for each item
	 * @property {string} selectedAttribute - the selected property for each item
	 * @property {number} loadingDelay - simulate a network lag of x ms between the start of the load and the end of the load
	 * @property {object|array} src - source for the JSON Data.
	 * @property {'pivot'} transform - transformer to apply to the data.  'pivot' transformer turns an object into an items array where each key value is a row.
	 */

	/**
	 * Data Adapter that will be resolved by the JSONDataAdapterOptions that is passed in.  This is used mainly for testing, or,
	 * when you know beforehand all the data that you will be working with.
	 */

	class JSONDataAdapter extends _DataAdapter.default {
	  /**
	   * Creates a new JSONDataAdapter with the given JSON response object.
	   *
	   * @param {JSONDataAdapterOptions} options - JSONDataAdapter specific options.
	   */
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    super(options);
	    this.src = options.src;
	    this.itemsProp = options.items || 'items';
	    this.schemaProp = options.schema || 'schema';
	    this.itemIdProp = options.idAttribute || '_id';
	    this.itemSelectedProp = options.selectedAttribute || '_selected';
	    this.loadingDelay = options.loadingDelay || 0;
	    this.lastQuery = null;
	    this.transformer = options.transform;
	  }
	  /**
	   * Promise function that will wait for 'num' milliseconds.
	   *
	   * @param {number} num - How long in ms to wait.
	   * @returns {Promise} - The Promise of a timeout function.
	   * @private
	   */


	  wait(num) {
	    let promise = new Promise(function (resolve) {
	      setTimeout(resolve, num);
	    });
	    return promise;
	  }
	  /**
	   * Loads the data as provided by the JSONDataAdapterOptions.
	   *
	   * @param {Query} query - Query to perform.
	   * @returns {DataWindow} - DataWindow of the loaded items.
	   */


	  async load(query) {
	    if (this.loadingDelay) {
	      // just for time to pass
	      await this.wait(this.loadingDelay); // to the load

	      return this.loadImpl(query);
	    }

	    return this.loadImpl(query);
	  }
	  /**
	   * Returns true if this query has changed compared to the last query.  The Comparison only compares the core query fields that would result in a query data query.
	   *
	   * @param {Query} query - Query to test.
	   * @returns {boolean} True if query has changed.
	   */


	  hasQueryChanged(query) {
	    if (!query || !this.lastQuery) return true;
	    if (query.src != this.lastQuery.src) return true;
	    if (query.select != this.lastQuery.select) return true;
	    if (query.searchText != this.lastQuery.searchText) return true;
	    if (query.orderBy && !this.lastQuery.orderBy) return true;
	    if (!query.orderBy && this.lastQuery.orderBy) return true; // these are not very effice, we might want to optimize this logic later

	    let changed = JSON.stringify(query.orderBy) != JSON.stringify(this.lastQuery.orderBy);

	    if (!changed) {
	      changed = JSON.stringify(query.qbe) != JSON.stringify(this.lastQuery.qbe);
	    }

	    return changed;
	  }

	  transform(response) {
	    if (!this.transformer && typeof response === 'object' && Object.keys(response).length > 0) {
	      if (!Array.isArray(response[this.itemsProp])) {
	        let newResponse = [];
	        newResponse.push(response);
	        return newResponse;
	      }

	      return response[this.itemsProp] || [];
	    } // pivot transformer assumes that each object key is a row where the key name is the id for that row
	    // istanbul ignore else


	    if (this.transformer === 'pivot') {
	      return Object.entries(response).map(_ref => {
	        let _ref2 = _slicedToArray(_ref, 2),
	            k = _ref2[0],
	            v = _ref2[1];

	        v[this.itemIdProp] = k;
	        return v;
	      });
	    }
	  }
	  /**
	   * Real load implementation.
	   *
	   * @param {Query} query - Query to perform.
	   * @returns {DataWindow} - A new window Object.
	   * @private
	   */


	  loadImpl() {
	    let query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      start: 0,
	      pageSize: 20
	    }; // we need to make sure that we always have a pageSize

	    if (!query.pageSize) query.pageSize = this.options.pageSize || 20;

	    _Log.default.t(TAG, 'Loading items...', query);

	    if (!this.src) {
	      throw Error('JSONDataAdapter requires a "src" to be loaded');
	    }

	    if (!this.lastQuery || this.hasQueryChanged(query)) {
	      let response = this.getJsonResponse(); // istanbul ignore else

	      if (response) {
	        this.items = this.notDeleted(this.transform(response));
	        this.schema = this.schema || response[this.schemaProp] || {};

	        if (query.searchText) {
	          this.search(query.searchText);
	        }

	        if (query.qbe && Object.keys(query.qbe).length > 0) {
	          this.qbeSearch(query.qbe);
	        }

	        if (query.orderBy) {
	          this.sort(query.orderBy);
	        }
	      } // just make sure our properties are meaningful based on the data loaded


	      this.clearCounts();
	      this.sanitizeProperties();
	      this.lastQuery = query;
	    } // return the json items


	    let start = query.start || 0;
	    let end = start + Math.min(query.pageSize, this.items.length) - 1;
	    let window = {
	      start: start,
	      end: end,
	      items: this.items.slice(start, end + 1)
	    };
	    return window;
	  }
	  /**
	   * Return an array of items that are not marked for deletion.
	   *
	   * @param {Array} items - Array of items.
	   * @returns {Array} Array of non deleted items.
	   */


	  notDeleted() {
	    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    return items.filter(e => {
	      return !e._deleted;
	    });
	  }
	  /**
	   * Loads the JSON resource.  Only once, and then will cache it forever.
	   *
	   * @returns {Object} Loaded JSON response.
	   * @private
	   */


	  getJsonResponse() {
	    // if we already have the data, then just return it
	    if (this.jsonResponse) return this.jsonResponse;
	    let response = null;

	    if (Array.isArray(this.src)) {
	      response = {};
	      response[this.itemsProp] = this.src;
	    } else if (typeof this.src === 'object') {
	      response = this.src;
	    } else {
	      throw Error(`JSONDataAdapter 'src' must be an array or object, but was ${typeof this.src}`);
	    }

	    this.jsonResponse = response;
	    return response;
	  }
	  /**
	   * Searches all fields of the data adapter for the given text.
	   *
	   * @param {string} text - The text to search for.
	   * @returns {void}
	   * @private
	   */


	  search(text) {
	    if (!text) {
	      // nothing to search on
	      return;
	    }

	    text = text.toLowerCase();
	    let foundItems = this.items.filter(e => {
	      let found = false;
	      let keys = Object.keys(e);

	      for (let i = 0; i < keys.length; i++) {
	        let val = e[keys[i]];

	        if (val && val.toString().toLowerCase().includes(text)) {
	          found = true;
	          break;
	        }
	      }

	      return found;
	    }); // we'll overwrite our items and reload them if needed

	    this.items = foundItems;
	  }
	  /**
	   * Search the data using a QBE object, where each key is the field, and the value
	   * is the data to serach for.  Our QBE implementation is an 'AND' query using
	   * 'CONTAINS' logic.
	   *
	   * @param {Object} qbe - Query.
	   * @returns {void}
	   */


	  qbeSearch() {
	    let qbe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let fields = Object.keys(qbe);

	    if (fields.length === 0) {
	      // nothing to search on
	      return;
	    }

	    let qbeData = {};
	    fields.forEach(f => {
	      qbeData[f] = String(qbe[f]).toLowerCase();
	    });
	    let foundItems = this.items.filter(e => {
	      let found = true; // our implementation is an 'and' model

	      for (let i = 0; i < fields.length; i++) {
	        let text = String(e[fields[i]]).toLowerCase();
	        found = found && text.indexOf(qbeData[fields[i]]) >= 0; // as soon as one fails, we can exit

	        if (!found) break;
	      }

	      return found;
	    }); // we'll overwrite our items and reload them if needed

	    this.items = foundItems;
	  }
	  /**
	   * Apply the sort to the data adapter.
	   *
	   * @param {Array<OrderBy>} orderBy - Array of sort options.
	   * @returns {void}
	   * @private
	   */


	  sort(orderBy) {
	    // istanbul ignore else
	    if (orderBy && orderBy.length) {
	      // NOTE: we only support a single order by (for now)
	      let sortOptions = orderBy[0];
	      let mult = sortOptions.sort === 'ascending' ? 1 : -1;
	      this.items.sort((a, b) => {
	        let comp = String(a[sortOptions.field]).localeCompare(String(b[sortOptions.field])) * mult;
	        return comp;
	      });
	    }
	  }
	  /**
	   * Delete the items from the data adapater.
	   *
	   * @param {Array} items - The items to be deleted.
	   * @returns {number} - The number of deleted items.
	   */


	  batchDelete(items) {
	    if (!items || !items.length) {
	      // just return 0
	      return 0;
	    }

	    let deletedItemIds = items.map(e => e[this.itemIdProp]);
	    let data = this.items.filter(e => {
	      let deleted = e._deleted || deletedItemIds.includes(e[this.itemIdProp]);
	      if (deleted) e._deleted = true;
	      return !deleted;
	    }); // set the undeleted items

	    this.items.length = 0;
	    this.items.push(...data);
	    this.clearCounts();
	    this.sanitizeProperties(); // return the count of items deleted

	    return deletedItemIds.length;
	  }

	}

	var _default = JSONDataAdapter;
	exports.default = _default;
	});

	unwrapExports(JSONDataAdapter_1);

	var RESTDataAdapter_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _DataAdapter = _interopRequireDefault(DataAdapter_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}
	/**
	 * REST Query Options
	 * @typedef {Object} RESTQuery
	 * @property {string} objectStructure? - Maximo Object Structure name, if missing, it will derive from the object, if possible
	 * @property {string} select=* - Comma separated fields to select
	 * @property {string} where? - Where clause to filter the request
	 * @property {number} pageSize? - number of items to return per page
	 * @property {boolean} includeCounts=false - if true, then the page count and record counts are returned
	 * @property {boolean} includeRefs=false - if true, then teh collection refs are returned
	 * @property {boolean} relativeUris=true - if true, then teh collection refs are returned as relative uris
	 * @property {boolean} includeSchema=false - if true, then the schema is also returned in the response
	 * @property {boolean} stablePagination=false  - if true, then the stablepagination=1 then you can page forward is also returned in the response
	 * @property {boolean} timeout=10000  - 10 second, if you do not get respone on time then request will fail in mobile case it can return data from device, in future this can be admin option to confiugre timeout
	 */

	/**
	 * A REST Data Adapter is a Maximo OSLC Data Adapter.
	 */


	class RESTDataAdapter extends _DataAdapter.default {
	  constructor(options, restclient) {
	    super(options);
	    this.conn = restclient || options.restclient;
	    this.lastResponseInfo = null;
	    this._lastQuery = null;
	    this._schemaDirty = true;
	  }
	  /**
	   * Called when query is changed, sets _schemaDirty true so schema will be reloaded (if load schema is set).
	   *
	   * @param {RESTQuery} v - The new query.
	   */


	  set lastQuery(v) {
	    if (!this._lastQuery || v.objectStructure !== this._lastQuery.objectStructure || v.select !== this._lastQuery.select) {
	      this._lastQuery = v;
	      this._schemaDirty = true;
	    } else {
	      this._schemaDirty = false;
	    }
	  }
	  /**
	   * Loads the data for the given Query.
	   *
	   * @param {RESTQuery} query - Rest Query.
	   * @returns {DataWindow} A DataWindow for the currently loaded items.
	   */


	  async load(query) {
	    let q = _objectSpread({}, this.options, query);

	    this.lastQuery = q;

	    if (q.includeSchema && !this._schemaDirty) {
	      Reflect.deleteProperty(q, 'includeSchema');
	    }

	    let path = this.toPath(q);
	    let queryOptions = this.toQueryOptions(q);
	    let response = await this.conn.get(path, {
	      query: queryOptions
	    }); // istanbul ignore else - if we don't get responseInfo, then so be it

	    if (response.responseInfo) {
	      let info = response.responseInfo;
	      this.lastResponseInfo = info;

	      if (info.schema) {
	        this.schema = info.schema;
	      }

	      this.totalPages = info.totalPages;
	      this.totalCount = info.totalCount;
	      this.pageNumber = info.pagenum;
	    } // istanbul ignore else


	    if (response.member) {
	      this.items = response.member;
	    }

	    this.sanitizeProperties();
	    let window = {
	      start: query.start || 0,
	      items: this.items
	    };
	    return window;
	  }
	  /**
	   * Returns 0 or 1 based on the truthiness of the given value.
	   *
	   * @param {any} v - A given value.
	   * @returns {number} - 1 if v is truthy, 0 if not.
	   * @private
	   */


	  toZeroOrOne(v) {
	    if (v) return 1;
	    return 0;
	  }
	  /**
	   * Converts the RESTQuery into OSLC query parameters.
	   *
	   * @param {RESTQuery} query - The query to be converted.
	   */


	  toQueryOptions() {
	    let query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // these are the default query options for all query.  The may be overridden in the query param

	    let defaultQuery = _objectSpread({
	      select: '*',
	      pageSize: 20,
	      includeCounts: true,
	      includeRefs: false,
	      relativeUris: true,
	      includeSchema: true
	    }, query);

	    let q = {};
	    q['oslc.select'] = defaultQuery.select;

	    if (query.pageSize) {
	      if (query.pageSize != 0) {
	        q['oslc.pageSize'] = query.pageSize;
	      }
	    } else {
	      //page size not defined - default to 10
	      q['oslc.pageSize'] = defaultQuery.pageSize;
	    } // istanbul ignore else


	    if (defaultQuery.where) {
	      q['oslc.where'] = defaultQuery.where;
	    }

	    if (defaultQuery.orderBy && defaultQuery.orderBy.length) {
	      // turn it into +/-fieldName
	      q['oslc.orderBy'] = this.toOslcOrderBy(defaultQuery.orderBy);
	    }

	    if (defaultQuery.start > 0) {
	      // we are doing a range query, convert to pages
	      let pageno = Math.floor(defaultQuery.start / defaultQuery.pageSize) + 1; // istanbul ignore else

	      if (pageno > 1) {
	        q.pageno = pageno;
	      }
	    } // istanbul ignore else


	    if (defaultQuery.includeCounts) {
	      q.collectioncount = 1;
	    }

	    q.ignorecollectionref = this.toZeroOrOne(!defaultQuery.includeRefs);
	    q.relativeuri = this.toZeroOrOne(defaultQuery.relativeUris); // istanbul ignore else

	    if (defaultQuery.includeSchema && this._schemaDirty) {
	      q.addschema = 1;
	    }

	    return q;
	  }
	  /**
	   * Convert sort object to an oslc.orderBy clause, where sortObj is of type [{field: name, sort: ascending/descending},...].
	   *
	   * @param {Object} sortObj - JSON sort object.
	   * @returns {string} - The oslc.orderBy clause.
	   * @private
	   */


	  toOslcOrderBy(sortObj) {
	    let orderBy = '';

	    for (let x = 0; x < sortObj.length; x++) {
	      orderBy = orderBy + (sortObj[x].sort == 'ascending' ? '+' : '-') + sortObj[x].field;

	      if (x < sortObj.length - 1) {
	        orderBy += ',';
	      }
	    }

	    return orderBy;
	  }
	  /**
	   * Using the given RESTQuery, create the OSLC path.
	   *
	   * @param {RESTQuery} query - The query to create the path from.
	   */


	  toPath() {
	    let query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let path = '';

	    if (query.objectStructure) {
	      path += '/os/' + query.objectStructure.toLowerCase();
	    } else {
	      throw new Error('RESTDatasource Query requires .objectStructure to be set');
	    }

	    return path;
	  }

	  _generatePostHeaders(merge, method, responseProperties) {
	    let headers = {};
	    headers['Content-Type'] = 'application/json'; //adding the csrf token

	    headers.csrftoken = this.conn.getCSRFToken(); //adding method

	    if (method === undefined || method === null) {
	      headers['x-method-override'] = 'PATCH';
	    } //adding merge


	    if (merge) {
	      headers.patchtype = 'MERGE';
	    } //adding content localized headers


	    if (this.contentLocalized) {
	      headers['content-localized'] = '1';
	    } //adding response properties headers


	    if (responseProperties !== undefined && responseProperties !== null) {
	      headers.properties = responseProperties;
	    }

	    return headers;
	  }
	  /**
	   * Adds a new record to the datasource.
	   *
	   * @param {record} recordData - Record Data.
	   * @returns {record} - The added record.
	   */


	  add(recordData) {
	    return this._addUpdate(recordData, 'ADD');
	  }
	  /**
	   * Updates an existing record.
	   *
	   * @param {record} recordData - Record Data.
	   * @returns {record} - The updated record.
	   */


	  update(recordData) {
	    return this._addUpdate(recordData, 'UPDATE');
	  }
	  /**
	   * Will do an ADD or an UPDATE, depending on the value of addUpdate.
	   *
	   * (the only difference between an ADD or an UPDATE is the url and the headers...
	   * UPDATE specifies a url to a record, and uses patchtype merge and x-method-override).
	   *
	   * @param {record} recordData - The record to be added or updated.
	   * @param {string} addUpdate - Either "ADD" or "UPDATE".
	   */


	  async _addUpdate(recordData, addUpdate) {
	    let props = recordData.properties;

	    let postHeaders = this._generatePostHeaders(false, 'POST', props);

	    let url = this.toPath(recordData);

	    if (addUpdate === 'UPDATE') {
	      postHeaders = this._generatePostHeaders(true, null, props);
	      url = recordData.href;
	    }

	    let payload = JSON.stringify(recordData.payload);
	    let response = await this.conn.post(url, {
	      headers: postHeaders,
	      body: payload
	    }); // the response IS the record that results from the add/update... we may want to merge the values rather than set it
	    // istanbul ignore else

	    if (response) {
	      this.record = response;
	    }

	    this.sanitizeProperties();
	    return this.record;
	  }

	}

	var _default = RESTDataAdapter;
	exports.default = _default;
	});

	unwrapExports(RESTDataAdapter_1);

	var Browser_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.Browser = exports.DefaultBrowser = void 0;

	var _Factory = _interopRequireDefault(Factory_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	} // eslint-disable-next-line


	const isNode = typeof commonjsGlobal !== 'undefined' && // eslint-disable-next-line
	{}.toString.call(commonjsGlobal) === '[object global]';

	class DefaultBrowser {
	  constructor() {
	    this.isLocalhost = false;
	    this.host = null;
	    this.port = 0;
	    this.initialize();
	  }
	  /**
	   * @private
	   * @returns {void}
	   */


	  initialize() {
	    // istanbul ignore if - can't test browser
	    if (!isNode) {
	      this.isBrowser = true;
	    } else {
	      this.isBrowser = false; // if we are node, then just return

	      return;
	    } // istanbul ignore next - can't test browser


	    if (window && window.location) {
	      this.host = window.location.hostname;
	      this.isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
	      window.location.hostname === '[::1]' || // 127.0.0.1/8 is considered localhost for IPv4.
	      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
	      this.port = window.location.port;
	    }
	  }
	  /**
	   * Redirect to a new url, leaving our application.  Doing this will destroy our application.
	   *
	   * @param {string} url - The url to redirect to.
	   */


	  redirectExternal(url) {
	    window.location.replace(url);
	  }
	  /**
	   * Redirect to a new URL within our application.
	   *
	   * @param {string} url - The url to redirecto to.
	   */


	  redirect(url) {
	    window.location.replace(url);
	  }
	  /**
	   * Get a query param from the Browser's Query String.
	   *
	   * @param {string} param - The requested query param.
	   * @returns {string} - The found param.
	   */


	  queryParam(param) {
	    const urlParams = this.queryParams();
	    return urlParams.get(param);
	  }
	  /**
	   * Returns the query part of the browser's url.
	   * 
	   * @returns {URLSearchParams} Search param object.
	   */


	  queryParams() {
	    return new URLSearchParams(window.location.search);
	  }
	  /**
	   * @returns {string} Browser's url.
	   */


	  getUrl() {
	    return window.location.href;
	  }

	} // setup the factory for the browser to use the default Browser impl


	exports.DefaultBrowser = DefaultBrowser;
	const Browser = new _Factory.default(DefaultBrowser); // export the browser class so that others can subclass it

	exports.Browser = Browser; // the default export is the factory, so that default consumers will need to call .get() in order to get the impl.

	var _default = Browser;
	exports.default = _default;
	});

	unwrapExports(Browser_1);
	var Browser_2 = Browser_1.Browser;
	var Browser_3 = Browser_1.DefaultBrowser;

	var LocalizationSource_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0; // this basically is an interface class, so, we have lots of empty functions

	/* eslint no-empty-function: off */

	/* eslint no-unused-vars: off */

	class LocalizationSource {
	  constructor(options) {
	    this.options = options;
	  }
	  /* The loadLabels method should return a JSON object of labels for the current users language.
	   *
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {Object} JSON
	   */

	  /* istanbul ignore next - nothing to check */


	  loadLabels() {
	  }
	  /* The loadMessages method should return a JSON object of messages for the current users language.
	   *
	   * @param {Object} options? optional options that might be passed to the method
	   * @returns {Object} JSON
	   */

	  /* istanbul ignore next - nothing to check */


	  loadMessages() {
	  }

	}

	var _default = LocalizationSource;
	exports.default = _default;
	});

	unwrapExports(LocalizationSource_1);

	var JSONLocalizationSource_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _LocalizationSource = _interopRequireDefault(LocalizationSource_1);

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");

	  return typeof key === "symbol" ? key : String(key);
	}

	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];

	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }

	  return (hint === "string" ? String : Number)(input);
	}

	const TAG = Constants.framework + '-JSONLocalizationSource';
	/**
	 * @type JSONLocalizationSourceOptions
	 */

	/**
	 * LocalizationSource that will be resolved by the JSONLocalizationSourceOptions that are passed in.  This is used mainly for testing, or,
	 * when you know beforehand all the data that you will be working with.
	 */

	class JSONLocalizationSource extends _LocalizationSource.default {
	  /**
	   * Creates a new JSONLocalizationSource with the given JSON response object.
	   *
	   * @param {JSONLocalizationSourceOptions} options - JSONLocalizationSource specific options.
	   */
	  constructor() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    super(options);
	    this.options.appName = options.appName;
	    this.labelSrc = options.labelSrc;
	    this.messageSrc = options.messageSrc;
	  }
	  /**
	   * Loads the labels as provided by the JSONLocalizationSourceOptions.
	   *
	   * @returns {DataWindow} - DataWindow of the loaded items.
	   */


	  loadLabels() {
	    return this.loadImpl(this.labelSrc, 'Labels');
	  }
	  /**
	   * Loads the Messages as provided by the JSONLocalizationSourceOptions.
	   *
	   * @returns {DataWindow} - DataWindow of the loaded items.
	   */


	  loadMessages() {
	    return this.loadImpl(this.messageSrc, 'Messages');
	  }
	  /**
	   * Loading implementation.
	   *
	   * @param {*} src - Source file.
	   * @param {string} type - Label or Message.
	   * @returns {Object} - A new Object.
	   * @private
	   */


	  loadImpl(src, type) {
	    _Log.default.t(TAG, `Loading ${type}`);

	    if (!src) {
	      throw Error('JSONLocalizationSource requires a "src" to be loaded');
	    }

	    let response = null;
	    /* istanbul ignore else - already testing */

	    if (typeof src === 'object') {
	      response = src;
	    } else if (typeof src === 'string') {
	      response = this.loadJSON(src);
	    } else {
	      // istanbul ignore next - throws an error if you don't give it good data
	      throw Error(`JSONLocalizationSource 'src' must be a string or object, but was ${typeof src}`);
	    }
	    /* istanbul ignore if - already being tested */

	    /* istanbul ignore next line */


	    if (response) {
	      /* istanbul ignore else - already testing */
	      if (type === 'Labels') {
	        let labelArray = [];

	        if (this.options.appName) {
	          let appArray = this.options.appName.split(',');
	          appArray.forEach(app => {
	            if (response[app]) labelArray.push(response[app]);
	          });
	        }

	        this.labels = Object.assign({}, ...labelArray);
	        return this.labels;
	      } else if (type === 'Messages') {
	        // istanbul ignore else
	        if (response) {
	          let messageArray = [];

	          if (this.options.appName) {
	            let appArray = this.options.appName.split(',');
	            appArray.forEach(app => {
	              let messages = response[app];

	              if (messages) {
	                Object.keys(messages).forEach(key => {
	                  messages = this.renameProp(key, `${app}#${key}`, messages);
	                });
	                messageArray.push(messages);
	              }
	            });
	          }

	          this.messages = Object.assign({}, ...messageArray);
	        }

	        return this.messages;
	      }
	    }
	  }
	  /**
	   * Loads the json from the given source location.
	   *
	   * @param {string} source - Location to load json from.
	   * @returns {json} - The loaded json.
	   * @private
	   */


	  loadJSON(source) {
	    let json = null;
	    /* istanbul ignore next */

	    if (source.endsWith('.js')) {
	      try {
	        // we basically clone the data so that multiple data sources using the same refernce will get different physical copies
	        json = JSON.parse(JSON.stringify(commonjsRequire(source).default));
	      } catch (e) {
	        // istanbul ignore next - error logging
	        _Log.default.e('require(%s) load faild', source, e); // istanbul ignore next - error logging


	        throw new Error(`Failed to load JSON from ${source}`, e);
	      }
	    } else {
	      /* istanbul ignore next */
	      throw new Error(`Loading from URL not implemented.  Url was ${source}`);
	    }

	    return json;
	  }
	  /**
	   * Rename object key for passed in object.
	   *
	   * @param {*} oldProp - Original key.
	   * @param {*} newProp - Updated key.
	   * @param {*} object -
	   */


	  renameProp(oldProp, newProp, _ref) {
	    let old = _ref[oldProp],
	        others = _objectWithoutProperties(_ref, [oldProp].map(_toPropertyKey));

	    return _objectSpread({
	      [newProp]: old
	    }, others);
	  }

	}

	var _default = JSONLocalizationSource;
	exports.default = _default;
	});

	unwrapExports(JSONLocalizationSource_1);

	var Localizer_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _EventEmitter = _interopRequireDefault(EventEmitter_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	} // eslint-disable-next-line no-unused-vars


	const TAG = Constants.framework + '-Localizer';

	class Localizer extends _EventEmitter.default {
	  /**
	   * A Localizer will manage the LocalizationSource that is used to fetch the labels.
	   *
	   * @param {*} source - Source to use when reading and loading data.
	   * @param {*} options - LocalizationSource options.
	   */
	  constructor(source) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    super();
	    this.options = options;
	    this.labels = options.labels;
	    this.messages = options.messages;
	    this.mock = options.mock;
	    this.labelSrc = options.labelSrc || source.labelSrc;
	    this.messageSrc = options.messageSrc || source.messageSrc;

	    if (!source) {
	      return undefined;
	    }

	    if (!this.labelSrc) {
	      source.labelSrc = this.labelSrc;
	    }

	    if (!this.messageSrc) {
	      source.messageSrc = this.messageSrc;
	    }
	    /**
	     * LocalizationSource being used by the Localizer.  Typically the LocalizationSource should not be directly accessed, but rather,
	     * methods and propertes of the Localizer should be accessed.
	     * @type LocalizationSource
	     */


	    this.localizationSource = source;
	  }
	  /**
	   * Loads the labels from the localizationSource.
	   *
	   * @returns {Object} Labels.
	   */


	  async loadLabels() {
	    _Log.default.t(TAG, 'Loading Labels');

	    this.labels = await this.localizationSource.loadLabels();
	    this.emit('labels-loaded', this.labels);
	    return this.labels;
	  }
	  /**
	   * Loads the messages from the localization source.
	   *
	   * @returns {Object} Messages.
	   */


	  async loadMessages() {
	    _Log.default.t(TAG, 'Loading Messages');

	    this.messages = await this.localizationSource.loadMessages();
	    this.emit('messages-loaded', this.messages);
	    return this.messages;
	  }
	  /**
	   * Load both Labels and Messages.
	   */


	  async loadAll() {
	    await this.loadLabels();
	    await this.loadMessages();
	    this.emit('labels-messages-loaded', this);
	  }
	  /**
	   * The localized label.
	   *
	   * @param {string} id - Unique Id.
	   * @param {string} defltvalue - Default label if unable to fetch localized label.
	   * @param {Array} params - Default label if unable to fetch localized label.
	   * @returns {string} Localized label.
	   */


	  getLabel(id, defltvalue, params) {
	    _Log.default.t(TAG, 'Getting Label');

	    let label = '';

	    if (this.labels && this.labels[id]) {
	      label = this.labels[id];
	    } else {
	      label = defltvalue;
	    }

	    label = this.replaceParams(label, params);
	    return label;
	  }
	  /**
	   * The localized message.
	   *
	   * @param {string} group - The message group identifier.
	   * @param {string} key - The unique key within the group identifying the message.
	   * @param {Array} params - An array of strings to replace placeholders in message string.
	   * @returns {string} Localized message.
	   */


	  getMessage(group, key, params) {
	    _Log.default.t(TAG, 'Getting Message');

	    let message = '';

	    if (this.messages && this.messages[`${group}#${key}`]) {
	      message = this.messages[`${group}#${key}`];
	      message = this.replaceParams(message, params);
	    } else {
	      message = `${group}#${key}`;
	    }

	    return message;
	  }
	  /**
	   * Replace placeholder parameters in string.
	   *
	   * @param {string} message - The message string.
	   * @param {Array} params - Array containing strings to replace placeholders.
	   */


	  replaceParams(message, params) {
	    if (message && params) {
	      params.forEach(function (param, index) {
	        message = message.replace('{' + index + '}', param);
	      });
	    }

	    return message;
	  }

	}

	var _default = Localizer;
	exports.default = _default;
	});

	unwrapExports(Localizer_1);

	var MOCKLocalizationSource_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _LocalizationSource = _interopRequireDefault(LocalizationSource_1);

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	const TAG = Constants.framework + '-MOCKLocalizationSource';

	class MOCKLocalizationSource extends _LocalizationSource.default {
	  /* istanbul ignore next line */
	  constructor(source) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    super(options);
	    this.options = options;
	    this.localizationSource = source;
	  }
	  /**
	   * Load Labels and append language based mock prefix.
	   *
	   * @returns {*} Mocked Labels.
	   */


	  async loadLabels() {
	    _Log.default.t(TAG, 'Getting Labels');

	    let labels = await this.localizationSource.loadLabels();
	    let mock = this.getMockPrefix(this.options.mockLocale);
	    Object.entries(labels).forEach(_ref => {
	      let _ref2 = _slicedToArray(_ref, 2),
	          key = _ref2[0],
	          value = _ref2[1];

	      return labels[key] = this.replaceParams(mock, [value]);
	    });
	    this.labels = labels;
	    return labels;
	  }
	  /**
	   * Load Messages and append language based mock prefix.
	   *
	   * @returns {*} Mocked messages.
	   */


	  async loadMessages() {
	    _Log.default.t(TAG, 'Loading Messages');

	    let messages = await this.localizationSource.loadMessages();
	    let mock = this.getMockPrefix(this.options.mockLocale);
	    Object.entries(messages).forEach(_ref3 => {
	      let _ref4 = _slicedToArray(_ref3, 2),
	          key = _ref4[0],
	          value = _ref4[1];

	      return messages[key] = this.replaceParams(mock, [value]);
	    });
	    this.messages = messages;
	    return messages;
	  }
	  /**
	   * Mocked Language prefix.
	   *
	   * @param {*} mockLocale - Mocked language locale.
	   */


	  getMockPrefix(mockLocale) {
	    let mock = '';

	    switch (mockLocale) {
	      /* istanbul ignore next line - being hit but not detected for some reason */
	      case 'ja':
	        mock = "[(')一構ソチ‐ {0}]";
	        break;

	      /* istanbul ignore next line - being hit but not detected for some reason */

	      case 'de':
	        mock = "[(')~~~~~~~~~~ {0}]";
	        break;

	      /* istanbul ignore next line - being hit but not detected for some reason */

	      default:
	    }

	    return mock;
	  }
	  /**
	   * Replace placeholder parameters in string.
	   *
	   * @param {string} text - The text string.
	   * @param {Array} params - Array containing strings to replace placeholders.
	   */


	  replaceParams(text, params) {
	    /* istanbul ignore next line */
	    if (text && params) {
	      params.forEach(function (param, index) {
	        text = text.replace('{' + index + '}', param);
	      });
	    }

	    return text;
	  }

	}

	var _default = MOCKLocalizationSource;
	exports.default = _default;
	});

	unwrapExports(MOCKLocalizationSource_1);

	var RESTLocalizationSource_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _LocalizationSource = _interopRequireDefault(LocalizationSource_1);

	var _Log = _interopRequireDefault(Log_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");

	  return typeof key === "symbol" ? key : String(key);
	}

	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];

	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }

	  return (hint === "string" ? String : Number)(input);
	}

	const TAG = Constants.framework + '-RESTLocalizationSource';
	/**
	 * A RestLocalizationSource used to load labels and messages from the Maximo server.
	 */

	class RESTLocalizationSource extends _LocalizationSource.default {
	  /**
	   * Creates a new RESTLocalizationSource with the given JSON response object.
	   *
	   * @param {string} options - Test.
	   * @param {string} client - Test.
	   */
	  constructor(options, client) {
	    super(options);
	    this.options = options;
	    this.client = client;
	  }
	  /**
	   * Loads Labels from the database and combine into flat structure.
	   *
	   * @returns {Object} Obj - JSON object of data.
	   */


	  async loadLabels() {
	    if (!this.client || !this.client.connected) {
	      _Log.default.t(TAG, 'Client not connected.  Unable to load labels.');

	      return;
	    }

	    _Log.default.t(TAG, 'Loading Labels');

	    let response = await this.client.getLabels(this.options.appName);
	    /* istanbul ignore if */

	    /* istanbul ignore next line */

	    if (response) {
	      //flatten label response structure
	      let labelArray = [];
	      /* istanbul ignore if - already testing */

	      if (this.options.appName) {
	        let appArray = this.options.appName.split(',');
	        appArray.forEach(app => {
	          labelArray.push(response[app].label);
	        });
	      }

	      this.labels = Object.assign({}, ...labelArray);
	    }

	    return this.labels;
	  }
	  /**
	   * Loads Messages from the database.
	   *
	   * @returns {Object} Obj - JSON object of data.
	   */


	  async loadMessages() {
	    if (!this.client || !this.client.connected) {
	      _Log.default.t(TAG, 'Client not connected.  Unable to load messages.');

	      return;
	    }

	    _Log.default.t(TAG, 'Loading Messages');

	    let response = await this.client.getMessages(this.options.appName); // istanbul ignore else

	    if (response) {
	      let messageArray = []; // istanbul ignore next

	      if (this.options.appName) {
	        let appArray = this.options.appName.split(',');
	        appArray.forEach(app => {
	          let messages = response[app];

	          if (messages) {
	            Object.keys(messages).forEach(key => {
	              messages = this.renameProp(key, `${app}#${key}`, messages);
	            });
	            messageArray.push(messages);
	          }
	        });
	      }

	      this.messages = Object.assign({}, ...messageArray);
	    }

	    return this.messages;
	  }
	  /**
	   * Rename object key for passed in object.
	   *
	   * @param {*} oldProp - Original key.
	   * @param {*} newProp - Updated key.
	   * @param {*} object -
	   */


	  renameProp(oldProp, newProp, _ref) {
	    let old = _ref[oldProp],
	        others = _objectWithoutProperties(_ref, [oldProp].map(_toPropertyKey));

	    return _objectSpread({
	      [newProp]: old
	    }, others);
	  }

	}

	var _default = RESTLocalizationSource;
	exports.default = _default;
	});

	unwrapExports(RESTLocalizationSource_1);

	var MaximoClient_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _AuthState = _interopRequireDefault(AuthState_1);

	var _EventEmitter = _interopRequireDefault(EventEmitter_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/**
	 * A MaximoClient is the entry point into a Maximo System.  In most cases this reflects the connection to a Maximo Server
	 * but, the client can also represent an on device connection that proxies a remote Maximo Server.
	 *
	 * @emits connected - when connection state changes.  Has arg for the connection status.
	 * @emits authenticated - when the authentication state changes.  Has arg for the authentication status.
	 */


	const TAG = Constants.framework + '-MaximoClient';

	class MaximoClient extends _EventEmitter.default {
	  constructor(authenticator, restclient) {
	    super();
	    this.authenticator = authenticator;
	    this.authenticator.on('authenticated', v => {
	      this.authenticated = v;
	    });
	    this.restclient = restclient;
	    this._authenticated = false;
	    this._connected = false;
	  }

	  set authenticated(v) {
	    this._authenticated = v;
	    this.emit('authenticated', v);
	  }

	  get authenticated() {
	    return this._authenticated;
	  }

	  set connected(v) {
	    this._connected = v;
	    this.emit('connected', v);
	  }

	  get connected() {
	    return this._connected;
	  }

	  async connect() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (this.authenticated) {
	      _Log.default.d(TAG, 'We are already connected');

	      return true;
	    } // allow the authenticator to authenticate this connection


	    let response = await this.authenticator.login(options, this.restclient);

	    if (response !== _AuthState.default.OK) {
	      _Log.default.w(TAG, 'Unable to connect.  Authenticator returned %s', response);

	      return false;
	    }

	    if (this.authenticated && this.restclient) {
	      _Log.default.d(TAG, 'We are authenticated, setting connected status');

	      this.connected = this.restclient.connected;
	    }

	    return true;
	  }

	  async disconnect() {
	    // allow the authenticator to authenticate this connection
	    let response = await this.restclient.logout();

	    _Log.default.w(TAG, 'response returned %s', response);

	    this.connected = this.restclient.connected;
	    this.authenticated = false;
	    return true;
	  }

	  getSystemInfo() {
	    return this.restclient.get('/systeminfo');
	  }

	  async getUserInfo() {
	    await this.restclient.get('/whoami');
	  }
	  /**
	   * Loads labels.
	   *
	   * @param {string} apps - Comma delimited list of applications.
	   * @returns {Object} Json.
	   */


	  getLabels(apps) {
	    return this.restclient.get(`/uitext?groups=${apps}`);
	  }
	  /**
	   * Loads messages.
	   *
	   * @param {*} apps - Comma delimited list of msgroups.
	   * @returns {Object} Json.
	   */


	  getMessages(apps) {
	    return this.restclient.get(`/messages?groups=${apps}`);
	  }

	}

	var _default = MaximoClient;
	exports.default = _default;
	});

	unwrapExports(MaximoClient_1);

	var AnywhereDevice_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;



	class AnywhereDevice extends Device_1.DefaultDevice {
	  constructor() {
	    super();
	    this.name = "anywhere";
	    this.isBrowser = true;
	    this.isDesktop = false;
	    this.isAnywhere = true;
	    this.isAnywhereEmulation = true;
	  }

	}

	var _default = AnywhereDevice;
	exports.default = _default;
	});

	unwrapExports(AnywhereDevice_1);

	var Platform_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	/* eslint-disable no-empty-function */

	/* eslint-disable no-unused-vars */

	/**
	 * A Platform is a class that used to setup and configure the Application for a given platform.
	 * 
	 * @interface
	 */

	class Platform {
	  /**
	   * Configure and initialize the platform.
	   * 
	   * @param {object} options - Platform configuration options.
	   */
	  // istanbul ignore next - interface method
	  configure() {
	  }
	  /**
	   * Creates a new Application using the given options.
	   * 
	   * @param {Object} options - Application options.
	   */
	  // istanbul ignore next - interface method


	  newApplication() {
	  }

	}

	var _default = Platform;
	exports.default = _default;
	});

	unwrapExports(Platform_1);

	var BrowserPlatform_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Application = _interopRequireDefault(Application_1);





	var _RESTConnection = _interopRequireDefault(RESTConnection_1);

	var _MAXAUTHAuthenticator = _interopRequireDefault(MAXAUTHAuthenticator_1);

	var _SuccessAuthenticator = _interopRequireDefault(SuccessAuthenticator_1);

	var _MaximoClient = _interopRequireDefault(MaximoClient_1);

	var _RESTLocalizationSource = _interopRequireDefault(RESTLocalizationSource_1);

	var _JSONLocalizationSource = _interopRequireDefault(JSONLocalizationSource_1);

	var _MOCKLocalizationSource = _interopRequireDefault(MOCKLocalizationSource_1);

	var _Localizer = _interopRequireDefault(Localizer_1);



	var _Log = _interopRequireDefault(Log_1);

	var _Platform = _interopRequireDefault(Platform_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-BrowserPlatform';
	/**
	 * Configures the factories for a Browser platform, which is the default.
	 */

	class BrowserPlatform extends _Platform.default {
	  /**
	   * Configures the Browser platform.
	   *
	   * @param {Object} options - Browser configuration options.
	   * @override
	   */
	  configure() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    this.options = options;

	    _Log.default.i(TAG, 'Configuring Browser Platform with options', options);

	    this.configureLogging(options); // set the Factory Implementations

	    if (Device_1.Device.get().name !== 'browser') {
	      Device_1.Device.setImplementation(Device_1.DefaultDevice);

	      Browser_1.Browser.setImplementation(Browser_1.DefaultBrowser);
	    }
	  }
	  /**
	   * Configure logging with options.
	   *
	   * @param {Object} options - Logging options.
	   * @param {number} options.logLevel - Logging level.
	   */


	  configureLogging(options) {
	    // istanbul ignore else
	    if (options && options.logLevel) {
	      _Log.default.level = options.logLevel; //log.i(TAG, 'Default logging configured at level', options.logLevel);
	    }
	  }
	  /**
	   * Creates a new Authenticator for the Browser Platform.
	   *
	   * @param {Object} options - Authenticator options.
	   * @returns {Authenticator} Configured authenticator.
	   * @protected
	   */


	  newAuthenticator(options) {
	    if (this.isReactServer()) {
	      return new _SuccessAuthenticator.default();
	    }

	    return new _MAXAUTHAuthenticator.default(options);
	  }
	  /**
	   * Creates a new REST connection.
	   *
	   * @param {ConnectionOptions} options - REST Connection options.
	   * @returns {RESTConnection} REST Connection.
	   * @protected
	   */


	  newRESTConnection(options) {
	    let baseOptions = this.resolveMaximoClientOptions(options);

	    _Log.default.t(TAG, 'Default Maximo Client Options', baseOptions);

	    return _RESTConnection.default.newInstance(baseOptions);
	  }
	  /**
	   * Creates a new MaximoClient.
	   *
	   * @param {Object} options - Client Options.
	   * @returns {MaximoClient} Configured Maximo Client.
	   * @protected
	   */


	  newClient(options) {
	    let restConn = this.newRESTConnection(options);
	    let authenticator = this.newAuthenticator(options);
	    let maxClient = new _MaximoClient.default(authenticator, restConn);
	    return maxClient;
	  }
	  /**
	   * Given the ConnectionOptions apply any additional options and set default values.
	   *
	   * @param {ConnectionOptions} options - RESTConnection options.
	   * @protected
	   */


	  resolveMaximoClientOptions(options) {
	    // istanbul ignore else
	    if (!options.baseUrl) {
	      options.baseUrl = this.resolveMaximoBaseUrl(options);
	    } // istanbul ignore else


	    if (options.includeCredentials === undefined) {
	      options.includeCredentials = true;
	    }

	    return options;
	  }
	  /**
	   * Discover the base Url of the Maximo server, including the Maximo context.
	   *
	   * @protected
	   * @returns {string} The maximo url or null if it cannot be resolved.
	   */


	  resolveMaximoBaseUrl() {
	    if (this.isReactServer()) {
	      _Log.default.t(TAG, 'Running in React Dev Server, using local proxy to Maximo'); // we running in a react dev server


	      return '/maximo';
	    }

	    return null;
	  }
	  /**
	   * Tests if we are running on a React Development Server.
	   *
	   * @returns {boolean} True if we are running on a React Dev Server.
	   * @private
	   */


	  isReactServer() {
	    return Browser_1.Browser.get().isLocalhost && ( // react
	    Browser_1.Browser.get().port >= 3000 && Browser_1.Browser.get().port < 3050 || // storybook
	    Browser_1.Browser.get().port >= 9000 && Browser_1.Browser.get().port < 9050);
	  }
	  /**
	   * Creates a new application for the Browser Platform.
	   *
	   * @param {Object} options - Application Configuration options.
	   * @param {MaximoClient} options.client - Maximo Client instance.
	   */


	  newApplication() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _Log.default.i(TAG, 'Creating new Application with options', options); //istanbul ignore else


	    if (!options.client) {
	      options.client = this.newClient(options);
	    }

	    options.localizer = options.localizer || this.newLocalizer(options);
	    let app = new _Application.default(options);
	    return app;
	  }
	  /**
	   * Initialize the localizer for the Application.
	   *
	   * @param {*} options - Localizer options.
	   * @param {*} options.labelSrc - Labels source.
	   * @param {*} options.messageSrc - Messages source.
	   * 
	   * @returns {Localizer} New Localizer instance.
	   */


	  newLocalizer(options) {
	    //determine whether or not labels should be loaded from JSON or Maximo
	    if (options.labelSrc && options.messageSrc) {
	      //create a new JSONLocalizationSource
	      this.localizationSource = new _JSONLocalizationSource.default(options);
	    } else if (options.client) {
	      //create a new RESTLocalizationSource
	      this.localizationSource = new _RESTLocalizationSource.default(options, options.client);
	    }

	    if (options.mockLocale) {
	      //create a new MOCKLocalizationSource
	      this.localizationSource = new _MOCKLocalizationSource.default(this.localizationSource, options);
	    }

	    return new _Localizer.default(this.localizationSource, {});
	  }

	}

	var _default = BrowserPlatform;
	exports.default = _default;
	});

	unwrapExports(BrowserPlatform_1);

	var AnywherePlatform_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _Device = _interopRequireDefault(Device_1);

	var _AnywhereDevice = _interopRequireDefault(AnywhereDevice_1);



	var _BrowserPlatform = _interopRequireDefault(BrowserPlatform_1);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	const TAG = Constants.framework + '-AnywherePlatform';

	class AnywherePlatform extends _BrowserPlatform.default {
	  configure() {
	    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    this.options = options;

	    _Log.default.i(TAG, 'Configuring Anywhere Platform with options', options);

	    this.configureLogging(options); // set the Factory Implementations

	    _Device.default.setImplementation(_AnywhereDevice.default);

	    Browser_1.Browser.setImplementation(Browser_1.DefaultBrowser);
	  }

	}

	var _default = AnywherePlatform;
	exports.default = _default;
	});

	unwrapExports(AnywherePlatform_1);

	var NodeBrowser_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;


	/**
	 * NodeJS abstraction for a Browser.
	 */


	class NodeBrowser extends Browser_1.DefaultBrowser {
	  initialize() {
	    // nothing for us to do really, just prevent default browser from initializing.
	    this.isBrowser = false;
	  }

	}

	var _default = NodeBrowser;
	exports.default = _default;
	});

	unwrapExports(NodeBrowser_1);

	var NodeDevice_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;


	/**
	 * NodeJS abstraction for a Device.
	 */


	class NodeDevice extends Device_1.DefaultDevice {
	  constructor() {
	    super();
	    this.name = "nodejs";
	    this.isBrowser = false;
	    this.isHeadless = true;
	  }

	}

	var _default = NodeDevice;
	exports.default = _default;
	});

	unwrapExports(NodeDevice_1);

	var NodePlatform_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Log = _interopRequireDefault(Log_1);

	var _Device = _interopRequireDefault(Device_1);

	var _Browser = _interopRequireDefault(Browser_1);

	var _NodeDevice = _interopRequireDefault(NodeDevice_1);

	var _NodeBrowser = _interopRequireDefault(NodeBrowser_1);

	var _Platform = _interopRequireDefault(Platform_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	/**
	 * Configures the factories for a NodeJS platform.
	 */


	class NodePlatform extends _Platform.default {
	  configure(options) {
	    _Log.default.isDebug('Configuring NodeJS Platform with options', options); // set the Factory Implementations


	    _Device.default.setImplementation(_NodeDevice.default);

	    _Browser.default.setImplementation(_NodeBrowser.default);
	  }

	}

	var _default = NodePlatform;
	exports.default = _default;
	});

	unwrapExports(NodePlatform_1);

	var build = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "Application", {
	  enumerable: true,
	  get: function get() {
	    return _Application.default;
	  }
	});
	Object.defineProperty(exports, "Page", {
	  enumerable: true,
	  get: function get() {
	    return _Page.default;
	  }
	});
	Object.defineProperty(exports, "Authenticator", {
	  enumerable: true,
	  get: function get() {
	    return _Authenticator.default;
	  }
	});
	Object.defineProperty(exports, "AuthState", {
	  enumerable: true,
	  get: function get() {
	    return _AuthState.default;
	  }
	});
	Object.defineProperty(exports, "CredentialProvider", {
	  enumerable: true,
	  get: function get() {
	    return _CredentialProvider.default;
	  }
	});
	Object.defineProperty(exports, "MAXAUTHAuthenticator", {
	  enumerable: true,
	  get: function get() {
	    return _MAXAUTHAuthenticator.default;
	  }
	});
	Object.defineProperty(exports, "MaximoAuthenticator", {
	  enumerable: true,
	  get: function get() {
	    return _MaximoAuthenticator.default;
	  }
	});
	Object.defineProperty(exports, "MAXLDAPAuthenticator", {
	  enumerable: true,
	  get: function get() {
	    return _MAXLDAPAuthenticator.default;
	  }
	});
	Object.defineProperty(exports, "SuccessAuthenticator", {
	  enumerable: true,
	  get: function get() {
	    return _SuccessAuthenticator.default;
	  }
	});
	Object.defineProperty(exports, "RESTConnection", {
	  enumerable: true,
	  get: function get() {
	    return _RESTConnection.default;
	  }
	});
	Object.defineProperty(exports, "RESTError", {
	  enumerable: true,
	  get: function get() {
	    return _RESTError.default;
	  }
	});
	Object.defineProperty(exports, "Constants", {
	  enumerable: true,
	  get: function get() {
	    return _Constants.default;
	  }
	});
	Object.defineProperty(exports, "DataAdapter", {
	  enumerable: true,
	  get: function get() {
	    return _DataAdapter.default;
	  }
	});
	Object.defineProperty(exports, "Datasource", {
	  enumerable: true,
	  get: function get() {
	    return _Datasource.default;
	  }
	});
	Object.defineProperty(exports, "DataWindowManager", {
	  enumerable: true,
	  get: function get() {
	    return _DataWindowManager.default;
	  }
	});
	Object.defineProperty(exports, "JSONDataAdapter", {
	  enumerable: true,
	  get: function get() {
	    return _JSONDataAdapter.default;
	  }
	});
	Object.defineProperty(exports, "RESTDataAdapter", {
	  enumerable: true,
	  get: function get() {
	    return _RESTDataAdapter.default;
	  }
	});
	Object.defineProperty(exports, "Browser", {
	  enumerable: true,
	  get: function get() {
	    return _Browser.default;
	  }
	});
	Object.defineProperty(exports, "Device", {
	  enumerable: true,
	  get: function get() {
	    return _Device.default;
	  }
	});
	Object.defineProperty(exports, "JSONLocalizationSource", {
	  enumerable: true,
	  get: function get() {
	    return _JSONLocalizationSource.default;
	  }
	});
	Object.defineProperty(exports, "LocalizationSource", {
	  enumerable: true,
	  get: function get() {
	    return _LocalizationSource.default;
	  }
	});
	Object.defineProperty(exports, "Localizer", {
	  enumerable: true,
	  get: function get() {
	    return _Localizer.default;
	  }
	});
	Object.defineProperty(exports, "MOCKLocalizationSource", {
	  enumerable: true,
	  get: function get() {
	    return _MOCKLocalizationSource.default;
	  }
	});
	Object.defineProperty(exports, "RESTLocalizationSource", {
	  enumerable: true,
	  get: function get() {
	    return _RESTLocalizationSource.default;
	  }
	});
	Object.defineProperty(exports, "MaximoClient", {
	  enumerable: true,
	  get: function get() {
	    return _MaximoClient.default;
	  }
	});
	Object.defineProperty(exports, "AnywhereDevice", {
	  enumerable: true,
	  get: function get() {
	    return _AnywhereDevice.default;
	  }
	});
	Object.defineProperty(exports, "AnywherePlatform", {
	  enumerable: true,
	  get: function get() {
	    return _AnywherePlatform.default;
	  }
	});
	Object.defineProperty(exports, "BrowserPlatform", {
	  enumerable: true,
	  get: function get() {
	    return _BrowserPlatform.default;
	  }
	});
	Object.defineProperty(exports, "NodeBrowser", {
	  enumerable: true,
	  get: function get() {
	    return _NodeBrowser.default;
	  }
	});
	Object.defineProperty(exports, "NodeDevice", {
	  enumerable: true,
	  get: function get() {
	    return _NodeDevice.default;
	  }
	});
	Object.defineProperty(exports, "NodePlatform", {
	  enumerable: true,
	  get: function get() {
	    return _NodePlatform.default;
	  }
	});
	Object.defineProperty(exports, "Platform", {
	  enumerable: true,
	  get: function get() {
	    return _Platform.default;
	  }
	});
	Object.defineProperty(exports, "Controllable", {
	  enumerable: true,
	  get: function get() {
	    return _Controllable.default;
	  }
	});
	Object.defineProperty(exports, "Debouncer", {
	  enumerable: true,
	  get: function get() {
	    return _Debouncer.default;
	  }
	});
	Object.defineProperty(exports, "EventEmitter", {
	  enumerable: true,
	  get: function get() {
	    return _EventEmitter.default;
	  }
	});
	Object.defineProperty(exports, "Factory", {
	  enumerable: true,
	  get: function get() {
	    return _Factory.default;
	  }
	});
	Object.defineProperty(exports, "log", {
	  enumerable: true,
	  get: function get() {
	    return _Log.default;
	  }
	});
	Object.defineProperty(exports, "Log", {
	  enumerable: true,
	  get: function get() {
	    return _Log.Log;
	  }
	});
	Object.defineProperty(exports, "LogPrinter", {
	  enumerable: true,
	  get: function get() {
	    return _LogPrinter.default;
	  }
	});
	Object.defineProperty(exports, "ObjectUtil", {
	  enumerable: true,
	  get: function get() {
	    return _ObjectUtil.default;
	  }
	});

	var _Application = _interopRequireDefault(Application_1);

	var _Page = _interopRequireDefault(Page_1);

	var _Authenticator = _interopRequireDefault(Authenticator_1);

	var _AuthState = _interopRequireDefault(AuthState_1);

	var _CredentialProvider = _interopRequireDefault(CredentialProvider_1);

	var _MAXAUTHAuthenticator = _interopRequireDefault(MAXAUTHAuthenticator_1);

	var _MaximoAuthenticator = _interopRequireDefault(MaximoAuthenticator_1);

	var _MAXLDAPAuthenticator = _interopRequireDefault(MAXLDAPAuthenticator_1);

	var _SuccessAuthenticator = _interopRequireDefault(SuccessAuthenticator_1);

	var _RESTConnection = _interopRequireDefault(RESTConnection_1);

	var _RESTError = _interopRequireDefault(RESTError_1);

	var _Constants = _interopRequireDefault(Constants);

	var _DataAdapter = _interopRequireDefault(DataAdapter_1);

	var _Datasource = _interopRequireDefault(Datasource_1);

	var _DataWindowManager = _interopRequireDefault(DataWindowManager_1);

	var _JSONDataAdapter = _interopRequireDefault(JSONDataAdapter_1);

	var _RESTDataAdapter = _interopRequireDefault(RESTDataAdapter_1);

	var _Browser = _interopRequireDefault(Browser_1);

	var _Device = _interopRequireDefault(Device_1);

	var _JSONLocalizationSource = _interopRequireDefault(JSONLocalizationSource_1);

	var _LocalizationSource = _interopRequireDefault(LocalizationSource_1);

	var _Localizer = _interopRequireDefault(Localizer_1);

	var _MOCKLocalizationSource = _interopRequireDefault(MOCKLocalizationSource_1);

	var _RESTLocalizationSource = _interopRequireDefault(RESTLocalizationSource_1);

	var _MaximoClient = _interopRequireDefault(MaximoClient_1);

	var _AnywhereDevice = _interopRequireDefault(AnywhereDevice_1);

	var _AnywherePlatform = _interopRequireDefault(AnywherePlatform_1);

	var _BrowserPlatform = _interopRequireDefault(BrowserPlatform_1);

	var _NodeBrowser = _interopRequireDefault(NodeBrowser_1);

	var _NodeDevice = _interopRequireDefault(NodeDevice_1);

	var _NodePlatform = _interopRequireDefault(NodePlatform_1);

	var _Platform = _interopRequireDefault(Platform_1);

	var _Controllable = _interopRequireDefault(Controllable_1);

	var _Debouncer = _interopRequireDefault(Debouncer_1);

	var _EventEmitter = _interopRequireDefault(EventEmitter_1);

	var _Factory = _interopRequireDefault(Factory_1);

	var _Log = _interopRequireWildcard(Log_1);

	var _LogPrinter = _interopRequireDefault(LogPrinter_1);

	var _ObjectUtil = _interopRequireDefault(ObjectUtil);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) {
	          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

	          if (desc.get || desc.set) {
	            Object.defineProperty(newObj, key, desc);
	          } else {
	            newObj[key] = obj[key];
	          }
	        }
	      }
	    }

	    newObj.default = obj;
	    return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
	});

	unwrapExports(build);

	var Auth_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;



	var _NetworkUtil = _interopRequireDefault(NetworkUtil);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
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

	/*
	Auth class works off of the client(state maintainer).WHen Initializing this class a Client Object can be passed
	which is preinitialized with the authenticaotr etc.
	*/


	class Auth {
	  constructor() {
	    let client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    this.client = client;
	  }
	  /*
	  @param options {object} Contains username, password, timeout
	  */


	  async login(options) {
	    let response = {
	      'authenticated': null,
	      'response': null,
	      'error': null,
	      'responseJSON': null
	    };
	    let maximoClient = this.client.mxClient;
	    /*FIXME: ? For MAxAuthAuthenticator, if a header is set once, it is never cleared. 
	    *Even if new credentials are passed and the authenticator keeps using the old header value
	    */

	    if (maximoClient.authenticator.options.headers && maximoClient.authenticator instanceof build.MAXAUTHAuthenticator) {
	      let operationSuccess = Reflect.deleteProperty(maximoClient.authenticator.options, 'headers');

	      if (!operationSuccess) {
	        return false;
	      }
	    }

	    let connectFunc = maximoClient.connect.bind(maximoClient);
	    let result = await _NetworkUtil.default.requestWithAnExpiry(connectFunc, [options], options.timeout);

	    if (typeof result === 'string' && result === MFConstants_1.MFConstants.REQUEST_TIMEOUT) {
	      response.authenticated = false;
	      response.error = "REQUEST TIMEOUT";
	      this.client.timeoutRequest();
	      return response;
	    }

	    if (this.client.responseJSON) {
	      response.responseJSON = this.client.responseJSON;
	    } // bad credentials case:


	    if (this.client.response.redirected && this.client.authenticator.authType && this.client.authenticator.authType.toUpperCase() == 'FORM' && this.client.response.headers.get('content-type') && WL.StaticAppProps["si.platform.type"] && WL.StaticAppProps["si.platform.type"] == "weblogic" && this.client.response.headers.get('content-type').indexOf('application/json') != -1) {
	      response.authenticated = false;
	      response.errorCode = 'AUTHENTICATION REQUIRED';

	      if (this.client.authenticator.authenticated) {
	        this.client.authenticator.authenticated = false;
	        this.client.authenticated = false;
	      }

	      result = false;
	      response.status = '401';
	      response.error = {
	        status: '401'
	      };
	      response.error.statusText = this.client.response.statusText;
	      return response;
	    } else if (this.client.response.redirected && this.client.authenticator.authType && this.client.authenticator.authType.toUpperCase() == 'FORM' && this.client.response.headers.get('content-type') && (!WL.StaticAppProps["si.platform.type"] && this.client.response.headers.get('content-type').indexOf('text/html') != -1 || WL.StaticAppProps["si.platform.type"] != "weblogic" && this.client.response.headers.get('content-type').indexOf('text/html') != -1)) {
	      response.authenticated = false;
	      response.errorCode = 'AUTHENTICATION REQUIRED';

	      if (this.client.authenticator.authenticated) {
	        this.client.authenticator.authenticated = false;
	        this.client.authenticated = false;
	      }

	      result = false;
	      response.status = '401';
	      response.error = {
	        status: '401'
	      };
	      response.error.statusText = this.client.response.statusText;
	      return response;
	    }

	    response.authenticated = result === true;
	    response.response = this.client.response;

	    if (result !== true) {
	      response.error = {};

	      if (maximoClient.authenticator.authType && maximoClient.authenticator.authType.toUpperCase() == 'FORM' && this.client.response.status == '403') {
	        response.error.status = '401'; //403 is an authentication error for form auth. 403 for oslc is password expired so change to 401
	      } else {
	        response.error.status = this.client.response.status;
	      }

	      response.error.statusText = this.client.response.statusText;
	    }

	    return response;
	  }

	}

	var _default = Auth;
	exports.default = _default;
	});

	unwrapExports(Auth_1);

	var Client = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;



	var _Auth = _interopRequireDefault(Auth_1);



	var _NetworkUtil = _interopRequireDefault(NetworkUtil);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
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


	const TAG = MFConstants_1.MFConstants.FRAMEWORK + '-Client';

	class AnywhereClient {
	  constructor(options) {
	    this.setResponseListener = null;
	    this.response = null;
	    this.responseJSON = null;

	    if (options.authType && (options.authType.toUpperCase() === 'FORM' || options.authType.toUpperCase() === 'BASIC')) {
	      this._authenticator = options.authType ? new build.MAXLDAPAuthenticator({
	        authType: options.authType
	      }) : this._authenticator;
	    } else {
	      this._authenticator = options.authenticator ? options.authenticator : new build.MAXAUTHAuthenticator();
	    }

	    this.baseUrl = options.baseUrl;
	    this.timeout = options.timeout;
	    this._authConnection = build.RESTConnection.newInstance({
	      'baseUrl': options.baseUrl,
	      'oslcContext': 'oslc',
	      'lean': false
	    });
	    this._mxClient = new build.MaximoClient(this.authenticator, this.authConnection);
	  }

	  newRESTConnection(options) {
	    return build.RESTConnection.newInstance(options);
	  }

	  setResponse(resp, path, fetchOptions, json) {
	    this.response = resp;
	    this.responseJSON = json;
	  }

	  set authenticator(authObj) {
	    this._authenticator = authObj;
	  }

	  get authenticator() {
	    return this._authenticator;
	  }

	  get authConnection() {
	    return this._authConnection;
	  }

	  get mxClient() {
	    return this._mxClient;
	  }

	  timeoutRequest() {
	    this.authConnection.off('response', this.setResponseListener);
	  }

	  authenticate(options) {
	    options.timeout = options.timeout ? options.timeout : this.timeout;
	    let gatekeeper = new _Auth.default(this);
	    this.setResponseListener = this.setResponse.bind(this);
	    this.authConnection.on('response', this.setResponseListener);
	    return gatekeeper.login(options);
	  }

	  clearAllCookies() {
	    return new Promise(function (resolve, reject) {
	      function successCallback() {
	        build.log.t(TAG, "Clear Cookies Plugin - completed");

	        resolve();
	      }

	      function failueCallback(error) {
	        build.log.t(TAG, "Clear Cookies Plugin - failed");

	        reject(error);
	      }

	      cordova.plugins.cookieManager.clearAllCookies([], successCallback, failueCallback);
	    });
	  }

	  async logout(options) {
	    try {
	      if (navigator.connection.type !== Connection.NONE) {
	        options.timeout = options.timeout ? options.timeout : 4000;
	        let logoutFunc = this.mxClient.disconnect.bind(this.mxClient);
	        let result = await _NetworkUtil.default.requestWithAnExpiry(logoutFunc, [], options.timeout);

	        if (result === MFConstants_1.MFConstants.REQUEST_TIMEOUT) {
	          build.log.i(TAG, "Logout request timed out");
	        }
	      }
	    } catch (err) {
	      build.log.t(TAG, "Server logout - failed", err);
	    }

	    return this.clearAllCookies();
	  }

	}

	const AnywhereClientFactory = new build.Factory(AnywhereClient);
	var _default = AnywhereClientFactory;
	exports.default = _default;
	});

	unwrapExports(Client);

	var ConnectivityChecker_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _NetworkUtil = _interopRequireDefault(NetworkUtil);





	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
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


	const TAG = MFConstants_1.MFConstants.FRAMEWORK + '-ConnectivityChecker';
	/*
	  Checks connectivity with the server
	  ToDo: Checks device connectivity
	*/

	class ConnectivityChecker {
	  /*
	   * This method checkes if a connection to the server is available.
	   *
	   * @param {Object} options Object containing {baseURL, timeout}.
	   * @returns {Promise} result true/false based on whether connectivity is available.
	   * @memberof ConnectivityChecker
	   */
	  async isServerConnected(options) {
	    options.timeout = options.timeout ? options.timeout : 4000;

	    build.log.t(TAG, "Timeout for ping requests", options.timeout);

	    let sendPing = this.sendPingRequest.bind(this);
	    let sCheck = 0;

	    if (device && device.platform != "browser") {
	      sCheck = 200;
	      options.mode = 'cors';
	    }

	    let result = await _NetworkUtil.default.requestWithAnExpiry(sendPing, [options], options.timeout);

	    if (result === MFConstants_1.MFConstants.REQUEST_TIMEOUT) {
	      build.log.i(TAG, "Logout request timed out");

	      result = false;
	    } else if (typeof result.status === 'number' && result.status === sCheck) {
	      result = true;
	    } else {
	      result = false;
	    }

	    return result;
	  }
	  /*
	   * Sends a ping request to the server.
	   *
	   * @param {Object} options Object with {mode}.
	   * @returns {Object} response object of the fetch API.
	   * @memberof ConnectivityChecker.
	   */


	  async sendPingRequest(options) {
	    let auxUrl = new URL(options.baseUrl);
	    let url = auxUrl.origin + '/maxanywhere/AnywhereAppUpdate';
	    let requestOptions = {
	      method: 'get',
	      mode: options.mode || 'no-cors'
	    };

	    try {
	      const response = await fetch(url, requestOptions);
	      return response;
	    } catch (error) {
	      return MFConstants_1.MFConstants.REQUEST_TIMEOUT;
	    }
	  }

	}

	let ConnectionChecker = new ConnectivityChecker();
	var _default = ConnectionChecker;
	exports.default = _default;
	});

	unwrapExports(ConnectivityChecker_1);

	var FileManager_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FileManager = exports.filesystem = void 0;




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


	const TAG = MFConstants_1.MFConstants.FRAMEWORK + '-FileManager';

	class FileManager {
	  getlocalfileSystem() {
	    return new Promise(function (resolve, reject) {
	      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
	        build.log.i(TAG, 'File system open: ', fs.name);

	        resolve(fs);
	      }, function (error) {
	        build.log.i(TAG, 'Error opening filr system:  ', error);

	        reject(error);
	      });
	    });
	  }

	  readFile(relativePath) {
	    return new Promise(function (resolve, reject) {
	      function fileReader(fileEntry) {
	        fileEntry.file(function (file) {
	          let reader = new FileReader();

	          reader.onloadend = function () {
	            build.log.i(TAG, "File finished loading from assets");

	            resolve(this.result);
	          };

	          reader.readAsText(file);
	        });
	      }

	      function failCallback(error) {
	        build.log.i(TAG, "Error resolving local file system url");

	        reject(error);
	      }

	      window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "www/" + relativePath, function () {
	        window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "www/" + relativePath, fileReader, failCallback);
	      }, function () {
	        window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/" + relativePath, fileReader, failCallback);
	      });
	    });
	  }

	}

	exports.FileManager = FileManager;
	const filesystem = new FileManager();
	exports.filesystem = filesystem;
	});

	unwrapExports(FileManager_1);
	var FileManager_2 = FileManager_1.FileManager;
	var FileManager_3 = FileManager_1.filesystem;

	var DeviceInfo_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
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

	class DeviceInfo {
	  constructor() {
	    this.Constants = {
	      'ANDROID': "Android",
	      'IOS': 'iOS',
	      'BROWSER': 'browser',
	      'WINDOWS': 'windows'
	    };
	  } // Depending on the device, a few examples are:
	  //   - "Android"
	  //   - "BlackBerry 10"
	  //   - "browser"
	  //   - "iOS"
	  //   - "WinCE"
	  //   - "Tizen"
	  //   - "Mac OS X"


	  get platform() {
	    return device.platform;
	  } // Android: Returns a random 64-bit integer (as a string, again!)
	  //          The integer is generated on the device's first boot
	  //
	  // BlackBerry: Returns the PIN number of the device
	  //             This is a nine-digit unique integer (as a string, though!)
	  //
	  // iPhone: (Paraphrased from the UIDevice Class documentation)
	  //         Returns the [UIDevice identifierForVendor] UUID which is unique and the same for all apps installed by the same vendor. However the UUID can be different if the user deletes all apps from the vendor and then reinstalls it.
	  // Windows Phone 7 : Returns a hash of device+current user,
	  // if the user is not defined, a guid is generated and will persist until the app is uninstalled
	  // Tizen: returns the device IMEI (International Mobile Equipment Identity or IMEI is a number
	  // unique to every GSM and UMTS mobile phone.


	  get deviceId() {
	    return device.uuid;
	  } // Android:    Froyo OS would return "2.2"
	  //             Eclair OS would return "2.1", "2.0.1", or "2.0"
	  //             Version can also return update level "2.1-update1"
	  //
	  // BlackBerry: Torch 9800 using OS 6.0 would return "6.0.0.600"
	  //
	  // Browser:    Returns version number for the browser
	  //
	  // iPhone:     iOS 3.2 returns "3.2"
	  //
	  // Windows Phone 7: returns current OS version number, ex. on Mango returns 7.10.7720
	  // Windows 8: return the current OS version, ex on Windows 8.1 returns 6.3.9600.16384
	  // Tizen: returns "TIZEN_20120425_2"
	  // OSX:        El Capitan would return "10.11.2"


	  get osVersion() {
	    return device.version;
	  }

	}

	const deviceInfo = new DeviceInfo();
	var _default = deviceInfo;
	exports.default = _default;
	});

	unwrapExports(DeviceInfo_1);

	var LocaleInfo_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
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

	class LocaleInfo {
	  constructor() {
	    this.locale = navigator.language.replace('-', '_');
	  }

	  initLocale() {
	    return new Promise((resolve, reject) => {
	      this.locale = navigator.language.replace('-', '_');
	      resolve(this.locale); //navigator.globalization.getLocaleName((locale) => {
	      //this.locale = locale.value
	      //resolve(locale.value);
	      // if (WL.Client.getEnvironment() === WL.Environment.WINDOWS8 || WL.Client.getEnvironment() === WL.Environment.WINDOWS || WL.Client.getEnvironment() === WL.Environment.WINDOWSPHONE8) {
	      //     // On Win 8, navigator.userLanguage doesn't return the language preference, it returns regional format
	      //     // Therefore, use the Windows API to get the correct language preference.
	      //     __locale = Windows.System.UserProfile.GlobalizationPreferences.languages[0];
	      //     if (__locale.indexOf('zh-Hans') !== -1) {
	      //         __locale = 'zh-Hans';
	      //         }
	      //         if (__locale.indexOf('zh-Hant') !== -1 || __locale.indexOf('zh-HK') !== -1) {
	      //             __locale = 'zh-Hant';
	      //         }
	      //  }
	      // if ((WL.Client.getEnvironment() == WL.Env.IPHONE) || (WL.Client.getEnvironment() == WL.Env.IPAD)) {
	      //     //TODO: move this outside when cordova getPreferredLanguage() is fixed
	      //     navigator.globalization.getPreferredLanguage(function(language) {
	      //         var __lang = language.value;
	      //         if(typeof __lang !== 'undefined' ) {
	      //             if(__lang.length > 2) {
	      //                 __locale = __lang;
	      //             } else {
	      //                 __locale = __lang + __locale.substr(2);
	      //             }
	      //         }
	      //         
	      //     }
	      // }
	      // }, function(err) {
	      //     reject(err);
	      // })
	    });
	  }

	}

	const localeInfo = new LocaleInfo();
	var _default = localeInfo;
	exports.default = _default;
	});

	unwrapExports(LocaleInfo_1);

	var NetworkInfo_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
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

	class NetworkInfo {
	  constructor() {
	    this.Connection = {
	      'UNKNOWN': 'unknown',
	      'ETHERNET': 'ethernet',
	      'WIFI': 'wifi',
	      'CELL_2G': 'cell2g',
	      'CELL_3G': 'cell3g',
	      'CELL_4G': 'cell4g',
	      'CELL': 'cell',
	      'CELLULAR': 'cellular',
	      'NONE': 'none'
	    };
	  }

	  getNetworkType() {
	    if (navigator.connection.type === Connection.WIFI) {
	      return this.Connection.WIFI;
	    } else if ([Connection.CELL_2G, Connection.CELL_3G, Connection.CELL_4G, Connection.CELL].indexOf(navigator.connection.type) > -1) {
	      return this.Connection.CELLULAR;
	    }

	    return this.Connection.NONE;
	  }

	  get isDeviceConnected() {
	    if (navigator.connection.type !== Connection.UNKNOWN && navigator.connection.type !== Connection.NONE) {
	      return true;
	    }

	    return false;
	  }

	  getCellularType() {
	    let cellType = null;

	    switch (navigator.connection.type) {
	      case Connection.CELL_2G:
	        cellType = this.Connection.CELL_2G;
	        break;

	      case Connection.CELL_3G:
	        cellType = this.Connection.CELL_3G;
	        break;

	      case Connection.CELL_4G:
	        cellType = this.Connection.CELL_4G;
	        break;

	      default:
	        cellType = '';
	        break;
	    }

	    return cellType;
	  }

	}

	const networkInfo = new NetworkInfo();
	var _default = networkInfo;
	exports.default = _default;
	});

	unwrapExports(NetworkInfo_1);

	var RestCommunicationManager_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _Client = _interopRequireDefault(Client);

	var _NetworkUtil = _interopRequireDefault(NetworkUtil);



	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
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


	const controller = new AbortController();
	const signal = controller.signal;

	class RestCommunicationManager {
	  /**
	   * This method does trigger a server call based on provided parameter. If the reqOptions does have a body element a POST request will be trigger,
	   *  otherwise GET will be executed. 
	   * @param {*} parameters - a resource url without oslc context (i.g: /os/oslcplusdsplan)
	   * @param {*} reqOptions request parameters like headers or body for post request
	   * @param {*} options - timeout and callback functions
	   */
	  async accessServer(parameters, reqOptions, options) {
	    reqOptions.signal = signal; //get graphite client

	    let cli = _Client.default.get(); //get authenticade rest connection from graphite client


	    let conn = cli.authConnection;

	    if (!reqOptions.headers) {
	      reqOptions.headers = {};
	    } //call post or get based on the flag 


	    let connectFunc = conn.get.bind(conn);

	    if (reqOptions.usePost) {
	      connectFunc = conn.post.bind(conn);

	      if (!reqOptions.body) {
	        reqOptions.headers["Content-type"] = 'application/x-www-form-urlencoded';
	        let par = parameters.split('?');
	        parameters = par[0];

	        if (par.length == 2) {
	          reqOptions.body = par[1];
	        }
	      }
	    } //If sending data also send CSRF token by maximo imposition. Also post data can not use ‘application/x-www-form-urlencoded’;


	    if (reqOptions.body) {
	      connectFunc = conn.post.bind(conn);
	      reqOptions.headers["csrftoken"] = conn.getCSRFToken();
	    }

	    reqOptions.headers["requestsource"] = "anywhere";
	    let timstmp = new Date();
	    reqOptions.headers["requestdate"] = timstmp.toUTCString(); //surounding with try cath since we have two erro cases here
	    //1- request timeout by server delay
	    //2- one pending request is waiting then subsequent reques crash by unresponsive host due to connection lost

	    try {
	      let result = await _NetworkUtil.default.requestWithAnExpiry(connectFunc, [parameters, reqOptions], options.timeout ? options.timeout : 10000);
	      let endStamp = new Date();
	      let response = {}; //here we verify if the request keep pending and we are forcing a timeout

	      if (typeof result === 'string' && result === MFConstants_1.MFConstants.REQUEST_TIMEOUT) {
	        response.authenticated = false;
	        response.error = "REQUEST TIMEOUT";

	        if (cli.authenticator.authenticated) {
	          cli.timeoutRequest();
	        }

	        controller.abort();
	        options.onFailure(response);
	        return;
	      } //here we know that we receive a response from server


	      response.invocationResult = result;
	      response.invocationResult.requestDuration = endStamp.getTime() - timstmp.getTime();
	      response.invocationResult.responseHeaders = {};

	      this._getAllReturnedHeaders(cli, response);

	      if (result.redirected && cli.authenticator.authType && cli.authenticator.authType.toUpperCase() == 'FORM' && response.invocationResult.responseHeaders['content-type'] && response.invocationResult.responseHeaders['content-type'].indexOf('text/html') != -1) {
	        response.authenticated = false;
	        response.errorCode = 'AUTHENTICATION REQUIRED';

	        if (cli.authenticator.authenticated) {
	          cli.timeoutRequest();
	          cli.authenticator.authenticated = false;
	          cli.authenticated = false;
	        }

	        controller.abort();
	        options.onFailure(response);
	        return;
	      }

	      options.onSuccess(response);
	    } catch (error) {
	      let errResp = {};
	      errResp.invocationResult = {};
	      errResp.invocationResult.responseHeaders = {}; //check if we fail due maximo error response or connection lost

	      if (error.jsonResponse && error.jsonResponse["oslc:Error"]) {
	        var oslcError = error.jsonResponse["oslc:Error"];
	        errResp.invocationResult.errors = [oslcError];
	        var adminLogout = oslcError['spi:reasonCode'] == 'BMXAA5646I';

	        if (adminLogout) {
	          errResp.errorCode = 'AUTHENTICATION REQUIRED';
	        }

	        if (cli.authenticator.authenticated && (error.code == '401' || adminLogout)) {
	          //oslc error of invalid credentials or logged out by admin either case the user is not longer authenticated with the server.
	          cli.timeoutRequest();
	          cli.authenticator.authenticated = false;
	          cli.authenticated = false;
	        }
	      } else {
	        errResp.errorCode = 'UNRESPONSIVE_HOST';
	        errResp.error = error;
	      }

	      errResp.authenticated = false;

	      this._getAllReturnedHeaders(cli, errResp);

	      if (cli.authenticator.authenticated) {
	        cli.timeoutRequest();
	      }

	      controller.abort();

	      if (errResp.errorCode == 'UNRESPONSIVE_HOST' && options.onConnectionFailure) {
	        options.onConnectionFailure(errResp);
	      } else {
	        options.onFailure(errResp);
	      }
	    }
	  }
	  /**
	   * This function does add all returned headers to the reponse before send it to callback methods
	   * Since we are doing a CORS connection, headers that will be exposed depends os maximo configuration.
	   * @param {*} cli - graphite authenticated cliente used to do the request
	   * @param {*} resp - reponse before it send to the callback methods.
	   */


	  _getAllReturnedHeaders(cli, resp) {
	    if (cli && cli.response) {
	      cli.response.headers.forEach(function (value, name) {
	        resp.invocationResult.responseHeaders[name] = value;
	      });
	    }
	  }

	}

	var _default = RestCommunicationManager;
	exports.default = _default;
	});

	unwrapExports(RestCommunicationManager_1);

	var AppBuildInfo_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
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

	class AppBuildInfo {
	  get displayName() {
	    // get application name from plugin
	    return BuildInfo.name;
	  }

	}

	const appBuildInfo = new AppBuildInfo();
	var _default = appBuildInfo;
	exports.default = _default;
	});

	unwrapExports(AppBuildInfo_1);

	var awInterface = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "Authenticator", {
	  enumerable: true,
	  get: function get() {
	    return _Auth.default;
	  }
	});
	Object.defineProperty(exports, "AnywhereClient", {
	  enumerable: true,
	  get: function get() {
	    return _Client.default;
	  }
	});
	Object.defineProperty(exports, "ConnectionChecker", {
	  enumerable: true,
	  get: function get() {
	    return _ConnectivityChecker.default;
	  }
	});
	Object.defineProperty(exports, "FileSystem", {
	  enumerable: true,
	  get: function get() {
	    return FileManager_1.filesystem;
	  }
	});
	Object.defineProperty(exports, "DeviceInfo", {
	  enumerable: true,
	  get: function get() {
	    return _DeviceInfo.default;
	  }
	});
	Object.defineProperty(exports, "LocaleInfo", {
	  enumerable: true,
	  get: function get() {
	    return _LocaleInfo.default;
	  }
	});
	Object.defineProperty(exports, "NetworkInfo", {
	  enumerable: true,
	  get: function get() {
	    return _NetworkInfo.default;
	  }
	});
	Object.defineProperty(exports, "RestCommunicationManager", {
	  enumerable: true,
	  get: function get() {
	    return _RestCommunicationManager.default;
	  }
	});
	Object.defineProperty(exports, "AppBuildInfo", {
	  enumerable: true,
	  get: function get() {
	    return _AppBuildInfo.default;
	  }
	});

	var _Auth = _interopRequireDefault(Auth_1);

	var _Client = _interopRequireDefault(Client);

	var _ConnectivityChecker = _interopRequireDefault(ConnectivityChecker_1);



	var _DeviceInfo = _interopRequireDefault(DeviceInfo_1);

	var _LocaleInfo = _interopRequireDefault(LocaleInfo_1);

	var _NetworkInfo = _interopRequireDefault(NetworkInfo_1);

	var _RestCommunicationManager = _interopRequireDefault(RestCommunicationManager_1);

	var _AppBuildInfo = _interopRequireDefault(AppBuildInfo_1);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}
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


	document.addEventListener("deviceready", function () {
	  let evt = new Event("anywhereready", {
	    bubbles: true,
	    cancelable: false
	  });
	  document.dispatchEvent(evt);
	}, false);
	});

	unwrapExports(awInterface);

	var wlInterface = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;


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


	var WL = {};
	WL.constant = {};
	WL.constant.ASCENDING = "asc";
	WL.constant.DESCENDING = "desc";
	WL.AppProperty = {};
	WL.AppProperty.APP_DISPLAY_NAME = "displayName"; //WL.ENvironment

	WL.Client = {
	  platform: null,
	  _isConnected: null,
	  init: function init(initOptions) {
	    WL.Client.setEnvironment();

	    WL.Client._setClientProperties().then(() => {
	      initOptions.authType = WL.StaticAppProps['si.auth.type'];

	      awInterface.AnywhereClient.get(initOptions);

	      WL.Client.init.completed = true;
	      let evt = new Event("WLClientInit", {
	        bubbles: true,
	        cancelable: false
	      });
	      document.dispatchEvent(evt);
	    }).catch(err => {
	      WL.Client.init.completed = false;
	    });
	  },

	  /*
	  @param {Object} : SHould contain two callback functions onSuccess and onFailure with options containing baserUrl
	  */
	  connect: function connect(callbacks) {
	    console.log("Calling connect"); // Function to invoke ping with timeout

	    function onConnectSuccess() {
	      if (!WL.Client._isConnected) {
	        WL.Client._isConnected = true;
	        var mxconnectevent = new CustomEvent(WL.Events.WORKLIGHT_IS_CONNECTED, {
	          "status": "connected"
	        });
	        document.dispatchEvent(mxconnectevent);
	      }

	      callbacks.onSuccess();
	    }

	    function onConnectFailure() {
	      if (WL.Client._isConnected) {
	        WL.Client._isConnected = false;
	        var mxdisconnectevent = new CustomEvent(WL.Events.WORKLIGHT_IS_DISCONNECTED, {
	          "status": "disconnected"
	        });
	        document.dispatchEvent(mxdisconnectevent);
	      }

	      callbacks.onFailure({
	        'errorCode': "Connect Failed"
	      });
	    }

	    let wlClient = awInterface.AnywhereClient.get();

	    callbacks.options = {};
	    callbacks.options.baseUrl = wlClient.baseUrl;

	    let resp = awInterface.ConnectionChecker.isServerConnected(callbacks.options); // use ping promise to invoke callbacks for request without timeout


	    resp.then(response => {
	      if (response) {
	        onConnectSuccess();
	      } else {
	        onConnectFailure();
	      }
	    }).catch(err => {
	      onConnectFailure();
	    });
	  },

	  /*
	  @param {Object} : SHould contain two callback functions onSuccess and onFailure
	  */
	  login: function login(options, callbacks) {
	    console.log("Calling login");

	    let wlClient = awInterface.AnywhereClient.get();

	    let loginPromise = wlClient.authenticate(options);

	    if (callbacks === null) {
	      return loginPromise;
	    } else {
	      loginPromise.then(response => {
	        if (response.authenticated) {
	          callbacks.onSuccess(response);
	        } else {
	          callbacks.onFailure(response);
	        }
	      }).catch(error => {
	        callbacks.onFailure(error);
	      });
	    }
	  },
	  logout: function logout(options) {
	    let client = awInterface.AnywhereClient.get();

	    client.logout(options).then(() => {
	      options.onSuccess();
	    }).catch(err => {
	      options.onFailure(err);
	    });
	  },
	  setEnvironment: function setEnvironment() {
	    console.log("Calling getEnvironment");
	    let platform = awInterface.DeviceInfo.platform;
	    let currWLPlatform = null;

	    switch (platform) {
	      case awInterface.DeviceInfo.Constants.ANDROID:
	        currWLPlatform = WL.Environment.ANDROID;
	        break;

	      case awInterface.DeviceInfo.Constants.BROWSER:
	        currWLPlatform = WL.Environment.PREVIEW;
	        break;

	      case awInterface.DeviceInfo.Constants.IOS:
	        currWLPlatform = WL.Environment.IPHONE;
	        break;

	      case awInterface.DeviceInfo.Constants.WINDOWS:
	        currWLPlatform = WL.Environment.WINDOWS8;
	        break;

	      default:
	        currWLPlatform = 'Environment not supported';
	        break;
	    }

	    WL.AppProperty.displayName = awInterface.AppBuildInfo.displayName;
	    WL.Client.platform = currWLPlatform;
	  },
	  getEnvironment: function getEnvironment() {
	    return WL.Client.platform;
	  },
	  getAppProperty: function getAppProperty(propertyName) {
	    return WL.AppProperty[propertyName];
	  },
	  getCSRFToken: function getCSRFToken() {
	    let client = awInterface.AnywhereClient.get();

	    return client.authConnection.getCSRFToken();
	  },
	  getMaximoAuthKey: function getMaxAuth() {
	    let client = awInterface.AnywhereClient.get();

	    let authkey = null;

	    if (client.authenticator.options.username && client.authenticator.options.password) {
	      authkey = btoa(client.authenticator.options.username + ":" + client.authenticator.options.password);
	    }

	    return authkey;
	  },

	  invokeProcedure(invocationData, options) {
	    console.log('Calling invokeProcedure');

	    try {
	      let reqOptions = {};
	      reqOptions.headers = {};
	      let href = null;

	      switch (invocationData.procedure) {
	        case 'getServerDate':
	          href = '/'; //Just use default oslc request

	          break;

	        case 'query':
	          reqOptions.headers.usemaxfetchlimit = 'true';
	          break;

	        case 'noSessionChangePassword':
	          if (invocationData.parameters[0].username) {
	            let username = invocationData.parameters[0].username;
	            let password = invocationData.parameters[0].password;
	            reqOptions.headers.maxauth = btoa(username + ':' + password);
	          }

	        //no break, proceed to changePassword

	        case 'changePassword':
	          reqOptions.headers["x-method-override"] = 'PATCH';
	          reqOptions.headers.patchtype = 'CHPWD';

	          if (invocationData.parameters[0].payload) {
	            reqOptions.body = JSON.stringify(invocationData.parameters[0].payload);
	          }

	          break;

	        case 'updateResource':
	          reqOptions.headers['x-method-override'] = 'PATCH';

	          if (invocationData.parameters[0].hasDeletion !== true) {
	            reqOptions.headers.patchtype = 'MERGE';
	          }

	        //no break, proceed to insertResource

	        case 'insertResource':
	          if (invocationData.parameters[0].payload) {
	            reqOptions.body = JSON.stringify(invocationData.parameters[0].payload);
	          }

	          if (invocationData.parameters[0].transactionid) {
	            reqOptions.headers.transactionid = invocationData.parameters[0].transactionid;
	          }

	          if (invocationData.parameters[0].properties) {
	            reqOptions.headers.properties = invocationData.parameters[0].properties;
	          }

	          break;

	        default:
	          options.onFailure('Procedure does not exist, please check invoke api for method = ' + invocationData.procedure);
	          return;
	      }

	      if (!href) {
	        href = invocationData.parameters[0].url.substr(invocationData.parameters[0].url.indexOf('/os/'), invocationData.parameters[0].url.length);
	      }

	      let communicator = new awInterface.RestCommunicationManager();
	      reqOptions.usePost = false;

	      if (WL.StaticAppProps['si.url.maxlength'] && WL.StaticAppProps['si.url.maxlength'] < href.length) {
	        reqOptions.usePost = true;
	      }

	      communicator.accessServer(href, reqOptions, options);
	    } catch (error) {
	      options.onFailure(error);
	    }
	  },

	  removeGlobalHeader: function removeGlobalHeader() {
	    console.log("Calling removeGlobalHeader");
	  },
	  addGlobalHeader: function addGlobalHeader(key, value) {
	    console.log("Calling removeGlobalHeader");
	  },
	  setHeartBeatInterval: function setHeartBeatInterval() {
	    console.log("Calling setHeartBeatInterval");
	  },
	  createChallengeHandler: function createChallengeHandler(challenge) {
	    return {};
	  },
	  readLocalFile: function readLocalFile(relativePathToWebAssets, successCallback, failureCallback) {
	    let readFilePromise = awInterface.FileSystem.readFile(relativePathToWebAssets);

	    if (successCallback === null) {
	      return readFilePromise;
	    } else {
	      readFilePromise.then(file => {
	        successCallback(file);
	      }).catch(error => {
	        failureCallback(error);
	      });
	    }
	  },
	  validURL: function validURL(urlString) {
	    var pattern = new RegExp("^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{2,4})?(/[-\\w@\\+\\.~#\\?&/=%]*)?$");
	    return pattern.test(urlString) == true ? urlString : "";
	  },
	  _setClientProperties: function _setClientProperties() {
	    let self = this;
	    return new Promise(function (resolve, reject) {
	      function successCallbAck(fileContentAsString) {
	        let fileLines = fileContentAsString.split('\n');

	        for (let i = 0; i < fileLines.length; i++) {
	          let line = fileLines[i];

	          if (line.trim()[0] !== '#' && line !== "") {
	            let pair = line.split('=');
	            if (pair.length === 2) WL.StaticAppProps[pair[0].trim()] = pair[1].trim();else if (pair.length == 1) WL.StaticAppProps[pair[0].trim()] = "";
	          }
	        }

	        WL.StaticAppProps.WORKLIGHT_BASE_URL = self.validURL(localStorage.getItem('maximo_url'));
	        resolve();
	      }

	      function failureCallbAck() {
	        WL.StaticAppProps.WORKLIGHT_BASE_URL = self.validURL(localStorage.getItem('maximo_url'));
	        resolve();
	      }

	      self.readLocalFile("worklight.properties", successCallbAck, failureCallbAck);
	    });
	  },
	  isUserAuthenticated: function isUserAuthenticated() {
	    //get graphite client
	    let cli = awInterface.AnywhereClient.get();

	    return cli.authConnection.connected;
	  },
	  getUserName: function getUserName() {
	    //get graphite client
	    let cli = awInterface.AnywhereClient.get();

	    return cli.authenticator.options.username;
	  },
	  getLoginName: function getLoginName() {
	    //get graphite client
	    let cli = awInterface.AnywhereClient.get();

	    return cli.authenticator.options.username;
	  },
	  reloadApp: function reloadApp() {
	    location.reload();
	  },
	  getApiKey: function getApiKey(options) {
	    let communicator = new awInterface.RestCommunicationManager();
	    let reqOptions = {};
	    reqOptions.body = JSON.stringify({
	      "expiration": -1,
	      "userid": this.getLoginName()
	    });
	    reqOptions.usePost = true;
	    communicator.accessServer('/oslc/apitoken/create', reqOptions, options);
	  }
	};
	WL.Environment = {
	  IPHONE: 'iphone',
	  IPAD: 'ipad',
	  WINDOWS8: 'windows8',
	  PREVIEW: 'preview',
	  ANDROID: 'android'
	};
	WL.Logger = {
	  config: function config(conf) {
	    console.log("calling logger config");
	  }
	};

	WL.BusyIndicator = function (hookElement, message) {
	  this.visible = false;
	  this.__busyOverlay = true;

	  this._hide = function () {
	    console.log("Calling _hide"); //call hide function of spinner plugin

	    SpinnerDialog.hide();
	    this.visible = false;
	  };

	  this._show = function () {
	    console.log("Calling _show"); //call show function of spinner plugin, pass the defined message and only hide if hide method called.

	    SpinnerDialog.show(null, message.text, true);
	    this.visible = true;
	  };

	  this.isVisible = function () {
	    return this.visible;
	  };
	};

	WL.StaticAppProps = {};
	WL.App = {
	  getDeviceLocale: function getDeviceLocale() {
	    return awInterface.LocaleInfo.locale;
	  },
	  getDeviceLanguage: function getDeviceLanguage() {
	    return awInterface.LocaleInfo.locale.split('_')[0];
	  },
	  overrideBackButton: function overrideBackButton(func) {
	    document.addEventListener("backbutton", func, false);
	  },
	  close: function close() {
	    if (device.platform.toLowerCase() === "windows") {
	      window.close();
	    } else {
	      navigator.app.exitApp();
	    }
	  },
	  getServerUrl: function getServerUrl(onSuccess, onFailure) {
	    //get graphite client
	    let cli = awInterface.AnywhereClient.get();

	    if (cli.baseUrl) {
	      onSuccess(cli.baseUrl);
	    } else {
	      onFailure('No server defined');
	    }
	  }
	};
	WL.CookieManager = {
	  clearCookies: function clearCookies(callbacks) {
	    let client = awInterface.AnywhereClient.get();

	    let clearCookiePromise = client.clearAllCookies();

	    if (callbacks === null) {
	      return clearCookiePromise;
	    } else {
	      clearCookiePromise.then(response => {
	        callbacks.onSuccess(response);
	      }).catch(error => {
	        callbacks.onFailure(error);
	      });
	    }
	  }
	};
	WL.StaticAppProps.WORKLIGHT_BASE_URL = null;
	WL.StaticAppProps.APP_SERVICES_URL = null; //WL.App

	WL.App.readUserPref = function () {};

	Object.defineProperty(WL, 'JSONStore', {
	  get: function get() {
	    return JSONStore;
	  }
	});
	WL.Events = {
	  WORKLIGHT_IS_CONNECTED: "NETWORK_CONNECTED",
	  WORKLIGHT_IS_DISCONNECTED: "NETWORK_DISCONNECTED"
	};
	WL.ClientMessages = {
	  "loading": "Loading ..."
	};
	WL.Device = {
	  getid: function getid() {
	    return device.uuid;
	  },
	  getNetworkInfo: function getNetworkInfo(successCallback, failureCallback) {
	    class NetInfo {
	      constructor() {}

	      get isAirplaneMode() {
	        throw "Not Supported";
	      }

	      get isRoaming() {
	        throw "Not Supported";
	      }

	      get telephonyNetworkType() {
	        let celltype = awInterface.NetworkInfo.getCellularType();

	        switch (celltype) {
	          case awInterface.NetworkInfo.Connection.CELL_2G:
	            return "Cell 2g";

	          case awInterface.NetworkInfo.Connection.CELL_3G:
	            return "Cell 3g";

	          case awInterface.NetworkInfo.Connection.CELL_4G:
	            return "Cell 4g";

	          case awInterface.NetworkInfo.Connection.CELL:
	            return "Cellular";

	          default:
	            return '';
	        }
	      }

	      get isNetworkConnected() {
	        return awInterface.NetworkInfo.isDeviceConnected;
	      }

	      get networkConnectionType() {
	        let networkConnectionType = awInterface.NetworkInfo.getNetworkType();

	        if (networkConnectionType === awInterface.NetworkInfo.Connection.WIFI) {
	          networkConnectionType = 'WIFI';
	        } else if (networkConnectionType === awInterface.NetworkInfo.Connection.CELLULAR) {
	          networkConnectionType = 'mobile';
	        } else {
	          networkConnectionType = '';
	        }

	        return networkConnectionType;
	      }

	    }

	    let netInfo = new NetInfo();
	    successCallback(netInfo);
	  }
	}; // WL.Client.createChallengeHandler()
	// WL.CookieManager.getJSessionID()
	// WL.CookieManager.clearCookies()
	// WL.App.getServerUrl()
	// WL.Client.isUserAuthenticated()
	// WL.Client.connect()
	// WL.Events.WORKLIGHT_IS_CONNECTED
	// WL.Events.WORKLIGHT_IS_DISCONNECTED
	// WL.Client.setHeartBeatInterval()
	// WL.Device.getNetworkInfo()
	// WL.App.__showWLSettingActivity()
	// WL.Client.getAppProperty()
	// WL.application.getResource()
	// WL.Logger.config()
	// WL.Client.Push
	// WL.JSONStore.QueryPart()
	// WL.application.debug
	// WL.JSONStore.getErrorMessage()
	// WL.JSONStore.init()
	// WL.JSONStore.get()
	// WL.JSONStore.destroy()
	// WL.JSONStore.changePassword()
	// WL.JSONStore.closeAll()
	// WL.constant.ASCENDING
	// WL.constant.DESCENDING
	// WL.BusyIndicator
	// WL.App.overrideBackButton()
	// WL.Badge.setNumber()
	// WL.Client.Push.unsubscribeTag

	var _default = WL;
	exports.default = _default;
	});

	var wlInterface$1 = unwrapExports(wlInterface);

	return wlInterface$1;

}());
