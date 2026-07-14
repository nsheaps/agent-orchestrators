<script setup lang="ts">
import type { FormFactor, LicenseKind } from '@/types';

const LIC_OPTIONS: { value: LicenseKind; label: string }[] = [
  { value: 'permissive', label: 'permissive' },
  { value: 'copyleft', label: 'copyleft' },
  { value: 'proprietary', label: 'proprietary' },
];

const FORM_OPTIONS: { value: FormFactor; label: string }[] = [
  { value: 'desktop', label: 'desktop' },
  { value: 'web', label: 'web' },
  { value: 'mobile', label: 'mobile' },
];

const props = defineProps<{
  query: string;
  licFilters: LicenseKind[];
  formFilters: FormFactor[];
}>();

const emit = defineEmits<{
  'update:query': [value: string];
  'toggle-lic': [value: LicenseKind];
  'toggle-form': [value: FormFactor];
}>();

function onInput(e: Event) {
  emit('update:query', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="filter-bar">
    <input
      class="search"
      type="search"
      placeholder="search name, description, harness…"
      :value="props.query"
      @input="onInput"
    />
    <div class="chip-group" role="group" aria-label="license filters">
      <button
        v-for="opt in LIC_OPTIONS"
        :key="opt.value"
        type="button"
        class="chip"
        :class="[`lic-${opt.value}`, { active: props.licFilters.includes(opt.value) }]"
        @click="emit('toggle-lic', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
    <div class="chip-group" role="group" aria-label="form factor filters">
      <button
        v-for="opt in FORM_OPTIONS"
        :key="opt.value"
        type="button"
        class="chip form"
        :class="{ active: props.formFilters.includes(opt.value) }"
        @click="emit('toggle-form', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.search {
  flex: 1 1 220px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--ink);
  font-family: var(--body);
  font-size: 0.9rem;
  padding: 0.55rem 0.85rem;
}

.search:focus {
  outline: none;
  border-color: var(--wire-dim);
}

.chip-group {
  display: flex;
  gap: 0.4rem;
}

.chip {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--ink-dim);
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.chip:hover {
  border-color: var(--line-bright);
}

.chip.active {
  color: var(--ink);
  border-color: var(--wire);
}

.chip.lic-permissive.active {
  border-color: var(--wire);
  color: var(--wire);
}

.chip.lic-copyleft.active {
  border-color: var(--amber);
  color: var(--amber);
}

.chip.lic-proprietary.active {
  border-color: var(--rose);
  color: var(--rose);
}

.chip.form.active {
  border-color: var(--violet);
  color: var(--violet);
}
</style>
