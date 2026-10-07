// Checks the published artifacts the way a consumer sees them: through the
// package "exports" map, as ESM and CJS, in Node (no DOM).
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const dist = (file: string) => join(root, file);
// Resolve "@minerva/lib-core" through its own exports map (self-reference)
const require = createRequire(join(root, "package.json"));

/** Components / APIs a consumer must be able to import */
const EXPECTED_EXPORTS = [
  "Alert",
  "AutoComplete",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Button",
  "Card",
  "Cascader",
  "Checkbox",
  "Chip",
  "ConfigProvider",
  "Divider",
  "Dropdown",
  "Empty",
  "IconButton",
  "InteractiveIconButton",
  "message",
  "useMessage",
  "Pagination",
  "Popper",
  "ProgressIndicator",
  "Radio",
  "RadioGroup",
  "SearchButton",
  "Skeleton",
  "Space",
  "StatusIndicator",
  "Switch",
  "Tag",
  "TextField",
  "TimePicker",
  "Tooltip",
  "VirtualList",
  "applyThemeStyles",
  "themes",
  "useAutoTheme",
  "useConfig",
  "useLocale",
];

describe("@minerva/lib-core dist", () => {
  it("ships every file referenced by package.json", () => {
    const exported = pkg.exports["."];
    for (const file of [
      pkg.main,
      pkg.module,
      pkg.types,
      exported.import,
      exported.require,
      exported.types,
      pkg.exports["./style.css"],
    ]) {
      expect(existsSync(dist(file)), file).toBe(true);
    }
  });

  it('starts both entries with the "use client" directive', () => {
    for (const file of [pkg.exports["."].import, pkg.exports["."].require]) {
      const code = readFileSync(dist(file), "utf8");
      expect(code.startsWith('"use client";'), file).toBe(true);
    }
  });

  it("resolves the same named exports from ESM and CJS", async () => {
    const esmPath = require
      .resolve("@minerva/lib-core")
      .replace(/index\.cjs$/, "index.js");
    const esm = await import(pathToFileURL(esmPath).href);
    const cjs = require("@minerva/lib-core");
    for (const name of EXPECTED_EXPORTS) {
      expect(esm[name], `ESM export ${name}`).toBeDefined();
      expect(cjs[name], `CJS export ${name}`).toBeDefined();
    }
    expect(Object.keys(esm).sort()).toEqual(
      Object.keys(cjs)
        .filter((key) => key !== "default")
        .sort(),
    );
  });

  it("keeps react, react-dom and dependencies external", () => {
    const code = readFileSync(dist(pkg.exports["."].import), "utf8");
    expect(code).toMatch(/from "react"/);
    expect(code).not.toMatch(/react\.production|react-dom\.production/);
    expect(code).toMatch(/from "@floating-ui\/react-dom"/);
  });

  it("can be imported and server-rendered without a DOM", async () => {
    const lib = require("@minerva/lib-core");
    const html = renderToString(
      createElement(
        lib.ConfigProvider,
        { theme: "light" },
        createElement(lib.Button, null, "Hello"),
        createElement(lib.Tooltip, { content: "Tip" }, "Hover me"),
        createElement(lib.Popper, { anchorEl: null, visible: true }, "pop"),
      ),
    );
    expect(html).toContain("Hello");
    expect(html).toContain("Hover me");
  });
});
