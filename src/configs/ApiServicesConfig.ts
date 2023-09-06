import { TConfig, TEnv, TServicesConfig } from '@/typings/config';
import { ServiceHostNames } from '@/enums/ServiceHostNames';
const ENV_HOST_PREFIX = 'HOST_';

const CONFIG: TConfig = {
  prod: {
    mock:
      'https://backend-mock.prod.mock.aservices.tech/mock/frontend-template-crm',
    dm: 'http://facade-eshop.prod.eshop.aservices.tech/',
  },
  rc: {
    mock:
      'https://backend-mock.prod.mock.aservices.tech/mock/frontend-template-crm',
    dm: 'http://stable-bills-eshop.rc.eshop.aservices.tech/',
  },
  dev: {
    mock:
      'https://backend-mock.prod.mock.aservices.tech/mock/frontend-template-crm',
    dm: 'http://master-bills-eshop.dev.eshop.aservices.tech/',
  },
};

// const CONFIG: TConfig = {
//   prod: {
//     mock: 'https://master-taskscheduler-eshop.dev.eshop.aservices.tech/',
//   },
//   rc: {
//     mock: 'https://master-taskscheduler-eshop.dev.eshop.aservices.tech/',
//   },
//   dev: {
//     mock: 'https://master-taskscheduler-eshop.dev.eshop.aservices.tech/',
//   },
// };

export class ApiServicesConfig {
  static env: TEnv = 'rc';
  static hosts: Partial<TServicesConfig> = {};

  static setEnv(env: TEnv) {
    ApiServicesConfig.env = env;
  }

  static setHosts(hosts: Partial<TServicesConfig>) {
    ApiServicesConfig.hosts = hosts;
  }

  static getConfig(): TServicesConfig {
    return {
      ...CONFIG[ApiServicesConfig.env],
      ...ApiServicesConfig.hosts,
    };
  }

  static getConnectionString(env: TEnv, service: ServiceHostNames): string {
    const envHosts = ApiServicesConfig.getHostsConfig(process.env);

    return envHosts[service] || CONFIG[env][service];
  }

  static getHostsConfig(env: object): Record<string, string> {
    return Object.entries(env).reduce(
      ApiServicesConfig.getEnvReducer(
        ENV_HOST_PREFIX,
        ApiServicesConfig.getNameFormatter(ENV_HOST_PREFIX),
      ),
      {},
    );
  }

  private static convertUpperSnakeCaseToCamelCase(name: string) {
    const lowerCase = name.toLowerCase();

    return lowerCase.replace(/_([a-z])/g, (match, letter) =>
      letter.toUpperCase(),
    );
  }

  private static getNameFormatter(prefix: string) {
    return (name: string) => {
      const prefixRegExp = new RegExp(`^${prefix}`);
      const nameWithoutPrefix = name.replace(prefixRegExp, '');

      return ApiServicesConfig.convertUpperSnakeCaseToCamelCase(
        nameWithoutPrefix,
      );
    };
  }

  private static getEnvReducer(
    prefix: string,
    nameFormatter: (arg: string) => string,
  ) {
    console.log('reducing HOSTS from proccess.env');

    return (accum: Record<string, string>, hostEnvRecord: Array<string>) => {
      const [key, value] = hostEnvRecord;

      if (key.startsWith(prefix) && value !== undefined) {
        const formattedKey = nameFormatter(key);

        /* TODO: удалить после тестирование перехода на vault */
        console.log(formattedKey, value);

        return {
          ...accum,
          [formattedKey]: value,
        };
      }

      return accum;
    };
  }
}
