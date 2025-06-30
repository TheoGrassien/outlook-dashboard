<template>
  <BaseHeader />
  <main class="main">
    <slot />
  </main>
  <BaseFooter />
</template>

<script>
import BaseHeader from "./BaseHeader.vue";
import BaseFooter from "./BaseFooter.vue";

export default {
  name: "BaseLayout",
  components: {
    BaseHeader,
    BaseFooter,
  },
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 189px);
  margin: auto;
  max-width: 900px;
  padding: 32px 48px;
}
</style> 