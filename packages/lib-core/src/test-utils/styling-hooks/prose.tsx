import { Prose } from "../../components/Prose";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <Prose>
        <p>Text</p>
      </Prose>
    ),
  },
  {
    name: "asChild",
    element: (
      <Prose asChild>
        <article>Text</article>
      </Prose>
    ),
  },
] satisfies HookScenario[];
