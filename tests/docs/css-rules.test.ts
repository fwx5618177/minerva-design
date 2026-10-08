// Library-wide stylesheet rule: no single-side borders.
//
// Accents and indicators are full shapes (background fill, full ring,
// rounded pill, dot), never a stripe on one edge: no `border-left` accent
// bar on a highlighted item, no `border-bottom` tab underline, no alert or
// blockquote stripe, and no one-sided box-shadow line (`inset 2px 0 0`,
// `inset 0 -1px 0`, `0 1px 0`). Separators between rows / sections are
// separator elements (a full `height: 1px` background) or full borders.
//
// The check runs on the compiled CSS of every component stylesheet (React
// and web components share the lib-core SCSS; the inline Lit `css`
// templates are read too) and of the design tokens. The few exceptions are
// listed below, each with its justification.
import { describe, expect, it } from "vitest";
import {
  libraryDeclarations,
  libraryStylesheets,
  splitTopLevel,
  tokens,
  type Declaration,
} from "./css";

interface AllowEntry {
  file: string;
  /** Matches the innermost selector of the declaration */
  selector: RegExp;
  property: RegExp;
  reason: string;
}

/**
 * Documented exceptions. Keep it short: every entry needs a reason why a
 * full-shape treatment would harm the component.
 */
const DIVIDER = "packages/lib-core/src/components/Divider/divider.module.scss";
const TABLE = "packages/lib-core/src/components/Table/table.module.scss";
const TOOLTIP = "packages/lib-core/src/components/Tooltip/tooltip.module.scss";

export const ONE_SIDED_BORDER_ALLOWLIST: AllowEntry[] = [
  {
    file: DIVIDER,
    selector: /^\.divider\.(horizontal|vertical)$/,
    property: /^border-(top|inline-start)-width$/,
    reason:
      "Divider is the separator element itself (role=separator, no content box to fill): its line is its only edge, the dashed / dotted variants need border-style, and forced colors keep borders (a background line would vanish).",
  },
  {
    file: DIVIDER,
    selector: /^\.divider\.withText::before, \.divider\.withText::after$/,
    property: /^border-top$/,
    reason:
      "The two line segments around a labelled Divider are separator shapes of the separator element (same dashed / dotted / forced-colors needs as the plain divider).",
  },
  {
    file: TABLE,
    selector: /^\.table (thead th|tbody tr)$/,
    property: /^border-bottom$/,
    reason:
      "Table row grid lines: rows cannot host positioned separator pseudo-elements reliably (sticky / fixed cells, border-collapse), and a full border per row would double every line.",
  },
  {
    file: TABLE,
    selector:
      /^\.wrapperBordered \.table th \+ th, \.wrapperBordered \.table td \+ td$/,
    property: /^border-inline-start$/,
    reason:
      "Column grid lines of the bordered table (the wrapper draws the full outer border): one line between adjacent cells, no doubled borders.",
  },
  {
    file: TABLE,
    selector: /^\.table (th|td)\[data-fixed-edge=(left|right)\]/,
    property: /^border-(left|right)$/,
    reason:
      "Forced colors only: the soft edge shadow of a sticky column is dropped by the system, so a CanvasText grid line marks where the scrolled cells pass under the fixed column.",
  },
  {
    file: TOOLTIP,
    selector:
      /^\.tooltip\.arrow\[data-placement\^=(top|bottom|left|right)\] \.tooltipArrow$/,
    property: /^border-(top|right|bottom|left)$/,
    reason:
      "The arrow is a rotated square half-hidden in the bubble: its two outer edges continue the bubble's outline around the tip, so bubble + arrow read as one fully outlined shape.",
  },
];

const SIDES =
  "(?:top|right|bottom|left|inline-start|inline-end|block-start|block-end|inline|block)";
const SIDE_SHORTHAND = new RegExp(`^border-${SIDES}$`);
const SIDE_WIDTH = new RegExp(`^border-${SIDES}-width$`);
const ZERO = /^(?:0|0(?:\.0+)?[a-z%]*|none|hidden)$/;
const GLOBAL = /^(?:initial|inherit|unset|revert|revert-layer)$/;

/** Whether a one-sided border declaration draws a line */
function drawsBorder({ property, value }: Declaration): boolean {
  const parts = tokens(value.toLowerCase());
  if (parts.length === 1 && (ZERO.test(parts[0]) || GLOBAL.test(parts[0])))
    return false;
  if (SIDE_WIDTH.test(property)) return true;
  // shorthand: no line if the style is none / hidden or the width is 0
  return !parts.some((part) => ZERO.test(part));
}

