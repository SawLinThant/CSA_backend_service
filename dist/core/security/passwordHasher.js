"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHasher = void 0;
const argon2_1 = __importDefault(require("argon2"));
exports.passwordHasher = {
    hash: (plain) => argon2_1.default.hash(plain),
    verify: (hash, plain) => argon2_1.default.verify(hash, plain),
};
//# sourceMappingURL=passwordHasher.js.map