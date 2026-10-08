import { RatingScale } from "../../components/Rating";
import type { HookScenario } from "./types";

const dimensions = [
  { key: "plot", label: "Plot", value: 8 },
  { key: "writing", label: "Writing", value: 6 },
];

export default [
  {
    name: "display-only, every key",
    element: <RatingScale dimensions={dimensions} size="large" />,
  },
  {
    name: "interactive",
    element: <RatingScale dimensions={dimensions} onChange={() => {}} />,
  },
] satisfies HookScenario[];
