import { PageHeader } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    element: (
      <PageHeader
        title="Title"
        description="Description"
        actions={<span>Action</span>}
      />
    ),
  },
  { name: "title only", element: <PageHeader title="Title" /> },
] satisfies HookScenario[];
