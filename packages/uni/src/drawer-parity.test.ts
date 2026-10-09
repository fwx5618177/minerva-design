import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect, vi } from "vitest";
import Drawer from "./Drawer.vue";
import DrawerRoot from "./DrawerRoot.vue";
import DrawerTrigger from "./DrawerTrigger.vue";
import DrawerContent from "./DrawerContent.vue";
it("Drawer all-in-one trigger, side/size, hidden close and forceMount preserve controlled state", async () => {
  const w = mount(Drawer, {
    props: {
      open: false,
      forceMount: true,
      side: "bottom",
      size: "large",
      hideCloseButton: true,
      title: "Details",
      description: "Summary",
    },
    slots: { trigger: "Open" },
  });
  expect(w.find('[role="dialog"]').exists()).toBe(true);
  expect(w.find(".mn-uni-drawer-layer").attributes("style")).toContain(
    "display: none",
  );
  await w.find(".mn-drawer-trigger").trigger("click");
  expect(w.emitted("openChange")).toEqual([[true]]);
  expect(w.find(".mn-uni-drawer-layer").attributes("style")).toContain(
    "display: none",
  );
  await w.setProps({ open: true });
  expect(w.find('[role="dialog"]').classes()).toEqual(
    expect.arrayContaining(["mn-drawer-bottom", "mn-drawer-large"]),
  );
  expect(w.find(".mn-close").exists()).toBe(false);
  expect(w.find('[role="dialog"]').attributes("aria-describedby")).toBeTruthy();
});
it("compound Drawer inherits nonmodal state, respects cancelable Escape/outside and restores trigger focus", async () => {
  const escape = vi.fn((event: Event) => event.preventDefault());
  const w = mount(DrawerRoot, {
    props: { modal: false },
    slots: {
      default: () => [
        h(DrawerTrigger, {}, () => "Open"),
        h(
          DrawerContent,
          { title: "Panel", onEscapeKeyDown: escape },
          () => "Body",
        ),
      ],
    },
    attachTo: document.body,
  });
  await w.find(".mn-drawer-trigger").trigger("click");
  await nextTick();
  expect(w.find(".mn-backdrop").exists()).toBe(false);
  expect(w.find('[role="dialog"]').attributes("aria-modal")).toBeUndefined();
  await w.find('[role="dialog"]').trigger("keydown", { key: "Escape" });
  expect(escape).toHaveBeenCalled();
  expect(w.find('[role="dialog"]').exists()).toBe(true);
  document.body.dispatchEvent(
    new Event("pointerdown", { bubbles: true, cancelable: true }),
  );
  await nextTick();
  await nextTick();
  expect(w.find('[role="dialog"]').exists()).toBe(false);
  expect(document.activeElement).toBe(w.find(".mn-drawer-trigger").element);
  w.unmount();
});
it("overlay dismissal can be canceled and loading prevents closing", async () => {
  const w = mount(Drawer, {
    props: {
      defaultOpen: true,
      onPointerDownOutside: (event: Event) => event.preventDefault(),
    },
  });
  await w.find('[data-part="backdrop"]').trigger("click");
  expect(w.emitted("openChange")).toBeUndefined();
  await w.setProps({ loading: true });
  await w.find('[role="dialog"]').trigger("keydown", { key: "Escape" });
  expect(w.emitted("openChange")).toBeUndefined();
});
