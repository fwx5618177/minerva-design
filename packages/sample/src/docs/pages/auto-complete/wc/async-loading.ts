// minerva-input fires on every keystroke: fetch the matches (simulated
// here with a timer) and show `loading` meanwhile. The options are already
// filtered, so filterOption accepts everything.
type Option = { label: string; value: string };
type Autocomplete = HTMLElement & {
  options: Option[];
  loading: boolean;
  filterOption: () => boolean;
};

const CITIES = [
  "Paris",
  "Pau",
  "Perth",
  "Porto",
  "Prague",
  "Tokyo",
  "Toronto",
  "Turin",
];

export function setup(root: HTMLElement) {
  const input = root.querySelector<Autocomplete>("#city")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  input.filterOption = () => true;
  const onInput = (event: Event) => {
    const text = (event as CustomEvent<{ value: string }>).detail.value;
    clearTimeout(timer);
    input.options = [];
    input.loading = text.trim().length >= 2;
    if (!input.loading) return;
    timer = setTimeout(() => {
      const query = text.trim().toLowerCase();
      input.options = CITIES.filter((city) =>
        city.toLowerCase().startsWith(query),
      ).map((city) => ({ label: city, value: city.toLowerCase() }));
      input.loading = false;
    }, 600);
  };
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-change: ${value}`;
  };
  input.addEventListener("minerva-input", onInput);
  input.addEventListener("minerva-change", onChange);
  return () => {
    clearTimeout(timer);
    input.removeEventListener("minerva-input", onInput);
    input.removeEventListener("minerva-change", onChange);
  };
}
