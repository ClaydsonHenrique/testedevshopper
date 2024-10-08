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
const UploadPost_service_1 = __importDefault(require("../services/UploadPost.service"));
const uploadControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, customer_code, measure_datatime, measure_type } = req.body;
    const dados = yield (0, UploadPost_service_1.default)(image, customer_code, measure_datatime, measure_type);
    console.log(dados);
    res.status(201).json(dados);
});
exports.default = uploadControler;
