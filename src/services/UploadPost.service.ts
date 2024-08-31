import Measures from "../database/models/Measures.models";
import Customers from "../database/models/Customers.models";
import {
  generateLinkForImage,
  saveBase64AsImage,
} from "../utils/image.utils";

const { v4: uuid } = require("uuid");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const uploadPostService = async (
  base64Image: string,
  customerCode: string,
  measurementDateTime: Date,
  measurementType: string
) => {
  const fileName = `${uuid()}.png`;
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const imageUrl = generateLinkForImage(fileName);

  const generativeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = "quantos litros tem ?, apenas a quantidade";
  const mimeType = "image/jpeg";
  const imagePart = saveBase64AsImage(base64Data, mimeType);

  const result = await generativeModel.generateContent([prompt, imagePart]);

   const measureValueText = result.response.text();
   const measureValue = measureValueText.match(/\d+/g)?.join("") || "0";

  const currentDate = new Date();

  const mounth = currentDate.getMonth();
  console.log(mounth);
  const measure_uuid = uuid();

  let isexistCustomers = await Customers.findOne({
    where: {
      customerCode: customerCode,
    },
  });

  if (!isexistCustomers || isexistCustomers === null) {
    isexistCustomers = await Customers.create({
      customerCode: customerCode,
    });
  }
  console.log(isexistCustomers, "veirifando se o erro esta aqui ");
  await Measures.create({
    image: imageUrl,
    customerId: isexistCustomers.id,
    measureDatetime: measurementDateTime,
    measureType: measurementType,
    measure_value: Number(measureValue),
    value_confirmed: false,
    measure_uuid,
  });

  return {
    image_url: imageUrl,
    measure_value: measureValue,
    measure_uuid,
  };
};

export default uploadPostService;
