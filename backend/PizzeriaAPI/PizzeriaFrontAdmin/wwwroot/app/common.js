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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = exports.callApi = exports.testFunc = exports.axiosBaseConfig = exports.baseApiUrl = exports.mapObjectToSelect = exports.PInput = exports.Image = exports.PageWrapper = exports.PageSettingsSection = exports.Select = exports.sortFunc = exports.PictureListElement = void 0;
var React = __importStar(require("react"));
var PictureListElement = function (props) {
    var item = props.item, onClick = props.onClick, src = props.src;
    return React.createElement("div", { className: 'picture-list-element', onClick: onClick },
        React.createElement(exports.Image, { src: src || exports.baseApiUrl + "/GetPicture/Mini/".concat(item.pictureId), item: item }));
};
exports.PictureListElement = PictureListElement;
var sortFunc = function (a, b, key) {
    if (!key) {
        return b.id - a.id;
    }
    else {
        return b[key] - a[key];
    }
};
exports.sortFunc = sortFunc;
function Select(props) {
    var name = props.name, data = props.data, register = props.register, selectProps = props.selectProps, _a = props.defaultValue, defaultValue = _a === void 0 ? null : _a, isSelected = function (item, value) {
        var flag = false;
        if (!defaultValue)
            return false;
        if (selectProps === null || selectProps === void 0 ? void 0 : selectProps.multiple) {
            value.forEach(function (i) {
                if (i == item.value)
                    flag = true;
            });
            return flag;
        }
        else {
            return item.value == value;
        }
    };
    return (React.createElement("select", __assign({ className: 'select-comp' }, register(name), selectProps), data.map(function (item, idx) { return (React.createElement("option", { key: idx, value: item.value, selected: isSelected(item, defaultValue) }, item.label)); })));
}
exports.Select = Select;
var PageSettingsSection = function (props) {
    return React.createElement("section", { className: ["card settings-section", props.className || ""].join(" ") },
        props.title && React.createElement("div", { className: "section-title" }, props.title),
        props.subtext && React.createElement("div", { className: "section-subtext" }, props.subtext),
        React.createElement("div", { className: "section-content" }, props.children));
};
exports.PageSettingsSection = PageSettingsSection;
var PageWrapper = function (props) {
    return React.createElement("div", { className: ["react-page", props.className || ""].join(" ") }, props.children);
};
exports.PageWrapper = PageWrapper;
var Image = function (props) {
    var imageClass = props.imageClass, src = props.src, _a = props.onImageClick, onImageClick = _a === void 0 ? function () { } : _a, item = props.item;
    return React.createElement("div", { className: ['img-container', imageClass || ""].join(" "), onClick: function (e) { return onImageClick(item, e); } },
        React.createElement("img", { src: src }));
};
exports.Image = Image;
var PInput = function (props) {
    var register = props.register, inputClass = props.inputClass, wrapperClass = props.wrapperClass, inputProps = props.inputProps;
    return React.createElement("div", { className: ['input-wrapper', wrapperClass || ""].join(" ") },
        React.createElement("input", __assign({}, register, { className: ['input-field', inputClass || ""].join(" ") }, inputProps)));
};
exports.PInput = PInput;
// export interface PopupProps {
//   popupClass?: string
//   popupBody?: any,
//   popupHeader?: any,
//   popupFooter?: any,
//   children?: any,
//   closePopup: () => void
//   popupProps: {
//     [x: string]: any
//   }
//   [x: string]: any
// }
// export const Popup = (props: PopupProps) => {
//   const
//     { popupBody, popupClass, popupFooter, popupHeader, popupProps, children, closePopup } = props;
//   return <div id="popupElement" className="popup-overlay">
//     <div className={["popup", popupClass].join(" ")}>
//       { <div className="popup-header">{popupHeader &&<div className="header-content">{popupHeader}</div>}<div className="close" onClick={closePopup}>X</div></div>}
//       {popupBody && <div className="popup-body">{children}</div>}
//       {popupFooter && <div className="popup-footer">{popupFooter}</div>}
//     </div>
//   </div>
// }
var mapObjectToSelect = function (object, keyLabel, valueLabel) {
    var retObj = [];
    object === null || object === void 0 ? void 0 : object.forEach(function (item, idx) {
        retObj.push({ label: item[keyLabel], value: item[valueLabel] });
    });
    return retObj;
};
exports.mapObjectToSelect = mapObjectToSelect;
exports.baseApiUrl = "https://localhost:7156";
exports.axiosBaseConfig = {
    headers: { Authorization: "Bearer ".concat(getCookie("token")) }
};
var testFunc = function () {
};
exports.testFunc = testFunc;
var callApi = function (method, url, data) {
    var callUrl = "https://localhost:7156" + url;
    var axiosObj = {
        method: method,
        url: callUrl,
    };
    if (data != null)
        axiosObj.data = data;
};
exports.callApi = callApi;
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
exports.getCookie = getCookie;
//# sourceMappingURL=common.js.map