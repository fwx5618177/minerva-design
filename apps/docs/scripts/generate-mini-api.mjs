// Public mini renderer APIs are derived from their implementation signatures.
// Platform notes remain separate: a declared prop is not a parity claim.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { createChecker } from "vue-component-meta";
import { runnerImport } from "vite";
import { taroComponentManifest } from "../../../packages/taro/src/manifest.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
export const MINI_API_OUTPUT = join(
  root,
  "apps/docs/src/docs/api.mini.generated.json",
);
const clean = (text) => text?.replace(/\s+/g, " ").trim();
const sorted = (list) => list.sort((a, b) => a.name.localeCompare(b.name));

function uniApi() {
  const pkg = join(root, "packages/uni");
  const checker = createChecker(join(pkg, "tsconfig.json"), {
    forceUseTs: true,
    printer: { newLine: 1 },
  });
  const source = readFileSync(join(pkg, "src/index.ts"), "utf8");
  return Object.fromEntries(
    [
      ...source.matchAll(
        /export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+["'](.+\.vue)["']/g,
      ),
    ].map(([, name, path]) => {
      const meta = checker.getComponentMeta(join(pkg, "src", path));
      return [
        name,
        {
          entry: "minerva-design/uni",
          props: sorted(
            meta.props
              .filter((p) => !p.global)
              .map((p) => ({
                name: p.name,
                type: clean(p.type),
                required: p.required,
                ...(p.default !== undefined && p.default !== "undefined"
                  ? { default: clean(p.default) }
                  : {}),
                ...(p.description ? { description: p.description } : {}),
              })),
          ),
          events: sorted(
            meta.events.map((e) => ({ name: e.name, type: clean(e.type) })),
          ),
          slots: sorted(
            meta.slots.map((s) => ({ name: s.name, type: clean(s.type) })),
          ),
          methods: sorted(
            meta.exposed.map((member) => ({
              name: member.name,
              type: clean(member.type),
              ...(member.description
                ? { description: member.description }
                : {}),
            })),
          ),
        },
      ];
    }),
  );
}

function taroApi() {
  const config = ts.readConfigFile(
    join(root, "packages/taro/tsconfig.json"),
    ts.sys.readFile,
  );
  if (config.error)
    throw new Error(
      ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
    );
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    join(root, "packages/taro"),
  );
  const entry = join(root, "packages/taro/src/index.ts");
  const program = ts.createProgram([entry], {
    ...parsed.options,
    noEmit: true,
  });
  const checker = program.getTypeChecker();
  const exports = new Map(
    checker
      .getExportsOfModule(
        checker.getSymbolAtLocation(program.getSourceFile(entry)),
      )
      .map((s) => [s.name, s]),
  );
  return Object.fromEntries(
    taroComponentManifest
      .filter((item) => item.status !== "n/a")
      .map(({ name }) => {
        const exported = exports.get(name);
        if (!exported) throw new Error(`Missing Taro export ${name}`);
        const target =
          exported.flags & ts.SymbolFlags.Alias
            ? checker.getAliasedSymbol(exported)
            : exported;
        const location = target.valueDeclaration ?? target.declarations?.[0];
        const type = checker.getTypeOfSymbolAtLocation(target, location);
        const signature = type.getCallSignatures()[0];
        const parameter = signature?.parameters[0];
        const props = parameter
          ? checker
              .getPropertiesOfType(
                checker.getTypeOfSymbolAtLocation(parameter, location),
              )
              .map((property) => ({
                name: property.name,
                type: checker.typeToString(
                  checker.getTypeOfSymbolAtLocation(property, location),
                  undefined,
                  ts.TypeFormatFlags.NoTruncation,
                ),
                required: !(property.flags & ts.SymbolFlags.Optional),
                ...(property.getDocumentationComment(checker).length
                  ? {
                      description: ts.displayPartsToString(
                        property.getDocumentationComment(checker),
                      ),
                    }
                  : {}),
              }))
          : [];
        return [
          name,
          {
            entry: "minerva-design/taro",
            props: sorted(props.filter((p) => !/^on[A-Z]/.test(p.name))),
            events: sorted(props.filter((p) => /^on[A-Z]/.test(p.name))),
            slots: [],
            methods: [],
          },
        ];
      }),
  );
}

