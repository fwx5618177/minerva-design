import { createRef, useState, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  type SelectProps,
} from ".";
import {
  FormControlContext,
  type FormControlContextValue,
} from "../FormControl/context";
import { FormControl, FormHelperText, FormLabel } from "../FormControl";
import { Modal, ModalBody } from "../Modal";
import { ConfigProvider } from "../../contexts/ConfigProvider";

const field = (
  overrides: Partial<FormControlContextValue> = {},
): FormControlContextValue => ({
  id: "field",
  helperId: "field-helper",
  errorId: "field-error",
  labelId: "field-label",
  invalid: false,
  required: false,
  disabled: false,
  readOnly: false,
  hasHelperText: false,
  hasErrorMessage: false,
  registerHelperText: () => {},
  registerErrorMessage: () => {},
  ...overrides,
});

function Langs(props: Omit<SelectProps, "children">) {
  return (
    <Select aria-label="Language" placeholder="Pick one" {...props}>
      <SelectItem value="zh">Chinese</SelectItem>
      <SelectItem value="en">English</SelectItem>
      <SelectSeparator data-testid="sep" />
      <SelectGroup data-testid="group">
        <SelectLabel>Experimental</SelectLabel>
        <SelectItem value="ja" disabled>
          Japanese
        </SelectItem>
      </SelectGroup>
    </Select>
  );
}

