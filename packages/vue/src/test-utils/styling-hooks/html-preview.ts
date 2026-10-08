import { h } from "vue";
import { HtmlPreview } from "../../components/HtmlPreview";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(HtmlPreview, { title: "Preview", html: "<p>Hi</p>" }),
  },
] satisfies HookScenario[];
