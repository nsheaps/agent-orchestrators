<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="not-found">
    <p class="eyebrow">404</p>
    <h1>Nothing here.</h1>
    <p>
      <RouterLink to="/">Back to the featured list</RouterLink> or
      <RouterLink to="/browse">browse every tool</RouterLink>.
    </p>
  </main>
</template>

<style scoped>
.not-found {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
}

.eyebrow {
  font-family: var(--mono);
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}

h1 {
  font-family: var(--display);
  color: var(--ink);
  margin: 0.5rem 0 1rem;
}

a {
  color: var(--wire);
}
</style>
