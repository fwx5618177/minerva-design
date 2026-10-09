import { Component, signal } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { describe, expect, it, vi } from "vitest";
import { MN_FORM_FIELD, type FormFieldContext } from "../../internal/forms";
import { render, screen, settle, user as setup, within } from "../../testing";
import { renderToString } from "../../testing/ssr";
import { MnSelect } from "./select";
import {
  MnSelectGroup,
  MnSelectItem,
  MnSelectLabel,
  MnSelectSeparator,
} from "./select-item";

const imports = [
  MnSelect,
  MnSelectItem,
  MnSelectGroup,
  MnSelectLabel,
  MnSelectSeparator,
];

const LANGS = `
  <mn-select-item value="zh">Chinese</mn-select-item>
  <mn-select-item value="en">English</mn-select-item>
  <mn-select-separator data-testid="sep" />
  <mn-select-group data-testid="group">
    <mn-select-label>Experimental</mn-select-label>
    <mn-select-item value="ja" disabled>Japanese</mn-select-item>
  </mn-select-group>
`;

const field = (
  overrides: Partial<Record<keyof FormFieldContext, unknown>> = {},
): FormFieldContext => {
  const value = <T>(key: keyof FormFieldContext, fallback: T) =>
    signal((overrides[key] as T) ?? fallback).asReadonly();
  return {
    id: value("id", "field"),
    helperId: value("helperId", "field-helper"),
    errorId: value("errorId", "field-error"),
    labelId: value("labelId", "field-label"),
    invalid: value("invalid", false),
    required: value("required", false),
    disabled: value("disabled", false),
    readOnly: value("readOnly", false),
    hasHelperText: value("hasHelperText", false),
    hasErrorMessage: value("hasErrorMessage", false),
    registerHelperText: () => {},
    registerErrorMessage: () => {},
  };
};

const trigger = (name = "Language") => screen.getByRole("combobox", { name });
const listbox = () => screen.getByRole("listbox");
const option = (name: string) => screen.getByRole("option", { name });
const nativeSelect = () =>
  document.querySelector("select") as HTMLSelectElement;

/** Waits for the listbox to mount and settle (highlight, focus) */
const stable = async (fixture: ComponentFixture<unknown>) => {
  await settle(fixture);
  await settle(fixture);
};

