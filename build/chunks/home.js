require("source-map-support").install();
exports.ids = ["home"];
exports.modules = {

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/home/Home.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n\n.Home-root-1avl7 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home-container-3YPN- {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n  max-width: var(--max-content-width);\n}\n\n.Home-newsItem--EKGZ {\n  margin: 0 0 32px;\n  margin: 0 0 2rem;\n}\n\n.Home-newsTitle-3GwAp {\n  font-size: 24px;\n  font-size: 1.5rem;\n}\n\n.Home-newsDesc-107uo h1,\n.Home-newsDesc-107uo h2,\n.Home-newsDesc-107uo h3,\n.Home-newsDesc-107uo h4,\n.Home-newsDesc-107uo h5,\n.Home-newsDesc-107uo h6 {\n  font-size: 18px;\n  font-size: 1.125rem;\n}\n\n.Home-newsDesc-107uo pre {\n  white-space: pre-wrap;\n  font-size: 14px;\n  font-size: 0.875rem;\n}\n\n.Home-newsDesc-107uo img {\n  max-width: 100%;\n}\n", "",{"version":3,"sources":["Home.css","../../components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;EAOE;;ACPF;;;;;;;EAOE;;AAEF;EACE;;+EAE6E;;EAE7E,iEAAiE;;EAEjE;;+EAE6E;;EAE7E,2BAA2B;;EAE3B;;+EAE6E;;EAE7E,sBAAsB,GAAG,+BAA+B;EACxD,sBAAsB,GAAG,0BAA0B;EACnD,sBAAsB,GAAG,4BAA4B;EACrD,uBAAuB,EAAE,gCAAgC;AAC3D;;ADnBA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,iBAAmC;EAAnC,mCAAmC;AACrC;;AAEA;EACE,gBAAgB;EAAhB,gBAAgB;AAClB;;AAEA;EACE,eAAiB;EAAjB,iBAAiB;AACnB;;AAEA;;;;;;EAME,eAAmB;EAAnB,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;EACrB,eAAmB;EAAnB,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB","file":"Home.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n\n.newsItem {\n  margin: 0 0 2rem;\n}\n\n.newsTitle {\n  font-size: 1.5rem;\n}\n\n.newsDesc h1,\n.newsDesc h2,\n.newsDesc h3,\n.newsDesc h4,\n.newsDesc h5,\n.newsDesc h6 {\n  font-size: 1.125rem;\n}\n\n.newsDesc pre {\n  white-space: pre-wrap;\n  font-size: 0.875rem;\n}\n\n.newsDesc img {\n  max-width: 100%;\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"]}]);
// Exports
exports.locals = {
	"root": "Home-root-1avl7",
	"container": "Home-container-3YPN-",
	"newsItem": "Home-newsItem--EKGZ",
	"newsTitle": "Home-newsTitle-3GwAp",
	"newsDesc": "Home-newsDesc-107uo"
};

/***/ }),

/***/ "./src/routes/home/Home.css":
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/home/Home.css");
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
      module.hot.accept("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/home/Home.css", function() {
        css = __webpack_require__("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/home/Home.css");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/home/Home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("isomorphic-style-loader/useStyles");
/* harmony import */ var isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/routes/home/Home.css");
/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Home_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/routes/home/Home.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function Home({
  news
}) {
  isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0___default()(_Home_css__WEBPACK_IMPORTED_MODULE_3___default.a);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _Home_css__WEBPACK_IMPORTED_MODULE_3___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _Home_css__WEBPACK_IMPORTED_MODULE_3___default.a.container,
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
  }, "React.js News"), news.map(item => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
    key: item.link,
    className: _Home_css__WEBPACK_IMPORTED_MODULE_3___default.a.newsItem,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: _Home_css__WEBPACK_IMPORTED_MODULE_3___default.a.newsTitle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: item.link,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, item.title)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _Home_css__WEBPACK_IMPORTED_MODULE_3___default.a.newsDesc // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: item.content
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  })))));
}
Home.propTypes = {
  news: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    link: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    content: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
  })).isRequired
};

/***/ }),

/***/ "./src/routes/home/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/routes/home/Home.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/components/Layout/Layout.js");
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/routes/home/index.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




