import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaCheckbox } from "./checkbox";
import "../../elements/checkbox";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const box = (el: MinervaCheckbox) => $<HTMLInputElement>(el, "input");

describe("<minerva-checkbox>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-checkbox")).toBe(MinervaCheckbox);
  });

  it("renders lib-core's structure and classes", async () => {
    const el = await mount<MinervaCheckbox>(
      `<minerva-checkbox size="large" shape="circle" color="success" label-placement="start">Terms</minerva-checkbox>`,
    );
    const label = $(el, "label.checkbox");
    expect(label.classList).toContain("large");
    expect(label.classList).toContain("circle");
    expect(label.classList).toContain("colorSuccess");
    expect(label.classList).toContain("labelStart");
    expect(box(el).type).toBe("checkbox");
    expect(box(el).classList).toContain("input");
    expect($(el, ".checkmark")).toBeTruthy();
    expect($(el, ".label").querySelector("slot")).not.toBeNull();
  });

  it("uses the label attribute and defaults", async () => {
    const el = await mount<MinervaCheckbox>(
      `<minerva-checkbox label="Accept"></minerva-checkbox>`,
    );
    expect($(el, ".label").textContent).toBe("Accept");
    expect(el.checked).toBe(false);
    expect(el.value).toBe("on");
    expect(el.shape).toBe("square");
    expect(el.color).toBe("primary");
  });

  it("toggles with Space (not Enter) and fires events", async () => {
    const el = await mount<MinervaCheckbox>(
      `<minerva-checkbox label="Terms"></minerva-checkbox>`,
    );
    const onChange = vi.fn();
    const onNative = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("change", onNative);
    box(el).focus();
    await userEvent.keyboard("{Enter}");
    expect(el.checked).toBe(false);
    await userEvent.keyboard(" ");
    expect(el.checked).toBe(true);
    await userEvent.keyboard(" ");
    expect(el.checked).toBe(false);
    expect(onChange.mock.calls.map(([e]) => e.detail.checked)).toEqual([
      true,
      false,
    ]);
    expect(onNative).toHaveBeenCalledTimes(2);
  });

  it("keeps aria-checked=mixed while indeterminate, also after a toggle", async () => {
    const el = await mount<MinervaCheckbox>(
      `<minerva-checkbox label="All" indeterminate></minerva-checkbox>`,
    );
    expect(box(el).indeterminate).toBe(true);
    expect(box(el)).toHaveAttribute("aria-checked", "mixed");
    await userEvent.click(box(el));
    await el.updateComplete;
    expect(el.checked).toBe(true);
    expect(box(el).indeterminate).toBe(true);
    expect(box(el)).toHaveAttribute("aria-checked", "mixed");
    el.indeterminate = false;
    await el.updateComplete;
    expect(box(el)).not.toHaveAttribute("aria-checked");
  });

  it("does not toggle when read-only or disabled", async () => {
    const el = await mount<MinervaCheckbox>(
      `<minerva-checkbox label="Locked" readonly></minerva-checkbox>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await userEvent.click(box(el));
    expect(el.checked).toBe(false);
    expect(box(el)).toHaveAttribute("aria-readonly", "true");
    el.readOnly = false;
    el.disabled = true;
    await el.updateComplete;
    expect(box(el).disabled).toBe(true);
    await userEvent.click(box(el));
    expect(el.checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders the helper text as the description, with the error state", async () => {
    const el = await mount<MinervaCheckbox>(
      `<minerva-checkbox label="Terms" helper-text="Required" error></minerva-checkbox>`,
    );
    expect($(el, ".helperText").textContent).toBe("Required");
    expect($(el, ".helperText").classList).toContain("errorText");
    expect($(el, ".errorIcon")).toBeTruthy();
    expect(box(el)).toHaveAttribute("aria-description", "Required");
    expect(box(el)).toHaveAttribute("aria-invalid", "true");
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaCheckbox>(
      `<label for="c">Newsletter</label><minerva-checkbox id="c"></minerva-checkbox>`,
      "minerva-checkbox",
    );
    expect(box(el)).toHaveAttribute("aria-label", "Newsletter");
  });

  it("participates in forms: value when checked, checkMissing, reset", async () => {
    document.body.innerHTML = `<form>
      <minerva-checkbox name="terms" required label="Terms"></minerva-checkbox>
      <minerva-checkbox name="news" value="yes" checked label="News"></minerva-checkbox>
    </form>`;
    await settle();
    const form = document.querySelector("form")!;
    const [terms, news] = Array.from(
      form.querySelectorAll<MinervaCheckbox>("minerva-checkbox"),
    );
    let data = new FormData(form);
    expect(data.get("terms")).toBeNull();
    expect(data.get("news")).toBe("yes");
    expect(terms.checkValidity()).toBe(false);
    expect(terms.validity?.valueMissing).toBe(true);
    expect(terms.validationMessage).toBe(
      "Please check this box if you want to proceed.",
    );
    expect(form.checkValidity()).toBe(false);

    await userEvent.click(box(terms));
    await userEvent.click(box(news));
    await settle();
    data = new FormData(form);
    expect(data.get("terms")).toBe("on");
    expect(data.get("news")).toBeNull();
    expect(form.checkValidity()).toBe(true);

    form.reset();
    await settle();
    expect(terms.checked).toBe(false);
    expect(news.checked).toBe(true);
    expect(box(news).checked).toBe(true);
  });

  it("is not submitted when disabled (also by a fieldset) and restores state", async () => {
    document.body.innerHTML = `<form><fieldset><minerva-checkbox name="a" checked label="A"></minerva-checkbox></fieldset></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaCheckbox>("minerva-checkbox")!;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(box(el).disabled).toBe(true);
    expect(new FormData(form).get("a")).toBeNull();
    el.formDisabledCallback(false);
    el.formStateRestoreCallback(null);
    await el.updateComplete;
    expect(el.checked).toBe(false);
  });

  it("localizes the validation message", async () => {
    const el = await mount<MinervaCheckbox>(
      `<div lang="fr"><minerva-checkbox required label="x"></minerva-checkbox></div>`,
      "minerva-checkbox",
    );
    el.requestUpdate();
    await el.updateComplete;
    expect(el.validationMessage).not.toBe(
      "Please check this box if you want to proceed.",
    );
    expect(el.validationMessage).not.toBe("");
  });

  it("warns in development without a label", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-checkbox></minerva-checkbox>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no label"));
  });
});