describe("MnSelect", () => {
  it("renders a combobox trigger with placeholder, classes and hooks", async () => {
    @Component({
      imports,
      template: `<mn-select aria-label="Language" placeholder="Pick one"
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    await render(Host);
    const t = trigger();
    expect(t.tagName).toBe("BUTTON");
    expect(t).toHaveAttribute("type", "button");
    expect(t).toHaveAttribute("aria-haspopup", "listbox");
    expect(t).toHaveTextContent("Pick one");
    expect(t).toHaveAttribute("aria-expanded", "false");
    expect(t).not.toHaveAttribute("aria-controls");
    expect(t).toHaveClass("trigger", "medium");
    expect(t).toHaveAttribute("data-component", "select");
    expect(t).toHaveAttribute("data-placeholder", "");
    expect(t).toHaveAttribute("data-minerva", "select");
    expect(t).toHaveAttribute("data-part", "root");
    expect(t).toHaveAttribute("data-state", "closed");
    expect(t).toHaveAttribute("data-size", "medium");
    expect(t).not.toHaveAttribute("aria-invalid");
    expect(t.querySelector(".value")).toHaveTextContent("Pick one");
    expect(t.querySelector(".icon svg")).not.toBeNull();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("applies size, className and the invalid / required states", async () => {
    @Component({
      imports,
      template: `<mn-select
        aria-label="Language"
        size="small"
        className="consumer"
        invalid
        required
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    await render(Host);
    const t = trigger();
    expect(t).toHaveClass("small", "consumer", "invalid");
    expect(t).toHaveAttribute("aria-invalid", "true");
    expect(t).toHaveAttribute("aria-required", "true");
    expect(t).toHaveAttribute("data-invalid", "");
    expect(t).toHaveAttribute("data-required", "");
  });

  it("opens on click, lists options and selects one ([(value)], valueChange)", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select
        aria-label="Language"
        placeholder="Pick one"
        contentClassName="popup"
        [(value)]="value"
        (openChange)="opened($event)"
        >${LANGS}</mn-select
      >`,
    })
    class Host {
      value = signal<string | undefined>(undefined);
      opened = vi.fn();
    }
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    const lb = listbox();
    expect(lb).toHaveClass("content", "popup");
    expect(lb).toHaveAttribute("data-minerva", "select");
    expect(lb).toHaveAttribute("data-part", "content");
    expect(lb).toHaveAttribute("data-state", "open");
    expect(lb).toHaveAttribute("data-side", "bottom");
    expect(lb).toHaveAccessibleName("Language");
    expect(trigger()).toHaveAttribute("aria-controls", lb.id);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
      "Chinese",
      "English",
      "Japanese",
    ]);
    expect(option("Chinese")).toHaveClass("item");
    expect(option("Chinese").querySelector(".itemText")).toHaveTextContent(
      "Chinese",
    );
    expect(screen.getByText("Experimental")).toHaveClass("label");
    expect(screen.getByTestId("sep")).toHaveClass("separator");
    await user.click(option("English"));
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe("en");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveTextContent("English");
    expect(trigger()).not.toHaveAttribute("data-placeholder");
    expect(trigger()).toHaveFocus();
    expect(fixture.componentInstance.opened.mock.calls).toEqual([
      [true],
      [false],
    ]);
    fixture.componentInstance.value.set("zh");
    await settle(fixture);
    expect(trigger()).toHaveTextContent("Chinese");
  });

  it("shows defaultValue and marks the item selected", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select aria-label="Language" defaultValue="zh"
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    expect(trigger()).toHaveTextContent("Chinese");
    await user.click(trigger());
    await stable(fixture);
    const zh = option("Chinese");
    expect(zh).toHaveAttribute("aria-selected", "true");
    expect(zh).toHaveAttribute("data-minerva", "option");
    expect(zh).toHaveAttribute("data-selected", "");
    expect(zh.querySelector(".itemIndicator")).not.toBeNull();
    expect(option("English")).toHaveAttribute("aria-selected", "false");
  });

  it("supports [(open)] and does not open while disabled", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select
        aria-label="Language"
        [(open)]="open"
        [disabled]="disabled()"
        >${LANGS}</mn-select
      >`,
    })
    class Host {
      open = signal<boolean | undefined>(false);
      disabled = signal(false);
    }
    const fixture = await render(Host);
    fixture.componentInstance.open.set(true);
    await stable(fixture);
    expect(listbox()).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(fixture.componentInstance.open()).toBe(false);
    expect(screen.queryByRole("listbox")).toBeNull();
    fixture.componentInstance.disabled.set(true);
    await settle(fixture);
    expect(trigger()).toBeDisabled();
    await user.click(trigger());
    await settle(fixture);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("does not select disabled items", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select
        aria-label="Language"
        (valueChange)="changed($event)"
        >${LANGS}</mn-select
      >`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    const ja = option("Japanese");
    expect(ja).toHaveAttribute("aria-disabled", "true");
    expect(ja).toHaveAttribute("data-disabled", "");
    await user.click(ja);
    await user.hover(ja);
    await settle(fixture);
    expect(ja).not.toHaveAttribute("data-highlighted");
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
  });

  it("labels groups with their label, hides separators, leaves unlabelled groups", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select aria-label="Language">${LANGS}</mn-select>
        <mn-select aria-label="Other">
          <mn-select-group
            ><mn-select-item value="a">A</mn-select-item></mn-select-group
          >
        </mn-select>`,
    })
    class Host {}
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    const group = screen.getByRole("group", { name: "Experimental" });
    expect(group).toHaveAttribute("data-minerva", "option-group");
    expect(within(group).getByRole("option", { name: "Japanese" })).toBe(
      option("Japanese"),
    );
    expect(screen.getByTestId("sep")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("separator")).toBeNull();
    await user.keyboard("{Escape}");
    await settle(fixture);
    await user.click(trigger("Other"));
    await stable(fixture);
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-labelledby");
  });
});

