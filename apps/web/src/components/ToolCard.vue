<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Tool } from '@/types';
import LicenseBadge from './LicenseBadge.vue';

defineProps<{ tool: Tool }>();
</script>

<template>
  <article class="card">
    <RouterLink :to="{ name: 'tool-detail', params: { slug: tool.slug } }" class="card-link">
      <header class="card-head">
        <h3>{{ tool.name }}</h3>
        <span class="tier">T{{ tool.tier }}</span>
      </header>
      <p class="sub">{{ tool.sub }}</p>
      <p class="desc">{{ tool.desc }}</p>
    </RouterLink>
    <div class="meta">
      <LicenseBadge :kind="tool.lic" :label="tool.licLabel" :href="tool.licenseUrl" />
      <span class="form">{{ tool.formLabel }}</span>
    </div>
    <ul class="harnesses">
      <li v-for="h in tool.harnesses" :key="h">{{ h }}</li>
    </ul>
    <footer class="links">
      <a v-if="tool.homepage" :href="tool.homepage" target="_blank" rel="noopener">site</a>
      <a v-if="tool.repo" :href="tool.repo" target="_blank" rel="noopener">code</a>
      <a v-if="tool.devHomepage" :href="tool.devHomepage" target="_blank" rel="noopener">docs</a>
      <span v-if="!tool.repo && tool.repoLabel" class="repo-label">{{ tool.repoLabel }}</span>
    </footer>
  </article>
</template>

<style scoped>
.card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.15s ease;
}

.card:hover {
  border-color: var(--line-bright);
}

.card-link {
  color: inherit;
  text-decoration: none;
  display: block;
}

.card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-head h3 {
  font-family: var(--display);
  font-size: 1.15rem;
  margin: 0;
  color: var(--ink);
}

.tier {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--ink-faint);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
}

.sub {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--wire);
  margin: 0.25rem 0 0;
}

.desc {
  color: var(--ink-dim);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--ink-faint);
}

.harnesses {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
}

.harnesses li {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--ink-dim);
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0.15rem 0.45rem;
}

.links {
  display: flex;
  gap: 0.9rem;
  font-family: var(--mono);
  font-size: 0.75rem;
}

.links a {
  color: var(--ink-dim);
  text-decoration: none;
  border-bottom: 1px dotted var(--line-bright);
}

.links a:hover {
  color: var(--wire);
}

.repo-label {
  color: var(--ink-faint);
}
</style>