async function action({
  fetch
}) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}'
    })
  });
  const {
    data
  } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Home__WEBPACK_IMPORTED_MODULE_1__["default"], {
      news: data.news,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }))
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2hvbWUuanMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3JvdXRlcy9ob21lL0hvbWUuY3NzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzcz84MmQ1IiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvcm91dGVzL2hvbWUvSG9tZS5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3JvdXRlcy9ob21lL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLS1mb250LWZhbWlseS1iYXNlOiAnU2Vnb2UgVUknLCAnSGVsdmV0aWNhTmV1ZS1MaWdodCcsIHNhbnMtc2VyaWY7XFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tbWF4LWNvbnRlbnQtd2lkdGg6IDEwMDBweDtcXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tc2NyZWVuLXhzLW1pbjogNDgwcHg7ICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqL1xcbiAgLS1zY3JlZW4tc20tbWluOiA3NjhweDsgIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqL1xcbiAgLS1zY3JlZW4tbWQtbWluOiA5OTJweDsgIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovXFxuICAtLXNjcmVlbi1sZy1taW46IDEyMDBweDsgLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblxcbi5Ib21lLXJvb3QtMWF2bDcge1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXG59XFxuXFxuLkhvbWUtY29udGFpbmVyLTNZUE4tIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMCAwIDQwcHg7XFxuICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gIG1heC13aWR0aDogdmFyKC0tbWF4LWNvbnRlbnQtd2lkdGgpO1xcbn1cXG5cXG4uSG9tZS1uZXdzSXRlbS0tRUtHWiB7XFxuICBtYXJnaW46IDAgMCAzMnB4O1xcbiAgbWFyZ2luOiAwIDAgMnJlbTtcXG59XFxuXFxuLkhvbWUtbmV3c1RpdGxlLTNHd0FwIHtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBoMSxcXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBoMixcXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBoMyxcXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBoNCxcXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBoNSxcXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBoNiB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXNpemU6IDEuMTI1cmVtO1xcbn1cXG5cXG4uSG9tZS1uZXdzRGVzYy0xMDd1byBwcmUge1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcXG59XFxuXFxuLkhvbWUtbmV3c0Rlc2MtMTA3dW8gaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiSG9tZS5jc3NcIixcIi4uLy4uL2NvbXBvbmVudHMvdmFyaWFibGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7Ozs7OztFQU9FOztBQ1BGOzs7Ozs7O0VBT0U7O0FBRUY7RUFDRTs7K0VBRTZFOztFQUU3RSxpRUFBaUU7O0VBRWpFOzsrRUFFNkU7O0VBRTdFLDJCQUEyQjs7RUFFM0I7OytFQUU2RTs7RUFFN0Usc0JBQXNCLEdBQUcsK0JBQStCO0VBQ3hELHNCQUFzQixHQUFHLDBCQUEwQjtFQUNuRCxzQkFBc0IsR0FBRyw0QkFBNEI7RUFDckQsdUJBQXVCLEVBQUUsZ0NBQWdDO0FBQzNEOztBRG5CQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGlCQUFtQztFQUFuQyxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFBaEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBaUI7RUFBakIsaUJBQWlCO0FBQ25COztBQUVBOzs7Ozs7RUFNRSxlQUFtQjtFQUFuQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZUFBbUI7RUFBbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQlwiLFwiZmlsZVwiOlwiSG9tZS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG5AaW1wb3J0ICcuLi8uLi9jb21wb25lbnRzL3ZhcmlhYmxlcy5jc3MnO1xcblxcbi5yb290IHtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAwIDAgNDBweDtcXG4gIG1heC13aWR0aDogdmFyKC0tbWF4LWNvbnRlbnQtd2lkdGgpO1xcbn1cXG5cXG4ubmV3c0l0ZW0ge1xcbiAgbWFyZ2luOiAwIDAgMnJlbTtcXG59XFxuXFxuLm5ld3NUaXRsZSB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLm5ld3NEZXNjIGgxLFxcbi5uZXdzRGVzYyBoMixcXG4ubmV3c0Rlc2MgaDMsXFxuLm5ld3NEZXNjIGg0LFxcbi5uZXdzRGVzYyBoNSxcXG4ubmV3c0Rlc2MgaDYge1xcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG59XFxuXFxuLm5ld3NEZXNjIHByZSB7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICBmb250LXNpemU6IDAuODc1cmVtO1xcbn1cXG5cXG4ubmV3c0Rlc2MgaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXCIsXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tZm9udC1mYW1pbHktYmFzZTogJ1NlZ29lIFVJJywgJ0hlbHZldGljYU5ldWUtTGlnaHQnLCBzYW5zLXNlcmlmO1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAtLW1heC1jb250ZW50LXdpZHRoOiAxMDAwcHg7XFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAtLXNjcmVlbi14cy1taW46IDQ4MHB4OyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi9cXG4gIC0tc2NyZWVuLXNtLW1pbjogNzY4cHg7ICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi9cXG4gIC0tc2NyZWVuLW1kLW1pbjogOTkycHg7ICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqL1xcbiAgLS1zY3JlZW4tbGctbWluOiAxMjAwcHg7IC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cIl19XSk7XG4vLyBFeHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiSG9tZS1yb290LTFhdmw3XCIsXG5cdFwiY29udGFpbmVyXCI6IFwiSG9tZS1jb250YWluZXItM1lQTi1cIixcblx0XCJuZXdzSXRlbVwiOiBcIkhvbWUtbmV3c0l0ZW0tLUVLR1pcIixcblx0XCJuZXdzVGl0bGVcIjogXCJIb21lLW5ld3NUaXRsZS0zR3dBcFwiLFxuXHRcIm5ld3NEZXNjXCI6IFwiSG9tZS1uZXdzRGVzYy0xMDd1b1wiXG59OyIsIlxuICAgIHZhciByZWZzID0gMDtcbiAgICB2YXIgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS1ydWxlcy0zIS4vSG9tZS5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2luc2VydENzcy5qc1wiKTtcbiAgICB2YXIgY29udGVudCA9IHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnID8gW1ttb2R1bGUuaWQsIGNzcywgJyddXSA6IGNzcztcblxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNzcy5sb2NhbHMgfHwge307XG4gICAgZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBleHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuICcnICsgY3NzOyB9O1xuICAgIGV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS01LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTMhLi9Ib21lLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS1ydWxlcy0zIS4vSG9tZS5jc3NcIik7XG4gICAgICAgIGNvbnRlbnQgPSB0eXBlb2YgY3NzID09PSAnc3RyaW5nJyA/IFtbbW9kdWxlLmlkLCBjc3MsICcnXV0gOiBjc3M7XG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdXNlU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL3VzZVN0eWxlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzIGZyb20gJy4vSG9tZS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKHsgbmV3cyB9KSB7XG4gIHVzZVN0eWxlcyhzKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17cy5yb290fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmNvbnRhaW5lcn0+XG4gICAgICAgIDxoMT5SZWFjdC5qcyBOZXdzPC9oMT5cbiAgICAgICAge25ld3MubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgIDxhcnRpY2xlIGtleT17aXRlbS5saW5rfSBjbGFzc05hbWU9e3MubmV3c0l0ZW19PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT17cy5uZXdzVGl0bGV9PlxuICAgICAgICAgICAgICA8YSBocmVmPXtpdGVtLmxpbmt9PntpdGVtLnRpdGxlfTwvYT5cbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17cy5uZXdzRGVzY31cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWRhbmdlclxuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGl0ZW0uY29udGVudCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkhvbWUucHJvcFR5cGVzID0ge1xuICBuZXdzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIGxpbms6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIGNvbnRlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSksXG4gICkuaXNSZXF1aXJlZCxcbn07XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSG9tZSBmcm9tICcuL0hvbWUnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGFjdGlvbih7IGZldGNoIH0pIHtcbiAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKCcvZ3JhcGhxbCcsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBxdWVyeTogJ3tuZXdze3RpdGxlLGxpbmssY29udGVudH19JyxcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcmVzcC5qc29uKCk7XG4gIGlmICghZGF0YSB8fCAhZGF0YS5uZXdzKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHRoZSBuZXdzIGZlZWQuJyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6ICdSZWFjdCBTdGFydGVyIEtpdCcsXG4gICAgY2h1bmtzOiBbJ2hvbWUnXSxcbiAgICBjb21wb25lbnQ6IChcbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxIb21lIG5ld3M9e2RhdGEubmV3c30gLz5cbiAgICAgIDwvTGF5b3V0PlxuICAgICksXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFjdGlvbjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUZBOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFTQTtBQUNBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==