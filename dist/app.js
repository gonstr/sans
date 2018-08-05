/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/app/components/app.js":
/*!***********************************!*\
  !*** ./lib/app/components/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _term = __webpack_require__(/*! ./term */ \"./lib/app/components/term.js\");\n\nvar _term2 = _interopRequireDefault(_term);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        { style: styles.container },\n        _react2.default.createElement('div', { style: styles.header }),\n        _react2.default.createElement(\n          'div',\n          { style: styles.term },\n          _react2.default.createElement(_term2.default, null)\n        )\n      );\n    }\n  }]);\n\n  return App;\n}(_react.Component);\n\nexports.default = App;\n\n\nvar styles = {\n  container: {\n    position: 'fixed',\n    top: 0,\n    bottom: 0,\n    left: 0,\n    right: 0,\n    display: 'flex',\n    flexDirection: 'column'\n  },\n  header: {\n    height: '35px',\n    WebkitAppRegion: 'drag'\n  },\n  term: {\n    position: 'relative',\n    flex: 1,\n    margin: '0 0 15px 15px'\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvYXBwL2NvbXBvbmVudHMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2xpYi9hcHAvY29tcG9uZW50cy9hcHAuanM/ZmJjYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmltcG9ydCBUZXJtIGZyb20gJy4vdGVybSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmhlYWRlcn0gLz5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnRlcm19PlxuICAgICAgICAgIDxUZXJtIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgY29udGFpbmVyOiB7XG4gICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xuICB9LFxuICBoZWFkZXI6IHtcbiAgICBoZWlnaHQ6ICczNXB4JyxcbiAgICBXZWJraXRBcHBSZWdpb246ICdkcmFnJ1xuICB9LFxuICB0ZXJtOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgZmxleDogMSxcbiAgICBtYXJnaW46ICcwIDAgMTVweCAxNXB4J1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUZBO0FBT0E7Ozs7QUFWQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFkQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/app/components/app.js\n");

/***/ }),

