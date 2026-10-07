import { useState } from "react";
import { Button, Popper, type PopperSize } from "@minerva/lib-core";

const text =
  "Popper content can be long. With a preset size the box keeps a fixed width and height, and the content scrolls when scrollable is enabled. multiline lets the text wrap instead of scrolling horizontally.";

function SizeExample({ size }: { size: PopperSize }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button variant="secondary" size="small" ref={setAnchorEl}>
        {size}
      </Button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        size={size}
        multiline
        scrollable
        onVisibleChange={setVisible}
        onClickAway={() => setVisible(false)}
      >
        <div style={{ padding: 12 }}>{text}</div>
      </Popper>
    </>
  );
}

export default function SizesDemo() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["small", "medium", "large"] as const).map((size) => (
        <SizeExample key={size} size={size} />
      ))}
    </div>
  );
}
