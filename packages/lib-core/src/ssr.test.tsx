// @vitest-environment node
// Every public component must render on the server: no window / document
// access during render or module initialisation.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as lib from "./index";
import { componentSsrCases } from "./test-utils/componentSsrCases";
import type { MonacoCodeEditorProps } from "./monaco";

const cases = componentSsrCases;
const { ConfigProvider } = lib;

describe("SSR", () => {
  it("runs without a DOM", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  it.each(cases)("renders %s to a string", (_, element) => {
    const html = renderToString(
      <ConfigProvider theme="auto">{element}</ConfigProvider>,
    );
    expect(typeof html).toBe("string");
  });

  it("covers every exported component", () => {
    const tested = new Set(cases.map(([name]) => name));
    const components = Object.keys(lib).filter(
      (name) =>
        /^[A-Z]/.test(name) &&
        !["ConfigContext", "ConfigProvider"].includes(name) &&
        !/^Card.+/.test(name), // Card sub-components are rendered by "Card"
    );
    for (const name of components) {
      expect(tested.has(name), `${name} has an SSR case`).toBe(true);
    }
  });

  // Every source module (not only what index re-exports) must be importable
  // on the server: no window / document / navigator access at import time.
  const modules = import.meta.glob([
    "./**/*.{ts,tsx}",
    "!./**/*.test.{ts,tsx}",
    "!./**/*.d.ts",
    "!./test-utils/**",
  ]);
  it.each(Object.keys(modules))("imports %s without a DOM", async (path) => {
    await expect(modules[path]()).resolves.toBeDefined();
  });

  it("renders the separate monaco entry to a string", async () => {
    const { MonacoCodeEditor } = await import("./monaco");
    const html = renderToString(
      <ConfigProvider theme="auto">
        <MonacoCodeEditor
          // The engine is only used on the client, after mount.
          monaco={{} as MonacoCodeEditorProps["monaco"]}
          label="Code"
          value="const a = 1;"
          onChange={() => {}}
          language="typescript"
        />
      </ConfigProvider>,
    );
    expect(typeof html).toBe("string");
  });
});
