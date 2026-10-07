import { Button, message } from "@minerva/lib-core";

export default function TypesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        variant="success"
        onClick={() => message.success("Changes saved")}
      >
        Success
      </Button>
      <Button
        variant="error"
        onClick={() => message.error("Something went wrong")}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => message.info("New comment received")}
      >
        Info
      </Button>
      <Button
        variant="warning"
        onClick={() => message.warning("Storage almost full")}
      >
        Warning
      </Button>
      <Button variant="secondary" onClick={() => message.loading("Uploading…")}>
        Loading
      </Button>
    </div>
  );
}
