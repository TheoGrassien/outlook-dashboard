<template>
  <div>
    <h2>Nouveau mail</h2>
    <form
      @submit.prevent="submitMail"
      style="
        background: #f8f8f8;
        padding: 1em;
        border-radius: 8px;
        max-width: 500px;
      "
    >
      <div style="margin-bottom: 0.5em">
        <label
          >Destinataire :
          <input
            v-model="to"
            type="email"
            required
            placeholder="exemple@domaine.com"
            style="width: 100%"
        /></label>
      </div>
      <div style="margin-bottom: 0.5em">
        <label
          >Objet :
          <input
            v-model="subject"
            type="text"
            required
            placeholder="Objet du mail"
            style="width: 100%"
        /></label>
      </div>
      <div style="margin-bottom: 0.5em">
        <label
          >Contenu :
          <textarea
            v-model="content"
            required
            placeholder="Contenu du mail"
            style="width: 100%; min-height: 60px"
          ></textarea>
        </label>
      </div>
      <div v-if="formError" style="color: red; margin-bottom: 0.5em">
        {{ formError }}
      </div>
      <BaseButton color="primary" type="submit">Ajouter</BaseButton>
      <BaseButton
        color="danger"
        style="margin-left: 1em"
        @click.prevent="cancel"
        >Annuler</BaseButton
      >
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "MailNewPage",
  components: { BaseButton },
  setup() {
    const to = ref("");
    const subject = ref("");
    const content = ref("");
    const formError = ref("");
    const router = useRouter();

    function submitMail() {
      if (!to.value || !subject.value || !content.value) {
        formError.value = "Tous les champs sont obligatoires.";
        return;
      }
      // On passe les données du mail via l'état de navigation
      router.push({
        name: "Home",
        state: {
          newMail: {
            to: to.value,
            subject: subject.value,
            content: content.value,
          },
        },
      });
    }
    function cancel() {
      router.push({ name: "Home" });
    }
    return { to, subject, content, formError, submitMail, cancel };
  },
};
</script> 