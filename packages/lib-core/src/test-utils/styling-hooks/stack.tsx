import { Stack } from "../../components/Stack";
import type { HookScenario } from "./types";

export default [
  { name: "column", element: <Stack gap={2}>A</Stack> },
  {
    name: "row, separator",
    element: (
      <Stack direction="row-reverse" separator="·">
        <span>A</span>
        <span>B</span>
      </Stack>
    ),
  },
] satisfies HookScenario[];
