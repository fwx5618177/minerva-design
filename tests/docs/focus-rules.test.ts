// Focus treatment of the text-like controls, checked on the compiled CSS of
// every library stylesheet (React + web components share the React SCSS).
//
// - Every text-like control has a focus rule with the design-system
//   treatment (styles/_mixins.scss `control-focus`): a box-shadow ring and
//   `outline: 2px solid transparent` (forced colors paint that outline with
//   a system color once box-shadows are dropped).
// - No focus rule anywhere removes the outline (`none` / `0` / `auto`)
//   without a replacement: a box-shadow ring on the same rule, or an
//   outline / ring from a `:focus-visible` rule of the same element.
// - Controls composed from Input / Textarea (TagInput, AutoComplete,
//   TimePicker, JsonField, KeyValueEditor) render those controls (or their
//   stylesheet in the shadow root), so they inherit the treatment.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  compileScss,
  declarations,
  libraryDeclarations,
  splitTopLevel,
  tokens,
  type Declaration,
} from "./css";
import { at } from "./utils";

const COMPONENTS = "packages/react/src/components";

/** Text-like controls drawing their own frame: [name, scss, focus selector] */
const CONTROLS: Array<[string, string, string]> = [
  ["Input", "Input/input.module.scss", ".root:focus-within"],
  ["Input (invalid)", "Input/input.module.scss", ".invalid:focus-within"],
  ["Textarea", "Textarea/textarea.module.scss", ".textarea:focus"],
  ["Textarea (invalid)", "Textarea/textarea.module.scss", ".invalid:focus"],
  ["Select trigger", "Select/select.module.scss", ".trigger:focus-visible"],
  [
    "NumberInput",
    "NumberInput/numberInput.module.scss",
    ".root:focus-within:not(.invalid)",
  ],
  [
    "NumberInput (invalid)",
    "NumberInput/numberInput.module.scss",
    ".invalid:focus-within",
  ],
  ["Cascader", "Cascader/cascader.module.scss", ".selector:focus-within"],
  ["Command input", "Command/command.module.scss", ".search:focus-within"],
  [
    "Pagination page input",
    "Pagination/pagination.module.scss",
    ".pagination .simpleInput input:focus",
  ],
  [
    "Pagination jumper",
    "Pagination/pagination.module.scss",
    ".pagination .jumper input:focus",
  ],
  [
    "Pagination size changer",
    "Pagination/pagination.module.scss",
    ".pagination .sizeChanger select:focus",
  ],
];

/** Composite controls: [name, React source, Input/Textarea used, WC source] */
const COMPOSED: Array<[string, string, RegExp, string, RegExp]> = [
  [
    "TagInput",
    "TagInput/TagInput.tsx",
    /<Input\b/,
    "tag-input/tag-input.ts",
    /Input\/input\.module\.scss/,
  ],
  [
    "AutoComplete",
    "AutoComplete/AutoComplete.tsx",
    /<Input\b/,
    "autocomplete/autocomplete.ts",
    /Input\/input\.module\.scss/,
  ],
  [
    "TimePicker",
    "TimePicker/TimePicker.tsx",
    /<Input\b/,
    "time-picker/time-picker.ts",
    /Input\/input\.module\.scss/,
  ],
  [
    "JsonField",
    "JsonField/JsonField.tsx",
    /<Textarea\b/,
    "json-field/json-field.ts",
    /Textarea\/textarea\.module\.scss/,
  ],
  [
    "KeyValueEditor",
    "KeyValueEditor/KeyValueEditor.tsx",
    /<Textarea\b/,
    "key-value-editor/key-value-editor.ts",
    /minerva-textarea|MinervaTextarea/,
  ],
];

const FOCUS = /:focus(?:-visible|-within)?\b/;

/**
 * Focus selectors allowed to drop the outline: programmatic focus targets
 * (`tabindex="-1"` surfaces that receive focus when they open so the next
 * Tab starts inside them). They are not controls: the controls inside carry
 * the indicator, and a ring around a whole dialog would read as an error.
 */
const FOCUS_CONTAINERS: Array<{
  file: string;
  selector: string;
  reason: string;
}> = [
  {
    file: "packages/react/src/components/Modal/modal.module.scss",
    selector: ".content:focus",
    reason:
      "Modal dialog surface, focused on open when no control is auto-focused.",
  },
  {
    file: "packages/react/src/components/Drawer/drawer.module.scss",
    selector: ".content:focus",
    reason:
      "Drawer dialog surface, focused on open when no control is auto-focused.",
  },
  {
    file: "packages/react/src/components/AppShell/appShell.module.scss",
    selector: ".drawer:focus",
    reason:
      "Mobile navigation drawer surface, focused on open (its links show the ring).",
  },
];
const selectorsOf = (decl: Declaration) => splitTopLevel(decl.selector);
const inForcedColors = (decl: Declaration) =>
  decl.context.some((c) => c.includes("forced-colors"));

/** A box-shadow with a full outer ring layer (0 0 0 <spread>) */
export function hasRing(value: string): boolean {
  return splitTopLevel(value).some((layer) => {
    const parts = tokens(layer);
    if (parts.includes("inset")) return false;
    const [x, y, blur, spread] = parts;
    return (
      x === "0" &&
      y === "0" &&
      blur === "0" &&
      spread !== undefined &&
      !/^0(px)?$/.test(spread)
    );
  });
}

