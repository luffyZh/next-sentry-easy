webpackHotUpdate("static/development/pages/_error.js",{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=%2FUsers%2Fluffyzhou%2Fwebfront%2Fgithub%2Fnext-sentry-demo%2Fpages%2F_error.js!./":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=%2FUsers%2Fluffyzhou%2Fwebfront%2Fgithub%2Fnext-sentry-demo%2Fpages%2F_error.js ***!
  \**************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/_error", function() {
      var mod = __webpack_require__(/*! ./pages/_error.js */ "./pages/_error.js")
      if(true) {
        module.hot.accept(/*! ./pages/_error.js */ "./pages/_error.js", function() {
          if(!next.router.components["/_error"]) return
          var updatedPage = __webpack_require__(/*! ./pages/_error.js */ "./pages/_error.js")
          next.router.update("/_error", updatedPage)
        })
      }
      return mod
    }]);
  

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=next%2Fdist%2Fpages%2F_error!./":
false,

/***/ "./node_modules/next/error.js":
/*!************************************!*\
  !*** ./node_modules/next/error.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_error */ "./node_modules/next/dist/pages/_error.js")


/***/ }),

/***/ "./pages/_error.js":
/*!*************************!*\
  !*** ./pages/_error.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/error */ "./node_modules/next/error.js");
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sentry_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/node */ "./node_modules/@sentry/browser/esm/index.js");

var _jsxFileName = "/Users/luffyzhou/webfront/github/next-sentry-demo/pages/_error.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var MyError = function MyError(_ref) {
  var statusCode = _ref.statusCode,
      hasGetInitialPropsRun = _ref.hasGetInitialPropsRun,
      err = _ref.err;

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    _sentry_node__WEBPACK_IMPORTED_MODULE_3__["captureException"](err);
  }

  return __jsx(next_error__WEBPACK_IMPORTED_MODULE_2___default.a, {
    statusCode: statusCode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  });
};

MyError.getInitialProps = function _callee(_ref2) {
  var res, err, asPath, errorInitialProps;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _ref2.res, err = _ref2.err, asPath = _ref2.asPath;
          _context.next = 3;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(next_error__WEBPACK_IMPORTED_MODULE_2___default.a.getInitialProps({
            res: res,
            err: err
          }));

        case 3:
          errorInitialProps = _context.sent;
          // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
          // getInitialProps has run
          errorInitialProps.hasGetInitialPropsRun = true;

          if (!res) {
            _context.next = 13;
            break;
          }

          if (!(res.statusCode === 404)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            statusCode: 404
          });

        case 8:
          if (!err) {
            _context.next = 11;
            break;
          }

          _sentry_node__WEBPACK_IMPORTED_MODULE_3__["captureException"](err);
          return _context.abrupt("return", errorInitialProps);

        case 11:
          _context.next = 16;
          break;

        case 13:
          if (!err) {
            _context.next = 16;
            break;
          }

          _sentry_node__WEBPACK_IMPORTED_MODULE_3__["captureException"](err);
          return _context.abrupt("return", errorInitialProps);

        case 16:
          // If this point is reached, getInitialProps was called without any
          // information about what the error might be. This is unexpected and may
          // indicate a bug introduced in Next.js, so record it in Sentry
          _sentry_node__WEBPACK_IMPORTED_MODULE_3__["captureException"](new next_error__WEBPACK_IMPORTED_MODULE_2___default.a("_error.js getInitialProps missing data at path: ".concat(asPath)));
          return _context.abrupt("return", errorInitialProps);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (MyError);

/***/ }),

/***/ 2:
/*!******************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F_error&absolutePagePath=%2FUsers%2Fluffyzhou%2Fwebfront%2Fgithub%2Fnext-sentry-demo%2Fpages%2F_error.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F_error&absolutePagePath=%2FUsers%2Fluffyzhou%2Fwebfront%2Fgithub%2Fnext-sentry-demo%2Fpages%2F_error.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=%2FUsers%2Fluffyzhou%2Fwebfront%2Fgithub%2Fnext-sentry-demo%2Fpages%2F_error.js!./");


/***/ })

})
//# sourceMappingURL=_error.js.b82598ac65d7df82b3df.hot-update.js.map