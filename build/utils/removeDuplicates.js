"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = void 0;
const fs_1 = require("fs");
function removeDuplicates(array, f) {
    try {
        const copyArray = array.map(e => e[f]);
        const fix = copyArray.filter((elem, pos) => {
            return copyArray.indexOf(elem) === pos;
        });
        const result = [];
        for (const id of fix) {
            const target = array.find(e => e[f] === id);
            if (target) {
                result.push(target);
            }
        }
        (0, fs_1.writeFileSync)('123.json', JSON.stringify(result, null, 4), 'utf-8');
        return result;
    }
    catch (e) {
        return array;
    }
}
exports.removeDuplicates = removeDuplicates;
