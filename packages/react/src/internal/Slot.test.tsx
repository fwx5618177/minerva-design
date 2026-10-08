import {
  createRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { mergeProps, Slot, Slottable } from "./Slot";

describe("mergeProps", () => {
  it("lets the child win for plain props and keeps slot-only props", () => {
    expect(
      mergeProps({ id: "slot", title: "t" }, { id: "child", role: "tab" }),
    ).toEqual({ id: "child", title: "t", role: "tab" });
  });

  it("concatenates className slot first and drops empty values", () => {
    expect(mergeProps({ className: "a" }, { className: "b" }).className).toBe(
      "a b",
    );
    expect(mergeProps({ className: "a" }, {}).className).toBe("a");
    expect(mergeProps({}, { className: "b" }).className).toBe("b");
    expect(
      mergeProps({ className: undefined }, { className: "" }).className,
    ).toBeUndefined();
  });

  it("shallow-merges style with the child winning", () => {
    expect(
      mergeProps(
        { style: { color: "red", margin: 1 } },
        { style: { color: "blue" } },
      ).style,
    ).toEqual({ color: "blue", margin: 1 });
  });

  it("keeps the slot handler when the child handler is undefined", () => {
    const onClick = vi.fn();
    expect(mergeProps({ onClick }, { onClick: undefined }).onClick).toBe(
      onClick,
    );
  });

  it("does not compose non-handler functions", () => {
    const slotFn = () => "slot";
    const childFn = () => "child";
    expect(mergeProps({ render: slotFn }, { render: childFn }).render).toBe(
      childFn,
    );
  });
});

describe("Slot", () => {
  it("renders the child element with the slot props and no wrapper", () => {
    const { container } = render(
      <Slot id="s" aria-label="Save" data-testid="target">
        <button type="button">Go</button>
      </Slot>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(container.firstChild).toBe(button);
    expect(button).toHaveAttribute("id", "s");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent("Go");
  });

  it("lets child props override slot props", () => {
    render(
      <Slot id="slot" title="from-slot">
        <span id="child">x</span>
      </Slot>,
    );
    const span = screen.getByText("x");
    expect(span).toHaveAttribute("id", "child");
    expect(span).toHaveAttribute("title", "from-slot");
  });

  it("merges className and style onto the child", () => {
    render(
      <Slot className="slot" style={{ color: "red", padding: "4px" }}>
        <span className="child" style={{ color: "blue" }}>
          x
        </span>
      </Slot>,
    );
    const span = screen.getByText("x");
    expect(span.className).toBe("slot child");
    expect(span.style.color).toBe("blue");
    expect(span.style.padding).toBe("4px");
  });

  it("runs the child handler before the slot handler", async () => {
    const user = userEvent.setup();
    const order: string[] = [];
    render(
      <Slot onClick={() => order.push("slot")}>
        <button type="button" onClick={() => order.push("child")}>
          Go
        </button>
      </Slot>,
    );
    await user.click(screen.getByRole("button"));
    expect(order).toEqual(["child", "slot"]);
  });

  it("still runs the slot handler after the child prevents default", async () => {
    const user = userEvent.setup();
    const seen: boolean[] = [];
    render(
      <Slot onClick={(event: MouseEvent) => seen.push(event.defaultPrevented)}>
        <button
          type="button"
          onClick={(event: MouseEvent) => event.preventDefault()}
        >
          Go
        </button>
      </Slot>,
    );
    await user.click(screen.getByRole("button"));
    expect(seen).toEqual([true]);
  });

  it("uses whichever handler exists when only one side provides it", async () => {
    const user = userEvent.setup();
    const slotFocus = vi.fn();
    const childBlur = vi.fn();
    render(
      <Slot onFocus={slotFocus}>
        <button type="button" onBlur={childBlur}>
          Go
        </button>
      </Slot>,
    );
    await user.tab();
    expect(slotFocus).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(childBlur).toHaveBeenCalledTimes(1);
  });

  it("gives the node to both the slot ref and the child's object ref", () => {
    const slotRef = createRef<HTMLElement>();
    const childRef = createRef<HTMLButtonElement>();
    const { unmount } = render(
      <Slot ref={slotRef}>
        <button type="button" ref={childRef}>
          Go
        </button>
      </Slot>,
    );
    const button = screen.getByRole("button");
    expect(slotRef.current).toBe(button);
    expect(childRef.current).toBe(button);
    unmount();
    expect(slotRef.current).toBeNull();
    expect(childRef.current).toBeNull();
  });

  it("supports callback refs and React 19 cleanup refs on both sides", () => {
    const slotCleanup = vi.fn();
    const slotRef = vi.fn(() => slotCleanup);
    const childRef = vi.fn();
    const { unmount } = render(
      <Slot ref={slotRef}>
        <button type="button" ref={childRef}>
          Go
        </button>
      </Slot>,
    );
    const button = screen.getByRole("button");
    expect(slotRef).toHaveBeenCalledWith(button);
    expect(childRef).toHaveBeenCalledWith(button);
    unmount();
    expect(slotCleanup).toHaveBeenCalledTimes(1);
    expect(slotRef).toHaveBeenCalledTimes(1);
    expect(childRef).toHaveBeenLastCalledWith(null);
  });

  it("keeps a stable merged ref across re-renders", async () => {
    const user = userEvent.setup();
    const slotRef = vi.fn();
    const Counter = () => {
      const [count, setCount] = useState(0);
      return (
        <Slot ref={slotRef} onClick={() => setCount((c) => c + 1)}>
          <button type="button">{count}</button>
        </Slot>
      );
    };
    render(<Counter />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("2");
    expect(slotRef).toHaveBeenCalledTimes(1);
  });

  it("passes only the child's ref through when the slot has none", () => {
    const childRef = createRef<HTMLSpanElement>();
    render(
      <Slot>
        <span ref={childRef}>x</span>
      </Slot>,
    );
    expect(childRef.current).toBe(screen.getByText("x"));
  });

  it("renders an anchor with asChild-style composition and keeps navigation semantics", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    const Button = ({
      asChild,
      children,
      ...props
    }: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
      const Comp = asChild ? Slot : "button";
      return (
        <Comp className="btn" {...props}>
          {children}
        </Comp>
      );
    };
    render(
      <Button asChild onClick={onClick}>
        <a href="/docs">Docs</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("btn");
    expect(screen.queryByRole("button")).toBeNull();
    link.focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("preserves keyboard focus order and key handlers of the child", async () => {
    const user = userEvent.setup();
    const slotKeyDown = vi.fn();
    const childKeyDown = vi.fn();
    render(
      <>
        <button type="button">Before</button>
        <Slot onKeyDown={slotKeyDown} aria-label="Custom">
          <div role="button" tabIndex={0} onKeyDown={childKeyDown} />
        </Slot>
      </>,
    );
    await user.tab();
    await user.tab();
    const custom = screen.getByRole("button", { name: "Custom" });
    expect(custom).toHaveFocus();
    expect(custom).toHaveAttribute("tabindex", "0");
    await user.keyboard(" ");
    expect(childKeyDown).toHaveBeenCalledTimes(1);
    expect(slotKeyDown).toHaveBeenCalledTimes(1);
  });

  it("composes nested Slots outer-to-inner onto the final element", async () => {
    const user = userEvent.setup();
    const order: string[] = [];
    const outerRef = createRef<HTMLElement>();
    const innerRef = createRef<HTMLElement>();
    render(
      <Slot
        ref={outerRef}
        className="outer"
        data-outer=""
        onClick={() => order.push("outer")}
      >
        <Slot
          ref={innerRef}
          className="inner"
          onClick={() => order.push("inner")}
        >
          <button
            type="button"
            className="leaf"
            onClick={() => order.push("leaf")}
          >
            Go
          </button>
        </Slot>
      </Slot>,
    );
    const button = screen.getByRole("button");
    expect(button.className).toBe("outer inner leaf");
    expect(button).toHaveAttribute("data-outer");
    expect(outerRef.current).toBe(button);
    expect(innerRef.current).toBe(button);
    await user.click(button);
    expect(order).toEqual(["leaf", "inner", "outer"]);
  });

  it("does not attach the ref to a Fragment child", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Slot ref={ref}>
        <>
          <span>frag</span>
        </>
      </Slot>,
    );
    expect(screen.getByText("frag")).toBeInTheDocument();
    expect(ref.current).toBeNull();
  });

  it("renders nothing for non-element or missing children", () => {
    const { container, rerender } = render(<Slot>plain text</Slot>);
    expect(container).toBeEmptyDOMElement();
    rerender(<Slot />);
    expect(container).toBeEmptyDOMElement();
    rerender(<Slot>{null}</Slot>);
    expect(container).toBeEmptyDOMElement();
  });

  it("throws when given more than one child", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Slot>
          <span>a</span>
          <span>b</span>
        </Slot>,
      ),
    ).toThrow();
    spy.mockRestore();
  });
});

