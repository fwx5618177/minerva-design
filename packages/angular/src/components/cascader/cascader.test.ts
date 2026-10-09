import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
  settle,
  user as setupUser,
  within,
} from "../../testing";
import { MnFormControl, MnFormHelperText, MnFormLabel } from "../form-control";
import { MnCascader, type CascaderSelectionChange } from "./cascader";
import type { CascaderOption } from "./cascader-panel";

const xihu: CascaderOption = { value: "xihu", label: "West Lake" };
const binjiang: CascaderOption = {
  value: "binjiang",
  label: "Binjiang",
  disabled: true,
};
const hangzhou: CascaderOption = {
  value: "hangzhou",
  label: "Hangzhou",
  children: [xihu, binjiang],
};
const ningbo: CascaderOption = { value: "ningbo", label: "Ningbo" };
const zhejiang: CascaderOption = {
  value: "zhejiang",
  label: "Zhejiang",
  children: [hangzhou, ningbo],
};
const nanjing: CascaderOption = { value: "nanjing", label: "Nanjing" };
const jiangsu: CascaderOption = {
  value: "jiangsu",
  label: "Jiangsu",
  children: [nanjing],
};
const tibet: CascaderOption = {
  value: "tibet",
  label: "Tibet",
  disabled: true,
};
const OPTIONS: CascaderOption[] = [zhejiang, jiangsu, tibet];

const getInput = () => screen.getByRole("combobox");
const getDropdown = () => document.querySelector<HTMLElement>(".dropdown");
const getColumns = () =>
  Array.from(document.querySelectorAll<HTMLElement>(".dropdown .column"));

afterEach(() => {
  document.body.innerHTML = "";
});

/** Inputs of the shared test host (set before rendering it) */
interface HostProps {
  width?: number | string;
  expandTrigger?: "click" | "hover";
  maxLevel?: number;
  defaultValue?: (string | number)[];
  allowClear?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showSearch?: boolean;
  filter?: (text: string, path: CascaderOption[]) => boolean;
  dir?: string;
}
let hostProps: HostProps = {};

@Component({
  imports: [MnCascader],
  template: `<mn-cascader
    class="custom"
    label="Area"
    name="area"
    [options]="options"
    [width]="p.width ?? 240"
    [expandTrigger]="p.expandTrigger ?? 'click'"
    [maxLevel]="p.maxLevel ?? 6"
    [defaultValue]="p.defaultValue"
    [allowClear]="p.allowClear ?? true"
    [disabled]="p.disabled"
    [readOnly]="p.readOnly"
    [showSearch]="p.showSearch ?? false"
    [filter]="p.filter"
    [attr.dir]="p.dir ?? null"
    (valueChange)="valueChange($event)"
    (selectionChange)="selectionChange($event)"
    (openChange)="openChange($event)"
    (clear)="clear()"
    (search)="search($event)"
  />`,
})
class Host {
  readonly p = hostProps;
  options = OPTIONS;
  valueChange = vi.fn();
  selectionChange = vi.fn<(event: CascaderSelectionChange) => void>();
  openChange = vi.fn();
  clear = vi.fn();
  search = vi.fn();
}

async function setup(props: HostProps = {}) {
  hostProps = props;
  const fixture = await render(Host);
  const user = setupUser();
  const app = fixture.componentInstance;
  const click = async (el: Element) => {
    await user.click(el);
    await settle(fixture);
  };
  const press = async (keys: string) => {
    await user.keyboard(keys);
    await settle(fixture);
  };
  return { fixture, user, app, click, press };
}

