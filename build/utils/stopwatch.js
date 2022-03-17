"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopWatch = void 0;
const stopWatch = (startTime) => (endTime) => `Exec time is ${(endTime.getTime() - startTime.getTime()) / 1000} seconds.`;
exports.stopWatch = stopWatch;
