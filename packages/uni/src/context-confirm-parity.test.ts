import { mount, flushPromises } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import ContextMenu from "./ContextMenu.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import Menu from "./Menu.vue";
afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});
it("disabled context areas preserve the browser menu and keyboard defaults", () => {
  const w = mount(ContextMenu, {
    props: { disabled: true },
    slots: { default: "Area" },
  });
  const event = new MouseEvent("contextmenu", {
    bubbles: true,
    cancelable: true,
  });
  w.get(".mn-context-area").element.dispatchEvent(event);
  expect(event.defaultPrevented).toBe(false);
  expect(w.emitted("openChange")).toBeUndefined();
  w.unmount();
});
it("context menus forward density, direction, loop and accessible labels to the actual menu", async () => {
  const w = mount(ContextMenu, {
    props: {
      items: [{ value: "edit", label: "Edit" }],
      size: "small",
      dir: "rtl",
      loop: false,
      modal: false,
      ariaLabel: "Record actions",
    },
    slots: { default: "Area" },
  });
  await w
    .get(".mn-context-area")
    .trigger("contextmenu", { clientX: 120, clientY: 80 });
  await nextTick();
  expect(w.findComponent(Menu).props()).toMatchObject({
    size: "small",
    dir: "rtl",
    loop: false,
    ariaLabel: "Record actions",
  });
  expect(w.get('[role="menu"]').attributes("aria-label")).toBe(
    "Record actions",
  );
  expect(w.find(".mn-uni-popover-modal").exists()).toBe(false);
  w.unmount();
});
it("keyboard context opening focuses the first action and Escape restores the area", async () => {
  const w = mount(ContextMenu, {
    attachTo: document.body,
    props: {
      items: [
        { value: "disabled", label: "Disabled", disabled: true },
        { value: "edit", label: "Edit" },
      ],
    },
    slots: { default: () => h("button", "Target") },
  });
  const target = w.get(".mn-context-area button").element as HTMLButtonElement;
  target.focus();
  await w
    .get(".mn-context-area")
    .trigger("keydown", { key: "F10", shiftKey: true });
  await flushPromises();
  expect(document.activeElement?.textContent).toBe("Edit");
  await w.get('[role="menu"]').trigger("keydown", { key: "Escape" });
  await flushPromises();
  expect(w.emitted("openChange")).toEqual([[true], [false]]);
  expect(document.activeElement).toBe(target);
  w.unmount();
});
it("touch long press opens after its delay and cancels on movement", async () => {
  vi.useFakeTimers();
  const w = mount(ContextMenu, {
    props: { items: [{ value: "edit", label: "Edit" }] },
    slots: { default: "Area" },
  });
  await w
    .get(".mn-context-area")
    .trigger("pointerdown", { pointerType: "touch", clientX: 20, clientY: 40 });
  await vi.advanceTimersByTimeAsync(699);
  expect(w.emitted("openChange")).toBeUndefined();
  await w
    .get(".mn-context-area")
    .trigger("pointermove", { pointerType: "touch" });
  await vi.advanceTimersByTimeAsync(10);
  expect(w.emitted("openChange")).toBeUndefined();
  await w
    .get(".mn-context-area")
    .trigger("pointerdown", { pointerType: "touch", clientX: 20, clientY: 40 });
  await vi.advanceTimersByTimeAsync(700);
  expect(w.emitted("openChange")).toEqual([[true]]);
  w.unmount();
});
it("confirm uses an alertdialog with linked title, description and translated close label", () => {
  const w = mount(ConfirmDialog, {
    props: {
      open: true,
      title: "Delete record",
      description: "This is permanent",
      closeLabel: "Dismiss confirmation",
      color: "danger",
    },
  });
  const dialog = w.get('[role="alertdialog"]');
  expect(dialog.attributes("aria-modal")).toBe("true");
  expect(w.get(`#${dialog.attributes("aria-labelledby")}`).text()).toBe(
    "Delete record",
  );
  expect(w.get(`#${dialog.attributes("aria-describedby")}`).text()).toBe(
    "This is permanent",
  );
  expect(w.find('[aria-label="Dismiss confirmation"]').exists()).toBe(true);
  expect(w.get('[data-action="confirm"]').text()).toBe("Delete");
  w.unmount();
});
it("confirm prevents repeat activation while pending, reports errors and remains controlled", async () => {
  let reject!: (error: Error) => void;
  const confirm = vi.fn(
    () =>
      new Promise<void>((_, r) => {
        reject = r;
      }),
  );
  const w = mount(ConfirmDialog, {
    props: { open: true, title: "Delete", onConfirm: confirm },
  });
  await w.get('[data-action="confirm"]').trigger("click");
  await w.get('[data-action="confirm"]').trigger("click");
  expect(confirm).toHaveBeenCalledTimes(1);
  expect(w.get('[data-action="cancel"]').attributes("disabled")).toBeDefined();
  reject(new Error("Retry"));
  await flushPromises();
  expect(w.emitted("error")?.[0]?.[0]).toBeInstanceOf(Error);
  expect(w.find('[role="alertdialog"]').exists()).toBe(true);
  expect(w.emitted("openChange")).toBeUndefined();
  await w.get('[data-action="cancel"]').trigger("click");
  expect(w.emitted("openChange")).toEqual([[false]]);
  expect(w.emitted("cancel")).toHaveLength(1);
  w.unmount();
});
