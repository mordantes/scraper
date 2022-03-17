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
exports.parsePage = void 0;
const _1 = require(".");
const parsePage = (browser, uri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = [];
        const page = yield browser.newPage();
        yield page.goto(uri, { waitUntil: "domcontentloaded" });
        const currentGoods = yield (0, _1.parseProductsFromPage)(page);
        const hasArrow = yield page.evaluate(() => {
            const isFlip = document.querySelector('#right_block_ajax > div.inner_wrapper > div.ajax_load.cur.block > div.bottom_nav.animate-load-state.block-type > div.module-pagination > div > ul > li > a.flex-next');
            return isFlip && isFlip.href;
        });
        yield page.close();
        result.push(...currentGoods);
        if (hasArrow) {
            const flipped = yield (0, exports.parsePage)(browser, hasArrow);
            result.push(...flipped);
            return result;
        }
        return result;
    }
    catch (e) {
        throw e;
    }
});
exports.parsePage = parsePage;
