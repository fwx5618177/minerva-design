import { FormField, TextField } from "@minerva/lib-core";

export default function FormControlDemo() {
  return (
    <>
      <FormField
        label="Email"
        helperText="Wired through the FormControl."
        required
      >
        <TextField
          name="fc-email"
          label="Email"
          placeholder="you@example.com"
        />
      </FormField>
      <TextField name="fc-invalid" label="Invalid without a message" invalid />
    </>
  );
}
