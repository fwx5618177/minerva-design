import { TextField } from "@minerva/lib-core";

export default function SizesDemo() {
  return (
    <>
      <TextField name="size-small" label="Small" size="small" width="200px" />
      <TextField
        name="size-medium"
        label="Medium"
        size="medium"
        width="200px"
      />
      <TextField name="size-large" label="Large" size="large" width="200px" />
    </>
  );
}
