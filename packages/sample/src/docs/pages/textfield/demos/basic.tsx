import { TextField } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    <>
      <TextField name="basic-name" label="Full name" />
      <TextField
        name="basic-city"
        label="City"
        placeholder="Placeholder replaces the floating label"
      />
    </>
  );
}
