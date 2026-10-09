import { expect, it } from "vitest";
import { angularExamples, angularSource } from "./angular/examples";
import angularApi from "./angular/api.generated.json";
const componentPages = [
  ...new Set(
    Object.keys(import.meta.glob("./pages/*/wc/*.html", { query: "?raw" })).map(
      (path) => path.split("/")[2]!,
    ),
  ),
];
it("every component documentation page has native Angular examples", () => {
  expect(Object.keys(angularExamples).sort()).toEqual(componentPages.sort());
  for (const examples of Object.values(angularExamples))
    expect(examples.length).toBeGreaterThanOrEqual(2);
});
it("every authored example has a unique compilation key and API-backed public imports", () => {
  const keys = new Set<string>();
  for (const examples of Object.values(angularExamples))
    for (const example of examples) {
      expect(example.key).toBeTruthy();
      expect(keys.has(example.key!)).toBe(false);
      keys.add(example.key!);
      expect(angularSource(example)).toContain(example.template);
      for (const component of example.imports)
        expect(Object.hasOwn(angularApi, component), component).toBe(true);
    }
});

it("documents the core Angular usage groups with runnable authored examples", () => {
  const required: Record<string, string[]> = {
    button: [
      "sizes-and-shapes",
      "template-icons-links-and-width",
      "native-form-buttons",
    ],
    input: [
      "clear-password-and-character-count",
      "sizes-variants-and-read-only",
      "native-validation-and-field-context",
    ],
    table: ["density-appearance-and-loading"],
    menu: ["nested-actions-and-expanded-state"],
    popover: ["controlled-open-and-disabled-trigger"],
    "config-provider": ["reactive-nested-configuration"],
  };
  for (const [page, ids] of Object.entries(required))
    for (const id of ids) {
      const example = angularExamples[page]!.find((item) => item.id === id);
      expect(example, `${page}:${id}`).toBeDefined();
      expect(example!.template).toContain("mn-");
      expect(example!.description).toBeTruthy();
    }
});

it("keeps the shared counter as the first Button example", () => {
  expect(angularExamples.button![0]!.id).toBe("actions-and-feedback");
});
