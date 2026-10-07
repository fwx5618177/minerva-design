import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaInput } from "./input";
import "../../elements/input";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const field = (el: MinervaInput) => $<HTMLInputElement>(el, "input");

describe("<minerva-input>", () => {
  it("renders lib-core's input structure and classes", async () => {
    const el = await mount<MinervaInput>(
      `<minerva-input variant="filled" size="large" placeholder="Name"></minerva-input>`,
    );
    const root = $(el, ".root");
    expect(root.classList).toContain("filled");
    expect(root.classList).toContain("large");
    expect(field(el).placeholder).toBe("Name");
    expect(field(el).classList).toContain("field");
  });

  it("the value attribute is the default value; typing updates value and fires events", async () => {
    const el = await mount<MinervaInput>(
      `<minerva-input value="ab"></minerva-input>`,
    );
    expect(el.value).toBe("ab");
    expect(field(el).value).toBe("ab");
    const onInput = vi.fn();
    const onMinervaInput = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("input", onInput);
    el.addEventListener("minerva-input", onMinervaInput);
    el.addEventListener("minerva-change", onChange);
    await userEvent.type(field(el), "c");
    expect(el.value).toBe("abc");
    expect(onInput).toHaveBeenCalled();
    expect(onMinervaInput.mock.calls.at(-1)![0].detail).toEqual({
      value: "abc",
    });
    field(el).dispatchEvent(new Event("change"));
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "abc" });
  });

  it("setting the value property updates the field", async () => {
    const el = await mount<MinervaInput>(`<minerva-input></minerva-input>`);
    el.value = "hello";
    await el.updateComplete;
    expect(field(el).value).toBe("hello");
  });

  it("is named by <label for> and aria-label", async () => {
    const el = await mount<MinervaInput>(
      `<label for="email">Email</label><minerva-input id="email"></minerva-input>`,
      "minerva-input",
    );
    expect(field(el)).toHaveAttribute("aria-label", "Email");
    el.setAttribute("aria-label", "Work email");
    await settle();
    expect(field(el)).toHaveAttribute("aria-label", "Work email");
  });

  it("participates in forms: FormData, required validation and reset", async () => {
    document.body.innerHTML = `<form><minerva-input name="email" value="a@b.c" required></minerva-input></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaInput>("minerva-input")!;
    expect(new FormData(form).get("email")).toBe("a@b.c");
    expect(el.checkValidity()).toBe(true);

    // happy-dom: user-event's clear() cannot verify focus inside a shadow
    // root, so delete the text with the keyboard instead
    await userEvent.type(field(el), "{Backspace>5/}");
    await el.updateComplete;
    expect(el.value).toBe("");
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).not.toBe("");
    expect(form.checkValidity()).toBe(false);

    form.reset();
    await el.updateComplete;
    expect(el.value).toBe("a@b.c");
    expect(field(el).value).toBe("a@b.c");
    expect(el.checkValidity()).toBe(true);
  });

  it("supports custom validity", async () => {
    const el = await mount<MinervaInput>(
      `<minerva-input value="x"></minerva-input>`,
    );
    el.setCustomValidity("Taken");
    expect(el.checkValidity()).toBe(false);
    expect(el.validationMessage).toBe("Taken");
    el.setCustomValidity("");
    expect(el.checkValidity()).toBe(true);
  });

  it("is disabled by a disabled fieldset and not submitted", async () => {
    document.body.innerHTML = `<form><fieldset disabled><minerva-input name="a" value="1"></minerva-input></fieldset></form>`;
    await settle();
    const el = document.querySelector<MinervaInput>("minerva-input")!;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(field(el).disabled).toBe(true);
    expect(new FormData(document.querySelector("form")!).get("a")).toBeNull();
  });

  it("clear button empties the field, fires events and keeps focus", async () => {
    const el = await mount<MinervaInput>(
      `<minerva-input clearable value="abc"></minerva-input>`,
    );
    const onClear = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("minerva-clear", onClear);
    el.addEventListener("minerva-change", onChange);
    const clear = $<HTMLButtonElement>(el, "[part=clear-button]");
    expect(clear).toHaveAttribute("aria-label", "Clear");
    await userEvent.click(clear);
    await el.updateComplete;
    expect(el.value).toBe("");
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "" });
    expect(el.shadowRoot!.activeElement).toBe(field(el));
    expect(el.shadowRoot!.querySelector("[part=clear-button]")).toBeNull();
  });

  it("toggles password visibility with a localized label", async () => {
    document.documentElement.lang = "fr";
    const el = await mount<MinervaInput>(
      `<minerva-input type="password" value="secret"></minerva-input>`,
    );
    const toggle = $<HTMLButtonElement>(el, "[part=password-toggle]");
    expect(field(el).type).toBe("password");
    expect(toggle.getAttribute("aria-label")).toBe("Afficher le mot de passe");
    await userEvent.click(toggle);
    expect(field(el).type).toBe("text");
  });

  it("re-renders its built-in texts when the language changes", async () => {
    const el = await mount<MinervaInput>(
      `<div lang="en"><minerva-input clearable value="x"></minerva-input></div>`,
      "minerva-input",
    );
    expect($(el, "[part=clear-button]").getAttribute("aria-label")).toBe(
      "Clear",
    );
    el.parentElement!.setAttribute("lang", "ja");
    await settle();
    expect($(el, "[part=clear-button]").getAttribute("aria-label")).not.toBe(
      "Clear",
    );
  });

  it("shows the character count linked with aria-describedby", async () => {
    const el = await mount<MinervaInput>(
      `<minerva-input show-char-count maxlength="10" value="abc"></minerva-input>`,
    );
    const count = $(el, "[part=count]");
    expect(count.textContent).toBe("3 / 10");
    expect(field(el).getAttribute("aria-describedby")).toBe(count.id);
  });

  it("sets aria-invalid and renders prefix / suffix slots", async () => {
    const el = await mount<MinervaInput>(
      `<minerva-input invalid><span slot="prefix">@</span></minerva-input>`,
    );
    expect(field(el)).toHaveAttribute("aria-invalid", "true");
    expect(el.shadowRoot!.querySelector("slot[name=prefix]")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("slot[name=suffix]")).toBeNull();
  });

  it("warns in development when minlength > maxlength", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-input minlength="5" maxlength="2"></minerva-input>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("minlength"));
  });
});
