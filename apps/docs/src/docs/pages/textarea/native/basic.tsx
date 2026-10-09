import { Textarea } from "minerva-design/native";
export default function Basic() {
  return (
    <Textarea
      label="Notes"
      placeholder="Add a note"
      maxLength={200}
      showCharCount
    />
  );
}
