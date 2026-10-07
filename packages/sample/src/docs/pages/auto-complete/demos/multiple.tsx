import { useState } from "react";
import { AutoComplete, type AutoCompleteOption } from "@minerva/lib-core";

const options: AutoCompleteOption[] = [
  { label: "TypeScript", value: "ts" },
  { label: "JavaScript", value: "js" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Python", value: "py" },
];

export default function MultipleDemo() {
  const [selected, setSelected] = useState<AutoCompleteOption[]>([options[0]]);

  return (
    <div style={{ width: 320 }}>
      <AutoComplete
        name="languages"
        label="Languages"
        options={options}
        multiple
        maxTagCount={2}
        selectedOptions={selected}
        onSelectedOptionsChange={setSelected}
      />
      <p>Selected: {selected.map((o) => o.label).join(", ") || "none"}</p>
    </div>
  );
}
