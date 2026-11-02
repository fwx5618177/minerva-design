import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import * as M from "./index";
it("avatar falls back on image errors and group caps visible children", () => {
  const { container } = render(
    <M.AvatarGroup max={2}>
      <M.Avatar src="bad.png" name="Ada Lovelace" />
      <M.Avatar name="Grace Hopper" />
      <M.Avatar name="Linus" />
    </M.AvatarGroup>,
  );
  fireEvent.error(container.querySelector("img")!);
  expect(screen.getByText("AL")).toBeInTheDocument();
  expect(screen.getByText("+1")).toBeInTheDocument();
  expect(screen.queryByText("L")).not.toBeInTheDocument();
});
it("skeleton reveals loaded content and empty state presents actions", () => {
  const { rerender } = render(<M.Skeleton loading>Loaded content</M.Skeleton>);
  expect(screen.queryByText("Loaded content")).not.toBeInTheDocument();
  rerender(<M.Skeleton loading={false}>Loaded content</M.Skeleton>);
  expect(screen.getByText("Loaded content")).toBeInTheDocument();
  rerender(<M.Empty title="Nothing" action={<M.Button>Create</M.Button>} />);
  expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
});
it("disabled interactive card blocks clicks and icon button toggles", () => {
  const click = vi.fn(),
    toggle = vi.fn();
  render(
    <>
      <M.Card interactive disabled onClick={click}>
        Card
      </M.Card>
      <M.IconButton label="Favorite" icon="★" onPressedChange={toggle} />
    </>,
  );
  fireEvent.click(screen.getByText("Card"));
  expect(click).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Favorite" }));
  expect(toggle).toHaveBeenCalledWith(true);
});
it("layout uses native views with concrete spacing and grid geometry", () => {
  const { container } = render(
    <M.Box p={4}>
      <M.HStack gap={2}>
        <M.ResponsiveGrid columns={3} gap={4}>
          Cells
        </M.ResponsiveGrid>
      </M.HStack>
    </M.Box>,
  );
  expect(container.querySelector('[data-minerva="box"]')).toHaveStyle({
    padding: "16px",
  });
  expect(
    container.querySelector('[data-minerva="responsive-grid"]'),
  ).toHaveStyle({ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" });
});
it("theme provider toggles inherited tokens without browser globals", () => {
  const { container } = render(
    <M.ConfigProvider theme="light">
      <M.ThemeToggle />
    </M.ConfigProvider>,
  );
  expect(
    container.querySelector('[data-minerva="config-provider"]'),
  ).toHaveAttribute("data-theme", "light");
  fireEvent.click(screen.getByRole("button", { name: "Dark" }));
  expect(
    container.querySelector('[data-minerva="config-provider"]'),
  ).toHaveAttribute("data-theme", "dark");
});
it("progress indicator has a determinate mode for bar and circle", () => {
  const { container, rerender } = render(
    <M.ProgressIndicator
      variant="bar"
      value={3}
      max={4}
      showValue
      color="success"
    />,
  );
  const bar = screen.getByRole("progressbar", { name: "Progress" });
  expect(bar).toHaveAttribute("aria-valuenow", "3");
  expect(bar).toHaveAttribute("aria-valuemin", "0");
  expect(bar).toHaveAttribute("aria-valuemax", "4");
  expect(bar).toHaveClass("mn-color-success");
  const fill = container.querySelector(".mn-progress-bar-fill") as HTMLElement;
  expect(fill).toHaveClass("mn-progress-determinate");
  expect(fill.style.width).toBe("75%");
  expect(container.querySelector(".mn-progress-value")).toHaveTextContent(
    "75%",
  );

  rerender(
    <M.ProgressIndicator
      variant="circle"
      value={150}
      showValue
      format={(value, max) => `${value}/${max}`}
    />,
  );
  const ring = screen.getByRole("progressbar");
  expect(ring).toHaveAttribute("aria-valuenow", "100");
  expect(ring).toHaveAttribute("aria-valuetext", "100/100");
  expect(container.querySelector(".mn-progress-ring")).not.toBeNull();
  expect(container.querySelector(".mn-spinner")).toBeNull();

  rerender(<M.ProgressIndicator variant="spinner" value={50} showValue />);
  const spinner = screen.getByRole("progressbar", { name: "Loading" });
  expect(spinner).not.toHaveAttribute("aria-valuenow");
  expect(container.querySelector(".mn-progress-value")).toBeNull();

  rerender(<M.ProgressIndicator variant="bar" />);
  expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  expect(container.querySelector(".mn-progress-bar-fill")).not.toHaveClass(
    "mn-progress-determinate",
  );
});
it("page header and section are their own blocks, not extra .mn-page roots", () => {
  const { container } = render(
    <M.Page>
      <M.PageHeader title="Title" className="custom-header" />
      <M.PageSection title="Section" />
    </M.Page>,
  );
  expect(container.querySelectorAll(".mn-page")).toHaveLength(1);
  const header = container.querySelector('[data-minerva="page-header"]')!;
  const section = container.querySelector('[data-minerva="page-section"]')!;
  expect(header.className).toContain("mn-page-header");
  expect(header.className).toContain("mn-page__header");
  expect(header.className).toContain("custom-header");
  expect(section.className).toContain("mn-page-section");
  expect(section.className).toContain("mn-page__section");
  expect(section.getAttribute("data-part")).toBe("root");
});
