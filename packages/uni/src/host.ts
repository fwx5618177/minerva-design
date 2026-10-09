import * as Vue from "vue";
/** Official uni builds replace UNI_PLATFORM; ordinary Vue/SSR consumers use the H5 branch. */
export const h5Host =
  typeof uni === "undefined" ||
  typeof document !== "undefined" ||
  (typeof process !== "undefined" && process.env.UNI_PLATFORM === "h5");

/** Native attribute bindings accept strings, not arbitrary Vue fallthrough values. */
export function nativeAttribute(value: unknown): string | undefined {
  return value === undefined || value === null ? undefined : String(value);
}

/** Comment nodes exist on H5; the native Vue runtime deliberately omits them. */
export function isVueComment(type: unknown): boolean {
  const comment = Reflect.get(Vue, "Comment");
  return comment !== undefined && type === comment;
}
