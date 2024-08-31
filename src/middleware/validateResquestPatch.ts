import { Request, Response, NextFunction } from "express";
import Measures from "../database/models/Measures.models";

const validatePatchRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { measure_uuid, confirmed_value } = req.body;

  if (!measure_uuid || !confirmed_value) {
    return res.status(400).json({
      erro_code: "INVALID_DATA",
      error_description:
        "O campo 'measure_uuid' e 'confirmed_value'são obrigatório.",
    });
  }

  if (typeof measure_uuid !== "string" || typeof confirmed_value !== "number") {
    return res.status(400).json({
      erro_code: "INVALID_DATA",
      error_description:
        "O parâmetro 'measure_uuid' deve ser uma string e 'confirmed_value' deve ser um número.",
    });
  }

  const measureRecord = await Measures.findOne({ where: { measure_uuid } });

  if (!measureRecord) {
    return res.status(404).json({
      erro_code: "MEASURE_NOT_FOUND",
      error_description: "Leitura do mês já realizada",
    });
  }
  if (measureRecord.value_confirmed) {
    return res.status(409).json({
      erro_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura do mês já realizada",
    });
  }
  next();
};

export default validatePatchRequest;