import { h, ref } from "vue";
import { ConfirmDialog } from "../../components/Confirm";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

const closing = ref(true);

export default [
  {
    name: "open, danger, loading",
    render: () =>
      h(ConfirmDialog, {
        open: true,
        title: "Delete?",
        description: "This cannot be undone.",
        color: "danger",
        loading: true,
      }),
  },
  {
    name: "open, primary",
    render: () => h(ConfirmDialog, { open: true, title: "Save?" }),
  },
  {
    name: "open, warning",
    render: () =>
      h(ConfirmDialog, { open: true, title: "Continue?", color: "warning" }),
  },
  {
    name: "closing (exit transition)",
    render: () => h(ConfirmDialog, { open: closing.value, title: "Save?" }),
    setup: () => {
      mockExitTransition('[role="alertdialog"]');
      closing.value = false;
    },
  },
] satisfies HookScenario[];
