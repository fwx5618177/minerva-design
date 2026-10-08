import { GridItem } from "../../components/ResponsiveGrid";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <GridItem fullWidth>A</GridItem> },
  {
    name: "asChild",
    element: (
      <GridItem asChild>
        <section>A</section>
      </GridItem>
    ),
  },
] satisfies HookScenario[];
