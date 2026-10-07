import { Alert } from "@minerva/lib-core";

export default function TypesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert variant="warning" type="default">
        Default style
      </Alert>
      <Alert variant="warning" type="outlined">
        Outlined style
      </Alert>
      <Alert variant="warning" type="filled">
        Filled style
      </Alert>
    </div>
  );
}
