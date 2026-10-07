import { useState } from "react";
import { TextField } from "@minerva/lib-core";

export default function ControlledDemo() {
  const [value, setValue] = useState("Minerva");

  return (
    <>
      <TextField
        name="controlled-project"
        label="Project name"
        value={value}
        onChange={setValue}
      />
      <span>Value: {value || "(empty)"}</span>
    </>
  );
}
