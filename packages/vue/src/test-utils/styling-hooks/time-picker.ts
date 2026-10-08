import { h } from "vue";
import { TimePicker } from "../../components/TimePicker";
import type { HookScenario } from "./types";

export default [
  { name: "closed", render: () => h(TimePicker, { ariaLabel: "Time" }) },
  {
    name: "open",
    render: () => h(TimePicker, { ariaLabel: "Time" }),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "keyboard: selected units, disabled units (min / max time)",
    render: () =>
      h(TimePicker, {
        ariaLabel: "Time",
        defaultValue: new Date(2024, 0, 1, 10, 30, 0),
        minTime: new Date(2024, 0, 1, 9, 0, 0),
        maxTime: new Date(2024, 0, 1, 17, 0, 0),
      }),
    setup: async ({ user, container }) => {
      container.querySelector("input")!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "disabled, invalid, small",
    render: () =>
      h(TimePicker, {
        ariaLabel: "Time",
        disabled: true,
        invalid: true,
        size: "small",
      }),
  },
  {
    name: "read-only",
    render: () => h(TimePicker, { ariaLabel: "Time", readOnly: true }),
  },
] satisfies HookScenario[];
