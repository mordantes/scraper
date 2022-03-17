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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProductsFromPage = void 0;
const utils_1 = require("../utils");
function parseProductsFromPage(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield page.evaluate(() => {
                var _a, _b, _c;
                try {
                    const price = [];
                    const goods = document.querySelectorAll(".item_info");
                    for (let i = 0; i < goods.length; i++) {
                        const prices = goods[i].children[2].children;
                        const goodLink = ("https://" +
                            document.domain +
                            ((_a = goods[i].children[0].firstElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute("href")));
                        if (prices.length === 1) {
                            price.push({
                                goodName: goods[i].children[0].children[0].textContent.replace(/\s$/, ""),
                                price: {
                                    old: parseInt(goods[i].children[2].children[0].children[1].children[0]
                                        .children[0].textContent),
                                    new: 0,
                                },
                                link: goodLink,
                                category: (_b = document.querySelector("#pagetitle")) === null || _b === void 0 ? void 0 : _b.innerHTML,
                                shopName: 'spar'
                            });
                        }
                        else {
                            price.push({
                                goodName: goods[i].children[0].children[0].textContent.replace(/\s$/, ""),
                                price: {
                                    old: parseInt(goods[i].children[2].children[0].children[1].children[0]
                                        .children[0].textContent),
                                    new: parseInt(goods[i].children[2].children[1].children[1].children[0]
                                        .children[0].textContent),
                                },
                                link: goodLink,
                                category: (_c = document.querySelector("#pagetitle")) === null || _c === void 0 ? void 0 : _c.innerHTML,
                                shopName: 'spar'
                            });
                        }
                    }
                    return price;
                }
                catch (e) {
                    throw e;
                }
            });
            return products.map((e) => (Object.assign(Object.assign({}, e), { _id: (0, utils_1.extractId)(e.link) })));
        }
        catch (e) {
            throw e;
        }
    });
}
exports.parseProductsFromPage = parseProductsFromPage;
