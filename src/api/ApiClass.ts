import { stringify } from 'qs';
import { AxiosError, AxiosResponse, Method } from 'axios';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ServiceHostNames } from '@/enums/ServiceHostNames';
import { RequestResultStatuses } from '@/enums/RequestResultStatuses';
import { TEnv } from '@/typings/config';

let _envSpace: TEnv = 'dev';
const _authCookies: {
  Cookie?: string;
} = {};

export type TRequestResultData<T> = T | null;

export type TRequestResultError = {
  source:
    | 'server'
    | 'invalid'
    | 'auth'
    | 'access'
    | 'network'
    | 'local'
    | 'unknown';
  message?: string;
};

export interface IRequestConfigGet {
  path: string;
  method: Extract<Method, 'get'>;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface IRequestConfigPost<T> {
  path: string;
  method: Extract<Method, 'post'>;
  params?: Record<string, unknown>;
  data: T;
  headers?: Record<string, string>;
}

export interface IRequestConfigFinal {
  path: string;
  method: Extract<Method, 'get' | 'post'>;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  serviceHostName?: ServiceHostNames;
}

export interface TRequestResultSuccess<T> {
  status: RequestResultStatuses.Success;
  data: TRequestResultData<T>;
}

export interface TRequestResultFailure {
  status: RequestResultStatuses.Failure;
  error: TRequestResultError;
}

/** Авторизационные заголовки, предоставлеяемые ИРМА */
export interface IAuthHeadersObject {
  /** Идентификатор пользователя. */
  'X-Manager-Id': string;
  /** Информация о пользователе, кодированная в base64. */
  'X-Manager-Info': string;
  /** Права пользователя для данного приложения, кодированные в base64. */
  'X-Manager-Rights': string;
}

export type TRequestResult<T> =
  | TRequestResultSuccess<T>
  | TRequestResultFailure;

export interface IServerResponseError {
  message: string;
  code: number;
}

export class ApiClass {
  static axios: NuxtAxiosInstance | null;

  // static cookies: (requestResult: any) => void = () => {};

  // static globalRequestErrorHandler: (requestResult: any) => void = () => null;

  static init(axiosInstance: NuxtAxiosInstance, env?: typeof _envSpace): void {
    ApiClass.axios = axiosInstance;

    if (env) {
      _envSpace = env;
    }
  }

  static setGlobalRequestErrorHandler(
    handler: (error: TRequestResultError) => void,
  ): void {
    if (typeof handler !== 'function') {
      throw new TypeError(
        `Невозможно зарегистрировать глобальный обработчик ошибки апи-запроса:
        не передан обработчик - ${handler}.`,
      );
    }

    // ApiClass.globalRequestErrorHandler = handler;
  }

  static setCookies(cookies: string): void {
    _authCookies.Cookie = cookies;
  }

  static setHeaders(headers: IAuthHeadersObject): void {
    const axios = ApiClass.axios;

    if (!axios) {
      throw new Error(
        'Ошибка установки headers апи-модуля: отсутствует инстанс "axios".',
      );
    }

    if (typeof headers !== 'object') {
      throw new TypeError(
        'Ошибка установки headers апи-модуля: некорректное значение.',
      );
    }

    Object.entries(headers).forEach(headerItem => {
      axios.setHeader(headerItem[0], headerItem[1]);
    });
  }

  static async request<T>({
    method,
    params,
    data,
    path,
    headers = {},
  }: IRequestConfigFinal): Promise<TRequestResult<T>> {
    if (!ApiClass.axios) {
      // eslint-disable-next-line
      console.error(
        `Unable to make a request.
        The api module is not initialized: there is no "axios" instance.`,
      );

      return {
        status: RequestResultStatuses.Failure,
        error: {
          source: 'local',
          message: 'API-модуль не инициализирован!',
        },
      };
    }

    let requestResult: TRequestResult<T> = {
      status: RequestResultStatuses.Failure,
      error: { source: 'local' },
    };

    await ApiClass.axios
      .request<string, AxiosResponse>({
        method,
        params,
        data,
        url: path,
        paramsSerializer: params => {
          // 'a=b&a=c&a=d...'
          return stringify(params, { arrayFormat: 'repeat' });
        },
        headers,
      })
      .then(response => {
        requestResult = {
          status: RequestResultStatuses.Success,
          data: response.data,
        };
      })
      .catch((error: AxiosError) => {
        /** Сервер ответил ошибкой */
        if (error.response) {
          if (error.response.status === 500) {
            // внутренняя ошибка сервера
            requestResult = {
              status: RequestResultStatuses.Failure,
              error: { source: 'server' },
            };
          } else if (error.response.status === 401) {
            // не авторизован (истек токен и т.п.)
            requestResult = {
              status: RequestResultStatuses.Failure,
              error: { source: 'auth' },
            };
          } else if (error.response.status === 404) {
            // не найдено
            requestResult = {
              status: RequestResultStatuses.Failure,
              error: { source: 'invalid', message: '404' },
            };
          } else if (error.response.status === 400) {
            const errorInfo: IServerResponseError = {
              message: 'Error',
              code: 400,
            }; // error.response.data[0];

            requestResult = {
              status: RequestResultStatuses.Failure,
              error: {
                source: 'invalid',
                message: errorInfo.message,
              },
            };
          } else {
            // не известный статус ошибки
            requestResult = {
              status: RequestResultStatuses.Failure,
              error: { source: 'unknown' },
            };
          }
        } else if (error.request) {
          // какая-то ошибка сети (offline, низкая скорость, CORS,...)
          requestResult = {
            status: RequestResultStatuses.Failure,
            error: { source: 'network' },
          };
        }

        // ApiClass.globalRequestErrorHandler(requestResult);
      });

    return requestResult;
  }

  static get<T>(config: Omit<IRequestConfigGet, 'method'>) {
    return ApiClass.request<T>({
      ...config,
      method: 'get',
    });
  }

  static post<T>(config: Omit<IRequestConfigPost<T>, 'method'>) {
    return ApiClass.request<T>({
      ...config,
      method: 'post',
      data: config.data,
    });
  }
}
