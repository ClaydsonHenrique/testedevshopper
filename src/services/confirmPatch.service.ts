import UploadImage from '../database/models/01-upload.model'

const confirmPatch = async (measure_uuid: string, confirmed_value: number) => {
  const getModel = await UploadImage.findOne({
    where: {
      measure_uuid,
    },
  });
  if(!getModel) {
    return "Leitura não encontrada";
  }
  
};