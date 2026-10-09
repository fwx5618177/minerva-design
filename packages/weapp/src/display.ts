type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
type Event = WechatMiniprogram.CustomEvent;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
const text = (value = "") => ({ type: String, value });
const flag = (value = false) => ({ type: Boolean, value });
const any = (value: unknown = null) => ({ type: null, value });
const sizes: Record<string, number> = {
  xsmall: 24,
  small: 32,
  medium: 48,
  large: 64,
  xlarge: 80,
  xxlarge: 96,
};
const pixelSize = (value: unknown) =>
  typeof value === "number" && value > 0 ? value : sizes[String(value)] || 48;
const initials = (name: string) => {
  const value = name.trim();
  return /^[\u3400-\u9fff\uf900-\ufaff]/.test(value)
    ? value[0]
    : value
        .split(/\s+/)
        .slice(0, 2)
        .map((x) => x[0]?.toUpperCase())
        .join("");
};
const cssLength = (value: unknown) =>
  typeof value === "number" ? `${value}px` : String(value ?? "");
function apply(
  c: Control,
  template: string,
  properties: WechatMiniprogram.IAnyObject,
  methods: WechatMiniprogram.IAnyObject = {},
  extra: WechatMiniprogram.IAnyObject = {},
) {
  c.template = template;
  Object.assign(c.definition, extra, {
    properties: { ...c.definition.properties, ...properties },
    methods: { ...c.definition.methods, ...methods },
  });
}
function syncAvatar(this: Instance) {
  this.setData({
    pixelSize: pixelSize(this.data.size),
    initials: initials(this.data.name || ""),
  });
}
interface AvatarItem {
  src?: string;
  name?: string;
  fallback?: string;
  alt?: string;
  size?: string | number;
  shape?: string;
}
const failedImages = new WeakMap<object, Map<number, string>>();
function syncGroup(this: Instance) {
  const items: AvatarItem[] = this.data.items;
  const max = Math.max(0, Math.floor(this.data.max));
  this.setData({
    pixelSize: pixelSize(this.data.size),
    overflowCount:
      Math.max(0, items.length - max) + Math.max(0, this.data.count),
    visible: items.slice(0, max).map((item, index) => ({
      ...item,
      index,
      failed: !!item.src && failedImages.get(this)?.get(index) === item.src,
      initials: item.fallback ?? initials(item.name || ""),
      pixelSize: pixelSize(item.size ?? this.data.size),
    })),
  });
}
function syncBadge(this: Instance) {
  this.setData({
    indicatorContent:
      this.data.content ??
      (this.data.count > this.data.max
        ? `${this.data.max}+`
        : String(this.data.count)),
    visible:
      this.data.content !== null ||
      this.data.dot ||
      this.data.count > 0 ||
      this.data.showZero,
    indicatorStyle: `border-radius:${cssLength(this.data.borderRadius)};border-width:${cssLength(this.data.borderWidth)}`,
  });
}
function syncProgress(this: Instance) {
  const d = this.data;
  const names: Record<string, number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xsmall: 12,
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
  };
  const percent = Math.round(
    Math.min(100, Math.max(0, (Number(d.value) / Math.max(1, d.max)) * 100)),
  );
  this.setData({
    percent,
    isIndeterminate: d.indeterminate || d.value === null,
    pixelSize: typeof d.size === "number" ? d.size : names[d.size] || 24,
    progressWidth: cssLength(d.width),
    firstRotation: Math.min(180, percent * 3.6),
    secondRotation: Math.max(0, percent * 3.6 - 180),
  });
}
export function enhanceDisplay(controls: {
  avatar: Control;
  avatarGroup: Control;
  badge: Control;
  card: Control;
  tag: Control;
  progressIndicator: Control;
}) {
  apply(
    controls.avatar,
    `<view class="mn-avatar mn-shape-{{shape}} {{stacked?'mn-avatar-stacked':''}}" role="img" aria-label="{{ariaLabel || name || 'Avatar'}}" style="width:{{pixelSize}}px;height:{{pixelSize}}px;font-size:{{pixelSize * .38}}px"><image wx:if="{{src && !failed}}" class="mn-avatar-image" src="{{src}}" mode="aspectFill" aria-label="{{alt || name}}" binderror="onError"/><view wx:else class="mn-avatar-fallback"><text>{{fallback || initials}}</text><slot name="fallback"/><slot/></view></view>`,
    {
      size: any("medium"),
      alt: text(),
      ariaLabel: text(),
      fallback: text(),
      stacked: flag(),
    },
    {
      onError(this: Instance, e: Event) {
        this.setData({ failed: true });
        this.triggerEvent("error", e.detail);
      },
    },
    {
      data: { failed: false, initials: "", pixelSize: 48 },
      observers: {
        "name,size": syncAvatar,
        src(this: Instance) {
          this.setData({ failed: false });
        },
      },
      lifetimes: { attached: syncAvatar },
    },
  );
  apply(
    controls.avatarGroup,
    `<view class="mn-avatar-group"><view wx:for="{{visible}}" wx:key="index" class="mn-avatar mn-avatar-stacked mn-shape-{{item.shape || shape}}" role="img" aria-label="{{item.alt || item.name || 'Avatar'}}" style="width:{{item.pixelSize}}px;height:{{item.pixelSize}}px;font-size:{{item.pixelSize * .38}}px"><image wx:if="{{item.src && !item.failed}}" class="mn-avatar-image" src="{{item.src}}" mode="aspectFill" data-index="{{index}}" binderror="onImageError"/><text wx:else>{{item.initials}}</text></view><view wx:if="{{overflowCount}}" class="mn-avatar mn-avatar-overflow mn-shape-{{shape}}" style="width:{{pixelSize}}px;height:{{pixelSize}}px">+{{overflowCount}}</view><slot/></view>`,
    {
      size: any("medium"),
      max: { type: Number, value: Number.MAX_SAFE_INTEGER },
      count: { type: Number, value: 0 },
      shape: text("circle"),
    },
    {
      onImageError(this: Instance, e: Event) {
        const i = Number(e.currentTarget.dataset.index);
        const map = failedImages.get(this) || new Map<number, string>();
        map.set(i, this.data.items[i]?.src);
        failedImages.set(this, map);
        syncGroup.call(this);
        this.triggerEvent("error", { index: i, item: this.data.items[i] });
      },
    },
    {
      data: { visible: [], pixelSize: 48, overflowCount: 0 },
      observers: { "items,max,count,size,shape": syncGroup },
      lifetimes: {
        attached: syncGroup,
        detached(this: Instance) {
          failedImages.delete(this);
        },
      },
    },
  );
  apply(
    controls.badge,
    `<view class="mn-badge"><slot/><text wx:if="{{visible}}" class="mn-badge-indicator mn-color-{{color}} mn-variant-{{variant}} mn-size-{{size}} mn-badge-{{position}} {{attached?'':'mn-badge-inline'}} {{dot?'mn-badge-dot':''}}" style="{{indicatorStyle}}" role="{{role}}" aria-label="{{ariaLabel}}"><text wx:if="{{!dot}}">{{icon}}{{indicatorContent}}</text><slot name="icon"/></text></view>`,
    {
      attached: flag(),
      content: any(),
      color: text("primary"),
      variant: text("solid"),
      size: text("medium"),
      position: text("top-right"),
      borderRadius: any(),
      borderWidth: any(),
      ariaLabel: text(),
      icon: text(),
      role: text("status"),
    },
    {},
    {
      data: { visible: false, indicatorContent: "", indicatorStyle: "" },
      observers: {
        "content,count,max,dot,showZero,borderRadius,borderWidth": syncBadge,
      },
      lifetimes: { attached: syncBadge },
    },
  );
  apply(
    controls.card,
    `<view class="mn-card mn-variant-{{variant}} {{padding?'mn-pad-'+padding:''}} {{interactive?'mn-card-interactive':''}} {{disabled?'mn-disabled':''}}" role="{{interactive?'button':''}}" aria-disabled="{{disabled}}" bindtap="onTap"><view class="mn-card-header {{headerPadding?'mn-pad-'+headerPadding:padding?'mn-pad-none':''}}"><text wx:if="{{title}}" class="mn-title">{{title}}</text><text wx:if="{{description}}" class="mn-muted">{{description}}</text><slot name="header"/></view><view class="mn-card-content {{contentPadding?'mn-pad-'+contentPadding:padding?'mn-pad-none':''}} {{animation?'mn-card-'+animation:''}}"><slot/></view><view class="mn-card-footer {{footerPadding?'mn-pad-'+footerPadding:padding?'mn-pad-none':''}}"><slot name="footer"/></view></view>`,
    {
      variant: text("default"),
      padding: text(),
      headerPadding: text(),
      contentPadding: text(),
      footerPadding: text(),
      interactive: flag(),
      disabled: flag(),
      href: text(),
      animation: text(),
    },
    {
      onTap(this: Instance) {
        if (this.data.disabled || !this.data.interactive) return;
        this.triggerEvent("click", {});
        if (this.data.href && typeof wx !== "undefined")
          wx.navigateTo({ url: this.data.href });
      },
    },
  );
  apply(
    controls.tag,
    `<view class="mn-tag mn-color-{{color}} mn-variant-{{variant}} mn-size-{{size}} mn-shape-{{shape}} {{pressed?'mn-pressed':''}} {{elevation?'mn-tag-elevated':''}} {{disabled || loading?'mn-disabled':''}}" role="{{clickable?'button':''}}" aria-pressed="{{pressed}}" aria-disabled="{{disabled || loading}}" bindtap="onTap"><view wx:if="{{loading}}" class="mn-spinner"/><image wx:elif="{{avatar}}" class="mn-tag-avatar" src="{{avatar}}" mode="aspectFill"/><text wx:elif="{{icon}}">{{icon}}</text><slot name="avatar"/><slot name="icon"/><slot/>{{label}}<button wx:if="{{closable && !loading}}" class="{{disabled?'mn-disabled':''}} mn-close" disabled="{{disabled}}" aria-label="{{closeLabel}}" catchtap="onClose"><slot name="close"/>{{closeIcon}}</button></view>`,
    {
      color: text("neutral"),
      size: text("medium"),
      shape: text("rounded"),
      clickable: flag(),
      pressed: flag(),
      icon: text(),
      avatar: text(),
      loading: flag(),
      elevation: flag(),
      closeIcon: text("×"),
      closeLabel: text("Remove"),
    },
    {
      onTap(this: Instance) {
        if (this.data.clickable && !this.data.disabled && !this.data.loading)
          this.triggerEvent("click", {});
      },
      onClose(this: Instance) {
        if (!this.data.disabled && !this.data.loading)
          this.triggerEvent("close", {});
      },
    },
  );
  apply(
    controls.progressIndicator,
    `<view class="mn-progress mn-color-{{color}} {{isIndeterminate?'mn-indeterminate':''}} {{full?'mn-progress-full':''}}" role="{{decorative?'':'progressbar'}}" aria-hidden="{{decorative}}" aria-label="{{ariaLabel || label || 'Loading'}}" aria-valuenow="{{isIndeterminate?'':percent}}" aria-valuemin="0" aria-valuemax="100" style="{{progressWidth?'width:'+progressWidth:''}}"><slot name="icon"/><text wx:if="{{icon}}">{{icon}}</text><view wx:elif="{{variant === 'circle' || variant === 'spinner'}}" class="mn-progress-{{variant}} {{isIndeterminate?'mn-progress-rotating':''}}" style="width:{{pixelSize}}px;height:{{pixelSize}}px"><block wx:if="{{!isIndeterminate}}"><view class="mn-ring-half mn-ring-right"><view class="mn-ring-fill" style="transform:rotate({{firstRotation}}deg)"/></view><view class="mn-ring-half mn-ring-left"><view class="mn-ring-fill" style="transform:rotate({{secondRotation}}deg)"/></view></block></view><view wx:elif="{{variant === 'wave' || variant === 'dottedBar'}}" class="mn-progress-segments" style="height:{{pixelSize}}px"><view wx:for="{{segments}}" wx:key="*this" class="{{variant === 'wave'?'mn-progress-wave-segment':'mn-progress-dot'}}" style="animation-delay:{{item * .12}}s"/></view><view wx:else class="mn-progress-track"><view class="mn-progress-fill" style="width:{{isIndeterminate?35:percent}}%"/></view><text wx:if="{{label}}">{{label}}</text><text wx:elif="{{showLabel}}">{{percent}}%</text></view>`,
    {
      value: any(),
      variant: text("spinner"),
      size: any("medium"),
      color: text("primary"),
      label: text(),
      ariaLabel: text(),
      icon: text(),
      decorative: flag(),
      width: any(),
      full: flag(),
    },
    {},
    {
      data: {
        percent: 0,
        pixelSize: 24,
        isIndeterminate: true,
        segments: [0, 1, 2, 3, 4],
        progressWidth: "",
        firstRotation: 0,
        secondRotation: 0,
      },
      observers: { "value,max,size,width,indeterminate": syncProgress },
      lifetimes: { attached: syncProgress },
    },
  );
}
