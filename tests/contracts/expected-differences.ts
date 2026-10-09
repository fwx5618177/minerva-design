// Contract behaviours that genuinely differ on a platform (by design, not
// bugs): the suite runs them with `it.fails` and the reason below. Remove an
// entry when the platform converges (its test then fails as "passed").
import type { ExpectedDifference } from "./harness/types";

/** Custom elements own their checked state, like native inputs */
const NATIVE_CHECKED_STATE =
  "custom elements have no controlled mode for checked: like a native <input type=checkbox>, a press toggles the element's own state (minerva-change is not cancelable); frameworks re-set the property from their state";

/** React Native styles are objects computed from the resolved tokens */
const NATIVE_STYLES =
  "React Native has no CSS classes, custom properties or stylesheets: styles are objects computed from resolveTokens() (packages/native: Button token parity is tested against the same color / variant enums in Button.test.tsx)";

export const EXPECTED_DIFFERENCES: ExpectedDifference[] = [
  {
    platform: "wc",
    test: "Switch controlled vs uncontrolled > controlled: a press only requests the change",
    reason: NATIVE_CHECKED_STATE,
  },
  {
    platform: "wc",
    test: "Checkbox controlled vs uncontrolled > controlled: a press only requests the change",
    reason: NATIVE_CHECKED_STATE,
  },
  {
    platform: "native",
    test: "Button color / variant tokens > every color maps to its token family",
    reason: NATIVE_STYLES,
  },
  {
    platform: "native",
    test: "Button color / variant tokens > every variant resolves to defined custom properties",
    reason: NATIVE_STYLES,
  },
];
