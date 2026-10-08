// Option tree helpers of the cascaders (React Cascader and
// <minerva-cascader>).

/** The option fields read by the cascader helpers. */
export interface CascaderOptionLike<T> {
  value: string | number;
  disabled?: boolean;
  children?: readonly T[];
}

/** An option of the tree together with the chain of options leading to it. */
export interface CascaderSearchEntry<T> {
  option: T;
  /** Options from the root level down to (and including) `option` */
  path: T[];
}

/**
 * Resolves the option chain of a value path (one value per level). Stops
 * at the first value not found, so the result may be shorter than `values`.
 */
export function findCascaderPath<T extends CascaderOptionLike<T>>(
  options: readonly T[],
  values: readonly (string | number)[],
): T[] {
  const result: T[] = [];
  let level: readonly T[] | undefined = options;
  for (const value of values) {
    const found: T | undefined = level?.find((o) => o.value === value);
    if (!found) break;
    result.push(found);
    level = found.children;
  }
  return result;
}

/**
 * Every enabled option of the tree (depth first) with its path. Disabled
 * options are skipped together with their descendants.
 */
export function flattenCascaderOptions<T extends CascaderOptionLike<T>>(
  options: readonly T[],
  path: T[] = [],
): CascaderSearchEntry<T>[] {
  return options.flatMap((option) => {
    if (option.disabled) return [];
    const current = [...path, option];
    return [
      { option, path: current },
      ...(option.children
        ? flattenCascaderOptions(option.children, current)
        : []),
    ];
  });
}
