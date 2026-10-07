import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CodeBlock,
  DescriptionList,
  Divider,
  EmptyState,
  List,
  ListItem,
  LoadingState,
  Prose,
  Skeleton,
  SkeletonText,
  Spinner,
  TextLink,
  type CardPadding,
  type CardProps,
  type CardSectionProps,
  type CardTitleProps,
  type CardVariant,
  type CodeBlockProps,
  type DescriptionListItem,
  type DescriptionListProps,
  type DividerOrientation,
  type DividerProps,
  type EmptyStateProps,
  type EmptyStateSize,
  type ListItemProps,
  type ListProps,
  type LoadingStateProps,
  type LoadingStateSize,
  type ProseProps,
  type SkeletonProps,
  type SkeletonTextProps,
  type SkeletonVariant,
  type SpinnerColorScheme,
  type SpinnerProps,
  type SpinnerSize,
  type TextLinkProps,
} from "./display";

// Type-level: novel-isr-ui prop shapes are accepted as-is.
const cardVariant: CardVariant = "outline";
const cardPadding: CardPadding = "lg";
const cardProps: CardProps = {
  as: "button",
  type: "button",
  variant: "elevated",
  padding: "sm",
  interactive: true,
  href: "/x",
};
const sectionProps: CardSectionProps = { padding: "none" };
const titleProps: CardTitleProps = { as: "h2" };
const dividerOrientation: DividerOrientation = "vertical";
const dividerProps: DividerProps = { orientation: "horizontal", id: "d" };
const skeletonVariant: SkeletonVariant = "rect";
const skeletonProps: SkeletonProps = {
  variant: "circle",
  size: 4,
  noAnimation: true,
};
const skeletonTextProps: SkeletonTextProps = {
  lines: 2,
  gap: 4,
  noAnimation: true,
};
const emptySize: EmptyStateSize = "compact";
const emptyProps: EmptyStateProps = { title: "t", action: null, size: "lg" };
const spinnerSize: SpinnerSize = "xl";
const spinnerColor: SpinnerColorScheme = "gray";
const spinnerProps: SpinnerProps = {
  size: "xs",
  colorScheme: "current",
  label: "x",
};
const loadingSize: LoadingStateSize = "lg";
const loadingProps: LoadingStateProps = { size: "compact", label: "x" };
const linkProps: TextLinkProps = { asChild: true, variant: "action" };
const dlItem: DescriptionListItem = { key: "k", label: "L", value: 0 };
const dlProps: DescriptionListProps = { items: [dlItem] };
const listProps: ListProps = { density: "compact", dividers: false };
const listItemProps: ListItemProps = { primary: "p", secondary: 0, value: 1 };
const codeProps: CodeBlockProps = {
  "aria-label": "Payload",
  children: "{}",
  wrap: false,
  maxHeight: 10,
};
const proseProps: ProseProps = { asChild: false };
void [
  cardVariant,
  cardPadding,
  cardProps,
  sectionProps,
  titleProps,
  dividerOrientation,
  dividerProps,
  skeletonVariant,
  skeletonProps,
  skeletonTextProps,
  emptySize,
  emptyProps,
  spinnerSize,
  spinnerColor,
  spinnerProps,
  loadingSize,
  loadingProps,
  linkProps,
  dlProps,
  listProps,
  listItemProps,
  codeProps,
  proseProps,
];

describe("compat display: Card", () => {
  it("defaults to the outline variant and md padding (novel hooks)", () => {
    render(<Card data-testid="card">content</Card>);
    const card = screen.getByTestId("card");
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveClass(
      "ui-card",
      "ui-card-variant-outline",
      "ui-card-padding-md",
    );
    expect(card).not.toHaveClass("ui-card-interactive");
  });

  it.each<CardVariant>(["outline", "elevated", "subtle", "ghost"])(
    "applies variant %s",
    (variant) => {
      render(
        <Card data-testid="card" variant={variant} padding="none">
          x
        </Card>,
      );
      expect(screen.getByTestId("card")).toHaveClass(
        `ui-card-variant-${variant}`,
        "ui-card-padding-none",
      );
    },
  );

  it("renders as an interactive ghost link like the community pages", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Card
        ref={ref}
        variant="ghost"
        padding="md"
        interactive
        as="a"
        href="/groups/1"
        className="groupCard"
      >
        <h2>Group</h2>
      </Card>,
    );
    const link = screen.getByRole("link", { name: "Group" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "/groups/1");
    expect(link).toHaveClass(
      "ui-card-interactive",
      "ui-card-variant-ghost",
      "groupCard",
    );
    expect(link).not.toHaveAttribute("interactive");
  });

  it("maps the native button type and keeps disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card as="button" type="submit" disabled onClick={onClick}>
        Pick
      </Card>,
    );
    const button = screen.getByRole("button", { name: "Pick" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders sections with ui-card-* hooks and padding overrides", () => {
    render(
      <Card>
        <CardHeader data-testid="h">
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardBody data-testid="b" padding="lg">
          Body
        </CardBody>
        <CardFooter data-testid="f" padding="sm" className="ft">
          Footer
        </CardFooter>
      </Card>,
    );
    expect(screen.getByTestId("h")).toHaveClass("ui-card-header");
    expect(screen.getByTestId("h").className).not.toMatch(/ui-card-padding-/);
    expect(screen.getByTestId("b")).toHaveClass(
      "ui-card-body",
      "ui-card-padding-lg",
    );
    expect(screen.getByTestId("f")).toHaveClass(
      "ui-card-footer",
      "ui-card-padding-sm",
      "ft",
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Title" }),
    ).toHaveClass("ui-card-title");
    expect(screen.getByText("Desc")).toHaveClass("ui-card-description");
  });
});

