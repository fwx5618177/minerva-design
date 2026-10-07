import { useState } from "react";
import { Button, Popper } from "@minerva/lib-core";

const actions = ["Edit", "Duplicate", "Archive", "Delete"];

export default function MenuDemo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [last, setLast] = useState("none");

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Button ref={setAnchorEl} variant="secondary">
        Actions
      </Button>
      <span>Last action: {last}</span>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        type="menu"
        placement="bottomStart"
        ariaLabel="Actions"
        onVisibleChange={setVisible}
        onClickAway={() => setVisible(false)}
      >
        <div style={{ display: "grid", padding: 4, minWidth: 140 }}>
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              role="menuitem"
              style={{ textAlign: "left", padding: "6px 10px" }}
              onClick={() => {
                setLast(action);
                setVisible(false);
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </Popper>
    </div>
  );
}
