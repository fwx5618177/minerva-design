import { act } from "@testing-library/react";
import { ToastProvider, toast } from "../../components/Toast";
import { toastStore } from "../../components/Toast/store";
import type { HookScenario } from "./types";

export default [
  {
    name: "a timed toast with every part",
    element: <ToastProvider />,
    setup: () => {
      toastStore.reset();
      act(() => {
        toast.success("Saved", {
          description: "All changes saved",
          duration: 60_000,
          action: { label: "Undo", onClick: () => {} },
        });
      });
    },
  },
] satisfies HookScenario[];
