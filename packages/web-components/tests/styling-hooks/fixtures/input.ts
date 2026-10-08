import type { WcHookScenario } from "../types";

export default [
  {
    name: "addons, clear button, counter, every key",
    html: `<minerva-input aria-label="Name" clearable value="Ada" show-char-count maxlength="10" size="small" variant="filled" required>
      <span slot="prefix">@</span><span slot="suffix">kg</span>
    </minerva-input>`,
  },
  {
    name: "password, invalid, read-only",
    html: `<minerva-input aria-label="Password" type="password" invalid readonly></minerva-input>`,
  },
  {
    name: "disabled",
    html: `<minerva-input aria-label="Name" disabled></minerva-input>`,
  },
] satisfies WcHookScenario[];
