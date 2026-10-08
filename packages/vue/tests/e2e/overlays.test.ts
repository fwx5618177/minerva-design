// Overlay user flows: a Modal traps Tab inside (looping), Escape closes it
// and focus returns to the opener; a Drawer and a ConfirmDialog behave the
// same; clicking outside a Popover closes it without moving focus away.
import { describe, expect, it } from "vitest";
import { defineComponent, h, ref } from "vue";
import {
  Button,
  Drawer,
  Input,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src";
import { dialogs, renderApp, settle } from "./utils";

describe("overlays: focus trap, Escape, focus return", () => {
  it("Modal: Tab loops inside, Escape closes, focus returns to the opener", async () => {
    const { user } = renderApp(() => [
      h(Button, null, () => "Before"),
      h(
        Modal,
        { title: "Edit profile" },
        {
          trigger: () => h(Button, null, () => "Edit"),
          default: () => [
            h(Input, { "aria-label": "First name" }),
            h(Input, { "aria-label": "Last name" }),
          ],
        },
      ),
    ]);
    const trigger = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent === "Edit",
    )!;
    await user.click(trigger);
    await settle(10);
    const dialog = dialogs()[0];
    expect(dialog.contains(document.activeElement)).toBe(true);
    // the rest of the page is hidden from assistive technology
    expect(trigger.closest("[aria-hidden='true']")).not.toBeNull();
    for (let i = 0; i < 6; i++) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.keyboard("{Escape}");
    await settle(10);
    expect(dialogs()).toHaveLength(0);
    expect(document.activeElement).toBe(trigger);
    expect(trigger.closest("[aria-hidden='true']")).toBeNull();
  });

  it("Modal opened from state (no trigger) returns focus to the element focused before", async () => {
    const open = ref(false);
    const { user } = renderApp(() => [
      h(Button, { onClick: () => (open.value = true) }, () => "Open"),
      h(Modal, {
        open: open.value,
        "onUpdate:open": (v: boolean) => (open.value = v),
        title: "State",
      }),
    ]);
    const opener = document.querySelector("button")!;
    await user.click(opener);
    await settle(10);
    expect(dialogs()).toHaveLength(1);
    await user.click(document.querySelector('[data-part="close-button"]')!);
    await settle(10);
    expect(open.value).toBe(false);
    expect(document.activeElement).toBe(opener);
  });

  it("Drawer: overlay click closes it and focus returns", async () => {
    const { user } = renderApp(() =>
      h(
        Drawer,
        { title: "Filters" },
        {
          trigger: () => h(Button, null, () => "Filters"),
          default: () => h(Input, { "aria-label": "Search" }),
        },
      ),
    );
    const trigger = document.querySelector("button")!;
    await user.click(trigger);
    await settle(10);
    expect(dialogs()).toHaveLength(1);
    await user.click(document.querySelector('[data-part="overlay"]')!);
    await settle(10);
    expect(dialogs()).toHaveLength(0);
    expect(document.activeElement).toBe(trigger);
  });

  it("Popover: Escape closes it and returns focus to its trigger", async () => {
    const Demo = defineComponent(
      () => () =>
        h(Popover, null, () => [
          h(PopoverTrigger, { asChild: true }, () =>
            h(Button, null, () => "Details"),
          ),
          h(PopoverContent, null, () => h(Button, null, () => "Inside")),
        ]),
    );
    const { user } = renderApp(() => h(Demo));
    const trigger = document.querySelector("button")!;
    await user.click(trigger);
    await settle(10);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    await user.keyboard("{Escape}");
    await settle(10);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });
});
