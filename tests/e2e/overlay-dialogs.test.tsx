/* eslint-disable jsx-a11y/no-autofocus -- initial focus on an autoFocus field inside the dialog is the behaviour under test */
// Modal, Drawer, ConfirmDialog / confirm(): focus management (initial focus,
// trap, return to opener), Escape, and a delete-with-confirm list.
// Uses lib-core's default (English) built-in texts ("Close", "Cancel",
// "Confirm", "Delete").
import { useState, type ReactNode } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  ConfirmDialog,
  ConfirmProvider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  FormField,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalFooter,
  confirm,
  useConfirm,
} from "@minerva/lib-core";

function EditDocumentPage({
  onSubmit,
}: {
  onSubmit: (data: Record<string, FormDataEntryValue>) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Edit document"
        description="Document metadata"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
            setOpen(false);
          }}
        >
          <ModalBody>
            {/* autoFocus mirrors the old Playwright fixture: the first field receives initial focus. */}
            <FormField label="Field 1">
              <Input name="field1" autoFocus defaultValue="Value 1" />
            </FormField>
            <FormField label="Field 2">
              <Input name="field2" defaultValue="Value 2" />
            </FormField>
          </ModalBody>
          <ModalFooter>
            {/* Button keeps the native default type (submit). */}
            <Button
              type="button"
              appearance="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("moves focus inside, traps Tab, closes on Escape and restores focus to the opener", async () => {
    const user = userEvent.setup();
    render(<EditDocumentPage onSubmit={() => {}} />);
    const opener = screen.getByRole("button", { name: "Open dialog" });

    await user.click(opener);
    const dialog = await screen.findByRole("dialog", { name: "Edit document" });
    expect(dialog).toHaveAccessibleDescription("Document metadata");
    const field1 = within(dialog).getByRole("textbox", { name: "Field 1" });
    expect(field1).toHaveFocus();

    await user.tab();
    expect(
      within(dialog).getByRole("textbox", { name: "Field 2" }),
    ).toHaveFocus();
    await user.tab();
    expect(
      within(dialog).getByRole("button", { name: "Cancel" }),
    ).toHaveFocus();
    await user.tab();
    expect(
      within(dialog).getByRole("button", { name: "Save changes" }),
    ).toHaveFocus();
    await user.tab();
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();
    // Wraps instead of escaping to the page.
    await user.tab();
    expect(field1).toHaveFocus();
    await user.tab({ shift: true });
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("submits the form from the footer submit button inside the dialog", async () => {
    const user = userEvent.setup();
    const submitted: Record<string, FormDataEntryValue>[] = [];
    render(<EditDocumentPage onSubmit={(data) => submitted.push(data)} />);

    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit document" });
    await user.clear(within(dialog).getByRole("textbox", { name: "Field 2" }));
    await user.type(
      within(dialog).getByRole("textbox", { name: "Field 2" }),
      "Changed",
    );
    await user.click(
      within(dialog).getByRole("button", { name: "Save changes" }),
    );

    expect(submitted).toEqual([{ field1: "Value 1", field2: "Changed" }]);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Open dialog" })).toHaveFocus(),
    );
  });

  it("the × close button and Cancel both close without submitting", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EditDocumentPage onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    await user.click(
      within(await screen.findByRole("dialog")).getByRole("button", {
        name: "Close",
      }),
    );
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    await user.click(
      within(await screen.findByRole("dialog")).getByRole("button", {
        name: "Cancel",
      }),
    );
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

function FilterDrawerPage() {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState("全部");
  const [draft, setDraft] = useState("");
  return (
    <>
      <p>当前筛选：{applied}</p>
      <Button onClick={() => setOpen(true)}>筛选</Button>
      <Drawer open={open} onOpenChange={setOpen} title="筛选条件">
        <DrawerBody>
          <FormField label="作者">
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
          </FormField>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={() => {
              setApplied(draft || "全部");
              setOpen(false);
            }}
          >
            应用
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

describe("Drawer", () => {
  it("opens as a dialog, traps focus, and Escape closes it", async () => {
    const user = userEvent.setup();
    render(<FilterDrawerPage />);

    await user.click(screen.getByRole("button", { name: "筛选" }));
    const drawer = await screen.findByRole("dialog", { name: "筛选条件" });
    expect(drawer).toContainElement(document.activeElement as HTMLElement);

    const author = within(drawer).getByRole("textbox", { name: "作者" });
    author.focus();
    await user.tab();
    expect(within(drawer).getByRole("button", { name: "应用" })).toHaveFocus();
    await user.tab();
    expect(within(drawer).getByRole("button", { name: "Close" })).toHaveFocus();
    await user.tab();
    expect(author).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前筛选：全部")).toBeInTheDocument();
    // Regression: a naive Drawer used to drop focus to <body>; it now returns to the opener.
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "筛选" })).toHaveFocus(),
    );
  });

  it("applies the filter from the footer", async () => {
    const user = userEvent.setup();
    render(<FilterDrawerPage />);

    await user.click(screen.getByRole("button", { name: "筛选" }));
    const drawer = await screen.findByRole("dialog", { name: "筛选条件" });
    await user.type(
      within(drawer).getByRole("textbox", { name: "作者" }),
      "乌贼",
    );
    await user.click(within(drawer).getByRole("button", { name: "应用" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前筛选：乌贼")).toBeInTheDocument();
  });
});

function ReadingList() {
  const ask = useConfirm();
  const [books, setBooks] = useState(["诡秘之主", "三体", "雪中悍刀行"]);
  const remove = async (title: string) => {
    const ok = await ask({
      title: `删除《${title}》？`,
      description: "此操作不可撤销",
      intent: "danger",
    });
    if (ok) setBooks((prev) => prev.filter((book) => book !== title));
  };
  return (
    <List aria-label="书架">
      {books.map((title) => (
        <ListItem
          key={title}
          primary={title}
          actions={
            <Button
              size="small"
              variant="danger"
              onClick={() => void remove(title)}
            >
              删除{title}
            </Button>
          }
        />
      ))}
    </List>
  );
}

const shelfTitles = () =>
  within(screen.getByRole("list", { name: "书架" }))
    .getAllByRole("listitem")
    .map((item) => item.querySelector(".content > .primary")?.textContent);

function spyOnFallbacks() {
  const warn = vi.spyOn(console, "warn");
  const nativeConfirm = vi.fn(() => true);
  vi.stubGlobal("confirm", nativeConfirm);
  return { warn, nativeConfirm };
}

describe.each<[string, (children: ReactNode) => ReactNode]>([
  [
    "inside <ConfirmProvider>",
    (children) => <ConfirmProvider>{children}</ConfirmProvider>,
  ],
  ["without a provider (standalone host)", (children) => children],
])("confirm before delete — %s", (_label, wrap) => {
  it("Cancel / Escape keep the row; the danger action deletes it and returns focus to the page", async () => {
    const user = userEvent.setup();
    const { warn, nativeConfirm } = spyOnFallbacks();
    render(<>{wrap(<ReadingList />)}</>);

    const deleteSanti = screen.getByRole("button", { name: "删除三体" });
    await user.click(deleteSanti);
    let dialog = await screen.findByRole("dialog", { name: "删除《三体》？" });
    expect(dialog).toHaveAccessibleDescription("此操作不可撤销");
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(shelfTitles()).toEqual(["诡秘之主", "三体", "雪中悍刀行"]);

    await user.click(deleteSanti);
    await screen.findByRole("dialog", { name: "删除《三体》？" });
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(deleteSanti).toHaveFocus());
    expect(shelfTitles()).toHaveLength(3);

    await user.click(deleteSanti);
    dialog = await screen.findByRole("dialog", { name: "删除《三体》？" });
    await user.click(within(dialog).getByRole("button", { name: "Delete" }));
    await waitFor(() =>
      expect(shelfTitles()).toEqual(["诡秘之主", "雪中悍刀行"]),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    expect(warn).not.toHaveBeenCalled();
    expect(nativeConfirm).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("queues imperative confirm() calls made outside event handlers and resolves each in order", async () => {
    const user = userEvent.setup();
    const { warn, nativeConfirm } = spyOnFallbacks();
    render(<>{wrap(<p>后台任务</p>)}</>);

    let first: Promise<boolean> = Promise.resolve(false);
    let second: Promise<boolean> = Promise.resolve(false);
    await act(async () => {
      first = confirm({ title: "同步书架？" });
      second = confirm({ title: "清空缓存？", confirmLabel: "清空" });
    });

    const firstDialog = await screen.findByRole("dialog", {
      name: "同步书架？",
    });
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    await user.click(
      within(firstDialog).getByRole("button", { name: "Confirm" }),
    );
    await expect(first).resolves.toBe(true);

    const secondDialog = await screen.findByRole("dialog", {
      name: "清空缓存？",
    });
    await user.click(
      within(secondDialog).getByRole("button", { name: "Cancel" }),
    );
    await expect(second).resolves.toBe(false);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    expect(warn).not.toHaveBeenCalled();
    expect(nativeConfirm).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

describe("ConfirmDialog (declarative)", () => {
  // Loading buttons stay focusable (aria-disabled + aria-busy) but cannot be
  // activated a second time.
  it("shows a busy confirm button that ignores repeated activation while the async action runs", async () => {
    const user = userEvent.setup();
    let finish: () => void = () => {};
    const onConfirm = vi.fn();
    function Page() {
      const [open, setOpen] = useState(false);
      const [busy, setBusy] = useState(false);
      const [done, setDone] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>归档</Button>
          {done && <p>已归档</p>}
          <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            title="归档这本书？"
            confirmLabel="归档"
            intent="warning"
            loading={busy}
            onConfirm={async () => {
              onConfirm();
              setBusy(true);
              await new Promise<void>((resolve) => {
                finish = resolve;
              });
              setBusy(false);
              setDone(true);
              setOpen(false);
            }}
          />
        </>
      );
    }
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "归档" }));
    const dialog = await screen.findByRole("dialog", { name: "归档这本书？" });
    await user.click(within(dialog).getByRole("button", { name: "归档" }));
    expect(
      within(dialog).getByRole("button", { name: "Cancel" }),
    ).toBeDisabled();
    const confirmButton = within(dialog).getByRole("button", { name: /归档/ });
    expect(confirmButton).toHaveAttribute("aria-disabled", "true");
    expect(confirmButton).toHaveAttribute("aria-busy", "true");
    expect(confirmButton).not.toBeDisabled();

    await user.click(confirmButton);
    confirmButton.focus();
    await user.keyboard("{Enter}");
    expect(onConfirm).toHaveBeenCalledTimes(1);

    await act(async () => {
      finish();
    });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("已归档")).toBeInTheDocument();
  });
});
