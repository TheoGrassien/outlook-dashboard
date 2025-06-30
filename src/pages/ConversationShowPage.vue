<template>
  <div>
    <h2>Détail de la conversation</h2>
    <p>ID de la conversation : {{ id }}</p>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "ConversationShowPage",
  setup() {
    const route = useRoute();
    return { id: route.params.id };
  },
};
</script> 