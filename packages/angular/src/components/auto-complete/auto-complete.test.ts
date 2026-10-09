import { Component, Directive, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MN_FORM_FIELD, type FormFieldContext } from "../../internal/forms";
import { fireEvent, render, screen, settle, user, within } from "../../testing";
import { MnModal } from "../modal";
import { MnAutoComplete, type AutoCompleteOption } from "./auto-complete";

const FRUITS: AutoCompleteOption[] = [
  { label: "Apple", value: "apple", description: "A red fruit" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
  { label: "Apricot", value: "apricot" },
];

const BOOKS: AutoCompleteOption[] = [
  { value: "1", label: "Lord of Mysteries", description: "Cuttlefish" },
  { value: "2", label: "Sword of Coming", description: "Fenghuo" },
  { value: "3", label: "A Record of Mortal", description: "Wangyu" },
];

const input = () => screen.getByRole<HTMLInputElement>("combobox");
const options = () => screen.queryAllByRole("option");
const listbox = () => screen.queryByRole("listbox");

afterEach(() => {
  document.body.innerHTML = "";
});

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete
    name="fruit"
    label="Fruit"
    [options]="options"
    [defaultValue]="defaultValue"
    [loading]="loading()"
    [renderEmpty]="renderEmpty()"
    [(open)]="open"
    (valueChange)="changed($event)"
    (optionSelect)="selected($event)"
    (optionClick)="clicked($event)"
  />`,
})
class Fruits {
  options = FRUITS;
  defaultValue = "";
  loading = signal(false);
  renderEmpty = signal<string | undefined>(undefined);
  open = false;
  changed = vi.fn();
  selected = vi.fn();
  clicked = vi.fn();
}

@Component({
  imports: [MnAutoComplete],
  template: `<mn-auto-complete
    aria-label="search"
    className="consumer"
    [options]="options()"
    [autoHighlight]="autoHighlight()"
    [fillOnSelect]="false"
    [groupBy]="groupBy()"
    [groupMode]="groupMode()"
    [disabled]="disabled()"
    [readOnly]="readOnly()"
    [(value)]="text"
    (optionSelect)="selected($event)"
    (valueSubmit)="submitted($event)"
    (openChange)="openChanged($event)"
  />`,
})
class Search {
  options = signal(BOOKS);
  autoHighlight = signal(true);
  groupBy = signal<((o: AutoCompleteOption) => string) | undefined>(undefined);
  groupMode = signal<"first" | "adjacent">("first");
  disabled = signal<boolean | undefined>(undefined);
  readOnly = signal(false);
  text = signal("");
  selected = vi.fn();
  submitted = vi.fn();
  openChanged = vi.fn();
}

describe("MnAutoComplete", () => {
  it("renders the label, input and root hooks, closed by default", async () => {
    await render(Fruits);
    const field = screen.getByRole("combobox", { name: "Fruit" });
    expect(field).toHaveAttribute("name", "fruit");
    expect(field).toHaveValue("");
    expect(field).toHaveAttribute("aria-expanded", "false");
    expect(field).toHaveAttribute("aria-autocomplete", "list");
    expect(field).not.toHaveAttribute("aria-controls");
    const root = field.closest("mn-auto-complete")!;
    expect(root).toHaveClass("autoComplete");
    expect(root).toHaveAttribute("data-minerva", "autocomplete");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    const box = field.parentElement!;
    expect(box).toHaveClass("root", "outline", "medium");
    expect(box).toHaveAttribute("data-minerva", "input");
    expect(box).toHaveAttribute("data-size", "medium");
    expect(field).toHaveAttribute("data-part", "input");
    expect(screen.getByText("Fruit")).toHaveAttribute("data-part", "label");
    expect(listbox()).toBeNull();
  });

  it("opens with every option on focus and reports openChange", async () => {
    const fixture = await render(Fruits);
    await user().click(input());
    await settle(fixture);
    const list = screen.getByRole("listbox", { name: "Fruit" });
    expect(options().map((o) => o.textContent?.trim())).toEqual([
      "Apple A red fruit",
      "Banana",
      "Cherry",
      "Apricot",
    ]);
    expect(screen.getByText("A red fruit")).toHaveClass("description");
    expect(fixture.componentInstance.open).toBe(true);
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute("aria-controls", list.id);
    const content = list.closest('[data-part="content"]')!;
    expect(content.parentElement).toBe(document.body);
    expect(content).toHaveClass("popup");
    expect(content).toHaveAttribute("data-state", "open");
    expect(content).toHaveAttribute("data-side", "bottom");
    expect(content).toHaveAttribute("data-placement", "bottom-start");
    expect(list.parentElement).toHaveClass("dropdown", "animated");
    expect(input().closest("mn-auto-complete")).toHaveAttribute(
      "data-state",
      "open",
    );
  });

  it("filters case-insensitively as the user types and emits valueChange", async () => {
    const fixture = await render(Fruits);
    await user().type(input(), "ap");
    await settle(fixture);
    const host = fixture.componentInstance;
    expect(host.changed).toHaveBeenNthCalledWith(1, "a");
    expect(host.changed).toHaveBeenNthCalledWith(2, "ap");
    expect(
      options().map((o) => o.querySelector(".label")!.textContent),
    ).toEqual(["Apple", "Apricot"]);
  });

  it("uses defaultValue as the initial text", async () => {
    @Component({
      imports: [MnAutoComplete],
      template: `<mn-auto-complete
        aria-label="a"
        [options]="[]"
        defaultValue="Ban"
      />`,
    })
    class Host {}
    await render(Host);
    expect(input()).toHaveValue("Ban");
  });

  it("shows the Empty state, renderEmpty and loading inside the listbox", async () => {
    const fixture = await render(Fruits);
    await user().type(input(), "zzz");
    await settle(fixture);
    const status = screen.getByRole("status", { name: "No Data" });
    expect(status).toHaveClass("empty");
    expect(status.parentElement).toHaveAttribute("data-part", "empty");
    expect(within(listbox()!).queryByRole("option")).toBeNull();

    fixture.componentInstance.renderEmpty.set("Custom empty");
    await settle(fixture);
    expect(screen.getByText("Custom empty")).toHaveClass("empty");
    expect(screen.queryByRole("status")).toBeNull();

    fixture.componentInstance.loading.set(true);
    await settle(fixture);
    expect(listbox()).toHaveAttribute("aria-busy", "true");
    expect(
      screen.getByRole("progressbar", { name: "Loading" }),
    ).toHaveAttribute("data-minerva", "progress");
    expect(document.querySelector(".loading")).toHaveAttribute(
      "data-part",
      "loading",
    );
  });

  it("selects an option on click: fills the input, emits and closes", async () => {
    const fixture = await render(Fruits);
    const u = user();
    await u.click(input());
    await settle(fixture);
    await u.click(screen.getByText("Banana"));
    await settle(fixture);
    const host = fixture.componentInstance;
    expect(host.selected).toHaveBeenCalledWith(FRUITS[1]);
    expect(host.clicked).toHaveBeenCalledWith(FRUITS[1]);
    expect(host.changed).toHaveBeenLastCalledWith("Banana");
    expect(input()).toHaveValue("Banana");
    expect(listbox()).toBeNull();
    expect(host.open).toBe(false);
    expect(document.activeElement).toBe(input());
  });

  it("ignores clicks on disabled options", async () => {
    const fixture = await render(Fruits);
    const u = user();
    await u.click(input());
    await settle(fixture);
    const cherry = screen.getByText("Cherry").closest(".optionItem")!;
    expect(cherry).toHaveClass("disabled");
    expect(cherry).toHaveAttribute("aria-disabled", "true");
    expect(cherry).toHaveAttribute("data-disabled", "");
    await u.click(screen.getByText("Cherry"));
    await settle(fixture);
    expect(fixture.componentInstance.selected).not.toHaveBeenCalled();
    expect(fixture.componentInstance.clicked).not.toHaveBeenCalled();
    expect(listbox()).not.toBeNull();
  });

  it("navigates with ArrowDown / ArrowUp (wrapping, skipping disabled) and picks with Enter", async () => {
    const fixture = await render(Fruits);
    const u = user();
    await u.click(input());
    await settle(fixture);
    await u.keyboard("{ArrowUp}");
    await settle(fixture);
    expect(input()).toHaveAttribute("aria-activedescendant", options()[3].id);
    expect(options()[3]).toHaveAttribute("aria-selected", "true");
    expect(options()[3]).toHaveAttribute("data-highlighted", "");
    expect(options()[3]).toHaveClass("active");
    await u.keyboard("{ArrowUp}");
    await settle(fixture);
    // Cherry (disabled) is skipped
    expect(input()).toHaveAttribute("aria-activedescendant", options()[1].id);
    await u.keyboard("{Enter}");
    await settle(fixture);
    expect(fixture.componentInstance.selected).toHaveBeenLastCalledWith(
      FRUITS[1],
    );
    expect(input()).toHaveValue("Banana");
  });

  it("does not select on Enter without an active option", async () => {
    const fixture = await render(Fruits);
    await user().click(input());
    await user().keyboard("{Enter}");
    await settle(fixture);
    expect(fixture.componentInstance.selected).not.toHaveBeenCalled();
  });

  it("Escape closes an open list; on a closed list it clears the text", async () => {
    const fixture = await render(Fruits);
    const u = user();
    await u.click(input());
    await u.keyboard("Ban");
    await settle(fixture);
    expect(listbox()).not.toBeNull();
    expect(input()).not.toHaveAttribute("data-minerva-escape-consumer");
    const host = fixture.componentInstance;
    host.changed.mockClear();
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(listbox()).toBeNull();
    expect(input()).toHaveValue("Ban");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveAttribute("data-minerva-escape-consumer", "");
    expect(host.changed).not.toHaveBeenCalled();
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(input()).toHaveValue("");
    expect(host.changed).toHaveBeenCalledExactlyOnceWith("");
    expect(document.activeElement).toBe(input());
    await u.keyboard("{Escape}");
    expect(host.changed).toHaveBeenCalledTimes(1);
    // typing reopens
    await u.keyboard("b");
    await settle(fixture);
    expect(listbox()).toHaveTextContent("Banana");
  });

  it("closes when focus leaves and on a click outside", async () => {
    @Component({
      imports: [MnAutoComplete],
      template: `<mn-auto-complete aria-label="a" [options]="options" /><button>
          out
        </button>`,
    })
    class Host {
      options = FRUITS;
    }
    const fixture = await render(Host);
    const u = user();
    await u.click(input());
    await settle(fixture);
    await u.tab();
    await settle(fixture);
    expect(listbox()).toBeNull();
    await u.click(input());
    await settle(fixture);
    expect(listbox()).not.toBeNull();
    fireEvent.pointerDown(document.body);
    await settle(fixture);
    expect(listbox()).toBeNull();
  });

  it("autoHighlight activates the first option; Enter picks without filling (fillOnSelect=false)", async () => {
    const fixture = await render(Search);
    const root = input().closest("mn-auto-complete")!;
    expect(root).toHaveClass("autoComplete", "consumer");
    input().focus();
    await settle(fixture);
    const [first, second] = options();
    expect(first).toHaveClass("optionItem", "active");
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveAttribute("aria-selected", "false");
    expect(input()).toHaveAttribute("aria-activedescendant", first.id);
    await user().keyboard("{ArrowDown}{Enter}");
    await settle(fixture);
    const host = fixture.componentInstance;
    expect(host.selected).toHaveBeenCalledWith(BOOKS[1]);
    expect(host.text()).toBe("");
    expect(options()).toHaveLength(0);
  });

  it("Enter without an active option emits valueSubmit with the trimmed text", async () => {
    const fixture = await render(Search);
    fixture.componentInstance.text.set("  unknown book ");
    fixture.componentInstance.autoHighlight.set(false);
    await settle(fixture);
    input().focus();
    await user().keyboard("{Enter}");
    await settle(fixture);
    expect(fixture.componentInstance.submitted).toHaveBeenCalledWith(
      "unknown book",
    );
    expect(options()).toHaveLength(0);

    fixture.componentInstance.submitted.mockClear();
    fixture.componentInstance.text.set("  ");
    await settle(fixture);
    await user().keyboard("{Enter}");
    expect(fixture.componentInstance.submitted).not.toHaveBeenCalled();
  });

  it("ignores IME composition (Enter, option clicks)", async () => {
    const fixture = await render(Search);
    input().focus();
    await settle(fixture);
    const host = fixture.componentInstance;
    fireEvent.keyDown(input(), { key: "Enter", isComposing: true });
    expect(host.selected).not.toHaveBeenCalled();
    fireEvent.compositionStart(input());
    fireEvent.keyDown(input(), { key: "Enter" });
    fireEvent.click(options()[0]);
    expect(host.selected).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input());
    fireEvent.keyDown(input(), { key: "Enter" });
    expect(host.selected).toHaveBeenCalledTimes(1);
  });

  it("reopens when the still-focused input is clicked, notifying once", async () => {
    const fixture = await render(Search);
    input().focus();
    await settle(fixture);
    fireEvent.mouseDown(options()[1]);
    fireEvent.click(options()[1]);
    await settle(fixture);
    const host = fixture.componentInstance;
    expect(host.selected).toHaveBeenCalledWith(BOOKS[1]);
    expect(options()).toHaveLength(0);
    expect(document.activeElement).toBe(input());
    host.openChanged.mockClear();
    input().click();
    input().click();
    await settle(fixture);
    expect(options()).toHaveLength(3);
    expect(host.openChanged.mock.calls).toEqual([[true]]);
  });

  it("reopens with ArrowDown after Escape and selects with Space on a focused option", async () => {
    const fixture = await render(Search);
    input().focus();
    await settle(fixture);
    await user().keyboard("{Escape}");
    await settle(fixture);
    expect(options()).toHaveLength(0);
    await user().keyboard("{ArrowDown}");
    await settle(fixture);
    expect(options()).toHaveLength(3);
    fireEvent.keyDown(options()[2], { key: "Tab" });
    expect(fixture.componentInstance.selected).not.toHaveBeenCalled();
    fireEvent.keyDown(options()[2], { key: " " });
    expect(fixture.componentInstance.selected).toHaveBeenCalledWith(BOOKS[2]);
  });

  it("disabled / read-only never show the dropdown", async () => {
    const fixture = await render(Search);
    input().focus();
    await settle(fixture);
    expect(options()).toHaveLength(3);
    fixture.componentInstance.disabled.set(true);
    await settle(fixture);
    expect(options()).toHaveLength(0);
    expect(input()).toBeDisabled();
    const root = input().closest("mn-auto-complete")!;
    expect(root).toHaveAttribute("data-disabled", "");
    expect(input().parentElement).toHaveClass("disabled");
    fixture.componentInstance.disabled.set(undefined);
    fixture.componentInstance.readOnly.set(true);
    await settle(fixture);
    expect(input()).toHaveAttribute("readonly");
    expect(root).toHaveAttribute("data-readonly", "");
    input().focus();
    input().click();
    fireEvent.keyDown(input(), { key: "ArrowDown" });
    await settle(fixture);
    expect(options()).toHaveLength(0);
  });

  it("groups options (first appearance / adjacent runs, '' without heading) in display order", async () => {
    const fixture = await render(Search);
    const host = fixture.componentInstance;
    host.autoHighlight.set(false);
    host.options.set([
      { value: "a", label: "Alpha", group: "Recent" },
      { value: "b", label: "Beta", group: "Popular" },
      { value: "c", label: "Gamma", group: "Recent" },
      { value: "d", label: "Delta" },
    ]);
    host.groupBy.set((o) => o.group ?? "");
    await settle(fixture);
    input().focus();
    await settle(fixture);
    const headings = () =>
      Array.from(document.querySelectorAll(".groupLabel")).map((el) =>
        el.textContent?.trim(),
      );
    const labels = () => options().map((o) => o.textContent?.trim());
    expect(headings()).toEqual(["Recent", "Popular"]);
    expect(labels()).toEqual(["Alpha", "Gamma", "Beta", "Delta"]);
    const group = screen.getByRole("group", { name: "Recent" });
    expect(within(group).getAllByRole("option")).toHaveLength(2);
    expect(document.querySelector(".groupLabel")).toHaveAttribute(
      "data-part",
      "group-label",
    );
    await user().keyboard("{ArrowDown}{ArrowDown}");
    await settle(fixture);
    expect(input()).toHaveAttribute("aria-activedescendant", options()[1].id);
    expect(options()[1]).toHaveTextContent("Gamma");

    host.groupMode.set("adjacent");
    await settle(fixture);
    expect(headings()).toEqual(["Recent", "Popular", "Recent"]);
    expect(labels()).toEqual(["Alpha", "Beta", "Gamma", "Delta"]);
  });

  it("highlights the hovered option and option.highlight", async () => {
    @Component({
      imports: [MnAutoComplete],
      template: `<mn-auto-complete aria-label="a" [options]="options" />`,
    })
    class Host {
      options: AutoCompleteOption[] = [
        { value: "a", label: "Alpha", highlight: true },
        { value: "b", label: "Beta" },
      ];
    }
    const fixture = await render(Host);
    await user().click(input());
    await settle(fixture);
    const [alpha, beta] = options();
    expect(alpha).toHaveClass("highlight");
    fireEvent.mouseEnter(beta);
    await settle(fixture);
    expect(beta).toHaveClass("active");
    expect(beta).toHaveAttribute("data-highlighted", "");
    fireEvent.mouseLeave(beta);
    await settle(fixture);
    expect(beta).not.toHaveClass("active");
  });

  it("custom mode renders the option template; filterOption / sortOption; dropdown class, animation", async () => {
    @Component({
      imports: [MnAutoComplete],
      template: ` <ng-template #tpl let-option
          ><b class="custom">{{ option.label }}!</b></ng-template
        >
        <mn-auto-complete
          aria-label="a"
          mode="custom"
          [renderOption]="tpl"
          [options]="options"
          [filterOption]="filter"
          [sortOption]="sort"
          dropdownClassName="mine"
          [animation]="false"
          placement="top"
        />`,
    })
    class Host {
      options = FRUITS;
      filter = (_text: string, o: AutoCompleteOption) => o.value !== "banana";
      sort = (a: AutoCompleteOption, b: AutoCompleteOption) =>
        a.label.localeCompare(b.label);
    }
    const fixture = await render(Host);
    await user().click(input());
    await settle(fixture);
    expect(options().map((o) => o.textContent?.trim())).toEqual([
      "Apple!",
      "Apricot!",
      "Cherry!",
    ]);
    expect(document.querySelector(".basicOption")).toBeNull();
    const content = document.querySelector('[data-part="content"]')!;
    expect(content).toHaveClass("popup", "mine");
    expect(content.firstElementChild).not.toHaveClass("animated");
    expect(content).toHaveAttribute("data-side", "top");
  });

  it("clearable: the clear button empties the text and keeps focus", async () => {
    @Component({
      imports: [MnAutoComplete],
      template: `<mn-auto-complete
        aria-label="a"
        clearable
        [options]="options"
        [(value)]="text"
      />`,
    })
    class Host {
      options = FRUITS;
      text = "App";
    }
    const fixture = await render(Host);
    const clear = screen.getByRole("button", { name: "Clear" });
    expect(clear).toHaveAttribute("data-part", "clear-button");
    await user().click(clear);
    await settle(fixture);
    expect(fixture.componentInstance.text).toBe("");
    expect(input()).toHaveValue("");
    expect(document.activeElement).toBe(input());
    expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
  });

  it("supports [(value)] two-way binding", async () => {
    const fixture = await render(Search);
    fixture.componentInstance.text.set("Sword");
    await settle(fixture);
    expect(input()).toHaveValue("Sword");
    await user().type(input(), "s");
    await settle(fixture);
    expect(fixture.componentInstance.text()).toBe("Swords");
  });

  it("works with ngModel", async () => {
    @Component({
      imports: [MnAutoComplete, FormsModule],
      template: `<mn-auto-complete
        aria-label="a"
        [options]="options"
        [(ngModel)]="text"
      />`,
    })
    class Host {
      options = FRUITS;
      text = "Ap";
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(input()).toHaveValue("Ap");
    const u = user();
    await u.click(input());
    await settle(fixture);
    await u.click(screen.getByText("Apricot"));
    await settle(fixture);
    expect(fixture.componentInstance.text).toBe("Apricot");
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    @Component({
      imports: [MnAutoComplete, ReactiveFormsModule],
      template: `<mn-auto-complete
        aria-label="a"
        [options]="options"
        [formControl]="control"
      />`,
    })
    class Host {
      options = FRUITS;
      control = new FormControl("", Validators.required);
    }
    const fixture = await render(Host);
    const { control } = fixture.componentInstance;
    expect(input()).not.toHaveAttribute("aria-invalid");
    control.markAsTouched();
    await settle(fixture);
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input().parentElement).toHaveClass("invalid");
    expect(input().parentElement).toHaveAttribute("data-invalid", "");
    await user().type(input(), "Ban");
    await settle(fixture);
    expect(control.value).toBe("Ban");
    expect(input()).not.toHaveAttribute("aria-invalid");
    control.setValue("Cherry");
    await settle(fixture);
    expect(input()).toHaveValue("Cherry");
    control.disable();
    await settle(fixture);
    expect(input()).toBeDisabled();
  });

  it("marks the control touched on blur", async () => {
    @Component({
      imports: [MnAutoComplete, ReactiveFormsModule],
      template: `<mn-auto-complete
          aria-label="a"
          [options]="[]"
          [formControl]="control"
        /><button>x</button>`,
    })
    class Host {
      control = new FormControl("");
    }
    const fixture = await render(Host);
    await user().click(input());
    await user().tab();
    await settle(fixture);
    expect(fixture.componentInstance.control.touched).toBe(true);
  });

  it("takes id, description, invalid, required and disabled from the form field", async () => {
    const disabled = signal(false);
    @Directive({
      selector: "[fakeField]",
      providers: [
        {
          provide: MN_FORM_FIELD,
          useValue: {
            id: signal("q"),
            helperId: signal("field-helper"),
            errorId: signal("field-error"),
            labelId: signal("field-label"),
            invalid: signal(true),
            required: signal(true),
            disabled,
            readOnly: signal(false),
            hasHelperText: signal(false),
            hasErrorMessage: signal(true),
            registerHelperText: () => {},
            registerErrorMessage: () => {},
          } satisfies FormFieldContext,
        },
      ],
    })
    class FakeField {}
    @Component({
      imports: [MnAutoComplete, FakeField],
      template: `<div fakeField>
        <mn-auto-complete aria-label="search" [options]="options" />
        <span id="field-error">Pick a book</span>
      </div>`,
    })
    class Host {
      options = BOOKS;
    }
    const fixture = await render(Host);
    expect(input()).toHaveAttribute("id", "q");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(input()).toHaveAttribute("aria-required", "true");
    expect(input()).toHaveAccessibleDescription("Pick a book");
    expect(input().parentElement).toHaveAttribute("data-required", "");
    disabled.set(true);
    await settle(fixture);
    expect(input()).toBeDisabled();
  });

  it("forwards input attributes (placeholder, size, variant, aria-describedby, prefix / suffix)", async () => {
    @Component({
      imports: [MnAutoComplete],
      template: `<span id="hint">Type a title</span>
        <mn-auto-complete
          aria-label="search"
          aria-describedby="hint"
          placeholder="Search"
          size="small"
          variant="filled"
          prefix="P"
          suffix="S"
          [options]="[]"
        />`,
    })
    class Host {}
    await render(Host);
    expect(input()).toHaveAccessibleDescription("Type a title");
    expect(input()).toHaveAttribute("placeholder", "Search");
    const host = input().closest("mn-auto-complete")!;
    expect(host).not.toHaveAttribute("aria-label");
    expect(host).not.toHaveAttribute("aria-describedby");
    const box = input().parentElement!;
    expect(box).toHaveClass("small", "filled");
    expect(box).toHaveAttribute("data-variant", "filled");
    expect(screen.getByText("P")).toHaveAttribute("data-part", "prefix");
    expect(screen.getByText("S")).toHaveAttribute("data-part", "suffix");
  });
  it("inside a Modal, Escape closes the listbox, then clears the text, then the Modal", async () => {
    @Component({
      imports: [MnAutoComplete, MnModal],
      template: `<mn-modal
        [open]="true"
        (openChange)="openChange($event)"
        title="Find a book"
      >
        <mn-auto-complete aria-label="search" [options]="options" />
      </mn-modal>`,
    })
    class Host {
      options = BOOKS;
      openChange = vi.fn();
    }
    const fixture = await render(Host);
    await settle(fixture);
    const u = user();
    await u.click(input());
    await u.keyboard("Sword");
    await settle(fixture);
    expect(listbox()).not.toBeNull();
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(listbox()).toBeNull();
    expect(input()).toHaveValue("Sword");
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(input()).toHaveValue("");
    expect(fixture.componentInstance.openChange).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(input());
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(fixture.componentInstance.openChange).toHaveBeenCalledWith(false);
  });
});
