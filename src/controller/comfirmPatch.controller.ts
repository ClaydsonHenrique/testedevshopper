import { Request, Response } from "express";
import confirmMeasure from "../services/confirmPatch.service";

const confirmPatchController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { measure_uuid, confirmed_value } = req.body;
  const result = await confirmMeasure(measure_uuid, confirmed_value);

  if (result === "Leitura não encontrada") {
    return res.status(404).json({
      erro_code: "MEASURE_NOT_FOUND",
      error_description: "Leitura do mês já realizada",
    });
  }

  return res.status(200).json({ success: true });
};

export default confirmPatchController;