const trigger = () => screen.getByRole("combobox", { name: "Language" });
const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("Select", () => {
  it("renders a combobox trigger with placeholder and default classes", () => {
    render(<Langs />);
    const t = trigger();
    expect(t).toHaveTextContent("Pick one");
    expect(t).toHaveAttribute("aria-expanded", "false");
    expect(t).toHaveClass("trigger", "medium");
    expect(t).toHaveAttribute("data-component", "select");
    expect(t).not.toHaveAttribute("aria-invalid");
    expect(t.querySelector(".value")).toHaveTextContent("Pick one");
    expect(t.querySelector(".icon svg")).not.toBeNull();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it.each(["small", "large"] as const)(
    "applies size %s, className and the invalid state",
    (size) => {
      render(<Langs size={size} className="consumer" invalid />);
      const t = trigger();
      expect(t).toHaveClass(size, "consumer", "invalid");
      expect(t).toHaveAttribute("aria-invalid", "true");
    },
  );

  it("opens on click, lists options, and selects one (uncontrolled)", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs onChange={onChange} contentClassName="popup" />);
    await user.click(trigger());
    const listbox = await screen.findByRole("listbox");
    expect(listbox.closest(".content")).toHaveClass("popup");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
      "Chinese",
      "English",
      "Japanese",
    ]);
    expect(screen.getAllByRole("option")[0]).toHaveClass("item");
    expect(
      screen.getAllByRole("option")[0].querySelector(".itemText"),
    ).toHaveTextContent("Chinese");
    expect(screen.getByText("Experimental")).toHaveClass("label");
    expect(screen.getByTestId("sep")).toHaveClass("separator");
    expect(screen.getByTestId("group")).toContainElement(
      screen.getByText("Experimental"),
    );
    await user.click(screen.getByRole("option", { name: "English" }));
    expect(onChange).toHaveBeenCalledWith("en");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveTextContent("English");
  });

  it("shows the selected value via defaultValue and marks the item selected", async () => {
    const user = setup();
    render(<Langs defaultValue="zh" />);
    expect(trigger()).toHaveTextContent("Chinese");
    await user.click(trigger());
    const zh = await screen.findByRole("option", { name: "Chinese" });
    expect(zh).toHaveAttribute("aria-selected", "true");
    expect(zh.querySelector(".itemIndicator")).not.toBeNull();
  });

  it("is controllable via value / onChange", async () => {
    const user = setup();
    const spy = vi.fn();
    function App() {
      const [value, setValue] = useState("zh");
      return (
        <Langs
          value={value}
          onChange={(v) => {
            spy(v);
            setValue(v);
          }}
        />
      );
    }
    render(<App />);
    expect(trigger()).toHaveTextContent("Chinese");
    await user.click(trigger());
    await user.click(await screen.findByRole("option", { name: "English" }));
    expect(spy).toHaveBeenCalledWith("en");
    expect(trigger()).toHaveTextContent("English");
  });

  it("supports a controlled open state", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Langs open={false} onOpenChange={onOpenChange} />,
    );
    await user.click(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("listbox")).toBeNull();
    rerender(<Langs open onOpenChange={onOpenChange} />);
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
  });

  it("does not select disabled items", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs onChange={onChange} />);
    await user.click(trigger());
    const ja = await screen.findByRole("option", { name: "Japanese" });
    expect(ja).toHaveAttribute("aria-disabled", "true");
    await user.click(ja);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports keyboard open and selection", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs onChange={onChange} />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("listbox");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("en");
  });

  it("closes on Escape without selecting", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs onChange={onChange} />);
    await user.click(trigger());
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disabled prevents opening", async () => {
    const user = setup();
    render(<Langs disabled />);
    expect(trigger()).toBeDisabled();
    await user.click(trigger());
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("forwards the ref to the trigger button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Select ref={ref} aria-label="Language">
        <SelectItem value="zh">Chinese</SelectItem>
      </Select>,
    );
    expect(ref.current).toBe(trigger());
  });

  it("submits the selected value through a native form via name", () => {
    const { container } = render(
      <form>
        <Langs name="lang" defaultValue="en" />
      </form>,
    );
    const form = container.querySelector("form")!;
    expect(new FormData(form).get("lang")).toBe("en");
  });

  it("server-renders the trigger and its value slot", () => {
    const html = renderToStaticMarkup(
      <Select aria-label="Event" placeholder="Pick">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(html).toContain('data-component="select"');
    expect(html).toMatch(/<span class="value"><span[^>]*>Pick<\/span>/);
  });

  it("inherits id, invalid and disabled from a FormControl", () => {
    render(
      <FormControlContext.Provider
        value={field({ id: "lang", invalid: true, disabled: true })}
      >
        <label htmlFor="lang">Lang</label>
        <Select placeholder="Pick">
          <SelectItem value="zh">Chinese</SelectItem>
        </Select>
      </FormControlContext.Provider>,
    );
    const t = screen.getByRole("combobox", { name: "Lang" });
    expect(t).toHaveAttribute("id", "lang");
    expect(t).toHaveAttribute("aria-invalid", "true");
    expect(t).toHaveClass("invalid");
    expect(t).toBeDisabled();
  });

  it("lets an explicit disabled={false} override the FormControl", () => {
    render(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Select aria-label="Language" disabled={false}>
          <SelectItem value="zh">Chinese</SelectItem>
        </Select>
      </FormControlContext.Provider>,
    );
    expect(trigger()).toBeEnabled();
  });

  it("describes the trigger with helper text and marks it required", () => {
    render(
      <FormControlContext.Provider
        value={field({ id: "genre", required: true, hasHelperText: true })}
      >
        <label htmlFor="genre">Genre</label>
        <Select placeholder="Pick" aria-describedby="extra">
          <SelectItem value="a">A</SelectItem>
        </Select>
        <span id="field-helper">Shown on the book page</span>
        <span id="extra">Optional</span>
      </FormControlContext.Provider>,
    );
    const t = screen.getByRole("combobox", { name: /Genre/ });
    expect(t).toHaveAccessibleDescription("Shown on the book page Optional");
    expect(t).toHaveAttribute("aria-required", "true");
  });
});

const listbox = () => screen.getByRole("listbox");
const option = (name: string) => screen.getByRole("option", { name });
const nativeSelect = (container: HTMLElement) =>
  container.querySelector("select") as HTMLSelectElement;

