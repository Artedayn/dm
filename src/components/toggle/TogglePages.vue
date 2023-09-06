<template>
  <div>
    <div v-if="DMToggle === 1">
      <ToggleContent
        title="Сервис генерации ДМ-Счетов"
        @selectType="selectType"
      />
    </div>
    <div v-if="DMToggle === 2">
      <ToggleContent
        title="Сервис генерации ДМ-Счетов 2"
        @selectType="selectType"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import ToggleContent from './ToggleContent.vue';

@Component({
  components: {
    ToggleContent,
  },
})
export default class TogglePages extends Vue {
  @Prop() readonly title!: string;
  selectedAdd = 'inputs';

  @Prop() readonly DMToggle!: 1 | 2;

  viewDropdown() {
    console.log('click');
  }

  selectType(num: number) {
    this.$emit('selectType', num);
  }
}
</script>
<style lang="stylus" module>
.dropdownIcon {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dropdownMenu {
  top: 25px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 5;
  width: 250px;
  padding: 10px 5px;
  border: 1px solid black;
  background-color: #fff;

}

.dropdownMenu > p {
  margin: 0px;
  cursor: pointer;
  color: grey;
}

.dropdownMenu > p:hover {
  color: black;
}

.titleAndDropdown {
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>