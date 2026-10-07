import { Switch } from "@minerva/lib-core";

export default function LabelPlacementDemo() {
  return (
    <>
      <Switch label="Label at start" labelPlacement="start" defaultChecked />
      <Switch label="Label at end" labelPlacement="end" defaultChecked />
    </>
  );
}
