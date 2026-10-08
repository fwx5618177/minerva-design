import { h } from "vue";
import { ContextMenu } from "../../components/Menu";
import { mockExitTransition } from "./exitTransition";
import { menuEntries } from "./menu";
import type { HookScenario } from "./types";

const area = () => h("div", { class: "area" }, "Area");

const openAtPointer = (container: HTMLElement) =>
  container.querySelector(".area")!.dispatchEvent(
    new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      clientX: 10,
      clientY: 10,
    }),
  );

export default [
  {
    name: "open at the pointer, small",
    render: () =>
      h(
        ContextMenu,
        { items: menuEntries, size: "small", ariaLabel: "Actions" },
        area,
      ),
    setup: ({ container }) => {
      openAtPointer(container);
    },
  },
  {
    name: "keyboard: highlighted item, expanded submenu trigger",
    render: () =>
      h(ContextMenu, { items: menuEntries, ariaLabel: "Actions" }, area),
    setup: async ({ user, container }) => {
      openAtPointer(container);
      await new Promise((resolve) => setTimeout(resolve, 0));
      // focus is on the first item: Share, then its submenu
      await user.keyboard("{ArrowDown}{ArrowRight}");
    },
  },
  {
    name: "disabled (closed)",
    render: () => h(ContextMenu, { items: menuEntries, disabled: true }, area),
  },
  {
    name: "closing (exit transition)",
    render: () =>
      h(ContextMenu, { items: menuEntries, ariaLabel: "Actions" }, area),
    setup: async ({ user, container }) => {
      openAtPointer(container);
      await new Promise((resolve) => setTimeout(resolve, 0));
      mockExitTransition('[role="menu"]');
      await user.keyboard("{Escape}");
    },
  },
] satisfies HookScenario[];
