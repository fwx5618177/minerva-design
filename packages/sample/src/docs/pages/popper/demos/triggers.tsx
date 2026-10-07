import { useState } from "react";
import { Button, Popper, type PopperTrigger } from "@minerva/lib-core";

const triggers: PopperTrigger[] = ["click", "hover", "focus", "contextMenu"];

function TriggerExample({ trigger }: { trigger: PopperTrigger }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button variant="secondary" size="small" ref={setAnchorEl}>
        {trigger === "contextMenu" ? "Right-click" : trigger}
      </Button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        trigger={trigger}
        onVisibleChange={setVisible}
        onClickAway={() => setVisible(false)}
        type="tooltip"
        variant="primary"
        tabIndex={-1}
      >
        <div style={{ padding: 8 }}>Opened by {trigger}</div>
      </Popper>
    </>
  );
}

export default function TriggersDemo() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {triggers.map((trigger) => (
        <TriggerExample key={trigger} trigger={trigger} />
      ))}
    </div>
  );
}
