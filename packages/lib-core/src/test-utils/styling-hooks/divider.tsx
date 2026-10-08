import { Divider } from "../../components/Divider";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <Divider /> },
  {
    name: "with text, every key",
    element: (
      <Divider variant="dashed" textAlign="left">
        Or
      </Divider>
    ),
  },
  { name: "vertical", element: <Divider orientation="vertical" /> },
] satisfies HookScenario[];
