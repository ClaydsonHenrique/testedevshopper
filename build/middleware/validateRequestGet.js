"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateGetListCustomer = (req, res, next) => {
    const customer = req.params.customer_code;
    const measureType = req.query.measure_type;
    if (!customer) {
        return res.status(400).json({
            error_code: "MISSING_CUSTOMER_CODE",
            error_description: "O campo 'customer_code' é obrigatório.",
        });
    }
    if (measureType && measureType !== "WATER" && measureType !== "GAS") {
        return res.status(400).json({
            error_code: "INVALID_TYPE",
            error_description: "Tipo de medição não permitida",
        });
    }
    next();
};
exports.default = validateGetListCustomer;
