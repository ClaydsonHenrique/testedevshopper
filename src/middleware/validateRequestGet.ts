import { Request, Response, NextFunction } from "express";

const validateGetListCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.params.customer_code;
  const measureType = req.query.measure_type;

  if (!measureType || !customer) {
    return res
      .status(400)
      .json({ message: "cutomer_code e measure_type necessario" });
  }
  
  if(measureType !== 'WATER' && measureType !== 'GAS'){
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
  }
};
