// Cascade layer of the published stylesheets.
//
// Every stylesheet Minerva publishes (design tokens, `style.css`, the
// per-component `styles/<component>.css`) is wrapped in `@layer minerva`.
// Unlayered CSS always wins over layered CSS, whatever its specificity or
// order, so an application's own rules (`.my-button { ... }`,
// `[data-minerva="button"] { ... }`) override the library without
// `!important`. Applications that layer their CSS place `minerva` in their
// layer order (`@layer reset, minerva, app;`).
//
// The shadow-root styles of the web components are not layered: outer
// `::part()` / host rules already win over a shadow tree's own styles.

/** Name of the cascade layer of the library stylesheets */
export const CSS_LAYER = "minerva";

/**
 * Whether `css` is one `@layer minerva { ... }` block already.
 *
 * @param {string} css
 * @returns {boolean}
 */
export function isLayered(css) {
  const body = css.trim();
  const open = `@layer ${CSS_LAYER} {`;
  if (!body.startsWith(open) || !body.endsWith("}")) return false;
  let depth = 0;
  for (let i = open.length - 1; i < body.length; i++) {
    if (body[i] === "{") depth++;
    else if (body[i] === "}" && --depth === 0) return i === body.length - 1;
  }
  return false;
}

/**
 * Wraps a stylesheet in `@layer minerva { ... }`. `@charset` / `@import`
 * cannot be nested in a layer block: `@charset` is dropped (the files are
 * UTF-8) and `@import` is refused (the build inlines imports).
 *
 * @param {string} css
 * @returns {string}
 */
export function wrapInLayer(css) {
  const body = css.replace(/@charset\s+"[^"]*";\s*/gi, "").trim();
  if (/(^|[;}\s])@import\s/.test(body)) {
    throw new Error("@import cannot be wrapped in a cascade layer");
  }
  if (!body) return "";
  if (isLayered(body)) return body;
  return `@layer ${CSS_LAYER} {\n${body}\n}`;
}
