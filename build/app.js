"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = __importDefault(require("./controller/upload.controller"));
const validateRequest_1 = __importDefault(require("./middleware/validateRequest"));
const validateResquestPatch_1 = __importDefault(require("./middleware/validateResquestPatch"));
const comfirmPatch_controller_1 = __importDefault(require("./controller/comfirmPatch.controller"));
const listMeasuremets_controller_1 = __importDefault(require("./controller/listMeasuremets.controller"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "imagens")));
app.post("/upload", validateRequest_1.default, upload_controller_1.default);
app.patch("/confirm", validateResquestPatch_1.default, comfirmPatch_controller_1.default);
app.get('/:customer_code/list', listMeasuremets_controller_1.default);
exports.default = app;
