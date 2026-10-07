import { useState } from "react";
import { Button, Popper } from "@minerva/lib-core";

export default function BasicDemo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button ref={setAnchorEl}>Toggle popper</Button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        onVisibleChange={setVisible}
        onClickAway={() => setVisible(false)}
        ariaLabel="Basic popper"
      >
        <div style={{ padding: 12 }}>Click outside to close me.</div>
      </Popper>
    </>
  );
}
