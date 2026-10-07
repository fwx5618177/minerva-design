import { useState } from "react";
import { Button, Input } from "@minerva/lib-core";

export default function FormDemo() {
  const [log, setLog] = useState("Nothing yet");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = new FormData(event.currentTarget).get("title");
        setLog(`Submitted "${String(title)}"`);
      }}
      onReset={() => setLog("Reset")}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Input name="title" aria-label="Title" defaultValue="Draft" />
      {/* No type: defaults to "button", so it never submits the form */}
      <Button
        color="neutral"
        variant="outline"
        onClick={() => setLog("Preview opened (form not submitted)")}
      >
        Preview
      </Button>
      <Button type="reset" color="neutral" variant="ghost">
        Reset
      </Button>
      <Button type="submit">Save</Button>
      <output style={{ flexBasis: "100%" }}>{log}</output>
    </form>
  );
}
