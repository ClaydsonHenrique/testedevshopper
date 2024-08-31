import { Request, Response } from "express";
import getCustomerMeasurements from "../services/listMeasurements.service";

const listCustomerMeasurements = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const customerCode = req.params.customer_code;
  const measureType = req.query.measure_type as string | undefined;

  const customerMeasurements = await getCustomerMeasurements(
    customerCode,
    measureType || ""
  );
  if (!customerMeasurements || customerMeasurements.measures.length === 0) {
    return res.status(404).json({ message: "Nenhuma leitura encontrada" });
  }
  return res.status(200).json(customerMeasurements);
};

export default listCustomerMeasurements;
