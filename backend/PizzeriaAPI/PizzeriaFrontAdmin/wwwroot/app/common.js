"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = exports.callApi = exports.testFunc = exports.axiosBaseConfig = exports.baseApiUrl = void 0;
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