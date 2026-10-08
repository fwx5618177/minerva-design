import type { WcHookScenario } from "../types";
import { menuEntries } from "./menu";

export default [
  {
    name: "open at the pointer, small",
    html: `<minerva-context-menu size="small" aria-label="Actions">
      <div id="area">Area</div>${menuEntries}
    </minerva-context-menu>`,
    setup: (root) => {
      root.querySelector("#area")!.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          composed: true,
          clientX: 10,
          clientY: 10,
        }),
      );
    },
  },
  {
    name: "disabled (closed)",
    html: `<minerva-context-menu disabled>
      <div>Area</div>${menuEntries}
    </minerva-context-menu>`,
  },
] satisfies WcHookScenario[];
