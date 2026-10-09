import { appBaseInfo } from "./system-info";
import {
  createTranslator,
  messages,
  mergeMessages,
  miniTokenClassNames,
  resolveTokens,
  githubDark,
  type Messages,
  type TranslateOptions,
  type DesignOptions,
  type Palette,
} from "@minerva/core";
type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
export interface NativeConfiguration {
  mode: string;
  resolvedMode: "light" | "dark";
  theme: unknown;
  palette: Palette | null;
  design: DesignOptions;
  locale: { language: string };
  dir: string;
  messages: Record<string, Messages>;
}
const contexts = new WeakMap<object, NativeConfiguration>(),
  parents = new WeakMap<object, Instance>(),
  children = new WeakMap<object, Set<Instance>>(),
  subscriptions = new WeakMap<
    object,
    Set<(config: NativeConfiguration) => void>
  >(),
  updates = new WeakMap<object, () => void>(),
  overrides = new WeakMap<object, Record<string, Messages>>(),
  systemListeners = new WeakMap<object, (event: { theme: string }) => void>();
const providerMarker =
  typeof Behavior === "function" ? Behavior({}) : "minerva-config-provider";
const consumerMarker =
  typeof Behavior === "function" ? Behavior({}) : "minerva-config-consumer";
const base: NativeConfiguration = {
  mode: "light",
  resolvedMode: "light",
  theme: "light",
  palette: null,
  design: {},
  locale: { language: "en" },
  dir: "ltr",
  messages,
};
const text = (value = "") => ({ type: String, value });
const optional = (value: unknown = null) => ({ type: null, value });
export function nativeTranslate(
  self: object,
  key: string,
  options?: TranslateOptions,
) {
  const config = contexts.get(self) ?? contexts.get(parents.get(self)!) ?? base;
  return createTranslator({
    messages: config.messages,
    language: config.locale.language,
  })(key, options);
}
const t = nativeTranslate;
function notify(self: Instance) {
  const config = contexts.get(self)!;
  for (const listener of subscriptions.get(self) || []) listener(config);
  for (const child of children.get(self) || []) updates.get(child)?.();
}
function labels(self: Instance) {
  return {
    tableEmpty: t(self, "table.empty"),
    tableRetry: t(self, "table.retry"),
    tableScroll: t(self, "table.scrollRegion"),
    loading: t(self, "common.loading"),
    paginationPrev: t(self, "pagination.prev"),
    paginationNext: t(self, "pagination.next"),
    themeLight: t(self, "themeToggle.light"),
    themeDark: t(self, "themeToggle.dark"),
    themeSystem: t(self, "themeToggle.system"),
    calendarLabel: t(self, "monthCalendar.label"),
    calendarPrevious: t(self, "monthCalendar.previousMonth"),
    calendarNext: t(self, "monthCalendar.nextMonth"),
    calendarToday: t(self, "monthCalendar.today"),
    calendarEmpty: t(self, "monthCalendar.noEvents"),
  };
}
function syncConsumer(self: Instance) {
  const config = contexts.get(parents.get(self)!) ?? base;
  contexts.set(self, config);
  self.setData({
    localeLanguage: config.locale.language,
    localeLabels: labels(self),
    inheritedTheme: config.theme,
    inheritedMode: config.mode,
    inheritedPalette: config.palette,
  });
}
function syncProvider(self: Instance) {
  const d = self.data,
    parent = contexts.get(parents.get(self)!) ?? base;
  const theme =
    d.theme !== "" ? d.theme : d.mode || d.localTheme || parent.theme;
  const mode =
    theme === "github-dark"
      ? "dark"
      : typeof theme === "string"
        ? theme === "auto"
          ? "system"
          : theme
        : typeof theme === "object" &&
            theme &&
            "light" in theme &&
            "dark" in theme
          ? "system"
          : d.mode || parent.mode;
  const resolvedMode =
    mode === "system"
      ? d.systemMode || "light"
      : mode === "dark"
        ? "dark"
        : "light";
  const palette =
    d.palette !== ""
      ? d.palette
      : d.localPalette !== ""
        ? d.localPalette
        : parent.palette;
  const language =
    typeof d.locale === "string"
      ? d.locale
      : (d.locale?.language ?? parent.locale.language);
  const config: NativeConfiguration = {
    theme,
    mode,
    resolvedMode,
    palette,
    design: { ...parent.design, ...d.design },
    locale: { language },
    dir: d.dir || parent.dir,
    messages: mergeMessages(parent.messages, overrides.get(self) || {}),
  };
  contexts.set(self, config);
  const custom =
    theme === "github-dark"
      ? githubDark
      : typeof theme === "object" && theme
        ? "light" in theme && "dark" in theme
          ? theme[resolvedMode]
          : theme
        : undefined;
  const tokenOptions = { mode: resolvedMode, palette, design: config.design };
  self.setData({
    themeClass: miniTokenClassNames(tokenOptions),
    themeStyle: custom
      ? Object.entries(
          resolveTokens({ ...tokenOptions, overrides: custom }).css,
        )
          .map(([k, v]) => `--${k}:${v}`)
          .join(";")
      : "",
    effectiveDir: config.dir,
    localeLanguage: language,
    localeLabels: labels(self),
    resolvedMode,
  });
  notify(self);
}
function unlink(self: Instance) {
  const parent = parents.get(self);
  if (parent) children.get(parent)?.delete(self);
  parents.delete(self);
}
function relation() {
  return {
    type: "ancestor",
    target: providerMarker,
    linked(this: Instance, parent: Instance) {
      unlink(this);
      parents.set(this, parent);
      let set = children.get(parent);
      if (!set) {
        set = new Set();
        children.set(parent, set);
      }
      set.add(this);
      updates.get(this)?.();
    },
    unlinked(this: Instance) {
      unlink(this);
      updates.get(this)?.();
    },
  };
}
function attachRelations(
  c: Control,
  provider: boolean,
  update: (self: Instance) => void,
) {
  const def = c.definition;
  def.behaviors = [
    ...(def.behaviors || []),
    consumerMarker,
    ...(provider ? [providerMarker] : []),
  ];
  def.relations = {
    ...def.relations,
    minervaNativeConfiguration: relation(),
    ...(provider
      ? { minervaConsumers: { type: "descendant", target: consumerMarker } }
      : {}),
  };
  const attached = def.lifetimes?.attached,
    detached = def.lifetimes?.detached;
  def.lifetimes = {
    ...def.lifetimes,
    attached(this: Instance) {
      updates.set(this, () => update(this));
      attached?.call(this);
      update(this);
    },
    detached(this: Instance) {
      detached?.call(this);
      unlink(this);
      contexts.delete(this);
      updates.delete(this);
      children.delete(this);
      subscriptions.delete(this);
      overrides.delete(this);
    },
  };
  def.methods = {
    ...def.methods,
    translate(this: Instance, key: string, options?: TranslateOptions) {
      return t(this, key, options);
    },
    getConfig(this: Instance) {
      return contexts.get(this) ?? base;
    },
    bindConfig(this: Instance, parent: Instance) {
      unlink(this);
      parents.set(this, parent);
      let set = children.get(parent);
      if (!set) {
        set = new Set();
        children.set(parent, set);
      }
      set.add(this);
      update(this);
    },
  };
}
function save(self: Instance) {
  if (self.data.disableStorage || typeof wx === "undefined") return;
  const config = contexts.get(self)!;
  try {
    wx.setStorageSync(self.data.storageKey, {
      mode: config.theme,
      palette: config.palette,
    });
  } catch {
    /* Storage can be unavailable in guest contexts. */
  }
}
function syncThemeToggle(self: Instance) {
  const selected =
    self.data.value ??
    contexts.get(parents.get(self)!)?.theme ??
    self.data.localTheme ??
    "light";
  self.setData({
    activeTheme:
      typeof selected === "string"
        ? selected
        : (self.data.customThemes.find(
            (item: { theme?: unknown }) =>
              JSON.stringify(item.theme) === JSON.stringify(selected),
          )?.value ?? "custom"),
    themeChoices: ["light", "dark", ...(self.data.showSystem ? ["system"] : [])]
      .map((value) => ({
        value,
        label: self.data.labels[value] ?? t(self, `themeToggle.${value}`),
      }))
      .concat(self.data.customThemes),
  });
}
function syncPaletteToggle(self: Instance) {
  const value =
    self.data.value !== ""
      ? self.data.value
      : (contexts.get(parents.get(self)!)?.palette ??
        self.data.localPalette ??
        null);
  self.setData({
    activePalette: value,
    choices: [
      ...(self.data.showDefault ? [null] : []),
      ...self.data.palettes,
    ].map((value: string | null) => ({
      value,
      key: value ?? "default",
      label:
        self.data.labels[value ?? "default"] ??
        t(self, `paletteToggle.${value ?? "default"}`),
    })),
  });
}
export function enhanceConfiguration(
  c: {
    configProvider: Control;
    themeProvider: Control;
    themeToggle: Control;
    paletteToggle: Control;
  },
  consumers: Control[],
) {
  for (const [kind, provider] of [
    ["config", c.configProvider],
    ["theme", c.themeProvider],
  ] as const) {
    const def = provider.definition;
    provider.template = `<view class="mn-provider {{themeClass}}" style="direction:{{effectiveDir}};{{themeStyle}}"><slot/></view>`;
    def.properties = {
      ...def.properties,
      mode: text(),
      theme: optional(""),
      palette: optional(""),
      design: optional({}),
      locale: optional(),
      dir: text(),
      defaultTheme: text(kind === "theme" ? "system" : ""),
      defaultPalette: optional(""),
      disableStorage: { type: Boolean, value: kind !== "theme" },
      storageKey: text("minerva-theme"),
    };
    def.data = {
      themeClass: "mn-root",
      themeStyle: "",
      systemMode: "light",
      localTheme: "",
      localPalette: "",
      effectiveDir: "ltr",
    };
    def.observers = {
      "mode,theme,palette,design,locale,dir": function (this: Instance) {
        syncProvider(this);
      },
    };
    def.lifetimes = {
      attached(this: Instance) {
        this.setData({
          localTheme: this.data.defaultTheme,
          localPalette: this.data.defaultPalette,
        });
        if (typeof wx !== "undefined") {
          try {
            this.setData({
              systemMode: appBaseInfo().theme === "dark" ? "dark" : "light",
            });
            if (!this.data.disableStorage) {
              const saved = wx.getStorageSync(this.data.storageKey);
              if (saved && typeof saved.mode === "string")
                this.setData({
                  localTheme: saved.mode,
                  localPalette: saved.palette ?? null,
                });
            }
          } catch {
            /* Optional native storage/system APIs. */
          }
          const handler = (e: { theme: string }) => {
            this.setData({ systemMode: e.theme === "dark" ? "dark" : "light" });
            syncProvider(this);
            const config = contexts.get(this)!;
            this.triggerEvent("themechange", {
              mode: config.mode,
              resolvedMode: config.resolvedMode,
              palette: config.palette,
              theme: config.theme,
            });
          };
          systemListeners.set(this, handler);
          wx.onThemeChange?.(handler);
        }
        syncProvider(this);
      },
      detached(this: Instance) {
        const handler = systemListeners.get(this);
        if (handler && typeof wx !== "undefined") wx.offThemeChange?.(handler);
        systemListeners.delete(this);
      },
    };
    def.methods = {
      configure(
        this: Instance,
        config: { messages?: Record<string, Messages> },
      ) {
        overrides.set(this, config.messages || {});
        syncProvider(this);
      },
      subscribeConfig(
        this: Instance,
        listener: (config: NativeConfiguration) => void,
      ) {
        let set = subscriptions.get(this);
        if (!set) {
          set = new Set();
          subscriptions.set(this, set);
        }
        set.add(listener);
        listener(contexts.get(this) ?? base);
        return () => set?.delete(listener);
      },
      setTheme(this: Instance, theme: unknown) {
        if (this.data.theme === "" && !this.data.mode)
          this.setData({ localTheme: theme });
        syncProvider(this);
        this.triggerEvent("themechange", {
          mode: typeof theme === "string" ? theme : "custom",
          theme,
        });
        save(this);
      },
      setPalette(this: Instance, palette: Palette | null) {
        if (
          palette !== null &&
          !["editorial", "tech", "graphite", "cool"].includes(palette)
        )
          return;
        if (this.data.palette === "") this.setData({ localPalette: palette });
        syncProvider(this);
        this.triggerEvent("palettechange", { palette });
        save(this);
      },
    };
    attachRelations(provider, true, syncProvider);
  }
  for (const consumer of consumers) {
    if (consumer === c.configProvider || consumer === c.themeProvider) continue;
    consumer.definition.data = {
      ...consumer.definition.data,
      localeLanguage: "en",
      localeLabels: {
        tableEmpty: "No data",
        tableRetry: "Retry",
        tableScroll: "Scrollable table",
        loading: "Loading",
        paginationPrev: "Previous",
        paginationNext: "Next",
        themeLight: "Light",
        themeDark: "Dark",
        themeSystem: "System",
      },
    };
    attachRelations(consumer, false, (self) => {
      syncConsumer(self);
      if (consumer === c.themeToggle) syncThemeToggle(self);
      if (consumer === c.paletteToggle) syncPaletteToggle(self);
    });
  }
  const toggle = c.themeToggle;
  toggle.template = `<view class="mn-theme-toggle" role="group"><button wx:for="{{themeChoices}}" wx:key="value" class="mn-theme-choice mn-button mn-variant-outline {{item.value===activeTheme?'mn-active':''}} {{disabled?'mn-disabled':''}}" aria-pressed="{{item.value===activeTheme}}" disabled="{{disabled}}" data-value="{{item.value}}" bindtap="onChoose">{{item.label}}</button></view>`;
  Object.assign(toggle.definition.properties, {
    value: optional(),
    showSystem: { type: Boolean, value: true },
    labels: optional({}),
    customThemes: optional([]),
  });
  toggle.definition.data = {
    ...toggle.definition.data,
    themeChoices: [],
    activeTheme: "light",
    localTheme: "light",
  };
  toggle.definition.observers = {
    "value,showSystem,labels,customThemes": function (this: Instance) {
      syncThemeToggle(this);
    },
  };
  toggle.definition.methods.onChoose = function (
    this: Instance,
    e: WechatMiniprogram.CustomEvent,
  ) {
    if (this.data.disabled) return;
    const value = String(e.currentTarget.dataset.value);
    const parent = parents.get(this);
    const custom = this.data.customThemes.find(
      (item: { value: string; theme?: unknown }) => item.value === value,
    );
    if (parent) parent.setTheme(custom?.theme ?? value);
    else if (this.data.value === null) this.setData({ localTheme: value });
    syncThemeToggle(this);
    this.triggerEvent("change", { value });
  };
  const palette = c.paletteToggle;
  palette.definition.properties = {
    ...palette.definition.properties,
    value: optional(""),
  };
  palette.definition.data = {
    ...palette.definition.data,
    activePalette: null,
    localPalette: null,
  };
  palette.template = palette.template.replace(
    "item.value === value",
    "item.value === activePalette",
  );
  palette.definition.observers = {
    "value,palettes,showDefault,labels": function (this: Instance) {
      syncPaletteToggle(this);
    },
  };
  palette.definition.methods.onChoose = function (
    this: Instance,
    e: WechatMiniprogram.CustomEvent,
  ) {
    if (this.data.disabled) return;
    const value =
      this.data.choices[Number(e.currentTarget.dataset.index)].value;
    const parent = parents.get(this);
    if (parent) parent.setPalette(value);
    else if (this.data.value === "") this.setData({ localPalette: value });
    syncPaletteToggle(this);
    this.triggerEvent("change", { value });
    this.triggerEvent(
      "paletterequest",
      { palette: value },
      { bubbles: true, composed: true },
    );
  };
}
