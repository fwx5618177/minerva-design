import { TextField } from "@minerva/lib-core";

export default function StatesDemo() {
  return (
    <>
      <TextField name="states-disabled" label="Disabled" disabled />
      <TextField
        name="states-readonly"
        label="Read-only"
        value="Read-only value"
        readOnly
      />
    </>
  );
}
