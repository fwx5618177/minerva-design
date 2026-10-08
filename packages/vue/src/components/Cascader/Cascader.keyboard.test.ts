// Keyboard audit (combobox + column listboxes) with real user-event keys,
// and the FormControl wiring.
import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick } from "vue";
import { Cascader, type CascaderOption } from ".";
import { Modal } from "../Modal";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
} from "../FormControl";

const options: CascaderOption[] = [
  {
    value: "fiction",
    label: "Fiction",
    children: [
      { value: "fantasy", label: "Fantasy" },
      { value: "scifi", label: "Science fiction" },
    ],
  },
  { value: "poetry", label: "Poetry" },
  { value: "essays", label: "Essays" },
];

const input = () => screen.getByRole("combobox", { name: "Genre" });
const option = (name: string) => screen.getByRole("option", { name });

describe("Cascader keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
  ])(
    "%s opens from the Tab-reachable input and focuses the first option",
    async (_, keys) => {
      const user = userEvent.setup();
      render(Cascader, {
        props: { label: "Genre", name: "genre", options },
      });
      await user.tab();
      expect(input()).toHaveFocus();
      await user.keyboard(keys);
      expect(input()).toHaveAttribute("aria-expanded", "true");
      expect(option("Fiction")).toHaveFocus();
    },
  );

  it("Home / End / arrows move within a column, Enter picks a leaf", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Cascader, {
      props: { label: "Genre", name: "genre", options },
    });
    input().focus();
    await user.keyboard("{Enter}{End}");
    expect(option("Essays")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(option("Fiction")).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowDown}");
    expect(option("Science fiction")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect((emitted("change") as unknown[][])[0][0]).toEqual([
      "fiction",
      "scifi",
    ]);
    expect(input()).toHaveFocus();
    expect(input()).toHaveAttribute("aria-expanded", "false");
  });

  it("moves the public item hooks with keyboard navigation", async () => {
    const user = userEvent.setup();
    render(Cascader, {
      props: {
        label: "Genre",
        name: "genre",
        options: [
          ...options,
          { value: "drama", label: "Drama", disabled: true },
          { value: "lazy", label: "Lazy", isLeaf: false, loading: true },
        ],
      },
    });
    input().focus();
    await user.keyboard("{Enter}");
    expect(option("Fiction")).toHaveAttribute("data-minerva", "cascader");
    expect(option("Fiction")).toHaveAttribute("data-part", "item");
    expect(option("Fiction")).not.toHaveAttribute("data-expanded");
    expect(option("Drama")).toHaveAttribute("data-disabled", "");
    expect(option("Lazy")).toHaveAttribute("data-loading", "");
    await user.keyboard("{ArrowRight}");
    expect(option("Fiction")).toHaveAttribute("data-expanded", "");
    expect(option("Fiction")).not.toHaveAttribute("data-selected");
    await user.keyboard("{ArrowDown}{Enter}");
    // reopens on the selected path
    await user.keyboard("{ArrowDown}");
    expect(option("Fiction")).toHaveAttribute("data-selected", "");
    expect(option("Fiction")).toHaveAttribute("data-expanded", "");
    expect(option("Science fiction")).toHaveAttribute("data-selected", "");
    // a leaf shows no children column
    expect(option("Science fiction")).not.toHaveAttribute("data-expanded");
    expect(option("Science fiction")).toHaveFocus();
    expect(option("Fantasy")).not.toHaveAttribute("data-selected");
  });

  it("inside a Modal, Escape closes only the dropdown and returns focus to the input", async () => {
    const user = userEvent.setup();
    const { emitted } = render(
      defineComponent({
        emits: ["openChange"],
        setup:
          (_, { emit }) =>
          () =>
            h(
              Modal,
              {
                open: true,
                title: "Filter",
                onOpenChange: (v: boolean) => emit("openChange", v),
              },
              () => h(Cascader, { label: "Genre", name: "genre", options }),
            ),
      }),
    );
    await waitFor(() => expect(input()).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    expect(option("Fiction")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveFocus();
    expect(emitted("openChange")).toBeUndefined();
    await user.keyboard("{Escape}");
    expect(emitted("openChange")).toEqual([[false]]);
  });
});

const fieldOptions: CascaderOption[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [{ value: "hangzhou", label: "Hangzhou" }],
  },
];
const region = (props: Record<string, unknown> = {}) =>
  h(Cascader, {
    label: "Region",
    name: "region",
    options: fieldOptions,
    ...props,
  });

