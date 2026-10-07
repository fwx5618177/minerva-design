import { useRef, useState } from "react";
import { Button, Tooltip, type TooltipRef } from "@minerva/lib-core";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<TooltipRef>(null);

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tooltip
          content="Controlled with the open prop"
          open={open}
          onOpenChange={setOpen}
          placement="bottom"
        >
          <span>Controlled</span>
        </Tooltip>
        <Button size="small" onClick={() => setOpen((prev) => !prev)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tooltip
          ref={tooltipRef}
          content="Opened through the ref"
          placement="bottom"
        >
          <span>Imperative</span>
        </Tooltip>
        <Button
          size="small"
          variant="secondary"
          onClick={() => tooltipRef.current?.toggle()}
        >
          Toggle via ref
        </Button>
      </div>
    </div>
  );
}
