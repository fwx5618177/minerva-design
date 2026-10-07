import { Button, Tooltip } from "@minerva/lib-core";

export default function CustomColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tooltip content="Solid color" bgColor="#7c3aed" textColor="#fff" arrow>
        <Button variant="secondary" size="small">
          Solid
        </Button>
      </Tooltip>
      <Tooltip
        content="Gradient background"
        bgColor="linear-gradient(135deg, #ec4899, #f59e0b)"
        textColor="#fff"
        arrow
      >
        <Button variant="secondary" size="small">
          Gradient
        </Button>
      </Tooltip>
      <Tooltip content="Further away" offset={[0, 20]}>
        <Button variant="secondary" size="small">
          Offset 20px
        </Button>
      </Tooltip>
    </div>
  );
}
