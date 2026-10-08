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
] satisfies WcHookScenario[];
