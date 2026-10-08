// range-start / range-end highlight days (display only, either order):
// here a first click starts a new range and a second one closes it.
type Calendar = HTMLElement & { rangeStart: string; rangeEnd: string };

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<Calendar>("#calendar")!;
  const output = root.querySelector<HTMLOutputElement>("#range")!;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    if (calendar.rangeStart === calendar.rangeEnd) {
      calendar.rangeEnd = value;
      output.textContent = `From ${calendar.rangeStart} to ${value}`;
    } else {
      calendar.rangeStart = value;
      calendar.rangeEnd = value;
      output.textContent = `From ${value}: pick the last day`;
    }
  };
  calendar.addEventListener("minerva-change", onChange);
  return () => calendar.removeEventListener("minerva-change", onChange);
}
