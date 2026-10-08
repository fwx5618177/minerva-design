import { h } from "vue";
import { Steps } from "../../components/Steps";
import type { HookScenario } from "./types";

const items = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C", disabled: true },
];

export default [
  {
    name: "read-only: complete, current and upcoming steps",
    render: () => h(Steps, { items, modelValue: "b" }),
  },
  {
    name: "navigable, keyboard: next step current, disabled step",
    render: () => h(Steps, { items, defaultValue: "a", onChange: () => {} }),
    setup: async ({ user, container }) => {
      container.querySelector<HTMLButtonElement>("button")!.focus();
      await user.keyboard("{Tab}{Enter}");
    },
  },
] satisfies HookScenario[];
