import { onMounted, shallowRef, type Ref } from "vue";

/**
 * `false` during SSR and hydration, `true` once mounted on the client: lets
 * components skip `document`-dependent output (teleports) on the server
 * without a hydration mismatch.
 */
export function useIsClient(): Ref<boolean> {
  const client = shallowRef(false);
  onMounted(() => {
    client.value = true;
  });
  return client;
}

/** True in a browser-like environment (false during SSR). */
export const canUseDOM = () =>
  typeof window !== "undefined" && typeof document !== "undefined";
