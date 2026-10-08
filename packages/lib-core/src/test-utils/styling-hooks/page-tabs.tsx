import { PageTab, PageTabs } from "../../components/PageTabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "with actions",
    element: (
      <PageTabs
        aria-label="Open pages"
        activeValue="a"
        actions={<button type="button">Menu</button>}
      >
        <PageTab value="a" label="A" active />
      </PageTabs>
    ),
  },
] satisfies HookScenario[];
