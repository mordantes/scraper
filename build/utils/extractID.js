"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractId = void 0;
const extractId = (uri) => {
    const match = uri.match(/\/\d+\/$/g);
    return parseInt(match[0].replace(/\//g, ''));
};
exports.extractId = extractId;
