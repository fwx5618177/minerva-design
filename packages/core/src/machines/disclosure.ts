// Disclosure (collapsible, accordion item, popover, dialog...) with presence
// phases: closed -> opening -> open -> closing -> closed. The renderer keeps
// the content mounted while the phase is not "closed" and reports the end of
// its enter / exit animation with ANIMATION_END (or SKIP_ANIMATION when it
// has none, e.g. reduced motion).
import { createMachine, type Machine } from "./store";

/** Presence phase of the disclosed content. */
export type DisclosurePhase = "closed" | "opening" | "open" | "closing";

export interface DisclosureProps {
  /** Controlled open state (`undefined`: uncontrolled). */
  open?: boolean;
  /** Initial open state while uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Ignores OPEN / CLOSE / TOGGLE (props still apply). @default false */
  disabled?: boolean;
  /**
   * Whether opening / closing go through the "opening" / "closing" phases
   * (ended by ANIMATION_END); `false` jumps straight to "open" / "closed".
   * @default true
   */
  animated?: boolean;
  /** Called with the requested open state (controlled or not). */
  onOpenChange?: (open: boolean) => void;
}

export interface DisclosureState {
  open: boolean;
  phase: DisclosurePhase;
}

export type DisclosureEvent =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  /** The enter / exit animation finished: settles the phase. */
  | { type: "ANIMATION_END" }
  /** Settles the phase at once (no animation to wait for). */
  | { type: "SKIP_ANIMATION" };

export type DisclosureMachine = Machine<
  DisclosureState,
  DisclosureEvent,
  DisclosureProps
>;

const settle = (state: DisclosureState): DisclosureState => {
  if (state.phase === "opening") return { ...state, phase: "open" };
  if (state.phase === "closing") return { ...state, phase: "closed" };
  return state;
};

/** Whether the content should be rendered (any phase but "closed"). */
export const isDisclosurePresent = (state: DisclosureState): boolean =>
  state.phase !== "closed";

/** Creates a disclosure machine. */
export function createDisclosureMachine(
  props: DisclosureProps = {},
): DisclosureMachine {
  return createMachine<DisclosureState, DisclosureEvent, DisclosureProps>(
    {
      controlled: ["open"],
      initial: (p) => {
        const open = p.open ?? p.defaultOpen ?? false;
        return { open, phase: open ? "open" : "closed" };
      },
      reduce(state, event, p) {
        switch (event.type) {
          case "OPEN":
          case "CLOSE":
          case "TOGGLE": {
            if (p.disabled) return state;
            const open =
              event.type === "TOGGLE" ? !state.open : event.type === "OPEN";
            return open === state.open ? state : { ...state, open };
          }
          case "ANIMATION_END":
          case "SKIP_ANIMATION":
            return settle(state);
          default:
            return state;
        }
      },
      // The phase follows `open`: entering / leaving starts the transition.
      normalize(state, p) {
        const animated = p.animated ?? true;
        let { phase } = state;
        if (state.open && (phase === "closed" || phase === "closing")) {
          phase = animated ? "opening" : "open";
        } else if (!state.open && (phase === "open" || phase === "opening")) {
          phase = animated ? "closing" : "closed";
        } else if (!animated) {
          phase = state.open ? "open" : "closed";
        }
        return phase === state.phase ? state : { ...state, phase };
      },
      changed(requested, prev, p) {
        if (requested.open !== prev.open) p.onOpenChange?.(requested.open);
      },
    },
    props,
  );
}
