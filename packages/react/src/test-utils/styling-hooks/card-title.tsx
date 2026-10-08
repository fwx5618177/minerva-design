import { Card, CardTitle } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    element: (
      <Card>
        <CardTitle>Text</CardTitle>
      </Card>
    ),
  },
] satisfies HookScenario[];
