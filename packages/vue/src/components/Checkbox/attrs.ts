/**
 * Splits the fall-through attributes of a field wrapped in a `<label>` /
 * wrapper (Checkbox, Radio, Switch): `class`, `style` and `data-*` style the
 * root, everything else (`aria-*`, listeners, native attributes) goes to the
 * native `<input>`, like the React props.
 */
export function splitRootAttrs(attrs: Record<string, unknown>): {
  root: Record<string, unknown>;
  control: Record<string, unknown>;
} {
  const root: Record<string, unknown> = {};
  const control: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class" || key === "style" || key.startsWith("data-")) {
      root[key] = value;
    } else {
      control[key] = value;
    }
  }
  return { root, control };
}
