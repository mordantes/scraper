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
exports.executor = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const executor = (browser, uriArray, workerName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = [];
        for (const menuLink of uriArray) {
            const menuTime = (0, utils_1.stopWatch)(new Date());
            const goods = yield (0, _1.parsePage)(browser, menuLink.uri);
            const viewedResult = {
                execDate: menuTime(new Date()),
                targetUrl: menuLink.uri,
                parsedSize: goods.length,
                currentPlace: uriArray.indexOf(menuLink) + 1,
                totalSize: uriArray.length,
                workerName
            };
            console.log(JSON.stringify(viewedResult, null, 4));
            result.push(...goods);
        }
        return result;
    }
    catch (e) {
        throw e;
    }
});
exports.executor = executor;