describe("MnSelect keyboard", () => {
  @Component({
    imports,
    template: `<button type="button">Before</button>
      <mn-select
        aria-label="Language"
        [defaultValue]="defaultValue"
        (valueChange)="changed($event)"
        (openChange)="opened($event)"
        >${LANGS}</mn-select
      >
      <button type="button">After</button>`,
  })
  class Langs {
    defaultValue: string | undefined = undefined;
    changed = vi.fn();
    opened = vi.fn();
  }

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
    ["ArrowUp", "{ArrowUp}"],
  ])("opens with %s and focuses the selected option", async (_, keys) => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select aria-label="Language" defaultValue="en"
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    trigger().focus();
    await user.keyboard(keys);
    await stable(fixture);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(option("English")).toHaveFocus();
    expect(option("English")).toHaveAttribute("data-highlighted", "");
  });

  it("highlights the first enabled option without a value, the last with ArrowUp, Home / End", async () => {
    const user = setup();
    const fixture = await render(Langs);
    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await stable(fixture);
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle(fixture);
    expect(trigger()).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    await stable(fixture);
    // Japanese is disabled: the last enabled option is English.
    expect(option("English")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle(fixture);
    await user.keyboard("{Home}");
    await stable(fixture);
    expect(option("Chinese")).toHaveFocus();
    await user.keyboard("{Escape}");
    await settle(fixture);
    await user.keyboard("{End}");
    await stable(fixture);
    expect(option("English")).toHaveFocus();
  });

  it("moves without wrapping, skips disabled options, Home / End / PageUp / PageDown", async () => {
    const user = setup();
    @Component({
      imports: [MnSelect, MnSelectItem],
      template: `<mn-select aria-label="Language">
        <mn-select-item value="a">Alpha</mn-select-item>
        <mn-select-item value="b" disabled>Beta</mn-select-item>
        <mn-select-item value="c">Gamma</mn-select-item>
        <mn-select-item value="d">Delta</mn-select-item>
      </mn-select>`,
    })
    class Host {}
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    const press = async (keys: string) => {
      await user.keyboard(keys);
      await settle(fixture);
    };
    expect(option("Alpha")).toHaveFocus();
    await press("{ArrowUp}");
    expect(option("Alpha")).toHaveFocus();
    await press("{ArrowDown}");
    expect(option("Gamma")).toHaveFocus();
    await press("{ArrowDown}{ArrowDown}");
    expect(option("Delta")).toHaveFocus();
    expect(option("Delta")).toHaveAttribute("data-highlighted");
    expect(option("Gamma")).not.toHaveAttribute("data-highlighted");
    await press("{Home}");
    expect(option("Alpha")).toHaveFocus();
    await press("{End}");
    expect(option("Delta")).toHaveFocus();
    await press("{PageUp}");
    expect(option("Alpha")).toHaveFocus();
    await press("{PageDown}");
    expect(option("Delta")).toHaveFocus();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["Alt+ArrowUp", "{Alt>}{ArrowUp}{/Alt}"],
  ])(
    "selects with %s, closes and returns focus to the trigger",
    async (_, key) => {
      const user = setup();
      const fixture = await render(Langs);
      await user.click(trigger());
      await stable(fixture);
      await user.keyboard("{ArrowDown}");
      await settle(fixture);
      await user.keyboard(key);
      await settle(fixture);
      const host = fixture.componentInstance;
      expect(host.changed).toHaveBeenCalledExactlyOnceWith("en");
      expect(screen.queryByRole("listbox")).toBeNull();
      expect(trigger()).toHaveFocus();
      expect(trigger()).toHaveTextContent("English");
      // The keyup of Space on the trigger does not reopen it.
      expect(host.opened.mock.calls).toEqual([[true], [false]]);
    },
  );

  it("Escape closes without selecting", async () => {
    const user = setup();
    const fixture = await render(Langs);
    await user.click(trigger());
    await stable(fixture);
    await user.keyboard("{ArrowDown}{Escape}");
    await settle(fixture);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
    expect(trigger()).toHaveFocus();
  });

  it("Tab closes the listbox and moves on in the natural tab order", async () => {
    const user = setup();
    const fixture = await render(Langs);
    await user.click(trigger());
    await stable(fixture);
    expect(option("Chinese")).toHaveFocus();
    await user.tab();
    await settle(fixture);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
  });

  it("typeahead on the closed trigger changes the selection without opening", async () => {
    const user = setup();
    const fixture = await render(Langs);
    trigger().focus();
    await user.keyboard("e");
    await settle(fixture);
    const host = fixture.componentInstance;
    expect(host.changed).toHaveBeenLastCalledWith("en");
    expect(trigger()).toHaveTextContent("English");
    expect(screen.queryByRole("listbox")).toBeNull();
    // Disabled options are never matched.
    await user.keyboard("j");
    expect(host.changed).toHaveBeenCalledTimes(1);
    await new Promise((r) => setTimeout(r, 600));
    await user.keyboard("c");
    await settle(fixture);
    expect(host.changed).toHaveBeenLastCalledWith("zh");
    expect(trigger()).toHaveTextContent("Chinese");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("typeahead in the open listbox moves the highlight (textValue, space continues)", async () => {
    const user = setup();
    @Component({
      imports: [MnSelect, MnSelectItem],
      template: `<mn-select
        aria-label="Language"
        (valueChange)="changed($event)"
      >
        <mn-select-item value="nz">New Zealand</mn-select-item>
        <mn-select-item value="ny" textValue="New York"
          ><b>NY</b></mn-select-item
        >
        <mn-select-item value="no">Norway</mn-select-item>
      </mn-select>`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    await user.keyboard("nor");
    await settle(fixture);
    expect(option("Norway")).toHaveFocus();
    await new Promise((r) => setTimeout(r, 600));
    await user.keyboard("new y");
    await settle(fixture);
    expect(option("NY")).toHaveFocus();
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
    expect(listbox()).toBeInTheDocument();
  });

  it("scrolls the highlighted option into view on keyboard moves", async () => {
    const user = setup();
    const spy = vi
      .spyOn(HTMLElement.prototype, "scrollIntoView")
      .mockImplementation(() => {});
    try {
      const fixture = await render(Langs);
      await user.click(trigger());
      await stable(fixture);
      await user.keyboard("{ArrowDown}");
      await settle(fixture);
      expect(spy.mock.contexts.at(-1)).toBe(option("English"));
      expect(spy).toHaveBeenCalledWith({ block: "nearest" });
    } finally {
      spy.mockRestore();
    }
  });
});

describe("MnSelect pointer", () => {
  it("highlights (and focuses) options on hover", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select aria-label="Language" defaultValue="zh"
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    await user.hover(option("English"));
    await settle(fixture);
    expect(option("English")).toHaveAttribute("data-highlighted");
    expect(option("English")).toHaveFocus();
    expect(option("Chinese")).not.toHaveAttribute("data-highlighted");
    expect(option("Chinese")).toHaveAttribute("data-selected", "");
  });

  it("closes on an outside pointer down and on a second click on the trigger", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<p>Outside</p>
        <mn-select aria-label="Language">${LANGS}</mn-select>`,
    })
    class Host {}
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    await user.click(screen.getByText("Outside"));
    await settle(fixture);
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.click(trigger());
    await stable(fixture);
    expect(listbox()).toBeInTheDocument();
    await user.click(trigger());
    await settle(fixture);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("clicking the selected option closes without valueChange", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<mn-select
        aria-label="Language"
        defaultValue="zh"
        (valueChange)="changed($event)"
        >${LANGS}</mn-select
      >`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await user.click(trigger());
    await stable(fixture);
    await user.click(option("Chinese"));
    await settle(fixture);
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveFocus();
  });
});

describe("MnSelect forms", () => {
  it("renders a hidden native select listing every value (name, required, disabled)", async () => {
    @Component({
      imports,
      template: `<mn-select aria-label="Language" name="lang" required disabled
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const native = nativeSelect();
    expect(native).toHaveAttribute("aria-hidden", "true");
    expect(native.tabIndex).toBe(-1);
    expect(native).toBeRequired();
    expect(native).toBeDisabled();
    expect(native).toHaveAttribute("name", "lang");
    expect(Array.from(native.options, (o) => o.value)).toEqual([
      "",
      "zh",
      "en",
      "ja",
    ]);
  });

  it("submits the value through FormData and restores defaultValue on reset", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<form>
        <mn-select aria-label="Language" name="lang" defaultValue="zh"
          >${LANGS}</mn-select
        >
      </form>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const form = document.querySelector("form")!;
    expect(new FormData(form).get("lang")).toBe("zh");
    await user.click(trigger());
    await stable(fixture);
    await user.click(option("English"));
    await settle(fixture);
    expect(new FormData(form).get("lang")).toBe("en");
    form.reset();
    await settle(fixture);
    expect(trigger()).toHaveTextContent("Chinese");
    expect(new FormData(form).get("lang")).toBe("zh");
  });

  it("validates required through the native select", async () => {
    const user = setup();
    @Component({
      imports,
      template: `<form>
        <mn-select aria-label="Language" name="lang" required
          >${LANGS}</mn-select
        >
      </form>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const native = nativeSelect();
    expect(native.validity.valueMissing).toBe(true);
    await user.click(trigger());
    await stable(fixture);
    await user.click(option("Chinese"));
    await settle(fixture);
    expect(native.validity.valueMissing).toBe(false);
  });

  it("forwards focus from the native select to the trigger", async () => {
    @Component({
      imports,
      template: `<mn-select aria-label="Language" name="lang"
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    await render(Host);
    nativeSelect().focus();
    expect(trigger()).toHaveFocus();
  });

  it("works with ngModel", async () => {
    const user = setup();
    @Component({
      imports: [...imports, FormsModule],
      template: `<mn-select aria-label="Language" [(ngModel)]="value"
        >${LANGS}</mn-select
      >`,
    })
    class Host {
      value = "en";
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(trigger()).toHaveTextContent("English");
    await user.click(trigger());
    await stable(fixture);
    await user.click(option("Chinese"));
    await settle(fixture);
    expect(fixture.componentInstance.value).toBe("zh");
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const user = setup();
    @Component({
      imports: [...imports, ReactiveFormsModule],
      template: `<mn-select aria-label="Language" [formControl]="control"
        >${LANGS}</mn-select
      >`,
    })
    class Host {
      control = new FormControl("", Validators.required);
    }
    const fixture = await render(Host);
    const control = fixture.componentInstance.control;
    expect(trigger()).not.toHaveAttribute("aria-invalid");
    control.markAsTouched();
    await settle(fixture);
    expect(trigger()).toHaveAttribute("aria-invalid", "true");
    expect(trigger()).toHaveClass("invalid");
    await user.click(trigger());
    await stable(fixture);
    await user.click(option("English"));
    await settle(fixture);
    expect(control.value).toBe("en");
    expect(trigger()).not.toHaveAttribute("aria-invalid");
    control.setValue("zh");
    await settle(fixture);
    expect(trigger()).toHaveTextContent("Chinese");
    control.disable();
    await settle(fixture);
    expect(trigger()).toBeDisabled();
  });

  it("inherits id, invalid, required, description and disabled from a field", async () => {
    @Component({
      imports,
      providers: [
        {
          provide: MN_FORM_FIELD,
          useValue: field({
            id: "lang",
            invalid: true,
            required: true,
            disabled: true,
            hasErrorMessage: true,
          }),
        },
      ],
      template: `<label for="lang">Lang</label>
        <mn-select placeholder="Pick" aria-describedby="extra"
          >${LANGS}</mn-select
        >`,
    })
    class Host {}
    await render(Host);
    const t = trigger("Lang");
    expect(t).toHaveAttribute("id", "lang");
    expect(t).toHaveAttribute("aria-invalid", "true");
    expect(t).toHaveAttribute("aria-required", "true");
    expect(t).toHaveAttribute("aria-describedby", "field-error extra");
    expect(t).toHaveClass("invalid");
    expect(t).toBeDisabled();
  });

  it("lets an explicit disabled=false override the field and names the listbox after its label", async () => {
    const user = setup();
    @Component({
      imports,
      providers: [
        { provide: MN_FORM_FIELD, useValue: field({ disabled: true }) },
      ],
      template: `<span id="field-label">Genre</span>
        <mn-select aria-labelledby="field-label" [disabled]="false"
          >${LANGS}</mn-select
        >`,
    })
    class Host {}
    const fixture = await render(Host);
    expect(trigger("Genre")).toBeEnabled();
    await user.click(trigger("Genre"));
    await stable(fixture);
    expect(screen.getByRole("listbox", { name: "Genre" })).toBeInTheDocument();
  });
});

describe("MnSelect server rendering", () => {
  it("renders the selected label (also nested in a group) and no listbox", async () => {
    @Component({
      selector: "mn-ssr-host",
      imports,
      template: `<mn-select aria-label="Language" defaultValue="ja" defaultOpen
        >${LANGS}</mn-select
      >`,
    })
    class Host {}
    const html = await renderToString(Host);
    expect(html).toMatch(/<span>Japanese<\/span><\/span>/);
    expect(html).not.toContain("data-placeholder");
    expect(html).not.toContain('role="listbox"');
  });
});
