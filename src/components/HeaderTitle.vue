<template>
  <div
    class="aui-flex aui-justify-center aui-position-relative"
    :class="$style.colorHead"
  >
    <h3 class="aui-h3 aui-my-md">{{ title }}</h3>
    <div class="aui-position-absolute" :class="$style.centerYAbsolute">
      <aui-button
        :class="$style.backButton"
        content=""
        icon="arrow-left-small"
        @click="clickToBack()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class HeaderTitle extends Vue {
  @Prop() readonly title!: string;

  clickToBack() {
    console.log((this as any).$router);

    (this as any).$router.push({
      path: '/',
    });
  }
}
</script>
<style lang="stylus" module>
.centerYAbsolute {
  left: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.colorHead {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.backButton:hover > div > i {
  transform: translateX(-5px);
  transition: transform 0.3s ease;
}
</style>