// Type-checked by dist.test.ts against the BUILT typings (dist/types/react.d.ts).
// The ambient JSX augmentation ships as a .d.ts without exports, so a
// triple-slash reference is the only way to load it, exactly as consumers do.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../dist/types/react.d.ts" />
import "../../../dist/index.js";

export const ok = (
  <minerva-button color="danger" variant="outline" disabled={false}>
    Delete
  </minerva-button>
);

// @ts-expect-error -- not a ButtonVariant
export const bad = <minerva-button variant="nope">x</minerva-button>;
