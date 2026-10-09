import {
  Component,
  signal,
  reflectComponentType,
  type Type,
} from "@angular/core";
import { TestBed, type ComponentFixture } from "@angular/core/testing";
import { compile } from "sass";
import { join } from "node:path";
import { readdirSync } from "node:fs";
import * as Minerva from "../index";
import { render, settle, user } from "./index";
import * as dom from "../../../../tests/contracts/harness/dom";
import {
  contractOf,
  isNative,
  REPO_ROOT,
} from "../../../../tests/contracts/harness/contracts";
import type {
  Driver,
  Spec,
  EmittedEvent,
} from "../../../../tests/contracts/harness/types";

const exports = Minerva as unknown as Record<string, Type<unknown>>;
let active: ComponentFixture<unknown> | undefined;
const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("{", "&#123;");
export const nativeAngular: Driver = {
  platform: "angular",
  async render(spec, options = {}) {
    const log: EmittedEvent[] = [];
    const nodes: Spec[] = [];
    const imports: Type<unknown>[] = [Minerva.MnConfig];
    function template(spec: Spec | string): string {
      if (typeof spec === "string") return escape(spec);
      if (spec.component === "TabList")
        return spec.children.map(template).join("");
      const id = nodes.push(spec) - 1;
      let tag = spec.component;
      let selectorAttrs = "";
      let type: Type<unknown> | undefined;
      if (!isNative(spec)) {
        type =
          exports[
            spec.component === "ToastProvider"
              ? "MnToastRegion"
              : `Mn${spec.component}`
          ];
        if (!type)
          throw new Error(`No Angular component for ${spec.component}`);
        imports.push(type);
        const selector = reflectComponentType(type)!.selector.split(",")[0];
        tag = selector.match(/^[\w-]+/)?.[0] ?? "div";
        selectorAttrs = [...selector.matchAll(/\[([\w-]+)\]/g)]
          .map((m) => m[1])
          .join(" ");
      }
      const meta = type ? reflectComponentType(type) : null;
      const inputs = meta?.inputs.map((p) => p.templateName) ?? [];
      const outputs = meta?.outputs.map((p) => p.templateName) ?? [];
      const propName = (name: string) =>
        name === "current"
          ? "page"
          : name === "defaultValue" && !inputs.includes(name)
            ? "value"
            : name;
      let attributes = Object.keys(spec.props)
        .filter((name) => !name.startsWith("on"))
        .map((name) => {
          const target = propName(name);
          return inputs.includes(target)
            ? `[${target}]="nodes()[${id}].props['${name}']"`
            : `[attr.${target}]="nodes()[${id}].props['${name}']"`;
        })
        .join(" ");
      if (type) {
        for (const event of contractOf(spec.component).events) {
          const field = event.detail?.[0];
          const output =
            event.react === "onClick" ? "click" : field ? `${field}Change` : "";
          if (output === "click" || outputs.includes(output))
            attributes += ` (${output})="emit(${id}, '${event.name}', '${field ?? ""}', $event)"`;
        }
      }
      return `<${tag} ${selectorAttrs} ${attributes}>${spec.children.map(template).join("")}</${tag}>`;
    }
    const html = template(spec);
    class ContractHost {
      nodes = signal(nodes);
      emit(id: number, name: string, field: string, value: unknown) {
        log.push({
          component: nodes[id].component,
          name,
          detail: field ? { [field]: value } : {},
        });
      }
    }
    Component({
      imports: [...new Set(imports)],
      template: `<mn-config locale="${options.locale ?? "en"}">${html}</mn-config>`,
    })(ContractHost);
    const fixture = await render(ContractHost);
    active = fixture;
    return {
      root: fixture.nativeElement,
      events: log,
      emitted: (name, component) =>
        log.filter(
          (e) => e.name === name && (!component || component === e.component),
        ),
      async setProps(props) {
        if (typeof spec !== "string") {
          Object.assign(spec.props, props);
          fixture.componentInstance.nodes.set([...nodes]);
          await settle(fixture);
        }
      },
      async unmount() {
        fixture.destroy();
        if (active === fixture) active = undefined;
      },
    };
  },
  async settle(ms = 0) {
    if (active) await settle(active, ms);
    else await dom.wait(ms);
  },
  queryAllByRole: dom.queryAllByRole,
  queryByRole: (role, options) => dom.queryAllByRole(role, options)[0] ?? null,
  getByRole(role, options) {
    const result = dom.queryAllByRole(role, options)[0];
    if (!result) throw new Error(`Missing ${role} ${options?.name ?? ""}`);
    return result;
  },
  queryByTestId: dom.queryByTestId,
  queryByText: dom.queryByText,
  queryPart: (name, within = document.body) =>
    within.querySelector(`[data-part="${name}"]`),
  async press(target) {
    await user().click(target);
    await this.settle();
  },
  async type(target, text) {
    await user().type(target, text);
    await this.settle();
  },
  async keyboard(keys) {
    await user().keyboard(keys);
    await this.settle();
  },
  isChecked: dom.isChecked,
  classes: (el) => Array.from(el.classList),
  tokenVar: dom.tokenVar,
  stylesheet(component) {
    const folder = join(REPO_ROOT, "packages/react/src/components", component);
    return readdirSync(folder)
      .filter((name) => name.endsWith(".scss"))
      .map((name) => compile(join(folder, name)).css)
      .join("\n");
  },
  services: {
    toast: {
      show(title, options) {
        TestBed.inject(Minerva.MnToastService).show({ title, ...options });
      },
      reset() {
        TestBed.inject(Minerva.MnToastService).clear();
      },
    },
  },
};
