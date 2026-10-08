// Frameworks (React 19, Vue, Angular, Svelte, Solid) create a custom element,
// set its properties, then insert it. A value / checked state set before the
// element is connected (or before its definition loads) must survive the
// first update, unless the `value` / `checked` attribute is present (the
// attribute is the default, as with native inputs).
import { afterEach, describe, expect, it, vi } from "vitest";
import "../../src/index";
import { settle } from "../utils";

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

type Control = HTMLElement & Record<string, unknown>;

const CASES: Array<
  [tag: string, props: Record<string, unknown>, prop: string]
> = [
  ["minerva-input", { value: "Ada" }, "value"],
  ["minerva-textarea", { value: "Ada" }, "value"],
  ["minerva-number-input", { value: 3 }, "value"],
  [
    "minerva-select",
    {
      options: [
        { value: "a", label: "A" },
        { value: "b", label: "B" },
      ],
      value: "b",
    },
    "value",
  ],
  [
    "minerva-autocomplete",
    { options: [{ value: "a", label: "A" }], value: "a" },
    "value",
  ],
  [
    "minerva-cascader",
    {
      options: [
        { value: "a", label: "A", children: [{ value: "b", label: "B" }] },
      ],
      value: ["a", "b"],
    },
    "value",
  ],
  ["minerva-time-picker", { value: "09:30" }, "value"],
  ["minerva-tag-input", { value: ["x", "y"] }, "value"],
  ["minerva-rating", { value: 4 }, "value"],
  ["minerva-checkbox", { checked: true }, "checked"],
  ["minerva-switch", { checked: true }, "checked"],
];

describe("properties set before connecting", () => {
  it.each(CASES)("%s keeps its %o", async (tag, props, prop) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const el = document.createElement(tag) as Control;
    Object.assign(el, props);
    document.body.append(el);
    await settle();
    expect(el[prop]).toEqual(props[prop]);
  });

  it.each([
    ["minerva-input", "value", "Ada", "value", "Ada"],
    ["minerva-select", "value", "b", "value", "b"],
    ["minerva-time-picker", "value", "09:30", "value", "09:30"],
    ["minerva-checkbox", "checked", "", "checked", true],
  ] as const)(
    "%s: the %s attribute is the default (and the initial state)",
    async (tag, attr, text, prop, expected) => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      document.body.innerHTML = `<${tag} ${attr}="${text}"><minerva-option value="b">B</minerva-option></${tag}>`;
      await settle();
      expect((document.body.firstElementChild as Control)[prop]).toEqual(
        expected,
      );
    },
  );
});