describe("Select keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
    ["ArrowUp", "{ArrowUp}"],
    ["Alt+ArrowDown", "{Alt>}{ArrowDown}{/Alt}"],
  ])("opens with %s and focuses the selected option", async (_, keys) => {
    const user = setup();
    render(<Langs defaultValue="en" />);
    trigger().focus();
    await user.keyboard(keys);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveAttribute("aria-controls", listbox().id);
    expect(option("English")).toHaveFocus();
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(listbox()).toHaveAttribute("data-state", "open");
  });

  it("highlights the first enabled option on open without a value, the last one with ArrowUp", async () => {
    const user = setup();
    render(<Langs />);
    trigger().focus();
    await user.keyboard("{ArrowDown}");
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(trigger()).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    // Japanese is disabled: the last enabled option is English.
    expect(option("English")).toHaveFocus();
    await user.keyboard("{Escape}{Home}");
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}{End}");
    expect(option("English")).toHaveFocus();
  });

  it("moves with the arrows without wrapping, skips disabled options, supports Home / End / PageUp / PageDown", async () => {
    const user = setup();
    render(
      <Select aria-label="Language">
        <SelectItem value="a">Alpha</SelectItem>
        <SelectItem value="b" disabled>
          Beta
        </SelectItem>
        <SelectItem value="c">Gamma</SelectItem>
        <SelectItem value="d">Delta</SelectItem>
      </Select>,
    );
    await user.click(trigger());
    expect(option("Alpha")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(option("Alpha")).toHaveFocus(); // no wrap
    await user.keyboard("{ArrowDown}");
    expect(option("Gamma")).toHaveFocus(); // Beta skipped
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(option("Delta")).toHaveFocus(); // no wrap
    expect(option("Delta")).toHaveAttribute("data-highlighted");
    expect(option("Gamma")).not.toHaveAttribute("data-highlighted");
    await user.keyboard("{Home}");
    expect(option("Alpha")).toHaveFocus();
    await user.keyboard("{End}");
    expect(option("Delta")).toHaveFocus();
    await user.keyboard("{PageUp}");
    expect(option("Alpha")).toHaveFocus();
    await user.keyboard("{PageDown}");
    expect(option("Delta")).toHaveFocus();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "selects with %s, closes and returns focus to the trigger",
    async (_, key) => {
      const user = setup();
      const onChange = vi.fn();
      const onOpenChange = vi.fn();
      render(<Langs onChange={onChange} onOpenChange={onOpenChange} />);
      await user.click(trigger());
      await user.keyboard("{ArrowDown}");
      await user.keyboard(key);
      expect(onChange).toHaveBeenCalledExactlyOnceWith("en");
      expect(screen.queryByRole("listbox")).toBeNull();
      expect(trigger()).toHaveFocus();
      expect(trigger()).toHaveTextContent("English");
      // The keyup of Space on the trigger does not reopen it.
      expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    },
  );

  it("Enter on a disabled highlight is ignored, Alt+ArrowUp selects and closes", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs onChange={onChange} />);
    await user.click(trigger());
    await user.hover(option("Japanese"));
    expect(option("Japanese")).not.toHaveAttribute("data-highlighted");
    await user.keyboard("{ArrowDown}{Alt>}{ArrowUp}{/Alt}");
    expect(onChange).toHaveBeenCalledWith("en");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("Tab closes the listbox and moves on in the natural tab order", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(
      <>
        <button type="button">Before</button>
        <Langs onChange={onChange} />
        <button type="button">After</button>
      </>,
    );
    await user.click(trigger());
    expect(option("Chinese")).toHaveFocus();
    await user.tab();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();

    await user.click(trigger());
    await user.tab({ shift: true });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("button", { name: "Before" })).toHaveFocus();
  });

  it("typeahead on the closed trigger changes the selection without opening", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs onChange={onChange} />);
    trigger().focus();
    await user.keyboard("e");
    expect(onChange).toHaveBeenLastCalledWith("en");
    expect(trigger()).toHaveTextContent("English");
    expect(screen.queryByRole("listbox")).toBeNull();
    // Disabled options are never matched.
    await user.keyboard("j");
    expect(onChange).toHaveBeenCalledTimes(1);
    await new Promise((r) => setTimeout(r, 600));
    await user.keyboard("c");
    expect(onChange).toHaveBeenLastCalledWith("zh");
    expect(trigger()).toHaveTextContent("Chinese");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("typeahead in the open listbox moves the highlight (typing a space continues a search)", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(
      <Select aria-label="Language" onChange={onChange}>
        <SelectItem value="nz">New Zealand</SelectItem>
        <SelectItem value="ny" textValue="New York">
          <b>NY</b>
        </SelectItem>
        <SelectItem value="no">Norway</SelectItem>
      </Select>,
    );
    await user.click(trigger());
    await user.keyboard("nor");
    expect(option("Norway")).toHaveFocus();
    await new Promise((r) => setTimeout(r, 600));
    await user.keyboard("new y");
    expect(option("NY")).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();
    expect(listbox()).toBeInTheDocument();
  });

  it("scrolls the highlighted option into view on open and on keyboard moves", async () => {
    const user = setup();
    const spy = vi
      .spyOn(HTMLElement.prototype, "scrollIntoView")
      .mockImplementation(() => {});
    try {
      render(<Langs defaultValue="en" />);
      await user.click(trigger());
      await waitFor(() =>
        expect(spy.mock.contexts).toContain(option("English")),
      );
      expect(spy).toHaveBeenCalledWith({ block: "nearest" });
      await user.keyboard("{ArrowUp}");
      await waitFor(() =>
        expect(spy.mock.contexts[spy.mock.contexts.length - 1]).toBe(
          option("Chinese"),
        ),
      );
    } finally {
      spy.mockRestore();
    }
  });
});

