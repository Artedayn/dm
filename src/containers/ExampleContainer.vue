<template>
  <Example :disabled="isClicked" @click="onClick">
    {{ text }}
  </Example>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { appMapper } from '@/store/modules/app';
import Example from '@/components/Example.vue';

const Mappers = Vue.extend({
  components: {
    Example,
  },
  computed: {
    ...appMapper.mapState(['exampleSuccess']),
  },
  methods: {
    ...appMapper.mapActions(['getExample']),
  },
});

@Component
export default class ExampleContainer extends Mappers {
  // __Component implementation
  // Data
  isClicked: boolean = false;

  // Computed
  get text() {
    return `Result: ${this.exampleSuccess}`;
  }

  // Methods
  onClick(): void {
    this.isClicked = true;

    console.log('Welcome!');
  }

  // Hooks
  mounted() {
    this.getExample();
  }
}
</script>

<style module lang="stylus"></style>
