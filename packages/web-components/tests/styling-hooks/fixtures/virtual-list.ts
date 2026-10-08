import type { WcHookScenario } from "../types";

export default [
  {
    name: "rows, loading",
    html: `<minerva-virtual-list aria-label="Rows" item-height="20" loading></minerva-virtual-list>`,
    setup: (root) => {
      root.querySelector<HTMLElement & { items: unknown }>(
        "minerva-virtual-list",
      )!.items = [{ id: 1 }, { id: 2 }];
    },
  },
] satisfies WcHookScenario[];
