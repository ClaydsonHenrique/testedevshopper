import { Request, Response } from "express";
import uploadPostService from "../services/UploadPost.service";

const uploadControler = async (req: Request, res: Response) => {
  const dados = await uploadPostService();
  console.log(dados)
  res.status(201).json(dados);
};

export default uploadControler;  