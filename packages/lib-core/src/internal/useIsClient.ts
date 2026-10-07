import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and hydration, `true` once rendering on the client.
 * Lets components skip `document`-dependent output (portals) on the server
 * without a hydration mismatch.
 */
export const useIsClient = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
