import { ApiServicesConfig } from './configs/ApiServicesConfig';
import { ServiceHostNames } from './enums/ServiceHostNames';
const resolve = require('path').resolve;
import { getHostsConfig } from './utils/configHelpers';

global.HTMLElement =
  typeof window === 'undefined' ? Object : window.HTMLElement;

/** Environment variables */
const { ENVIRONMENT = 'dev' } = process.env;
const hostsConfig = getHostsConfig(process.env);
const VUE_APP_BUILD_VER = process.env.npm_package_version;
const VUE_APP_NAME = 'frontend-template';

const isDebug = ENVIRONMENT === 'dev';
/** end Environment variables */
const hostVacation = ApiServicesConfig.getConnectionString(
  ENVIRONMENT,
  ServiceHostNames.dm,
);
/** end Connection strings */

export default {
  debug: isDebug,
  vue: {
    config: {
      devtools: isDebug,
    },
  },
  env: {
    VUE_APP_NAME,
    VUE_APP_BUILD_VER,
    ENVIRONMENT,
  },
  /**
   * Config is available using $config in both server and client.
   */
  publicRuntimeConfig: {
    isDevBuild: isDebug,
    buildVersion: VUE_APP_BUILD_VER,
    envName: ENVIRONMENT,
    hostsConfig,
  },
  /**
   * Headers of the page
   */
  head: {
    title: 'Frontend Template CRM',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /**
   * Customize the progress-bar color
   */
  loading: { color: '#FFFFFF' },
  /**
   * Global CSS
   */
  css: [
    '~/assets/styles/fonts.styl',
    '~/assets/styles/custom.styl',
    '~/assets/styles/main.css',
  ],
  styleResources: {
    stylus: ['./assets/styles/mixins.styl', '~/assets/styles/variables.styl'],
  },
  layouts: {
    'print-layout': '~/layouts/print.vue',
    // Другие макеты...
  },
  /**
   * Plugins to load before mounting the App
   */
  plugins: ['~plugins/action-ui-kit', '~plugins/setupApp'],
  /**
   * Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/universal-storage',
    [
      'nuxt-stylus-resources-loader',
      [resolve(__dirname, 'assets/styles/*.styl')],
    ],
  ],
  /**
   * Nuxt.js dev-modules (that are only required during development and build time).
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/style-resources'],
  /**
   * Typescript configuration
   */
  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}',
      },
    },
  },
  /**
   * Router module configuration
   */
  router: {},
  /**
   * Universal storage module configuration
   */
  storage: {
    vuex: {
      namespace: `storage_${VUE_APP_NAME}`,
    },
    cookie: {
      prefix: VUE_APP_NAME,
      options: {
        path: '/',
      },
    },
    localStorage: {
      prefix: VUE_APP_NAME,
    },
    ignoreExceptions: false,
  },
  /**
   * Axios module configuration
   * {@link https://axios.nuxtjs.org/options.html}
   */
  axios: {
    debug: false,
    https: false,
    proxy: true,
    proxyHeaders: true,
    progress: true,
  },
  /**
   * HTTP proxy configuration
   */
  proxy: {
    '/api/': {
      target: hostVacation,
      logLevel: 'debug',
    },
  },
  /**
   * Build configuration
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ];
      },
    },
    extend(config, ctx) {
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  // API
  serverMiddleware: {
    '/_/status': './serverMiddleware/api/status.ts',
  },
};
