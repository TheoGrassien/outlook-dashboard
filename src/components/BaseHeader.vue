<template>
  <header class="base-header">
    <div class="header-left">
      <router-link to="/" class="header-link">
        <i class="fas fa-home home-icon"></i>
        <span>Accueil</span>
      </router-link>
    </div>
    <div class="header-right">
      <template v-if="userStore.user">
        <i class="fas fa-user icon"></i>
        <div class="user-info">
          <div class="user-name">
            {{ userStore.user.name || userStore.user.username }}
          </div>
          <div class="user-email">{{ userStore.user.username }}</div>
        </div>
      </template>
      <template v-else>
        <SigninButton />
      </template>
    </div>
  </header>
</template>

<script>
import SigninButton from "./SigninButton.vue";
import { useUserStore } from "../lib/userStore.js";

export default {
  name: "BaseHeader",
  components: { SigninButton },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>

<style scoped>
.base-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: #222;
  border-bottom: 1px solid #eaecf0;
  box-shadow: 0px 0px 24px 0px rgba(31, 45, 70, 0.1);
  padding: 16px 32px;
  height: 40px;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-right {
  font-weight: 500;
}

.base-header i {
  font-size: 1.2rem;
}

.header-link {
  color: #222;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.header-link:hover {
  text-decoration: underline;
}

.header-link:first-child {
  display: flex;
  align-items: center;
  gap: 8px;
}

.base-header .icon {
  font-size: 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-email {
  color: #667185;
  font-size: 0.875rem;
}
</style>
