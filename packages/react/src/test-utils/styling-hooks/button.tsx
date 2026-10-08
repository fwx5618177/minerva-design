import { Button } from "../../components/Button";
import type { HookScenario } from "./types";

const Icon = () => <svg aria-hidden="true" />;

export default [
  { name: "default", element: <Button>Save</Button> },
  {
    name: "icons, active, every key",
    element: (
      <Button
        active
        shape="rounded"
        size="small"
        variant="ghost"
        color="danger"
        startIcon={<Icon />}
        endIcon={<Icon />}
      >
        Delete
      </Button>
    ),
  },
  { name: "loading", element: <Button loading>Saving</Button> },
  { name: "disabled", element: <Button disabled>Save</Button> },
] satisfies HookScenario[];