const removesOutline = (decl: Declaration) =>
  decl.property === "outline" && /^(none|0|0px|auto)$/.test(decl.value.trim());

/** The element a focus selector targets (`.a:focus-visible` -> `.a`) */
const base = (selector: string) =>
  selector.replace(/:focus(?:-visible|-within)?\b/g, "").trim();

describe("text-like controls: focus treatment", () => {
  it.each(CONTROLS)(
    "%s has a box-shadow ring and a transparent outline",
    (_name, file, selector) => {
      const path = `${COMPONENTS}/${file}`;
      const rules = declarations({ file: path, css: compileScss(path) }).filter(
        (d) => !inForcedColors(d) && selectorsOf(d).includes(selector),
      );
      const shadow = rules.find((d) => d.property === "box-shadow");
      const outline = rules.find((d) => d.property === "outline");
      expect(shadow, `${selector} box-shadow`).toBeDefined();
      expect(hasRing(shadow!.value), shadow!.value).toBe(true);
      // the ring comes from the shared tokens
      expect(shadow!.value).toContain("var(--minerva-focus-ring-width");
      expect(outline?.value, `${selector} outline`).toBe(
        "2px solid transparent",
      );
    },
  );

  it.each(CONTROLS.filter(([name]) => !name.includes("invalid")))(
    "%s changes the border color on focus",
    (_name, file, selector) => {
      const path = `${COMPONENTS}/${file}`;
      const rules = declarations({ file: path, css: compileScss(path) }).filter(
        (d) => !inForcedColors(d) && selectorsOf(d).includes(selector),
      );
      const border =
        rules.find((d) => d.property === "border-color")?.value ??
        // Input / Select draw the border as an inset shadow layer
        rules.find((d) => d.property.startsWith("--_"))?.value ??
        rules.find((d) => d.property === "box-shadow")?.value;
      expect(border).toMatch(/--minerva-focus-border-color|inset 0 0 0 1px/);
    },
  );

  it.each(COMPOSED)(
    "%s is built on the Input / Textarea treatment",
    (_name, react, reactPattern, wc, wcPattern) => {
      expect(readFileSync(at(COMPONENTS, react), "utf8")).toMatch(reactPattern);
      expect(
        readFileSync(at("packages/web-components/src/components", wc), "utf8"),
      ).toMatch(wcPattern);
    },
  );
});

describe("no focus rule removes the outline without a replacement", () => {
  const decls = libraryDeclarations();

  it("every outline: none / 0 / auto on a focus selector is replaced", () => {
    const offenders: string[] = [];
    for (const decl of decls.filter(
      (d) => removesOutline(d) && FOCUS.test(d.selector),
    )) {
      const sameRule = decls.filter(
        (d) => d.file === decl.file && d.selector === decl.selector,
      );
      if (sameRule.some((d) => d.property === "box-shadow" && hasRing(d.value)))
        continue;
      // mouse focus only: keyboard focus keeps its indicator
      if (decl.selector.includes(":not(:focus-visible)")) continue;
      if (
        FOCUS_CONTAINERS.some(
          (c) => c.file === decl.file && c.selector === decl.selector,
        )
      )
        continue;
      // the indicator is drawn by a pseudo-element of the same rule
      const drawnByPseudo = decls.some(
        (d) =>
          d.file === decl.file &&
          /^::?(after|before)$/.test(d.selector.slice(decl.selector.length)) &&
          d.selector.startsWith(decl.selector) &&
          d.property === "outline" &&
          !removesOutline(d),
      );
      if (drawnByPseudo) continue;
      // `:focus { outline: none }` + `:focus-visible { outline / ring }`
      const targets = selectorsOf(decl).map(base);
      const replaced = decls.some(
        (d) =>
          d.file === decl.file &&
          d !== decl &&
          /:focus-visible/.test(d.selector) &&
          selectorsOf(d).some((s) => targets.includes(base(s))) &&
          ((d.property === "outline" && !removesOutline(d)) ||
            (d.property === "box-shadow" && hasRing(d.value))),
      );
      if (!replaced)
        offenders.push(
          `${decl.file} | ${decl.selector} | outline: ${decl.value}`,
        );
    }
    expect(offenders).toEqual([]);
  });

  it("every focus container exemption is documented and still needed", () => {
    for (const entry of FOCUS_CONTAINERS) {
      expect(entry.reason.length).toBeGreaterThan(20);
      expect(
        decls.some(
          (d) =>
            d.file === entry.file &&
            d.selector === entry.selector &&
            removesOutline(d),
        ),
        `stale exemption ${entry.file} ${entry.selector}`,
      ).toBe(true);
    }
  });

  it("the detectors", () => {
    expect(hasRing("0 0 0 3px red")).toBe(true);
    expect(hasRing("inset 0 0 0 1px red, 0 0 0 var(--w, 3px) red")).toBe(true);
    expect(hasRing("inset 0 0 0 1px red")).toBe(false);
    expect(hasRing("0 4px 12px red")).toBe(false);
    expect(hasRing("none")).toBe(false);
  });
});
