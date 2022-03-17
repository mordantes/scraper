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
const models_1 = require("../../models");
const initConnection_1 = require("../../utils/initConnection");
const fs_1 = require("fs");
function Bulk() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, initConnection_1.initMongoConnection)();
            const dbProducts = yield models_1.ProductModel.find();
            const content = JSON.parse((0, fs_1.readFileSync)('final.json', 'utf-8'));
            const models = [];
            for (const prod of content) {
                const productModel = new models_1.ProductModel(prod);
                models.push(productModel);
            }
            (0, fs_1.writeFileSync)('models.json', JSON.stringify(models, null, 4), 'utf-8');
            const deleteAll = yield models_1.ProductModel.deleteMany();
            console.log('deleted - ', deleteAll);
            console.log(dbProducts.length, 'models');
            const bulkSave = yield models_1.ProductModel.bulkSave(models);
            console.log('inserted - ', bulkSave.insertedCount);
        }
        catch (e) {
            console.log(e);
        }
    });
}
Bulk();
