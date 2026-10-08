// Framework typings and IDE data, generated from custom-elements.json into
// minerva-design/dist/web-components/ (run by `build`, after vite):
// - dist/types/react.d.ts   React 19 JSX.IntrinsicElements
// - dist/types/vue.d.ts     Vue GlobalComponents (Volar)
// - dist/types/svelte.d.ts  Svelte 5 SvelteHTMLElements
// - dist/types/solid.d.ts   Solid JSX.IntrinsicElements
// - dist/html-custom-data.json  VS Code HTML custom data
// (HTMLElementTagNameMap ships with each element's own declarations.)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { MANIFEST, elementsOf, optionalEntryOf } from "./manifest.mjs";
import { WEB_COMPONENTS_DIST } from "../../../tools/paths.mjs";

/** Settable properties of an element (keys of its class) */
const propsOf = (element) =>
  (element.members ?? [])
    .filter((m) => m.kind === "field" && !m.readonly && !m.static)
    .map((m) => m.name);

const eventsOf = (element) =>
  (element.events ?? []).map((e) => e.name).filter(Boolean);

const camel = (name) => name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const header = (title) =>
  `// ${title}\n// Generated from custom-elements.json by scripts/generate-typings.mjs: do not edit.\n`;

/** Type imports: the all-in-one entry, plus the optional entries' modules */
const importLine = (elements) => {
  const groups = new Map();
  for (const e of elements) {
    const entry = optionalEntryOf(e);
    const from = entry ? `../elements/${entry}.js` : "../index.js";
    groups.set(from, [...(groups.get(from) ?? []), e.name]);
  }
  return [...groups]
    .map(
      ([from, names]) =>
        `import type {\n${names.map((n) => `  ${n},`).join("\n")}\n} from "${from}";\n`,
    )
    .join("");
};

const pick = (element) => {
  const props = propsOf(element);
  return props.length
    ? `Partial<Pick<${element.name}, ${props.map((p) => JSON.stringify(p)).join(" | ")}>>`
    : "{}";
};

const eventProps = (element, key) =>
  eventsOf(element)
    .map(
      (name) =>
        `    ${JSON.stringify(key(name))}?: (event: CustomEvent) => void;`,
    )
    .join("\n");

export function generateTypings(manifest) {
  const elements = elementsOf(manifest).sort((a, b) =>
    a.tagName.localeCompare(b.tagName),
  );
  const imports = importLine(elements);

  const react = `${header('React 19 JSX typings: /// <reference types="minerva-design/web-components/react" />')}${imports}import type { DetailedHTMLProps, HTMLAttributes } from "react";

type MinervaIntrinsic<E extends HTMLElement, P, V> = Omit<
  DetailedHTMLProps<HTMLAttributes<E>, E>,
  keyof P | keyof V
> &
  P &
  V;

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
${elements
  .map(
    (e) =>
      `      ${JSON.stringify(e.tagName)}: MinervaIntrinsic<\n        ${e.name},\n        ${pick(e)},\n        {\n${eventProps(e, (n) => `on${n}`).replace(/^ {4}/gm, "          ")}\n        }\n      >;`,
  )
  .join("\n")}
    }
  }
}
`;

  const vue = `${header('Vue typings (Volar): add "minerva-design/web-components/vue" to compilerOptions.types')}${imports}import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
${elements
  .map(
    (e) =>
      `    ${JSON.stringify(e.tagName)}: DefineComponent<\n      ${pick(e)} & {\n${eventProps(e, (n) => camel(`on-${n}`)).replace(/^ {4}/gm, "        ")}\n      }\n    >;`,
  )
  .join("\n")}
  }
}

export {};
`;

  const svelte = `${header('Svelte 5 typings: /// <reference types="minerva-design/web-components/svelte" />')}${imports}import type { HTMLAttributes } from "svelte/elements";

declare module "svelte/elements" {
  interface SvelteHTMLElements {
${elements
  .map(
    (e) =>
      `    ${JSON.stringify(e.tagName)}: Omit<HTMLAttributes<${e.name}>, keyof ${pick(e)}> &\n      ${pick(e)} & {\n${eventProps(e, (n) => `on${n}`).replace(/^ {4}/gm, "        ")}\n      };`,
  )
  .join("\n")}
  }
}

export {};
`;

  const solid = `${header('Solid typings: /// <reference types="minerva-design/web-components/solid" />')}${imports}import type { JSX } from "solid-js";

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
${elements
  .map(
    (e) =>
      `      ${JSON.stringify(e.tagName)}: Omit<JSX.HTMLAttributes<${e.name}>, keyof ${pick(e)}> &\n        ${pick(e)} & {\n${eventProps(e, (n) => `on:${n}`).replace(/^ {4}/gm, "          ")}\n        };`,
  )
  .join("\n")}
    }
  }
}

export {};
`;

  const literalValues = (text = "") => {
    const parts = text.split("|").map((p) => p.trim());
    return parts.every((p) => /^"[^"]*"$/.test(p))
      ? parts.map((p) => ({ name: p.slice(1, -1) }))
      : undefined;
  };
  const customData = {
    $schema:
      "https://raw.githubusercontent.com/microsoft/vscode-html-languageservice/main/docs/customData.schema.json",
    version: 1.1,
    tags: elements.map((e) => ({
      name: e.tagName,
      description: [
        e.summary ?? e.description ?? "",
        e.events?.length
          ? `\n\nEvents: ${e.events.map((ev) => `\`${ev.name}\``).join(", ")}`
          : "",
        e.slots?.length
          ? `\n\nSlots: ${e.slots.map((s) => `\`${s.name || "(default)"}\``).join(", ")}`
          : "",
      ].join(""),
      attributes: (e.attributes ?? []).map((a) => {
        const values = literalValues(a.type?.text);
        return {
          name: a.name,
          description: [a.description, a.default ? `Default: ${a.default}` : ""]
            .filter(Boolean)
            .join("\n\n"),
          ...(values ? { values } : {}),
          ...(a.type?.text === "boolean" ? { valueSet: "v" } : {}),
        };
      }),
      references: [
        {
          name: "Documentation",
          url: `https://fwx5618177.github.io/minerva-design/web-components/${e.tagName.replace(/^minerva-/, "")}`,
        },
      ],
    })),
  };

  return { react, vue, svelte, solid, customData };
}

const isMain = process.argv[1]?.endsWith("generate-typings.mjs");
if (isMain) {
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  const { customData, ...files } = generateTypings(manifest);
  const dir = join(WEB_COMPONENTS_DIST, "types");
  mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(dir, `${name}.d.ts`), content);
  }
  writeFileSync(
    join(WEB_COMPONENTS_DIST, "html-custom-data.json"),
    `${JSON.stringify(customData, null, 2)}\n`,
  );
  console.log(
    "Wrote dist/web-components/types/*.d.ts and dist/web-components/html-custom-data.json",
  );
}
