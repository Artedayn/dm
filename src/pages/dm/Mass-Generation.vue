<template>
  <div :class="$style.content">
    <HeaderTitle :title="title" />
    <div :class="$style.container">
      <Uploader label="Загрузка продуктов и публикейшен кодов" />
      <Input
        label="Приказ"
        input-name="order"
        :is-required="true"
        @updateValue="updateValue"
      />
      <Input
        label="Дата начала подписки"
        input-name="subscriptionStartDate"
        :is-required="true"
        type="calendar"
        @updateValue="updateValue"
      />
      <Input
        label="Кампания"
        input-name="campaign"
        :is-required="false"
        @updateValue="updateValue"
      />
      <div :class="$style.blockDates">
        <Input
          label="Счёт от"
          :is-required="false"
          input-name="invoiceFrom"
          type="calendar"
          @updateValue="updateValue"
        />
        <Input
          label="Счёт действителен до"
          :is-required="false"
          type="calendar"
          input-name="invoiceTo"
          @updateValue="updateValue"
        />
        <Input
          label="Срок жизни счета в днях"
          :is-required="false"
          type="number"
          input-name="invoiceLifetime"
          @updateValue="updateValue"
        />
      </div>
      <Input
        label="Постфикс номера счета"
        input-name="postfixOfTheAccountNumber"
        :is-required="false"
        @updateValue="updateValue"
      />
      <Input
        label="Тип события в CRM - TipID (целое число)"
        :is-required="false"
        input-name="tipID"
        @updateValue="updateValue"
      />
      <Dropdown
        label="Расчетный счет"
        input-name="optionsPayment"
        default-option="Выберите расчетный счет"
        :options-info="optionsPaymentAccount"
        @updateValue="updateValue"
      />
      <aui-checkbox
        :input-val="isFormLink"
        val="isFormLink"
        label="Формировать ссылку на getbill.html"
      />
    </div>
    <div
      v-if="isViewButton"
      class="aui-flex aui-justify-center"
      :class="$style.bottomButtonBlock"
    >
      <aui-button
        content="Генерировать"
        :class="$style.bottomButton"
        @click="generateInvoices()"
      />
    </div>
    <div id="informationOutputField" :class="$style.informationOutputField">
      <div v-if="isDownloading" class="aui-flex aui-justify-center">
        <aui-loader :size="60" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import HeaderTitle from '../../components/HeaderTitle.vue';
import Input from '../../components/inputs/index.vue';
import Dropdown from '../../components/dropdown/Dropdown.vue';
import Uploader from '../../components/uploader/Uploader.vue';
import {
  generateInvoice101,
  generateInvoice102,
  generateInvoice103,
  generateInvoice104,
} from '../../utils/generateInvoice';
import { optionsPaymentAccount } from '../../consts/optionsPaymentAccount';
import { intervals } from '../../consts/intervals';
import { intervalType } from '../../consts/intervalType';
import { products, productTypes } from '../../consts/newProducts';
import { IProduct } from '~/src/typings/interfaces';
import api from '../../api/index';

@Component({
  components: {
    HeaderTitle,
    Input,
    Dropdown,
    Uploader,
  },
})
export default class MassGeneration extends Vue {
  title = 'Массовая генерация счетов';

  isDownloading = false;
  isViewButton = true;

  optionsPaymentAccount = optionsPaymentAccount;
  intervals = intervals;
  intervalType = intervalType;
  numberInterval = 0;
  productType = 0;
  productIndex = 0;
  productLength = products.length;
  testIndex = 0;

  order = '';
  subscriptionStartDate = '';
  campaign = '';
  password = '';
  invoiceFrom = '';
  invoiceTo = '';
  invoiceLifetime = '30';
  postfixOfTheAccountNumber = '';
  bitrixId = '';
  tipID = '';
  optionsPayment = '';
  isFormLink = [];

