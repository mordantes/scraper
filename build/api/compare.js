"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPrice = exports.compareProducts = void 0;
const utils_1 = require("../utils");
const compareProducts = (parsed, nested, date) => {
    if (nested.length === 0) {
        return parsed.map((product) => {
            const { price } = product, other = __rest(product, ["price"]);
            return Object.assign(Object.assign({}, other), { actual: (0, utils_1.compareDate)(date, new Date()), offer: (0, exports.extractPrice)(price, "new"), prices: [{
                        price: (0, exports.extractPrice)(price, "old"),
                        date: date
                    }] });
        });
    }
    else {
        return parsed.map((product) => {
            const exists = findById(nested, product._id);
            const { price } = product, other = __rest(product, ["price"]);
            if (!exists) {
                return Object.assign(Object.assign({}, other), { actual: (0, utils_1.compareDate)(date, new Date()), offer: (0, exports.extractPrice)(price, "new"), prices: [{
                            price: (0, exports.extractPrice)(price, "old"),
                            date: date
                        }] });
            }
            else {
                const { prices } = exists;
                const existPrice = prices.some(val => val.price === (0, exports.extractPrice)(product.price, "old"));
                const newOnePrices = !existPrice ? [
                    ...exists.prices,
                    {
                        price: (0, exports.extractPrice)(product.price, "old"),
                        date: date
                    }
                ] : exists.prices;
                return Object.assign(Object.assign({}, other), { actual: (0, utils_1.compareDate)(date, new Date()), offer: (0, exports.extractPrice)(product.price, "new") || false, prices: newOnePrices.sort((a, b) => a.date > b.date ? 1 : -1) });
            }
        });
    }
};
exports.compareProducts = compareProducts;
const findById = (array, id) => {
    const target = array.find((elem) => elem._id === id);
    if (!target)
        return false;
    return target;
};
const extractPrice = (price, field) => {
    return typeof price === 'object' ? (0, utils_1.stringToNumber)(price[field]) : (0, utils_1.stringToNumber)(price);
};
exports.extractPrice = extractPrice;
