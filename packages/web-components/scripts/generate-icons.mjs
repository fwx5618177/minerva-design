// Converts the React library's internal icon set (src/internal/icons.tsx) into Lit SVG
// templates (src/internal/icons.ts), so both libraries draw the same icons.
//   node scripts/generate-icons.mjs          (write)
//   node scripts/generate-icons.mjs --check  (exit 1 when stale)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

const SOURCE = fileURLToPath(
  new URL("../../react/src/internal/icons.tsx", import.meta.url),
);
const OUTPUT = fileURLToPath(
  new URL("../src/internal/icons.ts", import.meta.url),
);

/** String constants of icons.tsx (e.g. `const CIRCLE = "M12 2a10..."`) */
let constants = new Map();

const jsxToSvg = (body) =>
  body
    // d={`${CIRCLE}M11...`} -> d="M12 2a10...M11..."
    .replace(
      /=\{`([^`]*)`\}/g,
      (_, tpl) =>
        `="${tpl.replace(/\$\{(\w+)\}/g, (__, name) => {
          if (!constants.has(name)) throw new Error(`unknown constant ${name}`);
          return constants.get(name);
        })}"`,
    )
    .replace(/\s+/g, " ")
    .replace(
      /([a-z])([A-Z])(?=[a-zA-Z]*=)/g,
      (_, a, b) => `${a}-${b.toLowerCase()}`,
    )
    .replace(/=\{([^}]+)\}/g, '="$1"')
    .replace(/> </g, "><")
    .trim();

export async function generateIcons() {
  const text = readFileSync(SOURCE, "utf8");
  constants = new Map(
    [...text.matchAll(/^const (\w+) = "([^"]*)";$/gm)].map(([, k, v]) => [
      k,
      v,
    ]),
  );
  const pattern =
    /export function (Icon\w+)\(props: IconProps\) \{\s*return \(\s*<(StrokeIcon|FillIcon)([^>]*)>([\s\S]*?)<\/\2>\s*\);\s*\}/g;
  const icons = [];
  for (const [, name, kind, attrs, body] of text.matchAll(pattern)) {
    icons.push({
      name,
      kind,
      attrs: jsxToSvg(attrs.replace("{...props}", "")),
      body: jsxToSvg(body),
    });
  }
  if (icons.length === 0) throw new Error("no icons found in React icons.tsx");
  const lines = [
    "// Generated from the React library's src/internal/icons.tsx by",
    "// scripts/generate-icons.mjs: do not edit. Same icons as React",
    "// (stroke geometry largely from Lucide, ISC license: see React).",
    'import { svg, type SVGTemplateResult } from "lit";',
    "",
    "/** Outline icon (1em, currentColor stroke), decorative. */",
    "const stroke = (body: SVGTemplateResult) =>",
    '  svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;',
    "",
    "/** Solid icon (1em, currentColor fill, even-odd cut-outs), decorative. */",
    "const fill = (body: SVGTemplateResult) =>",
    '  svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false">${body}</svg>`;',
    "",
  ];
  for (const icon of icons) {
    const wrap = icon.kind === "StrokeIcon" ? "stroke" : "fill";
    lines.push(`export const ${icon.name} = ${wrap}(svg\`${icon.body}\`);`);
  }
  const options = (await resolveConfig(OUTPUT)) ?? {};
  return format(`${lines.join("\n")}\n`, { ...options, filepath: OUTPUT });
}

const next = await generateIcons();
if (process.argv.includes("--check")) {
  if (!existsSync(OUTPUT) || readFileSync(OUTPUT, "utf8") !== next) {
    console.error(
      "src/internal/icons.ts is stale: run node scripts/generate-icons.mjs",
    );
    process.exit(1);
  }
} else if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(OUTPUT, next);
}
