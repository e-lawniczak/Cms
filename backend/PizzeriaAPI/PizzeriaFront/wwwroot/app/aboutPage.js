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
exports.AboutPage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var commonElements_1 = require("./commonElements");
var common_1 = require("./common");
var axios_1 = __importDefault(require("axios"));
var AboutPage = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    React.useEffect(function () {
    }, []);
    return React.createElement(commonElements_1.PageWrapper, null,
        React.createElement(BannerSection, null),
        React.createElement(InformationSliderSection, null),
        React.createElement(BoxesSection, null));
};
exports.AboutPage = AboutPage;
var AboutPageContent = function () {
    return React.createElement(React.Fragment, null,
        React.createElement("section", { className: "section section-lg section-bottom-md-70 bg-default" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "oh" },
                    React.createElement("span", { className: "d-inline-block wow slideInUp", "data-wow-delay": "0s" }, "our team")),
                React.createElement("div", { className: "row row-lg row-40 justify-content-center" },
                    React.createElement("div", { className: "col-sm-6 col-lg-3 wow fadeInLeft", "data-wow-delay": ".2s", "data-wow-duration": "1s" },
                        React.createElement("article", { className: "team-modern" },
                            React.createElement("a", { className: "team-modern-figure", href: "#" },
                                React.createElement("img", { src: "images/team-01-270x236.jpg", alt: "", width: "270", height: "236" })),
                            React.createElement("div", { className: "team-modern-caption" },
                                React.createElement("h6", { className: "team-modern-name" },
                                    React.createElement("a", { href: "#" }, "Richard Peterson")),
                                React.createElement("div", { className: "team-modern-status" }, "Head Chef"),
                                React.createElement("ul", { className: "list-inline team-modern-social-list" },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-facebook", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-twitter", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-instagram", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-google-plus", href: "#" })))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-3 wow fadeInLeft", "data-wow-delay": "0s", "data-wow-duration": "1s" },
                        React.createElement("article", { className: "team-modern" },
                            React.createElement("a", { className: "team-modern-figure", href: "#" },
                                React.createElement("img", { src: "images/team-02-270x236.jpg", alt: "", width: "270", height: "236" })),
                            React.createElement("div", { className: "team-modern-caption" },
                                React.createElement("h6", { className: "team-modern-name" },
                                    React.createElement("a", { href: "#" }, "Amelia Lee")),
                                React.createElement("div", { className: "team-modern-status" }, "Manager"),
                                React.createElement("ul", { className: "list-inline team-modern-social-list" },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-facebook", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-twitter", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-instagram", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-google-plus", href: "#" })))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-3 wow fadeInRight", "data-wow-delay": ".1s", "data-wow-duration": "1s" },
                        React.createElement("article", { className: "team-modern" },
                            React.createElement("a", { className: "team-modern-figure", href: "#" },
                                React.createElement("img", { src: "images/team-03-270x236.jpg", alt: "", width: "270", height: "236" })),
                            React.createElement("div", { className: "team-modern-caption" },
                                React.createElement("h6", { className: "team-modern-name" },
                                    React.createElement("a", { href: "#" }, "Sam Peterson")),
                                React.createElement("div", { className: "team-modern-status" }, "Head Baker"),
                                React.createElement("ul", { className: "list-inline team-modern-social-list" },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-facebook", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-twitter", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-instagram", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-google-plus", href: "#" })))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-3 wow fadeInRight", "data-wow-delay": ".3s", "data-wow-duration": "1s" },
                        React.createElement("article", { className: "team-modern" },
                            React.createElement("a", { className: "team-modern-figure", href: "#" },
                                React.createElement("img", { src: "images/team-04-270x236.jpg", alt: "", width: "270", height: "236" })),
                            React.createElement("div", { className: "team-modern-caption" },
                                React.createElement("h6", { className: "team-modern-name" },
                                    React.createElement("a", { href: "#" }, "Jane Smith")),
                                React.createElement("div", { className: "team-modern-status" }, "Pizza Chef"),
                                React.createElement("ul", { className: "list-inline team-modern-social-list" },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-facebook", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-twitter", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-instagram", href: "#" })),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "icon mdi mdi-google-plus", href: "#" }))))))))),
        React.createElement("section", { className: "section section-lg bg-gray-100 text-left section-relative" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row row-60 justify-content-center justify-content-xxl-between" },
                    React.createElement("div", { className: "col-lg-6 col-xxl-5 position-static" },
                        React.createElement("h3", null, "Our history"),
                        React.createElement("div", { className: "tabs-custom", id: "tabs-5" },
                            React.createElement("div", { className: "tab-content tab-content-1" },
                                React.createElement("div", { className: "tab-pane fade", id: "tabs-5-1" },
                                    React.createElement("h5", { className: "font-weight-normal text-transform-none text-spacing-75" }, "PizzaHouse Establishment and First Happy Clients"),
                                    React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh")),
                                React.createElement("div", { className: "tab-pane fade", id: "tabs-5-2" },
                                    React.createElement("h5", { className: "font-weight-normal text-transform-none text-spacing-75" }, "Organizing a Free Pizza Delivery Service in Los Angeles"),
                                    React.createElement("p", null, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.")),
                                React.createElement("div", { className: "tab-pane fade", id: "tabs-5-3" },
                                    React.createElement("h5", { className: "font-weight-normal text-transform-none text-spacing-75" }, "Offering an Extended Range of Pizzas, Burgers, and Salads"),
                                    React.createElement("p", null, "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.")),
                                React.createElement("div", { className: "tab-pane fade show active", id: "tabs-5-4" },
                                    React.createElement("h5", { className: "font-weight-normal text-transform-none text-spacing-75" }, "Partnering with Organic Farms Located in California"),
                                    React.createElement("p", null, "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."))),
                            React.createElement("div", { className: "list-history-wrap" },
                                React.createElement("ul", { className: "nav list-history" },
                                    React.createElement("li", { className: "list-history-item", role: "presentation" },
                                        React.createElement("a", { href: "#tabs-5-1", "data-toggle": "tab" },
                                            React.createElement("div", { className: "list-history-circle" }),
                                            "2005")),
                                    React.createElement("li", { className: "list-history-item", role: "presentation" },
                                        React.createElement("a", { href: "#tabs-5-2", "data-toggle": "tab" },
                                            React.createElement("div", { className: "list-history-circle" }),
                                            "2012")),
                                    React.createElement("li", { className: "list-history-item", role: "presentation" },
                                        React.createElement("a", { href: "#tabs-5-3", "data-toggle": "tab" },
                                            React.createElement("div", { className: "list-history-circle" }),
                                            "2015")),
                                    React.createElement("li", { className: "list-history-item", role: "presentation" },
                                        React.createElement("a", { className: "active", href: "#tabs-5-4", "data-toggle": "tab" },
                                            React.createElement("div", { className: "list-history-circle" }),
                                            "2019")))))),
                    React.createElement("div", { className: "col-md-9 col-lg-6 position-static index-1" },
                        React.createElement("div", { className: "bg-image-right-1 bg-image-right-lg" },
                            React.createElement("img", { src: "images/our_history-1110x710.jpg", alt: "", width: "1110", height: "710" }),
                            React.createElement("div", { className: "link-play-modern" },
                                React.createElement("a", { className: "icon mdi mdi-play", "data-lightgallery": "item", href: "https://www.youtube.com/watch?v=1UWpbtUupQQ" }),
                                React.createElement("div", { className: "link-play-modern-title" },
                                    "How we",
                                    React.createElement("span", null, "Work")),
                                React.createElement("div", { className: "link-play-modern-decor" })),
                            React.createElement("div", { className: "box-transform", style: { backgroundImage: "url(images/our_history-1110x710.jpg);" } })))))),
        React.createElement("section", { className: "section section-lg bg-default text-md-left" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row row-60 justify-content-center flex-lg-row-reverse" },
                    React.createElement("div", { className: "col-md-8 col-lg-6 col-xl-5" },
                        React.createElement("div", { className: "offset-left-xl-70" },
                            React.createElement("h3", { className: "heading-3" }, "What People Say"),
                            React.createElement("div", { className: "slick-quote" },
                                React.createElement("div", { className: "slick-slider carousel-parent", "data-autoplay": "true", "data-swipe": "true", "data-items": "1", "data-child": "#child-carousel-5", "data-for": "#child-carousel-5", "data-slide-effect": "true" },
                                    React.createElement("div", { className: "item" },
                                        React.createElement("article", { className: "quote-modern" },
                                            React.createElement("h5", { className: "quote-modern-text" },
                                                React.createElement("span", { className: "q" }, "Torus accelerares, tanquam ferox cacula. Fluctuss experimentum in burdigala! Ubi est peritus classis? Peregrinatione superbe ducunt ad magnum verpa.")),
                                            React.createElement("h5", { className: "quote-modern-author" }, "Stephen Adams,"),
                                            React.createElement("p", { className: "quote-modern-status" }, "Regular Client"))),
                                    React.createElement("div", { className: "item" },
                                        React.createElement("article", { className: "quote-modern" },
                                            React.createElement("h5", { className: "quote-modern-text" },
                                                React.createElement("span", { className: "q" }, "Gluten, fluctus, et galatae. Germanus classiss ducunt ad brodium. Pol, a bene cedrium. Tabess unda in neuter avenio! Orexiss sunt adelphiss de rusticus parma.")),
                                            React.createElement("h5", { className: "quote-modern-author" }, "Sam Peterson,"),
                                            React.createElement("p", { className: "quote-modern-status" }, "Regular Client"))),
                                    React.createElement("div", { className: "item" },
                                        React.createElement("article", { className: "quote-modern" },
                                            React.createElement("h5", { className: "quote-modern-text" },
                                                React.createElement("span", { className: "q" }, "Pol, silva! Grandis contencios ducunt ad torus. Monss congregabo in nobilis tectum! Velox, fatalis victrixs sapienter talem de emeritis, festus torus.")),
                                            React.createElement("h5", { className: "quote-modern-author" }, "Jane McMillan,"),
                                            React.createElement("p", { className: "quote-modern-status" }, "Regular Client"))),
                                    React.createElement("div", { className: "item" },
                                        React.createElement("article", { className: "quote-modern" },
                                            React.createElement("h5", { className: "quote-modern-text" },
                                                React.createElement("span", { className: "q" }, "Fluctuss sunt eras de neuter plasmator. Heuretes noster brabeuta est. Nixus, visus, et mensa. Primus, magnum tatas rare locus de altus, camerarius clabulare.")),
                                            React.createElement("h5", { className: "quote-modern-author" }, "Will Jones,"),
                                            React.createElement("p", { className: "quote-modern-status" }, "Regular Client")))),
                                React.createElement("div", { className: "slick-slider child-carousel", id: "child-carousel-5", "data-arrows": "true", "data-for": ".carousel-parent", "data-items": "4", "data-sm-items": "4", "data-md-items": "4", "data-lg-items": "4", "data-xl-items": "4", "data-slide-to-scroll": "1" },
                                    React.createElement("div", { className: "item" },
                                        React.createElement("img", { className: "img-circle", src: "images/team-5-83x83.jpg", alt: "", width: "83", height: "83" })),
                                    React.createElement("div", { className: "item" },
                                        React.createElement("img", { className: "img-circle", src: "images/team-6-83x83.jpg", alt: "", width: "83", height: "83" })),
                                    React.createElement("div", { className: "item" },
                                        React.createElement("img", { className: "img-circle", src: "images/team-7-83x83.jpg", alt: "", width: "83", height: "83" })),
                                    React.createElement("div", { className: "item" },
                                        React.createElement("img", { className: "img-circle", src: "images/team-8-83x83.jpg", alt: "", width: "83", height: "83" })))))),
                    React.createElement("div", { className: "col-lg-6 col-xl-7" },
                        React.createElement("img", { src: "images/wp-say-669x447.jpg", alt: "", width: "669", height: "447" }))))));
};
var BannerSection = function () {
    var _a = (0, react_1.useState)(), title = _a[0], setTitle = _a[1], _b = (0, react_1.useState)(), logoPic = _b[0], setLogoPic = _b[1], getTitle = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/au_title")];
                case 1:
                    res = _a.sent();
                    setTitle(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getBannerPic = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, t, s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/about_us_banner")];
                case 1:
                    res = _a.sent();
                    t = res.data;
                    s = t.value.split("/");
                    s[2] = "Full";
                    t.value = s.join("/");
                    setLogoPic(t);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getTitle();
        getBannerPic();
    }, []);
    return React.createElement("section", { className: "bg-gray-7" },
        React.createElement("div", { className: "breadcrumbs-custom box-transform-wrap context-dark" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "breadcrumbs-custom-title" }, (title === null || title === void 0 ? void 0 : title.value) || "About Us"),
                React.createElement("div", { className: "breadcrumbs-custom-decor" })),
            React.createElement("div", { className: "box-transform", style: { backgroundImage: "url(".concat(common_1.baseApiUrl + (logoPic === null || logoPic === void 0 ? void 0 : logoPic.value), ")") } })),
        React.createElement("div", { className: "container" },
            React.createElement("ul", { className: "breadcrumbs-custom-path" },
                React.createElement("li", null,
                    React.createElement("a", { href: "/" }, "Home")),
                React.createElement("li", { className: "active" }, (title === null || title === void 0 ? void 0 : title.value) || "About Us"))));
};
var InformationSliderSection = function () {
    var _a = (0, react_1.useState)(), slider = _a[0], setSlider = _a[1], _b = (0, react_1.useState)(), mail = _b[0], setMail = _b[1], _c = (0, react_1.useState)(), tabs = _c[0], setTabs = _c[1], _d = (0, react_1.useState)(0), currentTab = _d[0], setCurrentTab = _d[1], getMail = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/footer_email")];
                case 1:
                    res = _a.sent();
                    setMail(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getSlider = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/tabSlider_1")];
                case 1:
                    res = _a.sent();
                    if (!(res.status == 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetTabSlider/".concat(res.data.value))];
                case 2:
                    res = _a.sent();
                    setSlider(res.data);
                    if (res.status == 200) {
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, getTabs = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, t;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleInformationTabList")];
                case 1:
                    res = _a.sent();
                    if (slider.informationTabIdList.length > 0) {
                        t = res.data.filter(function (s) { return slider.informationTabIdList.indexOf(s.informationTabId) > -1; });
                        setTabs(t);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getSlider();
        getMail();
    }, []);
    React.useEffect(function () {
        getTabs();
    }, [slider]);
    return React.createElement("section", { className: "section section-lg bg-default" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "tabs-custom row row-50 justify-content-center flex-lg-row-reverse text-center text-md-left", id: "tabs-4" },
                React.createElement("div", { className: "col-lg-4 col-xl-3" },
                    React.createElement("h5", { className: "text-spacing-200 text-capitalize" }, "10+ years of experience"),
                    React.createElement("ul", { className: "nav list-category list-category-down-md-inline-block" }, (tabs === null || tabs === void 0 ? void 0 : tabs.length) > 0 &&
                        tabs.map(function (t, idx) {
                            return React.createElement("li", { onClick: function () { return setCurrentTab(idx); }, className: "list-category-item wow fadeInRight", role: "presentation", "data-wow-delay": "0s" },
                                React.createElement("span", { className: ["tasb-opt", idx == currentTab ? "active" : ""].join(" ") }, t.buttonText));
                        })),
                    React.createElement("a", { className: "button button-xl button-primary button-winona", href: "mailto:".concat(mail === null || mail === void 0 ? void 0 : mail.value) }, "Contact us")),
                React.createElement("div", { className: "col-lg-8 col-xl-9" },
                    React.createElement("div", { className: "tab-content tab-content-1" }, (tabs === null || tabs === void 0 ? void 0 : tabs.length) > 0 &&
                        tabs.map(function (t, idx) {
                            return React.createElement("div", { className: "tab-pane fade show ".concat(idx == currentTab ? "active" : ""), id: "tabs-4-".concat(idx + 1) },
                                React.createElement("h4", null, t.title),
                                React.createElement("div", { dangerouslySetInnerHTML: { __html: t.text } }),
                                React.createElement("img", { src: "".concat((0, common_1.getPictureUrlFromList)(slider === null || slider === void 0 ? void 0 : slider.pictureIdList)[0]), alt: "", width: "835", height: "418" }));
                        }))))));
};
var BoxesSection = function () {
    var _a, _b, _c, _d, _e, _f;
    var _g = (0, react_1.useState)(), boxesData = _g[0], setBoxesData = _g[1], getBoxes = function () { return __awaiter(void 0, void 0, void 0, function () {
        var boxes, i, res, resText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boxes = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 3)) return [3 /*break*/, 5];
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/au_box".concat(i + 1))];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/au_box".concat(i + 1, "_text"))];
                case 3:
                    resText = _a.sent();
                    if (res.status == 200 && resText.status == 200) {
                        boxes.push({ title: res.data.value, text: resText.data.value });
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    setBoxesData(boxes);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getBoxes();
    }, []);
    return React.createElement("section", { className: "section section-lg bg-gray-100" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row row-md row-50" },
                React.createElement("div", { className: "col-sm-6 col-xl-4 wow fadeInUp", "data-wow-delay": "0s" },
                    React.createElement("article", { className: "box-icon-classic" },
                        React.createElement("div", { className: "unit unit-spacing-lg flex-column text-center flex-md-row text-md-left" },
                            React.createElement("div", { className: "unit-left" },
                                React.createElement("div", { className: "box-icon-classic-icon linearicons-helicopter" })),
                            React.createElement("div", { className: "unit-body" }, (boxesData === null || boxesData === void 0 ? void 0 : boxesData.length) > 0 && React.createElement(React.Fragment, null,
                                React.createElement("h5", { className: "box-icon-classic-title" }, (_a = boxesData[0]) === null || _a === void 0 ? void 0 : _a.title),
                                React.createElement("p", { className: "box-icon-classic-text" }, (_b = boxesData[0]) === null || _b === void 0 ? void 0 : _b.text)))))),
                React.createElement("div", { className: "col-sm-6 col-xl-4 wow fadeInUp", "data-wow-delay": ".1s" },
                    React.createElement("article", { className: "box-icon-classic" },
                        React.createElement("div", { className: "unit unit-spacing-lg flex-column text-center flex-md-row text-md-left" },
                            React.createElement("div", { className: "unit-left" },
                                React.createElement("div", { className: "box-icon-classic-icon linearicons-pizza" })),
                            React.createElement("div", { className: "unit-body" }, (boxesData === null || boxesData === void 0 ? void 0 : boxesData.length) > 1 && React.createElement(React.Fragment, null,
                                React.createElement("h5", { className: "box-icon-classic-title" }, (_c = boxesData[1]) === null || _c === void 0 ? void 0 : _c.title),
                                React.createElement("p", { className: "box-icon-classic-text" }, (_d = boxesData[1]) === null || _d === void 0 ? void 0 : _d.text)))))),
                React.createElement("div", { className: "col-sm-6 col-xl-4 wow fadeInUp", "data-wow-delay": ".2s" },
                    React.createElement("article", { className: "box-icon-classic" },
                        React.createElement("div", { className: "unit unit-spacing-lg flex-column text-center flex-md-row text-md-left" },
                            React.createElement("div", { className: "unit-left" },
                                React.createElement("div", { className: "box-icon-classic-icon linearicons-leaf" })),
                            React.createElement("div", { className: "unit-body" }, (boxesData === null || boxesData === void 0 ? void 0 : boxesData.length) > 2 && React.createElement(React.Fragment, null,
                                React.createElement("h5", { className: "box-icon-classic-title" }, (_e = boxesData[2]) === null || _e === void 0 ? void 0 : _e.title),
                                React.createElement("p", { className: "box-icon-classic-text" }, (_f = boxesData[2]) === null || _f === void 0 ? void 0 : _f.text)))))))));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.AboutPage, null), root);
//# sourceMappingURL=aboutPage.js.map