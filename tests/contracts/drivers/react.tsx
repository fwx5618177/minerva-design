// React DOM driver: renders contract specs with the minerva-design React
// components (@testing-library/react), drives them with user-event and logs
// every contract event through spies on the React callbacks.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createElement, Fragment, type ReactNode } from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { compile } from "sass";
import * as Minerva from "minerva-design";
import { toastStore } from "../../../packages/react/src/components/Toast/store";
import {
  getContract,
  type ComponentContract,
} from "../../../packages/core/src/contracts";
import * as dom from "../harness/dom";
import type {
  Driver,
  EmittedEvent,
  Handle,
  RenderOptions,
  Spec,
} from "../harness/types";
import {
  REPO_ROOT,
  contractOf,
  detailOf,
  isNative,
} from "../harness/contracts";

const components = Minerva as unknown as Record<
  string,
  Parameters<typeof createElement>[0]
>;

const user = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Folder of a React component under packages/react/src/components */
function folderOf(name: string): string {
  const dir = join(REPO_ROOT, "packages/react/src/components");
  const folders = readdirSync(dir, { withFileTypes: true }).filter((d) =>
    d.isDirectory(),
  );
  const exact = folders.find((d) => d.name === name);
  if (exact) return join(dir, exact.name);
  const owner = folders.find((d) => {
    try {
      return new RegExp(`\\b${name}\\b`).test(
        readFileSync(join(dir, d.name, "index.ts"), "utf8"),
      );
    } catch {
      return false;
    }
  });
  if (!owner) throw new Error(`No React component folder exports ${name}`);
  return join(dir, owner.name);
}

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
  if (contract.platforms.react.status === "n/a")
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

export const reactDriver: Driver = {
  platform: "react",

  async render(input: Spec | string, options: RenderOptions = {}) {
    let spec = input;
    const log: EmittedEvent[] = [];
    const tree = () => {
      const node = toReact(spec, log);
      return options.locale ? (
        <Minerva.ConfigProvider locale={{ language: options.locale }}>
          {node}
        </Minerva.ConfigProvider>
      ) : (
        node
      );
    };
    const result = render(<>{tree()}</>);
    await reactDriver.settle();
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
        await reactDriver.settle();
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
    await reactDriver.settle();
  },
  async type(target, text) {
    await user().type(target, text);
    await reactDriver.settle();
  },
  async keyboard(keys) {
    await user().keyboard(keys);
    await reactDriver.settle();
  },

  isChecked: dom.isChecked,
  classes: (el) => Array.from(el.classList),
  tokenVar: dom.tokenVar,
  stylesheet(component) {
    const folder = folderOf(getContract(component)?.name ?? component);
    return readdirSync(folder)
      .filter((file) => file.endsWith(".scss"))
      .map((file) => compile(join(folder, file)).css)
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
        act(() => toastStore.reset());
      },
    },
  },
};
