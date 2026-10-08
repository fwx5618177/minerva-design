import { List, ListItem } from "../../components/List";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <List density="compact">
        <ListItem primary="Row" />
      </List>
    ),
  },
] satisfies HookScenario[];
