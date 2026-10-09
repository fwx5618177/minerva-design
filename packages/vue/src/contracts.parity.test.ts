// Parity of the Vue renderer with the component contracts
// (@minerva/core/contracts, generated from the React API): every Vue
// component has the contract's props (the `value` / `checked` model is
// `modelValue`; React nodes may be slots), the same literal defaults, and an
// emit for every React callback (`onOpenChange` -> `openChange`). Reviewed
// differences are listed below with their reason.
import { describe, expect, it } from "vitest";
import type { Component } from "vue";
import { componentContracts } from "@minerva/core/contracts";
import { allComponents } from "./plugin";
import { MonacoCodeEditor } from "./monaco";
import { PARITY_DIFFERENCES } from "./contracts.parity-differences";

const components: Record<string, Component> = {
  ...allComponents(),
  MonacoCodeEditor,
};

interface RuntimeProp {
  default?: unknown;
}
const propsOf = (c: Component) =>
  ((c as { props?: Record<string, RuntimeProp> }).props ?? {}) as Record<
    string,
    RuntimeProp
  >;
const emitsOf = (c: Component): string[] => {
  const emits = (c as { emits?: string[] | Record<string, unknown> }).emits;
  return Array.isArray(emits) ? emits : Object.keys(emits ?? {});
};

/** Props that are plain HTML attributes in Vue (`$attrs` fall-through) */
const HTML_ATTRIBUTES = /^(aria-[a-z]+|id|tabIndex)$/;

const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const emitOf = (callback: string) =>
  `${callback.charAt(2).toLowerCase()}${callback.slice(3)}`;

/** Literal default of a runtime prop (functions are factories) */
function literalDefault(prop: RuntimeProp | undefined): unknown {
  if (!prop || !("default" in prop)) return undefined;
  const value = prop.default;
  return typeof value === "function" ? undefined : value;
}

const vueContracts = componentContracts.filter(
  (c) =>
    (c.platforms.vue.status === "stable" ||
      c.platforms.vue.status === "beta") &&
    c.platforms.react.status !== "n/a",
);

describe("contracts parity (Vue vs @minerva/core/contracts)", () => {
  it("every Vue component of the contracts is exported", () => {
    expect(vueContracts.length).toBeGreaterThan(80);
    expect(
      vueContracts.filter((c) => !components[c.name]).map((c) => c.name),
    ).toEqual([]);
  });

  it("props, defaults and events match (or are reviewed differences)", () => {
    const problems: string[] = [];
    for (const contract of vueContracts) {
      const component = components[contract.name];
      if (!component) continue;
      const props = propsOf(component);
      const emits = emitsOf(component);
      for (const prop of contract.props) {
        if (prop.only === "wc") continue;
        const key = `${contract.name}.${prop.name}`;
        if (key in PARITY_DIFFERENCES) continue;
        // HTML attributes (aria-*, id, tabIndex) fall through to the element
        if (HTML_ATTRIBUTES.test(prop.name)) continue;
        const name =
          (prop.name === "value" || prop.name === "checked") &&
          !(prop.name in props) &&
          "modelValue" in props
            ? "modelValue"
            : prop.name;
        if (!(name in props)) {
          // React nodes / render functions may be slots in Vue
          if (prop.kind === "node" || prop.kind === "function") continue;
          problems.push(`${key}: missing prop`);
          continue;
        }
        const expected = prop.default;
        const actual = literalDefault(props[name]);
        if (
          expected !== undefined &&
          expected !== null &&
          actual !== undefined &&
          String(actual) !== String(expected)
        ) {
          problems.push(
            `${key}: default ${JSON.stringify(actual)} (contract ${JSON.stringify(expected)})`,
          );
        }
      }
      for (const event of contract.events) {
        if (!event.react) continue;
        const key = `${contract.name}.${event.react}`;
        if (key in PARITY_DIFFERENCES) continue;
        const emit = emitOf(event.react);
        if (
          !emits.includes(emit) &&
          !emits.includes(kebab(emit)) &&
          !(event.react in props)
        )
          problems.push(`${key}: no "${emit}" emit`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("lists no stale reviewed difference", () => {
    const stale = Object.keys(PARITY_DIFFERENCES).filter((key) => {
      const [name, member] = key.split(".");
      const contract = vueContracts.find((c) => c.name === name);
      return (
        !contract ||
        (!contract.props.some((p) => p.name === member) &&
          !contract.events.some((e) => e.react === member))
      );
    });
    expect(stale).toEqual([]);
  });
});
