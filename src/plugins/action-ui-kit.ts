// Added action-ui-kit
import Vue from 'vue';
import actionUiKit from '@arm-seller/action-ui-kit-min';
import '@arm-seller/action-ui-kit-min/action-ui-min.css';

declare module 'vue/types/vue' {
  interface Vue {
    $auiNotify(params: Record<string, unknown>): void;
    $auiPopupMenu(params: Record<string, unknown>): void;
    $localStorage(params: Record<string, unknown>): void;
  }
}

Vue.use(actionUiKit);
