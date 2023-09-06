<template>
  <div :class="$style.layout">
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class PrintLayout extends Vue {}
</script>

<style module>
.layout {
  background-color: #fff;
}

.layout *:not(i) {
  font-family: ProximaNova-Regular;
}

.page {
  position: relative;
  grid-area: page;
  height: 100%;
  padding: 20px 30px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.contentPage {
  height: 100%;
  overflow: hidden;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2),
    0px 6px 20px 0px rgba(0, 0, 0, 0.19);
  width: 1000px;
}

.content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

.content::-webkit-scrollbar {
  width: 0px;
}
</style>
