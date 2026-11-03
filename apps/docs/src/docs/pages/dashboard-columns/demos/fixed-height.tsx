import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

const cards = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}`);

const columns = [
  { title: "Inbox", color: "info", cards: cards("Ticket", 12) },
  { title: "Triaged", color: "warning", cards: cards("Bug", 5) },
  { title: "Fixed", color: "success", cards: cards("Fix", 8) },
];

export default function FixedHeightDemo() {
  return (
    <DashboardColumns aria-label="Support queue" height={320}>
      {columns.map((column) => (
        <DashboardColumn
          key={column.title}
          title={column.title}
          count={column.cards.length}
          color={column.color}
        >
          {column.cards.map((card) => (
            <Card key={card} padding="small">
              {card}
            </Card>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}
