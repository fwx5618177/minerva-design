// Contract behaviours that genuinely differ on a platform (by design, not
// bugs): the suite runs them with `it.fails` and the reason below. Remove an
// entry when the platform converges (its test then fails as "passed").
import type { ExpectedDifference } from "./harness/types";

/** Custom elements own their checked state, like native inputs */
const NATIVE_CHECKED_STATE =
  "custom elements have no controlled mode for checked: like a native <input type=checkbox>, a press toggles the element's own state (minerva-change is not cancelable); frameworks re-set the property from their state";

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
];
