import { ProgressIndicator } from "../../components/ProgressIndicator";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <ProgressIndicator /> },
  {
    name: "icon, label, every key",
    element: (
      <ProgressIndicator
        variant="bar"
        size="small"
        color="neutral"
        icon={<svg />}
        label="Uploading"
      />
    ),
  },
] satisfies HookScenario[];
