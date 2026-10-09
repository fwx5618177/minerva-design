import { Component, computed, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MN_FORM_FIELD, type FormFieldContext } from "../../internal/forms";
import { fireEvent, render, screen, settle, user } from "../../testing";
import { MnTagInput } from "./tag-input";

afterEach(() => {
  document.body.innerHTML = "";
});

const input = () => document.querySelector<HTMLInputElement>("input")!;
const field = () => screen.getByRole("combobox");
const options = () => Array.from(document.querySelectorAll('[role="option"]'));
const option = (label: string) =>
  options().find((el) => el.textContent?.trim() === label)!;
const listbox = () => document.querySelector('[role="listbox"]');
const tagLabels = () =>
  Array.from(document.querySelectorAll(".values .label")).map(
    (el) => el.textContent,
  );

/** A bound tag input (`[(value)]`) with a spy on `valueChange` */
async function setup(
  props: {
    options?: string[];
    commitOnBlur?: boolean;
    separators?: string[];
    readOnly?: boolean;
    disabled?: boolean;
    createLabel?: (tag: string) => string;
    value?: string[];
  } = {},
) {
  @Component({
    imports: [MnTagInput],
    template: `<mn-tag-input
      aria-label="Tags"
      class="consumer"
      [(value)]="value"
      (valueChange)="changed($event)"
      (draftChange)="drafted($event)"
      (openChange)="opened($event)"
      (clear)="cleared()"
      [options]="options"
      [commitOnBlur]="commitOnBlur"
      [separators]="separators"
      [readOnly]="readOnly"
      [disabled]="disabled"
      [createLabel]="createLabel"
    />`,
  })
  class Host {
    value = signal<string[] | undefined>(props.value ?? ["React"]);
    options = props.options ?? ["React", "Vue", "Vue"];
    commitOnBlur = props.commitOnBlur ?? true;
    separators = props.separators ?? [",", "Enter"];
    readOnly = props.readOnly ?? false;
    disabled = props.disabled ?? false;
    createLabel = props.createLabel;
    changed = vi.fn();
    drafted = vi.fn();
    opened = vi.fn();
    cleared = vi.fn();
  }
  const fixture = await render(Host);
  return { fixture, host: fixture.componentInstance, u: user() };
}

