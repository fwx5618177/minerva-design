import type { VNode } from "vue";
import type { UserEvent } from "@testing-library/user-event";

/**
 * A rendering of a component for the Vue styling hooks contract test
 * (src/styling-hooks.contract.test.ts): together, the scenarios of a
 * component must render every documented part and state (same manifest and
 * checker as React: tests/styling-hooks/contract.ts).
 */
export interface HookScenario {
  /** What the scenario shows ("open", "disabled", "loading"...) */
  name: string;
  /** The tree to render (a render function, called inside a component) */
  render: () => VNode | VNode[];
  /** Interaction after rendering (open a popup, hover...) */
  setup?: (context: {
    user: UserEvent;
    container: HTMLElement;
  }) => Promise<void> | void;
}
