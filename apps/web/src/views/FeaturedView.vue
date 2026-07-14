<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { TOOLS, TIER_META } from '@/data/tools';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ToolCard from '@/components/ToolCard.vue';

const featured = TOOLS.filter((t) => t.tier === 1);
</script>

<template>
  <main class="featured">
    <AppHeader eyebrow-label="live agent orchestrators · 2026">
      <template #tail>side by side.</template>
      Tools that run your coding agents
      <template #lede>
        GUI and desktop apps in the mold of <b>traycer.ai</b> — manage parallel sessions across
        <b>Claude&nbsp;Code</b>, <b>Codex</b>, <b>Copilot</b> and other harnesses, mostly reusing
        subscriptions you already pay for. Tap any card to open the repo, license, and supported
        backends.
      </template>
    </AppHeader>

    <section class="tier-group">
      <header class="tier-head">
        <h2>{{ TIER_META[1].title }}</h2>
        <p>{{ TIER_META[1].sub }}</p>
      </header>
      <div class="grid">
        <ToolCard v-for="tool in featured" :key="tool.slug" :tool="tool" />
      </div>
    </section>

    <p class="cta">
      <RouterLink to="/browse">Browse all {{ TOOLS.length }} tools, including Tier 2/3 →</RouterLink>
    </p>

    <AppFooter>
      <b>Tiers.</b> Tier 1 = full GUI + multi-session + multi-harness + subscription auth. Tier 2 =
      terminal/TUI managers, some with web UIs. Tier 3 = further candidates worth verifying.<br />
      <b>Caveat.</b> This space changes weekly. All license/repo/star claims here were checked live
      against the GitHub API on a recent pass, not just secondhand sources. Confirm the exact repo
      before adopting — names like "Conductor," "cmux," "Backlog," "Superset," and "agentsmesh" all
      collide with unrelated same-named projects.
    </AppFooter>
  </main>
</template>

<style scoped>
.featured {
  max-width: 1080px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
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

.cta {
  margin-top: 2rem;
  font-family: var(--mono);
  font-size: 0.9rem;
}

.cta a {
  color: var(--wire);
  text-decoration: none;
}

.cta a:hover {
  text-decoration: underline;
}
</style>
