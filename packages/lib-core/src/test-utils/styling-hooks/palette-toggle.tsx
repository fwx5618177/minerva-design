import { ThemeProvider } from "../../contexts/ThemeProvider";
import { PaletteToggle } from "../../components/ThemeToggle";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <ThemeProvider>
        <PaletteToggle />
      </ThemeProvider>
    ),
  },
  {
    name: "an active palette",
    element: (
      <ThemeProvider defaultPalette="editorial" disableStorage>
        <PaletteToggle />
      </ThemeProvider>
    ),
  },
] satisfies HookScenario[];
