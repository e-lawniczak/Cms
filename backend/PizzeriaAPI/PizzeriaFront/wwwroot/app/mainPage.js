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
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1], x = "";
    return React.createElement(commonElements_1.PageWrapper, null,
        React.createElement(SwiperSection, null),
        React.createElement(CategoriesSection, null),
        React.createElement(MidSectionBanner, { keyValue: "banner_1" }),
        React.createElement(ProductsSection, null),
        React.createElement(MidSectionBanner, { keyValue: "banner_2" }),
        React.createElement(TestimonialSection, null),
        React.createElement(GalleriesSection, null),
        React.createElement(AdditionalInfoSection, null));
};
exports.MainPage = MainPage;
var SwiperSection = function () {
    var _a = (0, react_1.useState)(), mainSlider = _a[0], setMainSlider = _a[1], _b = (0, react_1.useState)(), slider = _b[0], setSlider = _b[1], _c = (0, react_1.useState)(0), currentSlide = _c[0], setCurrentSlide = _c[1], _d = (0, react_1.useState)(), sliderBanners = _d[0], setSliderBanners = _d[1], getMainSLider = function () { return __awaiter(void 0, void 0, void 0, function () {
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
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mainSlider)
                        return [2 /*return*/];
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetSlider/".concat(mainSlider === null || mainSlider === void 0 ? void 0 : mainSlider.value))];
                case 1:
                    res = _a.sent();
                    setSlider(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getBannerSliders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var queryString, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("second");
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
        return React.createElement("div", { key: idx, className: "swiper-slide context-dark", style: { backgroundImage: "url(".concat((0, common_1.getPictureUrlFromList)(b.pictureIdList)[0], ")") }, "data-slide-bg": (0, common_1.getPictureUrlFromList)(b.pictureIdList)[0] },
            React.createElement("div", { className: "swiper-slide-caption section-md" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-9 col-md-8 col-lg-7 col-xl-7 offset-lg-1 offset-xxl-0" },
                            React.createElement("div", { dangerouslySetInnerHTML: { __html: b.text } }),
                            React.createElement("a", { className: "button button-lg button-primary button-winona button-shadow-2", href: b.link, "data-caption-animate": "fadeInUp", "data-caption-delay": "300" }, b.subText))))));
    });
    React.useEffect(function () {
        getMainSLider();
    }, []);
    React.useEffect(function () {
        getSlider();
    }, [mainSlider]);
    React.useEffect(function () {
        getBannerSliders();
    }, [slider]);
    return React.createElement("section", { className: "section swiper-container swiper-slider swiper-slider-2 swiper-slider-3", "data-loop": "true", "data-autoplay": "5000", "data-simulate-touch": "false", "data-slide-effect": "fade" },
        React.createElement("div", { className: "swiper-wrapper text-sm-left" }, (mappedSliderBanners === null || mappedSliderBanners === void 0 ? void 0 : mappedSliderBanners.length) > 0 && mappedSliderBanners[currentSlide]),
        React.createElement("div", { className: "swiper-pagination", "data-bullet-custom": "true" }),
        React.createElement("div", { className: "swiper-button-prev", onClick: function () { return setCurrentSlide((currentSlide - 1) % mappedSliderBanners.length); } },
            React.createElement("div", { className: "preview" },
                React.createElement("div", { className: "preview__img" })),
            React.createElement("div", { className: "swiper-button-arrow" })),
        React.createElement("div", { className: "swiper-button-next", onClick: function () { return setCurrentSlide((currentSlide + 1) % mappedSliderBanners.length); } },
            React.createElement("div", { className: "swiper-button-arrow" }),
            React.createElement("div", { className: "preview" },
                React.createElement("div", { className: "preview__img" }))));
};
var CategoriesSection = function () {
    var _a = (0, react_1.useState)(), categories = _a[0], setCategories = _a[1], _b = (0, react_1.useState)(), categoriesTitle = _b[0], setCategoriesTitle = _b[1], getCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, resTitle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleCategoryList")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/categoriesTitle")];
                case 2:
                    resTitle = _a.sent();
                    setCategoriesTitle(resTitle.data);
                    setCategories(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, mappedCategories = categories === null || categories === void 0 ? void 0 : categories.map(function (cat, idx) {
        return React.createElement("div", { className: "col-sm-6 col-lg-4" },
            React.createElement("div", { className: "oh-desktop" },
                React.createElement("article", { className: "services-terri wow slideInUp" },
                    React.createElement("div", { className: "services-terri-figure" },
                        React.createElement("img", { src: (0, common_1.getPictureUrlFromList)(cat.pictureIdList)[0], alt: "", width: "370", height: "278" })),
                    React.createElement("div", { className: "services-terri-caption" },
                        React.createElement("span", { className: ["services-terri-icon", (0, common_1.prepareCategoryIcon)(cat.name.split("_"))].join(" ") }),
                        React.createElement("h5", { className: "services-terri-title" },
                            React.createElement("a", { href: cat.link }, cat.name))))));
    });
    React.useEffect(function () {
        getCategories();
    }, []);
    return React.createElement("section", { className: "section section-md bg-default" },
        React.createElement("div", { className: "container" },
            React.createElement("h3", { className: "oh-desktop" },
                React.createElement("span", { className: "d-inline-block wow slideInDown" }, (categoriesTitle === null || categoriesTitle === void 0 ? void 0 : categoriesTitle.value) || "OUR MENU")),
            React.createElement("div", { className: "row row-md row-30" }, mappedCategories)));
};
var MidSectionBanner = function (props) {
    var _a = (0, react_1.useState)(), bannerValue = _a[0], setBannerValue = _a[1], _b = (0, react_1.useState)(), banner = _b[0], setBanner = _b[1], getBannerValue = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/".concat(props.keyValue))];
                case 1:
                    res = _a.sent();
                    setBannerValue(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getBanner = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!bannerValue)
                        return [2 /*return*/];
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetBanner/".concat(bannerValue === null || bannerValue === void 0 ? void 0 : bannerValue.value))];
                case 1:
                    res = _a.sent();
                    setBanner(res.data);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getBannerValue();
    }, []);
    React.useEffect(function () {
        getBanner();
    }, [bannerValue]);
    return React.createElement("section", { className: "primary-overlay section parallax-container", style: { backgroundImage: "url(".concat((0, common_1.getPictureUrlFromList)(banner === null || banner === void 0 ? void 0 : banner.pictureIdList)[0], ")") }, "data-parallax-img": (0, common_1.getPictureUrlFromList)(banner === null || banner === void 0 ? void 0 : banner.pictureIdList)[0] },
        React.createElement("div", { className: "parallax-content section-xl context-dark text-md-left" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row justify-content-end" },
                    React.createElement("div", { className: "col-sm-8 col-md-7 col-lg-5" },
                        React.createElement("div", { className: "cta-modern" },
                            React.createElement("div", { dangerouslySetInnerHTML: { __html: banner === null || banner === void 0 ? void 0 : banner.text } }),
                            React.createElement("a", { className: "button button-md button-secondary-2 button-winona wow fadeInUp", href: banner === null || banner === void 0 ? void 0 : banner.link, "data-wow-delay": ".2s" }, banner === null || banner === void 0 ? void 0 : banner.subText)))))));
    //       <section className="primary-overlay section parallax-container" data-parallax-img="images/bg-4.jpg">
    //       <div className="parallax-content section-xxl context-dark text-md-left">
    //           <div className="container">
    //               <div className="row justify-content-end">
    //                   <div className="col-sm-9 col-md-7 col-lg-5">
    //                       <div className="cta-modern">
    //                           <h3 className="cta-modern-title cta-modern-title-2 oh-desktop"><span className="d-inline-block wow fadeInLeft">-30% on all salads & drinks</span></h3>
    //                           <p className="cta-modern-text cta-modern-text-2 oh-desktop" data-wow-delay=".1s"><span className="cta-modern-decor cta-modern-decor-2 wow slideInLeft"></span><span className="d-inline-block wow slideInUp">Taste some of the best PizzaHouse salads!</span></p><a className="button button-lg button-secondary button-winona wow fadeInRight" href="contacts.html" data-wow-delay=".2s">contact us</a>
    //                       </div>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //   </section>
};
var ProductsSection = function () {
    var _a = (0, react_1.useState)(), products = _a[0], setProducts = _a[1], _b = (0, react_1.useState)(), categories = _b[0], setCategories = _b[1], _c = (0, react_1.useState)(), productsTitle = _c[0], setProductsTitle = _c[1], getProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, resTitle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleProductList", common_1.axiosBaseConfig)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/productsTitle")];
                case 2:
                    resTitle = _a.sent();
                    setProducts(res.data);
                    setProductsTitle(resTitle.data);
                    return [2 /*return*/];
            }
        });
    }); }, getCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleCategoryList")];
                case 1:
                    res = _a.sent();
                    setCategories(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, mappedProducts = products === null || products === void 0 ? void 0 : products.map(function (p, idx) {
        if (p.isRecommended)
            return React.createElement("div", { key: idx, className: "col-sm-6 col-lg-4 col-xl-3" },
                React.createElement("article", { className: "product wow fadeInLeft", "data-wow-delay": ".15s" },
                    React.createElement("div", { className: "product-figure" },
                        React.createElement("img", { src: (0, common_1.getPictureUrlFromList)(p.pictureIdList)[0], alt: "", width: "161", height: "162" })),
                    React.createElement("div", { className: "product-rating" }, Array.from({ length: 5 }, function (_, i) { return i + 1; }).map(function (i, idx) {
                        if (idx < p.score)
                            return React.createElement("span", { className: "mdi mdi-star" });
                        return React.createElement("span", { className: "mdi mdi-star text-gray-13" });
                    })),
                    React.createElement("h6", { className: "product-title" }, p.name),
                    React.createElement("div", { className: "product-price-wrap" }, (p.discountPrice < p.price && p.discountPrice > 0) ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "product-price product-price-old" },
                                p.price,
                                " z\u0142"),
                            React.createElement("div", { className: "product-price" },
                                p.discountPrice,
                                " z\u0142"))
                        : React.createElement("div", { className: "product-price" },
                            p.price,
                            " z\u0142")),
                    React.createElement("div", { className: "product-button" },
                        React.createElement("div", { className: "button-wrap" },
                            React.createElement("a", { className: "button button-xs button-secondary button-winona", href: categories.find(function (c) { return c.id == p.categoryId; }).link + "#".concat(p.name + p.id) }, "View Product"))),
                    (p.discountPrice < p.price && p.discountPrice > 0) ? React.createElement("span", { className: "product-badge product-badge-sale" }, "Sale") : ""));
    }).filter(function (p) { return p; });
    React.useEffect(function () {
        getProducts();
    }, []);
    React.useEffect(function () {
        getCategories();
    }, [products]);
    return React.createElement("section", { className: "section section-lg bg-default" },
        React.createElement("div", { className: "container" },
            React.createElement("h3", { className: "oh-desktop" },
                React.createElement("span", { className: "d-inline-block wow slideInUp" }, (productsTitle === null || productsTitle === void 0 ? void 0 : productsTitle.value) || "Selected Pizzas")),
            React.createElement("div", { className: "row row-lg row-30" }, mappedProducts)));
};
var TestimonialSection = function () {
    return React.createElement("section", { className: "section section-xl bg-default" },
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
                    React.createElement("div", { className: "quote-tara-status" }, "Client")))));
};
var GalleriesSection = function () {
    return React.createElement("section", { className: "section section-last bg-default" },
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
                                React.createElement("div", { className: "thumbnail-mary-location" }, "Pick Your Favorite dish"))))))));
};
var AdditionalInfoSection = function () {
    return React.createElement("section", { className: "section section-sm bg-default" },
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
                    React.createElement("p", { className: "box-icon-megan-text" }, "The client is our #1 priority as we deliver top-notch customer service.")))));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.MainPage, null), root);
//# sourceMappingURL=mainPage.js.map