import { h } from "vue";
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
    render: () => h(AutoComplete, { label: "Food", options }),
  },
  {
    name: "open, grouped",
    render: () =>
      h(AutoComplete, {
        label: "Food",
        options,
        groupBy: (option) => option.group ?? "",
      }),
    setup: open,
  },
  {
    name: "keyboard: highlighted item, disabled item",
    render: () =>
      h(AutoComplete, {
        label: "Food",
        options: [
          { label: "Apple", value: "apple" },
          { label: "Apricot", value: "apricot", disabled: true },
        ],
      }),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "open, empty",
    render: () =>
      h(AutoComplete, { label: "Food", options, defaultValue: "zzz" }),
    setup: open,
  },
  {
    name: "open, loading",
    render: () => h(AutoComplete, { label: "Food", options, loading: true }),
    setup: open,
  },
  {
    name: "disabled",
    render: () =>
      h(AutoComplete, {
        label: "Food",
        options,
        inputProps: { disabled: true },
      }),
  },
  {
    name: "read-only",
    render: () =>
      h(AutoComplete, {
        label: "Food",
        options,
        inputProps: { readOnly: true },
      }),
  },
] satisfies HookScenario[];
