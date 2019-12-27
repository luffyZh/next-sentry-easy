webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/string-hash/index.js":
/*!*******************************************!*\
  !*** ./node_modules/string-hash/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),

/***/ "./node_modules/styled-jsx/dist/lib/stylesheet.js":
/*!********************************************************!*\
  !*** ./node_modules/styled-jsx/dist/lib/stylesheet.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/
var isProd = typeof process !== 'undefined' && process.env && "development" === 'production';

var isString = function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]';
};

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'stylesheet' : _ref$name,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === void 0 ? isProd : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === void 0 ? typeof window !== 'undefined' : _ref$isBrowser;

    invariant(isString(name), '`name` must be a string');
    this._name = name;
    this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
    invariant(typeof optimizeForSpeed === 'boolean', '`optimizeForSpeed` must be a boolean');
    this._optimizeForSpeed = optimizeForSpeed;
    this._isBrowser = isBrowser;
    this._serverSheet = undefined;
    this._tags = [];
    this._injected = false;
    this._rulesCount = 0;
    var node = this._isBrowser && document.querySelector('meta[property="csp-nonce"]');
    this._nonce = node ? node.getAttribute('content') : null;
  }

  var _proto = StyleSheet.prototype;

  _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
    invariant(typeof bool === 'boolean', '`setOptimizeForSpeed` accepts a boolean');
    invariant(this._rulesCount === 0, 'optimizeForSpeed cannot be when rules have already been inserted');
    this.flush();
    this._optimizeForSpeed = bool;
    this.inject();
  };

  _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
    return this._optimizeForSpeed;
  };

  _proto.inject = function inject() {
    var _this = this;

    invariant(!this._injected, 'sheet already injected');
    this._injected = true;

    if (this._isBrowser && this._optimizeForSpeed) {
      this._tags[0] = this.makeStyleTag(this._name);
      this._optimizeForSpeed = 'insertRule' in this.getSheet();

      if (!this._optimizeForSpeed) {
        if (!isProd) {
          console.warn('StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.');
        }

        this.flush();
        this._injected = true;
      }

      return;
    }

    this._serverSheet = {
      cssRules: [],
      insertRule: function insertRule(rule, index) {
        if (typeof index === 'number') {
          _this._serverSheet.cssRules[index] = {
            cssText: rule
          };
        } else {
          _this._serverSheet.cssRules.push({
            cssText: rule
          });
        }

        return index;
      },
      deleteRule: function deleteRule(index) {
        _this._serverSheet.cssRules[index] = null;
      }
    };
  };

  _proto.getSheetForTag = function getSheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    } // this weirdness brought to you by firefox


    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
  };

  _proto.getSheet = function getSheet() {
    return this.getSheetForTag(this._tags[this._tags.length - 1]);
  };

  _proto.insertRule = function insertRule(rule, index) {
    invariant(isString(rule), '`insertRule` accepts only strings');

    if (!this._isBrowser) {
      if (typeof index !== 'number') {
        index = this._serverSheet.cssRules.length;
      }

      this._serverSheet.insertRule(rule, index);

      return this._rulesCount++;
    }

    if (this._optimizeForSpeed) {
      var sheet = this.getSheet();

      if (typeof index !== 'number') {
        index = sheet.cssRules.length;
      } // this weirdness for perf, and chrome's weird bug
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule


      try {
        sheet.insertRule(rule, index);
      } catch (error) {
        if (!isProd) {
          console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
        }

        return -1;
      }
    } else {
      var insertionPoint = this._tags[index];

      this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
    }

    return this._rulesCount++;
  };

  _proto.replaceRule = function replaceRule(index, rule) {
    if (this._optimizeForSpeed || !this._isBrowser) {
      var sheet = this._isBrowser ? this.getSheet() : this._serverSheet;

      if (!rule.trim()) {
        rule = this._deletedRulePlaceholder;
      }

      if (!sheet.cssRules[index]) {
        // @TBD Should we throw an error?
        return index;
      }

      sheet.deleteRule(index);

      try {
        sheet.insertRule(rule, index);
      } catch (error) {
        if (!isProd) {
          console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
        } // In order to preserve the indices we insert a deleteRulePlaceholder


        sheet.insertRule(this._deletedRulePlaceholder, index);
      }
    } else {
      var tag = this._tags[index];
      invariant(tag, "old rule at index `" + index + "` not found");
      tag.textContent = rule;
    }

    return index;
  };

  _proto.deleteRule = function deleteRule(index) {
    if (!this._isBrowser) {
      this._serverSheet.deleteRule(index);

      return;
    }

    if (this._optimizeForSpeed) {
      this.replaceRule(index, '');
    } else {
      var tag = this._tags[index];
      invariant(tag, "rule at index `" + index + "` not found");
      tag.parentNode.removeChild(tag);
      this._tags[index] = null;
    }
  };

  _proto.flush = function flush() {
    this._injected = false;
    this._rulesCount = 0;

    if (this._isBrowser) {
      this._tags.forEach(function (tag) {
        return tag && tag.parentNode.removeChild(tag);
      });

      this._tags = [];
    } else {
      // simpler on server
      this._serverSheet.cssRules = [];
    }
  };

  _proto.cssRules = function cssRules() {
    var _this2 = this;

    if (!this._isBrowser) {
      return this._serverSheet.cssRules;
    }

    return this._tags.reduce(function (rules, tag) {
      if (tag) {
        rules = rules.concat(Array.prototype.map.call(_this2.getSheetForTag(tag).cssRules, function (rule) {
          return rule.cssText === _this2._deletedRulePlaceholder ? null : rule;
        }));
      } else {
        rules.push(null);
      }

      return rules;
    }, []);
  };

  _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
    if (cssString) {
      invariant(isString(cssString), 'makeStyleTag acceps only strings as second parameter');
    }

    var tag = document.createElement('style');
    if (this._nonce) tag.setAttribute('nonce', this._nonce);
    tag.type = 'text/css';
    tag.setAttribute("data-" + name, '');

    if (cssString) {
      tag.appendChild(document.createTextNode(cssString));
    }

    var head = document.head || document.getElementsByTagName('head')[0];

    if (relativeToTag) {
      head.insertBefore(tag, relativeToTag);
    } else {
      head.appendChild(tag);
    }

    return tag;
  };

  _createClass(StyleSheet, [{
    key: "length",
    get: function get() {
      return this._rulesCount;
    }
  }]);

  return StyleSheet;
}();

exports["default"] = StyleSheet;

function invariant(condition, message) {
  if (!condition) {
    throw new Error("StyleSheet: " + message + ".");
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/styled-jsx/dist/style.js":
/*!***********************************************!*\
  !*** ./node_modules/styled-jsx/dist/style.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.flush = flush;
exports["default"] = void 0;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _stylesheetRegistry = _interopRequireDefault(__webpack_require__(/*! ./stylesheet-registry */ "./node_modules/styled-jsx/dist/stylesheet-registry.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var styleSheetRegistry = new _stylesheetRegistry["default"]();

