"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function Analyze() {
    try {
        const data3 = JSON.parse((0, fs_1.readFileSync)('base/result-27-2-2022.json', 'utf-8'));
        const dates = ['2022-02-22T10:00:00.000Z', '2022-02-25T18:56:44.126Z', '2022-02-27T17:52:27.279Z'];
        const compared = data3.map((e) => {
            const price22 = e.prices.filter((e) => e.date.indexOf(dates[0]) > -1);
            const price25 = e.prices.filter((e) => e.date.indexOf(dates[1]) > -1);
            const price27 = e.prices.filter((e) => e.date.indexOf(dates[3]) > -1);
            const lastPrice = e.prices.filter((e) => !(e.date in dates)).sort((a, b) => a.date > b.date ? -1 : 1);
            const newProd = {
                goodName: e.goodName,
                category: e.category,
                actual: e.actual,
                start: e.prices.sort((a, b) => a.date < b.date ? -1 : 1)[0],
                end: e.prices.sort((a, b) => a.date > b.date ? -1 : 1)[0]
            };
            if (price22.length && price25.length && price27.length) {
                return Object.assign(Object.assign({}, newProd), { changeLast: price27[0].price - price22[0].price, change25: price27[0].price - price25[0].price });
            }
            if (price25.length && price27.length) {
                return Object.assign(Object.assign({}, newProd), { changeLast: price27[0].price - price25[0].price });
            }
            if (price22.length && price27.length) {
                return Object.assign(Object.assign({}, newProd), { changeLast: price27[0].price - price22[0].price });
            }
            return Object.assign(Object.assign({}, newProd), { change: lastPrice[0] && lastPrice[1] && lastPrice[0].price - lastPrice[1].price });
        });
        const onlyChange = compared.filter((e) => 'changeLast' in e);
        (0, fs_1.writeFileSync)('compared.json', JSON.stringify(onlyChange, null, 4), 'utf-8');
    }
    catch (e) {
        console.log(e);
    }
}
exports.default = Analyze;
Analyze();
