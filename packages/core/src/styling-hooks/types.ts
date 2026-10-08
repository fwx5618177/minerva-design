import type {
  BooleanState,
  KeyedState,
  StateKey,
  StateValue,
} from "./vocabulary";

/** Implementation a hook is limited to (absent: both libraries render it) */
export type HookImplementation = "react" | "wc";

/** A styling part: `data-part="<name>"` (React) / `part="<name>"` (WC). */
export interface PartHookSpec {
  /** What the part is (English; tooling and the custom elements manifest) */
  readonly description: string;
  /**
   * State keys rendered on this part in React, in addition to the root.
   * The `root` part carries every component state unless it lists its own.
   * On the web components every state is a custom state of the host.
   */
  readonly states?: readonly StateKey[];
  /**
   * Only rendered by one library (structure that has no counterpart in the
   * other one). Explain why in `description`.
   */
  readonly only?: HookImplementation;
}

/** The state hooks a component renders, with their values. */
export type ComponentStateSpec = {
  /** Values `data-state` takes */
  readonly state?: readonly StateValue[];
} & { readonly [K in BooleanState]?: true } & {
  readonly [K in KeyedState]?: readonly string[];
};

/** The public styling hooks of one component. */
export interface ComponentHookSpec {
  /** What the component is (English) */
  readonly description: string;
  /** React exports whose DOM carries `data-minerva="<component>"` */
  readonly react: readonly string[];
  /** Custom element tag (`minerva-<component>`), `null` for React-only */
  readonly wc: string | null;
  /** Styling parts, by name */
  readonly parts: Readonly<Record<string, PartHookSpec>>;
  /** State hooks and their values */
  readonly states: ComponentStateSpec;
}

/** Declares the hooks of a component (keeps the literal types). */
export const defineHooks = <const T extends ComponentHookSpec>(spec: T): T =>
  spec;

export type { StateKey };
