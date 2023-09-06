import { ApiClass, IRequestConfigGet, IRequestConfigPost } from './ApiClass';

export type THeaders = Record<string, string>;

export abstract class ApiModule {
  protected headers: THeaders | undefined;

  protected setHeaders(headers: THeaders): void {
    this.headers = headers;
  }

  protected get<T>(config: Omit<IRequestConfigGet, 'method'>) {
    return ApiClass.get<T>({
      ...config,
      headers: {
        ...config.headers,
        ...this.headers,
      },
    });
  }

  protected post<T>(config: Omit<IRequestConfigPost<T>, 'method'>) {
    return ApiClass.post<T>({
      ...config,
      headers: {
        ...config.headers,
        ...this.headers,
      },
    });
  }
}
