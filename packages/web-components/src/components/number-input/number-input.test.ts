import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaNumberInput } from "./number-input";
import "../../elements/number-input";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const spin = (el: MinervaNumberInput) => $<HTMLInputElement>(el, "input");

async function setup(attrs = "") {
  const el = await mount<MinervaNumberInput>(
    `<minerva-number-input aria-label="Qty" ${attrs}></minerva-number-input>`,
  );
  const onChange = vi.fn();
  el.addEventListener("minerva-change", (e) =>
    onChange((e as CustomEvent).detail.value),
  );
  return { el, onChange };
}

describe("<minerva-number-input>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-number-input")).toBe(MinervaNumberInput);
  });

  it("renders a spinbutton with aria-valuemin/max/now and React classes", async () => {
    const { el } = await setup('value="5" min="0" max="10" size="large"');
    const input = spin(el);
    expect(input).toHaveAttribute("role", "spinbutton");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "10");
    expect(input).toHaveAttribute("aria-valuenow", "5");
    expect(input).toHaveAttribute("aria-label", "Qty");
    expect(input.classList).toContain("field");
    expect($(el, ".root").classList).toContain("large");
    expect(el.value).toBe(5);
  });

  it("omits aria-valuenow when empty and the bounds when unbounded", async () => {
    const { el } = await setup();
    expect(el.value).toBeNull();
    expect(spin(el)).not.toHaveAttribute("aria-valuenow");
    expect(spin(el)).not.toHaveAttribute("aria-valuemin");
  });

  it("formats with the precision inferred from step", async () => {
    const { el } = await setup('value="1" step="0.25"');
    expect(spin(el).value).toBe("1.00");
  });

  it("commits on blur / Enter only, keeping intermediate drafts", async () => {
    const { el, onChange } = await setup('step="0.1"');
    const onInput = vi.fn();
    el.addEventListener("minerva-input", onInput);
    await userEvent.type(spin(el), "1.");
    expect(spin(el).value).toBe("1.");
    expect(onChange).not.toHaveBeenCalled();
    expect(onInput.mock.calls.at(-1)![0].detail).toEqual({ value: 1 });
    await userEvent.type(spin(el), "5{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(1.5);
    expect(el.value).toBe(1.5);
  });

  it("clamps committed values and reverts non-numeric drafts", async () => {
    const { el, onChange } = await setup('min="0" max="10"');
    const onNative = vi.fn();
    el.addEventListener("change", onNative);
    await userEvent.type(spin(el), "50");
    await el.updateComplete;
    expect($(el, ".root").classList).toContain("invalid");
    expect($(el, ".root").getAttribute("title")).toBe("Maximum 10");
    spin(el).dispatchEvent(new FocusEvent("blur"));
    await el.updateComplete;
    expect(onChange).toHaveBeenLastCalledWith(10);
    expect(onNative).toHaveBeenCalledTimes(1);
    expect(spin(el).value).toBe("10");

    await userEvent.type(spin(el), "{Backspace>2/}abc");
    await el.updateComplete;
    expect($(el, ".root").getAttribute("title")).toBe("Enter a number");
    spin(el).dispatchEvent(new FocusEvent("blur"));
    await el.updateComplete;
    expect(spin(el).value).toBe("10");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("commits null when cleared, or min with no-empty", async () => {
    const a = await setup('value="3"');
    await userEvent.type(spin(a.el), "{Backspace}{Enter}");
    expect(a.onChange).toHaveBeenLastCalledWith(null);
    const b = await setup('value="3" min="2" no-empty');
    await userEvent.type(spin(b.el), "{Backspace}{Enter}");
    expect(b.onChange).toHaveBeenLastCalledWith(2);
  });

  it("steps with ArrowUp / ArrowDown within the bounds, without drift", async () => {
    const { el, onChange } = await setup('value="0.1" step="0.1" max="0.3"');
    spin(el).focus();
    await userEvent.keyboard("{ArrowUp}{ArrowUp}");
    expect(onChange).toHaveBeenLastCalledWith(0.3);
    await userEvent.keyboard("{ArrowUp}");
    expect(el.value).toBe(0.3);
    await userEvent.keyboard("{ArrowDown}");
    expect(onChange).toHaveBeenLastCalledWith(0.2);
    expect(spin(el).value).toBe("0.2");
  });

  it("steps by ten with PageUp / PageDown, clamped to the bounds", async () => {
    const { el, onChange } = await setup('value="5" min="0" max="30"');
    spin(el).focus();
    await userEvent.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(15);
    expect(spin(el).value).toBe("15");
    await userEvent.keyboard("{PageUp}{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(30);
    await userEvent.keyboard("{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(20);
    await userEvent.keyboard("{PageDown}{PageDown}{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(0);
    await el.updateComplete;
    expect(spin(el)).toHaveAttribute("aria-valuenow", "0");
  });

  it("uses the step size for PageUp", async () => {
    const { el, onChange } = await setup('value="1" step="0.5"');
    spin(el).focus();
    await userEvent.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(6);
    await el.updateComplete;
    expect(spin(el).value).toBe("6.0");
  });

  it("jumps to min / max with Home / End when bounded, not otherwise", async () => {
    const { el, onChange } = await setup('value="5" min="-2" max="9"');
    spin(el).focus();
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(9);
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(-2);
    await el.updateComplete;
    expect(spin(el).value).toBe("-2");

    const free = await setup('value="5"');
    spin(free.el).focus();
    await userEvent.keyboard("{Home}{End}");
    expect(free.onChange).not.toHaveBeenCalled();
  });

  it("ignores stepping when read-only or disabled", async () => {
    const { el, onChange } = await setup(
      'value="5" min="0" max="10" readonly show-stepper',
    );
    spin(el).focus();
    await userEvent.keyboard("{PageUp}{PageDown}{Home}{End}{ArrowUp}");
    expect(onChange).not.toHaveBeenCalled();
    expect($<HTMLButtonElement>(el, "[part=increment]").disabled).toBe(true);
    el.readOnly = false;
    el.disabled = true;
    await el.updateComplete;
    expect(spin(el).disabled).toBe(true);
  });

  it("renders a pointer-only stepper with localized labels", async () => {
    document.documentElement.lang = "fr";
    const { el, onChange } = await setup('value="9" max="10" show-stepper');
    const stepper = $(el, ".stepper");
    expect(stepper).toHaveAttribute("aria-hidden", "true");
    const up = $<HTMLButtonElement>(el, "[part=increment]");
    expect(up).toHaveAttribute("tabindex", "-1");
    expect(up.getAttribute("aria-label")).toBe("Augmenter");
    await userEvent.click(up);
    expect(onChange).toHaveBeenLastCalledWith(10);
    await el.updateComplete;
    expect(up.disabled).toBe(true);
    await userEvent.click($(el, "[part=decrement]"));
    expect(onChange).toHaveBeenLastCalledWith(9);
  });

  it("syncs the draft when the value property changes", async () => {
    const { el, onChange } = await setup();
    el.value = 42;
    await el.updateComplete;
    expect(spin(el).value).toBe("42");
    expect(onChange).not.toHaveBeenCalled();
    el.stepUp();
    await el.updateComplete;
    expect(el.value).toBe(43);
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaNumberInput>(
      `<label for="n">Quantity</label><minerva-number-input id="n"></minerva-number-input>`,
      "minerva-number-input",
    );
    expect(spin(el)).toHaveAttribute("aria-label", "Quantity");
  });

  it("participates in forms: FormData, validity, reset, disabled", async () => {
    document.body.innerHTML = `<form><minerva-number-input name="qty" value="2" min="1" max="5" step="0.5" required></minerva-number-input></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaNumberInput>("minerva-number-input")!;
    expect(new FormData(form).get("qty")).toBe("2.0");
    expect(el.checkValidity()).toBe(true);

    await userEvent.type(spin(el), "{Backspace>3/}9");
    await el.updateComplete;
    expect(el.validity?.rangeOverflow).toBe(true);
    expect(el.validationMessage).toBe("Value must be 5 or less.");
    await userEvent.type(spin(el), "{Backspace}0.");
    await el.updateComplete;
    expect(el.validity?.rangeUnderflow).toBe(true);
    expect(el.validationMessage).toBe("Value must be 1 or more.");
    await userEvent.type(spin(el), "{Backspace>2/}x");
    await el.updateComplete;
    expect(el.validity?.badInput).toBe(true);
    expect(el.validationMessage).toBe("Enter a number");

    await userEvent.type(spin(el), "{Backspace}{Enter}");
    await el.updateComplete;
    expect(el.value).toBeNull();
    expect(el.validity?.valueMissing).toBe(true);
    expect(new FormData(form).get("qty")).toBe("");
    expect(form.checkValidity()).toBe(false);

    form.reset();
    await el.updateComplete;
    expect(el.value).toBe(2);
    expect(spin(el).value).toBe("2.0");
    expect(el.checkValidity()).toBe(true);

    el.disabled = true;
    await el.updateComplete;
    expect(new FormData(form).get("qty")).toBeNull();
    el.formStateRestoreCallback("3.5");
    await el.updateComplete;
    expect(spin(el).value).toBe("3.5");
  });

  it("is not submitted inside a disabled fieldset", async () => {
    document.body.innerHTML = `<form><fieldset disabled><minerva-number-input name="n" value="1"></minerva-number-input></fieldset></form>`;
    await settle();
    const el = document.querySelector<MinervaNumberInput>(
      "minerva-number-input",
    )!;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(spin(el).disabled).toBe(true);
    expect(new FormData(document.querySelector("form")!).get("n")).toBeNull();
  });

  it("warns in development when min > max", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup('min="5" max="1"');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("min (5)"));
  });
});
