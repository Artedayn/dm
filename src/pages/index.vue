<template>
  <div id="page" class="aui-flex aui-flex-center" :class="$style.page">
    <div
      class="aui-flex aui-justify-center aui-position-relative"
      :class="$style.colorHead"
    >
      <TogglePages
        v-if="!selectedPage"
        :d-m-toggle="DMToggle"
        @selectType="selectType"
      />
    </div>
    <div :class="$style.content">
      <div
        v-if="!selectedPage"
        class="aui-flex aui-column aui-items-center"
        :class="$style.indent"
      >
        <div
          v-for="option in naviOptions"
          :key="option.index"
          :class="$style.containerButtons"
        >
          <ButtonPage
            :title="option.title"
            :url="option.pageUrl"
            @changePage="changePage"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isShowNotification"
      :class="[
        $style.notification,
        isSuccess ? $style.greenNotification : $style.redNotification,
      ]"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import api from '../api/index';
import BatchGeneration from './dm/Batch-Generation.vue';
import OneAccount from './dm/One-Account.vue';
import InvoiceByProductNumber from './dm/Invoice-By-Product-Number.vue';
import TogglePages from '../components/toggle/TogglePages.vue';
import ButtonPage from '../components/ButtonPage.vue';

@Component({
  components: {
    BatchGeneration,
    OneAccount,
    InvoiceByProductNumber,
    TogglePages,
    ButtonPage,
  },
})
export default class PageIndex extends Vue {
  selectedItemLocal = '/index';
  title: string = 'Welcome Page';
  DMToggle = 1;
  selectedPage = null;

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Template Welcome Page',
        },
      ],
    };
  }

  @Watch('$route')
  protected onRouteChange(
    newPath: Record<string, string>,
    oldPath: Record<string, string>,
  ) {
    if (oldPath?.path !== newPath?.path) {
      this.selectedItemLocal = newPath?.path;
    }
  }

  get naviOptions() {
    return [
      {
        title: 'Пакетная генерация',
        pageUrl: '/dm/batch-generation',
        index: 0,
      },
      {
        title: 'Создание одного счёта',
        pageUrl: '/dm/one-account',
        index: 1,
      },
      {
        title: 'Счёт по номеру документа',
        pageUrl: '/dm/invoice-by-product-number',
        index: 2,
      },
      {
        title: 'Массовая генерация',
        pageUrl: '/dm/mass-generation',
        index: 3,
      },
    ];
  }

  changePage(pageName: string) {
    console.log('change');
    (this as any).$router.push(pageName, () => undefined);
  }

  selectType(num: number) {
    this.DMToggle = num;
  }

  created() {
    this.selectedItemLocal = (this as any).$router.currentRoute.fullPath;
  }
}
</script>

<style lang="stylus" module>
.page {
  height: 100%;
  overflow: hidden;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19);
  width: 1000px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
}

.title {
  margin-bottom: 20px;
}

.content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-top: 40px;
}

.content::-webkit-scrollbar {
  width: 0px;
}

.tabContent {
  border-color: #cfd5e6;
  border-style: solid;
  border-width: 0 1px 1px 1px;
  padding: 5px 10px 20px 10px;
}

.flexCredentialsId {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.titleAndDropdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
}

.titleMedium {
  font-size: 16px;
  color: #333333;
  padding: 0;
  margin: 10px 10px;
}

.titleSmall {
  font-size: 14px;
  color: #333333;
  padding: 0;
  margin: 10px 10px;
}

.textCenter {
  text-align: center;
}

.notification {
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px 40px;
  border-radius: 0 0 0 5px;
  background-color: #fff;
}

.greenNotification {
  border: 1px solid green;
}

.redNotification {
  border: 1px solid red;
}

.containerButtons {
  display: flex;
  justify-content: center;
  width: 100%;
}

.indent {
  gap: 20px;
}

.colorHead {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>
