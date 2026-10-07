import { Switch } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    <>
      <Switch label="Wi-Fi" defaultChecked />
      <Switch label="Bluetooth" />
    </>
  );
}
