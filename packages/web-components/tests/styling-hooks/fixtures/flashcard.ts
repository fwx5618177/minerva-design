import type { WcHookScenario } from "../types";

export default [
  {
    name: "front, labels, hint, footer",
    html: `<minerva-flashcard front="Capital of France?" back="Paris" show-hint><button slot="footer">Good</button></minerva-flashcard>`,
  },
  {
    name: "flipped, outline, small",
    html: `<minerva-flashcard front="Q" back="A" flipped variant="outline" size="small"></minerva-flashcard>`,
  },
  {
    name: "disabled, filled, large",
    html: `<minerva-flashcard front="Q" back="A" variant="filled" size="large" disabled></minerva-flashcard>`,
  },
  {
    name: "elevated, medium",
    html: `<minerva-flashcard front="Q" back="A"></minerva-flashcard>`,
  },
] satisfies WcHookScenario[];
