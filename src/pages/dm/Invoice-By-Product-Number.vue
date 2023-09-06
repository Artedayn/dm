<template>
  <div>
    <HeaderTitle :title="title" />
    <div :class="$style.container">
      <Input
        label="Приказ"
        :is-required="true"
        input-name="order"
        @updateValue="updateValue"
      />
      <Input
        label="Дата начала подписки"
        :is-required="true"
        type="calendar"
        input-name="subscriptionStartDate"
        @updateValue="updateValue"
      />
      <Input
        label="Номер продукта"
        :is-required="true"
        input-name="numberOfProduct"
        @updateValue="updateValue"
      />
      <Dropdown
        label="Тип продукта"
        default-option="Выберите продукт"
        :options-info="typesProduct"
        input-name="typeOfProduct"
        @updateValue="updateValue"
      />
      <Input
        label="Publication Code"
        input-name="publicationCode"
        @updateValue="updateValue"
      />
      <Dropdown
        label="Базовая длительность подписки"
        default-option="Выберите длительность подписки"
        :options-info="subscriptionDuration"
        input-name="basicSubscriptionDuration"
        @updateValue="updateValue"
      />
      <Input
        label="Кампания"
        input-name="campaign"
        @updateValue="updateValue"
      />
      <Input
        label="Название прайс-листа:"
        input-name="nameOfPrice"
        @updateValue="updateValue"
      />
      <p :class="$style.description">
        заполняя это поле, когда это НЕ нужно, вы можете сгенерировать
        неподходящие счета для некоторых лендингов - старайтесь избегать
        заполнение этого поля без реальной необходимости...
      </p>
      <h3 :class="$style.infoText">
        Эти переменные не влияют на генерацию, а используются ЛИШЬ в ссылках для
        печати счета (позже их можно изменить вручную уже в самой ссылке):
      </h3>
      <div :class="$style.blockDates">
        <Input
          label="Дата начала подписки"
          :is-required="false"
          type="calendar"
          input-name="subscriptionStartDate"
          @updateValue="updateValue"
        />
        <Input
          label="Счет действителен до"
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
        :is-required="false"
        input-name="postfixOfTheAccountNumber"
        @updateValue="updateValue"
      />
      <Input
        label="Битрикс ID"
        :is-required="false"
        input-name="bitrixId"
        @updateValue="updateValue"
      />
      <Input
        label="Тип события в CRM - TipID (целое число)"
        :is-required="false"
        input-name="tipID"
        @updateValue="updateValue"
      />
      <Input
        label="Пароль"
        :is-required="false"
        input-name="password"
        @updateValue="updateValue"
      />
      <Dropdown
        label="Расчетный счёт"
        default-option="Выберите расчётный счёт"
        :options-info="optionsPaymentAccount"
        input-name="optionsPayment"
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
        content="Генерировать счета"
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
import { optionsPaymentAccount } from '../../consts/optionsPaymentAccount';
import api from '../../api/index';
import { IProduct } from '~/src/typings/interfaces';
import { intervals } from '../../consts/intervals';
import { intervalType } from '../../consts/intervalType';
import { products, productTypes } from '../../consts/newProducts';
import {
  generateInvoice101,
  generateInvoice102,
  generateInvoice103,
  generateInvoice104,
} from '../../utils/generateInvoice';

@Component({
  components: {
    HeaderTitle,
    Input,
    Dropdown,
  },
})
export default class InvoiceByProductNumber extends Vue {
  title = 'Создание счёта по номеру продукта';

  typesProduct = [
    {
      label: 'Печатная Версия',
      value: 1,
    },
    {
      label: 'Электронная Версия',
      value: 2,
    },
    {
      label: 'Комплект',
      value: 3,
    },
    {
      label: 'Другое',
      value: 4,
    },
  ];

  subscriptionDuration = [
    {
      label: '6 месяцев',
      value: 6,
    },
    {
      label: '12 месяцев',
      value: 12,
    },
    {
      label: '3 месяца',
      value: 3,
    },
    {
      label: '2 месяца',
      value: 2,
    },
    {
      label: '1 месяц',
      value: 1,
    },
  ];

  isDownloading = false;
  isViewButton = true;

  optionsPaymentAccount = optionsPaymentAccount;
  intervals = intervals;
  intervalType = intervalType;
  numberInterval = 0;
  productType = 0;
  productIndex = 0;
  productLength = products.length;
  productTypesLength = productTypes.length;
  testIndex = 0;

  order = '';
  subscriptionStartDate = '';
  campaign = '';
  numberOfProduct = '';
  typeOfProduct = '';
  publicationCode = '';
  basicSubscriptionDuration = '';
  nameOfPrice = '';
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
    const product = this.typesProduct[this.productIndex];
    this.productIndex++;

    if (this.productIndex === this.productTypesLength) {
      this.productIndex = 0;
    }
    return product;
  }

  async generateInvoices() {
    this.isDownloading = true;
    this.isViewButton = false;
    const isHaveInterval = Number(this.basicSubscriptionDuration) !== 0;
    const isHaveTypeProduct = Number(this.typeOfProduct) !== 0;

    const formRequest = async (intervalInfo: number, typeOfProductInfo: number) => {
      const sendInfo = {
        commandmentNr: this.order,
        dateOn: this.subscriptionStartDate,
        campaignNr: this.campaign,
        productCode: Number(this.numberOfProduct),
        productType: typeOfProductInfo,
        interval: intervalInfo,
        password: this.password,
        payAccountId: this.optionsPayment,
        priceName: this.nameOfPrice,
        productNewNum: '',
        intervalType: 100000002,
        timeToLive: Number(this.invoiceLifetime),
      };
      const result = await api.apiDM.createItem(sendInfo);
      console.log(result);
      const info = {
        name:
          products.find(el => el.code === Number(this.numberOfProduct))?.name ??
          '',
        code: Number(this.numberOfProduct),
        type: {
          id: typeOfProductInfo,
          name:
            this.typesProduct.find(el => el.value === Number(typeOfProductInfo))
              ?.label ?? '',
        },
        interval: intervalInfo,
      };

      console.log(sendInfo);
      console.log(info);

      this.generateHTMLInvoice(info, `${result}`);
    };

    if (isHaveInterval && isHaveTypeProduct) {
      const interval = Number(this.basicSubscriptionDuration);
      const typeProduct = Number(this.typeOfProduct);
      await formRequest(interval, typeProduct);
    } else if (!isHaveInterval && isHaveTypeProduct) {
      const typeProduct = Number(this.typeOfProduct);
      for (let t = 0; t < 5; t++) {
        const interval = this.getInterval();
        await formRequest(interval, typeProduct);
      }
    } else if (isHaveInterval && !isHaveTypeProduct) {
      const interval = Number(this.basicSubscriptionDuration);
      for (let t = 0; t < 4; t++) {
        const typeProduct = await this.getProduct();
        const typeProductNum = typeProduct.value;
        await formRequest(interval, typeProductNum);
      }
    } else if (!isHaveInterval && !isHaveTypeProduct) {
      for (let i = 0; i < 5; i++) {
        const interval = this.getInterval();
        for (let t = 0; t < 4; t++) {
          const typeProduct = await this.getProduct();
          const typeProductNum = typeProduct.value;
          await formRequest(interval, typeProductNum);
        }
      }
    }

    this.isDownloading = false;
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
.container {
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
  box-shadow: 0 -4px 8px rgba(0,0,0,0.1);
  padding: 20px 0;
}

.bottomButton {
  font-size: 20px !important;
}

.description {
  color: red;
  padding: 2px;
}

.informationOutputField {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px 20px;
}
</style>
