<template>
  <div class="mail-new-page">
    <div class="back-link">
      <BaseButton color="ghost" @click="cancel" class="back-button">
        <i class="fas fa-arrow-left"></i>
        Retour
      </BaseButton>
    </div>
    <h2 class="page-title">Nouveau mail</h2>
    <form @submit.prevent="submitMail" class="mail-form">
      <div class="form-group">
        <label class="form-label">
          Destinataire
          <input
            v-model="to"
            type="email"
            required
            placeholder="exemple@domaine.com"
            class="form-input"
        /></label>
      </div>
      <div class="form-group">
        <label class="form-label">
          Objet
          <input
            v-model="subject"
            type="text"
            required
            placeholder="Objet du mail"
            class="form-input"
        /></label>
      </div>
      <div class="form-group">
        <label class="form-label">
          Contenu
          <textarea v-model="content" required class="form-textarea"></textarea>
        </label>
      </div>
      <div v-if="formError" class="form-error">
        {{ formError }}
      </div>
      <div class="form-actions">
        <BaseButton color="primary" type="submit">Ajouter</BaseButton>
        <BaseButton color="secondary" @click.prevent="cancel"
          >Annuler</BaseButton
        >
      </div>
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

<style scoped>
.mail-new-page {
  padding: 20px;
}

.back-link {
  margin-bottom: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 0.5em;
}

.form-label {
  display: block;
  margin-bottom: 16px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 8px;
}

.form-input:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.form-textarea {
  width: 100%;
  min-height: 60px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 8px;
  resize: vertical;
  font-family: inherit;
}

.form-textarea:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.form-error {
  color: red;
  margin-bottom: 0.5em;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style> 