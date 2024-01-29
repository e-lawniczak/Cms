"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var commonElements_1 = require("./commonElements");
var axios_1 = __importDefault(require("axios"));
var common_1 = require("./common");
var CategoryPage = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    return React.createElement(commonElements_1.PageWrapper, null,
        React.createElement(BannerSection, null),
        React.createElement(ProductsList, null));
};
exports.CategoryPage = CategoryPage;
var ProductsList = function () {
    var _a = (0, react_1.useState)(), products = _a[0], setProducts = _a[1], cat = location.pathname.split("/")[location.pathname.split("/").length - 1], getProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var resCat, res, p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetCategory/".concat(cat))];
                case 1:
                    resCat = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleProductList")];
                case 2:
                    res = _a.sent();
                    p = res.data.filter(function (p) { return resCat.data.id == p.categoryId; });
                    // if (p?.length == 0) location.href = "/Error"
                    setProducts(p);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getProducts();
    }, []);
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "product-list" }, products === null || products === void 0 ? void 0 : products.map(function (p, idx) {
            return React.createElement(Product, { key: idx, iii: idx, product: p });
        })));
};
var Product = function (props) {
    var product = props.product, iii = props.iii;
    return React.createElement("div", { className: "product-item" },
        React.createElement("article", { className: "product ", "data-wow-delay": ".15s" },
            React.createElement("div", { className: "base-info" },
                React.createElement("div", null,
                    React.createElement("div", { className: "product-figure" },
                        React.createElement("img", { src: (0, common_1.getPictureUrlFromList)(product.pictureIdList)[0], alt: "", width: "161", height: "162" })),
                    React.createElement("div", { className: "product-rating" }, Array.from({ length: 5 }, function (_, i) { return i + 1; }).map(function (i, idx) {
                        if (idx < product.score)
                            return React.createElement("span", { className: "mdi mdi-star" });
                        return React.createElement("span", { className: "mdi mdi-star text-gray-13" });
                    }))),
                React.createElement("div", null,
                    React.createElement("h6", { className: "product-title" },
                        product.id,
                        ". ",
                        product.name),
                    React.createElement("div", { className: "product-price-wrap" }, (product.discountPrice < product.price && product.discountPrice > 0) ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "product-price product-price-old" },
                                product.price,
                                " z\u0142"),
                            React.createElement("div", { className: "product-price" },
                                product.discountPrice,
                                " z\u0142"))
                        : React.createElement("div", { className: "product-price" },
                            product.price,
                            " z\u0142")),
                    React.createElement("div", { className: "description", dangerouslySetInnerHTML: { __html: product.description } }))),
            (product.discountPrice < product.price && product.discountPrice > 0) ? React.createElement("span", { className: "product-badge product-badge-sale" }, "Sale") : ""));
};
var BannerSection = function () {
    var _a = (0, react_1.useState)(), page = _a[0], setPage = _a[1], _b = (0, react_1.useState)(), category = _b[0], setCategory = _b[1], cat = location.pathname.split("/")[location.pathname.split("/").length - 1], getCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var resCat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetCategory/".concat(cat))];
                case 1:
                    resCat = _a.sent();
                    if (resCat.status == 200) {
                        setCategory(resCat.data);
                    }
                    else {
                        location.href = "/Error";
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getCategory();
    }, []);
    return React.createElement("section", { className: "bg-gray-7" },
        React.createElement("div", { className: "breadcrumbs-custom box-transform-wrap context-dark" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "breadcrumbs-custom-title" }, (category === null || category === void 0 ? void 0 : category.name) || ""),
                React.createElement("div", { className: "breadcrumbs-custom-decor" })),
            React.createElement("div", { className: "box-transform", style: { backgroundImage: "url(".concat((0, common_1.getPictureUrlFromList)(category === null || category === void 0 ? void 0 : category.pictureIdList)[0], ")") } })),
        React.createElement("div", { className: "container" },
            React.createElement("ul", { className: "breadcrumbs-custom-path" },
                React.createElement("li", null,
                    React.createElement("a", { href: "/" }, "Home")),
                React.createElement("li", { className: "active" }, (category === null || category === void 0 ? void 0 : category.name) || ""))));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.CategoryPage, null), root);
//# sourceMappingURL=categoryPage.js.map