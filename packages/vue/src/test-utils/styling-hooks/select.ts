import { h } from "vue";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "../../components/Select";
import type { HookScenario } from "./types";

const options = () => [
  h(SelectGroup, null, () => [
    h(SelectLabel, null, () => "Fruits"),
    h(SelectItem, { value: "apple" }, () => "Apple"),
    h(SelectItem, { value: "pear", disabled: true }, () => "Pear"),
  ]),
  h(SelectSeparator),
  h(SelectItem, { value: "carrot" }, () => "Carrot"),
];

/** Shared by the option, option-group, select-label and select-separator fixtures */
export const openSelect = () =>
  h(
    Select,
    { "aria-label": "Food", defaultOpen: true, defaultValue: "apple" },
    options,
  );

export default [
  {
    name: "closed, placeholder",
    render: () =>
      h(Select, { "aria-label": "Food", placeholder: "Pick one" }, options),
  },
  { name: "open", render: openSelect },
  {
    name: "disabled, invalid, required, small",
    render: () =>
      h(
        Select,
        {
          "aria-label": "Food",
          disabled: true,
          invalid: true,
          required: true,
          size: "small",
        },
        options,
      ),
  },
] satisfies HookScenario[];
