import { useState } from "react";
import { Button, TextField } from "@minerva/lib-core";

export default function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  const submit = () => {
    setError(
      /^\S+@\S+\.\S+$/.test(email)
        ? undefined
        : "Please enter a valid email address",
    );
  };

  return (
    <>
      <TextField
        name="validation-email"
        label="Email"
        value={email}
        onChange={(value) => {
          setEmail(value);
          setError(undefined);
        }}
        onKeyDown={(event) => event.key === "Enter" && submit()}
        helperText={error}
      />
      <Button onClick={submit}>Submit</Button>
    </>
  );
}
