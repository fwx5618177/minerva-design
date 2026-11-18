// Whether a keyboard event target takes text input (global shortcuts and
// toast hotkeys must not steal keys typed in a field). DOM only.

const NON_TEXT_INPUT_TYPES = [
  "button",
  "checkbox",
  "color",
  "file",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
];

/**
 * Whether `target` takes text input: text-like inputs, textareas, selects
 * and contenteditable hosts. Always `false` without a DOM (SSR).
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  const realm = (target as Node | null)?.ownerDocument?.defaultView;
  const ElementClass = realm?.HTMLElement ?? globalThis.HTMLElement;
  if (typeof ElementClass !== "function" || !(target instanceof ElementClass)) {
    return false;
  }
  if (target.isContentEditable) return true;
  if (target instanceof (realm?.HTMLTextAreaElement ?? HTMLTextAreaElement))
    return true;
  if (target instanceof (realm?.HTMLSelectElement ?? HTMLSelectElement))
    return true;
  if (target instanceof (realm?.HTMLInputElement ?? HTMLInputElement)) {
    return !NON_TEXT_INPUT_TYPES.includes(target.type);
  }
  return false;
}
