import {
  act,
  createRef,
  type ComponentProps,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { compile } from "sass";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "vitest";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import List from "./List";
import ListItem from "./ListItem";
import type { ListItemProps, ListProps } from "./types";
import styles from "./list.module.scss";

let container: HTMLDivElement;
let style: HTMLStyleElement | undefined;
let css: string | undefined;

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
});
afterEach(() => {
  container.remove();
  style?.remove();
  style = undefined;
});

/** Mounts the component styles (module + scale tokens) like a consumer app */
function mountStyled(children: ReactNode) {
  css ??= [
    readFileSync(
      join(import.meta.dirname, "../../../../core/src/theme/tokens.css"),
      "utf8",
    ),
    compile(join(import.meta.dirname, "list.module.scss")).css,
  ]
    .join("\n")
    // CSS modules syntax; happy-dom does not understand :global()
    .replace(/:global\(([^)]*)\)/g, "$1");
  style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  return render(<>{children}</>, { container });
}

describe("List public contract", () => {
  it("exports List, ListItem and native typed props with required primary", () => {
    expectTypeOf<ComponentProps<typeof List>>().toMatchTypeOf<ListProps>();
    expectTypeOf<
      ComponentProps<typeof ListItem>
    >().toMatchTypeOf<ListItemProps>();
    expectTypeOf<ListProps["density"]>().toEqualTypeOf<
      "default" | "compact" | "comfortable" | undefined
    >();
    expectTypeOf<ListItemProps["primary"]>().toEqualTypeOf<ReactNode>();
    expectTypeOf<ListItemProps["value"]>().toEqualTypeOf<
      LiHTMLAttributes<HTMLLIElement>["value"]
    >();
    // @ts-expect-error ListItem requires a primary slot.
    const missingPrimary: ListItemProps = {};
    void missingPrimary;
  });

  it("server-renders an accessible ul with direct native li children and named slots", () => {
    container.innerHTML = renderToStaticMarkup(
      <List aria-label="Recent changes">
        <ListItem
          primary={<strong>Record title</strong>}
          secondary={<code>Metadata</code>}
          icon={<svg aria-label="Decorative marker" />}
          actions={<button type="button">Edit</button>}
        />
        <ListItem primary="Second record" />
      </List>,
    );
    const list = container.querySelector("ul")!;
    expect(list.getAttribute("role")).toBe("list");
    expect(list.getAttribute("aria-label")).toBe("Recent changes");
    expect(Array.from(list.children, (child) => child.tagName)).toEqual([
      "LI",
      "LI",
    ]);
    expect(list.querySelector(`.${styles.primary} strong`)?.textContent).toBe(
      "Record title",
    );
    expect(list.querySelector(`.${styles.secondary} code`)?.textContent).toBe(
      "Metadata",
    );
    expect(
      list.querySelector(`.${styles.icon}`)?.getAttribute("aria-hidden"),
    ).toBe("true");
    expect(list.querySelector(`.${styles.actions} button`)?.textContent).toBe(
      "Edit",
    );
    expect(list.querySelector("li")?.getAttribute("role")).toBeNull();
    expect(list.querySelector("li")?.hasAttribute("tabindex")).toBe(false);
    expect(list.querySelector("[aria-selected], [aria-pressed]")).toBeNull();
  });

  it("renders zero in both text slots, omits absent slots, and escapes strings", () => {
    const unsafe = "<img src=x onerror=alert(1)>";
    container.innerHTML = renderToStaticMarkup(
      <List>
        <ListItem primary={0} secondary={0} />
        <ListItem primary={unsafe} secondary={unsafe} />
        <ListItem primary="Plain" />
      </List>,
    );
    const rows = container.querySelectorAll("li");
    expect(rows[0]?.querySelector(`.${styles.primary}`)?.textContent).toBe("0");
    expect(rows[0]?.querySelector(`.${styles.secondary}`)?.textContent).toBe(
      "0",
    );
    expect(rows[1]?.querySelector(`.${styles.primary}`)?.textContent).toBe(
      unsafe,
    );
    expect(rows[1]?.querySelector(`.${styles.secondary}`)?.textContent).toBe(
      unsafe,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(rows[2]?.querySelector(`.${styles.secondary}`)).toBeNull();
    expect(
      container.querySelector(`.${styles.icon}, .${styles.actions}`),
    ).toBeNull();
  });

  it("forwards native attributes, class names, styles, events and DOM refs", () => {
    const listRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const listClick = vi.fn();
    const itemClick = vi.fn();
    const { unmount } = render(
      <List
        ref={listRef}
        id="records"
        className="consumer-list"
        title="Records"
        style={{ maxWidth: 320 }}
        onClick={listClick}
        data-source="consumer"
      >
        <ListItem
          ref={itemRef}
          primary="Record"
          value={7}
          className="consumer-item"
          aria-label="Named record"
          style={{ marginTop: 2 }}
          onClick={itemClick}
        />
      </List>,
      { container },
    );
    const list = container.querySelector("ul")!;
    const item = list.querySelector("li")!;
    expect(listRef.current).toBe(list);
    expect(itemRef.current).toBe(item);
    expect(list.id).toBe("records");
    expect(list.title).toBe("Records");
    expect(list.dataset.source).toBe("consumer");
    expect(list).toHaveClass("consumer-list", styles.list);
    expect(list.style.maxWidth).toBe("320px");
    expect(item.value).toBe(7);
    expect(item).toHaveClass("consumer-item", styles.item);
    expect(item.getAttribute("aria-label")).toBe("Named record");
    expect(item.style.marginTop).toBe("2px");
    act(() => item.click());
    expect(itemClick).toHaveBeenCalledOnce();
    expect(listClick).toHaveBeenCalledOnce();
    unmount();
    expect(listRef.current).toBeNull();
    expect(itemRef.current).toBeNull();
  });

  it("does not reserve slots for conditional false, boolean or empty-string content", () => {
    container.innerHTML = renderToStaticMarkup(
      <List>
        <ListItem
          primary="One"
          secondary={false}
          icon={false}
          actions={false}
        />
        <ListItem primary="Two" secondary={true} icon="" actions="" />
      </List>,
    );
    expect(
      container.querySelector(
        `.${styles.secondary}, .${styles.icon}, .${styles.actions}`,
      ),
    ).toBeNull();
  });

  it("leaves commands and disabled behavior with supplied buttons", () => {
    const edit = vi.fn();
    const remove = vi.fn();
    render(
      <List>
        <ListItem
          primary="Record"
          actions={
            <>
              <button type="button" onClick={edit}>
                Edit
              </button>
              <button type="button" disabled onClick={remove}>
                Delete
              </button>
            </>
          }
        />
      </List>,
      { container },
    );
    act(() => container.querySelector("li")!.click());
    expect(edit).not.toHaveBeenCalled();
    const buttons = container.querySelectorAll("button");
    act(() => {
      buttons[0]!.click();
      buttons[1]!.click();
    });
    expect(edit).toHaveBeenCalledOnce();
    expect(remove).not.toHaveBeenCalled();
    expect(buttons[1]?.disabled).toBe(true);
  });

  it("preserves caller-owned action names and descriptions pointing into primary content", () => {
    render(
      <List aria-label="Registered devices">
        {["first", "second"].map((id) => (
          <ListItem
            key={id}
            primary={<span id={`device-${id}`}>{id}</span>}
            actions={
              <IconButton
                aria-label="Delete device"
                showTooltip={false}
                aria-describedby={`device-${id}`}
              >
                <svg aria-hidden="true" />
              </IconButton>
            }
          />
        ))}
      </List>,
      { container },
    );
    expect(container.querySelector("ul")?.getAttribute("aria-label")).toBe(
      "Registered devices",
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
    for (const [index, id] of ["first", "second"].entries()) {
      const button = buttons[index]!;
      expect(button.getAttribute("aria-label")).toBe("Delete device");
      expect(button.getAttribute("aria-describedby")).toBe(`device-${id}`);
      const description = document.getElementById(
        button.getAttribute("aria-describedby")!,
      );
      expect(description?.textContent).toBe(id);
      expect(description?.closest(`.${styles.content}`)).not.toBeNull();
    }
  });

  it("defaults to regular density and dividers and consumes explicit overrides", () => {
    container.innerHTML = renderToStaticMarkup(
      <List>
        <ListItem primary="One" />
      </List>,
    );
    expect(container.querySelector("ul")).toHaveClass(styles.dividers);
    expect(container.querySelector("ul")).not.toHaveClass(styles.compact);
    container.innerHTML = renderToStaticMarkup(
      <List density="compact" dividers={false} role="presentation">
        <ListItem primary="One" />
      </List>,
    );
    const list = container.querySelector("ul")!;
    expect(list).toHaveClass(styles.compact);
    expect(list).not.toHaveClass(styles.dividers);
    expect(list.getAttribute("role")).toBe("presentation");
    expect(list.hasAttribute("density")).toBe(false);
    expect(list.hasAttribute("dividers")).toBe(false);
  });

  it("applies the comfortable density and the bordered card", () => {
    container.innerHTML = renderToStaticMarkup(
      <List>
        <ListItem primary="One" />
      </List>,
    );
    expect(container.querySelector("ul")).not.toHaveClass(
      styles.bordered,
      styles.comfortable,
    );
    container.innerHTML = renderToStaticMarkup(
      <List density="comfortable" bordered>
        <ListItem primary="One" />
      </List>,
    );
    const list = container.querySelector("ul")!;
    expect(list).toHaveClass(styles.comfortable, styles.bordered);
    expect(list).not.toHaveClass(styles.compact);
    expect(list.hasAttribute("bordered")).toBe(false);
  });
});

// The row defaults derive from the density tokens through calc(), which
// happy-dom returns unresolved: evaluate the simple sums / products it reports.
const toPx = (value: string): number =>
  value
    .replace(/^calc\((.*)\)$/, "$1")
    .split(" + ")
    .reduce(
      (sum, term) =>
        sum +
        term.split(" * ").reduce((product, factor) => {
          const n = parseFloat(factor);
          return product * (factor.endsWith("rem") ? n * 16 : n);
        }, 1),
      0,
    );

describe("List distributed styles", () => {
  it("resets list markers and uses the existing operational typography tokens", () => {
    mountStyled(
      <List>
        <ListItem primary="Title" secondary="Metadata" />
      </List>,
    );
    const list = getComputedStyle(container.querySelector("ul")!);
    const primary = getComputedStyle(
      container.querySelector(`.${styles.primary}`)!,
    );
    const secondary = getComputedStyle(
      container.querySelector(`.${styles.secondary}`)!,
    );
    expect(list.listStyle).toBe("none");
    expect(list.margin).toBe("0px");
    expect(list.padding).toBe("0px");
    expect(primary.fontSize).toMatch(/^(14px|0\.875rem)$/);
    expect(primary.fontWeight).toBe("500");
    expect(primary.lineHeight).toBe("1.5");
    expect(secondary.fontSize).toMatch(/^(13px|0\.8125rem)$/);
    expect(secondary.lineHeight).toBe("1.5");
    // happy-dom cannot resolve color-mix(): assert the muted token instead
    expect(css).toMatch(
      /\.secondary\s*\{[^}]*color:\s*var\(--text-muted-color\)/,
    );
    expect(css).toMatch(/\.primary\s*\{[^}]*color:\s*var\(--text-color\)/);
  });

  it("reduces vertical spacing in compact lists and only divides sibling rows", () => {
    mountStyled(
      <>
        <List id="default">
          <ListItem primary="One" />
          <ListItem primary="Two" />
        </List>
        <List id="compact" density="compact" dividers={false}>
          <ListItem primary="One" />
          <ListItem primary="Two" />
        </List>
      </>,
    );
    const rows = container.querySelectorAll("li");
    expect(toPx(getComputedStyle(rows[0]!).paddingTop)).toBe(12);
    // happy-dom exposes logical padding without mapping it onto paddingTop.
    expect(
      toPx(getComputedStyle(rows[2]!).getPropertyValue("padding-block")),
    ).toBe(8);
    // the divider is a separator pseudo-element (no one-sided border),
    // shown through --_list-divider on the rows after the first
    const divider = (row: Element) =>
      getComputedStyle(row).getPropertyValue("--_list-divider").trim();
    expect(divider(rows[0]!)).toBe("0");
    expect(divider(rows[1]!)).toBe("1");
    expect(divider(rows[3]!)).toBe("0");
    expect(getComputedStyle(rows[1]!).borderTopWidth).not.toBe("1px");
  });

  it("gives each density a stable minimum row height without limiting content growth", () => {
    mountStyled(
      <>
        <List>
          <ListItem primary="One" />
        </List>
        <List density="compact">
          <ListItem primary="Two" />
        </List>
      </>,
    );
    const rows = container.querySelectorAll("li");
    expect(toPx(getComputedStyle(rows[0]!).minHeight)).toBe(56);
    expect(toPx(getComputedStyle(rows[1]!).minHeight)).toBe(40);
    for (const row of rows) {
      expect(getComputedStyle(row).height).toMatch(/^(auto)?$/);
      expect(getComputedStyle(row).maxHeight).toMatch(/^(none)?$/);
    }
  });

  it("wraps long shared Button labels inside trailing actions without ellipsis", () => {
    const label = "Delete this registered device and its stored credentials";
    mountStyled(
      <List style={{ width: 320 }}>
        <ListItem
          primary="Device"
          actions={
            <Button color="neutral" variant="outline">
              {label}
            </Button>
          }
        />
      </List>,
    );
    const button = container.querySelector(`.${styles.actions} button`)!;
    expect(button.textContent).toBe(label);
    const buttonStyle = getComputedStyle(button);
    expect(buttonStyle.whiteSpace).toBe("normal");
    expect(buttonStyle.overflowWrap).toBe("anywhere");
    expect(buttonStyle.minWidth).toBe("0");
    // Button reads this variable for its own label white-space
    expect(css).toMatch(
      /\.actions\s*\{[^}]*--button-label-white-space:\s*normal/,
    );
  });

  it("allows long metadata to wrap and reserves bounded trailing action space", () => {
    mountStyled(
      <List style={{ width: 320 }}>
        <ListItem
          primary={"record".repeat(50)}
          secondary={"metadata".repeat(100)}
          icon={<svg />}
          actions={
            <>
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </>
          }
        />
      </List>,
    );
    const row = getComputedStyle(container.querySelector("li")!);
    expect(row.display).toBe("flex");
    expect(row.minWidth).toBe("0");
    for (const selector of [
      `.${styles.content}`,
      `.${styles.primary}`,
      `.${styles.secondary}`,
    ]) {
      const text = getComputedStyle(container.querySelector(selector)!);
      expect(text.minWidth).toBe("0");
      expect(text.overflowWrap).toBe("anywhere");
    }
    const actions = getComputedStyle(
      container.querySelector(`.${styles.actions}`)!,
    );
    expect(actions.flexShrink).toBe("0");
    expect(actions.flexWrap).toBe("wrap");
    expect(actions.maxWidth).toBe("50%");
    expect(actions.justifyContent).toBe("flex-end");
    expect(actions.overflow).not.toBe("hidden");
    const button = getComputedStyle(container.querySelector("button")!);
    expect(button.maxWidth).toBe("100%");
    expect(button.whiteSpace).toBe("normal");
    expect(button.overflowWrap).toBe("anywhere");
  });
});
