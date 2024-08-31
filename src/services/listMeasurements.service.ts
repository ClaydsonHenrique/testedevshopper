import Customers from "../database/models/Customers.models";
import Measures from "../database/models/Measures.models";

const getCustomerMeasurements = async (
  customerCode: string,
  measureType?: string
) => {
  const customer = (await Customers.findOne({
    where: { customerCode },

    include: [
      {
        model: Measures,
        as: "measures",
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: {
      exclude: ["id"],
    },
  })) as any;

  if (!customer) {
    throw new Error("Customer não encontrado");
  }

  if (measureType && measureType.length > 0) {
    console.log("entrou aqui");
    const filteredMeasures = customer.measures.filter(
      (measure: Measures) =>
        measure.measureType.toUpperCase() === measureType.toUpperCase()
    );
    customer.measures = filteredMeasures;
  }

  return customer;
};

export default getCustomerMeasurements;
