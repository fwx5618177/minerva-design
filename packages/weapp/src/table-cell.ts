/** Native default for the table's cell-renderer generic; consumers may supply their own Component. */
export const tableCellContent = {
  template: `<view class="mn-table-cell-content" style="max-width:{{contentWidth}}"><text class="{{monospace?'mn-code':''}}">{{primary || value}}</text><text wx:if="{{secondary}}" class="mn-muted mn-cell-secondary">{{secondary}}</text><slot/></view>`,
  definition: {
    data: { contentWidth: "360px" },
    observers: {
      maxWidth(
        this: WechatMiniprogram.Component.TrivialInstance,
        value: string | number,
      ) {
        this.setData({
          contentWidth: typeof value === "number" ? `${value}px` : value,
        });
      },
    },
    options: { multipleSlots: true },
    properties: {
      primary: { type: String, value: "" },
      secondary: { type: String, value: "" },
      monospace: { type: Boolean, value: false },
      maxWidth: { type: null, value: 360 },
      value: { type: null, value: "" },
      row: { type: Object, value: {} },
      column: { type: Object, value: {} },
      rowKey: { type: null, value: null },
      rowIndex: { type: Number, value: 0 },
    },
  },
};
