// Taro H5 driver runs the SAME interaction contracts as the web renderers.
// It uses real Taro host components, with framework APIs handled by its test
// environment; this is host validation, not a device simulator.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, Fragment, type ReactNode } from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Minerva from "../index";
import { type ComponentContract } from "../../../core/src/contracts";
import * as dom from "../../../../tests/contracts/harness/dom";
import type {
  Driver,
  EmittedEvent,
  Handle,
  RenderOptions,
  Spec,
} from "../../../../tests/contracts/harness/types";
import {
  REPO_ROOT,
  contractOf,
  detailOf,
  isNative,
} from "../../../../tests/contracts/harness/contracts";

const components = Minerva as unknown as Record<
  string,
  Parameters<typeof createElement>[0]
>;

const user = () => userEvent.setup({ pointerEventsCheck: 0 });

function toReact(
  spec: Spec | string,
  log: EmittedEvent[],
  key?: number,
): ReactNode {
  if (typeof spec === "string") return spec;
  if (isNative(spec))
    return createElement(
      spec.component,
      { ...spec.props, key },
      ...spec.children.map((child, i) => toReact(child, log, i)),
    );
  const contract: ComponentContract = contractOf(spec.component);
  const children = spec.children.map((child, i) => toReact(child, log, i));
  if (contract.platforms.taro.status === "n/a")
    return createElement(Fragment, { key }, ...children);
  const type = components[contract.name];
  if (!type) throw new Error(`minerva-design exports no ${contract.name}`);
  const props: Record<string, unknown> = { ...spec.props, key };
  for (const event of contract.events) {
    if (!event.react) continue;
    const own = spec.props[event.react] as
      ((...args: unknown[]) => unknown) | undefined;
    props[event.react] = (...args: unknown[]) => {
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

export const taroDriver: Driver = {
  platform: "taro",

  async render(input: Spec | string, options: RenderOptions = {}) {
    let spec = input;
    const log: EmittedEvent[] = [];
    const tree = () => {
      const node = toReact(spec, log);
      return options.locale ? (
        <Minerva.ConfigProvider locale={options.locale}>
          {node}
        </Minerva.ConfigProvider>
      ) : (
        node
      );
    };
    const result = render(<>{tree()}</>);
    await taroDriver.settle();
    const handle: Handle = {
      root: result.container.firstElementChild ?? result.container,
      events: log,
      emitted: (name, component) =>
        log.filter(
          (e) => e.name === name && (!component || e.component === component),
        ),
      async setProps(props) {
        if (typeof spec === "string") return;
        spec = { ...spec, props: { ...spec.props, ...props } };
        result.rerender(<>{tree()}</>);
        await taroDriver.settle();
      },
      async unmount() {
        result.unmount();
      },
    };
    return handle;
  },

  async settle(ms = 0) {
    await act(() => dom.wait(ms));
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
    within.querySelector(`[data-part="${name}"]`),

  async press(target) {
    await user().click(target);
    await taroDriver.settle();
  },
  async type(target, text) {
    await user().type(target, text);
    await taroDriver.settle();
  },
  async keyboard(keys) {
    await user().keyboard(keys);
    await taroDriver.settle();
  },

  isChecked: dom.isChecked,
  classes: (el) => Array.from(el.classList),
  tokenVar: dom.tokenVar,
  stylesheet() {
    return ["mini-controls.css", "taro-components.css"]
      .map((name) =>
        readFileSync(join(REPO_ROOT, "tools/styles", name), "utf8"),
      )
      .join("\n");
  },

  services: {
    toast: {
      show(title, options) {
        act(() => {
          Minerva.toast.info(title, options);
        });
      },
      reset() {
        act(() => Minerva.toast.clear());
      },
    },
  },
};
