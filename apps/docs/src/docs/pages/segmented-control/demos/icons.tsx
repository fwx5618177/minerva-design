import { LayoutGridIcon, ListIcon, MapIcon } from "minerva-design/icons";
import { SegmentedControl } from "minerva-design";

export default function IconsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Layout"
        defaultValue="list"
        options={[
          { value: "list", label: "List", icon: <ListIcon size="1em" /> },
          { value: "grid", label: "Grid", icon: <LayoutGridIcon size="1em" /> },
          { value: "map", label: "Map", icon: <MapIcon size="1em" /> },
        ]}
      />
      {/* Icon-only segments need an aria-label */}
      <SegmentedControl
        aria-label="Layout (compact)"
        defaultValue="grid"
        options={[
          {
            value: "list",
            icon: <ListIcon size="1em" />,
            "aria-label": "List",
          },
          {
            value: "grid",
            icon: <LayoutGridIcon size="1em" />,
            "aria-label": "Grid",
          },
          { value: "map", icon: <MapIcon size="1em" />, "aria-label": "Map" },
        ]}
      />
    </div>
  );
}
