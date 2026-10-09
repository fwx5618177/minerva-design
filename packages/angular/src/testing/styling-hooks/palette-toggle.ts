import { Component } from "@angular/core";
import { MnPaletteToggle } from "../../components/navigation";
import type { HookScenario } from "../types";
@Component({ imports: [MnPaletteToggle], template: `<mn-palette-toggle />` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
