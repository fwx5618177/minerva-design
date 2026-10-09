import { CodeEditor } from "minerva-design/native";
export default function Basic() {
  return (
    <CodeEditor
      label="Source code"
      defaultValue={'const name = "Minerva";'}
      format={(source) => source.trim()}
    />
  );
}
