import { VStack } from "../../components/Stack";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <VStack gap={2}>A</VStack> },
] satisfies HookScenario[];
