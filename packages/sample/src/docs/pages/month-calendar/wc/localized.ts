// Labels are attributes; the column headers and accessible labels are
// properties (weekdayLabels Monday first, getDayLabel / getEventsLabel).
type Calendar = HTMLElement & {
  weekdayLabels: string[];
  getDayLabel: (day: string, count: number) => string;
  getEventsLabel: (day: string) => string;
};

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<Calendar>("#fr")!;
  calendar.weekdayLabels = ["lu", "ma", "me", "je", "ve", "sa", "di"];
  calendar.getDayLabel = (day, count) =>
    `${day}, ${count} événement${count > 1 ? "s" : ""}`;
  calendar.getEventsLabel = (day) => `Événements du ${day}`;
}
