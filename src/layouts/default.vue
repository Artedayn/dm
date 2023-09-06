<template>
  <div :class="$style.layout">
    <div :class="$style.page">
      <div class="aui-flex aui-flex-center" :class="$style.contentPage">
        <div :class="$style.content">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class DefaultLayout extends Vue {
  isShowNotification = false;
  message = '';
  isSuccess = false;

  showNotification(message: string, status: boolean) {
    this.isShowNotification = true;
    this.isSuccess = status;
    this.message = message;
    setTimeout(() => (this.isShowNotification = false), 3000);
  }
}
</script>

<style module>
.layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f6f7f9;
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
