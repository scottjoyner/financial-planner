require("source-map-support").install();
exports.ids = ["contact"];
exports.modules = {

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/contact/Contact.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n\n.Contact-root-3ydpW {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Contact-container-2rVw2 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n  max-width: var(--max-content-width);\n}\n", "",{"version":3,"sources":["Contact.css","../../components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;EAOE;;ACPF;;;;;;;EAOE;;AAEF;EACE;;+EAE6E;;EAE7E,iEAAiE;;EAEjE;;+EAE6E;;EAE7E,2BAA2B;;EAE3B;;+EAE6E;;EAE7E,sBAAsB,GAAG,+BAA+B;EACxD,sBAAsB,GAAG,0BAA0B;EACnD,sBAAsB,GAAG,4BAA4B;EACrD,uBAAuB,EAAE,gCAAgC;AAC3D;;ADnBA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,iBAAmC;EAAnC,mCAAmC;AACrC","file":"Contact.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"]}]);
// Exports
exports.locals = {
	"root": "Contact-root-3ydpW",
	"container": "Contact-container-2rVw2"
};

/***/ }),

/***/ "./src/routes/contact/Contact.css":
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/contact/Contact.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/contact/Contact.css", function() {
        css = __webpack_require__("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/contact/Contact.css");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/contact/Contact.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Contact; });
/* harmony import */ var isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("isomorphic-style-loader/useStyles");
/* harmony import */ var isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Contact_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/routes/contact/Contact.css");
/* harmony import */ var _Contact_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Contact_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/routes/contact/Contact.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function Contact({
  title
}) {
  isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0___default()(_Contact_css__WEBPACK_IMPORTED_MODULE_3___default.a);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _Contact_css__WEBPACK_IMPORTED_MODULE_3___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _Contact_css__WEBPACK_IMPORTED_MODULE_3___default.a.container,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "...")));
}
Contact.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};

/***/ }),

/***/ "./src/routes/contact/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/Layout/Layout.js");
/* harmony import */ var _Contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/routes/contact/Contact.js");
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/routes/contact/index.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const title = 'Contact Us';

