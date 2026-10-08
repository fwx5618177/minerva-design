import { CommandDialog } from "../../components/Command";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

const items = [
  { id: "new", title: "New file", description: "Create a file", group: "File" },
  { id: "open", title: "Open file" },
];

export default [
  {
    name: "open, with results",
    element: <CommandDialog open items={items} onSelect={() => {}} />,
  },
  {
    name: "open, no result",
    element: <CommandDialog open items={[]} onSelect={() => {}} />,
  },
  {
    name: "closing (kept mounted by an exit transition)",
    element: <CommandDialog open items={items} onSelect={() => {}} />,
    setup: ({ view }) => {
      mockExitTransition('[role="dialog"]');
      view.rerender(
        <CommandDialog open={false} items={items} onSelect={() => {}} />,
      );
    },
  },
] satisfies HookScenario[];
