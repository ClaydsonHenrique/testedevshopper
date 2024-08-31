import Measures from "../database/models/Measures.models";

const confirmMeasure = async (
  measureUuid: string,
  confirmedValue: number
): Promise<string | void> => {
  const measureRecord = await Measures.findOne({
    where: {
      measure_uuid: measureUuid,
    },
  });

  if (!measureRecord) {
    return "Leitura não encontrada";
  }
  const isValueSame = confirmedValue === measureRecord.measure_value;

  if (!isValueSame) {
    await measureRecord.update({
      measure_value: confirmedValue,
      value_confirmed: true,
    });
  }

  await measureRecord.update({
    value_confirmed: true,
  });
};

export default confirmMeasure;
