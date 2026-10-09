import { Button, Tooltip } from "minerva-design";

export default function FollowCursorDemo() {
  return (
    <Tooltip content="I follow your cursor" followCursor>
      <Button
        color="neutral"
        variant="outline"
        type="button"
        style={{
          width: 280,
          height: 100,
          display: "grid",
          placeItems: "center",
          border: "1px dashed currentColor",
          borderRadius: 8,
          background: "transparent",
          color: "inherit",
          font: "inherit",
        }}
      >
        Move the mouse here
      </Button>
    </Tooltip>
  );
}
