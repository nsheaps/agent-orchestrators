export type LicenseKind = 'permissive' | 'copyleft' | 'proprietary';
export type FormFactor = 'desktop' | 'web' | 'mobile';
export type Tier = 1 | 2 | 3;

export interface Tool {
  slug: string;
  tier: Tier;
  name: string;
  sub: string;
  lic: LicenseKind;
  licLabel: string;
  /** Direct link to the license text — the LICENSE file in the repo, or a terms page when there's no repo. */
  licenseUrl: string | null;
  forms: FormFactor[];
  formLabel: string;
  desc: string;
  auth: string;
  harnesses: string[];
  /** Code homepage — the source repository. */
  repo: string | null;
  /** Fallback label shown when there's no public repo to link to. */
  repoLabel?: string;
  /** Product/marketing homepage. */
  homepage: string | null;
  /** Developers homepage — docs/guide site, distinct from the marketing homepage. */
  devHomepage: string | null;
  note?: string;
}
