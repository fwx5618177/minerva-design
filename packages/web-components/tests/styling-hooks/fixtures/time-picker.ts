import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";

export default [
  {
    name: "closed",
    html: `<minerva-time-picker label="Time"></minerva-time-picker>`,
  },
  {
    name: "open, with a value (clear button)",
    html: `<minerva-time-picker label="Time" value="10:30:00" open></minerva-time-picker>`,
  },
  {
    name: "keyboard: selected units, disabled units (min / max time)",
    html: `<minerva-time-picker label="Time" value="10:30:00" min-time="09:00" max-time="17:00"></minerva-time-picker>`,
    setup: async (root) => {
      const el = root.querySelector("minerva-time-picker")!;
      el.shadowRoot!.querySelector("input")!.focus();
      await userEvent.setup().keyboard("{ArrowDown}");
    },
  },
  {
    name: "disabled, invalid, small",
    html: `<minerva-time-picker label="Time" disabled invalid size="small"></minerva-time-picker>`,
  },
  {
    name: "read-only",
    html: `<minerva-time-picker label="Time" readonly></minerva-time-picker>`,
  },
] satisfies WcHookScenario[];
