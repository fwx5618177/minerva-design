import { KeyValueEditor } from "minerva-design/native";
export default function Basic() {
  return (
    <KeyValueEditor
      defaultEntries={[{ id: "theme", key: "theme", value: "dark" }]}
    />
  );
}
