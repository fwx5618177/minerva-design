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
  {
    name: "toasts of every color, a loading toast",
    element: <ToastProvider />,
    setup: () => {
      toastStore.reset();
      act(() => {
        toast.info("Heads up", { duration: 0 });
        toast.warning("Careful", { duration: 0 });
        toast.danger("Failed", { duration: 0 });
        toast.loading("Uploading");
      });
    },
  },
  {
    name: "a closing toast (closed while leaving)",
    element: <ToastProvider />,
    setup: () => {
      toastStore.reset();
      act(() => {
        const id = toast({ title: "Bye", duration: 0 });
        // stays mounted with data-state="closed" during the exit animation
        toast.dismiss(id);
      });
    },
  },
] satisfies HookScenario[];
