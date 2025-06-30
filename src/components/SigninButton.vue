<template>
  <div>
    <AsyncButton :onClick="handleSignIn"
      >Se connecter avec Microsoft</AsyncButton
    >
    <div v-if="userStore.user">
      <p>
        Connecté en tant que :
        {{ userStore.user.name || userStore.user.username }}
      </p>
      <pre>{{ userStore.user }}</pre>
    </div>
  </div>
</template>

<script>
import { signInAndGetUser } from "../lib/microsoftGraph.js";
import AsyncButton from "./AsyncButton.vue";
import { useUserStore } from "../lib/userStore.js";

export default {
  name: "SigninButton",
  components: { AsyncButton },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async handleSignIn() {
      try {
        const user = await signInAndGetUser();
        this.userStore.setUser(user);
      } catch (e) {
        alert("Erreur lors de la connexion : " + e.message);
      }
    },
  },
};
</script> 