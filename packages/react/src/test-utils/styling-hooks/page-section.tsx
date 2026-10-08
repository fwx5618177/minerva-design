import { PageSection } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    element: (
      <PageSection
        title="Title"
        description="Description"
        icon={<svg />}
        actions={<span>Action</span>}
      >
        Content
      </PageSection>
    ),
  },
] satisfies HookScenario[];
