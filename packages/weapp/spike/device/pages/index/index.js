Page({
  data: {
    count: 0,
    text: "",
    checked: false,
    switchEvents: 0,
    choice: "a",
    options: [
      { value: "a", label: "Alpha" },
      { value: "blocked", label: "Blocked", disabled: true },
      { value: "b", label: "Beta" },
    ],
    open: false,
    theme: "light",
  },
  increment() {
    this.setData({ count: this.data.count + 1 });
  },
  input(e) {
    this.setData({ text: e.detail.value.toUpperCase() });
  },
  changeSwitch(e) {
    this.setData({
      checked: e.detail.checked,
      switchEvents: this.data.switchEvents + 1,
    });
  },
  select(e) {
    this.setData({ choice: e.detail.value });
  },
  openModal() {
    this.setData({ open: true });
  },
  modal(e) {
    this.setData({ open: e.detail.open });
  },
  theme() {
    this.setData({ theme: this.data.theme === "light" ? "dark" : "light" });
  },
});
