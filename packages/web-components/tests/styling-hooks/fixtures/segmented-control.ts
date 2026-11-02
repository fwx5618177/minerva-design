import type { WcHookScenario } from "../types";
import type { MinervaSegmentedControl } from "../../../src/components/segmented-control/segmented-control";

export default [
  {
    name: "selected, disabled segment, icon and label",
    html: `<minerva-segmented-control aria-label="View" value="list"></minerva-segmented-control>`,
    setup: (root) => {
      root.querySelector<MinervaSegmentedControl>(
        "minerva-segmented-control",
      )!.options = [
        { value: "list", label: "List", icon: "≡" },
        { value: "grid", label: "Grid" },
        { value: "map", label: "Map", disabled: true },
      ];
    },
  },
  {
    name: "disabled, primary, sizes",
    html: `<minerva-segmented-control aria-label="Small" options="a,b" value="a" size="small" color="primary" disabled></minerva-segmented-control><minerva-segmented-control aria-label="Large" options="a,b" value="b" size="large" full-width></minerva-segmented-control>`,
  },
] satisfies WcHookScenario[];
