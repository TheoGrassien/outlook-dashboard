<template>
  <div>
    <h2>Détail du mail</h2>
    <div v-if="error" style="color: red">Erreur : {{ error }}</div>
    <div v-else-if="mail">
      <div>
        <strong>De :</strong>
        {{ mail.from?.emailAddress?.name || "Inconnu" }} ({{
          mail.from?.emailAddress?.address
        }})
      </div>
      <div><strong>Objet :</strong> {{ mail.subject }}</div>
      <div><strong>Date :</strong> {{ mail.receivedDateTime }}</div>
      <div style="margin-top: 1em; white-space: pre-line">
        <strong>Contenu :</strong>
        <div v-html="mail.body?.content"></div>
      </div>
    </div>
    <div v-else>Chargement...</div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getUserMailById } from "../lib/microsoftGraph";

export default {
  name: "MailDetailPage",
  setup() {
    const route = useRoute();
    const mail = ref(null);
    const error = ref(null);
    const id = route.params.id;

    onMounted(async () => {
      try {
        mail.value = await getUserMailById(id);
      } catch (e) {
        error.value = e.message;
      }
    });

    return { mail, error };
  },
};
</script> 