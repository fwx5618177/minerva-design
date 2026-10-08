import type { WcHookScenario } from "../types";

const options = `<minerva-option-group>
    <minerva-select-label>Fruits</minerva-select-label>
    <minerva-option value="apple">Apple</minerva-option>
    <minerva-option value="pear" disabled>Pear</minerva-option>
  </minerva-option-group>
  <minerva-select-separator></minerva-select-separator>
  <minerva-option value="carrot">Carrot</minerva-option>`;

/** Shared by the option, option-group, select-label and select-separator fixtures */
export const openSelect: WcHookScenario = {
  name: "open select",
  html: `<minerva-select label="Food" value="apple">${options}</minerva-select>`,
  setup: (root) => {
    root.querySelector("minerva-select")!.open = true;
  },
};

export default [
  {
    name: "closed, placeholder",
    html: `<minerva-select label="Food" placeholder="Pick one">${options}</minerva-select>`,
  },
  openSelect,
  {
    name: "options property (items, group labels)",
    html: `<minerva-select label="Food" open></minerva-select>`,
    setup: (root) => {
      const select = root.querySelector("minerva-select")!;
      select.options = [
        { value: "a", label: "A" },
        { label: "Group", options: [{ value: "b", label: "B" }] },
      ];
    },
  },
  {
    name: "disabled, invalid, required, small",
    html: `<minerva-select label="Food" disabled invalid required size="small">${options}</minerva-select>`,
  },
] satisfies WcHookScenario[];
