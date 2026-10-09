import {
  getVirtualRange,
  matchesAccept,
  resolveSpace,
  resolveSize,
} from "@minerva/core";
import { nativeTranslate as t } from "./configuration";
type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
type Event = WechatMiniprogram.CustomEvent<{
  value: string;
  scrollTop: number;
  scrollHeight: number;
}>;
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
export interface NativeDrawerConfig {
  onInteractOutside?: () => boolean | void;
}
const drawers = new WeakMap<object, NativeDrawerConfig>();
function drawerSync(self: Instance) {
  self.setData({
    visible: self.data.open === null ? self.data.localOpen : self.data.open,
    effectiveSide: self.data.side || self.data.placement,
    closeText: self.data.closeLabel || t(self, "drawer.close"),
    descriptionText:
      self.data.description ||
      self.data.hiddenDescription ||
      t(self, "drawer.description"),
  });
}
function drawerRequest(self: Instance, open: boolean, reason: string) {
  if (self.data.loading || self.data.disabled || self.data.visible === open)
    return;
  if (self.data.open === null) self.setData({ localOpen: open });
  drawerSync(self);
  self.triggerEvent("openchange", { open });
  if (!open) self.triggerEvent("close", { reason });
}
export interface NativeVirtualConfig {
  renderItem?: (item: Record<string, unknown>, index: number) => string;
  onLoadMore?: () => void | Promise<void>;
}
const virtualConfigs = new WeakMap<object, NativeVirtualConfig>(),
  virtualTimers = new WeakMap<object, ReturnType<typeof setTimeout>>();
