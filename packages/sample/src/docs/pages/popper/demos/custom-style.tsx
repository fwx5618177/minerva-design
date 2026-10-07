import { useState } from "react";
import { Button, Popper } from "@minerva/lib-core";

export default function CustomStyleDemo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button ref={setAnchorEl}>Custom popper</Button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        placement="right"
        arrow
        offset={{ x: 12, y: 0 }}
        animation={{ duration: 400, easing: "ease-out" }}
        zIndex={1200}
        width={220}
        popperStyle={{
          backgroundColor: "#1e293b",
          color: "#f8fafc",
          borderColor: "#1e293b",
          padding: 12,
        }}
        onVisibleChange={setVisible}
        onClickAway={() => setVisible(false)}
      >
        Custom colors, width, offset and a slower transition.
      </Popper>
    </>
  );
}
