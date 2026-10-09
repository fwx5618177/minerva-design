import type { ClassMap } from "./styles";

/**
 * The class of `key` in a SCSS class map, `undefined` when the stylesheet has
 * none (like React's `styles[size]` for a size without a rule).
 */
export const classOf = <K extends string>(
  map: ClassMap<K>,
  key: string | null | undefined,
): string | undefined =>
  key == null ? undefined : (map as Readonly<Record<string, string>>)[key];
