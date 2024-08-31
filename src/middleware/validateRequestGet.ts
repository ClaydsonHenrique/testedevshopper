import { Request, Response, NextFunction } from "express";

const validateGetListCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
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

export default validateGetListCustomer;
