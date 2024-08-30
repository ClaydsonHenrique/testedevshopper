export  interface IUpload {
  id: number;
  image: string;
  customerCode: string;
  measureDatetime: Date;
  measureType: string;
  measure_uuid: string;
  confirmed_value: boolean;
}

export  interface IConsultas {
  image: string;
  customerCode: string;
  measureDatetime: Date;
  measureType: string;
}