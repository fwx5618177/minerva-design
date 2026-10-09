import type { Platform, SupportStatus, Track } from "./types";

/** Renderer display order, without importing the full component API metadata. */
export const PLATFORMS: readonly Platform[] = [
  "react",
  "wc",
  "vue",
  "angular",
  "native",
  "taro",
  "weapp",
  "uni",
];
export const SUPPORT_STATUSES: readonly SupportStatus[] = [
  "stable",
  "beta",
  "planned",
  "n/a",
];
export const TRACKS: readonly Track[] = ["toB", "toC"];
