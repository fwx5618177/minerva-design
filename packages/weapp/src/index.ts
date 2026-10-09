/** Native WeChat definitions. Build emits Component registrations and WXML/WXSS/JSON. */
interface ControlInstance {
  data: Record<string, unknown>;
  triggerEvent(name: string, detail: Record<string, unknown>): void;
}
const flag = () => ({ type: Boolean, value: false });
const string = (value = "") => ({ type: String, value });
const blocked = (self: ControlInstance) =>
  self.data.disabled || self.data.readOnly;
export const button = {
  template: `<button class="mn-button mn-size-{{size}} mn-variant-{{variant}}" disabled="{{disabled || loading}}" loading="{{loading}}" form-type="{{formType}}" bindtap="onTap"><slot />{{label}}</button>`,
  definition: {
    behaviors: ["wx://form-field-button"],
    properties: {
      label: string(),
      disabled: flag(),
      loading: flag(),
      size: string("medium"),
      variant: string("solid"),
      formType: string(),
    },
    methods: {
      onTap(this: ControlInstance) {
        if (!this.data.disabled && !this.data.loading)
          this.triggerEvent("click", {});
      },
    },
  },
};
export const input = {
  template: `<input class="mn-input" value="{{value}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" name="{{name}}" type="{{type}}" password="{{password}}" maxlength="{{maxlength}}" bindinput="onInput" />`,
  definition: {
    behaviors: ["wx://form-field"],
    properties: {
      value: string(),
      disabled: flag(),
      readOnly: flag(),
      placeholder: string(),
      name: string(),
      type: string("text"),
      password: flag(),
      maxlength: { type: Number, value: 140 },
    },
    methods: {
      onInput(this: ControlInstance, event: { detail: { value: string } }) {
        if (blocked(this)) return this.data.value;
        this.triggerEvent("change", { value: event.detail.value });
        return this.data.value;
      },
    },
  },
};
export const toggle = {
  template: `<switch class="mn-switch" checked="{{checked}}" disabled="{{disabled || readOnly}}" name="{{name}}" color="{{color}}" catchchange="onChange" />`,
  definition: {
    behaviors: ["wx://form-field-group"],
    properties: {
      checked: flag(),
      disabled: flag(),
      readOnly: flag(),
      name: string(),
      color: string("#2563eb"),
    },
    methods: {
      onChange(this: ControlInstance, event: { detail: { value: boolean } }) {
        if (!blocked(this))
          this.triggerEvent("change", { checked: event.detail.value });
      },
    },
  },
};
