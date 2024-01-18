"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = exports.KeyValuePage = void 0;
var React = require("react");
var react_1 = require("react");
var ReactDOM = require("react-dom");
var common_1 = require("./common");
var axios_1 = require("axios");
var KeyValuePage = function () {
    var _a = (0, react_1.useState)([]), list = _a[0], setList = _a[1], _b = (0, react_1.useState)(false), addingNew = _b[0], setAddingNew = _b[1], getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(common_1.baseApiUrl + "/GetAllKeyValueList")];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    setList(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, newRow = React.createElement(exports.TableRow, { item: { id: -1, key: "", value: "" }, refreshFunc: getData, isNew: true });
    React.useEffect(function () {
        getData();
    }, []);
    return React.createElement("div", { className: "card mb-4" },
        React.createElement("form", { method: "post", className: "admin-form keyvalue-form" },
            React.createElement("div", { className: "form-top-container" },
                React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: function () { return setAddingNew(true); } }, "Dodaj nowy")),
            React.createElement("div", { className: "card-body px-0 pt-0 pb-2" },
                React.createElement("div", { className: "table-responsive p-0" },
                    React.createElement("table", { className: "table align-items-center mb-0" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" }, " Id"),
                                React.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" }, " Key"),
                                React.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" }, "Value"),
                                React.createElement("th", { className: "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" }, "Options"))),
                        React.createElement("tbody", null,
                            addingNew && newRow,
                            list.map(function (l, idk) { return React.createElement(exports.TableRow, { key: idk, item: l, refreshFunc: getData }); })))))));
};
exports.KeyValuePage = KeyValuePage;
var TableRow = function (props) {
    var item = props.item, refreshFunc = props.refreshFunc, _a = props.isNew, isNew = _a === void 0 ? false : _a, _b = (0, react_1.useState)(item.key), key = _b[0], setKey = _b[1], _c = (0, react_1.useState)(item.key), value = _c[0], setValue = _c[1], editItem = function () {
        var url = common_1.baseApiUrl + isNew ? "/AddKeyValue" : "/UpdateKeyValue";
        if (isNew) {
            if (key != "" && value != "")
                axios_1.default.post(url, { id: -1, key: key, value: value }, common_1.axiosBaseConfig);
        }
        else {
            axios_1.default.put(url, { id: item.id, key: key, value: value }, common_1.axiosBaseConfig);
        }
        refreshFunc();
    }, deleteItem = function () {
        var url = common_1.baseApiUrl + "/DeleteKeyValue/".concat(item.id);
        axios_1.default.delete(url, common_1.axiosBaseConfig);
        refreshFunc();
    };
    return React.createElement("tr", null,
        React.createElement("td", null,
            React.createElement("div", { className: "d-flex px-2 py-1" },
                React.createElement("div", null, item.id))),
        React.createElement("td", null,
            React.createElement("div", { className: "d-flex px-2 py-1" },
                React.createElement("input", { value: key, onInput: function (e) { return setKey(e.target.value); } }))),
        React.createElement("td", null,
            React.createElement("div", { className: "d-flex px-2 py-1" },
                React.createElement("input", { value: value, onInput: function (e) { return setValue(e.target.value); } }))),
        React.createElement("td", null,
            React.createElement("div", { className: "d-flex px-2 py-1 button-col" }, isNew ?
                React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: editItem }, "Dodaj")
                : React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-save", onClick: editItem }, "Edit"),
                    React.createElement("div", { className: "btn btn-white btn-sm w-100 mb-0 btn-delete", onClick: deleteItem }, "Delete")))));
};
exports.TableRow = TableRow;
var root = document.getElementById("react_root");
ReactDOM.render(React.createElement(exports.KeyValuePage, null), root);
//# sourceMappingURL=keyvalue.js.map