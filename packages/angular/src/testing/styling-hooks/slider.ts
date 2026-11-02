import { Component } from "@angular/core";
import { MnSlider } from "../../components/slider";
import { MnFormControl } from "../../components/form-control";
import type { HookScenario } from "../types";

@Component({
  imports: [MnSlider, MnFormControl],
  template: `<mn-slider
      aria-label="Volume"
      [defaultValue]="40"
      [marks]="[{ value: 0, label: '0' }, { value: 50 }, { value: 100 }]"
      showValue
      tooltip
      name="volume"
    /><mn-slider
      aria-label="Price"
      range
      [defaultValue]="[20, 80]"
      size="small"
    /><mn-slider
      aria-label="Level"
      orientation="vertical"
      size="large"
      color="success"
    /><mn-slider aria-label="c" color="info" /><mn-slider
      aria-label="c"
      color="warning"
    /><mn-slider aria-label="c" color="danger" /><mn-slider
      aria-label="d"
      disabled
    /><mn-slider aria-label="r" readOnly /><mn-form-control invalid
      ><mn-slider aria-label="i"
    /></mn-form-control>`,
})
class Fixture {}

@Component({
  imports: [MnSlider],
  template: `<mn-slider aria-label="Drag" [defaultValue]="10" />`,
})
class Dragging {}

export default [
  { name: "content and states", component: Fixture },
  {
    name: "dragging",
    component: Dragging,
    setup: async ({ fixture, root }) => {
      const control = root.querySelector('[data-part="control"]')!;
      control.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          button: 0,
          clientX: 0,
          pointerId: 1,
        }),
      );
      fixture.detectChanges();
      await fixture.whenStable();
    },
  },
] satisfies HookScenario[];
