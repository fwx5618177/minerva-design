import { Component } from "@angular/core";
import { MnThemeToggle } from "../../components/navigation";
import type { HookScenario } from "../types";
@Component({ imports: [MnThemeToggle], template: `<mn-theme-toggle />` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
