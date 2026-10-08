import type { MinervaCommandDialog } from "../../../src/components/command/command";
import type { WcHookScenario } from "../types";

export default [
  {
    name: "open, with results",
    html: `<minerva-command-dialog open></minerva-command-dialog>`,
    setup: (root) => {
      root.querySelector<MinervaCommandDialog>(
        "minerva-command-dialog",
      )!.items = [
        { id: "new", title: "New file", description: "Create a file" },
        { id: "open", title: "Open file", group: "File" },
      ];
    },
  },
  {
    name: "open, no result",
    html: `<minerva-command-dialog open></minerva-command-dialog>`,
  },
  {
    name: "closed",
    html: `<minerva-command-dialog></minerva-command-dialog>`,
  },
] satisfies WcHookScenario[];
