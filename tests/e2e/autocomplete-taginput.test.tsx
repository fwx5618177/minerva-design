// Ported from @novel-isr/ui tests/e2e/autocomplete-taginput.test.tsx.
//
// E2E: Autocomplete (book search box) and TagInput (tag editor inside a form).
// Runs through Minerva's native API (AutoComplete with `{ value, label,
// description, group }` options, TagInput `onChange`); every visible string is
// consumer-provided, so no locale switch is needed. A final block replays
// original scenarios verbatim through @minerva/lib-core/compat.
import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  AutoComplete,
  Button,
  FormField,
  FormLayout,
  TagInput,
  type AutoCompleteOption,
} from "@minerva/lib-core";
import * as compat from "@minerva/lib-core/compat";

const BOOKS: AutoCompleteOption[] = [
  {
    value: "lotm",
    label: "诡秘之主",
    description: "爱潜水的乌贼",
    group: "玄幻",
  },
  { value: "ct", label: "赤心巡天", description: "情何以甚", group: "玄幻" },
  { value: "santi", label: "三体", description: "刘慈欣", group: "科幻" },
  { value: "qiu", label: "球状闪电", description: "刘慈欣", group: "科幻" },
];

// novel's Autocomplete matches the title or the hint (author)
const matchesTitleOrAuthor = (query: string, option: AutoCompleteOption) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    option.label.toLowerCase().includes(q) ||
    !!option.description?.toLowerCase().includes(q)
  );
};

function SearchHeader() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("（无）");
  return (
    <header>
      <AutoComplete
        textFieldProps={{ ariaLabel: "搜索书籍" }}
        value={query}
        onChange={setQuery}
        options={BOOKS}
        filterOption={matchesTitleOrAuthor}
        groupBy={(option) => option.group ?? ""}
        groupMode="adjacent"
        autoHighlight
        onSelect={(option) => {
          setResult(`打开书籍 ${option.value}`);
          setQuery(option.label);
        }}
        onSubmit={(text) => setResult(`搜索 ${text}`)}
        renderEmpty={() => "没有找到相关书籍"}
      />
      <button type="button">其它按钮</button>
      <p>结果：{result}</p>
    </header>
  );
}

const optionLabels = () =>
  within(screen.getByRole("listbox"))
    .getAllByRole("option")
    .map((o) => o.querySelector(".ui-autocomplete-item-label")?.textContent);

