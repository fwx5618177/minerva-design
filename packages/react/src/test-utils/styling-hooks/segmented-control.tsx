import { SegmentedControl } from "../../components/SegmentedControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "selected, disabled segment, icon and label",
    element: (
      <SegmentedControl
        aria-label="View"
        defaultValue="list"
        options={[
          { value: "list", label: "List", icon: <svg /> },
          { value: "grid", label: "Grid" },
          { value: "map", label: "Map", disabled: true },
        ]}
      />
    ),
  },
  {
    name: "disabled, primary, sizes",
    element: (
      <>
        <SegmentedControl
          aria-label="Small"
          options={["a", "b"]}
          defaultValue="a"
          size="small"
          color="primary"
          disabled
        />
        <SegmentedControl
          aria-label="Large"
          options={["a", "b"]}
          defaultValue="b"
          size="large"
          fullWidth
        />
      </>
    ),
  },
] satisfies HookScenario[];
