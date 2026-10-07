import { AutoComplete } from "@minerva/lib-core";

const options = [
  { label: "TypeScript", value: "ts" },
  { label: "JavaScript", value: "js" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Python", value: "py" },
];

export default function MultipleDemo() {
  return (
    <div style={{ width: 320 }}>
      <AutoComplete
        name="languages"
        label="Languages"
        options={options}
        multiple
        maxTagCount={2}
      />
    </div>
  );
}
