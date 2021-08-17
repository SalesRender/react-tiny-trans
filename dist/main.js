(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["useTransContext"] = factory(require("react"));
	else
		root["useTransContext"] = root["useTransContext"] || {}, root["useTransContext"]["useTranslate"] = root["useTransContext"]["useTranslate"] || {}, root["useTransContext"]["useTranslate"]["withTranslate"] = root["useTransContext"]["useTranslate"]["withTranslate"] || {}, root["useTransContext"]["useTranslate"]["withTranslate"]["TransProvider"] = factory(root["React"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./TransProvider.tsx":
/*!***************************!*\
  !*** ./TransProvider.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTransContext": () => (/* binding */ useTransContext),
/* harmony export */   "TransProvider": () => (/* binding */ TransProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};


var TransContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var useTransContext = function () {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TransContext);
};
var TransProvider = function (_a) {
    var children = _a.children, trans = _a.trans, translations = _a.translations, initLocale = _a.initLocale;
    var _b = __read((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), 2), loading = _b[0], setLoading = _b[1];
    var _c = __read((0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(function (v) { return !v; }, false), 2), updatedTrigger = _c[0], toggleUpdatedTrigger = _c[1];
    var loadstart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
        requestAnimationFrame(function () { return setLoading(true); });
    }, []);
    var loadend = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
        requestAnimationFrame(function () {
            setLoading(false);
            toggleUpdatedTrigger();
        });
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        trans.addEventListener('loadstart', loadstart);
        trans.addEventListener('loadend', loadend);
        return function () {
            trans.removeEventListener('loadstart', loadstart);
            trans.removeEventListener('loadend', loadend);
        };
    }, [loadend, loadstart, trans]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        trans.init({ translations: translations, locale: initLocale });
    }, [initLocale, trans, translations]);
    var value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () { return ({ loading: loading, trans: trans, updatedTrigger: updatedTrigger }); }, [updatedTrigger, trans, loading]);
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(TransContext.Provider, { value: value }, children);
};


/***/ }),

/***/ "./hooks.tsx":
/*!*******************!*\
  !*** ./hooks.tsx ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTranslate": () => (/* binding */ useTranslate),
/* harmony export */   "withTranslate": () => (/* binding */ withTranslate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TransProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransProvider */ "./TransProvider.tsx");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var createMemoTranslate = function (translate) {
    var map = {};
    return function (path, options) {
        var key = path === null || path === void 0 ? void 0 : path.toString();
        if (key in map)
            return map[key];
        var result = translate(path, options);
        map[key] = result;
        return result;
    };
};
var useTranslate = function (module) {
    var _a = (0,_TransProvider__WEBPACK_IMPORTED_MODULE_1__.useTransContext)(), trans = _a.trans, updatedTrigger = _a.updatedTrigger;
    var translate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () { return createMemoTranslate(trans.createTranslate(module)); }, [module, trans, updatedTrigger]); // eslint-disable-line react-hooks/exhaustive-deps
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () { return ({
        locale: trans.locale,
        changeLocale: trans.changeLocale,
        translate: translate,
    }); }, [translate, trans]);
};
var withTranslate = function (Component, module) {
    return function (props) {
        var trans = useTranslate(module);
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, __assign({}, props, trans));
    };
};


/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTranslate": () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_0__.useTranslate),
/* harmony export */   "withTranslate": () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_0__.withTranslate),
/* harmony export */   "TransProvider": () => (/* reexport safe */ _TransProvider__WEBPACK_IMPORTED_MODULE_1__.TransProvider),
/* harmony export */   "useTransContext": () => (/* reexport safe */ _TransProvider__WEBPACK_IMPORTED_MODULE_1__.useTransContext)
/* harmony export */ });
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hooks */ "./hooks.tsx");
/* harmony import */ var _TransProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransProvider */ "./TransProvider.tsx");



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=main.js.map