type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
export interface NativeFormState {
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  invalid: boolean;
}
const keys = ["disabled", "readOnly", "required", "invalid"] as const;
type Key = (typeof keys)[number];
const own = new WeakMap<
    object,
    Partial<Record<Key | "error", boolean | null>>
  >(),
  parents = new WeakMap<object, Instance>(),
  children = new WeakMap<object, Set<Instance>>(),
  contexts = new WeakMap<object, NativeFormState>(),
  syncing = new WeakSet<object>();
const providers = new WeakSet<object>();
const errorControls = new WeakSet<object>();
const pending = new WeakMap<object, Partial<Record<Key | "error", boolean>>>();
const providerMarker =
    typeof Behavior === "function"
      ? Behavior({})
      : "minerva-native-form-provider",
  consumerMarker =
    typeof Behavior === "function"
      ? Behavior({})
      : "minerva-native-form-consumer";
const base: NativeFormState = {
  disabled: false,
  readOnly: false,
  required: false,
  invalid: false,
};
function sync(self: Instance) {
  if (syncing.has(self)) return;
  const initial =
    own.get(self) ??
    Object.fromEntries(
      [...keys, "error"].map((key) => [key, self.data[key] ?? null]),
    );
  own.set(self, initial);
  const parent = contexts.get(parents.get(self)!) ?? base;
  const state = Object.fromEntries(
    keys.map((key) => [key, initial[key] ?? parent[key]]),
  ) as unknown as NativeFormState;
  if (providers.has(self) && self.data.errorMessage) state.invalid = true;
  contexts.set(self, state);
  const values: Partial<Record<Key | "error", boolean>> = {
    ...state,
    ...(errorControls.has(self)
      ? { error: initial.error ?? state.invalid }
      : {}),
  };
  const changes = Object.fromEntries(
    Object.entries(values).filter(([key, value]) => self.data[key] !== value),
  );
  if (Object.keys(changes).length) {
    pending.set(self, { ...pending.get(self), ...changes });
    syncing.add(self);
    try {
      self.setData(changes);
    } finally {
      syncing.delete(self);
    }
  }
  for (const child of children.get(self) ?? []) sync(child);
}
// Native observers for one setData batch run separately. Defer propagation so
// processing disabled cannot overwrite a simultaneous readOnly/required change.
const scheduledUpdates = new WeakSet<object>();
function schedule(self: Instance) {
  if (scheduledUpdates.has(self)) return;
  scheduledUpdates.add(self);
  Promise.resolve().then(() => {
    scheduledUpdates.delete(self);
    if (own.has(self)) sync(self);
  });
}
function unlink(self: Instance) {
  const parent = parents.get(self);
  if (parent) children.get(parent)?.delete(self);
  parents.delete(self);
}
export function enhanceFormContext(
  providerControls: Control[],
  consumers: Control[],
) {
  for (const control of [...providerControls, ...consumers]) {
    const provider = providerControls.includes(control),
      def = control.definition,
      flags = [
        ...keys,
        ...("error" in def.properties ? (["error"] as const) : []),
      ];
    def.properties = {
      ...def.properties,
      ...Object.fromEntries(
        flags.map((key) => [key, { type: null, value: null }]),
      ),
    };
    def.behaviors = [
      ...(def.behaviors ?? []),
      consumerMarker,
      ...(provider ? [providerMarker] : []),
    ];
    const oldObservers = def.observers ?? {};
    def.observers = { ...oldObservers };
    for (const key of flags) {
      const previous = oldObservers[key];
      def.observers[key] = function (this: Instance, value: boolean | null) {
        if (flags.includes("error")) errorControls.add(this);
        const scheduled = pending.get(this);
        if (scheduled && key in scheduled && scheduled[key] === value) {
          delete scheduled[key];
          return;
        }
        if (syncing.has(this)) return;
        const state =
          own.get(this) ??
          Object.fromEntries(
            [...keys, "error"].map((key) => [key, this.data[key] ?? null]),
          );
        state[key] = value;
        own.set(this, state);
        schedule(this);
        previous?.call(this, value);
      };
    }
    if (provider) {
      const previous = oldObservers.errorMessage;
      def.observers.errorMessage = function (this: Instance, value: string) {
        schedule(this);
        previous?.call(this, value);
      };
    }
    def.relations = {
      ...def.relations,
      minervaNativeForm: {
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
          sync(this);
        },
        unlinked(this: Instance) {
          unlink(this);
          sync(this);
        },
      },
      ...(provider
        ? {
            minervaNativeFields: { type: "descendant", target: consumerMarker },
          }
        : {}),
    };
    const attached = def.lifetimes?.attached,
      detached = def.lifetimes?.detached;
    def.lifetimes = {
      ...def.lifetimes,
      attached(this: Instance) {
        if (provider) providers.add(this);
        if (flags.includes("error")) errorControls.add(this);
        const state =
          own.get(this) ??
          Object.fromEntries(
            [...keys, "error"].map((key) => [key, this.data[key] ?? null]),
          );
        for (const key of flags)
          if (!(key in state)) state[key] = this.data[key] ?? null;
        own.set(this, state);
        attached?.call(this);
        sync(this);
      },
      detached(this: Instance) {
        detached?.call(this);
        unlink(this);
        own.delete(this);
        contexts.delete(this);
        children.delete(this);
        providers.delete(this);
        errorControls.delete(this);
        pending.delete(this);
      },
    };
    def.methods = {
      ...def.methods,
      getFormState(this: Instance) {
        return { ...(contexts.get(this) ?? base) };
      },
    };
  }
}
