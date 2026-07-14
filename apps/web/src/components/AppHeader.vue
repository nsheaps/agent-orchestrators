<script setup lang="ts">
/**
 * AppHeader — the page-top eyebrow / h1 / lede / nav block used across the
 * catalog's top-level views.
 *
 * Slot API:
 *  - default slot: the "live" part of the h1 (rendered before the faded tail).
 *  - #tail slot:   the de-emphasized trailing words of the h1, wrapped in a
 *                   `.fade` span (mirrors `h1 .fade` in the HTML prototype).
 *  - #lede slot:   the description paragraph body. Using a slot (rather than
 *                   a plain string prop) lets callers bold specific words
 *                   with <b>, matching the prototype's `.lede b` styling.
 *
 * Example:
 *   <AppHeader>
 *     Tools that run your coding agents
 *     <template #tail>side by side.</template>
 *     <template #lede>
 *       GUI and desktop apps in the mold of <b>traycer.ai</b> — …
 *     </template>
 *   </AppHeader>
 */
withDefaults(defineProps<{ eyebrowLabel?: string }>(), {
  eyebrowLabel: 'live agent orchestrators',
});
</script>

<template>
  <header class="app-header">
    <div class="eyebrow">{{ eyebrowLabel }}</div>
    <h1>
      <slot />
      <span class="fade"><slot name="tail" /></span>
    </h1>
    <p v-if="$slots.lede" class="lede">
      <slot name="lede" />
    </p>
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Featured</RouterLink>
      <RouterLink to="/browse" class="nav-link">Browse</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  padding: 56px 0 30px;
}

.eyebrow {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--wire);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.eyebrow::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--wire);
  box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.6);
  animation: pulse 2.4s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.5);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(94, 234, 212, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(94, 234, 212, 0);
  }
}

h1 {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  max-width: 16ch;
}

h1 .fade {
  color: var(--ink-faint);
}

.lede {
  color: var(--ink-dim);
  font-size: 17px;
  max-width: 60ch;
  margin-top: 18px;
  line-height: 1.6;
}

.lede :slotted(b) {
  color: var(--ink);
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 18px;
  margin-top: 24px;
}

.nav-link {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-dim);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: color 0.16s, border-color 0.16s;
}

.nav-link:hover {
  color: var(--ink);
}

.nav-link.router-link-exact-active {
  color: var(--wire);
  border-bottom-color: var(--wire-dim);
}

@media (max-width: 560px) {
  .app-header {
    padding: 40px 0 20px;
  }
}
</style>
