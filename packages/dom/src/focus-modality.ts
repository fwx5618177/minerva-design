import { sharedState } from "./internal/shared-state";
import { isEditableTarget } from "./editable-target";

const WIDTH = "--_minerva-focus-ring-width";
const navigation = new Set([
  "Tab",
  "Enter",
  " ",
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",
]);
const modifiers = new Set(["Shift", "Control", "Alt", "Meta"]);
interface Ownership {
  owners: number;
  dispose(): void;
}
const documents = sharedState(
  "focus-modality.v1",
  () => new WeakMap<Document, Ownership>(),
);

/**
 * Share one input-modality listener pair per document. The inherited private
 * width reaches portals and shadow roots without changing theme tokens or
 * public overrides. Acquiring is explicit: importing the module is SSR-safe.
 */
export function acquireFocusModality(doc: Document): () => void {
  let state = documents.get(doc);
  if (!state) {
    const style = doc.documentElement.style;
    const previous = style.getPropertyValue(WIDTH);
    const priority = style.getPropertyPriority(WIDTH);
    let current = "2px";
    const set = (width: string) => {
      if (current === width && style.getPropertyValue(WIDTH) === width) return;
      current = width;
      style.setProperty(WIDTH, width);
    };
    set(current);
    const onPointer = () => set("0px");
    const onKey = (event: KeyboardEvent) => {
      // Typing in a pointer-focused field should not suddenly grow a halo.
      if (event.isComposing) return;
      const origin = event.composedPath()[0] ?? event.target;
      const editable = isEditableTarget(origin);
      const element = origin as HTMLElement | null;
      const shortcut =
        !modifiers.has(event.key) && (event.metaKey || event.ctrlKey);
      if (
        !shortcut &&
        editable &&
        element?.tagName !== "SELECT" &&
        (event.key === " " ||
          (event.key === "Enter" &&
            (element?.tagName === "TEXTAREA" || element?.isContentEditable)))
      )
        return;
      if (navigation.has(event.key) || shortcut) set("2px");
    };
    doc.addEventListener("pointerdown", onPointer, true);
    doc.addEventListener("keydown", onKey, true);
    state = {
      owners: 0,
      dispose() {
        doc.removeEventListener("pointerdown", onPointer, true);
        doc.removeEventListener("keydown", onKey, true);
        if (
          style.getPropertyValue(WIDTH) === current &&
          !style.getPropertyPriority(WIDTH)
        ) {
          if (previous) style.setProperty(WIDTH, previous, priority);
          else style.removeProperty(WIDTH);
        }
      },
    };
    documents.set(doc, state);
  }
  state.owners++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--state.owners === 0) {
      state.dispose();
      documents.delete(doc);
    }
  };
}
