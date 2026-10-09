import { readFileSync } from "node:fs";

const tokens = new Set(
  [
    ...readFileSync(
      new URL("../packages/core/src/theme/tokens.css", import.meta.url),
      "utf8",
    ).matchAll(/(--[\w-]+)\s*:/g),
  ].map((match) => match[1]),
);
const semantic = {
  bg: "background-color",
  "bg-muted": "surface-muted-color",
  "bg-subtle": "surface-subtle-color",
  fg: "text-color",
  "fg-muted": "text-muted-color",
  "fg-secondary": "text-secondary-color",
  border: "border-color",
  "border-strong": "border-strong-color",
};
const selector = (component, part = "root") =>
  `[data-minerva="${component}"][data-part="${part}"]`;
// Only stable, public hooks are converted. App-authored .ui-* utilities stay intact.
const hooks = {
  "ui-button": selector("button"),
  "ui-badge": selector("badge"),
  "ui-stack": selector("stack"),
  "ui-field": selector("form-control"),
  "ui-form-control": selector("form-control"),
  "ui-form-label": selector("form-control", "label"),
  "ui-nav-tree-section": selector("nav-tree", "group"),
  "ui-nav-tree-section-title": selector("nav-tree", "group-label"),
  "ui-nav-tree-item": selector("nav-tree", "item"),
  "ui-nav-tree-item-active": `${selector("nav-tree", "item")}[data-current]`,
  "ui-nav-tree-icon": selector("nav-tree", "icon"),
  "ui-tabs": selector("tabs"),
  "ui-tabs-list": selector("tabs", "list"),
  "ui-tabs-trigger": selector("tab"),
  "ui-tabs-orientation-vertical": '[data-orientation="vertical"]',
  "ui-table": selector("data-table", "table"),
  "ui-table-wrapper": selector("data-table", "viewport"),
  "ui-tooltip-content": selector("tooltip", "content"),
  "ui-popover-arrow": selector("popover", "arrow"),
  "ui-modal-content": selector("modal", "content"),
  "ui-toast": selector("toast-region", "toast"),
  "ui-theme-toggle-item": selector("theme-toggle", "item"),
};

/** Opt-in semantic palette migration. Color shades adopt the new theme's semantic
 * roles, rather than freezing old light-theme hex values into every theme. */
export function migrateStyles(source, { selectors = true } = {}) {
  const warnings = new Set();
  let result = source.replace(/--ui-[\w-]+/g, (token) => {
    const suffix = token.slice(5);
    let next = semantic[suffix.replace(/^color-/, "")];
    const shade =
      /^color-(brand|accent|danger|success|warning|gray)-(\d+)$/.exec(suffix);
    if (!next && shade) {
      const color =
        { brand: "primary", accent: "primary", gray: "neutral" }[shade[1]] ??
        shade[1];
      if (color === "neutral") next = "foreground-color";
      else {
        const role = {
          50: "-subtle",
          100: "-subtle",
          200: "-border",
          300: "-border",
          400: "",
          500: "",
          600: "-hover",
          700: "-active",
          800: "-text",
        }[shade[2]];
        if (role !== undefined) next = `${color}-color${role}`;
      }
    }
    next = `--${next ?? (suffix === "shadow-xs" ? "shadow-sm" : suffix)}`;
    if (tokens.has(next)) return next;
    warnings.add(`Unknown token ${token}: choose a public token explicitly`);
    return token;
  });
  if (selectors)
    result = result.replace(
      /\.ui-[\w-]+/g,
      (name) => hooks[name.slice(1)] ?? name,
    );
  return { source: result, warnings: [...warnings] };
}