describe("Autocomplete search", () => {
  it("focus shows all suggestions grouped; typing filters by title or author", async () => {
    const user = userEvent.setup();
    render(<SearchHeader />);
    const input = screen.getByRole("combobox", { name: "搜索书籍" });
    expect(input).toHaveAttribute("aria-expanded", "false");

    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute(
      "aria-controls",
      screen.getByRole("listbox").id,
    );
    expect(optionLabels()).toEqual([
      "诡秘之主",
      "赤心巡天",
      "三体",
      "球状闪电",
    ]);
    expect(
      within(screen.getByRole("listbox")).getByText("玄幻"),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("listbox")).getByText("科幻"),
    ).toBeInTheDocument();

    await user.type(input, "刘慈欣");
    expect(optionLabels()).toEqual(["三体", "球状闪电"]);
    expect(
      within(screen.getByRole("listbox")).queryByText("玄幻"),
    ).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "不存在的书");
    expect(
      within(screen.getByRole("listbox")).queryByRole("option"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("listbox")).toHaveTextContent("没有找到相关书籍");
  });

  it("arrow keys move the highlight (wrapping) and Enter selects it", async () => {
    const user = userEvent.setup();
    render(<SearchHeader />);
    const input = screen.getByRole("combobox", { name: "搜索书籍" });

    await user.click(input);
    const active = () =>
      document.getElementById(
        input.getAttribute("aria-activedescendant") ?? "",
      );
    expect(active()).toHaveTextContent("诡秘之主");
    expect(active()).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(active()).toHaveTextContent("三体");
    await user.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}");
    expect(active()).toHaveTextContent("球状闪电");

    await user.keyboard("{Enter}");
    expect(screen.getByText("结果：打开书籍 qiu")).toBeInTheDocument();
    expect(input).toHaveValue("球状闪电");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("Enter with no matches submits the free text; Escape and clicking outside close the list", async () => {
    const user = userEvent.setup();
    render(<SearchHeader />);
    const input = screen.getByRole("combobox", { name: "搜索书籍" });

    await user.type(input, "  深空彼岸 {Enter}");
    expect(screen.getByText("结果：搜索 深空彼岸")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.clear(input);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveFocus();

    await user.type(input, "三");
    expect(optionLabels()).toEqual(["三体"]);
    await user.click(screen.getByText(/^结果：/));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Mouse selection.
    await user.click(input);
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: /三体/ }),
    );
    expect(screen.getByText("结果：打开书籍 santi")).toBeInTheDocument();
  });

  it("clicking the still-focused input reopens the list after a selection or Escape; keyboard reopens too", async () => {
    const user = userEvent.setup();
    render(<SearchHeader />);
    const input = screen.getByRole("combobox", { name: "搜索书籍" });

    await user.click(input);
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: /球状闪电/,
      }),
    );
    expect(screen.getByText("结果：打开书籍 qiu")).toBeInTheDocument();
    expect(input).toHaveValue("球状闪电");
    expect(input).toHaveFocus();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Regression: focus never left the input, so only the click can reopen it.
    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(optionLabels()).toEqual(["球状闪电"]);

    await user.clear(input);
    expect(optionLabels()).toEqual([
      "诡秘之主",
      "赤心巡天",
      "三体",
      "球状闪电",
    ]);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.click(input);
    expect(optionLabels()).toHaveLength(4);

    await user.keyboard("{Escape}");
    await user.keyboard("{Alt>}{ArrowDown}{/Alt}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
});

function TagEditorForm({
  onSave,
}: {
  onSave: (tags: FormDataEntryValue[]) => void;
}) {
  const [tags, setTags] = useState<string[]>(["玄幻"]);
  return (
    <FormLayout
      aria-label="编辑标签"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(new FormData(event.currentTarget).getAll("tags"));
      }}
    >
      <FormField label="标签" helperText="回车添加">
        <TagInput
          name="tags"
          value={tags}
          onChange={setTags}
          options={["玄幻", "科幻", "悬疑", "完结"]}
          addLabel="添加标签"
          clearLabel="清空标签"
          removeLabel={(tag) => `移除 ${tag}`}
          createLabel={(tag) => `新建「${tag}」`}
        />
      </FormField>
      <Button type="submit">保存</Button>
    </FormLayout>
  );
}

const currentTags = () =>
  screen
    .queryAllByRole("button", { name: /^移除 / })
    .map((b) => b.getAttribute("aria-label")?.slice(3));

