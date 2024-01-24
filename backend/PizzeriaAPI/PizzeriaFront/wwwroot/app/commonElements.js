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
exports.PageWrapper = void 0;
var axios_1 = __importDefault(require("axios"));
var React = __importStar(require("react"));
var react_1 = require("react");
var common_1 = require("./common");
var PageWrapper = function (props) {
    var children = props.children, className = props.className, _a = (0, react_1.useState)(), data = _a[0], setData = _a[1];
    return React.createElement(React.Fragment, null,
        React.createElement(Header, { className: className }),
        React.createElement("div", { className: ["react-page-container", className + "-header"].join(" ") }, children),
        React.createElement(Footer, { className: className }));
};
exports.PageWrapper = PageWrapper;
var Header = function (props) {
    var _a = (0, react_1.useState)(), menuElements = _a[0], setMenuElements = _a[1], _b = (0, react_1.useState)(), phone = _b[0], setPhone = _b[1], _c = (0, react_1.useState)(), address = _c[0], setAddress = _c[1], _d = (0, react_1.useState)(), socials = _d[0], setSocials = _d[1], _e = (0, react_1.useState)(), logo = _e[0], setLogo = _e[1], getMenuElements = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleMenuElementList")];
                case 1:
                    res = _a.sent();
                    obj = [];
                    if (res.status == 200) {
                        res.data.forEach(function (el) {
                            if (el.parentMenuElementId < 0 || el.parentMenuElementId == null) {
                                obj.push({ parent: el, children: [] });
                            }
                        });
                        res.data.forEach(function (el) {
                            if (el.parentMenuElementId > 0 || el.parentMenuElementId != null) {
                                var index = obj.findIndex(function (i) { return i.parent.menuElementId == el.parentMenuElementId; });
                                obj[index].children.push(el);
                            }
                        });
                        setMenuElements(obj);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, getPhone = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/phone")];
                case 1:
                    res = _a.sent();
                    setPhone(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/address")];
                case 1:
                    res = _a.sent();
                    setAddress(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getSocials = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllMainSocialMedia")];
                case 1:
                    res = _a.sent();
                    setSocials(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getLogo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, t, s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/main_logo")];
                case 1:
                    res = _a.sent();
                    t = res.data;
                    s = t.value.split("/");
                    s[2] = "Full";
                    t.value = s.join("/");
                    setLogo(t);
                    return [2 /*return*/];
            }
        });
    }); }, mappedMenuElements = menuElements && menuElements.map(function (el) {
        return React.createElement("li", { className: "rd-nav-item" },
            React.createElement("a", { className: "rd-nav-link", href: el.parent.link }, el.parent.text),
            React.createElement("ul", { className: 'child-menu' }, el.children.map(function (child, idx) {
                return React.createElement("li", { className: "child rd-nav-item" },
                    React.createElement("a", { className: "rd-nav-link", href: child.link }, child.text));
            })));
    }).filter(function (i) { return i; }), mappedSocial = socials === null || socials === void 0 ? void 0 : socials.map(function (social, idx) {
        var iconClass = (0, common_1.prepareSocialIcon)(social.name.split("_"));
        return React.createElement("li", { key: idx },
            React.createElement("a", { className: ["icon mdi", iconClass].join(" "), href: social.link }));
    }), x = "";
    React.useEffect(function () {
        getMenuElements();
        getPhone();
        getAddress();
        getSocials();
        getLogo();
    }, []);
    return React.createElement(React.Fragment, null,
        React.createElement("header", { className: ["section page-header", props.className + "-header"].join(" ") },
            React.createElement("div", { className: "rd-navbar-wrap" },
                React.createElement("nav", { className: "rd-navbar rd-navbar-modern", "data-layout": "rd-navbar-fixed", "data-sm-layout": "rd-navbar-fixed", "data-md-layout": "rd-navbar-fixed", "data-md-device-layout": "rd-navbar-fixed", "data-lg-layout": "rd-navbar-static", "data-lg-device-layout": "rd-navbar-fixed", "data-xl-layout": "rd-navbar-static", "data-xl-device-layout": "rd-navbar-static", "data-xxl-layout": "rd-navbar-static", "data-xxl-device-layout": "rd-navbar-static", "data-lg-stick-up-offset": "56px", "data-xl-stick-up-offset": "56px", "data-xxl-stick-up-offset": "56px", "data-lg-stick-up": "true", "data-xl-stick-up": "true", "data-xxl-stick-up": "true" },
                    React.createElement("div", { className: "rd-navbar-inner-outer" },
                        React.createElement("div", { className: "rd-navbar-inner" },
                            React.createElement("div", { className: "rd-navbar-panel" },
                                React.createElement("button", { className: "rd-navbar-toggle", "data-rd-navbar-toggle": ".rd-navbar-nav-wrap" },
                                    React.createElement("span", null)),
                                React.createElement("div", { className: "rd-navbar-brand" },
                                    React.createElement("a", { className: "brand", href: "/" },
                                        React.createElement("img", { className: "brand-logo-dark", src: common_1.baseApiUrl + (logo === null || logo === void 0 ? void 0 : logo.value), alt: "", width: "198", height: "66" })))),
                            React.createElement("div", { className: "rd-navbar-right rd-navbar-nav-wrap" },
                                React.createElement("div", { className: "rd-navbar-aside" },
                                    React.createElement("ul", { className: "rd-navbar-contacts-2" },
                                        React.createElement("li", null,
                                            React.createElement("div", { className: "unit unit-spacing-xs" },
                                                React.createElement("div", { className: "unit-left" },
                                                    React.createElement("span", { className: "icon mdi mdi-phone" })),
                                                React.createElement("div", { className: "unit-body" },
                                                    React.createElement("a", { className: "phone", href: "tel:".concat(phone === null || phone === void 0 ? void 0 : phone.value) }, phone === null || phone === void 0 ? void 0 : phone.value)))),
                                        React.createElement("li", null,
                                            React.createElement("div", { className: "unit unit-spacing-xs" },
                                                React.createElement("div", { className: "unit-left" },
                                                    React.createElement("span", { className: "icon mdi mdi-map-marker" })),
                                                React.createElement("div", { className: "unit-body" },
                                                    React.createElement("a", { className: "address", href: "#" }, address === null || address === void 0 ? void 0 : address.value))))),
                                    React.createElement("ul", { className: "list-share-2" }, mappedSocial)),
                                React.createElement("div", { className: "rd-navbar-main" },
                                    React.createElement("ul", { className: "rd-navbar-nav" },
                                        React.createElement("li", { className: "rd-nav-item active" },
                                            React.createElement("a", { className: "rd-nav-link", href: "/" }, "Home")),
                                        React.createElement("li", { className: "rd-nav-item" },
                                            React.createElement("a", { className: "rd-nav-link", href: "/About" }, "About us")),
                                        mappedMenuElements))),
                            React.createElement("div", { className: "rd-navbar-project-hamburger rd-navbar-project-hamburger-open rd-navbar-fixed-element-1", "data-multitoggle": ".rd-navbar-inner", "data-multitoggle-blur": ".rd-navbar-wrap", "data-multitoggle-isolate": "data-multitoggle-isolate" },
                                React.createElement("div", { className: "project-hamburger" },
                                    React.createElement("span", { className: "project-hamburger-arrow" }),
                                    React.createElement("span", { className: "project-hamburger-arrow" }),
                                    React.createElement("span", { className: "project-hamburger-arrow" }))),
                            React.createElement("div", { className: "rd-navbar-project" },
                                React.createElement("div", { className: "rd-navbar-project-header" },
                                    React.createElement("h5", { className: "rd-navbar-project-title" }, "Gallery"),
                                    React.createElement("div", { className: "rd-navbar-project-hamburger rd-navbar-project-hamburger-close", "data-multitoggle": ".rd-navbar-inner", "data-multitoggle-blur": ".rd-navbar-wrap", "data-multitoggle-isolate": "data-multitoggle-isolate" },
                                        React.createElement("div", { className: "project-close" },
                                            React.createElement("span", null),
                                            React.createElement("span", null)))),
                                React.createElement("div", { className: "rd-navbar-project-content rd-navbar-content" },
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "row gutters-20", "data-lightgallery": "group" },
                                            React.createElement("div", { className: "col-6" },
                                                React.createElement("article", { className: "thumbnail thumbnail-creative" },
                                                    React.createElement("a", { href: "images/project-1-1200x800-original.jpg", "data-lightgallery": "item" },
                                                        React.createElement("div", { className: "thumbnail-creative-figure" },
                                                            React.createElement("img", { src: "images/project-1-195x164.jpg", alt: "", width: "195", height: "164" })),
                                                        React.createElement("div", { className: "thumbnail-creative-caption" },
                                                            React.createElement("span", { className: "icon thumbnail-creative-icon linearicons-magnifier" }))))),
                                            React.createElement("div", { className: "col-6" },
                                                React.createElement("article", { className: "thumbnail thumbnail-creative" },
                                                    React.createElement("a", { href: "images/project-2-1200x800-original.jpg", "data-lightgallery": "item" },
                                                        React.createElement("div", { className: "thumbnail-creative-figure" },
                                                            React.createElement("img", { src: "images/project-2-195x164.jpg", alt: "", width: "195", height: "164" })),
                                                        React.createElement("div", { className: "thumbnail-creative-caption" },
                                                            React.createElement("span", { className: "icon thumbnail-creative-icon linearicons-magnifier" }))))),
                                            React.createElement("div", { className: "col-6" },
                                                React.createElement("article", { className: "thumbnail thumbnail-creative" },
                                                    React.createElement("a", { href: "images/project-3-1200x800-original.jpg", "data-lightgallery": "item" },
                                                        React.createElement("div", { className: "thumbnail-creative-figure" },
                                                            React.createElement("img", { src: "images/project-3-195x164.jpg", alt: "", width: "195", height: "164" })),
                                                        React.createElement("div", { className: "thumbnail-creative-caption" },
                                                            React.createElement("span", { className: "icon thumbnail-creative-icon linearicons-magnifier" }))))),
                                            React.createElement("div", { className: "col-6" },
                                                React.createElement("article", { className: "thumbnail thumbnail-creative" },
                                                    React.createElement("a", { href: "images/project-4-1200x800-original.jpg", "data-lightgallery": "item" },
                                                        React.createElement("div", { className: "thumbnail-creative-figure" },
                                                            React.createElement("img", { src: "images/project-4-195x164.jpg", alt: "", width: "195", height: "164" })),
                                                        React.createElement("div", { className: "thumbnail-creative-caption" },
                                                            React.createElement("span", { className: "icon thumbnail-creative-icon linearicons-magnifier" }))))),
                                            React.createElement("div", { className: "col-6" },
                                                React.createElement("article", { className: "thumbnail thumbnail-creative" },
                                                    React.createElement("a", { href: "images/project-5-1200x800-original.jpg", "data-lightgallery": "item" },
                                                        React.createElement("div", { className: "thumbnail-creative-figure" },
                                                            React.createElement("img", { src: "images/project-5-195x164.jpg", alt: "", width: "195", height: "164" })),
                                                        React.createElement("div", { className: "thumbnail-creative-caption" },
                                                            React.createElement("span", { className: "icon thumbnail-creative-icon linearicons-magnifier" }))))),
                                            React.createElement("div", { className: "col-6" },
                                                React.createElement("article", { className: "thumbnail thumbnail-creative" },
                                                    React.createElement("a", { href: "images/project-6-1200x800-original.jpg", "data-lightgallery": "item" },
                                                        React.createElement("div", { className: "thumbnail-creative-figure" },
                                                            React.createElement("img", { src: "images/project-6-195x164.jpg", alt: "", width: "195", height: "164" })),
                                                        React.createElement("div", { className: "thumbnail-creative-caption" },
                                                            React.createElement("span", { className: "icon thumbnail-creative-icon linearicons-magnifier" })))))))))))))));
};
var Footer = function (props) {
    return React.createElement(React.Fragment, null,
        React.createElement("footer", { className: ["section footer-modern context-dark footer-modern-2", props.className].join(" ") },
            React.createElement("div", { className: "footer-modern-line" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row row-50" },
                        React.createElement("div", { className: "col-md-6 col-lg-4" },
                            React.createElement("h5", { className: "footer-modern-title oh-desktop" },
                                React.createElement("span", { className: "d-inline-block wow slideInLeft" }, "What We Offer")),
                            React.createElement("ul", { className: "footer-modern-list d-inline-block d-sm-block wow fadeInUp" },
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Pizzas")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Burgers")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Salads")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Drinks")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Seafood")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Drinks")))),
                        React.createElement("div", { className: "col-md-6 col-lg-4 col-xl-3" },
                            React.createElement("h5", { className: "footer-modern-title oh-desktop" },
                                React.createElement("span", { className: "d-inline-block wow slideInLeft" }, "Information")),
                            React.createElement("ul", { className: "footer-modern-list d-inline-block d-sm-block wow fadeInUp" },
                                React.createElement("li", null,
                                    React.createElement("a", { href: "about-us.html" }, "About us")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Latest News")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Our Menu")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "FAQ")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Shop")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "contacts.html" }, "Contact Us"))))))),
            React.createElement("div", { className: "footer-modern-line-2" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row row-30 align-items-center" },
                        React.createElement("div", { className: "col-sm-6 col-md-7 col-lg-4 col-xl-4" },
                            React.createElement("div", { className: "row row-30 align-items-center text-lg-center" },
                                React.createElement("div", { className: "col-md-7 col-xl-6" },
                                    React.createElement("a", { className: "brand", href: "index.html" },
                                        React.createElement("img", { src: "images/logo-inverse-198x66.png", alt: "", width: "198", height: "66" }))),
                                React.createElement("div", { className: "col-md-5 col-xl-6" },
                                    React.createElement("div", { className: "iso-1" },
                                        React.createElement("span", null,
                                            React.createElement("img", { src: "images/like-icon-58x25.png", alt: "", width: "58", height: "25" })),
                                        React.createElement("span", { className: "iso-1-big" }, "9.4k"))))),
                        React.createElement("div", { className: "col-sm-6 col-md-12 col-lg-8 col-xl-8 oh-desktop" },
                            React.createElement("div", { className: "group-xmd group-sm-justify" },
                                React.createElement("div", { className: "footer-modern-contacts wow slideInUp" },
                                    React.createElement("div", { className: "unit unit-spacing-sm align-items-center" },
                                        React.createElement("div", { className: "unit-left" },
                                            React.createElement("span", { className: "icon icon-24 mdi mdi-phone" })),
                                        React.createElement("div", { className: "unit-body" },
                                            React.createElement("a", { className: "phone", href: "tel:#" }, "+1 718-999-3939")))),
                                React.createElement("div", { className: "footer-modern-contacts wow slideInDown" },
                                    React.createElement("div", { className: "unit unit-spacing-sm align-items-center" },
                                        React.createElement("div", { className: "unit-left" },
                                            React.createElement("span", { className: "icon mdi mdi-email" })),
                                        React.createElement("div", { className: "unit-body" },
                                            React.createElement("a", { className: "mail", href: "mailto:#" }, "info@demolink.org")))),
                                React.createElement("div", { className: "wow slideInRight" },
                                    React.createElement("ul", { className: "list-inline footer-social-list footer-social-list-2 footer-social-list-3" },
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-facebook", href: "#" })),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-twitter", href: "#" })),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-instagram", href: "#" })),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-google-plus", href: "#" }))))))))),
            React.createElement("div", { className: "footer-modern-line-3" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row row-10 justify-content-between" },
                        React.createElement("div", { className: "col-md-6" },
                            React.createElement("span", null, "514 S. Magnolia St. Orlando, FL 32806")),
                        React.createElement("div", { className: "col-md-auto" },
                            React.createElement("p", { className: "rights" },
                                React.createElement("span", null, "\u00A9\u00A0"),
                                React.createElement("span", { className: "copyright-year" }),
                                React.createElement("span", null),
                                React.createElement("span", null, ".\u00A0"),
                                React.createElement("span", null, "All Rights Reserved."),
                                React.createElement("span", null,
                                    " Design\u00A0by\u00A0",
                                    React.createElement("a", { href: "https://www.templatemonster.com" }, "TemplateMonster")))))))));
};
//# sourceMappingURL=commonElements.js.map