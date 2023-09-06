<template>
  <div @click.stop>
    <aui-input
      :value="updateDate"
      :width="width"
      @focus="showCalendar"
      @input="autocompliteDate"
    />
    <aui-calendar
      v-if="calendarVisible"
      v-model="calendarValue"
      :class="$style.dropdownCalendar"
      width="200px"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import aui from '@arm-seller/action-ui-kit-min';
import {
  hasSpacesRegular,
  hasDotsRegular,
  hasHyphensRegular,
} from '../../consts/calendarInputRegular';

@Component({
  components: {},
})
export default class Calendar extends Vue {
  @Prop({ default: '100%' }) readonly width!: string;

  @Prop({ default: '' }) readonly inputName!: string;

  calendarVisible = false;
  calendarValue: Date | null = null;
  inputValue = '';

  get updateDate() {
    if (!this.calendarValue) {
      return null;
    }

    return aui.date.formatDate(this.calendarValue, 'D RRRR YYYY');
  }

  validateDate(element: string) {
    console.log(element);
  }

  autocompliteDate(element: string) {
    if (!element) {
      return false;
    }

    const regexHasSpacesRegular = hasSpacesRegular;
    const regexHasDotsRegular = hasDotsRegular;
    const regexHasHyphensRegular = hasHyphensRegular;

    const isHasSpacesRegular = regexHasSpacesRegular.test(element);
    const isHasDotsRegular = regexHasDotsRegular.test(element);
    const isHasHyphensRegular = regexHasHyphensRegular.test(element);

    const isFullDate = element.length === 10;

    const dateInfo = {
      day: '',
      month: '',
      year: '',
    };

    const pullInfoToDateInfo = (elem: Array<string>) => {
      if (elem[0].length === 2) {
        dateInfo.day = elem[0];
        dateInfo.year = elem[2];
      } else if (elem[2].length === 2) {
        dateInfo.day = elem[2];
        dateInfo.year = elem[0];
      }
      dateInfo.month = elem[1];

      this.inputValue = `${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`;
      this.calendarValue = new Date(
        `${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`,
      );
    };

    if (isHasSpacesRegular && isFullDate) {
      console.log(isHasSpacesRegular);
      const date = element.split(' ');
      pullInfoToDateInfo(date);
    } else if (isHasDotsRegular && isFullDate) {
      console.log(isHasDotsRegular);
      const date = element.split('.');
      pullInfoToDateInfo(date);
    } else if (isHasHyphensRegular && isFullDate) {
      console.log(isHasHyphensRegular);
      const date = element.split('-');
      pullInfoToDateInfo(date);
    }
  }

  showCalendar() {
    this.calendarVisible = true;
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    if (!target) {
      return false;
    }

    if (!this.$el.contains(target)) {
      this.calendarVisible = false;
      document.removeEventListener('click', this.handleClickOutside);
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  @Watch('inputValue')
  updateValue() {
    this.$emit('updateValue', this.inputValue, this.inputName);
  }
}
</script>
<style lang="stylus" module>
.dropdownCalendar {
  position: absolute !important;
  z-index: 10;
}
</style>