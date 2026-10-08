import { LoadingState } from "../../components/LoadingState";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <LoadingState /> },
  { name: "small", element: <LoadingState size="small" label="Loading" /> },
] satisfies HookScenario[];
