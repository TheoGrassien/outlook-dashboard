<template>
  <div class="mail-detail-page">
    <div class="back-link">
      <BaseButton color="ghost" @click="goBack" class="back-button">
        <i class="fas fa-arrow-left"></i>
        Retour
      </BaseButton>
    </div>

    <div v-if="error" class="error-message">Erreur : {{ error }}</div>
    <div v-else-if="mail" class="mail-container">
      <h2 class="mail-subject">{{ mail.subject }}</h2>
      <div class="mail-header">
        <div class="mail-from">
          <span class="mail-from-name">{{
            mail.from?.emailAddress?.name
          }}</span>
          <span class="mail-from-address">
            ({{ mail.from?.emailAddress?.address }})
          </span>
        </div>
        <div class="mail-date">{{ formattedDate }}</div>
      </div>
      <div class="mail-content">
        <div v-html="mail.body?.content"></div>
      </div>
    </div>
    <div v-else class="loading">Chargement...</div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserMailById } from "../lib/microsoftGraph";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "MailDetailPage",
  components: {
    BaseButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const mail = ref(null);
    const error = ref(null);
    const id = route.params.id;

    const formattedDate = computed(() => {
      if (!mail.value?.receivedDateTime) return "";

      const date = new Date(mail.value.receivedDateTime);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      const isYesterday =
        date.toDateString() ===
        new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();

      if (isToday) {
        return new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      } else if (isYesterday) {
        return `Hier à ${new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)}`;
      } else {
        return new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      }
    });

    onMounted(async () => {
      try {
        mail.value = await getUserMailById(id);
      } catch (e) {
        error.value = e.message;
      }
    });

    function goBack() {
      router.push({ name: "Home" });
    }

    return { mail, error, formattedDate, goBack };
  },
};
</script>

<style scoped>
.mail-detail-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
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

.error-message {
  color: red;
  padding: 16px;
  background-color: #fef2f2;
  border-radius: 4px;
  border: 1px solid #fecaca;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #667185;
}

.mail-subject {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
}

.mail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eaecf0;
}

.mail-from {
  flex: 1;
}

.mail-from-name {
  font-weight: 600;
  color: #1f2937;
  display: block;
  margin-bottom: 4px;
}

.mail-from-address {
  font-size: 0.875rem;
  color: #667185;
}

.mail-date {
  color: #667185;
  font-size: 0.875rem;
  text-align: right;
  white-space: nowrap;
  margin-left: 16px;
}

.mail-content {
  margin-top: 24px;
  line-height: 1.6;
  color: #374151;
}

.mail-content :deep(p) {
  margin-bottom: 16px;
}

.mail-content :deep(a) {
  color: #0078d4;
  text-decoration: none;
}

.mail-content :deep(a:hover) {
  text-decoration: underline;
}
</style>