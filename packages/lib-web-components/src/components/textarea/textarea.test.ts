import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaTextarea } from "./textarea";
import "../../elements/textarea";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const field = (el: MinervaTextarea) => $<HTMLTextAreaElement>(el, "textarea");

describe("<minerva-textarea>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-textarea")).toBe(MinervaTextarea);
  });

  it("renders lib-core's textarea classes with resizing disabled", async () => {
    const el = await mount<MinervaTextarea>(
      `<minerva-textarea variant="filled" size="large" rows="6" placeholder="Bio"></minerva-textarea>`,
    );
    const textarea = field(el);
    expect(textarea.classList).toContain("textarea");
    expect(textarea.classList).toContain("filled");
    expect(textarea.classList).toContain("large");
    expect(textarea.style.resize).toBe("none");
    expect(textarea.getAttribute("rows")).toBe("6");
    expect(textarea.placeholder).toBe("Bio");
  });

  it("reflects variant / size / invalid and defaults", async () => {
    const el = await mount<MinervaTextarea>(
      `<minerva-textarea></minerva-textarea>`,
    );
    expect(el.variant).toBe("outline");
    expect(el.size).toBe("medium");
    el.size = "small";
    el.invalid = true;
    await el.updateComplete;
    expect(el.getAttribute("size")).toBe("small");
    expect(el.hasAttribute("invalid")).toBe(true);
    expect(field(el).classList).toContain("invalid");
    expect(field(el)).toHaveAttribute("aria-invalid", "true");
  });

  it("types multi-line text (Enter is a newline) and fires events", async () => {
    const el = await mount<MinervaTextarea>(
      `<minerva-textarea aria-label="Bio"></minerva-textarea>`,
    );
    const onInput = vi.fn();
    const onChange = vi.fn();
    const onNativeChange = vi.fn();
    el.addEventListener("minerva-input", onInput);
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("change", onNativeChange);
    await userEvent.type(field(el), "a{Enter}b");
    expect(el.value).toBe("a\nb");
    expect(onInput.mock.calls.at(-1)![0].detail).toEqual({ value: "a\nb" });
    field(el).dispatchEvent(new Event("change"));
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "a\nb" });
    expect(onNativeChange).toHaveBeenCalledTimes(1);
    expect(field(el)).toHaveAttribute("aria-label", "Bio");
  });

  it("disabled prevents typing", async () => {
    const el = await mount<MinervaTextarea>(
      `<minerva-textarea disabled></minerva-textarea>`,
    );
    expect(field(el).disabled).toBe(true);
    await userEvent.type(field(el), "x");
    expect(el.value).toBe("");
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaTextarea>(
      `<label for="bio">Biography</label><minerva-textarea id="bio"></minerva-textarea>`,
      "minerva-textarea",
    );
    expect(field(el)).toHaveAttribute("aria-label", "Biography");
  });

  it("participates in forms: FormData, required validation and reset", async () => {
    document.body.innerHTML = `<form><minerva-textarea name="bio" value="hi" required></minerva-textarea></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaTextarea>("minerva-textarea")!;
    expect(new FormData(form).get("bio")).toBe("hi");
    expect(el.checkValidity()).toBe(true);

    await userEvent.type(field(el), "{Backspace>2/}");
    await el.updateComplete;
    expect(el.value).toBe("");
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).not.toBe("");
    expect(form.checkValidity()).toBe(false);

    form.reset();
    await el.updateComplete;
    expect(el.value).toBe("hi");
    expect(field(el).value).toBe("hi");
    expect(el.checkValidity()).toBe(true);
  });

  it("restores the form state and is not submitted when disabled", async () => {
    document.body.innerHTML = `<form><fieldset disabled><minerva-textarea name="a" value="1"></minerva-textarea></fieldset></form>`;
    await settle();
    const el = document.querySelector<MinervaTextarea>("minerva-textarea")!;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(field(el).disabled).toBe(true);
    expect(new FormData(document.querySelector("form")!).get("a")).toBeNull();
    el.formStateRestoreCallback("restored");
    await el.updateComplete;
    expect(field(el).value).toBe("restored");
  });

  it("warns in development when minlength > maxlength", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(
      `<minerva-textarea minlength="5" maxlength="2"></minerva-textarea>`,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("minlength"));
  });
});
