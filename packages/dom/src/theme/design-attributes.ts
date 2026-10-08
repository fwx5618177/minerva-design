// Applies the design axes (see `designAttributes` in @minerva/core) to a DOM
// element. Web only: other renderers resolve the design to concrete values
// (`resolveTokens`) instead of data attributes.
import {
  DESIGN_ATTRIBUTES,
  designAttributes,
  type DesignOptions,
  type ResolvedDesign,
} from "@minerva/core";

/**
 * Writes (or removes) the design attributes on an element. Standard values
 * are removed unless `all` is set.
 */
export function applyDesignAttributes(
  element: Element,
  design: DesignOptions | ResolvedDesign | null,
  { all = false }: { all?: boolean } = {},
): void {
  const attributes = design ? designAttributes(design, { all }) : {};
  for (const name of Object.values(DESIGN_ATTRIBUTES)) {
    const value = attributes[name];
    if (value === undefined) element.removeAttribute(name);
    else element.setAttribute(name, value);
  }
}
