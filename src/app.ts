import express from 'express'
import uploadControler from './controller/upload.controller';
import validateRequest from './middleware/validateRequest';
import path from 'path';
const app = express();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "imagens")));
app.get("/upload",validateRequest, uploadControler);


export default app;