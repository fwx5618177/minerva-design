import { formatDevMessage, sanitizeUrl } from "@minerva/core";

const warned = new Set<string>();

/**
 * `href` of a link built from props / data, through core's `sanitizeUrl`: a
 * `javascript:` / `vbscript:` URL is dropped (the link renders without a
 * destination, like React and the web components) with a development warning.
 */
export function safeHref(component: string, href: unknown): string | undefined {
  const url = href == null ? href : String(href);
  const safe = sanitizeUrl(url as string | null | undefined);
  if (process.env.NODE_ENV !== "production") {
    const key = `${component}:${url}`;
    if (url != null && safe === undefined && !warned.has(key)) {
      warned.add(key);
      console.warn(
        formatDevMessage(
          component,
          `blocked an unsafe link URL (${JSON.stringify(url)}): javascript: and vbscript: URLs are never rendered.`,
        ),
      );
    }
  }
  return safe;
}
