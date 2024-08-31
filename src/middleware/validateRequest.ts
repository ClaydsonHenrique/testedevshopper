import { Request, Response, NextFunction } from "express";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { parseISO, isValid } from "date-fns";
import Measures from "../database/models/Measures.models";
import Customers from '../database/models/Customers.models';
import config from "../database/config/database";

const sequelize = new Sequelize(config);

const validateMeasurementRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, customer_code, measure_datatime, measure_type } = req.body;
  const errorCode = "INVALID_DATA";
  const status_error = 400;

  // verificando se algum item esta vazio
  if (!image || !customer_code || !measure_datatime || !measure_type) {
    return res.status(status_error).json({
      erro_code: errorCode,
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }

  // verificando imagem é valida
  if (!image.startsWith("data:image/")) {
    return res
      .status(status_error)
      .json({
        erro_code: errorCode,
        error_description: "A imagem fornecida é inválido",
      });
  }

  // verificando se customer é strings
  if (typeof customer_code !== "string") {
    console.log("erro customer");
    return res
      .status(status_error)
      .json({
        erro_code: errorCode,
        error_description: "O customer_code é inválido",
      });
  }

  // verificando se measure_datatime é uma data valida
  const parsedDate = parseISO(measure_datatime);
  if (!isValid(parsedDate)) {
    console.log("Invalid date:", measure_datatime);
    return res.status(status_error).json({
      erro_code: errorCode,
      error_description: "O measure_datatime esta no formato inválido",
    });
  }

  // verificando se measure_type é um tipo de medida valida
  if (measure_type != "WATER" && measure_type != "GAS") {
    return res.status(status_error).json({
      erro_code: errorCode,
      error_description: "O tipo deve ser WATER ou GAS",
    });
  }

  // validando se ja foi feita a consulta do mesmo tipo no mes

  const measureDate = new Date(measure_datatime);

  const verifyDouble = await Measures.findOne({
    include: [
      {
        model: Customers,
        as: "customer",
      },
    ],
    where: {
      measureType: measure_type,
      [Op.and]: [
        sequelize.where(
          sequelize.fn("DATE", sequelize.col("measure_datetime")),
          sequelize.fn("DATE", measureDate)
        ),
      ],
    },
  });

  if (verifyDouble) {
    console.log("erro requisitcao duplicada");
    return res.status(409).json({
      erro_code: "DOUBLE_REPORT",
      error_description: "Leitura do mês já realizada",
    });
  }

  next();
};

export default validateMeasurementRequest;
