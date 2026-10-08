// Frameworks of the docs site's global framework selector.
//
// Each entry says how a component page renders for the framework:
// - renderer "react": the React demos and the props tables of React
// - renderer "web-components": the live custom-element demos of the page,
//   their source in the framework's idiom (generated at build time from the
//   wc/<demo>.html + wc/<demo>.ts sources by ./transform.ts) and the element
//   API (attributes, properties, events, slots, parts)
// - renderer "native": the React Native components (minerva-design/native)
//   rendered live through react-native-web in a phone frame, their RN TSX
//   source (pages/<id>/native/<demo>.tsx) and the native props tables
//
// Adding a framework (Taro, WeChat mini programs, uni-app...)
// is adding an entry: a new `renderer` kind for a new rendering strategy, or
// an existing one plus a source dialect (`WC_FRAMEWORKS` in ./transform.ts).
// Vue and Angular get native renderers later (see the Platform support page);
// until then they render the Web Components (`nativePlanned`).
import type { WcMeta } from "../registry";

export type FrameworkId =
  "react" | "react-native" | "vue" | "angular" | "svelte" | "solid" | "html";

/** Frameworks rendered from the Web Component demos */
export type WcFrameworkId = Exclude<FrameworkId, "react" | "react-native">;

export type FrameworkRenderer = "react" | "native" | "web-components";

export interface SetupSnippet {
  /** i18n key under `doc.fw.setup` describing the step */
  step: string;
  /** File the code goes in */
  file: string;
  language: string;
  code: string;
}

export interface FrameworkDef {
  id: FrameworkId;
  /** Product name (not translated) */
  label: string;
  renderer: FrameworkRenderer;
  /** Prism language of the demo sources */
  language: string;
  /** Docs page with the full integration guide */
  guide: string;
  /** Registration, compiler and typings steps for a component page */
  setup: (wc: WcMeta) => SetupSnippet[];
  /**
   * A native renderer is planned (`minerva-design/vue`,
   * `minerva-design/angular`): until it lands the page shows the Web
   * Components "via Web Components (native coming soon)".
   */
  nativePlanned?: boolean;
}

const PKG = "minerva-design/web-components";
/** Paths inside the published package (node_modules / CDN) */
const TOKENS_FILE = "minerva-design/dist/core/tokens.css";
const CDN_FILE = "minerva-design/dist/web-components/cdn/minerva.js";

const register = (wc: WcMeta, file: string, extra = ""): SetupSnippet => ({
  step: "register",
  file,
  language: "ts",
  code: `${extra}// registers ${wc.tags.map((tag) => `<${tag}>`).join(", ")} (and only them)
import "${PKG}/${wc.entry}";
// or every element at once: import "${PKG}";
import "minerva-design/tokens.css";`,
});

export const FRAMEWORKS: readonly FrameworkDef[] = [
  {
    id: "react",
    label: "React",
    renderer: "react",
    language: "tsx",
    guide: "installation",
    setup: () => [],
  },
  {
    id: "react-native",
    label: "React Native",
    renderer: "native",
    language: "tsx",
    guide: "react-native",
    setup: () => [],
  },
  {
    id: "vue",
    label: "Vue",
    renderer: "web-components",
    nativePlanned: true,
    language: "html",
    guide: "wc-vue",
    setup: (wc) => [
      register(wc, "src/main.ts"),
      {
        step: "vueCompiler",
        file: "vite.config.ts",
        language: "ts",
        code: `import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue({
      template: {
        // <minerva-*> are custom elements, not Vue components
        compilerOptions: { isCustomElement: (tag) => tag.startsWith("minerva-") },
      },
    }),
  ],
};`,
      },
      {
        step: "types",
        file: "tsconfig.json",
        language: "json",
        code: `{
  "compilerOptions": {
    "types": ["${PKG}/vue"]
  }
}`,
      },
    ],
  },
  {
    id: "angular",
    label: "Angular",
    renderer: "web-components",
    nativePlanned: true,
    language: "ts",
    guide: "wc-angular",
    setup: (wc) => [
      register(wc, "src/main.ts"),
      {
        step: "angularSchema",
        file: "*.component.ts",
        language: "ts",
        code: `import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  // lets the template use <minerva-*> tags and bind their properties
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})`,
      },
    ],
  },
  {
    id: "svelte",
    label: "Svelte",
    renderer: "web-components",
    language: "html",
    guide: "wc-svelte",
    setup: (wc) => [
      register(wc, "src/main.ts"),
      {
        step: "types",
        file: "src/app.d.ts",
        language: "ts",
        code: `/// <reference types="${PKG}/svelte" />`,
      },
    ],
  },
  {
    id: "solid",
    label: "Solid",
    renderer: "web-components",
    language: "tsx",
    guide: "web-components",
    setup: (wc) => [
      register(wc, "src/index.tsx"),
      {
        step: "solidTypes",
        file: "src/env.d.ts",
        language: "ts",
        code: `/// <reference types="${PKG}/solid" />`,
      },
    ],
  },
  {
    id: "html",
    label: "HTML",
    renderer: "web-components",
    language: "html",
    guide: "wc-plain-html",
    setup: (wc) => [
      {
        step: "htmlModule",
        file: "index.html",
        language: "html",
        code: `<link rel="stylesheet" href="/node_modules/${TOKENS_FILE}" />
<script type="module">
  import "${PKG}/${wc.entry}";
</script>`,
      },
      {
        step: "htmlCdn",
        file: "index.html",
        language: "html",
        code: `<!-- no build step: the self-contained bundle registers every element -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/${TOKENS_FILE}" />
<script type="module" src="https://cdn.jsdelivr.net/npm/${CDN_FILE}"></script>`,
      },
    ],
  },
];

export const DEFAULT_FRAMEWORK: FrameworkId = "react";

/** Ids of the previous "React | Web Components" switch, and aliases */
const LEGACY_IDS: Record<string, FrameworkId> = {
  wc: "html",
  native: "react-native",
  rn: "react-native",
};

/** A known framework id (`?framework=` value, stored choice), or undefined */
export function parseFramework(
  value: string | null | undefined,
): FrameworkId | undefined {
  if (!value) return undefined;
  const id = LEGACY_IDS[value] ?? value;
  return FRAMEWORKS.some((fw) => fw.id === id)
    ? (id as FrameworkId)
    : undefined;
}

export const getFramework = (id: FrameworkId): FrameworkDef =>
  FRAMEWORKS.find((fw) => fw.id === id)!;
