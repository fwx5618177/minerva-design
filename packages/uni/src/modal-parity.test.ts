import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect, vi } from "vitest";
import Modal from "./Modal.vue";
import ModalRoot from "./ModalRoot.vue";
import ModalTrigger from "./ModalTrigger.vue";
import ModalContent from "./ModalContent.vue";
it("Modal forceMount, size, role, hidden close and cancelable outside share real dialog state", async () => {
  const outside = vi.fn((event: Event) => event.preventDefault());
  const w = mount(Modal, {
    props: {
      defaultOpen: true,
      size: "xlarge",
      title: "Review",
      description: "Check changes",
      role: "alertdialog",
      hideCloseButton: true,
      forceMount: true,
      onInteractOutside: outside,
    },
  });
  const dialog = w.get('[role="alertdialog"]');
  expect(dialog.classes()).toContain("mn-modal-xlarge");
  expect(dialog.attributes("aria-modal")).toBe("true");
  expect(w.get(`#${dialog.attributes("aria-describedby")}`).text()).toBe(
    "Check changes",
  );
  expect(w.find(".mn-close").exists()).toBe(false);
  await w.get('[data-part="backdrop"]').trigger("click");
  expect(outside).toHaveBeenCalledTimes(1);
  expect(w.emitted("openChange")).toBeUndefined();
  await dialog.trigger("keydown", { key: "Escape" });
  expect(w.emitted("openChange")).toEqual([[false]]);
  expect(w.get('[data-state="closed"]').attributes("style")).toContain(
    "display: none",
  );
});
it("compound Modal inherits nonmodal state and restores the registered trigger", async () => {
  const w = mount(ModalRoot, {
    props: { modal: false },
    slots: {
      default: () => [
        h(ModalTrigger, {}, () => "Open"),
        h(ModalContent, { title: "Details" }, () => "Body"),
      ],
    },
    attachTo: document.body,
  });
  await w.get("button").trigger("click");
  await nextTick();
  expect(w.get('[role="dialog"]').attributes("aria-modal")).toBeUndefined();
  expect(w.find('[data-part="backdrop"]').exists()).toBe(false);
  await w.get('[role="dialog"]').trigger("keydown", { key: "Escape" });
  await nextTick();
  await nextTick();
  expect(document.activeElement).toBe(w.get("button").element);
  w.unmount();
});
it("controlled declarative Modal restores the element focused before opening", async () => {
  const opener = document.createElement("button");
  document.body.append(opener);
  opener.focus();
  const w = mount(Modal, {
    props: { open: false, title: "Confirmation" },
    attachTo: document.body,
  });
  await w.setProps({ open: true });
  await nextTick();
  await w.setProps({ open: false });
  await nextTick();
  expect(document.activeElement).toBe(opener);
  w.unmount();
  opener.remove();
});
it("compound ModalHeader supplies the actual dialog name when no title prop is passed", async () => {
  const { default: ModalHeader } = await import("./ModalHeader.vue");
  const w = mount(Modal, {
    props: { open: true },
    slots: { default: () => h(ModalHeader, {}, () => "Authored title") },
  });
  await nextTick();
  const dialog = w.get('[role="dialog"]');
  expect(w.get(`#${dialog.attributes("aria-labelledby")}`).text()).toBe(
    "Authored title",
  );
  w.unmount();
});
it("unmounting an open declarative dialog returns focus and removes outside handlers", async () => {
  const opener = document.createElement("button");
  document.body.append(opener);
  opener.focus();
  const outside = vi.fn();
  const w = mount(Modal, {
    props: {
      open: true,
      title: "Unmounted",
      modal: false,
      onInteractOutside: outside,
    },
    attachTo: document.body,
  });
  await nextTick();
  w.unmount();
  await nextTick();
  expect(document.activeElement).toBe(opener);
  opener.dispatchEvent(new Event("pointerdown", { bubbles: true }));
  expect(outside).not.toHaveBeenCalled();
  opener.remove();
});
