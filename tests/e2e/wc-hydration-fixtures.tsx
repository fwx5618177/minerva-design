// Shared by the React 19 hydration tests of Minerva custom elements.
import { expect } from "vitest";
import type {} from "../../packages/lib-web-components/tests/e2e/jsx";

/**
 * Browsers carry host ARIA (`role`, `aria-selected`...) on ElementInternals,
 * without host attributes. happy-dom has no ElementInternals: a minimal one
 * with ARIA reflection stands in for the browsers' here.
 */
export function installInternals(): void {
  if ("attachInternals" in HTMLElement.prototype) return;
  Object.defineProperty(HTMLElement.prototype, "attachInternals", {
    configurable: true,
    value(this: HTMLElement) {
      return {
        role: null,
        ariaSelected: null,
        ariaChecked: null,
        ariaDisabled: null,
        ariaHidden: null,
        form: null,
        labels: [],
        validity: { valid: true },
        validationMessage: "",
        willValidate: false,
        states: new Set(),
        setFormValue() {},
        setValidity() {},
        checkValidity: () => true,
        reportValidity: () => true,
      };
    },
  });
}

/** Tabs, a radio group, a standalone radio and a select with a group */
export function CompositePage() {
  return (
    <main>
      <minerva-tabs value="b" label="Sections">
        <minerva-tab value="a">Overview</minerva-tab>
        <minerva-tab value="b">Details</minerva-tab>
        <minerva-tab value="c" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="a">Overview panel</minerva-tab-panel>
        <minerva-tab-panel value="b">Details panel</minerva-tab-panel>
        <minerva-tab-panel value="c">Archive panel</minerva-tab-panel>
      </minerva-tabs>
      <minerva-radio-group label="Plan" value="pro">
        <minerva-radio value="free">Free</minerva-radio>
        <minerva-radio value="pro">Pro</minerva-radio>
        <minerva-radio value="team" disabled>
          Team
        </minerva-radio>
      </minerva-radio-group>
      <minerva-radio value="solo" helper-text="On its own">
        Solo
      </minerva-radio>
      <minerva-select aria-label="Fruit" value="b">
        <minerva-option-group>
          <minerva-select-label>Fruits</minerva-select-label>
          <minerva-option value="a">Apple</minerva-option>
          <minerva-option value="b">Banana</minerva-option>
          <minerva-option value="c" disabled>
            Cherry
          </minerva-option>
        </minerva-option-group>
      </minerva-select>
    </main>
  );
}

export const nextFrames = () =>
  new Promise((resolve) => setTimeout(resolve, 50));

/** Waits for the Lit updates of every element (microtasks only) */
export async function litUpdates(root: ParentNode) {
  for (let i = 0; i < 3; i++) {
    await Promise.all(
      Array.from(
        root.querySelectorAll("*"),
        (el) => (el as { updateComplete?: Promise<unknown> }).updateComplete,
      ),
    );
  }
}

/** ElementInternals of an element (the stand-in above) */
const internals = (el: Element | null) => {
  const host = el as unknown as Record<string, Record<string, unknown>>;
  return host.internals ?? host.hostInternals;
};

/** Attributes of every element below `root` (sorted names) */
export const attributes = (root: ParentNode): string[] =>
  Array.from(root.querySelectorAll("*"), (el) =>
    el.getAttributeNames().sort().join(" "),
  );

/**
 * The reflected `selected` / `checked` state of the selected tab and radio
 * is the only host change of the upgrade: React's hydration ignores these
 * two attribute names.
 */
export const withoutReflectedState = (list: string[]): string[] =>
  list.map((names) => names.replace(/\b(selected|checked) /g, ""));

/** Once settled: the a11y attributes the items of CompositePage write */
export function expectSettledA11y(container: HTMLElement): void {
  const [overview, details, archive] = Array.from(
    container.querySelectorAll("minerva-tab"),
  );
  const panels = Array.from(container.querySelectorAll("minerva-tab-panel"));
  expect(details).toHaveAttribute("tabindex", "0");
  expect(overview).toHaveAttribute("tabindex", "-1");
  expect(archive).toHaveAttribute("tabindex", "-1");
  expect(details).toHaveAttribute("slot", "tab");
  expect(details).toHaveAttribute("data-state", "active");
  expect(overview).toHaveAttribute("data-state", "inactive");
  expect(archive).toHaveAttribute("data-disabled", "");
  expect(internals(details).ariaSelected).toBe("true");
  expect(internals(overview).ariaSelected).toBe("false");
  expect(details).toHaveAttribute("aria-controls", panels[1].id);
  expect(panels[1]).toHaveAttribute("aria-labelledby", details.id);
  expect(panels[1]).toHaveAttribute("tabindex", "0");
  expect(panels[1]).not.toHaveAttribute("hidden");
  expect(panels[0]).toHaveAttribute("hidden");
  expect(panels[0].shadowRoot!.querySelector(".panel")).not.toHaveAttribute(
    "hidden",
  );

  const [free, pro, team] = Array.from(
    container.querySelectorAll("minerva-radio-group minerva-radio"),
  );
  expect(pro).toHaveAttribute("tabindex", "0");
  expect(free).toHaveAttribute("tabindex", "-1");
  expect(team).toHaveAttribute("tabindex", "-1");
  expect(internals(pro).ariaChecked).toBe("true");
  const solo = container.querySelector(":scope main > minerva-radio")!;
  expect(solo).toHaveAttribute("tabindex", "0");
  expect(solo).toHaveAttribute("aria-description", "On its own");

  const options = Array.from(container.querySelectorAll("minerva-option"));
  expect(options[1]).toHaveAttribute("data-state", "checked");
  expect(options[2]).toHaveAttribute("data-disabled", "");
  expect(internals(options[1]).ariaSelected).toBe("true");
  const label = container.querySelector("minerva-select-label")!;
  expect(container.querySelector("minerva-option-group")).toHaveAttribute(
    "aria-labelledby",
    label.id,
  );
}
