import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import { Steps } from ".";
import ConfigProvider from "../../config/ConfigProvider.vue";

const items = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done", disabled: true },
];

describe("Steps", () => {
  it("renders a labelled ordered list with numbered steps and hooks", () => {
    render(Steps, { props: { items, modelValue: "review" } });
    const list = screen.getByRole("list", { name: "Steps" });
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("steps");
    expect(list).toHaveAttribute("data-minerva", "steps");
    expect(list).toHaveAttribute("data-readonly", "");
    const [draft, review, done] = screen.getAllByRole("listitem");
    expect(draft).toHaveClass("step", "complete");
    expect(draft).toHaveAttribute("data-status", "complete");
    expect(review).toHaveClass("step", "current");
    expect(review).toHaveAttribute("aria-current", "step");
    expect(review).toHaveAttribute("data-current", "");
    expect(review).not.toHaveAttribute("data-status");
    expect(done).toHaveAttribute("data-status", "upcoming");
    // read-only: disabled has no effect
    expect(done).not.toHaveAttribute("data-disabled");
    expect(draft.querySelector('[data-part="indicator"]')).toHaveTextContent(
      "1",
    );
    expect(draft.querySelector('[data-part="indicator"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(draft.querySelector('[data-part="label"]')).toHaveTextContent(
      "Draft",
    );
    const wrapper = draft.querySelector('[data-part="button"]')!;
    expect(wrapper.tagName).toBe("SPAN");
    expect(wrapper).toHaveClass("button", "static");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("is navigable with a change listener: buttons, aria-current on the button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(Steps, { props: { items, defaultValue: "draft", onChange } });
    expect(screen.getByRole("list")).not.toHaveAttribute("data-readonly");
    const draft = screen.getByRole("button", { name: "Draft" });
    expect(draft).toHaveAttribute("aria-current", "step");
    expect(draft).toHaveAttribute("type", "button");
    expect(screen.getAllByRole("listitem")[0]).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getAllByRole("listitem")[2]).toHaveAttribute(
      "data-disabled",
      "",
    );
    await user.click(draft);
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /Done/ }));
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /Review/ }));
    expect(onChange).toHaveBeenCalledWith("review");
    expect(screen.getByRole("button", { name: /Review/ })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("activates with Space / Enter and skips disabled steps in tab order", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(Steps, { props: { items, defaultValue: "draft", onChange } });
    await user.tab();
    await user.tab();
    const review = screen.getByRole("button", { name: /Review/ });
    expect(review).toHaveFocus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenCalledWith("review");
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("supports v-model", async () => {
    const user = userEvent.setup();
    const value = ref("draft");
    render(
      defineComponent({
        setup: () => () =>
          h(Steps, {
            items,
            modelValue: value.value,
            "onUpdate:modelValue": (v: string) => (value.value = v),
          }),
      }),
    );
    await user.click(screen.getByRole("button", { name: /Review/ }));
    expect(value.value).toBe("review");
    value.value = "draft";
    await nextTick();
    expect(screen.getByRole("button", { name: /Draft/ })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("keeps a controlled value the parent does not update", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Steps, {
      props: { items, modelValue: "draft", readOnly: false },
    });
    await user.click(screen.getByRole("button", { name: /Review/ }));
    expect(emitted("change")).toEqual([["review"]]);
    expect(emitted("update:modelValue")).toEqual([["review"]]);
    expect(screen.getByRole("button", { name: /Draft/ })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("can be forced read-only despite a listener", () => {
    render(Steps, {
      props: { items, modelValue: "draft", readOnly: true, onChange: vi.fn() },
    });
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("marks no step current when the value matches nothing", () => {
    render(Steps, { props: { items } });
    const steps = screen.getAllByRole("listitem");
    steps.forEach((step) => {
      expect(step).not.toHaveAttribute("aria-current");
      expect(step).toHaveAttribute("data-status", "upcoming");
    });
  });

  it("forwards attributes; aria-label overrides the default; label slot", () => {
    render(Steps, {
      props: { items, modelValue: "draft" },
      attrs: { "aria-label": "Order", class: "mine", "data-part": "x" },
      slots: {
        label: ({ item, index }: { item: { value: string }; index: number }) =>
          `${index}:${item.value}`,
      },
    });
    const list = screen.getByRole("list", { name: "Order" });
    expect(list).toHaveClass("steps", "mine");
    expect(list).toHaveAttribute("data-part", "root");
    expect(screen.getByText("1:review")).toBeInTheDocument();
  });

  it("translates the default list label", () => {
    render(
      defineComponent({
        setup: () => () =>
          h(ConfigProvider, { locale: { language: "zh" } }, () =>
            h(Steps, { items, modelValue: "draft" }),
          ),
      }),
    );
    expect(screen.getByRole("list", { name: "步骤" })).toBeInTheDocument();
  });
});
