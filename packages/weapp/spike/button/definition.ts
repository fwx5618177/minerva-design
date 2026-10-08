// Component definition as a plain ES-module object. In the real build this
// object is what gets passed to `Component(...)` in dist/weapp/button/index.js;
// in tests it is spread into `simulate.load({ template, definition })`.
export const template = `<view class="mn-button {{disabled ? 'mn-button--disabled' : ''}}" bindtap="onTap">{{label}}</view>`;

export interface PressDetail {
  count: number;
}

export const definition = {
  properties: {
    label: { type: String, value: "" },
    disabled: { type: Boolean, value: false },
  },
  data: {
    count: 0,
  },
  methods: {
    onTap(this: any) {
      if (this.data.disabled) return;
      const count = this.data.count + 1;
      this.setData({ count });
      this.triggerEvent("press", { count } satisfies PressDetail);
    },
  },
};
