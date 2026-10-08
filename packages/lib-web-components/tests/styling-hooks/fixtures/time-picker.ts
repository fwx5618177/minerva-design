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
    name: "disabled, invalid, small",
    html: `<minerva-time-picker label="Time" disabled invalid size="small"></minerva-time-picker>`,
  },
  {
    name: "read-only",
    html: `<minerva-time-picker label="Time" readonly></minerva-time-picker>`,
  },
] satisfies WcHookScenario[];
