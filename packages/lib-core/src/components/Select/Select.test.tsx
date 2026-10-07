import React, { createRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen } from "@testing-library/react";
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
    <Select ariaLabel="Language" placeholder="Pick one" {...props}>
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
      <Select ref={ref} ariaLabel="Language">
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
      <Select ariaLabel="Event" placeholder="Pick">
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
        <Select ariaLabel="Language" disabled={false}>
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
        <Select placeholder="Pick" ariaDescribedBy="extra">
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
