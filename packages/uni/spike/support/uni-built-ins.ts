/**
 * Minimal uni-app built-in component shims for Vue Test Utils + happy-dom.
 * They render plain DOM, pass through attrs/listeners and the default slot,
 * and translate DOM `click` into uni's `tap` event (H5 semantics).
 *
 * Registered as Uni*Host to avoid VTU's global-to-local merge replacing
 * public components named Button/Input/etc. The test compiler maps only the
 * lowercase native tags to these aliases; public component imports stay real.
 */
import { defineComponent, h, ref, watch, nextTick, type Component } from "vue";

function uniShim(name: string, tag: string): Component {
  return defineComponent({
    name: `Uni${name}`,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const element = ref<HTMLElement>();
      if (name === "Input")
        watch(
          () => attrs.focus,
          (value) => {
            if (value) nextTick(() => element.value?.focus());
          },
          { immediate: true },
        );
      return () => {
        const { onTap, onClick, ...rest } = attrs as Record<string, unknown>;
        if (name === "Input") delete rest.focus;
        const handlers = [onClick, onTap].flat().filter(Boolean) as Array<
          (e: Event) => void
        >;
        return h(
          tag,
          {
            ...rest,
            ref: element,
            "data-uni": name.toLowerCase(),
            onClick: handlers.length
              ? (e: Event) => {
                  // native disabled buttons never dispatch click in a browser; mirror that
                  if ((e.currentTarget as HTMLButtonElement | null)?.disabled)
                    return;
                  handlers.forEach((fn) => fn(e));
                }
              : undefined,
          },
          slots.default?.(),
        );
      };
    },
  });
}

// Like the platform switch, this widget changes internal checked state before
// emitting change. Only a changed prop or a remount corrects an owner rejection.
const UniSwitch = defineComponent({
  name: "UniSwitch",
  inheritAttrs: false,
  props: { checked: Boolean, disabled: Boolean },
  emits: ["change"],
  setup(props, { attrs, emit }) {
    const nativeChecked = ref(props.checked);
    watch(
      () => props.checked,
      (checked) => {
        nativeChecked.value = checked;
      },
    );
    return () =>
      h("input", {
        ...attrs,
        type: "checkbox",
        role: "switch",
        "data-uni": "switch",
        checked: nativeChecked.value,
        disabled: props.disabled,
        onChange(event: Event) {
          nativeChecked.value = (event.target as HTMLInputElement).checked;
          emit("change", { detail: { value: nativeChecked.value } });
        },
      });
  },
});

export const UNI_BUILT_IN_TAGS = [
  "view",
  "text",
  "button",
  "image",
  "scroll-view",
  "input",
  "switch",
] as const;

export const uniBuiltIns: Record<string, Component> = {
  UniViewHost: uniShim("View", "div"),
  UniTextHost: uniShim("Text", "span"),
  UniButtonHost: uniShim("Button", "button"),
  UniImageHost: uniShim("Image", "img"),
  UniScrollViewHost: uniShim("ScrollView", "div"),
  UniInputHost: uniShim("Input", "input"),
  UniSwitchHost: UniSwitch,
};
