import { h } from "vue";
import { Flashcard } from "../../components/Flashcard";
import type { HookScenario } from "./types";

export default [
  {
    name: "front, labels, hint, footer",
    render: () =>
      h(
        Flashcard,
        { front: "Capital of France?", back: "Paris", showHint: true },
        { footer: () => h("button", { type: "button" }, "Good") },
      ),
  },
  {
    name: "flipped, outline, small",
    render: () =>
      h(Flashcard, {
        front: "Q",
        back: "A",
        defaultFlipped: true,
        variant: "outline",
        size: "small",
      }),
  },
  {
    name: "disabled, filled, large",
    render: () =>
      h(Flashcard, {
        front: "Q",
        back: "A",
        variant: "filled",
        size: "large",
        disabled: true,
      }),
  },
  {
    name: "elevated, medium",
    render: () => h(Flashcard, { front: "Q", back: "A", variant: "elevated" }),
  },
] satisfies HookScenario[];
