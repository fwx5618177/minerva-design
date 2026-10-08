import { h, ref } from "vue";
import { CommandDialog } from "../../components/Command";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

const items = [
  { id: "new", title: "New file", description: "Create a file", group: "File" },
  { id: "open", title: "Open file" },
];
const closing = ref(true);

export default [
  {
    name: "open, with results",
    render: () => h(CommandDialog, { open: true, items }),
  },
  {
    name: "keyboard: highlighted item moved with ArrowDown",
    render: () => h(CommandDialog, { open: true, items }),
    setup: async ({ user }) => {
      document.querySelector<HTMLElement>('[role="combobox"]')!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "open, no result",
    render: () => h(CommandDialog, { open: true, items: [] }),
  },
  {
    name: "closing (kept mounted by an exit transition)",
    render: () => h(CommandDialog, { open: closing.value, items }),
    setup: () => {
      mockExitTransition('[role="dialog"]');
      closing.value = false;
    },
  },
] satisfies HookScenario[];
