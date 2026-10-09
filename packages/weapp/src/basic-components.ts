import { resolveSpace } from "@minerva/core";
import { nativeTranslate as t } from "./configuration";
type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
type Event = WechatMiniprogram.CustomEvent<{ value: string }>;
const text = (value = "") => ({ type: String, value }),
  number = (value = 0) => ({ type: Number, value }),
  flag = (value = false) => ({ type: Boolean, value }),
  optional = (value: unknown = null) => ({ type: null, value });
function patch(
  c: Control,
  template: string,
  properties: WechatMiniprogram.IAnyObject,
  methods: WechatMiniprogram.IAnyObject = {},
  extra: WechatMiniprogram.IAnyObject = {},
) {
  c.template = template;
  c.definition = {
    ...c.definition,
    ...extra,
    properties: { ...c.definition.properties, ...properties },
    methods: { ...c.definition.methods, ...methods },
  };
}
const px = (value: unknown) =>
  typeof value === "number" ? `${value}px` : String(value ?? "");
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;
function css(style: Record<string, unknown> = {}) {
  return Object.entries(style)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${typeof v === "number" && !["opacity", "zIndex", "flex", "flexGrow", "flexShrink", "fontWeight", "lineHeight"].includes(k) ? px(v) : v}`,
    )
    .join(";");
}
function dividerSync(self: Instance) {
  const d = self.data,
    vertical = d.vertical || d.orientation === "vertical",
    length = px(
      d.length ?? (vertical ? (d.flexItem ? "auto" : "1em") : "100%"),
    );
  self.setData({
    isVertical: vertical,
    dividerStyle: vertical
      ? `height:${length};margin:0 ${d.spacing}px;align-self:${d.flexItem ? "stretch" : "auto"}`
      : `width:${length};margin:${d.spacing}px 0`,
    lineStyle: `border-${vertical ? "left" : "top"}:${d.thickness}px ${d.variant} var(--border-color)`,
  });
}
function emptySync(self: Instance) {
  self.setData({
    emptyStyle: css({ width: self.data.width, height: self.data.height }),
    descriptionText:
      self.data.description === null
        ? null
        : self.data.description || t(self, "empty.description"),
  });
}
function pressedSync(self: Instance) {
  const d = self.data;
  self.setData({
    effectivePressed: d.pressed === null ? d.localPressed : d.pressed,
    isToggle: d.pressed !== null || d.defaultPressed !== null || d.toggle,
    tooltipText: d.tooltip?.content || d.label,
    tooltipEnabled: d.showTooltip === null ? !!d.label : d.showTooltip,
  });
}
function jsonValidate(self: Instance) {
  let error = "";
  try {
    if (self.data.text.trim()) JSON.parse(self.data.text);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  self.setData({
    jsonValid: !error,
    error: error
      ? `${self.data.invalidLabel || t(self, "jsonField.invalid")}: ${error}`
      : "",
    validText: self.data.validLabel || t(self, "jsonField.valid"),
    formatText: self.data.formatLabel || t(self, "jsonField.format"),
  });
}
function jsonSync(self: Instance) {
  const value =
    self.data.value === null ? self.data.localText : self.data.value;
  self.setData({
    text:
      typeof value === "string"
        ? value
        : JSON.stringify(value ?? {}, null, self.data.indent),
  });
  jsonValidate(self);
}
function jsonEdit(self: Instance, value: string) {
  if (blocked(self)) return;
  const objectMode =
    self.data.value !== null && typeof self.data.value === "object";
  if (objectMode) {
    self.setData({ text: value });
    jsonValidate(self);
    if (self.data.jsonValid) {
      try {
        self.triggerEvent("change", { value: JSON.parse(value) });
      } catch {
        /* Empty object-mode input is invalid JSON. */
      }
    }
  } else {
    if (self.data.value === null) self.setData({ localText: value });
    self.triggerEvent("change", { value });
    jsonSync(self);
  }
  if (!self.data.jsonValid)
    self.triggerEvent("error", { message: self.data.error });
}
const groupUnset = false;
function groupSync(self: Instance) {
  self.setData({
    effectiveValue:
      self.data.value === groupUnset ? self.data.localValue : self.data.value,
  });
}
interface SelectOption {
  value?: string;
  label?: string;
  disabled?: boolean;
  type?: "group" | "separator" | "label";
  items?: SelectOption[];
  textValue?: string;
  group?: string;
  description?: string;
  icon?: string;
}
function selectSync(self: Instance) {
  const d = self.data,
    effectiveValue = d.value === null ? d.localValue : d.value,
    flat: Record<string, unknown>[] = [];
  let index = 0;
  function walk(options: SelectOption[], group = "") {
    for (const o of options) {
      if (o.type === "group") {
        flat.push({ type: "label", label: o.label, key: `group-${index++}` });
        walk(o.items || [], o.label);
        continue;
      }
      flat.push({
        ...o,
        group,
        key: `option-${index++}`,
        type: o.type || "option",
      });
    }
  }
  walk(d.options);
  const selected = flat.find(
    (o) => o.value === effectiveValue && o.type === "option",
  );
  const query = d.query.trim().toLowerCase();
  const filtered = query
    ? flat.filter(
        (o) =>
          o.type === "option" &&
          String(o.textValue || o.label || "")
            .toLowerCase()
            .includes(query),
      )
    : flat;
  self.setData({
    effectiveValue,
    expanded: d.open === null ? d.localOpen : d.open,
    selectedLabel: selected?.label || "",
    filtered: filtered.map((o, i) => ({ ...o, index: i })),
    searchLabel: d.searchPlaceholder || t(self, "searchField.placeholder"),
    emptyLabel: d.emptyText || t(self, "cascader.noResults"),
  });
}
function selectOpen(self: Instance, open: boolean) {
  if (blocked(self)) return;
  if (self.data.open === null) self.setData({ localOpen: open });
  selectSync(self);
  self.triggerEvent("openchange", { open });
}
function tabSync(self: Instance) {
  self.setData({
    effectiveValue:
      self.data.value === null ? self.data.localValue : self.data.value,
  });
}
function skeletonSync(self: Instance) {
  const d = self.data,
    variant = d.circle ? "circular" : d.variant,
    circular = variant === "circular";
  const width = circular && d.decorative ? (d.size ?? d.width ?? 32) : d.width,
    height = circular && d.decorative ? (d.size ?? d.width ?? 32) : d.height;
  self.setData({
    effectiveVariant: variant,
    lineStyle: css({
      width: width ?? (variant === "button" ? 120 : "100%"),
      height:
        height ??
        (variant === "text"
          ? "16px"
          : variant === "button"
            ? "var(--control-height-md)"
            : variant === "rectangular"
              ? 120
              : null),
      paddingTop: variant === "image" ? "56.25%" : null,
      borderRadius: d.borderRadius,
    }),
    avatarStyle: css({ width: d.avatarSize, height: d.avatarSize }),
    lineItems: Array.from(
      {
        length: d.decorative
          ? 1
          : d.title || d.paragraph || variant === "card"
            ? 0
            : Number.isFinite(d.lines)
              ? Math.max(0, Math.floor(d.lines))
              : 0,
      },
      (_, i) => i,
    ),
    paragraphLines: ["100%", "100%", "92%", "60%"],
    loadingLabel: d.ariaLabel || t(self, "common.loading"),
  });
}
const copyTimers = new WeakMap<object, ReturnType<typeof setTimeout>>(),
  copyMounted = new WeakSet<object>();
function copyLabels(self: Instance) {
  const key = self.data.copyState === "idle" ? "copy" : self.data.copyState;
  const label = t(self, `codeBlock.${key}`);
  self.setData({
    copyLabel: label,
    copyStatus: self.data.copyState === "idle" ? "" : label,
    codeRegionLabel: self.data.ariaLabel || t(self, "codeBlock.label"),
  });
}
function copyFeedback(self: Instance, state: "copied" | "copyFailed") {
  if (!copyMounted.has(self)) return;
  self.setData({ copyState: state });
  copyLabels(self);
  clearTimeout(copyTimers.get(self));
  copyTimers.set(
    self,
    setTimeout(() => {
      if (!copyMounted.has(self)) return;
      self.setData({ copyState: "idle" });
      copyLabels(self);
    }, 2000),
  );
}
const tooltipTimers = new WeakMap<object, ReturnType<typeof setTimeout>>();
function tooltipSync(self: Instance) {
  self.setData({
    visible:
      !self.data.disabled &&
      (self.data.open === null ? self.data.localOpen : self.data.open),
    tooltipStyle: css({
      zIndex: self.data.zIndex,
      transform: `translate(${self.data.offset[0]}px, ${self.data.offset[1]}px)`,
    }),
  });
}
function tooltipRequest(self: Instance, open: boolean, delay = 0) {
  clearTimeout(tooltipTimers.get(self));
  if (self.data.disabled && open) return;
  const update = () => {
    if (self.data.open === null) self.setData({ localOpen: open });
    tooltipSync(self);
    self.triggerEvent("openchange", { open });
    self.triggerEvent(open ? "open" : "close", {});
  };
  if (delay > 0) tooltipTimers.set(self, setTimeout(update, delay));
  else update();
}
function textareaSync(self: Instance) {
  self.setData({
    text: self.data.value === null ? self.data.localText : self.data.value,
  });
}
export function enhanceBasics(c: {
  input: Control;
  statCard: Control;
  loadingState: Control;
  textLink: Control;
  divider: Control;
  empty: Control;
  iconButton: Control;
  jsonField: Control;
  radio: Control;
  radioGroup: Control;
  select: Control;
  tabs: Control;
  skeleton: Control;
  skeletonText: Control;
  tooltip: Control;
  codeBlock: Control;
  list: Control;
  descriptionList: Control;
  textarea: Control;
  toggle: Control;
}) {
  Object.assign(c.statCard.definition.properties, { icon: text() });
  c.statCard.template = c.statCard.template.replace(
    '<text class="mn-muted">{{label}}</text>',
    '<view class="mn-stat-heading"><text class="mn-muted">{{label}}</text><view aria-hidden="true"><slot name="icon"/>{{icon}}</view></view>',
  );
  Object.assign(c.loadingState.definition.properties, {
    size: text("medium"),
    label: text(),
  });
  c.loadingState.template = c.loadingState.template
    .replace(
      'class="mn-loading-state"',
      'class="mn-loading-state mn-loading-{{size}}" role="status" aria-live="polite" aria-atomic="true"',
    )
    .replace("{{label}}", "{{label || loadingLabel}}");
  c.loadingState.definition.observers = {
    ...c.loadingState.definition.observers,
    localeLanguage(this: Instance) {
      this.setData({ loadingLabel: t(this, "loadingState.label") });
    },
  };
  c.loadingState.definition.lifetimes = {
    attached(this: Instance) {
      this.setData({ loadingLabel: t(this, "loadingState.label") });
    },
  };
  Object.assign(c.textLink.definition.properties, { variant: text("default") });
  c.textLink.template = c.textLink.template
    .replaceAll(
      'class="mn-text-link',
      'class="mn-text-link mn-text-link-{{variant}}',
    )
    .replaceAll(
      "{{label}}</",
      '{{label}}<text wx:if="{{variant!==\'default\'}}" class="mn-text-link-chevron" aria-hidden="true">›</text></',
    );
  patch(
    c.input,
    `<view class="mn-input-wrapper mn-input-{{variant}} mn-control-{{size}} {{invalid?'mn-invalid':''}} {{disabled?'mn-disabled':''}}"><text wx:if="{{prefix}}">{{prefix}}</text><slot name="prefix"/><input class="mn-input {{disabled || readOnly?'mn-disabled':''}}" value="{{text}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" name="{{name}}" type="{{type==='password'?'text':type}}" password="{{(password || type==='password') && !passwordVisible}}" maxlength="{{maxlength}}" focus="{{focused}}" aria-invalid="{{invalid}}" aria-required="{{required}}" bindinput="onInput" bindfocus="onFocus" bindblur="onBlur" bindconfirm="onConfirm"/><button wx:if="{{clearable && text && !disabled && !readOnly}}" class="mn-close mn-input-clear" aria-label="{{clearText}}" bindtap="onClear">×</button><button wx:if="{{password || type==='password'}}" class="mn-close mn-password-toggle {{disabled?'mn-disabled':''}}" disabled="{{disabled}}" aria-label="{{passwordVisible?hidePasswordText:showPasswordText}}" bindtap="onPassword">{{passwordVisible?hidePasswordText:showPasswordText}}</button><text wx:if="{{showCharCount}}" class="mn-muted">{{text.length}}{{maxlength>0?' / '+maxlength:''}}</text><text wx:if="{{suffix}}">{{suffix}}</text><slot name="suffix"/></view>`,
    {
      value: optional(),
      defaultValue: text(),
      maxlength: number(-1),
      clearLabel: text(),
      showPasswordLabel: text(),
      hidePasswordLabel: text(),
    },
    {
      onInput(this: Instance, e: Event) {
        if (blocked(this)) return this.data.text;
        if (this.data.value === null)
          this.setData({ localText: e.detail.value });
        this.triggerEvent("change", { value: e.detail.value });
        textareaSync(this);
        return this.data.text;
      },
      onClear(this: Instance) {
        if (blocked(this)) return;
        if (this.data.value === null) this.setData({ localText: "" });
        this.triggerEvent("change", { value: "" });
        textareaSync(this);
        this.triggerEvent("clear", {});
        this.setData({ focused: true });
      },
      onConfirm(this: Instance) {
        this.triggerEvent("confirm", { value: this.data.text });
      },
    },
    {
      data: { text: "", localText: "", focused: false, passwordVisible: false },
      observers: {
        value(this: Instance) {
          textareaSync(this);
        },
        "clearLabel,showPasswordLabel,hidePasswordLabel,localeLanguage":
          function (this: Instance) {
            this.setData({
              clearText: this.data.clearLabel || t(this, "input.clear"),
              showPasswordText:
                this.data.showPasswordLabel || t(this, "input.showPassword"),
              hidePasswordText:
                this.data.hidePasswordLabel || t(this, "input.hidePassword"),
            });
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({
            localText: this.data.defaultValue,
            clearText: this.data.clearLabel || t(this, "input.clear"),
            showPasswordText:
              this.data.showPasswordLabel || t(this, "input.showPassword"),
            hidePasswordText:
              this.data.hidePasswordLabel || t(this, "input.hidePassword"),
          });
          textareaSync(this);
        },
      },
    },
  );
  patch(
    c.divider,
    `<view class="mn-native-divider {{isVertical?'mn-native-divider-vertical':''}} {{elevation?'mn-divider-elevated':''}} mn-divider-align-{{textAlign}} mn-divider" role="separator" aria-orientation="{{isVertical?'vertical':'horizontal'}}" style="{{dividerStyle}}"><view class="mn-divider-line" style="{{lineStyle}}"/><text wx:if="{{!isVertical && label}}" class="mn-divider-label">{{label}}</text><view wx:if="{{!isVertical && label}}" class="mn-divider-line" style="{{lineStyle}}"/></view>`,
    {
      orientation: text("horizontal"),
      variant: text("solid"),
      thickness: number(1),
      length: optional(),
      spacing: number(16),
      textAlign: text("center"),
      elevation: flag(),
      flexItem: flag(),
    },
    {},
    {
      data: { dividerStyle: "", lineStyle: "", isVertical: false },
      observers: {
        "orientation,vertical,thickness,length,spacing,variant,flexItem":
          function (this: Instance) {
            dividerSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          dividerSync(this);
        },
      },
    },
  );
  patch(
    c.empty,
    `<view class="mn-empty {{size?'mn-empty-'+size:''}} {{showShadow?'mn-empty-shadow':''}}" style="{{emptyStyle}}" role="status" aria-label="{{title}}"><view wx:if="{{icon!==null && icon!==false}}" class="mn-empty-icon"><slot name="icon"/><view wx:if="{{useSvg && !icon}}" class="mn-empty-illustration"><view class="mn-empty-ellipse"/><view class="mn-empty-box"/><view class="mn-empty-box-lip"/></view><text>{{icon || (useSvg?'':'□')}}</text></view><text wx:if="{{title}}" class="mn-title">{{title}}</text><text wx:if="{{descriptionText!==null}}" class="mn-muted">{{descriptionText}}</text><view class="mn-empty-actions"><slot name="action"/><slot name="secondaryAction"/></view><slot/></view>`,
    {
      size: text(),
      width: optional(),
      height: optional(),
      showShadow: flag(),
      icon: optional(""),
      description: optional(""),
      useSvg: flag(),
    },
    {},
    {
      data: { emptyStyle: "", descriptionText: "" },
      observers: {
        "width,height,description,localeLanguage": function (this: Instance) {
          emptySync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          emptySync(this);
        },
      },
    },
  );
  patch(
    c.iconButton,
    `<view class="mn-icon-button-root"><button class="mn-button mn-icon-button mn-size-{{size}} mn-color-{{color}} mn-variant-{{variant}} mn-icon-shape-{{shape}} {{disabled || loading?'mn-disabled':''}} {{effectivePressed?'mn-active':''}}" aria-label="{{label}}" aria-pressed="{{isToggle?effectivePressed:undefined}}" aria-busy="{{loading}}" disabled="{{disabled || loading}}" bindtap="onTap" bindlongpress="onTooltip"><view wx:if="{{loading}}" class="mn-spinner"/><block wx:else><slot/>{{icon}}</block></button><view wx:if="{{tooltipVisible && tooltipEnabled}}" class="mn-tooltip mn-popup mn-color-{{tooltip.color || 'neutral'}} mn-variant-{{tooltip.variant || 'solid'}} mn-tooltip-{{tooltip.shape || 'default'}}" bindtap="onTooltipClose">{{tooltipText}}</view></view>`,
    {
      size: text("medium"),
      color: text("neutral"),
      shape: text("circle"),
      pressed: optional(),
      defaultPressed: optional(),
      toggle: flag(),
      tooltip: optional({}),
      showTooltip: optional(),
    },
    {
      onTap(this: Instance) {
        if (this.data.disabled || this.data.loading) return;
        if (this.data.isToggle) {
          const pressed = !this.data.effectivePressed;
          if (this.data.pressed === null)
            this.setData({ localPressed: pressed });
          pressedSync(this);
          this.triggerEvent("pressedchange", { pressed });
        }
        this.triggerEvent("click", {});
      },
      onTooltip(this: Instance) {
        if (this.data.tooltipEnabled && !this.data.disabled)
          this.setData({ tooltipVisible: true });
      },
      onTooltipClose(this: Instance) {
        this.setData({ tooltipVisible: false });
      },
    },
    {
      data: {
        localPressed: false,
        effectivePressed: false,
        isToggle: false,
        tooltipVisible: false,
      },
      observers: {
        "pressed,toggle,label,showTooltip,tooltip": function (this: Instance) {
          pressedSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localPressed: !!this.data.defaultPressed });
          pressedSync(this);
        },
      },
    },
  );
  patch(
    c.jsonField,
    `<view class="mn-json-field"><textarea class="mn-input mn-code mn-textarea mn-textarea-{{size}} mn-input-{{variant}} {{invalid || !jsonValid?'mn-invalid':''}} {{disabled || readOnly?'mn-disabled':''}}" value="{{text}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" style="min-height:{{rows*24}}px" maxlength="{{maxlength}}" aria-invalid="{{invalid || !jsonValid}}" bindinput="onInput"/><view wx:if="{{!hideToolbar}}" class="mn-json-toolbar"><button class="mn-close mn-json-format" aria-label="{{formatText}}" disabled="{{disabled || readOnly || !jsonValid}}" bindtap="onFormat">{{formatText}}</button></view><text wx:if="{{text}}" class="{{jsonValid?'mn-muted':'mn-error'}}" role="status">{{jsonValid?validText:error}}</text></view>`,
    {
      value: optional(),
      defaultValue: text(),
      indent: number(2),
      hideToolbar: flag(),
      formatLabel: text(),
      validLabel: text(),
      invalidLabel: text(),
      rows: number(8),
      size: text("medium"),
      variant: text("outline"),
      invalid: flag(),
      placeholder: text(),
      maxlength: number(-1),
    },
    {
      onInput(this: Instance, e: Event) {
        jsonEdit(this, e.detail.value);
        return this.data.text;
      },
      onFormat(this: Instance) {
        if (blocked(this) || !this.data.jsonValid || !this.data.text.trim())
          return;
        jsonEdit(
          this,
          JSON.stringify(
            JSON.parse(this.data.text),
            null,
            Math.max(0, Math.min(10, Math.trunc(this.data.indent))),
          ),
        );
      },
    },
    {
      data: { text: "", localText: "", error: "", jsonValid: true },
      observers: {
        "value,indent,validLabel,invalidLabel,formatLabel,localeLanguage":
          function (this: Instance) {
            jsonSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localText: this.data.defaultValue });
          jsonSync(this);
        },
      },
    },
  );
  Object.assign(c.radio.definition.properties, {
    name: text(),
    size: text("medium"),
    color: text("primary"),
    error: flag(),
    required: flag(),
    errorMessage: text(),
    helperText: text(),
    errorIcon: text("!"),
    ariaLabel: text(),
  });
  c.radio.template = `<view role="radio" aria-label="{{ariaLabel || label}}" aria-checked="{{effectiveChecked}}" aria-disabled="{{disabled}}" aria-invalid="{{error}}" aria-required="{{required}}" class="mn-choice mn-choice-size-{{size}} mn-choice-color-{{color}} {{disabled || readOnly?'mn-disabled':''}} {{error?'mn-invalid':''}}" bindtap="onChoose"><text class="mn-choice-indicator mn-radio {{effectiveChecked?'mn-active':''}}">{{effectiveChecked?'●':''}}</text><view class="mn-choice-content"><text>{{label}}</text><slot/></view><text wx:if="{{error && errorMessage || helperText}}" class="mn-choice-helper {{error?'mn-error':''}}"><block wx:if="{{error}}"><slot name="errorIcon"/>{{errorIcon}}</block>{{error && errorMessage?errorMessage:helperText}}</text></view>`;
  patch(
    c.radioGroup,
    `<view class="mn-radio-group mn-{{direction}} {{error?'mn-invalid':''}}" role="radiogroup" aria-label="{{ariaLabel || label}}" aria-required="{{required}}" aria-invalid="{{error}}"><text wx:if="{{label}}">{{label}}</text><view wx:for="{{options}}" wx:key="value" class="mn-choice mn-choice-size-{{size || item.size || 'medium'}} mn-choice-color-{{color || item.color || 'primary'}} {{disabled || readOnly || item.disabled?'mn-disabled':''}}" role="radio" aria-checked="{{effectiveValue===item.value}}" aria-disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onSelect"><text class="mn-choice-indicator mn-radio {{effectiveValue===item.value?'mn-active':''}}">{{effectiveValue===item.value?'●':''}}</text><text>{{item.label}}</text></view><slot/><text wx:if="{{helperText}}" class="mn-choice-helper {{error?'mn-error':''}}">{{helperText}}</text></view>`,
    {
      value: optional(groupUnset),
      defaultValue: optional(),
      label: text(),
      ariaLabel: text(),
      size: text(),
      color: text(),
      required: flag(),
      error: flag(),
      helperText: text(),
    },
    {
      onSelect(this: Instance, e: Event) {
        const o = this.data.options[Number(e.currentTarget.dataset.index)];
        if (
          blocked(this) ||
          !o ||
          o.disabled ||
          o.value === this.data.effectiveValue
        )
          return;
        if (this.data.value === groupUnset)
          this.setData({ localValue: o.value });
        groupSync(this);
        this.triggerEvent("change", { value: o.value });
      },
    },
    {
      data: { localValue: null, effectiveValue: null },
      observers: {
        value(this: Instance) {
          groupSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localValue: this.data.defaultValue });
          groupSync(this);
        },
      },
    },
  );
  patch(
    c.select,
    `<view class="mn-select"><button class="mn-input mn-select-trigger mn-control-{{size}} {{invalid?'mn-invalid':''}} {{disabled || readOnly?'mn-disabled':''}}" role="combobox" aria-expanded="{{expanded}}" aria-invalid="{{invalid}}" aria-required="{{required}}" aria-label="{{ariaLabel}}" disabled="{{disabled || readOnly}}" bindtap="onToggle">{{selectedLabel || placeholder}} ▾</button><view wx:if="{{expanded}}" class="mn-popup {{contentClassName}}" role="listbox"><input wx:if="{{searchable}}" class="mn-input" value="{{query}}" placeholder="{{searchLabel}}" bindinput="onQuery"/><block wx:for="{{filtered}}" wx:key="key"><view wx:if="{{item.type==='label'}}" class="mn-select-group">{{item.label}}</view><view wx:elif="{{item.type==='separator'}}" class="mn-divider" role="separator"/><button wx:else role="option" aria-selected="{{effectiveValue===item.value}}" class="mn-option {{effectiveValue===item.value?'mn-active':''}} {{item.disabled?'mn-disabled':''}}" disabled="{{item.disabled}}" data-index="{{index}}" bindtap="onChoose"><text>{{item.icon}}</text>{{item.label}}<text class="mn-muted">{{item.description}}</text></button></block><text wx:if="{{!filtered.length}}" class="mn-muted">{{emptyLabel}}</text><slot name="content"/></view><slot/></view>`,
    {
      value: optional(),
      defaultValue: text(),
      open: optional(),
      defaultOpen: flag(),
      size: text("medium"),
      invalid: flag(),
      required: flag(),
      name: text(),
      ariaLabel: text(),
      contentClassName: text(),
      searchPlaceholder: text(),
      emptyText: text(),
    },
    {
      onToggle(this: Instance) {
        selectOpen(this, !this.data.expanded);
      },
      onQuery(this: Instance, e: Event) {
        if (blocked(this)) return;
        this.setData({ query: e.detail.value });
        selectSync(this);
      },
      onChoose(this: Instance, e: Event) {
        const o = this.data.filtered[Number(e.currentTarget.dataset.index)];
        if (blocked(this) || !o || o.disabled || o.type !== "option") return;
        if (this.data.value === null) this.setData({ localValue: o.value });
        selectSync(this);
        this.triggerEvent("change", { value: o.value });
        selectOpen(this, false);
      },
    },
    {
      data: {
        localValue: "",
        localOpen: false,
        effectiveValue: "",
        query: "",
        filtered: [],
        expanded: false,
      },
      observers: {
        "value,open,options,searchPlaceholder,emptyText,localeLanguage":
          function (this: Instance) {
            selectSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({
            localValue: this.data.defaultValue,
            localOpen: this.data.defaultOpen,
          });
          selectSync(this);
        },
      },
    },
  );
  patch(
    c.tabs,
    `<view class="mn-tabs mn-tabs-{{orientation}} mn-tabs-{{variant}} mn-color-{{color}}" style="direction:{{dir}}"><view class="mn-tabs-list" role="tablist" aria-orientation="{{orientation}}"><view wx:for="{{items}}" wx:key="value" class="mn-tab mn-color-{{item.color || color}} {{item.value===effectiveValue?'mn-active':''}}"><button class="mn-option {{disabled || item.disabled?'mn-disabled':''}}" role="tab" aria-selected="{{item.value===effectiveValue}}" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onChoose">{{item.label}}</button></view></view><block wx:for="{{items}}" wx:key="value"><view wx:if="{{item.forceMount || item.value===effectiveValue}}" hidden="{{item.value!==effectiveValue}}" class="mn-tab-panel" role="tabpanel">{{item.content}}<slot name="{{item.value}}"/></view></block><slot/></view>`,
    {
      value: optional(),
      defaultValue: text(),
      orientation: text("horizontal"),
      variant: text("line"),
      color: text("primary"),
      dir: text("ltr"),
      activationMode: text("automatic"),
    },
    {
      onChoose(this: Instance, e: Event) {
        const item = this.data.items[Number(e.currentTarget.dataset.index)];
        if (
          blocked(this) ||
          !item ||
          item.disabled ||
          item.value === this.data.effectiveValue
        )
          return;
        if (this.data.value === null) this.setData({ localValue: item.value });
        tabSync(this);
        this.triggerEvent("change", { value: item.value });
      },
    },
    {
      data: { localValue: "", effectiveValue: "" },
      observers: {
        value(this: Instance) {
          tabSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localValue: this.data.defaultValue });
          tabSync(this);
        },
      },
    },
  );
  patch(
    c.skeleton,
    `<view wx:if="{{loading}}" class="mn-skeleton-root {{effectiveVariant==='card'?'mn-skeleton-card-root':''}} {{active?'mn-skeleton-active':''}}" role="{{decorative?'none':'status'}}" aria-hidden="{{decorative}}" aria-busy="{{!decorative}}" aria-label="{{loadingLabel}}"><view wx:if="{{avatar && !decorative}}" class="mn-skeleton mn-skeleton-{{avatarShape}} mn-skeleton-{{animation}}" style="{{avatarStyle}}"/><view class="mn-skeleton-lines"><view wx:if="{{title && !decorative}}" class="mn-skeleton mn-skeleton-title mn-skeleton-{{animation}}"/><view wx:if="{{paragraph && !decorative}}" wx:for="{{paragraphLines}}" wx:key="*this" class="mn-skeleton mn-skeleton-paragraph mn-skeleton-{{animation}}" style="width:{{item}}"/><view wx:for="{{lineItems}}" wx:key="*this" class="mn-skeleton mn-skeleton-line mn-skeleton-{{effectiveVariant}} mn-skeleton-{{animation}}" style="{{lineStyle}}"/></view></view><block wx:else><slot/></block>`,
    {
      variant: text("text"),
      animation: text("pulse"),
      decorative: flag(),
      size: optional(),
      width: optional(),
      height: optional(),
      loading: flag(true),
      borderRadius: optional(),
      lines: number(1),
      avatar: flag(),
      avatarSize: optional(40),
      avatarShape: text("circle"),
      active: flag(),
      paragraph: flag(),
      title: flag(),
      ariaLabel: text(),
    },
    {},
    {
      data: {
        lineItems: [],
        lineStyle: "",
        avatarStyle: "",
        effectiveVariant: "text",
      },
      observers: {
        "variant,circle,decorative,size,width,height,borderRadius,lines,avatarSize,paragraph,title,ariaLabel,localeLanguage":
          function (this: Instance) {
            skeletonSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          skeletonSync(this);
        },
      },
    },
  );
  patch(
    c.skeletonText,
    `<view class="mn-skeleton-text" style="{{textStyle}}" aria-hidden="true"><view wx:for="{{lineItems}}" wx:key="*this" class="mn-skeleton mn-skeleton-{{animation}}" style="{{lineStyle}};width:{{shrinkLast && index===lineItems.length-1?lastLineWidth:'100%'}}"/></view>`,
    {
      lineHeight: optional("1em"),
      gap: optional(2),
      shrinkLast: flag(true),
      lastLineWidth: text("70%"),
      animation: text("pulse"),
    },
    {},
    {
      data: {
        lineItems: [1, 2, 3],
        lineStyle: "height:1em",
        textStyle: "gap:var(--space-2)",
      },
      observers: {
        "lines,lineHeight,gap": function (this: Instance) {
          this.setData({
            lineItems: Array.from(
              { length: Math.max(0, Math.floor(this.data.lines)) },
              (_, i) => i,
            ),
            textStyle: `gap:${resolveSpace(this.data.gap)}`,
            lineStyle: `height:${px(this.data.lineHeight)}`,
          });
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({
            lineItems: Array.from(
              { length: Math.max(0, Math.floor(this.data.lines)) },
              (_, i) => i,
            ),
            textStyle: `gap:${resolveSpace(this.data.gap)}`,
            lineStyle: `height:${px(this.data.lineHeight)}`,
          });
        },
      },
    },
  );
  patch(
    c.tooltip,
    `<view class="mn-popover"><view class="mn-popover-trigger" bindtap="onToggle" bindlongpress="onEnter" bindtouchend="onLeave"><slot/></view><view wx:if="{{visible}}" class="mn-popup mn-tooltip mn-placement-{{placement}} mn-color-{{color}} mn-variant-{{variant}} mn-tooltip-{{shape}} mn-tooltip-animation-{{animation}} {{contentClassName}}" style="{{tooltipStyle}}" role="tooltip" aria-label="{{ariaLabel}}"><view wx:if="{{arrow}}" class="mn-tooltip-arrow"/><text>{{content}}</text><button class="mn-close" bindtap="close">×</button><slot name="content"/></view></view>`,
    {
      open: optional(),
      defaultOpen: flag(),
      placement: text("top"),
      color: text("neutral"),
      variant: text("solid"),
      shape: text("default"),
      animation: text("fade"),
      enterDelay: number(200),
      leaveDelay: number(),
      offset: optional([0, 0]),
      zIndex: number(1500),
      arrow: flag(),
      contentClassName: text(),
      ariaLabel: text(),
    },
    {
      open(this: Instance) {
        tooltipRequest(this, true);
      },
      close(this: Instance) {
        tooltipRequest(this, false);
      },
      toggle(this: Instance) {
        tooltipRequest(this, !this.data.visible);
      },
      onToggle(this: Instance) {
        tooltipRequest(this, !this.data.visible);
      },
      onEnter(this: Instance) {
        tooltipRequest(this, true, this.data.enterDelay);
      },
      onLeave(this: Instance) {
        tooltipRequest(this, false, this.data.leaveDelay);
      },
    },
    {
      data: { visible: false, localOpen: false, tooltipStyle: "" },
      observers: {
        "open,disabled,zIndex,offset": function (this: Instance) {
          tooltipSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localOpen: this.data.defaultOpen });
          tooltipSync(this);
        },
        detached(this: Instance) {
          clearTimeout(tooltipTimers.get(this));
          tooltipTimers.delete(this);
        },
      },
    },
  );
  patch(
    c.codeBlock,
    `<view class="mn-code-block"><view class="mn-row"><text class="mn-muted">{{language}}</text><button wx:if="{{copyable}}" class="mn-close" bindtap="onCopy">{{copyLabel}}</button></view><scroll-view scroll-x="{{!wrap}}" scroll-y style="{{codeStyle}}" role="region" aria-label="{{codeRegionLabel}}"><text class="mn-code" selectable style="white-space:{{wrap?'pre-wrap':'pre'}};word-break:{{wrap?'break-word':'normal'}}">{{code}}</text></scroll-view><text class="mn-visually-hidden" aria-live="polite">{{copyStatus}}</text></view>`,
    {
      wrap: flag(true),
      maxHeight: optional("24rem"),
      ariaLabel: text(),
      copyable: flag(),
    },
    {
      onCopy(this: Instance) {
        const sourceText = this.data.code;
        wx.setClipboardData({
          data: sourceText,
          success: () => {
            if (!copyMounted.has(this)) return;
            copyFeedback(this, "copied");
            this.triggerEvent("copy", {
              value: sourceText,
              text: sourceText,
              success: true,
            });
            this.triggerEvent("copied", { text: sourceText });
          },
          fail: (error) => {
            if (!copyMounted.has(this)) return;
            copyFeedback(this, "copyFailed");
            this.triggerEvent("error", { error });
          },
        });
      },
    },
    {
      data: {
        codeStyle: "",
        copyStatus: "",
        copyLabel: "Copy",
        copyState: "idle",
        codeRegionLabel: "Code",
      },
      observers: {
        "localeLanguage,ariaLabel": function (this: Instance) {
          copyLabels(this);
        },
        maxHeight(this: Instance) {
          this.setData({ codeStyle: `max-height:${px(this.data.maxHeight)}` });
        },
      },
      lifetimes: {
        detached(this: Instance) {
          copyMounted.delete(this);
          clearTimeout(copyTimers.get(this));
          copyTimers.delete(this);
        },
        attached(this: Instance) {
          copyMounted.add(this);
          copyLabels(this);
          this.setData({ codeStyle: `max-height:${px(this.data.maxHeight)}` });
        },
      },
    },
  );
  patch(
    c.list,
    `<view class="mn-list mn-list-{{density}} {{bordered?'mn-list-bordered':''}} {{dividers && divided?'mn-list-divided':''}}" role="{{role}}"><view wx:for="{{items}}" wx:key="index" class="mn-list-item {{item.disabled?'mn-disabled':''}}" role="listitem" data-index="{{index}}" bindtap="onItem"><text wx:if="{{item.icon}}" aria-hidden="true">{{item.icon}}</text><view class="mn-list-content"><text>{{item.primary===undefined?item.title:item.primary}}</text><text class="mn-muted">{{item.secondary===undefined?item.description:item.secondary}}</text></view><view class="mn-list-actions">{{item.actions}}<slot name="{{'actions-'+index}}"/></view></view><slot/></view>`,
    {
      density: text("default"),
      bordered: flag(),
      dividers: flag(true),
      role: text("list"),
    },
  );
  patch(
    c.descriptionList,
    `<view class="mn-description-list {{bordered?'mn-list-bordered':''}} {{striped?'mn-list-striped':''}}" style="grid-template-columns:repeat({{columns}},minmax(0,1fr))"><view wx:for="{{items}}" wx:key="key" class="mn-description-item {{striped && index%2===1?'mn-row-striped':''}}"><text class="mn-muted">{{item.label}}</text><text>{{item.value}}</text><slot name="{{item.key}}"/></view><slot/></view>`,
    { bordered: flag(), striped: flag() },
  );
  patch(
    c.textarea,
    `<textarea class="mn-input mn-textarea mn-textarea-{{size}} mn-input-{{variant}} {{invalid?'mn-invalid':''}} {{disabled || readOnly?'mn-disabled':''}}" value="{{text}}" disabled="{{disabled || readOnly}}" name="{{name}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" auto-height="{{autoHeight}}" style="{{rows?'min-height:'+rows*24+'px':''}}" aria-invalid="{{invalid}}" aria-required="{{required}}" bindinput="onInput" bindfocus="onFocus" bindblur="onBlur"/>`,
    {
      value: optional(),
      defaultValue: text(),
      size: text("medium"),
      variant: text("outline"),
      invalid: flag(),
      required: flag(),
      name: text(),
      rows: number(),
    },
    {
      onInput(this: Instance, e: Event) {
        if (blocked(this)) return this.data.text;
        if (this.data.value === null)
          this.setData({ localText: e.detail.value });
        this.triggerEvent("change", { value: e.detail.value });
        textareaSync(this);
        return this.data.text;
      },
      onFocus(this: Instance) {
        this.triggerEvent("focus", {});
      },
      onBlur(this: Instance) {
        this.triggerEvent("blur", {});
      },
    },
    {
      data: { text: "", localText: "" },
      observers: {
        value(this: Instance) {
          textareaSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localText: this.data.defaultValue });
          textareaSync(this);
        },
      },
    },
  );
  const switchChange = c.toggle.definition.methods.onChange;
  Object.assign(
    c.toggle.definition.options ?? (c.toggle.definition.options = {}),
    { multipleSlots: true },
  );
  Object.assign(c.toggle.definition.properties, {
    size: text("medium"),
    color: text("primary"),
    shape: text("round"),
    variant: text("slider"),
    label: text(),
    offLabel: text(),
    onLabel: text(),
    labelPlacement: text("end"),
    loading: flag(),
    ripple: flag(true),
    trackStyle: optional({}),
    thumbStyle: optional({}),
    icon: text(),
    iconPlacement: text("start"),
    value: text("on"),
  });
  Object.assign(c.toggle.definition.methods, {
    onChange(
      this: Instance,
      e: WechatMiniprogram.CustomEvent<{ value: boolean }>,
    ) {
      if (this.data.loading) return;
      switchChange.call(this, e);
    },
    onState(this: Instance, e: Event) {
      if (blocked(this) || this.data.loading) return;
      const checked =
        e.currentTarget.dataset.checked === true ||
        e.currentTarget.dataset.checked === "true";
      if (checked === this.data.effectiveChecked) return;
      switchChange.call(this, { detail: { value: checked } });
    },
    onFocus(this: Instance) {
      this.triggerEvent("focus", {});
    },
    onBlur(this: Instance) {
      this.triggerEvent("blur", {});
    },
  });
  c.toggle.definition.observers = {
    ...c.toggle.definition.observers,
    "trackStyle,thumbStyle": function (this: Instance) {
      this.setData({
        trackCss: css(this.data.trackStyle),
        thumbCss: css(this.data.thumbStyle),
      });
    },
  };
  c.toggle.template = `<view class="mn-switch-root {{variant==='segmented' && offLabel && onLabel?'mn-switch-segmented':'mn-switch-slider'}} mn-choice-label-{{labelPlacement}} mn-choice-color-{{color}} mn-switch-size-{{size}} mn-switch-shape-{{shape}} {{disabled || readOnly || loading?'mn-disabled':''}} {{ripple?'mn-switch-ripple':''}}"><button wx:if="{{offLabel && onLabel}}" class="mn-switch-segment {{!effectiveChecked?'mn-active':''}}" disabled="{{disabled || readOnly || loading}}" data-checked="false" bindtap="onState">{{offLabel}}</button><view class="mn-switch-track {{effectiveChecked?'mn-active':''}} {{variant==='segmented' && offLabel && onLabel?'mn-switch-track-hidden':''}}" style="{{trackCss}}"><view class="mn-switch-thumb" style="{{thumbCss}}"><view wx:if="{{loading}}" class="mn-spinner"/><block wx:elif="{{iconPlacement==='start'}}"><slot name="icon"/>{{icon}}</block></view><switch class="mn-switch mn-switch-widget" role="switch" aria-checked="{{effectiveChecked}}" aria-busy="{{loading}}" checked="{{effectiveChecked}}" disabled="{{disabled || readOnly || loading}}" name="{{name}}" catchchange="onChange" bindfocus="onFocus" bindblur="onBlur"/></view><button wx:if="{{offLabel && onLabel}}" class="mn-switch-segment {{effectiveChecked?'mn-active':''}}" disabled="{{disabled || readOnly || loading}}" data-checked="true" bindtap="onState">{{onLabel}}</button><view wx:else class="mn-switch-label mn-choice-content">{{label}}<slot/></view><text wx:if="{{iconPlacement==='end'}}">{{icon}}</text></view>`;
}
