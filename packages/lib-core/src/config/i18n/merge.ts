type Messages = { [key: string]: Messages | string };

const isObject = (value: unknown): value is Messages =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Deep-merge translation objects (later sources win). */
export function mergeMessages<T extends object>(
  base: T,
  ...sources: object[]
): T {
  const out: Messages = { ...(base as Messages) };
  for (const source of sources) {
    for (const [key, value] of Object.entries(source as Messages)) {
      const prev = out[key];
      out[key] =
        isObject(prev) && isObject(value) ? mergeMessages(prev, value) : value;
    }
  }
  return out as T;
}
