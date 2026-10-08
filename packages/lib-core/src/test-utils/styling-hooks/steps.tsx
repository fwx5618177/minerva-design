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
    element: <Steps items={items} value="b" />,
  },
  {
    name: "navigable, keyboard: next step current, disabled step",
    element: <Steps items={items} defaultValue="a" onChange={() => {}} />,
    setup: async ({ user, view }) => {
      view.getByRole("button", { name: /A/ }).focus();
      await user.keyboard("{Tab}{Enter}");
    },
  },
] satisfies HookScenario[];
