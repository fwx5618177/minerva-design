import { h } from "vue";
import ConfigProvider from "../../config/ConfigProvider.vue";
import { ThemeToggle } from "../../components/ThemeToggle";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(ConfigProvider, null, () => h(ThemeToggle)),
  },
] satisfies HookScenario[];
