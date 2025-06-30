<template>
  <button :class="['base-button', `base-button--${color}`]">
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    color: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "warn", "danger"].includes(value),
    },
  },
};
</script>

<style scoped>
.base-button {
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  transition: background 0.2s;
}

.base-button:hover {
  cursor: pointer;
}

.base-button--primary {
  background: #26a69a;
}
.base-button--primary:hover {
  background: #218e83;
}

.base-button--warn {
  background: #ff9800;
}
.base-button--warn:hover {
  background: #e68900;
}

.base-button--danger {
  background: #f44336;
}
.base-button--danger:hover {
  background: #d32f2f;
}

.base-button:disabled {
  background: #26a69979;
  cursor: not-allowed;
}
</style> 