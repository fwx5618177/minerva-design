import { Button, Dropdown } from "@minerva/lib-core";

const items = [
  { label: "First", value: "1" },
  { label: "Second", value: "2" },
  { label: "Third", value: "3" },
];

const directions = ["down", "up", "left", "right"] as const;

export default function DirectionsDemo() {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        padding: "120px 96px",
      }}
    >
      {directions.map((direction) => (
        <Dropdown
          key={direction}
          items={items}
          direction={direction}
          ariaLabel={direction}
        >
          <Button size="small" variant="secondary">
            {direction}
          </Button>
        </Dropdown>
      ))}
    </div>
  );
}