var JSXStyle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(JSXStyle, _Component);

  function JSXStyle(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.prevProps = {};
    return _this;
  }

  JSXStyle.dynamic = function dynamic(info) {
    return info.map(function (tagInfo) {
      var baseId = tagInfo[0];
      var props = tagInfo[1];
      return styleSheetRegistry.computeId(baseId, props);
    }).join(' ');
  } // probably faster than PureComponent (shallowEqual)
  ;

  var _proto = JSXStyle.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(otherProps) {
    return this.props.id !== otherProps.id || // We do this check because `dynamic` is an array of strings or undefined.
    // These are the computed values for dynamic styles.
    String(this.props.dynamic) !== String(otherProps.dynamic);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    styleSheetRegistry.remove(this.props);
  };

  _proto.render = function render() {
    // This is a workaround to make the side effect async safe in the "render" phase.
    // See https://github.com/zeit/styled-jsx/pull/484
    if (this.shouldComponentUpdate(this.prevProps)) {
      // Updates
      if (this.prevProps.id) {
        styleSheetRegistry.remove(this.prevProps);
      }

      styleSheetRegistry.add(this.props);
      this.prevProps = this.props;
    }

    return null;
  };

  return JSXStyle;
}(_react.Component);

exports["default"] = JSXStyle;

