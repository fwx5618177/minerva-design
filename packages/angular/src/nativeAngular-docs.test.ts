import { Component } from "@angular/core";
import { expect, it, vi } from "vitest";
import * as components from "./index";
import { MnMonacoCodeEditor } from "../monaco";
import {
  angularExamples,
  angularSource,
} from "../../../apps/docs/src/docs/angular/examples";
import { render, settle } from "./testing";
const exported = { ...components, MnMonacoCodeEditor } as Record<
  string,
  unknown
>;
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
      constructor() {
        Object.assign(this, structuredClone(example.state));
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
