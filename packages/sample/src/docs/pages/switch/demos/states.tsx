import { Switch } from "@minerva/lib-core";

export default function StatesDemo() {
  return (
    <>
      <Switch label="Loading" loading defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled (on)" disabled defaultChecked />
    </>
  );
}
