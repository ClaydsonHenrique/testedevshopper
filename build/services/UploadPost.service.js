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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _01_upload_model_1 = __importDefault(require("../database/models/01-upload.model"));
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const imagemPath = path.join(__dirname, "..", "imagens", "agua.jpg");
const imagemFile = fs.readFileSync(imagemPath).toString("base64");
const imageGenerativePart = (base64, mimeType) => {
    return {
        inlineData: {
            data: base64,
            mimeType,
        },
    };
};
const uploadPostService = () => __awaiter(void 0, void 0, void 0, function* () {
    const modelIa = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "quantos litros tem";
    const mimeType = "image/jpeg";
    const imagemPart = imageGenerativePart(imagemFile, mimeType);
    const result = yield modelIa.generateContent([prompt, imagemPart]);
    const image = result.response.text();
    const data = new Date();
    const mounth = data.getMonth();
    console.log(mounth);
    // const createDatabase = await uploadModel.create({
    //   image: imagemFile,
    //   customerCode: uuid(),
    //   measureDatetime: data,
    //   measureType: 'Water'
    // });
    const createDatabase = yield _01_upload_model_1.default.findAll();
    console.log(createDatabase);
    return image;
});
exports.default = uploadPostService;