describe("TagInput", () => {
  it("adds tags with Enter, de-duplicates, offers create/suggestions, and does not submit the form", async () => {
    const user = userEvent.setup();
    const saves: FormDataEntryValue[][] = [];
    render(<TagEditorForm onSave={(tags) => saves.push(tags)} />);
    const input = screen.getByRole("combobox", { name: "标签" });
    expect(input).toHaveAccessibleDescription("回车添加");

    await user.click(input);
    // Existing tags are not suggested again.
    expect(optionLabels()).toEqual(["科幻", "悬疑", "完结"]);

    await user.type(input, "  克苏鲁 ");
    expect(optionLabels()).toEqual(["新建「克苏鲁」"]);
    await user.keyboard("{Enter}");
    expect(currentTags()).toEqual(["玄幻", "克苏鲁"]);
    expect(input).toHaveValue("");

    // Duplicate: Enter just clears the draft.
    await user.type(input, "玄幻{Enter}");
    expect(currentTags()).toEqual(["玄幻", "克苏鲁"]);
    expect(input).toHaveValue("");

    await user.type(input, "悬");
    expect(optionLabels()).toEqual(["新建「悬」", "悬疑"]);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(currentTags()).toEqual(["玄幻", "克苏鲁", "悬疑"]);
    expect(saves).toEqual([]);

    await user.click(screen.getByRole("button", { name: "保存" }));
    expect(saves).toEqual([["玄幻", "克苏鲁", "悬疑"]]);
  });

  it("add button, blur commit, remove buttons and clear-all manage the list; focus returns to the input", async () => {
    const user = userEvent.setup();
    const saves: FormDataEntryValue[][] = [];
    render(<TagEditorForm onSave={(tags) => saves.push(tags)} />);
    const input = screen.getByRole("combobox", { name: "标签" });
    const add = screen.getByRole("button", { name: "添加标签" });

    expect(add).toBeDisabled();
    await user.type(input, "长篇");
    expect(add).toBeEnabled();
    await user.click(add);
    expect(currentTags()).toEqual(["玄幻", "长篇"]);
    expect(input).toHaveFocus();

    await user.type(input, "轻小说");
    await user.tab();
    expect(currentTags()).toEqual(["玄幻", "长篇", "轻小说"]);

    await user.click(screen.getByRole("button", { name: "移除 长篇" }));
    expect(currentTags()).toEqual(["玄幻", "轻小说"]);
    expect(input).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "清空标签" }));
    expect(currentTags()).toEqual([]);
    expect(screen.getByRole("button", { name: "清空标签" })).toBeDisabled();
    expect(input).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "保存" }));
    expect(saves).toEqual([[]]);
  });

  it("clicking the still-focused input reopens the remaining suggestions after picking one", async () => {
    const user = userEvent.setup();
    render(<TagEditorForm onSave={() => {}} />);
    const input = screen.getByRole("combobox", { name: "标签" });

    await user.click(input);
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "科幻" }),
    );
    expect(currentTags()).toEqual(["玄幻", "科幻"]);
    expect(input).toHaveFocus();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(input);
    expect(optionLabels()).toEqual(["悬疑", "完结"]);
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "完结" }),
    );
    expect(currentTags()).toEqual(["玄幻", "科幻", "完结"]);

    await user.keyboard("{Escape}");
    await user.click(input);
    expect(optionLabels()).toEqual(["悬疑"]);
  });

  it("Escape discards the draft without adding a tag", async () => {
    const user = userEvent.setup();
    render(<TagEditorForm onSave={() => {}} />);
    const input = screen.getByRole("combobox", { name: "标签" });

    await user.type(input, "草稿{Escape}");
    expect(input).toHaveValue("");
    await user.tab();
    expect(currentTags()).toEqual(["玄幻"]);
  });
});

// ─── novel-isr-ui API through @minerva/lib-core/compat ──────────────────────

const NOVEL_BOOKS: compat.AutocompleteOption[] = [
  { id: "lotm", label: "诡秘之主", hint: "爱潜水的乌贼", group: "玄幻" },
  { id: "ct", label: "赤心巡天", hint: "情何以甚", group: "玄幻" },
  { id: "santi", label: "三体", hint: "刘慈欣", group: "科幻" },
  { id: "qiu", label: "球状闪电", hint: "刘慈欣", group: "科幻" },
];

function NovelSearchHeader() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("（无）");
  return (
    <header>
      <compat.Autocomplete
        aria-label="搜索书籍"
        value={query}
        onValueChange={setQuery}
        options={NOVEL_BOOKS}
        onSelect={(option) => {
          setResult(`打开书籍 ${option.id}`);
          setQuery(option.label);
        }}
        onSubmit={(text) => setResult(`搜索 ${text}`)}
      />
      <button type="button">其它按钮</button>
      <p>结果：{result}</p>
    </header>
  );
}