describe("Slottable", () => {
  const Link = ({
    asChild,
    children,
    ref,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    ref?: Ref<HTMLAnchorElement>;
  }) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp ref={ref} className="link" {...props}>
        <span data-testid="before">[</span>
        <Slottable>{children}</Slottable>
        <span data-testid="after">]</span>
      </Comp>
    );
  };

  it("slots onto the Slottable's child and places siblings inside it", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link asChild ref={ref} title="t">
        <a href="/x" className="router">
          Label
        </a>
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/x");
    expect(link).toHaveAttribute("title", "t");
    expect(link.className).toBe("link router");
    expect(ref.current).toBe(link);
    expect(link.querySelectorAll("a")).toHaveLength(0);
    expect(Array.from(link.childNodes).map((n) => n.textContent)).toEqual([
      "[",
      "Label",
      "]",
    ]);
  });

  it("renders Slottable children in place when not slotting", () => {
    render(<Link href="/y">Label</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("[Label]");
  });

  it("keeps the target element's own nested children", () => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <Slot data-slot="">
        <Slottable>{children}</Slottable>
        <em>tail</em>
      </Slot>
    );
    render(
      <Wrapper>
        <p>
          <strong>head</strong>
        </p>
      </Wrapper>,
    );
    const p = screen.getByText("head").parentElement as HTMLElement;
    expect(p.tagName).toBe("P");
    expect(p).toHaveAttribute("data-slot");
    expect(p.querySelector("em")).toHaveTextContent("tail");
  });

  it("renders nothing when the Slottable child is not an element", () => {
    const { container } = render(
      <Slot>
        <Slottable>text</Slottable>
        <span>sibling</span>
      </Slot>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("throws when the Slottable has more than one child", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Slot>
          <Slottable>
            <span>a</span>
            <span>b</span>
          </Slottable>
        </Slot>,
      ),
    ).toThrow();
    spy.mockRestore();
  });
});
