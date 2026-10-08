import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaJsonField } from "./json-field";
import "../../elements/json-field";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const field = (el: MinervaJsonField) => $<HTMLTextAreaElement>(el, "textarea");
const formatButton = (el: MinervaJsonField) =>
  $<HTMLButtonElement>(el, "[part=format-button]");
const status = (el: MinervaJsonField) => $(el, "[role=status]");

describe("<minerva-json-field>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-json-field")).toBe(MinervaJsonField);
  });

  it("renders lib-core's structure: toolbar, textarea, status", async () => {
    const el = await mount<MinervaJsonField>(
      `<minerva-json-field aria-label="Payload" value='{"a":1}'></minerva-json-field>`,
    );
    expect($(el, ".root .toolbar")).toBeTruthy();
    expect(formatButton(el).classList).toContain("iconButton");
    expect(formatButton(el).getAttribute("aria-label")).toBe("Format JSON");
    expect(field(el).classList).toContain("textarea");
    expect(field(el).getAttribute("rows")).toBe("8");
    expect(field(el).getAttribute("spellcheck")).toBe("false");
    expect(field(el)).toHaveAttribute("aria-label", "Payload");
    expect(status(el)).toHaveAttribute("aria-live", "polite");
    expect(status(el).textContent).toContain("Valid JSON");
  });

  it("formats with the button (Enter / Space) and fires events", async () => {
    const el = await mount<MinervaJsonField>(
      `<minerva-json-field value='{"a":1}'></minerva-json-field>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    formatButton(el).focus();
    await userEvent.keyboard("{Enter}");
    await el.updateComplete;
    expect(el.value).toBe('{\n  "a": 1\n}');
    expect(field(el).value).toBe('{\n  "a": 1\n}');
    expect(onChange.mock.calls[0][0].detail).toEqual({
      value: '{\n  "a": 1\n}',
    });
    await userEvent.keyboard(" ");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("indent 0 compacts, preserving lexemes", async () => {
    const el = await mount<MinervaJsonField>(
      `<minerva-json-field indent="0"></minerva-json-field>`,
    );
    el.value = '{ "n": 1.50,\n  "s": "\\u0041" }';
    await el.updateComplete;
    await userEvent.click(formatButton(el));
    expect(el.value).toBe('{"n":1.50,"s":"\\u0041"}');
  });

  it("withholds syntax feedback while focused and reports it on blur", async () => {
    const el = await mount<MinervaJsonField>(
      `<minerva-json-field aria-label="Payload" hide-toolbar></minerva-json-field>`,
    );
    expect(el.shadowRoot!.querySelector(".toolbar")).toBeNull();
    const onInput = vi.fn();
    el.addEventListener("minerva-input", onInput);
    field(el).focus();
    await userEvent.type(field(el), "{{");
    await el.updateComplete;
    expect(field(el)).not.toHaveAttribute("aria-invalid");
    expect(onInput.mock.calls.at(-1)![0].detail).toEqual({ value: "{" });
    field(el).blur();
    await el.updateComplete;
    expect(field(el)).toHaveAttribute("aria-invalid", "true");
    expect(status(el).classList).toContain("statusInvalid");
    expect(status(el).textContent).toContain("Invalid JSON:");
    expect(field(el).getAttribute("aria-description")).toContain(
      "Invalid JSON",
    );
  });

  it("disables the format button when empty, disabled or read-only", async () => {
    const el = await mount<MinervaJsonField>(
      `<minerva-json-field></minerva-json-field>`,
    );
    expect(formatButton(el).disabled).toBe(true);
    el.value = "{}";
    el.readOnly = true;
    await el.updateComplete;
    expect(formatButton(el).disabled).toBe(true);
    el.readOnly = false;
    el.disabled = true;
    await el.updateComplete;
    expect(formatButton(el).disabled).toBe(true);
    expect(field(el).disabled).toBe(true);
  });

  it("participates in forms: FormData, badInput, valueMissing, reset", async () => {
    document.body.innerHTML = `<form><minerva-json-field name="cfg" value='{"a":1}' required></minerva-json-field></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaJsonField>("minerva-json-field")!;
    expect(new FormData(form).get("cfg")).toBe('{"a":1}');
    expect(el.checkValidity()).toBe(true);

    await userEvent.type(field(el), "{Backspace}");
    await el.updateComplete;
    expect(el.validity?.badInput).toBe(true);
    expect(el.validationMessage).toMatch(/^Invalid JSON: /);
    expect(form.checkValidity()).toBe(false);

    el.value = "";
    await el.updateComplete;
    expect(el.validity?.valueMissing).toBe(true);

    form.reset();
    await el.updateComplete;
    expect(el.value).toBe('{"a":1}');
    expect(el.checkValidity()).toBe(true);

    el.disabled = true;
    await el.updateComplete;
    expect(new FormData(form).get("cfg")).toBeNull();
    el.formStateRestoreCallback("[1]");
    await el.updateComplete;
    expect(field(el).value).toBe("[1]");
  });

  it("is named by <label for> and localizes its texts", async () => {
    document.documentElement.lang = "fr";
    const el = await mount<MinervaJsonField>(
      `<label for="j">Config</label><minerva-json-field id="j" value="x"></minerva-json-field>`,
      "minerva-json-field",
    );
    expect(field(el)).toHaveAttribute("aria-label", "Config");
    expect(formatButton(el).getAttribute("aria-label")).not.toBe("Format JSON");
    expect(status(el).textContent).not.toContain("Invalid JSON");
  });

  it("warns in development about an out-of-range indent", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-json-field indent="20"></minerva-json-field>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("indent"));
  });
});
