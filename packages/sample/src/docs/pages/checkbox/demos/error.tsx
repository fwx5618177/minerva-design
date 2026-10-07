import { useState } from "react";
import { Checkbox } from "@minerva/lib-core";

export default function ErrorDemo() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={setAccepted}
      error={!accepted}
      helperText={
        accepted ? "Thanks!" : "You must accept the terms to continue"
      }
    />
  );
}