const isZeroLength = (token: string) => /^-?0(?:\.0+)?[a-z%]*$/.test(token);
const isLength = (token: string) =>
  /^-?(?:\d|\.\d)/.test(token) || /^(?:var|calc|min|max|clamp)\(/.test(token);

/** Whether a box-shadow value contains a one-sided hard line */
function oneSidedShadow(value: string): string | null {
  for (const layer of splitTopLevel(value)) {
    const parts = tokens(layer);
    const inset = parts.includes("inset");
    const lengths = parts.filter((p) => p !== "inset" && isLength(p));
    if (lengths.length < 2) continue;
    const [x, y, blur = "0"] = lengths;
    const offset = !isZeroLength(x) || !isZeroLength(y);
    if (!offset) continue;
    // an inset shadow with an offset paints one side; an outer one only
    // when it is a hard line (no blur): a soft offset shadow is elevation
    if (inset || isZeroLength(blur)) return layer;
  }
  return null;
}

/** Every one-sided border declaration of the compiled library CSS */
export function oneSidedBorders(decls: Declaration[]): Declaration[] {
  return decls.filter((decl) => {
    if (SIDE_SHORTHAND.test(decl.property) || SIDE_WIDTH.test(decl.property))
      return drawsBorder(decl);
    if (decl.property === "box-shadow" || decl.property.startsWith("--"))
      return oneSidedShadow(decl.value) !== null;
    return false;
  });
}

const allowed = (decl: Declaration) =>
  ONE_SIDED_BORDER_ALLOWLIST.find(
    (entry) =>
      entry.file === decl.file &&
      entry.selector.test(decl.selector) &&
      entry.property.test(decl.property),
  );

const format = (d: Declaration) =>
  `${d.file} | ${d.context.join(" > ")} | ${d.property}: ${d.value}`;

describe("no single-side borders", () => {
  const decls = libraryDeclarations();

  it("compiles every stylesheet", () => {
    const sheets = libraryStylesheets();
    expect(sheets.length).toBeGreaterThan(60);
    expect(decls.length).toBeGreaterThan(1000);
  });

  it("no component draws a one-sided border or shadow line", () => {
    const offenders = oneSidedBorders(decls).filter((d) => !allowed(d));
    expect(offenders.map(format)).toEqual([]);
  });

  it("every allowlist entry is documented and still needed", () => {
    const found = oneSidedBorders(decls);
    for (const entry of ONE_SIDED_BORDER_ALLOWLIST) {
      expect(entry.reason.length, entry.file).toBeGreaterThan(20);
      expect(
        found.some((d) => allowed(d) === entry),
        `stale allowlist entry ${entry.file} ${entry.selector}`,
      ).toBe(true);
    }
  });

  describe("the detector", () => {
    const decl = (property: string, value: string): Declaration => ({
      file: "x.scss",
      context: [".a"],
      selector: ".a",
      property,
      value,
    });
    it.each([
      ["border-left", "3px solid red"],
      ["border-bottom", "1px solid var(--border-color)"],
      ["border-inline-start", "solid"],
      ["border-block-end-width", "2px"],
      ["border-top", "var(--divider)"],
      ["box-shadow", "inset 2px 0 0 var(--primary-color)"],
      ["box-shadow", "inset 0 -1px 0 red"],
      ["box-shadow", "0 0 0 1px red, 0 1px 0 red"],
      ["--x-shadow", "inset 0 1px 0 white"],
    ])("flags %s: %s", (property, value) => {
      expect(oneSidedBorders([decl(property, value)])).toHaveLength(1);
    });
    it.each([
      ["border-left", "0"],
      ["border-right", "none"],
      ["border-bottom", "1px none red"],
      ["border-top-width", "0"],
      ["border-inline-start", "initial"],
      ["border", "1px solid red"],
      ["border-top-color", "currentColor"],
      ["box-shadow", "inset 0 0 0 1px red"],
      ["box-shadow", "0 4px 12px var(--shadow-color)"],
      ["box-shadow", "0 0 0 3px var(--focus-ring-color)"],
    ])("allows %s: %s", (property, value) => {
      expect(oneSidedBorders([decl(property, value)])).toHaveLength(0);
    });
  });
});
