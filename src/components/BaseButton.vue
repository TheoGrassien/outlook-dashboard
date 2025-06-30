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
      validator: (value) =>
        ["primary", "warn", "danger", "secondary", "ghost"].includes(value),
    },
  },
};
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
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
  background: #7f56d9;
}
.base-button--primary:hover {
  background: #6941c6;
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

.base-button--secondary {
  background: transparent;
  border: 1px solid #d0d4dd;
  color: #222;
}

.base-button--secondary:hover {
  background: #f9fafb;
  border: 1px solid #d0d4dd;
}

.base-button--ghost {
  background: transparent;
  color: #222;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
}

.base-button--ghost:hover {
  background: #f0f0f0;
  color: #222;
}

.base-button:disabled {
  background: #26a69979;
  cursor: not-allowed;
}
</style> 