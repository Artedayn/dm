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
      <Dropdown
        label="Продукт"
        default-option="Выберите продукт"
        :is-required="true"
        :options-info="productsForDropdown"
        input-name="nameProduct"
        @updateValue="updateValue"
      />
      <Dropdown
        label="Тип продукта"
        default-option="Выберите тип продукта"
        :is-required="true"
        :options-info="typesProduct"
        input-name="typeOfProduct"
        @updateValue="updateValue"
      />
      <Dropdown
        label="Базовая длительность подписки"
        default-option="Выберите длительность подписки"
        :is-required="true"
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
          input-name="invoiceFrom"
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
export default class OneAccount extends Vue {
  title = 'Создание одного счёта';

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
  nameProduct = '';
  typeOfProduct = '';
  basicSubscriptionDuration = '';
  nameOfPrice = '';
  campaign = '';
  password = '';
  invoiceFrom = '';
  invoiceTo = '';
  invoiceLifetime = '30';
  postfixOfTheAccountNumber = '';
  bitrixId = '';
  tipID = '';
  optionsPayment = '';

  products = products;

  productsForDropdown = products.map(el => {
    return {
      value: el.code,
      label: el.name,
    }
  })

  isFormLink = [];

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
