import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Dialogs from "./Dialogs.vue";
import { flush, getByRole, key, queryByRole } from "./dom";

// Port of the former Chromium dialogs spec on the Dialogs fixture.
let w: VueWrapper;
beforeEach(() => {
  w = mount(Dialogs, { attachTo: document.body });
});
afterEach(() => {
  w.unmount();
  vi.useRealTimers();
});

const contextMenu = (target: Element, clientX: number, clientY: number) =>
  target.dispatchEvent(
    new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      button: 2,
      clientX,
      clientY,
    }),
  );

it("context menu anchors at the pointer, follows a second pointer and restores keyboard focus", async () => {
  const area = getByRole("button", "Record area");
  area.focus();
  contextMenu(area, 12, 12);
  await flush();
  const menu = getByRole("menu", "Record actions");
  expect(document.activeElement).toBe(getByRole("menuitem", "Edit record"));
  const panel = document.querySelector<HTMLElement>(
    ".mn-uni-context-positioner",
  )!;
  const first = parseFloat(panel.style.left);
  expect(Number.isFinite(first)).toBe(true);
  contextMenu(area, 42, 12);
  await flush();
  expect(parseFloat(panel.style.left)).toBe(first + 30);

  getByRole("menuitem", "Edit record", menu).click();
  await flush();
  expect(queryByRole("menu", "Record actions")).toBeNull();
  expect(w.find('[role="status"]').text()).toBe("edit");
  expect(document.activeElement).toBe(area);

  key(area, "F10", { shiftKey: true });
  await flush();
  expect(getByRole("menu", "Record actions")).toBeTruthy();
  key(document.activeElement!, "Escape");
  await flush();
  expect(queryByRole("menu", "Record actions")).toBeNull();
  expect(document.activeElement).toBe(area);
});

it("confirm is a described alertdialog with a loading guard and focus return", async () => {
  vi.useFakeTimers();
  const trigger = getByRole("button", "Delete record");
  trigger.focus();
  trigger.click();
  await flush();
  const dialog = getByRole("alertdialog", "Delete record permanently?");
  const description = dialog.getAttribute("aria-describedby")!;
  expect(document.getElementById(description)?.textContent).toContain(
    "This cannot be undone",
  );
  getByRole("button", "Dismiss confirmation").click();
  await flush();
  expect(queryByRole("alertdialog")).toBeNull();
  expect(document.activeElement).toBe(trigger);

  trigger.click();
  await flush();
  const confirm = getByRole("button", "Delete", getByRole("alertdialog"));
  confirm.focus();
  confirm.click();
  await flush();
  expect(confirm.getAttribute("aria-busy")).toBe("true");
  expect(document.activeElement).toBe(confirm);
  expect(
    (
      getByRole(
        "button",
        "Cancel",
        getByRole("alertdialog"),
      ) as HTMLButtonElement
    ).disabled,
  ).toBe(true);
  await vi.advanceTimersByTimeAsync(300);
  await flush();
  expect(w.text()).toContain("Record deleted");
  expect(queryByRole("alertdialog")).toBeNull();
  expect(document.activeElement).toBe(trigger);
});
