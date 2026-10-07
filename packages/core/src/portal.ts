import { canUseDOM } from "./dom";

/**
 * Resolves where portalled content goes: the explicit container when given,
 * else `document.body` (`null` on the server).
 */
export function getPortalContainer(explicit?: Element | null): Element | null {
  if (explicit) return explicit;
  return canUseDOM() ? document.body : null;
}

export interface PortalHostOptions {
  /** `id` of the host element. */
  id?: string;
  /** Extra attributes (e.g. `class`, `data-theme`, `dir`). */
  attributes?: Record<string, string>;
  /** Where the host is appended. @default document.body */
  parent?: Element | null;
  /** Tag name of the host. @default "div" */
  tagName?: string;
}

/** Attribute set on every host created by `createPortalHost`. */
export const PORTAL_HOST_ATTRIBUTE = "data-minerva-portal";

/**
 * Creates and appends a dedicated portal host element, e.g. a theme-scoped
 * container carrying `data-theme` so portalled overlays inherit the theme
 * variables. Remove it with `host.remove()`.
 */
export function createPortalHost(options: PortalHostOptions = {}): HTMLElement {
  const parent = getPortalContainer(options.parent);
  if (!parent) {
    throw new Error("createPortalHost() requires a DOM environment");
  }
  const host = parent.ownerDocument.createElement(options.tagName ?? "div");
  host.setAttribute(PORTAL_HOST_ATTRIBUTE, "");
  if (options.id) host.id = options.id;
  for (const [name, value] of Object.entries(options.attributes ?? {})) {
    host.setAttribute(name, value);
  }
  parent.appendChild(host);
  return host;
}
