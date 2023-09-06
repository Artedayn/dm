import { Module, createMapper } from 'vuex-smart-module';
import { AppState } from './state';
import { AppGetters } from './getters';
import { AppMutations } from './mutations';
import { AppActions } from './actions';

export const app = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations,
  actions: AppActions,
});

export const appMapper = createMapper(app);
