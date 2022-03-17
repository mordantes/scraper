"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function genFilename(dt, fileName) {
    return `${fileName}-${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}.json`;
}
exports.default = genFilename;
