// @novel-isr/ui compat (overlays): novel prop shapes, novel's Chinese built-in
// texts (passed explicitly, independent of lib-core's language, which stays
// at its default "en" here) and the `ui-*` hooks.
import { createRef, useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import i18n from "../config/i18n";
import {
  CommandDialog,
  ConfirmDialog,
  ConfirmProvider,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  confirm,
  matchesShortcut,
  normalizeShortcuts,
  useConfirm,
  type CommandDialogProps,
  type CommandItem,
  type ConfirmDialogProps,
  type ConfirmIntent,
  type ConfirmOptions,
  type DrawerContentProps,
  type DrawerProps,
  type DrawerSide,
  type DrawerSize,
  type ModalBodyProps,
  type ModalContentProps,
  type ModalFooterProps,
  type ModalHeaderProps,
  type ModalProps,
  type ModalSize,
  type PopoverAlign,
  type PopoverContentProps,
  type PopoverSide,
} from "./overlays";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

it("runs under lib-core's default language", () => {
  expect(i18n.language).toBe("en");
});

describe("compat Modal", () => {
  it("maps isOpen / onClose / size and keeps the ui-modal hooks (admin usage)", async () => {
    const user = setup();
    const onClose = vi.fn();
    const props: ModalProps = {
      isOpen: true,
      onClose,
      title: "管理业务分组",
      description: "编辑 label / 说明 / prefixes。",
      size: "lg",
      children: null,
    };
    const footer: ModalFooterProps = { className: "actions" };
    const body: ModalBodyProps = { id: "body" };
    render(
      <Modal {...props}>
        <ModalBody {...body}>内容</ModalBody>
        <ModalFooter {...footer}>
          <button type="button" onClick={onClose}>
            取消
          </button>
        </ModalFooter>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "管理业务分组" });
    expect(dialog).toHaveClass("ui-modal-content", "ui-modal-size-lg");
    expect(dialog).toHaveAccessibleDescription(
      "编辑 label / 说明 / prefixes。",
    );
    expect(screen.getByText("内容")).toHaveClass("ui-modal-body");
    await user.click(screen.getByRole("button", { name: "关闭" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it.each([
    ["sm", "sm"],
    ["md", "md"],
    ["xl", "xl"],
    ["full", "full"],
  ] as const)("size %s renders ui-modal-size-%s", (size: ModalSize, hook) => {
    render(
      <Modal isOpen onClose={() => {}} title="T" size={size}>
        x
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toHaveClass(`ui-modal-size-${hook}`);
  });

  it("defaults to md and supports the compound API with novel sizes", async () => {
    const user = setup();
    const ref = createRef<HTMLDivElement>();
    const headerProps: ModalHeaderProps = { className: "h" };
    const contentProps: ModalContentProps = {
      size: "sm",
      hideCloseButton: true,
    };
    render(
      <ModalRoot>
        <ModalTrigger asChild>
          <button type="button">打开</button>
        </ModalTrigger>
        <ModalContent ref={ref} {...contentProps}>
          <ModalHeader {...headerProps}>复合</ModalHeader>
          <ModalClose>完成</ModalClose>
        </ModalContent>
      </ModalRoot>,
    );
    await user.click(screen.getByRole("button", { name: "打开" }));
    expect(ref.current).toHaveClass("ui-modal-size-sm");
    expect(screen.queryByRole("button", { name: "关闭" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "完成" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    render(
      <ModalRoot open>
        <ModalContent>
          <ModalHeader>默认</ModalHeader>
        </ModalContent>
      </ModalRoot>,
    );
    expect(screen.getByRole("dialog")).toHaveClass("ui-modal-size-md");
  });
});

describe("compat Confirm", () => {
  it("ConfirmDialog maps isOpen / onClose / isConfirming", async () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    const props: ConfirmDialogProps = {
      isOpen: true,
      onClose,
      onConfirm,
      title: "发布章节",
      description: "发布后读者可见",
      confirmLabel: "发布",
    };
    const { rerender } = render(<ConfirmDialog {...props} />);
    expect(
      screen.getByRole("dialog", { name: "发布章节" }),
    ).toHaveAccessibleDescription("发布后读者可见");
    await userEvent.click(screen.getByRole("button", { name: "取消" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "发布" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    const intent: ConfirmIntent = "danger";
    rerender(
      <ConfirmDialog {...props} confirmLabel={undefined} intent={intent} />,
    );
    expect(screen.getByRole("button", { name: "删除" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
    rerender(<ConfirmDialog {...props} confirmLabel={undefined} />);
    expect(screen.getByRole("button", { name: "确定" })).toBeInTheDocument();
    rerender(<ConfirmDialog {...props} isConfirming cancelLabel="返回" />);
    expect(screen.getByRole("button", { name: "返回" })).toBeDisabled();
    // novel's Button was natively disabled while loading.
    expect(screen.getByRole("button", { name: "发布" })).toBeDisabled();
  });

  it("confirm() / useConfirm() go through ConfirmProvider (app usage)", async () => {
    const results: boolean[] = [];
    function DeleteButton() {
      const ask = useConfirm();
      return (
        <button
          type="button"
          onClick={async () =>
            results.push(
              await ask({
                title: "确定删除业务分组？",
                description: "删除分组。",
                intent: "danger",
                confirmLabel: "删除",
              }),
            )
          }
        >
          删除分组
        </button>
      );
    }
    render(
      <ConfirmProvider>
        <DeleteButton />
      </ConfirmProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "删除分组" }));
    await userEvent.click(await screen.findByRole("button", { name: "删除" }));
    await waitFor(() => expect(results).toEqual([true]));

    let pending!: Promise<boolean>;
    const options: ConfirmOptions = { title: "全局调用", isConfirming: false };
    await act(async () => {
      pending = confirm(options);
    });
    await screen.findByRole("dialog", { name: "全局调用" });
    await userEvent.click(screen.getByRole("button", { name: "确定" }));
    await expect(pending).resolves.toBe(true);
  });

  it("useConfirm() returns the compat confirm outside a provider", () => {
    function Probe() {
      return <span>{useConfirm() === confirm ? "global" : "scoped"}</span>;
    }
    render(<Probe />);
    expect(screen.getByText("global")).toBeInTheDocument();
  });

  it("passes isConfirming through the imperative API", async () => {
    render(
      <ConfirmProvider>
        <span />
      </ConfirmProvider>,
    );
    let pending!: Promise<boolean>;
    await act(async () => {
      pending = confirm({ title: "处理中", isConfirming: true });
    });
    await screen.findByRole("dialog", { name: "处理中" });
    expect(screen.getByRole("button", { name: "取消" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "确定" })).toBeDisabled();
    await userEvent.keyboard("{Escape}");
    await expect(pending).resolves.toBe(false);
  });
});

describe("compat Drawer", () => {
  it("maps isOpen / onClose / side / size (novel test)", async () => {
    const user = setup();
    const onClose = vi.fn();
    const side: DrawerSide = "left";
    const size: DrawerSize = "lg";
    const props: DrawerProps = {
      isOpen: true,
      onClose,
      side,
      size,
      title: "Filters",
      children: null,
    };
    render(
      <Drawer {...props}>
        <DrawerBody>body</DrawerBody>
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveClass(
      "ui-drawer-content",
      "ui-drawer-side-left",
      "ui-drawer-size-lg",
    );
    expect(screen.getByText("Drawer content")).toHaveClass(
      "ui-visually-hidden",
    );
    await user.click(screen.getByRole("button", { name: "关闭" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("defaults to md and supports the compound API", async () => {
    const user = setup();
    const contentProps: DrawerContentProps = {
      side: "bottom",
      size: "full",
      closeLabel: "Dismiss",
    };
    render(
      <DrawerRoot>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent {...contentProps}>
          <DrawerHeader>Panel</DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Done</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>,
    );
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(screen.getByRole("dialog", { name: "Panel" })).toHaveClass(
      "ui-drawer-side-bottom",
      "ui-drawer-size-full",
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    render(
      <Drawer isOpen onClose={() => {}} title="Default">
        x
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toHaveClass("ui-drawer-size-md");
  });
});

describe("compat CommandDialog", () => {
  const COMMAND_ITEMS: CommandItem[] = [
    { id: "books", title: "书籍管理", description: "/books", group: "内容" },
    { id: "seo", title: "SEO", keywords: "sitemap" },
  ];

  it("maps isOpen and keeps the admin usage working", async () => {
    const user = setup();
    const runCommand = vi.fn();
    function App() {
      const [commandOpen, setCommandOpen] = useState(true);
      const props: CommandDialogProps = {
        isOpen: commandOpen,
        onOpenChange: setCommandOpen,
        items: COMMAND_ITEMS,
        title: "全局搜索",
        shortcutLabel: "⌘K",
        placeholder: "搜索模块、路径、SEO、i18n key 或接口",
        emptyText: "没有匹配结果",
        onSelect: runCommand,
        shortcut: "mod+k",
      };
      return <CommandDialog {...props} />;
    }
    render(<App />);
    const dialog = screen.getByRole("dialog", { name: /全局搜索/ });
    expect(dialog).toHaveClass("ui-command-dialog");
    expect(
      screen.getByRole("listbox", { name: "命令结果" }),
    ).toBeInTheDocument();
    await user.type(
      screen.getByRole("combobox", {
        name: "搜索模块、路径、SEO、i18n key 或接口",
      }),
      "sitemap{Enter}",
    );
    expect(runCommand).toHaveBeenCalledWith(COMMAND_ITEMS[1]);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("uses each item's id as the option id, like novel", async () => {
    const user = setup();
    render(
      <CommandDialog
        isOpen
        onOpenChange={() => {}}
        items={COMMAND_ITEMS}
        onSelect={() => {}}
      />,
    );
    const input = screen.getByRole("combobox");
    expect(screen.getAllByRole("option").map((o) => o.id)).toEqual([
      "books",
      "seo",
    ]);
    expect(input).toHaveAttribute("aria-activedescendant", "books");
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "seo");
  });

  it("re-exports the shortcut helpers (novel test)", () => {
    expect(normalizeShortcuts(["mod+k", ""])).toEqual(["mod+k"]);
    expect(
      matchesShortcut(
        {
          key: "k",
          metaKey: false,
          ctrlKey: true,
          shiftKey: false,
          altKey: false,
        },
        "mod+k",
      ),
    ).toBe(true);
  });

  it("uses the Chinese defaults", () => {
    render(
      <CommandDialog
        isOpen
        onOpenChange={() => {}}
        items={[]}
        onSelect={() => {}}
      />,
    );
    expect(
      screen.getByRole("dialog", { name: /命令面板/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("没有匹配结果")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "搜索并跳转到后台模块、配置页或操作入口。",
    );
    expect(
      screen.getByRole("combobox", { name: "搜索命令、路径或关键字" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("listbox", { name: "命令结果" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Enter")).toBeInTheDocument();
  });

  it("lets consumer props override the defaults", () => {
    const { unmount } = render(
      <ModalRoot open>
        <ModalContent closeLabel="Dismiss modal">
          <ModalHeader>M</ModalHeader>
        </ModalContent>
      </ModalRoot>,
    );
    expect(
      screen.getByRole("button", { name: "Dismiss modal" }),
    ).toBeInTheDocument();
    unmount();
    render(
      <CommandDialog
        isOpen
        onOpenChange={() => {}}
        items={[]}
        onSelect={() => {}}
        title="Jump"
        description="Find a page"
        placeholder="Type"
        emptyText="Nothing"
      />,
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "Find a page",
    );
    expect(screen.getByText("Jump")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Type" })).toBeInTheDocument();
    expect(screen.getByText("Nothing")).toBeInTheDocument();
  });
});

describe("compat Popover", () => {
  it("maps showArrow and passes side / align / sideOffset (app usage)", async () => {
    const user = setup();
    const side: PopoverSide = "bottom";
    const align: PopoverAlign = "end";
    const contentProps: PopoverContentProps = {
      className: "notification-menu",
      side,
      align,
      sideOffset: 8,
      showArrow: true,
    };
    render(
      <Popover>
        <PopoverAnchor>
          <span>anchor</span>
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <button type="button">通知</button>
        </PopoverTrigger>
        <PopoverContent aria-label="运行通知" {...contentProps}>
          <PopoverClose>关闭通知</PopoverClose>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "通知" }));
    const content = screen.getByRole("dialog", { name: "运行通知" });
    expect(content).toHaveClass("ui-popover-content", "notification-menu");
    expect(content).toHaveAttribute("data-align", "end");
    expect(content.querySelector(".ui-popover-arrow")).not.toBeNull();
    await user.click(screen.getByRole("button", { name: "关闭通知" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("renders no arrow by default", () => {
    render(
      <Popover open>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent>body</PopoverContent>
      </Popover>,
    );
    expect(document.querySelector(".ui-popover-arrow")).toBeNull();
  });
});
