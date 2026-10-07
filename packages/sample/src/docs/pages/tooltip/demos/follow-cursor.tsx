import { Tooltip } from "@minerva/lib-core";

export default function FollowCursorDemo() {
  return (
    <Tooltip content="I follow your cursor" followCursor>
      <div
        tabIndex={0}
        style={{
          width: 280,
          height: 100,
          display: "grid",
          placeItems: "center",
          border: "1px dashed currentColor",
          borderRadius: 8,
        }}
      >
        Move the mouse here
      </div>
    </Tooltip>
  );
}
