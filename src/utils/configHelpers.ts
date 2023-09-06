import { ServiceHostNames } from '@/enums/ServiceHostNames';
import { TServicesConfig } from '@/typings/config';

const ENV_HOST_PREFIX = 'HOST_';

function convertUpperSnakeCaseToCamelCase(name: string): string {
  const lowerCase = name.toLowerCase();
  const camelCase = lowerCase.replace(/_([a-z])/g, (match, letter) =>
    letter.toUpperCase(),
  );

  return camelCase;
}

function getFormattedEnvHostName(name: string): ServiceHostNames {
  const prefixRegExp = new RegExp(`^${ENV_HOST_PREFIX}`);
  const nameWithoutPrefix = name.replace(prefixRegExp, '');
  const formattedName = convertUpperSnakeCaseToCamelCase(nameWithoutPrefix);

  return formattedName as ServiceHostNames;
}

export function getHostsConfig(
  env: NodeJS.ProcessEnv,
): Partial<TServicesConfig> {
  const envHosts = Object.entries(env).reduce((hosts, [key, value]) => {
    if (key.startsWith(ENV_HOST_PREFIX) && value !== undefined) {
      const formattedKey = getFormattedEnvHostName(key);

      return {
        ...hosts,
        [formattedKey]: value,
      };
    }

    return hosts;
  }, {} as Partial<TServicesConfig>);

  return envHosts;
}
