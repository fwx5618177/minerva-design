import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement } from "@minerva/core";
import { MinervaSelect } from "./select";
import { MinervaOption } from "./option";
import "../../elements/select";
import "../../elements/modal";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const LANGS = `
  <minerva-option value="zh">Chinese</minerva-option>
  <minerva-option value="en">English</minerva-option>
  <minerva-select-separator id="sep"></minerva-select-separator>
  <minerva-option-group id="group">
    <minerva-select-label>Experimental</minerva-select-label>
    <minerva-option value="ja" disabled>Japanese</minerva-option>
  </minerva-option-group>`;

const setup = (attrs = "") =>
  mount<MinervaSelect>(
    `<minerva-select aria-label="Language" placeholder="Pick one" ${attrs}>${LANGS}</minerva-select>`,
  );

const trigger = (el: MinervaSelect) =>
  $<HTMLButtonElement>(el, "[part=trigger]");
const listbox = (el: MinervaSelect) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=listbox]");
const option = (text: string) =>
  Array.from(document.querySelectorAll<HTMLElement>("[role=option]")).find(
    (o) => o.textContent?.trim() === text,
  )!;
const user = () => userEvent.setup({ pointerEventsCheck: 0 });
const focused = () => getActiveElement();

async function press(keys: string) {
  await userEvent.keyboard(keys);
  await settle();
}

describe("<minerva-select>", () => {
  it("is registered with its parts", () => {
    expect(customElements.get("minerva-select")).toBe(MinervaSelect);
    expect(customElements.get("minerva-option")).toBe(MinervaOption);
    expect(customElements.get("minerva-option-group")).toBeDefined();
    expect(customElements.get("minerva-select-label")).toBeDefined();
    expect(customElements.get("minerva-select-separator")).toBeDefined();
  });

  it("renders a combobox trigger with placeholder and lib-core classes", async () => {
    const el = await setup();
    const t = trigger(el);
    expect(t).toHaveAttribute("role", "combobox");
    expect(t).toHaveAttribute("type", "button");
    expect(t).toHaveAttribute("aria-haspopup", "listbox");
    expect(t).toHaveAttribute("aria-expanded", "false");
    expect(t).toHaveAttribute("aria-label", "Language");
    expect(t).toHaveAttribute("data-placeholder");
    expect(t).not.toHaveAttribute("aria-controls");
    expect(t.classList).toContain("trigger");
    expect(t.classList).toContain("medium");
    expect(t.textContent).toContain("Pick one");
    expect(listbox(el)).toBeNull();
  });

  it("reflects attributes and has sensible defaults", async () => {
    const el = await mount<MinervaSelect>(`<minerva-select></minerva-select>`);
    expect(el.size).toBe("medium");
    expect(el.open).toBe(false);
    expect(el.value).toBe("");
    el.size = "large";
    el.invalid = true;
    el.open = true;
    await settle();
    expect(el.getAttribute("size")).toBe("large");
    expect(el).toHaveAttribute("invalid");
    expect(el).toHaveAttribute("open");
    expect(trigger(el).classList).toContain("invalid");
    expect(trigger(el)).toHaveAttribute("aria-invalid", "true");
  });

  it("opens on click, lists options and selects one", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await user().click(trigger(el));
    await settle();
    expect(el.open).toBe(true);
    const lb = listbox(el)!;
    expect(lb.classList).toContain("content");
    expect(trigger(el)).toHaveAttribute("aria-controls", lb.id);
    expect(lb).toHaveAttribute("aria-label", "Language");
    await user().click(option("English"));
    await settle();
    expect(el.value).toBe("en");
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "en" });
    expect(listbox(el)).toBeNull();
    expect(trigger(el).textContent).toContain("English");
    expect(trigger(el)).not.toHaveAttribute("data-placeholder");
    expect(focused()).toBe(trigger(el));
  });

  it("shows the selected value of the value attribute and marks the option", async () => {
    const el = await setup('value="en"');
    expect(el.value).toBe("en");
    expect(trigger(el).textContent).toContain("English");
    el.open = true;
    await settle();
    expect(option("English")).toHaveAttribute("aria-selected", "true");
    expect(option("English")).toHaveAttribute("data-state", "checked");
    expect(option("Chinese")).toHaveAttribute("aria-selected", "false");
    expect(
      option("English").shadowRoot!.querySelector(".itemIndicator"),
    ).not.toBeNull();
  });

  it("does not select disabled options", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await user().click(trigger(el));
    await settle();
    await user().click(option("Japanese"));
    await settle();
    expect(onChange).not.toHaveBeenCalled();
    expect(el.open).toBe(true);
    expect(option("Japanese")).toHaveAttribute("aria-disabled", "true");
  });

  it("minerva-open-change is cancelable (controlled open)", async () => {
    const el = await setup();
    const onOpen = vi.fn((e: Event) => e.preventDefault());
    el.addEventListener("minerva-open-change", onOpen);
    await user().click(trigger(el));
    await settle();
    expect((onOpen.mock.calls[0][0] as CustomEvent).detail).toEqual({
      open: true,
    });
    expect(el.open).toBe(false);
    expect(listbox(el)).toBeNull();
  });

  it("disabled prevents opening", async () => {
    const el = await setup("disabled");
    expect(trigger(el).disabled).toBe(true);
    el.shadowRoot!.querySelector<HTMLButtonElement>(".trigger")!.click();
    await settle();
    expect(el.open).toBe(false);
  });

  it("renders options given through the options property (with groups)", async () => {
    const el = await mount<MinervaSelect>(
      `<minerva-select aria-label="Fruit"></minerva-select>`,
    );
    el.options = [
      { value: "a", label: "Apple" },
      { label: "Citrus", options: [{ value: "o", label: "Orange" }] },
    ];
    el.value = "o";
    await settle();
    expect(trigger(el).textContent).toContain("Orange");
    el.open = true;
    await settle();
    const group = $(el, "[role=group]");
    expect(group.getAttribute("aria-labelledby")).toBe(
      $(el, "[part=group-label]").id,
    );
    const orange = $(el, "[data-value=o]");
    expect(orange).toHaveAttribute("aria-selected", "true");
    expect(el.shadowRoot!.activeElement).toBe(orange);
    await press("{ArrowUp}{Enter}");
    expect(el.value).toBe("a");
  });
});

