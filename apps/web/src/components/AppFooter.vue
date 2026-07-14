<script setup lang="ts">
/**
 * AppFooter — the "reading the badges" legend box plus a caveat area.
 *
 * The legend content (permissive / copyleft / proprietary / form-factor key)
 * is structural to the design system, not data, so it's hardcoded here.
 * The caveat text underneath IS data (tier definitions, "as of this pass"
 * notes, etc.) and changes per catalog snapshot, so it's supplied by the
 * consumer via the default slot rather than baked into this component.
 *
 * Example:
 *   <AppFooter>
 *     <b>Tiers.</b> Tier 1 = full GUI … <br />
 *     <b>Caveat.</b> This space changes weekly. …
 *   </AppFooter>
 */
</script>

<template>
  <div class="legend">
    <h3>Reading the badges</h3>
    <div class="item"><span class="dot dot-permissive" /> Permissive license (MIT / Apache-2.0)</div>
    <div class="item">
      <span class="dot dot-copyleft" /> Copyleft / source-available (AGPL / GPL / Elastic / FSL / BSL)
    </div>
    <div class="item"><span class="dot dot-proprietary" /> Proprietary / closed source</div>
    <div class="item"><span class="dot dot-form" /> Form factor (desktop / web / mobile)</div>
  </div>
  <footer class="caveat">
    <slot />
  </footer>
</template>

<style scoped>
.legend {
  margin-top: 56px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
}

.legend h3 {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
  width: 100%;
  margin-bottom: 2px;
}

.legend .item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-dim);
}

.legend .dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.dot-permissive {
  background: var(--wire);
}

.dot-copyleft {
  background: var(--amber);
}

.dot-proprietary {
  background: var(--rose);
}

.dot-form {
  background: var(--violet);
}

.caveat {
  margin-top: 40px;
  color: var(--ink-faint);
  font-size: 12.5px;
  line-height: 1.7;
  border-top: 1px solid var(--line);
  padding-top: 22px;
}

.caveat :slotted(b) {
  color: var(--ink-dim);
}

.caveat :slotted(a.inline) {
  color: var(--wire);
  text-decoration: none;
  border-bottom: 1px solid var(--wire-dim);
}
</style>
