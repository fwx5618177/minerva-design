import type { WcHookScenario } from "../types";

export default [
  {
    name: "open, danger, loading",
    html: `<minerva-confirm-dialog open label="Delete?" description="This cannot be undone." color="danger" loading></minerva-confirm-dialog>`,
  },
  {
    name: "open, primary, extra content",
    html: `<minerva-confirm-dialog open label="Save?"><p>Details</p></minerva-confirm-dialog>`,
  },
  {
    name: "open, warning",
    html: `<minerva-confirm-dialog open label="Continue?" color="warning"></minerva-confirm-dialog>`,
  },
  {
    name: "closed",
    html: `<minerva-confirm-dialog label="Save?"></minerva-confirm-dialog>`,
  },
] satisfies WcHookScenario[];
