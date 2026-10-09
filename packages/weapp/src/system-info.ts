/** Prefer focused SDK APIs; keep legacy compatibility only for older hosts. */
export const windowInfo = () =>
  typeof wx.getWindowInfo === "function"
    ? wx.getWindowInfo()
    : wx.getSystemInfoSync();

export const appBaseInfo = () =>
  typeof wx.getAppBaseInfo === "function"
    ? wx.getAppBaseInfo()
    : wx.getSystemInfoSync();
