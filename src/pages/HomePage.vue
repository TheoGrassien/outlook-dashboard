<template>
  <main>
    <h1 class="home-page-title">Bienvenue sur la page d'accueil !</h1>
    <div v-if="userStore.user" class="user-info">
      Bonjour, {{ userStore.user.name || userStore.user.username }}
    </div>
    <div v-if="error" style="color: red">Erreur : {{ error }}</div>
    <div v-else>
      <h2>Boîte de réception</h2>
      <BaseButton
        color="primary"
        @click="goToNewMail"
        style="margin-bottom: 1em"
        >Nouveau mail</BaseButton
      >
      <ul style="list-style: none; padding: 0">
        <li
          v-for="mail in mails"
          :key="mail.id"
          style="
            border-bottom: 1px solid #eee;
            padding: 10px 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
          "
        >
          <div style="flex: 1; cursor: pointer" @click="openMail(mail)">
            <div>
              <strong>De :</strong>
              {{ mail.from?.emailAddress?.name || "Inconnu" }}
            </div>
            <div><strong>Objet :</strong> {{ mail.subject }}</div>
            <div
              style="
                color: #666;
                font-size: 0.95em;
                white-space: pre-line;
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 2.5em;
              "
            >
              {{ mail.bodyPreview }}
            </div>
          </div>
          <BaseButton
            color="danger"
            size="small"
            style="margin-left: 1em"
            @click.stop="removeMail(mail.id)"
            >Supprimer</BaseButton
          >
        </li>
      </ul>
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
import { getUserMails } from "../lib/microsoftGraph";
import { ref, onMounted } from "vue";
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
    AsyncButton,
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

    onMounted(async () => {
      try {
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
      }
    });

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