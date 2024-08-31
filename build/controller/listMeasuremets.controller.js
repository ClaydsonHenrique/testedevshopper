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
const listMeasurements_service_1 = __importDefault(require("../services/listMeasurements.service"));
const listCustomerMeasurer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.params.customer_code;
    const measureType = req.query.measure_type;
    ;
    const getListCustomerMeasures = yield (0, listMeasurements_service_1.default)(customer, measureType || "");
    res.status(200).json(getListCustomerMeasures);
});
exports.default = listCustomerMeasurer;
