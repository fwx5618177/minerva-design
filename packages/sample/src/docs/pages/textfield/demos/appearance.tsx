import { TextField } from "@minerva/lib-core";

export default function AppearanceDemo() {
  return (
    <>
      <TextField name="appearance-minimal" label="Minimal" minimal />
      <TextField name="appearance-borderless" label="No border" hideBorder />
      <TextField
        name="appearance-rounded"
        label="Rounded"
        borderRadius="999px"
        borderColor="#7c3aed"
      />
    </>
  );
}
