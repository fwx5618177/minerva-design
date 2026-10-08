import { Steps } from "../../components/Steps";
import type { HookScenario } from "./types";

const items = [
  { value: "a", label: "A" },
  { value: "b", label: "B", disabled: true },
];

export default [
  { name: "read-only", element: <Steps items={items} value="a" /> },
  {
    name: "navigable",
    element: <Steps items={items} defaultValue="a" onChange={() => {}} />,
  },
] satisfies HookScenario[];
