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
const confirmPatch = (measure_uuid, confirmed_value) => __awaiter(void 0, void 0, void 0, function* () {
    const getModel = yield Measures_models_1.default.findOne({
        where: {
            measure_uuid,
        },
    });
    if (!getModel) {
        return "Leitura não encontrada";
    }
    const verifyValue = confirmed_value === getModel.measure_value ? true : false;
    if (!verifyValue) {
        yield getModel.update({
            measure_value: confirmed_value,
            value_confirmed: true,
        });
    }
    yield getModel.update({
        value_confirmed: true,
    });
});
exports.default = confirmPatch;
