import { h } from "vue";
import { fireEvent } from "@testing-library/vue";
import { Slider } from "../../components/Slider";
import { FormControl } from "../../components/FormControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "single, marks with labels, value, tooltip",
    render: () =>
      h(Slider, {
        "aria-label": "Volume",
        defaultValue: 40,
        marks: [{ value: 0, label: "0" }, { value: 50 }, { value: 100 }],
        showValue: true,
        tooltip: true,
        name: "volume",
      }),
  },
  {
    name: "range, vertical, sizes and colors",
    render: () => [
      h(Slider, {
        "aria-label": "Price",
        range: true,
        defaultValue: [20, 80],
        size: "small",
      }),
      h(Slider, {
        "aria-label": "Level",
        orientation: "vertical",
        size: "large",
        color: "success",
      }),
      h(Slider, { "aria-label": "c", color: "info" }),
      h(Slider, { "aria-label": "c", color: "warning" }),
      h(Slider, { "aria-label": "c", color: "danger" }),
    ],
  },
  {
    name: "disabled, read-only, invalid",
    render: () => [
      h(Slider, { "aria-label": "d", disabled: true }),
      h(Slider, { "aria-label": "r", readOnly: true }),
      h(FormControl, { invalid: true }, () => h(Slider, { "aria-label": "i" })),
    ],
  },
  {
    name: "dragging",
    render: () => h(Slider, { "aria-label": "Drag", defaultValue: 10 }),
    async setup({ container }) {
      const control = container.querySelector('[data-part="control"]')!;
      await fireEvent.pointerDown(control, {
        button: 0,
        clientX: 0,
        pointerId: 1,
      });
    },
  },
] satisfies HookScenario[];
