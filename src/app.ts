import express from "express";
import uploadControler from "./controller/upload.controller";
import validateMeasurementRequest from "./middleware/validateRequest";
import validatePatchRequest from "./middleware/validateResquestPatch";
import confirmPatchController from "./controller/comfirmPatch.controller";
import listCustomerMeasurements from "./controller/listMeasuremets.controller";
import validateGetListCustomer from "./middleware/validateRequestGet";
import path from "path";
const app = express();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "imagens")));
app.post("/upload", validateMeasurementRequest, uploadControler);

app.patch("/confirm", validatePatchRequest, confirmPatchController);

app.get(
  "/:customer_code/list",
  validateGetListCustomer,
  listCustomerMeasurements
);

export default app;
