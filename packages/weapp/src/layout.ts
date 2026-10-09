import { windowInfo } from "./system-info";
import { nativeTranslate } from "./configuration";
import { resolveSpace } from "@minerva/core";
type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent" | "createSelectorQuery"
>;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
const text = (value = "") => ({ type: String, value });
const flag = (value = false) => ({ type: Boolean, value });
const optional = (value: unknown = null) => ({ type: null, value });
const resizeListeners = new WeakMap<object, () => void>();
function apply(
  c: Control,
  template: string,
  props: WechatMiniprogram.IAnyObject,
  methods: WechatMiniprogram.IAnyObject,
  extra: WechatMiniprogram.IAnyObject,
) {
  c.template = template;
  Object.assign(c.definition, extra, {
    properties: { ...c.definition.properties, ...props },
    methods: { ...c.definition.methods, ...methods },
  });
}
function space(value: string | number) {
  return resolveSpace(value);
}
function grid(this: Instance) {
  const d = this.data;
  const counts =
    typeof d.columns === "number" ? { base: d.columns } : d.columns || {};
  let value = 1;
  for (const [key, width] of [
    ["base", 0],
    ["sm", 480],
    ["md", 768],
    ["lg", 1200],
  ] as const) {
    const next = counts[key] ?? value;
    if (!Number.isInteger(next) || next < 1 || next > 12)
      throw new RangeError(
        "ResponsiveGrid columns must be integers from 1 to 12",
      );
    if ((d.containerWidth || 0) >= width) value = next;
  }
  this.setData({
    effectiveColumns: value,
    rowSpace: space(d.rowGap ?? d.gap),
    columnSpace: space(d.columnGap ?? d.gap),
  });
}
function split(this: Instance) {
  const d = this.data;
  const width = d.asideWidth ?? d.sidebarWidth ?? 320;
  if (!Number.isFinite(width) || width <= 0)
    throw new RangeError("SplitLayout asideWidth must be finite and positive");
  this.setData({
    stacked: d.containerWidth < (d.collapseBelow === "lg" ? 1200 : 768),
    effectiveAsideWidth: Math.min(width, (d.containerWidth || width * 2) / 2),
    layoutGap: space(d.gap),
  });
}
function shell(this: Instance) {
  const d = this.data;
  const effectiveMode = d.sidebarMode ?? d.localMode ?? d.defaultSidebarMode;
  const isMobile = d.containerWidth <= 768;
  const collapsed = !isMobile && effectiveMode !== "expanded";
  this.setData({
    effectiveMode,
    isMobile,
    collapsed,
    controlLabels: {
      expand: nativeTranslate(this, "appShell.expand"),
      collapse: nativeTranslate(this, "appShell.collapse"),
      enableFloating: nativeTranslate(this, "appShell.enableFloating"),
      disableFloating: nativeTranslate(this, "appShell.disableFloating"),
      openNavigation: nativeTranslate(this, "appShell.openNavigation"),
      closeNavigation: nativeTranslate(this, "appShell.closeNavigation"),
      ...d.labels,
    },
  });
  this.triggerEvent("navigationstate", {
    mode: effectiveMode,
    collapsed,
    isMobile,
    open: d.navigationOpen,
  });
}
function requestMode(self: Instance, mode: string) {
  if (self.data.sidebarMode === null) self.setData({ localMode: mode });
  shell.call(self);
  self.triggerEvent("sidebarmodechange", { mode });
}
function measure(
  self: Instance,
  update: (this: Instance) => void,
  width: number,
) {
  if (!Number.isFinite(width) || width < 0) return;
  self.setData({ containerWidth: width });
  update.call(self);
}
function observeLayout(update: (this: Instance) => void, viewport = false) {
  return {
    attached(this: Instance) {
      update.call(this);
    },
    ready(this: Instance) {
      if (typeof wx === "undefined") return;
      const refresh = () => {
        if (viewport) {
          const info = windowInfo();
          measure(this, update, info.windowWidth);
        } else
          this.createSelectorQuery()
            .select(".mn-measure-root")
            .boundingClientRect((rect) => {
              if (rect && !Array.isArray(rect))
                measure(this, update, rect.width);
            })
            .exec();
      };
      refresh();
      if (typeof wx.onWindowResize === "function") {
        resizeListeners.set(this, refresh);
        wx.onWindowResize(refresh);
      }
    },
    detached(this: Instance) {
      const listener = resizeListeners.get(this);
      if (
        listener &&
        typeof wx !== "undefined" &&
        typeof wx.offWindowResize === "function"
      )
        wx.offWindowResize(listener);
      resizeListeners.delete(this);
    },
  };
}
export function enhanceLayout(c: {
  responsiveGrid: Control;
  formLayout: Control;
  splitLayout: Control;
  appShell: Control;
}) {
  const gridProps = {
    columns: optional(1),
    gap: optional(4),
    rowGap: optional(),
    columnGap: optional(),
  };
  const gridExtra = () => ({
    data: {
      containerWidth: 0,
      effectiveColumns: 1,
      rowSpace: "",
      columnSpace: "",
    },
    observers: { "columns,gap,rowGap,columnGap": grid },
    lifetimes: observeLayout(grid),
  });
  const gridMethods = {
    measure(this: Instance, width: number) {
      measure(this, grid, width);
    },
  };
  apply(
    c.responsiveGrid,
    `<view class="mn-measure-root mn-grid" style="grid-template-columns:repeat({{effectiveColumns}},minmax(0,1fr));row-gap:{{rowSpace}};column-gap:{{columnSpace}}"><slot/></view>`,
    gridProps,
    gridMethods,
    gridExtra(),
  );
  apply(
    c.formLayout,
    `<form class="mn-measure-root mn-form-layout" style="grid-template-columns:repeat({{effectiveColumns}},minmax(0,1fr));row-gap:{{rowSpace}};column-gap:{{columnSpace}}" catchsubmit="onSubmit" catchreset="onReset"><slot/></form>`,
    gridProps,
    gridMethods,
    gridExtra(),
  );
  apply(
    c.splitLayout,
    `<view class="mn-measure-root mn-split-layout {{stacked?'mn-split-stacked':''}}" style="gap:{{layoutGap}};flex-direction:{{stacked?'column':reverse?'row-reverse':'row'}}"><view class="mn-split-main"><slot/></view><view wx:if="{{hasAside}}" class="mn-split-sidebar" style="width:{{stacked?'100%':effectiveAsideWidth+'px'}}"><slot name="aside"/><slot name="sidebar"/></view></view>`,
    {
      asideWidth: optional(),
      sidebarWidth: optional(320),
      collapseBelow: text("md"),
      gap: optional(6),
      hasAside: flag(true),
    },
    {
      measure(this: Instance, width: number) {
        measure(this, split, width);
      },
    },
    {
      data: {
        containerWidth: 0,
        stacked: true,
        effectiveAsideWidth: 320,
        layoutGap: "",
      },
      observers: { "asideWidth,sidebarWidth,collapseBelow,gap": split },
      lifetimes: observeLayout(split),
    },
  );
  apply(
    c.appShell,
    `<view class="mn-app-shell {{isMobile?'mn-shell-mobile':''}} mn-shell-{{effectiveMode}}"><view wx:if="{{isMobile && navigationOpen}}" class="mn-shell-backdrop" bindtap="closeNavigation"/><view class="mn-app-sidebar {{isMobile && !navigationOpen?'mn-shell-hidden':''}} {{isMobile?'mn-shell-drawer':''}}" role="{{isMobile?'dialog':'navigation'}}" aria-label="{{navigationLabel}}" style="width:{{isMobile?sidebarWidth:collapsed?64:sidebarWidth}}px"><view class="mn-shell-brand"><slot name="brandIcon"/>{{brandIcon}}<text wx:if="{{!collapsed}}">{{brand}}</text><slot name="brand"/></view><button wx:if="{{isMobile}}" class="mn-shell-close mn-button" aria-label="{{controlLabels.closeNavigation}}" bindtap="closeNavigation">×</button><slot name="navigation"/><slot name="sidebar"/><view wx:if="{{!isMobile}}" class="mn-shell-controls"><button class="mn-shell-expand mn-button" aria-label="{{collapsed?controlLabels.expand:controlLabels.collapse}}" bindtap="toggleSidebar">{{collapsed?'›':'‹'}}</button><button class="mn-shell-pin mn-button" aria-label="{{effectiveMode==='floating'?controlLabels.disableFloating:controlLabels.enableFloating}}" bindtap="toggleFloating">{{effectiveMode==='floating'?'●':'○'}}</button></view></view><view class="mn-shell-body"><view class="mn-app-header"><button wx:if="{{isMobile}}" class="mn-shell-open mn-button" aria-label="{{controlLabels.openNavigation}}" bindtap="openNavigation">☰</button><slot name="header"/><slot name="headerActions"/></view><slot name="pageNavigation"/><view class="mn-app-main" role="main"><slot/></view><view class="mn-app-footer"><slot name="footer"/></view></view></view>`,
    {
      brand: text(),
      brandIcon: text(),
      sidebarMode: optional(),
      defaultSidebarMode: text("expanded"),
      navigationLabel: text("Navigation"),
      navigationKey: text(),
      labels: optional({}),
    },
    {
      measure(this: Instance, width: number) {
        measure(this, shell, width);
      },
      toggleSidebar(this: Instance) {
        requestMode(this, this.data.collapsed ? "expanded" : "compact");
      },
      toggleFloating(this: Instance) {
        requestMode(
          this,
          this.data.effectiveMode === "floating" ? "compact" : "floating",
        );
      },
      expandNavigation(this: Instance) {
        requestMode(this, "expanded");
      },
      openNavigation(this: Instance) {
        this.setData({ navigationOpen: true });
        shell.call(this);
      },
      closeNavigation(this: Instance) {
        this.setData({ navigationOpen: false });
        shell.call(this);
      },
    },
    {
      data: {
        containerWidth: 1024,
        isMobile: false,
        collapsed: false,
        effectiveMode: "expanded",
        localMode: null,
        navigationOpen: false,
        controlLabels: {},
      },
      observers: {
        "sidebarMode,labels,localeLanguage": shell,
        navigationKey(this: Instance) {
          if (this.data.navigationOpen) {
            this.setData({ navigationOpen: false });
            shell.call(this);
          }
        },
      },
      lifetimes: {
        ...observeLayout(shell, true),
        attached(this: Instance) {
          this.setData({ localMode: this.data.defaultSidebarMode });
          shell.call(this);
        },
      },
    },
  );
}
