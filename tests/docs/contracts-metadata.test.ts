import ts from "typescript";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { generateContracts } from "../../tools/generate-contracts.mjs";

const contracts = generateContracts();
describe("renderer metadata", () => {
  it("retains inherited React input API without misclassifying it as WC-only", () => {
    for (const componentName of ["Input", "Textarea"]) {
      const contract = contracts.find((entry) => entry.name === componentName)!;
      for (const name of [
        "value",
        "defaultValue",
        "disabled",
        "readOnly",
        "required",
        "name",
        ...(componentName === "Input" ? ["type", "placeholder"] : []),
      ]) {
        const prop = contract.props.find((entry) => entry.name === name);
        expect(prop, `${contract.name}.${name}`).toBeDefined();
        expect(prop?.only).not.toBe("wc");
        expect(prop?.inherited).toBe(true);
        expect(prop?.source).toContain("react");
      }
      expect(
        contract.events.find((event) => event.react === "onChange"),
      ).toBeDefined();
    }
  });
});

it("keeps renderer-specific imports, bindings and slots from their real APIs", () => {
  const select = contracts.find((entry) => entry.name === "Select")!;
  expect(select.renderers.react.import!.specifier).toBe("minerva-design");
  expect(select.renderers.weapp.import!.kind).toBe("usingComponents");
  expect(select.renderers.weapp.registration).toContain("usingComponents");
  expect(select.renderers.react.bindings).toContainEqual({
    prop: "value",
    event: "onChange",
    syntax: "value={value} onChange={handler}",
  });
  expect(select.renderers.vue.bindings).toContainEqual({
    prop: "modelValue",
    event: "update:modelValue",
    syntax: "v-model",
  });
  expect(select.renderers.vue.bindings).toContainEqual({
    prop: "open",
    event: "update:open",
    syntax: "v-model:open",
  });
  expect(
    contracts.find((entry) => entry.name === "Input")!.renderers.angular
      .bindings,
  ).toContainEqual({
    prop: "value",
    event: "valueChange",
    syntax: "[(value)]",
  });
  expect(
    contracts
      .find((entry) => entry.name === "Empty")!
      .renderers.vue.slots!.map((s) => s.name),
  ).toContain("title");
  expect(
    contracts
      .find((entry) => entry.name === "Empty")!
      .renderers.wc.slots!.map((s) => s.name),
  ).toContain("heading");
  for (const platform of [
    "react",
    "wc",
    "vue",
    "angular",
    "native",
    "taro",
    "uni",
    "weapp",
  ] as const) {
    const api = contracts.find((entry) => entry.name === "Input")!.renderers[
      platform
    ];
    expect(api.import!.specifier).toBeTruthy();
    expect(
      api.props!.map((p) => p.name),
      platform,
    ).toContain(platform === "vue" ? "modelValue" : "value");
    expect(api.events!.length, platform).toBeGreaterThan(0);
  }
});

it("preserves complex data shapes and required callback signatures", async () => {
  const { generateTypeGraph } =
    await import("../../tools/generate-contracts.mjs");
  const graph = generateTypeGraph();
  const upload = contracts.find((entry) => entry.name === "Upload")!;
  const value = upload.props.find((prop) => prop.name === "value")!;
  const array = graph[value.typeRef!];
  expect(array.kind).toBe("array");
  const item = graph[array.elementType!];
  expect(
    item.fields!.filter((field) => field.required).map((field) => field.name),
  ).toEqual(["id", "name", "status"]);
  const status =
    graph[item.fields!.find((field) => field.name === "status")!.typeRef!];
  expect(status.values).toEqual(["done", "error", "uploading"]);
  const callback = upload.events.find(
    (event) => event.react === "onFilesSelected",
  )!;
  expect(callback.required).toBe(true);
  expect(callback.parameters![0]).toMatchObject({
    name: "files",
    typeText: "File[]",
    required: true,
  });
  expect(callback.returnType!.typeText).toBe("void");
  const fileArray = graph[callback.parameters![0].typeRef];
  expect(graph[fileArray.elementType!]).toMatchObject({
    name: "File",
    kind: "external",
  });
  const table = contracts.find((entry) => entry.name === "Table")!;
  const columns =
    graph[table.props.find((prop) => prop.name === "columns")!.typeRef!];
  expect(
    graph[columns.elementType!].fields!.map((field) => field.name),
  ).toEqual(expect.arrayContaining(["key", "header", "render"]));
});

it("exports immutable versioned metadata and bounded component/renderer/capability queries", async () => {
  const api = await import("../../packages/core/src/contracts");
  expect(api.contractsMetadata.schemaVersion).toBe("2.0.0");
  expect(api.contractsMetadata.packageVersion).toMatch(/^\d+\.\d+\.\d+/);
  expect(api.contractsMetadata.sourceCommit).toMatch(/^[a-f0-9]{40}$/);
  expect(api.contractsMetadata.sourceDigest).toMatch(/^sha256:[a-f0-9]{64}$/);
  expect(
    api.queryContracts({
      component: "Input",
      renderer: "vue",
      capability: "bindings",
    }),
  ).toHaveLength(1);
  expect(api.queryContracts({ component: "NoSuchComponent" })).toEqual([]);
  expect(
    api.getRendererContract("minerva-input", "vue")!.bindings![0].syntax,
  ).toBe("v-model");
  expect(Object.isFrozen(api.getContract("Input")!.props[0])).toBe(true);
  expect(
    Object.isFrozen(api.getRendererContract("Input", "vue")!.bindings),
  ).toBe(true);
  const value = api
    .getContract("Upload")!
    .props.find((p) => p.name === "value");
  expect(api.getType(value!.typeRef!)!.kind).toBe("array");
});

