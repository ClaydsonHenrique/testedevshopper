import uploadModel from "../database/models/01-upload.model";
import {
  generateLinkForImage,
  convertBase64InImage,
  saveBase64AsImage,
} from "../utils/image.utils";

const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const uploadPostService = async (
  base64: string,
  customer_code: string,
  measure_datatime: Date,
  measure_type: string
) => {
  
  const fileName = `${uuid()}.png`;
   const base64data = base64.replace(/^data:image\/\w+;base64,/, "");
  const imagePath = convertBase64InImage(base64data, fileName);
  const image_url = generateLinkForImage(fileName);

  const generativeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = "quantos litros tem";
  const mimeType = "image/jpeg";
  const imagePart = saveBase64AsImage(base64data, mimeType);
  const result = await generativeModel.generateContent([prompt, imagePart]);
  const measure_value = result.response.text();

  const currentDate = new Date();

  const mounth = currentDate.getMonth();
  console.log(mounth);

  const createdRecord = await uploadModel.create({
    image: base64,
    customerCode: customer_code,
    measureDatetime: measure_datatime,
    measureType: measure_type,
  });

  const measure_uuid = uuid();

  return {
    image_url,
    measure_value,
    measure_uuid,
  };
};

export default uploadPostService;
