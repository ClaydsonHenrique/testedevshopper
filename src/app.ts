import express from 'express'
import uploadControler from './controller/upload.controller';
const app = express();

app.get("/upload", uploadControler);


export default app;