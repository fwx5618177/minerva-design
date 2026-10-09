import { NumberInput } from "minerva-design/native";
export default function Basic() {
  return (
    <NumberInput label="Quantity" defaultValue={2} min={0} max={10} step={1} />
  );
}
