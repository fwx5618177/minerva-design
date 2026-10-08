// Web Components driver: renders contract specs as Minerva custom elements
// (Lit, happy-dom), sets props as element properties, drives them with
// user-event and logs every contract event with addEventListener.
import userEvent from "@testing-library/user-event";
import "minerva-design/web-components";
import { toast, toastStore } from "minerva-design/web-components";
import { settle } from "../../../packages/web-components/tests/utils";
import * as dom from "../harness/dom";
import type {
  Driver,
  EmittedEvent,
  Handle,
  RenderOptions,
  Spec,
} from "../harness/types";
import { contractOf, isNative } from "../harness/contracts";

const user = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Attributes (not properties) of every element */
const ATTRIBUTE = /^(aria-|data-)|^(id|slot|role|class)$/;

function setProps(el: Element, props: Record<string, unknown>) {
  for (const [name, value] of Object.entries(props)) {
    if (ATTRIBUTE.test(name)) el.setAttribute(name, String(value));
    else (el as unknown as Record<string, unknown>)[name] = value;
  }
}

function build(spec: Spec | string, parent: Node, log: EmittedEvent[]) {
  if (typeof spec === "string") {
    parent.appendChild(document.createTextNode(spec));
    return;
  }
  if (isNative(spec)) {
    const el = document.createElement(spec.component);
    setProps(el, spec.props);
    for (const child of spec.children) build(child, el, log);
    parent.appendChild(el);
    return;
  }
  const contract = contractOf(spec.component);
  if (contract.platforms.wc.status === "n/a" || !contract.tag) {
    for (const child of spec.children) build(child, parent, log);
    return;
  }
  const el = document.createElement(contract.tag);
  setProps(el, spec.props);
  for (const event of contract.events) {
    if (!event.wc) continue;
    el.addEventListener(event.wc, (e) => {
      // own events only (not the bubbling events of nested elements)
      if (e.target !== el) return;
      const detail = (e as CustomEvent).detail;
      log.push({
        component: contract.name,
        name: event.name,
        detail: detail && typeof detail === "object" ? { ...detail } : {},
      });
    });
  }
  for (const child of spec.children) build(child, el, log);
  parent.appendChild(el);
}

export const wcDriver: Driver = {
  platform: "wc",

  async render(spec: Spec | string, options: RenderOptions = {}) {
    const log: EmittedEvent[] = [];
    const container = document.createElement("div");
    let parent: Element = container;
    if (options.locale) {
      parent = document.createElement("minerva-config");
      parent.setAttribute("locale", options.locale);
      container.appendChild(parent);
    }
    build(spec, parent, log);
    document.body.appendChild(container);
    await wcDriver.settle();
    const root = parent.firstElementChild ?? parent;
    const handle: Handle = {
      root,
      events: log,
      emitted: (name, component) =>
        log.filter(
          (e) => e.name === name && (!component || e.component === component),
        ),
      async setProps(props) {
        setProps(root, props);
        await wcDriver.settle();
      },
      async unmount() {
        container.remove();
        await wcDriver.settle();
      },
    };
    return handle;
  },

  async settle(ms = 0) {
    await settle();
    if (ms) {
      await dom.wait(ms);
      await settle();
    }
  },

  queryAllByRole: dom.queryAllByRole,
  queryByRole: (role, options) => dom.queryAllByRole(role, options)[0] ?? null,
  getByRole(role, options) {
    const found = dom.queryAllByRole(role, options)[0];
    if (!found) throw new Error(`No ${role} ${options?.name ?? ""}`);
    return found;
  },
  queryByTestId: dom.queryByTestId,
  queryByText: dom.queryByText,
  queryPart: (name, within = document.body) =>
    dom
      .deepElements(within)
      .find((el) =>
        (el.getAttribute("part") ?? "").split(/\s+/).includes(name),
      ) ?? null,

  async press(target) {
    await user().click(target);
    await wcDriver.settle();
  },
  async type(target, text) {
    await user().type(target, text);
    await wcDriver.settle();
  },
  async keyboard(keys) {
    await user().keyboard(keys);
    await wcDriver.settle();
  },

  isChecked: dom.isChecked,
  classes: (el) => Array.from(el.classList),
  tokenVar: dom.tokenVar,
  stylesheet(component) {
    const tag = contractOf(component).tag;
    // Lit: the finalized `static styles` (CSSResult or CSSStyleSheet)
    const element = tag
      ? (customElements.get(tag) as
          | { elementStyles?: ({ cssText: string } | CSSStyleSheet)[] }
          | undefined)
      : undefined;
    if (!element) throw new Error(`No custom element for ${component}`);
    return (element.elementStyles ?? [])
      .map((style) =>
        style instanceof CSSStyleSheet
          ? Array.from(style.cssRules, (r) => r.cssText).join("\n")
          : style.cssText,
      )
      .join("\n");
  },

  services: {
    toast: {
      show(title, options) {
        toast.info(title, options);
      },
      reset() {
        toastStore.reset();
      },
    },
  },
};