function flush() {
  var cssRules = styleSheetRegistry.cssRules();
  styleSheetRegistry.flush();
  return cssRules;
}

/***/ }),

/***/ "./node_modules/styled-jsx/dist/stylesheet-registry.js":
/*!*************************************************************!*\
  !*** ./node_modules/styled-jsx/dist/stylesheet-registry.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _stringHash = _interopRequireDefault(__webpack_require__(/*! string-hash */ "./node_modules/string-hash/index.js"));

var _stylesheet = _interopRequireDefault(__webpack_require__(/*! ./lib/stylesheet */ "./node_modules/styled-jsx/dist/lib/stylesheet.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sanitize = function sanitize(rule) {
  return rule.replace(/\/style/gi, '\\/style');
};

var StyleSheetRegistry =
/*#__PURE__*/
function () {
  function StyleSheetRegistry(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$styleSheet = _ref.styleSheet,
        styleSheet = _ref$styleSheet === void 0 ? null : _ref$styleSheet,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === void 0 ? false : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === void 0 ? typeof window !== 'undefined' : _ref$isBrowser;

    this._sheet = styleSheet || new _stylesheet["default"]({
      name: 'styled-jsx',
      optimizeForSpeed: optimizeForSpeed
    });

    this._sheet.inject();

    if (styleSheet && typeof optimizeForSpeed === 'boolean') {
      this._sheet.setOptimizeForSpeed(optimizeForSpeed);

      this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
    }

    this._isBrowser = isBrowser;
    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};
    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  }

  var _proto = StyleSheetRegistry.prototype;

  _proto.add = function add(props) {
    var _this = this;

    if (undefined === this._optimizeForSpeed) {
      this._optimizeForSpeed = Array.isArray(props.children);

      this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);

      this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
    }

    if (this._isBrowser && !this._fromServer) {
      this._fromServer = this.selectFromServer();
      this._instancesCounts = Object.keys(this._fromServer).reduce(function (acc, tagName) {
        acc[tagName] = 0;
        return acc;
      }, {});
    }

    var _this$getIdAndRules = this.getIdAndRules(props),
        styleId = _this$getIdAndRules.styleId,
        rules = _this$getIdAndRules.rules; // Deduping: just increase the instances count.


    if (styleId in this._instancesCounts) {
      this._instancesCounts[styleId] += 1;
      return;
    }

    var indices = rules.map(function (rule) {
      return _this._sheet.insertRule(rule);
    }) // Filter out invalid rules
    .filter(function (index) {
      return index !== -1;
    });
    this._indices[styleId] = indices;
    this._instancesCounts[styleId] = 1;
  };

  _proto.remove = function remove(props) {
    var _this2 = this;

    var _this$getIdAndRules2 = this.getIdAndRules(props),
        styleId = _this$getIdAndRules2.styleId;

    invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
    this._instancesCounts[styleId] -= 1;

    if (this._instancesCounts[styleId] < 1) {
      var tagFromServer = this._fromServer && this._fromServer[styleId];

      if (tagFromServer) {
        tagFromServer.parentNode.removeChild(tagFromServer);
        delete this._fromServer[styleId];
      } else {
        this._indices[styleId].forEach(function (index) {
          return _this2._sheet.deleteRule(index);
        });

        delete this._indices[styleId];
      }

      delete this._instancesCounts[styleId];
    }
  };

  _proto.update = function update(props, nextProps) {
    this.add(nextProps);
    this.remove(props);
  };

  _proto.flush = function flush() {
    this._sheet.flush();

    this._sheet.inject();

    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};
    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  };

  _proto.cssRules = function cssRules() {
    var _this3 = this;

    var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function (styleId) {
      return [styleId, _this3._fromServer[styleId]];
    }) : [];

    var cssRules = this._sheet.cssRules();

    return fromServer.concat(Object.keys(this._indices).map(function (styleId) {
      return [styleId, _this3._indices[styleId].map(function (index) {
        return cssRules[index].cssText;
      }).join(_this3._optimizeForSpeed ? '' : '\n')];
    }) // filter out empty rules
    .filter(function (rule) {
      return Boolean(rule[1]);
    }));
  }
  /**
   * createComputeId
   *
   * Creates a function to compute and memoize a jsx id from a basedId and optionally props.
   */
  ;

  _proto.createComputeId = function createComputeId() {
    var cache = {};
    return function (baseId, props) {
      if (!props) {
        return "jsx-" + baseId;
      }

      var propsToString = String(props);
      var key = baseId + propsToString; // return `jsx-${hashString(`${baseId}-${propsToString}`)}`

      if (!cache[key]) {
        cache[key] = "jsx-" + (0, _stringHash["default"])(baseId + "-" + propsToString);
      }

      return cache[key];
    };
  }
  /**
   * createComputeSelector
   *
   * Creates a function to compute and memoize dynamic selectors.
   */
  ;

  _proto.createComputeSelector = function createComputeSelector(selectoPlaceholderRegexp) {
    if (selectoPlaceholderRegexp === void 0) {
      selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    }

    var cache = {};
    return function (id, css) {
      // Sanitize SSR-ed CSS.
      // Client side code doesn't need to be sanitized since we use
      // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
      if (!this._isBrowser) {
        css = sanitize(css);
      }

      var idcss = id + css;

      if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
      }

      return cache[idcss];
    };
  };

  _proto.getIdAndRules = function getIdAndRules(props) {
    var _this4 = this;

    var css = props.children,
        dynamic = props.dynamic,
        id = props.id;

    if (dynamic) {
      var styleId = this.computeId(id, dynamic);
      return {
        styleId: styleId,
        rules: Array.isArray(css) ? css.map(function (rule) {
          return _this4.computeSelector(styleId, rule);
        }) : [this.computeSelector(styleId, css)]
      };
    }

    return {
      styleId: this.computeId(id),
      rules: Array.isArray(css) ? css : [css]
    };
  }
  /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */
  ;

  _proto.selectFromServer = function selectFromServer() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
    return elements.reduce(function (acc, element) {
      var id = element.id.slice(2);
      acc[id] = element;
      return acc;
    }, {});
  };

  return StyleSheetRegistry;
}();