/***/ "./lib/app/components/term.js":
/*!************************************!*\
  !*** ./lib/app/components/term.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar pty = __webpack_require__(/*! node-pty */ \"node-pty\");\n\nvar _require = __webpack_require__(/*! xterm */ \"xterm\"),\n    Terminal = _require.Terminal;\n\nvar fit = __webpack_require__(/*! xterm/lib/addons/fit/fit */ \"xterm/lib/addons/fit/fit\");\nvar locale = __webpack_require__(/*! os-locale */ \"os-locale\");\n\nvar themes = __webpack_require__(/*! ../themes */ \"./lib/app/themes.js\");\n\nvar _require2 = __webpack_require__(/*! ../../../package */ \"./package.json\"),\n    name = _require2.name,\n    version = _require2.version;\n\nTerminal.applyAddon(fit);\n\nvar Term = function (_Component) {\n  _inherits(Term, _Component);\n\n  function Term() {\n    _classCallCheck(this, Term);\n\n    var _this = _possibleConstructorReturn(this, (Term.__proto__ || Object.getPrototypeOf(Term)).call(this));\n\n    _this.fit = _this.fit.bind(_this);\n    return _this;\n  }\n\n  _createClass(Term, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      // node-pty init\n      this.shell = pty.spawn('bash', ['--login'], {\n        name: 'xterm-color',\n        cols: 100,\n        rows: 40,\n        cwd: this.props.cwd || process.cwd(),\n        env: Object.assign({\n          LANG: locale.sync() + '.UTF-8'\n        }, process.env, {\n          TERM: 'xterm-256color',\n          COLORTERM: 'truecolor',\n          TERM_PROGRAM: name,\n          TERM_PROGRAM_VERSION: version\n        })\n      });\n\n      // xterm init\n      this.xterm = new Terminal({\n        fontFamily: 'Monaco, monospace',\n        fontSize: 12,\n        //rendererType: 'dom',\n        //experimentalCharAtlas: 'dynamic',\n        allowTransparency: true,\n        theme: themes.dracula\n      });\n      this.xterm.open(this.termRef);\n      window.addEventListener('resize', this.fit);\n      this.xterm.fit();\n      this.xterm.focus();\n\n      // bindings\n      this.xterm.on('data', function (data) {\n        return _this2.shell.write(data);\n      });\n      this.shell.on('data', function (data) {\n        return _this2.xterm.write(data);\n      });\n      this.xterm.on('resize', function (_ref) {\n        var cols = _ref.cols,\n            rows = _ref.rows;\n        return _this2.shell.resize(cols, rows);\n      });\n    }\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      window.removeEventListener('resize', this.fit);\n      this.xterm.dispose();\n      this.shell.kill();\n    }\n  }, {\n    key: 'fit',\n    value: function fit() {\n      this.xterm.fit();\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this3 = this;\n\n      return _react2.default.createElement('div', { style: styles.container, ref: function ref(_ref2) {\n          return _this3.termRef = _ref2;\n        } });\n    }\n  }]);\n\n  return Term;\n}(_react.Component);\n\nexports.default = Term;\n\n\nvar styles = {\n  container: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    bottom: 0,\n    right: 0\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvYXBwL2NvbXBvbmVudHMvdGVybS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvYXBwL2NvbXBvbmVudHMvdGVybS5qcz84M2Q3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmNvbnN0IHB0eSA9IHJlcXVpcmUoJ25vZGUtcHR5JylcbmNvbnN0IHsgVGVybWluYWwgfSA9IHJlcXVpcmUoJ3h0ZXJtJylcbmNvbnN0IGZpdCA9IHJlcXVpcmUoJ3h0ZXJtL2xpYi9hZGRvbnMvZml0L2ZpdCcpXG5jb25zdCBsb2NhbGUgPSByZXF1aXJlKCdvcy1sb2NhbGUnKVxuXG5jb25zdCB0aGVtZXMgPSByZXF1aXJlKCcuLi90aGVtZXMnKVxuY29uc3QgeyBuYW1lLCB2ZXJzaW9uIH0gPSByZXF1aXJlKCcuLi8uLi8uLi9wYWNrYWdlJylcblxuVGVybWluYWwuYXBwbHlBZGRvbihmaXQpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5maXQgPSB0aGlzLmZpdC5iaW5kKHRoaXMpXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBub2RlLXB0eSBpbml0XG4gICAgdGhpcy5zaGVsbCA9IHB0eS5zcGF3bignYmFzaCcsIFsnLS1sb2dpbiddLCB7XG4gICAgICBuYW1lOiAneHRlcm0tY29sb3InLFxuICAgICAgY29sczogMTAwLFxuICAgICAgcm93czogNDAsXG4gICAgICBjd2Q6IHRoaXMucHJvcHMuY3dkIHx8IHByb2Nlc3MuY3dkKCksXG4gICAgICBlbnY6IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBMQU5HOiBsb2NhbGUuc3luYygpICsgJy5VVEYtOCdcbiAgICAgICAgfSxcbiAgICAgICAgcHJvY2Vzcy5lbnYsXG4gICAgICAgIHtcbiAgICAgICAgICBURVJNOiAneHRlcm0tMjU2Y29sb3InLFxuICAgICAgICAgIENPTE9SVEVSTTogJ3RydWVjb2xvcicsXG4gICAgICAgICAgVEVSTV9QUk9HUkFNOiBuYW1lLFxuICAgICAgICAgIFRFUk1fUFJPR1JBTV9WRVJTSU9OOiB2ZXJzaW9uXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8geHRlcm0gaW5pdFxuICAgIHRoaXMueHRlcm0gPSBuZXcgVGVybWluYWwoe1xuICAgICAgZm9udEZhbWlseTogJ01vbmFjbywgbW9ub3NwYWNlJyxcbiAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgIC8vcmVuZGVyZXJUeXBlOiAnZG9tJyxcbiAgICAgIC8vZXhwZXJpbWVudGFsQ2hhckF0bGFzOiAnZHluYW1pYycsXG4gICAgICBhbGxvd1RyYW5zcGFyZW5jeTogdHJ1ZSxcbiAgICAgIHRoZW1lOiB0aGVtZXMuZHJhY3VsYVxuICAgIH0pXG4gICAgdGhpcy54dGVybS5vcGVuKHRoaXMudGVybVJlZilcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5maXQpXG4gICAgdGhpcy54dGVybS5maXQoKVxuICAgIHRoaXMueHRlcm0uZm9jdXMoKVxuXG4gICAgLy8gYmluZGluZ3NcbiAgICB0aGlzLnh0ZXJtLm9uKCdkYXRhJywgZGF0YSA9PiB0aGlzLnNoZWxsLndyaXRlKGRhdGEpKVxuICAgIHRoaXMuc2hlbGwub24oJ2RhdGEnLCBkYXRhID0+IHRoaXMueHRlcm0ud3JpdGUoZGF0YSkpXG4gICAgdGhpcy54dGVybS5vbigncmVzaXplJywgKHsgY29scywgcm93cyB9KSA9PiB0aGlzLnNoZWxsLnJlc2l6ZShjb2xzLCByb3dzKSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpdClcbiAgICB0aGlzLnh0ZXJtLmRpc3Bvc2UoKVxuICAgIHRoaXMuc2hlbGwua2lsbCgpXG4gIH1cblxuICBmaXQoKSB7XG4gICAgdGhpcy54dGVybS5maXQoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfSByZWY9e3JlZiA9PiAodGhpcy50ZXJtUmVmID0gcmVmKX0gLz5cbiAgfVxufVxuXG5jb25zdCBzdHlsZXMgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICByaWdodDogMFxuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFWQTtBQUNBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTs7OztBQTNEQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBNERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/app/components/term.js\n");

