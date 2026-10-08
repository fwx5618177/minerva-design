import { Rating } from "../../components/Rating";
import type { HookScenario } from "./types";

export default [
  {
    name: "display-only, half star, value and count",
    element: <Rating value={7} showValue ratingCount={120} size="small" />,
  },
  {
    name: "interactive",
    element: <Rating value={4} onChange={() => {}} />,
  },
] satisfies HookScenario[];