describe("MnCascader", () => {
  it("renders a read-only combobox with placeholder, name, width and hooks", async () => {
    const { fixture } = await setup({ width: 320 });
    const root = (fixture.nativeElement as HTMLElement).querySelector(
      "mn-cascader",
    )!;
    expect(root).toHaveClass("cascader", "custom");
    expect(root).toHaveStyle({ width: "320px" });
    expect(root).toHaveAttribute("data-minerva", "cascader");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    const input = getInput();
    expect(input).toHaveAttribute("name", "area");
    expect(input).toHaveAttribute("placeholder", "Please select");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveAttribute("aria-label", "Area");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("data-minerva", "input");
    expect(input).toHaveAttribute("data-part", "input");
    const inputRoot = input.parentElement!;
    expect(inputRoot).toHaveClass("root", "unstyled", "medium", "input");
    expect(inputRoot).toHaveAttribute("data-variant", "unstyled");
    expect(inputRoot).toHaveAttribute("data-readonly", "");
    expect(getDropdown()).toBeNull();
  });

  it("opens in a portal, expands children and selects a nested leaf", async () => {
    const { fixture, app, click } = await setup();
    await click(getInput());
    const dropdown = getDropdown()!;
    expect(dropdown).not.toBeNull();
    expect(fixture.nativeElement).not.toContainElement(dropdown);
    expect(dropdown).toHaveAttribute("data-part", "content");
    expect(dropdown).toHaveAttribute("data-state", "open");
    expect(dropdown).toHaveAttribute("data-side", "bottom");
    expect(document.querySelector(".selector")).toHaveClass("focused");
    expect(document.querySelector(".arrow")).toHaveClass("open");
    expect(getInput()).toHaveAttribute("aria-expanded", "true");
    expect(
      within(getColumns()[0])
        .getAllByRole("option")
        .map((li) => li.textContent?.trim()),
    ).toEqual(["Zhejiang", "Jiangsu", "Tibet"]);

    await click(screen.getByText("Zhejiang"));
    expect(app.valueChange).not.toHaveBeenCalled();
    expect(getColumns()).toHaveLength(2);
    await click(screen.getByText("Hangzhou"));
    expect(getColumns()).toHaveLength(3);
    const zj = screen.getByRole("option", { name: "Zhejiang" });
    expect(zj).toHaveAttribute("data-expanded", "");
    expect(zj).toHaveAttribute("aria-controls", getColumns()[1].id);
    await click(screen.getByText("West Lake"));
    expect(app.valueChange).toHaveBeenCalledWith([
      "zhejiang",
      "hangzhou",
      "xihu",
    ]);
    expect(app.selectionChange).toHaveBeenCalledWith({
      value: ["zhejiang", "hangzhou", "xihu"],
      selectedOptions: [zhejiang, hangzhou, xihu],
    });
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou / West Lake");
    expect(getDropdown()).toBeNull();
  });

  it("toggles with the arrow, closes on outside click and emits openChange", async () => {
    const { app, click } = await setup();
    const { openChange } = app;
    const arrow = document.querySelector(".arrow")!;
    await click(arrow);
    expect(getDropdown()).not.toBeNull();
    expect(openChange).toHaveBeenLastCalledWith(true);
    await click(arrow);
    expect(getDropdown()).toBeNull();
    expect(openChange).toHaveBeenLastCalledWith(false);
    await click(arrow);
    await click(document.body);
    expect(getDropdown()).toBeNull();
  });

  it("highlights the selected path when reopened and ignores disabled options", async () => {
    const { app, click } = await setup();
    await click(getInput());
    expect(screen.getByText("Tibet").closest("li")).toHaveClass("disabled");
    await click(screen.getByText("Tibet"));
    expect(app.valueChange).not.toHaveBeenCalled();
    await click(screen.getByText("Jiangsu"));
    await click(screen.getByText("Nanjing"));
    await click(getInput());
    expect(getColumns()).toHaveLength(2);
    expect(screen.getByText("Jiangsu").closest("li")).toHaveClass("active");
    const nj = screen.getByText("Nanjing").closest("li")!;
    expect(nj).toHaveClass("active");
    expect(nj).toHaveAttribute("data-selected", "");
    expect(nj).not.toHaveAttribute("data-expanded");
  });

  it("expands on hover with expandTrigger hover only", async () => {
    const { user, fixture, click } = await setup({ expandTrigger: "hover" });
    await click(getInput());
    await user.hover(screen.getByText("Jiangsu"));
    await settle(fixture);
    expect(getColumns()).toHaveLength(2);
    document.body.innerHTML = "";
    const other = await setup();
    await other.click(getInput());
    await other.user.hover(screen.getByText("Jiangsu"));
    await settle(other.fixture);
    expect(getColumns()).toHaveLength(1);
  });

  it("limits the columns with maxLevel", async () => {
    const { click } = await setup({ maxLevel: 2 });
    await click(getInput());
    await click(screen.getByText("Zhejiang"));
    expect(getColumns()).toHaveLength(2);
    expect(
      screen.getByText("Hangzhou").closest("li")!.querySelector(".expandIcon"),
    ).toBeNull();
    expect(
      screen.getByText("Zhejiang").closest("li")!.querySelector(".expandIcon"),
    ).not.toBeNull();
    await click(screen.getByText("Hangzhou"));
    expect(getDropdown()).toBeNull();
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou");
  });

  it("shows defaultValue labels and clears them", async () => {
    const { app, click } = await setup({
      defaultValue: ["zhejiang", "ningbo"],
    });
    const { clear } = app;
    expect(getInput()).toHaveValue("Zhejiang / Ningbo");
    const button = screen.getByRole("button", { name: "Clear selection" });
    expect(button).toHaveAttribute("data-part", "clear-button");
    await click(button);
    expect(app.valueChange).toHaveBeenCalledWith([]);
    expect(app.selectionChange).toHaveBeenCalledWith({
      value: [],
      selectedOptions: [],
    });
    expect(clear).toHaveBeenCalledTimes(1);
    expect(getInput()).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: "Clear selection" }),
    ).toBeNull();
    expect(getDropdown()).toBeNull();
    expect(getInput()).toHaveFocus();
  });

  it("hides the clear button with allowClear false, disabled or read-only", async () => {
    await setup({ defaultValue: ["jiangsu"], allowClear: false });
    expect(document.querySelector(".clearIcon")).toBeNull();
    document.body.innerHTML = "";
    const { click } = await setup({
      defaultValue: ["jiangsu"],
      disabled: true,
    });
    expect(getInput()).toBeDisabled();
    expect(document.querySelector(".selector")).toHaveClass("disabled");
    expect(document.querySelector(".clearIcon")).toBeNull();
    expect(document.querySelector("mn-cascader")).toHaveAttribute(
      "data-disabled",
      "",
    );
    await click(document.querySelector(".arrow")!);
    expect(getDropdown()).toBeNull();
    document.body.innerHTML = "";
    const ro = await setup({ defaultValue: ["jiangsu"], readOnly: true });
    expect(document.querySelector(".clearIcon")).toBeNull();
    await ro.click(getInput());
    expect(getDropdown()).toBeNull();
  });

  it("follows [(value)] and resolves labels when options arrive later", async () => {
    @Component({
      imports: [MnCascader],
      template: `<mn-cascader
        label="Area"
        name="area"
        [options]="options()"
        [(value)]="value"
      />`,
    })
    class Host {
      options = signal<CascaderOption[]>([]);
      value = signal<(string | number)[] | undefined>(["jiangsu"]);
    }
    const fixture = await render(Host);
    const user = setupUser();
    expect(getInput()).toHaveValue("");
    fixture.componentInstance.options.set(OPTIONS);
    await settle(fixture);
    expect(getInput()).toHaveValue("Jiangsu");
    fixture.componentInstance.value.set(["zhejiang", "hangzhou", "xihu"]);
    await settle(fixture);
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou / West Lake");
    await user.click(getInput());
    await settle(fixture);
    await user.click(screen.getByText("Ningbo"));
    await settle(fixture);
    expect(fixture.componentInstance.value()).toEqual(["zhejiang", "ningbo"]);
  });

  it("uses displayRender, optionRender, optionStyle and dropdown class / style", async () => {
    const displayRender = vi.fn((labels: string[]) => labels.join(" > "));
    @Component({
      imports: [MnCascader],
      template: `<ng-template #opt let-option let-level="level"
          ><span>{{ option.label }}-L{{ level }}</span></ng-template
        >
        <mn-cascader
          label="Area"
          name="area"
          [options]="options"
          [displayRender]="displayRender"
          [optionRender]="opt"
          [optionStyle]="{ color: 'rgb(255, 0, 0)' }"
          dropdownClassName="myDropdown"
          [dropdownStyle]="{ 'background-color': 'rgb(0, 0, 255)' }"
        />`,
    })
    class Host {
      options = OPTIONS;
      displayRender = displayRender;
    }
    const fixture = await render(Host);
    const user = setupUser();
    await user.click(getInput());
    await settle(fixture);
    expect(getDropdown()).toHaveClass("dropdown", "myDropdown");
    expect(getDropdown()).toHaveStyle({ backgroundColor: "rgb(0, 0, 255)" });
    expect(screen.getByText("Zhejiang-L0").closest("li")).toHaveStyle({
      color: "rgb(255, 0, 0)",
    });
    await user.click(screen.getByText("Jiangsu-L0"));
    await settle(fixture);
    await user.click(screen.getByText("Nanjing-L1"));
    await settle(fixture);
    expect(displayRender).toHaveBeenLastCalledWith(
      ["Jiangsu", "Nanjing"],
      [jiangsu, nanjing],
    );
    expect(getInput()).toHaveValue("Jiangsu > Nanjing");
  });

  describe("search", () => {
    it("searches across levels, emits search and selects a result", async () => {
      const { user, fixture, app, click } = await setup({ showSearch: true });
      const { search } = app;
      const input = getInput();
      expect(input).not.toHaveAttribute("readonly");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      await click(input);
      await user.type(input, "hang", { skipClick: true });
      await settle(fixture);
      expect(search).toHaveBeenLastCalledWith("hang");
      const results = Array.from(document.querySelectorAll(".searchOption"));
      expect(results.map((r) => r.textContent?.trim())).toEqual([
        "Zhejiang / Hangzhou",
        "Zhejiang / Hangzhou / West Lake",
      ]);
      expect(results[0]).toHaveAttribute("data-part", "item");
      expect(input).toHaveValue("hang");
      await click(screen.getByText("Zhejiang / Hangzhou / West Lake"));
      expect(app.valueChange).toHaveBeenCalledWith([
        "zhejiang",
        "hangzhou",
        "xihu",
      ]);
      expect(input).toHaveValue("Zhejiang / Hangzhou / West Lake");
      expect(getDropdown()).toBeNull();
    });

    it("shows an empty message, excludes disabled branches and supports filter", async () => {
      const filter = vi.fn((text: string, path: CascaderOption[]) =>
        path.some((o) => String(o.value) === text),
      );
      const { user, fixture, click } = await setup({
        showSearch: true,
        filter,
      });
      await click(getInput());
      await user.type(getInput(), "jiangsu", { skipClick: true });
      await settle(fixture);
      expect(filter).toHaveBeenCalledWith("jiangsu", [jiangsu]);
      expect(filter).not.toHaveBeenCalledWith("jiangsu", [tibet]);
      expect(
        Array.from(document.querySelectorAll(".searchOption")).map((r) =>
          r.textContent?.trim(),
        ),
      ).toEqual(["Jiangsu", "Jiangsu / Nanjing"]);
      await user.type(getInput(), "zzz", { skipClick: true });
      await settle(fixture);
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("moves from the input into the results and selects with Enter", async () => {
      const { user, fixture, app, press } = await setup({ showSearch: true });
      getInput().focus();
      await user.keyboard("hang");
      await settle(fixture);
      expect(getDropdown()).not.toBeNull();
      await press("{ArrowDown}");
      const results = screen.getAllByRole("option");
      expect(results[0]).toHaveFocus();
      await press("{ArrowDown}");
      expect(results[1]).toHaveFocus();
      await press("{ArrowUp}{ArrowUp}");
      expect(results[1]).toHaveFocus();
      await press("{Enter}");
      expect(app.valueChange).toHaveBeenCalledWith([
        "zhejiang",
        "hangzhou",
        "xihu",
      ]);
      expect(getInput()).toHaveFocus();
    });

    it("Escape closes and resets the search text", async () => {
      const { user, fixture, press } = await setup({ showSearch: true });
      getInput().focus();
      await user.keyboard("nan");
      await settle(fixture);
      expect(
        screen.getByRole("option", { name: "Jiangsu / Nanjing" }),
      ).toBeInTheDocument();
      await press("{Escape}");
      expect(getDropdown()).toBeNull();
      expect(getInput()).toHaveValue("");
    });
  });

  describe("lazy loading", () => {
    @Component({
      imports: [MnCascader],
      template: `<mn-cascader
        label="Team"
        name="team"
        [options]="options()"
        [loadData]="load"
        (valueChange)="changed($event)"
      />`,
    })
    class LazyHost {
      options = signal<CascaderOption[]>([
        { value: "fe", label: "Frontend" },
        { value: "docs", label: "Docs", isLeaf: true },
      ]);
      changed = vi.fn();
      finish: () => void = () => {};
      loadData = vi.fn();
      load = (path: CascaderOption[]) => {
        this.loadData(path);
        const target = path[path.length - 1];
        const patch = (fn: (o: CascaderOption) => CascaderOption) =>
          this.options.update((prev) =>
            prev.map((o) => (o.value === target.value ? fn(o) : o)),
          );
        patch((o) => ({ ...o, loading: true }));
        this.finish = () =>
          patch((o) => ({
            ...o,
            loading: false,
            children: [
              { value: "a", label: "Team A", isLeaf: true },
              { value: "b", label: "Team B", isLeaf: true },
            ],
          }));
      };
    }

    it("loads children of a lazy option instead of selecting it", async () => {
      const fixture = await render(LazyHost);
      const app = fixture.componentInstance;
      const user = setupUser();
      await user.click(getInput());
      await settle(fixture);
      await user.click(screen.getByText("Frontend"));
      await settle(fixture);
      expect(app.loadData).toHaveBeenCalledWith([
        expect.objectContaining({ value: "fe" }),
      ]);
      expect(app.changed).not.toHaveBeenCalled();
      const fe = screen.getByRole("option", { name: /Frontend/ });
      expect(fe).toHaveAttribute("aria-busy", "true");
      expect(fe).toHaveAttribute("data-loading", "");
      expect(fe).toHaveAttribute("data-expanded", "");
      expect(within(fe).getByText("...")).toBeInTheDocument();
      app.finish();
      await settle(fixture);
      expect(getColumns()).toHaveLength(2);
      await user.click(screen.getByText("Team B"));
      await settle(fixture);
      expect(app.changed).toHaveBeenCalledWith(["fe", "b"]);
      expect(getInput()).toHaveValue("Frontend / Team B");
      await user.click(getInput());
      await settle(fixture);
      await user.click(screen.getByText("Docs"));
      await settle(fixture);
      expect(app.loadData).toHaveBeenCalledTimes(1);
      expect(app.changed).toHaveBeenLastCalledWith(["docs"]);
    });

    it("moves focus into a lazily loaded column with ArrowRight", async () => {
      const fixture = await render(LazyHost);
      const user = setupUser();
      getInput().focus();
      await user.keyboard("{ArrowDown}");
      await settle(fixture);
      expect(screen.getByRole("option", { name: "Frontend" })).toHaveFocus();
      await user.keyboard("{ArrowRight}");
      await settle(fixture);
      fixture.componentInstance.finish();
      await settle(fixture);
      expect(screen.getByRole("option", { name: "Team A" })).toHaveFocus();
    });
  });

  describe("keyboard / a11y", () => {
    it.each([
      ["Enter", "{Enter}"],
      ["Space", " "],
      ["ArrowDown", "{ArrowDown}"],
    ])(
      "%s opens from the input and focuses the first option",
      async (_, keys) => {
        const { user, press } = await setup();
        await user.tab();
        expect(getInput()).toHaveFocus();
        expect(getDropdown()).toBeNull();
        await press(keys);
        expect(getInput()).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      },
    );

    it("navigates columns, picks a leaf and returns focus to the input", async () => {
      const { app, press } = await setup();
      getInput().focus();
      await press("{Enter}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await press("{End}");
      expect(screen.getByRole("option", { name: "Jiangsu" })).toHaveFocus();
      await press("{Home}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await press("{ArrowRight}");
      expect(screen.getByRole("option", { name: "Hangzhou" })).toHaveFocus();
      await press("{ArrowLeft}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await press("{ArrowRight}");
      await press("{ArrowDown}");
      await press("{Enter}");
      expect(app.valueChange).toHaveBeenCalledWith(["zhejiang", "ningbo"]);
      expect(getDropdown()).toBeNull();
      expect(getInput()).toHaveFocus();
      await press("{ArrowDown}");
      // reopens on the selected path
      expect(screen.getByRole("option", { name: "Ningbo" })).toHaveFocus();
      expect(screen.getByRole("option", { name: "Ningbo" })).toHaveAttribute(
        "data-selected",
        "",
      );
      await press("{Escape}");
      expect(getDropdown()).toBeNull();
      expect(getInput()).toHaveFocus();
    });

    it("ArrowLeft on the first column returns to the input", async () => {
      const { press } = await setup();
      getInput().focus();
      await press(" ");
      await press("{ArrowLeft}");
      expect(getDropdown()).toBeNull();
      expect(getInput()).toHaveFocus();
    });

    it("swaps the horizontal arrows in RTL", async () => {
      const { press } = await setup({ dir: "rtl" });
      getInput().focus();
      await press("{Enter}");
      expect(getDropdown()).toHaveAttribute("dir", "rtl");
      await press("{ArrowLeft}");
      expect(screen.getByRole("option", { name: "Hangzhou" })).toHaveFocus();
      await press("{ArrowRight}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
    });

    it("names the columns and closes when focus leaves with Tab", async () => {
      const { press } = await setup();
      getInput().focus();
      await press("{ArrowDown}");
      expect(
        screen.getByRole("listbox", { name: "Area, level 1" }),
      ).toHaveAttribute("data-part", "column");
      await press("{Tab}");
      expect(getDropdown()).toBeNull();
    });

    it("operates the clear button with the keyboard", async () => {
      const { app, press } = await setup({ defaultValue: ["jiangsu"] });
      screen.getByRole("button", { name: "Clear selection" }).focus();
      await press("{Enter}");
      expect(app.valueChange).toHaveBeenCalledWith([]);
    });
  });

  describe("forms", () => {
    it("works with ngModel", async () => {
      @Component({
        imports: [MnCascader, FormsModule],
        template: `<mn-cascader
          label="Area"
          name="area"
          [options]="options"
          [(ngModel)]="value"
        />`,
      })
      class Host {
        options = OPTIONS;
        value = signal<(string | number)[]>(["jiangsu", "nanjing"]);
      }
      const fixture = await render(Host);
      await settle(fixture);
      expect(getInput()).toHaveValue("Jiangsu / Nanjing");
      const user = setupUser();
      await user.click(screen.getByRole("button", { name: "Clear selection" }));
      await settle(fixture);
      expect(fixture.componentInstance.value()).toEqual([]);
      fixture.componentInstance.value.set(["zhejiang", "ningbo"]);
      await settle(fixture);
      expect(getInput()).toHaveValue("Zhejiang / Ningbo");
    });

    it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
      @Component({
        imports: [MnCascader, ReactiveFormsModule],
        template: `<mn-cascader
            label="Area"
            name="area"
            [options]="options"
            [formControl]="control"
          />
          <button type="button">Next</button>`,
      })
      class Host {
        options = OPTIONS;
        control = new FormControl<(string | number)[] | null>(
          null,
          Validators.required,
        );
      }
      const fixture = await render(Host);
      const user = setupUser();
      const input = getInput();
      const root = document.querySelector("mn-cascader")!;
      expect(input).not.toHaveAttribute("aria-invalid");
      input.focus();
      await user.tab();
      await settle(fixture);
      expect(fixture.componentInstance.control.touched).toBe(true);
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(root).toHaveAttribute("data-invalid", "");
      expect(input.parentElement).toHaveClass("invalid");
      await user.click(input);
      await settle(fixture);
      await user.click(screen.getByText("Jiangsu"));
      await settle(fixture);
      await user.click(screen.getByText("Nanjing"));
      await settle(fixture);
      expect(fixture.componentInstance.control.value).toEqual([
        "jiangsu",
        "nanjing",
      ]);
      expect(input).not.toHaveAttribute("aria-invalid");
      fixture.componentInstance.control.setValue(["zhejiang"]);
      await settle(fixture);
      expect(input).toHaveValue("Zhejiang");
      fixture.componentInstance.control.disable();
      await settle(fixture);
      expect(input).toBeDisabled();
      expect(root).toHaveAttribute("data-disabled", "");
    });

    it("takes the field's id, label, description and states; explicit inputs win", async () => {
      @Component({
        imports: [MnCascader, MnFormControl, MnFormLabel, MnFormHelperText],
        template: `<mn-form-control id="region" required>
            <mn-form-label>Region</mn-form-label>
            <mn-cascader
              label="Fallback"
              name="region"
              [options]="options"
              aria-describedby="extra"
            />
            <mn-form-helper-text>Pick a city</mn-form-helper-text>
          </mn-form-control>
          <mn-form-control disabled>
            <mn-form-label>Own</mn-form-label>
            <mn-cascader
              label="Own"
              name="own"
              [options]="options"
              [disabled]="false"
              [required]="false"
              id="own"
            />
          </mn-form-control>`,
      })
      class Host {
        options = OPTIONS;
      }
      const fixture = await render(Host);
      await settle(fixture);
      const input = screen.getByRole("combobox", { name: "Region" });
      expect(input).toHaveAttribute("id", "region");
      expect(input).toHaveAttribute("aria-required", "true");
      expect(input).toBeRequired();
      const ids = input.getAttribute("aria-describedby")?.split(" ");
      expect(ids).toEqual(expect.arrayContaining(["extra"]));
      expect(ids!.length).toBe(2);
      const own = screen.getByRole("combobox", { name: "Own" });
      expect(own).toHaveAttribute("id", "own");
      // (jest-dom's toBeDisabled also reads the disabled custom element ancestor)
      expect((own as HTMLInputElement).disabled).toBe(false);
      expect(own).not.toHaveAttribute("aria-required");
    });
  });
});