describe("MnTagInput", () => {
  it("renders the tag list, the entry field, combobox semantics and the shared hooks", async () => {
    const { fixture, u } = await setup();
    const root = document.querySelector("mn-tag-input")!;
    expect(root).toHaveClass("root", "consumer");
    expect(root).toHaveAttribute("data-minerva", "tag-input");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).not.toHaveAttribute("aria-label");
    expect(root.querySelector(".values .label")).toHaveTextContent("React");
    const tag = root.querySelector('[data-minerva="tag"][data-part="root"]')!;
    expect(tag).toHaveAttribute("data-size", "large");
    expect(input().closest(".entry .combobox")).not.toBeNull();
    expect(input().parentElement).toHaveAttribute("data-component", "input");
    expect(input().parentElement).toHaveClass("medium", "outline");
    expect(input()).toHaveAttribute("role", "combobox");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveAttribute("aria-autocomplete", "list");
    expect(field()).toHaveAccessibleName("Tags");
    await u.click(input());
    await settle(fixture);
    expect(root).toHaveAttribute("data-state", "open");
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute("aria-controls", listbox()!.id);
    await u.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(input()).toHaveAttribute("aria-activedescendant", options()[0].id);
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
  });

  it("creates trimmed tags, selects suggestions and does not duplicate selected values", async () => {
    const { fixture, host, u } = await setup();
    await u.click(input());
    await settle(fixture);
    expect(options()).toHaveLength(1);
    await u.keyboard(" Custom {Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Custom"]);
    expect(host.value()).toEqual(["React", "Custom"]);
    expect(input().value).toBe("");
    await u.keyboard("React{Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenCalledTimes(1);
    await u.clear(input());
    await u.keyboard("Vu");
    await settle(fixture);
    fireEvent.mouseDown(option("Vue"));
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Custom", "Vue"]);
  });

  it("does not commit while composing (IME) nor submit the enclosing form on Enter", async () => {
    const { fixture, host, u } = await setup();
    await u.click(input());
    fireEvent.compositionStart(input());
    await u.keyboard("中文{Enter}{Escape}");
    await settle(fixture);
    expect(host.changed).not.toHaveBeenCalled();
    expect(input().value).toBe("中文");
    fireEvent.compositionEnd(input());
    expect(
      fireEvent.keyDown(input(), { key: "Enter", isComposing: true }),
    ).toBe(true);
    expect(host.changed).not.toHaveBeenCalled();
    expect(fireEvent.keyDown(input(), { key: "Enter" })).toBe(false);
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "中文"]);
    expect(fireEvent.keyDown(input(), { key: "Enter" })).toBe(false);
    expect(host.changed).toHaveBeenCalledTimes(1);
  });

  it("commits on blur, cancels the draft with Escape, removes and clears with labelled buttons", async () => {
    const { fixture, host, u } = await setup();
    await u.click(input());
    await u.keyboard("Draft");
    input().blur();
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Draft"]);
    await u.click(input());
    await u.keyboard("Discard{Escape}");
    input().blur();
    await settle(fixture);
    expect(host.changed).toHaveBeenCalledTimes(1);
    await u.click(screen.getByRole("button", { name: "Remove React" }));
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["Draft"]);
    expect(document.activeElement).toBe(input());
    await u.click(screen.getByRole("button", { name: "Clear tags" }));
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith([]);
    expect(host.cleared).toHaveBeenCalledTimes(1);
    expect(document.querySelector(".values")).toBeNull();
  });

  it("does not commit on blur when commitOnBlur is false", async () => {
    const { fixture, host, u } = await setup({ commitOnBlur: false });
    await u.click(input());
    await u.keyboard("Draft");
    input().blur();
    await settle(fixture);
    expect(host.changed).not.toHaveBeenCalled();
  });

  it("adds the draft with the add button and keeps focus in the input", async () => {
    const { fixture, host, u } = await setup();
    const add = () =>
      screen.getByRole<HTMLButtonElement>("button", { name: "Add tag" });
    expect(add().disabled).toBe(true);
    expect(add()).toHaveAttribute("data-minerva", "icon-button");
    expect(add().parentElement).toHaveAttribute("data-minerva", "tooltip");
    await u.click(input());
    await u.keyboard("Svelte");
    await settle(fixture);
    expect(add().disabled).toBe(false);
    await u.click(add());
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
    expect(document.activeElement).toBe(input());
  });

  it("selects a suggestion with arrow keys even with an empty draft", async () => {
    const { fixture, host, u } = await setup();
    await u.click(input());
    await u.keyboard("{ArrowDown}{Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Vue"]);
  });

  it("cycles the highlight with ArrowUp / ArrowDown and follows the pointer", async () => {
    const { fixture, host, u } = await setup({
      options: ["Vue", "Svelte", "Solid"],
    });
    await u.click(input());
    await u.keyboard("{ArrowUp}");
    await settle(fixture);
    expect(options()[2]).toHaveAttribute("aria-selected", "true");
    expect(options()[2]).toHaveAttribute("data-highlighted", "");
    expect(options()[0]).not.toHaveAttribute("data-highlighted");
    await u.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
    expect(options()[0]).toHaveAttribute("data-part", "option");
    expect(options()[0]).toHaveAttribute("data-highlighted", "");
    fireEvent.mouseEnter(option("Svelte"));
    await settle(fixture);
    expect(option("Svelte")).toHaveAttribute("aria-selected", "true");
    await u.keyboard("{Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Svelte"]);
  });

  it("opens the list with the arrow keys after Escape closed it and reports openChange", async () => {
    const { fixture, host, u } = await setup();
    await u.click(input());
    await settle(fixture);
    expect(host.opened).toHaveBeenLastCalledWith(true);
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(listbox()).toBeNull();
    expect(host.opened).toHaveBeenLastCalledWith(false);
    await u.keyboard("{ArrowDown}");
    await settle(fixture);
    expect(listbox()).not.toBeNull();
  });

  it("shows the empty text when no suggestion is left", async () => {
    const { fixture, u } = await setup({ options: [] });
    await u.click(input());
    await settle(fixture);
    expect(document.querySelector(".empty")).toHaveTextContent("No matches");
    await u.keyboard("{ArrowDown}");
    expect(options()).toHaveLength(0);
  });

  it("navigates away from a duplicate draft and uses the create labels", async () => {
    const { fixture, host, u } = await setup({ options: ["React Native"] });
    await u.click(input());
    await u.keyboard("React{ArrowDown}{Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "React Native"]);
    await u.keyboard("Svelte");
    await settle(fixture);
    expect(options()[0]).toHaveTextContent('Add "Svelte"');
  });

  it("creates the draft independently of a custom create label", async () => {
    const { fixture, host, u } = await setup({
      createLabel: () => "Create new tag",
    });
    await u.click(input());
    await u.keyboard("Vu");
    await settle(fixture);
    expect(options()[0]).toHaveTextContent("Create new tag");
    await u.keyboard("{Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Vu"]);
  });

  it("reports the draft with draftChange", async () => {
    const { fixture, host, u } = await setup();
    await u.click(input());
    await u.keyboard("ab,");
    await settle(fixture);
    expect(host.drafted.mock.calls.map(([d]) => d)).toEqual(["a", "ab", ""]);
  });

  it("reopens suggestions when the still-focused input is clicked after selecting one", async () => {
    const { fixture, host, u } = await setup({
      options: ["React", "Vue", "Svelte", "Solid"],
    });
    await u.click(input());
    await settle(fixture);
    fireEvent.mouseDown(option("Vue"));
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Vue"]);
    expect(options()).toHaveLength(0);
    expect(document.activeElement).toBe(input());
    await u.click(input());
    await settle(fixture);
    expect(options().map((el) => el.textContent?.trim())).toEqual([
      "Svelte",
      "Solid",
    ]);
  });

  it("supports invalid, size, id, placeholder, aria-describedby and custom labels", async () => {
    @Component({
      imports: [MnTagInput],
      template: `<mn-tag-input
        [defaultValue]="['React']"
        invalid
        size="small"
        id="tags"
        placeholder="Add a tag"
        aria-label="Tags"
        aria-describedby="hint"
        addLabel="Plus"
        clearLabel="Wipe"
        emptyText="Nothing"
        [options]="[]"
        [removeLabel]="drop"
        data-testid="tags"
      />`,
    })
    class Host {
      drop = (tag: string) => `Drop ${tag}`;
    }
    const fixture = await render(Host);
    const root = document.querySelector("mn-tag-input")!;
    expect(root).not.toHaveAttribute("id");
    expect(root).toHaveAttribute("data-testid", "tags");
    expect(root).toHaveAttribute("data-invalid", "");
    expect(input().id).toBe("tags");
    expect(input().placeholder).toBe("Add a tag");
    expect(input()).toHaveAttribute("aria-describedby", "hint");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input().parentElement).toHaveClass("invalid", "small");
    expect(screen.getByRole("button", { name: "Plus" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Wipe" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Drop React" })).toBeTruthy();
    await user().click(input());
    await settle(fixture);
    expect(document.querySelector(".empty")).toHaveTextContent("Nothing");
  });

  it("labels the input and the suggestion list with aria-labelledby", async () => {
    @Component({
      imports: [MnTagInput],
      template: `<span id="ext-label">Topics</span>
        <mn-tag-input aria-labelledby="ext-label" [options]="['Vue']" />`,
    })
    class Host {}
    const fixture = await render(Host);
    expect(input()).toHaveAccessibleName("Topics");
    await user().click(input());
    await settle(fixture);
    expect(listbox()).toHaveAttribute("aria-labelledby", "ext-label");
  });

  it("submits selected values, not the draft, and omits disabled fields from native forms", async () => {
    @Component({
      imports: [MnTagInput],
      template: `<form>
        <mn-tag-input
          aria-label="Tags"
          name="tags"
          [defaultValue]="['React', 'Vue']"
          [disabled]="disabled()"
        />
      </form>`,
    })
    class Host {
      disabled = signal(false);
    }
    const fixture = await render(Host);
    await user().type(input(), "Draft");
    const form = document.querySelector("form")!;
    expect(new FormData(form).getAll("tags")).toEqual(["React", "Vue"]);
    fixture.componentInstance.disabled.set(true);
    await settle(fixture);
    expect(new FormData(form).getAll("tags")).toEqual([]);
  });

  it("works uncontrolled with defaultValue", async () => {
    @Component({
      imports: [MnTagInput],
      template: `<mn-tag-input
        aria-label="Tags"
        [defaultValue]="['a']"
        (valueChange)="changed($event)"
      />`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await user().type(input(), "b{Enter}");
    await settle(fixture);
    expect(fixture.componentInstance.changed).toHaveBeenLastCalledWith([
      "a",
      "b",
    ]);
    expect(tagLabels()).toEqual(["a", "b"]);
  });

  it("inherits the field's id, description, invalid, required, disabled and read-only states", async () => {
    const state = {
      invalid: signal(true),
      disabled: signal(true),
      readOnly: signal(false),
    };
    const context: FormFieldContext = {
      id: signal("field-id"),
      helperId: signal("field-id-helper"),
      errorId: signal("field-id-error"),
      labelId: signal("field-id-label"),
      invalid: state.invalid,
      required: signal(true),
      disabled: state.disabled,
      readOnly: state.readOnly,
      hasHelperText: signal(false),
      hasErrorMessage: computed(() => true),
      registerHelperText: () => {},
      registerErrorMessage: () => {},
    };
    @Component({
      imports: [MnTagInput],
      providers: [{ provide: MN_FORM_FIELD, useValue: context }],
      template: `<mn-tag-input
        [defaultValue]="['React']"
        (valueChange)="changed($event)"
      />`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const root = document.querySelector("mn-tag-input")!;
    expect(input().id).toBe("field-id");
    expect(input()).toHaveAttribute("aria-describedby", "field-id-error");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input()).toHaveAttribute("aria-required", "true");
    expect(input().parentElement).toHaveClass("invalid", "disabled");
    expect(root).toHaveAttribute("data-required", "");
    expect(root).toHaveAttribute("data-disabled", "");
    expect(input().disabled).toBe(true);
    expect(
      Array.from(document.querySelectorAll("button")).every((b) => b.disabled),
    ).toBe(true);
    fireEvent.keyDown(input(), { key: "Backspace" });
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();

    state.disabled.set(false);
    state.readOnly.set(true);
    await settle(fixture);
    expect(input().readOnly).toBe(true);
    expect(input()).toHaveAttribute("aria-readonly", "true");
    expect(screen.queryByRole("button", { name: "Remove React" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Add tag" })).toBeNull();
    await user().click(input());
    await settle(fixture);
    expect(listbox()).toBeNull();
    await user().keyboard("x");
    expect(input().value).toBe("");
  });

  it("works with ngModel", async () => {
    @Component({
      imports: [MnTagInput, FormsModule],
      template: `<mn-tag-input aria-label="Tags" [(ngModel)]="tags" />`,
    })
    class Host {
      tags = signal<string[]>(["a"]);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(tagLabels()).toEqual(["a"]);
    await user().type(input(), "b{Enter}");
    await settle(fixture);
    expect(fixture.componentInstance.tags()).toEqual(["a", "b"]);
    fixture.componentInstance.tags.set(["c"]);
    await settle(fixture);
    await settle(fixture);
    expect(tagLabels()).toEqual(["c"]);
  });

  it("works with Reactive Forms: value, disabled state and validation", async () => {
    @Component({
      imports: [MnTagInput, ReactiveFormsModule],
      template: `<mn-tag-input aria-label="Tags" [formControl]="control" />`,
    })
    class Host {
      control = new FormControl<string[]>([], {
        nonNullable: true,
        validators: Validators.required,
      });
    }
    const fixture = await render(Host);
    const { control } = fixture.componentInstance;
    const root = document.querySelector("mn-tag-input")!;
    // required validator on an empty array: Validators.required treats [] as empty
    expect(control.invalid).toBe(true);
    expect(input()).not.toHaveAttribute("aria-invalid");
    await user().click(input());
    input().blur();
    await settle(fixture);
    expect(control.touched).toBe(true);
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(root).toHaveAttribute("data-invalid", "");

    await user().type(input(), "x{Enter}");
    await settle(fixture);
    expect(control.value).toEqual(["x"]);
    expect(control.valid).toBe(true);
    expect(input()).not.toHaveAttribute("aria-invalid");

    control.setValue(["y", "z"]);
    await settle(fixture);
    expect(tagLabels()).toEqual(["y", "z"]);

    control.disable();
    await settle(fixture);
    expect(input().disabled).toBe(true);
    expect(root).toHaveAttribute("data-disabled", "");
  });

  it("translates the built-in labels", async () => {
    const { provideMinerva } = await import("../../config");
    const { TestBed } = await import("@angular/core/testing");
    TestBed.configureTestingModule({
      providers: [provideMinerva({ locale: { language: "zh" } })],
    });
    await setup();
    expect(screen.getByRole("button", { name: "移除 React" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "添加标签" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "清空标签" })).toBeTruthy();
  });
});

describe("MnTagInput keyboard", () => {
  it("reaches each tag's remove button, then the input, then the clear button", async () => {
    const { u } = await setup({ value: ["React", "Vue"] });
    await u.tab();
    expect(screen.getByRole("button", { name: "Remove React" })).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("button", { name: "Remove Vue" })).toHaveFocus();
    await u.tab();
    expect(field()).toHaveFocus();
    // The add button is disabled while the draft is empty: skipped.
    await u.tab();
    expect(screen.getByRole("button", { name: "Clear tags" })).toHaveFocus();
  });

  it("removes a tag with Enter / Space on its remove button and returns focus to the input", async () => {
    const { fixture, u } = await setup({ value: ["React", "Vue"] });
    await u.tab();
    await u.keyboard("{Enter}");
    await settle(fixture);
    expect(tagLabels()).toEqual(["Vue"]);
    expect(field()).toHaveFocus();
    await u.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Remove Vue" })).toHaveFocus();
    await u.keyboard(" ");
    await settle(fixture);
    expect(tagLabels()).toEqual([]);
    expect(field()).toHaveFocus();
  });

  it("removes the last tag with Backspace only when the draft is empty", async () => {
    const { fixture, host, u } = await setup({ value: ["React", "Vue"] });
    await u.click(field());
    await u.keyboard("ab{Backspace}");
    await settle(fixture);
    expect(field()).toHaveValue("a");
    await u.keyboard("{Backspace}");
    await settle(fixture);
    expect(field()).toHaveValue("");
    expect(host.changed).not.toHaveBeenCalled();
    await u.keyboard("{Backspace}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React"]);
    await u.keyboard("{Backspace}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith([]);
    await u.keyboard("{Backspace}");
    expect(host.changed).toHaveBeenCalledTimes(2);
  });

  it("does not remove, paste or type tags when read-only", async () => {
    const { fixture, host, u } = await setup({
      value: ["React", "Vue"],
      readOnly: true,
    });
    await u.tab();
    expect(field()).toHaveFocus();
    await u.keyboard("{Backspace}");
    await u.paste("a,b");
    await u.keyboard("c,");
    await settle(fixture);
    expect(host.changed).not.toHaveBeenCalled();
    expect(tagLabels()).toEqual(["React", "Vue"]);
  });

  it("is not reachable when disabled", async () => {
    const { u } = await setup({ disabled: true });
    await u.tab();
    expect(document.body).toHaveFocus();
  });
});

describe("MnTagInput separators", () => {
  it("commits the text before a typed comma by default and keeps Enter", async () => {
    const { fixture, host, u } = await setup({ value: ["React", "Vue"] });
    await u.click(field());
    await u.keyboard(" Svelte ,Sol");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
    expect(field()).toHaveValue("Sol");
    await u.keyboard("id{Enter}");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith([
      "React",
      "Vue",
      "Svelte",
      "Solid",
    ]);
    await u.keyboard(", ,Vue,");
    await settle(fixture);
    expect(host.changed).toHaveBeenCalledTimes(2);
    expect(field()).toHaveValue("");
  });

  it("splits on custom separators only and does not commit on Enter without it", async () => {
    const { fixture, host, u } = await setup({
      value: ["React", "Vue"],
      separators: [";"],
    });
    await u.click(field());
    await u.keyboard("a,b{Enter}");
    await settle(fixture);
    expect(host.changed).not.toHaveBeenCalled();
    expect(field()).toHaveValue("a,b");
    await u.keyboard(";");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Vue", "a,b"]);
    expect(field()).toHaveValue("");
  });

  it("splits pasted text into several tags in one change, deduped", async () => {
    const { fixture, host, u } = await setup({ value: ["React", "Vue"] });
    await u.click(field());
    await u.paste(" React , x,, x ,Vue,y ");
    await settle(fixture);
    expect(host.changed).toHaveBeenCalledTimes(1);
    expect(host.changed).toHaveBeenLastCalledWith(["React", "Vue", "x", "y"]);
    expect(field()).toHaveValue("");
    await u.paste("a\nb\r\nc");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith([
      "React",
      "Vue",
      "x",
      "y",
      "a",
      "b",
      "c",
    ]);
    await u.paste("React,Vue");
    await settle(fixture);
    expect(host.changed).toHaveBeenCalledTimes(2);
  });

  it("lets a paste without separators through as plain text", async () => {
    const { fixture, host, u } = await setup();
    await u.click(field());
    await u.paste("a; b");
    await settle(fixture);
    expect(host.changed).not.toHaveBeenCalled();
    expect(field()).toHaveValue("a; b");
  });
});
