import { fireEvent } from "@testing-library/react";
import { ContextMenu } from "../../components/Menu";
import { mockExitTransition } from "./exitTransition";
import { menuEntries } from "./menu";
import type { HookScenario } from "./types";

export default [
  {
    name: "open at the pointer, small",
    element: (
      <ContextMenu items={menuEntries} size="small" aria-label="Actions">
        <div>Area</div>
      </ContextMenu>
    ),
    setup: ({ view }) => {
      fireEvent.contextMenu(view.getByText("Area"), {
        clientX: 10,
        clientY: 10,
      });
    },
  },
  {
    name: "keyboard: highlighted item, expanded submenu trigger",
    element: (
      <ContextMenu items={menuEntries} aria-label="Actions">
        <div>Area</div>
      </ContextMenu>
    ),
    setup: async ({ user, view }) => {
      fireEvent.contextMenu(view.getByText("Area"), {
        clientX: 10,
        clientY: 10,
      });
      // focus is on the first item: Share, then its submenu
      await user.keyboard("{ArrowDown}{ArrowRight}");
    },
  },
  {
    name: "disabled (closed)",
    element: (
      <ContextMenu items={menuEntries} disabled>
        <div>Area</div>
      </ContextMenu>
    ),
  },
  {
    name: "closing (exit transition)",
    element: (
      <ContextMenu items={menuEntries} aria-label="Actions">
        <div>Area</div>
      </ContextMenu>
    ),
    setup: async ({ user, view }) => {
      fireEvent.contextMenu(view.getByText("Area"), {
        clientX: 10,
        clientY: 10,
      });
      mockExitTransition('[role="menu"]');
      await user.keyboard("{Escape}");
    },
  },
] satisfies HookScenario[];
