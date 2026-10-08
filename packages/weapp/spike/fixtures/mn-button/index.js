Component({
  properties: {
    label: { type: String, value: "" },
    disabled: { type: Boolean, value: false },
  },
  data: { count: 0 },
  methods: {
    onTap() {
      if (this.data.disabled) return;
      const count = this.data.count + 1;
      this.setData({ count });
      this.triggerEvent("press", { count });
    },
  },
});
