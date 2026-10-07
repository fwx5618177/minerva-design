import { TextField } from "@minerva/lib-core";

export default function WidthAndSuffixDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
      }}
    >
      <TextField name="width-weight" label="Weight" width="160px" suffix="kg" />
      <TextField name="width-address" label="Address" fullWidth />
    </div>
  );
}
