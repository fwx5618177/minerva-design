import { h } from "vue";
import { TextLink } from "../../components/TextLink";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(TextLink, { href: "/docs" }, () => "Docs"),
  },
  {
    name: "subtle",
    render: () =>
      h(TextLink, { href: "/docs", variant: "subtle" }, () => "Docs"),
  },
  {
    name: "action, asChild",
    render: () =>
      h(TextLink, { variant: "action", asChild: true }, () =>
        h("a", { href: "/docs" }, "Docs"),
      ),
  },
] satisfies HookScenario[];
