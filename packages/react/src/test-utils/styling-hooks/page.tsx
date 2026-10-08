import { Page } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <Page maxWidth={960}>Content</Page> },
] satisfies HookScenario[];
