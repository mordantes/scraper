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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const configStore = process.env;
const puppeteer_1 = __importDefault(require("puppeteer"));
const _1 = require(".");
const utils_1 = require("../utils");
function Main(shopname) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (shopname) {
            case 'spar': {
                try {
                    const browser = yield puppeteer_1.default.launch({
                        headless: true,
                        defaultViewport: {
                            width: 1920,
                            height: 1080,
                        },
                    });
                    const page = yield browser.newPage();
                    yield page.goto(configStore.SPAR_URL, { waitUntil: "domcontentloaded" });
                    const categories = yield (0, _1.parseMenu)(page);
                    yield page.close();
                    const first = [
                        ...categories.slice(0, 4),
                        ...categories.slice(16, 24),
                    ];
                    const second = [
                        ...categories.slice(4, 16),
                    ];
                    const products = yield Promise.all([
                        (0, _1.executor)(browser, first, 'first worker'),
                        (0, _1.executor)(browser, second, 'second worker')
                    ]);
                    const total = yield Promise.all(products.reduce((tally, curr) => {
                        tally.push(...curr);
                        return tally;
                    }, []));
                    const uniq = (0, utils_1.removeDuplicates)(total, '_id');
                    yield (0, _1.saveProducts)(uniq, 'products');
                    yield (0, _1.compareExecutor)(uniq, new Date());
                }
                catch (e) {
                    console.log(e);
                }
            }
            default: return null;
        }
    });
}
exports.default = Main;
