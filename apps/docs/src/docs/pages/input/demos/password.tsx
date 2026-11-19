import { LockIcon } from "minerva-design/icons";
import { FormField, Input } from "minerva-design";

export default function PasswordDemo() {
  return (
    <FormField label="Password" helperText="At least 8 characters.">
      <Input
        type="password"
        prefix={<LockIcon size="1em" />}
        autoComplete="new-password"
        minLength={8}
      />
    </FormField>
  );
}
