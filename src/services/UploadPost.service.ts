import uploadModel from "../database/models/01-upload.model";
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const imagemPath = path.join(__dirname, "..", "imagens", "agua.jpg");
const imagemFile = fs.readFileSync(imagemPath).toString("base64");

const imageGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

const uploadPostService = async () => {
  const modelIa = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "quantos litros tem";
  const mimeType = "image/jpeg";
  const imagemPart = imageGenerativePart(imagemFile, mimeType);
  const result = await modelIa.generateContent([prompt, imagemPart]);
  const image = result.response.text();

  const data = new Date();
  const mounth = data.getMonth();
  console.log(mounth);

  // const createDatabase = await uploadModel.create({
  //   image: imagemFile,
  //   customerCode: uuid(),
  //   measureDatetime: data,
  //   measureType: 'Water'
  // });

  const createDatabase = await uploadModel.findAll();

  console.log(createDatabase);
  return image;
};

export default uploadPostService;
