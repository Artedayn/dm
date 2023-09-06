<template>
  <div :class="$style.inputBlock">
    <label v-if="label" :class="$style.label"
      >{{ label }}
      <i v-if="isRequired" :class="$style.labelInfo">(обязательно)</i></label
    >
    <aui-dropdown
      v-model="inputValue"
      :value="'0'"
      :searching="isSearching"
      :options="optionsDropdown"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { IOptions } from '../../typings/interfaces';

@Component({
  components: {},
})
export default class Dropdown extends Vue {
  @Prop() readonly label!: string;

  @Prop({ default: 'Не выбрано' }) readonly defaultOption!: string;

  @Prop({ default: '100%' }) readonly width!: string;

  @Prop({ default: false }) readonly isRequired!: boolean;

  @Prop({ default: [] }) readonly optionsInfo!: Array<IOptions>;

  @Prop({ default: false }) readonly isSearching!: boolean;

  @Prop({ default: '' }) readonly inputName!: string;

  inputValue = '';

  get optionsDropdown() {
    const defaultOption = {
      value: '0',
      label: this.defaultOption,
    };
    const result = [defaultOption, ...this.optionsInfo];

    return result;
  }

  @Watch('inputValue')
  updateValue() {
    console.log(this.inputName);
    this.$emit('updateValue', this.inputValue, this.inputName);
  }
}
</script>
<style lang="stylus" module>
.inputBlock {
  margin-block: 16px;
}
.label {
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
}
.labelInfo {
  color: #8b0000;
  vertical-align: super;
  font-size: 12px;
}
</style>