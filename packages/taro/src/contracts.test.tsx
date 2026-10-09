import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import * as M from "./index";
it("Select compound items display their label after selection", () => {
  render(
    <M.Select>
      <M.SelectGroup>
        <M.SelectLabel>People</M.SelectLabel>
        <M.SelectItem value="ada">Ada Lovelace</M.SelectItem>
      </M.SelectGroup>
    </M.Select>,
  );
  fireEvent.click(screen.getByRole("combobox", { name: "Please select" }));
  fireEvent.click(screen.getByRole("option", { name: "Ada Lovelace" }));
  expect(
    screen.getByRole("combobox", { name: "Ada Lovelace" }),
  ).toBeInTheDocument();
});
it("AutoComplete React contract fills label and emits original option", () => {
  const change = vi.fn(),
    select = vi.fn();
  const option = { value: "ada", label: "Ada Lovelace" };
  const { container } = render(
    <M.AutoComplete options={[option]} onChange={change} onSelect={select} />,
  );
  fireEvent.focus(container.querySelector("input")!);
  fireEvent.click(screen.getByRole("option", { name: "Ada Lovelace" }));
  expect(change).toHaveBeenCalledWith("Ada Lovelace");
  expect(select).toHaveBeenCalledWith(option);
});
it("Rating infers interactive mode from onChange and maps five stars to the max score", () => {
  const change = vi.fn();
  render(<M.Rating value={6} onChange={change} />);
  fireEvent.click(screen.getByRole("radio", { name: "10" }));
  expect(change).toHaveBeenCalledWith(10);
});
it("KeyValueEditor preserves stable ids, assigns new ids and resolves field errors by id", () => {
  const change = vi.fn();
  const { container } = render(
    <M.KeyValueEditor
      defaultEntries={[{ id: "row-1", key: "name", value: "Ada" }]}
      errors={{ "row-1": { key: "Duplicate key" } }}
      onChange={change}
    />,
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Duplicate key");
  fireEvent.input(container.querySelector("input")!, {
    target: { value: "fullName" },
  });
  expect(change).toHaveBeenLastCalledWith([
    { id: "row-1", key: "fullName", value: "Ada" },
  ]);
  fireEvent.click(screen.getByRole("button", { name: "Add entry" }));
  expect(change.mock.calls.at(-1)![0][1].id).toEqual(expect.any(String));
});
it("FormControl locks inherited fields but explicit disabled false overrides it", () => {
  const inherited = vi.fn(),
    override = vi.fn();
  const { container } = render(
    <M.FormControl disabled>
      <M.Input value="locked" onChange={inherited} />
      <M.Checkbox label="Allowed" disabled={false} onChange={override} />
    </M.FormControl>,
  );
  fireEvent.input(container.querySelector("input")!, {
    target: { value: "change" },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: "Allowed" }));
  expect(inherited).not.toHaveBeenCalled();
  expect(override).toHaveBeenCalledWith(true, expect.any(Object));
});
it("controlled Select, Checkbox and Modal requests do not mutate owner state", () => {
  const request = vi.fn();
  render(
    <>
      <M.Select
        value="a"
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ]}
        onChange={request}
      />
      <M.Checkbox checked={false} label="Agreement" onChange={request} />
      <M.Modal open title="Owned" onOpenChange={request}>
        Retained
      </M.Modal>
    </>,
  );
  fireEvent.click(screen.getByRole("combobox", { name: "Alpha" }));
  fireEvent.click(screen.getByRole("option", { name: "Beta" }));
  expect(screen.getByRole("combobox", { name: "Alpha" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("checkbox", { name: "Agreement" }));
  expect(screen.getByRole("checkbox", { name: "Agreement" })).toHaveAttribute(
    "aria-checked",
    "false",
  );
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  expect(screen.getByRole("dialog")).toHaveTextContent("Retained");
});
it("NavTree uses React onItemSelect callback and active ancestor expansion", () => {
  const select = vi.fn();
  render(
    <M.NavTree
      activeId="leaf"
      onItemSelect={select}
      sections={[
        {
          id: "main",
          items: [
            {
              id: "branch",
              label: "Settings",
              children: [{ id: "leaf", label: "Profile" }],
            },
          ],
        },
      ]}
    />,
  );
  fireEvent.click(screen.getByRole("treeitem", { name: "Profile" }));
  expect(select).toHaveBeenCalledWith({ id: "leaf", label: "Profile" });
});
it("theme provider responds to owner updates and nested providers inherit palette", () => {
  const { container, rerender } = render(
    <M.ConfigProvider theme="light" palette="tech">
      <M.ConfigProvider>Nested</M.ConfigProvider>
    </M.ConfigProvider>,
  );
  rerender(
    <M.ConfigProvider theme="dark" palette="editorial">
      <M.ConfigProvider>Nested</M.ConfigProvider>
    </M.ConfigProvider>,
  );
  const roots = container.querySelectorAll('[data-minerva="config-provider"]');
  expect(roots[0]).toHaveClass("mn-palette-editorial-dark");
  expect(roots[1]).toHaveClass("mn-palette-editorial-dark");
});
it("fixed table columns use cumulative offsets while preserving row selection width", () => {
  const { container } = render(
    <M.Table
      columns={[
        { key: "id", header: "ID", width: 80, fixed: "left" },
        { key: "name", header: "Name", width: 160, fixed: "left" },
        { key: "end", header: "End", width: 100, fixed: "right" },
      ]}
      data={[{ id: "1", name: "Ada", end: "Done" }]}
      rowSelection={{}}
    />,
  );
  const headers = container.querySelectorAll(".mn-table__header");
  expect(headers[1]).toHaveStyle({ position: "sticky", left: "48px" });
  expect(headers[2]).toHaveStyle({ left: "128px" });
  expect(headers[3]).toHaveStyle({ right: "0px" });
});
it("uncontrolled confirmation cancels internally and rejects backdrop closure while loading", () => {
  const { container, rerender } = render(
    <M.ConfirmDialog defaultOpen title="Save?" />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  rerender(<M.ConfirmDialog key="new" defaultOpen loading title="Wait" />);
  fireEvent.click(container.querySelector(".mn-overlay-mask")!);
  expect(screen.getByRole("alertdialog")).toBeInTheDocument();
});
it("NumberInput preserves intermediate drafts and commits only on blur", () => {
  const change = vi.fn();
  const { container } = render(
    <M.NumberInput defaultValue={2} step={0.1} onChange={change} />,
  );
  const input = container.querySelector("input")!;
  fireEvent.input(input, { target: { value: "1." } });
  expect(input).toHaveValue("1.");
  expect(change).not.toHaveBeenCalled();
  fireEvent.input(input, { target: { value: "1.25" } });
  fireEvent.blur(input);
  expect(change).toHaveBeenCalledWith(1.3);
  expect(input).toHaveValue("1.3");
});
it("layout token spacing accepts numeric strings and stack justify aliases", () => {
  const { container } = render(
    <M.Stack gap="2" justify="between">
      <M.Box p="4">One</M.Box>
      <M.Box>Two</M.Box>
    </M.Stack>,
  );
  expect(container.querySelector(".mn-stack")).toHaveStyle({
    justifyContent: "space-between",
  });
  expect(
    (container.querySelector(".mn-box") as HTMLElement).style.padding,
  ).toBe("var(--space-4, 16px)");
});
it("modal and drawer expose their title as the dialog accessible name", () => {
  render(
    <>
      <M.Modal open title="Settings">
        Body
      </M.Modal>
      <M.Drawer open title="Details">
        Content
      </M.Drawer>
    </>,
  );
  expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "Details" })).toBeInTheDocument();
});
it("controlled native input rejection restores displayed value", () => {
  const change = vi.fn();
  const { container } = render(<M.Input value="Owner" onChange={change} />);
  fireEvent.input(container.querySelector("input")!, {
    target: { value: "Attempt" },
  });
  expect(change).toHaveBeenCalledWith("Attempt");
  expect(container.querySelector("input")).toHaveValue("Owner");
});
it("CommandDialog accepts React title/keywords contracts and hides disabled commands", () => {
  const select = vi.fn();
  const item = { id: "save", title: "Save project", keywords: "persist" };
  const { container } = render(
    <M.CommandDialog
      open
      items={[item, { id: "locked", title: "Locked", disabled: true }]}
      onSelect={select}
    />,
  );
  expect(
    screen.queryByRole("option", { name: "Locked" }),
  ).not.toBeInTheDocument();
  fireEvent.input(container.querySelector("input")!, {
    target: { value: "persist" },
  });
  fireEvent.click(screen.getByRole("option", { name: "Save project" }));
  expect(select).toHaveBeenCalledWith(item);
});
