// Pure reference projection: renderer-specific contracts remain authoritative;
// React API tables are not silently reused for Vue/Angular/custom elements.
export function referenceRecord({
  version,
  locale,
  renderer,
  page,
  strings,
  contracts,
  apis,
  demos,
  provenance,
  recipes = [],
}) {
  const components = contracts
    .filter(
      (c) =>
        c.docs === page.id ||
        page.exports?.includes(c.name) ||
        page.native?.exports.includes(c.name) ||
        page.wc?.tags.includes(c.tag),
    )
    .map((c) => ({
      name: c.name,
      support: c.platforms?.[renderer] ?? {
        status: "n/a",
        notes: "No renderer support is declared.",
      },
      api: c.renderers?.[renderer] ?? null,
    }));
  const apiNames =
    renderer === "native"
      ? page.native?.api?.map((n) => `native:${n}`)
      : renderer === "wc"
        ? page.wc?.tags?.map((tag) => `wc:${tag}`)
        : renderer === "react"
          ? page.api
          : [];
  return {
    schemaVersion: 1,
    packageVersion: version,
    locale,
    renderer,
    page: page.id,
    title: strings.title ?? page.id,
    description: strings.description ?? "",
    provenance,
    content: Object.fromEntries(
      Object.entries(strings).filter(
        ([key]) =>
          ![
            "title",
            "description",
            "api",
            "cssVars",
            "demos",
            "wc",
            "vue",
            "native",
          ].includes(key),
      ),
    ),
    components,
    api: Object.fromEntries(
      (apiNames ?? []).filter((n) => apis[n]).map((n) => [n, apis[n]]),
    ),
    cssVariables: Object.fromEntries(
      (page.cssVars ?? [])
        .map((n) => [`css:${n}`, apis[`css:${n}`]])
        .filter(([, v]) => v),
    ),
    examples: demos,
    recipes: recipes.filter(
      (r) => r.renderer === renderer && r.pages.includes(page.id),
    ),
    installation: "./setup.md",
  };
}
function prose(value, depth = 2) {
  if (typeof value === "string")
    return value
      .replace(/<code>(.*?)<\/code>/g, "`$1`")
      .replace(/<[^>]+>/g, "");
  if (Array.isArray(value))
    return value.map((item) => prose(item, depth)).join("\n\n");
  if (!value || typeof value !== "object") return "";
  return Object.entries(value)
    .map(([key, item]) =>
      key === "title"
        ? `${"#".repeat(Math.min(depth, 6))} ${item}`
        : /code|snippet/i.test(key) && typeof item === "string"
          ? `\`\`\`tsx\n${item}\n\`\`\``
          : prose(item, depth + 1),
    )
    .join("\n\n");
}
const json = (value) => `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
export function renderReferenceMarkdown(record) {
  const out = [
    `# ${record.title}`,
    record.description,
    `Package: minerva-design@${record.packageVersion}\n\nRenderer: ${record.renderer}\n\nLocale: ${record.locale}`,
    "## Provenance",
    json(record.provenance),
  ];
  if (record.typeGraph)
    out.push(
      `Type references resolve through the [type graph](${record.typeGraph}) or getType() from minerva-design/contracts.`,
    );
  if (record.content) out.push("## Documentation", prose(record.content));
  for (const snippet of record.snippets ?? [])
    out.push(`\`\`\`${snippet.language}\n${snippet.source}\n\`\`\``);
  for (const component of record.components) {
    out.push(
      `## ${component.name}`,
      `Support: ${component.support.status}`,
      component.support.notes ?? "",
    );
    if (component.api) {
      const api = component.api;
      if (api.import) out.push("### Import", json(api.import));
      for (const name of ["props", "events", "slots", "bindings"])
        if (api[name]?.length) out.push(`### ${name}`, json(api[name]));
    }
  }
  if (Object.keys(record.api).length) out.push("## API", json(record.api));
  if (Object.keys(record.cssVariables).length)
    out.push("## CSS variables", json(record.cssVariables));
  out.push(
    "## Installation and initialization",
    `See [installation](${record.installation}). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.`,
  );
  if (record.recipes.length)
    out.push(
      "## Standalone recipes",
      ...record.recipes.map(
        (r) =>
          `- [${r.title}](${r.url}) — ${r.renderer}; verified package ${record.packageVersion}`,
      ),
    );
  for (const example of record.examples) {
    out.push(
      `## Example: ${example.title ?? example.id}`,
      example.description ?? "",
      "Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.",
      `External dependencies: ${example.dependencies.join(", ") || "none"}`,
      `Documentation context imports: ${example.contextImports.join(", ") || "none"}`,
    );
    for (const [file, source] of Object.entries(example.files))
      out.push(
        `### ${file}`,
        `\`\`\`${file.endsWith(".vue") ? "vue" : file.endsWith(".html") ? "html" : file.endsWith(".scss") ? "scss" : "tsx"}\n${source}\n\`\`\``,
      );
  }
  return out.filter(Boolean).join("\n\n") + "\n";
}
