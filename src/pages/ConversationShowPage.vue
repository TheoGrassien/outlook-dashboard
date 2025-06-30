<template>
  <div>
    <h2>Détail de la conversation</h2>
    <p>ID de la conversation : {{ id }}</p>
    <div v-if="error" style="color: red">Erreur : {{ error }}</div>
    <div v-else>
      <h3>Mails de l'utilisateur :</h3>
      <ul>
        <li v-for="mail in mails" :key="mail.id">
          {{ mail.subject }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getUserMails } from "../lib/microsoftGraph";

export default {
  name: "ConversationShowPage",
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const mails = ref([]);
    const error = ref(null);

    onMounted(async () => {
      try {
        const data = await getUserMails();
        // Filtrer les mails par conversationId si pertinent, sinon afficher tous les mails
        mails.value = data.value;
      } catch (e) {
        error.value = e.message;
      }
    });

    return { id, mails, error };
  },
};
</script> 