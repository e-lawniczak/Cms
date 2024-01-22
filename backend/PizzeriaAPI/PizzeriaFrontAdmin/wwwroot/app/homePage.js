"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.HomePage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var common_1 = require("./common");
var axios_1 = __importDefault(require("axios"));
var react_hook_form_1 = require("react-hook-form");
var HomePage = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    React.useEffect(function () {
    }, []);
    return React.createElement(common_1.PageWrapper, null,
        React.createElement(ContactSection, null),
        React.createElement(SocialMediaSection, null),
        React.createElement(LogoSection, { logo_key: 'main_logo', title: 'Logo' }),
        React.createElement(LogoSection, { logo_key: 'footer_logo', title: 'Footer logo' }),
        React.createElement(MenuSection, null),
        React.createElement(SliderSection, null));
};
exports.HomePage = HomePage;
var SliderSection = function () {
    var _a = (0, react_1.useState)(), slider = _a[0], setSlider = _a[1], _b = (0, react_1.useState)(), slidersData = _b[0], setSliderData = _b[1], _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, setValue = _c.setValue, sKey = "home_page_slider", onSubmit = function (data) {
        console.log(data);
        if (!slider)
            addItem(sKey, data.sliderValue);
        else
            editItem(slider.id, slider.key, data.sliderValue);
    }, getSliders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllSliderList")];
                case 1:
                    res = _a.sent();
                    setSliderData(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getKeyValues = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValue/".concat(sKey))];
                case 1:
                    res = _a.sent();
                    setSlider(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (id, key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateKeyValue";
                    return [4 /*yield*/, axios_1.default.patch(url, { id: id, key: key, value: value }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getKeyValues();
                    return [2 /*return*/];
            }
        });
    }); }, addItem = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/AddKeyValue";
                    return [4 /*yield*/, axios_1.default.post(url, { id: -1, key: key, value: value }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getKeyValues();
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getKeyValues();
        getSliders();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: "Slider", subtext: "Choose a slider to be displayed on the main page" },
        React.createElement("div", { className: "banner-preview" }),
        React.createElement("div", null,
            React.createElement("form", { action: "", className: "section-form", onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "form-content " },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "key"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "value")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "id" }, (slider === null || slider === void 0 ? void 0 : slider.id) || -1),
                        React.createElement("div", { className: "key" }, (slider === null || slider === void 0 ? void 0 : slider.key) || sKey),
                        React.createElement("div", null, slidersData && slidersData.length > 0 &&
                            React.createElement(common_1.Select, { register: register, defaultValue: slider === null || slider === void 0 ? void 0 : slider.value, data: (0, common_1.mapObjectToSelect)(slidersData, "name", "sliderId"), name: "sliderValue" })))),
                React.createElement("div", { className: "buttons-container" },
                    React.createElement("button", { type: 'submit', className: "btn btn-white btn-sm w-100 mb-0 btn-save" }, "Save")))));
};
var MenuSection = function () {
    var _a = (0, react_1.useState)(), elements = _a[0], setElements = _a[1], _b = (0, react_1.useState)(), parentElements = _b[0], setParentElements = _b[1], _c = (0, react_1.useState)(false), showNew = _c[0], setNew = _c[1], getMenuElements = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllMenuElementList")];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    setElements(res.data);
                    setParentElements(res.data.filter(function (m, idx) { return !(m.parentMenuElementId && m.parentMenuElementId > 0); }));
                    return [2 /*return*/];
            }
        });
    }); }, parentData = (0, common_1.mapObjectToSelect)(parentElements, "text", "menuElementId"), newItem = React.createElement(MenuElementRow, { parentData: parentData, item: null, refreshFunc: getMenuElements, isNew: true });
    React.useEffect(function () {
        getMenuElements();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: 'Menu elements' },
        React.createElement("div", { className: "form-top-container" }, !showNew && React.createElement("div", { className: "btn btn-white btn-sm mb-0 btn-save", onClick: function () { return setNew(true); } }, "Add new")),
        React.createElement("form", { className: 'section-form' },
            React.createElement("div", { className: "form-content " },
                React.createElement("div", { className: "menu-element-row row" },
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "label"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "link"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "visible"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "parent"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "options")),
                showNew && newItem,
                elements && elements.map(function (e, idx) { return React.createElement(MenuElementRow, { parentData: parentData, item: e, key: idx, refreshFunc: getMenuElements }); }))));
};
var MenuElementRow = function (props) {
    var item = props.item, parentData = props.parentData, _a = props.isNew, isNew = _a === void 0 ? false : _a, refreshFunc = props.refreshFunc, _b = (0, react_hook_form_1.useForm)({ defaultValues: __assign({}, item) }), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, getValues = _b.getValues, onSubmit = function (data) {
        console.log(data);
    }, makeItem = function (data) {
        return {
            isVisible: (data === null || data === void 0 ? void 0 : data.isVisible) || false,
            link: (data === null || data === void 0 ? void 0 : data.link) || "",
            menuElementId: (item === null || item === void 0 ? void 0 : item.menuElementId) || -1,
            parentMenuElementId: (data === null || data === void 0 ? void 0 : data.parentMenuElementId) || null,
            text: (data === null || data === void 0 ? void 0 : data.text) || ""
        };
    }, addItem = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var item, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = makeItem(data);
                    url = common_1.baseApiUrl + "/AddMenuElement";
                    return [4 /*yield*/, axios_1.default.post(url, item, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    refreshFunc();
                    return [2 /*return*/];
            }
        });
    }); }, deleteItem = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var item, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = makeItem(data);
                    url = common_1.baseApiUrl + "/DeleteMenuElement/" + item.menuElementId;
                    return [4 /*yield*/, axios_1.default.delete(url, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    refreshFunc();
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var item, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = makeItem(data);
                    url = common_1.baseApiUrl + "/UpdateMenuElement";
                    return [4 /*yield*/, axios_1.default.patch(url, item, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    refreshFunc();
                    return [2 /*return*/];
            }
        });
    }); };
    return React.createElement("div", { className: "menu-element-row row" },
        React.createElement("div", { className: "id" }, (item === null || item === void 0 ? void 0 : item.menuElementId) || -1),
        React.createElement(common_1.PInput, { register: __assign({}, register("text")), inputProps: { type: 'text' } }),
        React.createElement(common_1.PInput, { register: __assign({}, register("link")), inputProps: { type: 'text' } }),
        React.createElement(common_1.PInput, { register: __assign({}, register("isVisible")), inputProps: { type: 'checkbox' } }),
        React.createElement("div", null, parentData && parentData.length > 0 &&
            React.createElement(common_1.Select, { register: register, defaultValue: item.parentMenuElementId, data: parentData, name: "parentMenuElementId" })),
        React.createElement("div", { className: "buttons-container" }, isNew ?
            React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: function (e) { return addItem(getValues()); } }, "Add")
            : React.createElement(React.Fragment, null,
                React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: function (e) { return editItem(getValues()); } }, "Edit"),
                React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-delete", onClick: function (e) { return deleteItem(getValues()); } }, "Delete"))));
};
var LogoSection = function (props) {
    var _a = (0, react_1.useState)(), pictures = _a[0], setPictures = _a[1], _b = (0, react_1.useState)(), logoPicture = _b[0], setLogo = _b[1], getPictures = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllPictureList")];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    setPictures(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, setValue = _c.setValue, onSubmit = function (data) {
        console.log(data);
        if (!logoPicture)
            addItem(props.logo_key, data.logoValue);
        else
            editItem(logoPicture.id, logoPicture.key, data.logoValue);
    }, getKeyValues = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValue/".concat(props.logo_key))];
                case 1:
                    res = _a.sent();
                    setLogo(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (id, key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateKeyValue";
                    return [4 /*yield*/, axios_1.default.patch(url, { id: id, key: key, value: value }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getKeyValues();
                    return [2 /*return*/];
            }
        });
    }); }, addItem = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/AddKeyValue";
                    return [4 /*yield*/, axios_1.default.post(url, { id: -1, key: key, value: value }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getKeyValues();
                    return [2 /*return*/];
            }
        });
    }); }, onPictureClick = function (pic) {
        setValue("logoValue", "/GetPicture/Full/".concat(pic.pictureId));
    };
    React.useEffect(function () {
        getPictures();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: props.title, className: 'two-col', subtext: 'Click on the picture from the list. Then click the save button' },
        React.createElement("div", { className: "logo-preview" },
            React.createElement(common_1.Image, { src: (logoPicture === null || logoPicture === void 0 ? void 0 : logoPicture.value) || "" })),
        React.createElement("div", null,
            React.createElement("form", { action: "", className: "section-form", onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "form-content " },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "key"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "value")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "id" }, (logoPicture === null || logoPicture === void 0 ? void 0 : logoPicture.id) || -1),
                        React.createElement("div", { className: "key" }, (logoPicture === null || logoPicture === void 0 ? void 0 : logoPicture.key) || props.logo_key),
                        React.createElement(common_1.PInput, { register: __assign({}, register("logoValue")), inputProps: { type: 'text' } }))),
                React.createElement("div", { className: "buttons-container" },
                    React.createElement("button", { type: 'submit', className: "btn btn-white btn-sm w-100 mb-0 btn-save" }, "Save"))),
            React.createElement("div", { className: "picture-list" }, pictures === null || pictures === void 0 ? void 0 : pictures.map(function (d, idx) { return React.createElement(common_1.PictureListElement, { key: idx, item: d, onClick: function () { return onPictureClick(d); } }); }))));
};
var ContactSection = function () {
    var _a = (0, react_1.useState)(), phone = _a[0], setPhone = _a[1], _b = (0, react_1.useState)(), address = _b[0], setAddress = _b[1], _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, onSubmit = function (data) {
        console.log(data);
        if (!phone)
            addItem("phone", data.phoneValue);
        else
            editItem(phone.id, phone.key, data.phoneValue);
        if (!address)
            addItem("address", data.addressValue);
        else
            editItem(address.id, address.key, data.addressValue);
    }, getKeyValues = function () { return __awaiter(void 0, void 0, void 0, function () {
        var pres, ares;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValue/phone")];
                case 1:
                    pres = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValue/address")];
                case 2:
                    ares = _a.sent();
                    setPhone(pres.data);
                    setAddress(ares.data);
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (id, key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateKeyValue";
                    return [4 /*yield*/, axios_1.default.patch(url, { id: id, key: key, value: value }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getKeyValues();
                    return [2 /*return*/];
            }
        });
    }); }, addItem = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/AddKeyValue";
                    return [4 /*yield*/, axios_1.default.post(url, { id: -1, key: key, value: value }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getKeyValues();
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getKeyValues();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: "Contact info", subtext: "Choose 2 from key-value entries. Value -1 of id means that the value is not yet set" },
        React.createElement("form", { className: 'section-form', onSubmit: handleSubmit(onSubmit) },
            React.createElement("div", { className: "form-content " },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "key"),
                    React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "value")),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "id" }, (phone === null || phone === void 0 ? void 0 : phone.id) || -1),
                    React.createElement("div", { className: "key" }, (phone === null || phone === void 0 ? void 0 : phone.key) || "phone"),
                    React.createElement(common_1.PInput, { register: __assign({}, register("phoneValue")), inputProps: { type: 'text' } })),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "id" }, (address === null || address === void 0 ? void 0 : address.id) || -1),
                    React.createElement("div", { className: "key" }, (address === null || address === void 0 ? void 0 : address.key) || "address"),
                    React.createElement(common_1.PInput, { register: __assign({}, register("addressValue")), inputProps: { type: 'text' } }))),
            React.createElement("div", { className: "buttons-container" },
                React.createElement("button", { type: 'submit', className: "btn btn-white btn-sm w-100 mb-0 btn-save" }, "Save"))));
};
var SocialMediaSection = function () {
    var _a = (0, react_1.useState)(), socialMedia = _a[0], setSocialMedia = _a[1], getSocials = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllSocialMediaList")];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    setSocialMedia(res.data);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getSocials();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: "Social media", subtext: "Socials with \"Main\" checked will be displayed at the main page" },
        React.createElement("form", { className: 'section-form' },
            React.createElement("div", { className: "form-content ps ps--active-y" },
                socialMedia && socialMedia.length <= 0 && React.createElement("div", null,
                    "Create ",
                    React.createElement("a", { className: 'normal-link', href: "/SocialMedia" }, "Social media"),
                    " link first"),
                socialMedia && socialMedia.map(function (item, idx) { return React.createElement(SocialMediaRow, { getSocials: getSocials, item: item }); })),
            React.createElement("div", { className: "buttons-container" })));
};
var SocialMediaRow = function (props) {
    var item = props.item, setData = props.setData, data = props.data, getSocials = props.getSocials, thisItemMain = data.filter(function (i) { return i.originalItem.name == item.name; })[0], handleCheckboxChange = function (e, type) {
        var formItem = item;
        if (type == "main") {
            formItem.isMain = e.target.value;
        }
        else {
            formItem.isVisible = e.target.value;
        }
        editSocials(formItem);
    }, editSocials = function (formItem) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateSocialMedia";
                    return [4 /*yield*/, axios_1.default.patch(url, { formItem: formItem }, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    getSocials();
                    return [2 /*return*/];
            }
        });
    }); };
    return React.createElement("div", { className: "row" },
        React.createElement("div", { className: "name" }, item.name),
        React.createElement("label", { htmlFor: item.name }, "Wy\u015Bwietli\u0107 jako g\u0142\u00F3wne?"),
        React.createElement("input", { type: "checkbox", name: item.name, id: item.name, checked: (thisItemMain === null || thisItemMain === void 0 ? void 0 : thisItemMain.isMain) || false, onChange: function (e) { return handleCheckboxChange(e, "main"); } }),
        React.createElement("label", { htmlFor: item.name }, "Czy wy\u015Bwiela\u0107?"),
        React.createElement("input", { type: "checkbox", name: item.name, id: item.name, checked: (thisItemMain === null || thisItemMain === void 0 ? void 0 : thisItemMain.isMain) || false, onChange: function (e) { return handleCheckboxChange(e, "visible"); } }));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.HomePage, null), root);
//# sourceMappingURL=homePage.js.map