import userEvent from "@testing-library/user-event";
import type { MinervaCommandDialog } from "../../../src/components/command/command";
import type { WcHookScenario } from "../types";
import { settle } from "../../utils";

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
    name: "keyboard: highlighted item moved with ArrowDown",
    html: `<minerva-command-dialog open></minerva-command-dialog>`,
    setup: async (root) => {
      const el = root.querySelector<MinervaCommandDialog>(
        "minerva-command-dialog",
      )!;
      el.items = [
        { id: "new", title: "New file" },
        { id: "open", title: "Open file" },
      ];
      await settle();
      el.shadowRoot!.querySelector("input")!.focus();
      await userEvent.setup().keyboard("{ArrowDown}");
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
