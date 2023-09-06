<template>
  <div :class="$style.titleAndDropdown" @click.stop>
    <h2>{{ title }}</h2>
    <div :class="$style.dropdownIcon">
      <div @click="viewDropdown()">
        <aui-icon
          v-if="!isDropdownOpen"
          name="arrow-down"
          class="aui-cursor-pointer"
        />
        <aui-icon
          v-if="isDropdownOpen"
          name="arrow-up"
          class="aui-cursor-pointer"
        />
      </div>
      <div v-if="isDropdownOpen" :class="$style.dropdownMenu" @click.stop>
        <p @click="event => selectDropdown(1, event)">
          Сервис генерации ДМ-Счетов 1
        </p>
        <p @click="event => selectDropdown(2, event)">
          Сервис генерации ДМ-Счетов 2
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class ToggleContent extends Vue {
  @Prop() readonly title!: string;

  isDropdownOpen = false;

  viewDropdown() {
    const isDropdownOpen = this.isDropdownOpen;

    if (isDropdownOpen) {
      this.isDropdownOpen = false;
      document.removeEventListener('click', this.handleClickOutside);

      return false;
    }

    if (!isDropdownOpen) {
      this.isDropdownOpen = true;
      document.addEventListener('click', this.handleClickOutside);
    }
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    if (!target) {
      return false;
    }

    if (!this.$el.contains(target)) {
      this.viewDropdown();
      document.removeEventListener('click', this.handleClickOutside);
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  selectDropdown(num: number) {
    this.viewDropdown();

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
  border-radius: 0px 5px 5px 5px;
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
  margin: 16px 0;
}
</style>