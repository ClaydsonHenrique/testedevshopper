"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = __importDefault(require("./controller/upload.controller"));
const app = (0, express_1.default)();
app.get("/upload", upload_controller_1.default);
exports.default = app;
