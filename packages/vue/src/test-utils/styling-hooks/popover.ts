import { h } from "vue";
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
    render: () =>
      h(Popover, { defaultOpen: true }, () => [
        h(PopoverTrigger, null, () => "Open"),
        h(
          PopoverContent,
          { arrow: true, side: "top", align: "start" },
          () => "Content",
        ),
      ]),
  },
  {
    name: "closing (exit transition)",
    render: () =>
      h(Popover, { defaultOpen: true }, () => [
        h(PopoverTrigger, null, () => "Open"),
        h(PopoverContent, null, () => "Content"),
      ]),
    setup: async ({ user }) => {
      mockExitTransition('[role="dialog"]');
      const trigger = document.querySelector<HTMLElement>(
        '[data-minerva="popover"][data-part="trigger"]',
      )!;
      await user.click(trigger);
    },
  },
] satisfies HookScenario[];
