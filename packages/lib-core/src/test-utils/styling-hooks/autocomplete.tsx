import { AutoComplete } from "../../components/AutoComplete";
import type { HookScenario } from "./types";

const options = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "" },
];

const open: HookScenario["setup"] = async ({ user, container }) => {
  await user.click(container.querySelector("input")!);
};

export default [
  {
    name: "closed, label",
    element: <AutoComplete label="Food" options={options} />,
  },
  {
    name: "open, grouped",
    element: (
      <AutoComplete
        label="Food"
        options={options}
        groupBy={(option) => option.group ?? ""}
      />
    ),
    setup: open,
  },
  {
    name: "keyboard: highlighted item, disabled item",
    element: (
      <AutoComplete
        label="Food"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Apricot", value: "apricot", disabled: true },
        ]}
      />
    ),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "open, empty",
    element: <AutoComplete label="Food" options={options} defaultValue="zzz" />,
    setup: open,
  },
  {
    name: "open, loading",
    element: <AutoComplete label="Food" options={options} loading />,
    setup: open,
  },
  {
    name: "disabled",
    element: (
      <AutoComplete
        label="Food"
        options={options}
        inputProps={{ disabled: true }}
      />
    ),
  },
  {
    name: "read-only",
    element: (
      <AutoComplete
        label="Food"
        options={options}
        inputProps={{ readOnly: true }}
      />
    ),
  },
] satisfies HookScenario[];
