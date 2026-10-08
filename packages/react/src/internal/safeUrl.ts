import { formatDevMessage, sanitizeUrl } from "@minerva/core";
import { warnOnce } from "./devWarnings";

/**
 * `href` of a link built from props / data, through core's `sanitizeUrl`: a
 * `javascript:` / `vbscript:` URL is dropped (the link renders without a
 * destination, as in minerva-design/web-components) with a development warning.
 */
export function safeHref(
  component: string,
  href: string | null | undefined,
): string | undefined {
  const safe = sanitizeUrl(href);
  if (process.env.NODE_ENV !== "production") {
    if (href != null && safe === undefined) {
      warnOnce(
        `${component}:unsafe-url:${href}`,
        formatDevMessage(
          component,
          `blocked an unsafe link URL (${JSON.stringify(href)}): javascript: and vbscript: URLs are never rendered.`,
        ),
      );
    }
  }
  return safe;
}