describe("Cascader inside a FormControl", () => {
  it("takes the field id, label and helper text", async () => {
    render(
      defineComponent(
        () => () =>
          h(
            FormField,
            { id: "region", label: "Region", helperText: "Pick a city" },
            () => region({ label: "Fallback" }),
          ),
      ),
    );
    // the helper / error text registers after the control rendered
    await nextTick();
    const el = screen.getByLabelText("Region");
    expect(el).toHaveAttribute("id", "region");
    expect(el).toHaveAttribute("aria-labelledby", "region-label");
    expect(screen.getByRole("combobox", { name: "Region" })).toBe(el);
    expect(el.getAttribute("aria-describedby")).toContain("region-helper");
    expect(el).not.toHaveAttribute("aria-invalid");
  });

  it("merges a consumer aria-describedby with the helper id", async () => {
    render(
      defineComponent(
        () => () =>
          h(FormControl, { id: "f" }, () => [
            h(FormLabel, null, () => "Region"),
            region({ "aria-describedby": "extra" }),
            h(FormHelperText, null, () => "Help"),
          ]),
      ),
    );
    // the helper / error text registers after the control rendered
    await nextTick();
    const ids = screen
      .getByLabelText("Region")
      .getAttribute("aria-describedby")
      ?.split(" ");
    expect(ids).toEqual(expect.arrayContaining(["f-helper", "extra"]));
  });

  it("reflects invalid and required from the context", async () => {
    const { container } = render(
      defineComponent(
        () => () =>
          h(FormControl, { id: "f", invalid: true, required: true }, () => [
            h(FormLabel, null, () => "Region"),
            region(),
            h(FormErrorMessage, null, () => "Required"),
          ]),
      ),
    );
    // the helper / error text registers after the control rendered
    await nextTick();
    const el = screen.getByRole("combobox");
    expect(el).toHaveAttribute("aria-invalid", "true");
    expect(el).toHaveAttribute("aria-required", "true");
    expect(el).toBeRequired();
    expect(el.getAttribute("aria-describedby")).toContain("f-error");
    expect(
      container.querySelector('[data-minerva="cascader"][data-part="root"]'),
    ).toHaveAttribute("data-invalid", "");
  });

  it("is disabled by the context", async () => {
    const user = userEvent.setup();
    render(
      defineComponent(
        () => () =>
          h(FormControl, { disabled: true }, () => [
            h(FormLabel, null, () => "Region"),
            region(),
          ]),
      ),
    );
    const el = screen.getByLabelText("Region");
    expect(el).toBeDisabled();
    await user.click(el);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("lets explicit props win over the context", () => {
    render(
      defineComponent(
        () => () =>
          h(FormControl, { disabled: true, required: true }, () => [
            h(FormLabel, null, () => "Region"),
            region({ disabled: false, required: false, id: "own" }),
          ]),
      ),
    );
    const el = screen.getByRole("combobox");
    expect(el).toBeEnabled();
    expect(el).not.toBeRequired();
    expect(el).not.toHaveAttribute("aria-required");
    expect(el).toHaveAttribute("id", "own");
  });

  it("does not open or clear while read-only", async () => {
    const user = userEvent.setup();
    render(
      defineComponent(
        () => () =>
          h(FormControl, { readOnly: true }, () => [
            h(FormLabel, null, () => "Region"),
            region({ defaultValue: ["zhejiang", "hangzhou"] }),
          ]),
      ),
    );
    await user.click(screen.getByLabelText("Region"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /clear/i }),
    ).not.toBeInTheDocument();
  });

  it("prefers an explicit aria-label over the FormLabel", () => {
    render(
      defineComponent(
        () => () =>
          h(FormControl, null, () => [
            h(FormLabel, null, () => "Region"),
            region({ "aria-label": "Shipping region" }),
          ]),
      ),
    );
    const el = screen.getByRole("combobox", { name: "Shipping region" });
    expect(el).not.toHaveAttribute("aria-labelledby");
  });
});

describe("Cascader root and control attributes", () => {
  it("applies style, class and data-* to the root and aria-* to the input", () => {
    const { container } = render(
      defineComponent(() => () => [
        h("span", { id: "lbl" }, "Destination"),
        h("span", { id: "desc" }, "Where to ship"),
        region({
          class: "custom",
          style: { margin: "4px" },
          "data-testid": "root",
          "data-foo": "bar",
          "aria-labelledby": "lbl",
          "aria-describedby": "desc",
        }),
      ]),
    );
    const root = screen.getByTestId("root");
    expect(root).toBe(container.querySelector(".custom"));
    expect(root).toHaveAttribute("data-foo", "bar");
    expect(root.style.margin).toBe("4px");
    expect(root.style.width).toBe("240px");
    const el = screen.getByRole("combobox", { name: "Destination" });
    expect(el).toHaveAttribute("aria-describedby", "desc");
  });

  it("uses aria-label on the input", () => {
    render(defineComponent(() => () => region({ "aria-label": "Area" })));
    expect(screen.getByRole("combobox", { name: "Area" })).toBeInTheDocument();
  });
});
