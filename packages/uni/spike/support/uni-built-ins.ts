/**
 * Minimal uni-app built-in component shims for Vue Test Utils + happy-dom.
 * They render plain DOM, pass through attrs/listeners and the default slot,
 * and translate DOM `click` into uni's `tap` event (H5 semantics).
 *
 * Registered with Capitalized names (View/Text/Button): Vue's resolveComponent
 * tries `name`, camelize(name), Capitalize(camelize(name)), so `<view>` resolves
 * to `View`, while avoiding the "Do not use built-in or reserved HTML elements as
 * component id" dev warning that lowercase `view`/`text`/`button` would trigger.
 */
import { defineComponent, h, type Component } from "vue";

function uniShim(name: string, tag: string): Component {
  return defineComponent({
    name: `Uni${name}`,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => {
        const { onTap, onClick, ...rest } = attrs as Record<string, unknown>;
        const handlers = [onClick, onTap].flat().filter(Boolean) as Array<
          (e: Event) => void
        >;
        return h(
          tag,
          {
            ...rest,
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

export const UNI_BUILT_IN_TAGS = [
  "view",
  "text",
  "button",
  "image",
  "scroll-view",
  "input",
] as const;

export const uniBuiltIns: Record<string, Component> = {
  View: uniShim("View", "div"),
  Text: uniShim("Text", "span"),
  Button: uniShim("Button", "button"),
  Image: uniShim("Image", "img"),
  ScrollView: uniShim("ScrollView", "div"),
  Input: uniShim("Input", "input"),
};
