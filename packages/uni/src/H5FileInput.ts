import { defineComponent, h, ref } from "vue";
/** Isolated HTML input; mini compilers keep their native input contract. */
export default defineComponent({
  props: {
    accept: String,
    multiple: Boolean,
    disabled: Boolean,
    label: String,
  },
  emits: ["files"],
  setup(props, { emit, expose }) {
    const input = ref<HTMLInputElement>();
    expose({ choose: () => input.value?.click() });
    return () =>
      h("input", {
        ref: input,
        type: "file",
        accept: props.accept,
        multiple: props.multiple,
        disabled: props.disabled,
        "aria-label": props.label,
        style: { display: "none" },
        onChange: (event: Event) => {
          const target = event.target as HTMLInputElement;
          emit("files", Array.from(target.files ?? []));
          target.value = "";
        },
      });
  },
});
