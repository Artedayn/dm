import apiDM, { ApiDM } from './modules/ApiDM';

export interface IApi {
  apiDM: ApiDM;
}

const api: IApi = {
  apiDM,
};

export default api;
