import { useState } from "react";
import { Button, Popper } from "@minerva/lib-core";

const fruits = ["Apple", "Banana", "Cherry"];

export default function AnchorWidthDemo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [fruit, setFruit] = useState("Choose a fruit");

  return (
    <>
      <Button
        ref={setAnchorEl}
        variant="secondary"
        style={{ width: 260 }}
        aria-haspopup="listbox"
        aria-expanded={visible}
      >
        {fruit}
      </Button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        type="select"
        role="listbox"
        placement="bottomStart"
        matchAnchorWidth="exact"
        offset={{ x: 0, y: 4 }}
        ariaLabel="Fruits"
        onVisibleChange={setVisible}
        onClickAway={() => setVisible(false)}
      >
        <div style={{ display: "grid", padding: 4 }}>
          {fruits.map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={item === fruit}
              style={{ textAlign: "left", padding: "6px 10px" }}
              onClick={() => {
                setFruit(item);
                setVisible(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </Popper>
    </>
  );
}
