import { Card, CardContent } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    element: (
      <Card>
        <CardContent>Text</CardContent>
      </Card>
    ),
  },
] satisfies HookScenario[];
