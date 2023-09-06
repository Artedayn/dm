<template>
  <div :class="$style.inputBlock">
    <label v-if="label" :class="$style.label"
      >{{ label }}
      <i v-if="isRequired" :class="$style.labelInfo">(обязательно)</i></label
    >
    <div v-if="type === 'calendar'">
      <Calendar
        :width="'100%'"
        :input-name="inputName"
        @updateValue="updateValue"
      />
    </div>
    <div v-else>
      <Inputs
        :width="width"
        :input-name="inputName"
        @updateValue="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import Calendar from './Calendar.vue';
import Inputs from './Inputs.vue';

@Component({
  components: {
    Calendar,
    Inputs,
  },
})
export default class Input extends Vue {
  @Prop() readonly label!: string;

  @Prop({ default: '100%' }) readonly width!: string;

  @Prop({ default: 'text' }) readonly type!: string;

  @Prop({ default: false }) readonly isRequired!: boolean;

  @Prop({ default: '' }) readonly inputName!: string;

  updateValue(value: string, name: string) {
    this.$emit('updateValue', value, name);
  }
}
</script>
<style lang="stylus" module>
.inputBlock {
  margin-block: 16px;
  position: relative;
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