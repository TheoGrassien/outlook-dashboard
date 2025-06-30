<template>
  <BaseLayout>
    <router-view class="home-page" />
  </BaseLayout>
</template>

<script>
import BaseLayout from "./components/BaseLayout.vue";
export default {
  name: "App",
  components: {
    BaseLayout,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.home-page {
  flex: 1;
}
</style>
