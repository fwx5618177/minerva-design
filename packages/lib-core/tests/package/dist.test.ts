// Checks the published artifacts the way a consumer sees them: through the
// package "exports" map, as ESM and CJS, in Node (no DOM).
import { existsSync, readFileSync, readdirSync } from "node:fs";
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

/** Runtime exports of @novel-isr/ui 0.1.40 (see src/compat/coverage.test.tsx) */
const NOVEL_MAIN_VALUES = [
  "Alert",
  "AppShell",
  "Autocomplete",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Box",
  "Button",
  "Card",
  "CardBody",
  "CardDescription",
  "CardFooter",
  "CardHeader",
  "CardTitle",
  "Checkbox",
  "CodeBlock",
  "CommandDialog",
  "ConfirmDialog",
  "ConfirmProvider",
  "ContextMenu",
  "DataTable",
  "DescriptionList",
  "Divider",
  "Drawer",
  "DrawerBody",
  "DrawerClose",
  "DrawerContent",
  "DrawerFooter",
  "DrawerHeader",
  "DrawerRoot",
  "DrawerTrigger",
  "EmptyState",
  "FormControl",
  "FormErrorMessage",
  "FormField",
  "FormHelperText",
  "FormLabel",
  "FormLayout",
  "GridItem",
  "HStack",
  "HtmlPreview",
  "IconButton",
  "Input",
  "JsonField",
  "KeyValueEditor",
  "List",
  "ListItem",
  "LoadingState",
  "Menu",
  "Modal",
  "ModalBody",
  "ModalClose",
  "ModalContent",
  "ModalFooter",
  "ModalHeader",
  "ModalRoot",
  "ModalTrigger",
  "MonthCalendar",
  "NavTree",
  "NumberInput",
  "Page",
  "PageHeader",
  "PageSection",
  "PageTab",
  "PageTabs",
  "Pagination",
  "PaletteToggle",
  "Popover",
  "PopoverAnchor",
  "PopoverClose",
  "PopoverContent",
  "PopoverTrigger",
  "Prose",
  "Radio",
  "RadioGroup",
  "Rating",
  "RatingScale",
  "ResponsiveGrid",
  "Select",
  "SelectGroup",
  "SelectItem",
  "SelectLabel",
  "SelectSeparator",
  "Skeleton",
  "SkeletonText",
  "Spinner",
  "SplitLayout",
  "Stack",
  "StatCard",
  "Steps",
  "Switch",
  "Tab",
  "TabList",
  "TabPanel",
  "Table",
  "TableBody",
  "TableCell",
  "TableCellContent",
  "TableHead",
  "TableHeader",
  "TableRoot",
  "TableRow",
  "Tabs",
  "Tag",
  "TagInput",
  "TextLink",
  "Textarea",
  "ThemeProvider",
  "ThemeToggle",
  "ToastProvider",
  "Toolbar",
  "Tooltip",
  "TooltipProvider",
  "Upload",
  "VStack",
  "cn",
  "confirm",
  "matchesShortcut",
  "normalizeShortcuts",
  "toast",
  "useConfirm",
  "useDisclosure",
  "useFormControlContext",
  "useFormControlProps",
  "useTheme",
  "useToast",
];

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

type ConditionalExport = { types: string; import: string; require: string };
const conditional = (key: string) => pkg.exports[key] as ConditionalExport;

/** Sub-entries and whether they are client modules ("use client" banner) */
const ENTRIES: Record<string, boolean> = {
  ".": true,
  "./monaco": true,
  "./compat": true,
  "./compat/monaco": true,
  "./theme-utils": false,
  "./compat/theme-utils": false,
};

