import { Request, Response } from "express";
import uploadPostService from "../services/UploadPost.service";

const uploadControler = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datatime, measure_type } = req.body;
  const dados = await uploadPostService(image, customer_code, measure_datatime, measure_type);
  console.log(dados)
  res.status(201).json(dados);
};

export default uploadControler;  