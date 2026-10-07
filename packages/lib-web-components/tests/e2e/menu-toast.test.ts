// E2E: a toolbar app — a dropdown menu whose actions raise toasts, inside a
// themed scope; keyboard-only operation and focus return.
import userEvent from "@testing-library/user-event";
import { getActiveElement } from "@minerva/core";
import { describe, expect, it } from "vitest";
import "../../src/index";
import { toast } from "../../src/index";
import { settle, wait } from "../utils";

describe("menu + toast (e2e)", () => {
  it("chooses a menu action with the keyboard, shows a toast, returns focus", async () => {
    document.body.innerHTML = `
      <minerva-config theme="dark" locale="en">
        <minerva-menu id="menu">
          <button slot="trigger" id="trigger">Actions</button>
          <minerva-menu-item value="archive">Archive</minerva-menu-item>
          <minerva-menu-item value="delete">Delete</minerva-menu-item>
        </minerva-menu>
        <minerva-toast-region id="region"></minerva-toast-region>
      </minerva-config>`;
    await settle();
    const menu = document.getElementById("menu")!;
    const trigger = document.getElementById("trigger")!;
    menu.addEventListener("minerva-select", (event) => {
      toast.success(`${(event as CustomEvent).detail.value} done`);
    });

    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    await wait(5);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await settle();
    await wait(10);

    const region = document.getElementById("region")!;
    expect(region.shadowRoot!.textContent).toContain("delete done");
    // the region lives in the dark scope like the rest of the app
    expect(region.closest("minerva-config")).toHaveAttribute(
      "data-theme",
      "dark",
    );
    expect(getActiveElement()).toBe(trigger);
  });
});
