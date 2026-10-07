import { useState } from "react";
import { Button, Popper, type PopperVariant } from "@minerva/lib-core";

const variants: PopperVariant[] = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];

function VariantExample({ variant }: { variant: PopperVariant }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button variant="secondary" size="small" ref={setAnchorEl}>
        {variant}
      </Button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        variant={variant}
        trigger="hover"
        placement="top"
        arrow
        onVisibleChange={setVisible}
        tabIndex={-1}
      >
        <div style={{ padding: 8 }}>A {variant} popper</div>
      </Popper>
    </>
  );
}

export default function VariantsDemo() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {variants.map((variant) => (
        <VariantExample key={variant} variant={variant} />
      ))}
    </div>
  );
}
