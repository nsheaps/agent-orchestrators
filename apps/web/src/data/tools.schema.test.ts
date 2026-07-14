import { describe, expect, it } from 'vitest';
import type { FormFactor, LicenseKind } from '../types';
import { TOOLS } from './tools';

const ALLOWED_LICENSES: readonly LicenseKind[] = ['permissive', 'copyleft', 'proprietary'];
const ALLOWED_FORMS: readonly FormFactor[] = ['desktop', 'web', 'mobile'];

// Lowercase kebab-case: one or more lowercase alphanumeric segments joined by
// single hyphens, e.g. "claude-code" or "aider2".
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Regression test for the tools catalog data (`TOOLS`). This turns the
 * validation the main session previously ran by hand into a permanent
 * automated check, so a bad entry in the dataset fails CI instead of
 * silently shipping.
 */
describe('TOOLS data schema', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(TOOLS)).toBe(true);
    expect(TOOLS.length).toBeGreaterThan(0);
  });

  it.each(TOOLS.map((tool) => [tool.slug, tool] as const))('%s has a valid lic value', (_slug, tool) => {
    expect(ALLOWED_LICENSES).toContain(tool.lic);
  });

  it.each(TOOLS.map((tool) => [tool.slug, tool] as const))('%s has only valid forms values', (_slug, tool) => {
    expect(tool.forms.length).toBeGreaterThan(0);
    for (const form of tool.forms) {
      expect(ALLOWED_FORMS).toContain(form);
    }
  });

  it.each(TOOLS.map((tool) => [tool.slug, tool] as const))('%s has a lowercase kebab-case slug', (_slug, tool) => {
    expect(tool.slug).toMatch(KEBAB_CASE);
  });

  it.each(TOOLS.map((tool) => [tool.slug, tool] as const))(
    '%s has non-empty name/desc/licLabel/formLabel/auth strings',
    (_slug, tool) => {
      expect(tool.name.trim().length).toBeGreaterThan(0);
      expect(tool.desc.trim().length).toBeGreaterThan(0);
      expect(tool.licLabel.trim().length).toBeGreaterThan(0);
      expect(tool.formLabel.trim().length).toBeGreaterThan(0);
      expect(tool.auth.trim().length).toBeGreaterThan(0);
    },
  );

  it.each(TOOLS.map((tool) => [tool.slug, tool] as const))('%s has a non-empty harnesses array', (_slug, tool) => {
    expect(Array.isArray(tool.harnesses)).toBe(true);
    expect(tool.harnesses.length).toBeGreaterThan(0);
  });

  it.each(TOOLS.map((tool) => [tool.slug, tool] as const))(
    '%s has either a repo or a repoLabel',
    (_slug, tool) => {
      expect(Boolean(tool.repo) || Boolean(tool.repoLabel)).toBe(true);
    },
  );

  it('has slugs that are unique across all tools', () => {
    const slugs = TOOLS.map((tool) => tool.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
