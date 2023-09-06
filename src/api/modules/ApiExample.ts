import { RequestResultStatuses } from '@/enums/RequestResultStatuses';
import { ServiceHostNames } from '@/enums/ServiceHostNames';
import { ApiModule } from '../ApiModule';

interface IGetItemRequestResponse {
  success: boolean;
}

export interface IApiExampleGetItemResponse {
  success: boolean;
}

export class ApiExample extends ApiModule {
  protected serviceHostName = ServiceHostNames.Mock;

  public async getItem(id?: number): Promise<IApiExampleGetItemResponse> {
    let success: boolean;

    try {
      const response = await this.get<IGetItemRequestResponse>({
        path: '/api/v1/item_get',
        params: {
          id,
        },
      });

      success =
        response.status === RequestResultStatuses.Success
          ? response.data?.success ?? false
          : false;
    } catch (error) {
      success = false;
    }

    return { success };
  }
}

export default new ApiExample();
