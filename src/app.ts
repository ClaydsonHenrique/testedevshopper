import express from 'express'
import uploadControler from './controller/upload.controller';
import validateRequest from './middleware/validateRequest';
import validateRequestPatch from './middleware/validateResquestPatch';
import confirmPatchController from './controller/comfirmPatch.controller';
import listCustomerMeasurer from './controller/listMeasuremets.controller';
import path from 'path';
const app = express();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "imagens")));
app.post("/upload",validateRequest, uploadControler);

app.patch("/confirm",validateRequestPatch,confirmPatchController );

app.get('/:customer_code/list', listCustomerMeasurer)


export default app;