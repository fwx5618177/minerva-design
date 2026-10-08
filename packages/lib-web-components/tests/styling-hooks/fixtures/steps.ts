import type { WcHookScenario } from "../types";

const items = [
  { value: "a", label: "A" },
  { value: "b", label: "B", disabled: true },
];
const withItems = (root: HTMLElement) => {
  root.querySelector<HTMLElement & { items: unknown }>("minerva-steps")!.items =
    items;
};

export default [
  {
    name: "read-only",
    html: `<minerva-steps value="a"></minerva-steps>`,
    setup: withItems,
  },
  {
    name: "navigable",
    html: `<minerva-steps value="a" navigable></minerva-steps>`,
    setup: withItems,
  },
] satisfies WcHookScenario[];
