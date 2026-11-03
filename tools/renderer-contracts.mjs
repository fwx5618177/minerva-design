// Renderer APIs are read from source types, Vue's canonical API generator,
// Angular signal declarations and the actual WeApp component definitions.
import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import { runnerImport } from "vite";
import { describeType } from "./type-contracts.mjs";
import { portableTypes } from "./portable-types.mjs";
import { generateVueApi } from "../apps/docs/scripts/generate-vue-api.mjs";
const require = createRequire(
  new URL("../apps/docs/package.json", import.meta.url),
);
const { createChecker } = require("vue-component-meta");
const ROOT = new URL("../", import.meta.url).pathname.replace(/\/$/, "");
const at = (path) => join(ROOT, path);
const { module: weapp } = await runnerImport(
  at("packages/weapp/src/index.ts"),
  {
    configFile: false,
    logLevel: "error",
    resolve: { alias: { "@minerva/core": at("packages/core/src/index.ts") } },
  },
);
const kebab = (name) =>
  name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`).replace(/^-/, "");
const prop = (p) => ({ ...p, typeText: p.typeText ?? p.type });
const isCallback = (prop) =>
  /^on[A-Z]/.test(prop.name) && prop.kind === "function";
const callbackApi = (component) => ({
  props: (component?.props ?? []).filter((p) => !isCallback(p)).map(prop),
  events: (component?.props ?? []).filter(isCallback).map(prop),
  slots: component?.children ? [{ name: "children" }] : [],
});
function tupleParameters(typeText) {
  if (!typeText) return undefined;
  const source = ts.createSourceFile(
    "event.ts",
    `type EventArgs = ${typeText}`,
    ts.ScriptTarget.Latest,
    true,
  );
  const type = source.statements[0]?.type;
  if (!type || !ts.isTupleTypeNode(type)) return undefined;
  return type.elements.map((element, position) => {
    const named = ts.isNamedTupleMember(element);
    return {
      name: named ? element.name.getText(source) : `arg${position}`,
      position,
      typeText: (named ? element.type : element).getText(source),
      required: named
        ? !element.questionToken
        : !ts.isOptionalTypeNode(element),
      rest: named ? !!element.dotDotDotToken : ts.isRestTypeNode(element),
    };
  });
}
function angularApis() {
  const config = ts.readConfigFile(
    at("packages/angular/tsconfig.json"),
    ts.sys.readFile,
  );
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    at("packages/angular"),
  );
  const program = ts.createProgram(
    [...parsed.fileNames, at("packages/angular/monaco/index.ts")],
    {
      ...parsed.options,
      noEmit: true,
    },
  );
  const checker = program.getTypeChecker();
  const apis = new Map();
  for (const source of program.getSourceFiles()) {
    if (!/packages\/angular\/(src|monaco)\//.test(source.fileName)) continue;
    for (const node of source.statements) {
      if (!ts.isClassDeclaration(node) || !node.name) continue;
      const decorators = ts.canHaveDecorators(node)
        ? (ts.getDecorators(node) ?? [])
        : [];
      const text = decorators.map((d) => d.getText(source)).join("\n");
      const selector = /selector:\s*["']([^"']+)/.exec(text)?.[1];
      if (!selector) continue;
      const props = [],
        events = [],
        bindings = [];
      for (const member of checker.getPropertiesOfType(
        checker.getTypeAtLocation(node),
      )) {
        const declaration = member.valueDeclaration;
        if (
          !declaration ||
          !ts.isPropertyDeclaration(declaration) ||
          !declaration.initializer
        )
          continue;
        const initializer = declaration.initializer;
        if (!ts.isCallExpression(initializer)) continue;
        const call = initializer.expression.getText(source);
        if (!/^(input|model|output)(\.required)?$/.test(call)) continue;
        const type = checker.getTypeAtLocation(initializer);
        const valueType = checker.getTypeArguments(type)[0];
        const typeText = valueType
          ? portableTypes(
              checker.typeToString(
                valueType,
                undefined,
                ts.TypeFormatFlags.NoTruncation,
              ),
            )
          : "void";
        const alias = /alias:\s*["']([^"']+)/.exec(
          initializer.getText(source),
        )?.[1];
        const name = alias ?? member.name;
        const entry = {
          name,
          typeText,
          required: call.endsWith(".required"),
          source: relative(ROOT, source.fileName),
        };
        if (call.startsWith("output"))
          events.push({
            ...entry,
            parameters: [
              {
                name: "$event",
                position: 0,
                typeText,
                required: true,
                rest: false,
              },
            ],
          });
        else {
          props.push(entry);
          if (call.startsWith("model")) {
            events.push({ name: `${name}Change`, typeText, required: false });
            bindings.push({
              prop: name,
              event: `${name}Change`,
              syntax: `[(${name})]`,
            });
          }
        }
      }
      const slots = [
        ...text.matchAll(
          /<ng-content(?:\s+select=["']([^"']*)["'])?\s*\/?\s*>/g,
        ),
      ].map((m) => ({ name: m[1] ?? "default" }));
      apis.set(node.name.text, { selector, props, events, slots, bindings });
    }
  }
  return apis;
}
function wcEventApis() {
  const parsed = ts.parseJsonConfigFileContent(
    ts.readConfigFile(
      at("packages/web-components/tsconfig.json"),
      ts.sys.readFile,
    ).config,
    ts.sys,
    at("packages/web-components"),
  );
  const program = ts.createProgram(
    [at("packages/web-components/src/index.ts")],
    { ...parsed.options, noEmit: true },
  );
  const checker = program.getTypeChecker(),
    result = new Map();
  for (const source of program.getSourceFiles()) {
    if (!source.fileName.includes("packages/web-components/src/")) continue;
    for (const declaration of source.statements) {
      if (!ts.isClassDeclaration(declaration)) continue;
      const tagMember = declaration.members.find(
        (member) => member.name?.getText(source) === "tagName",
      );
      if (!tagMember?.initializer || !ts.isStringLiteral(tagMember.initializer))
        continue;
      const events = new Map();
      const visit = (node) => {
        if (
          ts.isCallExpression(node) &&
          ts.isPropertyAccessExpression(node.expression) &&
          node.expression.name.text === "emit" &&
          node.arguments[0] &&
          ts.isStringLiteral(node.arguments[0])
        ) {
          const name = node.arguments[0].text,
            detail = node.arguments[1];
          const detailType = detail
            ? describeType(checker, checker.getTypeAtLocation(detail))
            : undefined;
          // Repeated emission of the same event uses the same contract; prefer
          // a nonliteral state variable over a literal reset branch.
          if (!events.has(name))
            events.set(name, {
              detailType,
              typeText: `CustomEvent<${detailType?.typeText ?? "undefined"}>`,
              bubbles: true,
              composed: true,
              cancelable: node.arguments[2]
                ? /cancelable:\s*true/.test(node.arguments[2].getText(source))
                : false,
            });
        }
        ts.forEachChild(node, visit);
      };
      visit(declaration);
      result.set(tagMember.initializer.text, events);
    }
  }
  return result;
}
let sourceApis;
export function rendererSources(readComponents) {
  if (sourceApis) return sourceApis;
  const vue = generateVueApi();
  const uniChecker = createChecker(at("packages/uni/tsconfig.json"), {
    forceUseTs: true,
  });
  const uni = {};
  const index = readFileSync(at("packages/uni/src/index.ts"), "utf8");
  for (const [, name, path] of index.matchAll(
    /export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+["']\.\/([^"']+\.vue)["']/g,
  )) {
    const meta = uniChecker.getComponentMeta(at(`packages/uni/src/${path}`));
    uni[name] = {
      props: meta.props
        .filter((p) => !p.global)
        .map((p) => ({
          name: p.name,
          typeText: portableTypes(p.type),
          required: p.required,
        })),
      events: meta.events.map((e) => ({
        name: e.name,
        typeText: portableTypes(e.type),
      })),
      slots: meta.slots.map((s) => ({
        name: s.name,
        typeText: portableTypes(s.type),
      })),
    };
  }
  const taro = readComponents({
    entries: [
      at("packages/taro/src/index.ts"),
      at("packages/taro/src/monaco.tsx"),
      at("packages/taro/src/icons.ts"),
    ],
    source: /packages\/(taro|core)\/src\//,
    inferCallableProps: true,
    paths: { "@minerva/core": [at("packages/core/src/index.ts")] },
  });
  sourceApis = {
    vue,
    uni,
    angular: angularApis(),
    taro,
    wcEvents: wcEventApis(),
  };
  return sourceApis;
}
function bindingsFor(api, platform) {
  if (api.bindings) return api.bindings;
  const names = new Set(api.events.map((e) => e.name));
  const result = [];
  for (const p of api.props) {
    if (platform === "vue" || platform === "uni") {
      if (names.has(`update:${p.name}`))
        result.push({
          prop: p.name,
          event: `update:${p.name}`,
          syntax: p.name === "modelValue" ? "v-model" : `v-model:${p.name}`,
        });
    } else if (["react", "native", "taro"].includes(platform)) {
      const event = names.has(
        `on${p.name[0].toUpperCase()}${p.name.slice(1)}Change`,
      )
        ? `on${p.name[0].toUpperCase()}${p.name.slice(1)}Change`
        : p.name === "value" && names.has("onChange")
          ? "onChange"
          : undefined;
      if (event)
        result.push({
          prop: p.name,
          event,
          syntax: `${p.name}={${p.name}} ${event}={handler}`,
        });
    }
  }
  return result;
}
export function renderersFor(
  contract,
  { react, native, elements, apis, angularExports },
) {
  const result = {};
  for (const [platform, support] of Object.entries(contract.platforms)) {
    let api,
      exports = [contract.name],
      specifier = `minerva-design/${platform}`;
    if (platform === "react" && react) {
      api = callbackApi(react);
      specifier = react.specifier ?? "minerva-design";
    }
    if (platform === "native" && native) {
      api = callbackApi(native);
      if (contract.name === "Icon") specifier += "/icons";
      exports = [native.exportName ?? contract.name];
    }
    if (platform === "taro" && apis.taro.has(contract.name)) {
      api = callbackApi(apis.taro.get(contract.name));
      if (contract.name === "Icon") specifier += "/icons";
      if (contract.name === "MonacoCodeEditor") specifier += "/monaco";
    }
    if (["vue", "uni"].includes(platform) && apis[platform][contract.name]) {
      const source = apis[platform][contract.name];
      api = {
        props: source.props.map(prop),
        events: source.events.map((event) => ({
          ...prop(event),
          parameters: tupleParameters(event.typeText ?? event.type),
        })),
        slots: source.slots.map(prop),
      };
      if (platform === "vue" && source.file?.includes("/icon/"))
        specifier += "/icons";
      if (contract.name === "MonacoCodeEditor") specifier += "/monaco";
    }
    if (platform === "angular" && apis.angular.has(`Mn${contract.name}`)) {
      exports = [`Mn${contract.name}`];
      api = apis.angular.get(exports[0]);
      if (contract.name === "MonacoCodeEditor") specifier += "/monaco";
    }
    if (platform === "angular" && !api && angularExports) {
      const owner = angularExports.find((name) => apis.angular.has(name));
      if (owner) {
        exports = angularExports;
        api = apis.angular.get(owner);
      }
    }
    if (platform === "wc" && elements) {
      specifier = `minerva-design/web-components/${contract.tag.replace(/^minerva-/, "")}`;
      exports = [];
      api = {
        tag: contract.tag,
        props: elements.properties
          .filter((p) => !p.readonly)
          .map((p) => ({
            name: p.name,
            typeText: p.type,
            attribute: p.attribute,
            required: false,
          })),
        events: elements.events.map((e) => ({
          name: e.name,
          typeText: e.name.startsWith("minerva-") ? "CustomEvent" : "Event",
          ...apis.wcEvents.get(contract.tag)?.get(e.name),
          description: e.description,
        })),
        slots: elements.slots.map((s) => ({ ...s, name: s.name || "default" })),
      };
    }
    if (platform === "weapp") {
      const key =
        contract.name === "Switch"
          ? "toggle"
          : contract.name[0].toLowerCase() + contract.name.slice(1);
      const control = weapp[key];
      if (control?.definition) {
        const name = key === "toggle" ? "switch" : kebab(key);
        specifier = `minerva-design/dist/weapp/${name}/index`;
        exports = [];
        const events = new Map(
          (control.publicApi?.events ?? []).map((e) => [
            e.name,
            { name: e.name, typeText: e.detail, description: e.description },
          ]),
        );
        for (const method of Object.values(control.definition.methods ?? {}))
          for (const [, name] of String(method).matchAll(
            /triggerEvent\(\s*["']([^"']+)/g,
          ))
            if (!events.has(name)) events.set(name, { name });
        api = {
          tag: name,
          props: Object.entries(control.definition.properties ?? {}).map(
            ([name, p]) => ({
              name,
              typeText: p.type?.name?.toLowerCase() ?? "unknown",
              required: false,
              default:
                ["string", "number", "boolean"].includes(typeof p.value) ||
                p.value === null
                  ? p.value
                  : undefined,
            }),
          ),
          events: [...events.values()],
          slots: [
            ...control.template.matchAll(/<slot(?:\s+name=["']([^"']*)["'])?/g),
          ].map((m) => ({ name: m[1] || "default" })),
        };
      }
    }
    result[platform] = {
      ...support,
      ...(api
        ? {
            import: {
              specifier,
              exports,
              kind:
                platform === "weapp"
                  ? "usingComponents"
                  : platform === "wc"
                    ? "side-effect"
                    : "named",
            },
            ...api,
            ...(platform === "weapp"
              ? {
                  registration: `"usingComponents": { "mn-${api.tag}": "${specifier}" }`,
                }
              : {}),
            bindings: bindingsFor(api, platform),
          }
        : {}),
    };
  }
  return result;
}
