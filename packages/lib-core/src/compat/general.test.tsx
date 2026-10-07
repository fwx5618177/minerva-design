// @novel-isr/ui compat ("general" group): every export rendered with props
// copied from novel-isr-ui's own tests and from the apps (novel-rating,
// admin-dashboard). Runs under lib-core's default "en" language: the novel
// (Chinese) defaults must come from the compat layer itself.
import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  IconButton,
  Pagination,
  Steps,
  Tag,
  Upload,
  type AlertProps,
  type AlertStatus,
  type AlertVariant,
  type AvatarGroupProps,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type BadgeColorScheme,
  type BadgeProps,
  type BadgeVariant,
  type ButtonColorScheme,
  type ButtonIntent,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
  type IconButtonProps,
  type PaginationProps,
  type StepItem,
  type StepsProps,
  type TagColorScheme,
  type TagProps,
  type TagSize,
  type UploadItem,
  type UploadProps,
} from "./general";

// Type-level: novel-isr-ui prop shapes are accepted as-is.
const buttonVariant: ButtonVariant = "outline";
const buttonSize: ButtonSize = "lg";
const buttonColor: ButtonColorScheme = "gray";
const buttonIntent: ButtonIntent = "confirm";
const buttonProps: ButtonProps = {
  variant: buttonVariant,
  size: buttonSize,
  colorScheme: buttonColor,
  intent: buttonIntent,
  isLoading: false,
  loadingText: "保存中",
  fullWidth: true,
};
const iconButtonProps: IconButtonProps = { label: "关闭", size: "sm" };
const avatarSize: AvatarSize = "2xl";
const avatarShape: AvatarShape = "square";
const avatarProps: AvatarProps = {
  name: "张三",
  size: avatarSize,
  shape: avatarShape,
};
const avatarGroupProps: AvatarGroupProps = { max: 2 };
const badgeVariant: BadgeVariant = "dot";
const badgeColor: BadgeColorScheme = "success";
const badgeProps: BadgeProps = {
  variant: badgeVariant,
  colorScheme: badgeColor,
};
const tagSize: TagSize = "sm";
const tagColor: TagColorScheme = "brand";
const tagProps: TagProps = { size: tagSize, colorScheme: tagColor };
const alertStatus: AlertStatus = "danger";
const alertVariant: AlertVariant = "outline";
const alertProps: AlertProps = {
  status: alertStatus,
  variant: alertVariant,
  title: "出错了",
};
const paginationProps: PaginationProps = {
  total: 100,
  pageSize: 10,
  page: 1,
  onPageChange: () => {},
  pageSizeOptions: [10, 20] as const,
};
const stepItems: StepItem[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];
const stepsProps: StepsProps = { items: stepItems, value: "draft" };
const uploadItem: UploadItem = { id: "1", name: "a.png", status: "done" };
const uploadProps: UploadProps = {
  label: "Cover",
  value: [uploadItem],
  onFilesSelected: () => {},
};
void [
  buttonProps,
  iconButtonProps,
  avatarProps,
  avatarGroupProps,
  badgeProps,
  tagProps,
  alertProps,
  paginationProps,
  stepsProps,
  uploadProps,
];

