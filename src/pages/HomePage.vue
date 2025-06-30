<template>
  <main>
    <h1 class="home-page-title">Bienvenue sur la page d'accueil !</h1>
    <div v-if="userStore.user" class="user-info">
      Bonjour, {{ userStore.user.name || userStore.user.username }}
    </div>
    <div class="button-container">
      <BaseButton class="custom-margin"
        >BaseButton with custom margin</BaseButton
      >
      <BaseButton disabled>BaseButton disabled</BaseButton>
      <BaseButton color="warn">BaseButton warn</BaseButton>
      <BaseButton color="danger">BaseButton danger</BaseButton>
      <AsyncButton
        class="custom-margin"
        :color="'primary'"
        :onClick="handleAsyncClick"
      >
        Increment the wait time by 1 second for each click
      </AsyncButton>
    </div>
  </main>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import AsyncButton from "../components/AsyncButton.vue";
import { useUserStore } from "../lib/userStore.js";

export default {
  name: "HomePage",
  components: {
    BaseButton,
    AsyncButton,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      asyncClickCount: 0,
    };
  },
  methods: {
    handleAsyncClick() {
      this.asyncClickCount++;
      const waitTime = 2000 + (this.asyncClickCount - 1) * 1000;
      return new Promise((resolve) => {
        setTimeout(resolve, waitTime);
      });
    },
  },
};
</script>

<style scoped>
.home-page-title {
  text-align: center;
  font-size: 1.5rem;
}
.custom-margin {
  margin: 10px;
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
.user-info {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #26a69a;
}
</style>