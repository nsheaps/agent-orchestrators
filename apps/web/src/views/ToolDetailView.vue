<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { TOOLS } from '@/data/tools';
import LicenseBadge from '@/components/LicenseBadge.vue';

const props = defineProps<{ slug: string }>();

const tool = computed(() => TOOLS.find((t) => t.slug === props.slug));
</script>

<template>
  <main v-if="tool" class="detail">
    <RouterLink to="/browse" class="back">← back to all tools</RouterLink>

    <header class="head">
      <p class="tier">Tier {{ tool.tier }}</p>
      <h1>{{ tool.name }}</h1>
      <p class="sub">{{ tool.sub }}</p>
    </header>

    <p class="desc">{{ tool.desc }}</p>

    <dl class="facts">
      <div>
        <dt>License</dt>
        <dd><LicenseBadge :kind="tool.lic" :label="tool.licLabel" :href="tool.licenseUrl" /></dd>
      </div>
      <div>
        <dt>Form factor</dt>
        <dd>{{ tool.formLabel }}</dd>
      </div>
      <div>
        <dt>Auth model</dt>
        <dd>{{ tool.auth }}</dd>
      </div>
      <div>
        <dt>Harnesses</dt>
        <dd>
          <ul class="harnesses">
            <li v-for="h in tool.harnesses" :key="h">{{ h }}</li>
          </ul>
        </dd>
      </div>
    </dl>

    <div class="links">
      <a v-if="tool.homepage" :href="tool.homepage" target="_blank" rel="noopener">Homepage</a>
      <a v-if="tool.repo" :href="tool.repo" target="_blank" rel="noopener">Code homepage</a>
      <span v-else-if="tool.repoLabel" class="repo-label">{{ tool.repoLabel }}</span>
      <a v-if="tool.devHomepage" :href="tool.devHomepage" target="_blank" rel="noopener">Developer docs</a>
      <a v-if="tool.licenseUrl" :href="tool.licenseUrl" target="_blank" rel="noopener">License text</a>
    </div>

    <p v-if="tool.note" class="note"><b>Note.</b> {{ tool.note }}</p>
  </main>
  <main v-else class="detail">
    <p>Unknown tool "{{ slug }}".</p>
    <RouterLink to="/browse">← back to all tools</RouterLink>
  </main>
</template>

<style scoped>
.detail {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.back {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--ink-faint);
  text-decoration: none;
}

.back:hover {
  color: var(--wire);
}

.head {
  margin-top: 1.5rem;
}

.tier {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

h1 {
  font-family: var(--display);
  color: var(--ink);
  margin: 0.4rem 0 0.2rem;
}

.sub {
  font-family: var(--mono);
  color: var(--wire);
  margin: 0;
}

.desc {
  color: var(--ink-dim);
  line-height: 1.6;
  margin-top: 1.25rem;
}

.facts {
  margin-top: 2rem;
  display: grid;
  gap: 1.1rem;
}

.facts dt {
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
  margin-bottom: 0.3rem;
}

.facts dd {
  margin: 0;
  color: var(--ink);
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
  font-size: 0.75rem;
  color: var(--ink-dim);
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
}

.links {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-family: var(--mono);
  font-size: 0.85rem;
}

.links a {
  color: var(--wire);
  text-decoration: none;
  border-bottom: 1px dotted var(--wire-dim);
}

.repo-label {
  color: var(--ink-faint);
}

.note {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  color: var(--ink-faint);
  font-size: 0.85rem;
  line-height: 1.7;
}

.note b {
  color: var(--ink-dim);
}
</style>
