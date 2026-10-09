import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core";

/**
 * Whether the current platform is a browser (not the server renderer).
 * Call in an injection context. Components never touch `document` /
 * `window` at module evaluation or while rendering on the server: DOM work
 * runs in `afterNextRender` / `afterRenderEffect` (browser only) or behind
 * this check.
 */
export const injectIsBrowser = (): boolean =>
  isPlatformBrowser(inject(PLATFORM_ID));
