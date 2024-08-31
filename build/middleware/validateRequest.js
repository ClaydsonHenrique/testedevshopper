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
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const date_fns_1 = require("date-fns");
const Measures_models_1 = __importDefault(require("../database/models/Measures.models"));
const Customers_models_1 = __importDefault(require("../database/models/Customers.models"));
const database_1 = __importDefault(require("../database/config/database"));
const sequelize = new sequelize_1.Sequelize(database_1.default);
const validateRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, customer_code, measure_datatime, measure_type } = req.body;
    const erro_code = "INVALID_DATA";
    const status_error = 400;
    // verificando se algum item esta vazio
    if (!image || !customer_code || !measure_datatime || !measure_type) {
        return res.status(status_error).json({
            erro_code,
            error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        });
    }
    // verificando imagem é valida
    if (!image.startsWith("data:image/")) {
        return res
            .status(status_error)
            .json({ erro_code, error_description: "A imagem fornecida é inválido" });
    }
    // verificando se customer é strings
    if (typeof customer_code !== "string") {
        console.log("erro customer");
        return res
            .status(status_error)
            .json({ erro_code, error_description: "O customer_code é inválido" });
    }
    // verificando se measure_datatime é uma data valida
    const parsedDate = (0, date_fns_1.parseISO)(measure_datatime);
    if (!(0, date_fns_1.isValid)(parsedDate)) {
        console.log("Invalid date:", measure_datatime);
        return res
            .status(status_error)
            .json({ erro_code, error_description: "O measure_datatime esta no formato inválido" });
    }
    // verificando se measure_type é um tipo de medida valida
    if (measure_type != "WATER" && measure_type != "GAS") {
        return res
            .status(status_error)
            .json({
            erro_code,
            error_description: "O tipo deve ser WATER ou GAS",
        });
    }
    // validando se ja foi feita a consulta do mesmo tipo no mes
    const measureDate = new Date(measure_datatime);
    const month = measureDate.getMonth() + 1;
    const year = measureDate.getFullYear();
    const verifyDouble = yield Measures_models_1.default.findOne({
        include: [
            {
                model: Customers_models_1.default,
                as: 'customer',
            },
        ],
        where: {
            measureType: measure_type,
            [sequelize_2.Op.and]: [
                sequelize.where(sequelize.fn("DATE", sequelize.col("measure_datetime")), sequelize.fn("DATE", measureDate)),
            ],
        },
    });
    if (verifyDouble) {
        console.log("erro requisitcao duplicada");
        return res.status(409).json({
            erro_code: "DOUBLE_REPORT",
            error_description: "Leitura do mês já realizada",
        });
    }
    next();
});
exports.default = validateRequest;
