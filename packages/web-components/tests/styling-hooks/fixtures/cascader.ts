import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";
import { settle } from "../../utils";
import type { MinervaCascader } from "../../../src/components/cascader/cascader";

const options = [
  {
    value: "fr",
    label: "France",
    children: [{ value: "paris", label: "Paris" }],
  },
];

/** Item states: disabled and loading (children loading) options */
const stateOptions = [
  ...options,
  { value: "de", label: "Germany", disabled: true },
  { value: "es", label: "Spain", isLeaf: false, loading: true },
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
    name: "keyboard: expanded, disabled and loading items",
    html: `<minerva-cascader label="City"></minerva-cascader>`,
    setup: async (root) => {
      const el = root.querySelector<MinervaCascader>("minerva-cascader")!;
      el.options = stateOptions;
      await settle();
      const user = userEvent.setup();
      el.shadowRoot!.querySelector("input")!.focus();
      // opens on France, then shows its children
      await user.keyboard("{Enter}");
      await settle();
      await user.keyboard("{ArrowRight}");
    },
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
