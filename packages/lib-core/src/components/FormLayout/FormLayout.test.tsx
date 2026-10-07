import { act, createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { compile } from "sass";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FormLayout } from ".";
import { FormField } from "../FormControl";
import { GridItem } from "../ResponsiveGrid";
import { Input } from "../Input";

const grid = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(".ui-responsive-grid")!;

describe("FormLayout", () => {
  it("forwards native form props and ref while consuming grid props", () => {
    const ref = createRef<HTMLFormElement>();
    const { container, unmount } = render(
      <FormLayout
        ref={ref}
        id="metadata"
        name="metadata"
        action="/save"
        method="post"
        encType="multipart/form-data"
        target="result"
        autoComplete="off"
        noValidate
        aria-label="Metadata"
        data-owner="editor"
        className="consumer"
        style={{ maxWidth: 720 }}
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap={3}
        rowGap={2}
        columnGap="20px"
      >
        <input name="title" />
      </FormLayout>,
    );
    const form = ref.current!;
    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(form).toBe(container.querySelector("form"));
    expect(form).toHaveClass("root", "ui-form-layout", "consumer");
    expect(form.id).toBe("metadata");
    expect(form.getAttribute("name")).toBe("metadata");
    expect(form.getAttribute("action")).toBe("/save");
    expect(form.method).toBe("post");
    expect(form.enctype).toBe("multipart/form-data");
    expect(form.target).toBe("result");
    expect(form.getAttribute("autocomplete")).toBe("off");
    expect(form.noValidate).toBe(true);
    expect(form.getAttribute("aria-label")).toBe("Metadata");
    expect(form.dataset.owner).toBe("editor");
    expect(form.style.maxWidth).toBe("720px");
    const layout = form.querySelector<HTMLElement>(".ui-responsive-grid")!;
    expect(
      ["base", "sm", "md", "lg"].map((key) =>
        layout.style.getPropertyValue(`--ui-grid-${key}`),
      ),
    ).toEqual(["1", "2", "2", "3"]);
    expect(layout.style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-2)",
    );
    expect(layout.style.getPropertyValue("--ui-grid-column-gap")).toBe("20px");
    expect(form.querySelector("input")?.form).toBe(form);
    expect(
      container.querySelector("[columns], [gap], [rowgap], [columngap]"),
    ).toBeNull();
    unmount();
    expect(ref.current).toBeNull();
  });

  it("passes numeric columns and gap through to ResponsiveGrid", () => {
    const { container } = render(<FormLayout columns={2} gap={5} />);
    const el = grid(container);
    expect(el.style.getPropertyValue("--ui-grid-base")).toBe("2");
    expect(el.style.getPropertyValue("--ui-grid-lg")).toBe("2");
    expect(el.style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-5)",
    );
    expect(el.style.getPropertyValue("--ui-grid-column-gap")).toBe(
      "var(--space-5)",
    );
  });

  // from novel LayoutSpacing.test (FormLayout rows)
  it.each([0.5, "0.5"])("maps %j to the half-step spacing token", (gap) => {
    const { container } = render(<FormLayout gap={gap} />);
    for (const property of ["--ui-grid-row-gap", "--ui-grid-column-gap"]) {
      expect(grid(container).style.getPropertyValue(property)).toBe(
        "var(--space-0-5)",
      );
    }
  });

  it("defaults to one column and spacing token 4", () => {
    const { container } = render(<FormLayout />);
    expect(grid(container).style.getPropertyValue("--ui-grid-base")).toBe("1");
    expect(grid(container).style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-4)",
    );
    expect(grid(container).style.getPropertyValue("--ui-grid-column-gap")).toBe(
      "var(--space-4)",
    );
  });

  it("preserves independent grid row and column gaps", () => {
    const { container, rerender } = render(
      <FormLayout gap={4} rowGap={0.5} columnGap="0.5" />,
    );
    const el = grid(container);
    expect(el.style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-0-5)",
    );
    expect(el.style.getPropertyValue("--ui-grid-column-gap")).toBe(
      "var(--space-0-5)",
    );
    rerender(<FormLayout gap={0.5} rowGap={0} columnGap="calc(1rem + 2px)" />);
    expect(el.style.getPropertyValue("--ui-grid-row-gap")).toBe(
      "var(--space-0)",
    );
    expect(el.style.getPropertyValue("--ui-grid-column-gap")).toBe(
      "calc(1rem + 2px)",
    );
  });

  it("leaves submit cancellation to the consumer, including when no handler is supplied", () => {
    const received: boolean[] = [];
    const { container, rerender } = render(
      <FormLayout
        onSubmit={(event) => received.push(event.defaultPrevented)}
      />,
    );
    let event = new Event("submit", { bubbles: true, cancelable: true });
    act(() => {
      expect(container.querySelector("form")!.dispatchEvent(event)).toBe(true);
    });
    expect(received).toEqual([false]);
    expect(event.defaultPrevented).toBe(false);
    rerender(<FormLayout />);
    event = new Event("submit", { bubbles: true, cancelable: true });
    act(() => {
      expect(container.querySelector("form")!.dispatchEvent(event)).toBe(true);
    });
    expect(event.defaultPrevented).toBe(false);
  });

  it("supports requestSubmit and external submit buttons with native FormData", () => {
    const ref = createRef<HTMLFormElement>();
    const submissions: {
      form: HTMLFormElement;
      submitter: HTMLElement | null;
      entries: [string, FormDataEntryValue][];
    }[] = [];
    const { container } = render(
      <>
        <FormLayout
          ref={ref}
          id="editor"
          noValidate
          onSubmit={(event) => {
            expect(event.defaultPrevented).toBe(false);
            submissions.push({
              form: event.currentTarget,
              submitter: (event.nativeEvent as SubmitEvent).submitter,
              entries: Array.from(new FormData(event.currentTarget).entries()),
            });
            event.preventDefault();
          }}
        >
          <Input name="title" defaultValue="Draft" />
          <input name="tag" defaultValue="one" />
          <input name="tag" defaultValue="two" />
          <input name="ignored" defaultValue="hidden" disabled />
          <input name="required" required />
        </FormLayout>
        <input name="external" defaultValue="linked" form="editor" />
        <button type="submit" form="editor">
          Save
        </button>
      </>,
    );
    const form = ref.current!;
    const button = container.querySelector("button")!;
    expect(button.form).toBe(form);
    act(() => form.requestSubmit(button));
    act(() => button.click());
    expect(submissions).toHaveLength(2);
    for (const submission of submissions) {
      expect(submission.form).toBe(form);
      expect(submission.submitter).toBe(button);
      expect(submission.entries).toEqual([
        ["title", "Draft"],
        ["tag", "one"],
        ["tag", "two"],
        ["required", ""],
        ["external", "linked"],
      ]);
    }
  });

  it("retains native validation when noValidate is omitted", () => {
    let submissions = 0;
    let invalid = 0;
    const { container } = render(
      <FormLayout
        onInvalid={() => {
          invalid += 1;
        }}
        onSubmit={(event) => {
          submissions += 1;
          event.preventDefault();
        }}
      >
        <input required />
        <button type="submit">Save</button>
      </FormLayout>,
    );
    act(() => container.querySelector("button")!.click());
    expect(submissions).toBe(0);
    expect(invalid).toBe(1);
  });

  it("allows native reset and lets the consumer cancel it", () => {
    const resets: HTMLFormElement[] = [];
    let cancel = false;
    const { container } = render(
      <>
        <FormLayout
          id="resettable"
          onReset={(event) => {
            expect(event.defaultPrevented).toBe(false);
            resets.push(event.currentTarget);
            if (cancel) event.preventDefault();
          }}
        >
          <Input name="title" defaultValue="Draft" />
        </FormLayout>
        <button type="reset" form="resettable">
          Reset
        </button>
      </>,
    );
    const form = container.querySelector("form")!;
    const input = container.querySelector("input")!;
    input.value = "Edited";
    act(() => container.querySelector("button")!.click());
    expect(input.value).toBe("Draft");
    // Keeping values on a cancelled reset is browser behaviour; assert the
    // cancelable reset event reaches the consumer untouched.
    cancel = true;
    let notCancelled = true;
    act(() => {
      notCancelled = form.dispatchEvent(
        new Event("reset", { bubbles: true, cancelable: true }),
      );
    });
    expect(notCancelled).toBe(false);
    expect(resets).toEqual([form, form]);
  });

  it("slots FormField into a GridItem without a wrapper while preserving labels, refs and handlers", () => {
    const itemRef = createRef<HTMLDivElement>();
    const fieldRef = createRef<HTMLDivElement>();
    const clicks: string[] = [];
    const { unmount } = render(
      <FormLayout>
        <GridItem
          fullWidth
          asChild
          ref={itemRef}
          className="item"
          data-owner="layout"
          aria-label="Title group"
          style={{ padding: 8 }}
          onClick={(event) => {
            clicks.push(`item:${event.defaultPrevented}`);
          }}
        >
          <FormField
            ref={fieldRef}
            label="Title"
            helperText="Public title"
            className="field"
            data-child="preserved"
            style={{ margin: 4 }}
            onClick={(event) => {
              clicks.push("child");
              event.preventDefault();
            }}
          >
            <Input name="title" />
          </FormField>
        </GridItem>
      </FormLayout>,
    );
    const field = fieldRef.current!;
    expect(itemRef.current).toBe(field);
    expect(field.parentElement).toHaveClass("ui-responsive-grid-layout");
    expect(field).toHaveClass(
      "ui-form-control",
      "ui-grid-item-full-width",
      "item",
      "field",
    );
    expect(field.dataset.owner).toBe("layout");
    expect(field.dataset.child).toBe("preserved");
    expect(field.getAttribute("aria-label")).toBe("Title group");
    expect(field.style.padding).toBe("8px");
    expect(field.style.margin).toBe("4px");
    const input = field.querySelector("input")!;
    expect(field.querySelector("label")?.htmlFor).toBe(input.id);
    expect(
      document.getElementById(input.getAttribute("aria-describedby")!)
        ?.textContent,
    ).toBe("Public title");
    fireEvent.click(field);
    expect(clicks).toEqual(["child", "item:true"]);
    unmount();
    expect(itemRef.current).toBeNull();
    expect(fieldRef.current).toBeNull();
  });

  it("ships the form shrink boundary in its stylesheet", () => {
    const css = compile(
      join(import.meta.dirname, "formLayout.module.scss"),
    ).css;
    expect(css).toMatch(/\.root\s*\{[^}]*min-width:\s*0/);
    expect(css).toMatch(/\.root\s*\{[^}]*width:\s*100%/);
  });
});
