import { Switch } from "@minerva/lib-core";

export default function SizesDemo() {
  return (
    <>
      <Switch size="small" label="Small" defaultChecked />
      <Switch size="medium" label="Medium" defaultChecked />
      <Switch size="large" label="Large" defaultChecked />
    </>
  );
}
