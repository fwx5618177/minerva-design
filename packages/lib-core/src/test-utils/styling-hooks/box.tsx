import { Box } from "../../components/Box";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <Box p={2}>Content</Box> },
  { name: "as", element: <Box as="section">Content</Box> },
] satisfies HookScenario[];
