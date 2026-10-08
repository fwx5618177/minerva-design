// E2E: a plain-HTML sign-up form composed from Minerva form-associated
// elements, driven with user-event: validation blocks submission and
// reports localized messages, valid data reaches FormData, reset restores
// the defaults. (happy-dom workarounds: see tests/setup/setup.ts.)
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import "../../src/index";
import type { MinervaInput, MinervaSelect } from "../../src/index";
import { $, settle, wait } from "../utils";

const app = () => `
  <form id="signup" novalidate>
    <label for="name">Name</label>
    <minerva-input id="name" name="name" required minlength="2"></minerva-input>
    <label for="email">Email</label>
    <minerva-input id="email" name="email" type="email" required value="ada@example.com"></minerva-input>
    <label for="plan">Plan</label>
    <minerva-select id="plan" name="plan" required placeholder="Choose a plan">
      <minerva-option value="free">Free</minerva-option>
      <minerva-option value="pro">Pro</minerva-option>
      <minerva-option value="team" disabled>Team</minerva-option>
    </minerva-select>
    <minerva-button id="submit" type="submit">Create account</minerva-button>
    <minerva-button id="reset" type="reset" variant="ghost">Reset</minerva-button>
  </form>`;

const inner = (el: Element, selector = "button") =>
  $(el, selector) as HTMLElement;

describe("sign-up form (e2e)", () => {
  it("blocks submission while invalid, then submits FormData", async () => {
    document.body.innerHTML = app();
    await settle();
    const form = document.getElementById("signup") as HTMLFormElement;
    const name = document.getElementById("name") as MinervaInput;
    const plan = document.getElementById("plan") as MinervaSelect;
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    form.addEventListener("submit", onSubmit);

    // `novalidate` is not set on requestSubmit's path: minerva-button submits
    // through requestSubmit(), which validates first
    form.removeAttribute("novalidate");
    await userEvent.click(inner(document.getElementById("submit")!));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(name.validity?.valueMissing).toBe(true);
    expect(plan.validity?.valueMissing).toBe(true);
    expect(plan.validationMessage).toBe("Please select an item in the list.");

    await userEvent.type(inner(name, "input"), "A");
    await settle();
    expect(name.validity?.tooShort ?? !name.checkValidity()).toBe(true);
    await userEvent.type(inner(name, "input"), "da");
    await settle();
    expect(name.checkValidity()).toBe(true);

    // pick "Pro" with the keyboard: open, move, select
    inner(plan, "[part=root]").focus();
    await userEvent.keyboard("{ArrowDown}");
    await settle();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(plan.value).toBe("pro");

    await userEvent.click(inner(document.getElementById("submit")!));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const data = new FormData(form);
    expect(Object.fromEntries(data)).toEqual({
      name: "Ada",
      email: "ada@example.com",
      plan: "pro",
    });
  });

  it("reset restores the default values and clears validity", async () => {
    document.body.innerHTML = app();
    await settle();
    const email = document.getElementById("email") as MinervaInput;
    await userEvent.type(inner(email, "input"), "{Backspace>15/}");
    await settle();
    expect(email.value).toBe("");
    expect(email.checkValidity()).toBe(false);
    await userEvent.click(inner(document.getElementById("reset")!));
    await settle();
    expect(email.value).toBe("ada@example.com");
    expect(email.checkValidity()).toBe(true);
  });

  it("localizes built-in validation messages with the page language", async () => {
    document.documentElement.lang = "fr";
    document.body.innerHTML = app();
    await settle();
    const plan = document.getElementById("plan") as MinervaSelect;
    expect(plan.checkValidity()).toBe(false);
    expect(plan.validationMessage).toBe(
      "Veuillez sélectionner un élément de la liste.",
    );
  });

  it("a disabled fieldset excludes its controls from submission", async () => {
    document.body.innerHTML = `<form id="f"><fieldset id="fs">
      <minerva-input name="a" value="1"></minerva-input></fieldset></form>`;
    await settle();
    const form = document.getElementById("f") as HTMLFormElement;
    expect(new FormData(form).get("a")).toBe("1");
    const input = form.querySelector("minerva-input") as MinervaInput;
    document.getElementById("fs")!.setAttribute("disabled", "");
    // the ElementInternals polyfill does not observe fieldsets: the browser
    // calls formDisabledCallback itself
    input.formDisabledCallback(true);
    await settle();
    await wait();
    expect(new FormData(form).get("a")).toBeNull();
  });
});
