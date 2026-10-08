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
  if (typeof HTMLElement === "undefined" || !(target instanceof HTMLElement)) {
    return false;
  }
  if (target.isContentEditable) return true;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) {
    return !NON_TEXT_INPUT_TYPES.includes(target.type);
  }
  return false;
}
