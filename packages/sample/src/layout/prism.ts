// Prism and its grammars are loaded on demand, so pages without code samples
// (and the initial bundle) don't pay for syntax highlighting.
import type PrismType from "prismjs";

type Prism = typeof PrismType;

declare global {
  interface Window {
    Prism?: Partial<Prism> & { manual?: boolean };
  }
}

/** Language aliases accepted by <CodeBlock language="…"> */
const aliases: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  html: "markup",
  xml: "markup",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
};

/** Grammar loaders. Each loader also loads the grammars it extends. */
const grammars: Record<string, () => Promise<unknown>> = {
  typescript: () => import("prismjs/components/prism-typescript"),
  jsx: () => import("prismjs/components/prism-jsx"),
  tsx: async () => {
    await grammars.jsx();
    await grammars.typescript();
    return import("prismjs/components/prism-tsx");
  },
  bash: () => import("prismjs/components/prism-bash"),
  json: () => import("prismjs/components/prism-json"),
  scss: () => import("prismjs/components/prism-scss"),
  yaml: () => import("prismjs/components/prism-yaml"),
};

let core: Promise<Prism> | undefined;

const loadCore = () => {
  if (!core) {
    // Stop Prism from highlighting the whole document on load
    window.Prism = { ...(window.Prism ?? {}), manual: true };
    core = import("prismjs").then((mod) => mod.default);
  }
  return core;
};

export const normalizeLanguage = (language: string) =>
  aliases[language] ?? language;

/** Returns highlighted HTML, or `undefined` if the grammar is unknown */
export const highlight = async (code: string, language: string) => {
  const lang = normalizeLanguage(language);
  const prism = await loadCore();
  if (!prism.languages[lang] && grammars[lang]) await grammars[lang]();
  const grammar = prism.languages[lang];
  return grammar ? prism.highlight(code, grammar, lang) : undefined;
};
