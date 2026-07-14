import { describe, expect, it } from 'vitest';
import type { Tool } from '../types';
import { toolMatches, type ToolFilter } from './useToolFilters';

function makeTool(overrides: Partial<Tool>): Tool {
  return {
    slug: 'example-tool',
    tier: 1,
    name: 'Example Tool',
    sub: 'An example orchestrator',
    lic: 'permissive',
    licLabel: 'MIT',
    licenseUrl: null,
    forms: ['desktop'],
    formLabel: 'Desktop',
    desc: 'Does example things well.',
    auth: 'API key',
    harnesses: ['claude-code'],
    repo: 'https://example.test/repo',
    homepage: null,
    devHomepage: null,
    ...overrides,
  };
}

const CLAUDE_DESKTOP: Tool = makeTool({
  slug: 'claude-desktop',
  name: 'Claude Desktop Orchestrator',
  sub: 'Runs multiple Claude agents',
  desc: 'Coordinates several coding agents on a desktop app.',
  lic: 'permissive',
  licLabel: 'Apache-2.0',
  forms: ['desktop'],
  formLabel: 'Desktop',
  harnesses: ['claude-code', 'aider'],
  auth: 'OAuth',
});

const WEB_COPYLEFT: Tool = makeTool({
  slug: 'web-copyleft-orchestrator',
  name: 'Web Copyleft Orchestrator',
  sub: 'Browser-based swarm manager',
  desc: 'Manages a swarm of agents from the browser.',
  lic: 'copyleft',
  licLabel: 'GPL-3.0',
  forms: ['web'],
  formLabel: 'Web',
  harnesses: ['cursor'],
  auth: 'None',
});

const MOBILE_PROPRIETARY: Tool = makeTool({
  slug: 'mobile-proprietary-orchestrator',
  name: 'Mobile Proprietary Orchestrator',
  sub: 'Closed-source mobile companion',
  desc: 'A proprietary orchestrator for reviewing agent output on the go.',
  lic: 'proprietary',
  licLabel: 'Proprietary',
  forms: ['mobile'],
  formLabel: 'Mobile',
  harnesses: ['windsurf'],
  auth: 'SSO',
});

const DESKTOP_AND_WEB: Tool = makeTool({
  slug: 'desktop-and-web-orchestrator',
  name: 'Cross Platform Orchestrator',
  sub: 'Works on desktop and web',
  desc: 'A cross platform orchestrator with a permissive license.',
  lic: 'permissive',
  licLabel: 'MIT',
  forms: ['desktop', 'web'],
  formLabel: 'Desktop, Web',
  harnesses: ['claude-code'],
  auth: 'API key',
});

const ALL_TOOLS: Tool[] = [CLAUDE_DESKTOP, WEB_COPYLEFT, MOBILE_PROPRIETARY, DESKTOP_AND_WEB];

function noFilters(): Set<ToolFilter> {
  return new Set<ToolFilter>();
}

describe('toolMatches', () => {
  it('returns true for every tool when there is no query and no active filters', () => {
    for (const tool of ALL_TOOLS) {
      expect(toolMatches(tool, noFilters(), '')).toBe(true);
    }
  });

  it('matches free-text search against the tool name (case-insensitive)', () => {
    expect(toolMatches(CLAUDE_DESKTOP, noFilters(), 'claude desktop')).toBe(true);
    expect(toolMatches(CLAUDE_DESKTOP, noFilters(), 'CLAUDE DESKTOP')).toBe(true);
    expect(toolMatches(WEB_COPYLEFT, noFilters(), 'claude desktop')).toBe(false);
  });

  it('matches free-text search against the description', () => {
    expect(toolMatches(WEB_COPYLEFT, noFilters(), 'swarm of agents')).toBe(true);
    expect(toolMatches(CLAUDE_DESKTOP, noFilters(), 'swarm of agents')).toBe(false);
  });

  it('matches free-text search against harnesses joined together', () => {
    expect(toolMatches(CLAUDE_DESKTOP, noFilters(), 'aider')).toBe(true);
    expect(toolMatches(WEB_COPYLEFT, noFilters(), 'aider')).toBe(false);
  });

  it('matches free-text search against sub, licLabel, formLabel, and auth', () => {
    expect(toolMatches(MOBILE_PROPRIETARY, noFilters(), 'mobile companion')).toBe(true);
    expect(toolMatches(WEB_COPYLEFT, noFilters(), 'gpl-3.0')).toBe(true);
    expect(toolMatches(MOBILE_PROPRIETARY, noFilters(), 'sso')).toBe(true);
    expect(toolMatches(DESKTOP_AND_WEB, noFilters(), 'desktop, web')).toBe(true);
  });

  it('filters by a single license filter alone', () => {
    const filters = new Set<ToolFilter>(['copyleft']);
    expect(toolMatches(WEB_COPYLEFT, filters, '')).toBe(true);
    expect(toolMatches(CLAUDE_DESKTOP, filters, '')).toBe(false);
    expect(toolMatches(MOBILE_PROPRIETARY, filters, '')).toBe(false);
  });

  it('filters by a single form filter alone', () => {
    const filters = new Set<ToolFilter>(['web']);
    expect(toolMatches(WEB_COPYLEFT, filters, '')).toBe(true);
    expect(toolMatches(DESKTOP_AND_WEB, filters, '')).toBe(true);
    expect(toolMatches(CLAUDE_DESKTOP, filters, '')).toBe(false);
  });

  it('combines a license filter and a form filter with AND semantics', () => {
    const filters = new Set<ToolFilter>(['permissive', 'web']);
    // Matches only the permissive tool whose forms include "web".
    expect(toolMatches(DESKTOP_AND_WEB, filters, '')).toBe(true);
    // Permissive but desktop-only - fails the "web" form filter.
    expect(toolMatches(CLAUDE_DESKTOP, filters, '')).toBe(false);
    // Web but copyleft - fails the "permissive" license filter.
    expect(toolMatches(WEB_COPYLEFT, filters, '')).toBe(false);
  });

  it('combines filters and a free-text query with AND semantics', () => {
    const filters = new Set<ToolFilter>(['desktop']);
    expect(toolMatches(CLAUDE_DESKTOP, filters, 'coordinates')).toBe(true);
    // Right form, but query does not match this tool's text.
    expect(toolMatches(CLAUDE_DESKTOP, filters, 'swarm')).toBe(false);
    // Right query text, but wrong form.
    expect(toolMatches(WEB_COPYLEFT, filters, 'swarm')).toBe(false);
  });

  it('activating two mutually exclusive license filters matches nothing, mirroring the legacy prototype', () => {
    const filters = new Set<ToolFilter>(['permissive', 'copyleft']);
    for (const tool of ALL_TOOLS) {
      expect(toolMatches(tool, filters, '')).toBe(false);
    }
  });
});
