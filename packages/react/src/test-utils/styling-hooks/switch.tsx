import { FormControl } from "../../components/FormControl";
import { Switch } from "../../components/Switch";
import type { HookScenario } from "./types";

const Icon = () => <svg aria-hidden="true" />;

export default [
  {
    name: "label, icon in the thumb, checked, every key",
    element: (
      <Switch
        label="Wi-Fi"
        icon={<Icon />}
        defaultChecked
        size="small"
        color="success"
        shape="square"
      />
    ),
  },
  {
    name: "side labels, icon after the slider, loading",
    element: (
      <Switch
        aria-label="Mode"
        offLabel="Off"
        onLabel="On"
        icon={<Icon />}
        iconPlacement="end"
        loading
      />
    ),
  },
  {
    name: "segmented, invalid, required, read-only",
    element: (
      <FormControl invalid required readOnly>
        <Switch
          aria-label="Source"
          variant="segmented"
          offLabel="A"
          onLabel="B"
        />
      </FormControl>
    ),
  },
  { name: "disabled", element: <Switch aria-label="Wi-Fi" disabled /> },
] satisfies HookScenario[];
