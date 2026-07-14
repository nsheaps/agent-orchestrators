<script setup lang="ts">
import { computed } from 'vue';
import type { FormFactor, LicenseKind, Tool } from '@/types';
import { TOOLS, TIER_META } from '@/data/tools';
import { useToolFilters } from '@/composables/useToolFilters';
import FilterBar from '@/components/FilterBar.vue';
import ToolCard from '@/components/ToolCard.vue';

const LIC_VALUES: LicenseKind[] = ['permissive', 'copyleft', 'proprietary'];
const FORM_VALUES: FormFactor[] = ['desktop', 'web', 'mobile'];

const { query, activeFilters, filteredTools, toggleFilter } = useToolFilters(TOOLS);

const licFilters = computed(() => LIC_VALUES.filter((v) => activeFilters.value.has(v)));
const formFilters = computed(() => FORM_VALUES.filter((v) => activeFilters.value.has(v)));

const tiers = [1, 2, 3] as const;
function toolsForTier(tier: Tool['tier']) {
  return filteredTools.value.filter((t) => t.tier === tier);
}
</script>

<template>
  <main class="browse">
    <p class="eyebrow">browse all {{ TOOLS.length }} tools</p>
    <h1>Search &amp; filter the full catalog.</h1>

    <FilterBar
      :query="query"
      :lic-filters="licFilters"
      :form-filters="formFilters"
      @update:query="(v) => (query = v)"
      @toggle-lic="toggleFilter"
      @toggle-form="toggleFilter"
    />

    <p v-if="filteredTools.length === 0" class="empty">No tools match that search.</p>

    <section v-for="tier in tiers" :key="tier" v-show="toolsForTier(tier).length" class="tier-group">
      <header class="tier-head">
        <h2>{{ TIER_META[tier].title }}</h2>
        <p>{{ TIER_META[tier].sub }}</p>
      </header>
      <div class="grid">
        <ToolCard v-for="tool in toolsForTier(tier)" :key="tool.slug" :tool="tool" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.browse {
  max-width: 1080px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.eyebrow {
  font-family: var(--mono);
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  margin: 0;
}

h1 {
  font-family: var(--display);
  color: var(--ink);
  margin: 0.5rem 0 1.75rem;
}

.empty {
  color: var(--ink-dim);
  font-family: var(--mono);
  font-size: 0.9rem;
}

.tier-group {
  margin-top: 2.5rem;
}

.tier-head h2 {
  font-family: var(--display);
  color: var(--ink);
  margin: 0;
}

.tier-head p {
  color: var(--ink-dim);
  font-size: 0.9rem;
  margin: 0.25rem 0 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
</style>