describe("compat display: Divider", () => {
  it("renders a flush horizontal <hr> (Footer / Header menu usage)", () => {
    render(<Divider className="account-divider" />);
    const sep = screen.getByRole("separator");
    expect(sep.tagName).toBe("HR");
    expect(sep).toHaveClass(
      "ui-divider",
      "ui-divider-horizontal",
      "account-divider",
    );
    expect(sep.style.marginTop).toBe("0px");
  });

  it("renders a labelled divider (LoginForm usage) and a stretching vertical one", () => {
    const { rerender } = render(<Divider>或</Divider>);
    const labelled = screen.getByRole("separator");
    expect(labelled.tagName).toBe("DIV");
    expect(labelled).toHaveClass("ui-divider-with-label");
    expect(labelled).toHaveTextContent("或");
    rerender(<Divider orientation="vertical">OR</Divider>);
    const vertical = screen.getByRole("separator");
    expect(vertical).toHaveClass("ui-divider-vertical", "flexItem");
    expect(vertical).toHaveAttribute("aria-orientation", "vertical");
    expect(vertical.style.height).toBe("100%");
    expect(screen.queryByText("OR")).toBeNull();
  });
});

describe("compat display: Skeleton", () => {
  it("renders a decorative shimmering span", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveClass(
      "ui-skeleton",
      "ui-skeleton-variant-text",
      "animation-wave",
    );
    expect(el).not.toHaveClass("ui-skeleton-static");
  });

  it("sizes circles from size then width, and lets sizing props win over style", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container, rerender } = render(
      <Skeleton ref={ref} variant="circle" size={40} width={10} height={99} />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(el);
    expect(el).toHaveClass("ui-skeleton-variant-circle");
    expect(el.style.width).toBe("40px");
    expect(el.style.height).toBe("40px");
    rerender(<Skeleton variant="circle" />);
    expect(el.style.width).toBe("32px");
    rerender(
      <Skeleton
        variant="rect"
        noAnimation
        width={50}
        height="12rem"
        style={{ width: 10, opacity: 0.5 }}
        data-id="s"
      />,
    );
    expect(el).toHaveClass("ui-skeleton-variant-rect", "ui-skeleton-static");
    expect(el.style.width).toBe("50px");
    expect(el.style.height).toBe("12rem");
    expect(el.style.opacity).toBe("0.5");
    expect(el).toHaveAttribute("data-id", "s");
  });

  it("renders SkeletonText lines with px gaps", () => {
    const { container } = render(
      <SkeletonText
        lines={5}
        lineHeight={12}
        gap={4}
        shrinkLast={false}
        noAnimation
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("ui-skeleton-text");
    expect(root.style.gap).toBe("4px");
    const lines = root.querySelectorAll<HTMLElement>(".ui-skeleton");
    expect(lines).toHaveLength(5);
    lines.forEach((line) => {
      expect(line.style.width).toBe("100%");
      expect(line.style.height).toBe("12px");
      expect(line).toHaveClass("ui-skeleton-static");
    });
  });

  it("defaults SkeletonText to 3 shimmering lines with a shrunk last line", () => {
    const { container } = render(<SkeletonText />);
    const root = container.firstElementChild as HTMLElement;
    const lines = root.querySelectorAll<HTMLElement>(".ui-skeleton");
    expect(lines).toHaveLength(3);
    expect(lines[2]!.style.width).toBe("70%");
    expect(lines[0]).toHaveClass("animation-wave");
    expect(root.style.gap).toBe("var(--space-2)");
  });
});

