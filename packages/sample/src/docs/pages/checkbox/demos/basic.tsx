import { Checkbox } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    <>
      <Checkbox label="Remember me" />
      <Checkbox label="Checked by default" defaultChecked />
    </>
  );
}
