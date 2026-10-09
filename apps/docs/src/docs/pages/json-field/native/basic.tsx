import { JsonField } from "minerva-design/native";
export default function Basic() {
  return (
    <JsonField
      accessibilityLabel="JSON configuration"
      defaultValue={'{"version":9007199254740993,"theme":"dark"}'}
    />
  );
}
