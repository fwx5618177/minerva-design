import { TagInput } from "minerva-design/native";
export default function Basic() {
  return (
    <TagInput
      accessibilityLabel="Project tags"
      defaultValue={["design"]}
      options={["native", "web", "design"]}
    />
  );
}
