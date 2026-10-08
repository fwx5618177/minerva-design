// Vue driver: renders contract specs with the native Vue 3 components of
// minerva-design/vue (createApp in happy-dom), drives them with user-event
// and logs every contract event through listeners on the emits that mirror
// the React callbacks (`onChange` -> emit "change", same arguments).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import userEvent from "@testing-library/user-event";
import { compile } from "sass";
import {
  createApp,
  Fragment,
  h,
  nextTick,
  shallowRef,
  type Component,
  type VNode,
} from "vue";
import * as Minerva from "minerva-design/vue";
import { toastStore } from "../../../packages/vue/src/components/Toast/store";
import { getContract } from "../../../packages/core/src/contracts";
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

const components = Minerva as unknown as Record<string, Component>;

const user = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Declared props of a component (SFC runtime props) */
const propsOf = (type: Component): Record<string, unknown> =>
  ((type as { props?: Record<string, unknown> }).props ?? {}) as Record<
    string,
    unknown
  >;

/**
 * Contract props -> Vue props: the React `checked` / `value` model is
 * `modelValue` (v-model) where the component has no prop of that name (a
 * Radio's or a Tab's `value` is its own value, not the model).
 */
function toVueProps(type: Component, props: Record<string, unknown>) {
  const declared = propsOf(type);
  const result: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(props)) {
    const model =
      (name === "checked" || name === "value") &&
      !(name in declared) &&
      "modelValue" in declared;
    result[model ? "modelValue" : name] = value;
  }
  return result;
}

/** Folder of a React component (its stylesheets are the Vue ones too) */
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
  if (!owner) throw new Error(`No component folder exports ${name}`);
  return join(dir, owner.name);
}

function toVue(spec: Spec | string, log: EmittedEvent[]): VNode | string {
  if (typeof spec === "string") return spec;
  const children = () => spec.children.map((child) => toVue(child, log));
  if (isNative(spec)) return h(spec.component, spec.props, children());
  const contract = contractOf(spec.component);
  if (contract.platforms.vue.status === "n/a")
    return h(Fragment, null, children());
  const type = components[contract.name];
  if (!type) throw new Error(`minerva-design/vue exports no ${contract.name}`);
  const props = toVueProps(type, spec.props);
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
  return h(
    type,
    props,
    spec.children.length ? { default: children } : undefined,
  );
}

export const vueDriver: Driver = {
  platform: "vue",

  async render(input: Spec | string, options: RenderOptions = {}) {
    const spec = shallowRef(input);
    const log: EmittedEvent[] = [];
    const container = document.createElement("div");
    document.body.appendChild(container);
    const app = createApp({
      render: () => {
        const node = toVue(spec.value, log);
        return options.locale
          ? h(
              Minerva.ConfigProvider,
              { locale: { language: options.locale } },
              () => node,
            )
          : node;
      },
    });
    app.mount(container);
    await vueDriver.settle();
    const handle: Handle = {
      root: container.firstElementChild ?? container,
      events: log,
      emitted: (name, component) =>
        log.filter(
          (e) => e.name === name && (!component || e.component === component),
        ),
      async setProps(props) {
        const current = spec.value;
        if (typeof current === "string") return;
        spec.value = { ...current, props: { ...current.props, ...props } };
        await vueDriver.settle();
      },
      async unmount() {
        app.unmount();
        container.remove();
        await vueDriver.settle();
      },
    };
    return handle;
  },

  async settle(ms = 0) {
    await nextTick();
    await dom.wait(ms);
    await nextTick();
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
    await vueDriver.settle();
  },
  async type(target, text) {
    await user().type(target, text);
    await vueDriver.settle();
  },
  async keyboard(keys) {
    await user().keyboard(keys);
    await vueDriver.settle();
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
        Minerva.toast.info(title, options);
      },
      reset() {
        toastStore.reset();
      },
    },
  },
};
