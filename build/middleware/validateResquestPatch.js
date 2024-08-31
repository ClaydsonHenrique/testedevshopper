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
const validateRequestPatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { measure_uuid, confirmed_value } = req.body;
    if (!measure_uuid || !confirmed_value) {
        return res.status(400).json({
            erro_code: "INVALID_DATA",
            error_description: "O campo 'measure_uuid' e 'confirmed_value'são obrigatório.",
        });
    }
    if (typeof measure_uuid != 'string' || typeof confirmed_value != 'number') {
        return res.status(400).json({
            erro_code: "INVALID_DATA",
            error_description: "O parâmetro 'measure_uuid' deve ser uma string e 'confirmed_value' deve ser um número.",
        });
    }
    const getRequest = yield Measures_models_1.default.findOne({ where: { measure_uuid } });
    if (!getRequest) {
        return res.status(404).json({
            erro_code: "MEASURE_NOT_FOUND",
            error_description: "Leitura do mês já realizada",
        });
    }
    if (getRequest.value_confirmed) {
        return res.status(409).json({
            erro_code: "CONFIRMATION_DUPLICATE",
            error_description: "Leitura do mês já realizada",
        });
    }
    next();
});
exports.default = validateRequestPatch;
