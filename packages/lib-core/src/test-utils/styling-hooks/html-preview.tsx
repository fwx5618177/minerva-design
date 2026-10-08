import { HtmlPreview } from "../../components/HtmlPreview";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: <HtmlPreview title="Preview" html="<p>Hi</p>" />,
  },
] satisfies HookScenario[];
