import { describe, expect, it } from "vitest";
import { resolveTokens } from "../../packages/core/src/tokens/resolve";
import { parseColor } from "../../packages/core/src/tokens/color";
import { compileScss, declarations } from "./css";

function contrast(a: string, b: string): number {
  const luminance = (value: string) => {
    const color = parseColor(value)!;
    return [color.r, color.g, color.b].reduce((sum, channel, index) => {
      const c = channel / 255;
      return (
        sum +
        (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4) *
          [0.2126, 0.7152, 0.0722][index]
      );
    }, 0);
  };
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const styles = (path: string) =>
  declarations({ file: path, css: compileScss(path) });
const component = (path: string) =>
  styles(`packages/react/src/components/${path}`);

describe("necessary control boundaries", () => {
  it.each(["light", "dark"] as const)(
    "provides a distinct control border with 3:1 surface contrast in %s",
    (mode) => {
      const colors = resolveTokens({ mode }).colors;
      expect(colors["control-border-color"]).toBeDefined();
      expect(
        contrast(colors["control-border-color"], colors["surface-color"]),
      ).toBeGreaterThanOrEqual(3);
      expect(colors["control-border-color"]).not.toBe(colors["border-color"]);
    },
  );
  it.each([
    "Input/input.module.scss",
    "Textarea/textarea.module.scss",
    "Select/select.module.scss",
    "NumberInput/numberInput.module.scss",
  ])("uses semantic boundary defaults in %s", (path) => {
    expect(
      component(path).some(({ value }) =>
        value.includes("var(--control-border-color)"),
      ),
    ).toBe(true);
  });
});

describe("preset touch targets", () => {
  it.each([
    ["Switch/switch.module.scss", ".switch"],
    ["Switch/switch.module.scss", ".switchBase"],
    ["Checkbox/checkbox.module.scss", ".checkbox"],
    ["Radio/radio.module.scss", ".radio"],
    ["Button/button.module.scss", ".customButton.small"],
    ["IconButton/iconButton.module.scss", ".iconButton"],
    ["DatePicker/datePicker.module.scss", ".day"],
    ["MonthCalendar/monthCalendar.module.scss", ".day"],
  ])("reserves touch target space in %s %s", (path, selector) => {
    const rules = component(path).filter((declaration) =>
      declaration.selector
        .split(", ")
        .some(
          (part) =>
            part === selector ||
            part === selector.slice(0, selector.indexOf(".", 1)),
        ),
    );
    for (const property of ["min-width", "min-height"]) {
      expect(
        rules.some(
          (rule) =>
            rule.property === property &&
            rule.value.includes("--touch-target-min"),
        ),
        property,
      ).toBe(true);
    }
  });
  it("expands the calendar grid tracks with their hit targets", () => {
    expect(
      component("DatePicker/datePicker.module.scss").some(
        (rule) =>
          rule.property === "grid-template-columns" &&
          rule.value.includes("--touch-target-min"),
      ),
    ).toBe(true);
  });
});

describe("selectable outside-month dates", () => {
  it.each([
    "DatePicker/datePicker.module.scss",
    "MonthCalendar/monthCalendar.module.scss",
  ])(
    "uses readable secondary text and keeps disabled dates separate in %s",
    (path) => {
      const rules = component(path);
      const outside = rules.find(
        (rule) =>
          rule.selector.includes("[data-outside]") && rule.property === "color",
      );
      expect(outside?.value).toContain("--text-secondary-color");
      expect(outside?.value).not.toContain("--text-disabled-color");
      expect(
        rules.some(
          (rule) =>
            /\[aria-disabled=["']?true["']?\]/.test(rule.selector) &&
            rule.property === "opacity",
        ),
      ).toBe(true);
    },
  );
  it.each(["light", "dark"] as const)(
    "gives selectable secondary dates 4.5:1 in %s",
    (mode) => {
      const colors = resolveTokens({ mode }).colors;
      expect(
        contrast(
          colors["text-secondary-color"],
          colors["surface-elevated-color"],
        ),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );
});

describe("switch keyboard focus", () => {
  it("outlines the entire interactive control with an opaque text-color boundary", () => {
    expect(
      component("Switch/switch.module.scss").some(
        (rule) =>
          rule.selector === ".switchBase:has(input:focus-visible)" &&
          rule.property === "outline" &&
          rule.value === "2px solid var(--text-color)",
      ),
    ).toBe(true);
  });
  it.each(["light", "dark"] as const)(
    "has a 3:1 solid focus boundary on the %s surface",
    (mode) => {
      const colors = resolveTokens({ mode }).colors;
      expect(
        contrast(colors["text-color"], colors["surface-color"]),
      ).toBeGreaterThanOrEqual(3);
    },
  );
});

describe("read-only field presentation", () => {
  it.each([
    "Input/input.module.scss",
    "Textarea/textarea.module.scss",
    "NumberInput/numberInput.module.scss",
  ])("uses a consistent readable surface for %s", (path) => {
    const rules = component(path).filter(
      (rule) =>
        rule.selector.includes("[readonly]") ||
        rule.selector.includes("[data-readonly]"),
    );
    expect(
      rules.some(
        (rule) =>
          rule.property === "background-color" &&
          rule.value === "var(--readonly-surface-color)",
      ),
    ).toBe(true);
    expect(rules.some((rule) => rule.property === "opacity")).toBe(false);
  });
  it.each(["light", "dark"] as const)(
    "keeps read-only content readable in %s",
    (mode) => {
      const colors = resolveTokens({ mode }).colors;
      expect(colors["readonly-surface-color"]).toBeDefined();
      expect(colors["readonly-surface-color"]).not.toBe(
        colors["surface-color"],
      );
      expect(
        contrast(colors["text-color"], colors["readonly-surface-color"]),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );
  it("removes the date-picker opening affordance from read-only fields", () => {
    expect(
      component("DatePicker/datePicker.module.scss").some(
        (rule) =>
          rule.selector.includes("[readonly]") &&
          rule.selector.includes(".calendarIcon") &&
          rule.property === "display" &&
          rule.value === "none",
      ),
    ).toBe(true);
  });
});

it("keeps the textarea hover boundary strong enough to identify the control", () => {
  const hover = component("Textarea/textarea.module.scss").find(
    (rule) =>
      rule.selector.startsWith(".textarea:hover") &&
      rule.property === "border-color",
  );
  expect(hover?.value).toBe("var(--primary-color)");
});
