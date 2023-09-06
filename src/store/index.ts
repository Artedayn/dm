import { Module, createStore as smartCreateStore } from 'vuex-smart-module';
import { app } from './modules/app';

const rootModule = new Module({
  modules: {
    app,
  },
});

const vuexOptions = {
  strict: process.env.NODE_ENV !== 'production',
};

export default () => {
  return smartCreateStore(rootModule, vuexOptions);
};
