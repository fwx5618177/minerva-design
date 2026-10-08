import { h, nextTick } from "vue";
import { ToastProvider, toast } from "../../components/Toast";
import { toastStore } from "../../components/Toast/store";
import type { HookScenario } from "./types";

// Every scenario starts from an empty store (the module level queue outlives
// the unmounted provider of the previous scenario).
export default [
  {
    name: "a timed toast with every part",
    render: () => h(ToastProvider),
    setup: async () => {
      toastStore.reset();
      toast.success("Saved", {
        description: "All changes saved",
        duration: 60_000,
        action: { label: "Undo", onClick: () => {} },
      });
      await nextTick();
    },
  },
  {
    name: "toasts of every color, a loading toast",
    render: () => h(ToastProvider),
    setup: async () => {
      toastStore.reset();
      toast.info("Heads up", { duration: 0 });
      toast.warning("Careful", { duration: 0 });
      toast.danger("Failed", { duration: 0 });
      toast.loading("Uploading");
      await nextTick();
    },
  },
  {
    name: "a closing toast (closed while leaving)",
    render: () => h(ToastProvider),
    setup: async () => {
      toastStore.reset();
      const id = toast({ title: "Bye", duration: 0 });
      // stays mounted with data-state="closed" during the exit animation
      toast.dismiss(id);
      await nextTick();
    },
  },
] satisfies HookScenario[];
