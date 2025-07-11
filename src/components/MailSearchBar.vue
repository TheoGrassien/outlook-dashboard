<template>
  <form class="mail-search-bar" @submit.prevent="onSearch">
    <input v-model="from" placeholder="Expéditeur" class="search-input" />
    <input v-model="keyword" placeholder="Mot-clé" class="search-input" />
    <input v-model="date" type="date" class="search-input" />
    <button type="submit" class="search-btn">
      <i class="fas fa-search"></i> Rechercher
    </button>
    <button type="button" class="reset-btn" @click="reset">Réinitialiser</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "MailSearchBar",
  emits: ["search"],
  setup(_, { emit }) {
    const from = ref("");
    const keyword = ref("");
    const date = ref("");
    function onSearch() {
      emit("search", {
        from: from.value,
        keyword: keyword.value,
        date: date.value,
      });
    }
    function reset() {
      from.value = "";
      keyword.value = "";
      date.value = "";
      emit("search", { from: "", keyword: "", date: "" });
    }
    return { from, keyword, date, onSearch, reset };
  },
};
</script>

<style scoped>
.mail-search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
}
.search-input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.search-btn, .reset-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #7f56d9;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
.reset-btn {
  background: #e0e0e0;
  color: #333;
}
</style>