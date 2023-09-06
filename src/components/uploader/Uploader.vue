<template>
  <div class="aui-flex">
    <aui-uploader
      :url="url"
      :auto-upload="false"
      :label="label"
      max-files="1"
      @added="addedDocument()"
      @removed="removedDocument()"
    />
    <p v-if="!isHaveFile" :class="$style.textInfo">Нет выбранного файла</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class Uploader extends Vue {
  @Prop() readonly url!: string;

  @Prop() readonly label!: string;

  isHaveFile = false;

  addedDocument() {
    this.isHaveFile = true;
  }

  removedDocument() {
    this.isHaveFile = false;
  }
}
</script>
<style lang="stylus" module>
.textInfo {
  margin: 0 0 0 16px;
  height: 32px;
  line-height: 32px;
}

aui-uploader:file-uploaded {
  color: red;
}

aui-uploader:file-uploading {
  color: red;
}
</style>