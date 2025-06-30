<template>
  <div>
    <h2>Conversations récentes</h2>
    <p>Ceci est un placeholder pour la page des conversations.</p>
    <router-link to="/conversations/123" class="conversation-link"
      >Voir la conversation 123</router-link
    >
  </div>
</template>

<script>
export default {
  name: "ConversationsIndexPage",
};
</script>

<style scoped>
.conversation-link {
  display: inline-block;
  margin-top: 1rem;
  color: #26a69a;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style> 