import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/Popover";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

export default [
  {
    name: "open, with arrow",
    element: (
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent arrow side="top" align="start">
          Content
        </PopoverContent>
      </Popover>
    ),
  },
  {
    name: "closing (exit transition)",
    element: (
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    ),
    setup: async ({ user, view }) => {
      mockExitTransition('[role="dialog"]');
      await user.click(view.getByRole("button", { name: "Open" }));
    },
  },
] satisfies HookScenario[];
