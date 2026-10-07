import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaKeyValueEditor } from "./key-value-editor";
import "../../elements/key-value-editor";
import type { MinervaTextarea } from "../textarea/textarea";
import type { MinervaFormControl } from "../form-control/form-control";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const rows = (el: MinervaKeyValueEditor) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(".row"));
const fields = (el: MinervaKeyValueEditor) =>
  Array.from(
    el.shadowRoot!.querySelectorAll<MinervaTextarea>("minerva-textarea"),
  );
const inner = (textarea: MinervaTextarea) =>
  $<HTMLTextAreaElement>(textarea, "textarea");
const addButton = (el: MinervaKeyValueEditor) =>
  $<HTMLElement>(el, "minerva-button");
/** Element focused inside the shadow roots */
const deepActive = () => {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
};

describe("<minerva-key-value-editor>", () => {
  it("registers itself and the elements it renders", () => {
    expect(customElements.get("minerva-key-value-editor")).toBe(
      MinervaKeyValueEditor,
    );
    expect(customElements.get("minerva-textarea")).toBeTruthy();
    expect(customElements.get("minerva-form-control")).toBeTruthy();
    expect(customElements.get("minerva-button")).toBeTruthy();
  });

  it("renders rows from the value attribute (array or object JSON)", async () => {
    const el = await mount<MinervaKeyValueEditor>(
      `<minerva-key-value-editor value='{"a":"1","b":"2"}'></minerva-key-value-editor>`,
    );
    expect(el.value.map(({ key, value }) => [key, value])).toEqual([
      ["a", "1"],
      ["b", "2"],
    ]);
    expect(el.value.every((entry) => entry.id)).toBe(true);
    expect(rows(el)).toHaveLength(2);
    const [key, value] = fields(el);
    expect(key.classList).toContain("key");
    expect(key.size).toBe("small");
    expect(inner(key).value).toBe("a");
    expect(inner(value).value).toBe("1");
    expect(inner(key)).toHaveAttribute("aria-label", "Key 1");
    expect(inner(value)).toHaveAttribute("aria-label", "Value 1");
    const remove = $(el, "[part=remove-button]");
    expect(remove.classList).toContain("remove");
    expect(remove.getAttribute("aria-label")).toBe("Remove entry 1");
    expect(addButton(el).textContent).toContain("Add entry");
  });

  it("typing updates the entry and fires minerva-input (not the inner events)", async () => {
    const el = await mount<MinervaKeyValueEditor>(
      `<minerva-key-value-editor value='[{"id":"r1","key":"k","value":""}]'></minerva-key-value-editor>`,
    );
    const onInput = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("minerva-input", onInput);
    el.addEventListener("minerva-change", onChange);
    await userEvent.type(inner(fields(el)[1]), "v");
    expect(el.value).toEqual([{ id: "r1", key: "k", value: "v" }]);
    expect(onInput).toHaveBeenCalledTimes(1);
    expect(onInput.mock.calls[0][0].detail.value[0].value).toBe("v");
    inner(fields(el)[1]).dispatchEvent(new Event("change"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(el);
  });

  it("add focuses the new key field; remove focuses the next remove button, else add", async () => {
    const el = await mount<MinervaKeyValueEditor>(
      `<minerva-key-value-editor></minerva-key-value-editor>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await userEvent.click(addButton(el));
    await settle();
    expect(el.value).toHaveLength(1);
    expect(deepActive()).toBe(inner(fields(el)[0]));
    await userEvent.click(addButton(el));
    await settle();
    expect(el.value).toHaveLength(2);
    expect(onChange).toHaveBeenCalledTimes(2);

    const firstRemove =
      rows(el)[0].querySelector<HTMLButtonElement>(".remove")!;
    firstRemove.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(el.value).toHaveLength(1);
    const remaining = rows(el)[0].querySelector(".remove");
    expect(deepActive()).toBe(remaining);
    expect(remaining!.getAttribute("aria-label")).toBe("Remove entry 1");
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(el.value).toHaveLength(0);
    expect(
      deepActive()?.closest("minerva-button") ?? deepActive(),
    ).toBeTruthy();
    expect(el.shadowRoot!.activeElement).toBe(addButton(el));
  });

  it("shows field errors through the nested form controls", async () => {
    const el = await mount<MinervaKeyValueEditor>(
      `<minerva-key-value-editor value='[{"id":"r1","key":"","value":"x"}]'></minerva-key-value-editor>`,
    );
    el.errors = { r1: { key: "Key required" } };
    await settle();
    const control = el.shadowRoot!.querySelector<MinervaFormControl>(
      "minerva-form-control",
    )!;
    expect(control.invalid).toBe(true);
    expect($(control, ".error").textContent?.trim()).toBe("Key required");
    expect(inner(fields(el)[0])).toHaveAttribute("aria-invalid", "true");
  });

  it("disabled disables every field and button", async () => {
    const el = await mount<MinervaKeyValueEditor>(
      `<minerva-key-value-editor disabled value='{"a":"1"}'></minerva-key-value-editor>`,
    );
    await settle();
    expect(inner(fields(el)[0]).disabled).toBe(true);
    expect($<HTMLButtonElement>(el, ".remove").disabled).toBe(true);
    expect(addButton(el)).toHaveAttribute("disabled");
  });

  it("participates in forms: JSON value, required, reset, disabled", async () => {
    document.body.innerHTML = `<form><minerva-key-value-editor name="headers" required value='[{"key":"a","value":"1"}]'></minerva-key-value-editor></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaKeyValueEditor>(
      "minerva-key-value-editor",
    )!;
    expect(new FormData(form).get("headers")).toBe('[{"key":"a","value":"1"}]');
    expect(el.checkValidity()).toBe(true);

    await userEvent.click($(el, ".remove"));
    await settle();
    expect(new FormData(form).get("headers")).toBe("[]");
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).toBe("Please fill out this field.");
    expect(form.checkValidity()).toBe(false);

    form.reset();
    await settle();
    expect(el.value.map((entry) => entry.key)).toEqual(["a"]);
    expect(el.checkValidity()).toBe(true);

    el.disabled = true;
    await settle();
    expect(new FormData(form).get("headers")).toBeNull();
    el.formStateRestoreCallback('[{"key":"z","value":"9"}]');
    await settle();
    expect(el.value[0]).toMatchObject({ key: "z", value: "9" });
  });

  it("is named by <label for> (role=group) and localizes its texts", async () => {
    document.documentElement.lang = "fr";
    const el = await mount<MinervaKeyValueEditor>(
      `<label for="kv">Headers</label><minerva-key-value-editor id="kv"></minerva-key-value-editor>`,
      "minerva-key-value-editor",
    );
    const root = $(el, ".root");
    expect(root).toHaveAttribute("role", "group");
    expect(root).toHaveAttribute("aria-label", "Headers");
    expect(addButton(el).textContent).not.toContain("Add entry");
  });

  it("warns in development about duplicate ids", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaKeyValueEditor>(
      `<minerva-key-value-editor></minerva-key-value-editor>`,
    );
    el.value = [
      { id: "x", key: "a", value: "" },
      { id: "x", key: "b", value: "" },
    ];
    await el.updateComplete;
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("duplicate ids"));
  });
});