  get formGenerate() {
    const commandmentNr = this.order;
    const dateOn = this.subscriptionStartDate;
    const password = this.password;
    const payAccountId = this.optionsPayment;
    const campaignNr = this.campaign;
    const priceName = '';
    const productNewNum = '';
    const timeToLive = this.invoiceLifetime;

    return {
      commandmentNr,
      dateOn,
      password,
      payAccountId,
      campaignNr,
      priceName,
      productNewNum,
      timeToLive,
    };
  }

  getInterval() {
    const number = this.numberInterval;
    let interval = 0;
    if (number < 4) {
      this.numberInterval = number + 1;
    }

    if (number === 4) {
      this.numberInterval = 0;
    }

    interval = this.intervals[number];

    return interval;
  }

  updateValue(value: string, inputName: string) {
    if (this.hasOwnProperty(inputName)) {
      // @ts-ignore: Unreachable code error
      this[inputName] = value;
    }
  }

  async getProduct() {
    const product = products[this.productIndex];
    this.productIndex++;
    this.testIndex++;
    return product;
  }

  async generateInvoices() {
    this.isDownloading = true;
    this.isViewButton = false;
    while (this.testIndex !== this.productLength) {
      const product = await this.getProduct();
      for (let i = 0; i < 4; i++) {
        const type = productTypes[i];
        for (let t = 0; t < 5; t++) {
          const info = {
            name: product.name,
            code: product.code,
            type: type,
            interval: this.getInterval(),
          };
          const sendInfo = {
            commandmentNr: this.order,
            dateOn: this.subscriptionStartDate,
            campaignNr: this.campaign,
            productCode: info.code,
            productType: info.type.id,
            interval: info.interval,
            password: this.password,
            payAccountId: this.optionsPayment,
            priceName: '',
            productNewNum: '',
            intervalType: 100000002,
            timeToLive: Number(this.invoiceLifetime),
          };
          const result = await api.apiDM.createItem(sendInfo);
          console.log(result);

          this.generateHTMLInvoice(info, `${result}`);
        }
      }
    }
    if (this.testIndex === this.productLength) {
      this.isDownloading = false;
    }
  }

  generateHTMLInvoice(
    product: {
      name: string;
      code: number;
      type: { id: number; name: string };
      interval: number;
    },
    code: string,
  ) {
    let result = '';
    const bill =
      'https://dm.action-press.ru/BillService.svc/GetItemForPrinting?';
    const tipID = this.tipID.length > 0 ? this.tipID : '2';
    const info: IProduct = {
      name: product.name,
      type: product.type.name,
      bill: bill,
      commandmentNr: this.order,
      dateOn: this.subscriptionStartDate,
      productCode: `${product.code}`,
      productType: `${product.type.id}`,
      interval: `${product.interval}`,
      dateStart: this.invoiceFrom,
      dateTo: this.invoiceTo,
      postfix: this.postfixOfTheAccountNumber,
      bitrix: this.bitrixId,
      tipID,
      priceName: '',
      productNewNum: '',
    };
    if (code === '101') {
      result = generateInvoice101(info);
    } else if (code === '102') {
      result = generateInvoice102(info);
    } else if (code === '103') {
      result = generateInvoice103(info);
    } else if (code === '104') {
      result = generateInvoice104(info);
    }

    document
      .getElementById('informationOutputField')
      ?.insertAdjacentHTML('beforeend', result);
  }
}
</script>

<style lang="stylus" module>
.content {
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  padding: 20px;
}

.blockDates {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.blockDates > div {
  flex: 1;
}

.infoText {
  color: #0095ff;
  font-size: 18px;
}

.infoTextRed {
  color: red;
}

.bottomButtonBlock {
  position: relative;
  bottom: 0;
  box-shadow: 0 -4px 8px rgba(0,0,0,0.1);
  padding: 20px 0;
}

.bottomButton {
  font-size: 20px !important;
}

.informationOutputField {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px 20px;
}
</style>
