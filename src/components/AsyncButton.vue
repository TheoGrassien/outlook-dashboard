<template>
  <base-button
    :disabled="isPending"
    :color="color"
    @click.stop.prevent="handleClick"
    class="async-button"
  >
    <i v-if="isPending" class="fas fa-spinner fa-spin"></i>
    <slot />
  </base-button>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "AsyncButton",
  components: { BaseButton },
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "primary",
    },
  },
  data() {
    return {
      isPending: false,
    };
  },
  methods: {
    handleClick() {
      const originalOnClick = this.$attrs.onClick || (() => Promise.resolve());
      this.isPending = true;
      Promise.resolve(originalOnClick()).finally(() => {
        this.isPending = false;
      });
    },
  },
};
</script>

<style scoped>
.async-button {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>