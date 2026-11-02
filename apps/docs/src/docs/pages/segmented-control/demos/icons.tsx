import { LuGrid2X2, LuList, LuMap } from "react-icons/lu";
import { SegmentedControl } from "minerva-design";

export default function IconsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Layout"
        defaultValue="list"
        options={[
          { value: "list", label: "List", icon: <LuList /> },
          { value: "grid", label: "Grid", icon: <LuGrid2X2 /> },
          { value: "map", label: "Map", icon: <LuMap /> },
        ]}
      />
      {/* Icon-only segments need an aria-label */}
      <SegmentedControl
        aria-label="Layout (compact)"
        defaultValue="grid"
        options={[
          { value: "list", icon: <LuList />, "aria-label": "List" },
          { value: "grid", icon: <LuGrid2X2 />, "aria-label": "Grid" },
          { value: "map", icon: <LuMap />, "aria-label": "Map" },
        ]}
      />
    </div>
  );
}
