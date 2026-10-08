import api from "./api.generated.json";

export interface ApiProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
}

export type ApiEntry =
  | {
      kind: "interface";
      source: string;
      description?: string;
      extends: string[];
      props: ApiProp[];
    }
  | { kind: "alias"; source: string; description?: string; type: string }
  | { kind: "cssVars"; source: string; vars: ApiCssVar[] }
  | ApiElement;

/** A named member (event, slot, CSS part, CSS property) of an element */
export interface ApiNamed {
  name: string;
  description?: string;
}

/** Custom element of minerva-design/web-components (`wc:<tag>`) */
export interface ApiElement {
  kind: "element";
  source: string;
  className: string;
  summary?: string;
  description?: string;
  properties: Array<{
    name: string;
    attribute?: string;
    type?: string;
    default?: string;
    readonly?: boolean;
    description?: string;
  }>;
  methods: Array<{ name: string; signature: string; description?: string }>;
  events: ApiNamed[];
  slots: ApiNamed[];
  parts: ApiNamed[];
  cssProperties: ApiNamed[];
}

/** Public CSS custom property of a component (`// @css-var` in its SCSS) */
export interface ApiCssVar {
  name: string;
  /** English description from the SCSS comment */
  description: string;
}

const entries = api as Record<string, ApiEntry>;

// React Native APIs (`native:<Name>`) live in their own file, loaded on demand
let nativeEntries: Record<string, ApiEntry> | null = null;
let nativeLoading: Promise<void> | null = null;

/** Loads the React Native APIs (once); `getApiEntry("native:…")` works afterwards */
export const loadNativeApis = (): Promise<void> =>
  (nativeLoading ??= import("./api.native.generated.json").then((mod) => {
    nativeEntries = mod.default as unknown as Record<string, ApiEntry>;
  }));

/** Prefix of the React Native API entries (`native:ButtonProps`) */
export const NATIVE_API_PREFIX = "native:";

export const getApiEntry = (name: string): ApiEntry | undefined => {
  const source = name.startsWith(NATIVE_API_PREFIX) ? nativeEntries : entries;
  return source && Object.prototype.hasOwnProperty.call(source, name)
    ? source[name]
    : undefined;
};

/** i18n-safe key for an interface name (":" is i18next's namespace separator) */
export const apiKey = (name: string) => name.replace(/:/g, "_");

/** CSS custom properties of a React component folder (e.g. "Button") */
export const getCssVars = (folder: string): ApiCssVar[] => {
  const entry = getApiEntry(`css:${folder}`);
  return entry?.kind === "cssVars" ? entry.vars : [];
};

// Web Component APIs live in their own (large) file, loaded on demand
let elements: Record<string, ApiElement> | null = null;
let elementsLoading: Promise<void> | null = null;

/** Loads the custom element APIs (once); `getElementApi` works afterwards */
export const loadElementApis = (): Promise<void> =>
  (elementsLoading ??= import("./api.wc.generated.json").then((mod) => {
    elements = mod.default as unknown as Record<string, ApiElement>;
  }));

/** API of a custom element (`minerva-button`), once `loadElementApis` resolved */
export const getElementApi = (tag: string): ApiElement | undefined =>
  elements?.[`wc:${tag}`];

/**
 * Sections of an element API table, and their i18n key segment. The CSS
 * parts are documented by the "Styling hooks" section (manifest of
 * `minerva-design/styling-hooks`).
 */
export const WC_SECTIONS = [
  "props",
  "events",
  "slots",
  "cssVars",
  "methods",
] as const;
export type WcSection = (typeof WC_SECTIONS)[number];

/** i18n-safe member name: the default slot is "default" */
export const wcMemberKey = (name: string) => name || "default";

/** Members of a section of an element API */
export const wcMembers = (
  api: ApiElement,
  section: WcSection,
): Array<{ name: string; description?: string }> =>
  ({
    props: api.properties,
    events: api.events,
    slots: api.slots,
    cssVars: api.cssProperties,
    methods: api.methods,
  })[section];

/**
 * i18n keys that may describe a member, most specific first:
 * `docs.<page>.wc.<tag>.<section>.<member>`, then the React docs of the same
 * page (a property named like a React prop of one of the page's `api`
 * interfaces, a CSS variable of the page's `cssVars`).
 */
export const wcDescriptionKeys = (
  page: string,
  tag: string,
  section: WcSection,
  member: string,
  reactInterfaces: string[] = [],
): string[] => {
  const keys = [`docs.${page}.wc.${tag}.${section}.${wcMemberKey(member)}`];
  if (section === "props") {
    for (const name of reactInterfaces) {
      keys.push(`docs.${page}.api.${apiKey(name)}.${member}`);
    }
  }
  if (section === "cssVars") keys.push(`docs.${page}.cssVars.${member}`);
  return keys;
};
