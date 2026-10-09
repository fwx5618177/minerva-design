import { mount } from "@vue/test-utils";
import { it, expect, vi } from "vitest";
import { nextTick } from "vue";
import CommandDialog from "./CommandDialog.vue";
import type { CommandItem } from "./command-types";
const items: CommandItem[] = [
  { id: "a", title: "Alpha" },
  { id: "b", title: "Beta", group: "Tools" },
  { id: "x", title: "Hidden", disabled: true },
];
it("Command custom ranking gets enabled items and trimmed query, keyboard activation returns original item and resets on reopen", async () => {
  const filter = vi.fn((enabled: typeof items) => enabled.slice().reverse());
  const w = mount(CommandDialog, {
    props: {
      defaultOpen: true,
      items,
      filter,
      placeholder: "Find",
      description: "Commands",
      resultsLabel: "Matches",
      enterLabel: "Choose",
    },
  });
  const input = w.find("input");
  await input.trigger("input", { detail: { value: "  custom  " } });
  expect(filter).toHaveBeenCalledWith(items.slice(0, 2), "custom");
  expect(w.findAll('[role="option"]')[0].text()).toContain("Beta");
  await input.trigger("keydown", { key: "ArrowDown" });
  await input.trigger("confirm");
  expect(w.emitted("select")).toEqual([[items[0]]]);
  expect(w.find('[role="dialog"]').exists()).toBe(false);
  (w.vm as unknown as { open: () => void }).open();
  await nextTick();
  expect((w.find("input").element as HTMLInputElement).value).toBe("");
  expect(w.findAll('[role="option"]')[0].text()).toContain("Alpha");
  w.unmount();
});
it("Command global shortcuts respect editable text and owner rejection and remove listener on unmount", async () => {
  const changed = vi.fn();
  const w = mount(CommandDialog, {
    props: {
      onOpenChange: changed,
      open: false,
      items,
      shortcut: ["/", "ctrl+k"],
    },
    attachTo: document.body,
  });
  const input = document.createElement("input");
  document.body.append(input);
  input.dispatchEvent(
    new KeyboardEvent("keydown", { key: "/", bubbles: true, cancelable: true }),
  );
  expect(w.emitted("openChange")).toBeUndefined();
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    }),
  );
  await nextTick();
  expect(w.emitted("openChange")).toEqual([[true]]);
  expect(w.find('[role="dialog"]').exists()).toBe(false);
  w.unmount();
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
  );
  expect(changed).toHaveBeenCalledTimes(1);
  input.remove();
});
