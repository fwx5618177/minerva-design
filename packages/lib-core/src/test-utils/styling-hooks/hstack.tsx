import { HStack } from "../../components/Stack";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <HStack gap={2}>A</HStack> },
] satisfies HookScenario[];
