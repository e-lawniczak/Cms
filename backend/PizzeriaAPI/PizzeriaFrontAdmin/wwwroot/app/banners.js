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
exports.BannersPage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var axios_1 = __importDefault(require("axios"));
var common_1 = require("./common");
var react_hook_form_1 = require("react-hook-form");
var BannersPage = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    React.useEffect(function () {
    }, []);
    return React.createElement(common_1.PageWrapper, null,
        React.createElement(BannerSection, null));
};
exports.BannersPage = BannersPage;
var BannerSection = function () {
    var _a = (0, react_1.useState)(), banner = _a[0], setBanner = _a[1], _b = (0, react_1.useState)(), bannersData = _b[0], setBannersData = _b[1], _c = (0, react_1.useState)(), pictures = _c[0], setPictures = _c[1], _d = (0, react_1.useState)(false), showNew = _d[0], setNew = _d[1], _e = (0, react_hook_form_1.useForm)(), register = _e.register, handleSubmit = _e.handleSubmit, setValue = _e.setValue, sKey = "home_page_slider", onSubmit = function (data) {
        console.log(data);
    }, getBanners = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllBannerList")];
                case 1:
                    res = _a.sent();
                    setBannersData(res.data.sort(function (a, b) { return (0, common_1.sortFunc)(a, b); }));
                    return [2 /*return*/];
            }
        });
    }); }, getpictures = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllPictureList", common_1.axiosBaseConfig)];
                case 1:
                    res = _a.sent();
                    setPictures(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBanners()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getpictures()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, addNew = React.createElement(BannerRow, { item: null, isNew: true, pictures: pictures, refreshFunc: getData, setNew: setNew });
    React.useEffect(function () {
        getBanners();
        getpictures();
    }, []);
    return React.createElement("div", { className: 'card mb-4' },
        React.createElement("div", { className: "form-top-container" }, !showNew && React.createElement("div", { className: "btn btn-white btn-sm mb-0 btn-save", onClick: function () { return setNew(true); } }, "Add new")),
        React.createElement("div", { className: "socials-list" },
            React.createElement("div", { className: "banners-row row" },
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "id"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "title"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "text"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "subtext"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "link"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "visible"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "picture"),
                React.createElement("div", { className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7' }, "options")),
            showNew && addNew,
            bannersData && bannersData.map(function (item, idx) { return React.createElement(BannerRow, { key: idx, item: item, isNew: false, pictures: pictures, refreshFunc: getData }); })));
};
var BannerRow = function (props) {
    var item = props.item, isNew = props.isNew, pictures = props.pictures, refreshFunc = props.refreshFunc, setNew = props.setNew, picData = (0, common_1.mapObjectToSelect)(pictures, "name", "pictureId"), _a = (0, react_hook_form_1.useForm)({
        defaultValues: __assign({}, item)
    }), register = _a.register, handleSubmit = _a.handleSubmit, formState = _a.formState, getValues = _a.getValues, makeItem = function (data) {
        return {
            id: (item === null || item === void 0 ? void 0 : item.id) || -1,
            isVisible: (data === null || data === void 0 ? void 0 : data.isVisible) || (item === null || item === void 0 ? void 0 : item.isVisible) || false,
            link: (data === null || data === void 0 ? void 0 : data.link) || (item === null || item === void 0 ? void 0 : item.link) || "",
            pictureIdList: data.selectedPicture ? [data.selectedPicture] : [],
            sliderId: (data === null || data === void 0 ? void 0 : data.sliderId) || (item === null || item === void 0 ? void 0 : item.sliderId) || null,
            subText: (data === null || data === void 0 ? void 0 : data.subText) || (item === null || item === void 0 ? void 0 : item.subText) || "",
            text: (data === null || data === void 0 ? void 0 : data.text) || (item === null || item === void 0 ? void 0 : item.text) || "",
            title: (data === null || data === void 0 ? void 0 : data.title) || (item === null || item === void 0 ? void 0 : item.title) || ""
        };
    }, addItem = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var item, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = makeItem(data);
                    url = common_1.baseApiUrl + "/AddBanner";
                    return [4 /*yield*/, axios_1.default.post(url, item, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    refreshFunc();
                    setNew(false);
                    return [2 /*return*/];
            }
        });
    }); }, deleteItem = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var item, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = makeItem(data);
                    url = common_1.baseApiUrl + "/DeleteBanner/" + item.id;
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
                    url = common_1.baseApiUrl + "/UpdateBanner";
                    return [4 /*yield*/, axios_1.default.patch(url, item, common_1.axiosBaseConfig)];
                case 1:
                    _a.sent();
                    refreshFunc();
                    return [2 /*return*/];
            }
        });
    }); };
    return React.createElement("form", { className: '' },
        React.createElement("div", { className: "form-content " },
            React.createElement("div", { className: "banners-row row" },
                React.createElement("div", { className: "id" }, (item === null || item === void 0 ? void 0 : item.id) || -1),
                React.createElement(common_1.PInput, { register: __assign({}, register("title")), inputProps: { type: 'text' } }),
                React.createElement(common_1.PInput, { register: __assign({}, register("text")), inputProps: { type: 'text' } }),
                React.createElement(common_1.PInput, { register: __assign({}, register("subText")), inputProps: { type: 'text' } }),
                React.createElement(common_1.PInput, { register: __assign({}, register("link")), inputProps: { type: 'text' } }),
                React.createElement(common_1.PInput, { register: __assign({}, register("isVisible")), inputProps: { type: 'checkbox' } }),
                React.createElement("div", null, picData.length > 0 &&
                    React.createElement(common_1.Select, { register: register, data: picData, defaultValue: (item === null || item === void 0 ? void 0 : item.pictureIdList[0]) || null, name: "selectedPicture" })),
                React.createElement("div", { className: "buttons-container" }, isNew ?
                    React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: function (e) { return addItem(getValues()); } }, "Add")
                    : React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: function (e) { return editItem(getValues()); } }, "Edit"),
                        React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-delete", onClick: function (e) { return deleteItem(getValues()); } }, "Delete"))))));
};
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.BannersPage, null), root);
//# sourceMappingURL=banners.js.map