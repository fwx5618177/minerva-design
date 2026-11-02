// Whether a pointer / keyboard event comes from an interactive element nested
// in a container that itself reacts to clicks (e.g. a flashcard that flips on
// click must not flip when a link or button inside a face is used). DOM only.

/** Elements that handle clicks themselves. */
export const INTERACTIVE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "label",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]",
  ...[
    "button",
    "link",
    "checkbox",
    "radio",
    "switch",
    "tab",
    "menuitem",
    "option",
    "slider",
    "spinbutton",
    "textbox",
    "searchbox",
    "combobox",
  ].map((role) => `[role='${role}']`),
].join(",");

/**
 * Whether `event` originates from an interactive element (link, button, form
 * control, element with a tabindex or a widget role) strictly inside
 * `container`. Uses the composed path, so slotted (light DOM) content of a
 * shadow root is handled. Always `false` without a DOM (SSR).
 */
export function isInteractiveEventTarget(
  event: Pick<Event, "target"> & Partial<Pick<Event, "composedPath">>,
  container: Element,
): boolean {
  if (typeof Element === "undefined") return false;
  let path: EventTarget[] = event.composedPath?.() ?? [];
  if (!path.length) {
    path = [];
    for (
      let node = event.target as Node | null;
      node;
      node = node.parentNode ?? (node as ShadowRoot).host ?? null
    ) {
      path.push(node);
    }
  }
  for (const node of path) {
    if (node === container) return false;
    if (node instanceof Element && node.matches(INTERACTIVE_SELECTOR)) {
      return true;
    }
  }
  return false;
}
