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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageWrapper = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var PageWrapper = function (props) {
    var children = props.children, className = props.className, _a = (0, react_1.useState)(), data = _a[0], setData = _a[1];
    return React.createElement(React.Fragment, null,
        React.createElement(Header, { className: className }),
        React.createElement("div", { className: ["react-page-container", className + "-header"].join(" ") }, children),
        React.createElement(Footer, { className: className }));
};
exports.PageWrapper = PageWrapper;
var Header = function (props) {
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
                                    React.createElement("a", { className: "brand", href: "index.html" },
                                        React.createElement("img", { className: "brand-logo-dark", src: "images/logo-198x66.png", alt: "", width: "198", height: "66" })))),
                            React.createElement("div", { className: "rd-navbar-right rd-navbar-nav-wrap" },
                                React.createElement("div", { className: "rd-navbar-aside" },
                                    React.createElement("ul", { className: "rd-navbar-contacts-2" },
                                        React.createElement("li", null,
                                            React.createElement("div", { className: "unit unit-spacing-xs" },
                                                React.createElement("div", { className: "unit-left" },
                                                    React.createElement("span", { className: "icon mdi mdi-phone" })),
                                                React.createElement("div", { className: "unit-body" },
                                                    React.createElement("a", { className: "phone", href: "tel:#" }, "+1 718-999-3939")))),
                                        React.createElement("li", null,
                                            React.createElement("div", { className: "unit unit-spacing-xs" },
                                                React.createElement("div", { className: "unit-left" },
                                                    React.createElement("span", { className: "icon mdi mdi-map-marker" })),
                                                React.createElement("div", { className: "unit-body" },
                                                    React.createElement("a", { className: "address", href: "#" }, "514 S. Magnolia St. Orlando, FL 32806"))))),
                                    React.createElement("ul", { className: "list-share-2" },
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-facebook", href: "#" })),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-twitter", href: "#" })),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-instagram", href: "#" })),
                                        React.createElement("li", null,
                                            React.createElement("a", { className: "icon mdi mdi-google-plus", href: "#" })))),
                                React.createElement("div", { className: "rd-navbar-main" },
                                    React.createElement("ul", { className: "rd-navbar-nav" },
                                        React.createElement("li", { className: "rd-nav-item active" },
                                            React.createElement("a", { className: "rd-nav-link", href: "index.html" }, "Home")),
                                        React.createElement("li", { className: "rd-nav-item" },
                                            React.createElement("a", { className: "rd-nav-link", href: "about-us.html" }, "About us")),
                                        React.createElement("li", { className: "rd-nav-item" },
                                            React.createElement("a", { className: "rd-nav-link", href: "typography.html" }, "Typography")),
                                        React.createElement("li", { className: "rd-nav-item" },
                                            React.createElement("a", { className: "rd-nav-link", href: "contacts.html" }, "Contacts"))))),
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