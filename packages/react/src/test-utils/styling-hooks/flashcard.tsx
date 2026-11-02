import { Flashcard } from "../../components/Flashcard";
import type { HookScenario } from "./types";

export default [
  {
    name: "front, labels, hint, footer",
    element: (
      <Flashcard
        front="Capital of France?"
        back="Paris"
        showHint
        footer={<button type="button">Good</button>}
      />
    ),
  },
  {
    name: "flipped, outline, small",
    element: (
      <Flashcard
        front="Q"
        back="A"
        defaultFlipped
        variant="outline"
        size="small"
      />
    ),
  },
  {
    name: "disabled, filled, large",
    element: (
      <Flashcard front="Q" back="A" variant="filled" size="large" disabled />
    ),
  },
  {
    name: "elevated, medium",
    element: <Flashcard front="Q" back="A" variant="elevated" size="medium" />,
  },
] satisfies HookScenario[];
