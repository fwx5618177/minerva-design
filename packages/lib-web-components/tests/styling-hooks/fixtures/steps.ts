import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";
import { settle } from "../../utils";

const items = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C", disabled: true },
];
const withItems = (root: HTMLElement) => {
  root.querySelector<HTMLElement & { items: unknown }>("minerva-steps")!.items =
    items;
};

export default [
  {
    name: "read-only: complete, current and upcoming steps",
    html: `<minerva-steps value="b"></minerva-steps>`,
    setup: withItems,
  },
  {
    name: "navigable, keyboard: next step current, disabled step",
    html: `<minerva-steps value="a" navigable></minerva-steps>`,
    setup: async (root) => {
      withItems(root);
      await settle();
      const user = userEvent.setup();
      root
        .querySelector("minerva-steps")!
        .shadowRoot!.querySelector("button")!
        .focus();
      await user.keyboard("{Tab}{Enter}");
    },
  },
] satisfies WcHookScenario[];
