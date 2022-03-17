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
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../../utils");
const __1 = require("..");
function analyz() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oldData = (0, fs_1.readdirSync)('base2');
            const newData = (0, fs_1.readdirSync)('base');
            const oldDataObj = oldData.reduce((tally, curr) => {
                const content = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)('base2', curr), 'utf-8'));
                const file = curr.replace('links-', '').replace('links', '').replace('.txt', '').split('-');
                const [month, day, year] = file;
                const trueContent = content.map((e) => {
                    var _a, _b;
                    if (typeof e.price === 'object') {
                        return {
                            _id: (0, utils_1.extractId)(e.link),
                            category: e.category,
                            goodName: e.goodName,
                            link: e.link,
                            price: {
                                old: (0, __1.extractPrice)(e.price, 'old'),
                                new: (0, __1.extractPrice)(e.price, 'new')
                            },
                            shopName: (_a = e.price.shopName) !== null && _a !== void 0 ? _a : 'spar'
                        };
                    }
                    else {
                        return {
                            _id: (0, utils_1.extractId)(e.link),
                            category: e.category,
                            goodName: e.goodName,
                            link: e.link,
                            price: {
                                old: parseInt(e.price.toString().match(/\d+/g)[0]),
                                new: 0
                            },
                            shopName: (_b = e.price.shopName) !== null && _b !== void 0 ? _b : 'spar'
                        };
                    }
                });
                tally.push({
                    content: trueContent,
                    data: (0, utils_1.mongoDate)(parseInt(day), parseInt(month), parseInt(year))
                });
                return tally;
            }, []);
            (0, fs_1.writeFileSync)('final2.json', JSON.stringify(oldDataObj.slice(0, 10), null, 4), 'utf-8');
            const newDataObj = newData.filter(e => e.indexOf('products') > -1)
                .reduce((tally, curr) => {
                const content = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)('base', curr), 'utf-8'));
                const [name, day, month, year] = curr.split('-');
                tally.push({
                    content,
                    data: (0, utils_1.mongoDate)(parseInt(day), parseInt(month) - 1, parseInt(year))
                });
                return tally;
            }, []);
            (0, fs_1.writeFileSync)('final3.json', JSON.stringify(newDataObj.slice(0, 10), null, 4), 'utf-8');
            const history = [...oldDataObj, ...newDataObj].sort((a, b) => a.data > b.data ? 1 : -1);
            const compared = history.reduce((tally, current) => {
                const compared = (0, __1.compareProducts)(current.content, tally, new Date(current.data));
                return compared;
            }, []);
            (0, fs_1.writeFileSync)('final.json', JSON.stringify(compared.sort((a, b) => a.prices.length > b.prices.length ? -1 : 1), null, 4), 'utf-8');
        }
        catch (e) {
            console.log(e);
        }
    });
}
analyz();
