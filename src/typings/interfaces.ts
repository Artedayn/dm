export interface IOptions {
  value: string;
  label: string;
}

export interface ICreateItem {
  commandmentNr: string;
  dateOn: string;
  productCode: number;
  productType: number;
  interval: number;
  password: string;
  payAccountId: string;
  campaignNr: string;
  priceName: string;
  productNewNum: string;
  intervalType: number;
  timeToLive: number;
}

export interface ICreateMassItem {
  CommandmentNr: string;
  DateOn: string;
  ProductCode: number;
  ProductType: number;
  Interval: number;
  Password: string;
  PayAccountId: string;
  CampaignNr: string;
  PriceName: string;
  ProductNewNum: string;
  TimeToLive: string;
}

export interface IGetMassive {
  commandmentNr: string;
}

export interface IGetMassiveResponse {
  priceListNum: string;
  productType1: number;
  publicationCode: number;
  intervaMounth: number;
  productName: string;
  result: true;
}

export interface IUploadFile {
  fileName: string;
}

export interface ICodeResult {
  code: '101' | '102' | '103' | '104';
}

export interface BatchGeneration {
  [key: string]: string;
}

export interface IProduct {
  name: string;
  type: string;
  bill: string;
  commandmentNr: string;
  dateOn: string;
  productCode: string;
  productType: string;
  interval: string;
  dateStart: string;
  dateTo: string;
  postfix: string;
  bitrix: string;
  tipID: string;
  priceName: string;
  productNewNum: string;
}
