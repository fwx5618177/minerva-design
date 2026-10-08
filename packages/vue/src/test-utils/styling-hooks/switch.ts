import { h } from "vue";
import { FormControl } from "../../components/FormControl";
import { Switch } from "../../components/Switch";
import type { HookScenario } from "./types";

const Icon = () => h("svg", { "aria-hidden": "true" });

export default [
  {
    name: "label, icon in the thumb, checked, every key",
    render: () =>
      h(
        Switch,
        {
          label: "Wi-Fi",
          defaultChecked: true,
          size: "small",
          color: "success",
          shape: "square",
        },
        { icon: Icon },
      ),
  },
  {
    name: "side labels, icon after the slider, loading",
    render: () =>
      h(
        Switch,
        {
          "aria-label": "Mode",
          offLabel: "Off",
          onLabel: "On",
          iconPlacement: "end",
          loading: true,
        },
        { icon: Icon },
      ),
  },
  {
    name: "segmented, invalid, required, read-only",
    render: () =>
      h(FormControl, { invalid: true, required: true, readOnly: true }, () =>
        h(Switch, {
          "aria-label": "Source",
          variant: "segmented",
          offLabel: "A",
          onLabel: "B",
        }),
      ),
  },
  {
    name: "disabled",
    render: () => h(Switch, { "aria-label": "Wi-Fi", disabled: true }),
  },
] satisfies HookScenario[];
