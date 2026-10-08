import type { WcHookScenario } from "../types";
import type { MinervaAutocomplete } from "../../../src/components/autocomplete/autocomplete";

const options = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "" },
];

const configure =
  (open: boolean, grouped = false) =>
  (root: HTMLElement) => {
    const el = root.querySelector<MinervaAutocomplete>("minerva-autocomplete")!;
    el.options = options;
    if (grouped) el.groupBy = (option) => option.group ?? "";
    el.open = open;
  };

export default [
  {
    name: "closed, label",
    html: `<minerva-autocomplete label="Food"></minerva-autocomplete>`,
    setup: configure(false),
  },
  {
    name: "open, grouped",
    html: `<minerva-autocomplete label="Food"></minerva-autocomplete>`,
    setup: configure(true, true),
  },
  {
    name: "open, empty",
    html: `<minerva-autocomplete label="Food" value="zzz"></minerva-autocomplete>`,
    setup: configure(true),
  },
  {
    name: "open, loading",
    html: `<minerva-autocomplete label="Food" loading></minerva-autocomplete>`,
    setup: configure(true),
  },
  {
    name: "disabled",
    html: `<minerva-autocomplete label="Food" disabled></minerva-autocomplete>`,
  },
  {
    name: "read-only",
    html: `<minerva-autocomplete label="Food" readonly></minerva-autocomplete>`,
  },
] satisfies WcHookScenario[];
