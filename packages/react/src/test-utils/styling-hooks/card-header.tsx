import { Card, CardHeader } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    element: (
      <Card>
        <CardHeader>Text</CardHeader>
      </Card>
    ),
  },
] satisfies HookScenario[];
