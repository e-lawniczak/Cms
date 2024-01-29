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
exports.MainPage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var commonElements_1 = require("./commonElements");
var axios_1 = __importDefault(require("axios"));
var common_1 = require("./common");
var MainPage = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    return React.createElement(commonElements_1.PageWrapper, null,
        React.createElement(BannerSection, null),
        React.createElement(ProductsList, null));
};
exports.MainPage = MainPage;
var ProductsList = function () {
    var _a = (0, react_1.useState)(), galleryObj = _a[0], setGallery = _a[1], _b = (0, react_1.useState)(false), preview = _b[0], setPreview = _b[1], _c = (0, react_1.useState)(""), previewImg = _c[0], setPreviewImg = _c[1], gallery = location.pathname.split("/")[location.pathname.split("/").length - 1], getProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetGallery/".concat(gallery))];
                case 1:
                    res = _a.sent();
                    setGallery(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, onPictureClick = function (path) {
        var fullSrc = path.split("/");
        fullSrc[fullSrc.length - 2] = "Full";
        var src = fullSrc.join("/");
        setPreview(true);
        setPreviewImg(src);
    };
    React.useEffect(function () {
        getProducts();
    }, []);
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "gallery-picture-list" }, (0, common_1.getPictureUrlFromList)(galleryObj === null || galleryObj === void 0 ? void 0 : galleryObj.pictureIdList, "Mini").map(function (p) {
            return React.createElement("div", { onClick: function () { return onPictureClick(p); }, className: "picture-list-element" },
                React.createElement(common_1.Image, { src: p }));
        })),
        preview &&
            React.createElement("div", { onClick: function () { return setPreview(false); }, className: "image-preview" },
                React.createElement(common_1.Image, { src: previewImg })));
};
var BannerSection = function () {
    var _a = (0, react_1.useState)(), gal = _a[0], setGallery = _a[1], gallery = location.pathname.split("/")[location.pathname.split("/").length - 1], getGallery = function () { return __awaiter(void 0, void 0, void 0, function () {
        var resCat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetGallery/".concat(gallery))];
                case 1:
                    resCat = _a.sent();
                    if (resCat.status == 200) {
                        setGallery(resCat.data);
                    }
                    else {
                        location.href = "/Error";
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getGallery();
    }, []);
    return React.createElement("section", { className: "bg-gray-7" },
        React.createElement("div", { className: "breadcrumbs-custom box-transform-wrap context-dark" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "breadcrumbs-custom-title" }, (gal === null || gal === void 0 ? void 0 : gal.name) || ""),
                React.createElement("div", { className: "breadcrumbs-custom-decor" })),
            React.createElement("div", { className: "box-transform", style: { backgroundImage: "url(".concat((0, common_1.getPictureUrlFromList)(gal === null || gal === void 0 ? void 0 : gal.pictureIdList)[0], ")") } })),
        React.createElement("div", { className: "container" },
            React.createElement("ul", { className: "breadcrumbs-custom-path" },
                React.createElement("li", null,
                    React.createElement("a", { href: "/" }, "Home")),
                React.createElement("li", { className: "active" }, (gal === null || gal === void 0 ? void 0 : gal.name) || ""))));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.MainPage, null), root);
//# sourceMappingURL=galleryPage.js.map