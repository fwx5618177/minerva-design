import { Alert } from "../../components/Alert";
import type { HookScenario } from "./types";

export default [
  {
    name: "every part, expanded",
    element: (
      <Alert
        title="Saved"
        collapsible
        closable
        action={<a href="/undo">Undo</a>}
        color="success"
        variant="solid"
        size="small"
      >
        Your changes were saved.
      </Alert>
    ),
  },
  {
    name: "collapsed",
    element: (
      <Alert title="Details" collapsible defaultExpanded={false}>
        More
      </Alert>
    ),
  },
] satisfies HookScenario[];
