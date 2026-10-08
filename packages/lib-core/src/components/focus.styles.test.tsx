// Focus treatment of the text-like controls (styles/_mixins.scss
// `control-focus`): the native outline is replaced by a border color change
// plus a box-shadow ring, with `outline: 2px solid transparent` so forced
// colors still paint a visible outline.
//
// happy-dom does not compute pseudo-class styles, so each case asserts that
// (1) focus moves to the control (keyboard and mouse), (2) the focused frame
// matches the focus selector of the stylesheet and (3) that rule declares
// the ring and the transparent outline.
import { join } from "node:path";
import { useState, type ReactElement } from "react";
import { compile } from "sass";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { AutoComplete } from "./AutoComplete";
import { Cascader } from "./Cascader";
import { Input } from "./Input";
import { JsonField } from "./JsonField";
import { NumberInput } from "./NumberInput";
import { Select, SelectItem } from "./Select";
import { TagInput } from "./TagInput";
import { Textarea } from "./Textarea";
import { TimePicker } from "./TimePicker";

const scss = (file: string) => compile(join(import.meta.dirname, file)).css;

let sheets: HTMLStyleElement[] = [];
function inject(css: string) {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  sheets.push(style);
  return style.sheet!;
}
afterEach(() => {
  for (const sheet of sheets) sheet.remove();
  sheets = [];
});

/** The (top-level) style rule of `selector` in a stylesheet */
function rule(sheet: CSSStyleSheet, selector: string): CSSStyleRule {
  const found = Array.from(sheet.cssRules).find(
    (r): r is CSSStyleRule =>
      "selectorText" in r &&
      (r as CSSStyleRule).selectorText
        .split(",")
        .map((s) => s.trim())
        .includes(selector),
  );
  expect(found, selector).toBeDefined();
  return found!;
}

/** Order-insensitive tokens of a shorthand (happy-dom reorders them) */
const words = (value: string) => value.trim().split(/\s+/).sort();

function expectRing(style: CSSStyleDeclaration) {
  const shadow = style.getPropertyValue("box-shadow");
  expect(shadow).toMatch(/0 0 0 var\(--minerva-focus-ring-width, 3px\)/);
  expect(words(style.getPropertyValue("outline"))).toEqual(
    words("2px solid transparent"),
  );
}

/**
 * Whether the frame is in the focus state of `selector`. happy-dom has no
 * `:focus-within`: it is checked as "the frame contains the focused element".
 */
function inFocusState(frame: HTMLElement, selector: string): boolean {
  if (!selector.includes(":focus-within")) return frame.matches(selector);
  return (
    frame.matches(selector.replace(":focus-within", "")) &&
    frame.contains(document.activeElement)
  );
}

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "pear", label: "Pear" },
];
const areas = [{ value: "a", label: "Area A", children: [] }];

function ControlledNumber() {
  const [value, setValue] = useState<number | null>(1);
  return <NumberInput aria-label="Qty" value={value} onChange={setValue} />;
}

interface Case {
  name: string;
  scss: string;
  element: ReactElement;
  /** The control receiving focus */
  field: () => HTMLElement;
  /** Class of the frame drawing the ring, and its focus selector */
  frame: string;
  selector: string;
  /** Tab presses to reach the field (default 1) */
  tabs?: number;
}

const textbox = (name: string) => () => screen.getByRole("textbox", { name });
const combobox = (name: string) => () => screen.getByRole("combobox", { name });

