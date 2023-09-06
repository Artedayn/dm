<template>
  <div>
    <h3 :class="$style.titleMedium">{{ title }}</h3>
    <aui-group v-model="selectedAdd">
      <aui-button-group value="inputs" content="По полям" />
      <aui-button-group value="text" content="Текстом" />
    </aui-group>
    <div v-if="selectedAdd === 'inputs'">
      <h4 :class="[$style.titleSmall, $style.textCenter]">Заполните поля</h4>
      <CredentialsAddInput @update="updateData" />
    </div>
    <div v-if="selectedAdd === 'text'">
      <h4 :class="[$style.titleSmall, $style.textCenter]">Введите данные</h4>
      <aui-text-area v-model="textInput" auto-size :rows="'12'" />
    </div>
    <aui-button width="100%" class="aui-mt-sm" @click="buttonClicked">{{
      title
    }}</aui-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import CredentialsAddInput from './CredentialsAddInputs.vue';
import { parseStringToObject } from '../utils/parseStringToObject';
import { ICredentialsAdd } from '../typings/interfaces';

@Component({
  components: {
    CredentialsAddInput,
  },
})
export default class Credentials extends Vue {
  @Prop() readonly title!: string;
  selectedAdd = 'inputs';

  inputsValue: ICredentialsAdd = {
    login: '',
    clientId: '',
    clientSecret: '',
    currentToken: '',
    refreshToken: '',
    updateDate: '',
    expiresOn: 0,
    expiresDate: '',
    useCount: 0,
    parserType: 0,
  };
  textInput = `{
    "login": "string",
    "clientId": "string",
    "clientSecret": "string",
    "currentToken": "string",
    "refreshToken": "string",
    "updateDate": "2023-07-03T20:27:31.564Z",
    "expiresOn": 0,
    "expiresDate": "2023-07-03T20:27:31.564Z",
    "useCount": 0,
    "parserType": 0
  }`;

  updateData(value: { name: string; value: string }) {
    console.log(value);
    this.inputsValue[value.name as keyof ICredentialsAdd] = value.value;
  }

  buttonClicked() {
    let data: ICredentialsAdd = { ...this.inputsValue };
    if (this.selectedAdd === 'inputs') {
      data = { ...this.inputsValue }; // тут проверка на заполенность полей
    }
    if (this.selectedAdd === 'text') {
      console.log(this.textInput);
      data = parseStringToObject(this.textInput);
    }
    const updateData = {
      login: data.login,
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      currentToken: data.currentToken,
      refreshToken: data.refreshToken,
      updateDate: new Date(data.updateDate),
      expiresOn: data.expiresOn,
      expiresDate: new Date(data.expiresDate),
      useCount: data.useCount,
      parserType: data.parserType,
    };
    this.$emit('buttonClicked', updateData);
  }
}
</script>
<style lang="stylus" module>
.titleSmall {
  font-size: 14px;
  color: #333333;
  padding: 0;
  margin: 10px 10px;
}

.textCenter {
  text-align: center;
}

.titleMedium {
  font-size: 16px;
  color: #333333;
  padding: 0;
  margin: 10px 10px;
}
</style>