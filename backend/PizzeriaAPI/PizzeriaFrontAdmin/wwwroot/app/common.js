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
exports.PInput = exports.Image = exports.getCookie = exports.callApi = exports.testFunc = exports.axiosBaseConfig = exports.baseApiUrl = void 0;
var React = __importStar(require("react"));
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
var Image = function (props) {
    var imageClass = props.imageClass, src = props.src;
    return React.createElement("div", { className: ['img-container', imageClass].join(" ") },
        React.createElement("img", { src: src }));
};
exports.Image = Image;
var PInput = function (props) {
    var register = props.register, inputClass = props.inputClass, wrapperClass = props.wrapperClass, inputProps = props.inputProps;
    return React.createElement("div", { className: ['input-wrapper', wrapperClass].join(" ") },
        React.createElement("input", __assign({}, register, { className: ['input-field', inputClass].join(" ") }, inputProps)));
};
exports.PInput = PInput;
//# sourceMappingURL=common.js.map