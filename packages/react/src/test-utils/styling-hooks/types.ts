import type { ReactElement } from "react";
import type { render } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";

/**
 * A rendering of a component for the styling hooks contract test
 * (src/styling-hooks.contract.test.tsx): together, the scenarios of a
 * component must render every documented part and state.
 */
export interface HookScenario {
  /** What the scenario shows ("open", "disabled", "loading"...) */
  name: string;
  /** The React tree to render */
  element: ReactElement;
  /** Interaction after rendering (open a popup, hover...) */
  setup?: (context: {
    user: UserEvent;
    container: HTMLElement;
    view: ReturnType<typeof render>;
  }) => Promise<void> | void;
}
