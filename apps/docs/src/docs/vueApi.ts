// API of the native Vue components (minerva-design/vue), generated from the
// single-file components' types by scripts/generate-vue-api.mjs
// (vue-component-meta). Loaded on demand, when a page shows the Vue tab.
import { apiKey } from "./api";

export interface VueApiProp {
  name: string;
  type?: string;
  default?: string;
  required: boolean;
  description?: string;
}
export interface VueApiNamed {
  name: string;
  type?: string;
  description?: string;
}
export interface VueComponentApi {
  /** Source file (packages/vue/src/...) */
  file: string;
  props: VueApiProp[];
  events: VueApiNamed[];
  slots: VueApiNamed[];
}

let components: Record<string, VueComponentApi> | null = null;
let loading: Promise<void> | null = null;

/** Loads the Vue component APIs (once); `getVueApi` works afterwards */
export const loadVueApis = (): Promise<void> =>
  (loading ??= import("./api.vue.generated.json").then((mod) => {
    components = mod.default as unknown as Record<string, VueComponentApi>;
  }));

/** API of a Vue component by export name, once `loadVueApis` resolved */
export const getVueApi = (name: string): VueComponentApi | undefined =>
  components?.[name];

export type VueSection = "props" | "events" | "slots";

const camel = (name: string) =>
  name.replace(/[-:](\w)/g, (_, c: string) => c.toUpperCase());

/**
 * The React prop documenting a Vue member: `modelValue` is the React
 * `value` / `checked`, an emit `openChange` the callback `onOpenChange`
 * (`update:open` the `open` prop), a slot `start-icon` the node prop
 * `startIcon` (the default slot: `children`).
 */
export function reactNamesOf(section: VueSection, name: string): string[] {
  if (section === "props") {
    return name === "modelValue" ? ["value", "checked", name] : [name];
  }
  if (section === "events") {
    if (name.startsWith("update:")) return [camel(name.slice(7))];
    return [`on${name.charAt(0).toUpperCase()}${camel(name.slice(1))}`];
  }
  return name === "default" ? ["children"] : [camel(name)];
}

/**
 * i18n keys that may describe a member, most specific first:
 * `docs.<page>.vue.<Component>.<section>.<member>`, then the React docs of
 * the same page (the matching React prop / callback / node prop of one of
 * the page's `api` interfaces).
 */
export function vueDescriptionKeys(
  page: string,
  component: string,
  section: VueSection,
  member: string,
  reactInterfaces: string[] = [],
): string[] {
  const keys = [
    `docs.${page}.vue.${component}.${section}.${member.replace(/:/g, "_")}`,
  ];
  const preferred = [
    `${component}Props`,
    ...reactInterfaces.filter((i) => i !== `${component}Props`),
  ];
  for (const iface of preferred) {
    for (const name of reactNamesOf(section, member)) {
      keys.push(`docs.${page}.api.${apiKey(iface)}.${name}`);
    }
  }
  return keys;
}
