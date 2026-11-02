// items is a property (an array of { key, status?, label?, flagged?,
// disabled?, group? }); value is the key of the current question and
// minerva-change reports the selected one. One tab stop: the arrow keys and
// Home / End move the focus, Enter / Space select.
type AnswerSheetElement = HTMLElement & {
  items: { key: string; status?: string }[];
};

export function setup(root: HTMLElement) {
  const sheet = root.querySelector<AnswerSheetElement>("#sheet")!;
  const output = root.querySelector<HTMLOutputElement>("#current")!;
  sheet.items = Array.from({ length: 12 }, (_, i) => ({
    key: `q${i + 1}`,
    status: i < 5 ? "answered" : "unanswered",
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Current question: ${value.slice(1)}`;
  };
  sheet.addEventListener("minerva-change", onChange);
  return () => sheet.removeEventListener("minerva-change", onChange);
}
