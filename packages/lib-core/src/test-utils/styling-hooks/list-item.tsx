import { List, ListItem } from "../../components/List";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    element: (
      <List>
        <ListItem
          primary="Primary"
          secondary="Secondary"
          icon={<svg />}
          actions={<span>Action</span>}
        />
      </List>
    ),
  },
  {
    name: "primary only",
    element: (
      <List>
        <ListItem primary="Primary" />
      </List>
    ),
  },
] satisfies HookScenario[];
