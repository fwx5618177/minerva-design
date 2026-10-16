import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";

export default [
  {
    name: "closed",
    html: `<minerva-date-picker label="Date"></minerva-date-picker>`,
  },
  {
    name: "open, with a value (clear button)",
    html: `<minerva-date-picker label="Date" value="2026-01-15" open></minerva-date-picker>`,
  },
  {
    name: "keyboard: selected date, disabled days (min / max date)",
    html: `<minerva-date-picker label="Date" value="2026-01-15" min-date="2026-01-10" max-date="2026-01-20"></minerva-date-picker>`,
    setup: async (root) => {
      const el = root.querySelector("minerva-date-picker")!;
      el.shadowRoot!.querySelector("input")!.focus();
      await userEvent.setup().keyboard("{ArrowDown}");
    },
  },
  {
    name: "disabled, invalid, small",
    html: `<minerva-date-picker label="Date" disabled invalid size="small"></minerva-date-picker>`,
  },
  {
    name: "read-only",
    html: `<minerva-date-picker label="Date" readonly></minerva-date-picker>`,
  },
] satisfies WcHookScenario[];
