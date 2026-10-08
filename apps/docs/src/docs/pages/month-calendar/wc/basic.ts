// Events are a JS property; each day shows its count and the selected day's
// events are listed below the grid. Arrows, Home / End and PageUp / PageDown
// move through the grid (one tab stop).
type CalendarEvent = { id: string; date: string; title: string };

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<
    HTMLElement & { events: CalendarEvent[] }
  >("#calendar")!;
  calendar.events = [
    { id: "1", date: "2026-03-02", title: "Sprint planning" },
    { id: "2", date: "2026-03-12", title: "Design review" },
    { id: "3", date: "2026-03-12", title: "Customer call" },
    { id: "4", date: "2026-03-19", title: "Release 2.4" },
    { id: "5", date: "2026-03-27", title: "Retrospective" },
  ];
}
