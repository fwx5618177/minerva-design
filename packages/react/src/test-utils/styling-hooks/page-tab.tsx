import { PageTab, PageTabs } from "../../components/PageTabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "current, disabled, icon, action",
    element: (
      <PageTabs aria-label="Open pages" activeValue="a">
        <PageTab value="a" label="A" active icon={<svg />} />
        <PageTab
          value="b"
          label="B"
          disabled
          action={<button type="button">x</button>}
        />
      </PageTabs>
    ),
  },
] satisfies HookScenario[];
