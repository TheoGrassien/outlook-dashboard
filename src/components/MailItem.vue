<template>
  <li class="mail-item">
    <div class="mail-content" @click="$emit('open', mail)">
      <div class="mail-from">
        {{ mail.from?.emailAddress?.name || "Inconnu" }}
      </div>
      <div class="mail-subject">{{ mail.subject }}</div>
      <div class="mail-preview">
        {{ mail.bodyPreview }}
      </div>
    </div>
    <button
      class="delete-button"
      @click.stop="$emit('remove', mail.id)"
      title="Supprimer"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    </button>
  </li>
</template>

<script>
export default {
  name: "MailItem",
  components: {},
  props: {
    mail: {
      type: Object,
      required: true,
    },
  },
  emits: ["open", "remove"],
};
</script>

<style scoped>
.mail-item {
  border-bottom: 1px solid #eaecf0;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.2s;
}

.mail-item:hover {
  background-color: #eaecf0;
}

.mail-content {
  flex: 1;
  cursor: pointer;
}

.mail-from {
  font-weight: 600;
  margin-bottom: 4px;
}

.mail-subject {
  font-weight: 500;
  margin-bottom: 8px;
}

.mail-preview {
  color: #667185;
  font-size: 0.875rem;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2.3em;
}

.delete-button {
  margin-left: 1em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  color: #667185;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button:hover {
  background-color: #fef2f2;
  color: #dc2626;
}
</style> 