import UploadImage from "../database/models/01-upload.model";

const confirmPatch = async (measure_uuid: string, confirmed_value: number) => {
  const getModel = await UploadImage.findOne({
    where: {
      measure_uuid,
    },
  });
  
  if(!getModel){
    return "Leitura não encontrada";
  }

  const verifyValue = confirmed_value === getModel.measure_value ? true : false;

  if (!verifyValue) {
    await getModel.update({
      measure_value: confirmed_value,
      value_confirmed: true,
    });
  }

  await getModel.update({
    value_confirmed: true,
  });
};

export default confirmPatch;