async function weappApi() {
  const { module: controls } = await runnerImport(
    join(root, "packages/weapp/src/index.ts"),
    { configFile: false, logLevel: "error" },
  );
  return Object.fromEntries(
    Object.entries(controls)
      .filter(([, c]) => c?.definition && c?.template)
      .map(([key, component]) => {
        const name =
          key === "toggle" ? "Switch" : key[0].toUpperCase() + key.slice(1);
        const entry =
          key === "toggle"
            ? "switch"
            : key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        const props = Object.entries(component.definition.properties ?? {}).map(
          ([name, definition]) => {
            const schema =
              typeof definition === "function"
                ? { type: definition }
                : definition;
            const types = [schema?.type, ...(schema?.optionalTypes ?? [])].map(
              (type) => type?.name?.toLowerCase() ?? "any",
            );
            return {
              name,
              type: [...new Set(types)].join(" | "),
              required: false,
              ...(schema && "value" in schema
                ? { default: JSON.stringify(schema.value) }
                : {}),
            };
          },
        );
        const methods = sorted(
          (
            component.publicApi?.methods ??
            Object.keys(component.definition.methods ?? {})
              .filter((name) => name === "configure")
              .map((name) => ({ name, signature: "configure(options): void" }))
          ).map((method) => ({
            name: method.name,
            type: method.signature,
            ...(method.description ? { description: method.description } : {}),
          })),
        );
        const events = new Set(
          [
            ...Object.values(component.definition.methods ?? {}),
            ...Object.values(component.definition.lifetimes ?? {}),
          ].flatMap((fn) =>
            [...String(fn).matchAll(/triggerEvent\(["']([^"']+)["']/g)].map(
              (m) => m[1],
            ),
          ),
        );
        const publicEvents = new Map(
          [...events].map((name) => [name, { name, type: "event.detail" }]),
        );
        for (const event of component.publicApi?.events ?? [])
          publicEvents.set(event.name, {
            name: event.name,
            type: event.detail,
            ...(event.description ? { description: event.description } : {}),
          });
        const slots = new Set(
          [...component.template.matchAll(/<slot\b([^>]*)\/?\s*>/g)].map(
            ([, attrs]) =>
              /name=["']([^"']+)["']/.exec(attrs)?.[1] ?? "default",
          ),
        );
        return [
          name,
          {
            entry: `minerva-design/${entry}/index`,
            props: sorted(props),
            events: sorted([...publicEvents.values()]),
            slots: sorted(
              [...slots].map((name) => ({ name, type: "native slot" })),
            ),
            methods,
          },
        ];
      }),
  );
}

export async function generateMiniApi() {
  return { taro: taroApi(), uni: uniApi(), weapp: await weappApi() };
}
export async function serializeMiniApi(api) {
  api ??= await generateMiniApi();
  const prettier = await import("prettier");
  return Object.fromEntries(
    await Promise.all(
      Object.entries(api).map(async ([platform, components]) => {
        const file = MINI_API_OUTPUT.replace(
          "mini.generated",
          `${platform}.mini.generated`,
        );
        return [
          file,
          await prettier.format(JSON.stringify(components), {
            ...(await prettier.resolveConfig(file)),
            filepath: file,
          }),
        ];
      }),
    ),
  );
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const files = await serializeMiniApi();
  for (const [file, next] of Object.entries(files)) {
    if (process.argv.includes("--check")) {
      if (readFileSync(file, "utf8") !== next)
        throw new Error(
          "Mini renderer API is stale. Run pnpm --filter @minerva/docs gen:api",
        );
    } else writeFileSync(file, next);
    console.log(`${relative(root, file)} is current`);
  }
}
