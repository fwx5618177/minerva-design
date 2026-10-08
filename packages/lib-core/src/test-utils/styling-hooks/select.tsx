import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "../../components/Select";
import type { HookScenario } from "./types";

const options = (
  <>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="pear" disabled>
        Pear
      </SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectItem value="carrot">Carrot</SelectItem>
  </>
);

/** Shared by the option, option-group, select-label and select-separator fixtures */
export const openSelect = (
  <Select aria-label="Food" defaultOpen defaultValue="apple">
    {options}
  </Select>
);

export default [
  {
    name: "closed, placeholder",
    element: (
      <Select aria-label="Food" placeholder="Pick one">
        {options}
      </Select>
    ),
  },
  { name: "open", element: openSelect },
  {
    name: "disabled, invalid, required, small",
    element: (
      <Select aria-label="Food" disabled invalid required size="small">
        {options}
      </Select>
    ),
  },
] satisfies HookScenario[];
