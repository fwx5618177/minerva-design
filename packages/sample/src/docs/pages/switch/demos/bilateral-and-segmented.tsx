import { useState } from "react";
import { Switch } from "@minerva/lib-core";

export default function BilateralAndSegmentedDemo() {
  const [mock, setMock] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Switch
        ariaLabel="Data source"
        offLabel="Business BFF"
        onLabel="Mock response"
        checked={mock}
        onChange={setMock}
      />
      <Switch
        variant="segmented"
        ariaLabel="Data source"
        offLabel="Business BFF"
        onLabel="Mock response"
        checked={mock}
        onChange={setMock}
      />
    </div>
  );
}
