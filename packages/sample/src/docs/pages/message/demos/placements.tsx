import { Button, message, type MessagePlacement } from "@minerva/lib-core";

const placements: MessagePlacement[] = [
  "topLeft",
  "top",
  "topRight",
  "bottomLeft",
  "bottom",
  "bottomRight",
];

export default function PlacementsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        gap: 8,
      }}
    >
      {placements.map((placement) => (
        <Button
          key={placement}
          variant="secondary"
          size="small"
          onClick={() => message.info({ content: placement, placement })}
        >
          {placement}
        </Button>
      ))}
    </div>
  );
}
