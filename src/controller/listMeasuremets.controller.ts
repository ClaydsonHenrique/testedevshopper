import { Request, Response } from "express";
import getCustomerMeasurements from "../services/listMeasurements.service";

const listCustomerMeasurer = async (req: Request, res: Response) => {
  const customer = req.params.customer_code;
  const measureType = req.query.measure_type as string | undefined;

  const getListCustomerMeasures = await getCustomerMeasurements(
    customer,
    measureType || ""
  );
  if (!getCustomerMeasurements) {
    return res.status(404).json({ message: "Nenhuma leitura encontrada" });
  }
  res.status(200).json(getListCustomerMeasures);
};

export default listCustomerMeasurer;
