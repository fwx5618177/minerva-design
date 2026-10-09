import type { Type } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import type { UserEvent } from "@testing-library/user-event";

/**
 * A rendering of a component for the styling hooks contract test
 * (src/styling-hooks.contract.test.ts), like React's HookScenario: together,
 * the scenarios of a manifest component render every documented part and
 * state. `component` is a standalone test host (template using the
 * component).
 */
export interface HookScenario {
  /** What the scenario shows ("open", "disabled", "loading"...) */
  name: string;
  component: Type<unknown>;
  /** Interaction after rendering (open a popup, hover...) */
  setup?: (context: {
    user: UserEvent;
    fixture: ComponentFixture<unknown>;
    root: HTMLElement;
  }) => Promise<void> | void;
}

/** A server-rendering case (src/ssr.test.ts, src/hydration.test.ts) */
export interface SsrCase {
  name: string;
  /** Standalone host component (selector `mn-ssr-host`) */
  component: Type<unknown>;
  /** Strings the server HTML must contain */
  contains?: string[];
}
