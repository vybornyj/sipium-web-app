"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyYmdhm = void 0;
var with0 = function (num) { return "" + (num > 9 ? '' : 0) + num; };
exports.prettyYmdhm = function (date) {
    var d = new Date(date);
    return d.getFullYear() + "." + with0(d.getMonth() + 1) + "." + with0(d.getDate()) + " " + with0(d.getHours()) + ":" + with0(d.getMinutes());
};
