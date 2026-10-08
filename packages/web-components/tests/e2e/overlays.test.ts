// E2E: overlays composed in a plain-HTML page — a select inside a modal,
// Escape only dismissing the topmost layer, focus returning to the opener,
// outside clicks. Behaviour comes from @minerva/core's shared layer stack.
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack } from "@minerva/core";
import { describe, expect, it } from "vitest";
import "../../src/index";
import type { MinervaModal, MinervaSelect } from "../../src/index";
import { $, settle, wait } from "../utils";

const app = () => `
  <minerva-button id="open-settings">Settings</minerva-button>
  <minerva-modal id="settings" label="Settings">
    <label for="lang">Language</label>
    <minerva-select id="lang" name="lang" value="en">
      <minerva-option value="en">English</minerva-option>
      <minerva-option value="fr">Français</minerva-option>
    </minerva-select>
    <minerva-button slot="footer" id="done">Done</minerva-button>
  </minerva-modal>`;

const trigger = (el: Element) => $(el, "button") as HTMLElement;

describe("overlays (e2e)", () => {
  it("select in a modal: Escape closes the listbox first, then the modal; focus returns", async () => {
    document.body.innerHTML = app();
    await settle();
    const opener = document.getElementById("open-settings")!;
    const modal = document.getElementById("settings") as MinervaModal;
    const select = document.getElementById("lang") as MinervaSelect;
    opener.addEventListener("click", () => modal.show());

    await userEvent.click(trigger(opener));
    await settle();
    expect(modal.open).toBe(true);

    $(select, "[part=root]").focus();
    await userEvent.keyboard("{ArrowDown}");
    await settle();
    expect(select.open).toBe(true);
    expect(getLayerStack()).toHaveLength(2);

    await userEvent.keyboard("{Escape}");
    await settle();
    expect(select.open).toBe(false);
    expect(modal.open).toBe(true);
    expect(getActiveElement()).toBe($(select, "[part=root]"));

    await userEvent.keyboard("{Escape}");
    await settle();
    await wait(10);
    expect(modal.open).toBe(false);
    expect(getLayerStack()).toHaveLength(0);
    expect(getActiveElement()).toBe(trigger(opener));
  });

  it("choosing an option inside the modal keeps the modal open", async () => {
    document.body.innerHTML = app();
    await settle();
    const modal = document.getElementById("settings") as MinervaModal;
    const select = document.getElementById("lang") as MinervaSelect;
    modal.show();
    await settle();
    $(select, "[part=root]").focus();
    await userEvent.keyboard("{ArrowDown}");
    await settle();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await settle();
    expect(select.value).toBe("fr");
    expect(select.open).toBe(false);
    expect(modal.open).toBe(true);
  });

  it("a pointer down outside the modal panel closes it", async () => {
    document.body.innerHTML = app();
    await settle();
    const modal = document.getElementById("settings") as MinervaModal;
    modal.show();
    await settle();
    await wait(5);
    document.documentElement.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    await settle();
    expect(modal.open).toBe(false);
  });
});
