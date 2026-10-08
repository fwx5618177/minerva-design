import { ConfirmDialog } from "../../components/Confirm";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

const noop = () => {};

export default [
  {
    name: "open, danger, loading",
    element: (
      <ConfirmDialog
        open
        onOpenChange={noop}
        onConfirm={noop}
        title="Delete?"
        description="This cannot be undone."
        color="danger"
        loading
      />
    ),
  },
  {
    name: "open, primary",
    element: (
      <ConfirmDialog open onOpenChange={noop} onConfirm={noop} title="Save?" />
    ),
  },
  {
    name: "open, warning",
    element: (
      <ConfirmDialog
        open
        onOpenChange={noop}
        onConfirm={noop}
        title="Continue?"
        color="warning"
      />
    ),
  },
  {
    name: "closing (exit transition)",
    element: (
      <ConfirmDialog open onOpenChange={noop} onConfirm={noop} title="Save?" />
    ),
    setup: ({ view }) => {
      mockExitTransition('[role="alertdialog"]');
      view.rerender(
        <ConfirmDialog
          open={false}
          onOpenChange={noop}
          onConfirm={noop}
          title="Save?"
        />,
      );
    },
  },
] satisfies HookScenario[];
