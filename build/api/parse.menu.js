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
exports.parseMenu = void 0;
const parseMenu = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield page.evaluate(() => {
            const hrefs = document.querySelectorAll("div.catalog_block ul.dropdown li.m_line.v_hover");
            return Array.from(hrefs).map((node) => {
                if (node.classList.contains('has-child')) {
                    return {
                        uri: "https://" + document.domain + node.firstElementChild.getAttribute('href'),
                        subParagraph: true
                    };
                }
                else {
                    return {
                        uri: "https://" + document.domain + node.firstElementChild.getAttribute('href'),
                        subParagraph: false
                    };
                }
            });
        });
    }
    catch (e) {
        throw e;
    }
});
exports.parseMenu = parseMenu;
