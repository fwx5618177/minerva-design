import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaSwitch } from "./switch";
import "../../elements/switch";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const input = (el: MinervaSwitch) => $<HTMLInputElement>(el, "input");
const buttons = (el: MinervaSwitch) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button"));

describe("<minerva-switch>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-switch")).toBe(MinervaSwitch);
  });

  it("renders lib-core's slider structure with role=switch", async () => {
    const el = await mount<MinervaSwitch>(
      `<minerva-switch size="large" color="success" shape="square">Wi-Fi</minerva-switch>`,
    );
    const root = $(el, "label.switch");
    expect(root.classList).toContain("large");
    expect(root.classList).toContain("success");
    expect(root.classList).toContain("square");
    expect(root.classList).toContain("labelEnd");
    expect($(el, ".switchBase .track")).toBeTruthy();
    expect($(el, ".thumb")).toBeTruthy();
    expect(input(el)).toHaveAttribute("role", "switch");
    expect(input(el)).toHaveAttribute("aria-checked", "false");
    expect(el.variant).toBe("slider");
  });

  it("toggles with Space and Enter, fires events and ripples", async () => {
    const el = await mount<MinervaSwitch>(
      `<minerva-switch label="Wi-Fi"></minerva-switch>`,
    );
    const onChange = vi.fn();
    const onNative = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("change", onNative);
    input(el).focus();
    await userEvent.keyboard(" ");
    await el.updateComplete;
    expect(el.checked).toBe(true);
    expect($(el, ".switch").classList).toContain("checked");
    expect($(el, ".switch").classList).toContain("ripple");
    expect(input(el)).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{Enter}");
    expect(el.checked).toBe(false);
    expect(onChange.mock.calls.map(([e]) => e.detail.checked)).toEqual([
      true,
      false,
    ]);
    expect(onNative).toHaveBeenCalledTimes(2);
  });

  it("does not toggle while loading, disabled or read-only", async () => {
    const el = await mount<MinervaSwitch>(
      `<minerva-switch label="x" loading></minerva-switch>`,
    );
    expect(input(el)).toHaveAttribute("aria-busy", "true");
    expect(input(el).disabled).toBe(true);
    el.loading = false;
    el.readOnly = true;
    await el.updateComplete;
    await userEvent.click(input(el));
    input(el).focus();
    await userEvent.keyboard("{Enter}");
    expect(el.checked).toBe(false);
  });

  it("bilateral: side labels set the state", async () => {
    const el = await mount<MinervaSwitch>(
      `<minerva-switch aria-label="Mode" off-label="Off" on-label="On"></minerva-switch>`,
    );
    const [off, on] = buttons(el);
    expect($(el, "span.switch").classList).toContain("bilateral");
    expect(off.classList).toContain("sideActive");
    await userEvent.click(on);
    await el.updateComplete;
    expect(el.checked).toBe(true);
    expect(on.classList).toContain("sideActive");
    expect(input(el)).toHaveAttribute("aria-label", "Mode");
  });

  it("segmented: two pressable segments, hidden input", async () => {
    const el = await mount<MinervaSwitch>(
      `<minerva-switch variant="segmented" aria-label="Billing" off-label="Monthly" on-label="Yearly"></minerva-switch>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    const group = $(el, "[role=group]");
    expect(group.classList).toContain("segmented");
    expect(group).toHaveAttribute("aria-label", "Billing");
    expect(input(el)).toHaveAttribute("tabindex", "-1");
    expect(input(el)).toHaveAttribute("aria-hidden", "true");
    const [monthly, yearly] = buttons(el);
    yearly.focus();
    await userEvent.keyboard("{Enter}");
    await el.updateComplete;
    expect(yearly).toHaveAttribute("aria-pressed", "true");
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: { checked: true, value: "on" } }),
    );
    monthly.focus();
    await userEvent.keyboard(" ");
    await userEvent.keyboard(" ");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(el.checked).toBe(false);
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaSwitch>(
      `<label for="s">Dark mode</label><minerva-switch id="s"></minerva-switch>`,
      "minerva-switch",
    );
    expect(input(el)).toHaveAttribute("aria-label", "Dark mode");
  });

  it("participates in forms: value when on, required, reset, disabled", async () => {
    document.body.innerHTML = `<form><minerva-switch name="wifi" value="yes" required label="Wi-Fi"></minerva-switch></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaSwitch>("minerva-switch")!;
    expect(new FormData(form).get("wifi")).toBeNull();
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).toBe(
      "Please check this box if you want to proceed.",
    );
    await userEvent.click(input(el));
    await el.updateComplete;
    expect(new FormData(form).get("wifi")).toBe("yes");
    expect(form.checkValidity()).toBe(true);

    form.reset();
    await el.updateComplete;
    expect(el.checked).toBe(false);

    el.checked = true;
    el.disabled = true;
    await el.updateComplete;
    expect(new FormData(form).get("wifi")).toBeNull();
    el.disabled = false;
    el.formDisabledCallback(true);
    await el.updateComplete;
    expect(input(el).disabled).toBe(true);
    expect(new FormData(form).get("wifi")).toBeNull();
    el.formDisabledCallback(false);
    el.formStateRestoreCallback(null);
    await el.updateComplete;
    expect(el.checked).toBe(false);
  });

  it("the checked attribute is the default state", async () => {
    const el = await mount<MinervaSwitch>(
      `<minerva-switch checked label="x"></minerva-switch>`,
    );
    expect(el.checked).toBe(true);
    expect(input(el).checked).toBe(true);
  });

  it("warns in development when segmented lacks labels", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaSwitch>(
      `<minerva-switch variant="segmented" label="x"></minerva-switch>`,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("segmented"));
    expect($(el, "label.switch")).toBeTruthy();
  });
});