/***/ }),

/***/ "./lib/app/index.js":
/*!**************************!*\
  !*** ./lib/app/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _app = __webpack_require__(/*! ./components/app */ \"./lib/app/components/app.js\");\n\nvar _app2 = _interopRequireDefault(_app);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById('app'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvYXBwL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2xpYi9hcHAvaW5kZXguanM/ZGE5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuXG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9hcHAnXG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/app/index.js\n");

/***/ }),

/***/ "./lib/app/themes.js":
/*!***************************!*\
  !*** ./lib/app/themes.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// https://github.com/dracula/xresources/blob/master/Xresources\nvar dracula = {\n  foreground: '#f8f8f2',\n  background: 'transparent', // #282a36\n  cursor: '#8be9fd',\n  cursorAccent: '#9aedfe',\n  selection: 'rgba(68, 71, 90, .5)', // https://github.com/xtermjs/xterm.js/issues/720\n  black: '#000000',\n  red: '#ff5555',\n  green: '#50fa7b',\n  yellow: '#f1fa8c',\n  blue: '#bd93f9',\n  magenta: '#ff79c6',\n  cyan: '#8be9fd',\n  white: '#bfbfbf',\n  brightBlack: '#4d4d4d',\n  brightRed: '#ff6e67',\n  brightGreen: '#5af78e',\n  brightYellow: '#f4f99d',\n  brightBlue: '#caa9fa',\n  brightMagenta: '#ff92d0',\n  brightCyan: '#9aedfe',\n  brightWhite: '#e6e6e6'\n};\n\nmodule.exports = {\n  dracula: dracula\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvYXBwL3RoZW1lcy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvYXBwL3RoZW1lcy5qcz8yYmI2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kcmFjdWxhL3hyZXNvdXJjZXMvYmxvYi9tYXN0ZXIvWHJlc291cmNlc1xuY29uc3QgZHJhY3VsYSA9IHtcbiAgZm9yZWdyb3VuZDogJyNmOGY4ZjInLFxuICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLCAvLyAjMjgyYTM2XG4gIGN1cnNvcjogJyM4YmU5ZmQnLFxuICBjdXJzb3JBY2NlbnQ6ICcjOWFlZGZlJyxcbiAgc2VsZWN0aW9uOiAncmdiYSg2OCwgNzEsIDkwLCAuNSknLCAvLyBodHRwczovL2dpdGh1Yi5jb20veHRlcm1qcy94dGVybS5qcy9pc3N1ZXMvNzIwXG4gIGJsYWNrOiAnIzAwMDAwMCcsXG4gIHJlZDogJyNmZjU1NTUnLFxuICBncmVlbjogJyM1MGZhN2InLFxuICB5ZWxsb3c6ICcjZjFmYThjJyxcbiAgYmx1ZTogJyNiZDkzZjknLFxuICBtYWdlbnRhOiAnI2ZmNzljNicsXG4gIGN5YW46ICcjOGJlOWZkJyxcbiAgd2hpdGU6ICcjYmZiZmJmJyxcbiAgYnJpZ2h0QmxhY2s6ICcjNGQ0ZDRkJyxcbiAgYnJpZ2h0UmVkOiAnI2ZmNmU2NycsXG4gIGJyaWdodEdyZWVuOiAnIzVhZjc4ZScsXG4gIGJyaWdodFllbGxvdzogJyNmNGY5OWQnLFxuICBicmlnaHRCbHVlOiAnI2NhYTlmYScsXG4gIGJyaWdodE1hZ2VudGE6ICcjZmY5MmQwJyxcbiAgYnJpZ2h0Q3lhbjogJyM5YWVkZmUnLFxuICBicmlnaHRXaGl0ZTogJyNlNmU2ZTYnXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkcmFjdWxhXG59XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXJCQTtBQUNBO0FBdUJBO0FBQ0E7QUFEQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/app/themes.js\n");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, main, scripts, devDependencies, dependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"terminal\",\"version\":\"1.0.0\",\"main\":\"lib/electron/index.js\",\"scripts\":{\"start\":\"electron .\",\"wp\":\"webpack -d --watch\",\"rebuild\":\"electron-rebuild\"},\"devDependencies\":{\"babel-core\":\"^6.26.3\",\"babel-loader\":\"^7.1.5\",\"babel-preset-env\":\"^1.7.0\",\"babel-preset-react\":\"^6.24.1\",\"electron\":\"^2.0.0\",\"electron-rebuild\":\"^1.8.2\",\"webpack\":\"^4.16.4\",\"webpack-cli\":\"^3.1.0\",\"webpack-node-externals\":\"^1.7.2\"},\"dependencies\":{\"node-pty\":\"^0.7.6\",\"os-locale\":\"^2.1.0\",\"react\":\"^16.4.2\",\"react-dom\":\"^16.4.2\",\"react-redux\":\"^5.0.7\",\"redux\":\"^4.0.0\",\"xterm\":\"^3.5.1\"}};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlLmpzb24uanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./package.json\n");

/***/ }),

/***/ "node-pty":
/*!***************************!*\
  !*** external "node-pty" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-pty\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wdHkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLXB0eVwiP2RkZTMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1wdHlcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///node-pty\n");

/***/ }),

/***/ "os-locale":
/*!****************************!*\
  !*** external "os-locale" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os-locale\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3MtbG9jYWxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3MtbG9jYWxlXCI/MGFjMCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvcy1sb2NhbGVcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///os-locale\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZG9tLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCI/NWU5YSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///react-dom\n");

/***/ }),

/***/ "xterm":
/*!************************!*\
  !*** external "xterm" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xterm\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRlcm0uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ4dGVybVwiPzQ2OGYiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieHRlcm1cIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///xterm\n");

/***/ }),

/***/ "xterm/lib/addons/fit/fit":
/*!*******************************************!*\
  !*** external "xterm/lib/addons/fit/fit" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xterm/lib/addons/fit/fit\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRlcm0vbGliL2FkZG9ucy9maXQvZml0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwieHRlcm0vbGliL2FkZG9ucy9maXQvZml0XCI/ZDg2YiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4dGVybS9saWIvYWRkb25zL2ZpdC9maXRcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///xterm/lib/addons/fit/fit\n");

/***/ })

/******/ });