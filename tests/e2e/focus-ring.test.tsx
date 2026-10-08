// A user tabs through a profile form (React and web components): every
// text-like control receives focus in order and its frame is the element
// the design-system focus rule targets (border color + box-shadow ring +
// transparent outline, see packages/react/src/styles/_mixins.scss).
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { compile } from "sass";
import { afterEach, describe, expect, it } from "vitest";
import {
  Button,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "minerva-design";
import "minerva-design/web-components";

const COMPONENTS = join(
  import.meta.dirname,
  "../../packages/react/src/components",
);
const css = (file: string) => compile(join(COMPONENTS, file)).css;

let styles: HTMLStyleElement[] = [];
afterEach(() => {
  for (const style of styles) style.remove();
  styles = [];
  document.body.innerHTML = "";
});

/** Adds the stylesheets and returns their focus rules (selector -> declarations) */
function focusRules(...files: string[]): Map<string, CSSStyleDeclaration> {
  const rules = new Map<string, CSSStyleDeclaration>();
  for (const file of files) {
    const style = document.createElement("style");
    style.textContent = css(file);
    document.head.append(style);
    styles.push(style);
    for (const rule of Array.from(style.sheet!.cssRules)) {
      if (!("selectorText" in rule)) continue;
      for (const selector of (rule as CSSStyleRule).selectorText.split(",")) {
        if (selector.includes(":focus"))
          rules.set(selector.trim(), (rule as CSSStyleRule).style);
      }
    }
  }
  return rules;
}

/** The ring of the rule: a 0 0 0 spread layer + transparent outline */
function expectRing(style: CSSStyleDeclaration | undefined) {
  expect(style).toBeDefined();
  expect(style!.getPropertyValue("box-shadow")).toMatch(
    /0 0 0 var\(--minerva-focus-ring-width, 3px\)/,
  );
  expect(style!.getPropertyValue("outline").split(/\s+/).sort()).toEqual(
    ["2px", "solid", "transparent"].sort(),
  );
}

describe("tabbing through a form shows the focus ring on each control", () => {
  it("React: Input -> Textarea -> NumberInput -> Select -> Button", async () => {
    const rules = focusRules(
      "Input/input.module.scss",
      "Textarea/textarea.module.scss",
      "NumberInput/numberInput.module.scss",
      "Select/select.module.scss",
    );
    const user = userEvent.setup();
    render(
      <form aria-label="Profile">
        <Input aria-label="Name" />
        <Textarea aria-label="Bio" />
        <NumberInput aria-label="Age" defaultValue={30} />
        <Select aria-label="Language" placeholder="Pick one">
          <SelectItem value="en">English</SelectItem>
        </Select>
        <Button type="submit">Save</Button>
      </form>,
    );

    const steps: Array<[HTMLElement, string, string]> = [
      [
        screen.getByRole("textbox", { name: "Name" }),
        ".root",
        ".root:focus-within",
      ],
      [
        screen.getByRole("textbox", { name: "Bio" }),
        ".textarea",
        ".textarea:focus",
      ],
      [
        screen.getByRole("spinbutton", { name: "Age" }),
        ".root",
        ".root:focus-within:not(.invalid)",
      ],
      [
        screen.getByRole("combobox", { name: "Language" }),
        ".trigger",
        ".trigger:focus-visible",
      ],
    ];
    for (const [control, frame, selector] of steps) {
      await user.tab();
      expect(control).toHaveFocus();
      const box = control.closest<HTMLElement>(frame)!;
      expect(box.contains(document.activeElement)).toBe(true);
      expectRing(rules.get(selector));
    }
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
  });

  it("web components: each field takes focus inside its framed shadow root", async () => {
    document.body.innerHTML = `
      <form aria-label="Profile">
        <minerva-input label="Name"></minerva-input>
        <minerva-textarea label="Bio"></minerva-textarea>
        <minerva-number-input label="Age"></minerva-number-input>
      </form>`;
    await Promise.all(
      Array.from(document.querySelectorAll("form > *")).map(
        (el) =>
          (el as HTMLElement & { updateComplete: Promise<unknown> })
            .updateComplete,
      ),
    );
    const user = userEvent.setup();
    const hosts = Array.from(document.querySelectorAll("form > *"));
    const frames: Array<[string, string]> = [
      ["input", ".root"],
      ["textarea", ".textarea"],
      ["input", ".root"],
    ];
    for (const [index, host] of hosts.entries()) {
      const [field, frame] = frames[index]!;
      const native = host.shadowRoot!.querySelector<HTMLElement>(field)!;
      await user.click(native);
      expect(document.activeElement).toBe(host);
      expect(host.shadowRoot!.activeElement).toBe(native);
      expect(native.closest(frame)!.contains(native)).toBe(true);
    }
    // (user-event's Tab does not walk shadow roots in happy-dom: the
    // keyboard order is covered by the React form above, which renders the
    // same stylesheets)
  });
});
