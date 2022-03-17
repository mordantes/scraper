"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToNumber = void 0;
const stringToNumber = (val) => {
    if (typeof val === 'string') {
        return parseInt(val);
    }
    return val;
};
exports.stringToNumber = stringToNumber;
