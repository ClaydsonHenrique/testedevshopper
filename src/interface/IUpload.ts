export interface ICustomers {
  id: number;
  customerCode: string;
}

export interface IUpload {
  id: number;
  customerId: number;
  image: string;
  measureDatetime: Date;
  measureType: string;
  measure_uuid: string;
  measure_value: string;
  value_confirmed: boolean;
}

export interface IConsultas {
  image: string;
  customerCode: string;
  measureDatetime: Date;
  measureType: string;
}
