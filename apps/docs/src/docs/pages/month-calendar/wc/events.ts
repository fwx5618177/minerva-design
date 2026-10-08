// minerva-change (day), minerva-month-change (month) and, with
// clickable-events, minerva-event-click (event of the selected day).
type CalendarEvent = { id: string; date: string; title: string };

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<
    HTMLElement & { events: CalendarEvent[] }
  >("#calendar")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  calendar.events = [
    { id: "1", date: "2026-03-12", title: "Design review" },
    { id: "2", date: "2026-03-12", title: "Customer call" },
    { id: "3", date: "2026-04-02", title: "Quarterly planning" },
  ];
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    log.value = `Selected ${value}`;
  };
  const onMonth = (e: Event) => {
    const { month } = (e as CustomEvent<{ month: Date }>).detail;
    log.value = `Showing ${month.toLocaleDateString("en", { month: "long", year: "numeric" })}`;
  };
  const onEvent = (e: Event) => {
    const { event } = (e as CustomEvent<{ event: CalendarEvent }>).detail;
    log.value = `Opened "${event.title}"`;
  };
  calendar.addEventListener("minerva-change", onChange);
  calendar.addEventListener("minerva-month-change", onMonth);
  calendar.addEventListener("minerva-event-click", onEvent);
  return () => {
    calendar.removeEventListener("minerva-change", onChange);
    calendar.removeEventListener("minerva-month-change", onMonth);
    calendar.removeEventListener("minerva-event-click", onEvent);
  };
}
