<template>
  <div :class="$style.buttonPage" @click="() => selectPage()">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class ButtonPage extends Vue {
  @Prop() readonly title!: string;

  @Prop() readonly url!: string;

  selectPage() {
    console.log('click');
    this.$emit('changePage', this.url);
  }
}
</script>
<style lang="stylus" module>
.buttonPage {
    border: 1px solid black;
    padding: 10px 20px;
    width: 40%;
    height: 60px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 6px 0px rgba(0,0,0,0.19);
    color: #333;
    font-size: 20px;
    cursor: pointer;
}
</style>