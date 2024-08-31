import { execSync } from "child_process";
import sinon from "sinon";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { imageFailMock, validMock, datatimeInvalid } from "./mocks/upload.mock";
import app from "../app";

chai.use(chaiHttp);

describe("/upload", function () {
  beforeEach(function () {
    sinon.restore();
  });
  it("Verificando erro ao passar algum dos dados vazio", async () => {
    const requestBody = imageFailMock;

    const httpResponse = await chai
      .request(app)
      .post("/upload")
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.deep.equal({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  });
  it("Leitura do mês já realizada", async () => {
    const requestBody = validMock;
    await chai.request(app).post("/upload").send(requestBody);
    const httpResponse = await chai
      .request(app)
      .post("/upload")
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(409);
    expect(httpResponse.body).to.deep.equal({
      error_code: "DOUBLE_REPORT",
      error_description: "Leitura do mês já realizada",
    });
  });
  it("Verificando erro ao passar datatime no formato inválido", async () => {
    const requestBody = datatimeInvalid;
    await chai.request(app).post("/upload").send(requestBody);
    const httpResponse = await chai
      .request(app)
      .post("/upload")
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.deep.equal({
      error_code: "INVALID_DATA",
      error_description: "O measure_datatime esta no formato inválido",
    });
  });
});
