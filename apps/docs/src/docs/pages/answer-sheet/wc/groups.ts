// groups (a property) titles the sections: items render under the group
// whose key matches item.group. show-summary and show-legend add the
// "answered" count and a legend of the statuses present.
type AnswerSheetElement = HTMLElement & {
  items: Record<string, unknown>[];
  groups: { key: string; title: string }[];
};

export function setup(root: HTMLElement) {
  const sheet = root.querySelector<AnswerSheetElement>("#sheet")!;
  const output = root.querySelector<HTMLOutputElement>("#current")!;
  sheet.groups = [
    { key: "single", title: "Single choice" },
    { key: "multiple", title: "Multiple choice" },
    { key: "short", title: "Short answer" },
  ];
  sheet.items = [
    { key: "s1", group: "single", status: "correct" },
    { key: "s2", group: "single", status: "correct" },
    { key: "s3", group: "single", status: "wrong", flagged: true },
    { key: "s4", group: "single", status: "correct" },
    { key: "s5", group: "single", status: "skipped" },
    { key: "s6", group: "single", status: "correct" },
    { key: "m1", group: "multiple", status: "wrong" },
    { key: "m2", group: "multiple", status: "correct" },
    { key: "m3", group: "multiple", status: "answered", flagged: true },
    { key: "a1", group: "short", status: "answered" },
    { key: "a2", group: "short" },
    { key: "a3", group: "short", disabled: true },
  ];
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Reviewing: ${value}`;
  };
  sheet.addEventListener("minerva-change", onChange);
  return () => sheet.removeEventListener("minerva-change", onChange);
}
