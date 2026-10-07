/**
 * `data-*` attributes accepted by components whose props do not extend a
 * React HTML attributes type. They are forwarded to the component's root.
 */
export type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

/** Picks the `data-*` entries of `props` (to spread onto a root element). */
export function pickDataAttributes(props: object): DataAttributes {
  const result: DataAttributes = {};
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("data-")) {
      result[key as `data-${string}`] =
        value as DataAttributes[`data-${string}`];
    }
  }
  return result;
}
