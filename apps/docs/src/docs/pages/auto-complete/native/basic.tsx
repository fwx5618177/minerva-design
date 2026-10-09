import { useState } from "react";
import { AutoComplete } from "minerva-design/native";
export default function Basic() {
  const [value, setValue] = useState("");
  return (
    <AutoComplete
      label="Component"
      value={value}
      onChange={setValue}
      options={[
        { label: "Button", value: "button" },
        { label: "Table", value: "table" },
        { label: "Tooltip", value: "tooltip", description: "Contextual help" },
      ]}
    />
  );
}