describe("compat Button", () => {
  it("renders novel's default hooks and does not submit forms", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Button>Save</Button>
      </form>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(
      "ui-button",
      "ui-button-variant-solid",
      "ui-button-size-md",
      "ui-button-color-primary",
    );
    await user.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it.each([
    ["danger", "danger"],
    ["warning", "warning"],
    ["confirm", "success"],
    ["secondary", "secondary"],
    ["neutral", "neutral"],
    ["primary", "primary"],
  ] as const)("maps intent=%s to color %s", (intent, color) => {
    render(<Button intent={intent}>X</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      `ui-button-color-${color}`,
      `ui-button-intent-${intent}`,
    );
  });

  it("lets an explicit colorScheme win over intent and keeps alias hooks", () => {
    const { rerender } = render(
      <Button intent="danger" colorScheme="accent">
        X
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "ui-button-color-accent",
      "ui-button-intent-danger",
    );
    expect(button).not.toHaveClass("ui-button-color-danger");
    rerender(<Button colorScheme="brand">X</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "ui-button-color-brand",
      "ui-button-color-primary",
    );
    rerender(<Button colorScheme="gray">X</Button>);
    expect(screen.getByRole("button")).toHaveClass("ui-button-color-gray");
  });

  it("applies variant, size, fullWidth and icons (app usages)", () => {
    render(
      <Button
        variant="ghost"
        size="sm"
        intent="neutral"
        leftIcon={<i data-testid="left" />}
        rightIcon={<i data-testid="right" />}
        fullWidth
        className="consumer"
      >
        Go
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toHaveClass(
      "ui-button-variant-ghost",
      "ui-button-size-sm",
      "ui-button-fullwidth",
      "consumer",
    );
    const children = Array.from(button.children);
    expect(children[0]).toContainElement(screen.getByTestId("left"));
    expect(children[1]).toHaveClass("ui-button-label");
    expect(children[2]).toContainElement(screen.getByTestId("right"));
  });

  it("isLoading disables the button and loadingText replaces the label", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(
      <Button isLoading type="submit" onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button).toHaveClass("ui-button-loading");
    expect(button.querySelector(".ui-button-label")).toHaveClass(
      "ui-button-hidden",
    );
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
    rerender(
      <Button isLoading loadingText="Saving...">
        Save
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Saving...");
  });

  it("forwards ref and native attributes", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} name="action" data-owner="x">
        Go
      </Button>,
    );
    expect(ref.current).toBe(screen.getByRole("button"));
    expect(ref.current).toHaveAttribute("data-owner", "x");
  });
});

