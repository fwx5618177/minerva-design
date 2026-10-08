// Focus treatment of the text-like elements: the shadow roots adopt the
// React stylesheets, so the native outline is replaced by a border color
// change + box-shadow ring with `outline: 2px solid transparent` (visible in
// forced colors). happy-dom computes no pseudo-class styles: each case checks
// that focus reaches the native field inside the shadow root, that the frame
// drawing the ring contains it, and that the adopted CSS declares the ring.
import { afterEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import "../index";
import { mount, settle, shadow } from "../../tests/utils";

type StyledClass = CustomElementConstructor & {
  elementStyles: Array<{ cssText: string }>;
};

afterEach(() => {
  document.body.innerHTML = "";
});

/** The adopted CSS of an element class */
const cssOf = (tag: string) =>
  (customElements.get(tag) as StyledClass).elementStyles
    .map((style) => style.cssText)
    .join("\n");

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The declarations of the (first) rule whose selector list has `selector` */
function block(css: string, selector: string): string {
  const pattern = new RegExp(
    `(?:^|[},])\\s*(?:[^{}]*,\\s*)?${escape(selector)}\\s*(?:,[^{}]*)?\\{([^}]*)\\}`,
    "m",
  );
  const match = css.match(pattern);
  expect(match, selector).not.toBeNull();
  return match![1];
}

function expectRing(declarations: string) {
  expect(declarations).toMatch(
    /box-shadow:[^;]*0 0 0 var\(--minerva-focus-ring-width,\s*3px\)/,
  );
  expect(declarations).toMatch(/outline:\s*2px solid transparent/);
}

interface Case {
  tag: string;
  markup: string;
  /** The native field (inside the element's shadow root, or a nested one) */
  field: (el: Element) => HTMLElement;
  frame: string;
  selector: string;
}

const inShadow = (selector: string) => (el: Element) =>
  shadow(el).querySelector<HTMLElement>(selector)!;
const nested = (inner: string, selector: string) => (el: Element) =>
  shadow(shadow(el).querySelector(inner)!).querySelector<HTMLElement>(
    selector,
  )!;

const CASES: Case[] = [
  {
    tag: "minerva-input",
    markup: `<minerva-input label="Name"></minerva-input>`,
    field: inShadow("input"),
    frame: ".root",
    selector: ".root:focus-within",
  },
  {
    tag: "minerva-textarea",
    markup: `<minerva-textarea label="Bio"></minerva-textarea>`,
    field: inShadow("textarea"),
    frame: ".textarea",
    selector: ".textarea:focus",
  },
  {
    tag: "minerva-number-input",
    markup: `<minerva-number-input label="Qty"></minerva-number-input>`,
    field: inShadow("input"),
    frame: ".root",
    selector: ".root:focus-within:not(.invalid)",
  },
  {
    tag: "minerva-tag-input",
    markup: `<minerva-tag-input label="Tags"></minerva-tag-input>`,
    field: inShadow("input"),
    frame: ".root",
    selector: ".root:focus-within",
  },
  {
    tag: "minerva-autocomplete",
    markup: `<minerva-autocomplete label="Fruit"></minerva-autocomplete>`,
    field: inShadow("input"),
    frame: ".root",
    selector: ".root:focus-within",
  },
  {
    tag: "minerva-time-picker",
    markup: `<minerva-time-picker label="Time"></minerva-time-picker>`,
    field: inShadow("input"),
    frame: ".root",
    selector: ".root:focus-within",
  },
  {
    tag: "minerva-json-field",
    markup: `<minerva-json-field label="JSON" value="[1]"></minerva-json-field>`,
    field: inShadow("textarea"),
    frame: ".textarea",
    selector: ".textarea:focus",
  },
  {
    tag: "minerva-cascader",
    markup: `<minerva-cascader label="Area"></minerva-cascader>`,
    field: inShadow("input"),
    frame: ".selector",
    selector: ".selector:focus-within",
  },
];

describe("text-like elements focus treatment (web components)", () => {
  it.each(CASES)(
    "<$tag>: focus reaches the field and the frame carries the ring rule",
    async ({ tag, markup, field, frame, selector }) => {
      const el = await mount(markup);
      const control = field(el);
      expect(control, `${tag} field`).toBeTruthy();
      await userEvent.click(control);
      await settle();
      const root = control.getRootNode() as ShadowRoot;
      expect(root.activeElement).toBe(control);
      const box = control.closest<HTMLElement>(frame);
      expect(box, frame).not.toBeNull();
      expect(box!.contains(root.activeElement)).toBe(true);
      expectRing(block(cssOf(tag), selector));
    },
  );

  it("<minerva-select>: the trigger shares the ring on keyboard focus and when open", async () => {
    const el = await mount(
      `<minerva-select label="Language"><minerva-option value="en">English</minerva-option></minerva-select>`,
    );
    const trigger = shadow(el).querySelector<HTMLElement>("button")!;
    trigger.focus();
    expect(shadow(el).activeElement).toBe(trigger);
    const css = cssOf("minerva-select");
    expectRing(block(css, ".trigger:focus-visible"));
  });

  it("<minerva-key-value-editor> fields are <minerva-textarea> elements", async () => {
    const el = await mount(
      `<minerva-key-value-editor value='{"a":"1"}'></minerva-key-value-editor>`,
    );
    const input = nested("minerva-textarea", "textarea")(el);
    await userEvent.click(input);
    const root = input.getRootNode() as ShadowRoot;
    expect(root.activeElement).toBe(input);
    expect(input.classList).toContain("textarea");
    expectRing(block(cssOf("minerva-textarea"), ".textarea:focus"));
  });

  it("no adopted stylesheet leaves the inner field without its frame ring", () => {
    // the inner native field drops its outline; its frame draws the focus
    const css = cssOf("minerva-input");
    expect(block(css, ".field")).toMatch(/outline:\s*none/);
    expectRing(block(css, ".root:focus-within"));
    expect(css).toMatch(/forced-colors:\s*active/);
  });
});