it("matches the inherited public TypeScript input signatures directly", () => {
  for (const component of ["Input", "Textarea"]) {
    const file = fileURLToPath(
      new URL(
        `../../packages/react/src/components/${component}/types.ts`,
        import.meta.url,
      ),
    );
    const program = ts.createProgram([file], {
      strict: true,
      skipLibCheck: true,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      module: ts.ModuleKind.ESNext,
    });
    const checker = program.getTypeChecker();
    const source = program.getSourceFile(file)!;
    const symbol = checker
      .getExportsOfModule(checker.getSymbolAtLocation(source)!)
      .find((entry) => entry.name === `${component}Props`)!;
    const properties = checker.getPropertiesOfType(
      checker.getDeclaredTypeOfSymbol(symbol),
    );
    const contract = contracts.find((entry) => entry.name === component)!;
    for (const name of [
      "value",
      "defaultValue",
      "disabled",
      "readOnly",
      "required",
      "name",
    ]) {
      const property = properties.find((entry) => entry.name === name)!;
      expect(property, `${component}Props.${name}`).toBeDefined();
      expect(
        contract.props.find((entry) => entry.name === name)?.typeText,
      ).toBe(
        checker.typeToString(
          checker.getTypeOfSymbol(property),
          undefined,
          ts.TypeFormatFlags.NoTruncation,
        ),
      );
    }
    const callback = properties.find((entry) => entry.name === "onChange")!;
    expect(
      contract.events.find((entry) => entry.react === "onChange")?.typeText,
    ).toBe(
      checker.typeToString(
        checker.getTypeOfSymbol(callback),
        undefined,
        ts.TypeFormatFlags.NoTruncation,
      ),
    );
  }
});

it("ships a fresh referenced type graph and stable provenance snapshot", async () => {
  const {
    TYPES_OUTPUT,
    METADATA_OUTPUT,
    generateTypeGraph,
    generateMetadata,
    serializeContracts,
  } = await import("../../tools/generate-contracts.mjs");
  expect(readFileSync(TYPES_OUTPUT, "utf8")).toBe(
    await serializeContracts(generateTypeGraph()),
  );
  const provenance = generateMetadata();
  expect(readFileSync(METADATA_OUTPUT, "utf8")).toBe(
    await serializeContracts(provenance),
  );
  expect(generateMetadata()).toEqual(provenance);
  expect(provenance).not.toHaveProperty("sourceDirty");
});

it("provides a real API for every shipped renderer entry", () => {
  for (const contract of contracts)
    for (const [platform, support] of Object.entries(contract.platforms)) {
      if (support.status !== "stable" && support.status !== "beta") continue;
      const api =
        contract.renderers[platform as keyof typeof contract.renderers];
      expect(
        api.import?.specifier,
        `${contract.name}/${platform}`,
      ).toBeTruthy();
      expect(api.props, `${contract.name}/${platform}`).toBeDefined();
      expect(api.events, `${contract.name}/${platform}`).toBeDefined();
      expect(api.slots, `${contract.name}/${platform}`).toBeDefined();
    }
});

it("retains signatures when native-only callbacks become shared events", () => {
  for (const contract of contracts)
    for (const event of contract.events) {
      if (!event.native && !event.react) continue;
      expect(
        event.required,
        `${contract.name}.${event.native ?? event.react}`,
      ).toBeTypeOf("boolean");
      expect(
        event.parameters,
        `${contract.name}.${event.native ?? event.react}`,
      ).toBeDefined();
      expect(
        event.returnType?.typeText,
        `${contract.name}.${event.native ?? event.react}`,
      ).toBeTruthy();
    }
});

it("keeps every generated type-graph string independent of the checkout path", async () => {
  const { generateTypeGraph } =
    await import("../../tools/generate-contracts.mjs");
  const graph = JSON.stringify(generateTypeGraph());
  expect(graph).not.toContain(
    fileURLToPath(new URL("../../", import.meta.url)),
  );
  expect(graph).not.toMatch(
    /\/Users\/|\/home\/runner\/|\/private\/var\/folders\/|[A-Z]:\\/,
  );
});

it("keeps on-prefixed content props instead of dropping them as callbacks", () => {
  const component = contracts.find((entry) => entry.name === "Switch")!;
  for (const renderer of ["react", "native", "taro"] as const) {
    const api = component.renderers[renderer]!;
    expect(
      api.props?.find((prop) => prop.name === "onLabel"),
      renderer,
    ).toBeDefined();
    expect(
      api.events?.find((event) => event.name === "onLabel"),
      renderer,
    ).toBeUndefined();
  }
});

it("keeps React and Native Table column shapes distinct in the referenced graph", async () => {
  const { generateTypeGraph } =
    await import("../../tools/generate-contracts.mjs");
  const graph = generateTypeGraph();
  const table = contracts.find((entry) => entry.name === "Table")!;
  const react = table.renderers.react.props!.find(
    (prop) => prop.name === "columns",
  )!;
  const native = table.renderers.native.props!.find(
    (prop) => prop.name === "columns",
  )!;
  expect(native.typeRef).not.toBe(react.typeRef);
  const reactColumn = graph[graph[react.typeRef!].elementType!];
  const nativeColumn = graph[graph[native.typeRef!].elementType!];
  expect(reactColumn.fields!.map((field) => field.name)).toContain("fixed");
  expect(nativeColumn.fields!.map((field) => field.name)).not.toContain(
    "fixed",
  );
  expect(
    nativeColumn.fields!.find((field) => field.name === "width")!.typeText,
  ).toBe("number | undefined");
  expect(
    reactColumn.fields!.find((field) => field.name === "width")!.typeText,
  ).toContain("string");
});