describe("<minerva-select> keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
    ["ArrowUp", "{ArrowUp}"],
    ["Alt+ArrowDown", "{Alt>}{ArrowDown}{/Alt}"],
  ])("opens with %s and focuses the selected option", async (_, keys) => {
    const el = await setup('value="en"');
    trigger(el).focus();
    await press(keys);
    expect(trigger(el)).toHaveAttribute("aria-expanded", "true");
    expect(focused()).toBe(option("English"));
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(listbox(el)).toHaveAttribute("data-state", "open");
  });

  it("highlights the first enabled option without a value, the last one with ArrowUp", async () => {
    const el = await setup();
    trigger(el).focus();
    await press("{ArrowDown}");
    expect(focused()).toBe(option("Chinese"));
    await press("{Escape}");
    expect(el.open).toBe(false);
    expect(focused()).toBe(trigger(el));
    await press("{ArrowUp}");
    // Japanese is disabled: the last enabled option is English.
    expect(focused()).toBe(option("English"));
    await press("{Escape}");
    await press("{Home}");
    expect(focused()).toBe(option("Chinese"));
    await press("{Escape}");
    await press("{End}");
    expect(focused()).toBe(option("English"));
  });

  it("moves with the arrows without wrapping, skips disabled options, supports Home / End / PageUp / PageDown", async () => {
    const el = await mount<MinervaSelect>(
      `<minerva-select aria-label="Letters">
        <minerva-option value="a">Alpha</minerva-option>
        <minerva-option value="b" disabled>Beta</minerva-option>
        <minerva-option value="c">Gamma</minerva-option>
        <minerva-option value="d">Delta</minerva-option>
      </minerva-select>`,
    );
    await user().click(trigger(el));
    await settle();
    expect(focused()).toBe(option("Alpha"));
    await press("{ArrowUp}");
    expect(focused()).toBe(option("Alpha"));
    await press("{ArrowDown}");
    expect(focused()).toBe(option("Gamma"));
    await press("{ArrowDown}{ArrowDown}");
    expect(focused()).toBe(option("Delta"));
    expect(option("Delta")).toHaveAttribute("data-highlighted");
    expect(option("Gamma")).not.toHaveAttribute("data-highlighted");
    await press("{Home}");
    expect(focused()).toBe(option("Alpha"));
    await press("{End}");
    expect(focused()).toBe(option("Delta"));
    await press("{PageUp}");
    expect(focused()).toBe(option("Alpha"));
    await press("{PageDown}");
    expect(focused()).toBe(option("Delta"));
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "selects with %s, closes and returns focus to the trigger",
    async (_, key) => {
      const el = await setup();
      const onChange = vi.fn();
      const onOpen = vi.fn();
      el.addEventListener("minerva-change", onChange);
      el.addEventListener("minerva-open-change", onOpen);
      await user().click(trigger(el));
      await settle();
      await press("{ArrowDown}");
      await press(key);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].detail).toEqual({ value: "en" });
      expect(listbox(el)).toBeNull();
      expect(focused()).toBe(trigger(el));
      expect(trigger(el).textContent).toContain("English");
      // The keyup of Space on the trigger does not reopen it.
      expect(onOpen.mock.calls.map((c) => c[0].detail.open)).toEqual([
        true,
        false,
      ]);
    },
  );

  it("ignores hovering a disabled option, Alt+ArrowUp selects and closes", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await user().click(trigger(el));
    await settle();
    await user().hover(option("Japanese"));
    await settle();
    expect(option("Japanese")).not.toHaveAttribute("data-highlighted");
    await press("{ArrowDown}{Alt>}{ArrowUp}{/Alt}");
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "en" });
    expect(listbox(el)).toBeNull();
  });

  it("Tab closes the listbox without selecting (focus back on the trigger)", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await user().click(trigger(el));
    await settle();
    expect(focused()).toBe(option("Chinese"));
    // happy-dom's Tab order ignores shadow roots: only the close is checked
    option("Chinese").dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        composed: true,
      }),
    );
    await settle();
    expect(listbox(el)).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("typeahead on the closed trigger changes the selection without opening", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    trigger(el).focus();
    await press("e");
    expect(el.value).toBe("en");
    expect(trigger(el).textContent).toContain("English");
    expect(listbox(el)).toBeNull();
    // Disabled options are never matched.
    await press("j");
    expect(onChange).toHaveBeenCalledTimes(1);
    await wait(600);
    await press("c");
    expect(el.value).toBe("zh");
    expect(trigger(el)).toHaveAttribute("aria-expanded", "false");
  });

  it("typeahead in the open listbox moves the highlight (typing a space continues a search)", async () => {
    const el = await mount<MinervaSelect>(
      `<minerva-select aria-label="Place">
        <minerva-option value="nz">New Zealand</minerva-option>
        <minerva-option value="ny" text-value="New York"><b>NY</b></minerva-option>
        <minerva-option value="no">Norway</minerva-option>
      </minerva-select>`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await user().click(trigger(el));
    await settle();
    await press("nor");
    expect(focused()).toBe(option("Norway"));
    await wait(600);
    await press("new y");
    expect(focused()).toBe(option("NY"));
    expect(onChange).not.toHaveBeenCalled();
    expect(listbox(el)).not.toBeNull();
  });

  it("scrolls the highlighted option into view on open and on keyboard moves", async () => {
    const spy = vi
      .spyOn(HTMLElement.prototype, "scrollIntoView")
      .mockImplementation(() => {});
    const el = await setup('value="en"');
    await user().click(trigger(el));
    await settle();
    expect(spy.mock.contexts).toContain(option("English"));
    expect(spy).toHaveBeenCalledWith({ block: "nearest" });
    await press("{ArrowUp}");
    expect(spy.mock.contexts.at(-1)).toBe(option("Chinese"));
  });
});

