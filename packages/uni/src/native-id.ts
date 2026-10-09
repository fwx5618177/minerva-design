import * as Vue from "vue";
const counters = new WeakMap<object, number>();
let detached = 0;
/** Preserve Vue's SSR/hydration-safe IDs on H5; uni-mp-vue omits that API. */
export function useNativeId(): string {
  const nativeUseId = Reflect.get(Vue, "useId") as (() => string) | undefined;
  if (typeof nativeUseId === "function") return nativeUseId();
  const instance = Vue.getCurrentInstance();
  if (!instance) return `mn-detached-${++detached}`;
  const count = (counters.get(instance) ?? 0) + 1;
  counters.set(instance, count);
  return `mn-${instance.uid}-${count}`;
}
