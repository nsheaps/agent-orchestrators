<script setup lang="ts">
/**
 * LicenseBadge — small pill showing a tool's license category + label.
 *
 * Renders as a link (opens in a new tab) when `href` is provided, or as a
 * plain non-interactive badge otherwise — e.g. Conductor's "closed source,
 * confirmed no public repo" case in the catalog data has no license URL.
 */
import { computed } from 'vue';

export type LicenseKind = 'permissive' | 'copyleft' | 'proprietary';

const props = withDefaults(
  defineProps<{
    kind: LicenseKind;
    label: string;
    href?: string | null;
  }>(),
  {
    href: null,
  },
);

defineOptions({ inheritAttrs: false });

// Only render as a link when a real, non-empty URL is supplied.
const linkHref = computed(() => (props.href ? props.href : null));
</script>

<template>
  <a
    v-if="linkHref"
    class="badge"
    :class="`lic-${kind}`"
    :href="linkHref"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="dot" />{{ label }}
  </a>
  <span v-else class="badge" :class="`lic-${kind}`">
    <span class="dot" />{{ label }}
  </span>
</template>

<style scoped>
.badge {
  font-family: var(--mono);
  font-size: 11px;
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid var(--line);
  color: var(--ink-dim);
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  background: transparent;
  cursor: default;
}

a.badge {
  cursor: pointer;
}

.badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge.lic-permissive {
  border-color: rgba(94, 234, 212, 0.28);
  color: #8ff0e0;
}

.badge.lic-permissive .dot {
  background: var(--wire);
}

.badge.lic-copyleft {
  border-color: rgba(245, 193, 94, 0.28);
  color: var(--amber);
}

.badge.lic-copyleft .dot {
  background: var(--amber);
}

.badge.lic-proprietary {
  border-color: rgba(245, 142, 163, 0.28);
  color: var(--rose);
}

.badge.lic-proprietary .dot {
  background: var(--rose);
}
</style>