describe("<minerva-select> pointer", () => {
  it("highlights (and focuses) options on hover", async () => {
    const el = await setup('value="zh"');
    await user().click(trigger(el));
    await settle();
    await user().hover(option("English"));
    await settle();
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(focused()).toBe(option("English"));
    expect(option("Chinese")).not.toHaveAttribute("data-highlighted");
    expect(option("Chinese")).toHaveAttribute("data-state", "checked");
    expect(option("English")).toHaveAttribute("data-state", "unchecked");
  });

  it("closes on an outside pointer down and on a second click on the trigger", async () => {
    const el = await mount<MinervaSelect>(
      `<p id="outside">Outside</p><minerva-select aria-label="L">${LANGS}</minerva-select>`,
      "minerva-select",
    );
    await user().click(trigger(el));
    await settle();
    await wait(5);
    await user().click(document.getElementById("outside")!);
    await settle();
    expect(listbox(el)).toBeNull();
    await user().click(trigger(el));
    await settle();
    expect(listbox(el)).not.toBeNull();
    await user().click(trigger(el));
    await settle();
    expect(listbox(el)).toBeNull();
  });

  it("clicking the already selected option closes without minerva-change", async () => {
    const el = await setup('value="zh"');
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await user().click(trigger(el));
    await settle();
    await user().click(option("Chinese"));
    await settle();
    expect(onChange).not.toHaveBeenCalled();
    expect(listbox(el)).toBeNull();
    expect(focused()).toBe(trigger(el));
  });
});

