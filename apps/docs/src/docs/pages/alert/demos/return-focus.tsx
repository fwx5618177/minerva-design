import { useRef, useState } from "react";
import { Alert, Button } from "minerva-design";

export default function ReturnFocusDemo() {
  const [key, setKey] = useState(0);
  const resetRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        <Alert color="info" closable>
          Closing this alert moves focus to the next focusable element.
        </Alert>
        <Alert color="success" closable returnFocus={resetRef}>
          Closing this alert moves focus to the Reset button (returnFocus).
        </Alert>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Button size="small" variant="outline" color="neutral">
          Next focusable
        </Button>
        <Button
          ref={resetRef}
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
