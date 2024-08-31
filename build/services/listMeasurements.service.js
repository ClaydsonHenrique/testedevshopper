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
const Customers_models_1 = __importDefault(require("../database/models/Customers.models"));
const Measures_models_1 = __importDefault(require("../database/models/Measures.models"));
const getCustomerMeasurements = (customerCode, measureType) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = (yield Customers_models_1.default.findOne({
        where: { customerCode },
        include: [
            {
                model: Measures_models_1.default,
                as: "measures",
                attributes: {
                    exclude: ["id"],
                },
            },
        ],
        attributes: {
            exclude: ["id"],
        },
    }));
    if (!customer) {
        throw new Error("Customer não encontrado");
    }
    if (measureType && measureType.length > 0) {
        console.log("entrou aqui");
        const filteredMeasures = customer.measures.filter((measure) => measure.measureType.toUpperCase() === measureType.toUpperCase());
        customer.measures = filteredMeasures;
    }
    return customer;
});
exports.default = getCustomerMeasurements;
