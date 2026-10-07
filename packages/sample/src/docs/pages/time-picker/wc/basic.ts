// minerva-change fires when a time is picked, typed (then normalized on
// blur) or cleared; valueAsDate gives it as today's Date.
type TimePicker = HTMLElement & { value: string; valueAsDate: Date | null };

export function setup(root: HTMLElement) {
  const picker = root.querySelector<TimePicker>("#alarm")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onChange = () => {
    const date = picker.valueAsDate;
    result.value = date
      ? `value = ${picker.value} (${date.toLocaleTimeString()})`
      : "Cleared";
  };
  picker.addEventListener("minerva-change", onChange);
  return () => picker.removeEventListener("minerva-change", onChange);
}
