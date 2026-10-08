import { Card, CardDescription } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    element: (
      <Card>
        <CardDescription>Text</CardDescription>
      </Card>
    ),
  },
] satisfies HookScenario[];
