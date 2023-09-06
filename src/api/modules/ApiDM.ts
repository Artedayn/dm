import { RequestResultStatuses } from '@/enums/RequestResultStatuses';
// import { ServiceHostNames } from '@/enums/ServiceHostNames';
import { ICodeResult } from '../../typings/interfaces';
import { ApiModule } from '../ApiModule';
import {
  ICreateItem,
  ICreateMassItem,
  IUploadFile,
} from '@/typings/interfaces';

export class ApiDM extends ApiModule {
  public async createItem(data: ICreateItem) {
    // @ts-ignore: Unreachable code error
    const response = await this.post({
      path: `/api/public/v1/bill/create_item?commandmentNr=${data.commandmentNr}&dateOn=${data.dateOn}&campaignNr=${data.campaignNr}&productCode=${data.productCode}&productType=${data.productType}&interval=${data.interval}&password=${data.password}&payAccountId=${data.payAccountId}&priceName=${data.priceName}&productNewNum=${data.productNewNum}&intervalType=${data.intervalType}&timeToLive=${data.timeToLive}`,
    });
    // https://dm.action-press.ru/BillService.svc/CreateItem?commandmentNr=2023-06_77531/C&dateOn=2023-08-01&campaignNr=4407&productCode=1531&productType=3&interval=2&password=apdms513&payAccountId=F88A0590-A4B2-E911-BBA3-00155D627F03&priceName=&productNewNum=&intervalType=100000002&timeToLive=30

    return response.status === RequestResultStatuses.Success ? response : false;
  }

  public async createMassitem(data: ICreateMassItem) {
    const response = await this.post({
      path: '/api/public/v1/bill/create_massitem',
      data,
    });

    return response.status === RequestResultStatuses.Success ? response : false;
  }

  public async getMassItem(commandmentNr: string) {
    try {
      const response = await this.get<any>({
        path: '/api/public/v1/getmassitem',
        params: {
          commandmentNr,
        },
      });

      return response.status === RequestResultStatuses.Success
        ? response.data
        : null;
    } catch (error) {
      console.error('api error', error);
    }

    return null;
  }

  public async getReadCSVFile() {
    try {
      const response = await this.get<any>({
        path: '/api/v1/publicationcodes/readcsvfile',
      });

      return response.status === RequestResultStatuses.Success
        ? response.data
        : null;
    } catch (error) {
      console.error('api error', error);
    }

    return null;
  }

  public async uploadFile(data: IUploadFile) {
    const response = await this.post({
      path: '/api/v1/publicationcodes/uploadfile',
      data,
    });

    return response.status === RequestResultStatuses.Success ? response : false;
  }
}

export default new ApiDM();
