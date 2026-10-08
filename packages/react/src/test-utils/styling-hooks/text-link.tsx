import { TextLink } from "../../components/TextLink";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <TextLink href="/docs">Docs</TextLink> },
  {
    name: "subtle",
    element: (
      <TextLink href="/docs" variant="subtle">
        Docs
      </TextLink>
    ),
  },
  {
    name: "action, asChild",
    element: (
      <TextLink variant="action" asChild>
        <a href="/docs">Docs</a>
      </TextLink>
    ),
  },
] satisfies HookScenario[];
