// The platform-neutral driver API of the contract suites. Every renderer
// (React DOM and Web Components today; Vue, Angular, React Native, Taro,
// WeChat and uni-app later) implements `Driver` once; the suites in
// ../suites are written once against it and the component contracts of
// @minerva/core/contracts.
import type {
  ComponentContract,
  Platform,
} from "../../../packages/core/src/contracts";
import type { SupportedLanguage } from "../../../packages/core/src/i18n";

/**
 * A component tree described with contract names (`Tabs`, `Tab`...):
 * each driver maps it to its own components / elements. A node whose
 * component is `n/a` on the driver's platform (e.g. the React-only
 * `TabList`) renders its children in place. A lowercase `component` is a
 * native element (`div`), rendered as is on DOM platforms.
 */
export interface Spec {
  component: string;
  props: Record<string, unknown>;
  children: (Spec | string)[];
}

/** `h("Tabs", { value: "a" }, h("Tab", { value: "a" }, "A"))` */
export const h = (
  component: string,
  props: Record<string, unknown> = {},
  ...children: (Spec | string)[]
): Spec => ({ component, props, children });

export interface RenderOptions {
  /** Built-in texts language, set with the platform's config / locale provider */
  locale?: SupportedLanguage;
}

/** An event received from a rendered component */
export interface EmittedEvent {
  /** Contract name of the component that emitted it */
  component: string;
  /** Contract event name (`minerva-change`, `click`...) */
  name: string;
  /**
   * `event.detail` (custom elements), or the React callback arguments
   * mapped onto the contract's detail fields (primitives only)
   */
  detail: Record<string, unknown>;
}

export interface QueryOptions {
  /** Accessible name (exact string or pattern) */
  name?: string | RegExp;
}

/** A rendered tree */
export interface Handle {
  /** Root host element (React: its DOM root; custom elements: the host) */
  root: Element;
  /** Every event emitted so far, oldest first */
  events: EmittedEvent[];
  /** Events of one contract event name */
  emitted(name: string, component?: string): EmittedEvent[];
  /** Replaces props of the root component (controlled updates) */
  setProps(props: Record<string, unknown>): Promise<void>;
  unmount(): Promise<void>;
}

/** Platform services the suites need beyond rendering */
export interface ToastService {
  show(title: string, options?: { duration?: number }): void | Promise<void>;
  /** Removes every toast (between tests) */
  reset(): void | Promise<void>;
}

export interface Driver {
  platform: Platform;
  render(spec: Spec | string, options?: RenderOptions): Promise<Handle>;
  /** Waits for pending renders / updates */
  settle(ms?: number): Promise<void>;

  // --- queries: the whole document, shadow roots included -----------------
  queryAllByRole(role: string, options?: QueryOptions): Element[];
  queryByRole(role: string, options?: QueryOptions): Element | null;
  getByRole(role: string, options?: QueryOptions): Element;
  queryByTestId(id: string): Element | null;
  queryByText(text: string | RegExp): Element | null;
  /**
   * A styling-hook part of a component (React `[data-part]`, custom
   * elements `::part()`): `part("overlay")`
   */
  queryPart(name: string, within?: Element): Element | null;

  // --- interactions (user-event) -------------------------------------------
  press(target: Element): Promise<void>;
  type(target: Element, text: string): Promise<void>;
  keyboard(keys: string): Promise<void>;

  // --- state and styles ------------------------------------------------------
  /** Checked state of a checkbox / switch / radio (`aria-checked` or `.checked`) */
  isChecked(el: Element): boolean;
  classes(el: Element): string[];
  /** Computed value of a CSS custom property on `el` */
  tokenVar(el: Element, name: string): string;
  /** The CSS this platform applies to a component (stylesheet text) */
  stylesheet(component: string): string;

  services: { toast: ToastService };
}

/**
 * A contract behaviour that genuinely differs on one platform: the suite
 * runs it as `it.fails` (still checked: it must keep failing) with the
 * documented reason.
 */
export interface ExpectedDifference {
  platform: Platform;
  /** `<suite> > <test title>` */
  test: string;
  reason: string;
}

export type ContractLookup = (name: string) => ComponentContract;
