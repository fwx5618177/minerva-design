import { TextField } from "@minerva/lib-core";

export default function ClearableAndCountDemo() {
  return (
    <TextField
      name="clearable-bio"
      label="Short bio"
      defaultValue="Frontend developer"
      clearable
      showCharCount
    />
  );
}
