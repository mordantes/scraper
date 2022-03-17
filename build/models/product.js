"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        required: true,
    },
    goodName: {
        type: String,
        required: true,
    },
    offer: {
        type: Number || Boolean,
        required: true,
    },
    actual: {
        type: Boolean,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        require: true,
    },
    prices: {
        type: Array,
        requre: true
    }
});
exports.ProductSchema = ProductSchema;
const ProductModel = (0, mongoose_1.model)("products2", ProductSchema);
exports.ProductModel = ProductModel;
