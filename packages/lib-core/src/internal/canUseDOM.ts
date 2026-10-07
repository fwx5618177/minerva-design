/** True in a browser-like environment (false during SSR). */
export const canUseDOM =
  typeof window !== "undefined" && typeof document !== "undefined";
