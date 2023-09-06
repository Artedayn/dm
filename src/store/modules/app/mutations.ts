import { Mutations } from 'vuex-smart-module';
import { AppState } from './state';

export class AppMutations extends Mutations<AppState> {
  /** Сохраняем авторизационные заголовки */
  setExampleSuccess(value: boolean) {
    this.state.exampleSuccess = value;
  }
}