function virtualSync(self: Instance) {
  const d = self.data,
    rowHeight =
      d.itemHeight ||
      ((d.measuredContentHeight || 0) > 0
        ? d.measuredContentHeight + d.itemPadding * 2
        : 0);
  const height = d.maxHeight ?? d.height;
  const range = rowHeight
    ? getVirtualRange({
        scrollTop: d.scrollTop,
        viewportHeight: d.viewportHeight || height,
        itemHeight: rowHeight,
        itemCount: d.items.length,
        overscan: d.overscan,
      })
    : { start: 0, end: Math.min(1, d.items.length) };
  const config = virtualConfigs.get(self);
  self.setData({
    rowHeight,
    effectiveHeight: height,
    before: range.start * rowHeight,
    after: Math.max(0, d.items.length - range.end) * rowHeight,
    visible: d.items
      .slice(range.start, range.end)
      .map((item: Record<string, unknown>, i: number) => ({
        item,
        index: range.start + i,
        key: item.id ?? range.start + i,
        label:
          config?.renderItem?.(item, range.start + i) ??
          String(item.label ?? item.metadata ?? item.id ?? item),
      })),
  });
}
function virtualMeasure(
  self: Instance,
  measure: { itemContentHeight?: number; viewportHeight?: number },
) {
  if (measure.itemContentHeight && measure.itemContentHeight > 0)
    self.setData({ measuredContentHeight: measure.itemContentHeight });
  if (measure.viewportHeight && measure.viewportHeight > 0)
    self.setData({ viewportHeight: measure.viewportHeight });
  virtualSync(self);
}
function queryVirtual(self: Instance) {
  const query = self.createSelectorQuery();
  query.select(".mn-virtual-list").boundingClientRect((rect) => {
    if (rect && !Array.isArray(rect))
      virtualMeasure(self, { viewportHeight: rect.height });
  });
  if (!self.data.itemHeight)
    query.select(".mn-virtual-content").boundingClientRect((rect) => {
      if (rect && !Array.isArray(rect))
        virtualMeasure(self, { itemContentHeight: rect.height });
    });
  query.exec();
}
function virtualScroll(self: Instance, top: number, total: number) {
  const previous = self.data.scrollTop;
  self.setData({ scrollTop: top });
  virtualSync(self);
  const height = self.data.viewportHeight || self.data.effectiveHeight;
  if (
    top > previous &&
    !self.data.loading &&
    !self.data.loadingMore &&
    total > height &&
    total - top - height < self.data.loadMoreThreshold
  ) {
    self.setData({ loadingMore: true });
    self.triggerEvent("loadmore", {});
    const load = virtualConfigs.get(self)?.onLoadMore;
    if (load)
      Promise.resolve()
        .then(() => load())
        .catch((error) =>
          self.triggerEvent("loaderror", {
            message: error instanceof Error ? error.message : String(error),
          }),
        )
        .finally(() => self.setData({ loadingMore: false }));
  }
}
export interface NativeUploadFile {
  name: string;
  path: string;
  size: number;
  type: string;
}
export interface NativeUploadConfig {
  labels?: {
    tooMany?: (max: number) => string;
    invalidType?: (name: string) => string;
    tooLarge?: (name: string) => string;
    retry?: (name: string) => string;
    remove?: (name: string) => string;
  };
  normalizeFile?: (file: NativeUploadFile) => NativeUploadFile;
}
const uploadConfigs = new WeakMap<object, NativeUploadConfig>();
const mimeTypes: Record<string, string> = {
  pdf: "application/pdf",
  json: "application/json",
  txt: "text/plain",
  csv: "text/csv",
  zip: "application/zip",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
  mp4: "video/mp4",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  wav: "audio/wav",
};
function normalizeFile(file: {
  name?: string;
  path?: string;
  tempFilePath?: string;
  size: number;
  type?: string;
  fileType?: string;
}): NativeUploadFile {
  const path = file.path || file.tempFilePath || "",
    name = file.name || path.split("/").pop() || "file",
    ext = name.split(".").pop()?.toLowerCase() || "";
  return {
    path,
    name,
    size: file.size,
    type: file.type?.includes("/")
      ? file.type
      : (mimeTypes[ext] ??
        (file.fileType ? `${file.fileType}/*` : "application/octet-stream")),
  };
}
function uploadSync(self: Instance) {
  const d = self.data,
    config = uploadConfigs.get(self),
    labels = d.labels;
  const capacity = d.maxCount ?? (d.multiple ? 50 : 1);
  const existing = d.replace && !d.multiple ? 0 : d.value.length;
  self.setData({
    capacity,
    existingCount: existing,
    selectionBlocked: d.disabled || d.loading || existing >= capacity,
    selectLabel: labels.select ?? t(self, "upload.select"),
    fileRows: d.value.map((item: Record<string, unknown>) => ({
      ...item,
      statusLabel:
        item.status === "uploading"
          ? (labels.uploading ?? t(self, "upload.uploading"))
          : item.status === "error"
            ? item.error || labels.failed || t(self, "upload.failed")
            : (labels.done ?? t(self, "upload.done")),
      retryLabel:
        config?.labels?.retry?.(String(item.name)) ??
        t(self, "upload.retry", { name: item.name }),
      removeLabel:
        config?.labels?.remove?.(String(item.name)) ??
        t(self, "upload.remove", { name: item.name }),
    })),
  });
}
function uploadSelect(self: Instance, files: NativeUploadFile[]) {
  uploadSync(self);
  if (self.data.selectionBlocked || !files.length) return;
  const config = uploadConfigs.get(self);
  files = files.map((file) => config?.normalizeFile?.(file) ?? file);
  let code = "",
    message = "";
  const accept =
    self.data.accept === "image"
      ? "image/*"
      : self.data.accept === "video"
        ? "video/*"
        : self.data.accept === "all"
          ? "*"
          : self.data.accept;
  const invalid = files.find((file) => !matchesAccept(file, accept)),
    large = files.find(
      (file) => self.data.maxSize !== null && file.size > self.data.maxSize,
    );
  if (
    (!self.data.multiple && files.length > 1) ||
    files.length + self.data.existingCount > self.data.capacity
  ) {
    code = "too-many";
    message =
      config?.labels?.tooMany?.(self.data.capacity) ??
      t(self, "upload.tooMany", { count: self.data.capacity });
  } else if (invalid) {
    code = "invalid-type";
    message =
      config?.labels?.invalidType?.(invalid.name) ??
      t(self, "upload.invalidType", { name: invalid.name });
  } else if (large) {
    code = "too-large";
    message =
      config?.labels?.tooLarge?.(large.name) ??
      t(self, "upload.tooLarge", { name: large.name });
  }
  self.setData({ errorMessage: message });
  if (code) {
    self.triggerEvent("error", { code, message, files });
    return;
  }
  self.triggerEvent("filesselected", { files });
  self.triggerEvent("select", { files });
}
function alertSync(self: Instance) {
  const d = self.data,
    color = d.color || d.status || "info";
  self.setData({
    effectiveColor: color,
    effectiveRole:
      d.role ||
      (color === "danger" || color === "error" || color === "warning"
        ? "alert"
        : "status"),
    effectiveExpanded: d.expanded === null ? d.localExpanded : d.expanded,
    statusIcon:
      d.icon ||
      { success: "✓", warning: "!", danger: "×", error: "×", info: "i" }[
        color as "info"
      ] ||
      "i",
    radiusStyle:
      d.borderRadius !== null
        ? `border-radius:${typeof d.borderRadius === "number" ? d.borderRadius + "px" : d.borderRadius}`
        : "",
    closeText: d.closeLabel || t(self, "alert.close"),
    expandText: d.expandLabel || t(self, "alert.expand"),
    collapseText: d.collapseLabel || t(self, "alert.collapse"),
  });
}
const spaceNames: Record<string, string[]> = {
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
};
function boxSync(self: Instance) {
  const d = self.data,
    style: Record<string, string | number> = {
      padding: d.padding,
      margin: d.margin,
      background: d.background,
      "border-radius": d.radius,
    };
  for (const [key, names] of Object.entries(spaceNames))
    if (d[key] !== null)
      for (const name of names) style[name] = resolveSpace(d[key]);
  for (const [key, name] of Object.entries({
    w: "width",
    h: "height",
    minW: "min-width",
    minH: "min-height",
    maxW: "max-width",
    maxH: "max-height",
  }))
    if (d[key] !== null) style[name] = resolveSize(d[key]);
  const backgrounds: Record<string, string> = {
    bg: "surface-color",
    "bg.subtle": "surface-subtle-color",
    "bg.muted": "surface-muted-color",
    "bg.emphasis": "surface-muted-color",
    "bg.canvas": "canvas-color",
    "bg.elevated": "surface-elevated-color",
  };
  if (d.bg)
    style.background = backgrounds[d.bg] ? `var(--${backgrounds[d.bg]})` : d.bg;
  if (d.rounded)
    style["border-radius"] = [
      "none",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "full",
    ].includes(d.rounded)
      ? `var(--radius-${d.rounded})`
      : d.rounded;
  if (d.boxShadow)
    style["box-shadow"] = ["sm", "md", "lg", "xl"].includes(d.boxShadow)
      ? `var(--shadow-${d.boxShadow})`
      : d.boxShadow;
  if (d.border) style.border = d.border;
  for (const [key, value] of Object.entries(d.customStyle || {}))
    style[key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)] = value as
      string | number;
  const value = Object.entries(style)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  if (value !== self.data.boxStyle) self.setData({ boxStyle: value });
}
export interface NativeCommandItem {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
  disabled?: boolean;
}
export interface NativeCommandConfig {
  filter?: (items: NativeCommandItem[], query: string) => NativeCommandItem[];
}
const commands = new WeakMap<object, NativeCommandConfig>();
function commandSync(self: Instance) {
  const query = String(self.data.query).trim(),
    enabled = (self.data.items as NativeCommandItem[]).filter(
      (item) => !item.disabled,
    ),
    filter = commands.get(self)?.filter;
  const results = query
    ? filter
      ? filter(enabled, query)
      : enabled.filter((item) =>
          [item.title, item.description, item.group, item.keywords]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
    : enabled;
  self.setData({
    visible: self.data.open === null ? self.data.localOpen : self.data.open,
    results: results
      .filter((item) => !item.disabled)
      .slice(0, Math.max(0, self.data.maxResults)),
    commandLabels: {
      title: self.data.title || t(self, "command.title"),
      description: self.data.description || t(self, "command.description"),
      placeholder: self.data.placeholder || t(self, "command.placeholder"),
      empty: self.data.emptyText || t(self, "command.empty"),
      results: self.data.resultsLabel || t(self, "command.results"),
      enter: self.data.enterLabel || t(self, "command.enter"),
    },
  });
}
function commandOpen(self: Instance, open: boolean) {
  if (self.data.open === null) self.setData({ localOpen: open });
  commandSync(self);
  self.triggerEvent("openchange", { open });
}
export function enhanceAdvanced(c: {
  modal: Control;
  drawer: Control;
  virtualList: Control;
  upload: Control;
  alert: Control;
  box: Control;
  commandDialog: Control;
}) {
  patch(
    c.drawer,
    `<view class="mn-drawer-root"><view class="mn-drawer-trigger" bindtap="onOpen"><slot name="trigger"/></view><view wx:if="{{visible || forceMount}}" hidden="{{!visible}}" class="mn-overlay {{modal?'':'mn-drawer-nonmodal'}}"><view class="mn-backdrop {{modal?'':'mn-backdrop-clear'}} {{overlayClassName}}" bindtap="onBackdrop"/><view class="mn-dialog mn-drawer mn-drawer-{{effectiveSide}} mn-drawer-{{size}}" role="{{role}}" aria-modal="{{modal}}" aria-label="{{title}}"><view class="mn-row"><slot name="header"/><text class="mn-title">{{title}}</text><button wx:if="{{!hideCloseButton}}" class="mn-close mn-drawer-close" aria-label="{{closeText}}" disabled="{{loading}}" bindtap="onClose">×</button></view><text class="{{description?'mn-muted':'mn-visually-hidden'}}">{{descriptionText}}</text><view class="mn-dialog-content"><slot/></view><slot name="footer"/></view></view></view>`,
    {
      open: optional(),
      defaultOpen: flag(),
      side: text(),
      size: text("medium"),
      modal: flag(true),
      forceMount: flag(),
      hideCloseButton: flag(),
      closeLabel: text(),
      hiddenDescription: text(),
      role: text("dialog"),
      overlayClassName: text(),
    },
    {
      configure(this: Instance, config: NativeDrawerConfig) {
        drawers.set(this, config);
      },
      onOpen(this: Instance) {
        drawerRequest(this, true, "trigger");
      },
      onClose(this: Instance) {
        drawerRequest(this, false, "close");
      },
      onBackdrop(this: Instance) {
        if (!this.data.closeOnOverlayClick) return;
        this.triggerEvent("interactoutside", {});
        if (drawers.get(this)?.onInteractOutside?.() !== false)
          drawerRequest(this, false, "overlay");
      },
    },
    {
      data: { visible: false, localOpen: false, effectiveSide: "right" },
      observers: {
        "open,side,placement,closeLabel,description,hiddenDescription,localeLanguage":
          function (this: Instance) {
            drawerSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localOpen: this.data.defaultOpen });
          drawerSync(this);
        },
        detached(this: Instance) {
          drawers.delete(this);
        },
      },
    },
  );
  c.modal.definition = {
    ...c.drawer.definition,
    properties: { ...c.drawer.definition.properties },
    data: { ...c.drawer.definition.data },
  };
  c.modal.template = c.drawer.template
    .replaceAll("mn-drawer", "mn-modal")
    .replace(" mn-modal-{{effectiveSide}}", "")
    .replace(
      "<text class=\"{{description?'mn-muted':'mn-visually-hidden'}}\">{{descriptionText}}</text>",
      '<text wx:if="{{description}}" class="mn-muted">{{description}}</text>',
    );
  patch(
    c.virtualList,
    `<scroll-view scroll-y class="mn-virtual-list" scroll-top="{{scrollTop}}" style="max-height:{{effectiveHeight}}px;height:{{effectiveHeight}}px" role="list" aria-label="{{ariaLabel}}" aria-busy="{{loading || loadingMore}}" bindscroll="onScroll"><view style="height:{{before}}px"/><view wx:for="{{visible}}" wx:key="key" class="mn-list-item mn-virtual-item" role="listitem" style="{{rowHeight?'height:'+rowHeight+'px;':''}}padding:{{itemPadding}}px;box-sizing:border-box" data-index="{{item.index}}" bindtap="onItem"><view class="mn-virtual-content"><row-renderer wx:if="{{customRowRenderer}}" row="{{item.item}}" value="{{item.label}}" row-index="{{item.index}}"/><text wx:else>{{item.label}}</text></view></view><view style="height:{{after}}px"/><view wx:if="{{loading || loadingMore}}" class="mn-virtual-loading"><view class="mn-spinner"/>{{localeLabels.loading}}</view><slot name="footer"/></scroll-view>`,
    {
      itemHeight: optional(),
      maxHeight: optional(),
      itemPadding: number(8),
      overscan: number(5),
      loadMoreThreshold: number(100),
      highPerformance: flag(),
      loading: flag(),
      ariaLabel: text(),
      customRowRenderer: flag(),
    },
    {
      configure(this: Instance, config: NativeVirtualConfig) {
        virtualConfigs.set(this, config);
        virtualSync(this);
      },
      measure(
        this: Instance,
        metrics: { itemContentHeight?: number; viewportHeight?: number },
      ) {
        virtualMeasure(this, metrics);
      },
      reposition(this: Instance) {
        queryVirtual(this);
      },
      completeLoadMore(this: Instance) {
        this.setData({ loadingMore: false });
      },
      scrollToIndex(this: Instance, index: number) {
        this.setData({
          scrollTop:
            Math.max(0, Math.min(this.data.items.length - 1, index)) *
            this.data.rowHeight,
        });
        virtualSync(this);
      },
      onScroll(this: Instance, e: Event) {
        const { scrollTop, scrollHeight } = e.detail;
        if (!Number.isFinite(scrollTop)) return;
        this.triggerEvent("scroll", { scrollTop });
        if (this.data.highPerformance) {
          clearTimeout(virtualTimers.get(this));
          virtualTimers.set(
            this,
            setTimeout(() => virtualScroll(this, scrollTop, scrollHeight), 16),
          );
        } else virtualScroll(this, scrollTop, scrollHeight);
      },
      onItem(this: Instance, e: Event) {
        const index = Number(e.currentTarget.dataset.index);
        this.triggerEvent("itemclick", { item: this.data.items[index], index });
      },
    },
    {
      data: {
        visible: [],
        before: 0,
        after: 0,
        scrollTop: 0,
        rowHeight: 0,
        measuredContentHeight: 0,
        viewportHeight: 0,
        effectiveHeight: 300,
        loadingMore: false,
      },
      observers: {
        "items,itemHeight,height,maxHeight,itemPadding,overscan": function (
          this: Instance,
        ) {
          virtualSync(this);
        },
        loading(this: Instance, value: boolean) {
          if (!value) this.setData({ loadingMore: false });
        },
      },
      lifetimes: {
        attached(this: Instance) {
          virtualSync(this);
        },
        ready(this: Instance) {
          queryVirtual(this);
        },
        detached(this: Instance) {
          clearTimeout(virtualTimers.get(this));
          virtualConfigs.delete(this);
        },
      },
    },
  );
  Object.assign(c.virtualList, {
    componentGenerics: {
      "row-renderer": { default: "../table-cell-content/index" },
    },
  });
  patch(
    c.upload,
    `<view class="mn-upload" role="group" aria-label="{{label}}" aria-busy="{{loading}}"><text>{{label}}</text><view wx:for="{{fileRows}}" wx:key="id" class="mn-upload-item"><image wx:if="{{item.previewUrl}}" class="mn-upload-preview" src="{{item.previewUrl}}" mode="aspectFit"/><text>{{item.name}}</text><text class="mn-muted">{{item.statusLabel}}</text><button wx:if="{{retryable && item.status==='error'}}" class="mn-close mn-upload-retry" disabled="{{disabled || loading}}" aria-label="{{item.retryLabel}}" data-index="{{index}}" bindtap="onRetry">↻</button><button wx:if="{{removable}}" class="mn-close mn-upload-remove" disabled="{{disabled}}" aria-label="{{item.removeLabel}}" data-index="{{index}}" bindtap="onRemove">×</button></view><button class="mn-button mn-variant-outline mn-upload-select" loading="{{loading}}" disabled="{{selectionBlocked}}" bindtap="onChoose">{{selectLabel}}</button><text wx:if="{{errorMessage}}" class="mn-error" role="alert">{{errorMessage}}</text><slot/></view>`,
    {
      label: text(),
      accept: text("*"),
      multiple: flag(),
      replace: flag(),
      maxCount: optional(),
      maxSize: optional(),
      loading: flag(),
      labels: optional({}),
      removable: flag(true),
      retryable: flag(true),
    },
    {
      configure(this: Instance, config: NativeUploadConfig) {
        uploadConfigs.set(this, config);
        uploadSync(this);
      },
      selectFiles(this: Instance, files: NativeUploadFile[]) {
        uploadSelect(this, files);
      },
      onChoose(this: Instance) {
        uploadSync(this);
        if (this.data.selectionBlocked) return;
        const count = Math.min(
          this.data.multiple ? 100 : 1,
          this.data.capacity - this.data.existingCount,
        );
        const accept = this.data.accept;
        const success = (files: Parameters<typeof normalizeFile>[0][]) =>
          uploadSelect(this, files.map(normalizeFile));
        const fail = (error: { errMsg?: string }) => {
          if (!error.errMsg?.includes("cancel"))
            this.triggerEvent("error", {
              code: "picker",
              message: error.errMsg,
            });
        };
        const acceptedTypes = String(accept)
          .split(",")
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean)
          .map((value) =>
            value.startsWith(".") ? mimeTypes[value.slice(1)] || value : value,
          );
        const mediaKinds = acceptedTypes.map((value) =>
          value === "image" || value.startsWith("image/")
            ? "image"
            : value === "video" || value.startsWith("video/")
              ? "video"
              : null,
        );
        if (mediaKinds.length && mediaKinds.every(Boolean))
          wx.chooseMedia({
            count: Math.min(9, count),
            mediaType: [...new Set(mediaKinds)] as ("image" | "video")[],
            success: (r) => success(r.tempFiles),
            fail,
          });
        else
          wx.chooseMessageFile({
            count,
            type:
              mediaKinds.some(Boolean) || accept === "*" || accept === "all"
                ? "all"
                : "file",
            success: (r) => success(r.tempFiles),
            fail,
          });
      },
      onRemove(this: Instance, e: Event) {
        if (this.data.disabled) return;
        const item = this.data.value[Number(e.currentTarget.dataset.index)];
        if (item) this.triggerEvent("remove", { id: item.id, item });
      },
      onRetry(this: Instance, e: Event) {
        if (this.data.disabled || this.data.loading) return;
        const item = this.data.value[Number(e.currentTarget.dataset.index)];
        if (item?.status === "error") this.triggerEvent("retry", { item });
      },
    },
    {
      data: {
        fileRows: [],
        errorMessage: "",
        selectionBlocked: false,
        capacity: 1,
        existingCount: 0,
        selectLabel: "",
      },
      observers: {
        "value,disabled,loading,maxCount,multiple,replace,labels,localeLanguage":
          function (this: Instance) {
            uploadSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          uploadSync(this);
        },
        detached(this: Instance) {
          uploadConfigs.delete(this);
        },
      },
    },
  );
  patch(
    c.alert,
    `<view wx:if="{{!closed}}" class="mn-alert mn-color-{{effectiveColor}} mn-variant-{{variant}} mn-size-{{size}} {{banner?'mn-alert-banner':''}} {{elevation?'mn-alert-elevated':''}} {{rounded?'':'mn-alert-square'}} {{animation?'mn-alert-'+animationName:''}}" role="{{effectiveRole}}" style="{{radiusStyle}}"><view wx:if="{{showIcon}}" class="mn-alert-icon" aria-label="{{iconLabel}}"><slot name="icon"/><text wx:if="{{!customIcon}}">{{statusIcon}}</text></view><view class="mn-alert-main"><text class="mn-title">{{title}}</text><view wx:if="{{!collapsible || !title || effectiveExpanded}}" class="mn-alert-content"><text>{{description}}</text><slot/></view></view><slot name="action"/><button wx:if="{{collapsible && title}}" class="mn-close mn-alert-expand" aria-label="{{effectiveExpanded?collapseText:expandText}}" aria-expanded="{{effectiveExpanded}}" bindtap="onExpand">{{effectiveExpanded?'−':'+'}}</button><button wx:if="{{closable}}" class="mn-close mn-alert-close" aria-label="{{closeText}}" bindtap="onClose"><slot name="closeIcon"/><text wx:if="{{!customCloseIcon}}">{{closeIcon}}</text></button></view>`,
    {
      color: text(),
      variant: text("subtle"),
      size: text("medium"),
      showIcon: flag(true),
      customIcon: flag(),
      customCloseIcon: flag(),
      icon: text(),
      closeIcon: text("×"),
      animation: flag(true),
      animationName: text("slideIn"),
      banner: flag(),
      elevation: flag(),
      rounded: flag(true),
      borderRadius: optional(),
      collapsible: flag(),
      expanded: optional(),
      defaultExpanded: flag(true),
      closeLabel: text(),
      expandLabel: text(),
      collapseLabel: text(),
      iconLabel: text(),
      role: text(),
    },
    {
      onExpand(this: Instance) {
        const expanded = !this.data.effectiveExpanded;
        if (this.data.expanded === null)
          this.setData({ localExpanded: expanded });
        alertSync(this);
        this.triggerEvent("expand", { expanded });
      },
      onClose(this: Instance) {
        this.setData({ closed: true });
        this.triggerEvent("close", {});
      },
    },
    {
      data: {
        closed: false,
        localExpanded: true,
        effectiveExpanded: true,
        effectiveRole: "status",
        effectiveColor: "info",
        statusIcon: "i",
      },
      observers: {
        "color,status,role,icon,expanded,borderRadius,closeLabel,expandLabel,collapseLabel,localeLanguage":
          function (this: Instance) {
            alertSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localExpanded: this.data.defaultExpanded });
          alertSync(this);
        },
      },
    },
  );
  patch(
    c.box,
    `<view class="mn-box" style="{{boxStyle}}"><slot/></view>`,
    {
      ...Object.fromEntries(
        [
          ...Object.keys(spaceNames),
          "w",
          "h",
          "minW",
          "minH",
          "maxW",
          "maxH",
        ].map((key) => [key, optional()]),
      ),
      bg: text(),
      rounded: text(),
      boxShadow: text(),
      border: text(),
      customStyle: optional({}),
    },
    {},
    {
      data: { boxStyle: "" },
      observers: {
        "**": function (this: Instance) {
          boxSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          boxSync(this);
        },
      },
    },
  );
  patch(
    c.commandDialog,
    `<view class="mn-command-root"><view bindtap="onOpen"><slot name="trigger"/></view><view wx:if="{{visible}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onClose"/><view class="mn-dialog" role="dialog" aria-label="{{commandLabels.title}}"><text class="mn-title">{{commandLabels.title}}</text><text>{{shortcutLabel}}</text><text class="mn-muted">{{commandLabels.description}}</text><input class="mn-input mn-command-input" value="{{query}}" placeholder="{{commandLabels.placeholder}}" bindinput="onQuery"/><view role="listbox" aria-label="{{commandLabels.results}}"><button wx:for="{{results}}" wx:key="id" class="mn-option" data-index="{{index}}" bindtap="onSelect"><text>{{item.title}}</text><text class="mn-muted">{{item.description}}</text><text>{{item.group}}</text></button></view><text wx:if="{{!results.length}}">{{commandLabels.empty}}</text><slot/></view></view></view>`,
    {
      open: optional(),
      defaultOpen: flag(),
      title: text(),
      description: text(),
      placeholder: text(),
      emptyText: text(),
      shortcutLabel: text(),
      resultsLabel: text(),
      enterLabel: text(),
    },
    {
      configure(this: Instance, config: NativeCommandConfig) {
        commands.set(this, config);
        commandSync(this);
      },
      setOpen(this: Instance, open: boolean) {
        commandOpen(this, open);
      },
      onOpen(this: Instance) {
        commandOpen(this, true);
      },
      onClose(this: Instance) {
        commandOpen(this, false);
      },
      onQuery(this: Instance, e: Event) {
        this.setData({ query: e.detail.value });
        commandSync(this);
      },
      onSelect(this: Instance, e: Event) {
        const item = this.data.results[Number(e.currentTarget.dataset.index)];
        if (!item || item.disabled) return;
        this.triggerEvent("select", { item });
        commandOpen(this, false);
      },
    },
    {
      data: {
        query: "",
        results: [],
        localOpen: false,
        visible: false,
        commandLabels: {},
      },
      observers: {
        "open,items,maxResults,title,description,placeholder,emptyText,resultsLabel,enterLabel,localeLanguage":
          function (this: Instance) {
            commandSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localOpen: this.data.defaultOpen });
          commandSync(this);
        },
        detached(this: Instance) {
          commands.delete(this);
        },
      },
    },
  );
}
