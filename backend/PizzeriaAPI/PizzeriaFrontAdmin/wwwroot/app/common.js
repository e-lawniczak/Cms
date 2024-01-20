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
exports.getCookie = exports.callApi = exports.testFunc = exports.axiosBaseConfig = exports.baseApiUrl = exports.PInput = exports.Image = exports.PageWrapper = exports.PageSettingsSection = void 0;
var React = __importStar(require("react"));
var PageSettingsSection = function () {
    return React.createElement("section", { className: "settings-section" });
};
exports.PageSettingsSection = PageSettingsSection;
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
var PageWrapper = function (props) {
    return React.createElement("div", { className: ["react-page", props.className].join(" ") }, props.children);
};
exports.PageWrapper = PageWrapper;
var Image = function (props) {
    var imageClass = props.imageClass, src = props.src, _a = props.onImageClick, onImageClick = _a === void 0 ? function () { } : _a, item = props.item;
    return React.createElement("div", { className: ['img-container', imageClass].join(" "), onClick: function (e) { return onImageClick(item, e); } },
        React.createElement("img", { src: src }));
};
exports.Image = Image;
var PInput = function (props) {
    var register = props.register, inputClass = props.inputClass, wrapperClass = props.wrapperClass, inputProps = props.inputProps;
    return React.createElement("div", { className: ['input-wrapper', wrapperClass].join(" ") },
        React.createElement("input", __assign({}, register, { className: ['input-field', inputClass].join(" ") }, inputProps)));
};
exports.PInput = PInput;
exports.baseApiUrl = "https://localhost:7156";
exports.axiosBaseConfig = {
    headers: {
        'Bearer': getCookie("token"),
    }
};
var testFunc = function () {
    console.log("działasswss");
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