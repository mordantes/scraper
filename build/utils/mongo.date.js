"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDate = void 0;
const mongoDate = (dd, mm, yy) => {
    const startDate = new Date();
    const day = dd === undefined
        ? startDate.getDate() < 9
            ? "0" + startDate.getDate()
            : startDate.getDate()
        : dd;
    const month = mm === undefined ? startDate.getMonth() + 1 : mm + 1;
    const year = yy === undefined ? new Date().getFullYear() : yy;
    return `${year}-${month}-${day} 12:00:00`;
};
exports.mongoDate = mongoDate;
