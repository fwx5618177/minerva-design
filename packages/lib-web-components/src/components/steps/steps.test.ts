import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaSteps, type StepsItem } from "./steps";
import "../../elements/steps";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const ITEMS: StepsItem[] = [
  { value: "cart", label: "Cart" },
  { value: "shipping", label: "Shipping" },
  { value: "payment", label: "Payment" },
  { value: "done", label: "Done", disabled: true },
];

async function setup(
  markup = `<minerva-steps value="shipping"></minerva-steps>`,
) {
  const el = await mount<MinervaSteps>(markup, "minerva-steps");
  el.items = ITEMS;
  await el.updateComplete;
  return el;
}

const steps = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLLIElement>("li"));

describe("<minerva-steps>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-steps")).toBe(MinervaSteps);
  });

  it("renders a labelled ordered list with complete / current steps", async () => {
    const el = await setup();
    const ol = $(el, "ol");
    expect(ol.classList).toContain("steps");
    expect(ol).toHaveAttribute("aria-label", "Steps");
    const [cart, shipping, payment] = steps(el);
    expect(cart.classList).toContain("complete");
    expect(shipping.classList).toContain("current");
    expect(payment.classList).not.toContain("complete");
    expect(shipping.querySelector(".number")!.textContent).toBe("2");
    expect(shipping.querySelector(".number")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("is read-only by default: no tab stops, aria-current on the li", async () => {
    const el = await setup();
    expect(el.shadowRoot!.querySelector("button")).toBeNull();
    expect(steps(el)[1]).toHaveAttribute("aria-current", "step");
    expect($(el, ".button").classList).toContain("static");
  });

  it("activates a step with Space when navigable and marks it current", async () => {
    const el = await setup(
      `<minerva-steps value="cart" navigable></minerva-steps>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    const buttons = Array.from(el.shadowRoot!.querySelectorAll("button"));
    expect(buttons[0]).toHaveAttribute("aria-current", "step");
    expect(steps(el)[0]).not.toHaveAttribute("aria-current");
    expect(buttons[3].disabled).toBe(true);
    buttons[2].focus();
    await userEvent.keyboard(" ");
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "payment" });
    expect(el.value).toBe("payment");
    await el.updateComplete;
    expect(buttons[2]).toHaveAttribute("aria-current", "step");
    expect(el.getAttribute("value")).toBe("payment");
    // the current step does not fire again
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("keeps the current step when minerva-change is canceled", async () => {
    const el = await setup(
      `<minerva-steps value="cart" navigable></minerva-steps>`,
    );
    el.addEventListener("minerva-change", (e) => e.preventDefault());
    await userEvent.click(el.shadowRoot!.querySelectorAll("button")[1]);
    expect(el.value).toBe("cart");
  });

  it("uses aria-label and follows the locale", async () => {
    const el = await setup(
      `<minerva-steps aria-label="Checkout"></minerva-steps>`,
    );
    expect($(el, "ol")).toHaveAttribute("aria-label", "Checkout");
    const zh = await setup(
      `<minerva-config locale="zh"><minerva-steps></minerva-steps></minerva-config>`,
    );
    expect($(zh, "ol").getAttribute("aria-label")).not.toBe("Steps");
  });

  it("warns when the value matches no step", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await setup(`<minerva-steps value="nope"></minerva-steps>`);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("matches no step"),
    );
  });
});
