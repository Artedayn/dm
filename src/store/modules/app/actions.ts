import { Actions } from 'vuex-smart-module';
import { AppState } from './state';
import { AppGetters } from './getters';
import { AppMutations } from './mutations';
import apiExample from '@/api/modules/ApiExample';

export class AppActions extends Actions<
  AppState,
  AppGetters,
  AppMutations,
  AppActions
> {
  async getExample() {
    const response = await apiExample.getItem();

    this.mutations.setExampleSuccess(response.success);
  }
}
