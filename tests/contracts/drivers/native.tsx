// React Native driver: renders contract specs with the minerva-design/native
// components (sources) on the React Native renderer (react-native-testing-mocks
// + @testing-library/react-native 14, see docs/adr/0002-spike-react-native.md),
// drives them with RNTL's userEvent and logs every contract event through
// spies on the native callbacks (`EventContract.native`: `onPress` for the
// web's `onClick`).
//
// The suites are written against DOM-like elements: host instances are
// wrapped in `NativeElement`, which answers the few DOM reads the suites
// make from the native accessibility props (`getAttribute("aria-selected")`
// -> `accessibilityState.selected`, `textContent`, `value` of a radio).
// Mapping of the platform-neutral interactions:
// - `press`: a user press (press in / out) on the host view;
// - `keyboard("{Escape}")`: the platform's dismiss key, i.e. the Android
//   back button (`onRequestClose` of the topmost React Native Modal);
// - lowercase specs (`p`, `div`) are Text / View with `data-testid` as testID.
import { createElement, Fragment, type ReactNode } from "react";
import { Text, View } from "react-native";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { getTextContent } from "@testing-library/react-native/dist/helpers/text-content";
import {
  computeAccessibleName,
  getRole,
  isHiddenFromAccessibility,
} from "@testing-library/react-native/dist/helpers/accessibility";
import type { TestInstance } from "test-renderer";
import * as Native from "../../../packages/native/src";
import { toastQueue } from "../../../packages/native/src/components/Toast";
import { NATIVE_COMPONENTS } from "../../../packages/native/src/manifest";
import type { ComponentContract } from "../../../packages/core/src/contracts";
import { contractOf, detailOf, isNative } from "../harness/contracts";
import type {
  Driver,
  EmittedEvent,
  Handle,
  QueryOptions,
  RenderOptions,
  Spec,
} from "../harness/types";

type Component = Parameters<typeof createElement>[0];
const components = Native as unknown as Record<string, Component>;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** A host instance seen through the DOM reads of the suites */
class NativeElement {
  constructor(readonly host: TestInstance) {}

  private get state(): Record<string, unknown> {
    return {
      ...(this.host.props.accessibilityState ?? {}),
      ...Object.fromEntries(
        ["selected", "checked", "disabled", "expanded", "busy"]
          .filter((key) => this.host.props[`aria-${key}`] !== undefined)
          .map((key) => [key, this.host.props[`aria-${key}`]]),
      ),
    };
  }

  getAttribute(name: string): string | null {
    const aria = /^aria-(selected|checked|disabled|expanded|busy)$/.exec(name);
    if (aria) {
      const value = this.state[aria[1]];
      return value === undefined ? null : String(value);
    }
    if (name === "role") return getRole(this.host);
    if (name === "aria-label") return computeAccessibleName(this.host) ?? null;
    const value = this.host.props[name];
    return value === undefined ? null : String(value);
  }

  get textContent(): string {
    return getTextContent(this.host);
  }

  /** `value` prop of the closest component rendering this host (a Radio) */
  get value(): unknown {
    for (
      let fiber = this.host.unstable_fiber as {
        memoizedProps?: Record<string, unknown>;
        return?: unknown;
      } | null;
      fiber;
      fiber = fiber.return as typeof fiber
    ) {
      const value = fiber.memoizedProps?.value;
      if (value !== undefined) return value;
    }
    return undefined;
  }

  get checked(): boolean {
    return isCheckedHost(this.host);
  }

  contains(other: NativeElement): boolean {
    for (let node: TestInstance | null = other.host; node; node = node.parent)
      if (node === this.host) return true;
    return false;
  }
}

const wrap = (host: TestInstance) =>
  new NativeElement(host) as unknown as Element;
const unwrap = (el: Element) => (el as unknown as NativeElement).host;

function isCheckedHost(host: TestInstance): boolean {
  const checked =
    host.props.accessibilityState?.checked ?? host.props["aria-checked"];
  return checked === true || checked === "mixed";
}

/** Every host element of the rendered tree, document order */
function hosts(): TestInstance[] {
  const out: TestInstance[] = [];
  const visit = (node: TestInstance) => {
    out.push(node);
    for (const child of node.children)
      if (typeof child !== "string") visit(child);
  };
  visit(screen.container);
  return out;
}

const matches = (value: string, expected?: string | RegExp) =>
  expected === undefined ||
  (typeof expected === "string" ? value === expected : expected.test(value));

/**
 * Role query over every host view: containers (dialog, tab list, radio
 * group, navigation) are not `accessible` on purpose (iOS would merge their
 * children), so RNTL's accessibility-element filter does not apply.
 */
function queryAllByRole(role: string, { name }: QueryOptions = {}): Element[] {
  return hosts()
    .filter(
      (el) =>
        typeof el.type === "string" &&
        getRole(el) === role &&
        !isHiddenFromAccessibility(el) &&
        matches(computeAccessibleName(el) ?? "", name),
    )
    .map(wrap);
}

