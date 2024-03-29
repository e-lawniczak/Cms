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
exports.AboutUsPage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var axios_1 = __importDefault(require("axios"));
var common_1 = require("./common");
var react_hook_form_1 = require("react-hook-form");
var AboutUsPage = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    React.useEffect(function () {
    }, []);
    return React.createElement(common_1.PageWrapper, null,
        React.createElement(KeyValueSec, { _key: 'au_title', title: 'Title of the page' }),
        React.createElement(LogoSection, { logo_key: 'about_us_banner', title: 'Main banner on About Us page' }),
        React.createElement(SliderSection, { objKey: 'tabSlider_1', objVal: "title", entry_key: 'tabSlider1', title: 'Information block on main page', dataUrl: '/GetVisibleTabSliderList' }),
        React.createElement(KeyValueSec, { _key: 'au_box1', title: 'Box 1 title content' }),
        React.createElement(KeyValueSec, { _key: 'au_box1_text', title: 'Box 1 text content' }),
        React.createElement(KeyValueSec, { _key: 'au_box2', title: 'Box 2 title content' }),
        React.createElement(KeyValueSec, { _key: 'au_box2_text', title: 'Box 2 text content' }),
        React.createElement(KeyValueSec, { _key: 'au_box3', title: 'Box 3 title content' }),
        React.createElement(KeyValueSec, { _key: 'au_box3_text', title: 'Box 3 text content' }),
        React.createElement(KeyValueSec, { _key: 'au_ourTeam_title', title: 'Team section title' }),
        React.createElement(SliderSection, { objKey: 'tabSlider_2', objVal: "title", entry_key: 'tabSlider2', title: 'OUR HISTORY information block', dataUrl: '/GetVisibleTabSliderList' }),
        React.createElement(SliderSection, { objKey: 'tabSlider_3', objVal: "title", entry_key: 'tabSlider3', title: 'Testimonial information block', dataUrl: '/GetVisibleTabSliderList' }));
};
exports.AboutUsPage = AboutUsPage;
var SliderSection = function (props) {
    var _a = (0, react_1.useState)(), slider = _a[0], setSlider = _a[1], _b = (0, react_1.useState)(), slidersData = _b[0], setSliderData = _b[1], _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, setValue = _c.setValue, sKey = props.objKey, onSubmit = function (data) {
        if (!slider)
            addItem(sKey, data.sliderValue);
        else
            editItem(slider.id, slider.key, data.sliderValue);
        getKeyValues();
    }, getSliders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetVisibleTabSliderList")];
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
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/".concat(sKey))];
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
                    url = common_1.baseApiUrl + "/UpdateKeyValueById";
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
    return React.createElement(common_1.PageSettingsSection, { title: props.title, subtext: props.subText },
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
                            React.createElement(common_1.Select, { register: register, defaultValue: slider === null || slider === void 0 ? void 0 : slider.value, data: (0, common_1.mapObjectToSelect)(slidersData, "title", "title"), name: "sliderValue" })))),
                React.createElement("div", { className: "buttons-container" },
                    React.createElement("button", { type: 'submit', className: "btn btn-white btn-sm w-100 mb-0 btn-save" }, "Save")))));
};
var KeyValueSec = function (props) {
    var _a = (0, react_1.useState)(), item = _a[0], setitem = _a[1], _b = (0, react_hook_form_1.useForm)({
        defaultValues: { itemValue: (item === null || item === void 0 ? void 0 : item.value) || "" },
    }), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, sKey = props._key, onSubmit = function (data) {
        if (!item)
            addItem(sKey, data.itemValue);
        else
            editItem(item.id, item.key, data.itemValue);
        getKeyValues();
    }, getKeyValues = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/".concat(sKey))];
                case 1:
                    res = _a.sent();
                    setValue("itemValue", res.data.value);
                    setitem(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (id, key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateKeyValueById";
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
    return React.createElement(common_1.PageSettingsSection, { title: props.title, subtext: props.subText },
        React.createElement("div", null,
            React.createElement("form", { action: "", className: "section-form", onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "form-content " },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "key"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "value")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "id" }, (item === null || item === void 0 ? void 0 : item.id) || -1),
                        React.createElement("div", { className: "key" }, (item === null || item === void 0 ? void 0 : item.key) || sKey),
                        React.createElement(common_1.PInput, { register: __assign({}, register("itemValue")), inputProps: { type: 'text' } }))),
                React.createElement("div", { className: "buttons-container" },
                    React.createElement("button", { type: 'submit', className: "btn btn-white btn-sm w-100 mb-0 btn-save" }, "Save")))));
};
var KeyValueSection = function (props) {
    var _a = (0, react_1.useState)(), entry = _a[0], setEntry = _a[1], _b = (0, react_1.useState)([]), data = _b[0], setData = _b[1], _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, setValue = _c.setValue, dataUrl = props.dataUrl ? common_1.baseApiUrl + props.dataUrl : "", sKey = props.entry_key, fieldName = sKey + "dataValue", selectData = (0, common_1.mapObjectToSelect)(data, (props === null || props === void 0 ? void 0 : props.objKey) || "name", (props === null || props === void 0 ? void 0 : props.objVal) || "id"), onSubmit = function (data) {
        if (!entry)
            addItem(sKey, data[fieldName]);
        else
            editItem(entry.id, entry.key, data[fieldName]);
        getKeyValues();
    }, getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(dataUrl)];
                case 1:
                    res = _a.sent();
                    setData(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getKeyValues = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/".concat(sKey))];
                case 1:
                    res = _a.sent();
                    setEntry(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (id, key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateKeyValueById";
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
        if (dataUrl.length > 0)
            getData();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: props.title, subtext: props.subtext },
        React.createElement("div", null,
            React.createElement("form", { action: "", className: "section-form", onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "form-content " },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "key"),
                        React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "value")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "id" }, (entry === null || entry === void 0 ? void 0 : entry.id) || -1),
                        React.createElement("div", { className: "key" }, (entry === null || entry === void 0 ? void 0 : entry.key) || sKey),
                        data.length > 0 ?
                            React.createElement("div", { style: { display: 'flex', gap: "10px" } },
                                props.isPicture && (entry === null || entry === void 0 ? void 0 : entry.key),
                                data && data.length > 0 &&
                                    React.createElement(common_1.Select, { register: register, defaultValue: entry === null || entry === void 0 ? void 0 : entry.value, data: selectData, name: fieldName }))
                            :
                                React.createElement(common_1.PInput, { register: __assign({}, register(fieldName)), inputProps: { type: 'text' } }))),
                React.createElement("div", { className: "buttons-container" },
                    React.createElement("button", { type: 'submit', className: "btn btn-white btn-sm w-100 mb-0 btn-save" }, "Save")))));
};
var LogoSection = function (props) {
    var _a = (0, react_1.useState)(), pictures = _a[0], setPictures = _a[1], _b = (0, react_1.useState)(), logoPicture = _b[0], setLogo = _b[1], getPictures = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllPictureList")];
                case 1:
                    res = _a.sent();
                    setPictures(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, setValue = _c.setValue, onSubmit = function (data) {
        if (!logoPicture)
            addItem(props.logo_key, data.logoValue);
        else
            editItem(logoPicture.id, logoPicture.key, data.logoValue);
        getKeyValues();
    }, getKeyValues = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetKeyValueByKey/".concat(props.logo_key))];
                case 1:
                    res = _a.sent();
                    setLogo(res.data);
                    setValue("logoValue", res.data.value);
                    return [2 /*return*/];
            }
        });
    }); }, editItem = function (id, key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = common_1.baseApiUrl + "/UpdateKeyValueById";
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
        setValue("logoValue", "/GetPicture/Mini/".concat(pic.pictureId));
    };
    React.useEffect(function () {
        getPictures();
        getKeyValues();
    }, []);
    return React.createElement(common_1.PageSettingsSection, { title: props.title, className: 'two-col', subtext: 'Click on the picture from the list. Then click the save button' },
        React.createElement("div", { className: "logo-preview" },
            React.createElement(common_1.Image, { src: common_1.baseApiUrl + (logoPicture === null || logoPicture === void 0 ? void 0 : logoPicture.value) || "" })),
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
            React.createElement("div", { className: "picture-list" }, pictures === null || pictures === void 0 ? void 0 : pictures.map(function (d, idx) { return React.createElement("div", { className: 'picture-container' },
                React.createElement(common_1.PictureListElement, { key: idx, item: d, onClick: function () { return onPictureClick(d); } }),
                " ",
                React.createElement("div", null, d.name),
                "  "); }))));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.AboutUsPage, null), root);
//# sourceMappingURL=aboutUs.js.map