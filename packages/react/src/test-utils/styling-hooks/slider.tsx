import { fireEvent } from "@testing-library/react";
import { Slider } from "../../components/Slider";
import { FormControl } from "../../components/FormControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "single, marks with labels, value, tooltip",
    element: (
      <Slider
        aria-label="Volume"
        defaultValue={40}
        marks={[{ value: 0, label: "0" }, { value: 50 }, { value: 100 }]}
        showValue
        tooltip
        name="volume"
      />
    ),
  },
  {
    name: "range, vertical, sizes and colors",
    element: (
      <>
        <Slider aria-label="Price" range defaultValue={[20, 80]} size="small" />
        <Slider
          aria-label="Level"
          orientation="vertical"
          size="large"
          color="success"
        />
        <Slider aria-label="c" color="info" />
        <Slider aria-label="c" color="warning" />
        <Slider aria-label="c" color="danger" />
      </>
    ),
  },
  {
    name: "disabled, read-only, invalid",
    element: (
      <>
        <Slider aria-label="d" disabled />
        <Slider aria-label="r" readOnly />
        <FormControl invalid>
          <Slider aria-label="i" />
        </FormControl>
      </>
    ),
  },
  {
    name: "dragging",
    element: <Slider aria-label="Drag" defaultValue={10} />,
    setup({ container }) {
      const control = container.querySelector('[data-part="control"]')!;
      fireEvent.pointerDown(control, { button: 0, clientX: 0, pointerId: 1 });
    },
  },
] satisfies HookScenario[];
