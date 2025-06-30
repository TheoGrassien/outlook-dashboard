<template>
  <div v-if="!userStore.user" class="not-connected">
    <h1 class="home-page-title">Bienvenue sur la page d'accueil !</h1>
    <p class="connection-message">
      Veuillez vous connecter pour accéder à vos mails.
    </p>
  </div>
  <div v-else>
    <div v-if="error" style="color: red">Erreur : {{ error }}</div>
    <div v-else>
      <div class="home-page-header">
        <h1 class="home-page-title">
          Bonjour, {{ userStore.user.name || userStore.user.username }}
        </h1>
        <BaseButton color="primary" @click="goToNewMail"
          ><i class="fas fa-plus icon-plus"></i> Nouveau mail</BaseButton
        >
      </div>
      <ul class="mail-list">
        <MailItem
          v-for="mail in mails"
          :key="mail.id"
          :mail="mail"
          @open="openMail"
          @remove="removeMail"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import MailItem from "../components/MailItem.vue";
import { useUserStore } from "../lib/userStore.js";
import { getUserMails } from "../lib/microsoftGraph";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

function generateFakeMail(to, subject, content) {
  const now = new Date();
  return {
    id: "fake-" + Math.random().toString(36).substr(2, 9),
    from: { emailAddress: { name: "Fictif", address: "fictif@example.com" } },
    toRecipients: [{ emailAddress: { address: to } }],
    subject: subject,
    bodyPreview: content.slice(0, 80),
    receivedDateTime: now.toISOString(),
    body: { content: content },
  };
}

export default {
  name: "HomePage",
  components: {
    BaseButton,
    MailItem,
  },
  setup() {
    const userStore = useUserStore();
    const mails = ref([]);
    const error = ref(null);
    const router = useRouter();

    // Champs du formulaire d'ajout
    const newTo = ref("");
    const newSubject = ref("");
    const newContent = ref("");
    const formError = ref("");

    async function loadMails() {
      if (!userStore.user) {
        mails.value = [];
        error.value = null;
        return;
      }

      try {
        error.value = null;
        const data = await getUserMails();
        mails.value = data.value;
        // Ajout d'un mail fictif si passé via navigation
        if (window.history.state && window.history.state.newMail) {
          const { to, subject, content } = window.history.state.newMail;
          mails.value.unshift(generateFakeMail(to, subject, content));
          // Nettoyer l'état pour éviter l'ajout multiple si on rafraîchit
          window.history.replaceState({}, document.title);
        }
      } catch (e) {
        error.value = e.message;
        mails.value = [];
      }
    }

    onMounted(() => {
      loadMails();
    });

    // Surveiller les changements de l'utilisateur
    watch(
      () => userStore.user,
      (newUser) => {
        if (newUser) {
          loadMails();
        } else {
          mails.value = [];
          error.value = null;
        }
      }
    );

    function openMail(mail) {
      router.push({ name: "MailDetail", params: { id: mail.id } });
    }

    function addFakeMail() {
      if (!newTo.value || !newSubject.value || !newContent.value) {
        formError.value = "Tous les champs sont obligatoires.";
        return;
      }
      mails.value.unshift(
        generateFakeMail(newTo.value, newSubject.value, newContent.value)
      );
      newTo.value = "";
      newSubject.value = "";
      newContent.value = "";
      formError.value = "";
    }

    function removeMail(id) {
      mails.value = mails.value.filter((mail) => mail.id !== id);
    }

    function goToNewMail() {
      router.push({ name: "MailNew" });
    }

    return {
      userStore,
      mails,
      error,
      openMail,
      addFakeMail,
      removeMail,
      newTo,
      newSubject,
      newContent,
      formError,
      goToNewMail,
    };
  },
};
</script>

<style scoped>
.home-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
}

.home-page-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.mail-list {
  list-style: none;
  padding: 0;
}

.not-connected {
  text-align: center;
  padding: 2rem;
}

.connection-message {
  font-size: 1.1rem;
  color: #666;
  margin-top: 1rem;
}

.icon-plus {
  margin-right: 8px;
}
</style>