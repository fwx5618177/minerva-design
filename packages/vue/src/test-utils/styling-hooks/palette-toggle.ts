import { h } from "vue";
import ConfigProvider from "../../config/ConfigProvider.vue";
import { PaletteToggle } from "../../components/ThemeToggle";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(ConfigProvider, null, () => h(PaletteToggle)),
  },
  {
    name: "an active palette",
    render: () =>
      h(ConfigProvider, { palette: "editorial" }, () => h(PaletteToggle)),
  },
] satisfies HookScenario[];