describe("@minerva/lib-core dist", () => {
  it("ships every file referenced by package.json", () => {
    const files = [pkg.main, pkg.module, pkg.types];
    for (const value of Object.values(pkg.exports) as Array<
      string | ConditionalExport
    >) {
      if (typeof value === "string") files.push(value);
      else files.push(value.types, value.import, value.require);
    }
    for (const file of files) {
      expect(existsSync(dist(file)), file).toBe(true);
    }
    expect(Object.keys(pkg.exports).sort()).toEqual(
      [
        ...Object.keys(ENTRIES),
        "./style.css",
        "./compat.css",
        "./prose.scss",
        "./package.json",
      ].sort(),
    );
  });

  it.each(Object.entries(ENTRIES))(
    '%s: "use client" banner only on client entries',
    (key, client) => {
      const { import: esm, require: cjs } = conditional(key);
      for (const file of [esm, cjs]) {
        const code = readFileSync(dist(file), "utf8");
        expect(code.startsWith('"use client";'), file).toBe(client);
        if (!client) expect(code).not.toContain('"use client"');
      }
    },
  );

  it("keeps the server-safe theme-utils entries free of React", () => {
    for (const key of ["./theme-utils", "./compat/theme-utils"]) {
      for (const file of [conditional(key).import, conditional(key).require]) {
        const code = readFileSync(dist(file), "utf8");
        expect(code, file).not.toMatch(/from "react"|require\("react"\)/);
      }
    }
  });

  it("exposes the theme-utils API from ESM and CJS, usable on the server", async () => {
    const esm = await import(
      pathToFileURL(dist(conditional("./theme-utils").import)).href
    );
    const cjs = require("@minerva/lib-core/theme-utils");
    for (const mod of [esm, cjs]) {
      for (const name of [
        "THEME_INIT_SCRIPT",
        "createThemeInitScript",
        "parseThemeCookie",
        "parsePaletteCookie",
        "parseThemeCookies",
        "readCookieValue",
        "serializeThemeCookie",
        "PALETTES",
        "THEME_COOKIE_NAME",
        "PALETTE_COOKIE_NAME",
        "THEME_COOKIE_MAX_AGE",
      ]) {
        expect(mod[name], name).toBeDefined();
      }
      expect(mod.parseThemeCookies("theme=dark; palette=tech")).toEqual({
        theme: "dark",
        palette: "tech",
      });
    }
    const compat = require("@minerva/lib-core/compat/theme-utils");
    expect(compat.DEFAULT_PALETTE).toBe("editorial");
    expect(compat.parsePaletteCookie(undefined)).toBe("editorial");
    expect(compat.THEME_INIT_SCRIPT).toContain("'editorial'");
  });

  it("ships the stand-alone stylesheets", () => {
    const style = readFileSync(dist(pkg.exports["./style.css"]), "utf8");
    expect(style).toMatch(/\[data-palette=("?)editorial\1\]/);
    expect(style).toContain("--space-4:");
    const compat = readFileSync(dist(pkg.exports["./compat.css"]), "utf8");
    expect(compat).toMatch(/--ui-color-brand-500:\s?var\(--primary-color\)/);
    expect(compat).toContain(".ui-stagger");
    const prose = readFileSync(dist(pkg.exports["./prose.scss"]), "utf8");
    expect(prose).toMatch(/@mixin/);
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
    // the entry plus the shared chunks it imports
    const code = readdirSync(dist("dist"))
      .filter((file) => file.endsWith(".js"))
      .map((file) => readFileSync(dist(`dist/${file}`), "utf8"))
      .join("\n");
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
  it("exposes every @novel-isr/ui runtime export from the compat entries (ESM + CJS)", async () => {
    const esm = await import(
      pathToFileURL(dist(conditional("./compat").import)).href
    );
    const cjs = require("@minerva/lib-core/compat");
    for (const name of NOVEL_MAIN_VALUES) {
      expect(esm[name], `ESM compat ${name}`).toBeDefined();
      expect(cjs[name], `CJS compat ${name}`).toBeDefined();
    }
    const monaco = require("@minerva/lib-core/compat/monaco");
    expect(monaco.MonacoCodeEditor).toBeDefined();
    expect(require("@minerva/lib-core/monaco").MonacoCodeEditor).toBeDefined();
    const html = renderToString(
      createElement(
        cjs.ThemeProvider,
        { disableStorage: true },
        createElement(
          cjs.Button,
          { colorScheme: "danger", isLoading: true },
          "删除",
        ),
        createElement(cjs.ThemeToggle),
      ),
    );
    expect(html).toContain("ui-button");
    expect(html).toContain("跟随");
  });
});
