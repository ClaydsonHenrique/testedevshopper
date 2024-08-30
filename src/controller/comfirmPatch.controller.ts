import { Request, Response } from "express";
import confirmPatch from "../services/confirmPatch.service";

const confirmPatchController = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;
  const result = await confirmPatch(measure_uuid, confirmed_value);
  if (result === "Leitura não encontrada") {
    return res.status(404).json({ message: "Leitura do mês já realizada" });
  }
    return res.status(200).json({ success: true });
};

export default confirmPatchController;
