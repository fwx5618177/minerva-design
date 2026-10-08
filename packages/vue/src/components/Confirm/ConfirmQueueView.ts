import {
  defineComponent,
  h,
  onScopeDispose,
  provide,
  shallowRef,
  type PropType,
  type Ref,
} from "vue";
import { THEME_SCOPE_KEY, type ThemeScope } from "../../internal/scope";
import ConfirmDialog from "./ConfirmDialog.vue";
import type { ConfirmQueue } from "./queue";

/** Provides the caller's theme scope to the dialog of one request. */
const ScopeProvider = defineComponent({
  name: "ConfirmScope",
  props: {
    scope: { type: Object as PropType<Ref<ThemeScope>>, required: true },
  },
  setup(props, { slots }) {
    provide(THEME_SCOPE_KEY, props.scope);
    return () => slots.default?.();
  },
});

/** Renders the head request of a confirmation queue; internal. */
export const ConfirmQueueView = defineComponent({
  name: "ConfirmQueueView",
  props: {
    queue: { type: Object as PropType<ConfirmQueue>, required: true },
  },
  setup(props) {
    const requests = shallowRef(props.queue.getSnapshot());
    onScopeDispose(
      props.queue.subscribe(() => {
        requests.value = props.queue.getSnapshot();
      }),
    );
    return () => {
      const top = requests.value[0];
      if (!top) return null;
      const { queue } = props;
      // One instance per request: consecutive confirmations never share state.
      const dialog = h(ConfirmDialog, {
        key: top.id,
        ...top.options,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) queue.settle(top.id, false);
        },
        onConfirm: () => queue.settle(top.id, true),
      });
      // The dialog teleports into the caller's scoped host and the labels use
      // its language.
      return top.scope
        ? h(ScopeProvider, { key: top.id, scope: top.scope }, () => dialog)
        : dialog;
    };
  },
});
