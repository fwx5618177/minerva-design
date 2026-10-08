import type { WcHookScenario } from "../types";

export default [
  {
    name: "label, helper text, every key",
    html: `<minerva-radio-group label="Payment" helper-text="Pick one" direction="horizontal" size="small" color="success" required value="card">
      <minerva-radio value="card" label="Card"></minerva-radio>
      <minerva-radio value="cash" label="Cash"></minerva-radio>
    </minerva-radio-group>`,
  },
  {
    name: "vertical, invalid, disabled",
    html: `<minerva-radio-group aria-label="Payment" error disabled>
      <minerva-radio value="card" label="Card"></minerva-radio>
    </minerva-radio-group>`,
  },
] satisfies WcHookScenario[];
