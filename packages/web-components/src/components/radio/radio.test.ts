import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaRadio, MinervaRadioGroup } from "./radio";
import "../../elements/radio";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const fruits = (
  attrs = "",
) => `<minerva-radio-group aria-label="Fruit" ${attrs}>
  <minerva-radio value="apple">Apple</minerva-radio>
  <minerva-radio value="banana" disabled>Banana</minerva-radio>
  <minerva-radio value="cherry">Cherry</minerva-radio>
</minerva-radio-group>`;

const radio = (value: string) =>
  document.querySelector<MinervaRadio>(`minerva-radio[value="${value}"]`)!;

describe("<minerva-radio-group> / <minerva-radio>", () => {
  it("registers both elements", () => {
    expect(customElements.get("minerva-radio")).toBe(MinervaRadio);
    expect(customElements.get("minerva-radio-group")).toBe(MinervaRadioGroup);
  });

  it("renders the React library's structure, roles and states", async () => {
    const group = await mount<MinervaRadioGroup>(
      fruits(
        'value="cherry" direction="horizontal" size="large" color="success" label="Fruit"',
      ),
    );
    const inner = $(group, "[role=radiogroup]");
    expect(inner.classList).toContain("radioGroup");
    expect(inner.classList).toContain("horizontal");
    expect(inner).toHaveAttribute("aria-labelledby", "label");
    expect($(group, ".groupLabel").textContent).toBe("Fruit");
    const cherry = radio("cherry");
    expect(cherry).toHaveAttribute("role", "radio");
    expect(cherry).toHaveAttribute("aria-checked", "true");
    expect(cherry.checked).toBe(true);
    expect(radio("apple")).toHaveAttribute("aria-checked", "false");
    expect(radio("banana")).toHaveAttribute("aria-disabled", "true");
    const wrapper = $(cherry, ".radioWrapper");
    expect(wrapper.classList).toContain("large");
    expect(wrapper.classList).toContain("success");
    expect($<HTMLInputElement>(cherry, "input.input").checked).toBe(true);
    expect($(cherry, ".label").querySelector("slot")).not.toBeNull();
  });

  it("is one tab stop: the checked radio", async () => {
    await mount(fruits('value="cherry"'));
    expect(radio("cherry")).toHaveAttribute("tabindex", "0");
    expect(radio("apple")).toHaveAttribute("tabindex", "-1");
    expect(radio("banana")).toHaveAttribute("tabindex", "-1");
  });

  it("the first enabled radio is the tab stop without a selection", async () => {
    await mount(fruits());
    expect(radio("apple")).toHaveAttribute("tabindex", "0");
    expect(radio("cherry")).toHaveAttribute("tabindex", "-1");
  });

  it("arrow keys move and select, skipping disabled radios and wrapping", async () => {
    const group = await mount<MinervaRadioGroup>(fruits('value="apple"'));
    const onChange = vi.fn();
    const onNative = vi.fn();
    group.addEventListener("minerva-change", onChange);
    group.addEventListener("change", onNative);
    radio("apple").focus();
    await userEvent.keyboard("{ArrowRight}");
    await settle();
    expect(document.activeElement).toBe(radio("cherry"));
    expect(radio("cherry").checked).toBe(true);
    expect(group.value).toBe("cherry");
    expect(onChange.mock.calls.at(-1)![0].detail).toEqual({ value: "cherry" });
    expect(onNative).toHaveBeenCalledTimes(1);

    await userEvent.keyboard("{ArrowDown}");
    await settle();
    expect(document.activeElement).toBe(radio("apple"));
    expect(group.value).toBe("apple");
    await userEvent.keyboard("{ArrowUp}");
    await settle();
    expect(group.value).toBe("cherry");
    await userEvent.keyboard("{ArrowLeft}");
    await settle();
    expect(group.value).toBe("apple");
    expect(radio("banana").checked).toBe(false);
    expect(radio("apple")).toHaveAttribute("tabindex", "0");
  });

  it("RTL: ArrowLeft moves forward", async () => {
    document.body.innerHTML = `<div dir="rtl">${fruits('value="apple"')}</div>`;
    await settle();
    const group = document.querySelector<MinervaRadioGroup>(
      "minerva-radio-group",
    )!;
    radio("apple").focus();
    await userEvent.keyboard("{ArrowLeft}");
    await settle();
    expect(group.value).toBe("cherry");
  });

  it("Space and clicks check a radio; disabled radios ignore them", async () => {
    const group = await mount<MinervaRadioGroup>(fruits());
    radio("cherry").focus();
    await userEvent.keyboard(" ");
    await settle();
    expect(group.value).toBe("cherry");
    await userEvent.click(radio("banana"));
    await settle();
    expect(group.value).toBe("cherry");
    await userEvent.click(radio("apple"));
    await settle();
    expect(group.value).toBe("apple");
  });

  it("a disabled group is not reachable nor selectable", async () => {
    const group = await mount<MinervaRadioGroup>(
      fruits('disabled value="apple"'),
    );
    for (const r of group.radios) expect(r).toHaveAttribute("tabindex", "-1");
    expect(radio("apple")).toHaveAttribute("aria-disabled", "true");
    expect($(group, "[role=radiogroup]")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await userEvent.click(radio("cherry"));
    await settle();
    expect(group.value).toBe("apple");
  });

  it("is named by <label for> and describes itself with the helper text", async () => {
    const group = await mount<MinervaRadioGroup>(
      `<label for="g">Plan</label>
      <minerva-radio-group id="g" helper-text="Pick one">
        <minerva-radio value="a">A</minerva-radio>
      </minerva-radio-group>`,
      "minerva-radio-group",
    );
    const inner = $(group, "[role=radiogroup]");
    expect(inner).toHaveAttribute("aria-label", "Plan");
    expect(inner).toHaveAttribute("aria-description", "Pick one");
    expect($(group, ".helperText").textContent?.trim()).toBe("Pick one");
  });

  it("radio helper / error text describe the radio", async () => {
    await mount(
      `<minerva-radio-group aria-label="x"><minerva-radio value="a" helper-text="Help" error error-message="Wrong">A</minerva-radio></minerva-radio-group>`,
    );
    const a = radio("a");
    expect(a).toHaveAttribute("aria-description", "Wrong");
    expect($(a, ".helperText").classList).toContain("errorText");
    expect($(a, ".errorIcon")).toBeTruthy();
    a.error = false;
    await a.updateComplete;
    expect(a).toHaveAttribute("aria-description", "Help");
  });

  it("a standalone radio checks itself on click", async () => {
    const r = await mount<MinervaRadio>(
      `<minerva-radio value="solo">Solo</minerva-radio>`,
    );
    const onChange = vi.fn();
    r.addEventListener("minerva-change", onChange);
    expect(r).toHaveAttribute("tabindex", "0");
    await userEvent.click(r);
    expect(r.checked).toBe(true);
    expect(onChange.mock.calls[0][0].detail).toEqual({
      checked: true,
      value: "solo",
    });
  });

  it("participates in forms: value, radioMissing, reset, disabled", async () => {
    document.body.innerHTML = `<form>${fruits('name="fruit" required')}</form>`;
    await settle();
    const form = document.querySelector("form")!;
    const group = form.querySelector<MinervaRadioGroup>("minerva-radio-group")!;
    expect(new FormData(form).get("fruit")).toBeNull();
    expect(group.checkValidity()).toBe(false);
    expect(group.validity?.valueMissing).toBe(true);
    expect(group.validationMessage).toBe("Please select one of these options.");
    expect($(group, "[role=radiogroup]")).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(form.checkValidity()).toBe(false);

    await userEvent.click(radio("cherry"));
    await settle();
    expect(new FormData(form).get("fruit")).toBe("cherry");
    expect(form.checkValidity()).toBe(true);

    form.reset();
    await settle();
    expect(group.value).toBe("");
    expect(radio("cherry").checked).toBe(false);

    group.value = "apple";
    group.disabled = true;
    await settle();
    expect(new FormData(form).get("fruit")).toBeNull();
    group.disabled = false;
    // let the polyfill's attribute observer run before simulating a fieldset
    await settle();
    group.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await settle();
    expect(new FormData(form).get("fruit")).toBeNull();
    expect(radio("apple")).toHaveAttribute("aria-disabled", "true");
    group.formDisabledCallback(false);
    group.formStateRestoreCallback("cherry");
    await settle();
    expect(radio("cherry").checked).toBe(true);
  });

  it("the value attribute is the default restored by reset", async () => {
    document.body.innerHTML = `<form>${fruits('name="f" value="apple"')}</form>`;
    await settle();
    const group = document.querySelector<MinervaRadioGroup>(
      "minerva-radio-group",
    )!;
    await userEvent.click(radio("cherry"));
    await settle();
    expect(group.value).toBe("cherry");
    document.querySelector("form")!.reset();
    await settle();
    expect(group.value).toBe("apple");
    expect(radio("apple")).toHaveAttribute("tabindex", "0");
  });

  it("localizes the validation message", async () => {
    document.body.innerHTML = `<div lang="fr">${fruits("required")}</div>`;
    await settle();
    const group = document.querySelector<MinervaRadioGroup>(
      "minerva-radio-group",
    )!;
    group.requestUpdate();
    await group.updateComplete;
    expect(group.validationMessage).not.toBe("");
    expect(group.validationMessage).not.toBe(
      "Please select one of these options.",
    );
  });

  it("warns in development when value matches no radio", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(fruits('value="kiwi"'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("kiwi"));
  });
});