function action() {
  return {
    chunks: ['contact'],
    title,
    component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Contact__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: title,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }))
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbnRhY3QuanMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3JvdXRlcy9jb250YWN0L0NvbnRhY3QuY3NzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvY29udGFjdC9Db250YWN0LmNzcz81Yjc1IiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvcm91dGVzL2NvbnRhY3QvQ29udGFjdC5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3JvdXRlcy9jb250YWN0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLS1mb250LWZhbWlseS1iYXNlOiAnU2Vnb2UgVUknLCAnSGVsdmV0aWNhTmV1ZS1MaWdodCcsIHNhbnMtc2VyaWY7XFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tbWF4LWNvbnRlbnQtd2lkdGg6IDEwMDBweDtcXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tc2NyZWVuLXhzLW1pbjogNDgwcHg7ICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqL1xcbiAgLS1zY3JlZW4tc20tbWluOiA3NjhweDsgIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqL1xcbiAgLS1zY3JlZW4tbWQtbWluOiA5OTJweDsgIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovXFxuICAtLXNjcmVlbi1sZy1taW46IDEyMDBweDsgLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblxcbi5Db250YWN0LXJvb3QtM3lkcFcge1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXG59XFxuXFxuLkNvbnRhY3QtY29udGFpbmVyLTJyVncyIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMCAwIDQwcHg7XFxuICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gIG1heC13aWR0aDogdmFyKC0tbWF4LWNvbnRlbnQtd2lkdGgpO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDb250YWN0LmNzc1wiLFwiLi4vLi4vY29tcG9uZW50cy92YXJpYWJsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0VBT0U7O0FDUEY7Ozs7Ozs7RUFPRTs7QUFFRjtFQUNFOzsrRUFFNkU7O0VBRTdFLGlFQUFpRTs7RUFFakU7OytFQUU2RTs7RUFFN0UsMkJBQTJCOztFQUUzQjs7K0VBRTZFOztFQUU3RSxzQkFBc0IsR0FBRywrQkFBK0I7RUFDeEQsc0JBQXNCLEdBQUcsMEJBQTBCO0VBQ25ELHNCQUFzQixHQUFHLDRCQUE0QjtFQUNyRCx1QkFBdUIsRUFBRSxnQ0FBZ0M7QUFDM0Q7O0FEbkJBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsaUJBQW1DO0VBQW5DLG1DQUFtQztBQUNyQ1wiLFwiZmlsZVwiOlwiQ29udGFjdC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG5AaW1wb3J0ICcuLi8uLi9jb21wb25lbnRzL3ZhcmlhYmxlcy5jc3MnO1xcblxcbi5yb290IHtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAwIDAgNDBweDtcXG4gIG1heC13aWR0aDogdmFyKC0tbWF4LWNvbnRlbnQtd2lkdGgpO1xcbn1cXG5cIixcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLS1mb250LWZhbWlseS1iYXNlOiAnU2Vnb2UgVUknLCAnSGVsdmV0aWNhTmV1ZS1MaWdodCcsIHNhbnMtc2VyaWY7XFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tbWF4LWNvbnRlbnQtd2lkdGg6IDEwMDBweDtcXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tc2NyZWVuLXhzLW1pbjogNDgwcHg7ICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqL1xcbiAgLS1zY3JlZW4tc20tbWluOiA3NjhweDsgIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqL1xcbiAgLS1zY3JlZW4tbWQtbWluOiA5OTJweDsgIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovXFxuICAtLXNjcmVlbi1sZy1taW46IDEyMDBweDsgLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblwiXX1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJDb250YWN0LXJvb3QtM3lkcFdcIixcblx0XCJjb250YWluZXJcIjogXCJDb250YWN0LWNvbnRhaW5lci0yclZ3MlwiXG59OyIsIlxuICAgIHZhciByZWZzID0gMDtcbiAgICB2YXIgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS1ydWxlcy0zIS4vQ29udGFjdC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2luc2VydENzcy5qc1wiKTtcbiAgICB2YXIgY29udGVudCA9IHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnID8gW1ttb2R1bGUuaWQsIGNzcywgJyddXSA6IGNzcztcblxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNzcy5sb2NhbHMgfHwge307XG4gICAgZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBleHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuICcnICsgY3NzOyB9O1xuICAgIGV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS01LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTMhLi9Db250YWN0LmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS1ydWxlcy0zIS4vQ29udGFjdC5jc3NcIik7XG4gICAgICAgIGNvbnRlbnQgPSB0eXBlb2YgY3NzID09PSAnc3RyaW5nJyA/IFtbbW9kdWxlLmlkLCBjc3MsICcnXV0gOiBjc3M7XG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdXNlU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL3VzZVN0eWxlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzIGZyb20gJy4vQ29udGFjdC5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb250YWN0KHsgdGl0bGUgfSkge1xuICB1c2VTdHlsZXMocyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cy5jb250YWluZXJ9PlxuICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgIDxwPi4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5Db250YWN0LnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTGF5b3V0JztcbmltcG9ydCBDb250YWN0IGZyb20gJy4vQ29udGFjdCc7XG5cbmNvbnN0IHRpdGxlID0gJ0NvbnRhY3QgVXMnO1xuXG5mdW5jdGlvbiBhY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgY2h1bmtzOiBbJ2NvbnRhY3QnXSxcbiAgICB0aXRsZSxcbiAgICBjb21wb25lbnQ6IChcbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxDb250YWN0IHRpdGxlPXt0aXRsZX0gLz5cbiAgICAgIDwvTGF5b3V0PlxuICAgICksXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFjdGlvbjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUVBO0FBQ0E7QUFEQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMQTtBQVNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9