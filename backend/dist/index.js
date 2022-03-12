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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: prepare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prepare\", function() { return prepare; });\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var graphql_tools_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tools-types */ \"graphql-tools-types\");\n/* harmony import */ var graphql_tools_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tools_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./service */ \"./src/service/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nvar express = __webpack_require__(/*! express */ \"express\");\n\n\nvar ApolloServer = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\").ApolloServer;\nvar makeExecutableSchema = __webpack_require__(/*! graphql-tools */ \"graphql-tools\").makeExecutableSchema;\nvar _a = __webpack_require__(/*! graphql-iso-date */ \"graphql-iso-date\"), GraphQLDate = _a.GraphQLDate, GraphQLDateTime = _a.GraphQLDateTime;\n\n\nvar PORT_SERVICE = 4000;\nvar cxt = {};\nvar prepare = function (schema, resolvers) {\n    return makeExecutableSchema({\n        typeDefs: __spreadArray(__spreadArray([], schema, true), [\n            \"\\n    scalar JSON\\n    scalar DateTime\\n    scalar Date\\n    scalar UUID\\n\\n    type Query {\\n      viewer: Viewer\\n    }\\n\\n    type Mutation {\\n      viewer: ViewerMutations\\n    }\\n\\n  \",\n        ], false),\n        resolvers: __assign(__assign({}, resolvers), { Date: GraphQLDate, DateTime: GraphQLDateTime, JSON: graphql_tools_types__WEBPACK_IMPORTED_MODULE_2___default.a.JSON({ name: \"JSON\" }), UUID: graphql_tools_types__WEBPACK_IMPORTED_MODULE_2___default.a.JSON({ name: \"UUID\" }), Query: {\n                viewer: function () { return ({}); },\n            }, Mutation: {\n                viewer: function () { return ({}); },\n            } }),\n    });\n};\ntry {\n    (function () { return __awaiter(void 0, void 0, void 0, function () {\n        var server, app;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    server = new ApolloServer({ schema: prepare(_service__WEBPACK_IMPORTED_MODULE_3__[\"schema\"], _service__WEBPACK_IMPORTED_MODULE_3__[\"resolvers\"]) });\n                    return [4 /*yield*/, server.start()];\n                case 1:\n                    _a.sent();\n                    app = express();\n                    server.applyMiddleware({ app: app, path: \"/backend/graphql\" });\n                    app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default()());\n                    app.use(cors__WEBPACK_IMPORTED_MODULE_0___default()());\n                    app.get(\"/backend/health\", function (req, res) {\n                        res.send(\"ok\");\n                    });\n                    console.log(\"Listen port \" + PORT_SERVICE);\n                    app.listen({ port: PORT_SERVICE }, function () { return console.log(\"Node running\"); });\n                    return [2 /*return*/];\n            }\n        });\n    }); })();\n}\ncatch (e) {\n    console.error(\"service.error: \" + e.toString());\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/service/index.ts":
/*!******************************!*\
  !*** ./src/service/index.ts ***!
  \******************************/
/*! exports provided: schema, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"schema\", function() { return schema; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolvers\", function() { return resolvers; });\n/* harmony import */ var _restaurants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restaurants */ \"./src/service/restaurants/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\nvar schema = __spreadArray(__spreadArray([], _restaurants__WEBPACK_IMPORTED_MODULE_0__[\"schema\"], true), [\n    \"\\n  type Viewer {\\n    account: Account\\n  }\\n\\n  type ViewerMutations {\\n    account: AccountMutations\\n  }\\n\\n  type Account {\\n    id: String\\n    restaurants: RestaurantQueries!\\n  }\\n\\n  type AccountMutations {\\n    id: String\\n    restaurants: RestaurantMutations!\\n  }\\n\",\n], false);\nvar resolvers = __assign(__assign({}, _restaurants__WEBPACK_IMPORTED_MODULE_0__[\"resolvers\"]), { Viewer: {\n        account: function () { return ({ id: \"vicjicama\" }); },\n    }, ViewerMutations: {\n        account: function () { return ({}); },\n    } });\n\n\n\n//# sourceURL=webpack:///./src/service/index.ts?");

/***/ }),

/***/ "./src/service/restaurants/index.ts":
/*!******************************************!*\
  !*** ./src/service/restaurants/index.ts ***!
  \******************************************/
/*! exports provided: schema, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"schema\", function() { return schema; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolvers\", function() { return resolvers; });\nvar schema = [\n    \"\\n\\n  type Owner {\\n    id: ID!\\n    name: String!\\n    image: String\\n  }\\n\\n  type Restaurant {\\n    id: ID!\\n    name: String!\\n    description: String\\n\\n    supportedEmployees: Int!\\n    preparedMeals: Int!\\n    receivedDonations: Float!\\n\\n    latitude: Float!\\n    longitude: Float!\\n\\n    owner: Owner!\\n\\n    images: [String]!\\n\\n    updatedAt: DateTime!\\n    createdAt: DateTime!\\n  }\\n\\n  type RestaurantQueries {\\n    id: String\\n    list: [Restaurant]!\\n    get(id: ID!): Restaurant\\n  }\\n\\n  type RestaurantMutations {\\n    create: RestaurantQueries!\\n  }\\n\",\n];\nvar resolvers = {\n    RestaurantQueries: {\n        list: function () { return []; },\n    },\n    RestaurantMutations: {\n        create: function () { return ({}); },\n    },\n};\n\n\n\n//# sourceURL=webpack:///./src/service/restaurants/index.ts?");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-express\");\n\n//# sourceURL=webpack:///external_%22apollo-server-express%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "graphql-iso-date":
/*!***********************************!*\
  !*** external "graphql-iso-date" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-iso-date\");\n\n//# sourceURL=webpack:///external_%22graphql-iso-date%22?");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tools\");\n\n//# sourceURL=webpack:///external_%22graphql-tools%22?");

/***/ }),

/***/ "graphql-tools-types":
/*!**************************************!*\
  !*** external "graphql-tools-types" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tools-types\");\n\n//# sourceURL=webpack:///external_%22graphql-tools-types%22?");

/***/ })

/******/ });