exports["default"] = StyleSheetRegistry;

function invariant(condition, message) {
  if (!condition) {
    throw new Error("StyleSheetRegistry: " + message + ".");
  }
}

/***/ }),

/***/ "./node_modules/styled-jsx/style.js":
/*!******************************************!*\
  !*** ./node_modules/styled-jsx/style.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/style */ "./node_modules/styled-jsx/dist/style.js")


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/luffyzhou/webfront/github/next-sentry-demo/pages/index.js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


var Home = function Home() {
  return __jsx("div", {
    className: "jsx-2341348262" + " " + 'container',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2341348262",
    __self: this
  }, ".container.jsx-2341348262{max-width:800px;margin:0 auto;background:#fff;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWZmeXpob3Uvd2ViZnJvbnQvZ2l0aHViL25leHQtc2VudHJ5LWRlbW8vcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSWdCLEFBR3lCLGdCQUNGLGNBQ0UsZ0JBQ2xCIiwiZmlsZSI6Ii9Vc2Vycy9sdWZmeXpob3Uvd2ViZnJvbnQvZ2l0aHViL25leHQtc2VudHJ5LWRlbW8vcGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuXG5jb25zdCBIb21lID0gKCkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgbWF4LXdpZHRoOiA4MDBweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICAgIDxoMj5OZXh0LVNlbnRyeS1EZW1vPC9oMj5cbiAgICA8cD5cbiAgICAgIFRoaXMgZXhhbXBsZSBkZW1vbnN0cmF0ZXMgaG93IHRvIHJlY29yZCB1bmhhbmRsZWQgZXhjZXB0aW9ucyBpbiB5b3VyIGNvZGVcbiAgICAgIHdpdGggU2VudHJ5LiBUaGVyZSBhcmUgc2V2ZXJhbCB0ZXN0IHBhZ2VzIGJlbG93IHRoYXQgcmVzdWx0IGluIHZhcmlvdXNcbiAgICAgIGtpbmRzIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zLlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgIDxzdHJvbmc+SW1wb3J0YW50Ojwvc3Ryb25nPiBleGNlcHRpb25zIGluIGRldmVsb3BtZW50IG1vZGUgdGFrZSBhXG4gICAgICBkaWZmZXJlbnQgcGF0aCB0aGFuIGluIHByb2R1Y3Rpb24uIFRoZXNlIHRlc3RzIHNob3VsZCBiZSBydW4gb24gYVxuICAgICAgcHJvZHVjdGlvbiBidWlsZCAoaS5lLiAnbmV4dCBidWlsZCcpLnsnICd9XG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MjY3VzdG9tLWVycm9yLWhhbmRsaW5nXCI+UmVhZCBtb3JlPC9hPlxuICAgIDwvcD5cbiAgICA8dWw+XG4gICAgICA8bGk+U2VydmVyIGV4Y2VwdGlvbnM8L2xpPlxuICAgICAgPHVsPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgZ2V0SW5pdGlhbFByb3BzIHRocm93cyBhbiBFcnJvci4gVGhpcyBzaG91bGQgY2F1c2UgX2Vycm9yLmpzIHRvIHJlbmRlclxuICAgICAgICAgIGFuZCByZWNvcmQgRXJyb3IoJ0NsaWVudCBUZXN0IDEnKSBpbiBTZW50cnkueycgJ31cbiAgICAgICAgICA8YSBocmVmPVwiL3NlcnZlci90ZXN0MVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgT3BlbiBpbiBhIG5ldyB0YWJcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICBnZXRJbml0aWFsUHJvcHMgcmV0dXJucyBhIFByb21pc2UgdGhhdCByZWplY3RzLiBUaGlzIHNob3VsZCBjYXVzZVxuICAgICAgICAgIF9lcnJvci5qcyB0byByZW5kZXIgYW5kIHJlY29yZCBFcnJvcignU2VydmVyIFRlc3QgMicpIGluIFNlbnRyeS57JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvc2VydmVyL3Rlc3QyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIGdldEluaXRpYWxQcm9wcyBjYWxscyBhIFByb21pc2UgdGhhdCByZWplY3RzLCBidXQgZG9lcyBub3QgaGFuZGxlIHRoZVxuICAgICAgICAgIHJlamVjdGlvbiBvciBhd2FpdCBpdHMgcmVzdWx0IChyZXR1cm5pbmcgc3luY2hyb25vdXNseSkuIFNlbnRyeSBzaG91bGRcbiAgICAgICAgICByZWNvcmQgRXJyb3IoJ1NlcnZlciBUZXN0IDMnKS57JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvc2VydmVyL3Rlc3QzXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIFRoZXJlIGlzIGEgdG9wLW9mLW1vZHVsZSBQcm9taXNlIHRoYXQgcmVqZWN0cywgYnV0IGl0cyByZXN1bHQgaXMgbm90XG4gICAgICAgICAgYXdhaXRlZC4gU2VudHJ5IHNob3VsZCByZWNvcmQgRXJyb3IoJ1NlcnZlciBUZXN0IDQnKS4gTm90ZSB0aGlzIHdpbGxcbiAgICAgICAgICBhbHNvIGJlIHJlY29yZGVkIG9uIHRoZSBjbGllbnQgc2lkZSwgb25jZSB0aGUgcGFnZSBpcyBoeWRyYXRlZC57JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvc2VydmVyL3Rlc3Q0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxsaT5DbGllbnQgZXhjZXB0aW9uczwvbGk+XG4gICAgICA8dWw+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICBnZXRJbml0aWFsUHJvcHMgdGhyb3dzIGFuIEVycm9yLiBUaGlzIHNob3VsZCBjYXVzZSBfZXJyb3IuanMgdG8gcmVuZGVyXG4gICAgICAgICAgYW5kIHJlY29yZCBFcnJvcignQ2xpZW50IFRlc3QgMScpIGluIFNlbnRyeS4gTm90ZSBTZW50cnkgd2lsbCBkb3VibGVcbiAgICAgICAgICBjb3VudCB0aGlzIGV4Y2VwdGlvbi4gT25jZSBmcm9tIGFuIHVuaGFuZGxlZHJlamVjdGlvbiBhbmQgYWdhaW4gaW5cbiAgICAgICAgICBfZXJyb3IuanMuIENvdWxkIGJlIGEgYnVnIGluIE5leHQuanMgb3IgU2VudHJ5LCByZXF1aXJlcyBtb3JlXG4gICAgICAgICAgZGVidWdnaW5nLnsnICd9XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9jbGllbnQvdGVzdDFcIj5cbiAgICAgICAgICAgIDxhPlBlcmZvcm0gY2xpZW50IHNpZGUgbmF2aWdhdGlvbjwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICBnZXRJbml0aWFsUHJvcHMgcmV0dXJucyBhIFByb21pc2UgdGhhdCByZWplY3RzLiBUaGlzIHNob3VsZCBjYXVzZVxuICAgICAgICAgIF9lcnJvci5qcyB0byByZW5kZXIgYW5kIHJlY29yZCBFcnJvcignQ2xpZW50IFRlc3QgMicpIGluIFNlbnRyeS4gQXNcbiAgICAgICAgICBhYm92ZSwgU2VudHJ5IHdpbGwgZG91YmxlIGNvdW50IHRoaXMgZXhjZXB0aW9uLnsnICd9XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9jbGllbnQvdGVzdDJcIj5cbiAgICAgICAgICAgIDxhPlBlcmZvcm0gY2xpZW50IHNpZGUgbmF2aWdhdGlvbjwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICBnZXRJbml0aWFsUHJvcHMgY2FsbHMgYSBQcm9taXNlIHRoYXQgcmVqZWN0cywgYnV0IGRvZXMgbm90IGhhbmRsZSB0aGVcbiAgICAgICAgICByZWplY3Rpb24gb3IgYXdhaXQgaXRzIHJlc3VsdCAocmV0dXJuaW5nIHN5bmNocm9ub3VzbHkpLiBTZW50cnkgc2hvdWxkXG4gICAgICAgICAgcmVjb3JkIEVycm9yKCdDbGllbnQgVGVzdCAzJykueycgJ31cbiAgICAgICAgICA8TGluayBocmVmPVwiL2NsaWVudC90ZXN0M1wiPlxuICAgICAgICAgICAgPGE+UGVyZm9ybSBjbGllbnQgc2lkZSBuYXZpZ2F0aW9uPC9hPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIFRoZXJlIGlzIGEgdG9wLW9mLW1vZHVsZSBQcm9taXNlIHRoYXQgcmVqZWN0cywgYnV0IGl0cyByZXN1bHQgaXMgbm90XG4gICAgICAgICAgYXdhaXRlZC4gU2VudHJ5IHNob3VsZCByZWNvcmQgRXJyb3IoJ0NsaWVudCBUZXN0IDQnKS57JyAnfVxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvY2xpZW50L3Rlc3Q0XCI+XG4gICAgICAgICAgICA8YT5QZXJmb3JtIGNsaWVudCBzaWRlIG5hdmlnYXRpb248L2E+XG4gICAgICAgICAgPC9MaW5rPnsnICd9XG4gICAgICAgICAgb3J7JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvY2xpZW50L3Rlc3Q0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIFRoZXJlIGlzIGEgdG9wLW9mLW1vZHVsZSBleGNlcHRpb24uIF9lcnJvci5qcyBzaG91bGQgcmVuZGVyIGFuZCByZWNvcmRcbiAgICAgICAgICBSZWZlcmVuY2VFcnJvcigncHJvY2VzcyBpcyBub3QgZGVmaW5lZCcpIGluIFNlbnRyeS57JyAnfVxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvY2xpZW50L3Rlc3Q1XCI+XG4gICAgICAgICAgICA8YT5QZXJmb3JtIGNsaWVudCBzaWRlIG5hdmlnYXRpb248L2E+XG4gICAgICAgICAgPC9MaW5rPnsnICd9XG4gICAgICAgICAgb3J7JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvY2xpZW50L3Rlc3Q1XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIFRoZXJlIGlzIGFuIGV4Y2VwdGlvbiBkdXJpbmcgUmVhY3QgbGlmZWN5Y2xlIHRoYXQgaXMgY2F1Z2h0IGJ5XG4gICAgICAgICAgTmV4dC5qcydzIFJlYWN0IEVycm9yIEJvdW5kYXJ5LiBJbiB0aGlzIGNhc2UsIHdoZW4gdGhlIGNvbXBvbmVudFxuICAgICAgICAgIG1vdW50cy4gVGhpcyBzaG91bGQgY2F1c2UgX2Vycm9yLmpzIHRvIHJlbmRlciBhbmQgcmVjb3JkIEVycm9yKCdDbGllbnRcbiAgICAgICAgICBUZXN0IDYnKSBpbiBTZW50cnkueycgJ31cbiAgICAgICAgICA8TGluayBocmVmPVwiL2NsaWVudC90ZXN0NlwiPlxuICAgICAgICAgICAgPGE+UGVyZm9ybSBjbGllbnQgc2lkZSBuYXZpZ2F0aW9uPC9hPlxuICAgICAgICAgIDwvTGluaz57JyAnfVxuICAgICAgICAgIG9yeycgJ31cbiAgICAgICAgICA8YSBocmVmPVwiL2NsaWVudC90ZXN0NlwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgT3BlbiBpbiBhIG5ldyB0YWJcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICBUaGVyZSBpcyBhbiB1bmhhbmRsZWQgUHJvbWlzZSByZWplY3Rpb24gZHVyaW5nIFJlYWN0IGxpZmVjeWNsZS4gSW5cbiAgICAgICAgICB0aGlzIGNhc2UsIHdoZW4gdGhlIGNvbXBvbmVudCBtb3VudHMuIFNlbnRyeSBzaG91bGQgcmVjb3JkXG4gICAgICAgICAgRXJyb3IoJ0NsaWVudCBUZXN0IDcnKS57JyAnfVxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvY2xpZW50L3Rlc3Q3XCI+XG4gICAgICAgICAgICA8YT5QZXJmb3JtIGNsaWVudCBzaWRlIG5hdmlnYXRpb248L2E+XG4gICAgICAgICAgPC9MaW5rPnsnICd9XG4gICAgICAgICAgb3J7JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvY2xpZW50L3Rlc3Q3XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIEFuIEVycm9yIGlzIHRocm93biBmcm9tIGFuIGV2ZW50IGhhbmRsZXIuIFNlbnRyeSBzaG91bGQgcmVjb3JkXG4gICAgICAgICAgRXJyb3IoJ0NsaWVudCBUZXN0IDgnKS57JyAnfVxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvY2xpZW50L3Rlc3Q4XCI+XG4gICAgICAgICAgICA8YT5QZXJmb3JtIGNsaWVudCBzaWRlIG5hdmlnYXRpb248L2E+XG4gICAgICAgICAgPC9MaW5rPnsnICd9XG4gICAgICAgICAgb3J7JyAnfVxuICAgICAgICAgIDxhIGhyZWY9XCIvY2xpZW50L3Rlc3Q4XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICBPcGVuIGluIGEgbmV3IHRhYlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC91bD5cbiAgPC9kaXY+XG4pXG5leHBvcnQgZGVmYXVsdCBIb21lOyJdfQ== */\n/*@ sourceURL=/Users/luffyzhou/webfront/github/next-sentry-demo/pages/index.js */"), __jsx("h2", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "Next-Sentry-Demo"), __jsx("p", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, "This example demonstrates how to record unhandled exceptions in your code with Sentry. There are several test pages below that result in various kinds of unhandled exceptions."), __jsx("p", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __jsx("strong", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "Important:"), " exceptions in development mode take a different path than in production. These tests should be run on a production build (i.e. 'next build').", ' ', __jsx("a", {
    href: "https://nextjs.org/docs#custom-error-handling",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "Read more")), __jsx("ul", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "Server exceptions"), __jsx("ul", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "getInitialProps throws an Error. This should cause _error.js to render and record Error('Client Test 1') in Sentry.", ' ', __jsx("a", {
    href: "/server/test1",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, "getInitialProps returns a Promise that rejects. This should cause _error.js to render and record Error('Server Test 2') in Sentry.", ' ', __jsx("a", {
    href: "/server/test2",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, "getInitialProps calls a Promise that rejects, but does not handle the rejection or await its result (returning synchronously). Sentry should record Error('Server Test 3').", ' ', __jsx("a", {
    href: "/server/test3",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, "There is a top-of-module Promise that rejects, but its result is not awaited. Sentry should record Error('Server Test 4'). Note this will also be recorded on the client side, once the page is hydrated.", ' ', __jsx("a", {
    href: "/server/test4",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Open in a new tab"))), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, "Client exceptions"), __jsx("ul", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, "getInitialProps throws an Error. This should cause _error.js to render and record Error('Client Test 1') in Sentry. Note Sentry will double count this exception. Once from an unhandledrejection and again in _error.js. Could be a bug in Next.js or Sentry, requires more debugging.", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, "Perform client side navigation"))), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, "getInitialProps returns a Promise that rejects. This should cause _error.js to render and record Error('Client Test 2') in Sentry. As above, Sentry will double count this exception.", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, "Perform client side navigation"))), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, "getInitialProps calls a Promise that rejects, but does not handle the rejection or await its result (returning synchronously). Sentry should record Error('Client Test 3').", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }, "Perform client side navigation"))), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, "There is a top-of-module Promise that rejects, but its result is not awaited. Sentry should record Error('Client Test 4').", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: this
  }, "Perform client side navigation")), ' ', "or", ' ', __jsx("a", {
    href: "/client/test4",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }, "There is a top-of-module exception. _error.js should render and record ReferenceError('process is not defined') in Sentry.", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102
    },
    __self: this
  }, "Perform client side navigation")), ' ', "or", ' ', __jsx("a", {
    href: "/client/test5",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109
    },
    __self: this
  }, "There is an exception during React lifecycle that is caught by Next.js's React Error Boundary. In this case, when the component mounts. This should cause _error.js to render and record Error('Client Test 6') in Sentry.", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test6",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115
    },
    __self: this
  }, "Perform client side navigation")), ' ', "or", ' ', __jsx("a", {
    href: "/client/test6",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122
    },
    __self: this
  }, "There is an unhandled Promise rejection during React lifecycle. In this case, when the component mounts. Sentry should record Error('Client Test 7').", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test7",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127
    },
    __self: this
  }, "Perform client side navigation")), ' ', "or", ' ', __jsx("a", {
    href: "/client/test7",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130
    },
    __self: this
  }, "Open in a new tab")), __jsx("li", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134
    },
    __self: this
  }, "An Error is thrown from an event handler. Sentry should record Error('Client Test 8').", ' ', __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/client/test8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138
    },
    __self: this
  }, "Perform client side navigation")), ' ', "or", ' ', __jsx("a", {
    href: "/client/test8",
    target: "_blank",
    className: "jsx-2341348262",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141
    },
    __self: this
  }, "Open in a new tab")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.48e90e4d59b9b34c918b.hot-update.js.map