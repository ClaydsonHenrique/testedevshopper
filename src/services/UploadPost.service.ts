import { IConsultas } from "../interface/IUpload";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const img =
  "iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAACqmgfMAAAAAXNSR0IArs4c6QAAAO9JREFUOBGVkzsOwjAMREuOguMo6Si6SQnyATlUL2BO4M91uJqsiZ6cDgjRJe7ItgvPw4CxVAjP8B4X20xQWhJ+ABkOAKj9IjD2owJFP9P+4BgO6MlMFID0VoFlFNAnLRM0wj4SV3GcmShACwTaMe5xObAuXtAFRITRSIqkthU4cp5UVTcDICGLmJHDTcn9rIYQafQACW0Yj7q1dbbA6GRMX0b7iYbVqsfEZJvdpIBs2JmKwcQqnp7f7kM5H1v4H+gAAAABJRU5ErkJggg==";

const decodeBase64 = async (base64: string) => {
  console.log("verificando img", base64);
  const buf = Buffer.from(base64, "base64").toString("utf-8");

  await fs.writeFile("src/imagens/imagem.png", buf, (error: Error) => {
    if (error) {
      console.error("Invalid", error);
    } else {
      console.log("File created");
      return true;
    }
  });
  return base64;
};

const uploadPostService = async () => {
  const base64 = await decodeBase64(img);
  console.log("verificando base64", base64);
  return base64;
};

export default uploadPostService;
