import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaFormControl } from "./form-control";
import "../../elements/form-control";
import "../../elements/textarea";
import "../../elements/checkbox";
import type { MinervaTextarea } from "../textarea/textarea";
import type { MinervaCheckbox } from "../checkbox/checkbox";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("<minerva-form-control>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-form-control")).toBe(MinervaFormControl);
  });

  it("renders lib-core's label / helper structure", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control label="Email" helper-text="We never share it" required>
        <input />
      </minerva-form-control>`,
    );
    expect($(el, ".root")).toBeTruthy();
    const label = $(el, "label.label");
    expect(label.textContent).toContain("Email");
    const indicator = $(el, ".required");
    expect(indicator.textContent).toBe("*");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    expect($(el, ".helper").textContent?.trim()).toBe("We never share it");
    expect(el.shadowRoot!.querySelector(".error")).toBeNull();
  });

  it("names and describes a native control and applies its state", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control label="Email" helper-text="Help" required readonly disabled>
        <input />
      </minerva-form-control>`,
    );
    const input = el.querySelector("input")!;
    expect(input).toHaveAttribute("aria-label", "Email");
    expect(input).toHaveAttribute("aria-description", "Help");
    expect(input.required).toBe(true);
    expect(input.readOnly).toBe(true);
    expect(input.disabled).toBe(true);
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("aria-readonly", "true");

    el.disabled = false;
    el.readonly = false;
    el.required = false;
    await settle();
    expect(input.disabled).toBe(false);
    expect(input.readOnly).toBe(false);
    expect(input.required).toBe(false);
    expect(input).not.toHaveAttribute("aria-required");
  });

  it("swaps the helper text for the error message while invalid", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control label="Email" helper-text="Help" error-message="Invalid email">
        <input />
      </minerva-form-control>`,
    );
    const input = el.querySelector("input")!;
    el.invalid = true;
    await settle();
    const error = $(el, ".error");
    expect(error).toHaveAttribute("role", "alert");
    expect(error.textContent?.trim()).toBe("Invalid email");
    expect(el.shadowRoot!.querySelector(".helper")).toBeNull();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-description", "Invalid email");
    el.invalid = false;
    await settle();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAttribute("aria-description", "Help");
  });

  it("wires a Minerva control through its properties (forwarded inside)", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control label="Bio" helper-text="Short" invalid required>
        <minerva-textarea></minerva-textarea>
      </minerva-form-control>`,
    );
    const textarea = el.querySelector<MinervaTextarea>("minerva-textarea")!;
    await settle();
    expect(textarea.invalid).toBe(true);
    expect(textarea.required).toBe(true);
    const inner = $<HTMLTextAreaElement>(textarea, "textarea");
    expect(inner).toHaveAttribute("aria-label", "Bio");
    expect(inner).toHaveAttribute("aria-invalid", "true");
    expect(inner.required).toBe(true);
  });

  it("uses `error` on controls without `invalid` (checkbox)", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control invalid><minerva-checkbox>Terms</minerva-checkbox></minerva-form-control>`,
    );
    const checkbox = el.querySelector<MinervaCheckbox>("minerva-checkbox")!;
    expect(checkbox.error).toBe(true);
  });

  it("keeps a control's own aria-label and restores everything when removed", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control label="Field" helper-text="Help" required>
        <input aria-label="Own" />
      </minerva-form-control>`,
    );
    const input = el.querySelector("input")!;
    expect(input).toHaveAttribute("aria-label", "Own");
    expect(input.required).toBe(true);
    input.remove();
    await settle();
    expect(input.required).toBe(false);
    expect(input).not.toHaveAttribute("aria-description");
    expect(input).toHaveAttribute("aria-label", "Own");
  });

  it("supports the label / helper-text / error-message slots", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control>
        <span slot="label">Rich <b>label</b></span>
        <input />
        <span slot="helper-text">Rich help</span>
      </minerva-form-control>`,
    );
    const input = el.querySelector("input")!;
    expect($(el, "label slot[name=label]")).toBeTruthy();
    expect(input).toHaveAttribute("aria-label", "Rich label");
    expect(input).toHaveAttribute("aria-description", "Rich help");
  });

  it("clicking the label focuses the control, or toggles a checkbox", async () => {
    const el = await mount<MinervaFormControl>(
      `<minerva-form-control label="Name"><input /></minerva-form-control>`,
    );
    await userEvent.click($(el, "label"));
    expect(document.activeElement).toBe(el.querySelector("input"));

    const field = await mount<MinervaFormControl>(
      `<minerva-form-control label="Accept"><minerva-checkbox></minerva-checkbox></minerva-form-control>`,
    );
    const checkbox = field.querySelector<MinervaCheckbox>("minerva-checkbox")!;
    await userEvent.click($(field, "label"));
    expect(checkbox.checked).toBe(true);
  });

  it("the wired control still works in a form", async () => {
    document.body.innerHTML = `<form><minerva-form-control label="Bio" required>
      <minerva-textarea name="bio"></minerva-textarea>
    </minerva-form-control></form>`;
    await settle();
    const form = document.querySelector("form")!;
    expect(form.checkValidity()).toBe(false);
    const textarea = form.querySelector<MinervaTextarea>("minerva-textarea")!;
    textarea.value = "hi";
    await settle();
    expect(new FormData(form).get("bio")).toBe("hi");
    expect(form.checkValidity()).toBe(true);
  });

  it("warns in development when several controls are slotted", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(
      `<minerva-form-control label="x"><input /><input /></minerva-form-control>`,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("ONE control"));
  });
});
