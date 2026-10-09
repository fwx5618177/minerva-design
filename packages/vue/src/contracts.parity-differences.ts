// Reviewed differences between the Vue components and the contracts (the
// React API): `<Component>.<prop or callback>` -> reason.
export const PARITY_DIFFERENCES: Record<string, string> = {
  "DrawerContent.overlayClassName":
    "Vue idiom: `overlayClass` (any class value), like `class` for `className`",
  "ModalContent.overlayClassName":
    "Vue idiom: `overlayClass` (any class value), like `class` for `className`",
  "KeyValueEditor.entries":
    "the edited entries are the component's v-model (`modelValue`)",
  "KeyValueEditor.defaultEntries":
    "uncontrolled initial entries: `defaultValue` (the v-model convention)",
  "Rating.onKeyDown":
    "a native `keydown` listener (`@keydown`) falls through to the rating element",
};
