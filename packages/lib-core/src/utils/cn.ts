/**
 * A value accepted by {@link cn}: strings / numbers are kept, falsy values are
 * skipped, arrays are flattened and objects contribute their truthy keys.
 */
export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassValue[];

/** `{ "is-active": isActive }` — keys whose value is truthy are kept. */
export type ClassDictionary = Record<string, unknown>;

const append = (out: string[], value: ClassValue): void => {
  if (!value || value === true) return;
  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
  } else if (typeof value === "bigint") {
    out.push(value.toString());
  } else if (Array.isArray(value)) {
    for (const item of value) append(out, item);
  } else {
    for (const key of Object.keys(value)) {
      if (key && value[key]) out.push(key);
    }
  }
};

/**
 * Join class names, skipping falsy values (a dependency-free `classnames`).
 *
 *   cn("btn", isActive && "btn-active", { "btn-disabled": disabled }, className)
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) append(out, input);
  return out.join(" ");
}
