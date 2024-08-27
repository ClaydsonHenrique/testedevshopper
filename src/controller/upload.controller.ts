import { Request, Response } from "express";
import uploadPostService from "../services/UploadPost.service";

const uploadControler = (req: Request, res: Response) => {
  const dados = uploadPostService();
  res.status(201).json(dados);
};

export default uploadControler;  