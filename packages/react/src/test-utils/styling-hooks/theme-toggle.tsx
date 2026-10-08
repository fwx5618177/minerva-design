import { ThemeProvider } from "../../contexts/ThemeProvider";
import { ThemeToggle } from "../../components/ThemeToggle";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    ),
  },
] satisfies HookScenario[];
