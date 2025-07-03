<template>
  <div class="stats-page">
    <h1>Statistiques des e-mails</h1>
    <div class="stats-block">
      <h2>3 derniers expéditeurs</h2>
      <ul>
        <li v-for="sender in lastSenders" :key="sender">
          {{ sender }}
        </li>
      </ul>
    </div>
    <div class="stats-block">
      <h2>Expéditeur le plus fréquent (7 derniers jours)</h2>
      <div v-if="mostFrequentSender7Days">
        {{ mostFrequentSender7Days }} ({{ mostFrequentSender7DaysCount }} mails)
      </div>
      <div v-else>
        Aucun mail reçu ces 7 derniers jours.
      </div>
    </div>
    <div class="stats-block">
      <h2>Mails reçus par jour (7 derniers jours)</h2>
      <Line :data="mailsPerDayData" :options="{ responsive: true, plugins: { legend: { display: false } } }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Line } from "vue-chartjs";
import { getUserMails } from "../lib/microsoftGraph";
import { useUserStore } from "../lib/userStore";

const userStore = useUserStore();
const mails = ref([]);

onMounted(async () => {
  if (userStore.user) {
    const data = await getUserMails();
    mails.value = Array.isArray(data.value) ? data.value : data.value?.value || [];
  }
});

// 3 derniers expéditeurs
const lastSenders = computed(() => {
  if (!Array.isArray(mails.value)) return [];
  return [...mails.value] // copie le tableau pour éviter la mutation
    .sort((a, b) => new Date(b.receivedDateTime) - new Date(a.receivedDateTime))
    .slice(0, 3)
    .map(mail => mail.from?.emailAddress?.name || "Inconnu");
});

// Expéditeur le plus fréquent sur les 7 derniers jours
const mostFrequentSender7Days = computed(() => {
  if (!Array.isArray(mails.value)) return null;
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentMails = mails.value.filter(mail =>
    new Date(mail.receivedDateTime) >= sevenDaysAgo
  );
  const counts = {};
  recentMails.forEach(mail => {
    const sender = mail.from?.emailAddress?.name || "Inconnu";
    counts[sender] = (counts[sender] || 0) + 1;
  });
  let max = 0;
  let frequent = null;
  for (const sender in counts) {
    if (counts[sender] > max) {
      max = counts[sender];
      frequent = sender;
    }
  }
  return frequent;
});
const mostFrequentSender7DaysCount = computed(() => {
  if (!mostFrequentSender7Days.value) return 0;
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return mails.value.filter(
    mail =>
      new Date(mail.receivedDateTime) >= sevenDaysAgo &&
      (mail.from?.emailAddress?.name || "Inconnu") === mostFrequentSender7Days.value
  ).length;
});

// Données pour la courbe des 7 derniers jours
const mailsPerDayData = computed(() => {
  const now = new Date();
  const days = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dayStr = d.toISOString().slice(0, 10);
    days.push(dayStr);
    counts.push(0);
  }
  if (Array.isArray(mails.value)) {
    mails.value.forEach(mail => {
      const date = mail.receivedDateTime?.slice(0, 10);
      const idx = days.indexOf(date);
      if (idx !== -1) counts[idx]++;
    });
  }
  return {
    labels: days,
    datasets: [
      {
        label: "Mails reçus",
        data: counts,
        borderColor: "#7f56d9",
        backgroundColor: "#e9d7fe",
        fill: true,
        tension: 0.3,
      },
    ],
  };
});
</script>

<style scoped>
.stats-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 16px;
}
.stats-block {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 24px;
  margin-bottom: 32px;
}
</style>