/**
 * URL safety for links built from caller data (NavTree items, TextLink /
 * Card `href`...). React 19 already neutralises `javascript:` URLs in `href`,
 * Lit does not: both libraries run link URLs through `sanitizeUrl` so a
 * `javascript:` (or `vbscript:`) link never reaches the DOM.
 */

/**
 * Schemes that run script in the page when a link is followed. Relative URLs,
 * fragments and every other scheme (`https:`, `mailto:`, `tel:`, `blob:`,
 * custom app schemes...) are allowed; `data:` stays allowed for `download`
 * links (browsers refuse top-level navigation to `data:` documents).
 */
const UNSAFE_SCHEMES = new Set(["javascript", "vbscript"]);

/**
 * Browsers ignore leading / trailing C0 controls and spaces and strip tabs
 * and line breaks anywhere in a URL (`java\tscript:` is `javascript:`), so the
 * scheme is read the same way before it is checked.
 */
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const IGNORED = /[\x00-\x20\x7f]/g;

/** Whether following `url` as a link is safe (no script-running scheme). */
export function isSafeUrl(url: string): boolean {
  const normalized = url.replace(IGNORED, "");
  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(normalized);
  return !scheme || !UNSAFE_SCHEMES.has(scheme[1].toLowerCase());
}

/**
 * `url` when it is safe to put in an `href`, otherwise `undefined` (the link
 * renders without a destination). `null` / `undefined` pass through as
 * `undefined`.
 */
export function sanitizeUrl(
  url: string | null | undefined,
): string | undefined {
  if (url == null) return undefined;
  return isSafeUrl(url) ? url : undefined;
}

/**
 * `rel` of a link: the caller's value, or `"noopener noreferrer"` when the
 * link opens a new browsing context (`target="_blank"`) without one.
 */
export function linkRel(
  target: string | null | undefined,
  rel: string | null | undefined,
): string | undefined {
  if (rel != null) return rel;
  return target?.toLowerCase() === "_blank" ? "noopener noreferrer" : undefined;
}
