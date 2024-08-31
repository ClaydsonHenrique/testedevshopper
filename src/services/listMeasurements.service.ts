import Customers from "../database/models/Customers.models";
import Measures from "../database/models/Measures.models";

const getCustomerMeasurements = async (
  costumer: string,
  measures_type: string
) => {
  const getCustomer = await Customers.findOne({
    where: { customerCode: costumer },

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
  }) as any;

  if (!getCustomer) {
    throw new Error("Customer not found");
  }

  if (measures_type && measures_type.length > 0) {
    console.log('entrou aqui')
    const measuresType = measures_type.toUpperCase();
    const getCustomerMeasures = getCustomer.measures.filter(
      (measure: Measures) => measure.measureType.toUpperCase() === measuresType
    );
    getCustomer.measures = getCustomerMeasures;
  }

  return getCustomer;
};

export default getCustomerMeasurements;
