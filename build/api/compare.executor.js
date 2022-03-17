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
exports.compareExecutor = void 0;
const models_1 = require("../models");
const _1 = require(".");
const fs_1 = require("fs");
const initConnection_1 = require("../utils/initConnection");
const compareExecutor = (parsed, dt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, initConnection_1.initMongoConnection)();
        const dbProducts = yield models_1.ProductModel.find({});
        const compared = (0, _1.compareProducts)(parsed, dbProducts, dt);
        const deleteAll = yield models_1.ProductModel.deleteMany();
        const mongoModels = yield Promise.all(compared.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            return yield new models_1.ProductModel(product);
        })));
        const bulkSave = yield models_1.ProductModel.bulkSave(mongoModels);
        yield (0, _1.saveProducts)(compared, 'result');
        (0, fs_1.writeFileSync)('mongoModels.json', JSON.stringify(mongoModels, null, 4), 'utf-8');
        (0, fs_1.writeFileSync)('compared.json', JSON.stringify(compared, null, 4), 'utf-8');
        console.log('deleted - ', deleteAll);
        console.log(mongoModels.length, 'models');
        console.log('inserted - ', bulkSave.insertedCount);
        console.log(dbProducts.length, 'from BD');
        console.log(parsed.length, 'from site');
        console.log(compared.length, 'from comparing');
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.compareExecutor = compareExecutor;
