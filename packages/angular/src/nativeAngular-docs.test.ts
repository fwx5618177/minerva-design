import { Component, signal } from "@angular/core";
import * as angularCore from "@angular/core";
import * as chartsCore from "minerva-design/charts/core";
import * as iconsCore from "minerva-design/icons/core";
import ts from "typescript";
import { expect, it, vi } from "vitest";
import * as components from "./index";
import { MnMonacoCodeEditor } from "../monaco";
import {
  angularExamples,
  angularSource,
  isCodeField,
  type CodeField,
} from "../../../apps/docs/src/docs/angular/examples";
import { render, settle } from "./testing";
const exported = { ...components, MnMonacoCodeEditor } as Record<
  string,
  unknown
>;
const modules: Record<string, Record<string, unknown>> = {
  "@angular/core": angularCore,
  "minerva-design/charts/core": chartsCore,
  "minerva-design/icons/core": iconsCore,
};
/**
 * Value of a code field (`code()` of the examples: generated data, timers),
 * evaluated with the names it imports, in the injection context of the
 * example's constructor like the compiled example
 */
const evaluate = (field: CodeField, self: object): unknown => {
  const scope = Object.entries(field.$imports ?? {}).flatMap(
    ([module, names]) =>
      (names ?? []).map((name) => [name, modules[module][name]] as const),
  );
  // authored, trusted example sources (also compiled by the docs build);
  // TypeScript (`as const`, annotations) is stripped first
  const source = ts.transpile(`const value = (${field.$code});`, {
    target: ts.ScriptTarget.ES2022,
  });
  const run = new Function(
    ...scope.map(([name]) => name),
    `${source}\nreturn value;`,
  ) as (...args: unknown[]) => unknown;
  // `this`: the example (fields initialized before this one)
  return run.apply(
    self,
    scope.map(([, value]) => value),
  );
};
it.each(
  Object.entries(angularExamples).flatMap(([page, examples]) =>
    examples.map((example) => ({ page, example })),
  ),
)(
  "nativeAngular documentation: $page / $example.title",
  async ({ example }) => {
    const errors = vi.spyOn(console, "error");
    const imports = example.imports.map((name) => {
      expect(exported[name], name).toBeTypeOf("function");
      return exported[name];
    });
    class Example {
      // provided by the docs host of every example (the site's language)
      readonly language = signal<"en" | "zh" | "ja" | "fr">("en");
      constructor() {
        for (const [key, value] of Object.entries(example.state))
          (this as Record<string, unknown>)[key] = isCodeField(value)
            ? evaluate(value, this)
            : structuredClone(value);
      }
    }
    Component({ imports: imports as never[], template: example.template })(
      Example,
    );
    const fixture = await render(Example);
    await settle(fixture);
    expect(
      fixture.nativeElement.querySelector("[data-minerva]"),
    ).not.toBeNull();
    expect(errors.mock.calls).toEqual([]);
    expect(angularSource(example)).toContain(example.template);
    fixture.destroy();
    errors.mockRestore();
  },
);
