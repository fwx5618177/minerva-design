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
