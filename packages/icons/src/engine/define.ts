// Custom icons: same shape as the built-in ones, validated once.

import { parseIconPath } from "./path";
import type { IconDefinition } from "./types";

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Declares a custom icon (24×24 grid, stroked with round caps and joins, like
 * the built-in set). Throws on a malformed name or path data, so mistakes
 * show up where the icon is declared rather than when it is drawn. The
 * result is frozen and works with every renderer.
 */
export function defineIcon(definition: IconDefinition): IconDefinition {
  const { name, paths, category, tags } = definition;
  if (!NAME.test(name)) {
    throw new TypeError(
      `Invalid icon name "${name}": use kebab-case (e.g. "my-icon")`,
    );
  }
  if (!paths.length) {
    throw new TypeError(`Icon "${name}" has no paths`);
  }
  for (const d of paths) parseIconPath(d);
  return Object.freeze({
    name,
    paths: Object.freeze([...paths]),
    ...(category !== undefined && { category }),
    ...(tags !== undefined && { tags: Object.freeze([...tags]) }),
  });
}
