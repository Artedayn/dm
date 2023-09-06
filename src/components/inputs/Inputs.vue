<template>
  <div>
    <aui-input v-model="inputValue" :value="null" :width="width" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class Inputs extends Vue {
  @Prop({ default: '100%' }) readonly width!: string;

  @Prop({ default: '' }) readonly inputName!: string;

  inputValue = '';

  @Watch('inputValue')
  updateValue() {
    console.log(this.inputName);
    this.$emit('updateValue', this.inputValue, this.inputName);
  }
}
</script>
<style lang="stylus" module></style>