describe("<minerva-select> accessibility", () => {
  it("exposes the select-only combobox pattern", async () => {
    const el = await setup("required");
    expect(trigger(el)).toHaveAttribute("aria-required", "true");
    expect(trigger(el)).toHaveAttribute("data-state", "closed");
    await user().click(trigger(el));
    await settle();
    expect(trigger(el)).toHaveAttribute("data-state", "open");
    expect(listbox(el)).toHaveAttribute("data-side", "bottom");
    expect(option("Chinese")).toHaveAttribute("aria-selected", "false");
    expect(option("Chinese")).toHaveAttribute("tabindex", "-1");
  });

  it("labels groups with their label and hides separators", async () => {
    const el = await setup();
    el.open = true;
    await settle();
    const group = document.getElementById("group")!;
    expect(group).toHaveAttribute("role", "group");
    const labelId = group.getAttribute("aria-labelledby")!;
    expect(document.getElementById(labelId)?.textContent).toBe("Experimental");
    expect(document.getElementById("sep")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("leaves a group without label unlabelled", async () => {
    await mount(
      `<minerva-select aria-label="L"><minerva-option-group><minerva-option value="a">A</minerva-option></minerva-option-group></minerva-select>`,
    );
    expect(document.querySelector("minerva-option-group")).not.toHaveAttribute(
      "aria-labelledby",
    );
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaSelect>(
      `<label for="s">Country</label><minerva-select id="s">${LANGS}</minerva-select>`,
      "minerva-select",
    );
    expect(trigger(el)).toHaveAttribute("aria-label", "Country");
  });

  it("updates the trigger label when the selected option's text changes", async () => {
    const el = await setup('value="en"');
    option("English").textContent = "Anglais";
    await settle();
    expect(trigger(el).textContent).toContain("Anglais");
  });
});

describe("<minerva-select> forms", () => {
  it("submits the selected value through FormData", async () => {
    document.body.innerHTML = `<form><minerva-select name="lang" aria-label="L">${LANGS}</minerva-select></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaSelect>("minerva-select")!;
    expect(new FormData(form).get("lang")).toBe("");
    await user().click(trigger(el));
    await settle();
    await user().click(option("English"));
    await settle();
    expect(new FormData(form).get("lang")).toBe("en");
  });

  it("validates required with a localized message", async () => {
    document.documentElement.lang = "fr";
    document.body.innerHTML = `<form><minerva-select name="lang" required>${LANGS}</minerva-select></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaSelect>("minerva-select")!;
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).not.toBe("Please select an item in the list.");
    expect(el.validationMessage).not.toBe("");
    expect(form.checkValidity()).toBe(false);
    el.value = "zh";
    await el.updateComplete;
    expect(el.checkValidity()).toBe(true);
  });

  it("restores the value attribute on form reset without minerva-change", async () => {
    document.body.innerHTML = `<form><minerva-select name="lang" value="zh">${LANGS}</minerva-select></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaSelect>("minerva-select")!;
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.value = "en";
    await el.updateComplete;
    form.reset();
    await settle();
    expect(el.value).toBe("zh");
    expect(trigger(el).textContent).toContain("Chinese");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("is disabled by a disabled fieldset and not submitted", async () => {
    document.body.innerHTML = `<form><fieldset disabled><minerva-select name="lang" value="zh">${LANGS}</minerva-select></fieldset></form>`;
    await settle();
    const el = document.querySelector<MinervaSelect>("minerva-select")!;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await el.updateComplete;
    expect(trigger(el).disabled).toBe(true);
    expect(
      new FormData(document.querySelector("form")!).get("lang"),
    ).toBeNull();
  });
});

describe("<minerva-select> layering", () => {
  it("inside a modal, Escape closes only the listbox", async () => {
    const modal = await mount<HTMLElement & { open: boolean }>(
      `<minerva-modal label="Dialog" open><minerva-select aria-label="L">${LANGS}</minerva-select></minerva-modal>`,
    );
    const el = modal.querySelector<MinervaSelect>("minerva-select")!;
    await user().click(trigger(el));
    await settle();
    expect(el.open).toBe(true);
    await press("{Escape}");
    expect(el.open).toBe(false);
    expect(modal.open).toBe(true);
    expect(focused()).toBe(trigger(el));
  });
});

describe("<minerva-select> dev warnings", () => {
  it("warns when the value matches no option and on duplicate values", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(
      `<minerva-select value="xx"><minerva-option value="a">A</minerva-option><minerva-option value="a">A2</minerva-option></minerva-select>`,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('value "xx" does not match any option'),
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("must be unique"),
    );
  });
});
