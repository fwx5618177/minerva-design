import { AutoComplete } from "@minerva/lib-core";

const options = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium", highlight: true },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

// The dropdown is portalled to <body>: set the custom properties on the
// dropdown itself through dropdownClassName.
const css = `
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`;

export default function AppearanceDemo() {
  return (
    <div style={{ width: 280, marginTop: 180 }}>
      <style>{css}</style>
      <AutoComplete
        name="priority"
        label="Priority (opens above)"
        options={options}
        placement="top"
        offset={{ x: 0, y: 8 }}
        animation={false}
        dropdownClassName="priority-dropdown"
      />
    </div>
  );
}