function NovelTagEditorForm({
  onSave,
}: {
  onSave: (tags: FormDataEntryValue[]) => void;
}) {
  const [tags, setTags] = useState<string[]>(["玄幻"]);
  return (
    <compat.FormLayout
      aria-label="编辑标签"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(new FormData(event.currentTarget).getAll("tags"));
      }}
    >
      <compat.FormField label="标签" helperText="回车添加">
        <compat.TagInput
          name="tags"
          value={tags}
          onValueChange={setTags}
          options={["玄幻", "科幻", "悬疑", "完结"]}
          addLabel="添加标签"
          clearLabel="清空标签"
          removeLabel={(tag) => `移除 ${tag}`}
          createLabel={(tag) => `新建「${tag}」`}
        />
      </compat.FormField>
      <compat.Button type="submit">保存</compat.Button>
    </compat.FormLayout>
  );
}

describe("via @minerva/lib-core/compat", () => {
  it("focus shows all suggestions grouped; typing filters by title or author (novel default empty text)", async () => {
    const user = userEvent.setup();
    render(<NovelSearchHeader />);
    const input = screen.getByRole("combobox", { name: "搜索书籍" });

    await user.click(input);
    expect(optionLabels()).toEqual([
      "诡秘之主",
      "赤心巡天",
      "三体",
      "球状闪电",
    ]);
    expect(
      within(screen.getByRole("listbox")).getByText("玄幻"),
    ).toBeInTheDocument();

    await user.type(input, "刘慈欣");
    expect(optionLabels()).toEqual(["三体", "球状闪电"]);

    await user.clear(input);
    await user.type(input, "不存在的书");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    // novel's built-in Chinese default
    expect(screen.getByText("无匹配项")).toBeInTheDocument();
  });

  it("arrow keys move the highlight (wrapping) and Enter selects it", async () => {
    const user = userEvent.setup();
    render(<NovelSearchHeader />);
    const input = screen.getByRole("combobox", { name: "搜索书籍" });

    await user.click(input);
    const active = () =>
      document.getElementById(
        input.getAttribute("aria-activedescendant") ?? "",
      );
    expect(active()).toHaveTextContent("诡秘之主");
    expect(active()).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(active()).toHaveTextContent("三体");
    await user.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}");
    expect(active()).toHaveTextContent("球状闪电");

    await user.keyboard("{Enter}");
    expect(screen.getByText("结果：打开书籍 qiu")).toBeInTheDocument();
    expect(input).toHaveValue("球状闪电");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("adds tags with Enter, de-duplicates, offers create/suggestions, and does not submit the form", async () => {
    const user = userEvent.setup();
    const saves: FormDataEntryValue[][] = [];
    render(<NovelTagEditorForm onSave={(tags) => saves.push(tags)} />);
    const input = screen.getByRole("combobox", { name: "标签" });
    expect(input).toHaveAccessibleDescription("回车添加");

    await user.click(input);
    expect(optionLabels()).toEqual(["科幻", "悬疑", "完结"]);

    await user.type(input, "  克苏鲁 ");
    expect(optionLabels()).toEqual(["新建「克苏鲁」"]);
    await user.keyboard("{Enter}");
    expect(currentTags()).toEqual(["玄幻", "克苏鲁"]);
    expect(input).toHaveValue("");

    await user.type(input, "玄幻{Enter}");
    expect(currentTags()).toEqual(["玄幻", "克苏鲁"]);

    await user.type(input, "悬");
    expect(optionLabels()).toEqual(["新建「悬」", "悬疑"]);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(currentTags()).toEqual(["玄幻", "克苏鲁", "悬疑"]);
    expect(saves).toEqual([]);

    await user.click(screen.getByRole("button", { name: "保存" }));
    expect(saves).toEqual([["玄幻", "克苏鲁", "悬疑"]]);
  });
});