/** Native component name of a contract (the manifest), or the contract's */
const nativeNameOf = (contract: ComponentContract) =>
  NATIVE_COMPONENTS.find((c) => c.contract === contract.name)?.name ??
  contract.name;

function toNative(
  spec: Spec | string,
  log: EmittedEvent[],
  key?: number,
): ReactNode {
  if (typeof spec === "string") return createElement(Text, { key }, spec);
  const children = spec.children.map((child, i) => toNative(child, log, i));
  if (isNative(spec)) {
    const { "data-testid": testID, ...props } = spec.props;
    const inline = spec.children.every((child) => typeof child === "string");
    return createElement(
      inline ? Text : View,
      {
        ...props,
        testID: typeof testID === "string" ? testID : undefined,
        key,
      },
      ...children,
    );
  }
  const contract = contractOf(spec.component);
  if (contract.platforms.native.status === "n/a")
    return createElement(Fragment, { key }, ...children);
  const name = nativeNameOf(contract);
  const type = components[name];
  if (!type) throw new Error(`minerva-design/native exports no ${name}`);
  const props: Record<string, unknown> = { ...spec.props, key };
  for (const event of contract.events) {
    if (!event.native) continue;
    const own = spec.props[event.native] as
      ((...args: unknown[]) => unknown) | undefined;
    props[event.native] = (...args: unknown[]) => {
      log.push({
        component: contract.name,
        name: event.name,
        detail: detailOf(event, args),
      });
      return own?.(...args);
    };
  }
  return createElement(type, props, ...children);
}

export const nativeDriver: Driver = {
  platform: "native",

  async render(input: Spec | string, options: RenderOptions = {}) {
    let spec = input;
    const log: EmittedEvent[] = [];
    const tree = () =>
      createElement(
        Native.MinervaProvider,
        { theme: "light", locale: { language: options.locale ?? "en" } },
        toNative(spec, log),
      );
    const result = await render(tree());
    await nativeDriver.settle();
    const handle: Handle = {
      root: wrap(result.container),
      events: log,
      emitted: (name, component) =>
        log.filter(
          (e) => e.name === name && (!component || e.component === component),
        ),
      async setProps(props) {
        if (typeof spec === "string") return;
        spec = { ...spec, props: { ...spec.props, ...props } };
        await result.rerender(tree());
        await nativeDriver.settle();
      },
      async unmount() {
        await result.unmount();
      },
    };
    return handle;
  },

  async settle(ms = 0) {
    await act(() => wait(ms));
  },

  queryAllByRole,
  queryByRole: (role, options) => queryAllByRole(role, options)[0] ?? null,
  getByRole(role, options) {
    const found = queryAllByRole(role, options)[0];
    if (!found) throw new Error(`No ${role} ${options?.name ?? ""}`);
    return found;
  },
  queryByTestId(id) {
    const found = hosts().find(
      (el) => typeof el.type === "string" && el.props.testID === id,
    );
    return found ? wrap(found) : null;
  },
  queryByText(text) {
    // innermost Text whose content matches
    const found = hosts().filter(
      (el) =>
        el.type === "Text" &&
        !isHiddenFromAccessibility(el) &&
        matches(getTextContent(el).replace(/\s+/g, " ").trim(), text),
    );
    const innermost = found.find(
      (el) => !found.some((other) => other !== el && other.parent === el),
    );
    return innermost ? wrap(innermost) : null;
  },
  queryPart(name, within) {
    const root = within ? unwrap(within) : screen.container;
    const all: TestInstance[] = [];
    const visit = (node: TestInstance) => {
      all.push(node);
      for (const child of node.children)
        if (typeof child !== "string") visit(child);
    };
    visit(root);
    const found = all.find((el) => el.props.dataSet?.part === name);
    return found ? wrap(found) : null;
  },

  async press(target) {
    const user = userEvent.setup();
    await user.press(unwrap(target));
    await nativeDriver.settle();
  },
  async type(target, text) {
    const user = userEvent.setup();
    await user.type(unwrap(target), text);
    await nativeDriver.settle();
  },
  async keyboard(keys) {
    if (keys !== "{Escape}")
      throw new Error(`React Native has no keyboard mapping for ${keys}`);
    // the dismiss key of the platform: Android's back button
    const modals = hosts().filter(
      (el) => el.type === "Modal" && el.props.visible !== false,
    );
    const top = modals.at(-1);
    if (top) await fireEvent(top, "requestClose");
    await nativeDriver.settle();
  },

  isChecked: (el) => isCheckedHost(unwrap(el)),
  // React Native has no CSS classes nor stylesheets: styles are objects
  // computed from the resolved design tokens (see expected-differences.ts)
  classes: () => [],
  tokenVar: () => "",
  stylesheet: () => "",

  services: {
    toast: {
      async show(title, options) {
        await act(() => {
          Native.toast.info(title, options);
        });
      },
      async reset() {
        await act(() => toastQueue.reset());
      },
    },
  },
};