describe("compat display: EmptyState", () => {
  it("renders only the provided title (minimal admin usage)", () => {
    render(<EmptyState title="Redis 不可用" />);
    const status = screen.getByRole("status", { name: "Redis 不可用" });
    expect(status).toHaveClass("ui-empty-state", "ui-empty-state-size-default");
    expect(status.querySelector(".ui-empty-state-icon")).toBeNull();
    expect(status.querySelector(".ui-empty-state-description")).toBeNull();
    expect(status.querySelector(".ui-empty-state-actions")).toBeNull();
    expect(status).not.toHaveAttribute("title");
  });

  it("renders icon, description and both actions (I18nPage usage)", async () => {
    const user = userEvent.setup();
    const onPrimary = vi.fn();
    render(
      <EmptyState
        size="compact"
        icon={<svg data-testid="icon" />}
        title="暂无文案"
        description="还没有文案，可以新建一条试试。"
        action={
          <button type="button" onClick={onPrimary}>
            新建
          </button>
        }
        secondaryAction={<a href="/x">Back</a>}
        className="x"
      >
        ignored
      </EmptyState>,
    );
    const status = screen.getByRole("status");
    expect(status).toHaveClass("ui-empty-state-size-compact", "x");
    expect(screen.getByTestId("icon").parentElement).toHaveClass(
      "ui-empty-state-icon",
    );
    expect(screen.getByRole("button").parentElement).toHaveClass(
      "ui-empty-state-actions",
    );
    expect(screen.queryByText("ignored")).toBeNull();
    await user.click(screen.getByRole("button"));
    expect(onPrimary).toHaveBeenCalledOnce();
  });

  it("maps lg and allows role override with refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <EmptyState
        ref={ref}
        size="lg"
        role="region"
        aria-label="Empty list"
        title="t"
      />,
    );
    const region = screen.getByRole("region", { name: "Empty list" });
    expect(ref.current).toBe(region);
    expect(region).toHaveClass("ui-empty-state-size-lg");
  });
});

describe("compat display: Spinner / LoadingState", () => {
  it("renders novel's own default label (passed explicitly, not via i18n)", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Loading…");
    expect(status).toHaveClass(
      "ui-spinner",
      "ui-spinner-size-md",
      "ui-spinner-color-brand",
    );
  });

  it.each<[SpinnerSize, SpinnerColorScheme]>([
    ["xs", "current"],
    ["lg", "brand"],
    ["xl", "gray"],
  ])("maps size %s and colorScheme %s (app usages)", (size, colorScheme) => {
    render(<Spinner size={size} colorScheme={colorScheme} />);
    expect(screen.getByRole("status")).toHaveClass(
      `ui-spinner-size-${size}`,
      `ui-spinner-color-${colorScheme}`,
    );
  });

  it("forwards aria overrides (LoadingPage usage)", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Spinner
        ref={ref}
        size="lg"
        colorScheme="brand"
        aria-hidden="true"
        data-testid="sp"
      />,
    );
    expect(ref.current).toBe(screen.getByTestId("sp"));
    expect(screen.getByTestId("sp")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders LoadingState with novel's default label and size hooks", () => {
    const { rerender } = render(<LoadingState />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass(
      "ui-loading-state",
      "ui-loading-state-size-default",
    );
    expect(status.textContent).toBe("Loading...");
    rerender(<LoadingState size="compact" label="Loading records..." />);
    expect(status).toHaveClass("ui-loading-state-size-compact");
    expect(status.textContent).toBe("Loading records...");
    rerender(<LoadingState size="lg" />);
    expect(status).toHaveClass("ui-loading-state-size-lg");
  });
});

describe("compat display: reading primitives", () => {
  it("re-exports TextLink, DescriptionList, List/ListItem, CodeBlock and Prose", () => {
    const { container } = render(
      <>
        <TextLink asChild variant="subtle">
          <a href="/articles">Articles</a>
        </TextLink>
        <DescriptionList items={[{ key: "k", label: "Passkeys", value: 0 }]} />
        <List aria-label="Devices">
          <ListItem primary="Phone" secondary={0} />
        </List>
        <CodeBlock aria-label="Payload">{"{}"}</CodeBlock>
        <Prose>
          <p>Body</p>
        </Prose>
      </>,
    );
    expect(screen.getByRole("link", { name: "Articles" })).toHaveClass(
      "ui-text-link",
      "ui-text-link-subtle",
    );
    expect(container.querySelector("a svg[aria-hidden='true']")).not.toBeNull();
    expect(
      container.querySelector(".ui-description-list dd")?.textContent,
    ).toBe("0");
    expect(screen.getByRole("list", { name: "Devices" })).toHaveClass(
      "ui-list",
    );
    expect(screen.getByRole("region", { name: "Payload" })).toHaveClass(
      "ui-code-block",
    );
    expect(container.querySelector(".ui-prose p")?.textContent).toBe("Body");
  });
});
