// mode="custom" renders options with renderOption (a string, a DOM node or
// a Lit template); filterOption / sortOption replace the default filtering
// and order; renderEmpty replaces the empty state.
type User = { label: string; value: string; description: string };
type Autocomplete = HTMLElement & {
  options: User[];
  filterOption: (text: string, option: User) => boolean;
  sortOption: (a: User, b: User) => number;
  renderOption: (option: User) => Node;
  renderEmpty: () => string;
};

export function setup(root: HTMLElement) {
  const input = root.querySelector<Autocomplete>("#user")!;
  input.options = [
    { label: "Ada Lovelace", value: "ada", description: "ada@example.com" },
    { label: "Grace Hopper", value: "grace", description: "grace@example.com" },
    { label: "Alan Turing", value: "alan", description: "turing@example.com" },
    {
      label: "Linus Torvalds",
      value: "linus",
      description: "linus@example.com",
    },
  ];
  input.filterOption = (text, option) => {
    const query = text.trim().toLowerCase();
    return (
      option.label.toLowerCase().includes(query) ||
      option.description.includes(query)
    );
  };
  input.sortOption = (a, b) => a.label.localeCompare(b.label);
  input.renderOption = (option) => {
    const row = document.createElement("div");
    row.style.cssText = "display: flex; gap: 8px; align-items: center";
    const avatar = document.createElement("span");
    avatar.textContent = option.label
      .split(" ")
      .map((word) => word[0])
      .join("");
    avatar.style.cssText =
      "display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--primary-color, #4f46e5); color: #fff; font-size: 12px";
    const text = document.createElement("span");
    text.innerHTML = `<strong></strong><br /><small style="opacity: 0.7"></small>`;
    text.querySelector("strong")!.textContent = option.label;
    text.querySelector("small")!.textContent = option.description;
    row.append(avatar, text);
    return row;
  };
  input.renderEmpty = () => "Nobody matches — try another name.";
}
