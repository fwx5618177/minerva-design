import { useState } from "react";
import { Button, Popper, type PopperPlacement } from "@minerva/lib-core";

const placements: PopperPlacement[] = [
  "topStart",
  "top",
  "topEnd",
  "leftStart",
  "left",
  "leftEnd",
  "rightStart",
  "right",
  "rightEnd",
  "bottomStart",
  "bottom",
  "bottomEnd",
];

export default function PlacementsDemo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [placement, setPlacement] = useState<PopperPlacement | null>(null);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, max-content)",
          gap: 8,
        }}
      >
        {placements.map((item) => (
          <Button
            variant="secondary"
            size="small"
            key={item}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              setPlacement(placement === item ? null : item);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <Popper
        anchorEl={anchorEl}
        visible={placement !== null}
        placement={placement ?? "bottom"}
        trigger="manual"
        arrow
        onClickAway={() => setPlacement(null)}
      >
        <div style={{ padding: 8 }}>{placement}</div>
      </Popper>
    </>
  );
}
