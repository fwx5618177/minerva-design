// "新建书籍" form — a consumer composes FormLayout + FormField + inputs,
// validates on submit, shows a toast on success and can reset. Driven only
// through user-event, with the React library's default (English) built-in strings.
import { useState, type FormEvent } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  Checkbox,
  FormField,
  FormLayout,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Switch,
  TagInput,
  Textarea,
  ToastProvider,
  Toolbar,
  toast,
} from "minerva-design";

interface Book {
  title: string;
  synopsis: string;
  chapters: number | null;
  genre: string;
  tags: string[];
  mature: boolean;
  publish: boolean;
}

const EMPTY: Book = {
  title: "",
  synopsis: "",
  chapters: null,
  genre: "",
  tags: [],
  mature: false,
  publish: false,
};

type Errors = Partial<Record<keyof Book, string>>;

function validate(book: Book): Errors {
  const errors: Errors = {};
  if (!book.title.trim()) errors.title = "请填写书名";
  if (book.synopsis.trim().length < 10) errors.synopsis = "简介至少 10 个字";
  if (book.chapters === null) errors.chapters = "请填写章节数";
  if (!book.genre) errors.genre = "请选择分类";
  return errors;
}

function useBookForm(onCreate: (book: Book) => void) {
  const [book, setBook] = useState<Book>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const set = <K extends keyof Book>(key: K, value: Book[K]) =>
    setBook((prev) => ({ ...prev, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(book);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onCreate(book);
    toast.success(`《${book.title}》已创建`, {
      description: `${book.chapters} 章 · ${book.tags.join(", ")}`,
    });
  };
  const reset = () => {
    setBook(EMPTY);
    setErrors({});
  };
  return { book, errors, set, submit, reset };
}

function CreateBookApp({ onCreate }: { onCreate: (book: Book) => void }) {
  const { book, errors, set, submit, reset } = useBookForm(onCreate);

  return (
    <ToastProvider>
      <FormLayout
        aria-label="新建书籍"
        noValidate
        onSubmit={submit}
        onReset={reset}
      >
        <FormField
          label="书名"
          required
          helperText="公开展示的标题"
          errorMessage={errors.title}
        >
          <Input
            name="title"
            value={book.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </FormField>
        <FormField label="简介" errorMessage={errors.synopsis}>
          <Textarea
            name="synopsis"
            value={book.synopsis}
            onChange={(e) => set("synopsis", e.target.value)}
          />
        </FormField>
        <FormField label="章节数" required errorMessage={errors.chapters}>
          <NumberInput
            value={book.chapters}
            onChange={(v) => set("chapters", v)}
            min={1}
            max={5000}
          />
        </FormField>
        <FormField label="分类" required errorMessage={errors.genre}>
          <Select
            value={book.genre}
            onChange={(v) => set("genre", v)}
            placeholder="选择分类"
          >
            <SelectItem value="fantasy">玄幻</SelectItem>
            <SelectItem value="scifi">科幻</SelectItem>
            <SelectItem value="mystery">悬疑</SelectItem>
          </Select>
        </FormField>
        <FormField label="标签">
          <TagInput
            value={book.tags}
            onChange={(v) => set("tags", v)}
            options={["长篇", "完结", "爽文"]}
          />
        </FormField>
        <Checkbox checked={book.mature} onChange={(v) => set("mature", v)}>
          含成人内容
        </Checkbox>
        <Switch
          aria-label="立即发布"
          checked={book.publish}
          onChange={(v) => set("publish", v)}
        />
        <Toolbar>
          <Button type="submit">创建</Button>
          <Button type="reset" variant="ghost">
            重置
          </Button>
        </Toolbar>
      </FormLayout>
    </ToastProvider>
  );
}

function setup() {
  const created: Book[] = [];
  const user = userEvent.setup();
  render(<CreateBookApp onCreate={(book) => created.push(book)} />);
  return { user, created };
}

async function dismissToasts(
  user: ReturnType<typeof userEvent.setup>,
  regionName = "Notifications (F8)",
  closeName = "Close",
) {
  const region = screen.queryByRole("region", { name: regionName });
  if (!region) return;
  for (const close of within(region).queryAllByRole("button", {
    name: closeName,
  }))
    await user.click(close);
  await waitFor(() =>
    expect(within(region).queryByRole("status")).not.toBeInTheDocument(),
  );
}

describe("create-book form flow", () => {
  it("blocks an empty submit with accessible field errors, then submits after the user fixes them", async () => {
    const { user, created } = setup();

    const title = screen.getByRole("textbox", { name: /书名/ });
    expect(title).toHaveAccessibleDescription("公开展示的标题");
    expect(title).toBeRequired();

    await user.click(screen.getByRole("button", { name: "创建" }));

    expect(created).toHaveLength(0);
    const alerts = screen.getAllByRole("alert").map((node) => node.textContent);
    expect(alerts).toEqual([
      "请填写书名",
      "简介至少 10 个字",
      "请填写章节数",
      "请选择分类",
    ]);
    expect(title).toBeInvalid();
    expect(title).toHaveAccessibleDescription("请填写书名");
    expect(screen.queryByText("公开展示的标题")).not.toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /章节数/ })).toBeInvalid();
    expect(screen.getByRole("combobox", { name: /分类/ })).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    // Fix every field like a user would.
    await user.type(title, "诡秘之主");
    await user.type(
      screen.getByRole("textbox", { name: "简介" }),
      "蒸汽与机械的浪潮中，谁能触及非凡？",
    );

    const chapters = screen.getByRole("spinbutton", { name: /章节数/ });
    await user.type(chapters, "1393");
    await user.keyboard("{ArrowUp}");
    expect(chapters).toHaveValue("1394");

    const genre = screen.getByRole("combobox", { name: /分类/ });
    genre.focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("option", { name: "玄幻" }));
    expect(genre).toHaveTextContent("玄幻");

    const tags = screen.getByRole("combobox", { name: "标签" });
    await user.type(tags, "克苏鲁{Enter}");
    await user.type(tags, "完");
    await user.click(await screen.findByRole("option", { name: "完结" }));
    expect(
      screen.getByRole("button", { name: "Remove 克苏鲁" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove 完结" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "含成人内容" }));
    await user.click(screen.getByRole("switch", { name: "立即发布" }));
    expect(screen.getByRole("switch", { name: "立即发布" })).toBeChecked();

    await user.click(screen.getByRole("button", { name: "创建" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(title).not.toBeInvalid();
    expect(created).toEqual([
      {
        title: "诡秘之主",
        synopsis: "蒸汽与机械的浪潮中，谁能触及非凡？",
        chapters: 1394,
        genre: "fantasy",
        tags: ["克苏鲁", "完结"],
        mature: true,
        publish: true,
      },
    ]);

    const status = await within(
      screen.getByRole("region", { name: "Notifications (F8)" }),
    ).findByRole("status");
    expect(status).toHaveTextContent("《诡秘之主》已创建");
    expect(status).toHaveTextContent("1394 章 · 克苏鲁, 完结");

    await dismissToasts(user);
  });

  it("clamps out-of-range chapter counts on blur and Enter-in-field submits the form", async () => {
    const { user, created } = setup();
    const chapters = screen.getByRole("spinbutton", { name: /章节数/ });

    await user.type(chapters, "9999");
    expect(chapters).toHaveAttribute("aria-invalid", "true");
    expect(chapters.parentElement).toHaveAttribute("title", "Maximum 5000");
    await user.tab();
    expect(chapters).toHaveValue("5000");
    expect(chapters).toHaveAttribute("aria-valuenow", "5000");

    await user.type(
      screen.getByRole("textbox", { name: /书名/ }),
      "三体{Enter}",
    );
    // Enter inside a text input submits via the native form; the rest is still invalid.
    expect(created).toHaveLength(0);
    expect(screen.getAllByRole("alert").map((n) => n.textContent)).toEqual([
      "简介至少 10 个字",
      "请选择分类",
    ]);
  });

  it("reset restores every control and clears errors", async () => {
    const { user } = setup();

    await user.click(screen.getByRole("button", { name: "创建" }));
    expect(screen.getAllByRole("alert")).toHaveLength(4);

    await user.type(screen.getByRole("textbox", { name: /书名/ }), "草稿");
    await user.type(
      screen.getByRole("combobox", { name: "标签" }),
      "临时{Enter}",
    );
    await user.click(screen.getByRole("checkbox", { name: "含成人内容" }));

    await user.click(screen.getByRole("button", { name: "重置" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /书名/ })).toHaveValue("");
    expect(
      screen.getByRole("checkbox", { name: "含成人内容" }),
    ).not.toBeChecked();
    expect(
      screen.queryByRole("button", { name: "Remove 临时" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /书名/ }),
    ).toHaveAccessibleDescription("公开展示的标题");
  });

  it("a Button without type (preview, add row...) never submits the form; only type=submit does", async () => {
    const user = userEvent.setup();
    const submits: string[] = [];
    const previews: string[] = [];
    render(
      <FormLayout
        aria-label="草稿"
        onSubmit={(event) => {
          event.preventDefault();
          submits.push("submit");
        }}
      >
        <FormField label="书名">
          <Input name="title" defaultValue="三体" />
        </FormField>
        <Toolbar>
          <Button variant="outline" onClick={() => previews.push("preview")}>
            预览
          </Button>
          <Button type="submit">保存</Button>
        </Toolbar>
      </FormLayout>,
    );

    const preview = screen.getByRole("button", { name: "预览" });
    expect(preview).toHaveAttribute("type", "button");
    await user.click(preview);
    preview.focus();
    await user.keyboard("{Enter}");
    expect(previews).toEqual(["preview", "preview"]);
    expect(submits).toEqual([]);

    await user.click(screen.getByRole("button", { name: "保存" }));
    expect(submits).toEqual(["submit"]);
  });

  // Behavioural layout checks (happy-dom has no grid geometry).
  it("uncontrolled FormLayout: label focuses field, Tab order, Enter/external submit and reset buttons", async () => {
    const user = userEvent.setup();
    const submissions: Record<string, FormDataEntryValue>[] = [];
    let resets = 0;
    render(
      <>
        <FormLayout
          id="metadata"
          aria-label="Metadata"
          noValidate
          onReset={() => {
            resets += 1;
          }}
          onSubmit={(event) => {
            event.preventDefault();
            submissions.push(
              Object.fromEntries(new FormData(event.currentTarget)),
            );
          }}
        >
          <FormField label="Title" helperText="Public title">
            <Input name="title" defaultValue="Draft" />
          </FormField>
          <FormField label="Category">
            <Input name="category" defaultValue="Article" />
          </FormField>
          <FormField label="Description">
            <Textarea name="description" defaultValue="Long text" />
          </FormField>
        </FormLayout>
        <Toolbar>
          <Button type="submit" form="metadata">
            Save
          </Button>
          <Button type="reset" form="metadata">
            Reset
          </Button>
        </Toolbar>
      </>,
    );

    const title = screen.getByRole("textbox", { name: "Title" });
    await user.click(screen.getByText("Title"));
    expect(title).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Category" })).toHaveFocus();

    await user.clear(title);
    await user.type(title, "Edited");
    // External submit button associated through the `form` attribute.
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(submissions).toEqual([
      { title: "Edited", category: "Article", description: "Long text" },
    ]);

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(title).toHaveValue("Draft");
    expect(resets).toBe(1);
  });
});
