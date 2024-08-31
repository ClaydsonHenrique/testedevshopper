import { Request, Response } from "express";
import uploadPostService from "../services/UploadPost.service";

const uploadControler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { image, customer_code, measure_datatime, measure_type } = req.body;
  const responseData = await uploadPostService(
    image,
    customer_code,
    measure_datatime,
    measure_type
  );
  return res.status(201).json(responseData);
};

export default uploadControler;  