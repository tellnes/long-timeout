(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LongTimeout"] = factory();
	else
		root["LongTimeout"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


var TIMEOUT_MAX = 2147483647; // 2^31-1

exports.setTimeout = function(listener, after) {
  return new Timeout(listener, after)
}
exports.setInterval = function(listener, after) {
  return new Interval(listener, after)
}
exports.clearTimeout = function(timer) {
  if (timer) timer.close()
}
exports.clearInterval = exports.clearTimeout

exports.Timeout = Timeout
exports.Interval = Interval

function Timeout(listener, after) {
  this.listener = listener
  this.after = after
  this.unreffed = false
  this.start()
}

Timeout.prototype.unref = function() {
  if (!this.unreffed) {
    this.unreffed = true
    this.timeout.unref()
  }
}

Timeout.prototype.ref = function() {
  if (this.unreffed) {
    this.unreffed = false
    this.timeout.ref()
  }
}

Timeout.prototype.start = function() {
  if (this.after <= TIMEOUT_MAX) {
    this.timeout = setTimeout(this.listener, this.after)
  } else {
    var self = this
    this.timeout = setTimeout(function() {
      self.after -= TIMEOUT_MAX
      self.start()
    }, TIMEOUT_MAX)
  }
  if (this.unreffed) {
    this.timeout.unref()
  }
}

Timeout.prototype.close = function() {
  clearTimeout(this.timeout)
}

function Interval(listener, after) {
  this.listener = listener
  this.after = this.timeLeft = after
  this.unreffed = false
  this.start()
}

Interval.prototype.unref = function() {
  if (!this.unreffed) {
    this.unreffed = true
    this.timeout.unref()
  }
}

Interval.prototype.ref = function() {
  if (this.unreffed) {
    this.unreffed = false
    this.timeout.ref()
  }
}

Interval.prototype.start = function() {
  var self = this

  if (this.timeLeft <= TIMEOUT_MAX) {
    this.timeout = setTimeout(function() {
      self.listener()
      self.timeLeft = self.after
      self.start()
    }, this.timeLeft)
  } else {
    this.timeout = setTimeout(function() {
      self.timeLeft -= TIMEOUT_MAX
      self.start()
    }, TIMEOUT_MAX)
  }
  if (this.unreffed) {
    this.timeout.unref()
  }
}

Interval.prototype.close = function() {
  Timeout.prototype.close.apply(this, arguments)
}


/***/ })
/******/ ]);
});