const CASES: Case[] = [
  {
    name: "Input",
    scss: "Input/input.module.scss",
    element: <Input aria-label="Name" />,
    field: textbox("Name"),
    frame: "root",
    selector: ".root:focus-within",
  },
  {
    name: "Textarea",
    scss: "Textarea/textarea.module.scss",
    element: <Textarea aria-label="Bio" />,
    field: textbox("Bio"),
    frame: "textarea",
    selector: ".textarea:focus",
  },
  {
    name: "NumberInput",
    scss: "NumberInput/numberInput.module.scss",
    element: <ControlledNumber />,
    field: () => screen.getByRole("spinbutton", { name: "Qty" }),
    frame: "root",
    selector: ".root:focus-within:not(.invalid)",
  },
  {
    name: "TagInput (Input)",
    scss: "Input/input.module.scss",
    element: <TagInput defaultValue={[]} aria-label="Tags" />,
    field: combobox("Tags"),
    frame: "root",
    selector: ".root:focus-within",
  },
  {
    name: "AutoComplete (Input)",
    scss: "Input/input.module.scss",
    element: <AutoComplete name="fruit" label="Fruit" options={fruits} />,
    field: combobox("Fruit"),
    frame: "root",
    selector: ".root:focus-within",
  },
  {
    name: "TimePicker (Input)",
    scss: "Input/input.module.scss",
    element: <TimePicker aria-label="Time" />,
    field: textbox("Time"),
    frame: "root",
    selector: ".root:focus-within",
  },
  {
    name: "JsonField (Textarea)",
    scss: "Textarea/textarea.module.scss",
    element: <JsonField defaultValue="[1]" aria-label="JSON" />,
    field: textbox("JSON"),
    frame: "textarea",
    selector: ".textarea:focus",
    // after the Format button of the toolbar
    tabs: 2,
  },
  {
    name: "Cascader",
    scss: "Cascader/cascader.module.scss",
    element: <Cascader label="Area" name="area" options={areas} />,
    field: combobox("Area"),
    frame: "selector",
    selector: ".selector:focus-within",
  },
];

describe("text-like controls focus treatment (React)", () => {
  it.each(CASES)(
    "$name: Tab focuses the field and the frame gets the ring rule",
    async ({ scss: file, element, field, frame, selector, tabs = 1 }) => {
      const sheet = inject(scss(file));
      const user = userEvent.setup();
      render(element);
      for (let i = 0; i < tabs; i += 1) await user.tab();
      const control = field();
      expect(control).toHaveFocus();
      const box = control.closest(`.${frame}`) as HTMLElement;
      expect(box, frame).not.toBeNull();
      expect(inFocusState(box, selector)).toBe(true);
      expectRing(rule(sheet, selector).style);
    },
  );

  it.each(CASES.filter((c) => c.name !== "Cascader"))(
    "$name: mouse focus shows the ring too (focus / focus-within, not focus-visible)",
    async ({ element, field, frame, selector }) => {
      const user = userEvent.setup();
      render(element);
      await user.click(field());
      expect(field()).toHaveFocus();
      expect(selector).not.toContain("focus-visible");
      expect(
        inFocusState(field().closest(`.${frame}`) as HTMLElement, selector),
      ).toBe(true);
    },
  );

  it("the inner native field drops its outline only inside a ringed frame", () => {
    const sheet = inject(scss("Input/input.module.scss"));
    expect(
      words(rule(sheet, ".field").style.getPropertyValue("outline")),
    ).toContain("none");
    expectRing(rule(sheet, ".root:focus-within").style);
    expectRing(rule(sheet, ".invalid:focus-within").style);
  });

  it("Select trigger: keyboard focus and the open state share the ring", async () => {
    const sheet = inject(scss("Select/select.module.scss"));
    const user = userEvent.setup();
    render(
      <Select aria-label="Language" placeholder="Pick one">
        <SelectItem value="en">English</SelectItem>
      </Select>,
    );
    await user.tab();
    const trigger = screen.getByRole("combobox", { name: "Language" });
    expect(trigger).toHaveFocus();
    expectRing(rule(sheet, ".trigger:focus-visible").style);
    expectRing(rule(sheet, ".trigger[data-state=open]").style);
  });

  it("forced colors keep an explicit system-colored outline", () => {
    const css = scss("Input/input.module.scss");
    expect(css).toMatch(
      /@media \(forced-colors: active\)\s*\{\s*\.root:focus-within\s*\{\s*outline: 2px solid Highlight/,
    );
  });
});
