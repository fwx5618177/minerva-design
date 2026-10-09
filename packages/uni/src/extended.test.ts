import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { expect, it, vi } from "vitest";
import * as C from "./index";
const names = [
  "ConfirmDialog",
  "ConfirmProvider",
  "ContextMenu",
  "GridItem",
  "PaletteToggle",
  "PopoverAnchor",
  "PopoverContent",
  "PopoverTrigger",
  "SkeletonText",
  "ToastProvider",
  "TooltipProvider",
];
it.each(names)("%s exports a concrete native component", (name) =>
  expect((C as Record<string, unknown>)[name]).toBeTruthy(),
);
it("popover compound trigger/content/close coordinate controlled state", async () => {
  const w = mount(
    defineComponent({
      components: { ...C },
      template:
        "<Popover><PopoverAnchor><PopoverTrigger>Open</PopoverTrigger></PopoverAnchor><PopoverContent>Details<PopoverClose>Close</PopoverClose></PopoverContent></Popover>",
    }),
  );
  expect(w.find(".mn-popup").exists()).toBe(false);
  await w.find(".mn-popover-trigger").trigger("click");
  expect(w.find(".mn-popup").text()).toContain("Details");
  await w.find(".mn-popover-close").trigger("click");
  expect(w.find(".mn-popup").exists()).toBe(false);
});
it("confirm provider renders queued requests and settles each once", async () => {
  const w = mount(C.ConfirmProvider);
  const first = C.confirm({ title: "Delete?" }),
    second = C.confirm({ title: "Archive?" });
  await nextTick();
  expect(w.text()).toContain("Delete?");
  await w.find('[data-action="confirm"]').trigger("click");
  await expect(first).resolves.toBe(true);
  expect(w.text()).toContain("Archive?");
  await w.find('[data-action="cancel"]').trigger("click");
  await expect(second).resolves.toBe(false);
  w.unmount();
});
it("toast provider supports upsert, actions, limits and timer cleanup", async () => {
  vi.useFakeTimers();
  const close = vi.fn(),
    action = vi.fn();
  const w = mount(C.ToastProvider, { props: { max: 2 } });
  const id = C.toast({
    id: "save",
    title: "Saving",
    loading: true,
    onClose: close,
  });
  C.toast.update(id, {
    title: "Saved",
    loading: false,
    duration: 100,
    action: { label: "Undo", onClick: action },
  });
  await nextTick();
  expect(w.text()).toContain("Saved");
  await w.find(".mn-toast-action").trigger("click");
  expect(action).toHaveBeenCalledOnce();
  expect(close).toHaveBeenCalledOnce();
  C.toast({ title: "One", duration: 100 });
  C.toast({ title: "Two", duration: 100 });
  C.toast({ title: "Three", duration: 100 });
  await nextTick();
  expect(w.findAll(".mn-toast")).toHaveLength(2);
  vi.advanceTimersByTime(100);
  await nextTick();
  expect(w.findAll(".mn-toast")).toHaveLength(0);
  w.unmount();
  vi.useRealTimers();
});
it("palette changes the enclosing provider and grid/skeleton expose native layout", async () => {
  const w = mount(
    defineComponent({
      components: { ...C },
      template:
        '<ThemeProvider disable-storage default-theme="dark"><PaletteToggle show-default/><GridItem full-width><SkeletonText :lines="3"/></GridItem></ThemeProvider>',
    }),
  );
  await w.find('[data-palette="tech"]').trigger("click");
  expect(w.find(".mn-provider").classes()).toContain("mn-palette-tech-dark");
  expect(w.find(".mn-grid-item").attributes("style")).toContain(
    "grid-column: 1 / -1",
  );
  expect(w.findAll(".mn-skeleton-decorative")).toHaveLength(3);
});
it("context menu long press selects enabled action and closes", async () => {
  const w = mount(C.ContextMenu, {
    props: {
      items: [
        { value: "edit", label: "Edit" },
        { value: "delete", label: "Delete", disabled: true },
      ],
    },
    slots: { default: "Record" },
  });
  await w.find(".mn-context-area").trigger("longpress");
  expect(w.find(".mn-menu").exists()).toBe(true);
  await w.findAll(".mn-option")[1]!.trigger("click");
  expect(w.emitted("select")).toBeUndefined();
  await w.findAll(".mn-option")[0]!.trigger("click");
  expect(w.emitted("select")).toEqual([[{ value: "edit", label: "Edit" }]]);
  expect(w.find(".mn-menu").exists()).toBe(false);
});
it("TooltipProvider supplies enter and leave delays to descendants", async () => {
  vi.useFakeTimers();
  const w = mount(C.TooltipProvider, {
    props: { enterDelay: 100, leaveDelay: 50 },
    slots: {
      default: () =>
        h(C.Tooltip, { content: "Help" }, () => h("span", "Target")),
    },
  });
  await w.find(".mn-popover-trigger").trigger("mouseenter");
  vi.advanceTimersByTime(99);
  await nextTick();
  expect(w.find(".mn-tooltip").exists()).toBe(false);
  vi.advanceTimersByTime(1);
  await nextTick();
  expect(w.find(".mn-tooltip").text()).toContain("Help");
  await w.find(".mn-popover-trigger").trigger("mouseleave");
  vi.advanceTimersByTime(50);
  await nextTick();
  expect(w.find(".mn-tooltip").exists()).toBe(false);
  w.unmount();
  vi.useRealTimers();
});
it("Monaco browser editor is not exported as a fake native textarea", () =>
  expect((C as Record<string, unknown>).MonacoCodeEditor).toBeUndefined());
it("checkbox and switch keep uncontrolled state and reject controlled updates without losing semantics", async () => {
  const checkbox = mount(C.Checkbox, { props: { defaultChecked: true } });
  expect(checkbox.attributes("role")).toBe("checkbox");
  expect(checkbox.attributes("aria-checked")).toBe("true");
  await checkbox.trigger("click");
  expect(checkbox.attributes("aria-checked")).toBe("false");
  const controlled = mount(C.Checkbox, { props: { checked: false } });
  await controlled.trigger("click");
  expect(controlled.emitted("change")).toEqual([[true]]);
  expect(controlled.attributes("aria-checked")).toBe("false");
  const toggle = mount(C.Switch, { props: { defaultChecked: true } });
  expect(toggle.get('[role="switch"]').attributes("aria-checked")).toBe("true");
  await toggle.get("input").setValue(false);
  expect(toggle.get('[role="switch"]').attributes("aria-checked")).toBe(
    "false",
  );
  await toggle.setProps({ checked: true });
  await toggle.get("input").setValue(false);
  expect(toggle.get('[role="switch"]').attributes("aria-checked")).toBe("true");
});
