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
const Measures_models_1 = __importDefault(require("../database/models/Measures.models"));
const Customers_models_1 = __importDefault(require("../database/models/Customers.models"));
const image_utils_1 = require("../utils/image.utils");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const uploadPostService = (base64, customer_code, measure_datatime, measure_type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const fileName = `${uuid()}.png`;
    const base64data = base64.replace(/^data:image\/\w+;base64,/, "");
    const imagePath = (0, image_utils_1.convertBase64InImage)(base64data, fileName);
    const image_url = (0, image_utils_1.generateLinkForImage)(fileName);
    const generativeModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    const prompt = "quantos litros tem ?, apenas a quantidade";
    const mimeType = "image/jpeg";
    const imagePart = (0, image_utils_1.saveBase64AsImage)(base64data, mimeType);
    const result = yield generativeModel.generateContent([prompt, imagePart]);
    console.log(result.response.text());
    const measure_value = ((_a = result.response.text().match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.join("")) || "0";
    const currentDate = new Date();
    const mounth = currentDate.getMonth();
    console.log(mounth);
    const measure_uuid = uuid();
    let isexistCustomers = yield Customers_models_1.default.findOne({
        where: {
            customerCode: customer_code,
        },
    });
    if (!isexistCustomers || isexistCustomers === null) {
        isexistCustomers = yield Customers_models_1.default.create({
            customerCode: customer_code,
        });
    }
    console.log(isexistCustomers, 'veirifando se o erro esta aqui ');
    yield Measures_models_1.default.create({
        image: image_url,
        customerId: isexistCustomers.id,
        measureDatetime: measure_datatime,
        measureType: measure_type,
        measure_value: Number(measure_value),
        value_confirmed: false,
        measure_uuid,
    });
    return {
        image_url,
        measure_value,
        measure_uuid,
    };
});
exports.default = uploadPostService;
