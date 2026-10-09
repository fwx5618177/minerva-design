import { Component } from "@angular/core";
import { MnTextarea } from "../../components/textarea";
import type { HookScenario } from "../types";

@Component({
  imports: [MnTextarea],
  template: `<textarea
    mnTextarea
    aria-label="Bio"
    size="large"
    variant="filled"
    required
  ></textarea>`,
})
class Keys {}

@Component({
  imports: [MnTextarea],
  template: `<textarea
    mnTextarea
    aria-label="Bio"
    invalid
    readOnly
  ></textarea>`,
})
class Invalid {}

@Component({
  imports: [MnTextarea],
  template: `<textarea mnTextarea aria-label="Bio" disabled></textarea>`,
})
class Disabled {}

export default [
  { name: "every key, required", component: Keys },
  { name: "invalid, read-only", component: Invalid },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
