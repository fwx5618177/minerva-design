import type { WcHookScenario } from "../types";
import type { MinervaCascader } from "../../../src/components/cascader/cascader";

const options = [
  {
    value: "fr",
    label: "France",
    children: [{ value: "paris", label: "Paris" }],
  },
];

const configure =
  (open = false) =>
  (root: HTMLElement) => {
    const el = root.querySelector<MinervaCascader>("minerva-cascader")!;
    el.options = options;
    el.open = open;
  };

export default [
  {
    name: "closed, with a value",
    html: `<minerva-cascader label="City" value="fr,paris"></minerva-cascader>`,
    setup: configure(),
  },
  {
    name: "open",
    html: `<minerva-cascader label="City" value="fr,paris"></minerva-cascader>`,
    setup: configure(true),
  },
  {
    name: "disabled, invalid",
    html: `<minerva-cascader label="City" disabled invalid></minerva-cascader>`,
    setup: configure(),
  },
  {
    name: "read-only",
    html: `<minerva-cascader label="City" readonly></minerva-cascader>`,
    setup: configure(),
  },
] satisfies WcHookScenario[];
