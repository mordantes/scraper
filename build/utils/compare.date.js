"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDate = void 0;
const compareDate = (dts, dte) => {
    const dayStart = dts.getDate();
    const monthStart = dts.getMonth();
    const yearStart = dts.getFullYear();
    const dayEnd = dte.getDate();
    const monthEnd = dte.getMonth();
    const yearEnd = dte.getFullYear();
    return dayStart === dayEnd && monthEnd === monthStart && yearEnd === yearStart;
};
exports.compareDate = compareDate;