describe("compat IconButton", () => {
  it("uses label as accessible name and hides the icon from AT", () => {
    render(
      <IconButton label="Delete">
        <svg data-testid="glyph" />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass(
      "ui-icon-button",
      "ui-button-variant-ghost",
      "ui-button-intent-neutral",
      "ui-button-color-neutral",
    );
    expect(button).toHaveAttribute("type", "button");
    expect(screen.getByTestId("glyph").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("accepts variant/intent overrides, forwards ref and handles clicks", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(
      <IconButton
        ref={ref}
        label="Remove"
        variant="solid"
        intent="danger"
        size="xs"
        className="x"
        onClick={onClick}
      >
        <svg />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Remove" });
    expect(ref.current).toBe(button);
    expect(button).toHaveClass(
      "ui-button-variant-solid",
      "ui-button-color-danger",
      "ui-button-size-xs",
      "x",
    );
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("maps link to ghost, colorScheme aliases and isLoading", () => {
    render(
      <IconButton
        label="L"
        variant="link"
        colorScheme="gray"
        isLoading
        fullWidth
      >
        <svg />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "L" });
    expect(button).toHaveClass(
      "ui-button-variant-ghost",
      "ui-button-color-gray",
    );
    expect(button).toBeDisabled();
  });

  it("shows the label as a tooltip on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <IconButton label="Settings">
        <svg />
      </IconButton>,
    );
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Settings");
  });

  it("is disabled and keeps caller-owned descriptions", () => {
    render(
      <>
        <span id="d1">first</span>
        <IconButton label="Delete device" aria-describedby="d1" disabled>
          R
        </IconButton>
      </>,
    );
    const button = screen.getByRole("button", { name: "Delete device" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-describedby", "d1");
  });
});

describe("compat Avatar / AvatarGroup", () => {
  it("renders an image with novel's alt fallback chain", () => {
    const { container, rerender } = render(
      <Avatar src="/a.png" name="Bob Smith" />,
    );
    expect(screen.getByRole("img", { name: "Bob Smith" })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass(
      "ui-avatar",
      "ui-avatar-size-md",
    );
    rerender(<Avatar src="/a.png" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("uses novel's pixel sizes, square shape and initials (app usage)", () => {
    render(<Avatar name="jane doe" size="sm" shape="square" data-testid="a" />);
    const avatar = screen.getByTestId("a");
    expect(avatar).toHaveStyle({ width: "32px", height: "32px" });
    expect(avatar).toHaveClass("ui-avatar-size-sm", "ui-avatar-shape-square");
    expect(avatar).toHaveTextContent("JD");
  });

  it("falls back to children, then '?', with a Chinese label", () => {
    const { container, rerender } = render(<Avatar>AB</Avatar>);
    expect(container).toHaveTextContent("AB");
    rerender(<Avatar />);
    expect(container).toHaveTextContent("?");
    expect(screen.getByRole("img", { name: "头像" })).toBeInTheDocument();
  });

  it("limits a group to max with a +N indicator and a Chinese label", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(
      <AvatarGroup max={2} ref={ref}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(group);
    expect(group).toHaveClass("ui-avatar-group");
    const avatars = group.querySelectorAll(".ui-avatar");
    expect(avatars).toHaveLength(3);
    expect(avatars[2]).toHaveTextContent("+2");
    expect(
      screen.getByRole("group", { name: "头像组，另有 2 位" }),
    ).toBeInTheDocument();
  });

  it("labels a group without overflow", () => {
    render(
      <AvatarGroup>
        <Avatar name="A" />
      </AvatarGroup>,
    );
    expect(screen.getByRole("group", { name: "头像组" })).toBeInTheDocument();
  });
});

describe("compat Badge", () => {
  it("renders a plain span with subtle brand defaults", () => {
    render(<Badge>NEW</Badge>);
    const badge = screen.getByText("NEW");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass(
      "ui-badge",
      "ui-badge-variant-subtle",
      "ui-badge-color-brand",
    );
    expect(screen.queryByRole("status")).toBeNull();
  });

  it.each<[BadgeVariant, BadgeColorScheme]>([
    ["solid", "success"],
    ["outline", "warning"],
    ["dot", "danger"],
    ["subtle", "gray"],
  ])("applies variant %s and color %s hooks", (variant, colorScheme) => {
    render(
      <Badge variant={variant} colorScheme={colorScheme} data-testid="b">
        {variant === "dot" ? undefined : "x"}
      </Badge>,
    );
    expect(screen.getByTestId("b")).toHaveClass(
      `ui-badge-variant-${variant}`,
      `ui-badge-color-${colorScheme}`,
    );
  });

  it("keeps rich children inline and forwards ref, role and attributes", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge
        ref={ref}
        className="consumer"
        aria-label="3 unread"
        variant="dot"
        role="status"
        title="t"
      />,
    );
    const badge = screen.getByRole("status", { name: "3 unread" });
    expect(ref.current).toBe(badge);
    expect(badge).toHaveClass("ui-badge", "consumer");
    expect(badge).not.toHaveAttribute("colorscheme");
    render(
      <Badge colorScheme="success">
        <i data-testid="icon" /> 已发布
      </Badge>,
    );
    expect(screen.getByTestId("icon").parentElement).toHaveClass("ui-badge");
  });
});

describe("compat Tag", () => {
  it("renders children with default size/color and no close button", () => {
    render(<Tag data-testid="tag">JavaScript</Tag>);
    const tag = screen.getByTestId("tag");
    expect(tag).toHaveTextContent("JavaScript");
    expect(tag).toHaveClass("ui-tag", "ui-tag-size-md", "ui-tag-color-gray");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it.each<TagColorScheme>(["brand", "gray", "success", "warning", "danger"])(
    "applies color scheme %s",
    (color) => {
      render(
        <Tag data-testid="tag" colorScheme={color} size="lg">
          x
        </Tag>,
      );
      expect(screen.getByTestId("tag")).toHaveClass(
        `ui-tag-color-${color}`,
        "ui-tag-size-lg",
      );
    },
  );

  it("renders novel's 'remove' close button that does not trigger onClick", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onTagClick = vi.fn();
    render(
      <Tag onClose={onClose} onClick={onTagClick}>
        v2.0
      </Tag>,
    );
    const close = screen.getByRole("button", { name: "remove" });
    expect(close).toHaveAttribute("title", "remove");
    expect(close).toHaveClass("ui-tag-close");
    await user.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onTagClick).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "v2.0" }));
    expect(onTagClick).toHaveBeenCalledTimes(1);
  });

  it("supports a custom close label, disabled and native attributes", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const ref = createRef<HTMLSpanElement>();
    render(
      <Tag
        ref={ref}
        id="t"
        onClose={onClose}
        closeLabel="Remove React"
        disabled
      >
        React
      </Tag>,
    );
    const close = screen.getByRole("button", { name: "Remove React" });
    expect(close).toBeDisabled();
    await user.click(close);
    expect(onClose).not.toHaveBeenCalled();
    expect(ref.current).toHaveAttribute("id", "t");
    expect(ref.current).not.toHaveAttribute("disabled");
  });
});

describe("compat Alert", () => {
  it("renders an alert region with default status/variant hooks", () => {
    render(<Alert>Saved</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(
      "ui-alert",
      "ui-alert-status-info",
      "ui-alert-variant-subtle",
    );
    expect(alert.querySelector(".ui-alert-description")).toHaveTextContent(
      "Saved",
    );
    expect(alert.querySelector(".ui-alert-title")).toBeNull();
    expect(screen.getByRole("img", { name: "信息图标" })).toBeInTheDocument();
  });

  it.each<AlertStatus>(["info", "success", "warning", "danger"])(
    "renders a default icon for status %s",
    (status) => {
      render(
        <Alert status={status} variant="solid">
          Body
        </Alert>,
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass(
        `ui-alert-status-${status}`,
        "ui-alert-variant-solid",
      );
      expect(alert.querySelector(".ui-alert-icon svg")).not.toBeNull();
    },
  );

  it("renders title, custom / hidden icons and forwards attributes (app usage)", () => {
    const ref = createRef<HTMLDivElement>();
    const { rerender } = render(
      <Alert
        ref={ref}
        status="warning"
        variant="outline"
        title="出错了"
        id="a1"
        icon={<span data-testid="custom-icon">!</span>}
      >
        服务器返回 500
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(ref.current).toBe(alert);
    expect(alert).toHaveAttribute("id", "a1");
    expect(alert).toHaveClass("ui-alert-variant-outline");
    expect(alert).not.toHaveAttribute("title");
    expect(alert.querySelector(".ui-alert-title")).toHaveTextContent("出错了");
    expect(screen.getByTestId("custom-icon").parentElement).toHaveClass(
      "ui-alert-icon",
    );
    rerender(<Alert hideIcon>x</Alert>);
    expect(
      screen.getByRole("alert").querySelector(".ui-alert-icon"),
    ).toBeNull();
  });
});

describe("compat Pagination", () => {
  const renderPager = (props: Partial<PaginationProps> = {}) => {
    const onPageChange = vi.fn();
    const utils = render(
      <Pagination
        total={100}
        pageSize={10}
        page={1}
        onPageChange={onPageChange}
        {...props}
      />,
    );
    return { ...utils, onPageChange };
  };
  const sequence = (container: HTMLElement) =>
    Array.from(
      container.querySelectorAll(
        ".ui-pagination-item:not(.prev):not(.next), .ui-pagination-ellipsis",
      ),
      (node) => node.textContent,
    );

  it("collapses the page list like novel and uses Chinese labels", () => {
    const { container } = renderPager({ page: 5 });
    expect(sequence(container)).toEqual(["1", "…", "4", "5", "6", "…", "10"]);
    expect(screen.getByRole("navigation", { name: "分页" })).toHaveClass(
      "ui-pagination",
    );
    const current = screen.getByRole("button", { name: "5" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveAttribute("data-active", "true");
  });

  it("navigates with page buttons and prev/next", async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPager({ page: 5 });
    await user.click(screen.getByRole("button", { name: "6" }));
    expect(onPageChange).toHaveBeenLastCalledWith(6);
    await user.click(screen.getByRole("button", { name: "上一页" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(onPageChange).toHaveBeenLastCalledWith(6);
  });

  it("shows novel's total text and custom totals", () => {
    const { rerender } = renderPager({ total: 27, showTotal: true });
    expect(screen.getByText("共 27 条")).toHaveClass("ui-pagination-total");
    rerender(
      <Pagination
        total={27}
        pageSize={10}
        page={3}
        onPageChange={() => {}}
        showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}`}
      />,
    );
    expect(screen.getByText("21-27 / 27")).toBeInTheDocument();
  });

  it("simple mode shows a live counter and the simple hook", () => {
    const { container } = renderPager({ simple: true, page: 3 });
    expect(container.querySelector("nav")).toHaveClass("ui-pagination-simple");
    expect(sequence(container)).toEqual([]);
    expect(container.querySelector(".ui-pagination-counter")).toHaveTextContent(
      "3 / 10",
    );
  });

  it("hideEdges, and the size selector only with options and a handler", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { rerender } = renderPager({
      hideEdges: true,
      pageSizeOptions: [10, 20],
    });
    expect(screen.queryByRole("button", { name: "上一页" })).toBeNull();
    expect(screen.queryByRole("combobox", { name: "每页显示条数" })).toBeNull();
    const onPageSizeChange = vi.fn();
    const onPageChange = vi.fn();
    rerender(
      <Pagination
        total={100}
        pageSize={10}
        page={2}
        onPageChange={onPageChange}
        pageSizeOptions={[10, 20]}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    // novel's Select popup: a combobox button opening a listbox
    const select = screen.getByRole("combobox", { name: "每页显示条数" });
    expect(select.tagName).toBe("BUTTON");
    expect(select).toHaveTextContent("10 条 / 页");
    select.focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("option", { name: "20 条 / 页" }));
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("forwards ref and attributes", () => {
    const ref = createRef<HTMLElement>();
    renderPager({ ref, id: "pager", className: "consumer" });
    const nav = screen.getByRole("navigation");
    expect(ref.current).toBe(nav);
    expect(nav).toHaveAttribute("id", "pager");
    expect(nav).toHaveClass("consumer");
  });
});

describe("compat Steps", () => {
  it("renders novel's labelled list and reports navigation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Steps items={stepItems} value="draft" onValueChange={onValueChange} />,
    );
    expect(screen.getByRole("list", { name: "步骤" })).toHaveClass("ui-steps");
    expect(screen.getByRole("button", { name: "Draft" })).toHaveAttribute(
      "aria-current",
      "step",
    );
    await user.click(screen.getByRole("button", { name: "Review" }));
    await user.click(screen.getByRole("button", { name: "Publish" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("review");
  });

  it("is read-only without onValueChange and accepts a label", () => {
    render(<Steps items={stepItems} value="review" label="Publishing" />);
    expect(
      screen.getByRole("list", { name: "Publishing" }),
    ).toBeInTheDocument();
    screen
      .getAllByRole("button")
      .forEach((button) => expect(button).toBeDisabled());
  });
});

describe("compat Upload", () => {
  it("renders novel's Chinese texts and validates drops", () => {
    const onFilesSelected = vi.fn();
    const { container } = render(
      <Upload
        label="Cover"
        accept="image/*"
        maxSize={8}
        value={[]}
        onFilesSelected={onFilesSelected}
      />,
    );
    expect(screen.getByRole("button", { name: "选择文件" })).toBeEnabled();
    const dropzone = container.querySelector(".ui-upload-dropzone")!;
    const file = new File(["png"], "cover.png", { type: "image/png" });
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [new File(["t"], "notes.txt", { type: "text/plain" })],
      },
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "notes.txt：不支持此文件类型",
    );
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [new File(["123456789"], "large.png", { type: "image/png" })],
      },
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "large.png：文件大小超过限制",
    );
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file, file] },
    });
    expect(screen.getByRole("alert")).toHaveTextContent("最多选择 1 个文件");
  });

  it("maps busy, selectLabel and keeps controlled retry/remove", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onRetry = vi.fn();
    const items: UploadItem[] = [
      { id: "u", name: "up.png", status: "uploading" },
      { id: "d", name: "ok.png", status: "done" },
      { id: "failed", name: "cover.png", status: "error" },
    ];
    const { rerender, container } = render(
      <Upload
        label="Cover"
        value={items}
        multiple
        onFilesSelected={() => {}}
        onRemove={onRemove}
        onRetry={onRetry}
        selectLabel="Browse"
      />,
    );
    expect(screen.getByRole("button", { name: "Browse" })).toBeInTheDocument();
    expect(screen.getByText("上传中")).toBeInTheDocument();
    expect(screen.getByText("已上传")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("上传失败");
    await user.click(screen.getByRole("button", { name: "重试 cover.png" }));
    expect(onRetry).toHaveBeenCalledWith(items[2]);
    await user.click(screen.getByRole("button", { name: "移除 cover.png" }));
    expect(onRemove).toHaveBeenCalledWith(items[2]);
    rerender(
      <Upload label="Cover" value={[]} busy onFilesSelected={() => {}} />,
    );
    expect(container.querySelector("input")).toBeDisabled();
    expect(screen.getByRole("group", { name: "Cover" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
});
