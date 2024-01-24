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
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1], _b = (0, react_1.useState)(), mainSlider = _b[0], setMainSlider = _b[1], _c = (0, react_1.useState)(), slider = _c[0], setSlider = _c[1], _d = (0, react_1.useState)(0), currentSlide = _d[0], setCurrentSlide = _d[1], _e = (0, react_1.useState)(), sliderBanners = _e[0], setSliderBanners = _e[1], getMainSLider = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/home_page_slider")];
                case 1:
                    res = _a.sent();
                    setMainSlider(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getSlider = function () { return __awaiter(void 0, void 0, void 0, function () {
        var resSlider, ss;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mainSlider)
                        return [2 /*return*/];
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleSliderList")];
                case 1:
                    resSlider = _a.sent();
                    if (resSlider.status == 200) {
                        ss = resSlider.data.filter(function (s) { return s.name == mainSlider.value; })[0];
                        setSlider(ss);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, getBannerSliders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var queryString, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!slider)
                        return [2 /*return*/];
                    queryString = slider === null || slider === void 0 ? void 0 : slider.bannerIdList.map(function (i) { return "".concat(i); });
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetBannersByIdList?bannerIdList=".concat(queryString))];
                case 1:
                    res = _a.sent();
                    setSliderBanners(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, mappedSliderBanners = sliderBanners === null || sliderBanners === void 0 ? void 0 : sliderBanners.map(function (b, idx) {
        return React.createElement("div", { key: idx, className: "swiper-slide context-dark", style: { backgroundImage: "url(".concat(common_1.baseApiUrl + "/GetPicture/Full/" + b.pictureIdList[0], ")") }, "data-slide-bg": common_1.baseApiUrl + "/GetPicture/Full/" + b.pictureIdList[0] },
            React.createElement("div", { className: "swiper-slide-caption section-md" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-9 col-md-8 col-lg-7 col-xl-7 offset-lg-1 offset-xxl-0" },
                            React.createElement("div", { dangerouslySetInnerHTML: { __html: b.text } }),
                            React.createElement("a", { className: "button button-lg button-primary button-winona button-shadow-2", href: b.link, "data-caption-animate": "fadeInUp", "data-caption-delay": "300" }, b.subText))))));
    }), slideUp = function () {
        setTimeout(function () {
            console.log("sss");
            if ((mappedSliderBanners === null || mappedSliderBanners === void 0 ? void 0 : mappedSliderBanners.length) > 0)
                setCurrentSlide((currentSlide + 1) % mappedSliderBanners.length);
        }, 1500);
    }, x = "";
    React.useEffect(function () {
        slideUp();
        getMainSLider();
    }, []);
    React.useEffect(function () {
        getSlider();
    }, [mainSlider]);
    React.useEffect(function () {
        getBannerSliders();
    }, [slider]);
    return React.createElement(commonElements_1.PageWrapper, null,
        React.createElement("section", { className: "section swiper-container swiper-slider swiper-slider-2 swiper-slider-3", "data-loop": "true", "data-autoplay": "5000", "data-simulate-touch": "false", "data-slide-effect": "fade" },
            React.createElement("div", { className: "swiper-wrapper text-sm-left" }, (mappedSliderBanners === null || mappedSliderBanners === void 0 ? void 0 : mappedSliderBanners.length) > 0 && mappedSliderBanners[currentSlide]),
            React.createElement("div", { className: "swiper-pagination", "data-bullet-custom": "true" }),
            React.createElement("div", { className: "swiper-button-prev", onClick: function () { return setCurrentSlide((currentSlide - 1) % mappedSliderBanners.length); } },
                React.createElement("div", { className: "preview" },
                    React.createElement("div", { className: "preview__img" })),
                React.createElement("div", { className: "swiper-button-arrow" })),
            React.createElement("div", { className: "swiper-button-next", onClick: function () { return setCurrentSlide((currentSlide + 1) % mappedSliderBanners.length); } },
                React.createElement("div", { className: "swiper-button-arrow" }),
                React.createElement("div", { className: "preview" },
                    React.createElement("div", { className: "preview__img" })))),
        React.createElement("section", { className: "section section-md bg-default" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "oh-desktop" },
                    React.createElement("span", { className: "d-inline-block wow slideInDown" }, "Our Menu")),
                React.createElement("div", { className: "row row-md row-30" },
                    React.createElement("div", { className: "col-sm-6 col-lg-4" },
                        React.createElement("div", { className: "oh-desktop" },
                            React.createElement("article", { className: "services-terri wow slideInUp" },
                                React.createElement("div", { className: "services-terri-figure" },
                                    React.createElement("img", { src: "images/menu-1-370x278.jpg", alt: "", width: "370", height: "278" })),
                                React.createElement("div", { className: "services-terri-caption" },
                                    React.createElement("span", { className: "services-terri-icon linearicons-leaf" }),
                                    React.createElement("h5", { className: "services-terri-title" },
                                        React.createElement("a", { href: "#" }, "Salads")))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4" },
                        React.createElement("div", { className: "oh-desktop" },
                            React.createElement("article", { className: "services-terri wow slideInDown" },
                                React.createElement("div", { className: "services-terri-figure" },
                                    React.createElement("img", { src: "images/menu-2-370x278.jpg", alt: "", width: "370", height: "278" })),
                                React.createElement("div", { className: "services-terri-caption" },
                                    React.createElement("span", { className: "services-terri-icon linearicons-pizza" }),
                                    React.createElement("h5", { className: "services-terri-title" },
                                        React.createElement("a", { href: "#" }, "Pizzas")))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4" },
                        React.createElement("div", { className: "oh-desktop" },
                            React.createElement("article", { className: "services-terri wow slideInUp" },
                                React.createElement("div", { className: "services-terri-figure" },
                                    React.createElement("img", { src: "images/menu-3-370x278.jpg", alt: "", width: "370", height: "278" })),
                                React.createElement("div", { className: "services-terri-caption" },
                                    React.createElement("span", { className: "services-terri-icon linearicons-hamburger" }),
                                    React.createElement("h5", { className: "services-terri-title" },
                                        React.createElement("a", { href: "#" }, "Burgers")))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4" },
                        React.createElement("div", { className: "oh-desktop" },
                            React.createElement("article", { className: "services-terri wow slideInDown" },
                                React.createElement("div", { className: "services-terri-figure" },
                                    React.createElement("img", { src: "images/menu-4-370x278.jpg", alt: "", width: "370", height: "278" })),
                                React.createElement("div", { className: "services-terri-caption" },
                                    React.createElement("span", { className: "services-terri-icon linearicons-ice-cream" }),
                                    React.createElement("h5", { className: "services-terri-title" },
                                        React.createElement("a", { href: "#" }, "Desserts")))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4" },
                        React.createElement("div", { className: "oh-desktop" },
                            React.createElement("article", { className: "services-terri wow slideInUp" },
                                React.createElement("div", { className: "services-terri-figure" },
                                    React.createElement("img", { src: "images/menu-5-370x278.jpg", alt: "", width: "370", height: "278" })),
                                React.createElement("div", { className: "services-terri-caption" },
                                    React.createElement("span", { className: "services-terri-icon linearicons-coffee-cup" }),
                                    React.createElement("h5", { className: "services-terri-title" },
                                        React.createElement("a", { href: "#" }, "Drinks")))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4" },
                        React.createElement("div", { className: "oh-desktop" },
                            React.createElement("article", { className: "services-terri wow slideInDown" },
                                React.createElement("div", { className: "services-terri-figure" },
                                    React.createElement("img", { src: "images/menu-6-370x278.jpg", alt: "", width: "370", height: "278" })),
                                React.createElement("div", { className: "services-terri-caption" },
                                    React.createElement("span", { className: "services-terri-icon linearicons-steak" }),
                                    React.createElement("h5", { className: "services-terri-title" },
                                        React.createElement("a", { href: "#" }, "Seafood"))))))))),
        React.createElement("section", { className: "primary-overlay section parallax-container", "data-parallax-img": "images/bg-3.jpg" },
            React.createElement("div", { className: "parallax-content section-xl context-dark text-md-left" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row justify-content-end" },
                        React.createElement("div", { className: "col-sm-8 col-md-7 col-lg-5" },
                            React.createElement("div", { className: "cta-modern" },
                                React.createElement("h3", { className: "cta-modern-title wow fadeInRight" }, "Best atmosphere"),
                                React.createElement("p", { className: "lead" }, "PizzaHouse is the place of the best pizza and high-quality service."),
                                React.createElement("p", { className: "cta-modern-text oh-desktop", "data-wow-delay": ".1s" },
                                    React.createElement("span", { className: "cta-modern-decor wow slideInLeft" }),
                                    React.createElement("span", { className: "d-inline-block wow slideInDown" }, "Ben Smith, Founder")),
                                React.createElement("a", { className: "button button-md button-secondary-2 button-winona wow fadeInUp", href: "#", "data-wow-delay": ".2s" }, "View Our Services"))))))),
        React.createElement("section", { className: "section section-lg bg-default" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "oh-desktop" },
                    React.createElement("span", { className: "d-inline-block wow slideInUp" }, "Selected Pizzas")),
                React.createElement("div", { className: "row row-lg row-30" },
                    React.createElement("div", { className: "col-sm-6 col-lg-4 col-xl-3" },
                        React.createElement("article", { className: "product wow fadeInLeft", "data-wow-delay": ".15s" },
                            React.createElement("div", { className: "product-figure" },
                                React.createElement("img", { src: "images/product-1-161x162.png", alt: "", width: "161", height: "162" })),
                            React.createElement("div", { className: "product-rating" },
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star text-gray-13" })),
                            React.createElement("h6", { className: "product-title" }, "Margherita Pizza"),
                            React.createElement("div", { className: "product-price-wrap" },
                                React.createElement("div", { className: "product-price" }, "$24.00")),
                            React.createElement("div", { className: "product-button" },
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-primary button-winona", href: "#" }, "Add to cart")),
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-secondary button-winona", href: "#" }, "View Product"))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4 col-xl-3" },
                        React.createElement("article", { className: "product wow fadeInLeft", "data-wow-delay": ".1s" },
                            React.createElement("div", { className: "product-figure" },
                                React.createElement("img", { src: "images/product-2-161x162.png", alt: "", width: "161", height: "162" })),
                            React.createElement("div", { className: "product-rating" },
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" })),
                            React.createElement("h6", { className: "product-title" }, "Mushroom Pizza"),
                            React.createElement("div", { className: "product-price-wrap" },
                                React.createElement("div", { className: "product-price" }, "$24.00")),
                            React.createElement("div", { className: "product-button" },
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-primary button-winona", href: "#" }, "Add to cart")),
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-secondary button-winona", href: "#" }, "View Product"))),
                            React.createElement("span", { className: "product-badge product-badge-new" }, "New"))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4 col-xl-3" },
                        React.createElement("article", { className: "product wow fadeInLeft", "data-wow-delay": ".05s" },
                            React.createElement("div", { className: "product-figure" },
                                React.createElement("img", { src: "images/product-3-161x162.png", alt: "", width: "161", height: "162" })),
                            React.createElement("div", { className: "product-rating" },
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star text-gray-13" })),
                            React.createElement("h6", { className: "product-title" }, "Hawaiian Pizza"),
                            React.createElement("div", { className: "product-price-wrap" },
                                React.createElement("div", { className: "product-price" }, "$24.00")),
                            React.createElement("div", { className: "product-button" },
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-primary button-winona", href: "#" }, "Add to cart")),
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-secondary button-winona", href: "#" }, "View Product"))))),
                    React.createElement("div", { className: "col-sm-6 col-lg-4 col-xl-3" },
                        React.createElement("article", { className: "product wow fadeInLeft" },
                            React.createElement("div", { className: "product-figure" },
                                React.createElement("img", { src: "images/product-4-161x162.png", alt: "", width: "161", height: "162" })),
                            React.createElement("div", { className: "product-rating" },
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" }),
                                React.createElement("span", { className: "mdi mdi-star" })),
                            React.createElement("h6", { className: "product-title" }, "Pesto Pizza"),
                            React.createElement("div", { className: "product-price-wrap" },
                                React.createElement("div", { className: "product-price product-price-old" }, "$40.00"),
                                React.createElement("div", { className: "product-price" }, "$24.00")),
                            React.createElement("div", { className: "product-button" },
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-primary button-winona", href: "#" }, "Add to cart")),
                                React.createElement("div", { className: "button-wrap" },
                                    React.createElement("a", { className: "button button-xs button-secondary button-winona", href: "#" }, "View Product"))),
                            React.createElement("span", { className: "product-badge product-badge-sale" }, "Sale")))))),
        React.createElement("section", { className: "primary-overlay section parallax-container", "data-parallax-img": "images/bg-4.jpg" },
            React.createElement("div", { className: "parallax-content section-xxl context-dark text-md-left" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row justify-content-end" },
                        React.createElement("div", { className: "col-sm-9 col-md-7 col-lg-5" },
                            React.createElement("div", { className: "cta-modern" },
                                React.createElement("h3", { className: "cta-modern-title cta-modern-title-2 oh-desktop" },
                                    React.createElement("span", { className: "d-inline-block wow fadeInLeft" }, "-30% on all salads & drinks")),
                                React.createElement("p", { className: "cta-modern-text cta-modern-text-2 oh-desktop", "data-wow-delay": ".1s" },
                                    React.createElement("span", { className: "cta-modern-decor cta-modern-decor-2 wow slideInLeft" }),
                                    React.createElement("span", { className: "d-inline-block wow slideInUp" }, "Taste some of the best PizzaHouse salads!")),
                                React.createElement("a", { className: "button button-lg button-secondary button-winona wow fadeInRight", href: "contacts.html", "data-wow-delay": ".2s" }, "contact us"))))))),
        React.createElement("section", { className: "section section-xl bg-default" },
            React.createElement("div", { className: "container" },
                React.createElement("h3", { className: "wow fadeInLeft" }, "What People Say")),
            React.createElement("div", { className: "container container-style-1" },
                React.createElement("div", { className: "owl-carousel owl-style-12", "data-items": "1", "data-sm-items": "2", "data-lg-items": "3", "data-margin": "30", "data-xl-margin": "45", "data-autoplay": "true", "data-nav": "true", "data-center": "true", "data-smart-speed": "400" },
                    React.createElement("article", { className: "quote-tara" },
                        React.createElement("div", { className: "quote-tara-caption" },
                            React.createElement("div", { className: "quote-tara-text" },
                                React.createElement("p", { className: "q" }, "PizzaHouse is the longest lasting pizza place in the city and is well run and staffed. Prices are great and allow me to keep coming back.")),
                            React.createElement("div", { className: "quote-tara-figure" },
                                React.createElement("img", { src: "images/user-6-115x115.jpg", alt: "", width: "115", height: "115" }))),
                        React.createElement("h6", { className: "quote-tara-author" }, "Ashley Fitzgerald"),
                        React.createElement("div", { className: "quote-tara-status" }, "Client")),
                    React.createElement("article", { className: "quote-tara" },
                        React.createElement("div", { className: "quote-tara-caption" },
                            React.createElement("div", { className: "quote-tara-text" },
                                React.createElement("p", { className: "q" }, "I am a real pizza addict, and even when I\u2019m home I prefer your pizzas to all others. They taste awesome and are very affordable.")),
                            React.createElement("div", { className: "quote-tara-figure" },
                                React.createElement("img", { src: "images/user-8-115x115.jpg", alt: "", width: "115", height: "115" }))),
                        React.createElement("h6", { className: "quote-tara-author" }, "Stephanie Williams"),
                        React.createElement("div", { className: "quote-tara-status" }, "Client")),
                    React.createElement("article", { className: "quote-tara" },
                        React.createElement("div", { className: "quote-tara-caption" },
                            React.createElement("div", { className: "quote-tara-text" },
                                React.createElement("p", { className: "q" }, "PizzaHouse has amazing pizza. Not only do you get served with a great attitude, you also get delicious pizza at a great price!")),
                            React.createElement("div", { className: "quote-tara-figure" },
                                React.createElement("img", { src: "images/user-7-115x115.jpg", alt: "", width: "115", height: "115" }))),
                        React.createElement("h6", { className: "quote-tara-author" }, "Bill Johnson"),
                        React.createElement("div", { className: "quote-tara-status" }, "Client")),
                    React.createElement("article", { className: "quote-tara" },
                        React.createElement("div", { className: "quote-tara-caption" },
                            React.createElement("div", { className: "quote-tara-text" },
                                React.createElement("p", { className: "q" }, "PizzaHouse has great pizza. Not only do you get served with a great attitude and delivered delicious pizza, you get a great price.")),
                            React.createElement("div", { className: "quote-tara-figure" },
                                React.createElement("img", { src: "images/user-9-115x115.jpg", alt: "", width: "115", height: "115" }))),
                        React.createElement("h6", { className: "quote-tara-author" }, "Aaron Wilson"),
                        React.createElement("div", { className: "quote-tara-status" }, "Client"))))),
        React.createElement("section", { className: "section section-last bg-default" },
            React.createElement("div", { className: "container-fluid container-inset-0 isotope-wrap" },
                React.createElement("div", { className: "row row-10 gutters-10 isotope", "data-isotope-layout": "masonry", "data-isotope-group": "gallery", "data-lightgallery": "group" },
                    React.createElement("div", { className: "col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary thumbnail-mary-2 wow slideInLeft" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-1-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-1-310x585.jpg", alt: "", width: "310", height: "585" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "Best Ingredients")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Tasty Pizza"))))),
                    React.createElement("div", { className: "col-xs-6 col-sm-8 col-xl-4 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary thumbnail-mary-big wow slideInRight" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-2-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-2-631x587.jpg", alt: "", width: "631", height: "587" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "Comfortable interior")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Modern Design"))))),
                    React.createElement("div", { className: "col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary thumbnail-mary-2 wow slideInDown" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-3-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-3-311x289.jpg", alt: "", width: "311", height: "289" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "quality Dishware")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Top-notch utensils"))))),
                    React.createElement("div", { className: "col-xs-6 col-sm-8 col-xl-4 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary wow slideInUp" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-4-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-4-631x289.jpg", alt: "", width: "631", height: "289" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "Refreshing cocktails")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Exclusive selection"))))),
                    React.createElement("div", { className: "col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary thumbnail-mary-2 wow slideInUp" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-5-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-5-311x289.jpg", alt: "", width: "311", height: "289" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "Exotic Salads")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Summer Taste"))))),
                    React.createElement("div", { className: "col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary thumbnail-mary-2 wow slideInRight" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-6-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-6-311x289.jpg", alt: "", width: "311", height: "289" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "All Types of pizza")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Special Recipes"))))),
                    React.createElement("div", { className: "col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop" },
                        React.createElement("article", { className: "thumbnail thumbnail-mary thumbnail-mary-2 wow slideInLeft" },
                            React.createElement("a", { className: "thumbnail-mary-figure", href: "images/gallery-7-1200x800-original.jpg", "data-lightgallery": "item" },
                                React.createElement("img", { src: "images/gallery-7-311x289.jpg", alt: "", width: "311", height: "289" })),
                            React.createElement("div", { className: "thumbnail-mary-caption" },
                                React.createElement("div", null,
                                    React.createElement("h6", { className: "thumbnail-mary-title" },
                                        React.createElement("a", { href: "#" }, "Diverse menu")),
                                    React.createElement("div", { className: "thumbnail-mary-location" }, "Pick Your Favorite dish")))))))),
        React.createElement("section", { className: "section section-sm bg-default" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "owl-carousel owl-style-11 dots-style-2", "data-items": "1", "data-sm-items": "1", "data-lg-items": "2", "data-xl-items": "4", "data-margin": "30", "data-dots": "true", "data-mouse-drag": "true", "data-rtl": "true" },
                    React.createElement("article", { className: "box-icon-megan wow fadeInUp" },
                        React.createElement("div", { className: "box-icon-megan-header" },
                            React.createElement("div", { className: "box-icon-megan-icon linearicons-bag" })),
                        React.createElement("h5", { className: "box-icon-megan-title" },
                            React.createElement("a", { href: "#" }, "Free Delivery")),
                        React.createElement("p", { className: "box-icon-megan-text" }, "If you order more than 3 pizzas, we will gladly deliver them to you for free.")),
                    React.createElement("article", { className: "box-icon-megan wow fadeInUp", "data-wow-delay": ".05s" },
                        React.createElement("div", { className: "box-icon-megan-header" },
                            React.createElement("div", { className: "box-icon-megan-icon linearicons-map2" })),
                        React.createElement("h5", { className: "box-icon-megan-title" },
                            React.createElement("a", { href: "#" }, "Convenient Location")),
                        React.createElement("p", { className: "box-icon-megan-text" }, "Our pizzeria is situated in the downtown and is very easy to reach even on weekends.")),
                    React.createElement("article", { className: "box-icon-megan wow fadeInUp", "data-wow-delay": ".1s" },
                        React.createElement("div", { className: "box-icon-megan-header" },
                            React.createElement("div", { className: "box-icon-megan-icon linearicons-radar" })),
                        React.createElement("h5", { className: "box-icon-megan-title" },
                            React.createElement("a", { href: "#" }, "Free Wi-Fi")),
                        React.createElement("p", { className: "box-icon-megan-text" }, "We have free Wi-Fi available to all clients and visitors of our pizzeria.")),
                    React.createElement("article", { className: "box-icon-megan wow fadeInUp", "data-wow-delay": ".15s" },
                        React.createElement("div", { className: "box-icon-megan-header" },
                            React.createElement("div", { className: "box-icon-megan-icon linearicons-thumbs-up" })),
                        React.createElement("h5", { className: "box-icon-megan-title" },
                            React.createElement("a", { href: "#" }, "Best Service")),
                        React.createElement("p", { className: "box-icon-megan-text" }, "The client is our #1 priority as we deliver top-notch customer service."))))));
};
exports.MainPage = MainPage;
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.MainPage, null), root);
//# sourceMappingURL=mainPage.js.map