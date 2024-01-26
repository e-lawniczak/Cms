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
exports.ChangePass = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var common_1 = require("./common");
var react_hook_form_1 = require("react-hook-form");
var axios_1 = __importDefault(require("axios"));
var bcryptjs_react_1 = __importDefault(require("bcryptjs-react"));
var ChangePass = function () {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1], _b = (0, react_hook_form_1.useForm)(), register = _b.register, handleSubmit = _b.handleSubmit, onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!(data.password.length > 0 && data.confirmPassword.length > 0 && data.password == data.confirmPassword)) return [3 /*break*/, 4];
                    _b = (_a = axios_1.default).post;
                    _c = [common_1.baseApiUrl + "/ChangePassword"];
                    _d = {};
                    return [4 /*yield*/, bcryptjs_react_1.default.hash(data.confirmPassword, "$2a$12$LdSGL/4rQGQYLbXbJH3ks.")];
                case 1:
                    _d.confirmPassword = _e.sent();
                    return [4 /*yield*/, bcryptjs_react_1.default.hash(data.password, "$2a$12$LdSGL/4rQGQYLbXbJH3ks.")];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.password = _e.sent(),
                            _d), common_1.axiosBaseConfig]))];
                case 3:
                    res = _e.sent();
                    if (res.status == 200) {
                        alert("Password changed");
                        window.location.href = "/Logout";
                    }
                    else {
                        alert("Something went wrong. Contact administrator\n" + res.statusText);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    alert("Passwords must match\n");
                    _e.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
    }, []);
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "row" },
            React.createElement("form", { method: "post", onSubmit: handleSubmit(onSubmit), className: 'account-form login-form' },
                React.createElement("div", { className: "form-group" },
                    React.createElement("input", __assign({}, register("password"), { placeholder: 'new password', type: "password" }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("input", __assign({}, register("confirmPassword"), { placeholder: 'confirm password', type: "password" }))),
                React.createElement("button", { type: "submit" }, "Change password"))));
};
exports.ChangePass = ChangePass;
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.ChangePass, null), root);
//# sourceMappingURL=changePass.js.map