describe("Select pointer", () => {
  it("highlights (and focuses) options on hover", async () => {
    const user = setup();
    render(<Langs defaultValue="zh" />);
    await user.click(trigger());
    await user.hover(option("English"));
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(option("English")).toHaveFocus();
    expect(option("Chinese")).not.toHaveAttribute("data-highlighted");
    expect(option("Chinese")).toHaveAttribute("data-state", "checked");
    expect(option("English")).toHaveAttribute("data-state", "unchecked");
  });

  it("closes on an outside pointer down and on a second click on the trigger", async () => {
    const user = setup();
    render(
      <>
        <p>Outside</p>
        <Langs />
      </>,
    );
    await user.click(trigger());
    await act(() => new Promise((r) => setTimeout(r, 0)));
    await user.click(screen.getByText("Outside"));
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.click(trigger());
    expect(listbox()).toBeInTheDocument();
    await user.click(trigger());
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("keeps a selected-item click on the already selected value without onChange", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<Langs defaultValue="zh" onChange={onChange} />);
    await user.click(trigger());
    await user.click(option("Chinese"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveFocus();
  });
});

describe("Select accessibility", () => {
  it("exposes the select-only combobox pattern", async () => {
    const user = setup();
    render(<Langs required />);
    const t = trigger();
    expect(t.tagName).toBe("BUTTON");
    expect(t).toHaveAttribute("type", "button");
    expect(t).toHaveAttribute("aria-haspopup", "listbox");
    expect(t).toHaveAttribute("aria-required", "true");
    expect(t).not.toHaveAttribute("aria-controls");
    expect(t).toHaveAttribute("data-state", "closed");
    await user.click(t);
    const lb = screen.getByRole("listbox", { name: "Language" });
    expect(t).toHaveAttribute("aria-controls", lb.id);
    expect(t).toHaveAttribute("data-state", "open");
    expect(lb).toHaveAttribute("data-side", "bottom");
    expect(option("Chinese")).toHaveAttribute("aria-selected", "false");
  });

  it("labels groups with their SelectLabel and hides separators", async () => {
    const user = setup();
    render(<Langs />);
    await user.click(trigger());
    const group = screen.getByRole("group", { name: "Experimental" });
    expect(within(group).getByRole("option", { name: "Japanese" })).toBe(
      option("Japanese"),
    );
    expect(screen.getByTestId("sep")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("separator")).toBeNull();
  });

  it("leaves a group without SelectLabel unlabelled", async () => {
    const user = setup();
    render(
      <Select aria-label="Language">
        <SelectGroup>
          <SelectItem value="a">A</SelectItem>
        </SelectGroup>
      </Select>,
    );
    await user.click(trigger());
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-labelledby");
  });

  it("shows the placeholder (data-placeholder) only while the value is empty", async () => {
    const user = setup();
    const { rerender } = render(<Langs value="" onChange={() => {}} />);
    expect(trigger()).toHaveAttribute("data-placeholder");
    expect(trigger()).toHaveTextContent("Pick one");
    rerender(<Langs value="zh" onChange={() => {}} />);
    expect(trigger()).not.toHaveAttribute("data-placeholder");
    expect(trigger()).toHaveTextContent("Chinese");
    rerender(<Langs />);
    expect(trigger()).toHaveAttribute("data-placeholder");
    await user.click(trigger());
    await user.click(option("English"));
    expect(trigger()).not.toHaveAttribute("data-placeholder");
  });

  it("keeps a rejected controlled value", async () => {
    const user = setup();
    const onChange = vi.fn();
    const { container } = render(
      <form>
        <Langs name="lang" value="zh" onChange={onChange} />
      </form>,
    );
    await user.click(trigger());
    await user.click(option("English"));
    expect(onChange).toHaveBeenCalledWith("en");
    expect(trigger()).toHaveTextContent("Chinese");
    expect(nativeSelect(container).value).toBe("zh");
    trigger().focus();
    await user.keyboard("e");
    expect(trigger()).toHaveTextContent("Chinese");
  });

  it("shows the label of options rendered by wrapper components once registered", async () => {
    const user = setup();
    const Option = ({
      value,
      children,
    }: {
      value: string;
      children: ReactNode;
    }) => <SelectItem value={value}>{children}</SelectItem>;
    render(
      <Select aria-label="Language" defaultValue="b">
        <Option value="a">Alpha</Option>
        <Option value="b">Beta</Option>
      </Select>,
    );
    await user.click(trigger());
    expect(option("Beta")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(trigger()).toHaveTextContent("Beta");
  });
});

describe("Select forms", () => {
  it("renders a hidden native select listing every value", () => {
    const { container } = render(<Langs name="lang" required disabled />);
    const native = nativeSelect(container);
    expect(native).toHaveAttribute("aria-hidden", "true");
    expect(native.tabIndex).toBe(-1);
    expect(native).toBeRequired();
    expect(native).toBeDisabled();
    expect(Array.from(native.options, (o) => o.value)).toEqual([
      "",
      "zh",
      "en",
      "ja",
    ]);
  });

  it("submits the value picked in the listbox through FormData", async () => {
    const user = setup();
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("lang");
    });
    render(
      <form onSubmit={onSubmit}>
        <Langs name="lang" />
        <button type="submit">Send</button>
      </form>,
    );
    await user.click(trigger());
    await user.click(option("English"));
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(onSubmit).toHaveReturnedWith("en");
  });

  it("validates required through the native select", async () => {
    const user = setup();
    const { container } = render(
      <form>
        <Langs name="lang" required />
      </form>,
    );
    const form = container.querySelector("form")!;
    const native = nativeSelect(container);
    expect(native.validity.valueMissing).toBe(true);
    expect(form.checkValidity()).toBe(false);
    await user.click(trigger());
    await user.click(option("Chinese"));
    expect(native.validity.valueMissing).toBe(false);
    expect(form.checkValidity()).toBe(true);
  });

  it("restores defaultValue on form reset without onChange", async () => {
    const user = setup();
    const onChange = vi.fn();
    const { container } = render(
      <form>
        <Langs name="lang" defaultValue="zh" onChange={onChange} />
        <button type="reset">Reset</button>
      </form>,
    );
    const form = container.querySelector("form")!;
    await user.click(trigger());
    await user.click(option("English"));
    expect(new FormData(form).get("lang")).toBe("en");
    onChange.mockClear();
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(trigger()).toHaveTextContent("Chinese");
    expect(new FormData(form).get("lang")).toBe("zh");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("resets to the placeholder without a defaultValue", async () => {
    const user = setup();
    const { container } = render(
      <form>
        <Langs name="lang" />
      </form>,
    );
    const form = container.querySelector("form")!;
    await user.click(trigger());
    await user.click(option("English"));
    act(() => form.reset());
    expect(trigger()).toHaveAttribute("data-placeholder");
    expect(new FormData(form).get("lang")).toBe("");
  });

  it("forwards focus from the native select to the trigger", () => {
    const { container } = render(<Langs name="lang" />);
    act(() => nativeSelect(container).focus());
    expect(trigger()).toHaveFocus();
  });

  it("integrates with a real FormControl (label, helper text, required)", async () => {
    const user = setup();
    const { container } = render(
      <form>
        <FormControl required>
          <FormLabel>Genre</FormLabel>
          <Select placeholder="Pick" name="genre">
            <SelectItem value="a">Fantasy</SelectItem>
          </Select>
          <FormHelperText>Shown on the book page</FormHelperText>
        </FormControl>
      </form>,
    );
    const t = screen.getByRole("combobox", { name: /Genre/ });
    expect(t).toHaveAttribute("aria-required", "true");
    expect(t).toHaveAccessibleDescription("Shown on the book page");
    expect(nativeSelect(container)).toBeRequired();
    await user.click(t);
    expect(screen.getByRole("listbox", { name: /Genre/ })).toBeInTheDocument();
  });
});

describe("Select layering", () => {
  it("inside a Modal, Escape closes only the listbox", async () => {
    const user = setup();
    const onModal = vi.fn();
    render(
      <Modal open onOpenChange={onModal} title="Settings">
        <ModalBody>
          <Langs />
        </ModalBody>
      </Modal>,
    );
    await user.click(trigger());
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(onModal).not.toHaveBeenCalled();
    expect(trigger()).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(onModal).toHaveBeenCalledWith(false);
  });

  it("portals the listbox into a nested ConfigProvider's themed container", async () => {
    const user = setup();
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark">
          <Langs />
        </ConfigProvider>
      </ConfigProvider>,
    );
    await user.click(trigger());
    const host = document.querySelector("[data-minerva-portal-host]");
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host).toContainElement(listbox());
  });
});

describe("Select SSR", () => {
  it("server-renders the selected label, the native select and no listbox", () => {
    const html = renderToStaticMarkup(
      <Langs name="lang" defaultValue="en" defaultOpen />,
    );
    expect(html).toMatch(/<span class="value"><span>English<\/span>/);
    expect(html).not.toContain("data-placeholder");
    expect(html).not.toContain('role="listbox"');
    expect(html).toMatch(/<option value="en" selected="">English<\/option>/);
  });

  it("server-renders the label of an option nested in a group", () => {
    const html = renderToStaticMarkup(<Langs defaultValue="ja" />);
    expect(html).toMatch(/<span class="value"><span>Japanese<\/span>/);
  });
});

describe("Select native attributes", () => {
  it("forwards style, data-* and aria-labelledby to the trigger and names the listbox", async () => {
    const user = userEvent.setup();
    render(
      <>
        <span id="fruit-label">Fruit</span>
        <Select
          aria-labelledby="fruit-label"
          style={{ minWidth: "10rem" }}
          data-testid="fruit"
        >
          <SelectItem value="apple">Apple</SelectItem>
        </Select>
      </>,
    );
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveAttribute("data-testid", "fruit");
    expect(trigger).toHaveAttribute("data-component", "select");
    expect(trigger.style.minWidth).toBe("10rem");
    await user.click(trigger);
    expect(screen.getByRole("listbox", { name: "Fruit" })).toBeInTheDocument();
  });
});
