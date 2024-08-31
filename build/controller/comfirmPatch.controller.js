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
const confirmPatch_service_1 = __importDefault(require("../services/confirmPatch.service"));
const confirmPatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { measure_uuid, confirmed_value } = req.body;
    const result = yield (0, confirmPatch_service_1.default)(measure_uuid, confirmed_value);
    if (result === "Leitura não encontrada") {
        return res.status(404).json({
            erro_code: "MEASURE_NOT_FOUND",
            error_description: "Leitura do mês já realizada",
        });
    }
    return res.status(200).json({ success: true });
});
exports.default = confirmPatchController;
