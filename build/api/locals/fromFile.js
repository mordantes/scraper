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
exports.SaveFromFile = void 0;
const fs_1 = require("fs");
const __1 = require("..");
const utils_1 = require("../../utils");
const SaveFromFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mochaData = JSON.parse((0, fs_1.readFileSync)('base/products-3-3-2022.json', 'utf-8'));
        const mochaBase = JSON.parse((0, fs_1.readFileSync)('base/result-3-3-2022.json', 'utf-8'));
        const uniq = (0, utils_1.removeDuplicates)(mochaData, '_id');
        const compared = (0, __1.compareProducts)(uniq, mochaBase, new Date());
        console.log(mochaData.length, 'products');
        console.log(mochaBase.length, 'base');
        console.log(compared.length, 'result');
        console.log(uniq.length, 'uniq');
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.SaveFromFile = SaveFromFile;
(0, exports.SaveFromFile)();
