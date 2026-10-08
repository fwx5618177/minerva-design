/**
 * A rendering of an element for the styling hooks contract test
 * (contract.test.ts): together, the scenarios of a component must render
 * every documented part and state.
 */
export interface WcHookScenario {
  /** What the scenario shows ("open", "disabled", "loading"...) */
  name: string;
  /** Markup rendered into the document body */
  html: string;
  /** Interaction after rendering (open a popup, hover...) */
  setup?: (root: HTMLElement) => Promise<void> | void;
}
