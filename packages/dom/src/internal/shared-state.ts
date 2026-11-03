/**
 * Runtime state shared by every copy of this package loaded in the realm
 * (the ESM and CJS builds side by side, duplicated bundles...). Stacks and
 * reference counts kept in plain module variables would split between
 * copies: e.g. two scroll locks on the same body, each believing it is the
 * only one, the first release restoring the styles under the second.
 *
 * The value is stored on `globalThis` under `Symbol.for("minerva.dom.<key>")`,
 * created by the first copy that asks for it. Version the key (`"x.v1"`) and
 * bump it whenever the shape of the state changes, so copies of different
 * versions never read each other's state with the wrong shape.
 */
export function sharedState<T>(key: string, init: () => T): T {
  const symbol = Symbol.for(`minerva.dom.${key}`);
  const host = globalThis as unknown as Record<symbol, T | undefined>;
  let value = host[symbol];
  if (value === undefined) {
    value = init();
    Object.defineProperty(globalThis, symbol, {
      value,
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }
  return value;
}
