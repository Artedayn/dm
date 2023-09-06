import { ServiceHostNames } from '@/enums/ServiceHostNames';

export type TEnv = 'prod' | 'rc' | 'dev';

export type TServicesConfig = Record<ServiceHostNames, string>;

export type TConfig = Record<TEnv, TServicesConfig>;
