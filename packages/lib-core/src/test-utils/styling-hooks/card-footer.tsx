import { Card, CardFooter } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    element: (
      <Card>
        <CardFooter>Text</CardFooter>
      </Card>
    ),
  },
] satisfies HookScenario[];
