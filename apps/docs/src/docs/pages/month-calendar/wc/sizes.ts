// size="small" draws events as dots, size="large" puts the day number at
// the top of a taller cell. Events are a JS property.
type CalendarEvent = { id: string; date: string; title: string };
type Calendar = HTMLElement & { events: CalendarEvent[] };

export function setup(root: HTMLElement) {
  const compact = root.querySelector<Calendar>("#compact")!;
  const comfortable = root.querySelector<Calendar>("#comfortable")!;
  compact.events = [
    { id: "1", date: "2026-03-02", title: "Sprint planning" },
    { id: "2", date: "2026-03-12", title: "Design review" },
    { id: "3", date: "2026-03-12", title: "Customer call" },
    { id: "4", date: "2026-03-19", title: "Release 2.4" },
  ];
  comfortable.events = [
    { id: "1", date: "2026-03-02", title: "Sprint planning" },
    { id: "2", date: "2026-03-12", title: "Design review" },
    { id: "3", date: "2026-03-12", title: "Customer call" },
    { id: "4", date: "2026-03-19", title: "Release 2.4" },
  ];
}
