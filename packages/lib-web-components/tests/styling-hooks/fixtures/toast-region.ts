import { toast, toastStore } from "../../../src/elements/toast";
import type { WcHookScenario } from "../types";

export default [
  {
    name: "a timed toast with every part",
    html: `<minerva-toast-region></minerva-toast-region>`,
    setup: () => {
      toastStore.reset();
      toast.success("Saved", {
        description: "All changes saved",
        duration: 60_000,
        action: { label: "Undo", onClick: () => {} },
      });
    },
  },
  {
    name: "toasts of every color, a loading toast",
    html: `<minerva-toast-region></minerva-toast-region>`,
    setup: () => {
      toastStore.reset();
      toast.info("Heads up", { duration: 0 });
      toast.warning("Careful", { duration: 0 });
      toast.danger("Failed", { duration: 0 });
      toast.loading("Uploading");
    },
  },
  {
    name: "a closing toast (closed while leaving)",
    html: `<minerva-toast-region></minerva-toast-region>`,
    setup: () => {
      toastStore.reset();
      const id = toast({ title: "Bye", duration: 0 });
      // stays rendered with the toast--closed part during the exit animation
      toast.dismiss(id);
    },
  },
] satisfies WcHookScenario[];
