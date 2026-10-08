import { Component } from "@angular/core";
import { MnSwitch } from "../../components/switch";
import type { HookScenario } from "../types";

@Component({
  imports: [MnSwitch],
  template: ` <ng-template #icon><svg aria-hidden="true"></svg></ng-template>
    <mn-switch
      label="Wi-Fi"
      [icon]="icon"
      defaultChecked
      size="small"
      color="success"
      shape="square"
    />`,
})
class Labelled {}

@Component({
  imports: [MnSwitch],
  template: ` <ng-template #icon><svg aria-hidden="true"></svg></ng-template>
    <mn-switch
      aria-label="Mode"
      offLabel="Off"
      onLabel="On"
      [icon]="icon"
      iconPlacement="end"
      loading
    />`,
})
class Sides {}

@Component({
  imports: [MnSwitch],
  template: `<mn-switch aria-label="Wi-Fi" disabled />`,
})
class Disabled {}

export default [
  { name: "label, icon in the thumb, checked, every key", component: Labelled },
  { name: "side labels, icon after the slider, loading", component: Sides },
  { name: "disabled", component: Disabled },
] satisfies HookScenario[];
