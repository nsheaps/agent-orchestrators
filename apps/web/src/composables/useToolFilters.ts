import { computed, isRef, ref, watch, type ComputedRef, type Ref } from 'vue';
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router';
import type { FormFactor, LicenseKind, Tool } from '../types';

/** A single active filter chip value: either a license kind or a form factor. */
export type ToolFilter = LicenseKind | FormFactor;

const FORM_FILTERS: readonly FormFactor[] = ['desktop', 'web', 'mobile'];

const QUERY_PARAM = 'q';
const FILTERS_PARAM = 'f';

function isFormFilter(filter: ToolFilter): filter is FormFactor {
  return (FORM_FILTERS as readonly string[]).includes(filter);
}

/**
 * Pure predicate that decides whether a single tool matches the current
 * search query and active filter chips.
 *
 * This mirrors the legacy prototype's `matches(t)` function (see
 * `matches` in multi-agent-orchestrators.html) exactly, so it is kept as a
 * standalone, side-effect-free function that can be unit tested directly
 * without mounting a Vue component or router:
 *
 * - Filters are AND-ed together, regardless of kind (license vs form).
 * - A "form" filter (desktop/web/mobile) matches when the tool's `forms`
 *   array includes it.
 * - Any other active filter is treated as a license filter and matches only
 *   when it equals the tool's single `lic` value. Because a tool has exactly
 *   one `lic`, activating two different license filters at the same time
 *   yields zero matches for every tool - that is the original semantics,
 *   not a bug introduced here.
 * - The free-text query is matched as a case-insensitive substring against
 *   a haystack built from name/sub/desc/licLabel/harnesses(joined)/
 *   formLabel/auth.
 */
export function toolMatches(tool: Tool, activeFilters: ReadonlySet<ToolFilter>, query: string): boolean {
  for (const filter of activeFilters) {
    if (isFormFilter(filter)) {
      if (!tool.forms.includes(filter)) return false;
    } else if (tool.lic !== filter) {
      return false;
    }
  }

  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery) {
    const haystack = [
      tool.name,
      tool.sub,
      tool.desc,
      tool.licLabel,
      tool.harnesses.join(' '),
      tool.formLabel,
      tool.auth,
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(normalizedQuery)) return false;
  }

  return true;
}

/** Parses the comma-separated `f` query param back into a filter set. */
function parseFiltersParam(raw: string | null): Set<ToolFilter> {
  if (!raw) return new Set();
  return new Set(raw.split(',').filter(Boolean) as ToolFilter[]);
}

function serializeFiltersParam(filters: ReadonlySet<ToolFilter>): string | undefined {
  return filters.size ? Array.from(filters).join(',') : undefined;
}

export interface UseToolFiltersResult {
  /** Free-text search query, two-way bound and synced to the `q` URL param. */
  query: Ref<string>;
  /** Currently active filter chips, synced to the `f` URL param. */
  activeFilters: Ref<Set<ToolFilter>>;
  /** Tools matching both the active filters and the current query. */
  filteredTools: ComputedRef<Tool[]>;
  /** Toggles a single filter chip on/off. */
  toggleFilter: (filter: ToolFilter) => void;
  /** Returns whether a given filter chip is currently active. */
  isFilterActive: (filter: ToolFilter) => boolean;
  /** Clears the search query and all active filters. */
  clearFilters: () => void;
}

/**
 * Vue composable providing free-text search + filter-chip state for the
 * tools catalog, kept in sync with the current route's query string so
 * filtered views are shareable/bookmarkable.
 */
export function useToolFilters(tools: Ref<Tool[]> | Tool[]): UseToolFiltersResult {
  const toolsRef = isRef(tools) ? tools : ref(tools);
  const route = useRoute();
  const router = useRouter();

  const initialQueryParam = route.query[QUERY_PARAM];
  const query = ref(typeof initialQueryParam === 'string' ? initialQueryParam : '');

  const initialFiltersParam = route.query[FILTERS_PARAM];
  const activeFilters = ref<Set<ToolFilter>>(
    parseFiltersParam(typeof initialFiltersParam === 'string' ? initialFiltersParam : null),
  );

  // Keep the URL query string in sync whenever search/filter state changes,
  // so the current view can be bookmarked or shared as a link.
  watch(
    [query, activeFilters],
    ([nextQuery, nextFilters]) => {
      const nextRouteQuery: LocationQueryRaw = { ...route.query };

      if (nextQuery) {
        nextRouteQuery[QUERY_PARAM] = nextQuery;
      } else {
        delete nextRouteQuery[QUERY_PARAM];
      }

      const serializedFilters = serializeFiltersParam(nextFilters);
      if (serializedFilters) {
        nextRouteQuery[FILTERS_PARAM] = serializedFilters;
      } else {
        delete nextRouteQuery[FILTERS_PARAM];
      }

      void router.replace({ query: nextRouteQuery });
    },
    { deep: true },
  );

  function toggleFilter(filter: ToolFilter): void {
    const next = new Set(activeFilters.value);
    if (next.has(filter)) {
      next.delete(filter);
    } else {
      next.add(filter);
    }
    activeFilters.value = next;
  }

  function isFilterActive(filter: ToolFilter): boolean {
    return activeFilters.value.has(filter);
  }

  function clearFilters(): void {
    query.value = '';
    activeFilters.value = new Set();
  }

  const filteredTools = computed(() =>
    toolsRef.value.filter((tool) => toolMatches(tool, activeFilters.value, query.value)),
  );

  return {
    query,
    activeFilters,
    filteredTools,
    toggleFilter,
    isFilterActive,
    clearFilters,
  };
}
