export  interface IUpload {
  id: number;
  image: string;
  customerCode: string;
  measureDatetime: Date;
  measureType: string;
  measure_uuid: string;
  measure_value: string;
  value_confirmed: boolean;
}

export  interface IConsultas {
  image: string;
  customerCode: string;
  measureDatetime: Date;
  measureType: string;
}