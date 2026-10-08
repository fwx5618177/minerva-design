import { sanitizeUrl } from "@minerva/core";
import { DEV, devWarn } from "./dev";

/**
 * `href` of a link built from properties / data, through core's
 * `sanitizeUrl`: Lit binds attributes as-is, so a `javascript:` /
 * `vbscript:` URL is dropped here (the link renders without a destination,
 * as in minerva-design) with a development warning.
 */
export function safeHref(
  tag: string,
  href: string | null | undefined,
): string | undefined {
  const safe = sanitizeUrl(href);
  if (DEV && href != null && safe === undefined) {
    devWarn(
      tag,
      `blocked an unsafe link URL (${JSON.stringify(href)}): javascript: and vbscript: URLs are never rendered.`,
    );
  }
  return safe;
}
