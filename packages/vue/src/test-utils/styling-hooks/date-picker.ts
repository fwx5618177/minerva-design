import { h } from "vue";
import { DatePicker } from "../../components/DatePicker";
import type { HookScenario } from "./types";

export default [
  { name: "closed", render: () => h(DatePicker, { ariaLabel: "Date" }) },
  {
    name: "open",
    render: () => h(DatePicker, { ariaLabel: "Date" }),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "keyboard: selected date, disabled days (min / max date)",
    render: () =>
      h(DatePicker, {
        ariaLabel: "Date",
        defaultValue: "2026-01-15",
        minDate: "2026-01-10",
        maxDate: "2026-01-20",
      }),
    setup: async ({ user, container }) => {
      container.querySelector("input")!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "disabled, invalid, small",
    render: () =>
      h(DatePicker, {
        ariaLabel: "Date",
        disabled: true,
        invalid: true,
        size: "small",
      }),
  },
  {
    name: "read-only",
    render: () => h(DatePicker, { ariaLabel: "Date", readOnly: true }),
  },
] satisfies HookScenario[];
