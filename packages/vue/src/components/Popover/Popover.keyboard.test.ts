import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from ".";

// Non-modal dialog popover: keyboard open, initial focus inside, Escape
// returns focus to the trigger, Tab out continues from the trigger.
const settle = async () => {
  await flushPromises();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

const fixture = (modal = false) =>
  mount(
    defineComponent({
      setup: () => () =>
        h("div", [
          h("button", { type: "button" }, "Before"),
          h(Popover, { modal }, () => [
            h(PopoverTrigger, null, () => "Sort"),
            h(PopoverContent, { "aria-label": "Sort options" }, () => [
              h("button", { type: "button" }, "Newest"),
              h("button", { type: "button" }, "Oldest"),
            ]),
          ]),
          h("button", { type: "button" }, "After"),
        ]),
    }),
    { attachTo: document.body },
  );

const button = (name: string) =>
  [...document.querySelectorAll<HTMLElement>("button")].find(
    (b) => b.textContent?.trim() === name,
  )!;
const dialog = () => document.querySelector('[role="dialog"]');

const openFromKeyboard = async (user: ReturnType<typeof userEvent.setup>) => {
  button("Sort").focus();
  await user.keyboard("{Enter}");
  await settle();
  expect(document.activeElement).toBe(button("Newest"));
};

describe("Popover keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "opens from the Tab-reachable trigger with %s and focuses the first tabbable",
    async (_, keys) => {
      const user = userEvent.setup();
      fixture();
      await user.tab();
      await user.tab();
      expect(document.activeElement).toBe(button("Sort"));
      await user.keyboard(keys);
      await settle();
      expect(button("Sort").getAttribute("aria-expanded")).toBe("true");
      expect(dialog()).not.toBeNull();
      expect(document.activeElement).toBe(button("Newest"));
    },
  );

  it("Escape closes from inside the panel and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    fixture();
    await openFromKeyboard(user);
    await user.tab();
    expect(document.activeElement).toBe(button("Oldest"));
    await user.keyboard("{Escape}");
    await settle();
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(button("Sort"));
    expect(button("Sort").getAttribute("aria-expanded")).toBe("false");
  });

  it("Tab past the last tabbable closes the panel and moves focus after the trigger", async () => {
    const user = userEvent.setup();
    fixture();
    await openFromKeyboard(user);
    await user.tab();
    expect(document.activeElement).toBe(button("Oldest"));
    expect(dialog()).not.toBeNull();
    await user.tab();
    expect(document.activeElement).toBe(button("After"));
    await settle();
    expect(dialog()).toBeNull();
    expect(button("Sort").getAttribute("aria-expanded")).toBe("false");
    // focus is not pulled back to the trigger afterwards
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(document.activeElement).toBe(button("After"));
  });

  it("Shift+Tab before the first tabbable closes the panel and moves focus before the trigger", async () => {
    const user = userEvent.setup();
    fixture();
    await openFromKeyboard(user);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(button("Before"));
    await settle();
    expect(dialog()).toBeNull();
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(document.activeElement).toBe(button("Before"));
  });

  it("Tab out of a panel without tabbables goes back to the trigger when nothing follows", async () => {
    const user = userEvent.setup();
    mount(
      defineComponent({
        setup: () => () =>
          h(Popover, null, () => [
            h(PopoverTrigger, null, () => "Only"),
            h(PopoverContent, null, () => "Text"),
          ]),
      }),
      { attachTo: document.body },
    );
    button("Only").focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(document.activeElement).toBe(dialog());
    // modifiers and other keys are left alone
    dialog()!.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        ctrlKey: true,
        bubbles: true,
      }),
    );
    await user.keyboard("a");
    await settle();
    expect(dialog()).not.toBeNull();
    await user.tab();
    await settle();
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(button("Only"));
  });

  it("modal: Tab and Shift+Tab loop inside the panel", async () => {
    const user = userEvent.setup();
    fixture(true);
    await openFromKeyboard(user);
    await user.tab();
    await user.tab();
    expect(document.activeElement).toBe(button("Newest"));
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(button("Oldest"));
    expect(dialog()).not.toBeNull();
  });
});
